import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceType = 'worker', durationMonths = 12, dependentsCount = 0 } = body;

    const months = parseInt(durationMonths, 10);
    const fraction = months / 12;

    let govFee = 0;
    let laborFee = 0;
    let dependentFee = 0;
    let notes = '';

    if (serviceType === 'worker') {
      govFee = Math.round(650 * fraction);
      laborFee = Math.round(9600 * fraction);
      notes = 'تختلف رسوم رخصة العمل بحسب نسبة التوطين في نطاقات المنشأة.';
    } else if (serviceType === 'domestic') {
      govFee = Math.round(600 * fraction);
      laborFee = 0;
      notes = 'تنطبق على العمالة المنزلية المسجلة باسم رب الأسرة.';
    } else if (serviceType === 'visit') {
      govFee = 300;
      laborFee = 0;
      notes = 'تأشيرة زيارة عائلية مفردة لمدة 90 يوماً، يضاف رسم التأمين الطبي بحسب العمر.';
    }

    if (dependentsCount > 0) {
      dependentFee = dependentsCount * 400 * months;
    }

    const total = govFee + laborFee + dependentFee;

    return NextResponse.json({
      success: true,
      data: {
        serviceType,
        durationMonths: months,
        dependentsCount,
        breakdown: {
          governmentFee: govFee,
          laborFee,
          dependentFee,
          total,
          currency: 'ريال سعودي',
        },
        notes,
        source: 'المديرية العامة للجوازات ووزارة الموارد البشرية',
        verifiedAt: '2026-09-20',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INVALID_INPUT', message: 'مدخلات الحساب غير صحيحة' },
      },
      { status: 400 }
    );
  }
}
