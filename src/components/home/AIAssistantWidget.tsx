'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ShieldCheck, 
  ExternalLink, 
  Calendar, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: {
    title: string;
    url: string;
    source: string;
    verified_at: string;
  }[];
  confidence?: number;
}

export default function AIAssistantWidget() {
  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-init',
      sender: 'assistant',
      text: 'أهلاً وسهلاً بك! أنا المساعد الذكي لدليل المقيم اليمني في السعودية. أساعدك في فهم الخدمات والإجراءات الحكومية، الشروط، والرسوم بالاستناد المباشر إلى المصادر واللوائح الرسمية.',
      citations: [
        {
          title: 'دليل الإجراءات الموحد',
          source: 'المديرية العامة للجوازات ووزارة الموارد البشرية',
          url: 'https://www.absher.sa',
          verified_at: '2026-09-20'
        }
      ]
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    'كيف أجدد إقامتي؟',
    'كم رسوم نقل الخدمات في قوى؟',
    'شروط ورسوم الزيارة العائلية؟',
    'كيف أسجل في حماية الأجور بمدد؟'
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });
      const json = await res.json();

      if (json.success && json.data) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: json.data.reply,
          citations: json.data.citations,
          confidence: json.data.confidence,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(json.error?.message || 'تعذر الحصول على رد من المساعد');
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'عذراً، حدث خطأ مؤقت أثناء الاتصال بالمساعد الذكي. يرجى إعادة المحاولة.',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-16 bg-bgLight border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary-dark text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>المساعد الذكي المعتمد على المصادر (AI/RAG)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-tight mb-2">
            اسأل المساعد الذكي لدليل المقيم
          </h2>
          <p className="text-sm text-textMuted max-w-xl mx-auto">
            مساعد مدرب على اللوائح والإجراءات الحكومية الرسمية، مقيد بعدم اختلاق المعلومات وتقديم استشهادات دقيقة بمصادر كل إجابة.
          </p>
        </div>

        {/* Chat Widget Window */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden flex flex-col h-[580px]">
          
          {/* Chat Window Top Bar */}
          <div className="bg-primary text-white p-4 px-6 flex items-center justify-between border-b border-primary-light">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary text-primary flex items-center justify-center font-bold shadow-md">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>المساعد الذكي للمقيم اليمني</span>
                  <span className="w-2 h-2 rounded-full bg-success inline-block animate-pulse" />
                </h3>
                <span className="text-[11px] text-secondary-light">RAG Powered • مصادر حكومية موثقة</span>
              </div>
            </div>

            <button
              onClick={() => setMessages(initialMessages)}
              title="إعادة ضبط المحادثة"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-white/10 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">محادثة جديدة</span>
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs leading-relaxed max-w-[90%] sm:max-w-[85%] ${
                  msg.sender === 'user' ? 'mr-auto flex-row-reverse' : 'ml-auto'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-secondary text-primary font-bold'
                      : 'bg-primary text-secondary'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line font-medium text-xs leading-relaxed">{msg.text}</p>

                  {/* Citations Box (Section 30) */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] space-y-1.5">
                      <span className="font-bold text-primary block flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-secondary" />
                        <span>المصادر الموثقة للاستشهاد:</span>
                      </span>
                      {msg.citations.map((cite, i) => (
                        <div key={i} className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-2 rounded-lg border border-slate-150">
                          <span className="text-slate-700 font-semibold">{cite.title} ({cite.source})</span>
                          <div className="flex items-center gap-2">
                            <span className="text-success text-[10px] flex items-center gap-0.5">
                              <Calendar className="w-2.5 h-2.5" />
                              <span>{cite.verified_at}</span>
                            </span>
                            <a
                              href={cite.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-secondary-dark font-bold hover:underline flex items-center gap-0.5"
                            >
                              <span>الرابط الرسمي</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 text-xs text-slate-400 items-center">
                <Bot className="w-4 h-4 text-secondary animate-pulse" />
                <span>المساعد يسترجع المعلومات الرسمية ويتحقق من المصادر...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[11px] text-slate-400 shrink-0">أسئلة شائعة:</span>
            {samplePrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap bg-bgLight hover:bg-secondary/15 hover:text-primary text-slate-600 px-3 py-1 rounded-full border border-slate-200 transition-all text-xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="اكتب سؤالك هنا (مثلاً: ما هي خطوات تجديد الإقامة المنتهية؟)"
                className="flex-1 py-3 px-4 text-xs sm:text-sm bg-bgLight border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary text-primary font-medium"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="bg-primary hover:bg-primary-light disabled:opacity-50 text-secondary font-bold p-3 rounded-xl transition-all shadow-md shrink-0"
              >
                <Send className="w-5 h-5 rotate-180" />
              </button>
            </form>
            <div className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
              <AlertTriangle className="w-3 h-3 text-secondary" />
              <span>المساعد إرشادي فقط ولا يغني عن مراجعة المنصات الحكومية الرسمية لإتمام المعاملات.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
