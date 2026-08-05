"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-playfair font-medium text-white mb-6">Get in Touch</h1>
          <p className="text-neutral-400 font-outfit max-w-2xl mx-auto text-lg">
            We would love to hear from you. Reach out to discuss your upcoming event, request a quote, or simply say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 font-outfit">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-playfair text-white mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0">
                    <Mail className="text-gold-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Email Us</h4>
                    <p className="text-neutral-400">support@tinyvox.com</p>
                    <p className="text-neutral-400">info@tinyvox.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0">
                    <Phone className="text-gold-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Call Us</h4>
                    <p className="text-neutral-400">+91 91234 56789</p>
                    <p className="text-neutral-400">+91 90876 54321</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-gold-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Studio Location</h4>
                    <p className="text-neutral-400">
                      No 42, 2nd Floor, Apex Chambers, Kalavasal,<br/>
                      Near Zudio, Bypass Road,<br/>
                      Madurai, Tamil Nadu 625016
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-playfair text-white mb-6">Follow Our Work</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all font-outfit uppercase text-xs tracking-wider">
                  IG
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all font-outfit uppercase text-xs tracking-wider">
                  FB
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all font-outfit uppercase text-xs tracking-wider">
                  X
                </a>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="bg-neutral-900 border border-white/10 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-playfair text-white mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-neutral-400 uppercase tracking-wider">Name</label>
                <input required type="text" className="w-full bg-neutral-950 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold-500 transition-colors" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-neutral-400 uppercase tracking-wider">Email</label>
                <input required type="email" className="w-full bg-neutral-950 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold-500 transition-colors" placeholder="Your email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-neutral-400 uppercase tracking-wider">Subject</label>
                <input required type="text" className="w-full bg-neutral-950 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold-500 transition-colors" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-neutral-400 uppercase tracking-wider">Message</label>
                <textarea required rows={4} className="w-full bg-neutral-950 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-gold-500 transition-colors" placeholder="Your message..."></textarea>
              </div>
              <button type="button" className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold uppercase tracking-widest hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-colors duration-300">
                Send Message
              </button>
              <p className="text-xs text-neutral-500 text-center mt-4">For booking a photography session, please use our <a href="/book" className="text-gold-400 underline">Booking Form</a>.</p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
