import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, signJwt } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, phone } = body;

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور والاسم الكامل' } },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: { code: 'EMAIL_EXISTS', message: 'البريد الإلكتروني مسجل مسبقاً' } },
        { status: 409 }
      );
    }

    // Find default USER role
    let userRole = await prisma.role.findUnique({ where: { name: 'USER' } });
    if (!userRole) {
      userRole = await prisma.role.create({
        data: { name: 'USER', description: 'مستخدم عادي' },
      });
    }

    const passwordHash = hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        fullName,
        phone,
        passwordHash,
        roleId: userRole.id,
        isVerified: false,
      },
    });

    const token = signJwt({
      userId: user.id,
      email: user.email,
      role: 'USER',
      fullName: user.fullName,
    });

    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: 'USER',
        },
      },
      message: 'تم إنشاء الحساب بنجاح',
    });

    // Set secure HttpOnly cookie
    response.cookies.set('resident_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'تعذر إنشاء الحساب' } },
      { status: 500 }
    );
  }
}
