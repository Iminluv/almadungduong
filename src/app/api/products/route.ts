import { prisma } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

export const revalidate = 60;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where: any = { isPublished: true };
    if (category) {
      where.category = category;
    }
    const products = await prisma.product.findMany({
      where,
      orderBy: {
        sortOrder: 'asc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
