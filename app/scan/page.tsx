"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
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
  Activity,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";
import { scanFeatures } from "../constants/default";
import { PulseBlock, PulseResponse } from "../constants/responseType";
import imageCompression from "browser-image-compression";
import { motion, AnimatePresence } from "motion/react";
import ChatThinkingLoader from "../Icons/Loading";
import { SupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

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
      { type: "image/jpeg" }
    );
  }

  return await imageCompression(processedFile, {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  });
}

export default function Scan() {
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [path, setPath] = useState<string | null>(null);
  const [input, setInput] = useState("");

  interface UserMessage {
    role: "user";
    data: string;
    image?: string | null;
  }

  interface AssistantMessage {
    role: "assistant";
    data: PulseBlock[];
  }

  interface LoadingState {
    role: "server";
    data: "loading";
  }

  type ChatMessage = UserMessage | AssistantMessage | LoadingState;
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

  // Auto-resize textarea height on text change
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

      if (error) {
        console.error(error);
        return;
      }

      setUser(user);
    }

    loadUser();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login");
    }
  };

  async function handleScanBody(customText?: string) {
    const userMsg = (customText || input).trim();
    if (!userMsg && !base64) return;

    const activeImage = path;
    const activeBase64 = base64;

    setInput("");
    setPath(null);
    setBase64("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const BackendPath = process.env.NEXT_PUBLIC_API_URL;
    if (!BackendPath) return;

    const contextChat: ChatMessage[] = [
      ...chat,
      {
        role: "user",
        data: userMsg || "Scan this label for nutrition facts and health flags.",
        image: activeImage,
      },
    ];

    setChat([...contextChat, { role: "server", data: "loading" }]);
    setResponseWait(true);

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);

    try {
      const response = await axios.post(BackendPath, {
        prompt: userMsg || "Scan this label for nutrition facts and health flags.",
        image: activeBase64,
        contextofChat: contextChat,
      });

      const parsedResponse: PulseResponse = JSON.parse(response.data.response);

      setChat((prev) => [
        ...prev.filter((msg) => msg.role !== "server"),
        {
          role: "assistant",
          data: parsedResponse.blocks,
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setResponseWait(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target.files?.[0];
    if (!fileInput) return;

    const formats = ["jpeg", "jpg", "heif", "heic", "png", "webp"];
    const ext = fileInput.name.split(".").pop()?.toLowerCase();
    if (ext && !formats.includes(ext)) {
      alert("Invalid image type");
      return;
    }

    try {
      setImgUpload(true);
      const compressedImage = await processImage(fileInput);
      const b64 = await fileToBase64(compressedImage);
      setBase64(b64);
      setPath(URL.createObjectURL(compressedImage));
    } catch (err) {
      console.error(err);
    } finally {
      setImgUpload(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex h-dvh min-h-0 overflow-hidden bg-neutral-50 text-neutral-900 font-sans antialiased relative">
      {/* ── Image Lightbox Modal ── */}
      <AnimatePresence>
        {imagePreview && previewPath && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg max-h-[85vh] rounded-lg overflow-hidden bg-white p-1.5 border border-neutral-200 shadow-xl"
            >
              <Image
                src={previewPath}
                width={800}
                height={800}
                className="w-full h-auto max-h-[75vh] object-contain rounded-md"
                alt="Product label full view"
              />
              <button
                type="button"
                onClick={() => setPreview(false)}
                className="absolute top-3 right-3 rounded-md bg-neutral-900/80 p-1 text-white hover:bg-neutral-900 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex flex-col justify-between border-r border-neutral-200 bg-white transition-all duration-200 md:static ${
          menu ? "w-56 translate-x-0" : "-translate-x-full md:w-14 md:translate-x-0"
        }`}
      >
        <div className="flex flex-col p-2 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-1 py-1 mb-2">
            {menu && (
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-xs tracking-tight text-neutral-900">
                  Pulse
                </span>
                <span className="h-1 w-1 rounded-full bg-neutral-400" />
                <span className="text-[9px] font-mono text-neutral-400">AI</span>
              </div>
            )}
            <button
              type="button"
              onClick={() => setMenuPanel(!menu)}
              className="p-1 rounded-md text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
              title={menu ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              <ChevronsLeftRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* New Scan Button */}
          <button
            type="button"
            onClick={() => setChat([])}
            className={`flex items-center justify-center gap-1.5 rounded-md bg-neutral-900 text-neutral-50 text-[11px] font-medium hover:bg-neutral-800 active:scale-95 transition-all shadow-2xs mb-2 ${
              menu ? "w-full px-2.5 py-1.5" : "w-10 h-8 mx-auto"
            }`}
            title="New Chat"
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            {menu && <span>New Scan</span>}
          </button>

          {/* Quick Search */}
          {menu && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-neutral-50 border border-neutral-200 text-[11px] text-neutral-400 mb-3">
              <TextSearch className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Search history...</span>
            </div>
          )}

          {/* History */}
          {menu && (
            <div className="flex flex-col gap-0.5">
              <span className="px-1 text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                History
              </span>
              <div className="flex flex-col gap-0.5 mt-1">
                {["Greek Yogurt Whole Milk", "Organic Protein Bar", "Almond Milk Unsweetened"].map((item) => (
                  <button
                    type="button"
                    key={item}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 text-left truncate transition-colors"
                  >
                    <ScanLine className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Footer */}
        <div className="p-2 border-t border-neutral-100">
          <div className="flex items-center justify-between p-1 rounded-md bg-neutral-50 border border-neutral-200/80">
            <div className="flex items-center gap-1.5 min-w-0">
              <Image
                src={user?.user_metadata?.avatar_url || "/default-avatar.png"}
                alt="Avatar"
                width={22}
                height={22}
                className="rounded-md border border-neutral-200 bg-neutral-200 shrink-0"
              />
              {menu && (
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-neutral-800 truncate leading-tight">
                    {user?.user_metadata?.full_name || "Consumer"}
                  </p>
                  <p className="text-[9px] text-neutral-400 truncate leading-tight font-mono">
                    {user?.email || "Free Tier"}
                  </p>
                </div>
              )}
            </div>
            {menu && (
              <button
                type="button"
                onClick={handleSignOut}
                className="p-1 text-neutral-400 hover:text-rose-600 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Backdrop */}
      {menu && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-20 bg-black/10 md:hidden"
          onClick={() => setMenuPanel(false)}
        />
      )}

      {/* ── Main Stage ── */}
      <main className="flex min-h-0 flex-1 flex-col bg-white">
        {/* Top Header */}
        <header className="flex h-10 shrink-0 items-center justify-between border-b border-neutral-100 px-4 md:px-8 z-10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-neutral-800">Nutrition Diagnostic Agent</span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-mono text-neutral-500 bg-neutral-100 border border-neutral-200">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              Live
            </span>
          </div>
          <button
            type="button"
            onClick={() => setChat([])}
            className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-800 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </header>

        {/* Scrollable Chat Area */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 md:px-6 py-6">
          <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
            
            {/* Empty State Screen */}
            {chat.length === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center my-auto pt-8 pb-4 text-center">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 mb-2">
                  <Sparkles className="w-2.5 h-2.5 text-neutral-600" />
                  <span className="text-[10px] font-medium text-neutral-700">Pulse Label Intelligence</span>
                </div>

                <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900">
                  Welcome to Pulse AI
                </h1>
                <p className="mt-1 text-xs text-neutral-500 max-w-md leading-relaxed">
                  Upload an ingredient label image or enter any nutritional query for instant structured diagnostics.
                </p>

                {/* Default Scan Feature Badges */}
                <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-2 max-w-3xl">
                  {scanFeatures.map((e) => (
                    <button
                      type="button"
                      key={e.title}
                      onClick={() => handleScanBody(e.title)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100 hover:text-neutral-900 transition-colors text-left"
                    >
                      <e.icon className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-medium text-neutral-800 leading-none">{e.title}</span>
                        <span className="text-[9px] text-neutral-400 mt-0.5">{e.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`w-full ${
                    msg.role === "user"
                      ? "max-w-2xl flex flex-col items-end"
                      : "max-w-4xl rounded-xl border border-neutral-200 bg-white p-4 shadow-2xs"
                  }`}
                >
                  {msg.role === "user" ? (
                    <div className="flex flex-col items-end gap-1.5">
                      {msg.image && (
                        <div className="relative overflow-hidden rounded-md border border-neutral-200 bg-white p-0.5 shadow-2xs">
                          <Image
                            src={msg.image}
                            width={80}
                            height={80}
                            alt="Label preview"
                            className="rounded object-cover w-20 h-20 cursor-pointer hover:opacity-90 transition-opacity"
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
                    <div className="flex items-center gap-2 py-0.5 text-neutral-500">
                      <ChatThinkingLoader className="text-neutral-900" size={14} />
                      <span className="text-[11px] font-medium text-neutral-600">Analyzing ingredient matrix...</span>
                    </div>
                  ) : msg.role === "assistant" ? (
                    <div className="w-full space-y-3">
                      {msg.data?.map((block, bIdx) => (
                        <BlockRenderer key={bIdx} block={block} />
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* ── Auto-Sizing Command Bar ── */}
        <div className="w-full shrink-0 p-3 md:px-6 md:pb-4 bg-gradient-to-t from-white via-white to-transparent">
          <div className="w-full max-w-2xl mx-auto">
            {/* Upload Spinner Alert */}
            {imageUpload && (
              <div className="flex items-center gap-1.5 p-1.5 mb-1.5 text-[10px] text-neutral-500 bg-neutral-50 rounded-md border border-neutral-200">
                <div className="w-2.5 h-2.5 rounded-full border border-neutral-400 border-t-transparent animate-spin" />
                <span>Processing label image...</span>
              </div>
            )}

            {/* Selected Image Thumbnail Preview */}
            {path && (
              <div className="mb-1.5">
                <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={() => {
                      setPath(null);
                      setBase64("");
                    }}
                    className="absolute -top-1 -right-1 z-10 rounded-full bg-neutral-900 p-0.5 text-white shadow-xs hover:bg-neutral-800"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                  <Image
                    src={path}
                    alt="Active thumbnail"
                    className="h-full w-full rounded object-cover"
                    width={44}
                    height={44}
                  />
                </div>
              </div>
            )}

            {/* Input Card with Dynamic Auto-Growing Textarea */}
            <div className="relative flex flex-col rounded-lg border border-neutral-200 bg-white p-2.5 shadow-2xs focus-within:border-neutral-300 transition-all">
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
                className="w-full resize-none overflow-y-auto bg-transparent px-0.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none min-h-[22px] max-h-44 leading-relaxed"
              />

              {/* Action Toolbar */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 mt-1.5">
                <div className="flex items-center gap-1">
                  <label
                    htmlFor="file"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-50 border border-neutral-200 text-neutral-700 text-[10px] font-medium hover:bg-neutral-100 transition-colors cursor-pointer"
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
                    className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                  </button>
                </div>

                <button
                  type="button"
                  disabled={responseWait || (!input.trim() && !base64)}
                  onClick={() => handleScanBody()}
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-neutral-50 disabled:opacity-20 hover:bg-neutral-800 active:scale-95 transition-all shadow-2xs"
                >
                  <ArrowUp className="w-3 h-3 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── Content Block Renderers ── */
function BlockRenderer({ block }: { block: PulseBlock }) {
  switch (block.type) {
    case "text":
      return (
        <div className="w-full text-xs leading-relaxed text-neutral-700 font-normal whitespace-pre-wrap break-words">
          {block.content}
        </div>
      );

    case "score":
      return (
        <div className="w-full rounded-lg border border-neutral-200 bg-neutral-50/60 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-md bg-white border border-neutral-200 text-neutral-800 shadow-2xs">
                <Activity className="w-3.5 h-3.5 text-neutral-700" />
              </div>
              <div>
                <span className="text-xs font-semibold text-neutral-900">{block.label}</span>
                <p className="text-[9px] text-neutral-400 font-mono">Nutritional Density Score</p>
              </div>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-bold tracking-tight text-neutral-900 font-mono">{block.value}</span>
              <span className="text-[10px] text-neutral-400 font-mono">/100</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-neutral-600 leading-relaxed border-t border-neutral-200/60 pt-2 font-normal">
            {block.explanation}
          </p>
        </div>
      );

    case "warning":
      return (
        <div className="w-full flex items-start gap-2 rounded-lg border border-amber-200/80 bg-amber-50/50 p-2.5">
          <div className="p-0.5 text-amber-700 mt-0.5">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-amber-800 font-mono">
              {block.severity} Risk Warning
            </p>
            <p className="text-xs text-neutral-700 leading-relaxed font-normal">{block.content}</p>
          </div>
        </div>
      );

    case "allergens":
      return (
        <div className="w-full rounded-lg border border-neutral-200 bg-neutral-50/40 p-2.5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <ShieldAlert className="w-3 h-3 text-neutral-600" />
            <span className="text-xs font-medium text-neutral-900">Detected Allergens & Compounds</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {block.items.map((item) => (
              <span
                key={item}
                className="rounded-md bg-white border border-neutral-200 px-2 py-0.5 text-[10px] font-medium text-neutral-700 shadow-2xs"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      );

    case "bullet_list":
      return (
        <div className="w-full space-y-1.5 rounded-lg border border-neutral-200 bg-neutral-50/30 p-2.5">
          <span className="text-xs font-medium text-neutral-900">{block.title}</span>
          <ul className="space-y-0.5 pl-3.5 text-xs text-neutral-600 list-disc">
            {block.items.map((item, idx) => (
              <li key={idx} className="leading-relaxed font-normal">{item}</li>
            ))}
          </ul>
        </div>
      );

    case "table":
      return (
        <div className="w-full overflow-hidden rounded-lg border border-neutral-200 bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-neutral-50 text-neutral-700 border-b border-neutral-200">
              <tr>
                {block.headers.map((h) => (
                  <th key={h} className="p-2 font-medium text-[10px] font-mono">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {block.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-neutral-50/40 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-2 text-[11px] text-neutral-600 font-normal">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "ingredient":
      return (
        <div className="w-full rounded-lg border border-neutral-200 bg-white p-2.5 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-900">{block.name}</span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
              {block.category}
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-relaxed font-normal">{block.explanation}</p>
        </div>
      );

    default:
      return null;
  }
}