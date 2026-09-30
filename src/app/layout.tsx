import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'دليل المقيم اليمني في السعودية — البوابة الرقمية للخدمات والإجراءات',
  description: 'البوابة الرقمية الشاملة للمقيمين اليمنيين في المملكة العربية السعودية: تجديد الإقامة، نقل الخدمات، تأشيرات الزيارة، رخص العمل، منصة قوى، مدد، والمساعد الذكي RAG.',
  keywords: [
    'دليل المقيم اليمني',
    'تجديد الإقامة',
    'نقل الخدمات',
    'تأشيرة زيارة عائلية',
    'منصة قوى',
    'حماية الأجور مدد',
    'رسوم الإقامة في السعودية',
    'مكاتب تعقيب',
    'الجوازات السعودية'
  ],
  authors: [{ name: 'دليل المقيم اليمني' }],
  metadataBase: new URL('https://yemeni-resident-guide.com'),
  openGraph: {
    title: 'دليل المقيم اليمني في السعودية',
    description: 'كل ما تحتاجه من معلومات وإجراءات ورسوم وخدمات للمقيمين في السعودية بمصادر موثقة.',
    locale: 'ar_SA',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0B1F3A" />
      </head>
      <body className="min-h-screen flex flex-col bg-bgLight text-textMain antialiased">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <BottomNav />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
