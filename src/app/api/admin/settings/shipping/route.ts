import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/admin/settings/shipping
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const rate = await prisma.shippingRate.findFirst({
      where: { zone: { code: "VN" } },
    });

    return NextResponse.json(rate);
  } catch (error) {
    console.error("GET Admin Shipping settings error:", error);
    return NextResponse.json({ error: "Failed to fetch shipping rate" }, { status: 500 });
  }
}

// PATCH /api/admin/settings/shipping
export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { baseFee, freeThreshold } = body;

    if (baseFee === undefined) {
      return NextResponse.json({ error: "Trường baseFee là bắt buộc" }, { status: 400 });
    }

    // Locate active rate under zone VN
    const rate = await prisma.shippingRate.findFirst({
      where: { zone: { code: "VN" } },
    });

    if (!rate) {
      return NextResponse.json({ error: "Không tìm thấy phí vận chuyển khu vực VN" }, { status: 404 });
    }

    const updatedRate = await prisma.shippingRate.update({
      where: { id: rate.id },
      data: {
        baseFee: parseInt(baseFee, 10),
        freeThreshold: freeThreshold ? parseInt(freeThreshold, 10) : null,
      },
    });

    return NextResponse.json({ success: true, rate: updatedRate });
  } catch (error) {
    console.error("PATCH Admin Shipping settings error:", error);
    return NextResponse.json({ error: "Failed to update shipping rate" }, { status: 500 });
  }
}
