import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

function runTunnel() {
  console.log('[Tunnel Keeper] Starting resilient localtunnel...');
  
  const child = spawn('npx', [
    'localtunnel',
    '--port', '3000',
    '--subdomain', 'muqeem-services'
  ], {
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  child.stdout.on('data', (data) => {
    const text = data.toString();
    process.stdout.write(text);
    const match = text.match(/https:\/\/[^\s]+/);
    if (match) {
      const url = match[0].trim();
      console.log(`\n[Tunnel Keeper] Verified live URL: ${url}\n`);
      try {
        fs.writeFileSync(path.join(process.cwd(), '.tunnel_url'), url, 'utf8');
      } catch (e) {
        // ignore
      }
    }
  });

  child.stderr.on('data', (data) => {
    process.stderr.write(data);
  });

  child.on('close', (code) => {
    console.log(`\n[Tunnel Keeper] Tunnel closed with code ${code}. Reconnecting in 2s...\n`);
    setTimeout(runTunnel, 2000);
  });

  child.on('error', (err) => {
    console.error('\n[Tunnel Keeper] Process error:', err, 'Retrying in 3s...\n');
    setTimeout(runTunnel, 3000);
  });
}

runTunnel();
