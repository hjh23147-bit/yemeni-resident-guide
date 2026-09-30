import React from 'react';
import { PhoneCall, ShieldAlert, AlertTriangle } from 'lucide-react';
import { EMERGENCY_NUMBERS } from '@/data/servicesData';

export default function EmergencyBanner() {
  return (
    <section className="bg-red-950 text-white py-10 border-t border-red-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600/30 text-red-400 rounded-2xl border border-red-500/30 animate-pulse">
              <PhoneCall className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">أرقام الطوارئ والبلاغات الرسمية في المملكة</h3>
              <p className="text-xs text-red-200">أرقام الاتصال المباشرة المجانية على مدار 24 ساعة للحالات الطارئة.</p>
            </div>
          </div>
          <div className="text-xs text-red-300 font-medium">
            المملكة العربية السعودية 🇸🇦
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {EMERGENCY_NUMBERS.map((em) => (
            <a
              key={em.number}
              href={`tel:${em.number}`}
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-400/50 p-3.5 rounded-2xl text-center transition-all group"
            >
              <span className="block text-2xl font-black text-secondary group-hover:scale-105 transition-transform">
                {em.number}
              </span>
              <span className="block text-xs font-bold text-white mt-1">{em.name_ar}</span>
              <span className="block text-[10px] text-red-200/80 mt-0.5">{em.desc_ar}</span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
