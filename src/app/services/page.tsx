"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getPublicApiData } from "@/Api";
import config from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicApiData("user/services")
      .then((data) => {
        if (data.status === 'success' && data.data?.success && data.data.data.length > 0) {
          const formatted = data.data.data.map((item: any) => ({
            ...item,
            image: item.image?.startsWith('/uploads') ? `${config.API_IMAGE_URL}${encodeURI(item.image)}` : item.image,
            heroImage: item.heroImage?.startsWith('/uploads') ? `${config.API_IMAGE_URL}${encodeURI(item.heroImage)}` : item.heroImage
          }));
          setServices(formatted);
        } else {
          setServices([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setServices([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!containerRef.current || loading) return;
    const sections = gsap.utils.toArray(".service-section") as HTMLElement[];
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelector(".service-content"),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
  }, [loading]);

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-gold-500">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Header */}
      <div className="relative pt-40 pb-28 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-0" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-gold-400 font-outfit uppercase tracking-[0.3em] text-sm mb-5">What We Offer</p>
          <h1 className="text-5xl md:text-7xl font-playfair font-medium text-white mb-8 leading-tight">Our Expertise</h1>
          <p className="text-neutral-400 font-outfit max-w-2xl mx-auto text-lg leading-relaxed">
            A comprehensive suite of luxury photography and filmmaking services — each tailored to capture your most precious moments with cinematic precision.
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="pb-32 px-6 max-w-7xl mx-auto" ref={containerRef}>
        <div className="space-y-0">
          {services.map((service, index) => (
            <div
              key={service._id || service.id}
              className={`service-section flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch gap-0 border-t border-white/10`}
            >
              {/* Image — takes exactly half width, full height */}
              <div className="w-full lg:w-1/2">
                <div className="relative h-[400px] lg:h-[620px] w-full overflow-hidden">
                  <Image
                    src={service.heroImage || service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Dark overlay gradient toward text side */}
                  <div className={`absolute inset-0 bg-gradient-to-${index % 2 !== 0 ? 'l' : 'r'} from-transparent via-transparent to-black/60`} />
                  {/* Category badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-black/60 backdrop-blur-sm border border-white/20 text-white font-outfit text-xs uppercase tracking-widest px-4 py-2 rounded-full">
                      0{index + 1} / {services.length.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                className="w-full lg:w-1/2 flex items-center service-content"
                style={{ background: index % 2 === 0 ? '#0d0d0d' : '#111111' }}
              >
                <div className="px-10 lg:px-16 py-16 lg:py-20 max-w-lg">
                  <span className="text-gold-400 font-outfit tracking-[0.2em] uppercase text-xs font-semibold mb-5 block">
                    Service
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair text-white mb-6 leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-neutral-400 font-outfit text-base leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3 mb-10">
                    {(service.process || service.features)?.map((feature: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-white/70 font-outfit text-sm">
                        <span className="w-1.5 h-1.5 bg-gold-400 rounded-full shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 px-8 py-3 border border-gold-500 text-gold-400 font-outfit uppercase tracking-widest text-sm hover:bg-gold-500 hover:text-black transition-all duration-300 rounded-full"
                  >
                    Inquire Now
                    <span className="text-base leading-none">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
