import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/admin/orders/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            totalSpent: true,
            loyaltyTier: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Find associated webhook logs (matching transaction code / transferCode)
    const webhookLogs = await prisma.webhookLog.findMany({
      where: {
        OR: [
          { matchedOrderId: id },
          {
            payload: {
              path: ["description"],
              equals: order.transferCode,
            },
          },
        ],
      },
      orderBy: { receivedAt: "desc" },
    });

    return NextResponse.json({ order, webhookLogs });
  } catch (error) {
    console.error("GET Admin Order Details error:", error);
    return NextResponse.json({ error: "Failed to fetch order details" }, { status: 500 });
  }
}

// PATCH /api/admin/orders/[id]
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (status !== "completed") {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    // Retrieve order and user spending
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status === "completed") {
      return NextResponse.json({ error: "Order is already completed" }, { status: 400 });
    }

    // Run order completion transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Update order status
      const updatedOrder = await tx.order.update({
        where: { id },
        data: {
          status: "completed",
          completedAt: new Date(),
        },
      });

      // 2. Fetch loyalty tiers to check for potential upgrades
      const tiers = await tx.loyaltyTier.findMany({
        orderBy: { sortOrder: "asc" },
      });

      const currentTotalSpent = order.user?.totalSpent || 0;
      const newTotalSpent = currentTotalSpent + order.totalAmount;

      let newTierId = order.user?.loyaltyTierId || null;
      if (tiers.length > 0 && order.user) {
        let selectedTier = tiers[0]; // baseline tier
        for (const tier of tiers) {
          if (tier.slug === "dung-duong" && newTotalSpent >= 5000000) {
            selectedTier = tier;
          } else if (tier.slug === "no-ro" && newTotalSpent >= 10000000) {
            selectedTier = tier;
          }
        }
        newTierId = selectedTier.id;
      }

      // 3. Update user total spent & loyalty tier
      if (order.userId) {
        await tx.user.update({
          where: { id: order.userId },
          data: {
            totalSpent: {
              increment: order.totalAmount,
            },
            loyaltyTierId: newTierId,
          },
        });
      }

      return updatedOrder;
    });

    return NextResponse.json({ success: true, order: result });
  } catch (error) {
    console.error("PATCH Admin Order error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
