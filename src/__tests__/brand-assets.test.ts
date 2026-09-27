import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import manifest from '@/app/manifest';

describe('Brand Identity Assets & Metadata', () => {
  const rootDir = process.cwd();

  it('generates all required local and production icon files', () => {
    const requiredFiles = [
      'src/app/favicon.ico',
      'src/app/icon.png',
      'src/app/apple-icon.png',
      'public/favicon.ico',
      'public/apple-touch-icon.png',
      'public/og-image.jpg',
      'public/brand/web-icon.png',
      'public/brand/web-icon-192.png',
      'public/brand/web-icon-512.png',
      'public/brand/alma-dung-duong.webp',
      'public/brand/alma-dung-duong.jpg',
      'public/icons/icon-192.png',
      'public/icons/icon-512.png',
    ];

    for (const relPath of requiredFiles) {
      const fullPath = path.join(rootDir, relPath);
      expect(fs.existsSync(fullPath), `Expected ${relPath} to exist`).toBe(true);
      const stat = fs.statSync(fullPath);
      expect(stat.size, `Expected ${relPath} not to be empty`).toBeGreaterThan(100);
    }
  });

  it('configures Web App Manifest with authentic Alma brand theme', () => {
    const manifestData = manifest();

    expect(manifestData.name).toContain('Alma Dung Dưỡng');
    expect(manifestData.short_name).toBe('Alma Dungduong');
    expect(manifestData.theme_color).toBe('#6d8c7d');
    expect(manifestData.background_color).toBe('#FAF8F5');
    expect(manifestData.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          src: '/icons/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
        }),
        expect.objectContaining({
          src: '/icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        }),
      ])
    );
  });
});
