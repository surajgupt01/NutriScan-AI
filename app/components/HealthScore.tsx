"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import HealthCard from "./HealthCards";
import { packedItems } from "../constants/default";
import { motion, useScroll, useTransform } from "motion/react";
import { Check, Wheat, CandyOff, Leaf, HelpCircle, Bone , Candy , Scale , Factory , WheatOff , AlertTriangle } from "lucide-react";

export default function ScoreCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[680px] w-full flex-col items-center overflow-hidden px-4 py-14 perspective-[1000px] sm:min-h-[760px] sm:px-6 sm:py-16 lg:min-h-[900px] lg:px-8 lg:py-24 "
    >
      <h1 className="z-10 text-center text-lg font-bold tracking-wide text-neutral-800 sm:text-4xl lg:text-3xl">
        Your health score card
      </h1>
      <p className="z-10 mt-3 max-w-[30rem] text-center text-sm leading-6 text-neutral-500 sm:text-base lg:text-sm">
        {`Instant AI-powered analysis of your favorite groceries. We decode the labels so you don't have to.`}
      </p>

      <div className="relative mt-8 flex h-[460px] w-full max-w-[760px] flex-1 items-center justify-center sm:mt-10 sm:h-[560px] lg:mt-14 lg:h-[660px]">
        <ItemsCard />

        <motion.div
          className="preserve-3d relative z-10"
          style={{
            translateY,
            opacity,
            transformOrigin: "bottom",
          }}
        >
          <HealthCard
            category={packedItems[3].category}
            rating={packedItems[3].rating}
            color={packedItems[3].color}
            source={packedItems[3].source}
            title={packedItems[3].title}
            score={packedItems[3].score}
            deg="relative z-[200] h-[18.5rem] w-[13.25rem] rotate-0 bg-lime-400/90 shadow-xl sm:h-80 sm:w-56 lg:h-95 lg:w-65 backdrop-blur-md"
          />
        </motion.div>
      </div>
    </div>
  );
}

const orbitItems1: OrbitItem[] = [
  { text: "High Protein", angle: 20 },
  { text: "Low Sugar", angle: 140 },
  { text: "Balanced Nutrition", angle: 260 },
];

const orbitItems2: OrbitItem[] = [
  { text: "Good Fiber", angle: 80 },
  { text: "Low Sodium", angle: 220 },
  { text: "Low Protein", angle: 340 },
];

type OrbitItem = {
  text: string;
  angle: number;
};

function ItemsCard() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
      <OrbitRing
        radiusClass="[--orbit-radius:8.25rem] sm:[--orbit-radius:12.5rem] lg:[--orbit-radius:15.625rem]"
        duration={25}
        items={orbitItems1}
        borderColor="border-neutral-200"
      />

      <OrbitRing
        radiusClass="[--orbit-radius:10.75rem] sm:[--orbit-radius:15.75rem] lg:[--orbit-radius:19.375rem]"
        duration={20}
        reverse
        items={orbitItems2}
        borderColor="border-gray-200"
      />
    </div>
  );
}

function OrbitRing({
  radiusClass,
  duration,
  items,
  reverse = false,
  borderColor,
}: {
  radiusClass: string;
  duration: number;
  reverse?: boolean;
  items: OrbitItem[];
  borderColor: string;
}) {
  return (
    <motion.div
      animate={{
        rotate: reverse ? -360 : 360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      className={`absolute h-[calc(var(--orbit-radius)*2)] w-[calc(var(--orbit-radius)*2)] rounded-full border ${borderColor} -z-100 ${radiusClass}`}
    >
      {items.map((item) => (
        <div
          key={item.text}
          className="absolute left-1/2 top-1/2"
          style={{
            transform: `
              translate(-50%, -50%)
              rotate(${item.angle}deg)
              translateX(var(--orbit-radius))
              rotate(-${item.angle}deg) 
            `,
          }}
        >
          <motion.div
            animate={{
              rotate: reverse ? 360 : -360,
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Label text={item.text} />
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

function Label({ text }: { text: string }) {
  const iconMap: Record<string, { icon: ReactNode; color: string }> = {
    "High Protein": {
      icon: <Check size={18} />,
      color: "bg-green-100 text-green-600",
    },

    "Low Sugar": {
      icon: <CandyOff size={18} />,
      color: "bg-green-100 text-green-600",
    },

    "Good Fiber": {
      icon: <Wheat size={18} />,
      color: "bg-green-100 text-green-600",
    },

    "Low Sodium": {
      icon: <Leaf size={18} />,
      color: "bg-green-100 text-green-600",
    },

    "High Sugar": {
      icon: <Candy size={18} />,
      color: "bg-red-100 text-red-600",
    },

    "High Sodium": {
      icon: <AlertTriangle size={18} />,
      color: "bg-red-100 text-red-600",
    },

    "Low Protein": {
      icon: <Bone size={18} />,
      color: "bg-yellow-100 text-yellow-600",
    },

    "Low Fiber": {
      icon: <WheatOff size={18} />,
      color: "bg-yellow-100 text-yellow-600",
    },

    "Balanced Nutrition": {
      icon: <Scale size={18} />,
      color: "bg-blue-100 text-blue-600",
    },

    "Highly Processed": {
      icon: <Factory size={18} />,
      color: "bg-orange-100 text-orange-600",
    },
  };
  const IconToRender = iconMap[text].icon || <HelpCircle size={18} />;
  const IconColor = iconMap[text].color;
  return (
    <div className="flex items-center gap-1.5 z-100 rounded-full border border-neutral-100 bg-white px-2 py-1 shadow-xl sm:gap-2 sm:px-3 sm:py-2 lg:gap-3 lg:px-5 lg:py-3">
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${IconColor}  sm:h-8 sm:w-8`}
      >
        {IconToRender}
      </div>

      <span className="whitespace-nowrap text-xs font-semibold text-neutral-800 sm:text-sm">
        {text}
      </span>
    </div>
  );
}
