import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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
    const targetFilePath = path.resolve(uploadsBaseDir, ...decodedSegments);

    // Security check: Prevent Directory Traversal
    if (!targetFilePath.startsWith(uploadsBaseDir)) {
      return NextResponse.json(
        { error: 'Access denied: Invalid file path' },
        { status: 403 }
      );
    }

    try {
      const stat = await fs.stat(targetFilePath);
      if (!stat.isFile()) {
        return NextResponse.json({ error: 'Not a file' }, { status: 404 });
      }
    } catch {
      // If exact file not found, try to search the directory for matching base
      return NextResponse.json(
        { error: 'File not found on server' },
        { status: 404 }
      );
    }

    const fileBuffer = await fs.readFile(targetFilePath);
    const ext = path.extname(targetFilePath).toLowerCase();
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
