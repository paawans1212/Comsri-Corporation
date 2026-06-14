"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, ShoppingBag, ArrowLeft, Search, Laptop, Monitor, Cpu } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f5f8] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 md:px-6 lg:px-12 py-16 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Decorative Floating Shapes */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-200/40 rounded-full blur-2xl animate-float-1 pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl animate-float-2 pointer-events-none"></div>

        <div className="w-full max-w-2xl bg-white rounded-[32px] border border-slate-100 shadow-[0_24px_70px_rgba(47,48,74,0.05)] p-8 md:p-12 text-center relative z-10">
          {/* Animated 404 Illustration */}
          <div className="relative flex justify-center items-center gap-6 mb-8">
            <div className="text-[120px] md:text-[150px] font-black leading-none bg-gradient-to-r from-[#374bf9] to-[#faa129] bg-clip-text text-transparent selection:bg-indigo-100">
              404
            </div>
            
            {/* Floating Hardware Icons */}
            <div className="absolute -top-6 animate-float-1 text-[#374bf9] drop-shadow-md">
              <Laptop size={42} strokeWidth={1.5} />
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 animate-float-2 text-[#faa129] drop-shadow-md">
              <Monitor size={48} strokeWidth={1.5} />
            </div>
            <div className="absolute -left-6 bottom-4 animate-float-3 text-emerald-500 drop-shadow-md">
              <Cpu size={38} strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Oops! Page Not Found
          </h1>
          <p className="text-[15px] md:text-[16px] text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let&apos;s get you back on track!
          </p>

          {/* Search bar helper */}
          <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto mb-10 relative">
            <input
              type="text"
              placeholder="Search refurbished laptops, desktops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-5 pr-14 text-sm text-gray-800 bg-[#f8f9fa] border border-slate-200 rounded-full focus:outline-none focus:border-[#374bf9] focus:bg-white transition-all font-medium"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 w-10 h-10 bg-[#374bf9] hover:bg-[#2538db] text-white rounded-full flex items-center justify-center transition-colors shadow-sm"
              aria-label="Search site"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto bg-[#374bf9] hover:bg-[#2538db] text-white font-bold px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-500/10"
            >
              <Home size={18} />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-gray-800 font-bold px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag size={18} />
              <span>Browse Catalog</span>
            </Link>
          </div>

          {/* Quick Links / Categories */}
          <div className="mt-12 pt-8 border-t border-slate-100">
            <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-4">
              Or Try Popular Categories
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "Laptops", path: "/categories/buy-refurbished-laptops-online-in-india" },
                { name: "Desktops", path: "/categories/buy-high-quality-refurbished-desktops" },
                { name: "Mini PCs", path: "/categories/buy-refurbished-mini-pcs-online-in-india" },
                { name: "Workstations", path: "/categories/buy-refurbished-workstations-online-in-india" },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.path}
                  className="bg-[#f8f9fa] hover:bg-[#f0f2f5] text-gray-700 hover:text-[#374bf9] text-[13px] font-bold px-4 py-2 rounded-full transition-all border border-slate-100 hover:border-slate-200"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
