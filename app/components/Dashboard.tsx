
"use client";

import { useState } from "react";
import { 
  Search, 
  SquarePen, 
  Camera, 
  Send, 
  Activity, 
  TrendingUp, 
  ShieldAlert, 
  Sparkles,
  Flame,
  Apple
} from "lucide-react";

// --- INLINE DEMO TYPES ---
interface PulseBlockText { type: "text"; content: string; }
interface PulseBlockBulletList { type: "bullet_list"; title: string; items: string[]; }
interface PulseBlockWarning { type: "warning"; severity: string; content: string; }
interface PulseBlockScore { type: "score"; label: string; value: number; explanation: string; }
interface PulseBlockAllergens { type: "allergens"; items: string[]; }
interface PulseBlockTable { type: "table"; headers: string[]; rows: string[][]; }
interface PulseBlockIngredient { type: "ingredient"; name: string; category: string; explanation: string; }

type MockPulseBlock = 
  | PulseBlockText 
  | PulseBlockBulletList 
  | PulseBlockWarning 
  | PulseBlockScore 
  | PulseBlockAllergens 
  | PulseBlockTable 
  | PulseBlockIngredient;

interface ChatMessage {
  role: "user" | "assistant";
  data: string | MockPulseBlock[];
}

export default function DashImage() {
  const [input, setInput] = useState("");

  const [chat] = useState<ChatMessage[]>([
    {
      role: "user",
      data: "Analyze the uploaded oat milk container ingredients."
    },
    {
      role: "assistant",
      data: [
        {
          type: "score",
          label: "Pulse Clean Rating",
          value: 84,
          explanation: "Minimal synthetic additives detected. High point score attributed to organic plant bases."
        },
        {
          type: "allergens",
          items: ["Gluten Trace", "Oats"]
        },
        {
          type: "warning",
          severity: "moderate",
          content: "Contains Dipotassium Phosphate used as an emulsifier stabilizer. Harmless in minor volumes but monitor if consuming multiple daily servings."
        },
        {
          type: "table",
          headers: ["Component", "Value per 100ml", "Threshold Assessment"],
          rows: [
            ["Added Sugars", "1.2g", "Low / Optimal"],
            ["Sodium", "45mg", "Trace Level"],
            ["Fibers", "1.5g", "Dietary Structural Support"]
          ]
        }
      ]
    }
  ]);

  return (
    <div className="flex h-[750px] w-full min-h-0 overflow-hidden rounded-3xl border border-neutral-200/80 bg-gradient-to-b from-neutral-50 via-neutral-100 to-zinc-50 font-sans text-neutral-900 shadow-xl">
      
      {/* --- STATIC SIDEBAR PANEL (Hidden on Mobile/Tablet screens, Visible on Desktop lg) --- */}
      <div className="hidden lg:block w-64 shrink-0 px-4 py-6 border-r border-neutral-200/60 bg-white/80 backdrop-blur-md">
        <div className="w-full flex items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-xs shadow-xs">
              P
            </div>
            <span className="text-md font-bold tracking-tight text-neutral-800">Pulse AI</span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-1.5 text-xs">
          <div className="flex items-center gap-3 rounded-xl p-3 bg-emerald-50/60 text-emerald-700 font-medium">
            <SquarePen strokeWidth={1.8} size={16} />
            <span>Active Workspace</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl p-3 text-neutral-400 font-medium">
            <Search strokeWidth={1.8} size={16} />
            <span>Analysis Archive</span>
          </div>
        </div>
      </div>

      {/* --- WORKSPACE CORE OVERVIEW PANEL --- */}
      <main className="flex min-h-0 flex-1 flex-col w-full">
        <div className="mx-auto flex min-h-0 w-full flex-1 flex-col px-4 sm:px-6 pt-6 max-w-5xl">
          
          <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto pb-4 px-1 custom-scrollbar">
            
            {/* Landing Meta Statistics Metrics */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200/60 pb-4 gap-3">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-neutral-900">
                  Pulse AI <span className="text-emerald-600 font-normal text-sm ml-1">Live Engine Demo</span>
                </h1>
                <p className="text-xs text-neutral-500">
                  Interactive UI sandbox simulating deep-scan consumer nutrition analytical layers.
                </p>
              </div>
              <div className="flex items-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-[11px] font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Sandbox Mode
                </span>
              </div>
            </div>

            {/* Stat Row Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200/60 shadow-2xs">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Avg Clean Score</span>
                  <Activity size={16} className="text-emerald-500" />
                </div>
                <div className="flex items-baseline gap-1.5 mt-1.5">
                  <span className="text-xl font-bold tracking-tight">78/100</span>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center"><TrendingUp size={10} />+4.2%</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-neutral-200/60 shadow-2xs">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Additives Blocked</span>
                  <ShieldAlert size={16} className="text-amber-500" />
                </div>
                <div className="flex items-baseline gap-1.5 mt-1.5">
                  <span className="text-xl font-bold tracking-tight">14 Items</span>
                  <span className="text-[10px] text-amber-600 font-medium">High Hazard</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-neutral-200/60 shadow-2xs">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Database Scans</span>
                  <Sparkles size={16} className="text-indigo-500" />
                </div>
                <div className="flex items-baseline gap-1.5 mt-1.5">
                  <span className="text-xl font-bold tracking-tight">142,890</span>
                  <span className="text-[10px] text-neutral-500 font-medium">Global API</span>
                </div>
              </div>
            </div>

            {/* Core Interactive Presentation Timeline */}
            <div className="space-y-4 my-2">
              {chat.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`w-full sm:max-w-[88%] rounded-2xl px-4 py-3 shadow-2xs ${
                      msg.role === "assistant" 
                        ? "bg-white border border-neutral-200/70 text-neutral-800" 
                        : "bg-neutral-900 text-white"
                    }`}
                  >
                    {typeof msg.data === "string" ? (
                      <p className="text-[13px] leading-relaxed">{msg.data}</p>
                    ) : (
                      <div className="space-y-3.5">
                        {msg.data.map((block, bIdx) => (
                          <StaticBlockRenderer key={bIdx} block={block} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Micro Dashboard Informational Controls Panel */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-1">
              <div className="md:col-span-3 bg-white p-3.5 rounded-xl border border-neutral-200/60">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                  <Apple size={13}/> Macro Balance Track Reference
                </h3>
                <div className="overflow-x-auto select-none">
                  <table className="w-full text-left text-xs text-neutral-600 min-w-[360px]">
                    <thead>
                      <tr className="border-b border-neutral-100 text-neutral-400 font-medium">
                        <th className="pb-1.5">Product Variant</th>
                        <th className="pb-1.5">Sugar Count</th>
                        <th className="pb-1.5">Profile Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-[11px]">
                      <tr>
                        <td className="py-2 font-medium text-neutral-800">Organic Almond Creamer</td>
                        <td className="py-2">1.1g / 100ml</td>
                        <td className="py-2"><span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px]">Optimal Clean</span></td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-neutral-800">High Protein Meal Replacement</td>
                        <td className="py-2">19.5g / serving</td>
                        <td className="py-2"><span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold text-[10px]">High Sugar Warning</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="md:col-span-2 bg-white p-3.5 rounded-xl border border-neutral-200/60 flex flex-col justify-between gap-2">
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1.5">
                    <Flame size={13} className="text-orange-500"/> Sample Interactivity
                  </h3>
                  <p className="text-[11px] text-neutral-400">Clicking triggers frontend demo visual load metrics below.</p>
                </div>
                <div className="flex flex-col gap-1">
                  <button 
                    onClick={() => setInput("Evaluate the systematic impact of Titanium Dioxide in confections.")}
                    className="text-left text-[11px] p-2 rounded-lg border border-neutral-100 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-300 transition-all truncate"
                  >
                    🔬 "Evaluate Titanium Dioxide compounds..."
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- FIXED CONTROL BAR INTERACTION COMPONENT --- */}
          <div className="flex shrink-0 justify-center pb-6 pt-2">
            <div className="flex w-full flex-col rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm focus-within:border-neutral-300 transition-all duration-200">
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type structural ingredients components, upload dynamic labels packages..."
                rows={1}
                className="max-h-24 w-full resize-none bg-transparent p-2 text-xs text-neutral-900 outline-none"
              />

              <div className="flex h-auto w-full items-center justify-between gap-2 px-1 pt-1">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] font-medium text-neutral-600">
                    <Camera size={13} />
                    <span className="hidden sm:inline">Attach Asset Label</span>
                    <span className="sm:hidden">Attach</span>
                  </div>
                </div>

                <button
                  onClick={() => setInput("")}
                  className="group shrink-0 cursor-pointer text-white flex items-center text-[11px] rounded-lg bg-emerald-600 py-1.5 px-3.5 gap-1.5 duration-200 hover:bg-emerald-700 font-medium"
                >
                  <Send size={12} />
                  <span>Execute Analysis</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// --- RENDERING PARSER INTERFACE ENGINE BLOCK ---
function StaticBlockRenderer({ block }: { block: MockPulseBlock }) {
  switch (block.type) {
    case "text":
      return <p className="text-xs leading-6 text-neutral-700">{block.content}</p>;

    case "bullet_list":
      return (
        <div className="space-y-1">
          <h3 className="font-semibold text-xs text-neutral-900">{block.title}</h3>
          <ul className="list-disc pl-4 space-y-0.5 text-xs text-neutral-700">
            {block.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case "warning":
      return (
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-2.5 text-xs">
          <p className="font-bold text-amber-800">{block.severity.toUpperCase()} Alert</p>
          <p className="text-amber-900 mt-0.5 text-[11px] leading-relaxed">{block.content}</p>
        </div>
      );

    case "score":
      return (
        <div className="rounded-xl bg-emerald-50/80 border border-emerald-100 p-2.5 text-xs">
          <h3 className="font-bold text-emerald-800">
            {block.label}: <span className="text-base font-black ml-1">{block.value}</span>/100
          </h3>
          <p className="text-emerald-900 mt-0.5 text-[11px] leading-relaxed">{block.explanation}</p>
        </div>
      );

    case "allergens":
      return (
        <div>
          <h3 className="font-semibold text-[11px] uppercase tracking-wider text-neutral-400">Allergen Isolation Vector</h3>
          <div className="flex gap-1.5 flex-wrap mt-1">
            {block.items.map((item) => (
              <span key={item} className="rounded-md bg-red-50 border border-red-200 px-2 py-0.5 text-[11px] font-medium text-red-700">
                {item}
              </span>
            ))}
          </div>
        </div>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-neutral-200 text-[11px]">
          <table className="w-full border-collapse min-w-[340px]">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
                {block.headers.map((header) => (
                  <th key={header} className="p-2 text-left font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {block.rows.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  {row.map((cell, i) => (
                    <td key={i} className="p-2 text-neutral-700">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "ingredient":
      return (
        <div className="rounded-xl border border-neutral-200 p-2.5 bg-neutral-50/50 text-xs">
          <h3 className="font-semibold text-neutral-800">{block.name}</h3>
          <p className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">{block.category}</p>
          <p className="mt-1 text-neutral-600 text-[11px] leading-relaxed">{block.explanation}</p>
        </div>
      );

    default:
      return null;
  }
}
