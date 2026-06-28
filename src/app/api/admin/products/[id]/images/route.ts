import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// POST /api/admin/products/[id]/images
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id: productId } = await params;
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL hình ảnh là bắt buộc" }, { status: 400 });
    }

    // Verify product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
    }

    // Get max sortOrder
    const maxSortOrderImage = await prisma.productImage.findFirst({
      where: { productId },
      orderBy: { sortOrder: "desc" },
    });

    const nextSortOrder = maxSortOrderImage ? maxSortOrderImage.sortOrder + 1 : 0;

    const newImage = await prisma.productImage.create({
      data: {
        url: url.trim(),
        sortOrder: nextSortOrder,
        productId,
      },
    });

    return NextResponse.json({ success: true, image: newImage }, { status: 201 });
  } catch (error) {
    console.error("POST Admin Product Image error:", error);
    return NextResponse.json({ error: "Lỗi thêm hình ảnh" }, { status: 500 });
  }
}

// PATCH /api/admin/products/[id]/images (Reorder)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id: productId } = await params;
    const body = await request.json();
    const { order } = body; // Array of { id: string, sortOrder: number }

    if (!order || !Array.isArray(order)) {
      return NextResponse.json({ error: "Dữ liệu thứ tự không hợp lệ" }, { status: 400 });
    }

    // Verify product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
    }

    // Perform updates in a transaction
    await prisma.$transaction(
      order.map((item) =>
        prisma.productImage.updateMany({
          where: {
            id: item.id,
            productId, // Ensure image belongs to product
          },
          data: {
            sortOrder: item.sortOrder,
          },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH Admin Product Image reorder error:", error);
    return NextResponse.json({ error: "Lỗi sắp xếp lại hình ảnh" }, { status: 500 });
  }
}
