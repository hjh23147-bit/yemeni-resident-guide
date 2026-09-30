import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { getRealLiveUrl } from '@/lib/publicUrl';

function getLocalNetworkIp(): string | null {
  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name] || []) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  } catch (e) {
    // ignore
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    
    let customerName = '';
    let customerPhone = '';
    let serviceName = '';
    let serviceCategory = 'عام';
    let notes = '';
    let savedFiles: { name: string; url: string; size: string; type: string }[] = [];

    // 1. Handle multipart/form-data (File Uploads)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      customerName = (formData.get('customerName') as string) || '';
      customerPhone = (formData.get('customerPhone') as string) || '';
      serviceName = (formData.get('serviceName') as string) || '';
      serviceCategory = (formData.get('serviceCategory') as string) || 'عام';
      notes = (formData.get('notes') as string) || '';

      const files = formData.getAll('files') as File[];
      
      if (files && files.length > 0) {
        // Preferred upload dir in public/uploads/orders, with fallback to tmp for serverless (Vercel)
        const primaryDir = path.join(process.cwd(), 'public', 'uploads', 'orders');
        const fallbackDir = path.join(os.tmpdir(), 'uploads', 'orders');

        for (const file of files) {
          if (file && typeof file.arrayBuffer === 'function' && file.size > 0) {
            const ext = path.extname(file.name).toLowerCase() || '.bin';
            const uniqueFilename = `doc_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}${ext}`;
            const sizeLabel = file.size > 1024 * 1024 
              ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
              : (file.size / 1024).toFixed(0) + ' KB';

            let savedUrl = `/uploads/orders/${uniqueFilename}`;

            try {
              const buffer = Buffer.from(await file.arrayBuffer());
              let written = false;

              // Try primary dir
              try {
                await fs.mkdir(primaryDir, { recursive: true });
                await fs.writeFile(path.join(primaryDir, uniqueFilename), buffer);
                written = true;
              } catch (primaryErr) {
                // Read-only filesystem (e.g. Vercel serverless) -> fallback to OS temp dir
                try {
                  await fs.mkdir(fallbackDir, { recursive: true });
                  await fs.writeFile(path.join(fallbackDir, uniqueFilename), buffer);
                  written = true;
                } catch (fallbackErr) {
                  console.warn('Could not write file to disk on serverless:', fallbackErr);
                }
              }
            } catch (bufErr) {
              console.warn('Error reading uploaded file buffer:', bufErr);
            }

            savedFiles.push({
              name: file.name,
              url: savedUrl,
              size: sizeLabel,
              type: file.type || 'document'
            });
          }
        }
      }
    } else {
      // 2. Handle JSON payload
      const body = await request.json();
      customerName = body.customerName || '';
      customerPhone = body.customerPhone || '';
      serviceName = body.serviceName || '';
      serviceCategory = body.serviceCategory || 'عام';
      notes = body.notes || '';
      if (Array.isArray(body.filesList)) {
        savedFiles = body.filesList.map((f: string | { name: string; url?: string }) => 
          typeof f === 'string' ? { name: f, url: '', size: '', type: 'file' } : f
        );
      }
    }

    if (!customerName.trim() || !customerPhone.trim() || !serviceName.trim()) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'يرجى إدخال اسم العميل ورقم الهاتف والخدمة المطلوبة' } },
        { status: 400 }
      );
    }

    const orderNumber = `REQ-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    let orderData: Record<string, unknown> = {
      orderNumber,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      serviceName: serviceName.trim(),
      serviceCategory: serviceCategory || 'عام',
      notes: notes || '',
      status: 'PENDING',
      filesCount: savedFiles.length,
      filesList: JSON.stringify(savedFiles),
    };

    // Safely attempt database persist, but never fail if SQLite is read-only on Vercel
    try {
      const dbOrder = await prisma.serviceOrder.create({
        data: {
          orderNumber,
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          serviceName: serviceName.trim(),
          serviceCategory: serviceCategory || 'عام',
          notes: notes || '',
          status: 'PENDING',
          filesCount: savedFiles.length,
          filesList: JSON.stringify(savedFiles),
        },
      });
      orderData = { ...orderData, ...dbOrder };
    } catch (dbErr) {
      console.warn('Prisma database write warning (continuing to WhatsApp flow):', dbErr);
    }

    const networkIp = getLocalNetworkIp();
    const publicBaseUrl = getRealLiveUrl();

    return NextResponse.json({
      success: true,
      data: {
        ...orderData,
        savedFiles,
        networkIp,
        publicBaseUrl
      },
      message: 'تم تسجيل طلب المعاملة وتجهيز الرابط بنجاح',
    });
  } catch (error) {
    console.error('Create order error (fallback):', error);
    // Never completely fail if basic data is provided
    const fallbackOrderNumber = `REQ-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    return NextResponse.json({
      success: true,
      data: {
        orderNumber: fallbackOrderNumber,
        savedFiles: [],
        publicBaseUrl: getRealLiveUrl()
      },
      message: 'تم تجهيز الطلب للإرسال عبر الواتساب مباشرة',
    });
  }
}

export async function GET() {
  try {
    const orders = await prisma.serviceOrder.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({
      success: true,
      data: orders,
      meta: { total: orders.length },
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'تعذر استرجاع الطلبات' } },
      { status: 500 }
    );
  }
}
