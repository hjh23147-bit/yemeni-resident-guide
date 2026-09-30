import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Arabic Normalization Helper
function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/[يى]/g, 'ي')
    .replace(/[\u064B-\u065F\u0670]/g, '') // remove tashkeel
    .toLowerCase()
    .trim();
}

// Synonyms Dictionary (Section 8 & 41)
const SYNONYMS_MAP: Record<string, string[]> = {
  'كفيل': ['صاحب عمل', 'منشأة', 'كفالة'],
  'كفالة': ['نقل خدمات', 'كفيل'],
  'نقل كفالة': ['نقل الخدمات', 'نقل خدمات'],
  'اقامة': ['هوية مقيم', 'تجديد الإقامة', 'اقامه'],
  'تجديد اقامه': ['تجديد الإقامة', 'هوية مقيم'],
  'زيارة': ['زيارة عائلية', 'تأشيرة زيارة'],
  'فيزا': ['تأشيرة', 'تأشيرة زيارة', 'خروج وعودة'],
  'خروج وعودة': ['تأشيرة خروج وعودة', 'سفر'],
  'هروب': ['بلاغ تغيب', 'تغيب عن العمل'],
  'رواتب': ['حماية الأجور', 'مدد', 'مسير رواتب'],
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawQuery = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    if (!rawQuery.trim()) {
      return NextResponse.json({
        success: true,
        data: {
          services: [],
          platforms: [],
          categories: [],
        },
        meta: { query: '', total: 0 },
      });
    }

    const normalizedQuery = normalizeArabic(rawQuery);

    // Expand query with synonyms
    const expandedTerms = new Set<string>([normalizedQuery]);
    for (const [key, synonyms] of Object.entries(SYNONYMS_MAP)) {
      if (normalizedQuery.includes(normalizeArabic(key))) {
        synonyms.forEach((syn) => expandedTerms.add(normalizeArabic(syn)));
      }
    }

    // Retrieve all active services, platforms, and categories
    const [allServices, allPlatforms, allCategories] = await Promise.all([
      prisma.service.findMany({
        where: { status: 'PUBLISHED' },
        include: {
          category: true,
          platform: true,
          fees: true,
          requirements: true,
        },
      }),
      prisma.governmentPlatform.findMany(),
      prisma.serviceCategory.findMany(),
    ]);

    // Rank & Match Services
    const matchedServices = allServices
      .map((srv) => {
        const normName = normalizeArabic(srv.nameAr);
        const normDesc = normalizeArabic(srv.descriptionAr);
        const normCat = normalizeArabic(srv.category.nameAr);
        const normPlat = srv.platform ? normalizeArabic(srv.platform.nameAr) : '';

        let score = 0;

        // Check each term against fields
        for (const term of expandedTerms) {
          if (normName.includes(term)) score += 10;
          if (normCat.includes(term)) score += 5;
          if (normPlat.includes(term)) score += 4;
          if (normDesc.includes(term)) score += 2;
        }

        return { ...srv, relevanceScore: score };
      })
      .filter((item) => item.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);

    // Match Platforms
    const matchedPlatforms = allPlatforms.filter((plat) => {
      const norm = normalizeArabic(plat.nameAr);
      return Array.from(expandedTerms).some((term) => norm.includes(term));
    });

    // Match Categories
    const matchedCategories = allCategories.filter((cat) => {
      const norm = normalizeArabic(cat.nameAr);
      return Array.from(expandedTerms).some((term) => norm.includes(term));
    });

    const totalResults =
      matchedServices.length + matchedPlatforms.length + matchedCategories.length;

    return NextResponse.json({
      success: true,
      data: {
        services: matchedServices,
        platforms: matchedPlatforms,
        categories: matchedCategories,
      },
      meta: {
        query: rawQuery,
        normalizedQuery,
        expandedTerms: Array.from(expandedTerms),
        total: totalResults,
      },
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SEARCH_ERROR',
          message: 'حدث خطأ أثناء إجراء البحث',
        },
      },
      { status: 500 }
    );
  }
}
