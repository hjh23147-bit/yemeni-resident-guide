import React from 'react';
import Link from 'next/link';
import { PhoneCall, ShieldAlert, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { EMERGENCY_NUMBERS } from '@/data/servicesData';

export default function EmergencyPage() {
  return (
    <div className="py-12 bg-bgLight min-h-[80vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Top Header */}
        <div className="bg-red-950 text-white p-8 rounded-3xl mb-8 shadow-card border border-red-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-600/30 text-red-400 flex items-center justify-center border border-red-500/40">
              <PhoneCall className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black">أرقام الطوارئ والبلاغات الرسمية</h1>
              <p className="text-xs sm:text-sm text-red-200 mt-1">
                دليل أرقام الاتصال المجانية المباشرة للحالات الطارئة والبلاغات الرسمية في المملكة العربية السعودية.
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="text-xs text-red-200 hover:text-white bg-white/10 px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 self-start md:self-auto"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>

        {/* Emergency Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {EMERGENCY_NUMBERS.map((em) => (
            <div
              key={em.number}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft hover:shadow-card hover:border-red-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-primary font-mono">{em.number}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-success bg-success-light px-2.5 py-0.5 rounded-full border border-success/20">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>رسمي 24/7</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-primary mb-1">{em.name_ar}</h3>
                <p className="text-xs text-textMuted leading-relaxed mb-4">{em.desc_ar}</p>
              </div>

              <a
                href={`tel:${em.number}`}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs text-center flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>اتصال فوري ({em.number})</span>
              </a>
            </div>
          ))}
        </div>

        {/* Emergency Notice */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 text-xs text-slate-600 leading-relaxed shadow-soft">
          <div className="flex items-center gap-2 font-bold text-primary mb-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-secondary" />
            <span>إرشادات التعامل مع الحالات الطارئة</span>
          </div>
          <ul className="list-disc list-inside space-y-1.5 text-slate-600">
            <li>جميع أرقام الطوارئ المذكورة أعلاه مجانية ومتاحة على مدار 24 ساعة ومن أي هاتف داخل المملكة.</li>
            <li>عند الاتصال بالطوارئ، احرص على ذكر موقعك الجغرافي والحي بدقة، ونوع الحالة الطارئة بهدوء ووضوح.</li>
            <li>للحوادث المرورية التقديرية بدون إصابات، يمكنك أيضاً استخدام تطبيق &quot;نجم&quot; عبر الرقم 199030.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
