import { prisma } from "../src/lib/db";

async function main() {
  console.log("Seeding loyalty data...");

  // Clean existing data
  await prisma.loyaltyBenefit.deleteMany();
  await prisma.loyaltyTier.deleteMany();
  await prisma.loyaltyConfig.deleteMany();

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
