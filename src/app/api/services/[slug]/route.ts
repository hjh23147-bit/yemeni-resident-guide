import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const service = await prisma.service.findUnique({
      where: { slug },
      include: {
        category: true,
        platform: true,
        entity: true,
        steps: { orderBy: { stepNumber: 'asc' } },
        requirements: true,
        fees: true,
        sources: true,
        faqs: true,
        updates: { orderBy: { publishedAt: 'desc' } },
      },
    });

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'الخدمة المطلوبة غير موجودة أو تم أرشفتها',
          },
        },
        { status: 404 }
      );
    }

    // Increment view count asynchronously
    await prisma.service.update({
      where: { id: service.id },
      data: { viewCount: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('Service Detail API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'تعذر استرجاع تفاصيل الخدمة',
        },
      },
      { status: 500 }
    );
  }
}
