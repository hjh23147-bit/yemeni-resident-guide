import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workerType = 'private', hasDependents = false, isIqamaValid = true } = body;

    const items = [
      { id: 'item-1', title: 'أصل جواز السفر ساري المفعول لمدة لا تقل عن 6 أشهر', mandatory: true },
      { id: 'item-2', title: 'التحقق من سداد المخالفات المرورية المسجلة بالرقم المدني', mandatory: true },
      { id: 'item-3', title: 'تأمين طبي ساري ومعتمد لدى مجلس الضمان الصحي (CCHI)', mandatory: true },
    ];

    if (!isIqamaValid) {
      items.push({
        id: 'item-fine',
        title: 'سداد غرامة تأخير تجديد الإقامة عبر سداد (500 ريال للمرة الأولى)',
        mandatory: true,
      });
    }

    if (hasDependents) {
      items.push({
        id: 'item-dep-1',
        title: 'سداد المقابل المالي للمرافقين والتابعين عن كامل المدة المطلوبة',
        mandatory: true,
      });
      items.push({
        id: 'item-dep-2',
        title: 'صور الجوازات والإقامات والتأمين الطبي الخاص بكل مرافق',
        mandatory: true,
      });
    }

    if (workerType === 'private') {
      items.push({
        id: 'item-qiwa-1',
        title: 'سداد المقابل المالي لرخصة العمل عبر نظام الموارد البشرية',
        mandatory: true,
      });
      items.push({
        id: 'item-qiwa-2',
        title: 'توثيق العقد الإلكتروني بنسبة 100% في منصة قوى',
        mandatory: true,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        workerType,
        hasDependents,
        isIqamaValid,
        items,
        totalItems: items.length,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INVALID_INPUT', message: 'تعذر توليد قائمة الفحص' },
      },
      { status: 400 }
    );
  }
}
