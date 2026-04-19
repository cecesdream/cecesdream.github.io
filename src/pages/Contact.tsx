import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/public/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus('success');
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus('error');
    }
  };

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
           className="bg-surface p-8 md:p-12 rounded-[4px] border border-border shadow-xl relative overflow-hidden"
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h3 className="serif text-[28px] text-text mb-4">Message Sent</h3>
                <p className="text-text-dim mb-8 max-w-[300px]">
                  Thank you for reaching out! We've received your message and will get back to you shortly.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="bg-text text-white px-8 py-3 rounded-[2px] text-[14px] font-bold uppercase tracking-[2px] hover:bg-accent transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="serif text-[28px] text-text mb-8">Send a message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div>
                     <label className="block text-[12px] font-bold text-text-dim mb-2 uppercase tracking-[2px]">Name</label>
                     <input 
                       type="text" 
                       className="w-full bg-bg border border-border text-text rounded-[2px] px-4 py-3 outline-none focus:border-accent transition-colors" 
                       placeholder="Your name" 
                       required 
                       value={formData.name}
                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                       disabled={status === 'loading'}
                     />
                   </div>
                   <div>
                     <label className="block text-[12px] font-bold text-text-dim mb-2 uppercase tracking-[2px]">Email Address</label>
                     <input 
                       type="email" 
                       className="w-full bg-bg border border-border text-text rounded-[2px] px-4 py-3 outline-none focus:border-accent transition-colors" 
                       placeholder="Your email address" 
                       required 
                       value={formData.email}
                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                       disabled={status === 'loading'}
                     />
                   </div>
                   <div>
                     <label className="block text-[12px] font-bold text-text-dim mb-2 uppercase tracking-[2px]">Message</label>
                     <textarea 
                        rows={5} 
                        className="w-full bg-bg border border-border text-text rounded-[2px] px-4 py-3 outline-none focus:border-accent transition-colors resize-none" 
                        placeholder="How can we help you?" 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        disabled={status === 'loading'}
                     ></textarea>
                   </div>
                   
                   <button 
                     type="submit"
                     disabled={status === 'loading'}
                     className="w-full bg-text text-white py-[20px] rounded-[2px] text-[14px] font-bold uppercase tracking-[2px] hover:bg-accent transition-colors mt-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {status === 'loading' ? (
                       <>
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                         Sending...
                       </>
                     ) : (
                       <>
                         <Send className="w-4 h-4" />
                         Send Message
                       </>
                     )}
                   </button>

                   {status === 'error' && (
                     <div className="flex items-center gap-3 text-red-500 text-[14px] mt-4 bg-red-500/10 p-3 rounded-[2px]">
                       <AlertCircle className="w-4 h-4" />
                       Something went wrong. Please try again.
                     </div>
                   )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
      </div>
    </div>
  );
}
