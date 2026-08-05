"use client";

const locations = [
  {
    name: "Tinyvox Studio — Madurai",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125348.91540459394!2d77.97855735!3d9.9252007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xdc955b7264f63041!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1696000000000!5m2!1sen!2sin",
  },
  {
    name: "Tinyvox Studio — Chennai",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d80.06995647!3d13.047985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1696000000001!5m2!1sen!2sin",
  },
  {
    name: "Tinyvox Studio — Tirunelveli",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125762.41735737!2d77.60605!3d8.7139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04126a6c6c79c3%3A0x4d92aa63e0a3eb89!2sTirunelveli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1696000000002!5m2!1sen!2sin",
  },
];

export default function Locations() {
  return (
    <section className="py-24 border-t border-white/5 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold-400 font-outfit uppercase tracking-[0.3em] text-sm mb-4">Find Us</p>
          <h2 className="text-4xl md:text-5xl font-playfair text-white mb-5">
            Professional Photography in Tamil Nadu, India
          </h2>
          <p className="text-neutral-400 font-outfit text-base">
            Our Pictures Go Places. But Our Offices Are Here…
          </p>
        </div>

        {/* Map Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((loc, index) => (
            <div
              key={index}
              className="group rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500/40 transition-all duration-500 shadow-2xl"
            >
              {/* Map Embed */}
              <div className="relative h-64 w-full">
                <iframe
                  src={loc.mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={loc.name}
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              {/* Label */}
              <div className="bg-white/5 px-6 py-5 text-center border-t border-white/10">
                <h3 className="font-playfair text-white text-base font-medium tracking-wide">{loc.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
