import React from 'react';
import { BellRing, Calendar, ExternalLink, ArrowUpLeft } from 'lucide-react';
import { UPDATES_DATA } from '@/data/servicesData';

export default function UpdatesSection() {
  return (
    <section className="py-14 bg-bgLight border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary-dark text-xs font-bold mb-2">
              <BellRing className="w-3.5 h-3.5" />
              <span>مركز الأخبار والتحديثات</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
              أحدث القرارات والتحديثات الإجرائية
            </h2>
            <p className="text-sm text-textMuted mt-1">
              متابعة حية للتعاميم والقرارات الصادرة من الجوازات ووزارة الموارد البشرية.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UPDATES_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 text-xs">
                  <span className="font-bold text-secondary-dark bg-secondary/10 px-2.5 py-0.5 rounded-full">
                    {item.source_name}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <Calendar className="w-3 h-3" />
                    <span>{item.published_at}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-primary mb-2 leading-snug">
                  {item.title_ar}
                </h3>

                <p className="text-xs text-textMuted leading-relaxed mb-4">
                  {item.summary_ar}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-success font-semibold">✓ مصدر رسمي مؤكد</span>
                <a
                  href={item.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-secondary transition-colors"
                >
                  <span>قراءة في المصدر الرسمي</span>
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
