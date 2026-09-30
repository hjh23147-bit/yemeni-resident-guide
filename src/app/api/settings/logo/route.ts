import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const SETTINGS_FILE = path.join(process.cwd(), 'public', 'uploads', 'logo', 'settings.json');

const DEFAULT_SETTINGS = {
  logoUrl: '/uploads/logo/specialist-logo.jpg',
  logoType: 'image',
  brandTitle: 'دليل المقيم اليمني',
  brandSubtitle: 'محسن العريقي • مقدم خدمات إلكترونية معتمد',
  specialistName: 'محسن العريقي',
  specialistTitle: 'مقدم خدمات إلكترونية',
  city: 'الرياض',
  updatedAt: new Date().toISOString(),
};

async function readSettings() {
  try {
    const data = await fs.readFile(SETTINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

async function writeSettings(settings: Record<string, unknown>) {
  const dir = path.dirname(SETTINGS_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
}

export async function GET() {
  try {
    const settings = await readSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching logo settings:', error);
    return NextResponse.json({ success: false, data: DEFAULT_SETTINGS });
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    const current = await readSettings();
    const updated = { ...current };

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('logoFile') as File | null;
      const brandTitle = formData.get('brandTitle') as string | null;
      const brandSubtitle = formData.get('brandSubtitle') as string | null;
      const logoType = formData.get('logoType') as string | null;
      const logoUrl = formData.get('logoUrl') as string | null;

      if (brandTitle) updated.brandTitle = brandTitle.trim();
      if (brandSubtitle) updated.brandSubtitle = brandSubtitle.trim();
      if (logoType) updated.logoType = logoType;
      if (logoUrl) updated.logoUrl = logoUrl;

      if (file && typeof file.arrayBuffer === 'function' && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = path.extname(file.name).toLowerCase() || '.png';
        const filename = `custom_logo_${Date.now()}${ext}`;
        const targetPath = path.join(process.cwd(), 'public', 'uploads', 'logo', filename);
        
        await fs.writeFile(targetPath, buffer);
        updated.logoUrl = `/uploads/logo/${filename}`;
        updated.logoType = 'custom';
      }
    } else {
      const body = await request.json();
      if (body.logoUrl !== undefined) updated.logoUrl = body.logoUrl;
      if (body.logoType !== undefined) updated.logoType = body.logoType;
      if (body.brandTitle !== undefined) updated.brandTitle = body.brandTitle;
      if (body.brandSubtitle !== undefined) updated.brandSubtitle = body.brandSubtitle;
      if (body.specialistName !== undefined) updated.specialistName = body.specialistName;
      if (body.specialistTitle !== undefined) updated.specialistTitle = body.specialistTitle;
    }

    updated.updatedAt = new Date().toISOString();
    await writeSettings(updated);

    return NextResponse.json({
      success: true,
      data: updated,
      message: 'تم حفظ وتحديث شعار وهوية المنصة بنجاح',
    });
  } catch (error) {
    console.error('Error saving logo settings:', error);
    return NextResponse.json(
      { success: false, error: { message: 'تعذر حفظ إعدادات الشعار' } },
      { status: 500 }
    );
  }
}
