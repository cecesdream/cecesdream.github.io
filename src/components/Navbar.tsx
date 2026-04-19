import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { text: "Our Mission", path: "/about" },
    { text: "Stories", path: "/blog" },
    { text: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-surface border-b border-border shadow-none" : "bg-bg border-b border-border"}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="serif text-2xl tracking-[2px] uppercase text-text font-bold">CECE's Dream</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-[13px] uppercase tracking-[1.5px] font-bold text-text-dim hover:text-accent transition-colors border-b-2 border-transparent hover:border-accent pb-1"
              >
                {link.text}
              </Link>
            ))}
            <Link 
              to="/donate" 
              className="bg-accent text-white px-10 py-4 font-bold text-[13px] tracking-[1.5px] uppercase transition-opacity hover:opacity-90 rounded-[2px] shadow-sm"
            >
              Donate Now
            </Link>
          </div>

          <button className="md:hidden text-text" onClick={() => setIsOpen(true)}>
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full bg-surface border-b border-border flex flex-col p-6 shadow-2xl md:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="serif text-xl tracking-[2px] uppercase text-text font-bold">CECE's Dream</span>
              <button onClick={() => setIsOpen(false)}><X className="w-8 h-8 text-text" /></button>
            </div>
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="text-[14px] uppercase tracking-[1.5px] font-bold text-text-dim hover:text-accent"
                >
                  {link.text}
                </Link>
              ))}
              <Link 
                to="/donate" 
                className="bg-accent text-white px-6 py-4 font-bold text-[14px] tracking-[1.5px] uppercase mx-auto rounded-[2px] shadow-sm"
              >
                Donate Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
