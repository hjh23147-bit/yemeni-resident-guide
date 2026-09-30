'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRightLeft, 
  CheckSquare, 
  Sparkles, 
  FileCheck2, 
  HelpCircle,
  Building,
  CheckCircle2,
  Printer
} from 'lucide-react';

export default function QuickWizards() {
  const [activeTab, setActiveTab] = useState<'fees' | 'transfer' | 'checklist'>('fees');

  // Fee Calculator State
  const [feeServiceType, setFeeServiceType] = useState('worker');
  const [feeDuration, setFeeDuration] = useState('12');
  const [feeDependents, setFeeDependents] = useState(0);

  // Transfer Wizard State
  const [transferTimes, setTransferTimes] = useState('first');
  const [transferType, setTransferType] = useState('commercial');

  // Checklist Wizard State
  const [checkWorkerType, setCheckWorkerType] = useState('private');
  const [hasDependents, setHasDependents] = useState(false);
  const [isIqamaValid, setIsIqamaValid] = useState(true);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Calculation Logic (Section 18)
  const calculateFees = () => {
    let govFee = 0;
    let laborFee = 0;
    let dependentFee = 0;
    const months = parseInt(feeDuration, 10);
    const fraction = months / 12;

    if (feeServiceType === 'worker') {
      govFee = 650 * fraction;
      // Average work permit fee (800 SAR/month or 9600 SAR/year for non-saudi excess)
      laborFee = 9600 * fraction;
    } else if (feeServiceType === 'domestic') {
      govFee = 600 * fraction;
      laborFee = 0;
    } else if (feeServiceType === 'visit') {
      govFee = 300;
      laborFee = 0;
    }

    // Dependent levy: ~400 SAR per month per dependent
    if (feeDependents > 0) {
      dependentFee = feeDependents * 400 * months;
    }

    return {
      govFee: Math.round(govFee),
      laborFee: Math.round(laborFee),
      dependentFee: Math.round(dependentFee),
      total: Math.round(govFee + laborFee + dependentFee)
    };
  };

  const calculated = calculateFees();

  // Transfer Calculation (Section 19)
  const getTransferCost = () => {
    if (transferType === 'domestic') {
      if (transferTimes === 'first') return { fee: 2000, label: 'المرة الأولى (عمالة منزلية)' };
      if (transferTimes === 'second') return { fee: 4000, label: 'المرة الثانية' };
      return { fee: 6000, label: 'المرة الثالثة فأكثر' };
    }
    if (transferTimes === 'first') return { fee: 2000, label: 'المرة الأولى (قطاع خاص عبر قوى)' };
    if (transferTimes === 'second') return { fee: 4000, label: 'المرة الثانية' };
    return { fee: 6000, label: 'المرة الثالثة فأكثر' };
  };

  const transferResult = getTransferCost();

  // Dynamic Checklist Generator (Section 26)
  const getChecklist = () => {
    const list = [
      { id: '1', title: 'جواز سفر ساري المفعول لمدة لا تقل عن 6 أشهر', mandatory: true },
      { id: '2', title: 'سداد المخالفات المرورية المسجلة على السجل المدني', mandatory: true },
      { id: '3', title: 'تأمين طبي ساري ومعتمد لدى مجلس الضمان الصحي (CCHI)', mandatory: true }
    ];

    if (!isIqamaValid) {
      list.push({ id: '4', title: 'سداد غرامة تأخير تجديد الإقامة (500 ريال للمرة الأولى)', mandatory: true });
    }

    if (hasDependents) {
      list.push({ id: '5', title: 'سداد المقابل المالي للمرافقين والتابعين عن كامل المدة', mandatory: true });
      list.push({ id: '6', title: 'شهادات ميلاد التابعين أو عقد الزواج الموثق للزوجة', mandatory: true });
    }

    if (checkWorkerType === 'private') {
      list.push({ id: '7', title: 'سداد رسوم رخصة العمل عبر نظام سداد بوزارة الموارد البشرية', mandatory: true });
      list.push({ id: '8', title: 'توثيق عقد العمل الإلكتروني بنسبة 100% في منصة قوى', mandatory: true });
    }

    return list;
  };

  const checklistItems = getChecklist();

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="calculators" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary-dark text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>الأدوات والمعالجات الذكية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-tight mb-2">
            الحاسبات التفاعلية وقوائم الفحص الذكية
          </h2>
          <p className="text-sm text-textMuted leading-relaxed">
            احسب الرسوم الرسمية بدقة، واكتشف تكاليف نقل الخدمات، واستخرج قائمة المتطلبات المخصصة لحالتك.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="max-w-4xl mx-auto bg-bgLight rounded-3xl border border-slate-200 shadow-card overflow-hidden">
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-white">
            <button
              onClick={() => setActiveTab('fees')}
              className={`flex-1 py-4 px-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'fees'
                  ? 'border-secondary text-primary bg-secondary/5'
                  : 'border-transparent text-slate-500 hover:text-primary'
              }`}
            >
              <Calculator className="w-4 h-4 text-secondary" />
              <span>حاسبة الرسوم الحكومية</span>
            </button>

            <button
              onClick={() => setActiveTab('transfer')}
              className={`flex-1 py-4 px-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'transfer'
                  ? 'border-secondary text-primary bg-secondary/5'
                  : 'border-transparent text-slate-500 hover:text-primary'
              }`}
            >
              <ArrowRightLeft className="w-4 h-4 text-secondary" />
              <span>معالج نقل الخدمات</span>
            </button>

            <button
              onClick={() => setActiveTab('checklist')}
              className={`flex-1 py-4 px-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'checklist'
                  ? 'border-secondary text-primary bg-secondary/5'
                  : 'border-transparent text-slate-500 hover:text-primary'
              }`}
            >
              <CheckSquare className="w-4 h-4 text-secondary" />
              <span>مولد قوائم الفحص (Checklist)</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            
            {/* TAB 1: Government Fee Calculator (Section 18) */}
            {activeTab === 'fees' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-primary mb-3">حدد بيانات المعاملة:</h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">نوع الخدمة / الإقامة:</label>
                    <select
                      value={feeServiceType}
                      onChange={(e) => setFeeServiceType(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-primary font-medium focus:ring-1 focus:ring-secondary focus:outline-none"
                    >
                      <option value="worker">تجديد إقامة موظف (منشأة قطاع خاص)</option>
                      <option value="domestic">تجديد إقامة عمالة منزلية (سائق / عامل منزلي)</option>
                      <option value="visit">تأشيرة زيارة عائلية (مفردة 90 يوماً)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">مدة التجديد المطلوبة:</label>
                    <select
                      value={feeDuration}
                      onChange={(e) => setFeeDuration(e.target.value)}
                      disabled={feeServiceType === 'visit'}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-primary font-medium focus:ring-1 focus:ring-secondary focus:outline-none disabled:bg-slate-100"
                    >
                      <option value="3">3 أشهر (ربع سنوي)</option>
                      <option value="6">6 أشهر (نصف سنوي)</option>
                      <option value="9">9 أشهر</option>
                      <option value="12">12 شهراً (سنة كاملة)</option>
                    </select>
                  </div>

                  {feeServiceType === 'worker' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        عدد المرافقين / التابعين المسجلين:
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="15"
                        value={feeDependents}
                        onChange={(e) => setFeeDependents(parseInt(e.target.value || '0', 10))}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-primary font-medium focus:ring-1 focus:ring-secondary focus:outline-none"
                      />
                      <span className="text-[10px] text-textMuted mt-1 block">المقابل المالي للمرافقين: 400 ريال شهرياً لكل مرافق.</span>
                    </div>
                  )}
                </div>

                {/* Calculation Output Card */}
                <div className="bg-white p-6 rounded-2xl border border-secondary/30 shadow-soft">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <span className="text-xs font-bold text-slate-500">تفاصيل الرسوم الموثقة</span>
                    <span className="text-[10px] font-bold text-success bg-success-light px-2 py-0.5 rounded-full">
                      ✓ آخر تحقق: 2026-09-15
                    </span>
                  </div>

                  <div className="space-y-3 text-xs mb-6">
                    <div className="flex justify-between text-slate-600">
                      <span>رسوم الجوازات (هوية مقيم):</span>
                      <span className="font-bold text-primary">{calculated.govFee} ريال</span>
                    </div>

                    {calculated.laborFee > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>المقابل المالي لرخصة العمل (تقديري):</span>
                        <span className="font-bold text-primary">{calculated.laborFee} ريال</span>
                      </div>
                    )}

                    {calculated.dependentFee > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>المقابل المالي للتابعين ({feeDependents} مرافق):</span>
                        <span className="font-bold text-primary">{calculated.dependentFee} ريال</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm font-black text-primary">
                      <span>إجمالي الرسوم المقدرة:</span>
                      <span className="text-base text-secondary-dark">{calculated.total} ريال سعودي</span>
                    </div>
                  </div>

                  <div className="bg-bgLight p-3 rounded-xl text-[11px] text-textMuted leading-relaxed border border-slate-150">
                    <span className="font-bold text-primary block mb-0.5">المصدر الموثق:</span>
                    المديرية العامة للجوازات ووزارة الموارد البشرية. السداد يتم رسمياً عبر نظام سداد الحكومي في حسابك البنكي.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Transfer Wizard (Section 19) */}
            {activeTab === 'transfer' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-primary mb-3">خطوات معالج نقل الكفالة والخدمات:</h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">نوع الكفالة والقطاع:</label>
                    <select
                      value={transferType}
                      onChange={(e) => setTransferType(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-primary font-medium focus:ring-1 focus:ring-secondary focus:outline-none"
                    >
                      <option value="commercial">قطاع تجاري / شركات ومؤسسات (عبر منصة قوى)</option>
                      <option value="domestic">عمالة منزلية / أفراد (عبر منصة مساند)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">عدد مرات النقل السابقة للموظف:</label>
                    <select
                      value={transferTimes}
                      onChange={(e) => setTransferTimes(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-primary font-medium focus:ring-1 focus:ring-secondary focus:outline-none"
                    >
                      <option value="first">المرة الأولى للموظف بالمملكة</option>
                      <option value="second">المرة الثانية للموظف</option>
                      <option value="third">المرة الثالثة أو أكثر</option>
                    </select>
                  </div>

                  <div className="p-3 bg-secondary/10 rounded-xl border border-secondary/20 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-primary block mb-1">💡 تنبيه نظامي مهم:</span>
                    وفقاً للائحة منصة قوى، يتطلب النقل موافقة صاحب العمل الحالي، إلا في حالات انتهاء العقد، عدم دفع الأجور لـ 3 أشهر متتالية، أو عدم إصدار رخصة العمل خلال مهلة السماح.
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-secondary/30 shadow-soft">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <span className="text-xs font-bold text-slate-500">نتيجة معالج النقل</span>
                    <span className="text-[10px] font-bold text-success bg-success-light px-2 py-0.5 rounded-full">
                      لوائح وزارة الموارد البشرية
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-[11px] text-textMuted block">رسوم نقل الخدمات المقررة:</span>
                    <span className="text-2xl font-black text-primary">{transferResult.fee} ريال سعودي</span>
                    <span className="text-xs text-secondary-dark font-medium block mt-1">{transferResult.label}</span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      <span>تقديم الطلب حصرياً عبر {transferType === 'commercial' ? 'منصة قوى' : 'منصة مساند'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      <span>موافقة العامل الإلكترونية الصريحة شرط أساسي للنقل</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      <span>السداد يتم من قِبل المنشأة الجديدة عبر سداد بالجوازات</span>
                    </div>
                  </div>

                  <a
                    href="https://www.qiwa.sa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-primary hover:bg-primary-light text-secondary font-bold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    الانتقال لمنصة قوى للبدء بالمعاملة
                  </a>
                </div>
              </div>
            )}

            {/* TAB 3: Custom Checklist Generator (Section 26) */}
            {activeTab === 'checklist' && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 bg-white p-4 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">طبيعة العمل:</label>
                    <select
                      value={checkWorkerType}
                      onChange={(e) => setCheckWorkerType(e.target.value)}
                      className="w-full p-2 border rounded-lg text-xs"
                    >
                      <option value="private">موظف قطاع خاص / شركة</option>
                      <option value="domestic">عمالة منزلية / أفراد</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">هل لديك مرافقون (عائلة)؟</label>
                    <select
                      value={hasDependents ? 'yes' : 'no'}
                      onChange={(e) => setHasDependents(e.target.value === 'yes')}
                      className="w-full p-2 border rounded-lg text-xs"
                    >
                      <option value="no">لا، بدون مرافقين</option>
                      <option value="yes">نعم، لدي مرافقون</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">حالة الإقامة الحالية:</label>
                    <select
                      value={isIqamaValid ? 'valid' : 'expired'}
                      onChange={(e) => setIsIqamaValid(e.target.value === 'valid')}
                      className="w-full p-2 border rounded-lg text-xs"
                    >
                      <option value="valid">سارية المفعول</option>
                      <option value="expired">منتهية الصلاحية</option>
                    </select>
                  </div>
                </div>

                {/* Generated Checklist with Interactive Tick */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-primary">قائمة المستندات المخصصة لحالتك</h4>
                      <p className="text-[11px] text-textMuted">حدد البنود التي جهزتها لمتابعة تقدمك قبل بدء المعاملة.</p>
                    </div>
                    <button
                      onClick={() => window.print()}
                      className="hidden sm:flex items-center gap-1.5 text-xs text-primary hover:text-secondary font-bold border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>طباعة القائمة</span>
                    </button>
                  </div>

                  <div className="space-y-2.5 mb-6">
                    {checklistItems.map((item) => {
                      const isDone = !!checkedItems[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleCheck(item.id)}
                          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            isDone 
                              ? 'bg-success-light/40 border-success/30 text-slate-500 line-through' 
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => {}}
                            className="mt-0.5 rounded text-secondary focus:ring-secondary"
                          />
                          <span className="text-xs font-medium leading-relaxed flex-1">{item.title}</span>
                          {item.mandatory && !isDone && (
                            <span className="text-[10px] bg-red-100 text-danger px-2 py-0.5 rounded font-bold">مطلوب</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-center text-xs text-textMuted">
                    تم إنجاز <span className="font-bold text-primary">{Object.values(checkedItems).filter(Boolean).length}</span> من أصل <span className="font-bold text-primary">{checklistItems.length}</span> متطلب.
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
