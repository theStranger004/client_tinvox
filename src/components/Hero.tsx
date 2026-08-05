"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

import { getPublicApiData } from "@/Api";
import config from "@/lib/config";

export default function Hero() {
  const [slides, setSlides]         = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  // Fetch slides from API
  useEffect(() => {
    getPublicApiData("user/hero-slides")
      .then((data) => {
        if (data.status === 'success' && data.data?.success && data.data.data.length > 0) {
          const formatted = data.data.data.map((item: any) => ({
            ...item,
            imageUrl: item.imageUrl?.startsWith('/uploads') ? `${config.API_IMAGE_URL}${encodeURI(item.imageUrl)}` : item.imageUrl
          }));
          setSlides(formatted);
        } else {
          setSlides([]);
        }
      })
      .catch(() => setSlides([]));
  }, []);

  // Auto-advance
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  // GSAP text animation on slide change
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, [currentSlide]);

  const defaultSlide = {
    title: "Tinyvox Studio",
    subtitle: "Premium Photography & Videography",
  };

  const slide = slides.length > 0 ? slides[currentSlide] : defaultSlide;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-transparent flex items-center justify-center">
      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20" ref={textRef}>
        <span className="text-gold-400 font-outfit uppercase tracking-[0.3em] text-sm md:text-base font-semibold mb-4 block">
          {slide.subtitle}
        </span>
        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white font-medium mb-8 leading-tight">
          {slide.title}
        </h1>
        <Link
          href="/booking"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-outfit font-medium text-white transition-all duration-300 ease-in-out hover:text-black"
        >
          <span className="absolute inset-0 w-full h-full border border-gold-500 rounded-full" />
          <span className="absolute inset-0 w-0 h-full bg-gold-500 rounded-full transition-all duration-300 ease-in-out group-hover:w-full" />
          <span className="relative uppercase tracking-widest text-sm">Book a Session</span>
        </Link>
      </div>

      {/* Professional Mouse Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="w-[20px] h-[32px] border border-white/40 rounded-full flex justify-center p-1.5 opacity-80">
          <motion.div
            animate={{
              y: [0, 8, 0],
              opacity: [1, 0, 1]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1 h-1.5 bg-gold-400 rounded-full"
          />
        </div>
        <span className="text-[9px] text-white/30 tracking-[0.3em] uppercase font-outfit">Scroll</span>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 transition-all duration-500 rounded-full ${
              currentSlide === index ? "h-12 bg-gold-500" : "h-4 bg-white/20 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
