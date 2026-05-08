"use client";

import Camera from "../Icons/Camera";
import Send from "../Icons/Send";
import {  useRef, useState } from "react";

export default function Scan() {
  const file = useRef<HTMLInputElement>(null);
  const [ path, setpath ] = useState<string | null>(null);

  return (
    <div className="flex flex-col flex-1 items-center gap-4 justify-center bg-zinc-100 px-4">
      {/* <div className="bg-white rounded-xl w-200 h-100 p-2"></div> */}
      <div className="bg-white rounded-4xl shadow-md shadow-zinc-200 lg:w-[60%] w-full  h-auto py-4 px-4 flex items-center gap-2 justify-between">

       {path && <iframe src={path}></iframe>}
        <div className="flex items-center gap-2 relative">
          <label
            htmlFor="file"
            className="rounded-2xl group flex items-center gap-1 hover:bg-black text-xs text-white font-semibold p-2 border border-neutral-700 cursor-pointer ease-in-out duration-300 "
          >
            <Camera />
            <div className=" group-hover:opacity-100 bg-neutral-100 border border-gray-200 rounded-lg text-neutral-700 shadow-xs shadow-gray-200 group-hover:translate-y-2 opacity-0 duration-300 w-20 text-center ease-in-out absolute translate-y-6 -top-9 -left-10 p-1 ">{`Scan Label`}</div>
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
        <textarea
          placeholder="Ask AI about these ingredients..."
          className=" w-full p-1 text-xs text-gray-500 resize-none outline-0 field-sizing-content"
        ></textarea>
        <div className="flex items-center">
          <div className="bg-neutral-300 group p-3 rounded-full hover:scale-105 cursor-pointer duration-300 ease-in-out active:scale-90">
            <Send />
          </div>
        </div>
      </div>
    </div>
  );
}
