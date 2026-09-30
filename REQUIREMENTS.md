# REQUIREMENTS.md

# دليل المقيم اليمني في السعودية --- Yemeni Resident Guide KSA

## Master Development & Production Requirements

> **نوع المشروع:** منصة رقمية إرشادية وخدماتية متكاملة للمقيمين اليمنيين
> في المملكة العربية السعودية\
> **الهدف:** تحويل الموقع الحالي إلى منصة Production-Ready قابلة للتوسع،
> تعتمد على قاعدة بيانات ومصادر موثقة، وتضم البحث الذكي، دليل الخدمات
> الحكومية، الأدلة الإرشادية، الحسابات، التنبيهات، دليل المكاتب،
> الحاسبات، والمساعد الذكي AI/RAG.

------------------------------------------------------------------------

# 1. MASTER DEVELOPMENT PROMPT

أنت تعمل كفريق هندسي متكامل يتكون من:

-   Senior Product Architect
-   Senior Full-Stack Engineer
-   UX/UI Designer
-   Arabic RTL Specialist
-   Database Architect
-   Backend Engineer
-   Frontend Engineer
-   AI Engineer
-   Security Engineer
-   DevOps Engineer
-   QA Engineer
-   SEO Specialist
-   Technical Content Architect
-   Government Services Information Architect

مهمتك ليست إنشاء Landing Page فقط.

مهمتك هي **تحليل المشروع الحالي بالكامل ثم إعادة بناء وتطوير منصة حقيقية
Production-Ready قابلة للتوسع والصيانة**.

اسم المشروع:

# دليل المقيم اليمني في السعودية

English:

# Yemeni Resident Guide --- Saudi Arabia

المنصة عبارة عن بوابة رقمية إرشادية للمقيمين اليمنيين في المملكة العربية
السعودية، تساعد المستخدم على الوصول إلى:

-   الخدمات الحكومية
-   الإجراءات
-   الشروط
-   المستندات
-   الرسوم
-   الروابط الرسمية
-   المنصات الحكومية
-   مكاتب الخدمات والتعقيب
-   الأسئلة الشائعة
-   التنبيهات
-   الأدلة الإرشادية
-   الحاسبات
-   المساعد الذكي

------------------------------------------------------------------------

# 2. الموقع الحالي

ابدأ بتحليل النسخة الحالية:

https://yemeni-resident-serv-3sw7.bolt.host/

**لا تبدأ بإعادة البناء مباشرة.**

قم أولًا بعمل:

1.  Audit كامل للواجهة.
2.  Audit كامل للوظائف.
3.  Audit كامل للمحتوى.
4.  Audit للـUX.
5.  Audit للـUI.
6.  Audit للـResponsive Design.
7.  Audit للكود إن كان متاحًا.
8.  Audit للبنية الحالية.
9.  Audit للبيانات.
10. Audit للأمان.
11. Audit للأداء.
12. Audit للـSEO.
13. Audit لإمكانية الوصول Accessibility.
14. تحديد ما يمكن الاحتفاظ به.
15. تحديد ما يجب إعادة بنائه.
16. تحديد المشاكل والعيوب.
17. إنشاء خطة تطوير قبل تنفيذ التعديلات.

لا تحذف وظيفة موجودة قبل التأكد من أنها غير مطلوبة.

------------------------------------------------------------------------

# 3. الهدف النهائي

تحويل المشروع من:

> موقع معلومات ثابت

إلى:

# Digital Resident Services Platform

تقدم التجربة:

**Search → Discover → Understand → Calculate → Prepare → Apply**

أي:

بحث\
↓\
العثور على الخدمة\
↓\
فهم المتطلبات\
↓\
معرفة الرسوم\
↓\
تجهيز المستندات\
↓\
الانتقال للجهة الرسمية\
↓\
متابعة المعلومات والتنبيهات

------------------------------------------------------------------------

# 4. المبادئ الأساسية

يجب أن تكون المنصة:

-   Arabic First
-   RTL First
-   Mobile First
-   Fast
-   Secure
-   Accessible
-   SEO Friendly
-   Scalable
-   Modular
-   API Driven
-   Database Driven
-   CMS Driven
-   AI Ready
-   PWA Ready

------------------------------------------------------------------------

# 5. الهوية البصرية

اعتمد هوية:

**Premium / Modern / Clean / Trustworthy / Government-service oriented**

الألوان الأساسية:

-   Primary: `#0B1F3A`
-   Secondary: `#C8A45D`
-   Background: `#F7F8FA`
-   Cards: `#FFFFFF`
-   Text: `#172033`
-   Success: `#168A5B`
-   Warning: `#D98C10`
-   Danger: `#C73B3B`

استخدم:

-   Glassmorphism بشكل محدود
-   Soft shadows
-   Rounded cards
-   Elegant gradients
-   Micro interactions
-   Smooth transitions
-   Skeleton loading
-   Empty states
-   Toast notifications
-   Bottom navigation على الهاتف عند الحاجة

لا تجعل التصميم يبدو كـDashboard تقليدي.

------------------------------------------------------------------------

# 6. اللغة

اللغة الأساسية:

**العربية**

RTL بشكل كامل.

اللغة الثانوية:

**English**

يجب دعم:

Arabic / English

مع إمكانية إضافة لغات أخرى مستقبلًا.

لا تكتب نصوصًا عربية داخل الكود بشكل عشوائي.

استخدم:

`i18n`

وجميع النصوص داخل ملفات ترجمة.

------------------------------------------------------------------------

# 7. الصفحة الرئيسية

أنشئ Homepage احترافية تحتوي على:

## Hero

العنوان:

> دليل المقيم اليمني في السعودية

النص:

> كل ما تحتاجه من معلومات وإجراءات وخدمات للمقيمين اليمنيين في المملكة
> العربية السعودية في مكان واحد.

الأزرار:

-   ابحث عن خدمة
-   استكشف الخدمات

Search:

> ما الخدمة التي تبحث عنها؟

أمثلة:

-   تجديد الإقامة
-   نقل الخدمات
-   تأشيرة زيارة عائلية
-   رخصة العمل
-   تأسيس شركة
-   تسجيل منشأة
-   التأمين الطبي
-   مدد

------------------------------------------------------------------------

# 8. البحث الذكي

أنشئ Search Engine حقيقي.

يجب البحث في:

-   الخدمات
-   المقالات
-   الأسئلة الشائعة
-   المنصات
-   الإجراءات
-   الرسوم
-   المستندات
-   الجهات الحكومية

يدعم:

-   Arabic normalization
-   typo tolerance
-   synonyms
-   autocomplete
-   ranking

مثال:

`تجديد اقامه`

يجد:

`تجديد الإقامة`

مثال:

`نقل كفاله`

يجد:

`نقل الخدمات`

------------------------------------------------------------------------

# 9. نظام الخدمات

أنشئ Service Catalog.

كل خدمة تحتوي على:

-   ID
-   Name
-   Slug
-   Arabic name
-   English name
-   Category
-   Subcategory
-   Government entity
-   Government platform
-   Description
-   Eligibility
-   Steps
-   Required documents
-   Fees
-   Processing time
-   Official URL
-   Contact
-   Last verified date
-   Source URL
-   Source type
-   Status
-   Version
-   Notes
-   FAQ
-   Related services

------------------------------------------------------------------------

# 10. صفحة الخدمة

كل خدمة يجب أن تحتوي على:

## Header

-   اسم الخدمة
-   الجهة
-   المنصة

## معلومات سريعة

Cards:

-   الرسوم
-   مدة التنفيذ
-   الفئة المستهدفة
-   طريقة التقديم
-   المنصة

## المتطلبات

Checklist.

## الخطوات

Timeline:

1.  تسجيل الدخول
2.  اختيار الخدمة
3.  إدخال البيانات
4.  رفع المستندات
5.  الدفع إن وجد
6.  إتمام الطلب

## الرسوم

اعرض:

-   رسوم حكومية
-   رسوم محتملة
-   رسوم إضافية
-   ملاحظات
-   المصدر
-   تاريخ التحقق

ولا تعرض رقمًا على أنه رسمي إلا إذا كان مرتبطًا بمصدر موثوق.

------------------------------------------------------------------------

# 11. نظام مصادر المعلومات

كل معلومة حكومية يجب أن تحتوي داخليًا على:

-   `source_url`
-   `source_name`
-   `source_type`
-   `verified_at`
-   `last_checked_at`
-   `expires_at`
-   `confidence`
-   `verification_status`

حالات التحقق:

-   VERIFIED
-   RECENTLY_VERIFIED
-   NEEDS_REVIEW
-   OUTDATED
-   UNVERIFIED

إذا كانت البيانات قديمة اعرض:

> قد تكون هذه المعلومة بحاجة إلى تحديث. يرجى مراجعة المصدر الرسمي.

وزر:

> التحقق من المصدر الرسمي

------------------------------------------------------------------------

# 12. القطاعات الأساسية

ابدأ بالقطاعات الحالية:

1.  الجوازات والإقامة
2.  الزيارات والتأشيرات
3.  العمل والموارد البشرية
4.  حماية الأجور والرواتب
5.  العمالة المنزلية
6.  المرور والمركبات
7.  التأمين والرعاية الصحية
8.  تأسيس الأعمال والاستثمار
9.  الشؤون البلدية
10. السلامة والدفاع المدني
11. التأمينات الاجتماعية
12. الزكاة والضرائب

وقابلية إضافة:

13. التعليم
14. الخدمات البنكية والمالية ذات الصلة بالمقيم
15. السكن والعقود
16. الخدمات القانونية والإرشادية

لا تجعل عدد الخدمات أو القطاعات Hardcoded.

------------------------------------------------------------------------

# 13. المنصات الحكومية

أنشئ Government Platforms Directory.

يجب أن يكون النظام قادرًا على إدارة:

-   أبشر
-   أبشر أعمال
-   مقيم
-   قوى
-   مدد
-   مساند
-   بلدي
-   سلامة
-   التأمينات الاجتماعية
-   هيئة الزكاة والضريبة والجمارك
-   وزارة التجارة
-   وزارة الاستثمار
-   وزارة الداخلية
-   وزارة الموارد البشرية
-   وغيرها

كل منصة تحتوي على:

-   Logo
-   Name
-   Description
-   Services count
-   Official URL
-   Target users
-   Related services
-   Verification status

------------------------------------------------------------------------

# 14. حساب المستخدم

أنشئ:

-   Register
-   Login
-   Logout
-   Forgot password
-   Email verification
-   Phone verification

الملف الشخصي يدعم:

-   الخدمات المفضلة
-   الخدمات المستخدمة
-   المقالات المحفوظة
-   التنبيهات
-   التذكيرات
-   المواعيد

لا تجمع بيانات شخصية حساسة إلا عند وجود سبب وظيفي واضح وموافقة المستخدم.

------------------------------------------------------------------------

# 15. لوحة المستخدم

Dashboard تعرض:

-   الخدمات المحفوظة
-   آخر عمليات البحث
-   التذكيرات
-   التنبيهات
-   التحديثات الحكومية
-   المواعيد
-   المستندات إن تم دعمها

------------------------------------------------------------------------

# 16. نظام التنبيهات

Notification Engine يدعم:

-   تحديث خدمة
-   تغيير رسوم
-   تغيير شروط
-   انتهاء مستند
-   انتهاء إقامة
-   انتهاء جواز
-   انتهاء تأمين
-   تذكير موعد
-   تنبيه مهم

القنوات:

-   داخل الموقع
-   Email
-   Push Notification

SMS مستقبلًا.

------------------------------------------------------------------------

# 17. التذكيرات

يمكن للمستخدم إنشاء:

> ذكّرني قبل انتهاء الإقامة

> ذكّرني بتجديد التأمين

> ذكّرني بموعد

الحقول:

-   date
-   time
-   recurrence
-   notification_channel

------------------------------------------------------------------------

# 18. حاسبة الرسوم

أنشئ:

## Government Fee Calculator

مثال:

نوع الخدمة\
المدة\
الفئة

الناتج:

-   الرسوم الحكومية المحتملة
-   الرسوم الإضافية
-   الملاحظات
-   المصدر
-   تاريخ آخر تحقق

لا تستخدم قيمة ثابتة إذا كانت قابلة للتغير.

------------------------------------------------------------------------

# 19. حاسبة نقل الخدمات

Wizard:

-   نوع النقل
-   المرة
-   نوع العامل
-   حالة المنشأة
-   الحالة النظامية

ثم تعرض المعلومات والتكاليف ذات الصلة **فقط إذا كانت موثقة**.

------------------------------------------------------------------------

# 20. حاسبة تأسيس الأعمال

Wizard:

-   نوع الكيان
-   النشاط
-   شريك سعودي / أجنبي
-   نوع الاستثمار
-   المدينة

الناتج:

-   الخطوات
-   الجهات
-   المستندات
-   الرسوم المحتملة
-   المنصات

------------------------------------------------------------------------

# 21. دليل مكاتب الخدمات

أنشئ Directory لمكاتب:

-   التعقيب
-   الخدمات الحكومية
-   مكاتب الاستقدام
-   المحاسبة
-   الخدمات القانونية
-   التأمين
-   الخدمات التجارية

كل مكتب:

-   Name
-   Logo
-   Description
-   Services
-   City
-   District
-   Phone
-   WhatsApp
-   Website
-   Working hours
-   Verified status
-   License information إذا كانت متاحة وموثقة
-   Rating
-   Reviews

------------------------------------------------------------------------

# 22. التحقق من المكاتب

Workflow:

`Submit → Review → Verification → Approval → Publish`

Admin يستطيع:

-   Approve
-   Reject
-   Suspend
-   Verify
-   Request documents

------------------------------------------------------------------------

# 23. نظام التقييم

المستخدم يستطيع تقييم المكتب:

-   Rating
-   Review
-   Service type
-   Date
-   Verification

مع Moderation ومنع Spam.

------------------------------------------------------------------------

# 24. دليل المدن

أنشئ Saudi Cities Directory.

أمثلة:

-   الرياض
-   جدة
-   مكة
-   المدينة
-   الدمام
-   الخبر
-   الطائف
-   أبها
-   جازان

كل مدينة:

-   الخدمات
-   المكاتب
-   الجهات
-   الفروع
-   المعلومات ذات الصلة

------------------------------------------------------------------------

# 25. دليل المستندات

أنشئ Document Checklist Engine.

لكل خدمة:

-   Required
-   Optional
-   Conditional

مثال:

تجديد إقامة:

-   جواز السفر
-   الإقامة
-   الصورة
-   سداد الرسوم إن وجد

------------------------------------------------------------------------

# 26. مولد Checklist ذكي

المستخدم يجيب عن:

-   نوع الخدمة
-   حالته
-   هل هو موظف؟
-   هل لديه تابعون؟
-   هل الإقامة سارية؟

ثم النظام يولد:

# Checklist مخصصة

------------------------------------------------------------------------

# 27. المساعد الذكي AI

أنشئ واجهة Chat حديثة.

الرسالة:

> أهلاً وسهلاً! أنا المساعد الذكي لدليل المقيم اليمني. أساعدك في فهم
> الخدمات والإجراءات الحكومية في السعودية.

أمثلة:

-   كيف أجدد إقامتي؟
-   كم رسوم نقل الخدمات؟
-   كيف أقدم زيارة عائلية؟
-   كيف أسجل في مدد؟
-   كيف أنقل خدمات عامل؟
-   كيف أؤسس شركة؟
-   ما المستندات المطلوبة؟
-   أين أقدم الطلب؟
-   ما المنصة الرسمية؟

------------------------------------------------------------------------

# 28. AI Safety

المساعد ممنوع من اختراع:

-   رسوم
-   قوانين
-   شروط
-   روابط
-   قرارات حكومية

إذا لم يجد مصدرًا موثوقًا:

> لم أجد مصدرًا رسميًا مؤكدًا لهذه المعلومة.

ثم يعرض المصدر الرسمي إن توفر.

ولا يدعي أنه جهة حكومية.

------------------------------------------------------------------------

# 29. RAG

استخدم Retrieval Augmented Generation.

مصادر المعرفة:

-   المواقع الحكومية
-   الأدلة الرسمية
-   PDFs الحكومية
-   صفحات الخدمات
-   اللوائح الرسمية
-   الإعلانات الرسمية

لا تجعل النموذج يعتمد على Knowledge عامة فقط.

------------------------------------------------------------------------

# 30. AI Citation System

كل إجابة AI يجب أن تستطيع إظهار:

-   المصدر
-   اسم الجهة
-   تاريخ التحقق
-   الرابط
-   درجة الثقة عند الحاجة

Pipeline:

`User Question → Intent Detection → Service Detection → Knowledge Retrieval → Source Ranking → Answer Generation → Citation → Confidence`

------------------------------------------------------------------------

# 31. قاعدة البيانات

استخدم PostgreSQL.

الجداول الأساسية:

-   users
-   roles
-   permissions
-   services
-   service_categories
-   government_entities
-   government_platforms
-   service_steps
-   service_requirements
-   service_fees
-   service_sources
-   service_updates
-   documents
-   cities
-   offices
-   office_services
-   office_reviews
-   favorites
-   notifications
-   reminders
-   articles
-   faqs
-   ai_conversations
-   ai_messages
-   audit_logs
-   translations

------------------------------------------------------------------------

# 32. Service Schema

منطقيًا:

``` text
Service
├── id
├── slug
├── name_ar
├── name_en
├── description_ar
├── description_en
├── category_id
├── government_entity_id
├── platform_id
├── status
├── featured
├── created_at
├── updated_at
└── last_verified_at
```

------------------------------------------------------------------------

# 33. API

أنشئ REST API منظمة.

## Services

``` text
GET    /api/services
GET    /api/services/:slug
POST   /api/services
PATCH  /api/services/:id
DELETE /api/services/:id
```

## Search

``` text
GET /api/search?q=
```

## Categories

``` text
GET /api/categories
GET /api/categories/:slug
```

## Platforms

``` text
GET /api/platforms
GET /api/platforms/:slug
```

## Offices

``` text
GET /api/offices
GET /api/offices/:id
POST /api/offices
```

## Reviews

``` text
POST /api/offices/:id/reviews
```

## Favorites

``` text
POST   /api/favorites
DELETE /api/favorites/:id
```

## Notifications

``` text
GET   /api/notifications
PATCH /api/notifications/:id/read
```

## AI

``` text
POST /api/ai/chat
GET  /api/ai/conversations
GET  /api/ai/conversations/:id
```

------------------------------------------------------------------------

# 34. Authentication

استخدم:

-   Secure session أو JWT
-   Access token
-   Refresh token عند الحاجة
-   Secure cookies
-   Password hashing
-   Email verification
-   Optional 2FA
-   Rate limiting

------------------------------------------------------------------------

# 35. Roles

## USER

مستخدم عادي.

## VERIFIED_USER

مستخدم موثق.

## OFFICE_OWNER

صاحب مكتب.

## OFFICE_MANAGER

مدير مكتب.

## CONTENT_EDITOR

محرر محتوى.

## CONTENT_REVIEWER

مراجع محتوى.

## ADMIN

مدير النظام.

## SUPER_ADMIN

صلاحيات كاملة.

------------------------------------------------------------------------

# 36. لوحة الإدارة

Admin Dashboard كاملة.

تعرض:

-   Users
-   Services
-   Government platforms
-   Offices
-   Articles
-   Reviews
-   AI conversations
-   Pending approvals
-   Expired sources
-   Outdated services
-   Reports

------------------------------------------------------------------------

# 37. إدارة الخدمات

Admin يستطيع:

-   Create
-   Edit
-   Delete
-   Publish
-   Unpublish
-   Archive
-   Duplicate
-   Verify
-   Request review

------------------------------------------------------------------------

# 38. نظام مراجعة المحتوى

Workflow:

``` text
Draft
↓
Under Review
↓
Verified
↓
Published
↓
Needs Update
↓
Archived
```

------------------------------------------------------------------------

# 39. تحديث المحتوى

أنشئ:

## Content Health Dashboard

يعرض:

-   الخدمات الموثقة
-   الخدمات التي تحتاج تحديث
-   الخدمات منتهية التحقق
-   المصادر المعطلة
-   الروابط المعطلة

------------------------------------------------------------------------

# 40. Link Checker

Scheduled Job لفحص:

-   Official URLs
-   Source URLs
-   External Links

الحالات:

-   200
-   301
-   404
-   403
-   500

------------------------------------------------------------------------

# 41. نظام البحث

استخدم PostgreSQL Full Text Search أو Meilisearch حسب حجم المشروع.

يجب دعم:

-   Arabic normalization
-   stemming
-   typo tolerance
-   synonyms
-   ranking
-   autocomplete
-   filters

------------------------------------------------------------------------

# 42. SEO

كل Service:

-   SEO title
-   SEO description
-   OG image
-   canonical
-   schema.org
-   BreadcrumbList
-   FAQ schema
-   Service structured data عند ملاءمته

صفحات SEO:

``` text
/services
/services/:category
/service/:slug
/platforms
/platforms/:slug
/articles
/articles/:slug
/cities
/cities/:slug
/offices
/offices/:city
/faq
```

أنشئ:

-   sitemap.xml
-   robots.txt
-   RSS/Atom للمقالات إذا كان مناسبًا

------------------------------------------------------------------------

# 43. PWA

المنصة يجب أن تكون:

-   Installable
-   Offline basic content
-   Fast loading
-   Push Notifications
-   App-like navigation

------------------------------------------------------------------------

# 44. Mobile

تجربة الهاتف أولوية.

Bottom Navigation:

-   الرئيسية
-   الخدمات
-   البحث
-   المساعد
-   حسابي

------------------------------------------------------------------------

# 45. Accessibility

دعم:

-   Keyboard navigation
-   ARIA
-   Screen readers
-   Color contrast
-   Focus states
-   Reduced motion
-   Font scaling

------------------------------------------------------------------------

# 46. الأداء

استهدف:

-   LCP \< 2.5s
-   CLS \< 0.1
-   INP \< 200ms
-   Fast initial load
-   Lazy loading
-   Image optimization
-   Code splitting
-   Caching
-   CDN
-   Compression

الصور:

-   WebP
-   AVIF
-   Responsive images
-   Lazy loading
-   Blur placeholders

------------------------------------------------------------------------

# 47. Security

طبّق:

-   OWASP practices
-   CSRF protection
-   XSS protection
-   SQL injection prevention
-   Rate limiting
-   Input validation
-   Output encoding
-   Secure headers
-   CORS policy
-   Secure cookies
-   Password hashing
-   Audit logging

------------------------------------------------------------------------

# 48. البيانات الحساسة

لا تخزن:

-   رقم هوية
-   رقم إقامة
-   جواز
-   بيانات مالية
-   مستندات شخصية

إلا عند وجود سبب وظيفي واضح وموافقة المستخدم.

عند الحاجة:

-   Encryption at rest
-   Encryption in transit
-   Access control
-   Audit logs

ولا تظهر البيانات الحساسة في:

-   URL
-   Logs
-   Analytics
-   Browser history

------------------------------------------------------------------------

# 49. Admin Audit Logs

سجل:

-   من قام بالتعديل
-   ماذا عدّل
-   القيمة القديمة
-   القيمة الجديدة
-   الوقت
-   IP
-   User Agent

------------------------------------------------------------------------

# 50. مركز الأخبار والتحديثات

أنشئ Government Updates.

كل تحديث:

-   Title
-   Summary
-   Source
-   Published date
-   Verified date
-   Related services

------------------------------------------------------------------------

# 51. نظام المقارنة

اسمح للمستخدم بمقارنة:

-   خدمتين
-   طريقتين
-   منصتين

بدون اختلاق معلومات أو إصدار حكم غير موثق.

------------------------------------------------------------------------

# 52. FAQ

كل FAQ:

-   Question
-   Answer
-   Category
-   Related Service
-   Source
-   Last Verified

------------------------------------------------------------------------

# 53. UX

قاعدة:

> 3 Click Rule

يجب الوصول للخدمة الرئيسية من الصفحة الرئيسية خلال 3 نقرات أو أقل قدر
الإمكان.

------------------------------------------------------------------------

# 54. Smart Onboarding

عند الدخول لأول مرة:

> ما الذي تبحث عنه؟

الخيارات:

-   إقامة
-   عمل
-   زيارة
-   سيارة
-   تأمين
-   عمل تجاري
-   عمالة منزلية
-   خدمات أخرى

ثم تخصيص التجربة.

------------------------------------------------------------------------

# 55. Smart Personalization

بعد تسجيل الدخول:

-   خدماتك
-   آخر ما بحثت عنه
-   الخدمات المقترحة
-   التنبيهات المهمة

------------------------------------------------------------------------

# 56. نظام المواعيد

المستخدم يستطيع تسجيل:

-   موعد
-   جهة
-   خدمة
-   تاريخ
-   وقت
-   عنوان
-   ملاحظات

------------------------------------------------------------------------

# 57. خريطة الجهات

Architecture جاهزة مستقبلًا لـ:

-   Government Offices
-   Service Centers
-   Insurance Offices
-   Recruitment Offices
-   Business Services

------------------------------------------------------------------------

# 58. المحتوى المدفوع مستقبلاً

اجعل Architecture قابلة مستقبلًا لإضافة:

-   Premium Guides
-   Paid Consultation
-   Verified Service Providers
-   Featured Offices
-   Lead Generation
-   Advertising
-   Marketplace

لكن لا تجعلها تعيق النسخة الأساسية.

------------------------------------------------------------------------

# 59. الإعلانات

إن أضيفت إعلانات مستقبلًا:

لا تفسد تجربة المستخدم.

ويجب أن تكون منفصلة بوضوح عن:

-   المحتوى الحكومي
-   البيانات الرسمية
-   نتائج البحث

------------------------------------------------------------------------

# 60. عدم الإيحاء بأن المنصة حكومية

ضع بوضوح:

> هذه منصة إرشادية مستقلة وليست جهة حكومية.

ولا تستخدم الشعارات الحكومية بطريقة توحي بأن المنصة تابعة للحكومة.

------------------------------------------------------------------------

# 61. Disclaimer

اعرض:

> المعلومات المقدمة للإرشاد فقط، وقد تتغير المتطلبات والرسوم والإجراءات.
> يرجى دائمًا مراجعة الجهة الرسمية قبل تنفيذ أي معاملة.

------------------------------------------------------------------------

# 62. مصادر البيانات

الأولوية:

1.  الجهات الحكومية السعودية الرسمية
2.  المنصات الحكومية الرسمية
3.  الأدلة الرسمية
4.  اللوائح والأنظمة الرسمية
5.  المصادر الحكومية الموثوقة

لا تعتمد على:

-   منتديات مجهولة
-   منشورات Social Media
-   معلومات غير موثقة
-   مقالات قديمة

------------------------------------------------------------------------

# 63. Source Priority

``` text
Official Government
>
Official Platform
>
Official PDF
>
Official Announcement
>
Secondary Trusted Source
>
Unverified Source
```

------------------------------------------------------------------------

# 64. التعامل مع تغير الرسوم

لا تعدل الرسوم داخل الواجهة مباشرة.

استخدم:

``` text
service_fees
├── amount
├── currency
├── fee_type
├── effective_from
├── effective_to
├── source
└── verified_at
```

------------------------------------------------------------------------

# 65. Versioning

كل خدمة يمكن أن يكون لها:

-   Version 1
-   Version 2
-   Version 3

مع سجل التغييرات.

Admin يستطيع رؤية:

**Before / After / Editor / Date**

------------------------------------------------------------------------

# 66. نظام البحث التحليلي

سجل:

-   query
-   language
-   timestamp
-   result_count

إذا لم يجد المستخدم نتيجة، اعرض:

-   اقتراحات
-   المساعد الذكي
-   طلب إضافة الخدمة

Admin يرى:

-   أكثر الخدمات بحثًا
-   أكثر الأسئلة
-   عمليات البحث بلا نتائج

------------------------------------------------------------------------

# 67. صفحة "ابدأ من هنا"

أنشئ:

# ماذا تحتاج؟

خيارات:

-   أحتاج تجديد إقامتي
-   أريد نقل خدماتي
-   أريد زيارة عائلية
-   أريد استقدام عمالة منزلية
-   أريد تأسيس شركة
-   أريد تسجيل منشأة
-   أريد التأمين الطبي
-   أريد معرفة حقوقي كموظف

------------------------------------------------------------------------

# 68. Decision Wizard

أنشئ:

> ساعدني في العثور على الخدمة

الأسئلة تحدد:

-   نوع المعاملة
-   حالة المستخدم
-   الهدف
-   الفئة

ثم تعرض الخدمات المحتملة.

------------------------------------------------------------------------

# 69. صفحة حقوق المقيم

أضف قسم:

> حقوق وواجبات المقيم

مع ربط كل معلومة بمصدر موثوق.

------------------------------------------------------------------------

# 70. صفحة الطوارئ

Emergency Directory:

-   الشرطة
-   الدفاع المدني
-   الهلال الأحمر
-   الجوازات
-   المرور
-   البلاغات ذات الصلة

مع:

-   الأرقام
-   المصدر الرسمي
-   الملاحظات

------------------------------------------------------------------------

# 71. مركز الدعم

يشمل:

-   FAQ
-   Contact
-   Report incorrect information
-   Suggest service
-   Report broken link

------------------------------------------------------------------------

# 72. الإبلاغ عن معلومة خاطئة

كل صفحة خدمة:

> هل وجدت معلومة غير صحيحة؟

Form:

-   المعلومة
-   المشكلة
-   المصدر المقترح
-   المرفق عند الحاجة

ثم:

`Pending → Reviewed → Resolved`

------------------------------------------------------------------------

# 73. نظام الاقتراحات

المستخدم يستطيع اقتراح:

-   خدمة
-   مقال
-   منصة
-   تحديث

Admin Moderation:

-   Pending
-   Reviewed
-   Accepted
-   Rejected
-   Implemented

------------------------------------------------------------------------

# 74. المحتوى

أنشئ CMS لإنتاج:

-   Guides
-   FAQs
-   How-to articles
-   Government updates
-   City guides
-   Service comparisons

Internal Linking بين:

-   Services
-   Platforms
-   FAQs
-   Related articles

------------------------------------------------------------------------

# 75. الصفحة الرئيسية النهائية

يجب أن تحتوي على:

1.  Hero
2.  Search
3.  Popular services
4.  Categories
5.  Government platforms
6.  Smart wizard
7.  Latest updates
8.  Popular guides
9.  Verified offices
10. FAQ
11. AI Assistant
12. Footer

------------------------------------------------------------------------

# 76. Footer

-   عن المنصة
-   القطاعات
-   الخدمات
-   المنصات الحكومية
-   المقالات
-   الأسئلة الشائعة
-   اتصل بنا
-   سياسة الخصوصية
-   الشروط
-   إخلاء المسؤولية

------------------------------------------------------------------------

# 77. Legal Pages

أنشئ:

-   Privacy Policy
-   Terms of Service
-   Cookie Policy
-   Disclaimer

وإدارة الموافقات إذا تم استخدام:

-   Analytics
-   Cookies
-   Marketing
-   Push

------------------------------------------------------------------------

# 78. لا تستخدم بيانات وهمية كبيانات حقيقية

يمكن استخدام Seed Data للتطوير، لكن يجب تمييزها:

`DEMO DATA`

ولا تظهر للمستخدم النهائي على أنها بيانات رسمية.

------------------------------------------------------------------------

# 79. قواعد البيانات الديناميكية

ممنوع كتابة:

> "15 خدمة"

بشكل ثابت داخل الواجهة.

استخدم Database Queries.

مثال:

``` text
services.length
```

أو Query من قاعدة البيانات.

------------------------------------------------------------------------

# 80. Dashboard Statistics

اعرض:

-   عدد الخدمات
-   عدد الجهات
-   عدد المنصات
-   عدد الأدلة
-   عدد المستخدمين
-   عدد المكاتب
-   عدد الخدمات الموثقة
-   عدد الخدمات التي تحتاج تحديث

------------------------------------------------------------------------

# 81. Scheduled Jobs

Daily:

-   Link checker
-   Source checker
-   Content freshness

Weekly:

-   Service verification queue

Monthly:

-   SEO audit

------------------------------------------------------------------------

# 82. Analytics

تتبع بشكل يحترم الخصوصية:

-   Page views
-   Service views
-   Search queries
-   Popular services
-   Failed searches
-   AI questions
-   Conversion to official source

ولا تجمع بيانات شخصية غير ضرورية.

------------------------------------------------------------------------

# 83. Architecture

الاقتراح المفضل:

## Frontend

-   Next.js / React
-   TypeScript
-   Tailwind CSS
-   shadcn/ui
-   Framer Motion

## Backend

-   Node.js
-   NestJS أو Express/Fastify

## Database

-   PostgreSQL

## ORM

-   Prisma

## Cache

-   Redis

## Search

-   PostgreSQL FTS / Meilisearch

## Storage

-   S3-compatible storage

## Auth

-   Secure sessions/JWT

## AI

-   LLM + RAG

------------------------------------------------------------------------

# 84. Folder Structure

استخدم Architecture منظمة:

``` text
src/
├── app/
├── components/
├── features/
├── services/
├── lib/
├── hooks/
├── types/
├── utils/
├── config/
├── i18n/
├── styles/
├── api/
└── database/
```

Feature-based:

``` text
features/
├── services/
├── search/
├── auth/
├── offices/
├── notifications/
├── ai/
├── articles/
├── favorites/
├── users/
└── admin/
```

------------------------------------------------------------------------

# 85. API Architecture

استخدم:

-   Controller
-   Service
-   Repository
-   DTO
-   Validation
-   Error handling
-   Logging
-   Testing

------------------------------------------------------------------------

# 86. Error Handling

لا تعرض فقط:

`500 Internal Server Error`

بل:

> حدث خطأ غير متوقع، حاول مرة أخرى.

مع Error ID للدعم الفني.

كل صفحة يجب أن تحتوي على:

-   Loading
-   Skeleton
-   Empty
-   Error
-   Success

------------------------------------------------------------------------

# 87. Testing

أنشئ:

-   Unit tests
-   Integration tests
-   API tests
-   E2E tests
-   Security tests
-   Accessibility tests
-   Performance tests

------------------------------------------------------------------------

# 88. CI/CD

Pipeline:

``` text
Lint
↓
Typecheck
↓
Test
↓
Build
↓
Security Scan
↓
Deploy
```

------------------------------------------------------------------------

# 89. Environment

استخدم:

-   `.env`
-   `.env.example`

لا تضع:

-   API Keys
-   Secrets
-   Database credentials

داخل Git.

------------------------------------------------------------------------

# 90. Documentation

أنشئ:

``` text
README.md
REQUIREMENTS.md
ARCHITECTURE.md
API.md
DATABASE.md
SECURITY.md
DEPLOYMENT.md
ADMIN_GUIDE.md
CONTENT_GUIDE.md
AI.md
CONTRIBUTING.md
CHANGELOG.md
ROADMAP.md
```

------------------------------------------------------------------------

# 91. Health API

أنشئ:

``` text
GET /api/health
```

يعرض:

-   API status
-   Database status
-   Cache status
-   Version
-   Environment

------------------------------------------------------------------------

# 92. Monitoring

راقب:

-   Errors
-   Latency
-   API failures
-   Database failures
-   Search failures
-   AI failures
-   External source failures

------------------------------------------------------------------------

# 93. Backup

Database:

-   Daily backup
-   Weekly retention
-   Monthly retention

وثّق استعادة النسخة الاحتياطية.

------------------------------------------------------------------------

# 94. Disaster Recovery

وثّق:

-   Backup restoration
-   Database recovery
-   Environment recovery
-   Secrets rotation

------------------------------------------------------------------------

# 95. Security Headers

استخدم:

-   CSP
-   HSTS
-   X-Content-Type-Options
-   Referrer-Policy
-   Permissions-Policy
-   Frame protection

------------------------------------------------------------------------

# 96. API Rate Limits

مثال مبدئي:

Public API:

`60 requests/min`

Authentication:

`10 requests/min`

AI:

بحسب الاستخدام والتكلفة.

Admin:

حدود أعلى مع حماية إضافية.

------------------------------------------------------------------------

# 97. AI Cost Control

استخدم:

-   Caching
-   Prompt compression
-   Context limits
-   Model routing
-   FAQ retrieval
-   Semantic cache

------------------------------------------------------------------------

# 98. AI System Prompt

النظام الداخلي للمساعد:

> أنت المساعد الذكي لمنصة دليل المقيم اليمني في السعودية.
>
> مهمتك تقديم معلومات إرشادية دقيقة للمستخدمين.
>
> لا تخترع أي رسوم أو شروط أو قوانين.
>
> اعتمد على المصادر الموجودة في Knowledge Base.
>
> إذا لم تجد مصدرًا موثوقًا، صرّح بذلك.
>
> اعرض المصدر عند الإجابة.
>
> اذكر تاريخ آخر تحقق عندما تكون المعلومة قابلة للتغير.
>
> لا تدّعي أنك جهة حكومية.
>
> لا تقدم استشارة قانونية ملزمة.
>
> شجع المستخدم على مراجعة الجهة الرسمية عند القرارات المهمة.

------------------------------------------------------------------------

# 99. Smart Answer Format

عند سؤال المستخدم:

> كيف أجدد الإقامة؟

أجب بهذا الهيكل:

1.  الخدمة
2.  الجهة
3.  المنصة
4.  من يمكنه استخدامها
5.  المتطلبات
6.  الخطوات
7.  الرسوم
8.  المدة
9.  الرابط الرسمي
10. آخر تحقق
11. ملاحظات

------------------------------------------------------------------------

# 100. Official Source Button

كل خدمة يجب أن تحتوي على:

> الانتقال للمصدر الرسمي

ولا تستخدم Redirect مخفي.

------------------------------------------------------------------------

# 101. Government Source Badge

اعرض:

`✓ مصدر رسمي`

أو:

`⚠ يحتاج إلى تحقق`

------------------------------------------------------------------------

# 102. UX Writing

استخدم لغة:

-   واضحة
-   مباشرة
-   سهلة
-   عربية سليمة
-   مفهومة للمقيم

تجنب:

-   المصطلحات التقنية
-   الفقرات الطويلة
-   الجمل المعقدة

استخدم:

-   Step-by-step
-   Cards
-   Checklists
-   Timelines

------------------------------------------------------------------------

# 103. المكاتب والخدمات التجارية

أي مكتب يتم إدراجه يجب أن يمر عبر:

``` text
Submit
↓
Review
↓
Verification
↓
Approval
↓
Publish
```

ولا يعتبر أي مكتب "موثوقًا" إلا بعد وجود آلية تحقق واضحة.

------------------------------------------------------------------------

# 104. الخريطة

اجعل Architecture جاهزة لإضافة Map Provider لاحقًا.

الخريطة لا تعرض مواقع شخصية حساسة.

------------------------------------------------------------------------

# 105. عدم الخلط بين الإرشاد والتنفيذ الحكومي

المنصة الأساسية إرشادية.

لا تدّعي تنفيذ المعاملة الحكومية إلا إذا تم إنشاء تكامل رسمي ومصرح به مع
الجهة ذات العلاقة.

------------------------------------------------------------------------

# 106. قواعد المحتوى الحكومي

لا تعتبر المعلومات:

-   رسمية
-   ملزمة
-   نهائية

إلا عندما يكون المصدر الرسمي واضحًا.

كل معلومة متغيرة يجب أن يكون لها:

`source + verified_at + status`

------------------------------------------------------------------------

# 107. Content Freshness

كل خدمة يجب أن تدخل في نظام:

``` text
Fresh
↓
Review Due
↓
Needs Review
↓
Outdated
```

ويظهر ذلك في Admin.

------------------------------------------------------------------------

# 108. PHASE 0 --- FULL SYSTEM AUDIT

قبل أي إعادة بناء:

أنشئ:

`AUDIT.md`

ويحتوي:

-   Current Architecture
-   Current Features
-   Problems
-   Bugs
-   Security Issues
-   Performance Issues
-   UX Issues
-   SEO Issues
-   Missing Features
-   Technical Debt
-   Recommended Architecture

------------------------------------------------------------------------

# 109. PHASE 1 --- ARCHITECTURE

أنشئ:

`ARCHITECTURE.md`

يوضح:

-   Frontend
-   Backend
-   Database
-   API
-   Authentication
-   AI
-   Search
-   Storage
-   Caching
-   Deployment

------------------------------------------------------------------------

# 110. PHASE 2 --- DATABASE

أنشئ:

`DATABASE.md`

ويتضمن:

-   ERD
-   Tables
-   Fields
-   Indexes
-   Relationships
-   Constraints
-   Audit strategy
-   Migration strategy

------------------------------------------------------------------------

# 111. PHASE 3 --- API

أنشئ:

`API.md`

يوضح:

-   Endpoints
-   Methods
-   Auth
-   Request schemas
-   Response schemas
-   Error codes
-   Rate limits
-   Pagination
-   Filtering
-   Sorting

------------------------------------------------------------------------

# 112. PHASE 4 --- SECURITY

أنشئ:

`SECURITY.md`

يوضح:

-   Authentication
-   Authorization
-   OWASP
-   Secrets
-   Encryption
-   Upload security
-   API security
-   Logging
-   Privacy
-   Incident response

------------------------------------------------------------------------

# 113. PHASE 5 --- IMPLEMENTATION

بعد اكتمال التحليل:

1.  Database
2.  Backend
3.  Authentication
4.  Frontend
5.  Search
6.  Admin
7.  Content
8.  AI/RAG
9.  Notifications
10. SEO
11. PWA
12. Testing
13. Performance
14. Deployment

------------------------------------------------------------------------

# 114. قاعدة التنفيذ

لا تبدأ بالبرمجة قبل إنتاج:

``` text
AUDIT.md
ARCHITECTURE.md
DATABASE.md
API.md
SECURITY.md
ROADMAP.md
```

------------------------------------------------------------------------

# 115. قاعدة عدم كسر النظام

قبل أي تعديل:

1.  Understand existing behavior
2.  Reproduce issue
3.  Diagnose
4.  Implement fix
5.  Test
6.  Run regression tests
7.  Document

لا تحذف Feature إلا إذا:

-   ثبت أنها غير مطلوبة
-   أو تعارضت مع Architecture جديدة
-   وتم توفير بديل واضح
-   وتم توثيق القرار

------------------------------------------------------------------------

# 116. قاعدة منع التوقف

إذا واجهتك مشكلة أثناء التنفيذ:

1.  Identify
2.  Reproduce
3.  Diagnose
4.  Fix
5.  Test
6.  Document
7.  Continue

لا تتوقف عند أول خطأ.

------------------------------------------------------------------------

# 117. قاعدة Production

الكود يجب أن يكون:

-   Clean
-   Typed
-   Tested
-   Documented
-   Secure
-   Maintainable
-   Scalable

ممنوع:

-   Temporary hacks
-   Hardcoded credentials
-   Fake APIs
-   Fake government data
-   Unvalidated inputs
-   Uncontrolled dependencies

------------------------------------------------------------------------

# 118. Final Acceptance Criteria

لا تعتبر المشروع مكتملًا إلا إذا تحقق:

-   [ ] UI كامل
-   [ ] Mobile Responsive
-   [ ] RTL
-   [ ] Authentication
-   [ ] User Dashboard
-   [ ] Admin Dashboard
-   [ ] Services Database
-   [ ] Government Platforms
-   [ ] Search
-   [ ] Filters
-   [ ] Favorites
-   [ ] Notifications
-   [ ] Reminders
-   [ ] Fee Calculator
-   [ ] Checklist Generator
-   [ ] Office Directory
-   [ ] Reviews
-   [ ] Articles
-   [ ] FAQ
-   [ ] AI Assistant
-   [ ] RAG
-   [ ] Source Citations
-   [ ] Content Verification
-   [ ] SEO
-   [ ] Sitemap
-   [ ] PWA
-   [ ] Security
-   [ ] Testing
-   [ ] Monitoring
-   [ ] Backup
-   [ ] Documentation
-   [ ] Production Deployment

------------------------------------------------------------------------

# 119. النتيجة المطلوبة

في النهاية يجب أن تصبح المنصة:

# "المركز الرقمي الإرشادي للمقيم اليمني في السعودية"

وليس مجرد موقع يعرض معلومات.

المستخدم يجب أن يستطيع كتابة:

> أريد نقل خدماتي

ثم يحصل على:

-   الخدمة الصحيحة
-   الجهة
-   المنصة
-   الشروط
-   المستندات
-   الخطوات
-   الرسوم إذا كانت موثقة
-   المدة
-   المصدر الرسمي
-   تاريخ آخر تحقق

ثم ينتقل مباشرة إلى الجهة الرسمية.

------------------------------------------------------------------------

# 120. تسلسل التنفيذ الإلزامي

``` text
STEP 1
Analyze current project

STEP 2
Generate AUDIT.md

STEP 3
Generate ARCHITECTURE.md

STEP 4
Generate DATABASE.md

STEP 5
Generate API.md

STEP 6
Generate SECURITY.md

STEP 7
Generate ROADMAP.md

STEP 8
Implement database

STEP 9
Implement backend

STEP 10
Implement frontend

STEP 11
Implement search

STEP 12
Implement admin

STEP 13
Implement AI/RAG

STEP 14
Implement notifications

STEP 15
Implement SEO

STEP 16
Run tests

STEP 17
Run security audit

STEP 18
Run performance audit

STEP 19
Fix all critical issues

STEP 20
Production deployment
```

------------------------------------------------------------------------

# 121. الأمر النهائي للمطور / AI Coding Agent

**ابدأ الآن بتحليل المشروع الحالي بالكامل.**

لا تبدأ بكتابة كود عشوائي.

قم أولًا بفحص:

-   المشروع
-   الملفات
-   البنية
-   Dependencies
-   Routes
-   Components
-   API
-   Database
-   UI
-   UX
-   Responsive behavior
-   Performance
-   Security
-   SEO
-   Accessibility
-   Data model
-   Content architecture

ثم أنشئ:

``` text
AUDIT.md
ARCHITECTURE.md
DATABASE.md
API.md
SECURITY.md
ROADMAP.md
```

بعد اكتمال التحليل ابدأ التنفيذ المرحلي.

في كل مرحلة:

1.  نفّذ.
2.  اختبر.
3.  أصلح الأخطاء.
4.  تحقق من عدم كسر الوظائف السابقة.
5.  وثّق التغيير.
6.  انتقل للمرحلة التالية.

**الهدف النهائي ليس مجرد واجهة جميلة، وإنما نظام حقيقي Production-Ready
قابل للتوسع والصيانة والتطبيق لاحقًا على Android وiOS باستخدام نفس الـAPI
وقاعدة البيانات.**

------------------------------------------------------------------------

# END OF REQUIREMENTS
