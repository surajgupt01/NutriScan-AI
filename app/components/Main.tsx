"use client";

import Link from "next/link";
import Logo from "../components/Logo";
import { Activity } from "lucide-react";
import { motion } from "motion/react";

  const child = {
    hidden: {
      x: 8,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const, 

      },
    },
  };
  const parent = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1.2,
        delayChildren: 0.8,

      },
    },
    hidden: { opacity: 0 },
  };
export default function Main() {
  return (
    <section className="w-full h-auto lg:min-h-screen overflow-hidden">
      <div className="max-w-8xl mx-auto flex flex-col items-center lg:px-2 px-4 py-4">

        {/* ── Text block: fade up on mount ── */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16 flex justify-center flex-col items-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <motion.h2
            className="mt-6 text-2xl md:text-4xl font-bold tracking-wider"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
          >
            {` Understand What's Really`}
            <span className="bg-linear-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
              {" "}Inside Your Food
            </span>
          </motion.h2>

          <motion.p
            className="mt-4 text-md text-neutral-600 max-w-xl mx-auto tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Scan ingredient labels, uncover hidden additives, and get instant
            AI-powered health insights before you buy.
          </motion.p>
        </motion.div>

        <div className="flex lg:flex-row flex-col-reverse items-center justify-between gap-4 lg:w-[75%] w-full scale-90">

          {/* ── Left text: slide in from left ── */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" as const }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-3">
              AI Powered Food Intelligence
            </p>

            <h1 className="lg:text-5xl text-3xl font-bold leading-tight text-neutral-950">
              {` Know What's`}
              <span className="block text-green-800">Really Inside</span>
              Your Food
            </h1>

            <p className="mt-5 text-sm text-neutral-600 leading-relaxed">
              Scan food labels and instantly understand ingredients,
              additives, nutrition facts, sugar levels, and potential health
              concerns with AI-powered analysis.
            </p>

            {/* ── Stats: stagger each one ── */}
            <div className="flex gap-6 mt-8">
              {[
                { label: "Ingredient Analysis", value: "Instant" },
                { label: "Health Insights", value: "AI" },
                { label: "Nutrition Reports", value: "Smart" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.value}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.45 + i * 0.12,
                    ease: "easeOut" as const,
                  }}
                >
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-neutral-700">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Chat card: slide in from right — your existing variants untouched ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" as const }}
            className="lg:w-[50%] w-full"
          >
            {/* your existing motion.div with parent variants stays exactly as-is */}
            <motion.div
              initial={"hidden"}
              animate={"visible"}
              variants={parent}
              className="h-150 p-4 bg-linear-to-tl from-neutral-950 via-green-300 to-lime-200 rounded-2xl flex justify-center items-center"
            >
              <div className="w-90 h-100 rounded-2xl px-4 py-8 backdrop-blur-lg bg-transparent shadow-xl flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-black p-2 rounded-xl w-8 h-8 text-white flex items-center justify-center">
                    <Activity />
                  </div>
                  <Logo textSize="xs" />
                </div>

                <motion.div variants={child} className="flex justify-start">
                  <div className="max-w-[75%] rounded-xl rounded-tl-none bg-white/60 text-black text-xs px-3 py-2">
                    {` Hi! Upload a food label and I'll analyze ingredients, nutrition facts, and potential health concerns.`}
                  </div>
                </motion.div>

                <motion.div variants={child} className="flex justify-end">
                  <div className="max-w-[75%] rounded-xl rounded-tr-none bg-black text-white text-xs px-3 py-2">
                    Is this product healthy for daily consumption?
                  </div>
                </motion.div>

                <motion.div variants={child} className="flex justify-start">
                  <div className="max-w-[75%] rounded-xl rounded-tl-none bg-white/60 text-black text-xs px-3 py-2">
                    {` I'll check the ingredients, additives, sugar content, and nutritional profile to help you decide.`}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}