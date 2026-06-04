import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
    }

    const addresses = await prisma.address.findMany({
      where: { user: { email: session.user.email } },
      orderBy: [
        { isDefault: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({ addresses });
  } catch (error) {
    console.error("GET Addresses error:", error);
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
    const { label, fullName, phone, street, ward, district, city, isDefault } = body;

    if (!fullName || !phone || !street || !district || !city) {
      return NextResponse.json(
        { error: "Vui lòng nhập đầy đủ họ tên, số điện thoại, địa chỉ và tỉnh/thành phố." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy người dùng." }, { status: 404 });
    }

    // Check if it's the user's first address, if so, force it to be default
    const addressCount = await prisma.address.count({
      where: { userId: user.id },
    });
    const makeDefault = addressCount === 0 ? true : !!isDefault;

    // If making default, unset all other defaults
    if (makeDefault) {
      await prisma.address.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.create({
      data: {
        userId: user.id,
        label: label || "Nhà",
        fullName,
        phone,
        street,
        ward,
        district,
        city,
        isDefault: makeDefault,
      },
    });

    return NextResponse.json({
      message: "Đã thêm địa chỉ mới.",
      address,
    }, { status: 201 });
  } catch (error) {
    console.error("POST Address error:", error);
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
    const { id, label, fullName, phone, street, ward, district, city, isDefault } = body;

    if (!id) {
      return NextResponse.json({ error: "Thiếu ID địa chỉ." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy người dùng." }, { status: 404 });
    }

    // Check ownership
    const existingAddress = await prisma.address.findFirst({
      where: { id, userId: user.id },
    });

    if (!existingAddress) {
      return NextResponse.json({ error: "Địa chỉ không tồn tại hoặc không thuộc quyền sở hữu của bạn." }, { status: 403 });
    }

    // If setting to default, unset other defaults
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const updatedAddress = await prisma.address.update({
      where: { id },
      data: {
        label: label !== undefined ? label : existingAddress.label,
        fullName: fullName !== undefined ? fullName : existingAddress.fullName,
        phone: phone !== undefined ? phone : existingAddress.phone,
        street: street !== undefined ? street : existingAddress.street,
        ward: ward !== undefined ? ward : existingAddress.ward,
        district: district !== undefined ? district : existingAddress.district,
        city: city !== undefined ? city : existingAddress.city,
        isDefault: isDefault !== undefined ? !!isDefault : existingAddress.isDefault,
      },
    });

    return NextResponse.json({
      message: "Cập nhật địa chỉ thành công.",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("PUT Address error:", error);
    return NextResponse.json({ error: "Lỗi hệ thống." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Thiếu ID địa chỉ." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy người dùng." }, { status: 404 });
    }

    // Check ownership
    const addressToDelete = await prisma.address.findFirst({
      where: { id, userId: user.id },
    });

    if (!addressToDelete) {
      return NextResponse.json({ error: "Địa chỉ không tồn tại hoặc không thuộc quyền sở hữu của bạn." }, { status: 403 });
    }

    await prisma.address.delete({
      where: { id },
    });

    // If the deleted address was default, set another address as default if available
    if (addressToDelete.isDefault) {
      const remainingAddress = await prisma.address.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      });

      if (remainingAddress) {
        await prisma.address.update({
          where: { id: remainingAddress.id },
          data: { isDefault: true },
        });
      }
    }

    return NextResponse.json({
      message: "Xóa địa chỉ thành công.",
    });
  } catch (error) {
    console.error("DELETE Address error:", error);
    return NextResponse.json({ error: "Lỗi hệ thống." }, { status: 500 });
  }
}
