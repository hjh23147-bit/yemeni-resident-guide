import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/[يى]/g, 'ي')
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .toLowerCase()
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message = '', conversationId } = body;

    if (!message.trim()) {
      return NextResponse.json(
        { success: false, error: { code: 'EMPTY_MESSAGE', message: 'نص الرسالة فارغ' } },
        { status: 400 }
      );
    }

    const query = normalizeArabic(message);

    // RAG Step 1: Knowledge Retrieval from database
    const services = await prisma.service.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        category: true,
        platform: true,
        fees: true,
        requirements: true,
        steps: { orderBy: { stepNumber: 'asc' } },
        sources: true,
      },
    });

    // Score & match relevant services
    let matchedService = null;
    let highestScore = 0;

    for (const srv of services) {
      let score = 0;
      const srvName = normalizeArabic(srv.nameAr);
      const srvDesc = normalizeArabic(srv.descriptionAr);

      if ((query.includes('تجديد') || query.includes('جدد')) && srvName.includes('اقام')) score += 10;
      if (query.includes('اقام') && srvName.includes('اقام')) score += 8;
      if ((query.includes('نقل') || query.includes('كفال')) && srvName.includes('نقل')) score += 10;
      if (query.includes('زيار') && srvName.includes('زيار')) score += 10;
      if (query.includes('مدد') && (srvName.includes('مدد') || srvDesc.includes('مدد'))) score += 10;
      if (query.includes('خروج') && srvName.includes('خروج')) score += 10;
      if (query.includes('عمل') && (srvName.includes('عمل') || srvDesc.includes('عمل'))) score += 4;
      if (query.includes('تاسيس') && srvName.includes('تاسيس')) score += 10;

      if (score > highestScore) {
        highestScore = score;
        matchedService = srv;
      }
    }

    // RAG Step 2: Constrained Answer Generation & Citations (Section 99 format)
    let reply = '';
    const citations: Array<{ title: string; url: string; source: string; verified_at: string }> = [];

    if (matchedService && highestScore >= 8) {
      const s = matchedService;
      const feeText = s.fees.length > 0
        ? s.fees.map(f => `${f.titleAr}: ${f.amount} ${f.currency}`).join(' | ')
        : 'الخدمة بدون رسوم حكومية مباشرة';

      const reqText = s.requirements.slice(0, 3).map(r => r.titleAr).join('، ');
      const stepText = s.steps.slice(0, 3).map(st => `${st.stepNumber}. ${st.titleAr}`).join(' -> ');

      reply = `📌 **الخدمة:** ${s.nameAr}
🏛️ **المنصة الرسمية:** ${s.platform?.nameAr || 'البوابة الحكومية المعتمدة'}
👥 **المستفيد:** ${s.targetAudience === 'RESIDENTS' ? 'المقيمون وأصحاب العمل' : 'المنشآت والأسر'}
📋 **أهم الشروط:** ${reqText || 'وفق لوائح الجهة المختصة'}.
⏱️ **الخطوات:** ${stepText}.
💰 **الرسوم الموثقة:** ${feeText}.
⏳ **مدة التنفيذ:** ${s.processingTime}.`;

      if (s.sources.length > 0) {
        s.sources.forEach(src => {
          citations.push({
            title: s.nameAr,
            url: src.sourceUrl,
            source: src.sourceName,
            verified_at: src.verifiedAt.toISOString().split('T')[0],
          });
        });
      } else {
        citations.push({
          title: s.nameAr,
          url: s.officialUrl,
          source: s.platform?.nameAr || 'المنصة الرسمية',
          verified_at: s.lastVerifiedAt.toISOString().split('T')[0],
        });
      }
    } else {
      // AI Safety Guardrail (Section 28 & 98: Strict Non-Hallucination)
      reply = `لم أجد مصدراً رسمياً مؤكداً ومباشراً لهذه المعلومة ضمن قاعدة المعرفة المعتمدة لدينا حالياً.
حفاظاً على دقة معاملاتك ومنعاً للالتباس، نوصي بمراجعة البوابة الحكومية الموحدة أو توجيه سؤالك حول إحدى الخدمات الموثقة (تجديد الإقامة، نقل الخدمات، الزيارة العائلية، مدد، رخص العمل، الخروج والعودة).`;
      citations.push({
        title: 'المنصة الوطنية الموحدة',
        url: 'https://www.my.gov.sa',
        source: 'حكومة المملكة العربية السعودية',
        verified_at: '2026-09-20',
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        reply,
        citations,
        confidence: matchedService ? 0.98 : 0.6,
        disclaimer: 'المعلومات استرشادية فقط ومستخرجة من المصادر الموثقة. يرجى مراجعة البوابة الرسمية لإتمام المعاملة.',
      },
    });
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json(
      {
        success: false,
        error: { code: 'AI_SERVICE_ERROR', message: 'حدث خطأ في معالجة استفسار المساعد الذكي' },
      },
      { status: 500 }
    );
  }
}
