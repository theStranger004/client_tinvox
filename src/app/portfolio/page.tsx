"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getPublicApiData } from "@/Api";
import config from "@/lib/config";

export default function PortfolioPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicApiData("user/portfolio")
      .then((data) => {
        if (data.status === 'success' && data.data?.success && data.data.data.length > 0) {
          const fetchedItems = data.data.data.map((item: any) => ({
            ...item,
            heroImage: item.heroImage?.startsWith('/uploads') ? `${config.API_IMAGE_URL}${encodeURI(item.heroImage)}` : item.heroImage
          }));
          setItems(fetchedItems);
          
          const uniqueCategories = Array.from(new Set(fetchedItems.map((item: any) => item.category))) as string[];
          setCategoriesList(uniqueCategories);
        } else {
          setItems([]);
        }
        setLoading(false);
      })
      .catch(() => { setItems([]); setLoading(false); });
  }, []);

  const categories = useMemo(() => {
    return ["All", ...categoriesList];
  }, [categoriesList]);

  const filteredPortfolio = activeCategory === "All" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-black"> 
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-playfair font-medium text-white mb-6">Our Portfolio</h1>
          <p className="text-neutral-400 font-outfit max-w-2xl mx-auto">
            A curated collection of our finest visual stories, capturing moments that transcend time.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-outfit text-sm transition-all duration-300 ${
                activeCategory === category 
                  ? "bg-gold-500 text-black" 
                  : "bg-transparent border border-white/20 text-white hover:border-gold-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        {loading ? (
          <div className="text-center text-white">Loading portfolio...</div>
        ) : (
          <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {filteredPortfolio.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item._id || item.id}
                  className="relative group break-inside-avoid overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={item.heroImage || item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <span className="text-gold-400 font-outfit text-sm font-medium tracking-wider uppercase mb-2">{item.category}</span>
                      <h3 className="text-2xl font-playfair text-white">{item.title}</h3>
                      <p className="text-white/70 font-outfit text-sm mt-2">{item.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      <Footer />
    </main>
  );
}
