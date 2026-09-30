import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const resolvedParams = await params;
    const { orderNumber } = resolvedParams;

    if (!orderNumber) {
      return NextResponse.json(
        { success: false, error: { message: 'رقم المعاملة غير صالح' } },
        { status: 400 }
      );
    }

    // Try finding by orderNumber or id
    let order = await prisma.serviceOrder.findUnique({
      where: { orderNumber },
    });

    if (!order) {
      order = await prisma.serviceOrder.findUnique({
        where: { id: orderNumber },
      });
    }

    if (!order) {
      return NextResponse.json(
        { success: false, error: { message: 'لم يتم العثور على المعاملة المطلوبة' } },
        { status: 404 }
      );
    }

    let parsedFiles: { name: string; url: string; size: string; type: string }[] = [];
    try {
      if (order.filesList) {
        const raw = JSON.parse(order.filesList);
        if (Array.isArray(raw)) {
          parsedFiles = raw.map((item) =>
            typeof item === 'string'
              ? { name: item, url: '', size: '', type: 'document' }
              : item
          );
        }
      }
    } catch (e) {
      console.error('Failed to parse filesList JSON', e);
    }

    return NextResponse.json({
      success: true,
      data: {
        ...order,
        files: parsedFiles,
      },
    });
  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json(
      { success: false, error: { message: 'حدث خطأ في استرجاع تفاصيل المعاملة' } },
      { status: 500 }
    );
  }
}
