import { ServiceCategory, GovernmentPlatform, Service, ServiceUpdate, Office } from '@/types';
import { EXTENDED_SERVICES } from './extendedServicesData';

export const CATEGORIES_DATA: ServiceCategory[] = [
  {
    id: 'passports-iqama',
    slug: 'passports-iqama',
    name_ar: 'الجوازات والإقامة',
    name_en: 'Passports & Residency',
    description_ar: 'إصدار وتجديد الإقامة، تأشيرات الخروج والعودة، والتابعين.',
    icon: 'FileBadge',
    sort_order: 1,
  },
  {
    id: 'visas-visits',
    slug: 'visas-visits',
    name_ar: 'الزيارات والتأشيرات',
    name_en: 'Visas & Visits',
    description_ar: 'تأشيرات الزيارة العائلية، تمديد الزيارة، وتأشيرات العمل المؤقت.',
    icon: 'Plane',
    sort_order: 2,
  },
  {
    id: 'labor-qiwa',
    slug: 'labor-qiwa',
    name_ar: 'العمل والموارد البشرية',
    name_en: 'Labor & Employment',
    description_ar: 'نقل الخدمات، رخص العمل، توثيق العقود، وتعديل المهن عبر منصة قوى.',
    icon: 'Briefcase',
    sort_order: 3,
  },
  {
    id: 'wage-protection',
    slug: 'wage-protection',
    name_ar: 'حماية الأجور والرواتب',
    name_en: 'Wage Protection (Mudad)',
    description_ar: 'التسجيل في منصة مدد، معالجة ملفات الرواتب، وتوثيق تسليم المستحقات.',
    icon: 'CreditCard',
    sort_order: 4,
  },
  {
    id: 'domestic-labor',
    slug: 'domestic-labor',
    name_ar: 'العمالة المنزلية',
    name_en: 'Domestic Workers (Musaned)',
    description_ar: 'إصدار تأشيرات العمالة، نقل الخدمات المنزلية، وتوثيق العقود عبر مساند.',
    icon: 'Users',
    sort_order: 5,
  },
  {
    id: 'traffic-vehicles',
    slug: 'traffic-vehicles',
    name_ar: 'المرور والمركبات',
    name_en: 'Traffic & Vehicles',
    description_ar: 'تجديد رخص القيادة، الفحص الدوري، نقل ملكية المركبات، والمخالفات.',
    icon: 'Car',
    sort_order: 6,
  },
  {
    id: 'health-insurance',
    slug: 'health-insurance',
    name_ar: 'التأمين والرعاية الصحية',
    name_en: 'Health Insurance',
    description_ar: 'التأمين الطبي الإلزامي للعمالة والتابعين، ربط الجوازات، والاستعلام.',
    icon: 'HeartPulse',
    sort_order: 7,
  },
  {
    id: 'business-setup',
    slug: 'business-setup',
    name_ar: 'تأسيس الأعمال والاستثمار',
    name_en: 'Business & Investment',
    description_ar: 'تأسيس الشركات، السجلات التجارية، تراخيص وزارة الاستثمار (MISA).',
    icon: 'Building2',
    sort_order: 8,
  },
  {
    id: 'municipal-balady',
    slug: 'municipal-balady',
    name_ar: 'الشؤون البلدية',
    name_en: 'Municipal Affairs (Balady)',
    description_ar: 'الرخص البلدية للمحلات والمستودعات، والشهادات الصحية للمهنيين.',
    icon: 'Store',
    sort_order: 9,
  },
  {
    id: 'civil-defense',
    slug: 'civil-defense',
    name_ar: 'السلامة والدفاع المدني',
    name_en: 'Safety & Civil Defense',
    description_ar: 'تراخيص السلامة، شهادات أدوات الوقاية، وتجديد رخص المنشآت.',
    icon: 'ShieldCheck',
    sort_order: 10,
  },
  {
    id: 'social-insurance',
    slug: 'social-insurance',
    name_ar: 'التأمينات الاجتماعية',
    name_en: 'Social Insurance (GOSI)',
    description_ar: 'تسجيل المشتركين، تحديث الأجور الشهرية، وإصدار شهادات الالتزام.',
    icon: 'Landmark',
    sort_order: 11,
  },
  {
    id: 'zakat-tax',
    slug: 'zakat-tax',
    name_ar: 'الزكاة والضرائب والجمارك',
    name_en: 'Zakat & Taxes (ZATCA)',
    description_ar: 'ضريبة القيمة المضافة، الفوترة الإلكترونية، والرقم الضريبي للمنشآت.',
    icon: 'Receipt',
    sort_order: 12,
  },
  {
    id: 'taqeeb-notes',
    slug: 'taqeeb-notes',
    name_ar: 'التعقيب وفك الملاحظات',
    name_en: 'Taqeeb & Compliance Clearance',
    description_ar: 'فك ملاحظات حماية الأجور، التقييم الذاتي، نسب التوطين ونطاقات أحمر.',
    icon: 'ShieldAlert',
    sort_order: 13,
  },
  {
    id: 'medical-checks',
    slug: 'medical-checks',
    name_ar: 'الفحوصات الطبية المعتمدة',
    name_en: 'Approved Medical Examinations',
    description_ar: 'فحوصات الإقامة، الإقامة المميزة، رخص القيادة، والتوظيف الشامل.',
    icon: 'HeartPulse',
    sort_order: 14,
  },
  {
    id: 'foreign-investment',
    slug: 'foreign-investment',
    name_ar: 'تأسيس واستثمار الشركات الأجنبية (MISA)',
    name_en: 'Foreign Investment & MISA Licensing',
    description_ar: 'تراخيص الاستثمار MISA، تأسيس وشراء الشركات، السجلات والحسابات البنكية.',
    icon: 'Building2',
    sort_order: 15,
  },
];

export const PLATFORMS_DATA: GovernmentPlatform[] = [
  {
    id: 'absher',
    slug: 'absher',
    name_ar: 'منصة أبشر',
    name_en: 'Absher Platform',
    description_ar: 'البوابة الرسمية لخدمات وزارة الداخلية للمواطنين والمقيمين.',
    logo_url: '/platforms/absher.svg',
    official_url: 'https://www.absher.sa',
    services_count: 8,
    verification_status: 'VERIFIED',
  },
  {
    id: 'qiwa',
    slug: 'qiwa',
    name_ar: 'منصة قوى',
    name_en: 'Qiwa Platform',
    description_ar: 'المنصة الموحدة لخدمات قطاع العمل وإدارة المنشآت والعقود.',
    logo_url: '/platforms/qiwa.svg',
    official_url: 'https://www.qiwa.sa',
    services_count: 6,
    verification_status: 'VERIFIED',
  },
  {
    id: 'muqeem',
    slug: 'muqeem',
    name_ar: 'بوابة مقيم',
    name_en: 'Muqeem Portal',
    description_ar: 'بوابة إلكترونية تتيح للمنشآت إدارة شؤون المقيمين وتأشيراتهم.',
    logo_url: '/platforms/muqeem.svg',
    official_url: 'https://www.muqeem.sa',
    services_count: 5,
    verification_status: 'VERIFIED',
  },
  {
    id: 'mudad',
    slug: 'mudad',
    name_ar: 'منصة مدد',
    name_en: 'Mudad Platform',
    description_ar: 'المنظومة المالية الرسمية لبرنامج حماية الأجور وإدارة الرواتب.',
    logo_url: '/platforms/mudad.svg',
    official_url: 'https://www.mudad.com.sa',
    services_count: 3,
    verification_status: 'VERIFIED',
  },
  {
    id: 'musaned',
    slug: 'musaned',
    name_ar: 'منصة مساند',
    name_en: 'Musaned Platform',
    description_ar: 'البوابة الرسمية لخدمات استقدام وتوثيق ونقل خدمات العمالة المنزلية.',
    logo_url: '/platforms/musaned.svg',
    official_url: 'https://www.musaned.com.sa',
    services_count: 4,
    verification_status: 'VERIFIED',
  },
  {
    id: 'balady',
    slug: 'balady',
    name_ar: 'منصة بلدي',
    name_en: 'Balady Platform',
    description_ar: 'البوابة الوطنية لخدمات الرخص البلدية والشهادات الصحية والتجارية.',
    logo_url: '/platforms/balady.svg',
    official_url: 'https://www.balady.gov.sa',
    services_count: 4,
    verification_status: 'VERIFIED',
  },
  {
    id: 'salama',
    slug: 'salama',
    name_ar: 'منصة سلامة',
    name_en: 'Salama Portal',
    description_ar: 'بوابة خدمات تصاريح وترخيص الدفاع المدني للأنشطة والمنشآت.',
    logo_url: '/platforms/salama.svg',
    official_url: 'https://www.salamah.gov.sa',
    services_count: 2,
    verification_status: 'VERIFIED',
  },
  {
    id: 'zatca',
    slug: 'zatca',
    name_ar: 'هيئة الزكاة والضريبة والجمارك',
    name_en: 'ZATCA Portal',
    description_ar: 'بوابة الإقرارات الضريبية وضريبة القيمة المضافة والفوترة.',
    logo_url: '/platforms/zatca.svg',
    official_url: 'https://zatca.gov.sa',
    services_count: 3,
    verification_status: 'VERIFIED',
  },
];

export const SERVICES_DATA: Service[] = [
  {
    id: 'srv-iqama-renewal',
    slug: 'iqama-renewal',
    name_ar: 'تجديد الإقامة (هوية مقيم)',
    name_en: 'Iqama Renewal (Resident ID)',
    description_ar: 'خدمة تجديد هوية مقيم إلكترونياً للعاملين في القطاع الخاص والمنشآت أو العمالة المنزلية والتابعين.',
    category_id: 'passports-iqama',
    category_name_ar: 'الجوازات والإقامة',
    platform_id: 'absher',
    platform_name_ar: 'أبشر / مقيم',
    platform_url: 'https://www.absher.sa',
    entity_name_ar: 'المديرية العامة للجوازات',
    target_audience: 'RESIDENTS',
    target_audience_label: 'المقيمون وأصحاب العمل',
    processing_time: 'فوري (خلال دقائق من السداد)',
    application_method: 'إلكتروني بالكامل',
    official_url: 'https://www.absher.sa/portal/landing.html',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-15',
    featured: true,
    view_count: 14250,
    steps: [
      { step_number: 1, title_ar: 'سداد الرسوم الحكومية', description_ar: 'سداد رسوم التجديد ورخصة العمل عبر نظام المدفوعات الحكومية (سداد) في حسابك البنكي.' },
      { step_number: 2, title_ar: 'التحقق من التأمين والمخالفات', description_ar: 'التأكد من سريان التأمين الطبي المعتمد وسداد أي مخالفات مرورية مسجلة.' },
      { step_number: 3, title_ar: 'تسجيل الدخول للمنصة', description_ar: 'الدخول إلى منصة أبشر أفراد (للأفراد) أو بوابة مقيم / قوى (للمنشآت).' },
      { step_number: 4, title_ar: 'اختيار وتأكيد التجديد', description_ar: 'تحديد مدة التجديد (من 3 أشهر حتى سنة) ومراجعة البيانات وتأكيد التجديد الفوري.' }
    ],
    requirements: [
      { id: 'req-1', title_ar: 'جواز سفر ساري المفعول', is_mandatory: true },
      { id: 'req-2', title_ar: 'سداد رسوم تجديد الإقامة ورسوم رخصة العمل', is_mandatory: true },
      { id: 'req-3', title_ar: 'سداد المخالفات المرورية المسجلة على المقيم', is_mandatory: true },
      { id: 'req-4', title_ar: 'وجود تأمين طبي ساري ومربوط بمجلس الضمان الصحي', is_mandatory: true },
      { id: 'req-5', title_ar: 'ألا يكون العامل مسجلاً بحالة متغيب عن العمل', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم تجديد هوية مقيم (عامل منشأة)',
        amount: 650,
        currency: 'ريال سعودي',
        duration_unit: 'سنة',
        notes_ar: 'تضاف إليها رسوم رخصة العمل من وزارة الموارد البشرية بحسب تصنيف المنشأة.',
        source_name: 'المديرية العامة للجوازات',
        verified_at: '2026-09-15'
      },
      {
        id: 'fee-2',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم تجديد هوية مقيم (عمالة منزلية)',
        amount: 600,
        currency: 'ريال سعودي',
        duration_unit: 'سنة',
        notes_ar: 'تطبق على العمالة المنزلية المسجلة باسم رب الأسرة.',
        source_name: 'منصة أبشر',
        verified_at: '2026-09-15'
      }
    ],
    sources: [
      {
        source_name: 'بوابة المديرية العامة للجوازات',
        source_url: 'https://www.gdp.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-15',
        confidence: 'HIGH'
      }
    ],
    faqs: [
      { question_ar: 'هل يمكن تجديد الإقامة قبل انتهائها بعدة أشهر؟', answer_ar: 'نعم، يتيح النظام تجديد الإقامة قبل انتهائها بمدة تصل إلى 6 أشهر، كما يتوفر خيار التجديد الربع سنوي (3، 6، 9، 12 شهراً).' },
      { question_ar: 'ما هي غرامة تأخير تجديد الإقامة؟', answer_ar: 'تبلغ غرامة تأخير تجديد الإقامة 500 ريال للمرة الأولى بعد انقضاء مهلة السماح (3 أيام من تاريخ الانتهاء)، و1000 ريال في حال التكرار.' }
    ]
  },
  {
    id: 'srv-service-transfer',
    slug: 'service-transfer-qiwa',
    name_ar: 'نقل الخدمات وتغيير صاحب العمل',
    name_en: 'Transfer of Employee Services (Qiwa)',
    description_ar: 'خدمة نقل خدمات الموظف غير السعودي من منشأة إلى منشأة أخرى عبر منصة قوى وفق لوائح وزارة الموارد البشرية.',
    category_id: 'labor-qiwa',
    category_name_ar: 'العمل والموارد البشرية',
    platform_id: 'qiwa',
    platform_name_ar: 'منصة قوى',
    platform_url: 'https://www.qiwa.sa',
    entity_name_ar: 'وزارة الموارد البشرية والتنمية الاجتماعية',
    target_audience: 'RESIDENTS',
    target_audience_label: 'المقيمون وأصحاب الأعمال',
    processing_time: '7 إلى 14 يوم عمل',
    application_method: 'إلكتروني عبر منصة قوى',
    official_url: 'https://www.qiwa.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-20',
    featured: true,
    view_count: 18920,
    steps: [
      { step_number: 1, title_ar: 'إنشاء طلب النقل', description_ar: 'يقوم صاحب العمل الجديد بتقديم طلب نقل خدمة الموظف عبر حسابه في منصة قوى.' },
      { step_number: 2, title_ar: 'إنشاء وتوثيق عقد العمل', description_ar: 'يقوم صاحب العمل الجديد بإدخال بنود العقد الرقمي الجديد وإرساله للموظف.' },
      { step_number: 3, title_ar: 'موافقة الموظف', description_ar: 'يدخل الموظف على حسابه الشخصي في قوى ويقوم بالاطلاع على العقد والموافقة عليه خلال 10 أيام.' },
      { step_number: 4, title_ar: 'إشعار الكفيل الحالي وسداد الرسوم', description_ar: 'إشعار صاحب العمل الحالي وإكمال فترة الإشعار أو الانتقال المباشر إن توافرت شروط النقل التلقائي، ثم سداد الرسوم عبر الجوازات.' }
    ],
    requirements: [
      { id: 'req-trans-1', title_ar: 'أن تكون رخصة إقامة الموظف سارية أو منتهية دون قيود نظامية', is_mandatory: true },
      { id: 'req-trans-2', title_ar: 'التزام المنشأة الجديدة ببرنامج حماية الأجور ونطاق المنشأة الآمن (أخضر فما فوق)', is_mandatory: true },
      { id: 'req-trans-3', title_ar: 'موافقة الموظف الصريحة على العقد الرقمي عبر منصة قوى', is_mandatory: true },
      { id: 'req-trans-4', title_ar: 'سداد المقابل المالي لرسوم نقل الخدمات المقررة من وزارة الداخلية', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-trans-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم نقل الخدمات للمرة الأولى',
        amount: 2000,
        currency: 'ريال سعودي',
        source_name: 'المديرية العامة للجوازات',
        verified_at: '2026-09-20'
      },
      {
        id: 'fee-trans-2',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم نقل الخدمات للمرة الثانية',
        amount: 4000,
        currency: 'ريال سعودي',
        source_name: 'المديرية العامة للجوازات',
        verified_at: '2026-09-20'
      },
      {
        id: 'fee-trans-3',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم نقل الخدمات للمرة الثالثة فأكثر',
        amount: 6000,
        currency: 'ريال سعودي',
        source_name: 'المديرية العامة للجوازات',
        verified_at: '2026-09-20'
      }
    ],
    sources: [
      {
        source_name: 'منصة قوى الرسمية - لوائح نقل الخدمات',
        source_url: 'https://www.qiwa.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-20',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-family-visit',
    slug: 'family-visit-visa',
    name_ar: 'طلب تأشيرة زيارة عائلية',
    name_en: 'Family Visit Visa Application',
    description_ar: 'طلب استقدام الزوجة والأبناء والوالدين للمقيمين النظاميين في المملكة عبر منصة التأشيرات بوزارة الخارجية.',
    category_id: 'visas-visits',
    category_name_ar: 'الزيارات والتأشيرات',
    platform_id: 'absher',
    platform_name_ar: 'منصة التأشيرات (وزارة الخارجية)',
    platform_url: 'https://visa.mofa.gov.sa',
    entity_name_ar: 'وزارة الخارجية',
    target_audience: 'FAMILIES',
    target_audience_label: 'عائلات المقيمين',
    processing_time: '3 إلى 5 أيام عمل',
    application_method: 'إلكتروني عبر منصة التأشيرات',
    official_url: 'https://visa.mofa.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-18',
    featured: true,
    view_count: 22100,
    steps: [
      { step_number: 1, title_ar: 'تعبئة نموذج الطلب', description_ar: 'الدخول إلى منصة التأشيرات التابعة لوزارة الخارجية وتعبئة بيانات المقيم وبيانات الزائرين بدقة مطابقة لجواز السفر.' },
      { step_number: 2, title_ar: 'تصديق الطلب إلكترونياً', description_ar: 'تصديق الطلب من الغرفة التجارية أو عبر جهة العمل المسجل بها المقيم.' },
      { step_number: 3, title_ar: 'متابعة صدور المستند', description_ar: 'متابعة الطلب برقم الطلب ورقم الإقامة حتى ظهور مستند التأشيرة المعتمد.' },
      { step_number: 4, title_ar: 'إكمال الإجراءات وسداد الرسوم', description_ar: 'إرسال مستند التأشيرة للزائر لعمل الفحص الطبي وسداد رسوم التأشيرة والتأمين.' }
    ],
    requirements: [
      { id: 'req-visit-1', title_ar: 'إقامة نظامية وسارية المفعول لطالب الزيارة لمدة لا تقل عن 3 أشهر', is_mandatory: true },
      { id: 'req-visit-2', title_ar: 'أن تكون صلة القرابة من الدرجة الأولى (الوالدين، الزوجة، الأبناء)', is_mandatory: true },
      { id: 'req-visit-3', title_ar: 'جواز سفر ساري المفعول للزائر لمدة لا تقل عن 6 أشهر', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-visit-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم التأشيرة الحكومية (للسفرة الواحدة / 90 يوماً)',
        amount: 300,
        currency: 'ريال سعودي',
        source_name: 'وزارة الخارجية',
        verified_at: '2026-09-18'
      },
      {
        id: 'fee-visit-2',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم التأشيرة المتعددة (لمدة سنة مع إقامة متقطعة)',
        amount: 300,
        currency: 'ريال سعودي',
        notes_ar: 'يضاف إليها رسم التأمين الطبي الإلزامي بحسب العمر وشركة التأمين.',
        source_name: 'وزارة الخارجية',
        verified_at: '2026-09-18'
      }
    ],
    sources: [
      {
        source_name: 'منصة خدمات التأشيرات الإلكترونية - وزارة الخارجية',
        source_url: 'https://visa.mofa.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-18',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-wage-mudad',
    slug: 'mudad-wage-protection',
    name_ar: 'إدارة الرواتب وحماية الأجور (مدد)',
    name_en: 'Wage Protection System (Mudad)',
    description_ar: 'التسجيل في منصة مدد ورفع ملفات صرف الأجور الشهرية لتفادي إيقاف الخدمات وتجنب مخالفات نظام العمل.',
    category_id: 'wage-protection',
    category_name_ar: 'حماية الأجور والرواتب',
    platform_id: 'mudad',
    platform_name_ar: 'منصة مدد',
    platform_url: 'https://www.mudad.com.sa',
    entity_name_ar: 'وزارة الموارد البشرية والبنك المركزي السعودي',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'المنشآت وأصحاب الأعمال',
    processing_time: 'شهرياً خلال أول 10 أيام من الشهر',
    application_method: 'إلكتروني عبر منصة مدد',
    official_url: 'https://www.mudad.com.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-10',
    featured: false,
    view_count: 8400,
    steps: [
      { step_number: 1, title_ar: 'ربط الحساب البنكي التجاري', description_ar: 'تسجيل الدخول في مدد والربط مع الحساب البنكي التجاري المعتمد للمنشأة.' },
      { step_number: 2, title_ar: 'إعداد ملف الرواتب (WIF)', description_ar: 'تجهيز مسير الرواتب بما يتطابق تماماً مع العقود الموثقة في منصة قوى.' },
      { step_number: 3, title_ar: 'تحويل الأجور', description_ar: 'إجراء الحوالة الشهرية واعتماد الصرف عبر نظام حماية الأجور في مدد.' },
      { step_number: 4, title_ar: 'معالجة التبريرات إن وجدت', description_ar: 'الرد على أي تنبيهات أو فروقات في الراتب وتقديم التبرير القانوني خلال المهلة النظامية.' }
    ],
    requirements: [
      { id: 'req-mudad-1', title_ar: 'سجل تجاري ساري المفعول للمنشأة', is_mandatory: true },
      { id: 'req-mudad-2', title_ar: 'حساب بنكي نشط ومفعل لدى أحد البنوك السعودية المعتمدة', is_mandatory: true },
      { id: 'req-mudad-3', title_ar: 'توثيق كافة عقود العاملين في منصة قوى', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-mudad-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'اشتراك نظام حماية الأجور (نظام الالتزام)',
        amount: 460,
        currency: 'ريال سعودي',
        duration_unit: 'سنة',
        notes_ar: 'تختلف رسوم باقة إدارة الرواتب بحسب حجم المنشأة وعدد العاملين.',
        source_name: 'منصة مدد الرسمية',
        verified_at: '2026-09-10'
      }
    ],
    sources: [
      {
        source_name: 'منصة مدد المالية لحماية الأجور',
        source_url: 'https://www.mudad.com.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-10',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-business-setup',
    slug: 'business-setup-saudi',
    name_ar: 'تأسيس الأعمال والاستثمار التجاري',
    name_en: 'Business Setup & Investment in KSA',
    description_ar: 'دليل خطوات تأسيس المؤسسات والشركات، وتراخيص وزارة الاستثمار (MISA) وتأسيس الكيانات التجارية للأجانب والمقيمين.',
    category_id: 'business-setup',
    category_name_ar: 'تأسيس الأعمال والاستثمار',
    platform_id: 'qiwa',
    platform_name_ar: 'المركز السعودي للأعمال / وزارة التجارة',
    platform_url: 'https://www.business.gov.sa',
    entity_name_ar: 'المركز السعودي للأعمال ووزارة الاستثمار',
    target_audience: 'INVESTORS',
    target_audience_label: 'المستثمرون ورواد الأعمال',
    processing_time: '1 إلى 3 أيام عمل للسجل التجاري',
    application_method: 'إلكتروني عبر منصة الأعمال الموحدة',
    official_url: 'https://www.business.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-12',
    featured: true,
    view_count: 11400,
    steps: [
      { step_number: 1, title_ar: 'حجز الاسم التجاري', description_ar: 'التحقق من توفر الاسم التجاري وحجزه إلكترونياً عبر بوابة وزارة التجارة.' },
      { step_number: 2, title_ar: 'إصدار السجل التجاري وعقد التأسيس', description_ar: 'تحديد الأنشطة الاقتصادية وتوثيق عقد التأسيس وسداد فاتورة السداد الموحدة.' },
      { step_number: 3, title_ar: 'الربط التلقائي بالغرف التجارية والزكاة', description_ar: 'تفعيل الاشتراك بالغرفة التجارية والتسجيل في هيئة الزكاة والضريبة والجمارك تلقائياً.' },
      { step_number: 4, title_ar: 'إصدار الرخص البلدية وفتح ملف العمل', description_ar: 'استخراج رخصة بلدي لموقع المنشأة وتفعيل ملف العمل في منصة قوى والتأمينات.' }
    ],
    requirements: [
      { id: 'req-biz-1', title_ar: 'هوية مقيم سارية أو رخصة استثمار للمستثمر الأجنبي', is_mandatory: true },
      { id: 'req-biz-2', title_ar: 'عقد إيجار تجاري إلكتروني (إيجار) لمقر النشاط إن تطلب النشاط موقعاً', is_mandatory: false },
      { id: 'req-biz-3', title_ar: 'حساب بنكي تجاري يتم فتحه فور استخراج السجل', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-biz-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم إصدار السجل التجاري الرئيسي (سنة)',
        amount: 200,
        currency: 'ريال سعودي',
        duration_unit: 'سنة',
        notes_ar: 'تضاف رسوم الغرفة التجارية بحسب الدرجة وتصنيف النشاط.',
        source_name: 'وزارة التجارة',
        verified_at: '2026-09-12'
      }
    ],
    sources: [
      {
        source_name: 'المركز السعودي للأعمال - منصة الأعمال الموحدة',
        source_url: 'https://www.business.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-12',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-exit-reentry',
    slug: 'exit-reentry-visa',
    name_ar: 'تأشيرة الخروج والعودة',
    name_en: 'Exit and Re-entry Visa',
    description_ar: 'إصدار وتمديد تأشيرة الخروج والعودة المفردة والمتعددة للمقيم والتابعين عبر منصة أبشر ومقيم.',
    category_id: 'passports-iqama',
    category_name_ar: 'الجوازات والإقامة',
    platform_id: 'absher',
    platform_name_ar: 'أبشر / مقيم',
    platform_url: 'https://www.absher.sa',
    entity_name_ar: 'المديرية العامة للجوازات',
    target_audience: 'RESIDENTS',
    target_audience_label: 'المقيمون وأصحاب الأعمال',
    processing_time: 'فوري (إلكتروني)',
    application_method: 'إلكتروني عبر أبشر / مقيم',
    official_url: 'https://www.absher.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-14',
    featured: false,
    view_count: 15300,
    steps: [
      { step_number: 1, title_ar: 'سداد رسوم التأشيرة عبر سداد', description_ar: 'الدخول للحساب البنكي وسداد رسوم تأشيرة الخروج والعودة المقررة.' },
      { step_number: 2, title_ar: 'الدخول لمنصة أبشر', description_ar: 'الانتقال إلى خدمات المقيمين ثم اختيار خدمات التأشيرات.' },
      { step_number: 3, title_ar: 'تحديد نوع التأشيرة والمدة', description_ar: 'اختيار مفردة أو متعددة وتحديد تاريخ العودة قبل انتهاء الإقامة وجواز السفر.' },
      { step_number: 4, title_ar: 'طباعة التأشيرة', description_ar: 'تأكيد العملية وطباعة إشعار التأشيرة أو حفظه رقمياً.' }
    ],
    requirements: [
      { id: 'req-exit-1', title_ar: 'سريان هوية مقيم بمدة تغطي مدة التأشيرة المطلوبة', is_mandatory: true },
      { id: 'req-exit-2', title_ar: 'سريان جواز السفر بمدة لا تقل عن 90 يوماً للمفردة و3 أشهر للمتعددة', is_mandatory: true },
      { id: 'req-exit-3', title_ar: 'سداد جميع المخالفات المرورية', is_mandatory: true },
      { id: 'req-exit-4', title_ar: 'وجود المقيم داخل أراضي المملكة العربية السعودية وقت الإصدار', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-exit-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'تأشيرة مفردة (شهرين)',
        amount: 200,
        currency: 'ريال سعودي',
        notes_ar: '100 ريال إضافية عن كل شهر إضافي حتى تاريخ نهاية الإقامة.',
        source_name: 'المديرية العامة للجوازات',
        verified_at: '2026-09-14'
      },
      {
        id: 'fee-exit-2',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'تأشيرة متعددة (3 أشهر)',
        amount: 500,
        currency: 'ريال سعودي',
        notes_ar: '200 ريال إضافية عن كل شهر إضافي حتى نهاية الإقامة.',
        source_name: 'المديرية العامة للجوازات',
        verified_at: '2026-09-14'
      }
    ],
    sources: [
      {
        source_name: 'المديرية العامة للجوازات - تأشيرات السفر',
        source_url: 'https://www.gdp.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-14',
        confidence: 'HIGH'
      }
    ]
  },
  ...EXTENDED_SERVICES
];

export const UPDATES_DATA: ServiceUpdate[] = [
  {
    id: 'upd-1',
    title_ar: 'تحديث اشتراطات توثيق عقود العمل عبر قوى',
    summary_ar: 'أكدت وزارة الموارد البشرية على ضرورة توثيق 100% من عقود العاملين الوافدين لتفادي تعليق خدمات نقل الكفالة وإصدار رخص العمل.',
    source_name: 'وزارة الموارد البشرية',
    source_url: 'https://www.qiwa.sa',
    published_at: '2026-09-22',
    related_services: ['service-transfer-qiwa', 'iqama-renewal']
  },
  {
    id: 'upd-2',
    title_ar: 'إتاحة تجديد الإقامة وتأشيرات الخروج عبر سداد الربع سنوي',
    summary_ar: 'تذكير بإمكانية تجديد رخص العمل والإقامة لفترات مقسمة (3، 6، 9، أو 12 شهراً) بهدف تسهيل التدفقات المالية للمنشآت والمقيمين.',
    source_name: 'المديرية العامة للجوازات',
    source_url: 'https://www.absher.sa',
    published_at: '2026-09-19',
    related_services: ['iqama-renewal', 'exit-reentry-visa']
  }
];

export const OFFICES_DATA: Office[] = [
  {
    id: 'off-1',
    name_ar: 'مكتب الوفاق للخدمات العامة والتعقيب',
    city_ar: 'الرياض',
    district_ar: 'حي الملز',
    services_offered: ['تجديد الإقامات', 'نقل الخدمات', 'تأشيرات الزيارة', 'تأسيس المنشآت'],
    phone: '0551234567',
    whatsapp: '966551234567',
    is_verified: true,
    rating_avg: 4.8,
    reviews_count: 42
  },
  {
    id: 'off-2',
    name_ar: 'مكتب التيسير لإنجاز المعاملات الحكومية',
    city_ar: 'جدة',
    district_ar: 'حي الشرفية',
    services_offered: ['خدمات الجوازات', 'منصة قوى', 'رخص العمل', 'تصاديق الغرفة التجارية'],
    phone: '0509876543',
    whatsapp: '966509876543',
    is_verified: true,
    rating_avg: 4.7,
    reviews_count: 36
  },
  {
    id: 'off-3',
    name_ar: 'مكتب الإنجاز للخدمات الإلكترونية',
    city_ar: 'الدمام',
    district_ar: 'حي السوق',
    services_offered: ['تأشيرات الزيارة العائلية', 'حماية الأجور (مدد)', 'خدمات التأمينات'],
    phone: '0543216789',
    whatsapp: '966543216789',
    is_verified: true,
    rating_avg: 4.6,
    reviews_count: 28
  }
];

export const EMERGENCY_NUMBERS = [
  { number: '999', name_ar: 'الشرطة', desc_ar: 'البلاغات الأمنية والجنائية' },
  { number: '993', name_ar: 'المرور', desc_ar: 'الحوادث والبلاغات المرورية' },
  { number: '997', name_ar: 'الهلال الأحمر', desc_ar: 'الإسعاف والحالات الطبية الطارئة' },
  { number: '998', name_ar: 'الدفاع المدني', desc_ar: 'الحرائق والإنقاذ والسلامة' },
  { number: '992', name_ar: 'الجوازات', desc_ar: 'الاستفسارات وبلاغات الجوازات' },
  { number: '19911', name_ar: 'وزارة الموارد البشرية', desc_ar: 'الشكاوى العمالية وبلاغات العمل' }
];
