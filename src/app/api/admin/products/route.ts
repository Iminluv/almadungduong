import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

// Simple Vietnamese Slugifier
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/([^a-z0-9\s-]|_)/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// POST /api/admin/products
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
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
      image, // main image URL
      images, // array of gallery URLs
      tags, // array of tag names
      sortOrder = 0,
      showOnHomepage = false,
      isPublished = true,
    } = body;

    if (!title || !categoryId || price === undefined || !image || !description) {
      return NextResponse.json(
        { error: "Các trường Title, Category, Price, Main Image và Description là bắt buộc" },
        { status: 400 }
      );
    }

    // Generate unique ID and slug
    const generatedId = "prod_" + crypto.randomBytes(6).toString("hex");
    const generatedSlug = slugify(title) + "-" + crypto.randomBytes(2).toString("hex");

    const newProduct = await prisma.$transaction(async (tx) => {
      // Resolve tags
      const tagConnect = [];
      if (tags && Array.isArray(tags)) {
        for (const tagName of tags) {
          // Find or create tag
          const tag = await tx.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          });
          tagConnect.push({ id: tag.id });
        }
      }

      return await tx.product.create({
        data: {
          id: generatedId,
          slug: generatedSlug,
          title,
          englishName: englishName || null,
          categoryId,
          price: parseInt(price, 10),
          originalPrice: originalPrice ? parseInt(originalPrice, 10) : null,
          volume: volume || null,
          description,
          fullDescription: fullDescription || null,
          ingredients: ingredients || null,
          certifications: certifications || null,
          usage: usage || null,
          tagline: tagline || null,
          gift: gift || null,
          image,
          sortOrder: parseInt(sortOrder, 10),
          showOnHomepage: !!showOnHomepage,
          isPublished: !!isPublished,
          tags: {
            connect: tagConnect,
          },
          images: {
            create: (images && Array.isArray(images))
              ? images.filter(Boolean).map((url, idx) => ({
                  url,
                  sortOrder: idx,
                }))
              : [],
          },
        },
        include: {
          category: true,
          tags: true,
          images: true,
        },
      });
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("POST Admin Product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
