'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Phone, 
  User, 
  Clock, 
  MapPin, 
  Trash2, 
  ShieldCheck,
  MessageCircle,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Download,
  Eye
} from 'lucide-react';
import { CATEGORIES_DATA, SERVICES_DATA } from '@/data/servicesData';

interface ServiceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
  preSelectedCategory?: string;
}

interface SavedFileItem {
  name: string;
  url: string;
  size: string;
  type: string;
}

export default function ServiceOrderModal({
  isOpen,
  onClose,
  preSelectedService = '',
  preSelectedCategory = ''
}: ServiceOrderModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [city, setCity] = useState('الرياض');
  const [selectedCategory, setSelectedCategory] = useState(preSelectedCategory);
  const [selectedService, setSelectedService] = useState(preSelectedService);
  const [customServiceName, setCustomServiceName] = useState('');
  const [urgency, setUrgency] = useState<'IMMEDIATE' | 'URGENT' | 'NORMAL'>('IMMEDIATE');
  const [notes, setNotes] = useState('');
  
  // Real binary files for upload & direct sharing
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [canDirectShare, setCanDirectShare] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<{ 
    orderNumber: string; 
    whatsappUrl: string;
    waMessage: string;
    savedFiles: SavedFileItem[];
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Detect Web Share API capability
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'canShare' in navigator) {
      setCanDirectShare(true);
    }
  }, []);

  // Sync props when opening
  useEffect(() => {
    if (preSelectedService) {
      setSelectedService(preSelectedService);
    }
    if (preSelectedCategory) {
      setSelectedCategory(preSelectedCategory);
    }
  }, [preSelectedService, preSelectedCategory]);

  if (!isOpen) return null;

  // Filter services by category if selected
  const availableServices = selectedCategory
    ? SERVICES_DATA.filter(s => s.category_id === selectedCategory)
    : SERVICES_DATA;

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes > 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
    return (bytes / 1024).toFixed(0) + ' KB';
  };

  const finalServiceName = selectedService === 'OTHER' 
    ? (customServiceName || 'خدمة مخصصة')
    : (SERVICES_DATA.find(s => s.slug === selectedService)?.name_ar || selectedService || 'معاملة عامة');

  const copyOrderNumber = () => {
    if (!submittedOrder) return;
    navigator.clipboard.writeText(submittedOrder.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Direct native share of the actual binary files + message
  const handleDirectFileShare = async () => {
    if (!submittedOrder || selectedFiles.length === 0) return;
    try {
      if (navigator.canShare && navigator.canShare({ files: selectedFiles })) {
        await navigator.share({
          files: selectedFiles,
          title: `طلب إنجاز معاملة: ${submittedOrder.orderNumber}`,
          text: submittedOrder.waMessage
        });
      } else {
        // Fallback open WhatsApp URL
        window.open(submittedOrder.whatsappUrl, '_blank');
      }
    } catch (err) {
      console.log('User dismissed share or fallback');
      window.open(submittedOrder.whatsappUrl, '_blank');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('يرجى إدخال اسم العميل الكريم');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 8) {
      setErrorMsg('يرجى إدخال رقم جوال أو واتساب صحيح');
      return;
    }
    if (!finalServiceName) {
      setErrorMsg('يرجى اختيار أو تحديد الخدمة المطلوبة');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Prepare FormData to upload actual files to the server and database
      const formData = new FormData();
      formData.append('customerName', customerName.trim());
      formData.append('customerPhone', customerPhone.trim());
      formData.append('serviceName', finalServiceName.trim());
      formData.append('serviceCategory', selectedCategory || 'عام');
      formData.append('notes', `[المدينة: ${city}] [الأولوية: ${urgency === 'IMMEDIATE' ? 'فوري' : urgency === 'URGENT' ? 'عاجل' : 'عادي'}] ${notes}`);

      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      const res = await fetch('/api/orders', {
        method: 'POST',
        body: formData, // Automatic multipart/form-data with binary files
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || 'حدث خطأ أثناء حفظ الطلب');
      }

      const orderNumber = data.data.orderNumber;
      const savedFiles: SavedFileItem[] = data.data.savedFiles || [];

      // 2. Resolve the Real Live Public Base URL (accessible from any phone/network)
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const isLocalhost = typeof window !== 'undefined' && (
        window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1' || 
        window.location.hostname.endsWith('.local')
      );
      
      const liveBaseUrl = (!isLocalhost && origin) 
        ? origin 
        : (data.data?.publicBaseUrl || 'https://muqeem-services.loca.lt');

      const urgencyLabel = urgency === 'IMMEDIATE' 
        ? 'فوري (خلال ساعات)' 
        : urgency === 'URGENT' 
        ? 'عاجل (نفس اليوم)' 
        : 'عادي (إجراء منتظم)';

      // 3. Format ONE single real live link dedicated to the document only
      let documentsSectionText = '';
      if (savedFiles.length === 0) {
        documentsSectionText = 
`========================================
📁 [المستندات]:
لا توجد مستندات مرفقة (سيتم إرسالها بالمحادثة مباشرة)
========================================`;
      } else if (savedFiles.length === 1) {
        const file = savedFiles[0];
        const docLiveUrl = `${liveBaseUrl}/orders/${orderNumber}?doc=1`;
        documentsSectionText = 
`========================================
📂 [المستند المرفق بالمعاملة]:
📄 ${file.name} (${file.size || 'مستند'})

🔗 رابط معاينة المستند مباشرة بالمنصة:
${docLiveUrl}
========================================`;
      } else {
        const filesListText = savedFiles.map((file, i) => {
          const docLiveUrl = `${liveBaseUrl}/orders/${orderNumber}?doc=${i + 1}`;
          return `${i + 1}. [${file.name}] (${file.size || 'مستند'})\n🔗 رابط المعاينة بالمنصة: ${docLiveUrl}`;
        }).join('\n\n');

        documentsSectionText = 
`========================================
📂 [المستندات المرفقة بالمعاملة]:
${filesListText}
========================================`;
      }

      // 4. Clean, authoritative WhatsApp Message with ONE live link for the document
      const waMessage = 
`السلام عليكم ورحمة الله وبركاته،
طلب إنجاز معاملة رسمية عبر منصة دليل المقيم:

[رقم المعاملة]: ${orderNumber}
[اسم العميل]: ${customerName.trim()}
[رقم الجوال]: ${customerPhone.trim()}
[المدينة]: ${city}
[الخدمة المطلوبة]: ${finalServiceName}
[درجة الأولوية]: ${urgencyLabel}

[ملاحظات وتفاصيل المعاملة]:
${notes.trim() || 'لا توجد ملاحظات إضافية'}

${documentsSectionText}

✅ تم حفظ وتوثيق كامل البيانات والمستند في قاعدة بيانات المنصة بنجاح.
يمكن للمختص الضغط مباشرة على الرابط أعلاه لمعاينة المستند فوراً بالمنصة.
يرجى تأكيد الاستلام والبدء الفوري بالإنجاز. شكراً لكم.`;

      const targetNumber = '966564520434';
      const encodedMessage = encodeURIComponent(waMessage);
      const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodedMessage}`;

      // Try copying the first image to clipboard if available for instant Ctrl+V in WhatsApp Web
      if (selectedFiles.length > 0 && selectedFiles[0].type.startsWith('image/')) {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ [selectedFiles[0].type]: selectedFiles[0] })
          ]);
        } catch (clipErr) {
          // Clipboard write optional
        }
      }

      setSubmittedOrder({
        orderNumber,
        whatsappUrl,
        waMessage,
        savedFiles
      });

      // If mobile supports direct sharing of files to WhatsApp, trigger it; otherwise open WhatsApp chat
      if (typeof navigator !== 'undefined' && navigator.canShare && selectedFiles.length > 0) {
        try {
          if (navigator.canShare({ files: selectedFiles })) {
            await navigator.share({
              files: selectedFiles,
              title: `طلب إنجاز معاملة: ${orderNumber}`,
              text: waMessage
            });
            return;
          }
        } catch (shareErr) {
          // User canceled or fallback
        }
      }

      // Default redirect to WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'تعذر إرسال الطلب، يرجى المحاولة ثانية');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmittedOrder(null);
    setCustomerName('');
    setCustomerPhone('');
    setNotes('');
    setSelectedFiles([]);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-secondary/30 overflow-hidden transform transition-all text-right"
        dir="rtl"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#071426] via-primary to-[#0f2c52] text-white p-6 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute left-5 top-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/40 text-secondary-light text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span>نظام الإنجاز السريع ورفع المستندات لقواعد البيانات</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1">
            طلب إنجاز معاملة وخدمة فورية
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            أدخل بياناتك وأرفق المستندات، وسيتم حفظها مباشرة بالنظام وتجهيزها للإرسال الفوري للمختص عبر الواتساب.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submittedOrder ? (
            /* Success State */
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">رقم المعاملة المعتمد بالنظام</span>
                <div className="flex items-center justify-center gap-2">
                  <div className="text-2xl sm:text-3xl font-black text-primary font-mono tracking-wider bg-slate-100 py-2 px-4 rounded-xl border border-slate-300">
                    {submittedOrder.orderNumber}
                  </div>
                  <button
                    onClick={copyOrderNumber}
                    className="p-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
                    title="نسخ رقم الطلب"
                  >
                    {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Uploaded Files Proof */}
              {submittedOrder.savedFiles.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-right">
                  <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>المستندات الجاهزة للإرسال مع المعاملة ({submittedOrder.savedFiles.length}):</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                      محفوظة بالسيرفر
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {submittedOrder.savedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-secondary shrink-0" />
                          <span className="font-semibold text-slate-800 truncate">{file.name}</span>
                          <span className="text-[10px] text-slate-400">({file.size})</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover:underline flex items-center gap-1 font-bold text-[11px]"
                          >
                            <span>معاينة</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a
                            href={file.url}
                            download={file.name}
                            className="p-1 text-slate-400 hover:text-primary rounded transition-colors"
                            title="تحميل الملف"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Smart Tip for WhatsApp attachment */}
              <div className="max-w-md mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 leading-relaxed text-right">
                💡 <strong>طريقة إرسال الملف المباشر للمختص:</strong>
                <p className="mt-1 text-slate-700">
                  تم تجهيز نص المعاملة بالكامل للواتساب، كما تم نسخ المستند إلى الحافظة تلقائياً. عند فتح محادثة الواتساب، اضغط على <strong>لصق (Ctrl+V)</strong> أو علامة المرفق لإرسال الملف مباشرة للمختص على الرقم (+966 56 452 0434).
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                {selectedFiles.length > 0 && (
                  <button
                    type="button"
                    onClick={handleDirectFileShare}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light text-primary font-black px-6 py-3.5 rounded-xl shadow-lg shadow-secondary/30 transition-all active:scale-95 text-xs sm:text-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>مشاركة الملفات مباشرة في الواتساب</span>
                  </button>
                )}

                <a
                  href={submittedOrder.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all active:scale-95 text-xs sm:text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>فتح محادثة الواتساب المجهزة</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href={`/orders/${submittedOrder.orderNumber}?doc=1`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#071426] hover:bg-primary text-secondary font-bold px-6 py-3.5 rounded-xl border border-secondary/40 shadow-md text-xs sm:text-sm transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>معاينة المستند بالمنصة فوراً</span>
                </a>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs sm:text-sm transition-all"
                >
                  إغلاق
                </button>
              </div>
            </div>
          ) : (
            /* Order Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs sm:text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Service Selection Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    القطاع / التصنيف
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setSelectedService('');
                    }}
                    className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm focus:border-secondary focus:ring-secondary/20 focus:outline-none bg-slate-50 font-medium"
                  >
                    <option value="">جميع القطاعات والخدمات</option>
                    {CATEGORIES_DATA.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_ar}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الخدمة المطلوبة <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm focus:border-secondary focus:ring-secondary/20 focus:outline-none bg-slate-50 font-medium"
                    required
                  >
                    <option value="">-- اختر الخدمة أو المعاملة --</option>
                    {availableServices.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name_ar}
                      </option>
                    ))}
                    <option value="OTHER">خدمة أخرى غير موجودة بالقائمة...</option>
                  </select>
                </div>
              </div>

              {selectedService === 'OTHER' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    حدد اسم الخدمة المطلوبة بدقة:
                  </label>
                  <input
                    type="text"
                    value={customServiceName}
                    onChange={(e) => setCustomServiceName(e.target.value)}
                    placeholder="مثال: فك ملاحظة محددة، تعديل مهنة، تأسيس شركة..."
                    className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm focus:border-secondary focus:ring-secondary/20 focus:outline-none"
                    required
                  />
                </div>
              )}

              {/* Customer Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الاسم الكامل <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="اسم صاحب الطلب"
                      className="w-full rounded-xl border border-slate-300 py-2.5 pr-9 pl-3 text-sm focus:border-secondary focus:ring-secondary/20 focus:outline-none"
                      required
                    />
                    <User className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم الجوال / الواتساب <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="05XXXXXXXX"
                      dir="ltr"
                      className="w-full rounded-xl border border-slate-300 py-2.5 pr-3 pl-9 text-sm focus:border-secondary focus:ring-secondary/20 focus:outline-none text-right"
                      required
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    المدينة
                  </label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 py-2.5 pr-8 pl-3 text-sm focus:border-secondary focus:ring-secondary/20 focus:outline-none bg-white font-medium"
                    >
                      <option value="الرياض">الرياض</option>
                      <option value="جدة">جدة</option>
                      <option value="مكة المكرمة">مكة المكرمة</option>
                      <option value="المدينة المنورة">المدينة المنورة</option>
                      <option value="الدمام / الخبر">الدمام / الخبر</option>
                      <option value="خميس مشيط / أبها">خميس مشيط / أبها</option>
                      <option value="جازان">جازان</option>
                      <option value="تبوك">تبوك</option>
                      <option value="أخرى">مدينة أخرى</option>
                    </select>
                    <MapPin className="w-4 h-4 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Urgency Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  درجة الأولوية والسرعة المطلوبة:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgency('IMMEDIATE')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      urgency === 'IMMEDIATE'
                        ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-[1.02]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>⚡ إنجاز فوري (ساعات)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('URGENT')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      urgency === 'URGENT'
                        ? 'bg-primary text-white border-primary-dark shadow-md scale-[1.02]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>عاجل (نفس اليوم)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('NORMAL')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      urgency === 'NORMAL'
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-[1.02]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>عادي (إجراء منتظم)</span>
                  </button>
                </div>
              </div>

              {/* Document Attachments Dropzone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  تحميل المستندات والوثائق (صور، PDF، جوازات، إقامات، كروت صحية):
                </label>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-secondary/50 hover:border-secondary bg-secondary/5 hover:bg-secondary/10 rounded-2xl p-4 text-center cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mx-auto mb-2">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    اضغط هنا لاختيار المستندات أو الصور
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    يتم تخزين الملفات فوراً في السيرفر وتجهيزها للإرسال المباشر كملفات في محادثة الواتساب
                  </div>
                </div>

                {/* Uploaded Files Chips */}
                {selectedFiles.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    <span className="text-[11px] text-slate-500 font-semibold block">المستندات الجاهزة للرفع ({selectedFiles.length}):</span>
                    <div className="max-h-28 overflow-y-auto space-y-1 pr-1">
                      {selectedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <FileText className="w-3.5 h-3.5 text-secondary shrink-0" />
                            <span className="truncate max-w-[240px] font-medium text-slate-700">{file.name}</span>
                            <span className="text-[10px] text-slate-400">({formatFileSize(file.size)})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Notes & Details */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  تفاصيل إضافية أو أرقام المعاملات السابقة (اختياري)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مثال: رقم المنشأة، نوع المخالفة، أو أي استفسار خاص ترغب بنقله للمختص..."
                  className="w-full rounded-xl border border-slate-300 py-2 px-3 text-sm focus:border-secondary focus:ring-secondary/20 focus:outline-none"
                />
              </div>

              {/* WhatsApp routing guarantee banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    الربط الفوري مع المختص على الرقم: <strong className="text-slate-900 font-mono" dir="ltr">+966 56 452 0434</strong>
                  </span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  متصل الآن 🟢
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light hover:brightness-110 text-primary font-black px-7 py-3 rounded-xl shadow-lg shadow-secondary/30 text-sm transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span>جارٍ رفع المستندات والتوثيق...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>تأكيد الطلب والإرسال عبر الواتساب</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
