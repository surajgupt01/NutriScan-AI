"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does Pulse scan ingredient labels?",
    answer: "Pulse uses computer vision to read food labels, parsing nutrition tables, ingredient lists, and chemical formulations instantly.",
  },
  {
    question: "Are the health scores and additive flags accurate?",
    answer: "Yes. Our engine cross-references recognized regulatory databases, toxicology guidelines, and standard dietary thresholds.",
  },
  {
    question: "Can I filter ingredients based on my personal allergies?",
    answer: "You can set custom constraints like gluten-free, vegan, nut allergies, or low-sugar limits to auto-flag flagged ingredients.",
  },
  {
    question: "Is Pulse free to use?",
    answer: "You can scan products for free. Advanced tiers offer continuous daily intake tracking and exportable health logs.",
  },
  {
    question: "How is the product health score calculated?",
    answer: "Scores (0–100) are derived from processing level, chemical additive risks, sugar density, and net micronutrient balance.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 bg-white text-neutral-900 border-t border-neutral-100 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        
        {/* ── Section Header ── */}
        <motion.div 
          className="text-center max-w-md mx-auto mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35 }}
        >
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200/80 mb-2.5 text-neutral-600">
            <HelpCircle className="w-2.5 h-2.5" />
            <span className="text-[10px] font-medium">Support & Answers</span>
          </div>

          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 leading-snug">
            Frequently asked <span className="text-neutral-400 font-normal">questions</span>
          </h2>
          
          <p className="mt-1.5 text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
            Essential details regarding label scanning, precision scoring, and constraints.
          </p>
        </motion.div>

        {/* ── Accordion List ── */}
        <div className="flex flex-col gap-2">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                className="rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-2xs"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-3.5 text-left text-xs font-medium text-neutral-900 focus:outline-none cursor-pointer group transition-colors"
                >
                  <span className="group-hover:text-neutral-600 transition-colors pr-2">
                    {faq.question}
                  </span>
                  <div className="w-5 h-5 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:bg-neutral-900 group-hover:text-white group-hover:border-neutral-900 transition-all shrink-0">
                    {isOpen ? (
                      <Minus className="w-2.5 h-2.5" />
                    ) : (
                      <Plus className="w-2.5 h-2.5" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div className="px-3.5 pb-3.5 pt-2 text-[11px] text-neutral-500 leading-relaxed border-t border-neutral-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}