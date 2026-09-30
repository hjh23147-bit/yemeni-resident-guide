import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cityName = searchParams.get('city');

    const where: any = {
      status: 'APPROVED',
    };

    if (cityName && cityName !== 'all') {
      where.city = { nameAr: cityName };
    }

    const offices = await prisma.office.findMany({
      where,
      include: {
        city: true,
        services: true,
        reviews: { where: { isApproved: true }, take: 5 },
      },
      orderBy: { ratingAvg: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: offices,
      meta: { total: offices.length },
    });
  } catch (error) {
    console.error('Offices API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: { code: 'DATABASE_ERROR', message: 'تعذر استرجاع دليل المكاتب' },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nameAr, cityName, districtAr, phone, whatsapp, crNumber } = body;

    if (!nameAr || !cityName || !phone) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'يرجى إكمال الحقول الإلزامية' },
        },
        { status: 400 }
      );
    }

    // Find or create city
    let city = await prisma.city.findUnique({ where: { nameAr: cityName } });
    if (!city) {
      city = await prisma.city.create({
        data: {
          nameAr: cityName,
          nameEn: cityName,
          regionAr: 'المملكة العربية السعودية',
        },
      });
    }

    // Create office in PENDING review state (Section 22)
    const newOffice = await prisma.office.create({
      data: {
        nameAr,
        cityId: city.id,
        districtAr: districtAr || 'عام',
        phone,
        whatsapp: whatsapp || phone,
        crNumber,
        isVerified: false,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      data: newOffice,
      message: 'تم استلام طلب تسجيل المكتب وسيتم مراجعته وتوثيقه قبل النشر',
    });
  } catch (error) {
    console.error('Office registration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: { code: 'REGISTRATION_ERROR', message: 'فشل تسجيل المكتب' },
      },
      { status: 500 }
    );
  }
}
