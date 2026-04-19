import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      title: "Samuel's Journey to Engineering",
      date: "October 12, 2025",
      category: "Student Story",
      excerpt: "At age 10, Samuel had never stepped foot in a classroom. Through CECE's Dream, he is now top of his class and dreams of engineering a new power grid for his community.",
      image: "seed/studentreading1",
    },
    {
      title: "Opening Doors in Monrovia",
      date: "September 30, 2025",
      category: "Impact Report",
      excerpt: "This month, we successfully provided full tuition assistance to 45 new students in Monrovia, ensuring they can focus on their studies instead of their school fees.",
      image: "seed/classroom2",
    },
    {
      title: "The Ripple Effect of Education",
      date: "August 15, 2025",
      category: "Perspective",
      excerpt: "When you fund a child's education, you aren't just changing their life. You are uplifting their family, their community, and eventually, their entire nation.",
      image: "seed/community3",
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
      <div className="mb-16 md:mb-20 border-b border-border pb-10">
        <h1 className="serif text-[54px] md:text-[64px] italic text-text mb-6">Stories of Hope</h1>
        <p className="text-[20px] text-text-dim max-w-[700px] leading-[1.6]">Updates, impact reports, and incredible stories of resilience from the students and communities we serve at CECE's Dream.</p>
      </div>

      <div className="flex flex-col gap-16">
        {posts.map((post, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="group flex flex-col lg:flex-row gap-10 lg:gap-16 items-center"
          >
            <div className="w-full lg:w-[60%] shrink-0 overflow-hidden rounded-[4px] border border-border shadow-md">
              <img 
                src={`https://picsum.photos/${post.image}/1000/600`} 
                alt={post.title} 
                className="w-full h-[400px] lg:h-[500px] object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex flex-col flex-grow py-4">
              <p className="text-[12px] text-accent mb-4 font-bold uppercase tracking-[2px]">{post.date} &mdash; <span className="text-text-dim">{post.category}</span></p>
              <h2 className="serif text-[36px] md:text-[42px] text-text group-hover:text-accent transition-colors mb-6 line-clamp-3 leading-[1.2]">
                {post.title}
              </h2>
              <p className="text-[18px] text-text-dim mb-8 leading-[1.6]">
                {post.excerpt}
              </p>
              
              <div className="mt-auto inline-flex items-center text-[14px] font-bold text-accent tracking-[1px] uppercase border-b-2 border-transparent group-hover:border-accent w-max pb-1 cursor-pointer transition-colors">
                Read Article <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-24 text-center">
        <button className="bg-transparent border-2 border-text text-text px-12 py-[20px] text-[14px] font-bold tracking-[1px] uppercase hover:bg-text hover:text-white transition-colors">
          Load More Stories
        </button>
      </div>
    </div>
  );
}
