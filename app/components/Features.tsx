import { Cookie, Brain, ShieldCheck, ArrowRight } from "lucide-react";

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

  return (
    <section className="w-full py-14 flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex items-baseline">
              {/* Card + Text */}
              <div className="flex flex-col items-center text-center max-w-55">
                <div
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
                </div>

                {/* Description */}
                <p className="mt-5 text-sm text-neutral-700 leading-relaxed">
                 {index+1}. {step.description}
                </p>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex  mx-6">
                  <div key={step.title} className="w-12 bg-neutral-400 p-1 rounded-2xl" ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}