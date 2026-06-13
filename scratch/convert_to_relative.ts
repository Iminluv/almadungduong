import { prisma } from '../src/lib/db';
import { products } from '../prisma/products_seed_data';
import * as fs from 'fs';
import * as path from 'path';

const seedFilePath = path.join(__dirname, '../prisma/products_seed_data.ts');

function toRelativePath(url: string | null | undefined): string {
  if (!url) return '';
  if (url.includes('res.cloudinary.com')) {
    const match = url.match(/\/image\/upload\/(?:v\d+\/)?(almadungduong\/products\/.+)$/);
    if (match && match[1]) {
      // Decode URL characters (e.g. %28 -> (, %29 -> ))
      return decodeURIComponent(match[1]);
    }
  }
  return url;
}

async function convertToRelative() {
  console.log('Converting seed data in products_seed_data.ts to relative paths...');

  // 1. Convert seed data in-memory
  for (const product of products) {
    product.image = toRelativePath(product.image);
    if (product.images && product.images.length > 0) {
      product.images = product.images.map(img => toRelativePath(img));
    }
  }

  // 2. Write seed file back
  try {
    const newContent = `import { Product } from '../src/lib/data';\n\nexport const products: Product[] = ${JSON.stringify(products, null, 2)};\n`;
    fs.writeFileSync(seedFilePath, newContent, 'utf8');
    console.log('Seed file successfully updated with relative paths.');
  } catch (fileErr) {
    console.error('Failed to write to seed file:', fileErr);
  }

  // 3. Update the active database (Neon PostgreSQL)
  try {
    console.log('Updating database product images to relative paths...');
    const dbProducts = await prisma.product.findMany();
    let updatedProductsCount = 0;
    
    for (const p of dbProducts) {
      const relImage = toRelativePath(p.image);
      if (relImage !== p.image) {
        await prisma.product.update({
          where: { id: p.id },
          data: { image: relImage }
        });
        updatedProductsCount++;
      }
    }
    console.log(`Updated ${updatedProductsCount} product main images in DB.`);

    const dbProductImages = await prisma.productImage.findMany();
    let updatedImagesCount = 0;
    for (const img of dbProductImages) {
      const relUrl = toRelativePath(img.url);
      if (relUrl !== img.url) {
        await prisma.productImage.update({
          where: { id: img.id },
          data: { url: relUrl }
        });
        updatedImagesCount++;
      }
    }
    console.log(`Updated ${updatedImagesCount} ProductImage gallery records in DB.`);
  } catch (dbErr) {
    console.error('Failed to update DB records:', dbErr);
  }
}

convertToRelative()
  .catch(err => {
    console.error('Conversion script failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
