'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Building2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  Flag,
  Share2,
  X,
  Calendar
} from 'lucide-react';
import { Service } from '@/types';

interface PopularServicesProps {
  services: Service[];
  searchQuery: string;
  selectedCategory: string | null;
}

export default function PopularServices({
  services,
  searchQuery,
  selectedCategory
}: PopularServicesProps) {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [reportModalService, setReportModalService] = useState<Service | null>(null);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Filter logic with Arabic normalization
  const normalize = (text: string) => 
    text
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .toLowerCase();

  const filteredServices = services.filter((srv) => {
    // Category filter
    if (selectedCategory && srv.category_id !== selectedCategory) {
      return false;
    }
    // Query search filter
    if (searchQuery.trim()) {
      const q = normalize(searchQuery);
      const inTitle = normalize(srv.name_ar).includes(q);
      const inDesc = normalize(srv.description_ar).includes(q);
      const inPlatform = normalize(srv.platform_name_ar).includes(q);
      const inCategory = normalize(srv.category_name_ar).includes(q);
      return inTitle || inDesc || inPlatform || inCategory;
    }
    return true;
  });

  return (
    <section id="services" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
              <span>دليل الإجراءات الموثقة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
              {searchQuery ? `نتائج البحث عن: "${searchQuery}"` : 'الخدمات الحكومية الأكثر طلباً'}
            </h2>
            <p className="text-sm text-textMuted mt-1">
              تم التحقق من الشروط والرسوم والخطوات وفق أحدث التحديثات الحكومية الرسمية.
            </p>
          </div>

          <div className="mt-3 sm:mt-0 text-xs text-textMuted">
            عرض <span className="font-bold text-primary">{filteredServices.length}</span> من أصل <span className="font-bold text-primary">{services.length}</span> خدمة
          </div>
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="bg-bgLight rounded-2xl p-12 text-center border-2 border-dashed border-slate-200 max-w-xl mx-auto my-8">
            <AlertCircle className="w-12 h-12 text-secondary mx-auto mb-3" />
            <h3 className="text-lg font-bold text-primary mb-1">لم يتم العثور على خدمات مطابقة</h3>
            <p className="text-sm text-textMuted mb-6 leading-relaxed">
              لم نعثر على نتائج مطابقة لـ &quot;{searchQuery}&quot;. يمكنك سؤال المساعد الذكي أو اقتراح إضافة خدمة.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a 
                href="#ai-assistant"
                className="bg-primary hover:bg-primary-light text-secondary text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
              >
                استشر المساعد الذكي
              </a>
              <button 
                onClick={() => {}}
                className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-200"
              >
                طلب إضافة خدمة
              </button>
            </div>
          </div>
        )}

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card hover:border-secondary/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Top: Entity & Badges */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-primary/5 text-primary px-2.5 py-1 rounded-md">
                    <Building2 className="w-3 h-3 text-secondary" />
                    <span>{service.entity_name_ar}</span>
                  </span>
                  
                  {/* Government Source Badge (Section 101) */}
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-success bg-success-light px-2.5 py-1 rounded-full border border-success/20">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>مصدر رسمي</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-primary group-hover:text-primary-light transition-colors mb-2 leading-snug">
                  {service.name_ar}
                </h3>

                <p className="text-xs text-textMuted leading-relaxed line-clamp-2 mb-4">
                  {service.description_ar}
                </p>

                {/* Quick Cards Info */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-bgLight p-3 rounded-xl border border-slate-100 mb-4">
                  <div>
                    <span className="text-slate-400 block text-[10px]">المنصة الرسمية:</span>
                    <span className="font-bold text-primary">{service.platform_name_ar}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">مدة التنفيذ:</span>
                    <span className="font-bold text-primary flex items-center gap-1">
                      <Clock className="w-3 h-3 text-secondary" />
                      <span>{service.processing_time}</span>
                    </span>
                  </div>
                </div>

                {/* Requirements Snapshot */}
                <div className="mb-2">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1.5">أهم الشروط:</span>
                  <ul className="space-y-1">
                    {service.requirements.slice(0, 2).map((req) => (
                      <li key={req.id} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-secondary font-bold text-xs">•</span>
                        <span className="line-clamp-1">{req.title_ar}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer: Fees & Action Buttons */}
              <div className="p-4 px-6 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block">الرسوم الحكومية:</span>
                  <span className="text-sm font-black text-primary">
                    {service.fees[0] ? `${service.fees[0].amount} ${service.fees[0].currency}` : 'لا توجد رسوم'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveService(service)}
                    className="bg-primary hover:bg-primary-light text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    تفاصيل الخدمة
                  </button>
                  
                  {/* Official Direct Link (Section 100) */}
                  <a
                    href={service.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="الانتقال للمصدر الرسمي"
                    className="p-2 text-slate-500 hover:text-primary hover:bg-slate-200/60 rounded-xl border border-slate-200 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Comprehensive Detail Modal (Section 10) */}
      {activeService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-right">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-primary text-white p-6 pb-5 flex items-start justify-between border-b border-primary-light">
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs">
                  <span className="bg-secondary text-primary font-bold px-2 py-0.5 rounded">
                    {activeService.category_name_ar}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-secondary-light font-medium">{activeService.entity_name_ar}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">{activeService.name_ar}</h3>
              </div>
              <button
                onClick={() => setActiveService(null)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-bgLight p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">المنصة الرسمية:</span>
                  <span className="font-bold text-primary">{activeService.platform_name_ar}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">الفئة المستهدفة:</span>
                  <span className="font-bold text-primary">{activeService.target_audience_label}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">مدة التنفيذ:</span>
                  <span className="font-bold text-primary">{activeService.processing_time}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">تاريخ آخر تحقق:</span>
                  <span className="font-bold text-success flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{activeService.last_verified_at}</span>
                  </span>
                </div>
              </div>

              {/* Requirements Checklist */}
              <div>
                <h4 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-secondary" />
                  <span>الشروط والمتطلبات الأساسية</span>
                </h4>
                <div className="space-y-2">
                  {activeService.requirements.map((req, idx) => (
                    <div key={req.id} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-150 text-xs">
                      <span className="w-5 h-5 rounded-full bg-secondary/15 text-secondary font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700 leading-relaxed font-medium">{req.title_ar}</span>
                      {req.is_mandatory && (
                        <span className="mr-auto text-[10px] bg-red-50 text-danger border border-red-200 px-1.5 py-0.5 rounded">إلزامي</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps Timeline */}
              <div>
                <h4 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span>خطوات تنفيذ المعاملة</span>
                </h4>
                <div className="space-y-3">
                  {activeService.steps.map((st) => (
                    <div key={st.step_number} className="relative pr-6 border-r-2 border-secondary/40 pb-2">
                      <div className="absolute -right-[7px] top-0 w-3 h-3 rounded-full bg-secondary ring-4 ring-white" />
                      <h5 className="text-xs font-bold text-primary mb-0.5">
                        الخطوة {st.step_number}: {st.title_ar}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {st.description_ar}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Fees Table */}
              <div>
                <h4 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>جدول الرسوم الموثقة</span>
                </h4>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">بيان الرسم</th>
                        <th className="p-3">المبلغ</th>
                        <th className="p-3">المصدر الرسمي</th>
                        <th className="p-3">تاريخ التحقق</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {activeService.fees.map((fee) => (
                        <tr key={fee.id} className="hover:bg-slate-50">
                          <td className="p-3 font-medium text-slate-800">
                            {fee.title_ar}
                            {fee.notes_ar && <span className="block text-[10px] text-textMuted mt-0.5">{fee.notes_ar}</span>}
                          </td>
                          <td className="p-3 font-bold text-primary">{fee.amount} {fee.currency}</td>
                          <td className="p-3 text-slate-600">{fee.source_name}</td>
                          <td className="p-3 text-success font-medium">{fee.verified_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Official Source Transition Box (Section 100) */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h5 className="text-sm font-bold text-primary mb-1">جاهز لتقديم الطلب؟</h5>
                  <p className="text-xs text-textMuted">
                    سيتم نقلك مباشرة وبشفافية تامة إلى البوابة الرسمية: <span className="font-bold text-primary">{activeService.platform_name_ar}</span>
                  </p>
                </div>
                <a
                  href={activeService.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary hover:bg-secondary-light text-primary font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0"
                >
                  <span>الانتقال للمصدر الرسمي</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Report inaccurate info (Section 72) */}
              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    setReportModalService(activeService);
                    setActiveService(null);
                  }}
                  className="text-xs text-textMuted hover:text-danger flex items-center justify-center gap-1.5 mx-auto"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>هل لاحظت معلومة بحاجة لتحديث في هذه الخدمة؟ أبلغنا هنا</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Report Inaccurate Info Modal (Section 72) */}
      {reportModalService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-right shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base font-bold text-primary">الإبلاغ عن معلومة تحتاج لتحديث</h4>
              <button onClick={() => setReportModalService(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {reportSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-2" />
                <h5 className="font-bold text-primary mb-1">شكراً لتعاونك!</h5>
                <p className="text-xs text-slate-500 mb-4">تم استلام ملاحظتك وسيتم مراجعتها من قبل فريق تدقيق المحتوى وتحديثها فورياً.</p>
                <button
                  onClick={() => {
                    setReportSubmitted(false);
                    setReportModalService(null);
                  }}
                  className="bg-primary text-white text-xs px-4 py-2 rounded-xl"
                >
                  إغلاق
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setReportSubmitted(true); }} className="space-y-3">
                <div className="text-xs bg-slate-50 p-2.5 rounded-lg border text-slate-700">
                  الخدمة: <span className="font-bold text-primary">{reportModalService.name_ar}</span>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">ما هي المعلومة غير الدقيقة؟</label>
                  <textarea 
                    required 
                    rows={3}
                    placeholder="مثال: تم تعديل الرسوم الحكومية أو الشروط مؤخراً..."
                    className="w-full p-2.5 text-xs border rounded-xl focus:ring-1 focus:ring-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">رابط المصدر الرسمي المقترح (اختياري)</label>
                  <input 
                    type="url"
                    placeholder="https://..."
                    className="w-full p-2.5 text-xs border rounded-xl focus:ring-1 focus:ring-secondary focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-light text-secondary font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  إرسال البلاغ للتدقيق
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
