import React from 'react';
import { ExternalLink, CheckCircle2, Building2, ArrowUpLeft } from 'lucide-react';
import { PLATFORMS_DATA } from '@/data/servicesData';

export default function PlatformsSection() {
  return (
    <section id="platforms" className="py-16 bg-bgLight border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary-dark text-xs font-bold mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>بوابة المنصات الحكومية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-tight mb-2">
            دليل المنصات والمواقع الحكومية الرسمية
          </h2>
          <p className="text-sm text-textMuted leading-relaxed">
            تعرف على المنصة الرسمية المختصة بكل إجراء ورابط الدخول المباشر والمعتمد.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLATFORMS_DATA.map((plat) => (
            <div
              key={plat.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card hover:border-secondary/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary text-secondary font-black text-lg flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {plat.name_ar.slice(0, 2)}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-success bg-success-light px-2 py-0.5 rounded-full border border-success/20">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>رسمي</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-primary group-hover:text-primary-light transition-colors mb-1">
                  {plat.name_ar}
                </h3>
                
                <span className="text-[11px] text-secondary-dark font-medium block mb-2">
                  {plat.name_en}
                </span>

                <p className="text-xs text-textMuted leading-relaxed line-clamp-3 mb-4">
                  {plat.description_ar}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {plat.services_count} خدمات مشروحة
                </span>
                <a
                  href={plat.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-secondary transition-colors"
                >
                  <span>زيارة المنصة</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
