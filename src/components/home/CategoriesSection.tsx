'use client';

import React from 'react';
import { 
  FileBadge, 
  Plane, 
  Briefcase, 
  CreditCard, 
  Users, 
  Car, 
  HeartPulse, 
  Building2, 
  Store, 
  ShieldCheck, 
  Landmark, 
  Receipt,
  Layers,
  ArrowUpLeft,
  ShieldAlert
} from 'lucide-react';
import { ServiceCategory } from '@/types';

interface CategoriesSectionProps {
  categories: ServiceCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  FileBadge: <FileBadge className="w-6 h-6" />,
  Plane: <Plane className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  CreditCard: <CreditCard className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Car: <Car className="w-6 h-6" />,
  HeartPulse: <HeartPulse className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  Store: <Store className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Landmark: <Landmark className="w-6 h-6" />,
  Receipt: <Receipt className="w-6 h-6" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6" />,
};

export default function CategoriesSection({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoriesSectionProps) {
  return (
    <section id="categories" className="py-14 bg-bgLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-secondary font-bold text-sm mb-1.5">
              <Layers className="w-4 h-4" />
              <span>القطاعات الأساسية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
              استكشف الخدمات حسب القطاع
            </h2>
            <p className="text-sm text-textMuted mt-1">
              جميع المعاملات مصنفة ومربوطة مباشرة باللوائح والمنصات الرسمية.
            </p>
          </div>

          {selectedCategory && (
            <button
              onClick={() => onSelectCategory(null)}
              className="mt-3 sm:mt-0 text-xs font-semibold text-secondary hover:text-secondary-dark underline"
            >
              عرض جميع القطاعات
            </button>
          )}
        </div>

        {/* Categories Grid (12 Sectors) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? null : cat.id)}
                className={`group text-right p-5 rounded-2xl transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-card ring-2 ring-secondary/50 scale-[1.02]'
                    : 'bg-white hover:bg-slate-50 text-textMain border-slate-200/80 hover:border-secondary/40 shadow-soft hover:shadow-card'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-secondary text-primary'
                          : 'bg-primary/5 text-primary group-hover:bg-secondary/15 group-hover:text-secondary-dark'
                      }`}
                    >
                      {ICON_MAP[cat.icon] || <Layers className="w-6 h-6" />}
                    </div>
                    <ArrowUpLeft 
                      className={`w-4 h-4 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 ${
                        isSelected ? 'text-secondary' : 'text-slate-300 group-hover:text-secondary'
                      }`} 
                    />
                  </div>

                  <h3 className={`text-base font-bold mb-1.5 transition-colors ${
                    isSelected ? 'text-white' : 'text-primary group-hover:text-primary-light'
                  }`}>
                    {cat.name_ar}
                  </h3>
                  
                  <p className={`text-xs leading-relaxed line-clamp-2 ${
                    isSelected ? 'text-slate-300' : 'text-textMuted'
                  }`}>
                    {cat.description_ar}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100/30 flex items-center justify-between text-[11px]">
                  <span className={isSelected ? 'text-secondary-light font-medium' : 'text-slate-400'}>
                    تصفح المعاملات
                  </span>
                  <span className={`px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-secondary/20 text-secondary' : 'bg-slate-100 text-slate-600'
                  }`}>
                    موثق
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
