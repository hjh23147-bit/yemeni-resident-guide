import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyJwt } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('resident_token')?.value;
    const payload = token ? verifyJwt(token) : null;

    if (!payload) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'يرجى تسجيل الدخول أولاً' } },
        { status: 401 }
      );
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: payload.userId },
      include: {
        service: {
          include: {
            category: true,
            platform: true,
            fees: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: favorites.map((f) => f.service),
      meta: { total: favorites.length },
    });
  } catch (error) {
    console.error('Favorites GET error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'تعذر استرجاع المفضلات' } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('resident_token')?.value;
    const payload = token ? verifyJwt(token) : null;

    if (!payload) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'يرجى تسجيل الدخول أولاً' } },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { serviceId } = body;

    if (!serviceId) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'معرف الخدمة مطلوب' } },
        { status: 400 }
      );
    }

    const fav = await prisma.favorite.upsert({
      where: {
        userId_serviceId: {
          userId: payload.userId,
          serviceId,
        },
      },
      update: {},
      create: {
        userId: payload.userId,
        serviceId,
      },
    });

    return NextResponse.json({
      success: true,
      data: fav,
      message: 'تمت إضافة الخدمة إلى المفضلة',
    });
  } catch (error) {
    console.error('Favorite POST error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'تعذر حفظ المفضلة' } },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get('resident_token')?.value;
    const payload = token ? verifyJwt(token) : null;

    if (!payload) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'يرجى تسجيل الدخول أولاً' } },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('serviceId');

    if (!serviceId) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'معرف الخدمة مطلوب' } },
        { status: 400 }
      );
    }

    await prisma.favorite.deleteMany({
      where: {
        userId: payload.userId,
        serviceId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'تمت إزالة الخدمة من المفضلة',
    });
  } catch (error) {
    console.error('Favorite DELETE error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'تعذر حذف المفضلة' } },
      { status: 500 }
    );
  }
}
