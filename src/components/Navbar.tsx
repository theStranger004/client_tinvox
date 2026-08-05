"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import TinyvoxLogo from "@/components/TinyvoxLogo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-4 shadow-lg shadow-black/50" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50 flex items-center gap-2 group">
          <TinyvoxLogo width={120} height={120} className="-my-10" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-outfit text-sm uppercase tracking-widest text-white/80">
          <Link href="/portfolio" className="hover:text-gold-400 transition-colors">Portfolio</Link>
          <Link href="/services" className="hover:text-gold-400 transition-colors">Services</Link>
          <Link href="/about" className="hover:text-gold-400 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-gold-400 transition-colors">Contact</Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/book" className="px-6 py-2 border border-white/20 text-white font-outfit text-sm uppercase tracking-wider hover:bg-gold-500 hover:border-gold-500 hover:text-black transition-all duration-300 rounded-full">
            Book Now
          </Link>
          <a
            href="https://wa.me/919876543219"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-black hover:border-green-500 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg shadow-green-500/5"
            title="Chat on WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.37 5.378 0 12.003 0c3.21.001 6.228 1.248 8.5 3.514 2.272 2.265 3.522 5.277 3.522 8.486-.003 6.63-5.378 12-12.003 12-2.012-.002-3.993-.507-5.747-1.465L0 24zm6.09-3.723c1.657.983 3.31 1.488 5.85 1.49 5.396 0 9.786-4.386 9.788-9.77.001-2.61-1.01-5.059-2.85-6.899-1.84-1.84-4.291-2.853-6.938-2.853-5.397 0-9.786 4.385-9.789 9.771-.001 2.19.574 4.325 1.666 6.208L2.89 21.124l3.257-.847zm13.16-5.793c-.27-.134-1.602-.79-1.85-.88-.25-.089-.43-.134-.61.135-.18.27-.7.88-.86 1.06-.16.182-.32.203-.59.07-2.7-1.35-3.347-2.01-4.57-4.107-.1-.172-.01-.265.076-.35.078-.078.182-.203.272-.304.09-.101.12-.17.18-.304.06-.135.03-.253-.015-.343-.045-.09-.43-1.036-.59-1.417-.15-.369-.43-.319-.43-.325-.11-.006-.24-.006-.37-.006-.13 0-.34.049-.52.246-.18.197-.69.675-.69 1.644 0 .97.7 1.906.8 2.04 0 .135 1.38 2.106 3.34 2.956.467.203.83.324 1.11.413.47.148.897.127 1.235.077.377-.056 1.602-.656 1.83-1.285.228-.629.228-1.17.16-1.282-.07-.11-.25-.17-.52-.304z"/>
            </svg>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-50 text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8"
          style={{ pointerEvents: mobileMenuOpen ? "auto" : "none" }}
        >
          <nav className="flex flex-col items-center gap-8 font-playfair text-3xl text-white">
            <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-400 transition-colors">Portfolio</Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-400 transition-colors">Services</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-400 transition-colors">About</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-400 transition-colors">Contact</Link>
            <div className="flex flex-col items-center gap-4 mt-8 w-full px-12">
              <Link href="/book" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition-all duration-300 rounded-full font-outfit text-lg tracking-widest uppercase">
                Book Session
              </Link>
              <a
                href="https://wa.me/919876543219"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 rounded-full font-outfit text-lg tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.37 5.378 0 12.003 0c3.21.001 6.228 1.248 8.5 3.514 2.272 2.265 3.522 5.277 3.522 8.486-.003 6.63-5.378 12-12.003 12-2.012-.002-3.993-.507-5.747-1.465L0 24zm6.09-3.723c1.657.983 3.31 1.488 5.85 1.49 5.396 0 9.786-4.386 9.788-9.77.001-2.61-1.01-5.059-2.85-6.899-1.84-1.84-4.291-2.853-6.938-2.853-5.397 0-9.786 4.385-9.789 9.771-.001 2.19.574 4.325 1.666 6.208L2.89 21.124l3.257-.847zm13.16-5.793c-.27-.134-1.602-.79-1.85-.88-.25-.089-.43-.134-.61.135-.18.27-.7.88-.86 1.06-.16.182-.32.203-.59.07-2.7-1.35-3.347-2.01-4.57-4.107-.1-.172-.01-.265.076-.35.078-.078.182-.203.272-.304.09-.101.12-.17.18-.304.06-.135.03-.253-.015-.343-.045-.09-.43-1.036-.59-1.417-.15-.369-.43-.319-.43-.325-.11-.006-.24-.006-.37-.006-.13 0-.34.049-.52.246-.18.197-.69.675-.69 1.644 0 .97.7 1.906.8 2.04 0 .135 1.38 2.106 3.34 2.956.467.203.83.324 1.11.413.47.148.897.127 1.235.077.377-.056 1.602-.656 1.83-1.285.228-.629.228-1.17.16-1.282-.07-.11-.25-.17-.52-.304z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}
