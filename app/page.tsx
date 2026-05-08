import Link from "next/link";
import Features from "./components/Features";
import HealthCard from "./components/HealthCards";
import SearchIcon from "./Icons/Search";

export default function Home() {
  type VariantType = "lime" | "red" | "blue" | "white";

  interface ItemsType {
    category: string;
    rating: string;
    color: VariantType;
    source: string;
    title: string;
    score: string;
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
  return (
    <div className="flex flex-col flex-1 items-center gap-4  bg-zinc-100 ">
      <div className="flex items-center justify-between  p-1 w-full px-6 py-4">
        <h1 className="text-2xl font-bold tracking-wide">Pulse</h1>

        <div className="flex items-center gap-2 justify-between">
          <div className="cursor-pointer  text-xs hover:bg-neutral-200 hover:text-neutral-800 rounded-full border border-white duration-300 ease-in-out py-3 px-6  font-semibold">
            {"Features"}
          </div>
          <Link href={'/scan'} className="bg-black text-white cursor-pointer font-semibold duration-300 ease-in-out hover:bg-neutral-800 rounded-full px-6 py-3 text-xs">
            {"LogIn"}
          </Link>
        </div>
      </div>

      {/* Hero section */}

      <div className="w-full lg:h-120 h-160   flex lg:flex-row flex-col lg:items-start  items-center lg:py-6  lg:justify-center">
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

              <p className="text-sm text-neutral-600">
                {"search your product..."}
              </p>
            </div>
            <div className="bg-black px-3 py-3 text-white font-semibold text-xs  rounded-full">
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
      </div>

      {/* Feature Section */}

      <div className="py-6 flex flex-col items-center gap-10">
        <h1 className="text-4xl font-bold w-full text-left">
          {"Inside the Box"}
        </h1>

        <Features />
      </div>

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
