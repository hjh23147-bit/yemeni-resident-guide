const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- SEEDING REMAINING SERVICES ---');

  // Find categories and platforms
  const laborCat = await prisma.serviceCategory.findUnique({ where: { slug: 'labor-qiwa' } });
  const visasCat = await prisma.serviceCategory.findUnique({ where: { slug: 'visas-visits' } });
  const wageCat = await prisma.serviceCategory.findUnique({ where: { slug: 'wage-protection' } });
  const bizCat = await prisma.serviceCategory.findUnique({ where: { slug: 'business-setup' } });
  const passportsCat = await prisma.serviceCategory.findUnique({ where: { slug: 'passports-iqama' } });

  const qiwaPlat = await prisma.governmentPlatform.findUnique({ where: { slug: 'qiwa' } });
  const mudadPlat = await prisma.governmentPlatform.findUnique({ where: { slug: 'mudad' } });
  const absherPlat = await prisma.governmentPlatform.findUnique({ where: { slug: 'absher' } });

  // 1. Transfer of Services (Qiwa)
  if (laborCat && qiwaPlat) {
    const srv = await prisma.service.upsert({
      where: { slug: 'service-transfer-qiwa' },
      update: {},
      create: {
        slug: 'service-transfer-qiwa',
        nameAr: 'نقل الخدمات وتغيير صاحب العمل',
        nameEn: 'Transfer of Employee Services (Qiwa)',
        descriptionAr: 'خدمة نقل خدمات الموظف غير السعودي من منشأة إلى منشأة أخرى عبر منصة قوى وفق لوائح وزارة الموارد البشرية.',
        categoryId: laborCat.id,
        platformId: qiwaPlat.id,
        targetAudience: 'RESIDENTS',
        processingTime: '7 إلى 14 يوم عمل',
        applicationMethod: 'إلكتروني عبر منصة قوى',
        officialUrl: 'https://www.qiwa.sa',
        status: 'PUBLISHED',
        verificationStatus: 'VERIFIED',
        lastVerifiedAt: new Date('2026-09-20'),
        featured: true,
        viewCount: 18920,
      },
    });

    await prisma.serviceFee.deleteMany({ where: { serviceId: srv.id } });
    await prisma.serviceFee.createMany({
      data: [
        { serviceId: srv.id, feeType: 'OFFICIAL_GOVERNMENT', titleAr: 'رسوم نقل الخدمات للمرة الأولى', amount: 2000, currency: 'ريال سعودي', sourceName: 'المديرية العامة للجوازات', verifiedAt: new Date('2026-09-20') },
        { serviceId: srv.id, feeType: 'OFFICIAL_GOVERNMENT', titleAr: 'رسوم نقل الخدمات للمرة الثانية', amount: 4000, currency: 'ريال سعودي', sourceName: 'المديرية العامة للجوازات', verifiedAt: new Date('2026-09-20') },
        { serviceId: srv.id, feeType: 'OFFICIAL_GOVERNMENT', titleAr: 'رسوم نقل الخدمات للمرة الثالثة فأكثر', amount: 6000, currency: 'ريال سعودي', sourceName: 'المديرية العامة للجوازات', verifiedAt: new Date('2026-09-20') },
      ],
    });

    await prisma.serviceRequirement.deleteMany({ where: { serviceId: srv.id } });
    await prisma.serviceRequirement.createMany({
      data: [
        { serviceId: srv.id, titleAr: 'أن تكون رخصة إقامة الموظف سارية أو منتهية دون قيود نظامية', isMandatory: true },
        { serviceId: srv.id, titleAr: 'التزام المنشأة الجديدة ببرنامج حماية الأجور ونطاق المنشأة الأخضر فما فوق', isMandatory: true },
        { serviceId: srv.id, titleAr: 'موافقة الموظف الصريحة على العقد الرقمي عبر منصة قوى', isMandatory: true },
      ],
    });

    await prisma.serviceStep.deleteMany({ where: { serviceId: srv.id } });
    await prisma.serviceStep.createMany({
      data: [
        { serviceId: srv.id, stepNumber: 1, titleAr: 'إنشاء طلب النقل', descriptionAr: 'يقوم صاحب العمل الجديد بتقديم طلب النقل عبر حسابه في قوى.' },
        { serviceId: srv.id, stepNumber: 2, titleAr: 'توثيق العقد', descriptionAr: 'إدخال بنود العقد الرقمي الجديد وإرساله للموظف.' },
        { serviceId: srv.id, stepNumber: 3, titleAr: 'موافقة الموظف', descriptionAr: 'موافقة الموظف عبر حسابه الشخصي في قوى خلال 10 أيام.' },
      ],
    });
  }

  // 2. Family Visit Visa
  if (visasCat && absherPlat) {
    const srv = await prisma.service.upsert({
      where: { slug: 'family-visit-visa' },
      update: {},
      create: {
        slug: 'family-visit-visa',
        nameAr: 'طلب تأشيرة زيارة عائلية',
        nameEn: 'Family Visit Visa Application',
        descriptionAr: 'طلب استقدام الزوجة والأبناء والوالدين للمقيمين النظاميين في المملكة عبر منصة التأشيرات بوزارة الخارجية.',
        categoryId: visasCat.id,
        platformId: absherPlat.id,
        targetAudience: 'FAMILIES',
        processingTime: '3 إلى 5 أيام عمل',
        applicationMethod: 'إلكتروني عبر منصة التأشيرات',
        officialUrl: 'https://visa.mofa.gov.sa',
        status: 'PUBLISHED',
        verificationStatus: 'VERIFIED',
        lastVerifiedAt: new Date('2026-09-18'),
        featured: true,
        viewCount: 22100,
      },
    });

    await prisma.serviceFee.deleteMany({ where: { serviceId: srv.id } });
    await prisma.serviceFee.create({
      data: {
        serviceId: srv.id,
        feeType: 'OFFICIAL_GOVERNMENT',
        titleAr: 'رسوم التأشيرة الحكومية (للسفرة الواحدة / 90 يوماً)',
        amount: 300,
        currency: 'ريال سعودي',
        sourceName: 'وزارة الخارجية',
        verifiedAt: new Date('2026-09-18'),
      },
    });
  }

  // 3. Wage Protection (Mudad)
  if (wageCat && mudadPlat) {
    await prisma.service.upsert({
      where: { slug: 'mudad-wage-protection' },
      update: {},
      create: {
        slug: 'mudad-wage-protection',
        nameAr: 'إدارة الرواتب وحماية الأجور (مدد)',
        nameEn: 'Wage Protection System (Mudad)',
        descriptionAr: 'التسجيل في منصة مدد ورفع ملفات صرف الأجور الشهرية لتفادي إيقاف الخدمات وتجنب مخالفات نظام العمل.',
        categoryId: wageCat.id,
        platformId: mudadPlat.id,
        targetAudience: 'ESTABLISHMENTS',
        processingTime: 'شهرياً خلال أول 10 أيام من الشهر',
        applicationMethod: 'إلكتروني عبر منصة مدد',
        officialUrl: 'https://www.mudad.com.sa',
        status: 'PUBLISHED',
        verificationStatus: 'VERIFIED',
        lastVerifiedAt: new Date('2026-09-10'),
        featured: false,
        viewCount: 8400,
      },
    });
  }

  // 4. Exit & Re-entry Visa
  if (passportsCat && absherPlat) {
    const srv = await prisma.service.upsert({
      where: { slug: 'exit-reentry-visa' },
      update: {},
      create: {
        slug: 'exit-reentry-visa',
        nameAr: 'تأشيرة الخروج والعودة',
        nameEn: 'Exit and Re-entry Visa',
        descriptionAr: 'إصدار وتمديد تأشيرة الخروج والعودة المفردة والمتعددة للمقيم والتابعين عبر منصة أبشر ومقيم.',
        categoryId: passportsCat.id,
        platformId: absherPlat.id,
        targetAudience: 'RESIDENTS',
        processingTime: 'فوري (إلكتروني)',
        applicationMethod: 'إلكتروني عبر أبشر / مقيم',
        officialUrl: 'https://www.absher.sa',
        status: 'PUBLISHED',
        verificationStatus: 'VERIFIED',
        lastVerifiedAt: new Date('2026-09-14'),
        featured: false,
        viewCount: 15300,
      },
    });

    await prisma.serviceFee.deleteMany({ where: { serviceId: srv.id } });
    await prisma.serviceFee.createMany({
      data: [
        { serviceId: srv.id, feeType: 'OFFICIAL_GOVERNMENT', titleAr: 'تأشيرة مفردة (شهرين)', amount: 200, currency: 'ريال سعودي', sourceName: 'المديرية العامة للجوازات', verifiedAt: new Date('2026-09-14') },
        { serviceId: srv.id, feeType: 'OFFICIAL_GOVERNMENT', titleAr: 'تأشيرة متعددة (3 أشهر)', amount: 500, currency: 'ريال سعودي', sourceName: 'المديرية العامة للجوازات', verifiedAt: new Date('2026-09-14') },
      ],
    });
  }

  // 5. Business Setup
  if (bizCat && qiwaPlat) {
    await prisma.service.upsert({
      where: { slug: 'business-setup-saudi' },
      update: {},
      create: {
        slug: 'business-setup-saudi',
        nameAr: 'تأسيس الأعمال والاستثمار التجاري',
        nameEn: 'Business Setup & Investment in KSA',
        descriptionAr: 'دليل خطوات تأسيس المؤسسات والشركات، وتراخيص وزارة الاستثمار (MISA) وتأسيس الكيانات التجارية للأجانب والمقيمين.',
        categoryId: bizCat.id,
        platformId: qiwaPlat.id,
        targetAudience: 'INVESTORS',
        processingTime: '1 إلى 3 أيام عمل للسجل التجاري',
        applicationMethod: 'إلكتروني عبر منصة الأعمال الموحدة',
        officialUrl: 'https://www.business.gov.sa',
        status: 'PUBLISHED',
        verificationStatus: 'VERIFIED',
        lastVerifiedAt: new Date('2026-09-12'),
        featured: true,
        viewCount: 11400,
      },
    });
  }

  console.log('✓ All 6 services seeded successfully into database');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
