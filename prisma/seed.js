const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- STARTING DATABASE SEEDING ---');

  // 1. Seed Roles (Section 35)
  const roles = [
    { name: 'SUPER_ADMIN', description: 'مدير النظام الأعلى كامل الصلاحيات' },
    { name: 'ADMIN', description: 'مدير الخدمات والمحتوى والتحقق' },
    { name: 'CONTENT_REVIEWER', description: 'مراجع المحتوى ومصادر التوثيق' },
    { name: 'CONTENT_EDITOR', description: 'محرر الخدمات والأدلة الإرشادية' },
    { name: 'OFFICE_OWNER', description: 'صاحب مكتب خدمات عامة معتمد' },
    { name: 'OFFICE_MANAGER', description: 'مدير فرع مكتب خدمات' },
    { name: 'VERIFIED_USER', description: 'مستخدم موثق الهوية' },
    { name: 'USER', description: 'مستخدم عادي مسجل' },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { name: r.name },
      update: {},
      create: r,
    });
  }
  console.log('✓ Roles seeded successfully');

  // 2. Seed Admin User
  const adminRole = await prisma.role.findUnique({ where: { name: 'SUPER_ADMIN' } });
  if (adminRole) {
    await prisma.user.upsert({
      where: { email: 'admin@yemeni-guide.com' },
      update: {},
      create: {
        email: 'admin@yemeni-guide.com',
        fullName: 'المشرف العام للمنصة',
        passwordHash: '$2b$12$e6y5mN84729104820184.kLsJdf8e8Hdfyeu8w8e9f8w9e', // simulated secure hash
        roleId: adminRole.id,
        isVerified: true,
      },
    });
    console.log('✓ Default Admin user seeded');
  }

  // 3. Seed Categories (Section 12)
  const categories = [
    {
      id: 'cat-passports',
      slug: 'passports-iqama',
      nameAr: 'الجوازات والإقامة',
      nameEn: 'Passports & Residency',
      descriptionAr: 'إصدار وتجديد الإقامة، تأشيرات الخروج والعودة، والتابعين.',
      icon: 'FileBadge',
      sortOrder: 1,
    },
    {
      id: 'cat-visas',
      slug: 'visas-visits',
      nameAr: 'الزيارات والتأشيرات',
      nameEn: 'Visas & Visits',
      descriptionAr: 'تأشيرات الزيارة العائلية، تمديد الزيارة، وتأشيرات العمل المؤقت.',
      icon: 'Plane',
      sortOrder: 2,
    },
    {
      id: 'cat-labor',
      slug: 'labor-qiwa',
      nameAr: 'العمل والموارد البشرية',
      nameEn: 'Labor & Employment',
      descriptionAr: 'نقل الخدمات، رخص العمل، توثيق العقود، وتعديل المهن عبر منصة قوى.',
      icon: 'Briefcase',
      sortOrder: 3,
    },
    {
      id: 'cat-wage',
      slug: 'wage-protection',
      nameAr: 'حماية الأجور والرواتب',
      nameEn: 'Wage Protection (Mudad)',
      descriptionAr: 'التسجيل في منصة مدد، معالجة ملفات الرواتب، وتوثيق تسليم المستحقات.',
      icon: 'CreditCard',
      sortOrder: 4,
    },
    {
      id: 'cat-domestic',
      slug: 'domestic-labor',
      nameAr: 'العمالة المنزلية',
      nameEn: 'Domestic Workers (Musaned)',
      descriptionAr: 'إصدار تأشيرات العمالة، نقل الخدمات المنزلية، وتوثيق العقود عبر مساند.',
      icon: 'Users',
      sortOrder: 5,
    },
    {
      id: 'cat-traffic',
      slug: 'traffic-vehicles',
      nameAr: 'المرور والمركبات',
      nameEn: 'Traffic & Vehicles',
      descriptionAr: 'تجديد رخص القيادة، الفحص الدوري، نقل ملكية المركبات، والمخالفات.',
      icon: 'Car',
      sortOrder: 6,
    },
    {
      id: 'cat-health',
      slug: 'health-insurance',
      nameAr: 'التأمين والرعاية الصحية',
      nameEn: 'Health Insurance',
      descriptionAr: 'التأمين الطبي الإلزامي للعمالة والتابعين، ربط الجوازات، والاستعلام.',
      icon: 'HeartPulse',
      sortOrder: 7,
    },
    {
      id: 'cat-business',
      slug: 'business-setup',
      nameAr: 'تأسيس الأعمال والاستثمار',
      nameEn: 'Business & Investment',
      descriptionAr: 'تأسيس الشركات، السجلات التجارية، تراخيص وزارة الاستثمار (MISA).',
      icon: 'Building2',
      sortOrder: 8,
    },
    {
      id: 'cat-municipal',
      slug: 'municipal-balady',
      nameAr: 'الشؤون البلدية',
      nameEn: 'Municipal Affairs (Balady)',
      descriptionAr: 'الرخص البلدية للمحلات والمستودعات، والشهادات الصحية للمهنيين.',
      icon: 'Store',
      sortOrder: 9,
    },
    {
      id: 'cat-civil',
      slug: 'civil-defense',
      nameAr: 'السلامة والدفاع المدني',
      nameEn: 'Safety & Civil Defense',
      descriptionAr: 'تراخيص السلامة، شهادات أدوات الوقاية، وتجديد رخص المنشآت.',
      icon: 'ShieldCheck',
      sortOrder: 10,
    },
    {
      id: 'cat-social',
      slug: 'social-insurance',
      nameAr: 'التأمينات الاجتماعية',
      nameEn: 'Social Insurance (GOSI)',
      descriptionAr: 'تسجيل المشتركين، تحديث الأجور الشهرية، وإصدار شهادات الالتزام.',
      icon: 'Landmark',
      sortOrder: 11,
    },
    {
      id: 'cat-zakat',
      slug: 'zakat-tax',
      nameAr: 'الزكاة والضرائب والجمارك',
      nameEn: 'Zakat & Taxes (ZATCA)',
      descriptionAr: 'ضريبة القيمة المضافة، الفوترة الإلكترونية، والرقم الضريبي للمنشآت.',
      icon: 'Receipt',
      sortOrder: 12,
    },
  ];

  for (const c of categories) {
    await prisma.serviceCategory.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }
  console.log('✓ 12 Core Categories seeded');

  // 4. Seed Government Platforms (Section 13)
  const platforms = [
    {
      id: 'plat-absher',
      slug: 'absher',
      nameAr: 'منصة أبشر',
      nameEn: 'Absher Platform',
      descriptionAr: 'البوابة الرسمية لخدمات وزارة الداخلية للمواطنين والمقيمين.',
      logoUrl: '/platforms/absher.svg',
      officialUrl: 'https://www.absher.sa',
    },
    {
      id: 'plat-qiwa',
      slug: 'qiwa',
      nameAr: 'منصة قوى',
      nameEn: 'Qiwa Platform',
      descriptionAr: 'المنصة الموحدة لخدمات قطاع العمل وإدارة المنشآت والعقود.',
      logoUrl: '/platforms/qiwa.svg',
      officialUrl: 'https://www.qiwa.sa',
    },
    {
      id: 'plat-muqeem',
      slug: 'muqeem',
      nameAr: 'بوابة مقيم',
      nameEn: 'Muqeem Portal',
      descriptionAr: 'بوابة إلكترونية تتيح للمنشآت إدارة شؤون المقيمين وتأشيراتهم.',
      logoUrl: '/platforms/muqeem.svg',
      officialUrl: 'https://www.muqeem.sa',
    },
    {
      id: 'plat-mudad',
      slug: 'mudad',
      nameAr: 'منصة مدد',
      nameEn: 'Mudad Platform',
      descriptionAr: 'المنظومة المالية الرسمية لبرنامج حماية الأجور وإدارة الرواتب.',
      logoUrl: '/platforms/mudad.svg',
      officialUrl: 'https://www.mudad.com.sa',
    },
    {
      id: 'plat-musaned',
      slug: 'musaned',
      nameAr: 'منصة مساند',
      nameEn: 'Musaned Platform',
      descriptionAr: 'البوابة الرسمية لخدمات استقدام وتوثيق ونقل خدمات العمالة المنزلية.',
      logoUrl: '/platforms/musaned.svg',
      officialUrl: 'https://www.musaned.com.sa',
    },
    {
      id: 'plat-balady',
      slug: 'balady',
      nameAr: 'منصة بلدي',
      nameEn: 'Balady Platform',
      descriptionAr: 'البوابة الوطنية لخدمات الرخص البلدية والشهادات الصحية والتجارية.',
      logoUrl: '/platforms/balady.svg',
      officialUrl: 'https://www.balady.gov.sa',
    },
  ];

  for (const p of platforms) {
    await prisma.governmentPlatform.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
  console.log('✓ Government Platforms seeded');

  // 5. Seed Cities (Section 24)
  const cities = [
    { nameAr: 'الرياض', nameEn: 'Riyadh', regionAr: 'منطقة الرياض' },
    { nameAr: 'جدة', nameEn: 'Jeddah', regionAr: 'منطقة مكة المكرمة' },
    { nameAr: 'مكة المكرمة', nameEn: 'Makkah', regionAr: 'منطقة مكة المكرمة' },
    { nameAr: 'المدينة المنورة', nameEn: 'Madinah', regionAr: 'منطقة المدينة المنورة' },
    { nameAr: 'الدمام', nameEn: 'Dammam', regionAr: 'المنطقة الشرقية' },
    { nameAr: 'الخبر', nameEn: 'Khobar', regionAr: 'المنطقة الشرقية' },
    { nameAr: 'جازان', nameEn: 'Jazan', regionAr: 'منطقة جازان' },
  ];

  for (const cit of cities) {
    await prisma.city.upsert({
      where: { nameAr: cit.nameAr },
      update: {},
      create: cit,
    });
  }
  console.log('✓ Saudi Cities seeded');

  // 6. Seed Detailed Services with Steps, Requirements, Fees, and Sources
  const passportsCat = await prisma.serviceCategory.findUnique({ where: { slug: 'passports-iqama' } });
  const absherPlat = await prisma.governmentPlatform.findUnique({ where: { slug: 'absher' } });

  if (passportsCat && absherPlat) {
    const srvIqama = await prisma.service.upsert({
      where: { slug: 'iqama-renewal' },
      update: {},
      create: {
        slug: 'iqama-renewal',
        nameAr: 'تجديد الإقامة (هوية مقيم)',
        nameEn: 'Iqama Renewal (Resident ID)',
        descriptionAr: 'خدمة تجديد هوية مقيم إلكترونياً للعاملين في القطاع الخاص والمنشآت والعمالة المنزلية.',
        categoryId: passportsCat.id,
        platformId: absherPlat.id,
        targetAudience: 'RESIDENTS',
        processingTime: 'فوري (خلال دقائق من السداد)',
        applicationMethod: 'إلكتروني بالكامل',
        officialUrl: 'https://www.absher.sa',
        status: 'PUBLISHED',
        verificationStatus: 'VERIFIED',
        lastVerifiedAt: new Date('2026-09-15'),
        featured: true,
        viewCount: 14250,
      },
    });

    // Steps
    await prisma.serviceStep.deleteMany({ where: { serviceId: srvIqama.id } });
    await prisma.serviceStep.createMany({
      data: [
        { serviceId: srvIqama.id, stepNumber: 1, titleAr: 'سداد الرسوم الحكومية عبر سداد', descriptionAr: 'سداد رسوم التجديد ورخصة العمل عبر نظام المدفوعات الحكومية بالبنك.' },
        { serviceId: srvIqama.id, stepNumber: 2, titleAr: 'التحقق من التأمين الطبي والمخالفات', descriptionAr: 'التأكد من سريان التأمين الطبي المربوط وسداد المخالفات المرورية.' },
        { serviceId: srvIqama.id, stepNumber: 3, titleAr: 'تأكيد التجديد في أبشر أو مقيم', descriptionAr: 'الدخول للحساب وتحديد المدة وتأكيد إصدار الهوية المجددة فورياً.' },
      ],
    });

    // Requirements
    await prisma.serviceRequirement.deleteMany({ where: { serviceId: srvIqama.id } });
    await prisma.serviceRequirement.createMany({
      data: [
        { serviceId: srvIqama.id, titleAr: 'جواز سفر ساري المفعول', isMandatory: true },
        { serviceId: srvIqama.id, titleAr: 'تأمين طبي ساري ومعتمد لدى مجلس الضمان الصحي', isMandatory: true },
        { serviceId: srvIqama.id, titleAr: 'سداد المخالفات المرورية المقيدة على المقيم', isMandatory: true },
      ],
    });

    // Fees
    await prisma.serviceFee.deleteMany({ where: { serviceId: srvIqama.id } });
    await prisma.serviceFee.createMany({
      data: [
        { serviceId: srvIqama.id, feeType: 'OFFICIAL_GOVERNMENT', titleAr: 'رسوم تجديد هوية مقيم (عامل منشأة)', amount: 650, currency: 'ريال سعودي', durationUnit: 'سنة', notesAr: 'تضاف رسوم رخصة العمل بحسب المنشأة', sourceName: 'المديرية العامة للجوازات', verifiedAt: new Date('2026-09-15') },
        { serviceId: srvIqama.id, feeType: 'OFFICIAL_GOVERNMENT', titleAr: 'رسوم تجديد عمالة منزلية (فردي)', amount: 600, currency: 'ريال سعودي', durationUnit: 'سنة', sourceName: 'منصة أبشر', verifiedAt: new Date('2026-09-15') },
      ],
    });

    // Sources
    await prisma.serviceSource.deleteMany({ where: { serviceId: srvIqama.id } });
    await prisma.serviceSource.create({
      data: {
        serviceId: srvIqama.id,
        sourceName: 'بوابة المديرية العامة للجوازات الرسمية',
        sourceUrl: 'https://www.gdp.gov.sa',
        sourceType: 'GOV_PORTAL',
        confidence: 'HIGH',
        verifiedAt: new Date('2026-09-15'),
      },
    });
  }

  // 7. Seed Offices
  const riyadhCity = await prisma.city.findUnique({ where: { nameAr: 'الرياض' } });
  if (riyadhCity) {
    const office1 = await prisma.office.create({
      data: {
        nameAr: 'مكتب الوفاق للخدمات العامة والتعقيب',
        cityId: riyadhCity.id,
        districtAr: 'حي الملز',
        phone: '0551234567',
        whatsapp: '966551234567',
        isVerified: true,
        ratingAvg: 4.8,
        reviewsCount: 42,
        status: 'APPROVED',
      },
    });

    await prisma.officeService.createMany({
      data: [
        { officeId: office1.id, nameAr: 'تجديد الإقامات' },
        { officeId: office1.id, nameAr: 'نقل الخدمات' },
        { officeId: office1.id, nameAr: 'تأشيرات الزيارة' },
      ],
    });
  }

  console.log('--- SEEDING COMPLETED SUCCESSFULLY ---');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
