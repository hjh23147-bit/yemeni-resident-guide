'use client';

import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Star, 
  ShieldCheck, 
  PlusCircle, 
  CheckCircle2,
  X
} from 'lucide-react';
import { OFFICES_DATA } from '@/data/servicesData';

export default function OfficesSection() {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const cities = ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة'];

  const filteredOffices = selectedCity === 'all'
    ? OFFICES_DATA
    : OFFICES_DATA.filter((o) => o.city_ar === selectedCity);

  return (
    <section id="offices" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary-dark text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>دليل المكاتب المعتمدة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
              دليل مكاتب الخدمات العامة والتعقيب
            </h2>
            <p className="text-sm text-textMuted mt-1">
              مكاتب موثقة تخضع لدورة مراجعة واعتماد وتوفر خدمات إنجاز المعاملات النظامية.
            </p>
          </div>

          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 bg-primary hover:bg-primary-light text-secondary font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>تسجيل مكتب خدمات</span>
          </button>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCity('all')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCity === 'all'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-bgLight text-slate-600 hover:bg-slate-200'
            }`}
          >
            جميع المدن
          </button>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCity === city
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-bgLight text-slate-600 hover:bg-slate-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Offices Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffices.map((office) => (
            <div
              key={office.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft hover:shadow-card hover:border-secondary/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-primary mb-1">{office.name_ar}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-textMuted">
                      <MapPin className="w-3.5 h-3.5 text-secondary" />
                      <span>{office.city_ar} — {office.district_ar}</span>
                    </div>
                  </div>

                  {office.is_verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-success bg-success-light px-2 py-0.5 rounded-full border border-success/20 shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>موثق</span>
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-4 text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-primary text-xs">{office.rating_avg}</span>
                  <span className="text-[11px] text-slate-400">({office.reviews_count} تقييماً)</span>
                </div>

                {/* Services Tags */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold text-slate-700 block mb-2">أبرز الخدمات المقدمة:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {office.services_offered.map((s, idx) => (
                      <span key={idx} className="bg-bgLight text-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-medium border border-slate-100">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${office.phone}`}
                  className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>اتصال</span>
                </a>
                <a
                  href={`https://wa.me/${office.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>واتساب</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Office Registration Modal (Section 22: Submit -> Review -> Approval) */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 text-right shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base font-bold text-primary">تسجيل مكتب خدمات في الدليل المعتمد</h4>
              <button onClick={() => setIsRegisterModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {registeredSuccess ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-2" />
                <h5 className="font-bold text-primary mb-1">تم إرسال طلبكم بنجاح!</h5>
                <p className="text-xs text-slate-500 mb-4">
                  سيتم مراجعة بيانات السجل التجاري ورخصة ممارسة النشاط من قبل المشرفين قبل نشر المكتب رسمياً في الدليل.
                </p>
                <button
                  onClick={() => {
                    setRegisteredSuccess(false);
                    setIsRegisterModalOpen(false);
                  }}
                  className="bg-primary text-white text-xs px-5 py-2 rounded-xl"
                >
                  إغلاق
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setRegisteredSuccess(true); }} className="space-y-3">
                <div className="text-[11px] bg-secondary/10 p-2.5 rounded-lg border border-secondary/20 text-slate-700">
                  ⚠️ تخضع المكاتب لسياسة التحقق الصارمة لضمان حماية المقيمين ومنع التعقيب العشوائي.
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">اسم المكتب أو المؤسسة:</label>
                  <input required type="text" placeholder="مثال: مكتب الأمانة للخدمات العامة" className="w-full p-2.5 text-xs border rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">المدينة:</label>
                    <input required type="text" placeholder="الرياض" className="w-full p-2.5 text-xs border rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">الحي:</label>
                    <input required type="text" placeholder="الملز" className="w-full p-2.5 text-xs border rounded-xl" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">رقم الهاتف:</label>
                    <input required type="tel" placeholder="05XXXXXXXX" className="w-full p-2.5 text-xs border rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">رقم السجل التجاري:</label>
                    <input required type="text" placeholder="1010XXXXXX" className="w-full p-2.5 text-xs border rounded-xl" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-light text-secondary font-bold py-2.5 rounded-xl text-xs transition-colors mt-2"
                >
                  إرسال الطلب للمراجعة والتوثيق
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
