"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { parse as partialParse } from "partial-json";
import {
  Camera,
  ArrowUp,
  X,
  Plus,
  TextSearch,
  ScanLine,
  ChevronsLeftRight,
  Sparkles,
  RefreshCw,
  LogOut,
  SlidersHorizontal,
  PanelLeft,
} from "lucide-react";
import { scanFeatures } from "../constants/default";
import { PulseBlock, PulseResponse } from "../constants/responseType";
import imageCompression from "browser-image-compression";
import { motion, AnimatePresence } from "motion/react";
import ChatThinkingLoader from "../Icons/Loading";
import { SupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import BlockRenderer from "../components/BlockRenderer";

function parseModelJson(raw: string): PulseResponse {
  try {
    return JSON.parse(raw);
  } catch {
    const cleaned = raw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      return partialParse(cleaned) as PulseResponse;
    }
  }
}

// Extract valid completed blocks from partial JSON in real-time
function getLiveBlocks(raw: string): PulseBlock[] {
  try {
    const cleaned = raw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    const partial = partialParse(cleaned);
    if (partial && Array.isArray(partial.blocks)) {
      // Only render blocks that have at least a defined 'type'
      return partial.blocks.filter(
        (b: any) => b && typeof b === "object" && Boolean(b.type),
      );
    }
  } catch {
    // Return empty if chunk is still forming the root object
  }
  return [];
}

async function processImage(file: File): Promise<File> {
  let processedFile = file;

  if (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif")
  ) {
    const heic2any = (await import("heic2any")).default;
    const blob = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.8,
    });

    processedFile = new File(
      [blob as Blob],
      file.name.replace(/\.(heic|heif)$/i, ".jpg"),
      { type: "image/jpeg" },
    );
  }

  return await imageCompression(processedFile, {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  });
}

interface UserMessage {
  role: "user";
  data: string;
  image?: string | null;
}

interface AssistantMessage {
  role: "assistant";
  data: PulseBlock[];
  isStreaming?: boolean;
}

interface LoadingState {
  role: "server";
  data: "loading";
}

type ChatMessage = UserMessage | AssistantMessage | LoadingState;

export default function Scan() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [sessionId, setSessionId] = useState<string>(() => crypto.randomUUID());
  const [path, setPath] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [base64, setBase64] = useState("");
  const [responseWait, setResponseWait] = useState(false);
  const [menu, setMenuPanel] = useState(false);
  const [imageUpload, setImgUpload] = useState(false);
  const [imagePreview, setPreview] = useState(false);
  const [previewPath, setPreviewPath] = useState<string | null>(null);

  const supabase = SupabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [input]);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) return;
      setUser(user);
    }
    loadUser();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace("/login"); // Prevents back button from returning to /scan
      router.refresh(); // Clears server component cache
    }
  };

  const startNewScan = useCallback(() => {
    if (path) URL.revokeObjectURL(path);
    setChat([]);
    setInput("");
    setPath(null);
    setBase64("");
    setSessionId(crypto.randomUUID());
    if (window.innerWidth < 768) setMenuPanel(false);
  }, [path]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function handleScanBody(customText?: string) {
    const userMsg = (customText || input).trim();
    if (!userMsg && !base64) return;

    const currentImageThumbnail = path;
    const currentBase64 = base64;

    setInput("");
    setPath(null);
    setBase64("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const backendPath = process.env.NEXT_PUBLIC_API_URL || "/scan/";

    const newUserTurn: UserMessage = {
      role: "user",
      data: userMsg || "Scan this label for nutrition facts and health flags.",
      image: currentImageThumbnail,
    };

    const currentHistory = chat.filter(
      (msg): msg is UserMessage | AssistantMessage => msg.role !== "server",
    );

    setChat([
      ...currentHistory,
      newUserTurn,
      { role: "server", data: "loading" },
    ]);
    setResponseWait(true);
    setTimeout(scrollToBottom, 50);

    try {
      const response = await fetch(backendPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          prompt: newUserTurn.data,
          image: currentBase64 || null,
          contextofChat: currentHistory.map((m) => ({
            role: m.role,
            data:
              m.role === "assistant" && Array.isArray(m.data) ? m.data : m.data,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedRaw = "";
      let hasSwappedLoader = false;
      let sseBuffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        sseBuffer += decoder.decode(value, { stream: true });
        const events = sseBuffer.split("\n\n");
        // Keep trailing incomplete event in buffer
        sseBuffer = events.pop() || "";

        for (const event of events) {
          const lines = event.split("\n");
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;

            const dataStr = trimmed.replace(/^data:\s*/, "");
            if (dataStr === "[DONE]") continue;

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.error) throw new Error(parsed.error);

              if (parsed.content) {
                accumulatedRaw += parsed.content;
                const liveBlocks = getLiveBlocks(accumulatedRaw);

                if (!hasSwappedLoader) {
                  hasSwappedLoader = true;
                  setChat((prev) => [
                    ...prev.filter((msg) => msg.role !== "server"),
                    {
                      role: "assistant",
                      data: liveBlocks,
                      isStreaming: true,
                    },
                  ]);
                } else {
                  setChat((prev) => {
                    const updated = [...prev];
                    const lastIdx = updated.length - 1;
                    if (updated[lastIdx]?.role === "assistant") {
                      updated[lastIdx] = {
                        role: "assistant",
                        data: liveBlocks,
                        isStreaming: true,
                      };
                    }
                    return updated;
                  });
                }
                scrollToBottom();
              }
            } catch {
              // Wait for next complete chunk
            }
          }
        }
      }

      // Final pass to ensure all complete blocks render cleanly
      const finalParsed = parseModelJson(accumulatedRaw);
      setChat((prev) => {
        const updated = [...prev];
        const lastIdx = updated.length - 1;
        if (updated[lastIdx]?.role === "assistant") {
          updated[lastIdx] = {
            role: "assistant",
            data: finalParsed.blocks || [],
            isStreaming: false,
          };
        }
        return updated;
      });
    } catch (error) {
      console.error("Scan error:", error);
      setChat((prev) => [
        ...prev.filter((msg) => msg.role !== "server"),
        {
          role: "assistant",
          data: [
            {
              type: "warning",
              severity: "high",
              content:
                "Failed to process the label scan. Please try again with a clearer image.",
            } as PulseBlock,
          ],
          isStreaming: false,
        },
      ]);
    } finally {
      setResponseWait(false);
      setTimeout(scrollToBottom, 50);
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target.files?.[0];
    if (!fileInput) return;

    const formats = ["jpeg", "jpg", "heif", "heic", "png", "webp"];
    const ext = fileInput.name.split(".").pop()?.toLowerCase();
    if (ext && !formats.includes(ext)) {
      alert("Invalid image format");
      return;
    }

    try {
      setImgUpload(true);
      const compressed = await processImage(fileInput);
      const b64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(compressed);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });

      if (path) URL.revokeObjectURL(path);
      setBase64(b64);
      setPath(URL.createObjectURL(compressed));
    } catch (err) {
      console.error(err);
    } finally {
      setImgUpload(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex h-dvh min-h-0 overflow-hidden bg-neutral-50 text-neutral-900 font-sans antialiased relative selection:bg-neutral-900 selection:text-white">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {imagePreview && previewPath && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg max-h-[85vh] rounded-xl overflow-hidden bg-white p-1.5 border border-neutral-200 shadow-2xl cursor-default"
            >
              <Image
                src={previewPath}
                width={800}
                height={800}
                className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
                alt="Product label full view"
              />
              <button
                type="button"
                onClick={() => setPreview(false)}
                className="absolute top-3 right-3 rounded-full bg-neutral-900/80 p-1.5 text-white hover:bg-neutral-900 transition-colors backdrop-blur-xs active:scale-95"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col justify-between border-r border-neutral-200 bg-white transition-all duration-300 ease-in-out md:static ${
          menu
            ? "w-64 translate-x-0"
            : "-translate-x-full md:w-0 md:border-none md:overflow-hidden"
        }`}
      >
        <div className="flex flex-col p-3 overflow-hidden">
          <div className="flex items-center justify-between px-1 py-1 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs tracking-tight text-neutral-900">
                Pulse
              </span>
              <span className="h-1 w-1 rounded-full bg-neutral-400" />
              <span className="text-[9px] font-mono text-neutral-400">AI</span>
            </div>
            <button
              type="button"
              onClick={() => setMenuPanel(false)}
              className="p-1 rounded-md text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors active:scale-90"
              title="Collapse Sidebar"
            >
              <ChevronsLeftRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={startNewScan}
            className="flex items-center justify-center gap-1.5 w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 text-neutral-50 text-[11px] font-medium hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-xs mb-2"
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span>New Scan</span>
          </button>

          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 text-[11px] text-neutral-400 mb-3 focus-within:border-neutral-300 transition-all">
            <TextSearch className="w-3.5 h-3.5 shrink-0" />
            <input
              type="text"
              placeholder="Search history..."
              className="bg-transparent border-none outline-none text-[11px] text-neutral-700 placeholder:text-neutral-400 w-full"
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="px-1 text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
              Recent Scans
            </span>
            <div className="flex flex-col gap-0.5 mt-1">
              {[
                "Greek Yogurt Whole Milk",
                "Organic Protein Bar",
                "Almond Milk Unsweetened",
              ].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => {
                    if (window.innerWidth < 768) setMenuPanel(false);
                  }}
                  className="group flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 text-left truncate transition-colors active:scale-[0.99]"
                >
                  <ScanLine className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700 shrink-0 transition-colors" />
                  <span className="truncate">{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-2 border-t border-neutral-100">
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-neutral-50 border border-neutral-200/80">
            <div className="flex items-center gap-1.5 min-w-0">
              <Image
                src={user?.user_metadata?.avatar_url || "/default-avatar.png"}
                alt="Avatar"
                width={24}
                height={24}
                className="rounded-md border border-neutral-200 bg-neutral-200 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-neutral-800 truncate leading-tight">
                  {user?.user_metadata?.full_name || "Consumer"}
                </p>
                <p className="text-[9px] text-neutral-400 truncate leading-tight font-mono">
                  {user?.email || "Free Tier"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="p-1 text-neutral-400 hover:text-rose-600 transition-colors active:scale-90"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {menu && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px] md:hidden cursor-default"
          onClick={() => setMenuPanel(false)}
        />
      )}

      {/* Main Stage */}
      <main className="flex min-h-0 flex-1 flex-col bg-white">
        <header className="flex h-11 shrink-0 items-center justify-between border-b border-neutral-100 px-3 md:px-8 z-10">
          <div className="flex items-center gap-2">
            {!menu && (
              <button
                type="button"
                onClick={() => setMenuPanel(true)}
                className="p-1.5 rounded-md border border-neutral-200/80 text-neutral-700 bg-white hover:bg-neutral-50 transition-colors flex items-center justify-center shadow-2xs active:scale-95"
                title="Open Sidebar"
              >
                <PanelLeft className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="text-[11px] font-medium text-neutral-800">
              Nutrition Diagnostic Agent
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Real-time Analysis
            </span>
          </div>
          <button
            type="button"
            onClick={startNewScan}
            className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-800 transition-colors active:scale-95"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </header>

        {/* Scrollable Chat Area */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 md:px-6 py-6 space-y-4">
          <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
            {chat.length === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center my-auto pt-10 pb-4 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 mb-3">
                  <Sparkles className="w-2.5 h-2.5 text-neutral-700" />
                  <span className="text-[10px] font-medium text-neutral-700">
                    Pulse Label Intelligence
                  </span>
                </div>

                <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900">
                  Welcome to Pulse AI
                </h1>
                <p className="mt-1.5 text-xs text-neutral-500 max-w-md leading-relaxed">
                  Upload an ingredient label image or enter any nutritional
                  query for real-time structured analysis.
                </p>

                <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-2 max-w-3xl">
                  {scanFeatures.map((e) => (
                    <button
                      type="button"
                      key={e.title}
                      onClick={() => handleScanBody(e.title)}
                      className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-xs active:scale-[0.98] transition-all text-left"
                    >
                      <div className="p-1 rounded-md bg-neutral-50 group-hover:bg-neutral-100 transition-colors">
                        <e.icon className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-medium text-neutral-800 leading-none">
                          {e.title}
                        </span>
                        <span className="text-[9px] text-neutral-400 mt-0.5">
                          {e.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`w-full ${
                    msg.role === "user"
                      ? "max-w-2xl flex flex-col items-end"
                      : "max-w-4xl rounded-xl border border-neutral-100 bg-white p-4 shadow-xs"
                  }`}
                >
                  {msg.role === "user" ? (
                    <div className="flex flex-col items-end gap-1.5">
                      {msg.image && (
                        <div className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-0.5 shadow-2xs group">
                          <Image
                            src={msg.image}
                            width={80}
                            height={80}
                            alt="Label preview"
                            className="rounded object-cover w-20 h-20 cursor-zoom-in group-hover:scale-105 transition-transform"
                            onClick={() => {
                              setPreview(true);
                              setPreviewPath(msg.image || null);
                            }}
                          />
                        </div>
                      )}
                      <div className="rounded-xl rounded-tr-xs bg-neutral-900 px-3.5 py-2 text-xs text-neutral-50 shadow-2xs leading-relaxed max-w-xl font-normal whitespace-pre-wrap break-words">
                        {msg.data}
                      </div>
                    </div>
                  ) : msg.role === "server" ? (
                    <div className="flex items-center gap-2.5 py-1 text-neutral-500">
                      <ChatThinkingLoader
                        className="text-neutral-900"
                        size={15}
                      />
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-medium text-neutral-700">
                          Reading ingredient matrix
                        </span>
                        <span className="flex gap-0.5">
                          <span className="w-1 h-1 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1 h-1 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1 h-1 rounded-full bg-neutral-400 animate-bounce" />
                        </span>
                      </div>
                    </div>
                  ) : msg.role === "assistant" ? (
                    <div className="w-full space-y-3">
                      {/* Live streamed block cards */}
                      {msg.data && msg.data.length > 0
                        ? msg.data.map((block, bIdx) => (
                            <motion.div
                              key={bIdx}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <BlockRenderer block={block} />
                            </motion.div>
                          ))
                        : null}

                      {/* Stream heartbeat shown while blocks are actively arriving */}
                      {msg.isStreaming && (
                        <div className="flex items-center gap-2 py-2 px-3 rounded-lg border border-neutral-100 bg-neutral-50/50">
                          <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </div>
                          <span className="text-[11px] font-medium text-neutral-600">
                            {msg.data.length === 0
                              ? "Analyzing nutrition values & allergens..."
                              : "Generating next diagnostic block..."}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : null}
                </motion.div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Fixed Typing Bar */}
        <div className="w-full shrink-0 p-3 md:px-6 md:pb-4 bg-gradient-to-t from-white via-white to-transparent">
          <div className="w-full max-w-2xl mx-auto">
            <AnimatePresence>
              {imageUpload && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="flex items-center gap-2 p-1.5 px-2.5 mb-2 text-[10px] text-neutral-600 bg-neutral-100 rounded-full border border-neutral-200 w-fit"
                >
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-neutral-500 border-t-transparent animate-spin" />
                  <span>Compressing and converting image...</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {path && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mb-2"
                >
                  <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 bg-white p-0.5 shadow-xs">
                    <button
                      type="button"
                      onClick={() => {
                        if (path) URL.revokeObjectURL(path);
                        setPath(null);
                        setBase64("");
                      }}
                      className="absolute -top-1.5 -right-1.5 z-10 rounded-full bg-neutral-900 p-0.5 text-white shadow-xs hover:bg-neutral-800 active:scale-90 transition-transform"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                    <Image
                      src={path}
                      alt="Active thumbnail"
                      className="h-full w-full rounded object-cover"
                      width={48}
                      height={48}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white p-2.5 shadow-xs focus-within:border-neutral-400 focus-within:ring-1 focus-within:ring-neutral-200 transition-all">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !responseWait) {
                    e.preventDefault();
                    handleScanBody();
                  }
                }}
                placeholder="Ask about ingredients, additives, allergens..."
                rows={1}
                className="w-full resize-none overflow-y-auto bg-transparent px-1 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none min-h-[22px] max-h-44 leading-relaxed"
              />

              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 mt-1.5">
                <div className="flex items-center gap-1.5">
                  <label
                    htmlFor="file"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-50 border border-neutral-200 text-neutral-700 text-[10px] font-medium hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer"
                  >
                    <Camera className="w-3 h-3 text-neutral-500" />
                    <span>Attach Label</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="file"
                    className="hidden"
                    accept="image/jpeg,image/jpg,image/png,image/heic,image/heif,image/webp"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Preset options"
                    className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors active:scale-90"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                  </button>
                </div>

                <button
                  type="button"
                  disabled={responseWait || (!input.trim() && !base64)}
                  onClick={() => handleScanBody()}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-neutral-50 disabled:opacity-20 hover:bg-neutral-800 active:scale-90 transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
                >
                  {responseWait ? (
                    <div className="w-3 h-3 rounded-full border-2 border-neutral-300 border-t-white animate-spin" />
                  ) : (
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
