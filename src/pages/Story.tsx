import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import posts from "../data/posts.json";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Story() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-[800px] mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
        <h1 className="serif text-[42px] md:text-[54px] italic text-text mb-6">Story not found.</h1>
        <p className="text-[18px] text-text-dim mb-8">We couldn't find the story you were looking for.</p>
        <Link to="/blog" className="inline-flex items-center text-[14px] uppercase font-bold text-text hover:text-accent tracking-[2px] transition-colors border-b border-text hover:border-accent pb-1">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to all stories
        </Link>
      </div>
    );
  }

  return (
    <article className="w-full">
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-[400px] md:h-[560px] overflow-hidden border-b border-border"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="max-w-[760px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <p className="text-[12px] text-accent mb-6 font-bold uppercase tracking-[2px]">
            {formatDate(post.date)} &mdash; <span className="text-text-dim">{post.category}</span>
          </p>
          <h1 className="serif text-[42px] md:text-[64px] italic text-text leading-[1.1] mb-10">
            {post.title}
          </h1>

          <div
            className="story-body text-[18px] text-text-dim leading-[1.7]"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <div className="mt-16 pt-10 border-t border-border">
            <Link to="/blog" className="inline-flex items-center text-[14px] uppercase font-bold text-text hover:text-accent tracking-[2px] transition-colors border-b border-text hover:border-accent pb-1">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to all stories
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
