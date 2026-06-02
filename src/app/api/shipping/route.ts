import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    // Find the active standard shipping rate for the national zone (VN)
    const rate = await prisma.shippingRate.findFirst({
      where: {
        isActive: true,
        zone: {
          code: 'VN'
        }
      },
      include: {
        zone: true
      }
    });

    if (!rate) {
      return NextResponse.json(
        { success: false, error: 'No active shipping rate found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        name: rate.name,
        baseFee: rate.baseFee,
        freeThreshold: rate.freeThreshold,
        zoneCode: rate.zone.code,
        zoneName: rate.zone.name
      }
    });
  } catch (error) {
    console.error('Error fetching shipping rates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shipping rates' },
      { status: 500 }
    );
  }
}
