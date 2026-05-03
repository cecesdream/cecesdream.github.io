import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import posts from "../data/posts.json";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
      <div className="mb-16 md:mb-20 border-b border-border pb-10">
        <h1 className="serif text-[54px] md:text-[64px] italic text-text mb-6">Stories of Hope</h1>
        <p className="text-[20px] text-text-dim max-w-[700px] leading-[1.6]">Updates, impact reports, and incredible stories of resilience from the students and communities we serve at CECE's Dream.</p>
      </div>

      <div className="flex flex-col gap-16">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
          >
            <Link
              to={`/blog/${post.slug}`}
              className="group flex flex-col lg:flex-row gap-10 lg:gap-16 items-center"
            >
              <div className="w-full lg:w-[60%] shrink-0 overflow-hidden rounded-[4px] border border-border shadow-md">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[400px] lg:h-[500px] object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col flex-grow py-4">
                <p className="text-[12px] text-accent mb-4 font-bold uppercase tracking-[2px]">{formatDate(post.date)} &mdash; <span className="text-text-dim">{post.category}</span></p>
                <h2 className="serif text-[36px] md:text-[42px] text-text group-hover:text-accent transition-colors mb-6 line-clamp-3 leading-[1.2]">
                  {post.title}
                </h2>
                <p className="text-[18px] text-text-dim mb-8 leading-[1.6]">
                  {post.excerpt}
                </p>

                <div className="mt-auto inline-flex items-center text-[14px] font-bold text-accent tracking-[1px] uppercase border-b-2 border-transparent group-hover:border-accent w-max pb-1 transition-colors">
                  Read Article <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
