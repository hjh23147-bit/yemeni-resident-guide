import fs from 'fs';
import path from 'path';

/**
 * Returns the active real live public URL for sharing links with specialists over WhatsApp
 */
export function getRealLiveUrl(): string {
  // 1. Active Tunnel URL file (.tunnel_url)
  try {
    const tunnelFile = path.join(process.cwd(), '.tunnel_url');
    if (fs.existsSync(tunnelFile)) {
      const url = fs.readFileSync(tunnelFile, 'utf8').trim();
      if (url && url.startsWith('http')) {
        return url.replace(/\/$/, '');
      }
    }
  } catch (e) {
    // ignore
  }

  // 2. Explicit environment variable
  if (process.env.NEXT_PUBLIC_APP_URL && process.env.NEXT_PUBLIC_APP_URL.startsWith('http')) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
  }
  if (process.env.PUBLIC_URL && process.env.PUBLIC_URL.startsWith('http')) {
    return process.env.PUBLIC_URL.replace(/\/$/, '');
  }

  // 3. Fallback
  return 'https://chatty-wombat-63.loca.lt';
}
