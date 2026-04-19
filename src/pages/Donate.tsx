import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Heart, GraduationCap, ArrowRight } from "lucide-react";

export default function Donate() {
  return (
    <div className="w-full bg-bg">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24">
        
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="text-[12px] font-bold uppercase tracking-[3px] text-accent mb-6">Sponsor A Student</h4>
          <h1 className="serif text-[42px] md:text-[64px] italic text-text mb-6 leading-[1.1]">
            Make a dream a reality.
          </h1>
          <p className="text-[18px] md:text-[20px] text-text-dim leading-[1.6]">
            Help students stay in school, pursue higher education, and build the foundation for a better life. Every donation goes directly to tuition assistance and supplies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Sponsorship Card */}
          <motion.div 
            className="lg:col-span-8 bg-surface rounded-[4px] border border-border shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
             <div className="bg-text text-white p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
                   <GraduationCap className="w-64 h-64" />
                </div>
                <h2 className="serif text-[36px] md:text-[48px] font-bold mb-2 relative z-10">Sponsor one student</h2>
                <p className="text-[18px] md:text-[22px] text-white/80 font-medium relative z-10">Total coverage for tuition and supplies.</p>
             </div>
             
             <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center justify-between">
                <div className="flex-1 w-full">
                  <div className="bg-bg border-2 border-accent rounded-[4px] p-6 text-center cursor-pointer hover:bg-accent/5 transition-colors relative mb-6">
                     <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold uppercase tracking-[2px] px-3 py-1 rounded-full">Most Impactful</span>
                     <h3 className="serif text-[42px] font-bold text-text leading-[1] mb-1">$30</h3>
                     <p className="text-text-dim uppercase tracking-[1px] text-[12px] font-bold">Per Month</p>
                  </div>
                  <div className="bg-bg border-2 border-border hover:border-text rounded-[4px] p-6 text-center cursor-pointer hover:bg-surface transition-colors">
                     <h3 className="serif text-[32px] font-bold text-text leading-[1] mb-1">$360</h3>
                     <p className="text-text-dim uppercase tracking-[1px] text-[12px] font-bold">Per Year</p>
                  </div>
                </div>
                
                <div className="flex-[1.5] w-full h-full flex flex-col justify-center">
                   <h4 className="text-[16px] font-bold text-text mb-4">What your sponsorship provides:</h4>
                   <ul className="space-y-4 mb-8">
                     <li className="flex items-start">
                       <Heart className="w-5 h-5 text-accent mr-3 mt-0.5 shrink-0" />
                       <span className="text-text-dim leading-[1.5]">Covers all essential tuition fees for the academic year.</span>
                     </li>
                     <li className="flex items-start">
                       <Heart className="w-5 h-5 text-accent mr-3 mt-0.5 shrink-0" />
                       <span className="text-text-dim leading-[1.5]">Provides necessary school materials, uniforms, and textbooks.</span>
                     </li>
                     <li className="flex items-start">
                       <Heart className="w-5 h-5 text-accent mr-3 mt-0.5 shrink-0" />
                       <span className="text-text-dim leading-[1.5]">Offers hope, encouragement, and a pathway to a better future.</span>
                     </li>
                   </ul>
                   
                   <a 
                     href="https://donorbox.org/cece-790449" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="w-full bg-accent text-white py-[20px] rounded-[2px] text-[15px] font-bold uppercase tracking-[1px] hover:bg-[#a00828] transition-colors flex justify-center items-center shadow-lg group"
                   >
                     Complete via Donorbox <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                   </a>
                   <p className="text-center text-[12px] text-text-dim mt-4">
                     You will be securely redirected to our Donorbox page.
                   </p>
                </div>
             </div>
          </motion.div>

          {/* Sidebar Information */}
          <motion.div 
            className="lg:col-span-4 flex flex-col gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
             <div className="bg-surface p-8 rounded-[4px] border border-border">
                <h3 className="serif text-[24px] text-text mb-4">Tax Deductible</h3>
                <p className="text-text-dim leading-[1.6]">
                  CECE's Dream is a registered 501(c)(3) non-profit organization. All donations are secure and tax-deductible to the fullest extent of the law. 
                </p>
                <div className="w-12 h-1 bg-accent mt-6"></div>
             </div>
             
             <div className="bg-text text-white p-8 rounded-[4px]">
                <h3 className="serif text-[24px] mb-4">Other Ways to Help</h3>
                <p className="text-white/70 leading-[1.6] mb-6">
                  Not ready to make a monthly commitment? You can also make a one-time donation of any amount through our Donorbox portal.
                </p>
                <a 
                   href="https://donorbox.org/cece-790449" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-block border border-white/30 hover:bg-white hover:text-text hover:border-white px-6 py-3 rounded-[2px] text-[12px] font-bold uppercase tracking-[1.5px] transition-colors"
                >
                  One-time Donation
                </a>
             </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
