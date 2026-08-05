"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { getPublicApiData } from "@/Api";
import config from "@/lib/config";

export default function HomeFeatures() {
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicApiData("user/home-features")
      .then((data) => {
        if (data.status === 'success' && data.data?.success && data.data.data.length > 0) {
          const formatted = data.data.data.map((item: any) => ({
            ...item,
            mediaUrl: item.mediaUrl?.startsWith('/uploads') ? `${config.API_IMAGE_URL}${encodeURI(item.mediaUrl)}` : item.mediaUrl
          }));
          setFeatures(formatted);
        } else {
          setFeatures([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setFeatures([]);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <section className="py-20 md:py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        {features.map((feature, index) => {
          const isImageLeft = index % 2 === 0;

          return (
            <div key={feature._id} className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-32 last:mb-0 ${!isImageLeft ? "lg:flex-row-reverse" : ""}`}>
              
              {/* Media Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-video lg:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl">
                  {feature.mediaType === "video" ? (
                    <iframe
                      src={feature.mediaUrl}
                      title="YouTube video player"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <Image
                      src={feature.mediaUrl}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair text-white leading-tight">
                  {feature.title}
                </h2>
                
                <p className="text-neutral-400 font-outfit leading-relaxed text-lg">
                  {feature.description}
                </p>

                {feature.featuresList && feature.featuresList.length > 0 && (
                  <div className="pt-4 space-y-3 border-l-2 border-gold-500/40 pl-5">
                    {feature.featuresList.map((listItem: string, i: number) => (
                      <p key={i} className="text-neutral-400 font-outfit text-sm">
                        {listItem}
                      </p>
                    ))}
                  </div>
                )}

                <div className="pt-6">
                  <Link 
                    href={feature.buttonLink || "/portfolio"}
                    className="inline-flex items-center gap-2 border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-black px-8 py-3 rounded-full text-sm font-outfit font-medium uppercase tracking-widest transition-all duration-300"
                  >
                    {feature.buttonText || "Explore Our Wedding Frame"}
                  </Link>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
