import { Link } from "react-router-dom";
import { Heart, Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-text text-white pt-16 pb-8 border-t border-border mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="serif text-[28px] tracking-[2px] uppercase text-white mb-6 font-bold">CECE's Dream</h3>
            <p className="text-white/80 text-[15px] max-w-md mb-8 leading-[1.6]">
              Every child deserves the opportunity to learn. At CECE’s Dream, we’re making that dream a reality - one student at a time by providing tuition assistance and hope.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-12 w-12 rounded-[2px] border border-white/30 flex items-center justify-center hover:border-accent hover:text-accent transition-all text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="h-12 w-12 rounded-[2px] border border-white/30 flex items-center justify-center hover:border-accent hover:text-accent transition-all text-white">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-[2px] text-white/50 mb-6">Quick Links</h4>
            <ul className="space-y-4 text-[14px]">
              <li><Link to="/about" className="text-white/80 hover:text-accent transition-colors font-medium">Our Mission</Link></li>
              <li><Link to="/blog" className="text-white/80 hover:text-accent transition-colors font-medium">Stories</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-accent transition-colors font-medium">Contact</Link></li>
              <li><Link to="/donate" className="text-white/80 hover:text-accent transition-colors font-medium">Donate</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-[2px] text-white/50 mb-6">Contact Us</h4>
            <ul className="space-y-4 text-[14px] text-white/80">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-[1.6]">Kansas City, MO<br/>USA</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>cece@cecesdream.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-[12px] uppercase tracking-[1.5px] text-white/50 font-bold">
          <p>&copy; {new Date().getFullYear()} CECE's Dream. All rights reserved.</p>
          <p className="mt-4 md:mt-0 flex items-center">
            Built with <Heart className="w-4 h-4 mx-2 text-accent" /> for the future
          </p>
        </div>
      </div>
    </footer>
  );
}
