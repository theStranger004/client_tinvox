import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, Settings, Users, Calendar, LogOut, Package as PackageIcon } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-outfit flex">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-white/10 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-gold-400 rounded-full flex items-center justify-center">
             <span className="font-playfair text-xl text-gold-400 font-bold">L</span>
          </div>
          <span className="font-playfair text-xl font-medium tracking-wide">Admin</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors group">
            <LayoutDashboard size={20} className="group-hover:text-gold-400 transition-colors" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/hero-slides" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors group">
            <ImageIcon size={20} className="group-hover:text-gold-400 transition-colors" />
            <span>Hero Slides</span>
          </Link>
          <Link href="/admin/portfolio" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors group">
            <ImageIcon size={20} className="group-hover:text-gold-400 transition-colors" />
            <span>Portfolio</span>
          </Link>
          <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors group">
            <Calendar size={20} className="group-hover:text-gold-400 transition-colors" />
            <span>Bookings</span>
          </Link>
          <Link href="/admin/packages" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors group">
            <PackageIcon size={20} className="group-hover:text-gold-400 transition-colors" />
            <span>Packages</span>
          </Link>
          <Link href="/admin/home-features" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors group">
            <ImageIcon size={20} className="group-hover:text-gold-400 transition-colors" />
            <span>Home Features</span>
          </Link>
          <Link href="/admin/testimonials" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors group">
            <Users size={20} className="group-hover:text-gold-400 transition-colors" />
            <span>Testimonials</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors group">
            <Settings size={20} className="group-hover:text-gold-400 transition-colors" />
            <span>Settings</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
