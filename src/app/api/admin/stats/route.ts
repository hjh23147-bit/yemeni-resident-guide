import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const [
      servicesCount,
      verifiedServicesCount,
      needsReviewCount,
      categoriesCount,
      platformsCount,
      officesCount,
      usersCount,
    ] = await Promise.all([
      prisma.service.count(),
      prisma.service.count({ where: { verificationStatus: 'VERIFIED' } }),
      prisma.service.count({ where: { verificationStatus: 'NEEDS_REVIEW' } }),
      prisma.serviceCategory.count(),
      prisma.governmentPlatform.count(),
      prisma.office.count(),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        servicesCount,
        verifiedServicesCount,
        needsReviewCount,
        categoriesCount,
        platformsCount,
        officesCount,
        usersCount,
        healthPercentage: servicesCount > 0 ? Math.round((verifiedServicesCount / servicesCount) * 100) : 100,
        systemStatus: 'OPERATIONAL',
        lastAuditTimestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'DATABASE_ERROR', message: 'تعذر استرجاع إحصائيات الإدارة' } },
      { status: 500 }
    );
  }
}
