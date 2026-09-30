'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Menu, 
  X, 
  ShieldAlert, 
  Calculator, 
  Layers, 
  Building2, 
  Sparkles,
  PhoneCall,
  Lock,
  Send,
  SlidersHorizontal,
  LayoutDashboard
} from 'lucide-react';
import ServiceOrderModal from '@/components/home/ServiceOrderModal';
import SystemAccessModal from '@/components/layout/SystemAccessModal';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  const [logoSettings, setLogoSettings] = useState({
    logoUrl: '/uploads/logo/specialist-logo.jpg',
    logoType: 'image',
    brandTitle: 'دليل المقيم اليمني',
    brandSubtitle: 'محسن العريقي • مقدم خدمات إلكترونية معتمد',
  });

  useEffect(() => {
    fetch('/api/settings/logo')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setLogoSettings(json.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 glass-header text-white shadow-lg transition-all">
        {/* Top Banner Notice */}
        <div className="bg-[#071426] border-b border-primary-light/50 px-4 py-1.5 text-xs text-slate-300">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-secondary font-medium">خدمة فورية للمقيمين والمنشآت:</span>
              <span>إنجاز المعاملات، فك الملاحظات، الفحوصات الطبية، وتراخيص MISA برعاية معتمدة.</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-slate-400">
              <button
                onClick={() => setIsAccessModalOpen(true)}
                className="hover:text-secondary flex items-center gap-1.5 text-xs font-semibold text-secondary-light transition-colors"
              >
                <Lock className="w-3 h-3 text-secondary" />
                <span>بوابة النظام والمشرف</span>
              </button>
              <span>|</span>
              <Link href="/emergency" className="hover:text-secondary flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-danger" />
                <span>أرقام الطوارئ</span>
              </Link>
              <span>|</span>
              <span className="text-slate-400">المملكة العربية السعودية 🇸🇦</span>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Brand Identity */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary via-secondary-light to-secondary-dark p-0.5 shadow-md flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform border border-secondary/40">
                {logoSettings.logoUrl ? (
                  <img
                    src={logoSettings.logoUrl}
                    alt={logoSettings.brandTitle}
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                ) : (
                  <div className="w-full h-full bg-primary rounded-[14px] flex items-center justify-center">
                    <span className="text-xl font-black text-secondary">يمـن</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-secondary transition-colors">
                  {logoSettings.brandTitle || 'دليل المقيم اليمني'}
                </span>
                <span className="text-xs text-secondary-light tracking-wide font-medium">
                  {logoSettings.brandSubtitle || 'محسن العريقي • مقدم خدمات إلكترونية معتمد'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link 
                href="/" 
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                الرئيسية
              </Link>

              <Link 
                href="/#services" 
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
              >
                <Layers className="w-4 h-4 text-secondary" />
                <span>دليل الخدمات</span>
              </Link>

              <Link 
                href="/#platforms" 
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
              >
                <Building2 className="w-4 h-4 text-secondary" />
                <span>المنصات</span>
              </Link>

              <Link 
                href="/#calculators" 
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
              >
                <Calculator className="w-4 h-4 text-secondary" />
                <span>الحاسبات</span>
              </Link>

              <Link 
                href="/#ai-assistant" 
                className="px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:text-secondary-light hover:bg-secondary/10 transition-colors flex items-center gap-1.5 border border-secondary/30"
              >
                <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
                <span>المساعد الذكي</span>
              </Link>
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Secret / Quick Dashboard Entry */}
              <button
                onClick={() => setIsAccessModalOpen(true)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-slate-200 px-3 py-2.5 rounded-xl text-xs font-bold border border-white/15 transition-all"
                title="الدخول للنظام، لوحة المشرف، ولوحة المقيم"
              >
                <Lock className="w-3.5 h-3.5 text-secondary" />
                <span className="hidden xl:inline">لوحة التحكم</span>
              </button>

              {/* Fast Order CTA Button */}
              <button
                onClick={() => setIsOrderModalOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light hover:brightness-110 text-primary font-black px-4 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-secondary/20 text-xs sm:text-sm transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>اطلب معاملتك فوراً</span>
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsOrderModalOpen(true)}
                className="sm:hidden bg-secondary text-primary font-black px-3 py-1.5 rounded-lg text-xs"
              >
                طلب فوري
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                aria-label="القائمة الرئيسية"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-primary-dark border-t border-primary-light/40 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            {/* Quick action buttons in mobile */}
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsOrderModalOpen(true);
                }}
                className="w-full bg-secondary text-primary font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>اطلب معاملتك</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAccessModalOpen(true);
                }}
                className="w-full bg-white/10 text-white font-bold py-2.5 px-3 rounded-xl text-xs border border-white/15 flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-secondary" />
                <span>لوحة التحكم</span>
              </button>
            </div>

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white"
            >
              الرئيسية
            </Link>
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white"
            >
              دليل الخدمات الحكومية والتعقيب
            </Link>
            <Link
              href="/#platforms"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white"
            >
              المنصات الحكومية الرسمية
            </Link>
            <Link
              href="/#calculators"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white"
            >
              الحاسبات والمعالجات التفاعلية
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAccessModalOpen(true);
              }}
              className="w-full text-right px-3 py-2 rounded-lg text-sm font-medium text-amber-300 hover:bg-amber-500/10 flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-secondary" />
              <span>لوحة تحكم المشرف (Admin)</span>
            </button>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-emerald-300 hover:bg-emerald-500/10 flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>لوحة تحكم المقيم (Dashboard)</span>
            </Link>
            <Link
              href="/emergency"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>🚨 دليل أرقام الطوارئ والبلاغات</span>
            </Link>
          </div>
        )}
      </header>

      {/* Embedded Global Modals */}
      <ServiceOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />

      <SystemAccessModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
      />
    </>
  );
}
