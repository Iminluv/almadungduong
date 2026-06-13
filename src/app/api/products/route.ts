import { prisma } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import { getImageUrl } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where: any = { isPublished: true };
    if (category) {
      where.category = {
        OR: [
          { name: category },
          { slug: category },
          { parent: { name: category } },
          { parent: { slug: category } }
        ]
      };
    }
    const dbProducts = await prisma.product.findMany({
      where,
      include: {
        category: {
          include: {
            parent: true,
          },
        },
        tags: true,
        images: true,
        reviews: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });

    const products = dbProducts.map((p: any) => ({
      ...p,
      image: getImageUrl(p.image),
      category: p.category.parent ? p.category.parent.name : p.category.name,
      subcategory: p.category.parent ? p.category.name : null,
      flag: p.tags.map((t: any) => t.name).join('/ ') || null,
      features: [],
      skinConcerns: [],
      variants: [],
      images: p.images.sort((a: any, b: any) => a.sortOrder - b.sortOrder).map((img: any) => getImageUrl(img.url)),
      reviews: p.reviews,
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
