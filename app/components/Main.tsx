"use client";

import {
  SlidersHorizontal,
  Image as ImageIcon,
  Mic,
  ArrowUp,
  LayoutTemplate,
  Box,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

export default function Main() {
  return (
    <section className="w-full overflow-hidden bg-transparent py-14 flex flex-col justify-center items-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center px-4 w-full">
        
        {/* ── Top text block ── */}
        <motion.div
          className="text-center max-w-lg mx-auto mb-8 flex justify-center flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-md shadow-xs mb-3.5">
            <Sparkles className="w-3 h-3 text-amber-200" />
            <span className="text-[10px] font-medium text-white tracking-tight drop-shadow-xs">
              Pulse AI v2.4 • Nutrition Intelligence
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            {`Understand what's`}{" "}
            <span className="text-emerald-200 font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">really</span>{" "}
            <br />
            inside your food
          </h1>

          {/* Subheading */}
          <p className="mt-2 text-xs md:text-sm text-white/90 max-w-sm mx-auto font-normal leading-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
            Scan labels, decode hidden additives, and instantly evaluate nutrition safety with advanced precision.
          </p>
        </motion.div>

        {/* ── Prompt Bar ── */}
        <motion.div 
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <div className="w-full bg-white/90 backdrop-blur-xl rounded-xl border border-white/70 p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex flex-col gap-2.5">
            <textarea
              readOnly
              rows={2}
              className="w-full bg-transparent text-neutral-800 text-xs placeholder-neutral-400 focus:outline-none resize-none font-normal leading-relaxed selection:bg-neutral-200"
              value="Analyze this product label for hidden sugars, allergens, and artificial additives..."
            />

            <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60">
              {/* Left Action Buttons */}
              <div className="flex items-center gap-1">
                <button 
                  type="button"
                  aria-label="Filter parameters" 
                  className="p-1 rounded-md text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/80 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </button>

                <div className="h-3 w-px bg-neutral-300 mx-0.5" />

                <button 
                  type="button"
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/70 border border-neutral-200 text-neutral-700 text-[10px] font-medium hover:bg-white hover:text-neutral-900 transition-colors shadow-2xs"
                >
                  <LayoutTemplate className="w-3 h-3 text-neutral-600" />
                  <span>Templates</span>
                </button>

                <button 
                  type="button"
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/70 border border-neutral-200 text-neutral-700 text-[10px] font-medium hover:bg-white hover:text-neutral-900 transition-colors shadow-2xs"
                >
                  <Box className="w-3 h-3 text-neutral-600" />
                  <span>Additives</span>
                </button>
              </div>

              {/* Right Media / Submit Buttons */}
              <div className="flex items-center gap-0.5">
                <button 
                  type="button"
                  aria-label="Upload label image" 
                  className="p-1 rounded-md text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/80 transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>

                <button 
                  type="button"
                  aria-label="Voice input" 
                  className="p-1 rounded-md text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/80 transition-colors"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>

                <button 
                  type="button"
                  aria-label="Send query" 
                  className="px-2.5 py-1 ml-1 rounded-md bg-neutral-900 text-neutral-50 hover:bg-neutral-800 active:scale-95 transition-all flex items-center gap-1 shadow-2xs text-[11px] font-medium"
                >
                  <span>Send</span>
                  <ArrowUp className="w-3 h-3 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}