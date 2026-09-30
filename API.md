# API.md — توثيق واجهات برمجة التطبيقات
## RESTful API Specifications & Contract

> **المعيار:** REST API / JSON  
> **طريقة التوثيق والتحقق:** Zod DTO Validation + Typed Handlers  
> **نظام الأخطاء:** RFC 7807 (Problem Details for HTTP APIs) مع كود تتبع فريد (`error_id`)

---

## 1. المعايير العامة للتواصل (General Conventions)

* **صيغة الطلبات والردود:** `Content-Type: application/json; charset=utf-8`
* **المصادقة:** إرسال `Authorization: Bearer <token>` أو استخدام `HttpOnly Cookie (resident_token)`
* **الترقيم (Pagination):** عبر معلمات الاستعلام `?page=1&limit=20`
* **الفرز والتصفية (Sorting & Filtering):** `?sort=last_verified_at:desc&category=passports`
* **معدل الطلبات (Rate Limiting):**
  - المسارات العامة: 60 طلب/دقيقة (`X-RateLimit-Limit: 60`)
  - مسارات المصادقة: 10 طلبات/دقيقة
  - مسارات المساعد الذكي: 15 طلب/دقيقة لكل جلسة
  - مسارات الإدارة: 120 طلب/دقيقة للمشرفين المعتمدين

---

## 2. الهيكل الموحد للاستجابات والأخطاء (Standard Envelope)

### 2.1 استجابة ناجحة (Success Envelope)
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "total_pages": 3
  }
}
```

### 2.2 استجابة خطأ (Error Envelope)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "البيانات المدخلة غير صحيحة، يرجى مراجعة الحقول المطلوبة.",
    "error_id": "err_c9f28a11",
    "details": [
      {
        "field": "email",
        "issue": "صيغة البريد الإلكتروني غير صالحة"
      }
    ]
  }
}
```

---

## 3. نقاط النهاية الأساسية (Core API Endpoints)

### 3.1 كتالوج الخدمات والقطاعات (Services & Categories)
* **`GET /api/services`**
  - **الوظيفة:** استرجاع قائمة الخدمات الحكومية مع التصفية والترقيم.
  - **معلمات الاستعلام:** `category`, `platform`, `audience`, `page`, `limit`, `sort`.
* **`GET /api/services/:slug`**
  - **الوظيفة:** تفاصيل الخدمة الكاملة (الخطوات، الشروط، الرسوم الموثقة، تواريخ التحقق، المصادر الرسمية).
* **`POST /api/services`** *(يتطلب صلاحية ADMIN / CONTENT_EDITOR)*
  - **الوظيفة:** إنشاء خدمة جديدة في وضع المسودة (`DRAFT`).
* **`PATCH /api/services/:id`** *(يتطلب صلاحية ADMIN / CONTENT_EDITOR)*
  - **الوظيفة:** تحديث بيانات الخدمة وتعديل حالة التحقق وتسجيل التغيير في سجل التدقيق.
* **`DELETE /api/services/:id`** *(يتطلب صلاحية SUPER_ADMIN)*
  - **الوظيفة:** أرشفة الخدمة (Soft Delete).

### 3.2 محرك البحث المعالج عربياً (Intelligent Search)
* **`GET /api/search`**
  - **المعلمات:** `q` (نص البحث), `type` (`services`, `faqs`, `articles`, `all`), `limit`
  - **الاستجابة:** قائمة النتائج مرتبة بالأهمية مع تصحيح الأخطاء الإملائية وتحديد الكلمات المطابقة.

### 3.3 المنصات الحكومية والأدلة (Platforms & Categories)
* **`GET /api/categories`**: استعراض كافة القطاعات الخدمية مع عدد الخدمات النشطة في كل قطاع.
* **`GET /api/platforms`**: دليل المنصات الحكومية الرسمية (أبشر، قوى، مقيم، مدد، إلخ) مع الروابط وشارات التوثيق.

### 3.4 الأدوات والحاسبات التفاعلية (Calculators & Wizards)
* **`POST /api/calculators/fees`**
  - **المدخلات:** `{ "service_type": "iqama_renewal", "duration_months": 12, "dependents_count": 2 }`
  - **الرد:** تفصيل الرسوم الحكومية الرسمية المقررة، الرسوم التقديرية لمكاتب الخدمات، المصدر، وتاريخ آخر تحقق.
* **`POST /api/checklists/generate`**
  - **المدخلات:** استبيان حالة المقيم (المهنة، الأفراد التابعون، سريان الإقامة).
  - **الرد:** قائمة فحص المستندات المخصصة والمصنفة (إلزامي / اختياري / مشروط).

### 3.5 دليل مكاتب الخدمات والمراجعات (Offices & Reviews)
* **`GET /api/offices`**: استعراض المكاتب المعتمدة مع التصفية بالمدينة ونوع الخدمة وتقييم النجوم.
* **`POST /api/offices`**: تقديم طلب تسجيل مكتب جديد (يدخل في قائمة المراجعة `PENDING_REVIEW`).
* **`POST /api/offices/:id/reviews`**: إضافة تقييم لمكتب (يتطلب تسجيل دخول المستخدم لتفادي الـ Spam).

### 3.6 لوحة تحكم المقيم (Resident Dashboard)
* **`GET /api/favorites`** / **`POST /api/favorites`** / **`DELETE /api/favorites/:id`**: إدارة الخدمات المحفوظة.
* **`GET /api/reminders`** / **`POST /api/reminders`** / **`PATCH /api/reminders/:id`**: إدارة تذكيرات انتهاء الوثائق والمواعيد.
* **`GET /api/notifications`** / **`PATCH /api/notifications/:id/read`**: سجل الإشعارات والتحديثات الحكومية.

### 3.7 المساعد الذكي الآمن (AI Resident Assistant)
* **`POST /api/ai/chat`**
  - **المدخلات:** `{ "message": "ما هي خطوات تجديد الإقامة المنتهية؟", "conversation_id": "conv_xxx" }`
  - **الرد:**
    ```json
    {
      "reply": "لتجديد الإقامة يجب التأكد من عدم وجود مخالفات مرورية وسريان التأمين الطبي...",
      "citations": [
        {
          "title": "منصة أبشر - تجديد الإقامة",
          "url": "https://www.absher.sa",
          "verified_at": "2026-09-01",
          "source_type": "GOV_PORTAL"
        }
      ],
      "confidence": 0.96,
      "disclaimer": "المعلومات للأغراض الإرشادية فقط. يرجى مراجعة المنصة الحكومية الرسمية."
    }
    ```

### 3.8 الإدارة والتدقيق والفحص الصحي (Admin & Health)
* **`GET /api/admin/stats`**: إحصائيات النظام اللحظية (عدد الخدمات، الموثقة، المنتهية، زوار اليوم).
* **`GET /api/admin/audit-logs`**: سجل العمليات الحساسة مع معلومات هوية المشرف والـ IP والتعديلات.
* **`GET /api/health`**:
  ```json
  {
    "status": "healthy",
    "timestamp": "2026-09-29T15:45:00Z",
    "version": "1.0.0",
    "database": "connected",
    "cache": "operational"
  }
  ```
