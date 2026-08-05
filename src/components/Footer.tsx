"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ChevronUp, Camera } from "lucide-react";
import TinyvoxLogo from "@/components/TinyvoxLogo";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-white/5 pt-16 pb-8 font-outfit text-white/70">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
        {/* Left Column - Branding & Quote */}
        <div className="flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <TinyvoxLogo width={120} height={120} className="-my-10" />
          </Link>
          <p className="mt-2 text-sm italic leading-relaxed text-white/50 max-w-sm">
            "Capturing the fleeting moments of today to create the timeless treasures of tomorrow."
          </p>
        </div>

        {/* Middle Column - Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-playfair text-lg text-white font-bold tracking-wider uppercase border-l-2 border-gold-400 pl-3">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2.5 mt-2">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Our Services", href: "/services" },
              { label: "Portfolio", href: "/portfolio" },
              { label: "Let's Talk", href: "/contact" },
            ].map((link, idx) => (
              <li key={idx} className="flex items-center text-sm">
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-sm mr-3 inline-block"></span>
                <Link
                  href={link.href}
                  className="hover:text-gold-400 transition-colors uppercase tracking-wider text-xs"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column - Get In Touch */}
        <div className="flex flex-col gap-4">
          <h3 className="font-playfair text-lg text-white font-bold tracking-wider uppercase border-l-2 border-gold-400 pl-3">
            Get In Touch
          </h3>
          <div className="flex flex-col gap-4 mt-2 text-sm">
            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed text-white/60">
                No 42, 2nd Floor, Apex Chambers, Kalavasal,<br />
                Near Zudio, Bypass Road,<br />
                Madurai, Tamil Nadu 625016
              </p>
            </div>
            
            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div className="flex flex-col text-white/60">
                <a href="tel:+919123456789" className="hover:text-gold-400 transition-colors">+91 91234 56789</a>
                <a href="tel:+919087654321" className="hover:text-gold-400 transition-colors">+91 90876 54321</a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gold-400 shrink-0" />
              <a href="mailto:support@tinyvox.com" className="hover:text-gold-400 transition-colors text-white/60">
                support@tinyvox.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright row */}
      <div className="border-t border-white/5 pt-8 mt-4 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gold-400/80 font-medium tracking-wide">
            Copyright © {new Date().getFullYear()} Tinyvox.com | Powered by ANS & Designers4Web
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-gold-400 hover:bg-gold-500 text-black flex items-center justify-center rounded transition-all duration-300 shadow-lg shadow-gold-500/10 focus:outline-none"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
