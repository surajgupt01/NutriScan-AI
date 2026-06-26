
import Link from "next/link";
import Footer from "./components/Footer";
import HowItWorks from "./components/Features";
import HeroSection from "./components/HeroSection";

import Main from "./components/Main";

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

      <Main />

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
