"use client";

import { Cookie, Brain, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Cookie size={28} strokeWidth={1} />,
      title: "Scan Product",
      description:
        "Upload a food label or scan a barcode to instantly start analyzing ingredients and nutrition facts.",
    },
    {
      icon: <Brain size={28} strokeWidth={1} />,
      title: "AI Analysis",
      description:
        "Pulse AI breaks down ingredients, detects additives, preservatives, allergens, and nutritional concerns.",
    },
    {
      icon: <ShieldCheck size={28} strokeWidth={1} />,
      title: "Health Insights",
      description:
        "Get personalized health scores, ingredient explanations, risk alerts, and healthier alternatives.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full py-14 flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex items-baseline">
              {/* Card + Text */}
              <motion.div
                className="flex flex-col items-center text-center max-w-55"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: "easeOut" as const,
                  delay: index * 0.2,   // 👈 stagger by index
                }}
              >
                <motion.div
                  className="
                    flex items-center justify-center
                    w-40 h-40 p-4 rounded-3xl
                    bg-linear-to-br
                    from-neutral-800
                    via-neutral-700
                    to-neutral-900
                    hover:from-neutral-700
                    hover:via-neutral-600
                    hover:to-neutral-900
                    group
                    transition-all
                    duration-500
                    ease-in-out
                  "
                  // whileHover={{ y: -6, scale: 1.03 }}   
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div
                    className="
                      bg-white/10
                      backdrop-blur-xl
                      rounded-3xl
                      h-[85%]
                      w-[85%]
                      flex
                      flex-col
                      items-center
                      justify-center
                      text-center
                      gap-2
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                    "
                  >
                    <div className="text-neutral-300">{step.icon}</div>
                    <h3 className="text-xs font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                </motion.div>

                {/* Description */}
                <p className="mt-5 text-sm text-neutral-700 leading-relaxed">
                  {index + 1}. {step.description}
                </p>
              </motion.div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:flex mx-6"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.2 + 0.3,  
                    ease: "easeOut" as const,
                  }}
                  style={{ originX: 0 }}
                >
                  <div className="w-12 bg-neutral-400 p-1 rounded-2xl" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}