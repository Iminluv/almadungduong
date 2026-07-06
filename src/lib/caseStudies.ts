export interface CaseStudyProduct {
  name: string;
  slug: string;
}

export interface CaseStudy {
  id: string;
  category: CaseCategory;
  name: string;
  info: string;
  condition: string;
  treatment: string;
  products: CaseStudyProduct[];
  /** Array of image URLs — first image is the primary/featured one */
  images: string[];
  driveLink: string;
}

export type CaseCategory =
  | "MỎNG YẾU"
  | "THÂM, NÁM"
  | "LÃO HÓA"
  | "VIÊM, MỤN"
  | "SẸO";

export const caseCategories: {
  id: string;
  label: CaseCategory;
  color: string;
  bgColor: string;
  borderColor: string;
  count: number;
  icon: string;
}[] = [
  {
    id: "mong-yeu",
    label: "MỎNG YẾU",
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    count: 1,
    icon: "🛡️",
  },
  {
    id: "tham-nam",
    label: "THÂM, NÁM",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    count: 3,
    icon: "✨",
  },
  {
    id: "lao-hoa",
    label: "LÃO HÓA",
    color: "text-violet-700",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    count: 2,
    icon: "⏳",
  },
  {
    id: "viem-mun",
    label: "VIÊM, MỤN",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    count: 5,
    icon: "🔬",
  },
  {
    id: "seo",
    label: "SẸO",
    color: "text-sky-700",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    count: 1,
    icon: "💎",
  },
];

export function getCategoryStyle(category: CaseCategory) {
  return (
    caseCategories.find((c) => c.label === category) ?? caseCategories[0]
  );
}

// Common products used across all case studies
const coreProducts: CaseStudyProduct[] = [
  {
    name: "Sữa rửa mặt nước băng — Glacier Foam Cleanser",
    slug: "sua-rua-mat-nuoc-bang-glacier",
  },
  {
    name: "Xịt dưỡng chuyên sâu — Miracle Essence",
    slug: "xit-duong-chuyen-sau-miracle",
  },
  {
    name: "Tinh chất tái sinh — Regenerating Serum 2.0",
    slug: "tinh-chat-tai-sinh-2-0",
  },
];

// Placeholder images — replace with actual before/after images from Google Drive
// Each case's `images` array should contain the actual images once downloaded
// from the Google Drive folders listed in `driveLink`
export const caseStudies: CaseStudy[] = [
  {
    id: "case-01",
    category: "MỎNG YẾU",
    name: "Chị Hà Anh",
    info: "Thạc sĩ, Giảng viên đại học · Hà Nội",
    condition:
      "Da mỏng, lộ mao mạch, mụn sần li ti không nhân, nám chân sâu gò má.",
    treatment:
      "Bôi thoa sản phẩm tại nhà\nKỹ thuật kết hợp: Phi kim",
    products: coreProducts,
    images: [
      "almadungduong/reviews/case-01/img-01",
      "almadungduong/reviews/case-01/img-02",
      "almadungduong/reviews/case-01/img-03"
    ],
    driveLink:
      "https://drive.google.com/drive/folders/10DmvDpYPlKaH-p08u5yd-4LvNkInuxTi",
  },
  {
    id: "case-02",
    category: "THÂM, NÁM",
    name: "Khách hàng nữ",
    info: "Thành phố Hồ Chí Minh",
    condition:
      "Da mỏng, lộ mao mạch, tăng và mất sắc tố do sử dụng mỹ phẩm chứa hóa chất độc hại.",
    treatment:
      "Bôi thoa sản phẩm tại nhà\nKỹ thuật kết hợp: Phi kim (8 lần) + Laser (8 lần) tại spa",
    products: coreProducts,
    images: [
      "almadungduong/reviews/case-02/img-01",
      "almadungduong/reviews/case-02/img-02"
    ],
    driveLink:
      "https://drive.google.com/drive/folders/18iSaZmybVqgqgmsoPXaYjlip4RaG4_kh",
  },
  {
    id: "case-03",
    category: "THÂM, NÁM",
    name: "Khách hàng nữ",
    info: "54 tuổi · Thành phố Hồ Chí Minh",
    condition:
      "Da mỏng, yếu, sờ vào thấy đau, tình trạng tăng sắc tố thể nặng và mất sắc tố ngay sau khi sử dụng sản phẩm chứa hóa chất.",
    treatment:
      "Bôi thoa sản phẩm tại nhà\nKỹ thuật kết hợp: Phi kim (2 lần) + Laser (2 lần) tại spa",
    products: coreProducts,
    images: [
      "almadungduong/reviews/case-03/img-01",
      "almadungduong/reviews/case-03/img-02",
      "almadungduong/reviews/case-03/img-03"
    ],
    driveLink:
      "https://drive.google.com/drive/folders/1hCk8z4s0CKLniLk7DUY2EA4d3YNEzGEL",
  },
  {
    id: "case-04",
    category: "THÂM, NÁM",
    name: "Khách hàng nữ",
    info: "Thành phố Hồ Chí Minh",
    condition:
      "Da nám chân sâu do nội tiết. Đã dùng nhiều phương pháp nhưng không cải thiện.",
    treatment:
      "Bôi thoa sản phẩm tại nhà\nKỹ thuật kết hợp: Phi kim + Laser (6 lần) tại spa",
    products: coreProducts,
    images: [
      "almadungduong/reviews/case-04/img-01",
      "almadungduong/reviews/case-04/img-02",
      "almadungduong/reviews/case-04/img-03",
      "almadungduong/reviews/case-04/img-04",
      "almadungduong/reviews/case-04/img-05",
      "almadungduong/reviews/case-04/img-06"
    ],
    driveLink:
      "https://drive.google.com/drive/folders/1ZzYMDk2PiiQl_8wwMa_4jJzXK6ZCDOB1",
  },
  {
    id: "case-05",
    category: "LÃO HÓA",
    name: "Khách hàng nữ",
    info: "Thành phố Hồ Chí Minh",
    condition:
      "Nếp nhăn sâu, da chảy xệ, lỗ chân lông to, môi nhiều nếp nhăn.",
    treatment:
      "Bôi thoa sản phẩm tại nhà\nKỹ thuật kết hợp: Phi kim",
    products: coreProducts,
    images: [
      "almadungduong/reviews/case-05/img-01",
      "almadungduong/reviews/case-05/img-02"
    ],
    driveLink:
      "https://drive.google.com/drive/folders/1ucvgL5WujzDG7yj-wVgjDv3UEFg19T_F",
  },
  {
    id: "case-06",
    category: "LÃO HÓA",
    name: "Khách hàng nữ",
    info: "Thành phố Hồ Chí Minh",
    condition:
      "Nếp nhăn sâu, da chảy xệ, sần sùi, lỗ chân lông to.",
    treatment: "Bôi thoa sản phẩm tại nhà",
    products: coreProducts,
    images: [
      "almadungduong/reviews/case-06/img-01",
      "almadungduong/reviews/case-06/img-02"
    ],
    driveLink:
      "https://drive.google.com/drive/folders/17KcSBuNKXDtBS6Ih_72zOzh1tNnkJkIf",
  },
  {
    id: "case-07",
    category: "VIÊM, MỤN",
    name: "Khách hàng nữ",
    info: "Thành phố Hồ Chí Minh",
    condition:
      "Da hay nổi mụn (mụn li ti, không nhân, mụn mủ) sau khi hết mủ để lại vết thâm sâu. Soi da xuống trung bì thấy bí tắc nhiều.",
    treatment: "Bôi thoa sản phẩm tại nhà",
    products: coreProducts,
    images: [
      "almadungduong/reviews/case-07/img-01",
      "almadungduong/reviews/case-07/img-02",
      "almadungduong/reviews/case-07/img-03"
    ],
    driveLink:
      "https://drive.google.com/drive/folders/1WQXINZYwuv2JFz8xVPmk0b6aSolwE8Ud",
  },
  {
    id: "case-08",
    category: "VIÊM, MỤN",
    name: "Khách hàng nam",
    info: "22 tuổi · Thành phố Hồ Chí Minh",
    condition:
      "Da dầu nhờn nhiều, mụn tắc nghẽn, mụn nang ăn luồn dưới da, thâm mụn, nguy cơ cao để lại sẹo rỗ sau mụn. Da mụn tuổi dậy thì kết hợp thói quen chăm sóc da chưa phù hợp.",
    treatment: "Bôi thoa sản phẩm tại nhà",
    products: coreProducts,
    images: [
      "almadungduong/reviews/case-08/img-01",
      "almadungduong/reviews/case-08/img-02",
      "almadungduong/reviews/case-08/img-03"
    ],
    driveLink:
      "https://drive.google.com/drive/folders/193pvUE0hWupTvA1ST3kK5TItCocNlHVS",
  },
  {
    id: "case-09",
    category: "VIÊM, MỤN",
    name: "Khách hàng nữ",
    info: "27 tuổi · Thành phố Hồ Chí Minh",
    condition:
      "Tình trạng viêm nặng, mụn nang luồn dưới da, thâm mụn, nguy cơ cao để lại sẹo rỗ sau mụn.",
    treatment:
      "Bôi thoa sản phẩm tại nhà\nKỹ thuật kết hợp: Lấy nhân mụn tại spa",
    products: coreProducts,
    images: [
      "almadungduong/reviews/case-09/img-01",
      "almadungduong/reviews/case-09/img-02",
      "almadungduong/reviews/case-09/img-03"
    ],
    driveLink:
      "https://drive.google.com/drive/folders/1_PNztQQ9nF_5lj0gn8o8RjBb0eFdWi16",
  },
  {
    id: "case-10",
    category: "SẸO",
    name: "Khách hàng nam",
    info: "Thành phố Hồ Chí Minh",
    condition:
      "Da dầu nhờn, mụn tắc nghẽn, sẹo rỗ lâu năm và nếp nhăn sâu vùng má.",
    treatment:
      "Bôi thoa sản phẩm tại nhà\nKỹ thuật kết hợp: Phi kim (3 lần) + Lăn kim (1 lần) + Massage",
    products: coreProducts,
    images: [
      "almadungduong/reviews/case-10/img-01",
      "almadungduong/reviews/case-10/img-02",
      "almadungduong/reviews/case-10/img-03"
    ],
    driveLink:
      "https://drive.google.com/drive/folders/1GPsha7qDwf5XKN5HThdmlCYpeX4o2k7b",
  },
  {
    id: "case-11",
    category: "VIÊM, MỤN",
    name: "Khách hàng nữ",
    info: "26 tuổi · Thành phố Hồ Chí Minh",
    condition:
      "Viêm da tiết bã lâu năm, đã sử dụng nhiều phương pháp Tây y nhưng vẫn tái lại.",
    treatment: "Bôi thoa sản phẩm tại nhà",
    products: coreProducts,
    images: [
      "almadungduong/reviews/case-11/img-01",
      "almadungduong/reviews/case-11/img-02"
    ],
    driveLink:
      "https://drive.google.com/drive/folders/1KZiBCUYBKqdY_h4llGGgVJb9IUPR2uNz",
  },
  {
    id: "case-12",
    category: "VIÊM, MỤN",
    name: "Chị Kiều Mỹ",
    info: "28 tuổi · Thành phố Hồ Chí Minh",
    condition:
      "Mụn nội tiết (mụn ẩn, không nhân, mụn viêm tái đi tái lại), da bít tắc, dầu nhiều vùng chữ T, mụn thường để lại thâm mụn.",
    treatment: "Bôi thoa sản phẩm tại nhà",
    products: coreProducts,
    images: [
      "almadungduong/reviews/case-12/img-01",
      "almadungduong/reviews/case-12/img-02",
      "almadungduong/reviews/case-12/img-03",
      "almadungduong/reviews/case-12/img-04",
      "almadungduong/reviews/case-12/img-05",
      "almadungduong/reviews/case-12/img-06"
    ],
    driveLink:
      "https://drive.google.com/drive/folders/1uWcyD9A-iDzS21vj066mwaxISbLVEVsw",
  },
];

// Treatment method descriptions for the methodology section
export const treatmentMethods = [
  {
    id: "home-care",
    title: "Bôi thoa tại nhà",
    subtitle: "Home Care Routine",
    description:
      "Liệu trình cơ bản nhất — sử dụng bộ 3 sản phẩm vi sinh Hoa Ngân theo lộ trình chuẩn. Phù hợp cho mọi loại da và mọi vấn đề da.",
    icon: "🏡",
  },
  {
    id: "phi-kim",
    title: "Kết hợp Phi kim",
    subtitle: "Microneedling Combo",
    description:
      "Kỹ thuật vi kim tạo vi kênh dẫn giúp hoạt chất vi sinh thấm sâu vào biểu bì. Tăng hiệu quả tái tạo cho da sẹo, lão hóa, và mỏng yếu.",
    icon: "💉",
  },
  {
    id: "laser",
    title: "Kết hợp Laser & Spa",
    subtitle: "Advanced Clinical",
    description:
      "Phối hợp công nghệ laser/lăn kim tại spa chuyên nghiệp cùng liệu trình vi sinh tại nhà. Dành cho các ca nặng: thâm nám sâu, sẹo rỗ, lão hóa nặng.",
    icon: "⚡",
  },
];
