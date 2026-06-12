import Link from "next/link";
import Features from "./components/Features";
import ScoreCard from "./components/HealthScore";
import HeroSection from "./components/HeroSection";
import Image from "next/image";
import Logo from "./components/Logo";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center gap-4  bg-zinc-100  h-auto">
      <div className="flex items-center justify-between  p-1 w-full px-6 py-4">
        <h1 className="text-2xl font-bold tracking-wide"><Logo textSize="lg:text-md text-sm"></Logo></h1>

        <div className="flex items-center gap-2 justify-between">
          <div className="cursor-pointer  text-xs hover:bg-neutral-200 hover:text-neutral-800 rounded-full border border-white duration-300 ease-in-out py-3 px-6  font-semibold">
            {"Features"}
          </div>
          <Link
            href={"/scan"}
            className="bg-black text-white cursor-pointer font-semibold duration-300 ease-in-out hover:bg-neutral-800 rounded-full px-6 py-3 text-xs"
          >
            {"LogIn"}
          </Link>
        </div>
      </div>

      {/* Hero section */}


      <section className="w-full min-h-screen bg-linear-to-b from-neutral-100 via-neutral-200 to-neutral-100 overflow-hidden ">
        <div className="max-w-7xl mx-auto px-6">
          {/* Text */}
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
            <span className="px-4 py-1 rounded-full bg-lime-500/10 text-lime-600 text-sm font-medium">
              AI-Powered Food Analysis
            </span>

            <h2 className="mt-6 text-xl md:text-3xl font-bold tracking-tight">
             {` Understand What's Really`}
              <span className="bg-linear-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                {" "}
                Inside Your Food
              </span>
            </h2>

            <p className="mt-6 text-sm text-neutral-600 max-w-2xl mx-auto">
              Scan ingredient labels, uncover hidden additives, and get instant
              AI-powered health insights before you buy.
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="flex justify-center">
            <div className="relative p-2 md:p-6 rounded-2xl md:rounded-3xl  backdrop-blur-xl shadow-[0_0_80px_rgba(132,204,22,0.3)]">
              {/* Glow */}
              <div className="absolute inset-0 bg-lime-500/30 blur-3xl -z-10"></div>

              <Image
                src="/ChatInterface.png"
                alt="Label Scan Dashboard"
                width={850}
                height={1000}
                priority
                className="w-full max-w-5xl  rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>



      {/*Health  card section */}

      <ScoreCard />

      {/* Feature Section */}

      <div className="py-20 flex flex-col items-center gap-10 my-8">
        <h1 className="text-4xl font-bold w-full text-left">
          {"Inside the Box"}
        </h1>

        <Features />
      </div>

      <HeroSection />


      {/* {'Footer section'} */}

      <footer className="bg-black w-full  px-8 py-14 md:px-16 lg:px-24">
        {/* Top Section */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              Pulse
            </h1>

            <p className="mt-4 text-sm leading-6 text-neutral-400">
              AI-powered product label intelligence for healthier and smarter
              decisions.
            </p>

            <button className="mt-6 rounded-full bg-lime-400 px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.03]">
              Start Scanning
            </button>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
            {/* Product */}
            <div>
              <h3 className="text-sm font-semibold text-white">Product</h3>

              <ul className="mt-4 space-y-3 text-sm text-neutral-400">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Features
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Insights
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  API
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Pricing
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-white">Resources</h3>

              <ul className="mt-4 space-y-3 text-sm text-neutral-400">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Documentation
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Guides
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Blog
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Support
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-white">Company</h3>

              <ul className="mt-4 space-y-3 text-sm text-neutral-400">
                <li className="hover:text-white transition-colors cursor-pointer">
                  About
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Contact
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Privacy
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Terms
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative mt-24 overflow-hidden">
          <h1 className="select-none text-center text-[120px] md:text-[180px] lg:text-[260px] font-black tracking-tight leading-none bg-linear-to-b from-white/20 to-white/5 bg-clip-text text-transparent">
            PULSE
          </h1>
        </div>

        {/* Divider */}
        <div className="mt-14 h-px w-full bg-white/10" />

        {/* Bottom */}
        <div className="mt-6 flex flex-col gap-4 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Pulse. Built for smarter product decisions.</p>

          <div className="flex items-center gap-6">
            <span className="cursor-pointer hover:text-white transition-colors">
              Twitter
            </span>

            <span className="cursor-pointer hover:text-white transition-colors">
              GitHub
            </span>

            <span className="cursor-pointer hover:text-white transition-colors">
              LinkedIn
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
