import { Service } from '@/types';

export const EXTENDED_SERVICES: Service[] = [
  // ==========================================
  // 1. خدمات التعقيب وفك الملاحظات (14 خدمة)
  // ==========================================
  {
    id: 'srv-red-nitaqat',
    slug: 'red-nitaqat-work-permit',
    name_ar: 'إصدار كروت عمل نطاق أحمر',
    name_en: 'Red Nitaqat Work Permits Issuance',
    description_ar: 'خدمة التعقيب ومعالجة كروت ورخص العمل للمنشآت الواقعة بالنطاق الأحمر وفق الأطر الاستثنائية والمهل التصحيحية المعتمدة.',
    category_id: 'taqeeb-notes',
    category_name_ar: 'التعقيب وفك الملاحظات',
    platform_id: 'qiwa',
    platform_name_ar: 'منصة قوى / مكتب العمل',
    platform_url: 'https://www.qiwa.sa',
    entity_name_ar: 'وزارة الموارد البشرية والتنمية الاجتماعية',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'أصحاب المنشآت والشركات',
    processing_time: '24 إلى 48 ساعة',
    application_method: 'معالجة إلكترونية وتنسيق تعقيب رسمي',
    official_url: 'https://www.qiwa.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-25',
    featured: true,
    view_count: 15400,
    steps: [
      { step_number: 1, title_ar: 'تدقيق حالة النطاق', description_ar: 'فحص ملف المنشأة في قوى ومعرفة أسباب الهبوط للنطاق الأحمر وعدد العمالة المعلقة.' },
      { step_number: 2, title_ar: 'إعداد الخطة التصحيحية', description_ar: 'تحديد آليات السداد أو النقل أو الاستثناء النظامي لإصدار كرت العمل.' },
      { step_number: 3, title_ar: 'إصدار سداد رخصة العمل', description_ar: 'توليد رقم سداد رخصة العمل وإتاحة التجديد للمقيم.' }
    ],
    requirements: [
      { id: 'req-rn-1', title_ar: 'سجل تجاري ساري أو تحت التصحيح', is_mandatory: true },
      { id: 'req-rn-2', title_ar: 'بيانات العامل ورقم الإقامة أو الحدود', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-rn-1',
        fee_type: 'OFFICE_ESTIMATED',
        title_ar: 'أتعاب الإنجاز والتعقيب',
        amount: 850,
        currency: 'ريال سعودي',
        source_name: 'مكاتب التعقيب المعتمدة',
        verified_at: '2026-09-25',
        notes_ar: 'تختلف حسب حالة الملف وتضاف للرسوم الحكومية المقررة بسداد.'
      }
    ],
    sources: [
      {
        source_name: 'منصة قوى - برنامج نطاقات المطور',
        source_url: 'https://www.qiwa.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-25',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-change-qiwa-activity',
    slug: 'change-qiwa-activity',
    name_ar: 'تغيير نشاط المنشأة في منصة قوى',
    name_en: 'Change Facility Activity in Qiwa',
    description_ar: 'تعديل النشاط الاقتصادي الرئيسي أو الفرعي للمنشأة في منصة قوى لمطابقة السجل التجاري وتحسين نسبة التوطين المطلوبة.',
    category_id: 'taqeeb-notes',
    category_name_ar: 'التعقيب وفك الملاحظات',
    platform_id: 'qiwa',
    platform_name_ar: 'منصة قوى',
    platform_url: 'https://www.qiwa.sa',
    entity_name_ar: 'وزارة الموارد البشرية',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'أصحاب المنشآت',
    processing_time: '1 إلى 3 أيام عمل',
    application_method: 'إلكتروني عبر منصة قوى',
    official_url: 'https://www.qiwa.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-24',
    featured: true,
    view_count: 9800,
    steps: [
      { step_number: 1, title_ar: 'تطابق السجل التجاري', description_ar: 'التأكد من تعديل النشاط مسبقاً في السجل التجاري لدى وزارة التجارة.' },
      { step_number: 2, title_ar: 'تقديم طلب التعديل بقوى', description_ar: 'اختيار النشاط الجديد من قائمة الأنشطة الاقتصادية المعتمدة (ISIC4).' },
      { step_number: 3, title_ar: 'إعادة احتساب نسب التوطين', description_ar: 'اعتماد الطلب وانعكاس نسبة التوطين الجديدة تلقائياً في الملف.' }
    ],
    requirements: [
      { id: 'req-ca-1', title_ar: 'سجل تجاري محدث بالنشاط الجديد', is_mandatory: true },
      { id: 'req-ca-2', title_ar: 'عدم وجود ملاحظات إيقاف خدمات معلقة', is_mandatory: false }
    ],
    fees: [
      {
        id: 'fee-ca-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم تعديل بيانات المنشأة',
        amount: 0,
        currency: 'ريال سعودي',
        source_name: 'منصة قوى',
        verified_at: '2026-09-24',
        notes_ar: 'الخدمة مجانية حكومياً.'
      }
    ],
    sources: [
      {
        source_name: 'وزارة الموارد البشرية - دليل خدمات قوى',
        source_url: 'https://www.qiwa.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-24',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-domestic-visa',
    slug: 'domestic-worker-visa',
    name_ar: 'إصدار تأشيرة عمالة منزلية (مساند)',
    name_en: 'Domestic Worker Visa Issuance (Musaned)',
    description_ar: 'إصدار تأشيرات استقدام العمالة المنزلية والسائقين الخاصين للمواطنين والمقيمين المؤهلين نظامياً عبر منصة مساند.',
    category_id: 'taqeeb-notes',
    category_name_ar: 'التعقيب وفك الملاحظات',
    platform_id: 'musaned',
    platform_name_ar: 'منصة مساند',
    platform_url: 'https://www.musaned.com.sa',
    entity_name_ar: 'وزارة الموارد البشرية',
    target_audience: 'RESIDENTS',
    target_audience_label: 'الأفراد والأسر',
    processing_time: '24 ساعة من إثبات القدرة المالية',
    application_method: 'إلكتروني عبر منصة مساند',
    official_url: 'https://www.musaned.com.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-22',
    featured: true,
    view_count: 18200,
    steps: [
      { step_number: 1, title_ar: 'إثبات القدرة المالية', description_ar: 'إرفاق تعريف بالراتب أو كشف حساب بنكي يغطي معايير الاستقدام المقررة.' },
      { step_number: 2, title_ar: 'سداد رسم التأشيرة', description_ar: 'سداد مبلغ 2000 ريال عبر سداد لحساب وزارة الداخلية.' },
      { step_number: 3, title_ar: 'رفع الطلب واختيار الجنسية', description_ar: 'تحديد مهنة العامل وجنسيته وإصدار التأشيرة الفورية.' }
    ],
    requirements: [
      { id: 'req-dv-1', title_ar: 'إقامة سارية للمقيم مع حد أدنى للراتب الشهري', is_mandatory: true },
      { id: 'req-dv-2', title_ar: 'سداد رسوم التأشيرة عبر سداد (2000 ريال)', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-dv-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم التأشيرة الحكومية',
        amount: 2000,
        currency: 'ريال سعودي',
        source_name: 'وزارة الداخلية - سداد',
        verified_at: '2026-09-22'
      }
    ],
    sources: [
      {
        source_name: 'بوابة مساند للعمالة المنزلية',
        source_url: 'https://www.musaned.com.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-22',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-chamber-contracts',
    slug: 'chamber-attested-contracts',
    name_ar: 'عقود عمل مصدقة من الغرفة التجارية',
    name_en: 'Chamber of Commerce Attested Contracts',
    description_ar: 'تصديق ومطابقة عقود العمل والخطابات الرسمية والتفاويض عبر الغرفة التجارية للمنشآت والشركات إلكترونياً.',
    category_id: 'taqeeb-notes',
    category_name_ar: 'التعقيب وفك الملاحظات',
    platform_id: 'absher',
    platform_name_ar: 'بوابة الغرف التجارية',
    platform_url: 'https://www.coc.org.sa',
    entity_name_ar: 'اتحاد الغرف السعودية',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'الشركات والمنشآت',
    processing_time: 'فوري (إلكتروني)',
    application_method: 'إلكتروني عبر بوابة الغرفة التجارية التابعة للمنشأة',
    official_url: 'https://www.coc.org.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-20',
    featured: false,
    view_count: 6700,
    steps: [
      { step_number: 1, title_ar: 'إنشاء وتجهيز صيغة العقد', description_ar: 'إعداد صيغة العقد أو الخطاب على مطبوعات المنشأة الرسمية.' },
      { step_number: 2, title_ar: 'طلب التصديق الرقمي', description_ar: 'الدخول لبوابة الغرفة التجارية المختصة واختيار خدمة التصديق الإلكتروني.' },
      { step_number: 3, title_ar: 'خصم الرسوم واعتماد الوثيقة', description_ar: 'سداد الرسم وخصمه من المحفظة وتوليد رمز QR للتصديق المعتمد.' }
    ],
    requirements: [
      { id: 'req-cc-1', title_ar: 'اشتراك ساري في الغرفة التجارية', is_mandatory: true },
      { id: 'req-cc-2', title_ar: 'تطابق التوقيع الإلكتروني مع المفوض النظامي', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-cc-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم تصديق الورقة / المحرر',
        amount: 35,
        currency: 'ريال سعودي',
        source_name: 'الغرفة التجارية',
        verified_at: '2026-09-20'
      }
    ],
    sources: [
      {
        source_name: 'اتحاد الغرف السعودية',
        source_url: 'https://fsc.org.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-20',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-balady-health-card',
    slug: 'balady-health-certificates',
    name_ar: 'شهادات صحية وتنزيل في منصة بلدي',
    name_en: 'Balady Health Certificates & Linking',
    description_ar: 'إصدار وتجديد الشهادة الصحية وتنزيلها وربطها إلكترونياً عبر منصة بلدي للعاملين في المنشآت الغذائية، المطاعم، وصوالين الحلاقة.',
    category_id: 'taqeeb-notes',
    category_name_ar: 'التعقيب وفك الملاحظات',
    platform_id: 'balady',
    platform_name_ar: 'منصة بلدي',
    platform_url: 'https://www.balady.gov.sa',
    entity_name_ar: 'وزارة الشؤون البلدية والقروية والإسكان',
    target_audience: 'RESIDENTS',
    target_audience_label: 'المهنيون والعاملون بالأغذية والمشاغل',
    processing_time: '24 إلى 48 ساعة بعد الفحص',
    application_method: 'إلكتروني عبر منصة بلدي',
    official_url: 'https://www.balady.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-23',
    featured: true,
    view_count: 12900,
    steps: [
      { step_number: 1, title_ar: 'إجراء الفحص الطبي في مركز معتمد', description_ar: 'عمل تحاليل الدم والصدر المعتمدة وتأكيد خلو العامل من الأمراض السارية.' },
      { step_number: 2, title_ar: 'اجتياز التثقيف الصحي', description_ar: 'حضور برنامج التثقيف الصحي المقرر من الأمانة أو اجتياز الاختبار الرقمي.' },
      { step_number: 3, title_ar: 'سداد الرسوم وطباعة الشهادة', description_ar: 'سداد فاتورة سداد للبلدية وتنزيل الشهادة الصحية الذكية عبر بلدي.' }
    ],
    requirements: [
      { id: 'req-bh-1', title_ar: 'إقامة سارية المفعول برقم نظامي', is_mandatory: true },
      { id: 'req-bh-2', title_ar: 'مهنة مناسبة تتطلب شهادة صحية (طاهٍ، جزار، حلاق، إلخ)', is_mandatory: true },
      { id: 'req-bh-3', title_ar: 'فحص طبي ساري من مركز صحي معتمد', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-bh-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم إصدار الشهادة الصحية البلدية',
        amount: 60,
        currency: 'ريال سعودي',
        source_name: 'منصة بلدي',
        verified_at: '2026-09-23'
      }
    ],
    sources: [
      {
        source_name: 'بوابة بلدي - دليل الشهادات الصحية',
        source_url: 'https://www.balady.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-23',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-driver-card',
    slug: 'professional-driver-card',
    name_ar: 'إصدار بطاقة سائق مهني',
    name_en: 'Professional Driver Card Issuance',
    description_ar: 'إصدار بطاقة السائق المهني وبطاقة التشغيل لسائقي النقل الثقيل، الحافلات، والتوصيل عبر بوابة الهيئة العامة للنقل (وصل/نقل).',
    category_id: 'taqeeb-notes',
    category_name_ar: 'التعقيب وفك الملاحظات',
    platform_id: 'absher',
    platform_name_ar: 'بوابة الهيئة العامة للنقل (بوابة نقل)',
    platform_url: 'https://www.tga.gov.sa',
    entity_name_ar: 'الهيئة العامة للنقل',
    target_audience: 'RESIDENTS',
    target_audience_label: 'السائقون والمؤسسات النقليات',
    processing_time: 'فوري إلى 24 ساعة',
    application_method: 'إلكتروني عبر بوابة نقل',
    official_url: 'https://www.tga.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-21',
    featured: false,
    view_count: 5400,
    steps: [
      { step_number: 1, title_ar: 'التحقق من رخصة القيادة', description_ar: 'التأكد من سريان رخصة القيادة العمومية المناسبة لنوع المركبة.' },
      { step_number: 2, title_ar: 'الفحص الطبي المعتمد للسائقين', description_ar: 'إجراء فحص اللياقة المعتمد وربطه بنظام الهيئة.' },
      { step_number: 3, title_ar: 'إصدار وسداد البطاقة', description_ar: 'تقديم الطلب في بوابة نقل وسداد الرسوم وطباعة البطاقة الذكية.' }
    ],
    requirements: [
      { id: 'req-dc-1', title_ar: 'رخصة قيادة عمومي سارية المفعول', is_mandatory: true },
      { id: 'req-dc-2', title_ar: 'فحص سموم ولياقة ساري ومسجل بالنظام', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-dc-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم بطاقة سائق مهني سنوية',
        amount: 100,
        currency: 'ريال سعودي',
        source_name: 'الهيئة العامة للنقل',
        verified_at: '2026-09-21'
      }
    ],
    sources: [
      {
        source_name: 'الهيئة العامة للنقل - بوابة نقل الإلكترونية',
        source_url: 'https://tga.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-21',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-clear-cr-notes',
    slug: 'clear-cr-notes',
    name_ar: 'فك ملاحظة السجل التجاري',
    name_en: 'Clear Commercial Registration (CR) Notes',
    description_ar: 'معالجة القيود والملاحظات المسجلة على السجل التجاري لدى وزارة التجارة وتعديل البيانات أو شطب المخالفات العالقة.',
    category_id: 'taqeeb-notes',
    category_name_ar: 'التعقيب وفك الملاحظات',
    platform_id: 'absher',
    platform_name_ar: 'بوابة المركز السعودي للأعمال / وزارة التجارة',
    platform_url: 'https://mc.gov.sa',
    entity_name_ar: 'وزارة التجارة والمركز السعودي للأعمال',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'الشركات والمؤسسات',
    processing_time: '24 إلى 72 ساعة',
    application_method: 'إلكتروني ومراجعة تدقيق تعقيب معتمد',
    official_url: 'https://mc.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-22',
    featured: true,
    view_count: 8900,
    steps: [
      { step_number: 1, title_ar: 'تحديد نوع الملاحظة ومصدرها', description_ar: 'معرفة ما إذا كانت الملاحظة لانتهاء السجل، أو نقص وثائق، أو مخالفة نظامية.' },
      { step_number: 2, title_ar: 'استكمال المسوغات وتحديث البيانات', description_ar: 'إرفاق المستندات المطلوبة أو تعديل الاسم والمديرين أو النشاط.' },
      { step_number: 3, title_ar: 'إلغاء الملاحظة وإعادة تفعيل السجل', description_ar: 'سداد رسوم التجديد إن وجدت ورفع القيد وتنشيط السجل في كافة البوابات.' }
    ],
    requirements: [
      { id: 'req-ccr-1', title_ar: 'رقم السجل التجاري وبيانات المالك / المفوض', is_mandatory: true },
      { id: 'req-ccr-2', title_ar: 'إرفاق سبب الملاحظة إن وجد إشعار مسبق', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-ccr-1',
        fee_type: 'OFFICE_ESTIMATED',
        title_ar: 'أتعاب معالجة وتدقيق الملاحظة',
        amount: 600,
        currency: 'ريال سعودي',
        source_name: 'مكتب خدمات معتمد',
        verified_at: '2026-09-22'
      }
    ],
    sources: [
      {
        source_name: 'وزارة التجارة - دليل خدمات السجل التجاري',
        source_url: 'https://mc.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-22',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-clear-wage-notes',
    slug: 'clear-wage-protection-notes',
    name_ar: 'فك ملاحظة حماية الأجور (مدد)',
    name_en: 'Clear Wage Protection Notes (Mudad)',
    description_ar: 'معالجة ملاحظات نسب الالتزام في برنامج حماية الأجور، رفع تبريرات الرواتب المتأخرة، وفك إيقاف الخدمات التابع لوزارة الموارد.',
    category_id: 'taqeeb-notes',
    category_name_ar: 'التعقيب وفك الملاحظات',
    platform_id: 'mudad',
    platform_name_ar: 'منصة مدد / حماية الأجور',
    platform_url: 'https://www.mudad.com.sa',
    entity_name_ar: 'وزارة الموارد البشرية والبنك المركزي',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'المنشآت وأصحاب العمل',
    processing_time: '24 إلى 48 ساعة بعد قبول التبريرات',
    application_method: 'إلكتروني عبر منصة مدد',
    official_url: 'https://www.mudad.com.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-25',
    featured: true,
    view_count: 14700,
    steps: [
      { step_number: 1, title_ar: 'حصر شهور عدم الالتزام', description_ar: 'تحديد الأشهر التي تقل فيها نسبة الالتزام عن 80% أو الموظفين المتأخر صرفهم.' },
      { step_number: 2, title_ar: 'رفع ملفات صرف مستحقات وتبريرات', description_ar: 'تقديم الإثباتات البنكية أو تبرير الإجازات والخصومات النظامية.' },
      { step_number: 3, title_ar: 'رفع القيد واستعادة الخدمات', description_ar: 'اعتماد التبريرات وارتفاع مؤشر الالتزام تلقائياً وفك إيقاف رخص العمل.' }
    ],
    requirements: [
      { id: 'req-wp-1', title_ar: 'كشوفات صرف الرواتب أو حوالات بنكية مطابقة', is_mandatory: true },
      { id: 'req-wp-2', title_ar: 'توثيق عقود الموظفين في قوى', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-wp-1',
        fee_type: 'OFFICE_ESTIMATED',
        title_ar: 'أتعاب معالجة ومطابقة مدد',
        amount: 750,
        currency: 'ريال سعودي',
        source_name: 'مكاتب استشارات الموارد البشرية والتعقيب',
        verified_at: '2026-09-25'
      }
    ],
    sources: [
      {
        source_name: 'منصة مدد - لوائح حماية الأجور',
        source_url: 'https://mudad.com.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-25',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-clear-self-evaluation',
    slug: 'clear-self-evaluation-notes',
    name_ar: 'فك ملاحظة التقييم الذاتي للمنشآت',
    name_en: 'Clear Self-Evaluation Notes (Qiwa)',
    description_ar: 'إنجاز التقييم الذاتي الإلزامي للمنشآت في منصة قوى وفك إيقاف الخدمات الناتجة عن تخلف المنشأة عن الموعد السنوي.',
    category_id: 'taqeeb-notes',
    category_name_ar: 'التعقيب وفك الملاحظات',
    platform_id: 'qiwa',
    platform_name_ar: 'منصة قوى',
    platform_url: 'https://www.qiwa.sa',
    entity_name_ar: 'وزارة الموارد البشرية والتنمية الاجتماعية',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'المنشآت بجميع أحجامها',
    processing_time: 'ساعتان إلى 24 ساعة',
    application_method: 'إلكتروني عبر منصة قوى',
    official_url: 'https://www.qiwa.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-21',
    featured: false,
    view_count: 6100,
    steps: [
      { step_number: 1, title_ar: 'فحص معايير الامتثال', description_ar: 'مراجعة متطلبات بيئة العمل، اللائحة التنظيمية، وتوثيق العقود.' },
      { step_number: 2, title_ar: 'تعبئة استبيان التقييم الذاتي', description_ar: 'الإجابة الدقيقة على الأسئلة وإرفاق الأدلة الداعمة.' },
      { step_number: 3, title_ar: 'إصدار شهادة الامتثال الفورية', description_ar: 'اعتماد النتيجة وتحديث حالة التقييم إلى (ملتزم) ورفع التعليق فوراً.' }
    ],
    requirements: [
      { id: 'req-se-1', title_ar: 'حساب مفوض في منصة قوى أعمال', is_mandatory: true },
      { id: 'req-se-2', title_ar: 'لوائح العمل الداخلية معتمدة إلكترونياً', is_mandatory: false }
    ],
    fees: [
      {
        id: 'fee-se-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم خدمة التقييم الذاتي الحكومية',
        amount: 0,
        currency: 'ريال سعودي',
        source_name: 'منصة قوى',
        verified_at: '2026-09-21',
        notes_ar: 'الخدمة مجانية بالكامل من وزارة الموارد.'
      }
    ],
    sources: [
      {
        source_name: 'منصة قوى - برنامج التقييم الذاتي',
        source_url: 'https://qiwa.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-21',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-clear-professions-ratio',
    slug: 'clear-professions-ratio-notes',
    name_ar: 'فك ملاحظة وتعديل نسبة المهن',
    name_en: 'Clear Professions Ratio & Saudization Notes',
    description_ar: 'معالجة قيود وملاحظات نسب المهن المقيدة أو المقصورة وتعديل المهن للموظفين لتتوافق مع متطلبات التوطين القطاعي.',
    category_id: 'taqeeb-notes',
    category_name_ar: 'التعقيب وفك الملاحظات',
    platform_id: 'qiwa',
    platform_name_ar: 'منصة قوى',
    platform_url: 'https://www.qiwa.sa',
    entity_name_ar: 'وزارة الموارد البشرية',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'المنشآت والشركات',
    processing_time: '1 إلى 3 أيام عمل',
    application_method: 'إلكتروني عبر منصة قوى',
    official_url: 'https://www.qiwa.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-24',
    featured: false,
    view_count: 5800,
    steps: [
      { step_number: 1, title_ar: 'تدقيق المهن المسجلة', description_ar: 'فحص مصفوفة مهن العاملين ومقارنتها بالقرارات الوزارية للتوطين.' },
      { step_number: 2, title_ar: 'تقديم طلب تعديل المهن', description_ar: 'رفع طلب تغيير مسمى المهنة لمهنة متوافقة نظامياً وتعديل العقد.' },
      { step_number: 3, title_ar: 'إسقاط الملاحظة', description_ar: 'تحديث سجلات التأمينات وقوى وسداد الرسوم المقررة في الجوازات.' }
    ],
    requirements: [
      { id: 'req-pr-1', title_ar: 'مؤهل أو شهادة فحص مهني مناسبة للمهنة الجديدة', is_mandatory: true },
      { id: 'req-pr-2', title_ar: 'سداد رسوم تعديل المهنة بالجوازات (1000 ريال)', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-pr-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم تعديل المهنة بالجوازات',
        amount: 1000,
        currency: 'ريال سعودي',
        source_name: 'الجوازات السعودية',
        verified_at: '2026-09-24'
      }
    ],
    sources: [
      {
        source_name: 'وزارة الموارد البشرية - دليل التوطين القطاعي',
        source_url: 'https://hrsd.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-24',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-clear-visa-ratio',
    slug: 'clear-visa-ratio-notes',
    name_ar: 'فك ملاحظة نسبة إصدار التأشيرات',
    name_en: 'Clear Visa Issuance Ratio Notes',
    description_ar: 'معالجة قيود رصيد التأشيرات المهنية الفورية وتصحيح نسب التوطين والتأشيرات المتاحة للمنشأة في قوى.',
    category_id: 'taqeeb-notes',
    category_name_ar: 'التعقيب وفك الملاحظات',
    platform_id: 'qiwa',
    platform_name_ar: 'منصة قوى',
    platform_url: 'https://www.qiwa.sa',
    entity_name_ar: 'وزارة الموارد البشرية',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'المنشآت الراغبة بالتوسع والاستقدام',
    processing_time: '24 إلى 72 ساعة',
    application_method: 'إلكتروني ومطابقة مؤشرات المنشأة',
    official_url: 'https://www.qiwa.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-25',
    featured: false,
    view_count: 7300,
    steps: [
      { step_number: 1, title_ar: 'احتساب معادلة نطاقات', description_ar: 'تحليل عدد السعوديين والوافدين لتحديد الرصيد القانوني للتأشيرات.' },
      { step_number: 2, title_ar: 'فك الملاحظة وتصفير المخالفات', description_ar: 'تسوية ملفات مدد وتوثيق العقود لفتح بوابة التأشيرات الفورية.' },
      { step_number: 3, title_ar: 'إصدار التأشيرة المباشرة', description_ar: 'تأكيد طلب التأشيرة وسداد الرسوم واستلام التفويض.' }
    ],
    requirements: [
      { id: 'req-vr-1', title_ar: 'نطاق أخضر منخفض فأعلى بالمنشأة', is_mandatory: true },
      { id: 'req-vr-2', title_ar: 'سريان السجل التجاري ورخصة البلدية', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-vr-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم التأشيرة المهنية الحكومية',
        amount: 2000,
        currency: 'ريال سعودي',
        source_name: 'وزارة الموارد البشرية - سداد',
        verified_at: '2026-09-25'
      }
    ],
    sources: [
      {
        source_name: 'منصة قوى - ضوابط التأشيرات المهنية الفورية',
        source_url: 'https://qiwa.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-25',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-clear-labor-transfer-ratio',
    slug: 'clear-labor-transfer-ratio-notes',
    name_ar: 'فك ملاحظة نسبة نقل العمال',
    name_en: 'Clear Labor Transfer Ratio Notes',
    description_ar: 'معالجة قيود نقل الكفالة في قوى وإزالة الملاحظات المانعة لنقل الخدمات بين المنشآت وضبط نسب التوطين لتمرير الطلب.',
    category_id: 'taqeeb-notes',
    category_name_ar: 'التعقيب وفك الملاحظات',
    platform_id: 'qiwa',
    platform_name_ar: 'منصة قوى',
    platform_url: 'https://www.qiwa.sa',
    entity_name_ar: 'وزارة الموارد البشرية',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'المنشآت والمؤسسات',
    processing_time: '24 إلى 48 ساعة',
    application_method: 'إلكتروني عبر منصة قوى',
    official_url: 'https://www.qiwa.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-23',
    featured: true,
    view_count: 11200,
    steps: [
      { step_number: 1, title_ar: 'تحليل نسبة التوطين للمنشأة المستقطبة', description_ar: 'التحقق من بقاء المنشأة بالنطاق الأخضر بعد إضافة العامل المطلوب.' },
      { step_number: 2, title_ar: 'إزالة القيود النظامية', description_ar: 'فك قيود حماية الأجور أو السجل المنتهي لفتح خيار النقل.' },
      { step_number: 3, title_ar: 'إرسال وقبول طلب النقل', description_ar: 'تأكيد العقد الرقمي وإتمام النقل دون تعليق.' }
    ],
    requirements: [
      { id: 'req-ltr-1', title_ar: 'سجل تجاري نشط ورخصة عمل سارية', is_mandatory: true },
      { id: 'req-ltr-2', title_ar: 'ألا يكون العامل مسجلاً بلاغ انقطاع أو قيود أمنية', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-ltr-1',
        fee_type: 'OFFICE_ESTIMATED',
        title_ar: 'أتعاب التنسيق وفك الملاحظة',
        amount: 800,
        currency: 'ريال سعودي',
        source_name: 'مكاتب الخدمات المعتمدة',
        verified_at: '2026-09-23'
      }
    ],
    sources: [
      {
        source_name: 'منصة قوى - شروط نقل الخدمات',
        source_url: 'https://qiwa.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-23',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-clear-contracts-doc',
    slug: 'clear-contracts-documentation-notes',
    name_ar: 'فك ملاحظة وتوثيق عقود العمل',
    name_en: 'Clear Contracts Documentation Notes',
    description_ar: 'إتمام توثيق عقود العمل الرقمية بنسبة 100% لجميع العاملين عبر منصة قوى وفك تعليق الخدمات الفورية للمنشأة.',
    category_id: 'taqeeb-notes',
    category_name_ar: 'التعقيب وفك الملاحظات',
    platform_id: 'qiwa',
    platform_name_ar: 'منصة قوى',
    platform_url: 'https://www.qiwa.sa',
    entity_name_ar: 'وزارة الموارد البشرية',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'المنشآت وأصحاب الأعمال',
    processing_time: 'ساعات قليلة بعد موافقة العمال',
    application_method: 'إلكتروني عبر منصة قوى',
    official_url: 'https://www.qiwa.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-24',
    featured: true,
    view_count: 9400,
    steps: [
      { step_number: 1, title_ar: 'حصر العقود غير الموثقة', description_ar: 'استخراج قائمة العاملين بدون عقود نشطة وموثقة على قوى.' },
      { step_number: 2, title_ar: 'صياغة وإرسال العقود الموحدة', description_ar: 'إدخال شروط العقد وبنود الأجر وساعات العمل وإرسالها لحسابات العمال.' },
      { step_number: 3, title_ar: 'المصادقة وفك الإيقاف', description_ar: 'موافقة العمال خلال مهلة 10 أيام وبلوغ نسبة 100% ورفع الإيقاف تلقائياً.' }
    ],
    requirements: [
      { id: 'req-cd-1', title_ar: 'بيانات أجور مطابقة لملفات حماية الأجور (مدد)', is_mandatory: true },
      { id: 'req-cd-2', title_ar: 'أرقام هواتف مسجلة ومفعلة بأبشر للعاملين', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-cd-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم توثيق العقد في قوى',
        amount: 0,
        currency: 'ريال سعودي',
        source_name: 'منصة قوى',
        verified_at: '2026-09-24',
        notes_ar: 'مجاناً ضمن اشتراك المنشأة السنوي في قوى.'
      }
    ],
    sources: [
      {
        source_name: 'منصة قوى - برنامج توثيق العقود',
        source_url: 'https://qiwa.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-24',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-transfer-branches-entities',
    slug: 'transfer-branches-entities',
    name_ar: 'نقل العمالة بين الفروع والمنشآت',
    name_en: 'Transfer Labor Between Branches & Entities',
    description_ar: 'نقل العاملين بين السجلات التجارية الفرعية والرئيسية التابعة لنفس المالك أو بين الكيانات المندمجة إلكترونياً وبسرعة فائقة.',
    category_id: 'taqeeb-notes',
    category_name_ar: 'التعقيب وفك الملاحظات',
    platform_id: 'qiwa',
    platform_name_ar: 'منصة قوى / مقيم',
    platform_url: 'https://www.qiwa.sa',
    entity_name_ar: 'وزارة الموارد البشرية والمديرية العامة للجوازات',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'المجموعات والشركات ذات الفروع',
    processing_time: 'فوري (خلال 24 ساعة)',
    application_method: 'إلكتروني عبر منصة قوى ومقيم',
    official_url: 'https://www.qiwa.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-25',
    featured: true,
    view_count: 8100,
    steps: [
      { step_number: 1, title_ar: 'تحديد الفرع المحال منه وإليه', description_ar: 'اختيار الرقم الموحد والسجل التجاري المستهدف لنقل العامل إليه.' },
      { step_number: 2, title_ar: 'تأكيد النقل الداخلي', description_ar: 'تنفيذ طلب النقل الداخلي بدون رسوم نقل كفالة حكومية (بين فروع المالك الواحد).' },
      { step_number: 3, title_ar: 'تحديث بيانات رخصة العمل والإقامة', description_ar: 'انعكاس الفرع الجديد في نظام مقيم وقوى وطباعة بيانات الإقامة المحدثة.' }
    ],
    requirements: [
      { id: 'req-tb-1', title_ar: 'أن تكون الفروع تابعة لنفس الرقم الموحد أو نفس المالك', is_mandatory: true },
      { id: 'req-tb-2', title_ar: 'سريان إقامة العامل ورخصة العمل', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-tb-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم النقل بين فروع نفس الرقم الموحد',
        amount: 0,
        currency: 'ريال سعودي',
        source_name: 'وزارة الموارد البشرية',
        verified_at: '2026-09-25',
        notes_ar: 'بدون رسوم نقل خدمات حكومية.'
      }
    ],
    sources: [
      {
        source_name: 'منصة قوى - خدمة نقل موظف بين فروع الرقم الموحد',
        source_url: 'https://qiwa.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-25',
        confidence: 'HIGH'
      }
    ]
  },

  // ==========================================
  // 2. الفحوصات الطبية المعتمدة (6 خدمات)
  // ==========================================
  {
    id: 'srv-med-iqama',
    slug: 'medical-check-iqama-issuance',
    name_ar: 'فحص طبي لإصدار وتجديد الإقامة',
    name_en: 'Medical Examination for Iqama Issuance & Renewal',
    description_ar: 'إجراء الفحص الطبي الإلزامي للعمالة الوافدة في المراكز الطبية المعتمدة وربط النتيجة آلياً بوزارة الداخلية ونظام إفادة لإصدار الإقامة.',
    category_id: 'medical-checks',
    category_name_ar: 'الفحوصات الطبية المعتمدة',
    platform_id: 'absher',
    platform_name_ar: 'منصة إفادة / وزارة الصحة',
    platform_url: 'https://efada.com.sa',
    entity_name_ar: 'وزارة الصحة ومجلس الضمان الصحي',
    target_audience: 'RESIDENTS',
    target_audience_label: 'الوافدون حديثاً والمقيمون',
    processing_time: 'خلال 24 إلى 48 ساعة للربط الآلي',
    application_method: 'فحص حضوري في مركز طبي معتمد مع ربط رقمي',
    official_url: 'https://www.moh.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-24',
    featured: true,
    view_count: 24500,
    steps: [
      { step_number: 1, title_ar: 'حجز الموعد أو زيارة المركز المعتمد', description_ar: 'التوجه إلى مجمع طبي أو مستشفى معتمد ومربوط بنظام إفادة التابع للصحة.' },
      { step_number: 2, title_ar: 'أخذ العينات والفحص السريري', description_ar: 'تحليل الدم للأمراض المعدية وفحص الصدر بالأشعة وتأكيد البيانات برقم الحدود/الإقامة.' },
      { step_number: 3, title_ar: 'إرسال النتيجة إلكترونياً', description_ar: 'إرسال التقرير مباشرة إلى نظام الجوازات وتلقي إشعار إفادة عبر الرسائل النصية.' }
    ],
    requirements: [
      { id: 'req-mi-1', title_ar: 'أصل جواز السفر أو رقم الحدود للوافد الجديد / رقم الإقامة للتجديد', is_mandatory: true },
      { id: 'req-mi-2', title_ar: 'صورة شخصية حديثة للمقيم', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-mi-1',
        fee_type: 'OFFICE_ESTIMATED',
        title_ar: 'رسوم الفحص في المراكز المعتمدة',
        amount: 250,
        currency: 'ريال سعودي',
        source_name: 'المراكز والمجمعات الطبية المعتمدة',
        verified_at: '2026-09-24',
        notes_ar: 'تتراوح بين 200 إلى 350 ريال حسب المجمع الطبي والمدينة.'
      }
    ],
    sources: [
      {
        source_name: 'منصة إفادة - وزارة الصحة',
        source_url: 'https://efada.com.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-24',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-med-premium-residency',
    slug: 'medical-check-premium-residency',
    name_ar: 'فحص طبي لإصدار الإقامة المميزة',
    name_en: 'Medical Check for Saudi Premium Residency',
    description_ar: 'الفحص الطبي الشامل المعتمد للمتقدمين على الإقامة المميزة السعودية وإرفاق التقرير الطبي الدولي أو المحلي المصدق لمركز الإقامة المميزة.',
    category_id: 'medical-checks',
    category_name_ar: 'الفحوصات الطبية المعتمدة',
    platform_id: 'absher',
    platform_name_ar: 'مركز الإقامة المميزة',
    platform_url: 'https://pr.gov.sa',
    entity_name_ar: 'مركز الإقامة المميزة ووزارة الصحة',
    target_audience: 'INVESTORS',
    target_audience_label: 'المستثمرون والكفاءات والموهوبون',
    processing_time: '2 إلى 4 أيام عمل',
    application_method: 'فحص شامل في مستشفيات معتمدة ورفع رقمي',
    official_url: 'https://pr.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-22',
    featured: true,
    view_count: 14100,
    steps: [
      { step_number: 1, title_ar: 'اختيار المستشفى المؤهل للتقرير الشامل', description_ar: 'التوجه إلى مستشفى مرخص لإصدار التقرير الطبي لمركز الإقامة المميزة.' },
      { step_number: 2, title_ar: 'إجراء الفحوصات الشاملة', description_ar: 'فحوصات الأمراض السارية والمعدية، اللياقة البدنية، وفحوصات الأعضاء الحيوية.' },
      { step_number: 3, title_ar: 'تصديق التقرير ورفعه بالبوابة', description_ar: 'استلام التقرير الطبي المعتمد بصيغة PDF ورفعه على منصة pr.gov.sa.' }
    ],
    requirements: [
      { id: 'req-mpr-1', title_ar: 'جواز سفر ساري المفعول أو إقامة نظامية', is_mandatory: true },
      { id: 'req-mpr-2', title_ar: 'تقرير خلو تام من الأمراض المعدية مصدق طبياً', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-mpr-1',
        fee_type: 'OFFICE_ESTIMATED',
        title_ar: 'تكلفة الفحص الشامل المعتمد',
        amount: 800,
        currency: 'ريال سعودي',
        source_name: 'المستشفيات المعتمدة',
        verified_at: '2026-09-22'
      }
    ],
    sources: [
      {
        source_name: 'مركز الإقامة المميزة - شروط التقديم',
        source_url: 'https://pr.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-22',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-med-driving-license',
    slug: 'medical-check-driving-license',
    name_ar: 'فحص طبي لتجديد رخصة القيادة (إفادة)',
    name_en: 'Driving License Medical Examination (Efada)',
    description_ar: 'فحص النظر واللياقة البدنية المعتمد لإصدار وتجديد رخص القيادة وربطه الفوري بنظام أبشر والمرور دون الحاجة لمراجعة دلة أو المرور.',
    category_id: 'medical-checks',
    category_name_ar: 'الفحوصات الطبية المعتمدة',
    platform_id: 'absher',
    platform_name_ar: 'منصة إفادة / أبشر مرور',
    platform_url: 'https://www.absher.sa',
    entity_name_ar: 'الإدارة العامة للمرور ووزارة الصحة',
    target_audience: 'RESIDENTS',
    target_audience_label: 'جميع قائدي المركبات',
    processing_time: 'فوري (خلال 10 دقائق بعد الكشف)',
    application_method: 'كشف بصري وسريري سريع في مركز معتمد',
    official_url: 'https://www.absher.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-25',
    featured: true,
    view_count: 21300,
    steps: [
      { step_number: 1, title_ar: 'زيارة مجمع طبي معتمد للمرور', description_ar: 'طلب فحص رخصة القيادة لنظام إفادة وإبراز بطاقة الإقامة الأصلية.' },
      { step_number: 2, title_ar: 'فحص حدة الإبصار واللياقة', description_ar: 'فحص النظر وفصيلة الدم وتحديد ما إذا كان يحتاج نظارة طبية أثناء القيادة.' },
      { step_number: 3, title_ar: 'الربط الآلي مع أبشر', description_ar: 'إرسال النتيجة إلكترونياً وتلقي رسالة نصية بنجاح الربط والتجديد الفوري عبر أبشر.' }
    ],
    requirements: [
      { id: 'req-mdl-1', title_ar: 'أصل هوية مقيم سارية المفعول', is_mandatory: true },
      { id: 'req-mdl-2', title_ar: 'حضور صاحب الرخصة شخصياً لإجراء فحص النظر', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-mdl-1',
        fee_type: 'OFFICE_ESTIMATED',
        title_ar: 'رسوم كشف رخصة القيادة بالمركز الصحي',
        amount: 120,
        currency: 'ريال سعودي',
        source_name: 'المجمعات الطبية المرخصة',
        verified_at: '2026-09-25',
        notes_ar: 'تتراوح بين 100 إلى 150 ريال حسب المجمع.'
      }
    ],
    sources: [
      {
        source_name: 'منصة إفادة - فحوصات رخص القيادة',
        source_url: 'https://efada.com.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-25',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-med-comprehensive-employment',
    slug: 'medical-check-comprehensive-employment',
    name_ar: 'فحص طبي للتوظيف الشامل',
    name_en: 'Pre-Employment Comprehensive Medical Check',
    description_ar: 'حزمة الفحوصات الطبية المخبرية والسريرية المعتمدة للموظفين الجدد قبل التوقيع والمباشرة للشركات والمصانع والجهات الخاصة.',
    category_id: 'medical-checks',
    category_name_ar: 'الفحوصات الطبية المعتمدة',
    platform_id: 'qiwa',
    platform_name_ar: 'المراكز الطبية المعتمدة للتوظيف',
    platform_url: 'https://www.moh.gov.sa',
    entity_name_ar: 'وزارة الصحة والمنشآت الموظفة',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'الموظفون الجدد والشركات',
    processing_time: '24 إلى 48 ساعة لظهور كافة النتائج المخبرية',
    application_method: 'إحالة من جهة العمل وفحص بالمختبر المعتمد',
    official_url: 'https://www.moh.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-20',
    featured: false,
    view_count: 7800,
    steps: [
      { step_number: 1, title_ar: 'تحديد باقة فحص التوظيف', description_ar: 'اختيار التحاليل المطلوبة وفق سياسة الشركة وطبيعة العمل.' },
      { step_number: 2, title_ar: 'إجراء الفحوصات المخبرية والأشعة', description_ar: 'تحليل شامل لوظائف الكبد والكلى، كشف المخدرات، والأشعة الصدرية.' },
      { step_number: 3, title_ar: 'إصدار التقرير الطبي النهائي', description_ar: 'توقيع استشاري الطب المهني وتسليم شهادة اللياقة الطبية للتوظيف.' }
    ],
    requirements: [
      { id: 'req-mce-1', title_ar: 'خطاب إحالة من المنشأة أو طلب فحص توظيف', is_mandatory: false },
      { id: 'req-mce-2', title_ar: 'إقامة سارية أو جواز السفر للموظف', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-mce-1',
        fee_type: 'OFFICE_ESTIMATED',
        title_ar: 'باقة الفحص الطبي الشامل للتوظيف',
        amount: 350,
        currency: 'ريال سعودي',
        source_name: 'المختبرات والمستشفيات الخاصة',
        verified_at: '2026-09-20'
      }
    ],
    sources: [
      {
        source_name: 'مجلس الضمان الصحي والطب المهني',
        source_url: 'https://cchi.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-20',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-med-occupational-fitness',
    slug: 'medical-check-occupational-fitness',
    name_ar: 'فحص طبي للياقة المهنية والوظائف الحساسة',
    name_en: 'Occupational Fitness & Sensitive Jobs Medical Check',
    description_ar: 'الفحص الطبي التخصصي للياقة المهنية للوظائف الميدانية، مشغلي المعدات والرافعات، العمل في المرتفعات، والوظائف الصناعية والبيئية.',
    category_id: 'medical-checks',
    category_name_ar: 'الفحوصات الطبية المعتمدة',
    platform_id: 'qiwa',
    platform_name_ar: 'مراكز الطب المهني المعتمدة',
    platform_url: 'https://www.moh.gov.sa',
    entity_name_ar: 'وزارة الموارد البشرية (السلامة والصحة المهنية)',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'القطاع الصناعي والمقاولات والتشغيل',
    processing_time: '24 إلى 48 ساعة',
    application_method: 'فحوصات سريرية واختبارات قياس الجهد والتوازن',
    official_url: 'https://hrsd.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-21',
    featured: false,
    view_count: 5300,
    steps: [
      { step_number: 1, title_ar: 'تحديد المخاطر المهنية للوظيفة', description_ar: 'فحص السمع، التنفس، قياس الضغط والجهد للوظائف الصعبة.' },
      { step_number: 2, title_ar: 'الفحوصات التخصصية', description_ar: 'تخطيط القلب، أشعة الظهر والعمود الفقري، واختبار التوازن.' },
      { step_number: 3, title_ar: 'إصدار تصريح اللياقة المهنية', description_ar: 'منح شهادة اللياقة للعمل الميداني متوافقة مع متطلبات كود السلامة.' }
    ],
    requirements: [
      { id: 'req-mof-1', title_ar: 'إثبات هوية مقيم سارية للعامل', is_mandatory: true },
      { id: 'req-mof-2', title_ar: 'تحديد مسمى الوظيفة وبيئة العمل', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-mof-1',
        fee_type: 'OFFICE_ESTIMATED',
        title_ar: 'رسوم كشف اللياقة والسلامة المهنية',
        amount: 400,
        currency: 'ريال سعودي',
        source_name: 'المراكز الطبية الصناعية والمهنية',
        verified_at: '2026-09-21'
      }
    ],
    sources: [
      {
        source_name: 'البرنامج الوطني للسلامة والصحة المهنية',
        source_url: 'https://hrsd.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-21',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-med-delivery-riders',
    slug: 'medical-check-delivery-riders',
    name_ar: 'فحص طبي لمندوبي تطبيقات التوصيل',
    name_en: 'Medical Check for Delivery App Couriers',
    description_ar: 'الفحص الطبي الإلزامي لمندوبي توصيل الطلبات في التطبيقات المرخصة، المعتمد لدى الهيئة العامة للنقل لمطابقة الاشتراطات النظامية.',
    category_id: 'medical-checks',
    category_name_ar: 'الفحوصات الطبية المعتمدة',
    platform_id: 'absher',
    platform_name_ar: 'بوابة وصل / الهيئة العامة للنقل',
    platform_url: 'https://tga.gov.sa',
    entity_name_ar: 'الهيئة العامة للنقل ووزارة الصحة',
    target_audience: 'RESIDENTS',
    target_audience_label: 'مندوبو التوصيل وسائقو التطبيقات',
    processing_time: '24 ساعة وربط فوري ببوابة وصل',
    application_method: 'كشف طبي وتحليل سموم في مركز معتمد',
    official_url: 'https://tga.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-25',
    featured: true,
    view_count: 16800,
    steps: [
      { step_number: 1, title_ar: 'طلب فحص مندوب توصيل', description_ar: 'مراجعة المركز الطبي وطلب حزمة فحص منسوبي تطبيقات التوصيل (وصل).' },
      { step_number: 2, title_ar: 'إجراء فحص السموم والأمراض المعدية', description_ar: 'أخذ العينة المخبرية وفحص النظر والصحة العامة.' },
      { step_number: 3, title_ar: 'الربط المباشر مع منصة وصل', description_ar: 'تحديث بيانات السائق في قاعدة بيانات هيئة النقل وتفعيل حسابه بالتطبيقات.' }
    ],
    requirements: [
      { id: 'req-mdr-1', title_ar: 'هوية مقيم سارية المفعول', is_mandatory: true },
      { id: 'req-mdr-2', title_ar: 'رخصة قيادة سارية ورقم لوحة المركبة المسجلة', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-mdr-1',
        fee_type: 'OFFICE_ESTIMATED',
        title_ar: 'تكلفة فحص مندوب التوصيل وربط وصل',
        amount: 180,
        currency: 'ريال سعودي',
        source_name: 'المراكز الطبية المعتمدة لهيئة النقل',
        verified_at: '2026-09-25'
      }
    ],
    sources: [
      {
        source_name: 'الهيئة العامة للنقل - لائحة توجيه المركبات وتوصيل الطلبات',
        source_url: 'https://tga.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-25',
        confidence: 'HIGH'
      }
    ]
  },

  // ==========================================
  // 3. تأسيس واستثمار الشركات الأجنبية MISA (12 خدمة)
  // ==========================================
  {
    id: 'srv-misa-acquire-company',
    slug: 'misa-acquire-foreign-company',
    name_ar: 'شراء شركة أجنبية قائمة في السعودية',
    name_en: 'Acquisition of Existing Foreign Company in KSA',
    description_ar: 'إجراءات التنازل ونقل ملكية حصص الشركات الأجنبية القائمة المرخصة من MISA وتحديث عقد التأسيس والسجل التجاري للمالك الجديد.',
    category_id: 'foreign-investment',
    category_name_ar: 'تأسيس واستثمار الشركات الأجنبية (MISA)',
    platform_id: 'absher',
    platform_name_ar: 'بوابة وزارة الاستثمار (MISA) والمركز السعودي للأعمال',
    platform_url: 'https://misa.gov.sa',
    entity_name_ar: 'وزارة الاستثمار ووزارة التجارة',
    target_audience: 'INVESTORS',
    target_audience_label: 'المستثمرون ورجال الأعمال',
    processing_time: '7 إلى 14 يوم عمل',
    application_method: 'إجراءات قانونية وإلكترونية وتوثيق معتمد',
    official_url: 'https://misa.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-24',
    featured: true,
    view_count: 19800,
    steps: [
      { step_number: 1, title_ar: 'الفحص النافي للجهالة والتدقيق المالي', description_ar: 'التأكد من خلو الشركة من الديون الضريبية والعمالية وسريان ترخيص MISA.' },
      { step_number: 2, title_ar: 'تعديل ترخيص الاستثمار الأجنبي', description_ar: 'تقديم طلب تعديل الملاك ونقل الحصص عبر بوابة وزارة الاستثمار MISA.' },
      { step_number: 3, title_ar: 'توثيق ملحق عقد التأسيس وتعديل السجل', description_ar: 'توثيق التنازل إلكترونياً وتحديث بيانات الشركاء والمديرين في السجل التجاري.' }
    ],
    requirements: [
      { id: 'req-mac-1', title_ar: 'ترخيص استثمار أجنبي ساري المفعول للشركة', is_mandatory: true },
      { id: 'req-mac-2', title_ar: 'شهادة زكاة وضريبة سارية وبراءة ذمة', is_mandatory: true },
      { id: 'req-mac-3', title_ar: 'جواز سفر وهوية الشريك المشتري الجديد', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-mac-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم تعديل ترخيص الاستثمار (MISA)',
        amount: 2000,
        currency: 'ريال سعودي',
        source_name: 'وزارة الاستثمار MISA',
        verified_at: '2026-09-24'
      }
    ],
    sources: [
      {
        source_name: 'دليل خدمات وزارة الاستثمار السعودية MISA',
        source_url: 'https://misa.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-24',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-misa-license',
    slug: 'misa-investment-license',
    name_ar: 'استخراج تراخيص الاستثمار الأجنبي (MISA)',
    name_en: 'Foreign Investment License Issuance (MISA)',
    description_ar: 'إصدار ترخيص الاستثمار الأجنبي بملكية تصل إلى 100% للمستثمرين الأجانب والشركات الإقليمية في مختلف الأنشطة الخدمية، التجارية، والصناعية.',
    category_id: 'foreign-investment',
    category_name_ar: 'تأسيس واستثمار الشركات الأجنبية (MISA)',
    platform_id: 'absher',
    platform_name_ar: 'بوابة استثمر في السعودية (MISA)',
    platform_url: 'https://misa.gov.sa',
    entity_name_ar: 'وزارة الاستثمار (MISA)',
    target_audience: 'INVESTORS',
    target_audience_label: 'المستثمرون والشركات الدولية',
    processing_time: '24 إلى 72 ساعة من اكتمال الأوراق',
    application_method: 'إلكتروني بالكامل عبر بوابة MISA الإلكترونية',
    official_url: 'https://misa.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-25',
    featured: true,
    view_count: 28400,
    steps: [
      { step_number: 1, title_ar: 'تقديم الطلب الإلكتروني', description_ar: 'تعبئة بيانات الشركاء والنشاط الاستثماري ورفع القوائم المالية أو السجل الخارجي.' },
      { step_number: 2, title_ar: 'دراسة الطلب والتدقيق', description_ar: 'مراجعة الملاءة والنشاط وإصدار الموافقة المبدئية وفاتورة الترخيص.' },
      { step_number: 3, title_ar: 'إصدار رخصة الاستثمار الفورية', description_ar: 'سداد المقابل المالي واستلام رخصة الاستثمار المعتمدة والبدء بتأسيس السجل.' }
    ],
    requirements: [
      { id: 'req-mil-1', title_ar: 'سجل تجاري للشركة الأجنبية الأم في بلدها أو سجل مهني للمستثمر الفرد', is_mandatory: true },
      { id: 'req-mil-2', title_ar: 'قوائم مالية مدققة لآخر سنة مالية للشركة الأم', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-mil-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم ترخيص الاستثمار الأجنبي السنوي',
        amount: 2000,
        currency: 'ريال سعودي',
        source_name: 'وزارة الاستثمار MISA',
        verified_at: '2026-09-25',
        notes_ar: 'للسنة الأولى 2000 ريال رسم ترخيص بالإضافة لرسم خدمات الاشتراطات المقررة.'
      }
    ],
    sources: [
      {
        source_name: 'منصة استثمر في السعودية - MISA',
        source_url: 'https://misa.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-25',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-reserve-trade-name',
    slug: 'reserve-commercial-trade-name',
    name_ar: 'حجز الاسم التجاري للشركات الأجنبية',
    name_en: 'Reserve Commercial Trade Name for Foreign Firms',
    description_ar: 'فحص وحجز الاسم التجاري للشركة الأجنبية عبر المركز السعودي للأعمال ومطابقته للأنظمة واللوائح والاسم في رخصة الاستثمار.',
    category_id: 'foreign-investment',
    category_name_ar: 'تأسيس واستثمار الشركات الأجنبية (MISA)',
    platform_id: 'absher',
    platform_name_ar: 'المركز السعودي للأعمال / وزارة التجارة',
    platform_url: 'https://business.gov.sa',
    entity_name_ar: 'وزارة التجارة والمركز السعودي للأعمال',
    target_audience: 'INVESTORS',
    target_audience_label: 'المستثمرون الجدد',
    processing_time: 'فوري إلى 24 ساعة',
    application_method: 'إلكتروني عبر بوابة المركز السعودي للأعمال',
    official_url: 'https://business.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-23',
    featured: false,
    view_count: 6200,
    steps: [
      { step_number: 1, title_ar: 'البحث عن توفر الاسم التجاري', description_ar: 'التحقق من عدم تكرار الاسم في قاعدة بيانات السجلات التجارية السعودية.' },
      { step_number: 2, title_ar: 'تقديم طلب الحجز', description_ar: 'إدخال الاسم العربي واللاتيني وربطه برقم ترخيص الاستثمار MISA.' },
      { step_number: 3, title_ar: 'الموافقة وإصدار شهادة الحجز', description_ar: 'اعتماد الاسم التجاري وحجزه لمدة 60 يوماً لإكمال تأسيس الشركة.' }
    ],
    requirements: [
      { id: 'req-rtn-1', title_ar: 'رقم ترخيص الاستثمار الأجنبي MISA الصادر', is_mandatory: true },
      { id: 'req-rtn-2', title_ar: 'مطابقة الاسم لمعايير الأسماء التجارية السعودية', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-rtn-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم حجز الاسم التجاري الخاص',
        amount: 0,
        currency: 'ريال سعودي',
        source_name: 'وزارة التجارة',
        verified_at: '2026-09-23',
        notes_ar: 'مجاناً للأسماء المقترحة أو رسوم رمزية للاسم الخاص.'
      }
    ],
    sources: [
      {
        source_name: 'المركز السعودي للأعمال - خدمة حجز اسم تجاري',
        source_url: 'https://business.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-23',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-draft-articles',
    slug: 'draft-articles-of-association',
    name_ar: 'صياغة وتوثيق عقد التأسيس',
    name_en: 'Drafting & Notarizing Articles of Association',
    description_ar: 'صياغة عقد تأسيس الشركة الأجنبية (ذات مسؤولية محدودة أو فرع شركة) وتوثيقه رقمياً عبر الموثقين المعتمدين ونظام الشركات الجديد.',
    category_id: 'foreign-investment',
    category_name_ar: 'تأسيس واستثمار الشركات الأجنبية (MISA)',
    platform_id: 'absher',
    platform_name_ar: 'منصة توثيق / المركز السعودي للأعمال',
    platform_url: 'https://business.gov.sa',
    entity_name_ar: 'وزارة العدل ووزارة التجارة',
    target_audience: 'INVESTORS',
    target_audience_label: 'الشركاء والمستثمرون',
    processing_time: '24 ساعة من اكتمال توقيع الشركاء',
    application_method: 'إلكتروني مع توثيق عبر منصة النفاذ الوطني / أبشر',
    official_url: 'https://business.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-25',
    featured: true,
    view_count: 12200,
    steps: [
      { step_number: 1, title_ar: 'صياغة بنود العقد وفق نظام الشركات الجديد', description_ar: 'تحديد رأس المال، الحصص، الصلاحيات الإدارية، وسنة الشركة المالية.' },
      { step_number: 2, title_ar: 'إرسال طلب التوثيق للشركاء', description_ar: 'إشعار الشركاء للمصادقة عبر رسائل التحقق والنفاذ الوطني الموحد.' },
      { step_number: 3, title_ar: 'إصدار عقد التأسيس الموثق', description_ar: 'صدور العقد الإلكتروني المعتمد والموقع رقمياً من وزارة العدل والتجارة.' }
    ],
    requirements: [
      { id: 'req-da-1', title_ar: 'ترخيص MISA والاسم التجاري المحجوز', is_mandatory: true },
      { id: 'req-da-2', title_ar: 'بيانات المديرين والشركاء مع التوكيلات المصدقة إن وجدت', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-da-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم نشر عقد التأسيس والتوثيق',
        amount: 500,
        currency: 'ريال سعودي',
        source_name: 'وزارة التجارة والعدل',
        verified_at: '2026-09-25'
      }
    ],
    sources: [
      {
        source_name: 'بوابة المركز السعودي للأعمال - تأسيس الشركات',
        source_url: 'https://business.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-25',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-foreign-cr',
    slug: 'foreign-commercial-registration',
    name_ar: 'استخراج وتجديد السجل التجاري الأجنبي',
    name_en: 'Foreign Commercial Registration (CR) Issuance & Renewal',
    description_ar: 'إصدار السجل التجاري الرئيسي للشركة الأجنبية وشهادة القيد التجاري متضمنة رقم 700 الموحد لبدء العمل في المملكة.',
    category_id: 'foreign-investment',
    category_name_ar: 'تأسيس واستثمار الشركات الأجنبية (MISA)',
    platform_id: 'absher',
    platform_name_ar: 'المركز السعودي للأعمال / وزارة التجارة',
    platform_url: 'https://business.gov.sa',
    entity_name_ar: 'وزارة التجارة',
    target_audience: 'INVESTORS',
    target_audience_label: 'الشركات الاستثمارية الأجنبية',
    processing_time: 'فوري بعد توثيق العقد وسداد الفاتورة',
    application_method: 'إلكتروني عبر المركز السعودي للأعمال',
    official_url: 'https://business.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-24',
    featured: true,
    view_count: 17300,
    steps: [
      { step_number: 1, title_ar: 'سداد فاتورة التأسيس الموحدة', description_ar: 'سداد فاتورة سداد للغرفة التجارية والسجل التجاري.' },
      { step_number: 2, title_ar: 'إصدار السجل التجاري الفوري', description_ar: 'تحميل وطباعة السجل التجاري الإلكتروني متضمناً رمز QR والرقم الوطني الموحد 700.' },
      { step_number: 3, title_ar: 'الربط التلقائي بالجهات الحكومية', description_ar: 'انعكاس السجل مباشرة في هيئة الزكاة، العمل، والتأمينات الاجتماعية.' }
    ],
    requirements: [
      { id: 'req-fcr-1', title_ar: 'عقد تأسيس موثق وترخيص MISA ساري', is_mandatory: true },
      { id: 'req-fcr-2', title_ar: 'سداد رسوم السجل التجاري عبر سداد', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-fcr-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم السجل التجاري الرئيسي (سنوي)',
        amount: 1200,
        currency: 'ريال سعودي',
        source_name: 'وزارة التجارة',
        verified_at: '2026-09-24'
      }
    ],
    sources: [
      {
        source_name: 'وزارة التجارة - خدمة إصدار السجل التجاري للشركات',
        source_url: 'https://mc.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-24',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-open-labor-file',
    slug: 'open-labor-office-file',
    name_ar: 'فتح ملف المنشأة بمكتب العمل',
    name_en: 'Open Facility File at Labor Office',
    description_ar: 'إنشاء وتفعيل ملف المنشأة لدى وزارة الموارد البشرية برقم موحد وتعيين المفوضين والمديرين لإدارة العمالة ونطاقات.',
    category_id: 'foreign-investment',
    category_name_ar: 'تأسيس واستثمار الشركات الأجنبية (MISA)',
    platform_id: 'qiwa',
    platform_name_ar: 'منصة قوى / وزارة الموارد البشرية',
    platform_url: 'https://www.qiwa.sa',
    entity_name_ar: 'وزارة الموارد البشرية والتنمية الاجتماعية',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'المنشآت الجديدة',
    processing_time: '24 إلى 48 ساعة',
    application_method: 'إلكتروني عبر منصة قوى أعمال',
    official_url: 'https://www.qiwa.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-22',
    featured: true,
    view_count: 10400,
    steps: [
      { step_number: 1, title_ar: 'الربط برقم السجل التجاري ورقم 700', description_ar: 'الدخول لقوى باستخدام حساب النفاذ الوطني لمدير المنشأة.' },
      { step_number: 2, title_ar: 'تحديد فرع مكتب العمل والنشاط', description_ar: 'اختيار تصنيف النشاط ومكتب العمل التابع للمقر الرئيسي.' },
      { step_number: 3, title_ar: 'تفعيل الملف وتعيين المفوضين', description_ar: 'إصدار رقم المنشأة الموحد (الرقم الشامل) والبدء بإضافة موظفيها.' }
    ],
    requirements: [
      { id: 'req-olf-1', title_ar: 'سجل تجاري نشط وعنوان وطني مسجل', is_mandatory: true },
      { id: 'req-olf-2', title_ar: 'هوية وطنية أو هوية مقيم للمدير التنفيذي المسجل بالسجل', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-olf-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم فتح ملف مكتب العمل',
        amount: 0,
        currency: 'ريال سعودي',
        source_name: 'وزارة الموارد البشرية',
        verified_at: '2026-09-22',
        notes_ar: 'خدمة حكومية مجانية.'
      }
    ],
    sources: [
      {
        source_name: 'منصة قوى - فتح ملف منشأة جديدة',
        source_url: 'https://qiwa.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-22',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-activate-qiwa-muqeem',
    slug: 'activate-qiwa-muqeem-portals',
    name_ar: 'تفعيل منصة قوى وبوابة مقيم',
    name_en: 'Activate Qiwa & Muqeem Portals for Facility',
    description_ar: 'شراء وتفعيل اشتراك قوى السنوي وبوابة مقيم الإلكترونية لربط المنشأة بالجوازات وإصدار وتجديد إقامات موظفيها وإصدار التأشيرات.',
    category_id: 'foreign-investment',
    category_name_ar: 'تأسيس واستثمار الشركات الأجنبية (MISA)',
    platform_id: 'muqeem',
    platform_name_ar: 'بوابة مقيم وقوى',
    platform_url: 'https://www.muqeem.sa',
    entity_name_ar: 'المديرية العامة للجوازات ومنصة قوى',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'أصحاب المنشآت والشركات',
    processing_time: 'ساعتان إلى 24 ساعة',
    application_method: 'إلكتروني وسداد باقات الاشتراك الرسمية',
    official_url: 'https://www.muqeem.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-24',
    featured: true,
    view_count: 13600,
    steps: [
      { step_number: 1, title_ar: 'تفعيل اشتراك منصة قوى', description_ar: 'اختيار باقة قوى بناءً على عدد العمالة وسداد الفاتورة.' },
      { step_number: 2, title_ar: 'الاشتراك في بوابة مقيم', description_ar: 'إنشاء حساب المنشأة في مقيم واختيار باقة العمليات أو باقة مقيم الشاملة.' },
      { step_number: 3, title_ar: 'تحديد الصلاحيات والمستخدمين', description_ar: 'إضافة المعقبين ومسؤولي الموارد البشرية وإصدار كلمات المرور المشفرة.' }
    ],
    requirements: [
      { id: 'req-aqm-1', title_ar: 'سجل تجاري نشط وملف مكتب عمل مفعل', is_mandatory: true },
      { id: 'req-aqm-2', title_ar: 'حساب بنكي أو بطاقة مدى لسداد باقات الاشتراك', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-aqm-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'اشتراك منصة قوى السنوي للمنشآت الصغيرة',
        amount: 1265,
        currency: 'ريال سعودي',
        source_name: 'منصة قوى',
        verified_at: '2026-09-24'
      },
      {
        id: 'fee-aqm-2',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'اشتراك بوابة مقيم السنوي (باقة العمليات)',
        amount: 550,
        currency: 'ريال سعودي',
        source_name: 'بوابة مقيم - علم',
        verified_at: '2026-09-24'
      }
    ],
    sources: [
      {
        source_name: 'بوابة مقيم الرسمية',
        source_url: 'https://muqeem.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-24',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-reg-chamber',
    slug: 'register-chamber-of-commerce',
    name_ar: 'التسجيل في الغرفة التجارية',
    name_en: 'Chamber of Commerce Membership Registration',
    description_ar: 'تفعيل عضوية الغرفة التجارية للمنشأة الأجنبية وتفعيل التوقيع والتصاديق الإلكترونية لحماية التعاملات والعقود.',
    category_id: 'foreign-investment',
    category_name_ar: 'تأسيس واستثمار الشركات الأجنبية (MISA)',
    platform_id: 'absher',
    platform_name_ar: 'الغرفة التجارية (اتحاد الغرف)',
    platform_url: 'https://fsc.org.sa',
    entity_name_ar: 'اتحاد الغرف السعودية',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'الشركات الاستثمارية',
    processing_time: 'فوري (ضمن فاتورة السجل التجاري)',
    application_method: 'إلكتروني عبر بوابة المركز السعودي للأعمال',
    official_url: 'https://fsc.org.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-20',
    featured: false,
    view_count: 5900,
    steps: [
      { step_number: 1, title_ar: 'تحديد الغرفة التجارية التابعة للمقر', description_ar: 'ربط المنشأة بالغرفة التجارية في الرياض أو جدة أو الشرقية حسب السجل.' },
      { step_number: 2, title_ar: 'اعتماد المفوضين وتوقيع العينات', description_ar: 'تفعيل التوقيع الإلكتروني للمدير التنفيذي عبر النفاذ الوطني.' },
      { step_number: 3, title_ar: 'إصدار شهادة الاشتراك وتفعيل التصديق', description_ar: 'طباعة شهادة الغرفة والبدء بتصديق الخطابات والعقود فوراً.' }
    ],
    requirements: [
      { id: 'req-rc-1', title_ar: 'سجل تجاري أجنبي ساري المفعول', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-rc-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم الاشتراك السنوي بالغرفة التجارية',
        amount: 2000,
        currency: 'ريال سعودي',
        source_name: 'الغرف التجارية السعودية',
        verified_at: '2026-09-20',
        notes_ar: 'بحسب الدرجة الممتازة أو الأولى للشركات الاستثمارية.'
      }
    ],
    sources: [
      {
        source_name: 'اتحاد الغرف السعودية',
        source_url: 'https://fsc.org.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-20',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-zatca-tax-registration',
    slug: 'zatca-tax-registration',
    name_ar: 'التسجيل في هيئة الزكاة والضريبة واستخراج الرقم الضريبي',
    name_en: 'ZATCA Tax Registration & VAT Certificate',
    description_ar: 'تسجيل المنشأة الأجنبية في هيئة الزكاة والضريبة والجمارك (ZATCA)، استخراج شهادة الرقم الضريبي، وتفعيل الفوترة الإلكترونية (فاتورة).',
    category_id: 'foreign-investment',
    category_name_ar: 'تأسيس واستثمار الشركات الأجنبية (MISA)',
    platform_id: 'zatca',
    platform_name_ar: 'بوابة الزكاة والضريبة والجمارك (ZATCA)',
    platform_url: 'https://zatca.gov.sa',
    entity_name_ar: 'هيئة الزكاة والضريبة والجمارك',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'الشركات الخاضعة للضريبة',
    processing_time: '24 إلى 48 ساعة لإصدار الشهادة الضريبية',
    application_method: 'إلكتروني عبر بوابة ZATCA',
    official_url: 'https://zatca.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-24',
    featured: true,
    view_count: 16100,
    steps: [
      { step_number: 1, title_ar: 'التسجيل التلقائي عبر المركز السعودي للأعمال', description_ar: 'تسجيل الدخول لبوابة ZATCA باستخدام حساب المنشأة الوطني.' },
      { step_number: 2, title_ar: 'التسجيل في ضريبة القيمة المضافة (VAT)', description_ar: 'تحديد تواريخ التكليف وتقديرات المبيعات والنشاط الخاضع للضريبة.' },
      { step_number: 3, title_ar: 'استخراج شهادة التسجيل الضريبي', description_ar: 'طباعة شهادة ضريبة القيمة المضافة برقم ضريبي مكوّن من 15 رقماً.' }
    ],
    requirements: [
      { id: 'req-ztr-1', title_ar: 'سجل تجاري ساري وعنوان وطني مسجل', is_mandatory: true },
      { id: 'req-ztr-2', title_ar: 'بيانات الحساب البنكي التجاري أو تفاصيل رأس المال', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-ztr-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم التسجيل الضريبي وإصدار الشهادة',
        amount: 0,
        currency: 'ريال سعودي',
        source_name: 'هيئة الزكاة والضريبة والجمارك',
        verified_at: '2026-09-24',
        notes_ar: 'مجاناً من هيئة الزكاة والضريبة والجمارك.'
      }
    ],
    sources: [
      {
        source_name: 'بوابة هيئة الزكاة والضريبة والجمارك - ZATCA',
        source_url: 'https://zatca.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-24',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-national-address',
    slug: 'register-national-address',
    name_ar: 'تسجيل وتفعيل العنوان الوطني للمنشأة',
    name_en: 'Register National Address for Enterprise',
    description_ar: 'تسجيل العنوان الوطني الموحد لمقر الشركة الأجنبية وفروعها عبر سبل (البريد السعودي) كشرط إلزامي لفتح الحساب البنكي والرخص البلدية.',
    category_id: 'foreign-investment',
    category_name_ar: 'تأسيس واستثمار الشركات الأجنبية (MISA)',
    platform_id: 'absher',
    platform_name_ar: 'منصة سبل (البريد السعودي)',
    platform_url: 'https://splonline.com.sa',
    entity_name_ar: 'مؤسسة البريد السعودي (سبل)',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'جميع المنشآت والشركات',
    processing_time: 'فوري (خلال دقائق)',
    application_method: 'إلكتروني عبر منصة سبل للأعمال',
    official_url: 'https://splonline.com.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-25',
    featured: false,
    view_count: 8700,
    steps: [
      { step_number: 1, title_ar: 'تحديد موقع المقر على الخريطة الرقمية', description_ar: 'إدخال رقم المبنى، الرمز البريدي، والشارع والحي بدقة.' },
      { step_number: 2, title_ar: 'ربط العنوان برقم السجل التجاري ورقم 700', description_ar: 'تأكيد ملكية أو عقد إيجار المقر التجاري للمنشأة.' },
      { step_number: 3, title_ar: 'طباعة شهادة العنوان الوطني الرسمية', description_ar: 'استخراج وثيقة العنوان الوطني الرسمية المعتمدة لتقديمها للبنك والوزارات.' }
    ],
    requirements: [
      { id: 'req-na-1', title_ar: 'رقم السجل التجاري وعقد إيجار المقر (إيجار) أو صك الملكية', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-na-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم تسجيل العنوان الوطني للمنشآت الرئيسية',
        amount: 500,
        currency: 'ريال سعودي',
        source_name: 'البريد السعودي (سبل)',
        verified_at: '2026-09-25',
        notes_ar: 'رسوم سنوية لحسابات الأعمال والمنشآت.'
      }
    ],
    sources: [
      {
        source_name: 'منصة سبل أونلاين للأعمال',
        source_url: 'https://splonline.com.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-25',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-reg-gosi',
    slug: 'register-gosi-social-insurance',
    name_ar: 'التسجيل في التأمينات الاجتماعية (GOSI)',
    name_en: 'Social Insurance Registration (GOSI)',
    description_ar: 'فتح ملف المنشأة لدى المؤسسة العامة للتأمينات الاجتماعية وتسجيل الملاك والمشتركين السعوديين وغير السعوديين لتسديد الاشتراكات.',
    category_id: 'foreign-investment',
    category_name_ar: 'تأسيس واستثمار الشركات الأجنبية (MISA)',
    platform_id: 'absher',
    platform_name_ar: 'بوابة التأمينات الاجتماعية (GOSI)',
    platform_url: 'https://www.gosi.gov.sa',
    entity_name_ar: 'المؤسسة العامة للتأمينات الاجتماعية',
    target_audience: 'ESTABLISHMENTS',
    target_audience_label: 'المنشآت وأصحاب الأعمال',
    processing_time: 'فوري إلى 24 ساعة',
    application_method: 'إلكتروني عبر بوابة التأمينات أونلاين',
    official_url: 'https://www.gosi.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-22',
    featured: false,
    view_count: 9100,
    steps: [
      { step_number: 1, title_ar: 'تفعيل ملف المنشأة التلقائي', description_ar: 'تسجيل الدخول في تأمينات أعمال عبر النفاذ الوطني بعد صدور السجل.' },
      { step_number: 2, title_ar: 'تسجيل المشتركين الموظفين', description_ar: 'ربط بيانات الموظفين المسجلين في قوى واحتساب أجور الاشتراك الشهرية.' },
      { step_number: 3, title_ar: 'إصدار شهادة الالتزام', description_ar: 'سداد فواتير الاشتراكات واستخراج شهادة المنشأة سارية المفعول.' }
    ],
    requirements: [
      { id: 'req-rg-1', title_ar: 'سجل تجاري نشط وملف مكتب عمل معتمد', is_mandatory: true },
      { id: 'req-rg-2', title_ar: 'حساب بنكي تجاري نشط لسداد الفواتير الشهرية', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-rg-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم فتح الملف بالتأمينات',
        amount: 0,
        currency: 'ريال سعودي',
        source_name: 'التأمينات الاجتماعية',
        verified_at: '2026-09-22',
        notes_ar: 'فتح الملف مجاني، وتُدفع نسب الاشتراك الشهرية المقررة نظامياً.'
      }
    ],
    sources: [
      {
        source_name: 'بوابة المؤسسة العامة للتأمينات الاجتماعية',
        source_url: 'https://gosi.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-22',
        confidence: 'HIGH'
      }
    ]
  },
  {
    id: 'srv-open-bank-account',
    slug: 'open-corporate-bank-account',
    name_ar: 'فتح الحساب البنكي التجاري للشركة الأجنبية',
    name_en: 'Open Corporate Bank Account for Foreign Enterprise',
    description_ar: 'تجهيز الملف القانوني الكامل ومرافقة الشركاء لفتح الحسابات البنكية الاستثمارية والتجارية المعتمدة لدى كبرى البنوك السعودية.',
    category_id: 'foreign-investment',
    category_name_ar: 'تأسيس واستثمار الشركات الأجنبية (MISA)',
    platform_id: 'absher',
    platform_name_ar: 'البنوك السعودية المعتمدة (ساما)',
    platform_url: 'https://www.sama.gov.sa',
    entity_name_ar: 'البنك المركزي السعودي (ساما) والبنوك المعتمدة',
    target_audience: 'INVESTORS',
    target_audience_label: 'الشركات الأجنبية والاستثمارية',
    processing_time: '2 إلى 5 أيام عمل',
    application_method: 'تقديم رقمي ومصادقة قانونية في الفرع الاستثماري',
    official_url: 'https://www.sama.gov.sa',
    status: 'PUBLISHED',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-25',
    featured: true,
    view_count: 22800,
    steps: [
      { step_number: 1, title_ar: 'إعداد الملف القانوني للشركة', description_ar: 'تجميع ترخيص MISA، السجل التجاري، عقد التأسيس، العنوان الوطني، والرقم الضريبي.' },
      { step_number: 2, title_ar: 'تقديم طلب فتح الحساب الرقمي', description_ar: 'اختيار البنك التجاري المفضل وتعبئة نموذج التحقق واعرف عميلك (KYC).' },
      { step_number: 3, title_ar: 'تفعيل الحساب البنكي وبطاقات الصرف', description_ar: 'توقيع المفوض بالفرع واستلام رقم الآيبان (IBAN) وتفعيل الخدمات المصرفية للشركات.' }
    ],
    requirements: [
      { id: 'req-oba-1', title_ar: 'ترخيص MISA وسجل تجاري ساري المفعول', is_mandatory: true },
      { id: 'req-oba-2', title_ar: 'عقد تأسيس موثق وشهادة العنوان الوطني والشهادة الضريبية', is_mandatory: true },
      { id: 'req-oba-3', title_ar: 'إثبات هوية المفوض بالتوقيع وجواز سفره', is_mandatory: true }
    ],
    fees: [
      {
        id: 'fee-oba-1',
        fee_type: 'OFFICIAL_GOVERNMENT',
        title_ar: 'رسوم فتح الحساب البنكي التجاري',
        amount: 0,
        currency: 'ريال سعودي',
        source_name: 'البنك المركزي السعودي (ساما)',
        verified_at: '2026-09-25',
        notes_ar: 'فتح الحساب مجاني نظامياً من تعليمات البنك المركزي.'
      }
    ],
    sources: [
      {
        source_name: 'البنك المركزي السعودي (ساما) - تعليمات الحسابات البنكية للمنشآت',
        source_url: 'https://sama.gov.sa',
        source_type: 'GOV_PORTAL',
        verified_at: '2026-09-25',
        confidence: 'HIGH'
      }
    ]
  }
];
