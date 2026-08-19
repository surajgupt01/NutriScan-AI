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
    <section className="w-full min-h-[60vh] overflow-hidden bg-transparent text-neutral-900 py-16 flex flex-col justify-center items-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center px-4 w-full">
        
        {/* ── Top text block ── */}
        <motion.div
          className="text-center max-w-lg mx-auto mb-10 flex justify-center flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200/80 mb-3.5">
            <Sparkles className="w-3 h-3 text-neutral-600" />
            <span className="text-[10px] font-medium text-neutral-700 tracking-tight">
              Pulse AI v2.4 • Nutrition Intelligence
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 leading-snug">
            {`Understand what's really`}{" "}
            <span className="text-neutral-500 font-medium">inside your food</span>
          </h1>

          {/* Subheading */}
          <p className="mt-2 text-xs md:text-sm text-neutral-500 max-w-sm mx-auto font-normal leading-normal">
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
          <div className="w-full bg-white rounded-lg border border-neutral-200 p-2.5 shadow-sm flex flex-col gap-2.5">
            <textarea
              readOnly
              rows={2}
              className="w-full bg-transparent text-neutral-800 text-xs placeholder-neutral-400 focus:outline-none resize-none font-normal leading-relaxed selection:bg-neutral-100"
              value="Analyze this product label for hidden sugars, allergens, and artificial additives..."
            />

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
              {/* Left Action Buttons */}
              <div className="flex items-center gap-1">
                <button 
                  type="button"
                  aria-label="Filter parameters" 
                  className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </button>

                <div className="h-3 w-px bg-neutral-200 mx-0.5" />

                <button 
                  type="button"
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-50 border border-neutral-200/80 text-neutral-600 text-[10px] font-medium hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                >
                  <LayoutTemplate className="w-3 h-3 text-neutral-500" />
                  <span>Templates</span>
                </button>

                <button 
                  type="button"
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-50 border border-neutral-200/80 text-neutral-600 text-[10px] font-medium hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                >
                  <Box className="w-3 h-3 text-neutral-500" />
                  <span>Additives</span>
                </button>
              </div>

              {/* Right Media / Submit Buttons */}
              <div className="flex items-center gap-0.5">
                <button 
                  type="button"
                  aria-label="Upload label image" 
                  className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>

                <button 
                  type="button"
                  aria-label="Voice input" 
                  className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>

                <button 
                  type="button"
                  aria-label="Send query" 
                  className="p-1.5 ml-1 rounded-md bg-neutral-900 text-neutral-50 hover:bg-neutral-800 active:scale-95 transition-all flex items-center justify-center"
                >
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