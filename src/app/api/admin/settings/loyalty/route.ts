import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// PATCH /api/admin/settings/loyalty
export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { configs } = body;

    if (!configs || !Array.isArray(configs)) {
      return NextResponse.json({ error: "Tham số configs không hợp lệ" }, { status: 400 });
    }

    // Execute bulk updates in a transaction
    await prisma.$transaction(
      configs.map((c) =>
        prisma.loyaltyConfig.update({
          where: { key: c.key },
          data: { value: c.value },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH Admin Loyalty settings error:", error);
    return NextResponse.json({ error: "Failed to update loyalty configs" }, { status: 500 });
  }
}
