"use client";

import Image from "next/image";
import Camera from "../Icons/Camera";
import Send from "../Icons/Send";
import { useRef, useState } from "react";
import CrossIcon from "../Icons/Cross";
import axios from "axios";
import { scanFeatures } from "../constants/default";
import Logo from "../components/Logo";
import PulseIcon from "../Icons/Pulse";
import { PanelLeftClose, Search, SquarePen } from "lucide-react";

export default function Scan() {
  const file = useRef<HTMLInputElement>(null);
  const [path, setpath] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  interface chat {
    type: string;
    data: string;
  }

  const [chat, setChat] = useState<chat[]>([]);

  async function handleScanBody() {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setChat((prevChat) => [...prevChat, { type: "user", data: userMsg }]);

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);

    const response = await axios.post("http://127.0.0.1:8000/scan/", {
      prompt: userMsg,
    });

    setChat((prevChat) => [
      ...prevChat,
      { type: "bot", data: response?.data?.response },
    ]);

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  const [menu, setMenuPanel] = useState(false);

  return (
    <div className="flex h-dvh min-h-0 overflow-hidden bg-linear-to-t from-white via-lime-50 to-white">
      <div
        className={`fixed inset-y-0 left-0 z-50 
           shrink-0 px-3 py-4 duration-300 ease-in-out sm:py-5 ${
          menu
            ? "w-[min(20rem,82vw)]  bg-black/10 shadow-xl backdrop-blur-2xl lg:w-64 lg:shadow-none"
            : "w-0 bg-transparent sm:w-20"
        }`}
      >
        <div className={`w-full ${menu ? "text-end" : "text-center"}`}>
          <button
            className="cursor-pointer"
            onClick={() => {
              setMenuPanel((e) => !e);
            }}
          >
            <PanelLeftClose
              size={22}
              strokeWidth={1}
              className="cursor-pointer text-gray-700 transition-colors duration-200 hover:text-gray-500"
            />
          </button>
        </div>

        {menu && (
          <div className="flex w-full items-end justify-between">
            <div className="flex flex-row items-end gap-1">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-black font-normal text-white">
                <PulseIcon />
              </div>
              <Logo textSize="text-md font-semibold"></Logo>
            </div>
          </div>
        )}

        {menu && (
          <div className="mt-6 flex w-full flex-1 flex-col gap-2 text-xs">
            <div className="flex cursor-pointer items-end justify-start gap-1 rounded-lg p-2 duration-100 ease-in-out hover:bg-neutral-100">
              <SquarePen strokeWidth={1} size={20}></SquarePen>
              <span>{"New Chat"}</span>
            </div>
            <div className="flex cursor-pointer items-end justify-start gap-1 rounded-lg p-2 duration-100 ease-in-out hover:bg-neutral-100">
              <Search strokeWidth={1} size={20}></Search>
              <span>{"Search Chat"}</span>
            </div>
          </div>
        )}
      </div>

      {menu && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/10 lg:hidden"
          onClick={() => setMenuPanel(false)}
        />
      )}

      <main
        className={`flex min-h-0 flex-1 flex-col transition-[padding] duration-300 ease-in-out ${
          menu ? "lg:pl-64" : "pl-0 sm:pl-20"
        }`}
      >
        <div className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col px-3 pt-4 sm:px-5 sm:pt-6 lg:px-6">
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pb-4 pr-1">
            {chat.length === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 py-8 font-sans tracking-wide sm:py-12 lg:py-20">
                <h1 className="text-center text-3xl font-bold text-zinc-800 sm:text-4xl lg:text-5xl">
                  {`Welcome to `}
                  <span className="bg-linear-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(132,204,22,0.4)]">
                    Pulse AI
                  </span>
                </h1>
                <p className="max-w-lg whitespace-pre-line p-2 text-center text-xs font-light text-zinc-500 sm:text-sm">
                  {`Upload a food label or ask a nutrition question.\nI'll analyze ingredients, nutrition facts, additives, and health impact instantly.`}
                </p>
                <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-2 sm:w-[90%] sm:gap-3 lg:mt-8 lg:w-[85%] lg:gap-6">
                  {scanFeatures.map((e) => (
                    <div
                      key={e.title}
                      className="flex max-w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-lime-50 px-3 py-1"
                    >
                      <e.icon strokeWidth={1.2} className="shrink-0" />
                      <div className="flex min-w-0 flex-col items-start justify-center">
                        <div className="max-w-full truncate text-xs font-semibold text-neutral-600">
                          {e.title}
                        </div>
                        <div className="max-w-full truncate text-xs font-light text-neutral-600">
                          {e.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {chat.map((e, idx) => (
              <div
                key={idx}
                className={`flex ${e.type === "bot" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[88%] wrap-break-words rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap sm:max-w-[80%] sm:px-4 lg:max-w-[75%] ${
                    e.type === "bot"
                      ? "text-zinc-800"
                      : "bg-white text-black shadow-sm"
                  }`}
                >
                  {e.data}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex shrink-0 justify-center pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2 sm:pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
            <div className="flex w-full max-w-2xl flex-col rounded-3xl bg-neutral-800 p-2 shadow-md shadow-zinc-200 transition-all duration-300 ease-in-out sm:rounded-4xl sm:p-3 lg:p-4">
              {path && (
                <div className="h-auto w-full p-2">
                  <div className="relative flex h-24 w-24 items-center justify-center overflow-visible rounded-xl border border-white sm:h-32 sm:w-32">
                    <button
                      className="absolute -right-2 -top-2 z-50 cursor-pointer rounded-full bg-gray-200 p-1 shadow-md duration-300 ease-in-out hover:bg-gray-500"
                      onClick={() => setpath("")}
                    >
                      <CrossIcon />
                    </button>
                    <Image
                      src={path}
                      alt="label-image"
                      className="h-full w-full rounded-xl object-fill"
                      width={200}
                      height={200}
                    />
                  </div>
                </div>
              )}

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleScanBody();
                  }
                }}
                placeholder="Ask AI about these ingredients..."
                rows={1}
                className="field-sizing-content max-h-32 w-full resize-none overflow-auto bg-transparent p-3 text-sm text-gray-200 outline-none sm:max-h-40 sm:text-xs"
              />

              <div className="flex h-auto w-full items-center justify-between gap-2 px-2 py-1 lg:px-3 lg:py-3">
                <div className="relative flex items-center gap-2">
                  <label
                    htmlFor="file"
                    className="group flex cursor-pointer items-center gap-1 rounded-2xl border border-neutral-700 bg-neutral-700 p-2 text-xs font-semibold text-white duration-300 ease-in-out hover:bg-black"
                  >
                    <Camera />
                    <div className="absolute -left-5 -top-9 w-20 translate-y-6 rounded-lg border border-gray-200 bg-neutral-100 p-1 text-center text-neutral-700 opacity-0 shadow-xs shadow-gray-800 duration-300 ease-in-out group-hover:translate-y-2 group-hover:opacity-100">
                      Scan Label
                    </div>
                  </label>
                  <input
                    ref={file}
                    type="file"
                    id="file"
                    className="hidden"
                    onChange={() => {
                      const fileInput = file?.current?.files?.[0];
                      if (fileInput) setpath(URL.createObjectURL(fileInput));
                    }}
                  />
                </div>

                <button
                  className="group shrink-0 cursor-pointer rounded-full bg-neutral-300 p-3 duration-300 ease-in-out hover:scale-105 active:scale-90"
                  onClick={handleScanBody}
                >
                  <Send />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
