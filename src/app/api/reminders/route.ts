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

    const reminders = await prisma.reminder.findMany({
      where: { userId: payload.userId },
      orderBy: { dueDate: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: reminders,
      meta: { total: reminders.length },
    });
  } catch (error) {
    console.error('Reminders GET error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'تعذر استرجاع التذكيرات' } },
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
    const { titleAr, reminderType, dueDate } = body;

    if (!titleAr || !dueDate) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'يرجى تحديد عنوان التذكير والتاريخ' } },
        { status: 400 }
      );
    }

    const reminder = await prisma.reminder.create({
      data: {
        userId: payload.userId,
        titleAr,
        reminderType: reminderType || 'IQAMA_EXPIRY',
        dueDate: new Date(dueDate),
      },
    });

    return NextResponse.json({
      success: true,
      data: reminder,
      message: 'تم إضافة التذكير بنجاح',
    });
  } catch (error) {
    console.error('Reminder POST error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'تعذر حفظ التذكير' } },
      { status: 500 }
    );
  }
}
