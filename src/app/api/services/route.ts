import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const platformSlug = searchParams.get('platform');
    const featuredOnly = searchParams.get('featured') === 'true';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const skip = (page - 1) * limit;

    const where: any = {
      status: 'PUBLISHED',
    };

    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    if (platformSlug) {
      where.platform = { slug: platformSlug };
    }

    if (featuredOnly) {
      where.featured = true;
    }

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        skip,
        take: limit,
        orderBy: { viewCount: 'desc' },
        include: {
          category: true,
          platform: true,
          fees: true,
          steps: { orderBy: { stepNumber: 'asc' } },
          requirements: true,
          sources: true,
        },
      }),
      prisma.service.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: services,
      meta: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Services API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'تعذر استرجاع قائمة الخدمات',
        },
      },
      { status: 500 }
    );
  }
}
