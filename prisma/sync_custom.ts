import { prisma } from "../src/lib/db";

async function main() {
  console.log("Starting custom database synchronization...");

  // 1. Update/Upsert the Shipping Zone and Standard Shipping Rate
  let zone = await prisma.shippingZone.findUnique({
    where: { code: "VN" }
  });
  if (!zone) {
    zone = await prisma.shippingZone.create({
      data: {
        name: "Toàn quốc",
        code: "VN"
      }
    });
    console.log("Created Toàn quốc (VN) shipping zone.");
  }

  const standardRate = await prisma.shippingRate.findFirst({
    where: {
      zoneId: zone.id,
      name: "Giao hàng tiêu chuẩn"
    }
  });

  if (standardRate) {
    await prisma.shippingRate.update({
      where: { id: standardRate.id },
      data: {
        baseFee: 0,
        isActive: true
        // Keep freeThreshold exactly as is (no change)
      }
    });
    console.log(`Updated standard shipping rate (ID: ${standardRate.id}) baseFee to 0 VND.`);
  } else {
    await prisma.shippingRate.create({
      data: {
        zoneId: zone.id,
        name: "Giao hàng tiêu chuẩn",
        baseFee: 0,
        freeThreshold: 1000000,
        isActive: true
      }
    });
    console.log("Created standard shipping rate with 0 VND baseFee.");
  }

  // 2. Find or create the Category
  let category = await prisma.category.findUnique({
    where: { slug: "my-pham-vi-sinh-hoa-ngan" }
  });
  if (!category) {
    category = await prisma.category.create({
      data: {
        name: "Mỹ phẩm vi sinh Hoa Ngân",
        slug: "my-pham-vi-sinh-hoa-ngan"
      }
    });
    console.log("Created 'Mỹ phẩm vi sinh Hoa Ngân' category.");
  }

  // 3. Upsert the Test Product
  const testProductId = "san-pham-thu-nghiem-3k";
  const testProductData = {
    id: testProductId,
    title: "Sản phẩm thử nghiệm 3K",
    englishName: "TEST PRODUCT 3K",
    price: 3000,
    rating: 5.0,
    reviewsCount: 1,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8ff5?q=80&w=800",
    description: "Sản phẩm thử nghiệm giá 3k",
    fullDescription: "Sản phẩm thử nghiệm để test tính năng thanh toán và vận chuyển.",
    ingredients: "Nước, hoạt chất thử nghiệm",
    certifications: "Không kích ứng",
    tagline: "Dành cho việc test hệ thống",
    volume: "10ml",
    slug: testProductId,
    showOnHomepage: true,
    isPublished: true,
    categoryId: category.id,
  };

  await prisma.product.upsert({
    where: { id: testProductId },
    update: {
      title: testProductData.title,
      price: testProductData.price,
      image: testProductData.image,
      description: testProductData.description,
      isPublished: testProductData.isPublished,
      showOnHomepage: testProductData.showOnHomepage
    },
    create: testProductData
  });
  console.log("Upserted the 3k test product successfully.");

  console.log("Database synchronization complete!");
}

main()
  .catch((e) => {
    console.error("Synchronization failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
