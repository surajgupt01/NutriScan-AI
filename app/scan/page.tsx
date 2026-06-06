"use client";

import Image from "next/image";
import Camera from "../Icons/Camera";
import Send from "../Icons/Send";
import { useRef, useState } from "react";
import CrossIcon from "../Icons/Cross";
import axios from "axios";

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

    // Auto-scroll to bottom
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

  return (
    // Full viewport height, flex column
    <div className="h-screen flex flex-col bg-gradient-to-t from-zinc-50 via-lime-100 to-zinc-50 overflow-hidden">

      {/* ── Messages area (scrollable, fills remaining space) ── */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-3 min-h-full">

          {/* Welcome screen shown only when no messages */}
          {chat.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 gap-2 py-20">
              <h1 className="lg:text-5xl text-4xl text-center text-zinc-800 font-bold tracking-tight">
                {`Welcome to `}
                <span className="text-lime-500">Pulse AI</span>
              </h1>
              <p className="text-center text-zinc-500 lg:text-sm text-xs p-2 font-extralight max-w-lg whitespace-pre-line">
                {`Upload a food label or ask a nutrition question.\nI'll analyze ingredients, nutrition facts, additives, and health impact instantly.`}
              </p>
            </div>
          )}

          {/* Chat messages */}
          {chat.map((e, idx) => (
            <div
              key={idx}
              className={`flex ${e.type === "bot" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl whitespace-pre-wrap text-sm
                  ${e.type === "bot"
                    ? "text-zinc-800"
                    : "bg-white text-black shadow-sm"
                  }`}
              >
                {e.data}
              </div>
            </div>
          ))}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── Input bar (always at bottom, never scrolls away) ── */}
      <div className="px-4 pb-5 pt-2 flex justify-center">
        <div className="bg-neutral-800 rounded-4xl shadow-md shadow-zinc-200 w-full max-w-2xl flex flex-col lg:p-4 p-2 transition-all duration-300 ease-in-out">

          {/* Image preview */}
          {path && (
            <div className="w-full p-2 h-auto">
              <div className="relative w-32 h-32 border border-white rounded-xl overflow-visible flex justify-center items-center">
                <button
                  className="absolute -top-2 -right-2 z-50 bg-gray-200 hover:bg-gray-500 duration-300 ease-in-out rounded-full p-1 cursor-pointer shadow-md"
                  onClick={() => setpath("")}
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

          {/* Textarea — NO fixed/absolute, flows naturally inside the card */}
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
            className="w-full p-3 text-xs text-gray-200 bg-transparent resize-none outline-none overflow-auto max-h-40 field-sizing-content"
          />

          {/* Bottom row: camera button + send button */}
          <div className="w-full h-auto lg:py-3 py-1 lg:px-3 px-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 relative">
              <label
                htmlFor="file"
                className="rounded-2xl group flex items-center gap-1 hover:bg-black text-xs text-white font-semibold p-2 border border-neutral-700 bg-neutral-700 cursor-pointer ease-in-out duration-300"
              >
                <Camera />
                <div className="group-hover:opacity-100 bg-neutral-100 border border-gray-200 rounded-lg text-neutral-700 shadow-xs shadow-gray-800 group-hover:translate-y-2 opacity-0 duration-300 w-20 text-center ease-in-out absolute translate-y-6 -top-9 -left-5 p-1">
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
              className="bg-neutral-300 group p-3 rounded-full hover:scale-105 cursor-pointer duration-300 ease-in-out active:scale-90"
              onClick={handleScanBody}
            >
              <Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}