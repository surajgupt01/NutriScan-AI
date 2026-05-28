"use client";

import Image from "next/image";
import Camera from "../Icons/Camera";
import Send from "../Icons/Send";
import { useRef, useState } from "react";
import CrossIcon from "../Icons/Cross";

export default function Scan() {
  const file = useRef<HTMLInputElement>(null);
  const [path, setpath] = useState<string | null>(null);

  return (
    <div className="flex flex-col flex-1 items-center gap-4 justify-center bg-linear-to-t from-zinc-50 via-lime-100 to-zinc-50 px-4">
      {/* <div className="bg-white rounded-xl w-200 h-100 p-2"></div> */}

      <div className="min-h-50 lg:w-[60%] w-full whitespace-pre-line">
        <h1 className="lg:text-5xl text-4xl  text-center items-center text-zinc-800 font-bold tracking-tight">
          {` Welcome to `}
          <span className="text-lime-500  ">Pulse AI</span>
        </h1>

        <p className="w-full text-center text-zinc-500 lg:text-sm text-xs p-2 font-extralight">
          {" "}
          {`Upload a food label or ask a nutrition question.
I’ll analyze ingredients, nutrition facts, additives, and health impact instantly.`}
        </p>
      </div>
      <div className="bg-neutral-800 rounded-4xl shadow-md shadow-zinc-200 lg:w-[50%] lg:h-auto h-auto overflow-visible w-full flex flex-col lg:p-4 p-2 transition-all duration-300 ease-in-out">
        {path && (
          <div className="w-full p-2 h-auto">
            <div className="relative  w-32 h-32 border border-white rounded-xl overflow-visible flex justify-center items-center object-cover">
              <button
                className="absolute -top-2 -right-2 z-50 bg-gray-200 hover:bg-gray-500 duration-300 ease-in-out rounded-full p-1 cursor-pointer shadow-md"
                onClick={() => {
                  setpath("");
                }}
              >
                <CrossIcon />
              </button>

              <Image
                src={path}
                alt="label-image"
                className="object-fill w-full h-full rounded-xl"
                width={200}
                height={200}
              />
            </div>
          </div>
        )}

        <textarea
          placeholder="Ask AI about these ingredients..."
          className=" w-full p-3 text-xs text-gray-200 resize-none outline-0 field-sizing-content overflow-auto h-auto max-h-50  "
        ></textarea>
        <div className="w-full  h-auto lg:py-3 py-1 lg:px-3 px-2 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2 relative">
            <label
              htmlFor="file"
              className="rounded-2xl group flex items-center gap-1 hover:bg-black text-xs text-white font-semibold p-2 border border-neutral-700 bg-neutral-700 cursor-pointer ease-in-out duration-300 "
            >
              <Camera />
              <div className=" group-hover:opacity-100 bg-neutral-100 border border-gray-200 rounded-lg text-neutral-700 shadow-xs shadow-gray-800 group-hover:translate-y-2 opacity-0 duration-300 w-20 text-center ease-in-out absolute translate-y-6 -top-9 -left-5 p-1 ">{`Scan Label`}</div>
            </label>
            <input
              ref={file}
              type="file"
              id="file"
              className="hidden"
              onChange={() => {
                const fileInput = file?.current?.files?.[0];

                if (fileInput) {
                  setpath(URL.createObjectURL(fileInput));
                }
              }}
            ></input>
            {/* <div className="bg-red-400 rounded-full p-1 animate-pulse w-2 h-2"></div>
          <span className="text-xs font-semibold">{`Ready to Analyze`}</span> */}
          </div>

          <div className="flex items-center">
            <div className="bg-neutral-300 group p-3 rounded-full hover:scale-105 cursor-pointer duration-300 ease-in-out active:scale-90">
              <Send />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
