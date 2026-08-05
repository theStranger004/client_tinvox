"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import config from "@/lib/config";

export default function About() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center">
        <Image
          src={`${config.API_IMAGE_URL}/uploads/about-hero.jpg`}
          alt="About Hero"
          fill
          className="object-cover opacity-60 z-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-0" />
        <div className="relative z-10 text-center px-4 mt-20">
          <h1 className="text-5xl md:text-7xl font-playfair text-white mb-4">Behind the Lens</h1>
          <p className="text-gold-400 font-outfit uppercase tracking-[0.2em] text-sm">Passionate Storytellers</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-24 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 space-y-8 text-neutral-300 font-outfit text-lg leading-relaxed">
            <h2 className="text-4xl md:text-5xl font-playfair text-white mb-8">Crafting Memories Since 2015</h2>
            <p>
              Tinyvox Studio was born out of a profound passion for visual storytelling. We believe that photography is more than just capturing an image; it's about freezing a moment in time, preserving the raw emotion, the fleeting glances, and the unspoken words.
            </p>
            <p>
              Our team of award-winning photographers and cinematographers specialize in luxury weddings, high-end fashion, and editorial portraits. With an eye for cinematic lighting and composition, we turn your special moments into timeless works of art.
            </p>
            <p>
              Whether it's a grand destination wedding or an intimate portrait session, we approach every project with the same dedication to excellence, ensuring that your story is told beautifully.
            </p>
            
            <div className="pt-8 flex items-center gap-8 border-t border-white/10">
              <div>
                <h4 className="text-3xl font-playfair text-gold-400 mb-1">500+</h4>
                <p className="text-sm uppercase tracking-wider">Weddings</p>
              </div>
              <div>
                <h4 className="text-3xl font-playfair text-gold-400 mb-1">15+</h4>
                <p className="text-sm uppercase tracking-wider">Countries</p>
              </div>
              <div>
                <h4 className="text-3xl font-playfair text-gold-400 mb-1">10</h4>
                <p className="text-sm uppercase tracking-wider">Awards</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative h-[400px] lg:h-[600px] w-full max-w-md mx-auto">
              <div className="absolute inset-0 z-10 w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={`${config.API_IMAGE_URL}/uploads/about-studio.jpg`}
                  alt="Our Studio"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-gold-500/50 rounded-2xl -z-10 hidden md:block"></div>
              <div className="absolute -top-8 -right-8 w-48 h-48 border border-white/10 rounded-2xl -z-10 hidden md:block"></div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
