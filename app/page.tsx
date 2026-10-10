"use client";

import Link from "next/link";
import Footer from "./components/Footer";
import Features from "./components/Features";
import Main from "./components/Main";
import FAQSection from "./components/HealthCards";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-white text-neutral-900 scroll-smooth w-full antialiased">
      
      {/* ── Top Section: Hero with Image Background ── */}
      <div 
        className="w-full relative bg-cover bg-center bg-no-repeat overflow-hidden pb-14 min-h-[90vh] flex flex-col justify-between"
        style={{ backgroundImage: `url('/pattern.png')` }}
      >
        <div className="relative z-20 flex flex-col items-center w-full">
          
          {/* Top Navigation Bar */}
          <header className="flex items-center justify-between w-full max-w-4xl px-4 py-4">
            {/* Logo: Pulse AI with Emerald Wave */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-400">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  <path d="M3.22 12H8.5l1.5-2.5 2 5 1.5-2.5h7.28" strokeWidth="2.2" />
                </svg>
              </div>
              <span className="text-sm font-semibold tracking-tight text-white drop-shadow-sm">
                Pulse
              </span>
              <span className="px-1.5 py-0.2 rounded bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-mono font-medium text-white shadow-xs">
                AI
              </span>
            </div>

            {/* Navigation Actions */}
            <nav className="flex items-center gap-2">
              <a
                href="#features"
                className="text-[11px] font-medium text-white/90 hover:text-white px-3 py-1 rounded-md bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 transition-colors shadow-xs"
              >
                Features
              </a>
              
              <Link
                href="/scan"
                className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-neutral-900/90 text-neutral-50 text-[11px] font-medium hover:bg-black active:scale-95 transition-all shadow-xs backdrop-blur-sm border border-neutral-700/50"
              >
                Log In
              </Link>
            </nav>
          </header>

          {/* Main Hero Component */}
          <Main />

        </div>
      </div>

      {/* ── Core Workflow Steps ── */}
      <Features />

      {/* ── FAQ Section ── */}
      <FAQSection />

      {/* ── Footer ── */}
      <Footer />
      
    </div>
  );
}