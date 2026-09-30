'use client';

import React from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  Zap, 
  PhoneCall, 
  FileCheck2,
  Building2,
  Stethoscope,
  Flame
} from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTagClick: (tag: string) => void;
  servicesCount: number;
  platformsCount: number;
  onOpenOrderModal: (serviceSlug?: string, categoryId?: string) => void;
}

export default function Hero({
  searchQuery,
  onSearchChange,
  onTagClick,
  servicesCount,
  platformsCount,
  onOpenOrderModal
}: HeroProps) {
  const popularKeywords = [
    'كروت عمل نطاق أحمر',
    'فك ملاحظة حماية الأجور',
    'فحص طبي إقامة',
    'تأسيس شركة أجنبية MISA',
    'تجديد الإقامة',
    'نقل الخدمات قوى',
    'شهادة صحية بلدي',
    'توثيق العقود'
  ];

  return (
    <section className="relative overflow-hidden primary-gradient text-white pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Background Subtle Cinematic Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] bg-primary-light/40 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badges & Live Status */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 text-secondary-light text-xs font-bold backdrop-blur-md shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span>المنصة الرائدة في خدمات المقيمين والتعقيب وتأسيس الشركات في السعودية</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>مختص الواتساب متصل: <strong className="font-mono text-white" dir="ltr">+966 56 452 0434</strong></span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4">
            دليل المقيم اليمني و<span className="gold-gradient-text">بوابة الإنجاز الفوري</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            منظومة رقمية شاملة لإنجاز المعاملات وفك ملاحظات المنشآت (النطاق الأحمر، حماية الأجور، التقييم الذاتي)، وتنسيق الفحوصات الطبية المعتمدة، وتراخيص الاستثمار الأجنبي MISA.
          </p>
        </div>

        {/* Action CTAs: Order Service / Explore */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => onOpenOrderModal()}
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light hover:brightness-110 text-primary font-black px-8 py-4 rounded-2xl shadow-xl shadow-secondary/30 text-base transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <Send className="w-5 h-5 text-primary" />
            <span>⚡ اطلب إنجاز معاملتك الآن</span>
          </button>

          <a
            href="#cinematic-showcase"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold px-6 py-4 rounded-2xl border border-white/20 hover:border-secondary/40 text-sm sm:text-base backdrop-blur-md transition-all active:scale-95"
          >
            <span>استكشف الباقات والنطاقات</span>
            <ArrowLeft className="w-4 h-4 text-secondary" />
          </a>
        </div>

        {/* Search Engine Card */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-white/95 rounded-2xl p-2 sm:p-2.5 shadow-floating border-2 border-secondary/50 backdrop-blur-xl">
            <div className="relative flex items-center">
              <div className="pr-4 pl-3 text-primary flex items-center pointer-events-none">
                <Search className="w-6 h-6 text-primary stroke-[2.5]" />
              </div>
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="ابحث عن أي خدمة أو معاملة... (مثال: كرت عمل أحمر، فك ملاحظة مدد، فحص طبي، ترخيص MISA)"
                className="w-full py-3.5 px-2 text-slate-900 text-sm sm:text-base bg-transparent border-0 focus:ring-0 focus:outline-none placeholder:text-slate-400 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="px-3 text-xs text-slate-400 hover:text-slate-600 ml-2"
                >
                  مسح
                </button>
              )}
              <a
                href="#services"
                className="hidden sm:inline-flex items-center gap-1.5 bg-primary hover:bg-primary-light text-secondary font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md active:scale-95 shrink-0"
              >
                <span>بحث</span>
                <ArrowLeft className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Popular Search Suggestions (Pills) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 ml-1">الأكثر طلباً:</span>
            {popularKeywords.map((keyword) => (
              <button
                key={keyword}
                onClick={() => onTagClick(keyword)}
                className="bg-white/10 hover:bg-secondary hover:text-primary text-slate-200 px-3 py-1 rounded-full border border-white/15 transition-all text-xs active:scale-95"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlights Grid (Cinematic Badges) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto pt-6 border-t border-white/10">
          <div 
            onClick={() => onOpenOrderModal(undefined, 'taqeeb-notes')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-400/50 rounded-2xl p-4 text-center backdrop-blur-sm cursor-pointer transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <div className="text-sm font-black text-white group-hover:text-red-400 transition-colors">
              كروت عمل نطاق أحمر
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">وفك ملاحظات حماية الأجور</div>
          </div>

          <div 
            onClick={() => onOpenOrderModal(undefined, 'medical-checks')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/50 rounded-2xl p-4 text-center backdrop-blur-sm cursor-pointer transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors">
              الفحوصات الطبية المعتمدة
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">إقامة • قيادة • توظيف • توصيل</div>
          </div>

          <div 
            onClick={() => onOpenOrderModal(undefined, 'foreign-investment')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary/50 rounded-2xl p-4 text-center backdrop-blur-sm cursor-pointer transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-sm font-black text-white group-hover:text-secondary transition-colors">
              استثمار وتراخيص MISA
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">تأسيس وشراء شركات وحسابات بنكية</div>
          </div>

          <div 
            onClick={() => onOpenOrderModal()}
            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 rounded-2xl p-4 text-center backdrop-blur-sm cursor-pointer transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
              إنجاز عبر الواتساب فوراً
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">إرفاق المستندات وتحويل مباشر</div>
          </div>
        </div>

      </div>
    </section>
  );
}
