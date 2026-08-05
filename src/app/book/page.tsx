"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Book() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setIsSubmitted(true), 1000);
  };

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-playfair font-medium text-white mb-6">Book a Session</h1>
          <p className="text-neutral-400 font-outfit text-lg">
            Tell us about your upcoming event. We would love to capture your story.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-neutral-900 border border-gold-500/30 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-playfair text-white mb-4">Inquiry Received</h2>
            <p className="text-neutral-400 font-outfit">
              Thank you for reaching out! Our team will get back to you within 24-48 hours.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-outfit uppercase tracking-widest text-sm transition-colors"
            >
              Send Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-neutral-900 border border-white/10 rounded-3xl p-8 md:p-12 space-y-8 font-outfit">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm text-neutral-400 uppercase tracking-wider">Full Name *</label>
                <input required type="text" className="w-full bg-neutral-950 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold-500 transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-neutral-400 uppercase tracking-wider">Email Address *</label>
                <input required type="email" className="w-full bg-neutral-950 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold-500 transition-colors" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-neutral-400 uppercase tracking-wider">Phone Number *</label>
                <input required type="tel" className="w-full bg-neutral-950 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold-500 transition-colors" placeholder="+91 91234 56789" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-neutral-400 uppercase tracking-wider">WhatsApp (Optional)</label>
                <input type="tel" className="w-full bg-neutral-950 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold-500 transition-colors" placeholder="+91 91234 56789" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm text-neutral-400 uppercase tracking-wider">Event Type *</label>
                <select required className="w-full bg-neutral-950 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none">
                  <option value="" disabled selected>Select an event</option>
                  <option value="wedding">Wedding</option>
                  <option value="pre-wedding">Pre-Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="fashion">Fashion / Editorial</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-neutral-400 uppercase tracking-wider">Event Date</label>
                <input type="date" className="w-full bg-neutral-950 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold-500 transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm text-neutral-400 uppercase tracking-wider">Location / Venue</label>
                <input type="text" className="w-full bg-neutral-950 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold-500 transition-colors" placeholder="City, Country or Venue Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-neutral-400 uppercase tracking-wider">Estimated Budget</label>
                <select className="w-full bg-neutral-950 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none">
                  <option value="" disabled selected>Select a range</option>
                  <option value="50k-150k">₹50,000 - ₹1,50,000</option>
                  <option value="150k-300k">₹1,50,000 - ₹3,00,000</option>
                  <option value="300k+">₹3,00,000+</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 uppercase tracking-wider">Tell us about your vision *</label>
              <textarea required rows={5} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold-500 transition-colors" placeholder="Share some details about what you're looking for..."></textarea>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full py-5 bg-gold-500 text-black rounded-xl font-semibold uppercase tracking-widest hover:bg-gold-400 transition-colors duration-300">
                Submit Inquiry
              </button>
            </div>
            
          </form>
        )}
      </div>
      <Footer />
    </main>
  );
}
