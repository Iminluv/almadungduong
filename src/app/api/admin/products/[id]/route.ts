import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/admin/products/[id]
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

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        tags: true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET Admin Product error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// PATCH /api/admin/products/[id]
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

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Extract fields
    const {
      title,
      englishName,
      categoryId,
      price,
      originalPrice,
      volume,
      description,
      fullDescription,
      ingredients,
      certifications,
      usage,
      tagline,
      gift,
      image,
      images, // array of gallery URLs
      tags, // array of tag names
      sortOrder,
      showOnHomepage,
      isPublished,
    } = body;

    const updatedProduct = await prisma.$transaction(async (tx) => {
      // Build update payload
      const updateData: any = {};

      if (title !== undefined) updateData.title = title;
      if (englishName !== undefined) updateData.englishName = englishName || null;
      if (categoryId !== undefined) updateData.categoryId = categoryId;
      if (price !== undefined) updateData.price = parseInt(price, 10);
      if (originalPrice !== undefined) {
        updateData.originalPrice = originalPrice ? parseInt(originalPrice, 10) : null;
      }
      if (volume !== undefined) updateData.volume = volume || null;
      if (description !== undefined) updateData.description = description;
      if (fullDescription !== undefined) updateData.fullDescription = fullDescription || null;
      if (ingredients !== undefined) updateData.ingredients = ingredients || null;
      if (certifications !== undefined) updateData.certifications = certifications || null;
      if (usage !== undefined) updateData.usage = usage || null;
      if (tagline !== undefined) updateData.tagline = tagline || null;
      if (gift !== undefined) updateData.gift = gift || null;
      if (image !== undefined) updateData.image = image;
      if (sortOrder !== undefined) updateData.sortOrder = parseInt(sortOrder, 10);
      if (showOnHomepage !== undefined) updateData.showOnHomepage = !!showOnHomepage;
      if (isPublished !== undefined) updateData.isPublished = !!isPublished;

      // Handle tags if provided
      if (tags && Array.isArray(tags)) {
        // Disconnect existing tags
        await tx.product.update({
          where: { id },
          data: {
            tags: {
              disconnect: existingProduct.tags.map((t) => ({ id: t.id })),
            },
          },
        });

        // Upsert and connect new tags
        const tagConnect = [];
        for (const tagName of tags) {
          const tag = await tx.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          });
          tagConnect.push({ id: tag.id });
        }

        updateData.tags = {
          connect: tagConnect,
        };
      }

      // Handle gallery images if provided
      if (images && Array.isArray(images)) {
        // Delete all old product images
        await tx.productImage.deleteMany({
          where: { productId: id },
        });

        // Create new ones
        updateData.images = {
          create: images.filter(Boolean).map((url, idx) => ({
            url,
            sortOrder: idx,
          })),
        };
      }

      return await tx.product.update({
        where: { id },
        data: updateData,
        include: {
          category: true,
          tags: true,
          images: true,
        },
      });
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("PATCH Admin Product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/admin/products/[id] (Soft Delete)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Soft delete: set isPublished to false
    const softDeleted = await prisma.product.update({
      where: { id },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json({ success: true, product: softDeleted });
  } catch (error) {
    console.error("DELETE Admin Product error:", error);
    return NextResponse.json({ error: "Failed to soft delete product" }, { status: 500 });
  }
}
