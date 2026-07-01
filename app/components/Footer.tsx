"use client"

import { useRouter } from "next/navigation";

export default function Footer() {

  const router = useRouter()
  return (
    <footer className="w-full border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-9xl px-6 py-16 sm:px-10 md:px-16 lg:px-10">
        {/* Top Section */}
        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between lg:items-start">
          {/* Brand */}
          <div className="max-w-sm flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-700">
              Pulse<span className="text-lime-400">.</span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              AI-powered product label intelligence built for healthier,
              smarter consumer choices.
            </p>

            <button
              onClick={()=>router.push('/login')}
              className="
                mt-6
                rounded-full
                bg-lime-400
                px-6
                py-3
                text-sm
                font-semibold
                text-black
                transition-all
                duration-300
                hover:bg-lime-300
                hover:shadow-[0_0_20px_rgba(163,230,53,0.25)]
              "
            >
              Start Scanning
            </button>
          </div>

          {/* Mobile Divider */}
          <div className="h-px w-full bg-neutral-200 lg:hidden" />

          {/* Links */}
          <div className="grid w-full grid-cols-2 gap-10 sm:grid-cols-3 lg:w-auto lg:gap-16">
            {/* Product */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Product
              </h3>

              <ul className="mt-5 space-y-3 text-sm text-neutral-600">
                {["Features", "Insights", "API", "Pricing"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="transition-colors duration-200 hover:text-black"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Resources
              </h3>

              <ul className="mt-5 space-y-3 text-sm text-neutral-600">
                {["Documentation", "Guides", "Blog", "Support"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="transition-colors duration-200 hover:text-black"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Company
              </h3>

              <ul className="mt-5 space-y-3 text-sm text-neutral-600">
                {["About", "Contact", "Privacy", "Terms"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="transition-colors duration-200 hover:text-black"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Huge Brand Watermark */}
        <div className="relative mt-20 overflow-hidden select-none pointer-events-none">
          {/* <h1
            className="
              text-center
              text-[20vw]
              font-black
              leading-none
              tracking-tight
              text-neutral-200
            "
          >
            PULSE
          </h1> */}
        </div>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-neutral-300" />

        {/* Bottom */}
        <div
          className="
            mt-6
            flex
            flex-col
            items-center
            gap-4
            text-center
            text-xs
            text-neutral-500
            md:flex-row
            md:justify-between
            md:text-left
          "
        >
          <p>
            © {new Date().getFullYear()} Pulse. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5 md:justify-start">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-black"
            >
              Twitter
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-black"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-black"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
