import { Link } from "react-router-dom";

const LINKS = [
  { text: "Home", path: "/" },
  { text: "Our Mission", path: "/about" },
  { text: "Stories", path: "/blog" },
  { text: "Contact", path: "/contact" },
];

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
      <h4 className="text-[12px] font-bold uppercase tracking-[3px] text-accent mb-6">Page Not Found</h4>
      <h1 className="serif text-[42px] md:text-[64px] italic text-text mb-6 leading-[1.1]">
        This page isn't here.
      </h1>
      <p className="text-[18px] md:text-[20px] text-text-dim leading-[1.6] mb-12">
        The link may be old, or the address mistyped. Try one of these instead.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 mb-12">
        {LINKS.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="py-2 text-[13px] uppercase tracking-[1.5px] font-bold text-text-dim hover:text-accent transition-colors border-b-2 border-transparent hover:border-accent"
          >
            {link.text}
          </Link>
        ))}
      </div>
      <Link
        to="/donate"
        className="inline-block bg-accent text-white px-10 py-4 font-bold text-[13px] tracking-[1.5px] uppercase transition-opacity hover:opacity-90 rounded-[2px] shadow-sm"
      >
        Donate Now
      </Link>
    </div>
  );
}
