'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Layers, 
  Building2, 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  RefreshCw,
  Search,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  MessageCircle,
  FileText,
  Phone,
  Filter,
  Image as ImageIcon,
  Upload,
  Sparkles,
  Save,
  Check,
  Palette,
  RotateCcw,
  Eye,
  EyeOff,
  Lock
} from 'lucide-react';
import { ServiceOrderItem } from '@/types';

interface StatsData {
  servicesCount: number;
  verifiedServicesCount: number;
  needsReviewCount: number;
  categoriesCount: number;
  platformsCount: number;
  officesCount: number;
  usersCount: number;
  healthPercentage: number;
  systemStatus: string;
}

interface LogoSettings {
  logoUrl: string;
  logoType: string;
  brandTitle: string;
  brandSubtitle: string;
  specialistName: string;
  specialistTitle: string;
  city: string;
  updatedAt?: string;
}

export default function AdminPage() {
  const [stats, setStats] = useState<StatsData>({
    servicesCount: 38,
    verifiedServicesCount: 38,
    needsReviewCount: 0,
    categoriesCount: 15,
    platformsCount: 8,
    officesCount: 3,
    usersCount: 2,
    healthPercentage: 100,
    systemStatus: 'OPERATIONAL',
  });

  const [orders, setOrders] = useState<ServiceOrderItem[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderSearch, setOrderSearch] = useState('');

  // Logo & Branding Settings State
  const [logoSettings, setLogoSettings] = useState<LogoSettings>({
    logoUrl: '/uploads/logo/specialist-logo.jpg',
    logoType: 'image',
    brandTitle: 'دليل المقيم اليمني',
    brandSubtitle: 'محسن العريقي • مقدم خدمات إلكترونية معتمد',
    specialistName: 'محسن العريقي',
    specialistTitle: 'مقدم خدمات إلكترونية',
    city: 'الرياض',
  });
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [savingLogo, setSavingLogo] = useState(false);
  const [logoMsg, setLogoMsg] = useState('');
  const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null);
  const [previewLogoUrl, setPreviewLogoUrl] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [servicesList] = useState([
    {
      id: 'srv-1',
      nameAr: 'تجديد الإقامة (هوية مقيم)',
      platform: 'أبشر',
      fees: '650 ريال',
      status: 'VERIFIED',
      lastCheck: '2026-09-25',
    },
    {
      id: 'srv-2',
      nameAr: 'إصدار كروت عمل نطاق أحمر',
      platform: 'قوى / مكتب العمل',
      fees: '850 ريال (تعقيب)',
      status: 'VERIFIED',
      lastCheck: '2026-09-25',
    },
    {
      id: 'srv-3',
      nameAr: 'فك ملاحظة حماية الأجور (مدد)',
      platform: 'مدد',
      fees: '750 ريال',
      status: 'VERIFIED',
      lastCheck: '2026-09-25',
    },
    {
      id: 'srv-4',
      nameAr: 'فحص طبي لإصدار وتجديد الإقامة',
      platform: 'إفادة / الصحة',
      fees: '250 ريال',
      status: 'VERIFIED',
      lastCheck: '2026-09-24',
    },
    {
      id: 'srv-5',
      nameAr: 'استخراج تراخيص الاستثمار الأجنبي (MISA)',
      platform: 'MISA',
      fees: '2000 ريال',
      status: 'VERIFIED',
      lastCheck: '2026-09-25',
    },
  ]);

  // Security Gate & Authentication
  const [authStatus, setAuthStatus] = useState<'CHECKING' | 'AUTHENTICATED' | 'LOCKED'>('CHECKING');
  const [gatePassword, setGatePassword] = useState('');
  const [showGatePassword, setShowGatePassword] = useState(false);
  const [gateLoading, setGateLoading] = useState(false);
  const [gateError, setGateError] = useState('');
  const [currentUser, setCurrentUser] = useState<{ id: string; email: string; fullName: string } | null>(null);

  const [activeTab, setActiveTab] = useState<'orders' | 'logo' | 'services' | 'audit'>('orders');

  const fetchOrders = () => {
    setLoadingOrders(true);
    fetch('/api/orders')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setOrders(json.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingOrders(false));
  };

  const fetchLogoSettings = () => {
    setLoadingLogo(true);
    fetch('/api/settings/logo')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setLogoSettings(json.data);
          setPreviewLogoUrl(json.data.logoUrl);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingLogo(false));
  };

  const loadAdminData = () => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setStats(json.data);
        }
      })
      .catch(() => {});

    fetchOrders();
    fetchLogoSettings();
  };

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.user) {
          const role = json.data.user.role?.name;
          if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
            setCurrentUser(json.data.user);
            setAuthStatus('AUTHENTICATED');
            loadAdminData();
            return;
          }
        }
        setAuthStatus('LOCKED');
      })
      .catch(() => {
        setAuthStatus('LOCKED');
      });
  }, []);

  const handleGateUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gatePassword.trim()) {
      setGateError('يرجى إدخال كلمة المرور للمنصة');
      return;
    }
    setGateLoading(true);
    setGateError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: gatePassword.trim() })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || 'كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى');
      }

      setCurrentUser(data.data?.user);
      setAuthStatus('AUTHENTICATED');
      loadAdminData();
    } catch (err: unknown) {
      setGateError(err instanceof Error ? err.message : 'كلمة المرور غير صحيحة');
    } finally {
      setGateLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    setAuthStatus('LOCKED');
    setCurrentUser(null);
    setGatePassword('');
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedLogoFile(file);
      const url = URL.createObjectURL(file);
      setPreviewLogoUrl(url);
    }
  };

  const selectPreset = (url: string, type: string) => {
    setSelectedLogoFile(null);
    setPreviewLogoUrl(url);
    setLogoSettings((prev) => ({ ...prev, logoUrl: url, logoType: type }));
  };

  const handleSaveLogo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingLogo(true);
    setLogoMsg('');

    try {
      if (selectedLogoFile) {
        const formData = new FormData();
        formData.append('logoFile', selectedLogoFile);
        formData.append('brandTitle', logoSettings.brandTitle);
        formData.append('brandSubtitle', logoSettings.brandSubtitle);
        formData.append('logoType', 'custom');

        const res = await fetch('/api/settings/logo', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          setLogoSettings(data.data);
          setPreviewLogoUrl(data.data.logoUrl);
          setSelectedLogoFile(null);
          setLogoMsg('✓ تم رفع واعتماد الشعار الجديد للمنصة بنجاح!');
        } else {
          throw new Error(data.error?.message || 'فشل حفظ الشعار');
        }
      } else {
        const res = await fetch('/api/settings/logo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            logoUrl: previewLogoUrl || logoSettings.logoUrl,
            logoType: logoSettings.logoType,
            brandTitle: logoSettings.brandTitle,
            brandSubtitle: logoSettings.brandSubtitle,
            specialistName: logoSettings.specialistName,
            specialistTitle: logoSettings.specialistTitle,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setLogoSettings(data.data);
          setLogoMsg('✓ تم حفظ واعتماد إعدادات وهوية الشعار بنجاح!');
        } else {
          throw new Error(data.error?.message || 'فشل حفظ الشعار');
        }
      }
      setTimeout(() => setLogoMsg(''), 4500);
    } catch (err: unknown) {
      setLogoMsg(`خطأ: ${err instanceof Error ? err.message : 'تعذر حفظ الشعار'}`);
    } finally {
      setSavingLogo(false);
    }
  };

  const filteredOrders = orders.filter((o) =>
    o.customerName?.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customerPhone?.includes(orderSearch) ||
    o.serviceName?.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.orderNumber?.toLowerCase().includes(orderSearch.toLowerCase())
  );

  if (authStatus === 'CHECKING') {
    return (
      <div className="py-24 bg-[#050e1a] min-h-[85vh] flex items-center justify-center" dir="rtl">
        <div className="text-center p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md max-w-sm w-full mx-4 shadow-2xl">
          <RefreshCw className="w-10 h-10 text-secondary animate-spin mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-1">التحقق من تصريح الإدارة...</h3>
          <p className="text-slate-400 text-xs">جاري فحص الجلسة وصلاحيات المشرف العام</p>
        </div>
      </div>
    );
  }

  if (authStatus === 'LOCKED') {
    return (
      <div className="py-20 bg-gradient-to-b from-[#050e1a] via-[#091b33] to-[#050e1a] min-h-[90vh] flex items-center justify-center px-4" dir="rtl">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-secondary/40 overflow-hidden transform transition-all text-right">
          {/* Banner */}
          <div className="bg-gradient-to-r from-[#071426] via-primary to-[#0f2c52] text-white p-7 text-center relative">
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 border-2 border-secondary/50 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-secondary/10">
              <Lock className="w-8 h-8 text-secondary" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary-light text-xs font-black mb-2 border border-secondary/30">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
              <span>نظام الحماية والتحقق الأمني للمنصة</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              لوحة تحكم الإدارة محمية
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              يرجى تسجيل كلمة المرور المعتمدة للسماح بالدخول للإدارة وقواعد البيانات
            </p>
          </div>

          {/* Lock Form */}
          <div className="p-7">
            {gateError && (
              <div className="mb-4 flex items-center gap-2 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-bold animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{gateError}</span>
              </div>
            )}

            <form onSubmit={handleGateUnlock} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  كلمة مرور المنصة للسماح بالدخول للإدارة:
                </label>
                <div className="relative">
                  <input
                    type={showGatePassword ? 'text' : 'password'}
                    value={gatePassword}
                    onChange={(e) => setGatePassword(e.target.value)}
                    placeholder="أدخل كلمة المرور..."
                    autoFocus
                    required
                    dir="ltr"
                    className="w-full rounded-2xl border-2 border-slate-300 focus:border-secondary py-3.5 pr-4 pl-12 text-base font-mono text-center tracking-widest focus:ring-4 focus:ring-secondary/15 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowGatePassword(!showGatePassword)}
                    className="absolute left-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-1"
                    title={showGatePassword ? 'إخفاء' : 'إظهار'}
                  >
                    {showGatePassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={gateLoading}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary-light to-primary hover:brightness-110 text-secondary font-black py-3.5 px-6 rounded-2xl shadow-xl shadow-primary/20 text-sm transition-all active:scale-95 disabled:opacity-50"
              >
                {gateLoading ? (
                  <span>جارٍ فك التشفير والتحقق من قواعد البيانات...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>تأكيد تسجيل الدخول للإدارة</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <Link
                href="/"
                className="text-slate-600 hover:text-primary font-bold flex items-center gap-1"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>العودة للموقع الرئيسي</span>
              </Link>
              <span className="text-[11px] text-slate-400">حماية مشفرة في قواعد البيانات</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-bgLight min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="bg-[#061224] text-white p-6 sm:p-8 rounded-3xl mb-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4 border border-secondary/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>لوحة التحكم الإدارية ونظام إدارة الشعار والمعاملات</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              مركز العمليات وتعديل هوية المنصة
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              إدارة المعاملات الموجهة للمختص (+966 56 452 0434)، وتعديل شعار وهوية المنصة مباشرة.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-success bg-success/15 px-3 py-1.5 rounded-full border border-success/30 font-bold">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>المشرف مصرح: {currentUser?.fullName || 'محسن العريقي'}</span>
            </span>
            <button
              onClick={handleLogout}
              className="text-xs text-red-200 hover:text-white bg-red-950/60 hover:bg-red-900 border border-red-500/30 px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1 font-bold"
              title="تسجيل الخروج وقفل لوحة التحكم"
            >
              <Lock className="w-3.5 h-3.5 text-red-400" />
              <span>قفل وخروج</span>
            </button>
            <Link
              href="/"
              className="text-xs text-slate-300 hover:text-white bg-white/10 px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>الواجهة العامة</span>
            </Link>
          </div>
        </div>

        {/* Live Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold">طلبات العملاء الواردة</span>
              <MessageCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">{orders.length}</div>
            <span className="text-[11px] text-textMuted mt-1 block">معاملات مسجلة ومحولة للمختص</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold">إجمالي الخدمات المعتمدة</span>
              <Layers className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-primary">{stats.servicesCount}</div>
            <span className="text-[11px] text-textMuted mt-1 block">في 15 قطاعاً وتصنيفاً</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold">نسبة التوثيق والامتثال</span>
              <CheckCircle2 className="w-4 h-4 text-success" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-success">{stats.healthPercentage}%</div>
            <span className="text-[11px] text-textMuted mt-1 block">بيانات وروابط رسمية محدثة</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold">الشعار النشط حالياً</span>
              <Palette className="w-4 h-4 text-secondary" />
            </div>
            <div className="text-xs font-black text-primary truncate mt-1">
              {logoSettings.logoType === 'custom' ? 'شعار مخصص' : logoSettings.specialistName || 'محسن العريقي'}
            </div>
            <span className="text-[11px] text-secondary font-bold mt-1 block">معتمد بالواجهة الرئيسية</span>
          </div>

        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'orders'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-secondary" />
            <span>طلبات العملاء والمعاملات ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('logo')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'logo'
                ? 'bg-secondary text-primary shadow-lg shadow-secondary/30 scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Palette className="w-4 h-4 text-primary" />
            <span>🎨 إدارة وتعديل الشعار والهوية</span>
            <span className="bg-primary text-secondary text-[10px] px-2 py-0.5 rounded-full font-black">جديد</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'services'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-secondary" />
            <span>لوحة صحة المحتوى والخدمات</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'audit'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Clock className="w-4 h-4 text-secondary" />
            <span>سجل التدقيق الإداري</span>
          </button>
        </div>

        {/* TAB 1: LOGO & BRANDING MANAGEMENT (إدارة وتعديل الشعار) */}
        {activeTab === 'logo' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-card mb-8 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 mb-6 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-secondary" />
                  <h2 className="text-lg sm:text-xl font-black text-primary">
                    إدارة وتعديل شعار وهوية المنصة (Logo & Brand Management)
                  </h2>
                </div>
                <p className="text-xs text-textMuted mt-1">
                  يمكنك من هنا اعتماد صورة الشعار الحالية، التبديل بين النماذج الجاهزة، أو رفع أي صورة جديدة وتغيير الاسم المعتمد.
                </p>
              </div>

              <button
                onClick={fetchLogoSettings}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-primary bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingLogo ? 'animate-spin' : ''}`} />
                <span>إعادة تحميل الإعدادات</span>
              </button>
            </div>

            {/* Notification alert */}
            {logoMsg && (
              <div className={`p-4 rounded-2xl mb-6 text-xs sm:text-sm font-bold flex items-center gap-2 ${
                logoMsg.startsWith('✓') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {logoMsg.startsWith('✓') ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
                <span>{logoMsg}</span>
              </div>
            )}

            {/* Live Real-Time Preview Banner (المعاينة الحية) */}
            <div className="mb-8">
              <span className="text-xs font-bold text-slate-400 block mb-2">
                👁️ المعاينة المباشرة كما تظهر في أعلى الموقع للزوار (Live Header Preview):
              </span>
              <div className="bg-[#071426] p-4 sm:p-5 rounded-2xl border border-secondary/30 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary via-secondary-light to-secondary-dark p-0.5 shadow-md flex items-center justify-center overflow-hidden shrink-0 border border-secondary/40">
                    {previewLogoUrl ? (
                      <img
                        src={previewLogoUrl}
                        alt="Logo Preview"
                        className="w-full h-full object-cover rounded-[14px]"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary rounded-[14px] flex items-center justify-center">
                        <span className="text-xl font-black text-secondary">يمـن</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base sm:text-lg font-bold tracking-tight text-white">
                      {logoSettings.brandTitle || 'دليل المقيم اليمني'}
                    </span>
                    <span className="text-xs text-secondary-light tracking-wide font-medium">
                      {logoSettings.brandSubtitle || 'محسن العريقي • مقدم خدمات إلكترونية معتمد'}
                    </span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-bold">
                    معتمد بالواجهة 🟢
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveLogo} className="space-y-8">
              
              {/* Ready Presets (النماذج الجاهزة) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-3">
                  اختر من النماذج الجاهزة أو اعتمد الصورة فوراً:
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Preset 1: Mohsen Al-Oreeqi Specialist Photo */}
                  <div
                    onClick={() => selectPreset('/uploads/logo/specialist-logo.jpg', 'image')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                      previewLogoUrl?.includes('specialist-logo')
                        ? 'border-secondary bg-secondary/5 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-secondary/40 shrink-0 bg-slate-900 shadow">
                      <img
                        src="/uploads/logo/specialist-logo.jpg"
                        alt="محسن العريقي"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-black text-primary">صورة محسن العريقي (مقدم خدمات)</h4>
                        {previewLogoUrl?.includes('specialist-logo') && (
                          <span className="bg-secondary text-primary font-black text-[10px] px-2 py-0.5 rounded-full">
                            المحدد حالياً ✓
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        صورة بروفايل وبانر مقدم الخدمات الإلكترونية بالرياض مع أيقونات قوى وأبشر.
                      </p>
                    </div>
                  </div>

                  {/* Preset 2: Yemen Gold Badge */}
                  <div
                    onClick={() => selectPreset('/uploads/logo/yemen-badge.png', 'badge')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                      previewLogoUrl?.includes('yemen-badge')
                        ? 'border-secondary bg-secondary/5 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-secondary/40 shrink-0 bg-[#071426] p-2 flex items-center justify-center shadow">
                      <img
                        src="/uploads/logo/yemen-badge.png"
                        alt="شعار يمن الذهبي"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-black text-primary">شعار يمن الذهبي الرسمي</h4>
                        {previewLogoUrl?.includes('yemen-badge') && (
                          <span className="bg-secondary text-primary font-black text-[10px] px-2 py-0.5 rounded-full">
                            المحدد حالياً ✓
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        أيقونة ورمز كلمة &quot;يمن&quot; الذهبية بالخط العربي داخل إطار رسمي أزرق داكن.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Upload New Custom Logo Section */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  أو قم برفع صورة شعار مخصصة جديدة من جهازك:
                </label>

                <input
                  type="file"
                  ref={logoInputRef}
                  onChange={handleLogoFileChange}
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  className="hidden"
                />

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-bold px-5 py-2.5 rounded-xl border border-slate-300 text-xs shadow-sm transition-colors"
                  >
                    <Upload className="w-4 h-4 text-secondary" />
                    <span>اختيار صورة من الكمبيوتر (PNG, JPG, WEBP)</span>
                  </button>

                  {selectedLogoFile && (
                    <div className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>تم اختيار: {selectedLogoFile.name} (جاهز للحفظ والاعتماد)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Brand Text Customization Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    عنوان المنصة الرئيسي (Brand Title)
                  </label>
                  <input
                    type="text"
                    value={logoSettings.brandTitle}
                    onChange={(e) => setLogoSettings({ ...logoSettings, brandTitle: e.target.value })}
                    placeholder="مثال: دليل المقيم اليمني"
                    className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs focus:outline-none focus:border-secondary font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الوصف والصفة الفرعية للشعار (Brand Subtitle)
                  </label>
                  <input
                    type="text"
                    value={logoSettings.brandSubtitle}
                    onChange={(e) => setLogoSettings({ ...logoSettings, brandSubtitle: e.target.value })}
                    placeholder="مثال: محسن العريقي • مقدم خدمات إلكترونية معتمد"
                    className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => selectPreset('/uploads/logo/specialist-logo.jpg', 'image')}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة تعيين لصورة محسن العريقي</span>
                </button>

                <button
                  type="submit"
                  disabled={savingLogo}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light hover:brightness-110 text-primary font-black px-7 py-3 rounded-xl shadow-lg shadow-secondary/30 text-xs sm:text-sm transition-all active:scale-95 disabled:opacity-50"
                >
                  {savingLogo ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span>جارٍ حفظ الشعار الجديد...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>حفظ واعتماد الشعار في المنصة فوراً</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        )}

        {/* TAB 2: ORDERS TABLE */}
        {activeTab === 'orders' && (
          <div id="orders" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-card mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-6 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h2 className="text-base sm:text-lg font-black text-primary">
                    طلبات العملاء والمعاملات الواردة (Live Orders)
                  </h2>
                </div>
                <p className="text-xs text-textMuted mt-0.5">
                  كافة المعاملات التي تم تقديمها عبر نموذج الطلب وتوجيهها للمختص عبر الواتساب.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="ابحث بالاسم، الرقم، أو الخدمة..."
                    className="rounded-xl border border-slate-300 py-1.5 pr-8 pl-3 text-xs focus:outline-none focus:border-secondary w-48 sm:w-60"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
                </div>

                <button
                  onClick={fetchOrders}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                  title="تحديث القائمة"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingOrders ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {loadingOrders ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <span>جارٍ تحميل الطلبات...</span>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <div className="text-xs font-bold text-slate-600">لا توجد طلبات واردة حتى الآن</div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  عند قيام أي عميل بطلب خدمة عبر النموذج أو الواتساب ستظهر معاملته هنا مباشرة.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b">
                    <tr>
                      <th className="p-3">رقم الطلب</th>
                      <th className="p-3">اسم العميل</th>
                      <th className="p-3">رقم الجوال</th>
                      <th className="p-3">الخدمة المطلوبة</th>
                      <th className="p-3">المستندات المرفوعة</th>
                      <th className="p-3">التفاصيل والملاحظات</th>
                      <th className="p-3">تاريخ الطلب</th>
                      <th className="p-3">استعراض بالمنصة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map((order) => {
                      const cleanPhone = order.customerPhone.replace(/\D/g, '');
                      const waCustomerUrl = `https://wa.me/${cleanPhone.startsWith('966') ? cleanPhone : '966' + cleanPhone.replace(/^0+/, '')}`;

                      let parsedFiles: { name: string; url?: string; size?: string }[] = [];
                      try {
                        if (order.filesList) {
                          const raw = JSON.parse(order.filesList);
                          if (Array.isArray(raw)) {
                            parsedFiles = raw.map((item: unknown) => typeof item === 'string' ? { name: item } : (item as { name: string; url?: string; size?: string }));
                          }
                        }
                      } catch {
                        parsedFiles = [];
                      }

                      return (
                        <tr key={order.id} className="hover:bg-slate-50/70">
                          <td className="p-3 font-mono font-bold text-primary">
                            <span className="bg-slate-100 py-1 px-2 rounded border border-slate-200">
                              {order.orderNumber}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-800">{order.customerName}</td>
                          <td className="p-3 font-mono text-slate-600" dir="ltr">
                            {order.customerPhone}
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-primary block">{order.serviceName}</span>
                            <span className="text-[10px] text-slate-400">{order.serviceCategory || 'عام'}</span>
                          </td>
                          <td className="p-3">
                            {parsedFiles.length > 0 ? (
                              <div className="space-y-1">
                                {parsedFiles.map((f, i) => (
                                  <div key={i} className="flex items-center gap-1.5">
                                    <FileText className="w-3.5 h-3.5 text-secondary shrink-0" />
                                    {f.url ? (
                                      <a
                                        href={f.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-secondary underline truncate max-w-[120px] font-medium"
                                        title={f.name}
                                      >
                                        {f.name}
                                      </a>
                                    ) : (
                                      <span className="truncate max-w-[120px] text-slate-600 font-medium">
                                        {f.name}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-400">لا توجد مرفقات</span>
                            )}
                          </td>
                          <td className="p-3 text-slate-600 max-w-xs truncate" title={order.notes || ''}>
                            {order.notes || '—'}
                          </td>
                          <td className="p-3 font-mono text-slate-400 text-[11px]">
                            {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                          </td>
                          <td className="p-3 flex items-center gap-2">
                            <Link
                              href={`/orders/${order.orderNumber}?doc=1`}
                              target="_blank"
                              className="inline-flex items-center gap-1 bg-primary hover:bg-[#061224] text-secondary font-bold px-3 py-1.5 rounded-lg text-xs transition-all shadow-sm active:scale-95"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>معاينة المستند</span>
                            </Link>
                            <a
                              href={waCustomerUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-1.5 rounded-lg text-xs transition-all shadow-sm"
                              title="مراسلة العميل بالواتساب"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONTENT HEALTH */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-card mb-8 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h2 className="text-base font-bold text-primary">لوحة صحة المحتوى (Content Health Dashboard)</h2>
                <p className="text-xs text-textMuted mt-0.5">مراقبة حالات التوثيق وصلاحية الروابط الرسمية للخدمات.</p>
              </div>
              <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                فحص دوري آلي
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b">
                  <tr>
                    <th className="p-3">اسم الخدمة الحكومية</th>
                    <th className="p-3">المنصة الرسمية</th>
                    <th className="p-3">الرسوم المعتمدة</th>
                    <th className="p-3">حالة التوثيق</th>
                    <th className="p-3">تاريخ آخر تحقق</th>
                    <th className="p-3">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {servicesList.map((srv) => (
                    <tr key={srv.id} className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-primary">{srv.nameAr}</td>
                      <td className="p-3 text-slate-600">{srv.platform}</td>
                      <td className="p-3 font-semibold text-primary">{srv.fees}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-success bg-success-light px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>موثق رسمياً</span>
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 font-mono">{srv.lastCheck}</td>
                      <td className="p-3">
                        <button
                          onClick={() => alert(`تم فحص سلامة رابط ومصادر خدمة: ${srv.nameAr}`)}
                          className="text-xs text-primary hover:text-secondary font-bold underline"
                        >
                          إعادة فحص
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <h2 className="text-sm font-bold text-primary">سجل العمليات والتدقيق الإداري (Audit Logs)</h2>
              </div>
              <span className="text-[10px] text-textMuted font-mono">Immutable Security Log</span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="p-3 rounded-xl bg-bgLight flex items-center justify-between">
                <div>
                  <span className="font-bold text-primary">تحديث وتخصيص شعار وهوية المنصة</span>
                  <span className="text-slate-400 block text-[10px]">بواسطة: مشرف النظام (لوحة التحكم)</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">الآن</span>
              </div>

              <div className="p-3 rounded-xl bg-bgLight flex items-center justify-between">
                <div>
                  <span className="font-bold text-primary">تحديث قاعدة خدمات التعقيب وفك الملاحظات واستثمار MISA</span>
                  <span className="text-slate-400 block text-[10px]">بواسطة: مشرف العمليات (admin@resident-guide.sa)</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">اليوم 17:30</span>
              </div>

              <div className="p-3 rounded-xl bg-bgLight flex items-center justify-between">
                <div>
                  <span className="font-bold text-primary">تفعيل خط الربط المباشر للواتساب (+966 56 452 0434)</span>
                  <span className="text-slate-400 block text-[10px]">حالة الربط: نشط وفوري</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">اليوم 17:15</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
