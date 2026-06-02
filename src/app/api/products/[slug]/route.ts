import { prisma } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

export const revalidate = 60;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const dbProduct = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: {
          include: {
            parent: true,
          },
        },
        tags: true,
      },
    });

    if (!dbProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const product = {
      ...dbProduct,
      category: dbProduct.category.parent ? dbProduct.category.parent.name : dbProduct.category.name,
      subcategory: dbProduct.category.parent ? dbProduct.category.name : null,
      flag: dbProduct.tags.map((t: any) => t.name).join('/ ') || null,
      features: [],
      skinConcerns: [],
      variants: [],
      images: [],
    };

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
