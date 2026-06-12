"use client";

import { motion } from "motion/react";
import SearchIcon from "../Icons/Search";
import HealthCard from "./HealthCards";
import { useEffect, useState , useRef } from "react";

type VariantType = "lime" | "red" | "blue" | "white";

interface ItemsType {
  category: string;
  rating: string;
  color: VariantType;
  source: string;
  title: string;
  score: string;
  deg?: string;
}

const packedItems: ItemsType[] = [
  {
    category: "HEALTH DRINK",
    rating: "GOOD",
    color: "white",
    source: "Plant-Based",
    title: "Unsweetened Almond Milk",
    score: "86",
  },
  {
    category: "MUESLI",
    rating: "EXCELLENT",
    color: "red",
    source: "YogaBar",
    title: "Dark Chocolate Cranberry Muesli",
    score: "91",
  },

  {
    category: "PROTEIN BAR",
    rating: "GOOD",
    color: "blue",
    source: "Yoga Bar",
    title: "Daily Protein Bar",
    score: "88",
  },
  {
    category: "PLANT-BASED",
    rating: "EXCELLENT",
    color: "lime",
    source: "Oat-Based",
    title: "Organic Oat Milk",
    score: "94",
  },
];
export default function HeroSection() {
  const queries = [
    "search your product...",
    "Does this contain Sulphates?",
    "How much calories does it have?",
    "Is this vegan?",
    "Suggest some organic alternatives",
  ];

  const [text, setText] = useState("");
  const ref = useRef('')

  useEffect(() => {
    let charIndex = 0;
    let queryIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentText = queries[queryIndex];

      if (!deleting) {
        setText(currentText.slice(0, charIndex + 1));
        ref.current += currentText.slice(0 , charIndex+1)
        charIndex++;

        if (charIndex === currentText.length) {
          deleting = true;
          timeout = setTimeout(type, 1500); // pause before deleting
          return;
        }
      } else {
        setText(currentText.slice(0, charIndex - 1));
        ref.current += currentText.slice(0 , charIndex-1)

        charIndex--;

        if (charIndex === 0) {
          deleting = false;
          queryIndex = (queryIndex + 1) % queries.length;
        }
      }

      timeout = setTimeout(type, deleting ? 40 : 70);
    };

    type();

    return () => clearTimeout(timeout);
  }, []);
  return (
    <motion.div
      initial={{ translateY: 150 }}
      animate={{ translateY: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full lg:h-120 h-160   flex lg:flex-row flex-col lg:items-start  my-20 items-center lg:py-6  lg:justify-center"
    >
      <div className="flex-col flex items-start justify-start gap-4   ">
        <h1 className="lg:text-7xl text-5xl font-extrabold whitespace-pre-line">
          Just for {"\n"} your body
        </h1>
        <p className="lg:w-70 w-60 text-md">
          AI-powered scan for FMCG products. Reveal the truth behind the label
          in milliseconds.
        </p>
        <div className="border-neutral-200  bg-white  flex items-center  gap-1 rounded-full">
          <div className="p-3 flex items-center gap-2">
            <SearchIcon />

            <motion.div className="lg:text-sm text-neutral-600 lg:min-w-55 w-35 text-[12px] lg:min-h-5 h-2 duration-300 ease-in-out flex items-center">
                <span>{text}</span>
                <div className="w-px h-5 bg-neutral-500 animate-pulse"></div>
            </motion.div>
          </div>
          <div className="bg-black px-3 py-3 text-white font-semibold lg:text-xs text-[10px]  rounded-full">
            {"Scan Now"}
          </div>
        </div>
      </div>

      <div className=" lg:w-[40%] w-full h-full flex justify-center lg:items-start items-center relative">
        {packedItems.map((e, idx) => (
          <HealthCard
            key={idx}
            category={e.category}
            rating={e.rating}
            color={e.color}
            source={e.source}
            title={e.title}
            score={e.score}
          ></HealthCard>
        ))}
      </div>
    </motion.div>
  );
}
