import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { user: { email: session.user.email } },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("GET Favorites error:", error);
    return NextResponse.json({ error: "Lỗi hệ thống." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
    }

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ error: "Thiếu ID sản phẩm." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy người dùng." }, { status: 404 });
    }

    // Verify product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Sản phẩm không tồn tại." }, { status: 404 });
    }

    // Check if already favorited
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
    });

    if (existingFavorite) {
      return NextResponse.json({
        message: "Sản phẩm đã được lưu vào yêu thích.",
        favorite: existingFavorite,
      });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: user.id,
        productId,
      },
    });

    return NextResponse.json({
      message: "Đã thêm sản phẩm vào yêu thích.",
      favorite,
    }, { status: 201 });
  } catch (error) {
    console.error("POST Favorite error:", error);
    return NextResponse.json({ error: "Lỗi hệ thống." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
    }

    // Support both body JSON and query param for flexibility
    let productId = "";
    try {
      const body = await request.json();
      productId = body.productId;
    } catch (e) {
      const { searchParams } = new URL(request.url);
      productId = searchParams.get("productId") || "";
    }

    if (!productId) {
      return NextResponse.json({ error: "Thiếu ID sản phẩm." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy người dùng." }, { status: 404 });
    }

    // Check if favorite exists
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
    });

    if (!favorite) {
      return NextResponse.json({
        message: "Sản phẩm này chưa được lưu trong danh sách yêu thích.",
      });
    }

    await prisma.favorite.delete({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
    });

    return NextResponse.json({
      message: "Đã xóa sản phẩm khỏi danh sách yêu thích.",
    });
  } catch (error) {
    console.error("DELETE Favorite error:", error);
    return NextResponse.json({ error: "Lỗi hệ thống." }, { status: 500 });
  }
}
