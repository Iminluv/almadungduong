import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        totalSpent: true,
        hashedPassword: true,
        createdAt: true,
        loyaltyTier: {
          include: {
            benefits: {
              orderBy: { sortOrder: "asc" },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy người dùng." }, { status: 404 });
    }

    const { hashedPassword, ...restUser } = user;
    const profile = {
      ...restUser,
      hasPassword: !!hashedPassword,
    };

    return NextResponse.json({ user: profile });
  } catch (error) {
    console.error("GET Profile error:", error);
    return NextResponse.json({ error: "Lỗi hệ thống." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone, currentPassword, newPassword } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy người dùng." }, { status: 404 });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;

    // Check if password change is requested
    if (newPassword) {
      if (user.hashedPassword) {
        if (!currentPassword) {
          return NextResponse.json(
            { error: "Vui lòng nhập mật khẩu hiện tại để đổi mật khẩu mới." },
            { status: 400 }
          );
        }
        const isValid = bcrypt.compareSync(currentPassword, user.hashedPassword);
        if (!isValid) {
          return NextResponse.json(
            { error: "Mật khẩu hiện tại không chính xác." },
            { status: 400 }
          );
        }
      }
      updateData.hashedPassword = bcrypt.hashSync(newPassword, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
      },
    });

    return NextResponse.json({
      message: "Cập nhật hồ sơ thành công.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("PUT Profile error:", error);
    return NextResponse.json({ error: "Lỗi hệ thống." }, { status: 500 });
  }
}
