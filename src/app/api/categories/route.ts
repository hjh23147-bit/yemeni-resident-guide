import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.serviceCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { services: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: categories,
      meta: {
        total: categories.length
      }
    });
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'تعذر استرجاع بيانات القطاعات الخدمية'
        }
      },
      { status: 500 }
    );
  }
}
