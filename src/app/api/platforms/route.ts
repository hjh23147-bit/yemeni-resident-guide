import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const platforms = await prisma.governmentPlatform.findMany({
      include: {
        _count: {
          select: { services: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: platforms,
      meta: {
        total: platforms.length
      }
    });
  } catch (error) {
    console.error('Platforms API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'تعذر استرجاع بيانات المنصات الحكومية'
        }
      },
      { status: 500 }
    );
  }
}
