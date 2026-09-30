import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, signJwt } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'يرجى إدخال كلمة المرور' } },
        { status: 400 }
      );
    }

    const trimmedPassword = String(password).trim();
    const trimmedEmail = email ? String(email).trim().toLowerCase() : '';

    let user = null;

    if (trimmedEmail && trimmedEmail !== 'admin') {
      // Find by specific email
      user = await prisma.user.findFirst({
        where: {
          email: { equals: trimmedEmail }
        },
        include: { role: true },
      });
    }

    // If no user found yet and this is an admin login attempt (email is empty or 'admin' or admin email)
    if (!user && (!trimmedEmail || trimmedEmail === 'admin' || trimmedEmail.includes('admin'))) {
      user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: 'admin@resident-guide.sa' },
            { email: 'admin@yemeni-guide.com' },
            { role: { name: 'SUPER_ADMIN' } },
            { role: { name: 'ADMIN' } },
          ]
        },
        include: { role: true },
      });
    }

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'بيانات الدخول غير صحيحة' } },
        { status: 401 }
      );
    }

    // Securely verify against the PBKDF2/SHA-512 encrypted hash stored in the SQLite database
    const isMatch = verifyPassword(trimmedPassword, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى' } },
        { status: 401 }
      );
    }

    const token = signJwt({
      userId: user.id,
      email: user.email,
      role: user.role.name,
      fullName: user.fullName,
    });

    const response = NextResponse.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role.name,
        },
      },
      message: 'تم التحقق من كلمة المرور وتسجيل الدخول بنجاح',
    });

    response.cookies.set('resident_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'حدث خطأ في تسجيل الدخول' } },
      { status: 500 }
    );
  }
}

