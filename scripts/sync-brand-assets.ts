import path from 'node:path';
import fs from 'node:fs';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// Load .env then fallback/overlay .env.prod if present
dotenv.config();
if (fs.existsSync(path.join(process.cwd(), '.env.prod'))) {
  const prodEnv = dotenv.parse(fs.readFileSync(path.join(process.cwd(), '.env.prod')));
  for (const k in prodEnv) {
    if (!process.env[k]) {
      process.env[k] = prodEnv[k];
    }
  }
}

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.warn(
    'Cloudinary credentials missing in environment (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET). Skipping remote sync.'
  );
  process.exit(0);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

async function syncAssets() {
  const rootDir = process.cwd();
  const brandFolder = path.join(rootDir, 'public', 'brand');

  const assetsToSync = [
    {
      file: path.join(brandFolder, 'web-icon.png'),
      publicId: 'almadungduong/brand/web-icon',
      format: 'png',
    },
    {
      file: path.join(brandFolder, 'og-image.jpg'),
      publicId: 'almadungduong/brand/og-image',
      format: 'jpg',
    },
    {
      file: path.join(brandFolder, 'alma-dung-duong.jpg'),
      publicId: 'almadungduong/brand/alma-dung-duong',
      format: 'jpg',
    },
    {
      file: path.join(brandFolder, 'web-icon-192.png'),
      publicId: 'almadungduong/brand/web-icon-192',
      format: 'png',
    },
    {
      file: path.join(brandFolder, 'web-icon-512.png'),
      publicId: 'almadungduong/brand/web-icon-512',
      format: 'png',
    },
  ];

  console.log(`Starting Cloudinary brand assets synchronization to cloud: ${cloudName}...`);

  for (const asset of assetsToSync) {
    if (!fs.existsSync(asset.file)) {
      console.warn(`File not found, skipping: ${asset.file}`);
      continue;
    }

    try {
      console.log(`Uploading ${path.basename(asset.file)} -> ${asset.publicId}...`);
      const result = await cloudinary.uploader.upload(asset.file, {
        public_id: asset.publicId,
        overwrite: true,
        invalidate: true,
        resource_type: 'image',
      });
      console.log(`✓ Uploaded successfully: ${result.secure_url}`);
    } catch (err: any) {
      console.error(`Failed to upload ${asset.publicId}:`, err?.message || err);
    }
  }

  console.log('\nCloudinary brand assets synchronization completed!');
}

syncAssets().catch((err) => {
  console.error('Synchronization failed:', err);
  process.exit(1);
});
