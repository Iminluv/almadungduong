import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { deleteCloudinaryImage } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

// DELETE /api/admin/products/[id]/images/[imageId]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id: productId, imageId } = await params;

    // Check if image exists and belongs to the product
    const image = await prisma.productImage.findFirst({
      where: {
        id: imageId,
        productId,
      },
    });

    if (!image) {
      return NextResponse.json({ error: "Không tìm thấy hình ảnh này trong sản phẩm" }, { status: 404 });
    }

    // Delete from DB
    await prisma.productImage.delete({
      where: {
        id: imageId,
      },
    });

    // Best-effort delete from Cloudinary if it was stored in Cloudinary
    deleteCloudinaryImage(image.url).catch((err) => {
      console.error("Cloudinary delete cleanup error:", err);
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Admin Product Image error:", error);
    return NextResponse.json({ error: "Lỗi xóa hình ảnh" }, { status: 500 });
  }
}

