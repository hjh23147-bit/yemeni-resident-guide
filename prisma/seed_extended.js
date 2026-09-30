const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- SEEDING EXTENDED TAQEEB, MEDICAL & MISA SERVICES INTO SQLITE DB ---');

  // 1. Create or upsert the 3 new categories
  const taqeebCat = await prisma.serviceCategory.upsert({
    where: { slug: 'taqeeb-notes' },
    update: {},
    create: {
      slug: 'taqeeb-notes',
      nameAr: 'التعقيب وفك الملاحظات',
      nameEn: 'Taqeeb & Compliance Clearance',
      descriptionAr: 'فك ملاحظات حماية الأجور، التقييم الذاتي، نسب التوطين ونطاقات أحمر.',
      icon: 'ShieldAlert',
      sortOrder: 13,
    },
  });

  const medicalCat = await prisma.serviceCategory.upsert({
    where: { slug: 'medical-checks' },
    update: {},
    create: {
      slug: 'medical-checks',
      nameAr: 'الفحوصات الطبية المعتمدة',
      nameEn: 'Approved Medical Examinations',
      descriptionAr: 'فحوصات الإقامة، الإقامة المميزة، رخص القيادة، والتوظيف الشامل.',
      icon: 'HeartPulse',
      sortOrder: 14,
    },
  });

  const misaCat = await prisma.serviceCategory.upsert({
    where: { slug: 'foreign-investment' },
    update: {},
    create: {
      slug: 'foreign-investment',
      nameAr: 'تأسيس واستثمار الشركات الأجنبية (MISA)',
      nameEn: 'Foreign Investment & MISA Licensing',
      descriptionAr: 'تراخيص الاستثمار MISA، تأسيس وشراء الشركات، السجلات والحسابات البنكية.',
      icon: 'Building2',
      sortOrder: 15,
    },
  });

  // Fetch common platforms
  const qiwaPlat = await prisma.governmentPlatform.findUnique({ where: { slug: 'qiwa' } });
  const absherPlat = await prisma.governmentPlatform.findUnique({ where: { slug: 'absher' } });
  const mudadPlat = await prisma.governmentPlatform.findUnique({ where: { slug: 'mudad' } });
  const baladyPlat = await prisma.governmentPlatform.findUnique({ where: { slug: 'balady' } });
  const zatcaPlat = await prisma.governmentPlatform.findUnique({ where: { slug: 'zatca' } });

  // 2. Sample Services for Taqeeb
  await prisma.service.upsert({
    where: { slug: 'red-nitaqat-work-permit' },
    update: {},
    create: {
      slug: 'red-nitaqat-work-permit',
      nameAr: 'إصدار كروت عمل نطاق أحمر',
      nameEn: 'Red Nitaqat Work Permits Issuance',
      descriptionAr: 'خدمة التعقيب ومعالجة كروت ورخص العمل للمنشآت الواقعة بالنطاق الأحمر وفق الأطر الاستثنائية والمهل التصحيحية المعتمدة.',
      categoryId: taqeebCat.id,
      platformId: qiwaPlat?.id,
      targetAudience: 'ESTABLISHMENTS',
      processingTime: '24 إلى 48 ساعة',
      applicationMethod: 'معالجة إلكترونية وتنسيق تعقيب رسمي',
      officialUrl: 'https://www.qiwa.sa',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      featured: true,
      viewCount: 15400,
    },
  });

  await prisma.service.upsert({
    where: { slug: 'clear-wage-protection-notes' },
    update: {},
    create: {
      slug: 'clear-wage-protection-notes',
      nameAr: 'فك ملاحظة حماية الأجور (مدد)',
      nameEn: 'Clear Wage Protection Notes (Mudad)',
      descriptionAr: 'معالجة ملاحظات نسب الالتزام في برنامج حماية الأجور، رفع تبريرات الرواتب المتأخرة، وفك إيقاف الخدمات التابع لوزارة الموارد.',
      categoryId: taqeebCat.id,
      platformId: mudadPlat?.id,
      targetAudience: 'ESTABLISHMENTS',
      processingTime: '24 إلى 48 ساعة بعد قبول التبريرات',
      applicationMethod: 'إلكتروني عبر منصة مدد',
      officialUrl: 'https://www.mudad.com.sa',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      featured: true,
      viewCount: 14700,
    },
  });

  // 3. Sample Services for Medical
  await prisma.service.upsert({
    where: { slug: 'medical-check-iqama-issuance' },
    update: {},
    create: {
      slug: 'medical-check-iqama-issuance',
      nameAr: 'فحص طبي لإصدار وتجديد الإقامة',
      nameEn: 'Medical Examination for Iqama Issuance & Renewal',
      descriptionAr: 'إجراء الفحص الطبي الإلزامي للعمالة الوافدة في المراكز الطبية المعتمدة وربط النتيجة آلياً بوزارة الداخلية ونظام إفادة لإصدار الإقامة.',
      categoryId: medicalCat.id,
      platformId: absherPlat?.id,
      targetAudience: 'RESIDENTS',
      processingTime: 'خلال 24 إلى 48 ساعة للربط الآلي',
      applicationMethod: 'فحص حضوري في مركز طبي معتمد مع ربط رقمي',
      officialUrl: 'https://www.moh.gov.sa',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      featured: true,
      viewCount: 24500,
    },
  });

  await prisma.service.upsert({
    where: { slug: 'medical-check-driving-license' },
    update: {},
    create: {
      slug: 'medical-check-driving-license',
      nameAr: 'فحص طبي لتجديد رخصة القيادة (إفادة)',
      nameEn: 'Driving License Medical Examination (Efada)',
      descriptionAr: 'فحص النظر واللياقة البدنية المعتمد لإصدار وتجديد رخص القيادة وربطه الفوري بنظام أبشر والمرور دون الحاجة لمراجعة دلة أو المرور.',
      categoryId: medicalCat.id,
      platformId: absherPlat?.id,
      targetAudience: 'RESIDENTS',
      processingTime: 'فوري (خلال 10 دقائق بعد الكشف)',
      applicationMethod: 'كشف بصري وسريري سريع في مركز معتمد',
      officialUrl: 'https://www.absher.sa',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      featured: true,
      viewCount: 21300,
    },
  });

  // 4. Sample Services for MISA
  await prisma.service.upsert({
    where: { slug: 'misa-investment-license' },
    update: {},
    create: {
      slug: 'misa-investment-license',
      nameAr: 'استخراج تراخيص الاستثمار الأجنبي (MISA)',
      nameEn: 'Foreign Investment License Issuance (MISA)',
      descriptionAr: 'إصدار ترخيص الاستثمار الأجنبي بملكية تصل إلى 100% للمستثمرين الأجانب والشركات الإقليمية في مختلف الأنشطة الخدمية، التجارية، والصناعية.',
      categoryId: misaCat.id,
      platformId: absherPlat?.id,
      targetAudience: 'INVESTORS',
      processingTime: '24 إلى 72 ساعة من اكتمال الأوراق',
      applicationMethod: 'إلكتروني بالكامل عبر بوابة MISA الإلكترونية',
      officialUrl: 'https://misa.gov.sa',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      featured: true,
      viewCount: 28400,
    },
  });

  await prisma.service.upsert({
    where: { slug: 'misa-acquire-foreign-company' },
    update: {},
    create: {
      slug: 'misa-acquire-foreign-company',
      nameAr: 'شراء شركة أجنبية قائمة في السعودية',
      nameEn: 'Acquisition of Existing Foreign Company in KSA',
      descriptionAr: 'إجراءات التنازل ونقل ملكية حصص الشركات الأجنبية القائمة المرخصة من MISA وتحديث عقد التأسيس والسجل التجاري للمالك الجديد.',
      categoryId: misaCat.id,
      platformId: absherPlat?.id,
      targetAudience: 'INVESTORS',
      processingTime: '7 إلى 14 يوم عمل',
      applicationMethod: 'إجراءات قانونية وإلكترونية وتوثيق معتمد',
      officialUrl: 'https://misa.gov.sa',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      featured: true,
      viewCount: 19800,
    },
  });

  console.log('--- SEEDING COMPLETED SUCCESSFULLY ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
