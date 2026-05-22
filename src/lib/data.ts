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
  tagline?: string;
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
    "description": "Giải pháp nuôi dưỡng chuyên sâu đa tầng dành cho làn da.",
    "tagline": "Kiểm nghiệm không kích ứng / Dành cho mọi loại da/ Dùng được cho phụ nữ có thai & trẻ em",
    "usage": "Sản phẩm được sử dụng theo 2 cách:\nCách 1: Xịt trực tiếp lên mặt (giống xịt khoáng). Xịt khi da mặt không bôi thoa mỹ phẩm khác. Xịt từ 3-7 lần/ ngày (không giưới hạn lượng xịt trong ngày)\n\nCách 2: Đắp mặt nạ ủ. Làm ướt bông tẩy trang bằng Xịt dưỡng, Tách lớp bông tẩy trang cho mỏng vừa đủ và đắp lên da. Đắp lớp mặt nạ ủ nilon bên ngoài để ngăn bốc hơi. Đắp từ 40-90 phút. Sau khi đắp xong không cần rửa mặt lại với nước. \n\nVui lòng đọc kỹ Hướng Dẫn Sử Dụng trước khi sử dụng tại đây: Cẩm nang hướng dẫn sử dụng \nKhi mua sản phẩm bạn sẽ được đồng hành 1:1 với tư vấn viên, bạn cũng có thể liên hệ tư vấn viên để được giải đáp thắc mắc kịp thời."
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
    "usage": "Sản phẩm được sử dụng theo 2 cách: \nCách 1: Xịt Vi sinh ra lòng bàn tay, sau đó dùng tay còn lại để thoa lên da. Không thoa lên các vùng da mỏng như mí mắt, bọng mắt. Ngày thoa từ 1-2 lần. Nên thoa trước khi đi ngủ \n\nCách 2: Xịt Vi sinh lên tăm bông và thoa đều lên da, những vùng mụn, thâm nám.\n\nVui lòng đọc kỹ Hướng Dẫn Sử Dụng trước khi sử dụng tại đây: Cẩm nang hướng dẫn sử dụng \nKhi mua sản phẩm bạn sẽ được đồng hành 1:1 với tư vấn viên, bạn cũng có thể liên hệ tư vấn viên để được giải đáp thắc mắc kịp thời.",
    "description": "Giải pháp chuẩn Khoa Học Vi Sinh giúp hỗ trợ làm sạch bã nhờn dư thừa và các tạp chất tích tụ trên bề mặt da, hỗ trợ xử lý các vấn đề da, đưa làn da trở về trạng thái cân bằng và khỏe mạnh tự nhiên.",
    "tagline": "Kiểm nghiệm không kích ứng / Da nhạy cảm / Dùng được cho phụ nữ có thai & trẻ em"
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
    "description": "Giải pháp chuẩn Khoa Học Vi Sinh giúp hỗ trợ làm sạch bã nhờn dư thừa và các tạp chất tích tụ trên bề mặt da, hỗ trợ xử lý các vấn đề da, đưa làn da trở về trạng thái cân bằng và khỏe mạnh tự nhiên.",
    "tagline": "Kiểm nghiệm không kích ứng / Da thường/ Mọi loại da/ Dùng được cho phụ nữ có thai & trẻ em",
    "usage": "Sản phẩm được sử dụng theo 2 cách: \nCách 1: Xịt Vi sinh ra lòng bàn tay, sau đó dùng tay còn lại để thoa lên da. Không thoa lên các vùng da mỏng như mí mắt, bọng mắt. Ngày thoa từ 1-2 lần. Nên thoa trước khi đi ngủ \n\nCách 2: Xịt Vi sinh lên tăm bông và thoa đều lên da, những vùng mụn, thâm nám.\n\nVui lòng đọc kỹ Hướng Dẫn Sử Dụng trước khi sử dụng tại đây: Cẩm nang hướng dẫn sử dụng \nKhi mua sản phẩm bạn sẽ được đồng hành 1:1 với tư vấn viên, bạn cũng có thể liên hệ tư vấn viên để được giải đáp thắc mắc kịp thời."
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
    "usage": "Hướng Dẫn Sử Dụng\nBước 1: Làm ướt da mặt. Sau đó, ấn vòi xịt 2 – 3 lần ra lòng bàn tay một lượng bọt vừa đủ massage khắp da mặt. Sữa Rửa Mặt Nước Băng Glacier Foam Cleanser là loại sữa rửa mặt tạo bọt nên bạn không cần phải tạo bọt thủ công.\n\nBước 2: Massage kỹ khoảng 90 giây để Sữa Rửa Mặt Nước Băng Glacier Foam Cleanser có thể giúp lấy hết bụi bẩn cũng như cặn bã nhờn nằm sâu dưới da. Đồng thời, quá trình này giúp cho các mạch máu dưới da được lưu thông tốt hơn.\n\nĐối với Sữa Rửa Mặt Nước Băng Glacier Foam Cleanser, bạn cứ thoải mái massage và rửa sạch vùng da quanh mắt mà không gây kích ứng hay cay mắt. Điều này cũng cho thấy độ lành tính của sản phẩm rất cao. Vùng mắt là nơi thường phải make up, kẻ mắt, mascara, đánh phấn nhiều nếu không rửa sạch sẽ rất dễ khiến da nhanh lão hóa và mau có nếp nhăn, quầng thâm.\n\nBước 3: Rửa lại bằng nước. Quá trình rửa mặt càng kỹ thì các bước dưỡng da sau càng có hiệu quả.\n\nLưu ý:\n– Không nên dùng khăn mặt hoặc khăn giấy để lau khô. Như vậy, sẽ khiến các bụi khăn dính lên da sẽ dễ gây mụn và các vấn đề khác cho da. \n– Chỉ nên dùng bông tẩy trang để lau hoặc để da tự khô tự nhiên.\n\nVui lòng đọc kỹ Hướng Dẫn Sử Dụng trước khi sử dụng tại đây: Cẩm nang hướng dẫn sử dụng \nKhi mua sản phẩm bạn sẽ được đồng hành 1:1 với tư vấn viên, bạn cũng có thể liên hệ tư vấn viên để được giải đáp thắc mắc kịp thời.",
    "description": "Chứa Nước Băng Alaska tinh khiết giúp làm sạch sâu, dưỡng trắng, căng bóng, mềm mịn, se lỗ chân lông, khắc phục tình trạng da khô sạm.",
    "tagline": "Dành cho mọi loại da / Dịu nhẹ / Dùng được cho phụ nữ có thai & trẻ em"
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
    "description": "Với chỉ số SPF 123 & UVA-PF 79 vượt trội, Công thức đột phá cùng Màng lọc thông minh thế hệ mới ngăn bụi mịn, bảo vệ toàn diện trước tia UVA, UVB, ánh sáng xanh và ô nhiễm môi trường đô thị.",
    "tagline": "Dành cho mọi loại da/ Mỏng nhẹ/ Chống nắng phổ rộng"
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
    "description": "Bộ sản phẩm dưỡng da trắng sáng, căng bóng và ngăn ngừa các dấu hiệu lão hóa.",
    "usage": "Vui lòng đọc kỹ Hướng Dẫn Sử Dụng trước khi sử dụng tại đây: Cẩm nang hướng dẫn sử dụng \nKhi mua sản phẩm bạn sẽ được đồng hành 1:1 với tư vấn viên, bạn cũng có thể liên hệ tư vấn viên để được giải đáp thắc mắc kịp thời."
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
    "description": "Bộ sản phẩm phục hồi da vi sinh, giúp giải quyết các vấn đề da nhạy cảm, mụn và tổn thương.",
    "usage": "Vui lòng đọc kỹ Hướng Dẫn Sử Dụng trước khi sử dụng tại đây: Cẩm nang hướng dẫn sử dụng \nKhi mua sản phẩm bạn sẽ được đồng hành 1:1 với tư vấn viên, bạn cũng có thể liên hệ tư vấn viên để được giải đáp thắc mắc kịp thời."
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
    "flag": "Deal tháng/ Deal tốt nhất",
    "gift": "– Miễn phí vận chuyển toàn quốc \n– Tặng mặt nạ ủ  \n– Tư vấn 1-1 trọn đời tới khi da đẹp\n\nTặng thêm: \n- Bông tẩy trang Muji với đơn hàng từ 2 triệu\n\nNhận quà ngay khi đăng ký thành viên",
    "fullDescription": "MUA          2 Xịt Dưỡng Chuyên Sâu (50ml)\nTẶNG        1 Xịt Dưỡng Chuyên Sâu (50ml)\n\nCombo ưu đãi từ Nhà máy Sản xuất Mỹ Phẩm Vi Sinh Hoa Ngân với Xịt Dưỡng Chuyên Sâu Miracle Essence với đa dạng công dụng chăm sóc da chuẩn Khoa Học Vi Sinh.",
    "description": "Bộ sản phẩm chăm sóc da toàn diện giúp cân bằng ẩm, tái tạo và nuôi dưỡng da sâu.",
    "usage": "Vui lòng đọc kỹ Hướng Dẫn Sử Dụng trước khi sử dụng tại đây: Cẩm nang hướng dẫn sử dụng \nKhi mua sản phẩm bạn sẽ được đồng hành 1:1 với tư vấn viên, bạn cũng có thể liên hệ tư vấn viên để được giải đáp thắc mắc kịp thời."
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
    "description": "Bộ sản phẩm chăm sóc da tinh gọn, đơn giản nhưng mang lại hiệu quả phục hồi tối ưu.",
    "usage": "Vui lòng đọc kỹ Hướng Dẫn Sử Dụng trước khi sử dụng tại đây: Cẩm nang hướng dẫn sử dụng \nKhi mua sản phẩm bạn sẽ được đồng hành 1:1 với tư vấn viên, bạn cũng có thể liên hệ tư vấn viên để được giải đáp thắc mắc kịp thời."
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
    "description": "Lăn kim (Dermaroller) – Kích hoạt tái tạo, phục hồi làn da từ gốc.",
    "fullDescription": "Lăn kim (Dermaroller) – Kích hoạt tái tạo, phục hồi làn da từ gốc\n\nLăn kim là công cụ chăm sóc da chuyên sâu, hoạt động dựa trên cơ chế tạo ra các vi tổn thương siêu nhỏ trên bề mặt da, từ đó kích thích quá trình tự làm lành và tái tạo tự nhiên của da. Nhờ vậy, làn da được “đánh thức” để sản sinh collagen và elastin – nền tảng cho một làn da khỏe, mịn và săn chắc.\n\nCông dụng nổi bật:\n- Kích thích tăng sinh collagen: Giúp da săn chắc, cải thiện nếp nhăn\n- Làm mờ sẹo rỗ, thâm mụn: Hỗ trợ tái tạo bề mặt da đều màu hơn\n- Se khít lỗ chân lông: Cải thiện kết cấu da rõ rệt\n- Tăng hấp thụ dưỡng chất: Giúp serum thẩm thấu sâu và hiệu quả hơn\n- Hỗ trợ trẻ hóa da: Làm da sáng khỏe và tươi mới hơn\n \nĐiểm khác biệt:\nKhông giống các phương pháp chăm sóc bề mặt, lăn kim tác động vào cơ chế tự phục hồi của da, giúp da khỏe lên từ bên trong thay vì phụ thuộc vào sản phẩm bên ngoài.\n\nPhù hợp với:\n- Da có sẹo rỗ, thâm mụn lâu năm\n- Da lão hóa, kém săn chắc\n- Da dày sừng, lỗ chân lông to\n- Người muốn phục hồi và tái tạo da chuyên sâu\n\n⚠️ Lưu ý quan trọng\nĐây là phương pháp cần kỹ thuật và vệ sinh nghiêm ngặt\nKhông sử dụng trên da đang viêm, mụn nặng hoặc nhạy cảm",
    "usage": "Khi mua sản phẩm bạn sẽ được đồng hành 1:1 với tư vấn viên, bạn cũng có thể liên hệ tư vấn viên để được giải đáp thắc mắc kịp thời."
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
    "description": "Chải khô da mặt – Làm sạch sâu, đánh thức làn da khỏe tự nhiên.",
    "flag": "có",
    "fullDescription": "Chất liệu \nCán: Gỗ\nSợ lông: Sợi tự nhiên từ cây gai dầu \n\nKích thước: 6x7cm\n\nChải khô da mặt – Làm sạch sâu, đánh thức làn da khỏe tự nhiên\nChải khô da mặt là công cụ chăm sóc da theo phương pháp tự nhiên, giúp loại bỏ tế bào chết nhẹ nhàng và kích thích tuần hoàn mà không cần đến hóa chất hay tẩy rửa mạnh. Với thiết kế lông chải mềm mại, chuyên biệt cho da mặt, sản phẩm mang lại trải nghiệm thư giãn và an toàn khi sử dụng.\nCông dụng nổi bật:\n\n\n- Loại bỏ tế bào chết nhẹ nhàng: Giúp bề mặt da thông thoáng, mịn màng hơn\n- Kích thích tuần hoàn máu: Hỗ trợ da hồng hào, tươi tắn tự nhiên\n- Massage hệ bạch huyết \n- Tăng khả năng hấp thụ dưỡng chất: Giúp serum, kem dưỡng thẩm thấu hiệu quả hơn\n- Hỗ trợ làm sạch lỗ chân lông: Giảm tích tụ bụi bẩn và bã nhờn\n\n\nĐiểm khác biệt:\nKhông giống các sản phẩm tẩy da chết thông thường, chải khô hoạt động theo cơ chế cơ học nhẹ nhàng, tôn trọng cấu trúc tự nhiên của da, hạn chế bào mòn và kích ứng.\n\nPhù hợp với:\n- Da xỉn màu, sần sùi, thiếu sức sống\n- Người muốn chăm sóc da theo hướng tự nhiên, tối giản\n- Những ai đang tìm kiếm giải pháp hỗ trợ phục hồi da bền vững\n\n\n✨ Chỉ vài phút mỗi ngày, bạn không chỉ làm sạch làn da — mà còn đang “đánh thức” sức sống tự nhiên vốn có của da.",
    "usage": "Bước 1: Chuẩn bị\nRửa mặt sạch và đảm bảo da khô hoàn toàn\nLàm sạch tay và dụng cụ trước khi dùng\n\nBước 2: Thực hiện chải khô\n\nChải theo nguyên tắc: nhẹ – hướng lên trên – từ trong ra ngoài\n\nVùng cổ:\nChải nhẹ từ dưới lên trên để kích thích lưu thông\nĐường viền hàm:\nChải từ cằm hướng lên tai giúp làm gọn và nâng cơ\nMá:\nChải từ cánh mũi ra hai bên thái dương\nVùng mắt:\nCực kỳ nhẹ nhàng, hoặc có thể bỏ qua nếu da nhạy cảm\nTrán:\nChải từ giữa trán ra hai bên\n\n⏱ Thời gian: 2–5 phút, 2–3 lần/tuần\n\nBước 3: Làm dịu và dưỡng da\nRửa mặt nhẹ nhàng sau khi chải\nThoa toner/serum/dưỡng ẩm để làm dịu và phục hồi da\nLưu ý quan trọng\nKhông chải trên da đang có mụn viêm, trầy xước hoặc kích ứng\nKhông dùng lực mạnh (da mặt rất dễ tổn thương)\nLuôn giữ dụng cụ sạch sẽ, khô ráo\nNếu da nhạy cảm, nên thử ở vùng nhỏ trước\n\n✨ Chải khô không chỉ là làm sạch lớp tế bào chết, mà còn là một nghi thức đánh thức làn da — giúp da thông thoáng, tươi sáng và sẵn sàng hấp thụ dưỡng chất tốt hơn mỗi ngày."
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
    "description": "Gua sha đá là công cụ massage truyền thống giúp chăm sóc da theo phương pháp tự nhiên, không xâm lấn.",
    "fullDescription": "Chất liệu: Đá \nKích thước: 7.5 x 7.5 cm\n\nGua sha đá là công cụ massage truyền thống giúp chăm sóc da theo phương pháp tự nhiên, không xâm lấn. Được chế tác từ đá tự nhiên nguyên khối, sản phẩm mang lại cảm giác mát lạnh, dễ chịu khi tiếp xúc với da, hỗ trợ thư giãn và phục hồi làn da sau một ngày dài.\n\nCông dụng nổi bật:\n\nNâng cơ – săn chắc da: Massage đều đặn giúp cải thiện độ đàn hồi, hỗ trợ làm gọn đường nét khuôn mặt\nGiảm bọng mắt, sưng phù: Kích thích lưu thông máu và bạch huyết, giúp da tươi tắn hơn\nTăng hấp thụ dưỡng chất: Khi kết hợp cùng serum hoặc dầu dưỡng, giúp dưỡng chất thẩm thấu tốt hơn\nThư giãn & giải tỏa căng thẳng: Giảm áp lực vùng cơ mặt, mang lại cảm giác nhẹ nhàng, dễ chịu\n\nĐiểm khác biệt:\nKhông giống các phương pháp chăm sóc tức thời, Gua sha mang đến hiệu quả tích lũy và bền vững – khi bạn kiên trì lắng nghe và chăm sóc làn da mỗi ngày.\n\nPhù hợp với:\nMọi loại da, đặc biệt là da mệt mỏi, kém săn chắc, dễ tích tụ độc tố hoặc người muốn chăm sóc da theo hướng tự nhiên – lành tính.\n\n✨ Một vài phút mỗi ngày, không chỉ là chăm da — mà còn là khoảng thời gian bạn kết nối và chữa lành chính mình.",
    "certifications": "Giấy kiểm nghiệm",
    "usage": "Bước 1: Làm sạch & chuẩn bị da\nLàm sạch da mặt\nThoa một lớp serum/dầu dưỡng để tạo độ trượt (tránh kéo căng da)\nBước 2: Thực hiện massage với đá Gua Sha\n\nGiữ đá nghiêng khoảng 15–30 độ, massage nhẹ nhàng theo hướng từ trong ra ngoài – từ dưới lên trên\n\nVùng cổ:\nVuốt từ dưới lên trên để kích thích lưu thông và nâng cơ\nĐường viền hàm:\nVuốt từ cằm hướng lên tai giúp làm gọn khuôn mặt\nMá:\nVuốt từ cánh mũi ra thái dương để nâng cơ và giảm tích tụ bạch huyết\nVùng mắt:\nDùng cạnh mỏng, vuốt nhẹ từ đầu mắt ra đuôi mắt để giảm bọng và quầng thâm\nTrán:\nVuốt từ giữa trán ra hai bên thái dương giúp thư giãn cơ và giảm nếp nhăn\nBước 3: Lặp lại & thư giãn\nMỗi động tác lặp lại 5–10 lần\nTổng thời gian: 5–10 phút mỗi ngày\nLưu ý quan trọng\nKhông dùng lực mạnh, tránh gây đỏ rát\nLuôn massage theo một chiều (không kéo qua kéo lại)\nVệ sinh đá sau mỗi lần sử dụng\nCó thể để đá trong tủ lạnh để tăng hiệu quả giảm sưng"
  },
  {
    "id": "chai-kho-co-the",
    "title": "Chải khô cơ thể",
    "category": "Dụng cụ làm đẹp",
    "price": 275000,
    "rating": 4.9,
    "reviewsCount": 115,
    "image": "https://images.unsplash.com/photo-1556228444-7164923f1489?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "description": "Chải khô BODY – Làm sạch, detox da và đánh thức năng lượng cơ thể.",
    "fullDescription": "Chải khô BODY – Làm sạch, detox da và đánh thức năng lượng cơ thể\n\nChất liệu \nCán: Gỗ\nSợ lông: Sợi tự nhiên từ cây gai dầu \n\nKích thước: 10x10cm\n\nChải khô body là công cụ chăm sóc da toàn thân theo phương pháp tự nhiên, giúp loại bỏ tế bào chết, kích thích tuần hoàn và hỗ trợ hệ bạch huyết hoạt động hiệu quả hơn. Với thiết kế lông chải chắc vừa phải, sản phẩm mang lại cảm giác sảng khoái, giúp làn da và cơ thể “thức tỉnh” mỗi ngày.\n\nCông dụng nổi bật:\n\n- Loại bỏ tế bào chết toàn thân: Giúp da mịn màng, sáng khỏe hơn\n- Kích thích tuần hoàn máu & bạch huyết: Hỗ trợ đào thải độc tố, giảm tích tụ dưới da\n- Giảm sần vỏ cam (cellulite): Cải thiện bề mặt da khi sử dụng đều đặn\n- Tăng hấp thụ dưỡng thể: Giúp lotion, dầu dưỡng thẩm thấu tốt hơn\n- Tạo cảm giác thư giãn & tràn đầy năng lượng: Đặc biệt phù hợp dùng vào buổi sáng\n\n\nĐiểm khác biệt:\nChải khô không chỉ là bước làm đẹp, mà còn là một nghi thức chăm sóc cơ thể toàn diện — kết hợp giữa làm sạch, lưu thông và kích hoạt năng lượng tự nhiên của cơ thể.\n\nPhù hợp với:\n\n- Da cơ thể sần sùi, khô ráp\n- Người ít vận động, tuần hoàn kém\n- Người theo đuổi lối sống detox – chăm sóc cơ thể tự nhiên\n\n\n✨ Chỉ vài phút mỗi ngày trước khi tắm, bạn không chỉ làm sạch làn da — mà còn đánh thức sự nhẹ nhàng, khỏe khoắn từ bên trong cơ thể.",
    "usage": "Hướng dẫn sử dụng Chải khô BODY đúng cách\n\nChải khô body là một bước chăm sóc cơ thể đơn giản nhưng mang lại hiệu quả rõ rệt khi thực hiện đúng kỹ thuật và đều đặn.\n\nBước 1: Chuẩn bị\nĐảm bảo cơ thể khô hoàn toàn (trước khi tắm), có thể bôi dầu dưỡng cơ thể. \nSử dụng bàn chải khô dành riêng cho body\nĐứng ở nơi thoải mái, dễ thao tác\n\nBước 2: Thực hiện chải khô\nNguyên tắc: chải hướng về tim – lực vừa phải – chuyển động đều\n\nBàn chân → bắp chân → đùi:\nChải từ dưới lên trên theo chiều lưu thông máu\nTay:\nChải từ bàn tay hướng lên vai\nVùng bụng:\nChải theo chuyển động tròn, chiều kim đồng hồ\nLưng:\nChải từ dưới lên hoặc từ hai bên hướng vào trung tâm\nVùng nhạy cảm (ngực, cổ):\nChải rất nhẹ hoặc tránh nếu da mỏng\n\n⏱ Thời gian: 5–10 phút/lần, 1 lần/ngày (tốt nhất vào buổi sáng)\n\nBước 3: Làm sạch & dưỡng da\n- Tắm lại với nước để loại bỏ tế bào chết\n- Thoa kem dưỡng hoặc dầu dưỡng để cấp ẩm và nuôi dưỡng da\n\nLưu ý quan trọng\n- Không chải lên vùng da trầy xước, viêm, hoặc đang kích ứng\n- Không dùng lực quá mạnh để tránh làm tổn thương da\n- Vệ sinh và phơi khô bàn chải sau mỗi lần sử dụng\n- Người mới bắt đầu nên chải nhẹ để da thích nghi dần\n\n✨ Chải khô body không chỉ là làm sạch — mà là một nghi thức chăm sóc cơ thể mỗi ngày, giúp bạn cảm nhận rõ sự lưu thông, nhẹ nhàng và tươi mới từ làn da đến toàn bộ cơ thể."
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
    "description": "Mặt nạ ủ nilon là giải pháp hỗ trợ chăm sóc da chuyên sâu, hoạt động theo cơ chế occlusion (tạo lớp màng khóa ẩm) giúp giữ lại toàn bộ dưỡng chất trên da, từ đó tăng khả năng thẩm thấu và phát huy hiệu quả tối đa của sản phẩm chăm sóc.Sản phẩm này được dùng kèm với Xịt dưỡng chuyên sâu.",
    "fullDescription": "Mặt nạ ủ nilon – Khóa ẩm tối đa, tăng hiệu quả dưỡng da\n\nMặt nạ ủ nilon là giải pháp hỗ trợ chăm sóc da chuyên sâu, hoạt động theo cơ chế occlusion (tạo lớp màng khóa ẩm) giúp giữ lại toàn bộ dưỡng chất trên da, từ đó tăng khả năng thẩm thấu và phát huy hiệu quả tối đa của sản phẩm chăm sóc.Sản phẩm này được dùng kèm với Xịt dưỡng chuyên sâu \n\nSố lượng: 100 miếng/ túi"
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
    "description": "Bông tẩy trang Muji được làm từ 100% cotton tự nhiên, không qua xử lý tẩy trắng hóa học, giữ nguyên màu sắc nguyên bản của sợi bông.",
    "fullDescription": "Bông tẩy trang Muji được làm từ 100% cotton tự nhiên, không qua xử lý tẩy trắng hóa học, giữ nguyên màu sắc nguyên bản của sợi bông. Nhờ đó, sản phẩm cực kỳ lành tính, phù hợp ngay cả với làn da nhạy cảm nhất.\n\n💧 Công dụng nổi bật\n- Làm sạch dịu nhẹ: Loại bỏ lớp trang điểm, bụi bẩn mà không gây tổn thương da\n- Không xơ bông: Sợi bông dai, mịn, không để lại vụn trên da khi sử dụng\n- Tiết kiệm dưỡng chất: Thấm hút vừa đủ, không “ăn” quá nhiều toner/serum\n- Đa năng: Có thể tách lớp để làm lotion mask, tối ưu hiệu quả dưỡng da"
  },
  {
    "id": "combo-chay-kho-mat-body",
    "title": "Combo Chải khô mặt + Chải khô body",
    "category": "Dụng cụ làm đẹp",
    "price": 490000,
    "rating": 4.9,
    "reviewsCount": 0,
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8ff5?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "description": "Bộ đôi chải khô mặt và body - giải pháp chăm sóc da toàn diện theo phương pháp tự nhiên."
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
    "description": "Xịt khoáng thảo dược không chỉ đơn thuần là “cấp nước”, mà là một bước nuôi dưỡng – làm dịu – cân bằng độ ẩm cho da mỗi ngày.",
    "tagline": "Mọi loại da/ Dùng được cho phụ nữ có thai & trẻ em/ Không hóa chất độc hại/ Không chất tẩy rửa/ Không hương liệu/ Không chất bảo quản",
    "flag": "Được yêu thích",
    "fullDescription": "Xịt khoáng thảo dược không chỉ đơn thuần là “cấp nước”, mà là một bước nuôi dưỡng – làm dịu – cân bằng độ ẩm cho da mỗi ngày. Khi được trồng theo phương pháp hữu cơ, các hoạt chất thực vật giữ được độ tinh khiết cao, giúp làn da hấp thụ trọn vẹn giá trị tự nhiên.\n\nToner Hoa hồng ược chưng cất từ cánh hoa hồng hữu cơ, giàu vitamin và chất chống oxy hóa, giúp làn da luôn mềm mại và tươi tắn.\n\nCông dụng nổi bật:\n\n- Cấp ẩm nhanh, làm dịu da tức thì\n- Cân bằng pH tự nhiên của da\n- Hỗ trợ se khít lỗ chân lông, làm sáng da\n- Mang lại cảm giác thư giãn với hương hoa nhẹ nhàng\n\n👉 Nước hoa hồng tự nhiên thường giúp làm dịu, cân bằng và phục hồi độ ẩm cho da một cách nhẹ nhàng",
    "ingredients": "Nước cất từ cánh hoa hồng hữu cơ",
    "usage": "Cách sử dụng\n- Xịt cách mặt 20–30cm, nhắm mắt và xịt đều 2–3 lần\n- Vỗ nhẹ để dưỡng chất thẩm thấu\n- Có thể dùng sau bước rửa mặt, trước serum hoặc trong ngày\n\nSử dụng khi nào\n- Khi da khô, mất nước, ngồi điều hòa nhiều\n- Sau khi rửa mặt để cân bằng pH\n- Trước makeup để tạo độ ẩm nền, sau makeup để “set” lớp nền\n\nPhù hợp với ai\n- Da thường, da khô, da thiếu sức sống\n- Người muốn dưỡng ẩm nhẹ nhàng mỗi ngày\n- Người làm việc văn phòng, da dễ mất nước"
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
    "description": "Xịt khoáng thảo dược không chỉ đơn thuần là “cấp nước”, mà là một bước nuôi dưỡng – làm dịu – cân bằng độ ẩm cho da mỗi ngày.",
    "tagline": "Mọi loại da/ Dùng được cho phụ nữ có thai & trẻ em/ Không hóa chất độc hại/ Không chất tẩy rửa/ Không hương liệu/ Không chất bảo quản",
    "flag": "Được yêu thích",
    "fullDescription": "Xịt khoáng thảo dược không chỉ đơn thuần là “cấp nước”, mà là một bước nuôi dưỡng – làm dịu – cân bằng độ ẩm cho da mỗi ngày. Khi được trồng theo phương pháp hữu cơ, các hoạt chất thực vật giữ được độ tinh khiết cao, giúp làn da hấp thụ trọn vẹn giá trị tự nhiên.\n\nChiết xuất từ lá tía tô hữu cơ – một loại thảo dược quen thuộc trong y học phương Đông, giàu chất chống oxy hóa và kháng viêm tự nhiên.\n\nCông dụng nổi bật:\n\n- Hỗ trợ kháng viêm, giảm mụn\n- Thanh lọc da, kiểm soát dầu nhờn\n- Làm sáng da và cải thiện sắc tố\n- Giúp da khỏe và ổn định hơn",
    "ingredients": "Nước cất từ cánh hoa hồng tía tô",
    "usage": "Cách sử dụng\n- Xịt 2–3 lần lên toàn mặt hoặc vùng da mụn\n- Có thể dùng nhiều lần trong ngày để kiểm soát dầu\n- Dùng trước serum để tăng khả năng thẩm thấu\n\nSử dụng khi nào\n- Khi da đổ dầu, bí tắc lỗ chân lông\n- Khi da đang có mụn viêm nhẹ, mụn ẩn\n- Khi cần “refresh” da giữa ngày mà không làm bí da\n\nPhù hợp với ai\n- Da dầu, da hỗn hợp thiên dầu\n- Da mụn, da dễ viêm\n- Người sống trong môi trường ô nhiễm, dễ bít tắc lỗ chân lông"
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
    "description": "Xịt khoáng thảo dược không chỉ đơn thuần là “cấp nước”, mà là một bước nuôi dưỡng – làm dịu – cân bằng độ ẩm cho da mỗi ngày.",
    "tagline": "Mọi loại da/ Dùng được cho phụ nữ có thai & trẻ em/ Không hóa chất độc hại/ Không chất tẩy rửa/ Không hương liệu/ Không chất bảo quản",
    "flag": "Được yêu thích",
    "fullDescription": "Xịt khoáng thảo dược không chỉ đơn thuần là “cấp nước”, mà là một bước nuôi dưỡng – làm dịu – cân bằng độ ẩm cho da mỗi ngày. Khi được trồng theo phương pháp hữu cơ, các hoạt chất thực vật giữ được độ tinh khiết cao, giúp làn da hấp thụ trọn vẹn giá trị tự nhiên.\n\nToner Hoa cúc được Chiết xuất từ giống hoa cúc cổ canh tác hữu cơ, nổi bật với khả năng làm dịu và kháng viêm mạnh mẽ.\n\nCông dụng nổi bật:\n- Làm dịu da kích ứng, giảm đỏ nhanh\n- Hỗ trợ phục hồi da nhạy cảm, da sau treatment\n- Cấp ẩm nhẹ, giúp da mềm mại hơn\n- Tăng cường hàng rào bảo vệ da\n\n👉 Xịt khoáng hoa cúc được biết đến với khả năng làm dịu, dưỡng ẩm và cân bằng da nhạy cảm",
    "ingredients": "Nước cất từ cánh hoa hồng hoa cúc",
    "usage": "Cách sử dụng\n- Xịt trực tiếp lên vùng da cần làm dịu hoặc toàn mặt\n- Có thể xịt nhiều lớp (layer) khi da đang nhạy cảm\n- Kết hợp với bông tẩy trang để làm lotion mask 3–5 phút\n\nSử dụng khi nào\n- Khi da bị kích ứng, đỏ, ngứa hoặc sau nắng\n- Sau các liệu trình treatment (peel, lăn kim nhẹ…)\n- Khi da “biểu tình”, cần làm dịu ngay\n\nPhù hợp với ai\n- Da nhạy cảm, da yếu, da dễ kích ứng\n- Da sau treatment, da đang phục hồi\n- Người theo routine skincare tối giản – lành tính"
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
    "description": "Làm sạch sâu lỗ chân lông, tẩy tế bào chết trên da, loại bỏ dầu thừa.",
    "tagline": "Mọi loại da/ Dùng được cho phụ nữ có thai & trẻ em/ Không hóa chất độc hại/ Không chất tẩy rửa/ Không hương liệu/ Không chất bảo quản",
    "fullDescription": "Công dụng: \n- Làm sạch sâu lỗ chân lông, tẩy tế bào chết trên da, loại bỏ dầu thừa\n- Thư giãn, dưỡng ẩm cho da để làn da trông rạng rỡ, sáng hồng hơn\n- Giúp làm thông thoáng, se khít lỗ chân lông \n- Giúp ngăn ngừa mụn, giảm nếp nhăn cho da, giúp da khỏe hơn, săn chắc hơn",
    "ingredients": "Chiết xuất tía tô, Chiết xuất hoa hồng, muối epsom, dầu hạt chanh",
    "usage": "Nhỏ vào bông tẩy trang sau đó lau sạch lợp bụi bẩn hoặc lớp trang điểm trên da. Có thể dùng thay sữa rửa mặt nếu không trang điểm và dùng như 1 loại toner"
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
    "description": "Xà bông Nghệ Mật Ong – Làm sạch dịu nhẹ, nuôi dưỡng làn da khỏe tự nhiên.",
    "tagline": "Mọi loại da/ Dùng được cho phụ nữ có thai & trẻ em/ Không hóa chất độc hại/ Không chất tẩy rửa/ Không hương liệu/ Không chất bảo quản",
    "flag": "Được yêu thích",
    "fullDescription": "🌿 Xà bông Nghệ Mật Ong – Làm sạch dịu nhẹ, nuôi dưỡng làn da khỏe tự nhiên\n\nĐược tạo nên từ những nguyên liệu thiên nhiên giàu dưỡng chất, xà bông Nghệ Mật Ong là sự kết hợp giữa làm sạch lành tính và phục hồi da theo hướng tự nhiên. Không chỉ làm sạch bụi bẩn và dầu thừa, sản phẩm còn hỗ trợ nuôi dưỡng hàng rào bảo vệ da, giúp da mềm mại và khỏe hơn mỗi ngày.\n\n✨ Thành phần nổi bật\nDầu dừa ép lạnh: Giúp làm sạch dịu nhẹ, giữ độ ẩm tự nhiên cho da\nDầu Sachi Inchi: Giàu Omega 3-6-9, hỗ trợ phục hồi và chống oxy hóa cho da\nNước cất hoa hồng: Làm dịu, cân bằng và mang lại cảm giác tươi mát\nMật ong: Dưỡng ẩm, hỗ trợ kháng khuẩn và làm mềm da\nBột Nghệ: Hỗ trợ làm sáng da, giảm thâm và cải thiện tình trạng da không đều màu\nBột tía tô: Thanh lọc, hỗ trợ giảm viêm và làm dịu da mụn\nTinh dầu sả hoa hồng: Mang hương thơm thư giãn tự nhiên, hỗ trợ làm sạch và cân bằng da\n💛 Công dụng nổi bật\nLàm sạch da nhẹ nhàng mà không gây khô căng\nHỗ trợ giảm dầu thừa và thanh lọc da\nGiúp da mềm mại, ẩm mịn sau khi rửa\nHỗ trợ cải thiện thâm mụn và làm đều màu da\nMang lại cảm giác thư giãn với hương thảo mộc tự nhiên\n🌱 Phù hợp với\n- Da dầu, da hỗn hợp, da dễ nổi mụn, da dễ kích ứng với các sản phẩm công nghiệp \n- Da bị mụn lưng/mông, sần sùi, khô ráp \n- Da trẻ em\n- Phụ nữ mang thai \n✨ Điểm khác biệt\n\nKhông chỉ là một bánh xà bông làm sạch, đây là sự kết hợp giữa thảo dược – dầu thực vật – dưỡng chất tự nhiên, giúp làn da được chăm sóc theo cách tối giản nhưng bền vững hơn mỗi ngày.\n\n💧 Mỗi lần rửa mặt không chỉ là làm sạch da, mà còn là một bước nhỏ đưa làn da trở về trạng thái cân bằng và khỏe mạnh tự nhiên",
    "ingredients": "Dầu dừa ép lạnh, Dầu Sachi Inchi, Nước cất hoa hồng, Mật ong, Bột Nghệ, Bột tía tô, Tinh dầu sả hoa hồng",
    "usage": "✨ Hướng dẫn sử dụng\n- Làm ướt da và bánh xà bông\n- Cho xà bông vào túi lưới tạo bọt, xoa nhẹ để tạo lớp bọt mịn\n- Dùng phần bọt massage nhẹ nhàng lên mặt hoặc cơ thể theo chuyển động tròn\n- Thư giãn trên da khoảng 30 giây – 1 phút\n- Rửa sạch lại với nước\n\n🌿 Sử dụng cho da mặt\n\n- Nên dùng lớp bọt mịn thay vì chà trực tiếp bánh xà bông lên mặt\n- Massage nhẹ nhàng để làm sạch dầu thừa và bụi bẩn\n- Phù hợp sử dụng 1–2 lần/ngày\n\n🛁 Sử dụng cho cơ thể\n- Có thể dùng trực tiếp với túi lưới tạo bọt để làm sạch toàn thân\n- Đặc biệt phù hợp cho vùng da dễ đổ dầu, bí tắc hoặc cần thư giãn cơ thể\n\n✨ Tips để sử dụng hiệu quả hơn\n- Treo khô xà bông sau khi dùng để kéo dài thời gian sử dụng\n- Kết hợp cùng massage nhẹ để tăng lưu thông và thư giãn da\n- Sau khi rửa, nên dùng thêm xịt khoáng hoặc dưỡng ẩm để da mềm mịn hơn\n\n\n💛 Lớp bọt mềm từ túi lưới không chỉ giúp tiết kiệm xà bông, mà còn mang lại cảm giác làm sạch nhẹ nhàng như một bước spa chăm sóc da mỗi ngày."
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
    "description": "Xà bông Gừng Tràm Quế – Làm sạch ấm nóng, thanh lọc và phục hồi làn da tự nhiên.",
    "tagline": "Mọi loại da/ Dùng được cho phụ nữ có thai & trẻ em/ Không hóa chất độc hại/ Không chất tẩy rửa/ Không hương liệu/ Không chất bảo quản",
    "flag": "Được yêu thích",
    "fullDescription": "🌿 Xà bông Gừng Tràm Quế – Làm sạch ấm nóng, thanh lọc và phục hồi làn da tự nhiên\n\nXà bông Gừng Tràm Quế là sự hòa quyện giữa các thảo dược phương Đông và dầu thực vật dưỡng da, mang đến cảm giác làm sạch sâu nhưng vẫn dịu nhẹ. Với hương thơm ấm từ gừng – quế – tràm, sản phẩm không chỉ chăm sóc làn da mà còn giúp thư giãn và “đánh thức” cơ thể sau một ngày dài.\n\n✨ Thành phần \nDầu dừa ép lạnh: Làm sạch nhẹ nhàng, hỗ trợ giữ ẩm tự nhiên cho da\nDầu Sachi Inchi: Giàu Omega 3-6-9 giúp nuôi dưỡng và phục hồi hàng rào bảo vệ da\nNước cốt gừng tươi: Làm ấm da, hỗ trợ lưu thông và thanh lọc da tự nhiên\nMật ong: Dưỡng ẩm, giúp da mềm mại và hỗ trợ kháng khuẩn\nBột nghệ: Hỗ trợ làm sáng da, giảm thâm và cải thiện sắc tố da không đều màu\nBột quế: Giúp làm sạch, hỗ trợ giảm dầu thừa và mang lại cảm giác ấm nóng dễ chịu\nTinh dầu tràm: Hỗ trợ kháng khuẩn, làm sạch da và tạo hương thơm thư giãn tự nhiên\n\n💛 Công dụng nổi bật\n- Làm sạch da mà không gây khô căng\n- Hỗ trợ giảm dầu thừa, thanh lọc và làm thông thoáng lỗ chân lông\n- Giúp da mềm mại, mịn màng hơn sau khi sử dụng\n- Hỗ trợ giảm mùi cơ thể và tạo cảm giác sạch thoáng\n- Mang lại cảm giác thư giãn, ấm cơ thể với hương thảo mộc tự nhiên\n\n🌱 Phù hợp với\n- Da dầu, da hỗn hợp, da dễ nổi mụn, da dễ kích ứng với các sản phẩm công nghiệp \n- Da bị mụn lưng/mông, sần sùi, khô ráp \n- Da trẻ em\n- Phụ nữ mang thai \n✨ Điểm khác biệt\n\nKhông chỉ là xà bông làm sạch thông thường, Gừng Tràm Quế kết hợp giữa thảo dược làm ấm – dầu dưỡng thực vật – tinh dầu thiên nhiên, mang lại trải nghiệm chăm sóc cơ thể vừa sạch sâu vừa thư giãn như một liệu pháp spa tại nhà.\n\n💧 Mỗi lần sử dụng là một lần cơ thể được làm sạch, sưởi ấm và tái tạo năng lượng từ những nguyên liệu thiên nhiên nguyên bản.",
    "ingredients": "Dầu dừa ép lạnh, Dầu Sachi Inchi, Nước cốt gừng tươi, Mật ong, Bột nghệ, Bột quế, Tinh dầu tràm",
    "usage": "✨ Hướng dẫn sử dụng\n- Làm ướt da và bánh xà bông\n- Cho xà bông vào túi lưới tạo bọt, xoa nhẹ để tạo lớp bọt mịn\n- Dùng phần bọt massage nhẹ nhàng lên mặt hoặc cơ thể theo chuyển động tròn\n- Thư giãn trên da khoảng 30 giây – 1 phút\n- Rửa sạch lại với nước\n\n🌿 Sử dụng cho da mặt\n\n- Nên dùng lớp bọt mịn thay vì chà trực tiếp bánh xà bông lên mặt\n- Massage nhẹ nhàng để làm sạch dầu thừa và bụi bẩn\n- Phù hợp sử dụng 1–2 lần/ngày\n\n🛁 Sử dụng cho cơ thể\n- Có thể dùng trực tiếp với túi lưới tạo bọt để làm sạch toàn thân\n- Đặc biệt phù hợp cho vùng da dễ đổ dầu, bí tắc hoặc cần thư giãn cơ thể\n\n✨ Tips để sử dụng hiệu quả hơn\n- Treo khô xà bông sau khi dùng để kéo dài thời gian sử dụng\n- Kết hợp cùng massage nhẹ để tăng lưu thông và thư giãn da\n- Sau khi rửa, nên dùng thêm xịt khoáng hoặc dưỡng ẩm để da mềm mịn hơn\n\n\n💛 Lớp bọt mềm từ túi lưới không chỉ giúp tiết kiệm xà bông, mà còn mang lại cảm giác làm sạch nhẹ nhàng như một bước spa chăm sóc da mỗi ngày."
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
    "description": "Mặt nạ Hoa Hồng là sự kết hợp giữa cánh hoa hồng thiên nhiên và các loại dầu thực vật giàu dưỡng chất, giúp làn da được cấp ẩm, thư giãn và phục hồi nhẹ nhàng.",
    "tagline": "Mọi loại da/ Dùng được cho phụ nữ có thai & trẻ em/ Không hóa chất độc hại/ Không chất tẩy rửa/ Không hương liệu/ Không chất bảo quản",
    "fullDescription": "Mặt nạ Hoa Hồng là sự kết hợp giữa cánh hoa hồng thiên nhiên và các loại dầu thực vật giàu dưỡng chất, giúp làn da được cấp ẩm, thư giãn và phục hồi nhẹ nhàng. Với hương hoa dịu nhẹ cùng kết cấu giàu dưỡng, sản phẩm mang đến cảm giác chăm sóc da như một nghi thức spa thư giãn tại nhà.\n\n✨ Thành phần nổi bật\nBột cánh hoa hồng: Giúp làm dịu, hỗ trợ cân bằng da và mang lại vẻ tươi tắn tự nhiên\nMật ong: Dưỡng ẩm, làm mềm da và hỗ trợ bảo vệ da khỏi khô ráp\nDầu Sachi Inchi: Giàu Omega 3-6-9 giúp phục hồi và nuôi dưỡng hàng rào bảo vệ da\nDầu bơ: Cấp ẩm sâu, giúp da mềm mại và căng mịn hơn sau khi sử dụng\n💗 Công dụng nổi bật\n- Cấp ẩm và giúp da mềm mại, mịn màng hơn\n- Làm dịu da khô, da mệt mỏi hoặc thiếu sức sống\n- Hỗ trợ cải thiện độ đàn hồi và độ căng bóng tự nhiên của da\n- Giúp da tươi sáng và đều màu hơn\n- Mang lại cảm giác thư giãn với hương hoa hồng tự nhiên nhẹ nhàng\n\n🌱 Phù hợp với\n- Da khô, da thiếu nước\n- Da nhạy cảm cần làm dịu nhẹ nhàng\n- Da xỉn màu, thiếu sức sống\n✨ Điểm khác biệt\n\nKhông đơn thuần là mặt nạ dưỡng ẩm, Mặt nạ Hoa Hồng tập trung vào trải nghiệm “nuôi dưỡng và làm dịu” — giúp làn da không chỉ mềm hơn sau khi dùng, mà còn cảm nhận được sự thư thái và cân bằng tự nhiên.\n\n💧 Từng cánh hoa hồng như mang theo độ ẩm và sự dịu dàng của thiên nhiên, giúp làn da được nghỉ ngơi, phục hồi và tỏa sáng theo cách nhẹ nhàng nhất.",
    "ingredients": "Bột cánh hoa hồng, Mật ong, Dầu Sachi Inchi, Dầu bơ"
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
    "description": "Mặt nạ Tía Tô là sự kết hợp giữa thảo dược truyền thống và các loại dầu thực vật giàu dưỡng chất, giúp làn da được thanh lọc nhẹ nhàng nhưng vẫn duy trì độ ẩm và sự mềm mại tự nhiên.",
    "tagline": "Mọi loại da/ Dùng được cho phụ nữ có thai & trẻ em/ Không hóa chất độc hại/ Không chất tẩy rửa/ Không hương liệu/ Không chất bảo quản",
    "fullDescription": "Mặt nạ Tía Tô là sự kết hợp giữa thảo dược truyền thống và các loại dầu thực vật giàu dưỡng chất, giúp làn da được thanh lọc nhẹ nhàng nhưng vẫn duy trì độ ẩm và sự mềm mại tự nhiên. Đây là lựa chọn phù hợp cho những làn da đang mệt mỏi, dễ bí tắc hoặc cần được “thở” sau nhiều lớp mỹ phẩm.\n\n✨ Thành phần nổi bật\nBột tía tô: Giúp thanh lọc da, hỗ trợ giảm dầu thừa và làm dịu da mụn\nMật ong: Dưỡng ẩm, hỗ trợ kháng khuẩn và giúp da mềm mại hơn\nDầu Sachi Inchi: Giàu Omega 3-6-9, hỗ trợ phục hồi và củng cố hàng rào bảo vệ da\nDầu bơ: Nuôi dưỡng sâu, giúp da mềm mịn và hạn chế khô căng sau khi đắp mặt nạ\n\n💚 Công dụng nổi bật\n- Hỗ trợ làm sạch và thanh lọc da nhẹ nhàng\n- Giúp giảm cảm giác bí tắc, dầu thừa trên da\n- Làm dịu da mụn, da dễ kích ứng\n- Cấp ẩm và giữ da mềm mại sau khi sử dụng\n- Hỗ trợ cải thiện làn da xỉn màu, thiếu sức sống\n\n🌱 Phù hợp với\n- Da dầu, da hỗn hợp thiên dầu\n- Da dễ nổi mụn, bí tắc lỗ chân lông\n- Da mệt mỏi, xỉn màu cần được làm dịu và phục hồi\n\n✨ Điểm khác biệt\n\nKhông giống các loại mask làm sạch khiến da khô ráp sau khi dùng, Mặt nạ Tía Tô tập trung vào cơ chế “thanh lọc nhưng vẫn nuôi dưỡng” — giúp da được làm sạch nhẹ nhàng mà vẫn giữ được độ ẩm và sự cân bằng tự nhiên.\n\n💧 Từng lớp mặt nạ như một khoảng nghỉ cho làn da — nơi da được thở, được làm dịu và dần trở về trạng thái khỏe khoắn nguyên bản",
    "ingredients": "Bột tía tô, Mật ong, Dầu Sachi Inchi, Dầu bơ"
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
    "description": "Mặt Nạ Nghệ Phục Hồi là sự kết hợp giữa mật ong nguyên chất, tinh bột nghệ đỏ và dầu hạt chanh — mang đến giải pháp chăm sóc da dịu nhẹ theo hướng phục hồi và nuôi dưỡng tự nhiên.",
    "tagline": "Mọi loại da/ Dùng được cho phụ nữ có thai & trẻ em/ Không hóa chất độc hại/ Không chất tẩy rửa/ Không hương liệu/ Không chất bảo quản",
    "flag": "có",
    "fullDescription": "Mặt Nạ Nghệ Phục Hồi là sự kết hợp giữa mật ong nguyên chất, tinh bột nghệ đỏ và dầu hạt chanh — mang đến giải pháp chăm sóc da dịu nhẹ theo hướng phục hồi và nuôi dưỡng tự nhiên. Với kết cấu mềm mịn cùng hương thảo mộc nhẹ nhàng, sản phẩm giúp làn da được thư giãn, làm sạch và tái tạo sau những ngày mệt mỏi hoặc tiếp xúc nhiều với mỹ phẩm và môi trường.\n\n✨ Thành phần nổi bật\n- Mật ong: Giúp dưỡng ẩm, làm mềm và hỗ trợ bảo vệ da\n- Tinh bột nghệ đỏ: Giàu hoạt chất chống oxy hóa tự nhiên, hỗ trợ làm sáng và cải thiện thâm da\n- Dầu hạt chanh: Giúp làm sạch nhẹ nhàng, mang lại cảm giác tươi mát và hỗ trợ cân bằng da\n💛 Công dụng nổi bật\n- Hỗ trợ làm sạch da và loại bỏ tế bào chết nhẹ nhàng\n- Giúp da sáng mịn và đều màu hơn\n- Hỗ trợ giảm thâm và phục hồi làn da mệt mỏi\n- Giúp da mềm mại, ẩm mịn sau khi sử dụng\n- Mang lại cảm giác thư giãn và dễ chịu cho làn da\n🌱 Phù hợp với\n- Mọi loại da, đặc biệt là da xỉn màu hoặc thiếu sức sống\n- Da cần phục hồi và nuôi dưỡng nhẹ nhàng\n\nKhông chỉ là mặt nạ dưỡng da thông thường, Mặt Nạ Nghệ Phục Hồi tập trung vào cơ chế “làm sạch dịu nhẹ kết hợp nuôi dưỡng” — giúp da không bị khô căng sau khi đắp mà vẫn giữ được cảm giác mềm mại và thoải mái tự nhiên.",
    "ingredients": "Mật ong, tinh bột nghệ đỏ, dầu hạt chanh."
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
    "description": "Bột cánh hoa hồng được nghiền mịn từ những cánh hoa hồng tự nhiên, giữ lại hương thơm dịu nhẹ cùng các dưỡng chất thực vật quý giá.",
    "fullDescription": "Bột cánh hoa hồng được nghiền mịn từ những cánh hoa hồng tự nhiên, giữ lại hương thơm dịu nhẹ cùng các dưỡng chất thực vật quý giá. Đây là nguyên liệu chăm sóc da truyền thống giúp làm dịu, cấp ẩm và mang lại vẻ tươi tắn cho làn da theo cách nhẹ nhàng, lành tính.\n\n✨ Công dụng nổi bật\n- Hỗ trợ làm dịu da nhạy cảm, da mệt mỏi\n- Giúp da mềm mại và giữ độ ẩm tự nhiên\n- Hỗ trợ làm sáng và cải thiện làn da xỉn màu\n- Giúp da thư giãn và tươi tắn hơn\n- Mang lại hương thơm hoa hồng tự nhiên dễ chịu\n\n🌱 Phù hợp với\n- Da khô, da thiếu nước\n- Da nhạy cảm cần chăm sóc dịu nhẹ\n- Da xỉn màu, thiếu sức sống",
    "usage": "💧 Cách sử dụng Bột cánh hoa hồng\n🌸 Làm mặt nạ dưỡng da\n- Trộn bột với nước lọc, nước hoa hồng, sữa chua hoặc mật ong để tạo hỗn hợp sệt\n- Thoa đều lên mặt sạch\n- Thư giãn 10–15 phút rồi rửa lại với nước\n\n👉 Giúp da mềm mại, sáng và ẩm mịn hơn\n\n🌸 Tẩy da chết dịu nhẹ\n- Trộn cùng sữa tươi hoặc mật ong\n- Massage nhẹ nhàng theo chuyển động tròn 1–2 phút\n- Rửa sạch với nước\n\n👉 Giúp làm sạch lớp da chết mà không gây khô căng\n\n🌸 Xông mặt hoặc ngâm tắm\n- Pha bột vào nước ấm để xông mặt hoặc ngâm cơ thể\n- Hương hoa hồng tự nhiên giúp thư giãn và làm dịu tinh thần\n\n✨ Tips sử dụng hiệu quả hơn\nKết hợp cùng mật ong hoặc dầu dưỡng để tăng khả năng cấp ẩm\nDùng 2–3 lần/tuần để da được nuôi dưỡng đều đặn\nBảo quản nơi khô ráo, tránh ánh nắng trực tiếp"
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
    "description": "Dầu dưỡng Hoa Hồng là sự kết hợp tối giản nhưng giàu dưỡng chất giữa cánh hoa hồng tự nhiên và dầu Sachi Inchi nguyên chất.",
    "tagline": "Mọi loại da/ Dùng được cho phụ nữ có thai & trẻ em/ Không hóa chất độc hại/ Không chất tẩy rửa/ Không hương liệu/ Không chất bảo quản",
    "fullDescription": "Dầu dưỡng Hoa Hồng là sự kết hợp tối giản nhưng giàu dưỡng chất giữa cánh hoa hồng tự nhiên và dầu Sachi Inchi nguyên chất. Từng giọt dầu mang theo độ ẩm, sự dịu dàng của hoa hồng cùng khả năng phục hồi chuyên sâu từ các acid béo thực vật, giúp làn da được nuôi dưỡng khỏe mạnh theo cách tự nhiên nhất.\n\n✨ Thành phần nổi bật\n- Cánh hoa hồng: Giúp làm dịu, hỗ trợ cân bằng và mang lại vẻ tươi tắn cho làn da\n- Dầu Sachi Inchi: Giàu Omega 3-6-9 và chất chống oxy hóa, giúp phục hồi hàng rào bảo vệ da, duy trì độ ẩm và cải thiện độ đàn hồi tự nhiên\n💗 Công dụng nổi bật\n- Cấp ẩm và khóa ẩm cho da mềm mại, căng mịn\n- Hỗ trợ phục hồi da khô, da mỏng yếu hoặc thiếu sức sống\n- Giúp da trông tươi sáng và khỏe khoắn hơn\n- Làm dịu cảm giác khô ráp, căng rít sau khi rửa mặt\n- Mang lại cảm giác thư giãn với hương hoa hồng tự nhiên nhẹ nhàng\n🌱 Phù hợp với\n- Da khô, da thiếu nước\n- Da nhạy cảm, da cần phục hồi\n- Da bắt đầu xuất hiện dấu hiệu lão hóa\n\nKhông chứa silicone hay hương liệu tổng hợp, Dầu dưỡng Hoa Hồng nuôi dưỡng da theo cơ chế “bổ sung lipid tự nhiên”, giúp da dần khỏe lên, mềm hơn và ít phụ thuộc vào các lớp dưỡng dày nặng.",
    "usage": "🌹 Sử dụng cho da mặt\n- Cách dùng cơ bản\n- Làm sạch da và sử dụng toner/xịt khoáng\n- Lấy 2–3 giọt dầu dưỡng ra lòng bàn tay\n- Xoa nhẹ để làm ấm dầu\n- Áp nhẹ và massage lên da mặt theo hướng từ trong ra ngoài, từ dưới lên trên\n\n👉 Nên dùng ở bước cuối cùng để khóa ẩm và giữ dưỡng chất trên da\n\n🌿 Sử dụng trong các trường hợp\n- Khi da khô, bong tróc hoặc thiếu độ ẩm\n- Khi da mệt mỏi, thiếu sức sống\n- Sau treatment hoặc khi da cần phục hồi nhẹ nhàng\n- Khi ngồi điều hòa nhiều hoặc thời tiết hanh khô\n\n⚠️ Lưu ý\n- Chỉ cần dùng lượng vừa đủ để tránh bí da\n- Với da dầu, nên sử dụng lượng ít vào buổi tối\n- Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp\n\n✨ Có thể kết hợp thêm\nDùng cùng Gua Sha để massage nâng cơ và thư giãn da mặt\nTrộn 1 giọt vào kem dưỡng để tăng độ ẩm\nDùng cho vùng cổ, khóe mắt hoặc vùng da khô ráp cần nuôi dưỡng thêm"
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
    "description": "Dầu massage Hoa hồng - Sản phẩm chăm sóc an toàn, hiệu quả.",
    "tagline": "Mọi loại da/ Dùng được cho phụ nữ có thai & trẻ em/ Không hóa chất độc hại/ Không chất tẩy rửa/ Không hương liệu/ Không chất bảo quản",
    "flag": "có"
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
    "description": "Cao Gội Hoa Hồng – Làm sạch dịu nhẹ, nuôi dưỡng tóc và da đầu từ thảo dược thiên nhiên.",
    "fullDescription": "🌹 Cao Gội Hoa Hồng – Làm sạch dịu nhẹ, nuôi dưỡng tóc và da đầu từ thảo dược thiên nhiên\n\nCao Gội Hoa Hồng là sự hòa quyện giữa cánh hoa hồng cùng nhiều loại thảo dược truyền thống, mang đến trải nghiệm làm sạch tóc theo phương pháp tự nhiên và lành tính. Không chỉ giúp làm sạch tóc và da đầu, sản phẩm còn hỗ trợ nuôi dưỡng mái tóc mềm mại, giảm khô xơ và mang lại cảm giác thư giãn với hương thơm thảo mộc nhẹ nhàng.\n\n✨ Thành phần nổi bật\n- Cánh hoa hồng: Giúp làm dịu da đầu và mang lại hương thơm tự nhiên thư giãn\n- Bồ kết & bồ hòn: Làm sạch tóc và da đầu nhẹ nhàng theo phương pháp truyền thống\n- Vỏ bưởi, hương nhu, hà thủ ô: Hỗ trợ nuôi dưỡng tóc chắc khỏe và giảm gãy rụng\n- Sả chanh, gừng, bạc hà: Giúp làm sạch, tạo cảm giác thông thoáng và thư giãn da đầu\n- Cỏ mần trầu & chè xanh: Hỗ trợ cân bằng dầu và làm dịu da đầu\n- Nha đam & cốt dừa: Giúp cấp ẩm, giảm khô xơ cho tóc\n- Quả chanh & me rừng: Hỗ trợ làm sạch tóc và giúp tóc mềm mượt tự nhiên\n💗 Công dụng nổi bật\n- Làm sạch tóc và da đầu dịu nhẹ mà không gây khô căng\n- Hỗ trợ giảm dầu thừa và giúp da đầu thông thoáng\n- Giúp tóc mềm mại, giảm xơ rối và gãy rụng\n- Hỗ trợ nuôi dưỡng tóc chắc khỏe tự nhiên\n- Mang lại cảm giác thư giãn với hương thơm thảo dược dễ chịu\n🌱 Phù hợp với\n- Da đầu nhạy cảm hoặc dễ kích ứng với dầu gội hóa học\n- Tóc khô xơ, dễ gãy rụng\n- Người yêu thích chăm sóc tóc bằng phương pháp thảo dược truyền thống\n- Người muốn giảm phụ thuộc vào silicone và chất tẩy mạnh\n✨ Điểm khác biệt\n\nKhông tạo cảm giác “bóng mượt tức thì” như dầu gội chứa silicone, Cao Gội Hoa Hồng tập trung vào cơ chế làm sạch và nuôi dưỡng thật sự — giúp tóc và da đầu dần trở về trạng thái khỏe tự nhiên, mềm nhẹ và ít phụ thuộc hơn vào hóa chất.",
    "ingredients": "Cánh hoa hồng, bồ kết, bồ hòn, vỏ bưởi, hương nhu, hà thủ ô, quả chanh, sả chanh, củ gừng, cỏ mần trầu, nha đam, bạc hà, chè xanh, cốt dừa, me rừng.",
    "usage": "🌿 Hướng dẫn sử dụng\n- Làm ướt tóc và da đầu\n- Lấy một lượng cao gội vừa đủ ra tay, hòa với chút nước để tạo độ loãng nhẹ\n- Thoa đều lên tóc và da đầu\n- Massage nhẹ nhàng bằng đầu ngón tay trong 2–5 phút để dưỡng chất và thảo dược làm sạch da đầu\n- Xả sạch lại với nước\n\n👉 Có thể gội 2 lần nếu tóc nhiều dầu hoặc sau khi vận động nhiều\n\n✨ Để tăng hiệu quả chăm sóc tóc\n- Kết hợp massage da đầu hoặc dùng lược gỗ/Gua Sha da đầu để tăng lưu thông\n- Sau khi gội, nên để tóc khô tự nhiên hoặc sấy ở nhiệt độ thấp\n- Có thể dùng thêm xịt dưỡng hoặc dầu dưỡng tóc ở phần ngọn tóc khô xơ"
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
    "description": "Được làm từ những bông hoa hồng cổ hữu cơ thu hái tự nhiên, Trà Hoa Hồng mang hương thơm thanh nhẹ và vị trà dịu dàng đặc trưng của hoa tươi.",
    "fullDescription": "Được làm từ những bông hoa hồng cổ hữu cơ thu hái tự nhiên, Trà Hoa Hồng mang hương thơm thanh nhẹ và vị trà dịu dàng đặc trưng của hoa tươi. Không chỉ là một thức uống thư giãn, trà hoa hồng còn là khoảng thời gian để cơ thể được thả lỏng và cân bằng sau những bộn bề mỗi ngày.\n\n✨ Thành phần nổi bật\nHoa hồng cổ hữu cơ: Được trồng tự nhiên, không hóa chất, giữ trọn hương thơm và dưỡng chất nguyên bản của cánh hoa\n💗 Công dụng nổi bật\nGiúp thư giãn tinh thần và giảm cảm giác căng thẳng\nHỗ trợ thanh lọc cơ thể nhẹ nhàng\nGiúp cơ thể cảm thấy dễ chịu và cân bằng hơn\nHỗ trợ làm đẹp da từ bên trong nhờ các chất chống oxy hóa tự nhiên\nMang lại cảm giác nhẹ nhàng với hương hoa tự nhiên thanh dịu\n🌱 Phù hợp với\nNgười thường xuyên căng thẳng, cần thư giãn tinh thần\nNgười yêu thích lối sống chậm và chăm sóc cơ thể tự nhiên\nNgười muốn bổ sung trà thảo mộc nhẹ nhàng mỗi ngày\nNgười yêu hương hoa và các thức uống thiên nhiên",
    "certifications": "Chứng nhận OCOP 3 sao",
    "usage": "💧 Cách sử dụng Trà Hoa Hồng\n🌸 Pha trà nóng\nCho 3–5 bông hoa hồng vào tách\nRót nước nóng khoảng 80–90°C\nỦ trà 3–5 phút để hoa nở và tiết hương thơm\nThưởng thức khi còn ấm\n\n👉 Có thể thêm mật ong hoặc táo đỏ để tăng hương vị\n\n❄️ Pha trà lạnh\nPha trà đậm hơn một chút rồi để nguội\nThêm đá hoặc trái cây tươi để dùng như trà thanh mát mỗi ngày\n✨ Thời điểm phù hợp để sử dụng\nBuổi sáng nhẹ nhàng để bắt đầu ngày mới\nBuổi tối trước khi ngủ để thư giãn tinh thần\nKhi cần một khoảng nghỉ giữa ngày làm việc\n⚠️ Lưu ý\nKhông dùng nước quá sôi để giữ hương hoa tự nhiên\nBảo quản nơi khô ráo, tránh ẩm để giữ chất lượng hoa"
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
    "description": "Trà Tía Tô được làm từ những lá tía tô tự nhiên sấy khô, giữ lại hương thơm đặc trưng cùng tinh chất thảo dược vốn quen thuộc trong đời sống Á Đông.",
    "flag": "có",
    "fullDescription": "Trà Tía Tô được làm từ những lá tía tô tự nhiên sấy khô, giữ lại hương thơm đặc trưng cùng tinh chất thảo dược vốn quen thuộc trong đời sống Á Đông. Với vị trà thanh nhẹ, hơi ấm và dễ uống, đây không chỉ là một thức uống thư giãn mà còn là cách để cơ thể được chăm sóc nhẹ nhàng mỗi ngày.\n\n✨ Thành phần nổi bật\nLá tía tô tự nhiên: Giàu tinh dầu và chất chống oxy hóa thực vật, giúp cơ thể cảm thấy nhẹ nhàng và cân bằng hơn\n💚 Công dụng nổi bật\n- Hỗ trợ thanh lọc cơ thể tự nhiên\n- Giúp cơ thể cảm thấy nhẹ nhàng, dễ chịu hơn\n- Hỗ trợ giảm cảm giác đầy bụng, khó chịu sau ăn\n- Giúp thư giãn và làm ấm cơ thể\n- Hỗ trợ làm đẹp da từ bên trong nhờ các hoạt chất chống oxy hóa tự nhiên\n🌱 Phù hợp với\n- Người muốn duy trì thói quen uống trà thảo mộc lành tính\n- Người thường xuyên ăn uống thất thường hoặc thức khuya\n- Người yêu thích các loại trà thiên nhiên dễ uống mỗi ngày\n- Người theo đuổi lối sống thanh lọc và chăm sóc cơ thể tự nhiên\n✨ Điểm khác biệt\n\nKhông hương liệu tổng hợp, không vị ngọt gắt, Trà Tía Tô giữ nguyên hương thơm thảo mộc nhẹ đặc trưng — mang lại cảm giác mộc mạc, dễ chịu như một tách trà được hái từ khu vườn nhà.",
    "usage": "🌿 Cách pha trà nóng\n- Cho khoảng 3–5g trà vào tách hoặc bình\n- Rót 200–300ml nước nóng khoảng 80–90°C\n- Ủ trà trong 3–5 phút để lá trà tiết hương và dưỡng chất\n- Thưởng thức khi còn ấm\n\n👉 Có thể châm thêm nước 1–2 lần đến khi trà nhạt vị\n\n❄️ Cách pha trà lạnh\n- Pha trà đậm hơn bình thường\n- Để nguội và thêm đá\n- Có thể kết hợp cùng mật ong, lát chanh hoặc táo đỏ để tăng hương vị tự nhiên\n✨ Nên sử dụng khi nào?\n- Buổi sáng để cơ thể cảm thấy nhẹ nhàng, dễ chịu hơn\n- Sau bữa ăn để thư giãn và cân bằng cơ thể\n- Khi cảm thấy mệt mỏi, cần một thức uống thanh mát và thư giãn\n- Buổi tối nhẹ nhàng để thả lỏng tinh thần\n🌱 Phù hợp với ai?\n- Người muốn duy trì thói quen uống trà thảo mộc tự nhiên\n- Người ăn uống thất thường hoặc thường xuyên thức khuya\n- NGười bị sốt, cảm mạo, ho, phong hàn,...\n⚠️ Lưu ý\n- Không dùng nước quá sôi để giữ hương thơm tự nhiên của trà\n- Nên sử dụng trong ngày để cảm nhận hương vị tươi ngon nhất\n- Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp và độ ẩm cao"
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
    "description": "Trà Hoa Cúc Cổ được làm từ những bông cúc cổ tự nhiên sấy khô, giữ trọn sắc vàng dịu cùng hương thơm thanh mát đặc trưng.",
    "fullDescription": "Trà Hoa Cúc Cổ được làm từ những bông cúc cổ tự nhiên sấy khô, giữ trọn sắc vàng dịu cùng hương thơm thanh mát đặc trưng. Với vị trà nhẹ nhàng, dễ uống, đây không chỉ là một thức uống thảo mộc mà còn là khoảng thời gian để cơ thể được thư giãn và tái tạo năng lượng sau những ngày mệt mỏi.\n\n✨ Thành phần nổi bật\nHoa cúc cổ tự nhiên: Giàu hoạt chất thực vật và hương thơm tự nhiên giúp cơ thể cảm thấy thư thái, dễ chịu hơn\n\n💛 Công dụng nổi bật\n- Giúp thư giãn tinh thần và giảm cảm giác căng thẳng\n- Hỗ trợ cơ thể cảm thấy nhẹ nhàng, dễ chịu hơn\n- Giúp làm dịu và cân bằng cơ thể sau một ngày dài\n- Hỗ trợ giấc ngủ sâu và thư thái hơn\n- Hỗ trợ làm đẹp da từ bên trong nhờ chất chống oxy hóa tự nhiên\n🌱 Phù hợp với\n- Người thường xuyên căng thẳng, khó thư giãn\n- Người ngủ không sâu giấc hoặc dễ mệt mỏi\n- Người yêu thích trà thảo mộc nhẹ nhàng mỗi ngày\n- Người theo đuổi lối sống chậm và chăm sóc cơ thể tự nhiên\n✨ Điểm khác biệt\n\nKhông hương liệu tổng hợp, không vị đắng gắt, Trà Hoa Cúc Cổ mang hương thơm rất thanh và dịu — tạo cảm giác như được thả lỏng giữa một khu vườn hoa cúc yên bình.",
    "usage": "🌼 Pha trà nóng\nCho 3–5 bông hoa cúc vào tách hoặc bình\nRót nước nóng khoảng 80–90°C\nỦ trà trong 3–5 phút để hoa nở và tiết hương thơm\nThưởng thức khi còn ấm\n\n👉 Có thể kết hợp cùng mật ong, táo đỏ hoặc kỷ tử để tăng hương vị và cảm giác thư giãn\n\n❄️ Pha trà lạnh\nPha trà đậm hơn bình thường\nĐể nguội rồi thêm đá dùng như trà thanh mát mỗi ngày\n✨ Nên sử dụng khi nào?\nBuổi tối trước khi ngủ để thư giãn tinh thần\nSau giờ làm việc căng thẳng\nKhi cần một khoảng nghỉ nhẹ nhàng cho cơ thể và tâm trí\n⚠️ Lưu ý\nKhông dùng nước quá sôi để giữ hương thơm tự nhiên của hoa\nBảo quản nơi khô ráo, tránh ẩm và ánh nắng trực tiếp"
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
    "description": "Mật ong rừng nguyên chất được thu hoạch tự nhiên từ những đàn ong hút mật giữa rừng hoa hoang dã, giữ trọn hương thơm, màu sắc và dưỡng chất vốn có của mật ong nguyên bản.",
    "fullDescription": "Mật ong rừng nguyên chất được thu hoạch tự nhiên từ những đàn ong hút mật giữa rừng hoa hoang dã, giữ trọn hương thơm, màu sắc và dưỡng chất vốn có của mật ong nguyên bản. Không pha tạp, không tinh luyện, từng giọt mật mang theo vị ngọt thanh tự nhiên và nguồn năng lượng dịu lành từ thiên nhiên.\n\n✨ Đặc điểm nổi bật\nMùi thơm tự nhiên đặc trưng của mật ong rừng\nVị ngọt thanh, hậu dịu, không gắt\nMàu sắc có thể thay đổi theo mùa hoa tự nhiên\nKết cấu sánh mịn, có thể kết tinh theo nhiệt độ môi trường — dấu hiệu tự nhiên của mật ong nguyên chất\n💛 Công dụng nổi bật\nBổ sung năng lượng tự nhiên cho cơ thể\nHỗ trợ làm dịu cổ họng và cơ thể khi mệt mỏi\nHỗ trợ tiêu hóa và cân bằng cơ thể nhẹ nhàng\nGiúp làm đẹp da từ bên trong nhờ các chất chống oxy hóa tự nhiên\nCó thể dùng trong chăm sóc da và tóc nhờ đặc tính dưỡng ẩm tự nhiên",
    "ingredients": "Mật ong nguyên chất",
    "certifications": "Chứng nhận OCOP 3 sao",
    "usage": "Cách sử dụng mật ong:\n\n– Sử dụng mật ong trực tiếp\n\n– Pha loãng với nước ấm\n\n– Dùng như gia vị nấu ăn:gà tẩm mật ong, sườn tẩm mật ong xào chua ngọt,…"
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
    "description": "Mật ong rừng nguyên chất được thu hoạch tự nhiên từ những đàn ong hút mật giữa rừng hoa hoang dã, giữ trọn hương thơm, màu sắc và dưỡng chất vốn có của mật ong nguyên bản.",
    "fullDescription": "Mật ong rừng nguyên chất được thu hoạch tự nhiên từ những đàn ong hút mật giữa rừng hoa hoang dã, giữ trọn hương thơm, màu sắc và dưỡng chất vốn có của mật ong nguyên bản. Không pha tạp, không tinh luyện, từng giọt mật mang theo vị ngọt thanh tự nhiên và nguồn năng lượng dịu lành từ thiên nhiên.\n\n✨ Đặc điểm nổi bật\nMùi thơm tự nhiên đặc trưng của mật ong rừng\nVị ngọt thanh, hậu dịu, không gắt\nMàu sắc có thể thay đổi theo mùa hoa tự nhiên\nKết cấu sánh mịn, có thể kết tinh theo nhiệt độ môi trường — dấu hiệu tự nhiên của mật ong nguyên chất\n💛 Công dụng nổi bật\nBổ sung năng lượng tự nhiên cho cơ thể\nHỗ trợ làm dịu cổ họng và cơ thể khi mệt mỏi\nHỗ trợ tiêu hóa và cân bằng cơ thể nhẹ nhàng\nGiúp làm đẹp da từ bên trong nhờ các chất chống oxy hóa tự nhiên\nCó thể dùng trong chăm sóc da và tóc nhờ đặc tính dưỡng ẩm tự nhiên",
    "ingredients": "Mật ong nguyên chất lên men",
    "certifications": "Chứng nhận OCOP 3 sao",
    "usage": "Cách sử dụng mật ong:\n\n– Sử dụng mật ong trực tiếp\n\n– Pha loãng với nước ấm\n\n– Dùng như gia vị nấu ăn:gà tẩm mật ong, sườn tẩm mật ong xào chua ngọt,…"
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
    "description": "Gấc Lên Men là sự kết hợp giữa quả gấc chín giàu dưỡng chất và mật ong lên men tự nhiên, tạo nên một sản phẩm vừa thơm dịu, dễ sử dụng, vừa hỗ trợ chăm sóc cơ thể theo hướng lành tính từ bên trong.",
    "fullDescription": "Gấc Lên Men là sự kết hợp giữa quả gấc chín giàu dưỡng chất và mật ong lên men tự nhiên, tạo nên một sản phẩm vừa thơm dịu, dễ sử dụng, vừa hỗ trợ chăm sóc cơ thể theo hướng lành tính từ bên trong. Quá trình lên men giúp nguyên liệu trở nên hài hòa hơn, dễ hấp thụ hơn và giữ được nguồn enzyme tự nhiên có lợi cho cơ thể.\n\n✨ Thành phần nổi bật\n- Gấc tự nhiên: Giàu beta-carotene, lycopene và chất chống oxy hóa thực vật\n- Mật ong lên men: Giúp cân bằng vị, hỗ trợ tiêu hóa và tăng khả năng hấp thụ dưỡng chất tự nhiên\n🧡 Công dụng nổi bật\n- Hỗ trợ làm đẹp da từ bên trong\n- Giúp cơ thể bổ sung chất chống oxy hóa tự nhiên\n- Hỗ trợ cơ thể khỏe khoắn và tươi tắn hơn\n- Giúp cơ thể hấp thụ dưỡng chất dễ dàng hơn nhờ quá trình lên men\n- Giúp sáng mắt, tăng cường thị lực\n- Giàu Lycopene & Beta-Carotene giúp làm đẹp da, chống lão hóa\n- Hỗ trợ tim mạch, giảm cholesterol, ngừa đột quỵ\n- Tăng cường miễn dịch, ngăn ngừa thiếu máu\n- Giàu sắt, tốt cho mẹ bầu & người thiếu máu\n🌱 Phù hợp với\n- Người thiếu máu, thiếu sắt \n- Phụ nữ cần điều hòa nội tiết \n\n\n✨ Điểm khác biệt\n\nKhông chỉ là gấc ngâm mật ong thông thường, sản phẩm được lên men tự nhiên để tạo nên trạng thái dưỡng chất “dịu” hơn với cơ thể — vừa giữ được vị thơm đặc trưng của gấc, vừa mang đến cảm giác dễ chịu khi sử dụng hằng ngày.",
    "ingredients": "Mật ong lên men, Gấc nếp",
    "usage": "💧 Cách sử dụng Gấc Lên Men\n🍯 Dùng trực tiếp\nDùng 1–2 muỗng mỗi ngày\nCó thể ăn trực tiếp hoặc dùng sau bữa ăn\n🍵 Pha cùng nước ấm\nPha cùng nước ấm để tạo thức uống dễ dùng mỗi sáng\nCó thể kết hợp với chanh hoặc trà thảo mộc\n🥣 Kết hợp cùng thực phẩm\nDùng cùng sữa chua, yến mạch hoặc smoothie\nCó thể dùng như một phần trong chế độ ăn lành mạnh hằng ngày\n⚠️ Lưu ý\nKhông pha với nước quá nóng để giữ enzyme và dưỡng chất tự nhiên\nBảo quản nơi khô ráo hoặc ngăn mát tủ lạnh sau khi mở nắp"
  },
  {
    "id": "mat-ong-gung-quat-muoi",
    "title": "Mật ong lên men Gừng Quất Muối",
    "category": "Sản phẩm dưỡng sinh",
    "price": 255000,
    "rating": 4.9,
    "reviewsCount": 138,
    "image": "https://images.unsplash.com/photo-1556228366-2457636e74fc?q=80&w=800",
    "features": [],
    "skinConcerns": [],
    "volume": "500ml",
    "description": "Mật Ong lên men Gừng Quất Muối là sự kết hợp hài hòa giữa vị ngọt dịu của mật ong, vị ấm nồng của gừng tươi, vị thanh chua từ quất và chút mặn nhẹ từ muối tự nhiên.",
    "flag": "Bán chạy nhất",
    "fullDescription": "Mật Ong lên men Gừng Quất Muối là sự kết hợp hài hòa giữa vị ngọt dịu của mật ong, vị ấm nồng của gừng tươi, vị thanh chua từ quất và chút mặn nhẹ từ muối tự nhiên. Được làm hoàn toàn từ nguyên liệu thiên nhiên, sản phẩm mang đến giải pháp chăm sóc cổ họng và đường hô hấp theo cách lành tính, dễ dùng hằng ngày cho cả gia đình.\n\n🌿 Thành phần tự nhiên, lành tính\nMật ong nguyên chất: Giúp làm dịu cổ họng và bổ sung dưỡng chất tự nhiên\nCủ gừng tươi: Mang tính ấm, giúp cơ thể dễ chịu hơn trong thời tiết lạnh\nQuả quất: Giàu vitamin tự nhiên, hỗ trợ tăng cường sức đề kháng\nMuối hạt tự nhiên: Giúp làm dịu và hỗ trợ làm sạch vùng họng\n\n👉 Không chất bảo quản – không hương liệu tổng hợp – không hóa chất độc hại\n\n💛 Công dụng nổi bật\n- Hỗ trợ làm dịu cổ họng khô rát\n- Giúp giảm cảm giác khó chịu khi ho hoặc thay đổi thời tiết\n- Hỗ trợ giữ ấm cơ thể và đường hô hấp\n- Giúp cổ họng thông thoáng, dễ chịu hơn\n- Hỗ trợ tăng cường sức đề kháng tự nhiên cho cơ thể\n\n🌱 Phù hợp với\n- Người thường xuyên nói nhiều hoặc làm việc trong môi trường lạnh\n- Người dễ khô họng khi thay đổi thời tiết\n- Người cần bổ sung chất dinh dưỡng \n- Sử dụng như 1 vị thuốc trong gia đình trong các trường hợp sốt, cảm, mệt mỏi \n\nKhông dùng cho trẻ em dưới 1 tuổi",
    "ingredients": "Mật ong lên men, Gừng, Quất, Muối hạt",
    "usage": "🍵 Pha nước ấm\nPha 1–2 muỗng cùng nước ấm\nUống từ từ để làm dịu cổ họng và giữ ấm cơ thể\n\n👉 Thích hợp dùng vào buổi sáng hoặc tối trước khi ngủ\n\n🍯 Ngậm trực tiếp\n- Dùng trực tiếp 1 muỗng nhỏ\n- Có thể ngậm chậm để hỗn hợp đi qua cổ họng, giúp làm dịu họng tốt hơn\n🌿 Sử dụng khi nào?\n- Khi cổ họng khô rát, khó chịu\n- Khi thời tiết lạnh hoặc thay đổi thất thường\n- Khi cần giữ ấm cơ thể và hỗ trợ đường hô hấp\n⚠️ Lưu ý\n- Không pha với nước quá nóng để giữ dưỡng chất tự nhiên\n- Bảo quản nơi khô ráo hoặc ngăn mát tủ lạnh sau khi mở nắp\n- Không dùng cho trẻ dưới 1 tuổi\n\n🍯 Một hũ mật ong gừng quất muối không chỉ là sản phẩm chăm sóc sức khỏe, mà còn là cảm giác ấm áp quen thuộc như những bài thuốc dịu lành từ căn bếp của gia đình"
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
    "description": "Cốt Nghệ Mật Ong Lên Men là sự kết hợp giữa nghệ tự nhiên giàu curcumin và mật ong nguyên chất, được ủ lên men theo phương pháp truyền thống nhằm tăng khả năng hấp thụ và làm dịu vị hăng của nghệ.",
    "flag": "Bán chạy nhất",
    "fullDescription": "Cốt Nghệ Mật Ong Lên Men là sự kết hợp giữa nghệ tự nhiên giàu curcumin và mật ong nguyên chất, được ủ lên men theo phương pháp truyền thống nhằm tăng khả năng hấp thụ và làm dịu vị hăng của nghệ. Sản phẩm hướng đến cơ chế chăm sóc cơ thể từ gốc — hỗ trợ tiêu hóa, làm đẹp da và nuôi dưỡng sức khỏe một cách tự nhiên, lành tính.\n\n✨ Thành phần nổi bật\nNước cốt nghệ đỏ: Giàu curcumin, hỗ trợ chống oxy hóa và giúp cơ thể thanh lọc tự nhiên\nMật ong lên men: Bổ sung dưỡng chất, hỗ trợ làm dịu và cân bằng hệ tiêu hóa\nQuá trình lên men tự nhiên: Giúp dưỡng chất dễ hấp thụ hơn và tạo hệ enzyme có lợi cho cơ thể\n💛 Công dụng nổi bật\n- Cải thiện hệ vi sinh đường ruột \n- Hỗ trợ làm đẹp da từ bên trong\n- Giúp cơ thể chống oxy hóa và giảm cảm giác mệt mỏi\n- Hỗ trợ tiêu hóa và làm dịu dạ dày\n- Giúp cơ thể hấp thụ dưỡng chất tốt hơn\n- Hỗ trợ cải thiện làn da xỉn màu, thiếu sức sống\n\nPhù hợp với người: \n- Mắc các chứng bệnh trào ngược dạ dày, đau dạ dày\n- Người tiêu hóa kém, táo bón, đầy hơi, ợ hơi ợ chua\n- Người cần detox, người bia rượu nhiều cần thải độc gan\n- Người già bị các vấn đề về xương khớp, tiểu đường, mỡ gan, mỡ máu \n\nLưu ý: Không sử dụng cho trẻ em dưới 2 tuổi",
    "ingredients": "Mật ong lên men, Nghệ đỏ",
    "usage": "🍯 Cách dùng hằng ngày\nPha 15–20ml Cốt Nghệ Mật Ong với khoảng 200ml nước ấm 40–50°C\nKhuấy đều và uống từ từ\n\n👉 Nên sử dụng 2 lần/ngày vào buổi sáng và buổi tối\n👉 Uống trước bữa ăn khoảng 30 phút để cơ thể hấp thụ tốt hơn\n\n🌿 Có thể sử dụng ngoài da\nDùng một lượng nhỏ bôi trực tiếp lên vùng da có:\nVết thương nhỏ\nDa trầy xước nhẹ\nVùng bỏng nhẹ hoặc da cần làm dịu\n\n👉 Nên làm sạch vùng da trước khi sử dụng\n\n⏳ Hạn sử dụng\n24 tháng kể từ ngày sản xuất\n📦 Bảo quản\n- Bảo quản nơi khô ráo, thoáng mát\n- Tránh ánh nắng trực tiếp\n- Có thể bảo quản lạnh để giữ độ tươi ngon và hương vị dễ dùng hơn\n\n⚠️ Lưu ý\n- Không dùng cho:\n- Người dị ứng với mật ong hoặc nghệ\n- Trẻ em dưới 2 tuổi\n- ,Không pha với nước quá nóng để giữ enzyme và dưỡng chất tự nhiên của sản phẩm\n\n💛 Kiên trì sử dụng đều đặn mỗi ngày là cách nhẹ nhàng để cơ thể được nuôi dưỡng, phục hồi và khỏe hơn từ bên trong"
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
