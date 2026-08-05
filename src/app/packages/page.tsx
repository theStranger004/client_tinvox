"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import { getPublicApiData } from "@/Api";

export default function Packages() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicApiData("user/packages")
      .then((data) => {
        if (data.status === 'success' && data.data?.success) {
          setPackages(data.data.data.length > 0 ? data.data.data : []);
        } else {
          setPackages([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setPackages([]);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-playfair font-medium text-white mb-6">Investment</h1>
          <p className="text-neutral-400 font-outfit max-w-2xl mx-auto text-lg">
            Transparent pricing for timeless memories. Choose the collection that best fits your story, or contact us for a custom quote.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-white">Loading packages...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div 
                key={pkg._id || pkg.id}
                className={`relative rounded-3xl p-8 flex flex-col font-outfit transition-transform duration-500 hover:-translate-y-2 ${
                  pkg.highlight || pkg.isHighlighted 
                    ? 'bg-gradient-to-b from-neutral-900 to-black border-2 border-gold-500' 
                    : 'bg-neutral-950 border border-white/10'
                }`}
              >
                {(pkg.highlight || pkg.isHighlighted) && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-playfair text-white mb-2">{pkg.name}</h3>
                  <p className="text-neutral-400 text-sm h-10">{pkg.description}</p>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-playfair text-white">₹{pkg.price?.toLocaleString('en-IN') || pkg.price}</span>
                  <span className="text-neutral-500 ml-2">/ starting at</span>
                </div>

                <ul className="flex-1 space-y-4 mb-10">
                  {pkg.features?.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start text-white/80 text-sm">
                      <Check className="text-gold-400 mr-3 shrink-0" size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {/* For packages coming from DB that might not have features array yet */}
                  {(!pkg.features || pkg.features.length === 0) && (
                    <li className="flex items-start text-white/80 text-sm">
                      <Check className="text-gold-400 mr-3 shrink-0" size={18} />
                      <span>Duration: {pkg.duration}</span>
                    </li>
                  )}
                </ul>

                <button 
                  className={`w-full py-4 rounded-full uppercase tracking-widest text-sm font-semibold transition-colors duration-300 ${
                    pkg.highlight || pkg.isHighlighted 
                      ? 'bg-gold-500 text-black hover:bg-gold-400' 
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  Select Package
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
