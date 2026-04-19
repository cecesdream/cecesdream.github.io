import { motion, useScroll, useTransform, useInView, useSpring, useMotionValueEvent } from "motion/react";
import { Link } from "react-router-dom";
import { Heart, User, ArrowDown, MapPin } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import heroImg from "../assets/liberia-hero.jpg";
import blessingImg from "../assets/story-blessing.jpg";
import economyImg from "../assets/economy-struggle.jpg";
import scholarsImg from "../assets/kids-smiling.jpg";
import graduationImg from "../assets/students-graduation.jpg";
import classroomImg from "../assets/student-desk-writing.jpg";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function useStickyScrollProgress(ref: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let tick = false;
    const handleScroll = () => {
      if (tick) return;
      tick = true;
      
      window.requestAnimationFrame(() => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const winH = window.innerHeight;
          // Total distance the user scrolls vertically while the container is pinned
          const totalScroll = rect.height - winH;
          // How far down the pinned container has traveled
          let p = -rect.top / totalScroll;
          
          if (!isFinite(p) || isNaN(p)) p = 0;
          p = Math.max(0, Math.min(1, p));
          setProgress(p);
        }
        tick = false;
      });
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ref]);

  return progress;
}

// Sequential Pictograph Component
function SequentialPictograph({ progress }: { progress: number }) {
  let step = 0;
  if (progress > 0.05) step = 1;
  if (progress > 0.40) step = 2;
  if (progress > 0.75) step = 3;

  const getText = () => {
    if (step === 0 || step === 1) return { num: "100", label: "For every 100 kids in Liberia...", color: "text-[#002868]" };
    if (step === 2) return { num: "38", label: "Only 38 will enroll in secondary school.", color: "text-[#002868]" };
    return { num: "17", label: "And only 17 will graduate.", color: "text-[#BF0A30]" };
  };

  const { num, label, color } = getText();

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-10 gap-x-1 sm:gap-x-2 md:gap-x-3 gap-y-1 sm:gap-y-2 md:gap-y-3 mb-4 md:mb-8 max-w-[240px] sm:max-w-[320px] md:max-w-[450px]">
        {Array.from({ length: 100 }).map((_, i) => {
          let isActive = false;
          let isAccent = false;

          if (step === 1) {
            isActive = true;
          } else if (step === 2) {
            if (i < 38) isActive = true;
          } else if (step === 3) {
            if (i < 17) {
              isActive = true;
              isAccent = true;
            }
          }

          let staggerDelay = 0;
          if (step === 1) staggerDelay = i * 0.01;
          else if (step === 2 && !isActive) staggerDelay = (99 - i) * 0.015;
          else if (step === 3 && !isActive && i >= 17 && i < 38) staggerDelay = (37 - i) * 0.03;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: step === 0 ? 0 : isActive ? 1 : 0.2, 
                scale: step === 0 ? 0.8 : 1 // Never shrink so the ghosts hold space
              }}
              transition={{ 
                duration: 0.5, 
                delay: staggerDelay 
              }}
            >
              <User 
                className={`w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] md:w-[22px] md:h-[22px] transition-colors duration-500 ${isAccent ? "text-[#BF0A30] drop-shadow-md" : isActive ? "text-[#002868] drop-shadow-md" : "text-[#002868]"}`} 
                strokeWidth={isActive ? 2.5 : 1.5} 
              />
            </motion.div>
          );
        })}
      </div>
      
      <div className="h-[90px] md:h-[140px] flex flex-col items-center justify-start text-center mt-2 md:mt-4">
        <motion.h3 
          key={`num-${step}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`serif text-[60px] md:text-[100px] font-bold leading-[1] ${color}`}
        >
          {num}
        </motion.h3>
        <motion.p 
          key={`label-${step}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[14px] md:text-[22px] text-text-dim mt-2 md:mt-4 max-w-[280px] md:max-w-[360px] font-medium leading-[1.3] md:leading-[1.4]"
        >
          {label}
        </motion.p>
      </div>
    </div>
  );
}

// Interactive Scroll-Driven SVG Globe
function GlobeTracking({ progress }: { progress: number }) {
  // Phase 1 (0 to 0.5): Rotate
  // Phase 2 (0.5 to 1.0): Zoom into Liberia
  const rotProgress = Math.min(1, progress * 2);
  const zoomProgress = Math.max(0, (progress - 0.5) * 2);

  const rx = 100 - (rotProgress * 90.6);
  const ry = -40 + (rotProgress * 33.6);
  const scale = 240 + (zoomProgress * 1100);

  const snapRx = Math.round(rx * 10) / 10;
  const snapRy = Math.round(ry * 10) / 10;
  const snapScale = Math.round(scale);

  const markerOpacity = zoomProgress > 0.2 ? Math.min(1, (zoomProgress - 0.2) * 2) : 0;

  return (
    <div style={{ position: "relative" }} className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[500px] aspect-square mx-auto group">
      <ComposableMap
        projection="geoOrthographic"
        projectionConfig={{
          rotate: [snapRx, snapRy, 0],
          scale: snapScale
        }}
        style={{ width: "100%", height: "100%" }}
        className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-xl"
      >
        <Sphere stroke="#D6D6DA" strokeWidth={0.5} fill="#F8F9FA" id="sphere" />
        <Graticule stroke="#EAEAEC" strokeWidth={0.5} />
        
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isLiberia = geo.properties.name === "Liberia";
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isLiberia ? "#BF0A30" : "#D6D6DA"}
                  stroke={isLiberia ? "#BF0A30" : "#FFFFFF"}
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" }
                  }}
                />
              );
            })
          }
        </Geographies>

        <Marker coordinates={[-9.4295, 6.4281]}>
          <motion.circle 
            style={{ opacity: markerOpacity }}
            r={4}
            fill="#BF0A30" 
          />
          <motion.circle 
            r={12}
            style={{ opacity: markerOpacity * 0.6 }}
            fill="#BF0A30" 
          />
        </Marker>
      </ComposableMap>

      {/* Dynamic Label that fades in as zooming finishes */}
      <motion.div 
         style={{ opacity: Math.max(0, (zoomProgress - 0.5) * 2) }} 
         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[calc(50%+1.5rem)] pointer-events-none mt-8 md:mt-16"
      >
        <span className="bg-bg text-accent text-[11px] font-bold uppercase tracking-[2px] px-3 py-1 rounded-full shadow-lg border border-border/50">
          Liberia
        </span>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const chapter2Ref = useRef<HTMLElement>(null);
  const chapter4Ref = useRef<HTMLElement>(null);
  
  const prog2 = useStickyScrollProgress(chapter2Ref);
  const prog4 = useStickyScrollProgress(chapter4Ref);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yHeroImg = useTransform(scrollYProgress, [0, 0.2], ["0%", "30%"]);
  const opacityHeroImg = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div className="w-full bg-bg" ref={containerRef}>
      {/* Chapter 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-0">
         <motion.div style={{ y: yHeroImg, opacity: opacityHeroImg }} className="absolute inset-0 z-0">
           <img 
             src={heroImg} 
             alt="Children in Liberia"
             className="w-full h-full object-cover opacity-20"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-bg"></div>
         </motion.div>

         <div className="relative z-10 max-w-[1200px] mx-auto text-center flex flex-col items-center">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-[14px] md:text-[16px] font-bold uppercase tracking-[4px] text-accent mb-6 bg-accent/10 px-4 py-2 rounded-full"
            >
              CECE's Dream
            </motion.h4>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="serif text-[54px] md:text-[80px] lg:text-[110px] text-text font-bold leading-[1.05] tracking-tight mb-12"
            >
              Unlocking a<br/><span className="italic text-accent">brighter future.</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col items-center mt-12"
            >
              <p className="text-[12px] uppercase tracking-[2px] font-bold text-text-dim mb-4">
                Scroll to discover the story
              </p>
              <ArrowDown className="w-6 h-6 text-accent animate-bounce" />
            </motion.div>
         </div>
      </section>

      {/* Chapter 2: The Nation of Liberia */}
      <section ref={chapter2Ref} className="h-[250vh] relative bg-surface z-10">
        <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden px-4 md:px-6">
          <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-16 items-center pt-8 md:pt-0">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-[10px] md:text-[12px] uppercase tracking-[3px] font-bold text-accent mb-2 md:mb-6">The Context</h4>
              <h2 className="serif text-[32px] sm:text-[38px] md:text-[54px] text-text leading-[1.1] mb-3 md:mb-8">
                A Nation of <span className="italic">Profound Resilience.</span>
              </h2>
              <p className="text-[14px] md:text-[18px] text-text-dim leading-[1.5] md:leading-[1.6] mb-3 md:mb-6">
                Located on the West Coast of Africa, Liberia is a beautiful country brimming with potential. However, it is still rebuilding its infrastructure and school systems after a devastating 14-year civil war and subsequent health crises, like the Ebola outbreak.
              </p>
              <p className="text-[14px] md:text-[18px] text-text-dim leading-[1.5] md:leading-[1.6]">
                Today, over <strong className="text-text">60% of Liberia's population is under the age of 25</strong>. The future of the entire nation rests squarely on ensuring this massive youth generation receives a quality education.
              </p>
            </motion.div>
            <div className="flex justify-center w-full">
              <GlobeTracking progress={prog2} />
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: The Economic Barrier */}
      <section className="min-h-[80vh] flex items-center justify-center bg-text text-white px-6 py-20 relative overflow-hidden z-20">
        <motion.div 
           initial={{ scale: 1.1, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 0.15 }}
           viewport={{ once: false }}
           transition={{ duration: 1.5 }}
           className="absolute inset-0 z-0 pointer-events-none"
        >
           <img src={economyImg} className="w-full h-full object-cover grayscale mix-blend-multiply" />
        </motion.div>
        
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <motion.h4
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, margin: "-100px" }}
             transition={{ duration: 0.8 }}
             className="text-[14px] uppercase tracking-[4px] font-bold text-white mb-6"
          >
            The Reality
          </motion.h4>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h3 className="text-[80px] md:text-[200px] font-bold text-accent leading-[0.9] tracking-tighter serif">
              $3.65
            </h3>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="serif text-[26px] sm:text-[34px] md:text-[54px] leading-[1.2]"
          >
            The average daily income for a family.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-[16px] md:text-[24px] font-medium text-white/70 mt-6 md:mt-8 max-w-[800px] mx-auto leading-[1.5] md:leading-[1.6]"
          >
            When daily survival, specifically securing food and shelter, is the priority, families are forced into impossible choices. School fees, required uniforms, and textbooks become an impossible luxury.
          </motion.p>
        </div>
      </section>

      {/* Chapter 4: The Education Data (Pictographs) */}
      <section ref={chapter4Ref} className="h-[250vh] relative bg-bg z-30">
        <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center px-4 md:px-6 overflow-hidden">
           <div className="max-w-[1200px] mx-auto w-full pt-8 md:pt-0">
              <div className="text-center mb-8 sm:mb-12 md:mb-20">
                <h2 className="serif text-[32px] sm:text-[38px] md:text-[54px] text-text font-bold mb-2 md:mb-4">The Educational Gap</h2>
                <p className="text-[14px] md:text-[18px] text-text-dim max-w-[600px] mx-auto leading-[1.5] mb-12">Because of extreme financial constraints, vast portions of the youth are left behind in the education system.</p>
              </div>

              <div className="flex justify-center items-center">
                 <SequentialPictograph progress={prog4} />
              </div>
           </div>
        </div>
      </section>

      {/* Chapter 5: The Micro-Narrative Catalyst */}
      <section className="bg-surface py-24 md:py-32 px-6 relative border-t border-border">
         <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="order-2 lg:order-1"
            >
               <h4 className="text-[12px] uppercase tracking-[3px] font-bold text-accent mb-6">Behind the Numbers</h4>
               <h2 className="serif text-[42px] md:text-[54px] text-text leading-[1.1] mb-8">
                 Meet Blessing.
               </h2>
               <p className="text-[18px] text-text-dim leading-[1.6] mb-6 italic border-l-4 border-accent pl-6">
                 "Our statistics are sobering, but they blind us to the brilliant individuals hiding behind them."
               </p>
               <p className="text-[18px] text-text-dim leading-[1.6] mb-8">
                 Blessing is 14 years old. After her father grew ill, her family could no longer afford the $50 term fee for her secondary school. Like the 62% of her peers, she was forced to drop out to help sell goods at the local market. Her dream of becoming a nurse faded.
               </p>
               <Link to="/blog" className="inline-flex items-center text-[14px] uppercase font-bold text-text hover:text-accent tracking-[2px] transition-colors border-b border-text hover:border-accent pb-1">
                 Read Her Full Recovery Story <Heart className="w-4 h-4 ml-2" />
               </Link>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="order-1 lg:order-2 w-full h-[500px] lg:h-[650px] relative rounded-[4px] overflow-hidden border border-border shadow-lg"
            >
               <img src={blessingImg} alt="Student Portrait" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
               <div className="absolute bottom-6 left-6 text-white">
                 <h3 className="serif text-[28px] font-bold">Blessing, 14</h3>
                 <p className="text-white/80 font-medium text-[14px] uppercase tracking-[1px] mt-1">Future Nurse, Monrovia</p>
               </div>
            </motion.div>
         </div>
      </section>

       {/* Chapter 6: Our Response */}
       <section className="bg-bg text-text px-6 py-24 relative">
         <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-[4px] overflow-hidden shadow-xl border border-border order-2 lg:order-1"
            >
              <img src={scholarsImg} alt="Students with CECE's Dream" className="w-full h-[400px] lg:h-[600px] object-cover" />
            </motion.div>

            <div className="order-1 lg:order-2">
               <motion.h4
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="text-[12px] uppercase tracking-[4px] font-bold text-accent mb-6"
               >
                 CECE's Dream
               </motion.h4>
               <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="serif text-[42px] md:text-[54px] leading-[1.1] mb-8 text-text font-bold"
               >
                 We are changing the <span className="italic text-accent">narrative.</span>
               </motion.h2>
               <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-[18px] md:text-[20px] font-medium text-text-dim max-w-[800px] leading-[1.6]"
               >
                 Through direct partnerships with local schools and global donors, we provide tuition assistance to students who face financial barriers, offering funding, hope, and a chance to dream again.
               </motion.p>
            </div>
         </div>
       </section>

       {/* Chapter 7: Call to Action */}
       <section className="relative py-32 md:py-40 text-center px-6 text-white overflow-hidden">
         <div className="absolute inset-0 z-0">
            <img src={graduationImg} className="w-full h-full object-cover opacity-40 grayscale" />
            <div className="absolute inset-0 bg-text/80 mix-blend-multiply"></div>
         </div>
         
         <div className="relative z-10 flex flex-col items-center">
           <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
           >
             <Heart className="w-16 h-16 text-accent mb-10" />
           </motion.div>
           <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="serif text-[42px] md:text-[68px] mb-8 max-w-[1000px] mx-auto leading-[1.1]"
           >
              Every child deserves the opportunity to learn.
           </motion.h2>
           <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/70 max-w-3xl mx-auto mb-16 text-[20px] md:text-[26px] font-medium leading-[1.6]"
           >
              Join us in making that dream a reality, one student at a time.
           </motion.p>
           <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
           >
              <Link 
                to="/donate" 
                className="bg-accent text-white rounded-[2px] px-14 py-[24px] text-[16px] md:text-[18px] font-bold tracking-[2px] uppercase hover:bg-[#a00828] transition-all inline-flex items-center shadow-[0_10px_30px_rgba(191,10,48,0.3)] hover:shadow-[0_20px_40px_rgba(191,10,48,0.5)] hover:-translate-y-1"
              >
                Give The Gift of Education 
              </Link>
           </motion.div>
         </div>
       </section>
    </div>
  );
}
