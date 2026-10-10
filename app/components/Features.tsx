"use client";

import { motion } from "motion/react";
import {
  UploadCloud,
  ChevronDown,
  Sparkles,
  Camera,
  FileCheck,
  ScanLine,
  Check,
  ShieldCheck,
} from "lucide-react";

export default function FeaturesFlow() {
  return (
    <section 
      id="features" 
      className="w-full relative py-20 antialiased overflow-hidden bg-gradient-to-b from-white via-emerald-50/20 to-neutral-50/60"
    >
      {/* ── Soft Ambient Glows matching the Sky & Landscape Palette ── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-200/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-sky-200/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        
        {/* ── Section Header ── */}
        <motion.div
          className="text-center max-w-md mx-auto mb-12 flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Frosted Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 border border-emerald-200/60 backdrop-blur-md mb-2.5 text-neutral-700 shadow-2xs">
            <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
            <span className="text-[10px] font-medium tracking-tight">
              Scan-to-Insight Workflow
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 leading-snug">
            Understand what&apos;s{" "}
            <span className="text-emerald-700 font-semibold">really inside</span>{" "}
            your food
          </h2>

          <p className="mt-1.5 text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
            From packaging photos to deep additive breakdowns in five seamless steps.
          </p>
        </motion.div>

        {/* ── 2, 2, 1 Card Layout ── */}
        <div className="flex flex-col gap-4 w-full">
          
          {/* Row 1: Cards 1 & 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 1: Batch Upload & Ingestion */}
            <motion.div
              className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(16,185,129,0.08)] hover:border-emerald-200/70 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.35 }}
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

              {/* Native Inset UI Window */}
              <div className="w-full h-44 bg-neutral-50/80 rounded-xl border border-neutral-200/70 p-3 mb-4 flex flex-col justify-between overflow-hidden backdrop-blur-sm group-hover:bg-white/60 transition-colors">
                {/* Status Tabs */}
                <div className="flex items-center gap-1 text-[9px]">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-neutral-200/90 text-neutral-900 font-medium shadow-2xs">
                    All <span className="text-neutral-400 font-normal">24</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer">
                    Processed <span className="text-neutral-400 font-normal">18</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer">
                    Flagged <span className="text-neutral-400 font-normal">3</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer">
                    Pending OCR <span className="text-neutral-400 font-normal">3</span>
                  </span>
                </div>

                {/* Table Mockup */}
                <div className="flex flex-col text-[9px]">
                  <div className="grid grid-cols-12 text-neutral-400 text-[8px] px-1 pb-1 border-b border-neutral-200/60 font-mono">
                    <span className="col-span-1">
                      <div className="w-2.5 h-2.5 rounded border border-neutral-300 bg-white" />
                    </span>
                    <span className="col-span-3">ID</span>
                    <span className="col-span-5">Product</span>
                    <span className="col-span-3 text-right">Status</span>
                  </div>

                  <div className="grid grid-cols-12 items-center py-1.5 px-1 border-b border-neutral-100 hover:bg-white/90 rounded transition-colors group/row">
                    <span className="col-span-1">
                      <div className="w-2.5 h-2.5 rounded border border-neutral-300 bg-white" />
                    </span>
                    <span className="col-span-3 font-mono text-neutral-500 text-[8px]">GHY-384</span>
                    <span className="col-span-5 font-medium text-neutral-800 truncate">Almond Milk</span>
                    <span className="col-span-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[8px] font-medium text-amber-700 bg-amber-50/90 border border-amber-200/70 px-1.5 py-0.2 rounded-full">
                        <span className="w-1 h-1 rounded-full bg-amber-500 animate-ping" /> Pending
                      </span>
                    </span>
                  </div>

                  <div className="grid grid-cols-12 items-center py-1.5 px-1 border-b border-neutral-100 hover:bg-white/90 rounded transition-colors group/row">
                    <span className="col-span-1">
                      <div className="w-2.5 h-2.5 rounded border border-neutral-300 bg-white" />
                    </span>
                    <span className="col-span-3 font-mono text-neutral-500 text-[8px]">ABH-838</span>
                    <span className="col-span-5">
                      <p className="font-medium text-neutral-800 leading-none truncate">Protein Bar</p>
                      <p className="text-[7px] text-neutral-400 mt-0.5">Snack Zone</p>
                    </span>
                    <span className="col-span-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[8px] font-medium text-rose-700 bg-rose-50/90 border border-rose-200/70 px-1.5 py-0.2 rounded-full">
                        <span className="w-1 h-1 rounded-full bg-rose-500" /> Flagged
                      </span>
                    </span>
                  </div>

                  <div className="grid grid-cols-12 items-center py-1.5 px-1 hover:bg-white/90 rounded transition-colors group/row opacity-90">
                    <span className="col-span-1">
                      <div className="w-2.5 h-2.5 rounded border border-emerald-400 bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Check className="w-1.5 h-1.5 stroke-[3]" />
                      </div>
                    </span>
                    <span className="col-span-3 font-mono text-neutral-500 text-[8px]">SAK-340</span>
                    <span className="col-span-5">
                      <p className="font-medium text-neutral-800 leading-none truncate">Greek Yogurt</p>
                      <p className="text-[7px] text-neutral-400 mt-0.5">Dairy</p>
                    </span>
                    <span className="col-span-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[8px] font-medium text-emerald-700 bg-emerald-50/90 border border-emerald-200/70 px-1.5 py-0.2 rounded-full">
                        <span className="w-1 h-1 rounded-full bg-emerald-500" /> Clean
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Block */}
              <div className="text-center px-2">
                <h3 className="text-xs md:text-sm font-semibold text-neutral-900 tracking-tight">
                  Label & Queue Management
                </h3>
                <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                  A complete view of every scanned product&apos;s safety rating, macros, and OCR status.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Meal Schedule & Nutrient Timeline */}
            <motion.div
              className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(14,165,233,0.08)] hover:border-sky-200/70 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

              {/* Native Inset UI Window */}
              <div className="w-full h-44 bg-neutral-50/80 rounded-xl border border-neutral-200/70 p-3 mb-4 flex flex-col justify-between overflow-hidden backdrop-blur-sm group-hover:bg-white/60 transition-colors">
                {/* Timeline Axis */}
                <div className="grid grid-cols-4 pb-1 text-center font-mono text-[8px] text-neutral-400">
                  <span>08:00</span>
                  <span>12:00</span>
                  <span>16:00</span>
                  <span>20:00</span>
                </div>

                {/* Timeline Range Blocks */}
                <div className="flex gap-1.5 py-0.5">
                  <div className="flex-1 bg-sky-50/90 border border-sky-200/80 rounded-lg py-1 px-1 text-center text-[8px] font-medium text-sky-800 shadow-2xs hover:bg-sky-100 transition-colors cursor-pointer">
                    08:00 - 11:30
                  </div>
                  <div className="flex-1 bg-white border border-neutral-200 rounded-lg py-1 px-1 text-center text-[8px] font-medium text-neutral-600 shadow-2xs hover:bg-neutral-100 transition-colors cursor-pointer">
                    12:00 - 15:45
                  </div>
                  <div className="flex-1 bg-amber-50/90 border border-amber-200/80 rounded-lg py-1 px-1 text-center text-[8px] font-medium text-amber-800 shadow-2xs hover:bg-amber-100 transition-colors cursor-pointer">
                    18:00 - 21:30
                  </div>
                </div>

                {/* Nutrition Breakdown */}
                <div className="flex flex-col text-[9px] mt-0.5">
                  <div className="grid grid-cols-12 text-neutral-400 font-mono text-[8px] px-1 pb-0.5 border-b border-neutral-200/60">
                    <span className="col-span-2">Meal</span>
                    <span className="col-span-10">Allocation</span>
                  </div>

                  <div className="grid grid-cols-12 items-center py-1.5 px-1 border-b border-neutral-100 hover:bg-white/90 rounded transition-colors group/row">
                    <span className="col-span-2 font-mono text-neutral-500 text-[8px]">#1</span>
                    <div className="col-span-10 flex items-center gap-2">
                      <div className="w-4 h-4 rounded-md bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 font-semibold text-[8px] group-hover/row:scale-105 transition-transform">
                        P
                      </div>
                      <div>
                        <p className="font-medium text-neutral-800 leading-none">Whey Isolate</p>
                        <p className="text-[7px] text-neutral-400 mt-0.5">32g Protein • 0g Sugar</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 items-center py-1.5 px-1 hover:bg-white/90 rounded transition-colors group/row">
                    <span className="col-span-2 font-mono text-neutral-500 text-[8px]">#2</span>
                    <div className="col-span-10 flex items-center gap-2">
                      <div className="w-4 h-4 rounded-md bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 font-semibold text-[8px] group-hover/row:scale-105 transition-transform">
                        C
                      </div>
                      <div>
                        <p className="font-medium text-neutral-800 leading-none">Rolled Oats</p>
                        <p className="text-[7px] text-neutral-400 mt-0.5">48g Carbs • 9g Fiber</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Block */}
              <div className="text-center px-2">
                <h3 className="text-xs md:text-sm font-semibold text-neutral-900 tracking-tight">
                  Nutrition Schedule Preview
                </h3>
                <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                  Track how nutrients compound across daily targets or inspect specific meal absorption.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Row 2: Cards 3 & 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 3: Dropzone Media Library */}
            <motion.div
              className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(16,185,129,0.08)] hover:border-emerald-200/70 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

              {/* Native Inset UI Window */}
              <div className="w-full h-44 bg-neutral-50/80 rounded-xl border border-neutral-200/70 p-3 mb-4 flex flex-col justify-center items-center relative overflow-hidden backdrop-blur-sm group-hover:bg-white/60 transition-colors">
                <div className="w-full h-full border border-dashed border-neutral-300 group-hover:border-emerald-400/80 rounded-lg bg-white/70 group-hover:bg-white/90 flex flex-col items-center justify-center p-2 text-center relative transition-all">
                  
                  {/* Floating Micro-Badges */}
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: 0 }}
                    className="absolute top-2 left-2.5 w-5 h-6 rounded-md border border-neutral-200 bg-white flex items-center justify-center text-neutral-400 rotate-[-6deg] shadow-2xs cursor-pointer"
                  >
                    <Camera className="w-2.5 h-2.5 text-neutral-500" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: 0 }}
                    className="absolute top-2 right-2.5 w-5 h-6 rounded-md border border-neutral-200 bg-white flex items-center justify-center text-neutral-400 rotate-[6deg] shadow-2xs cursor-pointer"
                  >
                    <FileCheck className="w-2.5 h-2.5 text-emerald-600" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: 0 }}
                    className="absolute bottom-2 right-3 w-5 h-6 rounded-md border border-neutral-200 bg-white flex items-center justify-center text-neutral-400 rotate-[-4deg] shadow-2xs cursor-pointer"
                  >
                    <ScanLine className="w-2.5 h-2.5 text-sky-600" />
                  </motion.div>

                  <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 mb-1.5 shadow-2xs group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-3.5 h-3.5" />
                  </div>
                  
                  <p className="text-[11px] font-medium text-neutral-800">
                    Drop label photo here or browse
                  </p>
                  <p className="text-[8px] text-neutral-400 mt-0.5">
                    PNG, JPG, HEIC — max 500MB
                  </p>
                </div>
              </div>

              {/* Text Block */}
              <div className="text-center px-2">
                <h3 className="text-xs md:text-sm font-semibold text-neutral-900 tracking-tight">
                  Label & Asset Library
                </h3>
                <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                  Bulk upload packaging images with automated high-accuracy OCR extraction.
                </p>
              </div>
            </motion.div>

            {/* Card 4: Tag & Additive Management */}
            <motion.div
              className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(245,158,11,0.08)] hover:border-amber-200/70 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.35, delay: 0.15 }}
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

              {/* Native Inset UI Window */}
              <div className="w-full h-44 bg-neutral-50/80 rounded-xl border border-neutral-200/70 p-3 mb-4 flex flex-col justify-between overflow-hidden backdrop-blur-sm group-hover:bg-white/60 transition-colors">
                {/* Search & Category Filter */}
                <div className="flex items-center justify-between gap-1 pb-1.5 border-b border-neutral-200/60">
                  <div className="flex items-center px-2 py-0.5 bg-white border border-neutral-200/90 rounded-md flex-1 text-neutral-400 text-[9px]">
                    <span>Search allergen tags...</span>
                  </div>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white border border-neutral-200/90 rounded-md text-[9px] text-neutral-700 font-medium hover:bg-neutral-100 cursor-pointer transition-colors shadow-2xs">
                    <span>Categories</span>
                    <ChevronDown className="w-2 h-2 text-neutral-400" />
                  </div>
                </div>

                {/* Tag Table */}
                <div className="flex flex-col text-[9px]">
                  <div className="grid grid-cols-12 text-neutral-400 font-mono text-[8px] px-1 pb-0.5 border-b border-neutral-200/60">
                    <span className="col-span-1">
                      <div className="w-2.5 h-2.5 rounded border border-neutral-300 bg-white" />
                    </span>
                    <span className="col-span-5">Tag</span>
                    <span className="col-span-4">slug</span>
                    <span className="col-span-2 text-right">Count</span>
                  </div>

                  <div className="grid grid-cols-12 items-center py-1.5 px-1 border-b border-neutral-100 text-[8px] hover:bg-white/90 rounded transition-colors group/row cursor-pointer">
                    <span className="col-span-1">
                      <div className="w-2.5 h-2.5 rounded border border-emerald-500 bg-emerald-50 flex items-center justify-center text-emerald-700">
                        <Check className="w-1.5 h-1.5 stroke-[3]" />
                      </div>
                    </span>
                    <span className="col-span-5 font-medium text-neutral-800">Gluten-Free</span>
                    <span className="col-span-4 text-neutral-400 font-mono">gluten-free</span>
                    <span className="col-span-2 text-right text-neutral-600 font-mono">40</span>
                  </div>

                  <div className="grid grid-cols-12 items-center py-1.5 px-1 border-b border-neutral-100 text-[8px] hover:bg-white/90 rounded transition-colors group/row cursor-pointer">
                    <span className="col-span-1">
                      <div className="w-2.5 h-2.5 rounded border border-neutral-300 bg-white" />
                    </span>
                    <span className="col-span-5 font-medium text-neutral-800">Palm Oil Free</span>
                    <span className="col-span-4 text-neutral-400 font-mono">palm-oil-free</span>
                    <span className="col-span-2 text-right text-neutral-600 font-mono">14</span>
                  </div>

                  <div className="grid grid-cols-12 items-center py-1.5 px-1 text-[8px] hover:bg-white/90 rounded transition-colors group/row cursor-pointer opacity-85 hover:opacity-100">
                    <span className="col-span-1">
                      <div className="w-2.5 h-2.5 rounded border border-neutral-300 bg-white" />
                    </span>
                    <span className="col-span-5 font-medium text-neutral-800">No Sweeteners</span>
                    <span className="col-span-4 text-neutral-400 font-mono">clean-sweeteners</span>
                    <span className="col-span-2 text-right text-neutral-600 font-mono">23</span>
                  </div>
                </div>
              </div>

              {/* Text Block */}
              <div className="text-center px-2">
                <h3 className="text-xs md:text-sm font-semibold text-neutral-900 tracking-tight">
                  Tag & Additive Management
                </h3>
                <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                  Configure dietary rules once to auto-flag compounds without repetitive input.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Row 3: Card 5 (Full Width 2-Column Span) */}
          <motion.div
            className="group relative w-full bg-white/80 backdrop-blur-xl rounded-2xl p-5 md:p-6 border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.09)] hover:border-emerald-200/70 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.4, delay: 0.18 }}
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

            {/* Native Inset UI Window */}
            <div className="w-full bg-neutral-50/80 rounded-xl border border-neutral-200/70 p-3.5 mb-4 flex flex-col justify-between overflow-hidden backdrop-blur-sm group-hover:bg-white/60 transition-colors">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200/60">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <div>
                    <h4 className="text-[11px] font-semibold text-neutral-900">Proof of verification summary</h4>
                    <p className="text-[8px] text-neutral-400 mt-0.5">Displaying scores across all scanned items</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-neutral-200/90 text-[9px] font-medium text-neutral-700 shadow-2xs hover:bg-neutral-50 cursor-pointer transition-colors">
                  <span>All time</span>
                  <ChevronDown className="w-2 h-2 text-neutral-400" />
                </div>
              </div>

              {/* Summary Table */}
              <div className="flex flex-col gap-0.5 text-[9px] my-1.5">
                <div className="grid grid-cols-12 text-neutral-400 font-mono text-[8px] px-1 pb-0.5 border-b border-neutral-200/60">
                  <span className="col-span-4">Product Name</span>
                  <span className="col-span-4 text-center">Safety Score</span>
                  <span className="col-span-4 text-right">Additive Count</span>
                </div>

                <div className="grid grid-cols-12 items-center py-2 px-1 border-b border-neutral-100 text-[9px] hover:bg-white/90 rounded transition-colors group/item">
                  <span className="col-span-4 font-medium text-neutral-800">Organic Almond Butter</span>
                  <div className="col-span-4 flex items-center justify-center gap-2">
                    <span className="font-mono text-emerald-600 font-semibold text-[10px]">98 / 100</span>
                    <div className="hidden sm:block w-12 h-1 bg-neutral-200/80 rounded-full overflow-hidden">
                      <div className="w-[98%] h-full bg-emerald-500 rounded-full" />
                    </div>
                  </div>
                  <span className="col-span-4 text-right font-mono text-neutral-600">0 flagged</span>
                </div>

                <div className="grid grid-cols-12 items-center py-2 px-1 border-b border-neutral-100 text-[9px] hover:bg-white/90 rounded transition-colors group/item">
                  <span className="col-span-4 font-medium text-neutral-800">Sparkling Prebiotic Soda</span>
                  <div className="col-span-4 flex items-center justify-center gap-2">
                    <span className="font-mono text-amber-600 font-semibold text-[10px]">74 / 100</span>
                    <div className="hidden sm:block w-12 h-1 bg-neutral-200/80 rounded-full overflow-hidden">
                      <div className="w-[74%] h-full bg-amber-500 rounded-full" />
                    </div>
                  </div>
                  <span className="col-span-4 text-right font-mono text-neutral-600">2 flagged</span>
                </div>

                <div className="grid grid-cols-12 items-center py-2 px-1 text-[9px] hover:bg-white/90 rounded transition-colors group/item opacity-85 hover:opacity-100">
                  <span className="col-span-4 font-medium text-neutral-800">Flavored Tortilla Chips</span>
                  <div className="col-span-4 flex items-center justify-center gap-2">
                    <span className="font-mono text-rose-600 font-semibold text-[10px]">42 / 100</span>
                    <div className="hidden sm:block w-12 h-1 bg-neutral-200/80 rounded-full overflow-hidden">
                      <div className="w-[42%] h-full bg-rose-500 rounded-full" />
                    </div>
                  </div>
                  <span className="col-span-4 text-right font-mono text-neutral-600">5 flagged</span>
                </div>
              </div>
            </div>

            {/* Text Block */}
            <div className="text-center max-w-sm mx-auto px-2">
              <h3 className="text-xs md:text-sm font-semibold text-neutral-900 tracking-tight">
                Proof of Verification Summary
              </h3>
              <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                Generate auditable product health certificates and nutrient breakdowns across every food item in your pantry.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}