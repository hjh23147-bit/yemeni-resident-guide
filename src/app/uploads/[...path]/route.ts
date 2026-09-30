import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

// Map file extensions to MIME types
const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.txt': 'text/plain; charset=utf-8',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const rawSegments = resolvedParams.path || [];
    
    // Decode URI segments to support Arabic names and special characters
    const decodedSegments = rawSegments.map((segment) => decodeURIComponent(segment));

    const uploadsBaseDir = path.resolve(process.cwd(), 'public', 'uploads');
    const tmpBaseDir = path.resolve(os.tmpdir(), 'uploads');

    let resolvedPath = path.resolve(uploadsBaseDir, ...decodedSegments);
    let found = false;

    // Check primary dir
    try {
      const stat = await fs.stat(resolvedPath);
      if (stat.isFile()) found = true;
    } catch {}

    // Check temp fallback dir
    if (!found) {
      const tmpPath = path.resolve(tmpBaseDir, ...decodedSegments);
      try {
        const statTmp = await fs.stat(tmpPath);
        if (statTmp.isFile()) {
          resolvedPath = tmpPath;
          found = true;
        }
      } catch {}
    }

    if (!found) {
      return NextResponse.json(
        { error: 'File not found on server' },
        { status: 404 }
      );
    }

    const fileBuffer = await fs.readFile(resolvedPath);
    const ext = path.extname(resolvedPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=86400, immutable',
        'Content-Disposition': 'inline', // Opens images and PDFs directly in browser
      },
    });
  } catch (error) {
    console.error('File serving error:', error);
    return NextResponse.json(
      { error: 'Internal server error while loading file' },
      { status: 500 }
    );
  }
}
