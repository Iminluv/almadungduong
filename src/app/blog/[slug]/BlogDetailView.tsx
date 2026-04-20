"use client";

import { blogPosts } from "@/lib/data";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogDetailView() {
  const params = useParams();
  const slug = params.slug as string;
  
  const post = blogPosts.find(p => p.id === slug);
  
  if (!post) {
    return notFound();
  }

  const relatedPosts = blogPosts.filter(p => p.id !== slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-bg">
      {/* Article Header */}
      <section className="pt-24 md:pt-32 pb-16 border-b border-surface">
        <div className="container-custom max-w-4xl">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="space-y-6 text-center"
           >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent border border-accent/20 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-medium leading-[1.15]">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-[11px] text-muted font-medium uppercase tracking-widest pt-4">
                 <span>{post.date}</span>
                 <span>·</span>
                 <span>{post.readTime} đọc</span>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative aspect-[21/9] w-full bg-surface">
         <Image 
            src={post.image} 
            alt={post.title} 
            fill 
            className="object-cover" 
            priority
         />
      </section>

      {/* Article Content */}
      <section className="py-20 md:py-32">
         <article className="container-custom max-w-3xl">
            <div className="space-y-12 text-lg leading-relaxed text-text/80 font-body">
               <p className="text-xl font-serif italic text-text first-letter:text-5xl first-letter:font-display first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                  {post.excerpt}
               </p>
               
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
               </p>

               <div className="p-10 bg-surface/50 border-l-2 border-accent italic font-serif text-2xl text-text">
                  "Sức mạnh của mỹ phẩm vi sinh nằm ở việc cân bằng thay vì tác động cưỡng chế."
               </div>

               <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               </p>

               <h2 className="text-3xl font-display font-semibold pt-8 text-text uppercase tracking-tight">Cơ chế tác động</h2>
               <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
               </p>

               <div className="relative aspect-video w-full">
                  <Image 
                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200" 
                    alt="Process" 
                    fill 
                    className="object-cover"
                  />
                  <p className="absolute bottom-[-30px] left-0 text-xs italic text-muted">Quy trình nghiên cứu vi sinh tại Alma Lab.</p>
               </div>

               <p className="pt-12">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
               </p>
            </div>

            {/* Tags & Share */}
            <div className="mt-24 pt-12 border-t border-surface flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="flex gap-4">
                  {["Vi sinh", "Phục hồi", "Khoa học"].map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-muted">#{tag}</span>
                  ))}
               </div>
               <div className="flex items-center gap-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Chia sẻ:</span>
                  <button className="text-[10px] font-bold uppercase hover:text-accent transition-colors">FB</button>
                  <button className="text-[10px] font-bold uppercase hover:text-accent transition-colors">Zalo</button>
                  <button className="text-[10px] font-bold uppercase hover:text-accent transition-colors">Link</button>
               </div>
            </div>
         </article>
      </section>

      {/* Related Posts */}
      <section className="py-24 bg-surface">
         <div className="container-custom">
            <h4 className="text-2xl font-display font-bold uppercase tracking-widest text-center mb-16">Xem tiếp theo</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
               {relatedPosts.map(post => (
                  <Link key={post.id} href={`/blog/${post.id}`} className="group space-y-4">
                     <div className="relative aspect-video overflow-hidden">
                        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                     </div>
                     <h5 className="text-xl font-display font-semibold group-hover:text-accent transition-colors leading-tight">{post.title}</h5>
                  </Link>
               ))}
            </div>
            <div className="text-center mt-16">
               <Link href="/blog" className="text-xs font-bold uppercase tracking-widest border-b border-text hover:text-muted hover:border-muted transition-all">Tất cả bài viết</Link>
            </div>
         </div>
      </section>
    </main>
  );
}
