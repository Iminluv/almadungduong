import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Pack PNG buffers into a multi-resolution Microsoft ICO container
function createIco(images: { width: number; height: number; buffer: Buffer }[]): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved. Must always be 0.
  header.writeUInt16LE(1, 2); // Specifies image type: 1 for icon (.ICO)
  header.writeUInt16LE(images.length, 4); // Number of images in file

  let offset = 6 + images.length * 16;
  const entries: Buffer[] = [];
  const buffers: Buffer[] = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0); // Width, in pixels (0 for 256)
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1); // Height, in pixels (0 for 256)
    entry.writeUInt8(0, 2); // Color palette, 0 if no palette
    entry.writeUInt8(0, 3); // Reserved (0)
    entry.writeUInt16LE(1, 4); // Color planes (1)
    entry.writeUInt16LE(32, 6); // Bits per pixel (32-bit RGBA)
    entry.writeUInt32LE(img.buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // Offset of image data from beginning of file

    entries.push(entry);
    buffers.push(img.buffer);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...buffers]);
}

async function main() {
  const rootDir = process.cwd();
  const almadungduongDir = path.join(rootDir, 'almadungduong');

  // Find source files safely (handling NFC/NFD Unicode normalization)
  const files = fs.readdirSync(almadungduongDir);
  const almaFile = files.find((f) => f.startsWith('alma-dung-') && f.endsWith('.jpg'));
  const webIconFile = files.find((f) => f.startsWith('web-icon') && f.endsWith('.jpg'));

  if (!almaFile || !webIconFile) {
    throw new Error(
      `Source assets not found in ${almadungduongDir}: almaFile=${almaFile}, webIconFile=${webIconFile}`
    );
  }

  const almaPath = path.join(almadungduongDir, almaFile);
  const webIconPath = path.join(almadungduongDir, webIconFile);

  console.log(`Using source brand image: ${almaPath}`);
  console.log(`Using source web icon: ${webIconPath}`);

  // Ensure target directories exist
  const dirsToEnsure = [
    path.join(rootDir, 'public', 'brand'),
    path.join(rootDir, 'public', 'icons'),
    path.join(rootDir, 'src', 'app'),
  ];
  for (const dir of dirsToEnsure) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // --- Step 1: Process web-icon into circular PNGs with transparency ---
  console.log('\n--- 1. Generating Icons & Favicons ---');
  const makeCircleSvg = (size: number) =>
    Buffer.from(
      `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white" /></svg>`
    );

  // Favicon resolutions for ICO container: 16x16, 32x32, 48x48
  const icoResolutions = [16, 32, 48];
  const icoPngBuffers: { width: number; height: number; buffer: Buffer }[] = [];

  for (const size of icoResolutions) {
    const buf = await sharp(webIconPath)
      .resize(size, size, { fit: 'cover' })
      .composite([{ input: makeCircleSvg(size), blend: 'dest-in' }])
      .png()
      .toBuffer();
    icoPngBuffers.push({ width: size, height: size, buffer: buf });
  }

  const icoData = createIco(icoPngBuffers);
  // Write favicon.ico to both src/app and public
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'favicon.ico'), icoData);
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), icoData);
  console.log('✓ Created src/app/favicon.ico & public/favicon.ico (16, 32, 48px)');

  // Next.js standard App Router icons:
  // src/app/icon.png (standard icon, 32x32)
  const icon32 = await sharp(webIconPath)
    .resize(32, 32, { fit: 'cover' })
    .composite([{ input: makeCircleSvg(32), blend: 'dest-in' }])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'icon.png'), icon32);
  console.log('✓ Created src/app/icon.png (32x32)');

  // src/app/apple-icon.png (Apple touch icon, 180x180)
  const appleIcon180 = await sharp(webIconPath)
    .resize(180, 180, { fit: 'cover' })
    .composite([{ input: makeCircleSvg(180), blend: 'dest-in' }])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'apple-icon.png'), appleIcon180);
  fs.writeFileSync(path.join(rootDir, 'public', 'apple-touch-icon.png'), appleIcon180);
  console.log('✓ Created src/app/apple-icon.png & public/apple-touch-icon.png (180x180)');

  // Web manifest / brand icons: 192x192 & 512x512
  const sizes = [192, 512];
  for (const s of sizes) {
    const sBuf = await sharp(webIconPath)
      .resize(s, s, { fit: 'cover' })
      .composite([{ input: makeCircleSvg(s), blend: 'dest-in' }])
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(rootDir, 'public', 'icons', `icon-${s}.png`), sBuf);
    fs.writeFileSync(path.join(rootDir, 'public', 'brand', `web-icon-${s}.png`), sBuf);
    console.log(`✓ Created public/icons/icon-${s}.png & public/brand/web-icon-${s}.png`);
  }

  // Master circular brand emblem
  const masterWebIcon = await sharp(webIconPath)
    .resize(512, 512, { fit: 'cover' })
    .composite([{ input: makeCircleSvg(512), blend: 'dest-in' }])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(rootDir, 'public', 'brand', 'web-icon.png'), masterWebIcon);
  console.log('✓ Created public/brand/web-icon.png (512x512 master PNG)');

  // --- Step 2: Process alma-dung-dưỡng into 1200x630 OpenGraph Image ---
  console.log('\n--- 2. Generating OpenGraph & Brand Banner ---');
  // Sample background color: #6d8c7d
  const brandBg = { r: 109, g: 140, b: 125 };
  const ogWidth = 1200;
  const ogHeight = 630;

  // Scale the square artwork so its height fits 630px
  const resizedArtwork = await sharp(almaPath)
    .resize(ogHeight, ogHeight, { fit: 'contain' })
    .toBuffer();

  const leftOffset = Math.round((ogWidth - ogHeight) / 2);

  const ogBuffer = await sharp({
    create: {
      width: ogWidth,
      height: ogHeight,
      channels: 3,
      background: brandBg,
    },
  })
    .composite([{ input: resizedArtwork, top: 0, left: leftOffset }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

  fs.writeFileSync(path.join(rootDir, 'public', 'og-image.jpg'), ogBuffer);
  fs.writeFileSync(path.join(rootDir, 'public', 'brand', 'og-image.jpg'), ogBuffer);
  console.log('✓ Created public/og-image.jpg (1200x630 letterboxed with brand green)');

  // Also create normalized ASCII copies of the full logo for local & web usage
  const fullLogoWebp = await sharp(almaPath)
    .resize(800, 800, { fit: 'contain' })
    .webp({ quality: 90 })
    .toBuffer();
  fs.writeFileSync(path.join(rootDir, 'public', 'brand', 'alma-dung-duong.webp'), fullLogoWebp);

  const fullLogoJpg = await sharp(almaPath)
    .resize(1000, 1000, { fit: 'contain' })
    .jpeg({ quality: 90 })
    .toBuffer();
  fs.writeFileSync(path.join(rootDir, 'public', 'brand', 'alma-dung-duong.jpg'), fullLogoJpg);
  console.log('✓ Created public/brand/alma-dung-duong.webp & .jpg (ASCII-normalized)');

  console.log('\nAll brand identity assets successfully generated!');
}

main().catch((err) => {
  console.error('Asset generation failed:', err);
  process.exit(1);
});
