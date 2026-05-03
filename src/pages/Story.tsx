import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
        </motion.div>
      </div>

      <section className="bg-text text-white px-6 py-20 md:py-24">
        <div className="max-w-[760px] mx-auto text-center">
          <h4 className="text-[12px] uppercase tracking-[4px] font-bold text-white/70 mb-6">Take Action</h4>
          <h2 className="serif text-[34px] md:text-[48px] leading-[1.15] mb-6">
            Help change the story.
          </h2>
          <p className="text-[16px] md:text-[18px] text-white/80 leading-[1.6] mb-10 max-w-[560px] mx-auto">
            A $30/month sponsorship covers a Liberian student's full school year &mdash; tuition, uniform, and books.
          </p>
          <Link
            to="/donate"
            className="inline-flex items-center bg-accent text-white px-10 py-[18px] rounded-[2px] text-[14px] font-bold uppercase tracking-[1.5px] hover:bg-[#a00828] transition-colors shadow-lg group"
          >
            Sponsor a student <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <div className="max-w-[760px] mx-auto px-6 md:px-10 py-10">
        <Link to="/blog" className="inline-flex items-center text-[14px] uppercase font-bold text-text hover:text-accent tracking-[2px] transition-colors border-b border-text hover:border-accent pb-1">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to all stories
        </Link>
      </div>
    </article>
  );
}
