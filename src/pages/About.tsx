import { motion } from "motion/react";
import { Link } from "react-router-dom";
import founderImg from "../assets/davidheadshot.jpg";

import sandraImg from "../assets/sandra-bruxvoort.png";
import ashleyImg from "../assets/ashley-steyer.png";
import jaredImg from "../assets/jared-vanlandingham.jpg";
import michaelImg from "../assets/michael-taylor.png";
import jennyImg from "../assets/jenny-waddle.png";
import peterImg from "../assets/peter-lazarz.png";
import teraImg from "../assets/tera-palozola.png";

const boardMembers = [
  { name: "David Ziama", role: "Founder", img: founderImg },
  { name: "Peter Lazarz", role: "Board Member", img: peterImg },
  { name: "Tera Palozola", role: "Board Member", img: teraImg },
  { name: "Sandra Bruxvoort", role: "Board Member", img: sandraImg },
  { name: "Ashley Steyer", role: "Board Member", img: ashleyImg },
  { name: "Jared Vanlandingham", role: "Board Member", img: jaredImg },
  { name: "Michael Taylor", role: "Board Member", img: michaelImg },
  { name: "Jenny Waddle", role: "Board Member", img: jennyImg }
];

export default function About() {
  return (
    <div className="w-full bg-bg">
      {/* Hero Section */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 pt-20 pb-24 text-center border-b border-border">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h4 className="text-[12px] font-bold uppercase tracking-[3px] text-accent mb-6">About CECE's Dream</h4>
          <h1 className="serif text-[42px] md:text-[64px] italic text-text mb-10 tracking-wide leading-[1.1]">
            Empowering Dreams, Building Futures.
          </h1>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="w-full max-w-[1200px] mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-[12px] font-bold uppercase tracking-[2px] text-accent mb-4">Our Vision</h4>
            <h2 className="serif text-[32px] md:text-[42px] text-text mb-6">Envisioning a World of Equal Opportunity</h2>
            <p className="text-text-dim leading-[1.8] text-[16px] md:text-[18px]">
              Our non-profit seeks to create a future where access to education and entrepreneurship is not limited by financial constraints. We envision thriving communities in third-world countries where every individual has the opportunity to pursue their dreams through education and entrepreneurship.
            </p>
            <p className="text-text-dim leading-[1.8] text-[16px] md:text-[18px] mt-4">
              By providing tuition assistance and business loans, we aspire to catalyze sustainable development, empower individuals to realize their full potential, and build a more equitable and prosperous world for generations to come.
            </p>
            <div className="mt-8 p-6 bg-surface border-l-4 border-accent">
               <h5 className="font-bold uppercase tracking-[1.5px] text-[13px] text-text mb-2">At Our Core</h5>
               <p className="text-text-dim italic leading-[1.6]">To catalyze sustainable development to build a more equitable and prosperous world for generations to come.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-[12px] font-bold uppercase tracking-[2px] text-accent mb-4">Our Mission</h4>
            <h2 className="serif text-[32px] md:text-[42px] text-text mb-6">Breaking Barriers</h2>
            <p className="text-text-dim leading-[1.8] text-[16px] md:text-[18px]">
              Our non-profit is dedicated to breaking barriers to education and entrepreneurship in third-world countries. We provide financial assistance for tuition fees, enabling individuals to access quality education. 
            </p>
            <p className="text-text-dim leading-[1.8] text-[16px] md:text-[18px] mt-4">
               Additionally, we offer business loans to aspiring entrepreneurs, fostering economic growth and self-sustainability within communities. Through our commitment to empowerment and opportunity, we strive to catalyze lasting positive change and create a pathway to a brighter future for all.
            </p>
            <div className="mt-8 p-6 bg-surface border-l-4 border-accent">
               <h5 className="font-bold uppercase tracking-[1.5px] text-[13px] text-text mb-2">At Our Core</h5>
               <p className="text-text-dim italic leading-[1.6]">To break barriers to education and entrepreneurship through individual and community assistance in order to develop sustainability, empower dreams and build futures.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="bg-text text-white py-24 px-6 md:px-10">
         <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
               className="lg:col-span-5"
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}  
            >
               <img src={founderImg} alt="David Ziama, Founder of CECE's Dream" className="w-full h-auto aspect-[4/5] object-cover border border-white/20 shadow-2xl" />
            </motion.div>
            <motion.div 
               className="lg:col-span-7"
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
               <h4 className="text-[12px] font-bold uppercase tracking-[2px] text-accent mb-4">Founder's Story</h4>
               <h2 className="serif text-[36px] md:text-[54px] mb-8 leading-[1.1]">From Liberia with a Dream.</h2>
               <div className="space-y-6 text-[16px] md:text-[18px] leading-[1.8] text-white/80 font-medium">
                  <p>
                    As a refugee from Liberia, I arrived in the United States on a student visa with a dream of building a better future. My journey was fraught with challenges, but I was determined to make the most of the opportunities that presented themselves to build a better life for myself and my family.
                  </p>
                  <p>
                    Through hard work, perseverance, and the support of my community, I was able to pursue a college education, a privilege that many others don't have. This accomplishment was not only a personal victory but also a testament to the power of education to transform lives.
                  </p>
                  <p>
                    My experiences have shaped me into the person I am today, and I am passionate about giving back to my community and helping others achieve their dreams. I believe that everyone deserves a chance to reach their full potential, regardless of their background or circumstances. My mission is to create opportunities, provide support, and advocate for policies that empower individuals and communities to thrive.
                  </p>
               </div>
               <div className="mt-10">
                 <h5 className="font-bold text-[18px]">David Ziama</h5>
                 <p className="text-accent uppercase tracking-[2px] text-[12px] font-bold mt-1">Founder & Executive Director</p>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Board Members */}
      <section className="bg-bg py-24 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h4 className="text-[12px] font-bold uppercase tracking-[3px] text-accent mb-4">Leadership</h4>
            <h2 className="serif text-[36px] md:text-[48px] text-text">Our Board of Directors</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {boardMembers.map((member, index) => {
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden mb-6 border border-border bg-surface flex items-center justify-center shadow-sm">
                    {member.img ? (
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="text-text-dim/20 bg-surface w-full h-full flex items-center justify-center">No Image</div>
                    )}
                  </div>
                  <h3 className="font-bold text-text text-[16px] md:text-[18px] mb-1">{member.name}</h3>
                  <p className="text-accent uppercase tracking-[1px] text-[11px] font-bold">{member.role}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 text-center px-6 max-w-4xl mx-auto border-t border-border">
        <h2 className="serif text-[32px] md:text-[40px] text-text mb-6">Join Our Journey</h2>
        <p className="text-text-dim text-[18px] mb-10 leading-[1.6]">We are always looking for advocates and donors who believe in the power of education.</p>
        <Link 
          to="/contact" 
          className="bg-transparent rounded-[2px] border-2 border-text text-text px-12 py-[20px] text-[14px] font-bold tracking-[1.5px] uppercase hover:bg-text hover:text-white transition-colors inline-block mx-2 mb-4"
        >
          Contact Us
        </Link>
        <Link 
          to="/donate" 
          className="bg-accent rounded-[2px] border-2 border-accent text-white px-12 py-[20px] text-[14px] font-bold tracking-[1.5px] uppercase hover:bg-[#a00828] hover:border-[#a00828] transition-colors inline-block mx-2 mb-4 shadow-xl"
        >
          Sponsor A Student
        </Link>
      </section>
    </div>
  );
}
