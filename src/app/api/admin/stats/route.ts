import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Authenticate session & check role
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. Fetch total revenue (sum of completed orders totalAmount)
    const revenueAggregate = await prisma.order.aggregate({
      where: { status: "completed" },
      _sum: {
        totalAmount: true,
      },
    });
    const totalRevenue = revenueAggregate._sum.totalAmount || 0;

    // 3. Fetch order status counts
    const ordersGrouped = await prisma.order.groupBy({
      by: ["status"],
      _count: {
        id: true,
      },
    });

    const orderCounts = {
      pending: 0,
      completed: 0,
      expired: 0,
      total: 0,
    };

    ordersGrouped.forEach((group) => {
      const status = group.status.toLowerCase();
      const count = group._count.id;
      if (status === "pending") orderCounts.pending = count;
      else if (status === "completed") orderCounts.completed = count;
      else if (status === "expired") orderCounts.expired = count;
    });
    orderCounts.total = orderCounts.pending + orderCounts.completed + orderCounts.expired;

    // 4. Fetch user count
    const userCount = await prisma.user.count();

    // 5. Fetch product counts (published vs total)
    const totalProducts = await prisma.product.count();
    const publishedProducts = await prisma.product.count({
      where: { isPublished: true },
    });

    // 6. Fetch recent 5 orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        transferCode: true,
        totalAmount: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // 7. Calculate revenue trend (last 7 days completed orders)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const completedOrdersLast7Days = await prisma.order.findMany({
      where: {
        status: "completed",
        completedAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        totalAmount: true,
        completedAt: true,
        createdAt: true,
      },
    });

    const dailyRevenueMap: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
      dailyRevenueMap[dateStr] = 0;
    }

    completedOrdersLast7Days.forEach((order) => {
      const date = order.completedAt || order.createdAt;
      const dateStr = date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
      if (dateStr in dailyRevenueMap) {
        dailyRevenueMap[dateStr] += order.totalAmount;
      }
    });

    const dailyRevenue = Object.entries(dailyRevenueMap).map(([date, revenue]) => ({
      date,
      revenue,
    }));

    return NextResponse.json({
      revenue: totalRevenue,
      orderCounts,
      userCount,
      productCount: {
        published: publishedProducts,
        total: totalProducts,
      },
      recentOrders,
      dailyRevenue,
    });
  } catch (error) {
    console.error("Dashboard stats API error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
