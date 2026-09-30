'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  User, 
  LayoutDashboard, 
  SlidersHorizontal, 
  PhoneCall, 
  Database, 
  Sparkles, 
  LogIn, 
  AlertCircle, 
  KeyRound, 
  Eye, 
  EyeOff, 
  CheckCircle2
} from 'lucide-react';

interface SystemAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SystemAccessModal({ isOpen, onClose }: SystemAccessModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'adminPassword' | 'fullLogin' | 'portals'>('adminPassword');
  
  // Quick admin password state
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Full credentials state
  const [fullEmail, setFullEmail] = useState('admin@resident-guide.sa');
  const [fullPassword, setFullPassword] = useState('');
  const [showFullPassword, setShowFullPassword] = useState(false);

  if (!isOpen) return null;

  // Handle direct admin password authentication (the primary requirement)
  const handleAdminPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPassword.trim()) {
      setErrorMsg('يرجى كتابة كلمة مرور المنصة للدخول');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: adminPassword.trim()
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || 'كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى');
      }

      setSuccessMsg('تم التحقق بنجاح! جارٍ فتح لوحة التحكم...');
      setTimeout(() => {
        onClose();
        router.push('/admin');
      }, 500);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'كلمة المرور غير صحيحة');
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle full credentials login
  const handleFullLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullPassword.trim()) {
      setErrorMsg('يرجى كتابة كلمة المرور');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: fullEmail.trim(),
          password: fullPassword.trim()
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || 'بيانات الدخول غير صحيحة');
      }

      setSuccessMsg('تم تسجيل الدخول بنجاح! جارٍ التوجيه...');
      setTimeout(() => {
        onClose();
        if (data.data?.user?.role === 'ADMIN' || data.data?.user?.role === 'SUPER_ADMIN') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }, 500);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'تعذر تسجيل الدخول');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-secondary/40 overflow-hidden transform transition-all text-right"
        dir="rtl"
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#071426] via-primary to-[#0f2c52] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute left-5 top-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            title="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/40 text-secondary-light text-xs font-bold mb-2">
            <Lock className="w-3.5 h-3.5 text-secondary" />
            <span>بوابة التحكم والإدارة المحمية</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
            تسجيل كلمة مرور لوحة التحكم
          </h3>
          <p className="text-xs text-slate-300">
            للسماح بالدخول إلى إدارة المنصة وقواعد البيانات، يرجى إدخال كلمة المرور المعتمدة.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => { setActiveTab('adminPassword'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'adminPassword'
                ? 'border-secondary text-primary bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-4 h-4 text-secondary" />
            <span>كلمة مرور الإدارة</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('fullLogin'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'fullLogin'
                ? 'border-secondary text-primary bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <KeyRound className="w-4 h-4 text-secondary" />
            <span>دخول بالبريد والرمز</span>
          </button>

          <button
            onClick={() => { setActiveTab('portals'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'portals'
                ? 'border-secondary text-primary bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>بوابات المنصة</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 flex items-center gap-2.5 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-semibold animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 flex items-center gap-2.5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: Direct Admin Password Challenge (Primary) */}
          {activeTab === 'adminPassword' && (
            <form onSubmit={handleAdminPasswordSubmit} className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-right">
                <div className="flex items-center gap-2 text-primary font-bold text-xs mb-1">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  <span>منطقة محمية ومقيدة للمشرف</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  يتم التحقق من كلمة المرور ومطابقتها مع التشفير الأمني في قاعدة بيانات المنصة قبل منح صلاحيات الدخول للوحة الإدارة.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  كلمة مرور المنصة للسماح بالدخول للإدارة:
                </label>
                <div className="relative">
                  <input
                    type={showAdminPassword ? 'text' : 'password'}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور..."
                    autoFocus
                    required
                    dir="ltr"
                    className="w-full rounded-2xl border-2 border-slate-300 focus:border-secondary py-3.5 pr-4 pl-12 text-base font-mono text-center tracking-widest focus:ring-4 focus:ring-secondary/15 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                    className="absolute left-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-1"
                    title={showAdminPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  >
                    {showAdminPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary-light to-primary hover:brightness-110 text-secondary font-black px-6 py-3 rounded-xl shadow-lg shadow-primary/20 text-xs sm:text-sm transition-all active:scale-95 disabled:opacity-50"
                >
                  {isVerifying ? (
                    <span>جارٍ التحقق من التشفير...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>تأكيد الدخول إلى لوحة التحكم</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Full Credentials (Email + Password) */}
          {activeTab === 'fullLogin' && (
            <form onSubmit={handleFullLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  البريد الإلكتروني أو اسم المستخدم
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullEmail}
                    onChange={(e) => setFullEmail(e.target.value)}
                    placeholder="admin@resident-guide.sa"
                    dir="ltr"
                    className="w-full rounded-xl border border-slate-300 py-2.5 pr-3 pl-9 text-sm focus:border-secondary focus:ring-secondary/20 focus:outline-none text-right"
                    required
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  كلمة المرور المشفرة
                </label>
                <div className="relative">
                  <input
                    type={showFullPassword ? 'text' : 'password'}
                    value={fullPassword}
                    onChange={(e) => setFullPassword(e.target.value)}
                    placeholder="••••••••"
                    dir="ltr"
                    className="w-full rounded-xl border border-slate-300 py-2.5 pr-3 pl-9 text-sm focus:border-secondary focus:ring-secondary/20 focus:outline-none text-right font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowFullPassword(!showFullPassword)}
                    className="absolute left-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showFullPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-secondary font-black px-6 py-2.5 rounded-xl shadow-md text-xs transition-all active:scale-95 disabled:opacity-50"
                >
                  {isVerifying ? (
                    <span>جارٍ التحقق...</span>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>تسجيل الدخول الآمن</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: Public Portals & Directory */}
          {activeTab === 'portals' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Admin Dashboard - Requires Password */}
                <button
                  type="button"
                  onClick={() => { setActiveTab('adminPassword'); setErrorMsg(''); }}
                  className="group p-4 rounded-2xl border border-slate-200 hover:border-secondary bg-slate-50 hover:bg-secondary/5 transition-all text-right flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary text-secondary flex items-center justify-center shadow-md">
                      <SlidersHorizontal className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      يتطلب كلمة مرور
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-primary mb-1">
                      لوحة تحكم المشرف (Admin)
                    </h4>
                    <p className="text-xs text-slate-500">
                      متابعة مؤشرات الأداء، طلبات العملاء الواردة، وتدقيق البيانات.
                    </p>
                  </div>
                </button>

                {/* Resident Dashboard */}
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="group p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/40 transition-all text-right flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                      <LayoutDashboard className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      المقيم
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-700 mb-1">
                      لوحة تحكم المقيم (Resident)
                    </h4>
                    <p className="text-xs text-slate-500">
                      إدارة الإقامات، التنبيهات، حاسبات الرسوم، والمفضلة الشخصية.
                    </p>
                  </div>
                </Link>

                {/* Orders Database - Protected */}
                <button
                  type="button"
                  onClick={() => { setActiveTab('adminPassword'); setErrorMsg(''); }}
                  className="group p-4 rounded-2xl border border-slate-200 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/40 transition-all text-right flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                      <Database className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      محمي
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-amber-700 mb-1">
                      سجل طلبات ومعاملات العملاء
                    </h4>
                    <p className="text-xs text-slate-500">
                      استعراض كافة الطلبات المسجلة، أرقام العملاء، والمرفقات.
                    </p>
                  </div>
                </button>

                {/* Emergency Hotlines */}
                <Link
                  href="/emergency"
                  onClick={onClose}
                  className="group p-4 rounded-2xl border border-slate-200 hover:border-red-500 bg-slate-50 hover:bg-red-50/40 transition-all text-right flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                      24/7 طوارئ
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-red-700 mb-1">
                      دليل الطوارئ والبلاغات الموحد
                    </h4>
                    <p className="text-xs text-slate-500">
                      أرقام الاتصال المباشر بالشرطة، المرور، الجوازات، والعمل.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
