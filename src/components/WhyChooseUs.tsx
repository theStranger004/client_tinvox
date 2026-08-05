"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const reasons = [
  {
    title: "Creating Cinematic Experiences",
    content: "We don't just record your wedding—we turn it into a film. With cinematic storytelling, elegant transitions, and emotional music, we craft wedding films that feel like they belong on the big screen. Every scene is directed with care to reflect the essence of your love story.",
    image: "/wedding_candid_new.jpg"
  },
  {
    title: "Capturing Candid Faces and Feelings",
    content: "We believe the best moments are the unscripted ones. Our unobtrusive approach allows us to capture raw emotion, genuine laughter, and fleeting glances that you will cherish forever.",
    image: "/wedding_candid.png"
  },
  {
    title: "Well-Trained Expert Photographers",
    content: "Our team consists of highly skilled and award-winning professionals who understand lighting, composition, and timing perfectly. We bring years of luxury event experience to your special day.",
    image: "/wedding_cinematic.png" // placeholder
  },
  {
    title: "Traditions Taken Trendily",
    content: "We respect and beautifully document deep-rooted traditions while applying a modern, editorial aesthetic to make your cultural ceremonies look timeless and chic.",
    image: "/wedding_candid.png" // placeholder
  },
  {
    title: "Personalized Service",
    content: "Every couple is unique. We take the time to understand your vision, your personalities, and your story to create a bespoke visual narrative tailored specifically to you.",
    image: "/wedding_cinematic.png" // placeholder
  },
  {
    title: "Cutting-Edge Tools and Technology",
    content: "From 4K cinematic drones to medium-format cameras and professional audio rigs, we use only the highest-end equipment to ensure your memories are captured in flawless detail.",
    image: "/wedding_candid.png" // placeholder
  }
];

export default function WhyChooseUs() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="py-32 px-4 md:px-8 border-t border-white/5 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white mb-6">Why Choose Tinyvox Studio?</h2>
          <p className="text-gold-400 font-outfit text-sm md:text-base uppercase tracking-widest max-w-2xl mx-auto">
            Where emotions meet elegance, and every moment becomes a masterpiece.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Side - Image */}
          <div className="w-full lg:w-1/2 sticky top-32">
            <div className="relative aspect-[4/3] md:aspect-square lg:aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl group bg-neutral-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={openIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={reasons[openIndex === -1 ? 0 : openIndex].image} 
                    alt={reasons[openIndex === -1 ? 0 : openIndex].title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 border-2 border-gold-500/20 rounded-2xl m-4 z-10 pointer-events-none"></div>
            </div>
          </div>

          {/* Right Side - Accordion */}
          <div className="w-full lg:w-1/2 space-y-4">
            {reasons.map((reason, index) => (
              <div 
                key={index} 
                className="border-b border-white/10 pb-4 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <span className={`text-xl md:text-2xl font-playfair transition-colors duration-300 ${openIndex === index ? "text-gold-400" : "text-white group-hover:text-gold-400/70"}`}>
                    {reason.title}
                  </span>
                  <span className="text-white ml-4 shrink-0">
                    {openIndex === index ? <Minus size={20} className="text-gold-400" /> : <Plus size={20} />}
                  </span>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <p className="text-neutral-400 font-outfit leading-relaxed pt-2 pb-6 pr-8">
                        {reason.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
