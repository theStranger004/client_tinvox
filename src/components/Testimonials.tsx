"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { getPublicApiData } from "@/Api";

export default function Testimonials() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicApiData("user/testimonials")
      .then((data) => {
        if (data.status === 'success' && data.data?.success && data.data.data.length > 0) {
          setItems(data.data.data);
        } else {
          setItems([]);
        }
        setLoading(false);
      })
      .catch(() => { setItems([]); setLoading(false); });
  }, []);

  if (loading) return null;

  const featured = items.filter(i => i.isFeatured);
  const standard = items.filter(i => !i.isFeatured);

  return (
    <section className="py-24 border-t border-white/5 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-gold-400 font-outfit uppercase tracking-[0.3em] text-sm mb-4">Client Love</p>
          <h2 className="text-4xl md:text-5xl font-playfair text-white">Happy Souls Speak Their Hearts!</h2>
        </div>

        {/* Featured Quotes */}
        {featured.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-8 mb-20">
            {featured.map((quote) => (
              <div key={quote._id} className="relative py-6 border-b border-white/10 last:border-0 text-center">
                <p className="text-xl md:text-2xl font-playfair italic text-white/80 leading-relaxed">
                  '{quote.reviewText}'
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Standard Review Cards */}
        {standard.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {standard.map((review) => (
              <div key={review._id} className="bg-white/5 border border-white/10 p-8 flex flex-col items-center text-center rounded-2xl hover:border-gold-500/30 transition-colors duration-300">
                <div className="w-14 h-14 rounded-full border border-gold-500/40 flex items-center justify-center text-gold-400 mb-4">
                  <Quote size={22} />
                </div>
                <div className="flex text-gold-500 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
                <h3 className="font-outfit font-semibold text-white mb-3 text-sm uppercase tracking-widest">{review.clientName}</h3>
                <p className="text-neutral-400 font-outfit text-sm leading-relaxed">{review.reviewText}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
