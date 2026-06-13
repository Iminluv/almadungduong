import { prisma } from "../src/lib/db";
import { products } from "./products_seed_data";
import { reviewsSeedData } from "./reviews_seed_data";

async function main() {
  console.log("Seeding loyalty data...");

  // Clean existing data
  await prisma.loyaltyBenefit.deleteMany();
  await prisma.loyaltyTier.deleteMany();
  await prisma.loyaltyConfig.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.shippingRate.deleteMany();
  await prisma.shippingZone.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();

  // Insert Config
  await prisma.loyaltyConfig.createMany({
    data: [
      { key: "hero_text", value: "HÀNH TRÌNH ƯƠM MẦM – \nDUNG DƯỠNG – NỞ RỘ" },
      { key: "hero_subtext", value: "Mỗi làn da đều có một nhịp phát triển riêng. Không cần vội vàng, chỉ cần được chăm sóc đúng cách — làn da sẽ dần khỏe lên, cân bằng hơn và rạng rỡ theo thời gian." },
      { key: "hero_description", value: "Chúng tôi tạo ra chương trình này như một hành trình đồng hành lâu dài, nơi mỗi lần bạn quay lại là một bước tiến gần hơn đến phiên bản làn da tốt nhất của mình. Đăng ký hội viên ngay để nhận được những phần quà hấp dẫn" },
      { key: "exchange_rate", value: "1 giọt tương ứng với 1000 đồng và có thể quy đổi thành voucher khi mua hàng trên website Alma Dungduong" },
      { key: "closing_quote", value: "Chăm sóc da không phải là câu chuyện của một sản phẩm, mà là sự kiên trì và thấu hiểu chính làn da của mình." },
      { key: "closing_description", value: "Hãy để Alma Dungduong đồng hành cùng bạn trên hành trình tái tạo làn da khỏe đẹp rạng rỡ từ bên trong,\ntừ Ươm mầm nhẹ nhàng…\nđến Dung dưỡng bền vững…\nvà cuối cùng là Nở rộ rạng rỡ." }
    ]
  });

  // Tiers and Benefits
  const tiers = [
    {
      name: "Ươm mầm",
      slug: "uom-mam",
      icon: "🌱",
      condition: "Đăng ký thành viên",
      sortOrder: 1,
      benefits: [
        { label: "Đăng ký thành viên", value: "+ 10 giọt" },
        { label: "Đăng ký nhận letter qua email", value: "+ 10 giọt" },
        { label: "Chi tiêu cho mỗi 100000 vnd", value: "+1 giọt" },
        { label: "Đánh giá sản phẩm", value: "+3 giọt" },
        { label: "Giới thiệu bạn bè thành công", value: "+50 giọt" },
        { label: "Sinh nhật", value: "+50 giọt" }
      ]
    },
    {
      name: "Dung dưỡng",
      slug: "dung-duong",
      icon: "💧",
      condition: "Tổng chi tiêu > 5 triệu",
      sortOrder: 2,
      benefits: [
        { label: "Đăng ký thành viên", value: "+ 10 giọt" },
        { label: "Đăng ký nhận letter qua email", value: "+ 10 giọt" },
        { label: "Chi tiêu cho mỗi 100000 vnd", value: "+1.5 giọt" },
        { label: "Đánh giá sản phẩm", value: "+3 giọt" },
        { label: "Giới thiệu bạn bè thành công", value: "+50 giọt" },
        { label: "Sinh nhật", value: "+50 giọt" }
      ]
    },
    {
      name: "Nở rộ",
      slug: "no-ro",
      icon: "🌸",
      condition: "Tổng chi tiêu > 10 triệu",
      sortOrder: 3,
      benefits: [
        { label: "Đăng ký thành viên", value: "+ 10 giọt" },
        { label: "Đăng ký nhận letter qua email", value: "+ 10 giọt" },
        { label: "Chi tiêu cho mỗi 100000 vnd", value: "+2 giọt" },
        { label: "Đánh giá sản phẩm", value: "+3 giọt" },
        { label: "Giới thiệu bạn bè thành công", value: "+50 giọt" },
        { label: "Sinh nhật", value: "+50 giọt" }
      ]
    }
  ];

  for (const t of tiers) {
    const tier = await prisma.loyaltyTier.create({
      data: {
        name: t.name,
        slug: t.slug,
        icon: t.icon,
        condition: t.condition,
        sortOrder: t.sortOrder,
      }
    });

    await prisma.loyaltyBenefit.createMany({
      data: t.benefits.map((b, i) => ({
        label: b.label,
        value: b.value,
        sortOrder: i + 1,
        tierId: tier.id
      }))
    });
  }

  // 1. Seed Categories & Subcategories
  console.log("Seeding categories...");
  const categoriesToSeed = [
    { name: "Mỹ phẩm vi sinh Hoa Ngân", slug: "my-pham-vi-sinh-hoa-ngan" },
    { name: "Khuyến mãi", slug: "khuyen-mai" },
    { name: "Dụng cụ làm đẹp", slug: "dung-cu-lam-dep" },
    { name: "Sản phẩm dưỡng sinh", slug: "san-pham-duong-sinh" }
  ];

  const categoryMap: Record<string, string> = {};

  for (const cat of categoriesToSeed) {
    const created = await prisma.category.create({
      data: cat
    });
    categoryMap[cat.name] = created.id;
  }

  // Seed subcategories under Sản phẩm dưỡng sinh
  const subcategoriesToSeed = [
    { name: "Chăm sóc da mặt", slug: "cham-soc-da-mat", parentName: "Sản phẩm dưỡng sinh" },
    { name: "Chăm sóc da cơ thể", slug: "cham-soc-da-co-the", parentName: "Sản phẩm dưỡng sinh" },
    { name: "Chăm sóc sức khỏe", slug: "cham-soc-suc-khoe", parentName: "Sản phẩm dưỡng sinh" },
    { name: "Chăm sóc tóc", slug: "cham-soc-toc", parentName: "Sản phẩm dưỡng sinh" }
  ];

  for (const subcat of subcategoriesToSeed) {
    const parentId = categoryMap[subcat.parentName];
    const created = await prisma.category.create({
      data: {
        name: subcat.name,
        slug: subcat.slug,
        parentId: parentId
      }
    });
    categoryMap[`${subcat.parentName} -> ${subcat.name}`] = created.id;
  }

  // 2. Seed Tags
  console.log("Seeding tags...");
  const tagNames = [
    "Deal tháng",
    "Bán chạy nhất",
    "Deal tốt nhất",
    "Được yêu thích nhất",
    "Được yêu thích"
  ];

  for (const name of tagNames) {
    await prisma.tag.create({
      data: { name }
    });
  }

  // Helper to generate 3 themed gallery images for each product based on category
  const getGalleryImages = (categoryName: string, mainImage: string): string[] => {
    if (categoryName.includes("Mỹ phẩm")) {
      return [
        mainImage,
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800",
        "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800"
      ];
    } else if (categoryName.includes("Dụng cụ")) {
      return [
        mainImage,
        "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800"
      ];
    } else if (categoryName.includes("dưỡng sinh") || categoryName.includes("dưỡng")) {
      return [
        mainImage,
        "https://images.unsplash.com/photo-1512290923902-8a9f81da236c?q=80&w=800",
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800"
      ];
    }
    return [
      mainImage,
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800"
    ];
  };

  // 3. Seed Products
  console.log("Seeding products...");
  
  // Reviews are imported dynamically from reviews_seed_data.ts

  for (let index = 0; index < products.length; index++) {
    const p = products[index];
    const { features, skinConcerns, variants, images, rating, reviewsCount, category, subcategory, flag, ...rest } = p;

    // Resolve categoryId
    const catLookupKey = subcategory
      ? `${category} -> ${subcategory}`
      : category;
    const categoryId = categoryMap[catLookupKey];

    if (!categoryId) {
      throw new Error(`Category mapping not found for key: ${catLookupKey}`);
    }

    // Resolve tags
    const flagsToParse = flag ? flag.split('/').map(f => f.trim()) : [];
    const tagsToConnect = flagsToParse.filter(f => tagNames.includes(f));

    const galleryUrls = (images && images.length > 0)
      ? images
      : getGalleryImages(category, p.image);

    // Resolve reviews to create
    const reviewsToCreate = reviewsSeedData.filter(r => r.productId === p.id);
    if (reviewsToCreate.length === 0) {
      // Seed a high quality placeholder review for products without reviews in spreadsheet
      reviewsToCreate.push({
        productId: p.id,
        userName: "Khách hàng Alma",
        rating: 5,
        comment: "Sản phẩm lành tính và rất chất lượng. Sẽ tiếp tục ủng hộ Alma!",
        date: "28/04/2026",
        isVerifiedPurchase: true
      });
    }

    await prisma.product.create({
      data: {
        ...rest,
        rating: rating ?? 4.9,
        reviewsCount: reviewsToCreate.length,
        sortOrder: index,
        slug: p.slug ?? p.id,
        showOnHomepage: p.showOnHomepage ?? false,
        isPublished: p.isPublished ?? true,
        categoryId: categoryId,
        tags: {
          connect: tagsToConnect.map(name => ({ name }))
        },
        images: {
          create: galleryUrls.map((url, i) => ({
            url,
            sortOrder: i
          }))
        },
        reviews: {
          create: reviewsToCreate.map(r => ({
            userName: r.userName,
            rating: r.rating,
            comment: r.comment,
            date: r.date,
            isVerifiedPurchase: r.isVerifiedPurchase
          }))
        }
      }
    });
  }

  console.log("Seeding shipping zones and rates...");
  await prisma.shippingZone.create({
    data: {
      name: "Toàn quốc",
      code: "VN",
      rates: {
        create: {
          name: "Giao hàng tiêu chuẩn",
          baseFee: 30000,
          freeThreshold: 1000000,
          isActive: true,
        }
      }
    }
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
