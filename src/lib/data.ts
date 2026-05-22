export interface Product {
  id: string;
  title: string;
  englishName?: string;
  category: string;
  flag?: string;
  image: string;
  images?: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  fullDescription?: string;
  ingredients?: string;
  certifications?: string;
  usage?: string;
  volume?: string;
  gift?: string;
  features: string[];
  skinConcerns: string[];
  variants?: string[];
}

export interface SkinConcern {
  id: string;
  label: string;
  count: number;
  description: string;
}

export const products: Product[] = [
  {
    "id": "xit-duong-chuyen-sau-miracle",
    "title": "XỊT DƯỠNG CHUYÊN SÂU",
    "category": "Mỹ phẩm vi sinh Hoa Ngân",
    "price": 499000,
    "rating": 4.9,
    "reviewsCount": 103,
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8ff5?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "englishName": "BIO MIRACLE ESSENCE",
    "volume": "50ml",
    "fullDescription": "Giải pháp nuôi dưỡng chuyên sâu đa tầng dành cho làn da. Đặc biệt dùng cho da quá mỏng yếu, tổn thương nhiều, lộ mạch máu.\n\nCung cấp lợi khuẩn sống - Phục hồi hàng rào bảo vệ da \nLactobacillus spp. và Bacillus spp. được chứng minh là 02 lợi khuẩn quan trọng đối với sức khoẻ làn da nhờ khả năng cân bằng Hệ Vi Sinh da bị rối loạn, tăng cường sức khoẻ của 3 hàng rào bảo vệ da (Vật lý, Hoá học, Sinh học), ngăn ngừa lão hóa, làm sáng da, dưỡng ẩm và hỗ trợ xử lý các vấn đề da.\n\nCông trình 20 năm nghiên cứu của Chúng tôi tập trung phát triển, thuần hoá Hệ Lợi Khuẩn Lactobacillus spp. và Bacillus spp. chuyên biệt với sức đề kháng cao để mang lại hiệu quả tối đa trên da. \n\nThảo dược bản địa tự nhiên - Công nghệ vi sinh \nThảo Dược tự nhiên được trồng và khai thác tại những vùng có thổ nhưỡng tốt nhất tại Việt Nam và đáp ứng các tiêu chuẩn khắt khe: không phân bón hóa học, không thuốc bảo vệ thực vật, không chất kích thích tăng trưởng, không chất bảo quản,…\nBằng Công Nghệ Vi Sinh, Chúng tôi LOẠI BỎ ĐỘC TỐ tự nhiên đồng thời GIỮ LẠI TRỌN VẸN DƯỢC TÍNH của Thảo Dược hướng hữu cơ, giúp tối ưu hóa hiệu quả và mang đến dòng sản phẩm an toàn, chứa đựng sức mạnh thuần khiết từ thiên nhiên. \n\nCông Dụng\nCấp ẩm chuyên sâu, cân bằng và duy trì độ ẩm cho da\nCải thiện dấu hiệu lão hoá\nCải thiện độ đàn hồi \nMang lại vẻ ngoài căng bóng, rạng rỡ \nSạch nhờn & se chân lông\nLàm mát da\nHỗ trợ chăm sóc làn da tiếp xúc thường xuyên với nắng, môi trường ô nhiễm và khói bụi",
    "ingredients": "Water (Nước)\nAloe Barbadensis Extract (Chiết xuất Lô Hội)\nHydrolyzed Swiftlet Nest Extract (Chiết xuất Tổ Yến)\nLactobacillus\nBacillus\nSaccharomyces",
    "certifications": "Độ An Toàn Của Sản Phẩm Đáp Ứng Các Tiêu Chí KHÔNG:\nĐã được kiểm nghiệm Chỉ tiêu kích ứng da\nKhông chứa chất hóa học Corticoid\nKhông chứa hương liệu và màu nhân tạo\nKhông chứa chất bảo quản gây hại\nKhông chứa cồn xấu\nKhông chứa Paraben và dầu khoáng",
    "description": "Giải pháp nuôi dưỡng chuyên sâu đa tầng dành cho làn da. Đặc biệt dùng cho da quá mỏng yếu, tổn thương nhiều, lộ mạch máu."
  },
  {
    "id": "tinh-chat-tai-sinh-2-0",
    "title": "TINH CHẤT TÁI SINH VI SINH 2.0",
    "category": "Mỹ phẩm vi sinh Hoa Ngân",
    "price": 549000,
    "rating": 4.9,
    "reviewsCount": 104,
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "englishName": "BIO REGENERATING ESSENCE VI SINH 2.0",
    "volume": "50ml",
    "fullDescription": "Giải pháp chuẩn Khoa Học Vi Sinh giúp hỗ trợ làm sạch bã nhờn dư thừa và các tạp chất tích tụ trên bề mặt da, hỗ trợ xử lý các vấn đề da, đưa làn da trở về trạng thái cân bằng và khỏe mạnh tự nhiên.\nDành cho: da nhạy cảm, da mỏng, yếu, nổi mạch máu… với độ thải độc nhẹ.\n\nCông Dụng\nHỗ trợ cải thiện mụn & ngăn ngừa các nguyên nhân gây mụn\nLàm đều màu da, bề mặt da sáng khỏe\nCải thiện độ đàn hồi. Mang lại vẻ ngoài căng bóng và rạng rỡ\nSạch dầu nhờn & sợi bã nhờn dư thừa\nCho bề mặt da láng mịn\nSe khít lỗ chân lông\nHỗ trợ chăm sóc làn da tiếp xúc thường xuyên với môi trường khói bụi",
    "ingredients": "Water (Nước)\nLonicera Japonica Extract (Chiết xuất Hoa Kim Ngân)\nCynara Scolymus Leaf Extract (Chiết xuất Atiso)\nRosa Centifolia Extract (Chiết xuất Hoa Hồng)\nHouttuynia Cordata Extract (Chiết xuất cây Diếp Cá)\nCrinum Latifolium Extract (Chiết xuất Trinh Nữ Hoàng Cung)\nLactobacillus spp.\nBacillus spp.",
    "certifications": "Độ An Toàn Của Sản Phẩm Đáp Ứng Các Tiêu Chí KHÔNG:\nĐã được kiểm nghiệm Chỉ tiêu kích ứng da\nKhông chứa chất hóa học Corticoid\nKhông chứa hương liệu và màu nhân tạo\nKhông chứa chất bảo quản gây hại\nKhông chứa cồn xấu\nKhông chứa Paraben và dầu khoáng",
    "usage": "Giải pháp nuôi dưỡng chuyên sâu đa tầng dành cho làn da. Đặc biệt dùng cho da quá mỏng yếu, tổn thương nhiều, lộ mạch máu.",
    "description": "Giải pháp chuẩn Khoa Học Vi Sinh giúp hỗ trợ làm sạch bã nhờn dư thừa và các tạp chất tích tụ trên bề mặt da, hỗ trợ xử lý các vấn đề da, đưa làn da t..."
  },
  {
    "id": "tinh-chat-tai-sinh-2-7",
    "title": "TINH CHẤT TÁI SINH VI SINH 2.7",
    "category": "Mỹ phẩm vi sinh Hoa Ngân",
    "price": 549000,
    "rating": 4.9,
    "reviewsCount": 105,
    "image": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "englishName": "BIO REGENERATING ESSENCE VI SINH 2.7",
    "volume": "50ml",
    "fullDescription": "Giải pháp chuẩn Khoa Học Vi Sinh giúp hỗ trợ làm sạch bã nhờn dư thừa và các tạp chất tích tụ trên bề mặt da, hỗ trợ xử lý các vấn đề da, đưa làn da trở về trạng thái cân bằng và khỏe mạnh tự nhiên.\nDành cho: da dầu, da hỗn hợp, da thường, da khô với độ thải độc mạnh.\n\nCông Dụng\nHỗ trợ cải thiện mụn & ngăn ngừa các nguyên nhân gây mụn\nLàm đều màu da, bề mặt da sáng khỏe\nCải thiện độ đàn hồi. Mang lại vẻ ngoài căng bóng và rạng rỡ\nSạch dầu nhờn & sợi bã nhờn dư thừa\nCho bề mặt da láng mịn\nSe khít lỗ chân lông\nHỗ trợ chăm sóc làn da tiếp xúc thường xuyên với môi trường khói bụi",
    "ingredients": "Water (Nước)\nLonicera Japonica Extract (Chiết xuất Hoa Kim Ngân)\nCynara Scolymus Leaf Extract (Chiết xuất Atiso)\nRosa Centifolia Extract (Chiết xuất Hoa Hồng)\nHouttuynia Cordata Extract (Chiết xuất cây Diếp Cá)\nCrinum Latifolium Extract (Chiết xuất Trinh Nữ Hoàng Cung)\nLactobacillus spp.\nBacillus spp.",
    "certifications": "Độ An Toàn Của Sản Phẩm Đáp Ứng Các Tiêu Chí KHÔNG:\nĐã được kiểm nghiệm Chỉ tiêu kích ứng da\nKhông chứa chất hóa học Corticoid\nKhông chứa hương liệu và màu nhân tạo\nKhông chứa chất bảo quản gây hại\nKhông chứa cồn xấu\nKhông chứa Paraben và dầu khoáng",
    "description": "Giải pháp chuẩn Khoa Học Vi Sinh giúp hỗ trợ làm sạch bã nhờn dư thừa và các tạp chất tích tụ trên bề mặt da, hỗ trợ xử lý các vấn đề da, đưa làn da t..."
  },
  {
    "id": "sua-rua-mat-nuoc-bang-glacier",
    "title": "SỮA RỬA MẶT NƯỚC BĂNG",
    "category": "Mỹ phẩm vi sinh Hoa Ngân",
    "price": 449000,
    "rating": 4.9,
    "reviewsCount": 106,
    "image": "https://images.unsplash.com/photo-1556228444-7164923f1489?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "englishName": "GLACIER FOAM CLEANSER",
    "volume": "100g",
    "fullDescription": "Chứa Nước Băng Alaska tinh khiết giúp làm sạch sâu, dưỡng trắng, căng bóng, mềm mịn, se lỗ chân lông, khắc phục tình trạng da khô sạm.\n\nCông Dụng\nNhẹ nhàng rửa sạch lớp tế bào chết, bã nhờn và bụi bẩn trên bề mặt da\nCung cấp độ ẩm và dưỡng chất khắc phục tình trạng da khô sạm\nSe chân lông\nHỗ trợ làm trắng sáng da, giúp da mịn màng căng bóng ngay sau khi rửa mặt\nHỗ trợ làm dịu và ngăn ngừa mụn\nGiúp ngăn ngừa, làm mờ thâm, nám, tàn nhang\nCải thiện các dấu hiệu lão hóa và độ đàn hồi của da",
    "ingredients": "Water (Nước băng Alaska Glacier), Sodium Methyl Oleoyl Taurate, Lauryl Glucoside, Glycerin, Butylene Glycol, Cocamidopropyl Betaine, Sodium Lauroyl Methyl Isethionate, Betaine, Niacinamide, 1,2-Hexanediol, Sodium PCA, Coco-Glucoside, Panthenol, Allantoin, Citric Acid, Hydroxyacetophenone, Disodium EDTA, Hyaluronic Acid, Rose Flower Oil (Tinh dầu Hoa Hồng), Resveratrol.",
    "certifications": "Độ An Toàn Của Sản Phẩm Đáp Ứng Các Tiêu Chí KHÔNG\nKhông chứa sulfate (SLS/SLES)\nKhông hương liệu & màu nhân tạo\nKhông chất bảo quản\nKhông cồn xấu\nKhông Paraben & dầu khoáng",
    "usage": "Hướng Dẫn Sử Dụng\nBước 1: Làm ướt da mặt. Sau đó, ấn vòi xịt 2 – 3 lần ra lòng bàn tay một lượng bọt vừa đủ massage khắp da mặt. Sữa Rửa Mặt Nước Băng Glacier Foam Cleanser là loại sữa rửa mặt tạo bọt nên bạn không cần phải tạo bọt thủ công.\n\nBước 2: Massage kỹ khoảng 90 giây để Sữa Rửa Mặt Nước Băng Glacier Foam Cleanser có thể giúp lấy hết bụi bẩn cũng như cặn bã nhờn nằm sâu dưới da. Đồng thời, quá trình này giúp cho các mạch máu dưới da được lưu thông tốt hơn.\n\nĐối với Sữa Rửa Mặt Nước Băng Glacier Foam Cleanser, bạn cứ thoải mái massage và rửa sạch vùng da quanh mắt mà không gây kích ứng hay cay mắt. Điều này cũng cho thấy độ lành tính của sản phẩm rất cao. Vùng mắt là nơi thường phải make up, kẻ mắt, mascara, đánh phấn nhiều nếu không rửa sạch sẽ rất dễ khiến da nhanh lão hóa và mau có nếp nhăn, quầng thâm.\n\nBước 3: Rửa lại bằng nước. Quá trình rửa mặt càng kỹ thì các bước dưỡng da sau càng có hiệu quả.\n\nLưu ý:\n– Không nên dùng khăn mặt hoặc khăn giấy để lau khô. Như vậy, sẽ khiến các bụi khăn dính lên da sẽ dễ gây mụn và các vấn đề khác cho da. \n– Chỉ nên dùng bông tẩy trang để lau hoặc để da tự khô tự nhiên.",
    "description": "Chứa Nước Băng Alaska tinh khiết giúp làm sạch sâu, dưỡng trắng, căng bóng, mềm mịn, se lỗ chân lông, khắc phục tình trạng da khô sạm."
  },
  {
    "id": "kem-chong-nang-smart-suncare",
    "title": "KEM CHỐNG NẮNG PHỔ RỘNG",
    "category": "Mỹ phẩm vi sinh Hoa Ngân",
    "price": 799000,
    "rating": 4.9,
    "reviewsCount": 107,
    "image": "https://images.unsplash.com/photo-1556228444-2457636e74fc?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "englishName": "SMART SUNCARE SPF 123 & UVA-PF 79",
    "volume": "30g",
    "fullDescription": "Với chỉ số SPF 123 & UVA-PF 79 vượt trội, Công thức đột phá cùng Màng lọc thông minh thế hệ mới ngăn bụi mịn, bảo vệ toàn diện trước tia UVA, UVB, ánh sáng xanh và ô nhiễm môi trường đô thị.\n\nBước Đột Phá Trong Công Nghệ Chống Nắng Cao Cấp:\nNước Băng Alaska tinh khiết\nMàng lọc chống nắng thế hệ mới, thông minh không cần tẩy trang.\nKết cấu mỏng nhẹ, không nhờn rít.\nChỉ số chống nắng được kiểm nghiệm cao vượt trội lên đến SPF 123, UVA-PF 79.\nChỉ 1 lần thoa, bảo vệ da toàn diện lên đến 12 tiếng, không cần thoa lại nhiều lần.\nThích hợp với mọi loại da kể cả da nhạy cảm và da thường xuyên kích ứng với các sản phẩm kem chống nắng khác.\n\n\nCông Dụng/Hiệu Quả\nChống nắng phổ rộng trước nhiều loại tia gây hại cho da: UVA, UVB, ánh sáng xanh,…\nBảo vệ da trước ô nhiễm, bụi mịn, bụi kim loại, do đó chỉ cần loại bỏ sạch bằng Sữa Rửa Mặt Nước Băng Glacier Foam Cleanser, không cần tẩy trang.\nLàm mờ và ngăn ngừa sạm, nám, tàn nhang\nCải thiện các dấu hiệu lão hóa\nLàm sáng và trắng da",
    "ingredients": "Water, Zinc Oxide, Ethylhexyl Methoxycinnamate (5%), Propanediol, Niacinamide, C13-15 Alkane, Glycerin, Cetearyl Alcohol & Cetearyl Glucoside, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Betaine, Bisabolol, Arbutin, 1,2 Hexanediol, Panthenol, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Allantoin, Xanthan Gum, Triethoxycaprylylsilane, Polyhydroxystearic Acid, Adenosine, Rosa Centifolia Flower Extract, Copper Tripeptide-1, Palmitoyl Pentapeptide-4, Palmitoyl Tripeptide-5, Palmitoyl oligopeptide, Acetyl tetrapeptide-5, Hexapeptide-3.",
    "certifications": "Độ An Toàn Đạt Tiêu Chuẩn EWG Và FDA Của Mỹ:\nKhông gây đỏ rát & kích ứng da\nKhông Paraben & dầu khoáng\nKhông hương liệu\nKhông chất bảo quản\nKhông cồn xấu",
    "usage": "Hướng Dẫn Sử Dụng\nLấy một lượng vừa đủ, thoa đều và dùng tay vỗ nhẹ lên da mặt hoặc vùng da cần chống nắng.\nThoa sau khi sử dụng Xịt Dưỡng Miracle Essence để đạt hiệu quả tối ưu nhất.\nLưu Ý:\nThoa Kem Chống Nắng Smart Suncare trước khi ra ngoài từ 30 phút\nCó thể sử dụng như lớp lót trang điểm",
    "description": "Với chỉ số SPF 123 & UVA-PF 79 vượt trội, Công thức đột phá cùng Màng lọc thông minh thế hệ mới ngăn bụi mịn, bảo vệ toàn diện trước tia UVA, UVB, ánh..."
  },
  {
    "id": "combo-1-trang-sang",
    "title": "COMBO 1:\nTRẮNG SÁNG, CĂNG BÓNG, CẢI THIỆN CÁC DẤU HIỆU LÃO HÓA",
    "category": "Mỹ phẩm vi sinh Hoa Ngân",
    "price": 1747000,
    "rating": 4.9,
    "reviewsCount": 108,
    "image": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "originalPrice": 2246000,
    "flag": "Deal tháng/ Bán chạy nhất",
    "gift": "– Miễn phí vận chuyển toàn quốc \n– Tặng mặt nạ ủ  \n– Tư vấn 1-1 trọn đời tới khi da đẹp\n\nTặng thêm: \n- Bông tẩy trang Muji với đơn hàng từ 2 triệu\n\nNhận quà ngay khi đăng ký thành viên",
    "fullDescription": "MUA       \n– 1 Xịt Dưỡng Chuyên Sâu Miracle Essence (50ml)\n– 1 Sữa Rửa Mặt Nước Băng Glacier Foam Cleanser (100g)\n– 1 Kem Chống Nắng Smart Suncare (30g)\nTẶNG        1 Xịt Dưỡng Chuyên Sâu Miracle Essence (50ml)\n\nXỊT DƯỠNG CHUYÊN SÂU MIRACLE ESSENCE\nCấp ẩm chuyên sâu, cân bằng và duy trì độ ẩm cho da\nCải thiện dấu hiệu lão hóa\nCải thiện độ đàn hồi \nMang lại vẻ ngoài căng bóng, rạng rỡ \nSạch nhờn & se chân lông\nLàm mát da\nHỗ trợ chăm sóc làn da tiếp xúc thường xuyên với nắng, môi trường ô nhiễm và khói bụi\nSỮA RỬA MẶT NƯỚC BĂNG GLACIER FOAM CLEANSER\nNhẹ nhàng rửa sạch lớp tế bào chết, bã nhờn và bụi bẩn trên bề mặt da\nCung cấp độ ẩm và dưỡng chất khắc phục tình trạng da khô sạm\nSe chân lông\nHỗ trợ làm trắng sáng da, giúp da mịn màng căng bóng ngay sau khi rửa mặt\nHỗ trợ làm dịu và ngăn ngừa mụn\nGiúp ngăn ngừa, làm mờ thâm, nám, tàn nhang\nCải thiện các dấu hiệu lão hóa và độ đàn hồi da\nKEM CHỐNG NẮNG PHỔ RỘNG SMART SUNCARE:\nChỉ số chống nắng SPF123 UVA-PF 79 cao hơn các sản phẩm trên thị trường\nBảo vệ da bền vững suốt 12H khỏi tia UVA, UVB, tia hồng ngoại IR và ánh sáng xanh\nKết cấu mỏng nhẹ, thấm nhanh, không bết rít\nKem chống nắng nền dưỡng, vừa chống nắng vừa dưỡng trắng\nMàng lọc thông minh thế hệ mới không cần tẩy trang.",
    "description": "MUA       "
  },
  {
    "id": "combo-2-phuc-hoi",
    "title": "COMBO 2:\nCẢI THIỆN CÁC VẤN ĐỀ DA",
    "category": "Mỹ phẩm vi sinh Hoa Ngân",
    "price": 2296000,
    "rating": 4.9,
    "reviewsCount": 109,
    "image": "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "originalPrice": 2795000,
    "flag": "Deal tháng/ Bán chạy nhất",
    "gift": "– Miễn phí vận chuyển toàn quốc \n– Tặng mặt nạ ủ  \n– Tư vấn 1-1 trọn đời tới khi da đẹp\n\nTặng thêm: \n- Bông tẩy trang Muji với đơn hàng từ 2 triệu\n\nNhận quà ngay khi đăng ký thành viên",
    "fullDescription": "MUA        \n– 1 Sữa Rửa Mặt Nước Băng Glacier Foam Cleanser (100g)\n– 1 Tinh Chất Vi Sinh 2.0/2.7 (50ml)\n– 1 Xịt Dưỡng Chuyên Sâu Miracle Essence (50ml)\n– 1 Kem Chống Nắng Smart Suncare (30g)\nTẶNG        1 Xịt Dưỡng Chuyên Sâu Miracle Essence (50ml)\n\nCOMBO TÁI SINH TOÀN DIỆN\nHỗ trợ chăm sóc và cải thiện các vấn đề da\nCombo Tái Sinh Toàn Diện là bộ sản phẩm chăm sóc da được xây dựng dành riêng cho làn da đang gặp nhiều vấn đề như: khô căng, xỉn màu, lỗ chân lông to, da dễ nổi mụn hoặc thường xuyên bị kích ứng do môi trường, mỹ phẩm,…\n\nLưu ý: Hiệu quả sử dụng có thể khác nhau tùy theo lượng bã nhờn dư thừa, các tạp chất trên da và cách sử dụng. Nên sử dụng đều đặn và theo hướng dẫn của Nhà máy Sản xuất để đạt kết quả tối ưu.\n\nKEM CHỐNG NẮNG PHỔ RỘNG SMART SUNCARE:\n🔹Chỉ số chống nắng SPF123 UVA-PF 79 cao hơn các sản phẩm trên thị trường\n🔹Bảo vệ da bền vững suốt 12H khỏi tia UVA, UVB, tia hồng ngoại IR và ánh sáng xanh\n🔹Kết cấu mỏng nhẹ, thấm nhanh, không bết rít\n🔹Kem chống nắng nền dưỡng, vừa chống nắng vừa dưỡng trắng\n🔹Màng lọc thông minh thế hệ mới không cần tẩy trang.",
    "description": "MUA        "
  },
  {
    "id": "combo-3-toan-dien",
    "title": "COMBO 3:\nCHĂM SÓC DA TOÀN DIỆN",
    "category": "Khuyến mãi",
    "price": 998000,
    "rating": 4.9,
    "reviewsCount": 110,
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "originalPrice": 1497000,
    "flag": "Deal tháng/ Deal tốt nhất/ Bán chạy nhất",
    "gift": "– Miễn phí vận chuyển toàn quốc \n– Tặng mặt nạ ủ  \n– Tư vấn 1-1 trọn đời tới khi da đẹp\n\nTặng thêm: \n- Bông tẩy trang Muji với đơn hàng từ 2 triệu\n\nNhận quà ngay khi đăng ký thành viên",
    "fullDescription": "MUA          2 Xịt Dưỡng Chuyên Sâu (50ml)\nTẶNG        1 Xịt Dưỡng Chuyên Sâu (50ml)\n\nCombo ưu đãi từ Nhà máy Sản xuất Mỹ Phẩm Vi Sinh Hoa Ngân với Xịt Dưỡng Chuyên Sâu Miracle Essence với đa dạng công dụng chăm sóc da chuẩn Khoa Học Vi Sinh.",
    "description": "MUA          2 Xịt Dưỡng Chuyên Sâu (50ml)"
  },
  {
    "id": "combo-4-tinh-gon",
    "title": "COMBO 4:\nGIẢI PHÁP CHĂM SÓC DA ĐƠN GIẢN & TINH GỌN",
    "category": "Mỹ phẩm vi sinh Hoa Ngân",
    "price": 1547000,
    "rating": 4.9,
    "reviewsCount": 111,
    "image": "https://images.unsplash.com/photo-1556228366-2457636e74fc?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "originalPrice": 2046000,
    "flag": "Deal tháng/ Được yêu thích nhất",
    "gift": "– Miễn phí vận chuyển toàn quốc \n– Tặng mặt nạ ủ  \n– Tư vấn 1-1 trọn đời tới khi da đẹp\n\nTặng thêm: \n- Bông tẩy trang Muji với đơn hàng từ 2 triệu\n\nNhận quà ngay khi đăng ký thành viên",
    "fullDescription": "MUA        \n– 1 Sữa Rửa Mặt Nước Băng Glacier Foam Cleanser (100g)\n– 2 Tinh Chất Vi Sinh 2.0/2.7 (50ml)\nTẶNG        1 Xịt Dưỡng Chuyên Sâu Miracle Essence (50ml)\n\nCOMBO TÁI SINH TOÀN DIỆN\nHỗ trợ chăm sóc và cải thiện các vấn đề da\nCombo Tái Sinh Toàn Diện là bộ sản phẩm chăm sóc da được xây dựng dành riêng cho làn da đang gặp nhiều vấn đề: khô căng, xỉn màu, lỗ chân lông to, da dễ nổi mụn hoặc thường xuyên bị kích ứng do môi trường, mỹ phẩm,…",
    "description": "MUA        "
  },
  {
    "id": "lan-kim",
    "title": "Lăn kim",
    "category": "Dụng cụ làm đẹp",
    "price": 150000,
    "rating": 4.9,
    "reviewsCount": 112,
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8ff5?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "description": "Lăn kim - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "chai-kho-mat",
    "title": "Chải khô mặt",
    "category": "Dụng cụ làm đẹp",
    "price": 235000,
    "rating": 4.9,
    "reviewsCount": 113,
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "description": "Chải khô mặt - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "guasha",
    "title": "Guasha",
    "category": "Dụng cụ làm đẹp",
    "price": 595000,
    "rating": 4.9,
    "reviewsCount": 114,
    "image": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "description": "Guasha - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "chai-kho-co-the",
    "title": "Chải khô cơ thể",
    "category": "Dụng cụ làm đẹp",
    "price": 335000,
    "rating": 4.9,
    "reviewsCount": 115,
    "image": "https://images.unsplash.com/photo-1556228444-7164923f1489?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "description": "Chải khô cơ thể - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "mat-na-u-nilon",
    "title": "Mặt nạ ủ nilon",
    "category": "Dụng cụ làm đẹp",
    "price": 10000,
    "rating": 4.9,
    "reviewsCount": 116,
    "image": "https://images.unsplash.com/photo-1556228444-2457636e74fc?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "description": "Mặt nạ ủ nilon - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "bong-tay-trang-muji",
    "title": "Bông tẩy trang Muji",
    "category": "Dụng cụ làm đẹp",
    "price": 70000,
    "rating": 4.9,
    "reviewsCount": 117,
    "image": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "description": "Bông tẩy trang Muji - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "toner-hoa-hong",
    "title": "Toner Hoa hồng",
    "category": "Sản phẩm dưỡng sinh",
    "price": 168000,
    "rating": 4.9,
    "reviewsCount": 118,
    "image": "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "100ml",
    "description": "Toner Hoa hồng - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "toner-tia-to",
    "title": "Toner Tía tô",
    "category": "Sản phẩm dưỡng sinh",
    "price": 138000,
    "rating": 4.9,
    "reviewsCount": 119,
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "100ml",
    "description": "Toner Tía tô - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "toner-hoa-cuc",
    "title": "Toner Hoa cúc",
    "category": "Sản phẩm dưỡng sinh",
    "price": 168000,
    "rating": 4.9,
    "reviewsCount": 120,
    "image": "https://images.unsplash.com/photo-1556228366-2457636e74fc?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "100ml",
    "description": "Toner Hoa cúc - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "nuoc-tay-trang-tia-to-hoa-hong",
    "title": "Nước tẩy trang Tía tô & Hoa hồng",
    "category": "Sản phẩm dưỡng sinh",
    "price": 233000,
    "rating": 4.9,
    "reviewsCount": 121,
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8ff5?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "300ml",
    "description": "Nước tẩy trang Tía tô & Hoa hồng - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "xa-bong-nghe-hoa-hong",
    "title": "Xà bông Nghệ Hoa hồng",
    "category": "Sản phẩm dưỡng sinh",
    "price": 89000,
    "rating": 4.9,
    "reviewsCount": 122,
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "105gr",
    "description": "Xà bông Nghệ Hoa hồng - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "xa-bong-gung-tram-que",
    "title": "Xà bông Gừng Tràm Quế",
    "category": "Sản phẩm dưỡng sinh",
    "price": 89000,
    "rating": 4.9,
    "reviewsCount": 123,
    "image": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "105gr",
    "description": "Xà bông Gừng Tràm Quế - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "mat-na-hoa-hong",
    "title": "Mặt nạ hoa hồng",
    "category": "Sản phẩm dưỡng sinh",
    "price": 168000,
    "rating": 4.9,
    "reviewsCount": 124,
    "image": "https://images.unsplash.com/photo-1556228444-7164923f1489?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "50gr",
    "description": "Mặt nạ hoa hồng - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "mat-na-tia-to",
    "title": "Mặt nạ tía tô",
    "category": "Sản phẩm dưỡng sinh",
    "price": 158000,
    "rating": 4.9,
    "reviewsCount": 125,
    "image": "https://images.unsplash.com/photo-1556228444-2457636e74fc?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "50gr",
    "description": "Mặt nạ tía tô - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "mat-na-nghe-phuc-hoi",
    "title": "Mặt nạ nghệ phục hồi",
    "category": "Sản phẩm dưỡng sinh",
    "price": 198000,
    "rating": 4.9,
    "reviewsCount": 126,
    "image": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "120gr",
    "description": "Mặt nạ nghệ phục hồi - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "bot-canh-hoa-hong",
    "title": "Bột cánh hoa hồng",
    "category": "Sản phẩm dưỡng sinh",
    "price": 168000,
    "rating": 4.9,
    "reviewsCount": 127,
    "image": "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "25gr",
    "description": "Bột cánh hoa hồng - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "dau-duong-hoa-hong",
    "title": "Dầu dưỡng hoa hồng",
    "category": "Sản phẩm dưỡng sinh",
    "price": 158000,
    "rating": 4.9,
    "reviewsCount": 128,
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "20ml",
    "description": "Dầu dưỡng hoa hồng - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "dau-massage-hoa-hong",
    "title": "Dầu massage Hoa hồng",
    "category": "Sản phẩm dưỡng sinh",
    "price": 236000,
    "rating": 4.9,
    "reviewsCount": 129,
    "image": "https://images.unsplash.com/photo-1556228366-2457636e74fc?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "50ml",
    "description": "Dầu massage Hoa hồng - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "cao-goi-hoa-hong-2-in-1-goixa",
    "title": "Cao gội Hoa hồng 2 in 1 (Gội&Xả)",
    "category": "Sản phẩm dưỡng sinh",
    "price": 289000,
    "rating": 4.9,
    "reviewsCount": 130,
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8ff5?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "300ml",
    "description": "Cao gội Hoa hồng 2 in 1 (Gội&Xả) - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "tinh-chat-hoa-buoi",
    "title": "Tinh chất hoa bưởi",
    "category": "Sản phẩm dưỡng sinh",
    "price": 138000,
    "rating": 4.9,
    "reviewsCount": 131,
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "100ml",
    "description": "Tinh chất hoa bưởi - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "tra-hoa-hong",
    "title": "Trà Hoa hồng",
    "category": "Sản phẩm dưỡng sinh",
    "price": 189000,
    "rating": 4.9,
    "reviewsCount": 132,
    "image": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "60gr",
    "description": "Trà Hoa hồng - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "tra-tia-to",
    "title": "Trà Tía tô",
    "category": "Sản phẩm dưỡng sinh",
    "price": 99000,
    "rating": 4.9,
    "reviewsCount": 133,
    "image": "https://images.unsplash.com/photo-1556228444-7164923f1489?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "20gr",
    "description": "Trà Tía tô - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "tra-hoa-cuc-co",
    "title": "Trà Hoa cúc cổ",
    "category": "Sản phẩm dưỡng sinh",
    "price": 168000,
    "rating": 4.9,
    "reviewsCount": 134,
    "image": "https://images.unsplash.com/photo-1556228444-2457636e74fc?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "30gr",
    "description": "Trà Hoa cúc cổ - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "mat-ong-nguyen-chat",
    "title": "Mật ong nguyên chất",
    "category": "Sản phẩm dưỡng sinh",
    "price": 158000,
    "rating": 4.9,
    "reviewsCount": 135,
    "image": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "500ml",
    "description": "Mật ong nguyên chất - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "mat-ong-hoa-hong",
    "title": "Mật ong Hoa hồng",
    "category": "Sản phẩm dưỡng sinh",
    "price": 299000,
    "rating": 4.9,
    "reviewsCount": 136,
    "image": "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "500ml",
    "description": "Mật ong Hoa hồng - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "gac-len-men",
    "title": "Gấc lên men",
    "category": "Sản phẩm dưỡng sinh",
    "price": 295000,
    "rating": 4.9,
    "reviewsCount": 137,
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "500ml",
    "description": "Gấc lên men - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "mat-ong-gung-quat-muoi",
    "title": "Mật ong Gừng Quất Muối",
    "category": "Sản phẩm dưỡng sinh",
    "price": 255000,
    "rating": 4.9,
    "reviewsCount": 138,
    "image": "https://images.unsplash.com/photo-1556228366-2457636e74fc?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "500ml",
    "description": "Mật ong Gừng Quất Muối - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "cot-nghe-mat-ong-len-men",
    "title": "Cốt nghệ Mật Ong lên men",
    "category": "Sản phẩm dưỡng sinh",
    "price": 295000,
    "rating": 4.9,
    "reviewsCount": 139,
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8ff5?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "500ml",
    "description": "Cốt nghệ Mật Ong lên men - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "duong-mat-mia-tho",
    "title": "Đường Mật mía thô",
    "category": "Sản phẩm dưỡng sinh",
    "price": 165000,
    "rating": 4.9,
    "reviewsCount": 140,
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "1kg",
    "description": "Đường Mật mía thô - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "tinh-chat-ngu-sac",
    "title": "Tinh chất ngũ sắc",
    "category": "Sản phẩm dưỡng sinh",
    "price": 135000,
    "rating": 4.9,
    "reviewsCount": 141,
    "image": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "20ml",
    "description": "Tinh chất ngũ sắc - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "cot-gung-que",
    "title": "Cốt gừng quế",
    "category": "Sản phẩm dưỡng sinh",
    "price": 158000,
    "rating": 4.9,
    "reviewsCount": 142,
    "image": "https://images.unsplash.com/photo-1556228444-7164923f1489?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "500ml",
    "description": "Cốt gừng quế - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "cao-la-tre-gai",
    "title": "Cao lá tre gai",
    "category": "Sản phẩm dưỡng sinh",
    "price": 550000,
    "rating": 4.9,
    "reviewsCount": 143,
    "image": "https://images.unsplash.com/photo-1556228444-2457636e74fc?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "description": "Cao lá tre gai - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "cao-bo-phoi",
    "title": "Cao bổ phổi",
    "category": "Sản phẩm dưỡng sinh",
    "price": 550000,
    "rating": 4.9,
    "reviewsCount": 144,
    "image": "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "description": "Cao bổ phổi - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "cao-bo-huyet",
    "title": "Cao bổ huyết",
    "category": "Sản phẩm dưỡng sinh",
    "price": 550000,
    "rating": 4.9,
    "reviewsCount": 145,
    "image": "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "description": "Cao bổ huyết - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "cao-thong-kinh-lac",
    "title": "Cao thông kinh lạc",
    "category": "Sản phẩm dưỡng sinh",
    "price": 550000,
    "rating": 4.9,
    "reviewsCount": 146,
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "description": "Cao thông kinh lạc - Sản phẩm chăm sóc an toàn, hiệu quả."
  },
  {
    "id": "cao-bo-than",
    "title": "Cao bổ thận",
    "category": "Sản phẩm dưỡng sinh",
    "price": 550000,
    "rating": 4.9,
    "reviewsCount": 147,
    "image": "https://images.unsplash.com/photo-1556228366-2457636e74fc?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "description": "Cao bổ thận - Sản phẩm chăm sóc an toàn, hiệu quả."
  }
];

export const skinConcerns: SkinConcern[] = [
  { id: "phuc-hoi", label: "Phục hồi", count: 8, description: "Phục hồi làn da mỏng yếu, tổn thương do hóa chất hoặc môi trường." },
  { id: "da-mun", label: "Da mụn", count: 12, description: "Kháng viêm, gom nhân mụn và ngăn ngừa mụn tái phát." },
  { id: "lao-hoa", label: "Lão hóa", count: 6, description: "Cải thiện nếp nhăn, tăng độ đàn hồi và làm đều màu da." },
  { id: "da-nhay-cam", label: "Da nhạy cảm", count: 10, description: "Dịu da tức thì, giảm mẩn đỏ và tăng cường hàng rào bảo vệ." },
];

export const categories = [
  "Khuyến mãi",
  "Mỹ phẩm vi sinh Hoa Ngân",
  "Dụng cụ làm đẹp",
  "Sản phẩm dưỡng sinh",
];

export interface SkinConcernGroup {
  id: string;
  label: string;
  count: number;
  issues: string[];
}

export const skinConcernGroups: SkinConcernGroup[] = [
  { id: "do-am", label: "Độ ẩm", count: 4, issues: ["Da khô, bong tróc", "Da tiết dầu do thiếu ẩm (oil imbalance)", "Lỗ chân lông to do mất nước", "Da xỉn màu, thiếu sức sống"] },
  { id: "viem-mun", label: "Viêm mụn", count: 8, issues: ["Bóng nhờn, tắc nghẽn lỗ chân lông", "Mụn cám, mụn đầu đen", "Mụn viêm nhẹ, viêm nang, bọc mủ", "Mụn ẩn", "Viêm nang lông", "Viêm da tiếp xúc, dị ứng", "Viêm da tiết bã", "Bệnh lý gây mụn khác (dậy thì, nội tiết,...)"] },
  { id: "da-nhay-cam", label: "Da nhạy cảm", count: 5, issues: ["Da mỏng yếu", "Đỏ da", "Giãn mao mạch", "Nhạy cảm cơ địa", "Kích ứng da"] },
  { id: "sac-to-da", label: "Sắc tố da", count: 7, issues: ["Sạm da", "Da không đều màu", "Thâm mụn", "Tàn nhang, đồi mồi", "Nám", "Rám da / Tăng sắc tố do đi nắng / Sử dụng lột tẩy,...", "Da bị sạm do dùng kem trộn / mỹ phẩm kém chất lượng / corticoid,..."] },
  { id: "lao-hoa-da", label: "Lão hóa da", count: 4, issues: ["Dày sừng, lỗ chân lông to, giãn cấu trúc bề mặt", "Nếp nhăn li ti, Nếp nhăn sâu", "Lão hóa Collagen/Elastin", "Lão hóa cơ, kém săn chắc (Chảy xệ)"] },
];

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "he-vi-sinh-va-mun",
    title: "Hệ vi sinh trên da là gì? Vì sao mất cân bằng gây mụn?",
    category: "Kiến thức",
    excerpt: "Hiểu rõ về 'hàng xóm' vi khuẩn trên da để có lộ trình trị mụn đúng đắn.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800",
    date: "26/04/2026",
    readTime: "6 phút",
    content: "Làn da chúng ta không chỉ có tế bào da..."
  },
  {
    id: "phan-biet-probiotic",
    title: "Phân biệt: Probiotic – Prebiotic – Postbiotic",
    category: "Skincare",
    excerpt: "Ba khái niệm cốt lõi trong mỹ phẩm vi sinh mà mọi tín đồ làm đẹp cần biết.",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800",
    date: "24/04/2026",
    readTime: "5 phút",
    content: "Trong những năm gần đây, mỹ phẩm vi sinh..."
  },
  {
    id: "soi-da-hieu-qua",
    title: "Soi da: Chìa khóa xác định mỹ phẩm có thực sự tác dụng",
    category: "Kiến thức",
    excerpt: "Tại sao bạn cần soi da định kỳ để đánh giá sự thay đổi của tầng sâu biểu bì.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81da236c?q=80&w=800",
    date: "22/04/2026",
    readTime: "7 phút",
    content: "Không thể đánh giá da chỉ bằng mắt thường..."
  },
  {
    id: "peel-da-sinh-hoc",
    title: "Peel da sinh học khác gì với peel da hóa học?",
    category: "Phục hồi",
    excerpt: "Lựa chọn phương pháp tái tạo da an toàn mà không gây bào mòn hay mỏng da.",
    image: "https://images.unsplash.com/photo-1556228444-7164923f1489?q=80&w=800",
    date: "20/04/2026",
    readTime: "8 phút",
    content: "Cơ chế của peel da sinh học là..."
  },
  {
    id: "skincare-bim-sua",
    title: "Hướng dẫn Skincare tối giản cho mẹ bỉm",
    category: "Lối sống",
    excerpt: "Cách duy trì làn da rạng rỡ chỉ với 5 phút mỗi ngày cho các mẹ bận rộn.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800",
    date: "18/04/2026",
    readTime: "4 phút",
    content: "Làm mẹ là hành trình tuyệt vời nhưng bận rộn..."
  }
];

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  isVerifiedPurchase?: boolean;
}

export const allReviews: Review[] = [
  {
    id: "rev-1",
    userName: "Huyền My",
    rating: 5,
    comment: "Sản phẩm xịt dưỡng Miracle thực sự cứu lấy làn da mỏng yếu của mình. Cảm ơn Alma!",
    date: "15/04/2026",
    isVerifiedPurchase: true
  },
  {
    id: "rev-2",
    userName: "Quốc Khánh",
    rating: 5,
    comment: "Guasha rất chất lượng, đá cầm nặng tay và rất mát. Dùng xong thấy mặt nhẹ hẳn.",
    date: "12/04/2026",
    isVerifiedPurchase: true
  },
  {
    id: "rev-3",
    userName: "Lan Anh",
    rating: 4,
    comment: "Mật ong hoa hồng thơm, dễ uống. Sữa rửa mặt Glacier dùng rất thích, không khô da.",
    date: "10/04/2026",
    isVerifiedPurchase: true
  }
];
