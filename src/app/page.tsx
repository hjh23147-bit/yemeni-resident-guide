'use client';

import React, { useState } from 'react';
import Hero from '@/components/home/Hero';
import CinematicShowcase from '@/components/home/CinematicShowcase';
import CategoriesSection from '@/components/home/CategoriesSection';
import PopularServices from '@/components/home/PopularServices';
import PlatformsSection from '@/components/home/PlatformsSection';
import QuickWizards from '@/components/home/QuickWizards';
import OfficesSection from '@/components/home/OfficesSection';
import UpdatesSection from '@/components/home/UpdatesSection';
import AIAssistantWidget from '@/components/home/AIAssistantWidget';
import EmergencyBanner from '@/components/home/EmergencyBanner';
import ServiceOrderModal from '@/components/home/ServiceOrderModal';
import { CATEGORIES_DATA, PLATFORMS_DATA, SERVICES_DATA } from '@/data/servicesData';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Global order modal state on home page
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState('');
  const [preSelectedCategory, setPreSelectedCategory] = useState('');

  const handleOpenOrderModal = (serviceSlug?: string, categoryId?: string) => {
    setPreSelectedService(serviceSlug || '');
    setPreSelectedCategory(categoryId || '');
    setIsOrderModalOpen(true);
  };

  const faqs = [
    {
      q: 'كيف يعمل نموذج طلب الخدمة وما هي طريقة المتابعة؟',
      a: 'تختار الخدمة المطلوبة، وتحدد الأولوية وتدرج مرفقاتك (صور، PDF، إقامات، جوازات)، فيتم حفظ المعاملة تلقائياً برقم فريد وتحويل بياناتك مباشرة عبر الواتساب إلى المختص المعتمد (+966 56 452 0434) لتأكيد الإنجاز الفوري.'
    },
    {
      q: 'هل توفر المنصة خدمات للمنشآت في النطاق الأحمر وفك ملاحظات قوى ومدد؟',
      a: 'نعم، يتوفر قسم متخصص بالتعقيب لفك ملاحظات حماية الأجور (مدد)، التقييم الذاتي، كروت العمل الاستثنائية، ونقل العمال بين المنشآت والفروع وفق الإجراءات النظامية المعتمدة.'
    },
    {
      q: 'ما هي الفحوصات الطبية المعتمدة وكيف يتم ربطها بنظام إفادة والجوازات؟',
      a: 'تشمل الفحوصات: فحص إصدار وتجديد الإقامة، الإقامة المميزة، رخص القيادة، والتوظيف ومندوبي التوصيل. يتم التنسيق مع المراكز المعتمدة ليتم الربط الآلي الفوري بأنظمة أبشر وإفادة وهيئة النقل.'
    },
    {
      q: 'هل تساعد المنصة في تراخيص وتأسيس الشركات الأجنبية (MISA)؟',
      a: 'نعم، نوفر دورة حياة متكاملة للمستثمر تشمل: شراء شركات أجنبية قائمة، استخراج رخص MISA، حجز الاسم التجاري، صياغة وتوثيق عقد التأسيس، السجل التجاري، ملف مكتب العمل، قوى ومقيم، الزكاة، والتأمينات، وفتح الحساب البنكي.'
    },
    {
      q: 'هل هذه المنصة جهة حكومية سعودية رسمية؟',
      a: 'هذه منصة إرشادية وخدمية متخصصة ومستقلة تهدف لتيسير المعاملات وتوفير خدمات الإنجاز والتعقيب المعتمد للمقيمين والمستثمرين وأصحاب الأعمال بالربط مع القنوات الرسمية.'
    }
  ];

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Hero with Search & Instant Order CTAs */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onTagClick={(tag) => setSearchQuery(tag)}
        servicesCount={SERVICES_DATA.length}
        platformsCount={PLATFORMS_DATA.length}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* 2. Cinematic Showcase: Taqeeb, Medical Checks, & MISA Foreign Investment */}
      <div id="cinematic-showcase">
        <CinematicShowcase onOpenOrderModal={handleOpenOrderModal} />
      </div>

      {/* 3. Primary Categories (All 15 Sectors) */}
      <CategoriesSection
        categories={CATEGORIES_DATA}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 4. Popular Services Catalog & Detail Drawer */}
      <PopularServices
        services={SERVICES_DATA}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />

      {/* 5. Interactive Calculators & Decision Wizards */}
      <QuickWizards />

      {/* 6. Official Government Platforms Directory */}
      <PlatformsSection />

      {/* 7. AI Resident Assistant (RAG Grounded) */}
      <AIAssistantWidget />

      {/* 8. Verified Offices & Services Directory */}
      <OfficesSection />

      {/* 9. Latest Government Updates & Circulars */}
      <UpdatesSection />

      {/* 10. FAQ Section */}
      <section id="faq" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary-dark text-xs font-bold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>الأسئلة الشائعة ونظام الإنجاز</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-tight mb-2">
              إجابات على أكثر التساؤلات تكراراً
            </h2>
            <p className="text-sm text-textMuted">
              كل ما تحتاج لمعرفته حول استخدام المنصة، فك الملاحظات، وطلب المعاملات الفورية.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-bgLight transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-right flex items-center justify-between font-bold text-sm text-primary hover:text-secondary-dark transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-secondary shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. Emergency Contacts Banner */}
      <EmergencyBanner />

      {/* Embedded Service Order Modal */}
      <ServiceOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        preSelectedService={preSelectedService}
        preSelectedCategory={preSelectedCategory}
      />
    </div>
  );
}
