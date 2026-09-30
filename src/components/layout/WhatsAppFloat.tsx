'use client';

import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

interface WhatsAppFloatProps {
  onOpenOrderModal?: () => void;
}

export default function WhatsAppFloat({ onOpenOrderModal }: WhatsAppFloatProps) {
  const phoneNumber = '966564520434';
  const defaultText = encodeURIComponent('السلام عليكم ورحمة الله، أود الاستفسار وطلب إنجاز معاملة عبر منصة دليل المقيم.');
  const waUrl = `https://wa.me/${phoneNumber}?text=${defaultText}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3 animate-fadeIn">
      {/* Tooltip badge */}
      <div 
        onClick={() => onOpenOrderModal ? onOpenOrderModal() : window.open(waUrl, '_blank')}
        className="hidden md:flex items-center gap-2 bg-[#071426]/95 border border-secondary/40 text-white py-2 px-3.5 rounded-full shadow-2xl backdrop-blur-md cursor-pointer hover:border-secondary transition-all group"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <div className="flex flex-col text-right">
          <span className="text-[11px] font-bold text-secondary-light group-hover:text-secondary">
            مختص المعاملات متواجد 24/7
          </span>
          <span className="text-[10px] text-slate-300 font-mono" dir="ltr">
            +966 56 452 0434
          </span>
        </div>
      </div>

      {/* Main floating circle button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل مع مختص المعاملات عبر الواتساب"
        className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-emerald-400 text-white flex items-center justify-center shadow-xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/30"
      >
        {/* Glow radar animation */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-30 group-hover:opacity-60 blur-md animate-pulse pointer-events-none" />
        
        <MessageCircle className="w-7 h-7 relative z-10 drop-shadow-md" />
      </a>
    </div>
  );
}
