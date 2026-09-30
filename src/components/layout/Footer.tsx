import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ExternalLink, Heart, AlertTriangle, PhoneCall } from 'lucide-react';
import { CATEGORIES_DATA, PLATFORMS_DATA } from '@/data/servicesData';

export default function Footer() {
  return (
    <footer className="bg-[#061224] text-slate-300 border-t border-primary-light/40 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Prominent Legal Disclaimer Box (Required by Sections 60 & 61) */}
        <div className="bg-primary/80 border border-secondary/30 rounded-2xl p-6 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="p-3 bg-secondary/10 text-secondary rounded-xl shrink-0">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <span>إخلاء مسؤولية رسمي وقانوني</span>
                <span className="text-xs bg-secondary/20 text-secondary-light px-2.5 py-0.5 rounded-full font-medium">
                  منصة مستقلة
                </span>
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                هذه المنصة هي بوابة رقمية إرشادية وتوعوية مستقلة وليست جهة حكومية رسمية. المعلومات والبيانات الواردة مقدمة للإرشاد والتسهيل فقط، وقد تتغير المتطلبات والشروط والرسوم وفقاً للأنظمة والقرارات الصادرة عن الجهات الحكومية السعودية. يرجى دائماً التحقق والتنفيذ عبر المنصات والبوابات الحكومية الرسمية المعتمدة.
              </p>
            </div>
          </div>
        </div>

        {/* Multi-column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1: Platform Overview */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary text-primary font-black text-xl flex items-center justify-center">
                يمن
              </div>
              <div>
                <span className="text-lg font-bold text-white">دليل المقيم اليمني</span>
                <span className="block text-xs text-secondary">المملكة العربية السعودية</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              البوابة الرقمية الشاملة للمقيمين اليمنيين في المملكة؛ نساعدك على فهم الإجراءات، حساب الرسوم الرسمية، تجهيز الوثائق والمستندات، والانتقال المباشر للجهات والمنصات الحكومية.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-primary px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
                🇸🇦 لوائح العمل والإقامة السعودية
              </span>
              <span className="bg-primary px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
                🔒 خصوصية تامة بدون جمع هويات
              </span>
            </div>
          </div>

          {/* Col 2: Primary Sectors */}
          <div>
            <h5 className="text-sm font-bold text-white mb-4 border-r-2 border-secondary pr-2">
              أبرز القطاعات الخدمية
            </h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {CATEGORIES_DATA.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/#${cat.slug}`} className="hover:text-secondary transition-colors">
                    {cat.name_ar}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Official Platforms */}
          <div>
            <h5 className="text-sm font-bold text-white mb-4 border-r-2 border-secondary pr-2">
              المنصات الحكومية الرسمية
            </h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {PLATFORMS_DATA.slice(0, 6).map((plat) => (
                <li key={plat.id}>
                  <a 
                    href={plat.official_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-secondary transition-colors flex items-center gap-1.5"
                  >
                    <span>{plat.name_ar}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Tools & Support */}
          <div>
            <h5 className="text-sm font-bold text-white mb-4 border-r-2 border-secondary pr-2">
              الأدوات والدعم
            </h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/#calculators" className="hover:text-secondary transition-colors">
                  حاسبة الرسوم الحكومية
                </Link>
              </li>
              <li>
                <Link href="/#calculators" className="hover:text-secondary transition-colors">
                  معالج نقل الخدمات
                </Link>
              </li>
              <li>
                <Link href="/#calculators" className="hover:text-secondary transition-colors">
                  مولد قوائم الفحص (Checklists)
                </Link>
              </li>
              <li>
                <Link href="/#offices" className="hover:text-secondary transition-colors">
                  دليل مكاتب الخدمات والتعقيب
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-secondary transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="hover:text-danger text-red-400 font-semibold transition-colors flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>أرقام الطوارئ والبلاغات</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} — منصة دليل المقيم اليمني في السعودية.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">شروط الاستخدام</Link>
            <Link href="/disclaimer" className="hover:text-slate-300 transition-colors">إخلاء المسؤولية</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">اتصل بنا / إبلاغ عن معلومة</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
