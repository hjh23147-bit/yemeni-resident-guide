'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Layers, Search, Sparkles, User, Calculator } from 'lucide-react';

interface BottomNavProps {
  activeTab?: string;
}

export default function BottomNav({ activeTab = 'home' }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-primary/95 backdrop-blur-md border-t border-primary-light/50 px-2 py-2 shadow-2xl">
      <div className="flex items-center justify-around">
        
        <Link 
          href="/" 
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'home' ? 'text-secondary font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px]">الرئيسية</span>
        </Link>

        <Link 
          href="/#services" 
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'services' ? 'text-secondary font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[11px]">الخدمات</span>
        </Link>

        <Link 
          href="/#search-input" 
          className="flex flex-col items-center gap-1 -mt-5 bg-gradient-to-tr from-secondary-dark via-secondary to-secondary-light text-primary font-bold p-3 rounded-full shadow-lg border-4 border-[#071426] transition-transform active:scale-95"
        >
          <Search className="w-6 h-6 stroke-[2.5]" />
          <span className="sr-only">البحث السريع</span>
        </Link>

        <Link 
          href="/#calculators" 
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'calculators' ? 'text-secondary font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calculator className="w-5 h-5" />
          <span className="text-[11px]">الحاسبات</span>
        </Link>

        <Link 
          href="/#ai-assistant" 
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'ai' ? 'text-secondary font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
          <span className="text-[11px]">المساعد</span>
        </Link>

      </div>
    </nav>
  );
}
