'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  Bookmark, 
  Bell, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ExternalLink, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface ReminderItem {
  id: string;
  titleAr: string;
  reminderType: string;
  dueDate: string;
  isCompleted: boolean;
}

export default function DashboardPage() {
  const [reminders, setReminders] = useState<ReminderItem[]>([
    {
      id: 'r-1',
      titleAr: 'تجديد هوية مقيم (قبل انتهاء مهلة السماح)',
      reminderType: 'IQAMA_EXPIRY',
      dueDate: '2026-11-15',
      isCompleted: false,
    },
    {
      id: 'r-2',
      titleAr: 'تجديد التأمين الطبي الإلزامي',
      reminderType: 'INSURANCE_EXPIRY',
      dueDate: '2026-10-30',
      isCompleted: false,
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newType, setNewType] = useState('IQAMA_EXPIRY');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDate) return;

    const item: ReminderItem = {
      id: `rem-${Date.now()}`,
      titleAr: newTitle,
      reminderType: newType,
      dueDate: newDate,
      isCompleted: false,
    };

    setReminders((prev) => [item, ...prev]);
    setNewTitle('');
    setNewDate('');
    setShowAddModal(false);
  };

  const handleDeleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="py-10 bg-bgLight min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Top Header */}
        <div className="bg-primary text-white p-6 sm:p-8 rounded-3xl mb-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary text-primary font-black text-2xl flex items-center justify-center shadow-md">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-black">لوحة تحكم المقيم</h1>
                <span className="bg-success text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  حساب نشط
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                إدارة تذكيرات انتهاء الوثائق، الخدمات المحفوظة، وسجل الإجراءات الحكومية.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-secondary-light hover:text-white bg-white/10 px-4 py-2 rounded-xl transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للرئيسية</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Col 1 & 2: Active Reminders & Documents */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Reminders Card (Section 16 & 17) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-secondary/15 text-secondary-dark rounded-xl">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-primary">تذكيرات الوثائق والمواعيد</h2>
                    <span className="text-xs text-textMuted">تنبيهات قبل انتهاء الإقامة والتأمين والمواعيد</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-1 bg-primary hover:bg-primary-light text-secondary font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة تذكير</span>
                </button>
              </div>

              {reminders.length === 0 ? (
                <div className="text-center py-8 text-xs text-textMuted">
                  لا توجد تذكيرات نشطة حالياً. انقر على &quot;إضافة تذكير&quot; لجدولة مواعيدك.
                </div>
              ) : (
                <div className="space-y-3">
                  {reminders.map((rem) => (
                    <div
                      key={rem.id}
                      className="p-4 rounded-2xl bg-bgLight border border-slate-200 flex items-center justify-between gap-4 transition-all hover:border-secondary/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                          <Clock className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-primary mb-0.5">{rem.titleAr}</h3>
                          <div className="flex items-center gap-2 text-[11px] text-textMuted">
                            <span>تاريخ الاستحقاق: <strong className="text-slate-700">{rem.dueDate}</strong></span>
                            <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
                            <span className="text-amber-600 font-semibold">متبقي 45 يوماً</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteReminder(rem.id)}
                        title="حذف التذكير"
                        className="text-slate-400 hover:text-danger p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
              <h2 className="text-sm font-bold text-primary mb-4 pb-2 border-b">إجراءات سريعة موصى بها لحسابك</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <Link
                  href="/#calculators"
                  className="p-4 rounded-2xl bg-bgLight hover:bg-secondary/10 border border-slate-200 transition-all text-center group"
                >
                  <span className="block font-bold text-primary group-hover:text-secondary-dark mb-1">حاسبة الرسوم</span>
                  <span className="text-[11px] text-textMuted">تقدير تكلفة التجديد والتابعين</span>
                </Link>
                <Link
                  href="/#calculators"
                  className="p-4 rounded-2xl bg-bgLight hover:bg-secondary/10 border border-slate-200 transition-all text-center group"
                >
                  <span className="block font-bold text-primary group-hover:text-secondary-dark mb-1">معالج نقل الخدمات</span>
                  <span className="text-[11px] text-textMuted">شروط وتكلفة النقل بقوى</span>
                </Link>
                <Link
                  href="/#ai-assistant"
                  className="p-4 rounded-2xl bg-bgLight hover:bg-secondary/10 border border-slate-200 transition-all text-center group"
                >
                  <span className="block font-bold text-primary group-hover:text-secondary-dark mb-1">المساعد الذكي</span>
                  <span className="text-[11px] text-textMuted">استفسر عن أي نظام أو رسم</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Col 3: Saved Services (Favorites) */}
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
                <Bookmark className="w-5 h-5 text-secondary" />
                <h2 className="text-sm font-bold text-primary">المعاملات المفضلة والمحفوظة</h2>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-bgLight border border-slate-200 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-primary mb-1">تجديد الإقامة (هوية مقيم)</h3>
                    <span className="text-[10px] text-textMuted">منصة أبشر • 650 ريال</span>
                  </div>
                  <a
                    href="https://www.absher.sa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-secondary-dark font-bold p-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-bgLight border border-slate-200 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-primary mb-1">طلب تأشيرة زيارة عائلية</h3>
                    <span className="text-[10px] text-textMuted">وزارة الخارجية • 300 ريال</span>
                  </div>
                  <a
                    href="https://visa.mofa.gov.sa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-secondary-dark font-bold p-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Privacy & Safety Badge (Section 48) */}
            <div className="bg-primary/5 border border-primary/20 p-5 rounded-3xl text-xs text-slate-700 leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-primary mb-1.5">
                <ShieldAlert className="w-4 h-4 text-secondary" />
                <span>أمان وخصوصية البيانات</span>
              </div>
              نلتزم بسياسة الأمان الصارمة: لا نطلب ولا نخزن أرقام الهويات أو الجوازات أو البطاقات البنكية في المنصة.
            </div>

          </div>

        </div>

      </div>

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-right shadow-2xl">
            <h3 className="text-base font-bold text-primary mb-4 pb-2 border-b">إضافة تذكير بموعد وثيقة رسمية</h3>
            <form onSubmit={handleAddReminder} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">عنوان التذكير:</label>
                <input
                  required
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: موعد تجديد إقامة السائق / فحص دوري"
                  className="w-full p-2.5 text-xs border rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">نوع التذكير:</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full p-2.5 text-xs border rounded-xl"
                >
                  <option value="IQAMA_EXPIRY">انتهاء الإقامة (هوية مقيم)</option>
                  <option value="PASSPORT_EXPIRY">انتهاء جواز السفر</option>
                  <option value="INSURANCE_EXPIRY">انتهاء التأمين الطبي</option>
                  <option value="APPOINTMENT">موعد معاملة أو مراجعة</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">تاريخ الاستحقاق:</label>
                <input
                  required
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-2.5 text-xs border rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary-light text-secondary font-bold py-2.5 rounded-xl text-xs"
                >
                  حفظ التذكير
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-xl"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
