import Link from "next/link";
import Logo from "./components/Logo";
import { Activity, Cookie } from "lucide-react";
import Footer from "./components/Footer";
import HowItWorks from "./components/Features";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center gap-4  bg-white  h-auto scroll-smooth">
      <div className="flex items-center justify-between  p-1 w-full px-6 py-4">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-600">
          Pulse<span className="text-lime-400">.</span>
        </h2>

        <div className="flex items-center gap-2 justify-between">
          <div className="cursor-pointer  text-xs hover:bg-neutral-200 hover:text-neutral-800 rounded-full border border-white duration-300 ease-in-out py-3 px-6  font-semibold">
            {"Features"}
          </div>
          <Link
            href={"/scan"}
            className="bg-black text-white cursor-pointer font-semibold duration-300 ease-in-out hover:bg-neutral-800 rounded-full px-6 py-3 text-xs "
          >
            {"LogIn"}
          </Link>
        </div>
      </div>

      {/* Hero section */}

      <section className="w-full h-auto lg:min-h-screen overflow-hidden ">
        <div className="max-w-8xl mx-auto flex flex-col items-center lg:px-2 px-4 py-4">
          {/* Text */}
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 flex justify-center flex-col items-center">
            {/* <span className="rounded-full bg-gray-100 shadow-sm flex items-center gap-2 justify-center text-lime-500 text-sm font-medium max-w-60 p-2 ">
              <span>
                <HeartHandshake />
              </span>
              AI-Powered Food Analysis
            </span> */}

            <h2 className="mt-6 text-2xl md:text-4xl font-bold tracking-wider">
              {` Understand What's Really`}
              <span className="bg-linear-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                {" "}
                Inside Your Food
              </span>
            </h2>

            <p className="mt-4 text-md text-neutral-600 max-w-xl mx-auto tracking-wide">
              Scan ingredient labels, uncover hidden additives, and get instant
              AI-powered health insights before you buy.
            </p>
          </div>

          <div className="flex lg:flex-row flex-col-reverse items-center justify-between gap-4 lg:w-[75%] w-full scale-90">
            <div className="flex-1">
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

              <div className="flex gap-6 mt-8">
                <div>
                  <h3 className="text-2xl font-bold">Instant</h3>
                  <p className="text-sm text-neutral-700">
                    Ingredient Analysis
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold">AI</h3>
                  <p className="text-sm text-neutral-700">Health Insights</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold">Smart</h3>
                  <p className="text-sm text-neutral-700">Nutrition Reports</p>
                </div>
              </div>
            </div>

            <div className="lg:w-[50%] w-full h-150 p-4 bg-linear-to-tl from-neutral-950 via-green-300 to-lime-200 rounded-2xl  flex justify-center items-center">
              <div className="w-90 h-100 rounded-2xl px-4 py-8 backdrop-blur-lg bg-transparent shadow-xl flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <div className="bg-black p-2 rounded-xl w-8 h-8 text-white flex items-center justify-center">
                    <Activity />
                  </div>
                  <Logo textSize="xs" />
                </div>

                {/* AI Message */}
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-xl rounded-tl-none bg-white/60 text-black text-xs px-3 py-2">
                    {` Hi! Upload a food label and I'll analyze ingredients,
                  nutrition facts, and potential health concerns.`}
                  </div>
                </div>

                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[75%] rounded-xl rounded-tr-none bg-black text-white text-xs px-3 py-2">
                    Is this product healthy for daily consumption?
                  </div>
                </div>

                {/* AI Message */}
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-xl rounded-tl-none bg-white/60 text-black text-xs px-3 py-2">
                    {` I'll check the ingredients, additives, sugar content, and
                  nutritional profile to help you decide.`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-center gap-4 flex-col mt-10 px-4 ">
        <div className="text-sm font-extralight text-green-600">{`How it works`}</div>
        <div className="lg:text-3xl  text-xl text-center text-neutral-900 font-bold tracking-normal">{`From food label to informed decision in seconds.`}</div>
        <div className="lg:text-xl text-md text-center  text-neutral-500 tracking-wide font-light">
          {`Scan labels, decode ingredients, and make healthier decisions with confidence—all in seconds.`}
        </div>
        <HowItWorks />
      </div>

      <HeroSection />

      <Footer />
    </div>
  );
}
