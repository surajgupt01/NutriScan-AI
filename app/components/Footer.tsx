"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="w-full border-t border-neutral-100 bg-white text-neutral-900 antialiased">
      <div className="mx-auto max-w-4xl px-4 py-12">
        
        {/* ── Main Content Row ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Brand & Purpose */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold tracking-tight text-neutral-900">
                Pulse
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              <span className="text-[10px] font-mono text-neutral-400">
                v2.4
              </span>
            </div>
            <p className="mt-1 text-[11px] text-neutral-500 max-w-xs leading-relaxed">
              AI label intelligence built for verified ingredients and clear nutrition choices.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-5 text-[11px] font-medium text-neutral-600">
            <a href="#features" className="hover:text-neutral-900 transition-colors">
              Features
            </a>
            <a href="#insights" className="hover:text-neutral-900 transition-colors">
              Insights
            </a>
            <a href="#privacy" className="hover:text-neutral-900 transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-neutral-900 transition-colors">
              Terms
            </a>
          </nav>

          {/* Direct Action Button */}
          <div className="flex justify-center md:justify-end">
            <button
              type="button"
              onClick={() => router.push("/scan")}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-neutral-900 text-neutral-50 text-[11px] font-medium hover:bg-neutral-800 active:scale-95 transition-all shadow-2xs"
            >
              <span>Start Scanning</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400" />
            </button>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mt-8 mb-5 h-px w-full bg-neutral-100" />

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-neutral-400">
          <p>© {new Date().getFullYear()} Pulse AI. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-700 transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-700 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-700 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}