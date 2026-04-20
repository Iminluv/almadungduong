"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  const milestones = [
    { year: "2005", title: "Khởi đầu", desc: "Nghiên cứu những công thức thảo dược đầu tiên kết hợp cùng chuyên gia vi sinh." },
    { year: "2010", title: "Phòng Lab Độc Lập", desc: "Thiết lập quy trình sản xuất khép kín, đạt chuẩn kiểm nghiệm lâm sàng." },
    { year: "2015", title: "Ra mắt Hệ Vi Sinh", desc: "Tiên phong ứng dụng Peptide Vi sinh vào các sản phẩm chăm sóc da tại Việt Nam." },
    { year: "2020", title: "Mạng Lưới Chăm Sóc 1:1", desc: "Xây dựng đội ngũ chuyên viên đồng hành cùng hàng nghìn phụ nữ Việt phục hồi da." },
    { year: "2025", title: "Tầm Nhìn Mới", desc: "Trở thành biểu tượng của vẻ đẹp nguyên bản và khoa học bền vững." },
  ];

  const commitments = [
    "Không hóa chất độc hại",
    "Không chất bảo quản độc hại",
    "Không gây kích ứng da",
    "Không Paraben và dầu khoáng",
    "Không hương liệu và chất tạo màu",
    "Không cồn xấu",
    "Không Sulfate (SLS/SLES)",
  ];

  return (
    <main className="min-h-screen bg-bg">
      {/* Hero Section */}
      <section className="py-24 md:py-32 flex flex-col items-center text-center container-custom">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display font-bold leading-tight"
        >
          Thuần Tự Nhiên. <br />
          <span className="text-accent">Từ Khoa Học Vi Sinh.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-lg font-serif italic text-muted max-w-2xl"
        >
          "Làn da khỏe không cần hoàn hảo, nhưng cần được yêu thương đúng cách."
        </motion.p>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-surface">
        <div className="container-custom max-w-3xl space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-semibold uppercase tracking-tight">Câu chuyện làn da</h2>
            <p className="text-lg leading-relaxed text-text/80">
              Tại Alma Dungduong, chúng tôi không tin vào những giải pháp cấp tốc mang tính tàn phá. Chúng tôi tin vào **Hệ Vi Sinh** — lớp màng bảo vệ sống động trên da. 
            </p>
            <p className="text-lg leading-relaxed text-text/80">
              Với hơn 20 năm kinh nghiệm trong ngành dược mỹ phẩm, chúng tôi hiểu rằng mọi vấn đề của da đều bắt nguồn từ sự mất cân bằng giữa lợi khuẩn và hại khuẩn.
            </p>
          </div>
          
          <div className="p-10 border-l-4 border-accent bg-bg/50 italic font-serif text-xl">
            "Mỹ phẩm vi sinh không chỉ làm đẹp, nó chữa lành từ tế bào gốc."
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-center mb-20 uppercase tracking-widest">Hành trình 20 năm</h2>
          
          <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
            {/* Center Line (Desktop) */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-surface md:-translate-x-1/2" />

            <div className="space-y-24">
              {milestones.map((m, idx) => (
                <motion.div 
                  key={m.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    idx % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-[calc(-0.5px)] md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-bg md:-translate-x-1/2 z-10" />
                  
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? "md:pl-16" : "md:pr-16 text-left md:text-right"}`}>
                    <span className="text-xl font-bold text-accent font-display">{m.year}</span>
                    <h3 className="text-xl font-semibold mt-1">{m.title}</h3>
                    <p className="mt-3 text-muted text-sm leading-relaxed max-w-md ml-0 md:ml-auto mr-0 md:mr-auto">{m.desc}</p>
                  </div>
                  
                  {/* Spacer for other side */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7 Commitments */}
      <section className="py-20 bg-navy text-white/90 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-widest leading-tight">
                7 Cam kết <br />
                <span className="text-accent">Vàng</span>
              </h2>
              <p className="text-sm text-white/60 leading-relaxed uppercase tracking-widest">Tuyệt đối an toàn cho cả làn da nhạy cảm nhất.</p>
            </div>
            
            <div className="md:w-2/3 w-full">
              <div className="divide-y divide-white/10">
                {commitments.map((c, idx) => (
                  <motion.div 
                    key={c}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="py-5 flex items-center gap-6 group hover:pl-4 transition-all"
                  >
                    <span className="text-2xl font-bold text-accent opacity-20 font-display">0{idx + 1}</span>
                    <p className="text-lg font-medium group-hover:text-white transition-colors">{c}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Quote */}
      <section className="py-32 text-center bg-bg relative">
        <div className="container-custom max-w-4xl">
           <h4 className="text-4xl md:text-6xl font-display font-semibold italic opacity-10 absolute top-10 left-0 right-0">Mission</h4>
           <p className="text-2xl md:text-3xl font-display font-medium leading-relaxed relative z-10">
            "Chúng tôi không chỉ bán mỹ phẩm. Chúng tôi khơi dậy niềm tin vào vẻ đẹp nguyên bản qua sức mạnh của hệ vi sinh tự nhiên."
           </p>
           <div className="mt-12 w-20 h-1 bg-accent mx-auto" />
        </div>
      </section>
    </main>
  );
}
