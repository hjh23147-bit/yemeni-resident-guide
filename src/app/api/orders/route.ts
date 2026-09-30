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
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'orders');
        await fs.mkdir(uploadDir, { recursive: true });

        for (const file of files) {
          if (file && typeof file.arrayBuffer === 'function' && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const ext = path.extname(file.name).toLowerCase() || '.bin';
            const uniqueFilename = `doc_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}${ext}`;
            const targetPath = path.join(uploadDir, uniqueFilename);

            await fs.writeFile(targetPath, buffer);

            const sizeLabel = file.size > 1024 * 1024 
              ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
              : (file.size / 1024).toFixed(0) + ' KB';

            savedFiles.push({
              name: file.name,
              url: `/uploads/orders/${uniqueFilename}`,
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

    const newOrder = await prisma.serviceOrder.create({
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

    const networkIp = getLocalNetworkIp();
    const publicBaseUrl = getRealLiveUrl();

    return NextResponse.json({
      success: true,
      data: {
        ...newOrder,
        savedFiles,
        networkIp,
        publicBaseUrl
      },
      message: 'تم تسجيل طلب المعاملة وحفظ المرفقات في قاعدة البيانات بنجاح',
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'تعذر حفظ طلب الخدمة والمرفقات' } },
      { status: 500 }
    );
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
