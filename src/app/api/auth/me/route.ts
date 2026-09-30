import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyJwt } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('resident_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'غير مسجل الدخول' } },
        { status: 401 }
      );
    }

    const payload = verifyJwt(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_TOKEN', message: 'جلسة الدخول منتهية' } },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        isVerified: true,
        role: { select: { name: true } },
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'USER_NOT_FOUND', message: 'المستخدم غير موجود' } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error('Auth Me error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'تعذر التحقق من الحساب' } },
      { status: 500 }
    );
  }
}
