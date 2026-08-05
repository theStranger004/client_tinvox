import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import LatestWork from "@/components/LatestWork";
import WhyChooseUs from "@/components/WhyChooseUs";
import HomeFeatures from "@/components/HomeFeatures";
import Testimonials from "@/components/Testimonials";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Fixed Fullscreen Background Video (z-0 sits above main bg-black) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Page Content Wrapper (z-10 sits above z-0 background video) */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <LatestWork />
        <WhyChooseUs />
        <HomeFeatures />
        <Testimonials />
        <Locations />
        <Footer />
      </div>
    </main>
  );
}
