import { motion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="w-full bg-bg">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        
        {/* Contact Info */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h4 className="text-[12px] font-bold uppercase tracking-[3px] text-accent mb-6">Get In Touch</h4>
          <h1 className="serif text-[42px] md:text-[54px] italic text-text mb-8 leading-[1.1]">
            We'd love to hear from you.
          </h1>
          <p className="text-[18px] text-text-dim leading-[1.6] mb-12">
            Whether you have questions about our programs, want to volunteer, or just want to say hi, our team is ready to answer your questions.
          </p>

          <div className="space-y-8">
             <div className="flex items-start">
                <div className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center shrink-0 mr-6">
                   <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                   <h5 className="font-bold text-[14px] uppercase tracking-[1.5px] text-text mb-1">Email Us</h5>
                   <a href="mailto:cece@cecesdream.org" className="text-text-dim text-[18px] hover:text-accent transition-colors">
                     cece@cecesdream.org
                   </a>
                </div>
             </div>
             
             <div className="flex items-start">
                <div className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center shrink-0 mr-6">
                   <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                   <h5 className="font-bold text-[14px] uppercase tracking-[1.5px] text-text mb-1">Call Us</h5>
                   <a href="tel:+18168001474" className="text-text-dim text-[18px] hover:text-accent transition-colors">
                     +1 816 800 1474
                   </a>
                </div>
             </div>

             <div className="flex items-start">
                <div className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center shrink-0 mr-6">
                   <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                   <h5 className="font-bold text-[14px] uppercase tracking-[1.5px] text-text mb-1">Mailing Address</h5>
                   <p className="text-text-dim text-[18px]">
                     Kansas City, MO<br />
                     USA
                   </p>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
           className="bg-surface p-8 md:p-12 rounded-[4px] border border-border shadow-xl"
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="serif text-[28px] text-text mb-8">Send a message</h3>
          <form className="space-y-6">
             <div>
               <label className="block text-[12px] font-bold text-text-dim mb-2 uppercase tracking-[2px]">Name</label>
               <input type="text" className="w-full bg-bg border border-border text-text rounded-[2px] px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="Your name" required />
             </div>
             <div>
               <label className="block text-[12px] font-bold text-text-dim mb-2 uppercase tracking-[2px]">Email Address</label>
               <input type="email" className="w-full bg-bg border border-border text-text rounded-[2px] px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="Your email address" required />
             </div>
             <div>
               <label className="block text-[12px] font-bold text-text-dim mb-2 uppercase tracking-[2px]">Message</label>
               <textarea rows={5} className="w-full bg-bg border border-border text-text rounded-[2px] px-4 py-3 outline-none focus:border-accent transition-colors resize-none" placeholder="How can we help you?" required></textarea>
             </div>
             <button 
               type="submit"
               className="w-full bg-text text-white py-[20px] rounded-[2px] text-[14px] font-bold uppercase tracking-[2px] hover:bg-accent transition-colors mt-4"
               onClick={(e) => { e.preventDefault(); alert("Thanks for trying out the demo!"); }}
             >
               Send Message
             </button>
          </form>
        </motion.div>
        
      </div>
    </div>
  );
}
