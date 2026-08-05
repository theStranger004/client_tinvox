"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublicApiData } from "@/Api";
import config from "@/lib/config";

export default function LatestWork() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicApiData("user/portfolio")
      .then((data) => {
        if (data.status === 'success' && data.data?.success && data.data.data.length > 0) {
          const formatted = data.data.data.slice(0, 6).map((item: any) => ({
            ...item,
            heroImage: item.heroImage?.startsWith('/uploads') ? `${config.API_IMAGE_URL}${encodeURI(item.heroImage)}` : item.heroImage
          }));
          setItems(formatted);
        } else {
          setItems([]);
        }
        setLoading(false);
      })
      .catch(() => { setItems([]); setLoading(false); });
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-gold-500">Loading...</div>;
  }

  return (
    <section className="py-32 px-4 md:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white mb-6">The Latest Emotions, Beautifully Framed.</h2>
          <p className="text-neutral-400 font-outfit max-w-2xl mx-auto text-lg">
            A curated selection of our most recent visual stories. Every frame is a testament to our dedication to preserving your most cherished moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={item._id || item.id} className="group relative bg-neutral-900/30 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-colors duration-500 flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.heroImage || item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-playfair text-white mb-3">{item.title}</h3>
                <p className="text-neutral-400 font-outfit text-sm leading-relaxed mb-4 flex-1">
                  {item.description || "A beautiful cinematic memory captured by Tinyvox Studio."}
                </p>
                <Link href="/portfolio" className="text-gold-500 font-outfit text-sm uppercase tracking-widest hover:text-white transition-colors self-start mt-auto flex items-center gap-2">
                  View Story <span className="text-xl leading-none">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-20">
          <Link href="/portfolio" className="inline-flex items-center justify-center px-8 py-4 font-outfit font-medium text-white transition-all duration-300 ease-in-out border border-white/20 rounded-full hover:bg-gold-500 hover:border-gold-500 hover:text-black uppercase tracking-widest text-sm">
            View Full Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
