'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Stethoscope, 
  Building2, 
  Sparkles, 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Award,
  Layers,
  ChevronLeft
} from 'lucide-react';
import { EXTENDED_SERVICES } from '@/data/extendedServicesData';

interface CinematicShowcaseProps {
  onOpenOrderModal: (serviceSlug?: string, categoryId?: string) => void;
}

export default function CinematicShowcase({ onOpenOrderModal }: CinematicShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'taqeeb' | 'medical' | 'misa'>('taqeeb');

  const taqeebServices = EXTENDED_SERVICES.filter(s => s.category_id === 'taqeeb-notes');
  const medicalServices = EXTENDED_SERVICES.filter(s => s.category_id === 'medical-checks');
  const misaServices = EXTENDED_SERVICES.filter(s => s.category_id === 'foreign-investment');

  return (
    <section className="relative py-20 bg-[#071322] text-white overflow-hidden border-y border-secondary/20">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-primary-light/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 text-secondary-light text-xs font-black tracking-wide mb-4 shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span>بوابة الإنجاز والتعقيب الاستثنائي</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            خدمات متخصصة للأفراد و<span className="gold-gradient-text">المنشآت الاستثمارية</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            منظومة متكاملة لفك قيود المنشآت والنطاقات، واعتماد الفحوصات الطبية الفورية، وتأسيس وترخيص الشركات الأجنبية برعاية فريق متخصص على مدار الساعة.
          </p>

          {/* Cinematic Tab Switcher */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl max-w-xl mx-auto backdrop-blur-md">
            <button
              onClick={() => setActiveTab('taqeeb')}
              className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                activeTab === 'taqeeb'
                  ? 'bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light text-primary shadow-lg scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>التعقيب وفك الملاحظات</span>
              <span className="bg-red-500/20 text-red-300 text-[10px] px-1.5 py-0.5 rounded-full border border-red-500/30">
                14 خدمة
              </span>
            </button>

            <button
              onClick={() => setActiveTab('medical')}
              className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                activeTab === 'medical'
                  ? 'bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light text-primary shadow-lg scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>الفحوصات الطبية المعتمدة</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                6 فحوصات
              </span>
            </button>

            <button
              onClick={() => setActiveTab('misa')}
              className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                activeTab === 'misa'
                  ? 'bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light text-primary shadow-lg scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>تأسيس واستثمار MISA</span>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-1.5 py-0.5 rounded-full border border-amber-500/30">
                12 خطوة
              </span>
            </button>
          </div>
        </div>

        {/* Tab 1: Taqeeb & Notes Clearance */}
        {activeTab === 'taqeeb' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Spotlight Banner */}
            <div className="bg-gradient-to-r from-red-950/40 via-red-900/20 to-transparent border border-red-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
              <div className="space-y-2 text-center md:text-right">
                <div className="inline-flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
                  <Flame className="w-4 h-4 animate-bounce" />
                  <span>حلول فورية لملفات النطاق الأحمر والمخالفات العالقة</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  معالجة وتصحيح أوضاع المنشآت وفك إيقاف الخدمات
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  نضمن لك فك ملاحظات حماية الأجور (مدد)، التقييم الذاتي، وتعديل نسب المهن ونقل العمال بين المنشآت والفروع وفق القنوات النظامية الرسمية وبأسرع وتيرة تنفيذ.
                </p>
              </div>

              <button
                onClick={() => onOpenOrderModal(undefined, 'taqeeb-notes')}
                className="shrink-0 bg-red-600 hover:bg-red-500 text-white font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-red-600/30 text-sm transition-all active:scale-95 flex items-center gap-2"
              >
                <span>طلب فك ملاحظة فوري</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {taqeebServices.map((service) => (
                <div 
                  key={service.id}
                  className="group bg-[#0e223b]/90 hover:bg-[#122b4a] border border-white/10 hover:border-secondary/60 rounded-2xl p-5 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-secondary/15 text-secondary-light border border-secondary/30">
                        {service.platform_name_ar}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-secondary" />
                        <span>{service.processing_time}</span>
                      </span>
                    </div>

                    <h4 className="text-base font-black text-white group-hover:text-secondary transition-colors mb-2">
                      {service.name_ar}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                      {service.description_ar}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-secondary-light font-bold">
                      {service.fees[0]?.title_ar || 'سعر فوري'}
                    </span>

                    <button
                      onClick={() => onOpenOrderModal(service.slug, service.category_id)}
                      className="inline-flex items-center gap-1 bg-white/10 hover:bg-secondary hover:text-primary text-slate-200 text-xs font-bold py-2 px-3.5 rounded-xl border border-white/15 transition-all"
                    >
                      <span>اطلب الآن</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Medical Checks */}
        {activeTab === 'medical' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Spotlight Banner */}
            <div className="bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-transparent border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
              <div className="space-y-2 text-center md:text-right">
                <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ربط إلكتروني فوري مع منصة إفادة، أبشر، ومجلس الضمان الصحي</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  الفحوصات الطبية المعتمدة لإصدار وتجديد الإقامات والرخص
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  توجيه فوري للمراكز المعتمدة مع سرعة انعكاس النتائج الطبية بنظام الجوازات والمرور وهيئة النقل في نفس اليوم.
                </p>
              </div>

              <button
                onClick={() => onOpenOrderModal(undefined, 'medical-checks')}
                className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-600/30 text-sm transition-all active:scale-95 flex items-center gap-2"
              >
                <span>حجز فحص طبي فوري</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Medical Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {medicalServices.map((service) => (
                <div 
                  key={service.id}
                  className="group bg-[#0e223b]/90 hover:bg-[#122b4a] border border-white/10 hover:border-emerald-500/60 rounded-2xl p-5 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {service.platform_name_ar}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-secondary" />
                        <span>{service.processing_time}</span>
                      </span>
                    </div>

                    <h4 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors mb-2">
                      {service.name_ar}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                      {service.description_ar}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-bold">
                      {service.fees[0]?.amount ? `${service.fees[0].amount} ريال` : 'حسب المركز'}
                    </span>

                    <button
                      onClick={() => onOpenOrderModal(service.slug, service.category_id)}
                      className="inline-flex items-center gap-1 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold py-2 px-3.5 rounded-xl border border-emerald-500/30 transition-all"
                    >
                      <span>تنسيق الفحص</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: MISA Foreign Investment */}
        {activeTab === 'misa' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Spotlight Banner */}
            <div className="bg-gradient-to-r from-amber-950/40 via-secondary-dark/20 to-transparent border border-secondary/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
              <div className="space-y-2 text-center md:text-right">
                <div className="inline-flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>دورة حياة كاملة للمستثمر: من حجز الاسم حتى فتح الحساب البنكي</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  تأسيس وشراء الشركات الأجنبية وتراخيص وزارة الاستثمار (MISA)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  حزمة متكاملة تشمل رخصة MISA، صياغة وتوثيق عقد التأسيس، السجل التجاري، فتح ملف العمل، قوى ومقيم، الغرفة، زاتكا، والتأمينات، وفتح الحساب البنكي التجاري.
                </p>
              </div>

              <button
                onClick={() => onOpenOrderModal(undefined, 'foreign-investment')}
                className="shrink-0 bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light text-primary font-black px-7 py-3.5 rounded-2xl shadow-xl shadow-secondary/30 text-sm transition-all active:scale-95 flex items-center gap-2"
              >
                <span>طلب تأسيس شركة أجنبية</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            {/* MISA Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {misaServices.map((service, index) => (
                <div 
                  key={service.id}
                  className="group relative bg-[#0e223b]/90 hover:bg-[#122b4a] border border-white/10 hover:border-secondary/60 rounded-2xl p-5 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center text-xs font-mono font-black text-secondary">
                    {index + 1}
                  </div>

                  <div>
                    <div className="flex items-start gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-secondary/15 text-secondary-light border border-secondary/30">
                        {service.platform_name_ar}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-white group-hover:text-secondary transition-colors mb-2 pr-6">
                      {service.name_ar}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                      {service.description_ar}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">
                      {service.processing_time}
                    </span>

                    <button
                      onClick={() => onOpenOrderModal(service.slug, service.category_id)}
                      className="inline-flex items-center gap-1 bg-secondary/20 hover:bg-secondary text-secondary-light hover:text-primary text-xs font-bold py-2 px-3.5 rounded-xl border border-secondary/30 transition-all"
                    >
                      <span>تنفيذ الخطوة</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
