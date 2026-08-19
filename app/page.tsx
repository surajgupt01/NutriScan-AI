"use client";

import Link from "next/link";
import Footer from "./components/Footer";
import Features from "./components/Features";
import Main from "./components/Main";
import FAQSection from "./components/HealthCards";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-white text-neutral-900 scroll-smooth w-full antialiased">
      
      {/* ── Top Section: Navbar & Hero with Subtle Background & Fade ── */}
      <div 
        className="w-full relative bg-cover bg-center bg-no-repeat overflow-hidden pb-10"
        style={{ backgroundImage: `url('/bg-cover.png')` }}
      >
        {/* Soft frosted neutral backdrop overlay */}
        <div className="absolute inset-0 backdrop-blur-[2px] bg-white/40 pointer-events-none" />

        {/* Smooth gradient fade to seamless white */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />

        <div className="relative z-20 flex flex-col items-center w-full">
          
          {/* Top Navigation Bar */}
          <header className="flex items-center justify-between w-full max-w-4xl px-4 py-4">
            {/* Logo */}
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold tracking-tight text-neutral-900">
                Pulse
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              <span className="text-[10px] font-mono text-neutral-400">
                AI
              </span>
            </div>

            {/* Navigation Actions */}
            <nav className="flex items-center gap-2">
              <a
                href="#features"
                className="text-[11px] font-medium text-neutral-600 hover:text-neutral-900 px-2.5 py-1 rounded-md hover:bg-neutral-100/80 transition-colors"
              >
                Features
              </a>
              
              <Link
                href="/scan"
                className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-neutral-900 text-neutral-50 text-[11px] font-medium hover:bg-neutral-800 active:scale-95 transition-all shadow-2xs"
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