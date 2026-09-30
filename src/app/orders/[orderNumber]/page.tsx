'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  MessageCircle, 
  Download, 
  ExternalLink, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  X, 
  Share2, 
  Printer,
  Copy,
  Check,
  AlertCircle,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Link as LinkIcon
} from 'lucide-react';

interface OrderFile {
  name: string;
  url: string;
  size: string;
  type: string;
}

interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  serviceCategory?: string;
  notes?: string;
  status: string;
  filesCount: number;
  files: OrderFile[];
  createdAt: string;
}

export default function OrderViewPage() {
  const params = useParams();
  const router = useRouter();
  const orderNumber = params.orderNumber as string;

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal Preview States
  const [previewFile, setPreviewFile] = useState<OrderFile | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  // Copy Feedback States
  const [copiedOrder, setCopiedOrder] = useState(false);
  const [copiedDocIdx, setCopiedDocIdx] = useState<number | null>(null);
  const [copiedModalDoc, setCopiedModalDoc] = useState(false);

  useEffect(() => {
    if (!orderNumber) return;

    fetch(`/api/orders/${orderNumber}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setOrder(json.data);

          // Deep linking: If specialist arrived with ?doc=X, open that document automatically!
          if (typeof window !== 'undefined') {
            const sp = new URLSearchParams(window.location.search);
            const docParam = sp.get('doc');
            const files: OrderFile[] = json.data.files || [];
            if (docParam && files.length > 0) {
              const docNum = parseInt(docParam, 10);
              if (!isNaN(docNum) && docNum >= 1 && docNum <= files.length) {
                setPreviewFile(files[docNum - 1]);
                setPreviewIndex(docNum - 1);
              } else {
                const foundIdx = files.findIndex((f) => 
                  f.name.toLowerCase().includes(docParam.toLowerCase())
                );
                if (foundIdx !== -1) {
                  setPreviewFile(files[foundIdx]);
                  setPreviewIndex(foundIdx);
                }
              }
            } else if (files.length === 1) {
              setPreviewFile(files[0]);
              setPreviewIndex(0);
            }
          }
        } else {
          setError(json.error?.message || 'تعذر العثور على المعاملة المطلوبة');
        }
      })
      .catch((err) => {
        setError('حدث خطأ أثناء تحميل بيانات المعاملة');
      })
      .finally(() => setLoading(false));
  }, [orderNumber]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!previewFile) return;
      if (e.key === 'Escape') {
        closePreview();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        handlePrevDoc();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        handleNextDoc();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewFile, previewIndex, order]);

  const openPreview = (file: OrderFile, idx: number) => {
    setPreviewFile(file);
    setPreviewIndex(idx);
    setZoom(1);
    setRotation(0);
    // Update URL hash/query without page reload
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `?doc=${idx + 1}`);
    }
  };

  const closePreview = () => {
    setPreviewFile(null);
    setZoom(1);
    setRotation(0);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleNextDoc = () => {
    if (!order || !order.files || order.files.length === 0) return;
    const nextIdx = (previewIndex + 1) % order.files.length;
    setPreviewIndex(nextIdx);
    setPreviewFile(order.files[nextIdx]);
    setZoom(1);
    setRotation(0);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `?doc=${nextIdx + 1}`);
    }
  };

  const handlePrevDoc = () => {
    if (!order || !order.files || order.files.length === 0) return;
    const prevIdx = (previewIndex - 1 + order.files.length) % order.files.length;
    setPreviewIndex(prevIdx);
    setPreviewFile(order.files[prevIdx]);
    setZoom(1);
    setRotation(0);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `?doc=${prevIdx + 1}`);
    }
  };

  const getLiveBase = () => {
    if (typeof window === 'undefined') return '';
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocal) {
      return process.env.NEXT_PUBLIC_APP_URL || 'https://muqeem-services.loca.lt';
    }
    return window.location.origin;
  };

  const copyOrderLink = () => {
    if (typeof window !== 'undefined' && order) {
      const url = `${getLiveBase()}/orders/${order.orderNumber}`;
      navigator.clipboard.writeText(url);
      setCopiedOrder(true);
      setTimeout(() => setCopiedOrder(false), 2000);
    }
  };

  const copyDocLink = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof window !== 'undefined' && order) {
      const url = `${getLiveBase()}/orders/${order.orderNumber}?doc=${idx + 1}`;
      navigator.clipboard.writeText(url);
      setCopiedDocIdx(idx);
      setTimeout(() => setCopiedDocIdx(null), 2500);
    }
  };

  const copyCurrentModalDocLink = () => {
    if (typeof window !== 'undefined' && order) {
      const url = `${getLiveBase()}/orders/${order.orderNumber}?doc=${previewIndex + 1}`;
      navigator.clipboard.writeText(url);
      setCopiedModalDoc(true);
      setTimeout(() => setCopiedModalDoc(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 text-slate-500">
        <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-bold">جارٍ تحميل وتدقيق ملف المعاملة والمستندات...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 bg-white rounded-3xl border border-red-200 text-center shadow-card">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-2">تعذر فتح المعاملة</h2>
        <p className="text-sm text-slate-500 mb-6">{error || 'لم يتم العثور على المعاملة المطلوبة'}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-secondary px-6 py-3 rounded-xl font-bold text-sm"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </Link>
      </div>
    );
  }

  const cleanPhone = order.customerPhone.replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanPhone.startsWith('966') ? cleanPhone : '966' + cleanPhone.replace(/^0+/, '')}`;

  return (
    <div className="min-h-screen py-10 bg-bgLight">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={copyOrderLink}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-primary bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all active:scale-95"
            >
              {copiedOrder ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-secondary" />}
              <span>{copiedOrder ? 'تم نسخ رابط المعاملة' : 'نسخ رابط المعاملة'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-primary bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>طباعة الملف</span>
            </button>
          </div>
        </div>

        {/* Top Header Card */}
        <div className="bg-[#071426] text-white p-6 sm:p-8 rounded-3xl shadow-card border border-secondary/30 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/40 text-secondary-light text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
                <span>بوابة استعراض ملف المعاملة والمستندات الرسمية</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  معاملة رقم:
                </h1>
                <span className="font-mono text-xl sm:text-2xl font-black text-secondary bg-white/10 px-3.5 py-1 rounded-xl border border-white/15">
                  {order.orderNumber}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full">
                  جاهزة للمتابعة والإنجاز 🟢
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300">
                تم رفع وتوثيق كافة المرفقات بنجاح في قاعدة بيانات المنصة ومتاحة للاستعراض المباشر والتدقيق الفوري للمختص.
              </p>
            </div>

            {/* Direct WhatsApp & Contact Callouts for Specialist */}
            <div className="shrink-0 flex flex-col gap-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/30 text-xs sm:text-sm transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>مراسلة العميل واتساب مباشرة</span>
              </a>

              <a
                href={`tel:${order.customerPhone}`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-slate-200 font-semibold px-6 py-2.5 rounded-xl border border-white/15 text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-secondary" />
                <span>اتصال هاتفي بالعميل ({order.customerPhone})</span>
              </a>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Right Column: Customer & Service Metadata */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft">
              <h3 className="text-base font-black text-primary mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                <User className="w-4 h-4 text-secondary" />
                <span>بيانات العميل والمعاملة</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">اسم العميل:</span>
                  <span className="text-sm font-bold text-slate-800">{order.customerName}</span>
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">رقم الهاتف / الواتساب:</span>
                  <span className="text-sm font-bold text-primary font-mono" dir="ltr">
                    {order.customerPhone}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">الخدمة المطلوبة:</span>
                  <span className="text-sm font-black text-secondary-dark">{order.serviceName}</span>
                  {order.serviceCategory && (
                    <span className="block text-[11px] text-slate-500 mt-0.5">
                      التصنيف: {order.serviceCategory}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">تاريخ ووقت تقديم المعاملة:</span>
                  <span className="font-mono text-slate-700 font-semibold">
                    {new Date(order.createdAt).toLocaleString('ar-SA')}
                  </span>
                </div>

                {order.notes && (
                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-slate-400 block mb-1 font-bold">الملاحظات والتفاصيل:</span>
                    <p className="p-3 bg-slate-50 rounded-xl text-slate-700 leading-relaxed font-medium">
                      {order.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Official Security Guarantee */}
            <div className="bg-slate-900 text-white p-5 rounded-3xl border border-secondary/20 shadow-soft text-xs space-y-2">
              <div className="flex items-center gap-2 text-secondary font-bold">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <span>توثيق رسمي موحد</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                هذه المعاملة محمية برمز تشفير فريد مسجل في نظام دليل المقيم اليمني لضمان سرية المستندات ومتابعة الإنجاز المباشر.
              </p>
            </div>
          </div>

          {/* Left Column: Attached Documents Gallery (المستندات المرفوعة) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
              
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-lg font-black text-primary flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-secondary" />
                    <span>المستندات والوثائق المرفوعة ({order.files?.length || order.filesCount || 0})</span>
                  </h2>
                  <p className="text-xs text-textMuted mt-0.5">
                    انقر على أي مستند لاستعراضه المباشر بالحجم الكامل أو نسخ رابطه الخاص للمختص.
                  </p>
                </div>

                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  مخزنة بقواعد البيانات
                </span>
              </div>

              {(!order.files || order.files.length === 0) ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <div className="text-xs font-bold text-slate-600">لا توجد ملفات مرفقة بهذه المعاملة</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    العميل سيقوم بإرسال الصور والوثائق عبر محادثة الواتساب مباشرة.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.files.map((file, idx) => {
                    const isImage = file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i) || file.type?.startsWith('image/');
                    const isPdf = file.name.match(/\.pdf$/i) || file.type?.includes('pdf');
                    const isCopied = copiedDocIdx === idx;

                    return (
                      <div
                        key={idx}
                        className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-secondary rounded-2xl p-4 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                      >
                        {/* Preview Area */}
                        <div>
                          <div 
                            onClick={() => file.url && openPreview(file, idx)}
                            className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-200/70 border border-slate-200 mb-3 flex items-center justify-center cursor-pointer"
                          >
                            {isImage && file.url ? (
                              <img
                                src={file.url}
                                alt={file.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : isPdf ? (
                              <div className="text-center p-4">
                                <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-2 font-black text-xs shadow-sm">
                                  PDF
                                </div>
                                <span className="text-[11px] font-bold text-slate-700">مستند رسمي PDF</span>
                              </div>
                            ) : (
                              <div className="text-center p-4">
                                <FileText className="w-10 h-10 text-slate-400 mx-auto mb-1" />
                                <span className="text-[11px] text-slate-600 font-bold">ملف مرفق</span>
                              </div>
                            )}

                            {/* Badge */}
                            <div className="absolute top-2 right-2 bg-slate-950/70 backdrop-blur-sm text-white px-2 py-0.5 rounded-lg text-[10px] font-mono">
                              #{idx + 1}
                            </div>

                            {/* Hover overlay with preview icon */}
                            {file.url && (
                              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 font-bold text-xs">
                                <Eye className="w-5 h-5 text-secondary" />
                                <span>استعراض بالمنصة</span>
                              </div>
                            )}
                          </div>

                          <h4 className="text-xs font-bold text-slate-800 truncate mb-1" title={file.name}>
                            {file.name}
                          </h4>
                          {file.size && (
                            <span className="text-[10px] text-slate-400 font-mono block mb-3">
                              الحجم: {file.size}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="pt-3 border-t border-slate-200/70 space-y-2">
                          {file.url ? (
                            <>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => openPreview(file, idx)}
                                  className="flex-1 py-1.5 px-3 rounded-lg bg-secondary/15 hover:bg-secondary text-primary font-black text-xs transition-colors flex items-center justify-center gap-1.5"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>استعراض بالمنصة</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={(e) => copyDocLink(idx, e)}
                                  className={`p-2 rounded-lg border text-xs transition-colors flex items-center gap-1 ${
                                    isCopied
                                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                      : 'bg-white border-slate-200 text-slate-600 hover:text-primary hover:border-secondary'
                                  }`}
                                  title="نسخ الرابط المباشر لهذا المستند"
                                >
                                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
                                </button>

                                <a
                                  href={file.url}
                                  download={file.name}
                                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                  title="تحميل المستند مباشرة"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </a>

                                <a
                                  href={file.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                  title="فتح في نافذة مستقلة"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>

                              {isCopied && (
                                <p className="text-[10px] text-emerald-600 font-bold text-center animate-fadeIn">
                                  ✓ تم نسخ الرابط المباشر للمستند #{idx + 1}
                                </p>
                              )}
                            </>
                          ) : (
                            <span className="text-[11px] text-slate-400">سيتم الإرسال بالواتساب</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Full-Screen Interactive Document Viewer Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
          <div className="relative w-full max-w-5xl h-[92vh] bg-slate-900 rounded-3xl overflow-hidden flex flex-col border border-white/20 shadow-2xl">
            
            {/* Modal Header Toolbar */}
            <div className="p-3 sm:p-4 bg-slate-950 text-white flex items-center justify-between border-b border-white/10 gap-3">
              
              {/* Document Info & Counter */}
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-xs sm:text-sm font-bold truncate block">{previewFile.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    مستند ({previewIndex + 1} من {order.files.length}) • {previewFile.size || 'مستند رسمي'}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Image Zoom / Rotate Controls */}
                {(previewFile.name.match(/\.(jpg|jpeg|png|webp|gif)$/i) || previewFile.type?.startsWith('image/')) && (
                  <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-xl p-1 border border-white/10">
                    <button
                      onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
                      className="p-1.5 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                      title="تكبير (+)"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
                      className="p-1.5 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                      title="تصغير (-)"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setRotation((r) => (r + 90) % 360)}
                      className="p-1.5 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                      title="تدوير 90 درجة"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Direct Link Copy Button */}
                <button
                  onClick={copyCurrentModalDocLink}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                  title="نسخ الرابط المباشر لهذا المستند"
                >
                  {copiedModalDoc ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <LinkIcon className="w-3.5 h-3.5 text-secondary" />}
                  <span className="hidden md:inline">{copiedModalDoc ? 'تم النسخ!' : 'نسخ رابط المستند'}</span>
                </button>

                {/* Download Button */}
                <a
                  href={previewFile.url}
                  download={previewFile.name}
                  className="p-2 rounded-xl bg-secondary hover:brightness-110 text-primary font-bold transition-all"
                  title="تحميل المستند"
                >
                  <Download className="w-4 h-4" />
                </a>

                {/* Close Button */}
                <button
                  onClick={closePreview}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="إغلاق (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Modal Body / Viewer Area */}
            <div className="flex-1 relative overflow-auto flex items-center justify-center p-4 bg-slate-950/70 select-none">
              
              {/* Previous Button */}
              {order.files.length > 1 && (
                <button
                  onClick={handlePrevDoc}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-secondary text-white hover:text-primary transition-all flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-sm"
                  title="المستند السابق"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {order.files.length > 1 && (
                <button
                  onClick={handleNextDoc}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-secondary text-white hover:text-primary transition-all flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-sm"
                  title="المستند التالي"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Document Rendering */}
              {previewFile.name.match(/\.(jpg|jpeg|png|webp|gif)$/i) || previewFile.type?.startsWith('image/') ? (
                <div 
                  className="transition-transform duration-200 max-w-full max-h-full flex items-center justify-center"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  }}
                >
                  <img
                    src={previewFile.url}
                    alt={previewFile.name}
                    className="max-w-[85vw] max-h-[72vh] object-contain rounded-xl shadow-2xl"
                  />
                </div>
              ) : previewFile.name.match(/\.pdf$/i) || previewFile.type?.includes('pdf') ? (
                <iframe
                  src={previewFile.url}
                  title={previewFile.name}
                  className="w-full h-full rounded-xl border-0 bg-white"
                />
              ) : (
                <div className="text-center text-white py-12">
                  <FileText className="w-16 h-16 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm font-bold mb-4">{previewFile.name}</p>
                  <a
                    href={previewFile.url}
                    download={previewFile.name}
                    className="inline-flex items-center gap-2 bg-secondary text-primary font-black px-6 py-2.5 rounded-xl text-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل المستند الآن</span>
                  </a>
                </div>
              )}
            </div>

            {/* Modal Bottom Thumbnail Strip for Multi-Documents */}
            {order.files.length > 1 && (
              <div className="p-2 sm:p-3 bg-slate-950/90 border-t border-white/10 flex items-center justify-center gap-2 overflow-x-auto">
                {order.files.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => openPreview(f, i)}
                    className={`h-12 px-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                      i === previewIndex
                        ? 'bg-secondary text-primary border-secondary shadow-lg shadow-secondary/20'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span className="font-mono">#{i + 1}</span>
                    <span className="truncate max-w-[120px]">{f.name}</span>
                  </button>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
