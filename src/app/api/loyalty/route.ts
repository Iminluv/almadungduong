import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const tiers = await prisma.loyaltyTier.findMany({
      include: {
        benefits: {
          orderBy: {
            sortOrder: 'asc'
          }
        }
      },
      orderBy: {
        sortOrder: 'asc'
      }
    });

    const config = await prisma.loyaltyConfig.findMany();
    
    // Transform config array into an object for easier consumption
    const configMap = config.reduce<Record<string, string>>((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      data: {
        tiers,
        config: configMap
      }
    });
  } catch (error) {
    console.error('Error fetching loyalty data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch loyalty data' },
      { status: 500 }
    );
  }
}
