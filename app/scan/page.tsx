"use client";

import Image from "next/image";
import Camera from "../Icons/Camera";
import Send from "../Icons/Send";
import { useRef, useState, useEffect } from "react";
import CrossIcon from "../Icons/Cross";
import axios from "axios";
import { scanFeatures } from "../constants/default";
import { ChevronsLeftRight, PlusIcon, TextSearch } from "lucide-react";
import { PulseBlock, PulseResponse } from "../constants/responseType";

import imageCompression from "browser-image-compression";
import { motion } from "motion/react";
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
      { type: "image/jpeg" },
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

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const file = useRef<HTMLInputElement>(null);
  const [path, setpath] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
  const [responseWait, SetResponseWait] = useState(false);
  async function handleScanBody() {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput("");

    const BackendPath = process.env.NEXT_PUBLIC_API_URL;
    if (!BackendPath) return;

    // Chat to send to backend (NO loading message)
    const contextChat: ChatMessage[] = [
      ...chat,
      {
        role: "user",
        data: userMsg,
        image: path ? path : null,
      },
    ];

    // UI chat (WITH loading message)
    setChat([
      ...contextChat,
      {
        role: "server",
        data: "loading",
      },
    ]);

    SetResponseWait(true);

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 50);

    try {
      const response = await axios.post(BackendPath, {
        prompt: userMsg,
        image: base64,
        contextofChat: contextChat, // no loading message
      });
      console.log("response data ---> ", response);
      const parsedResponse: PulseResponse = JSON.parse(response.data.response);

      // Remove loading and add assistant response
      setChat((prev) => [
        ...prev.filter((msg) => msg.role !== "server"),
        {
          role: "assistant",
          data: parsedResponse.blocks,
        },
      ]);
    } catch (error) {
      console.error(error);

      // Remove loading and show error
      // setChat((prev) => [
      //   ...prev.filter((msg) => msg.role !== "server"),
      //   {
      //     role: "assistant",
      //     data: [
      //       {
      //         type: "text",
      //         text: "Something went wrong. Please try again.",
      //       },
      //     ],
      //   },
      // ]);
    } finally {
      SetResponseWait(false);

      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 50);
    }
  }

  const [menu, setMenuPanel] = useState(false);

  console.log(chat);

  const [imageUpload, setImgUpload] = useState(false);

  const [imagePreview, setPreview] = useState(false);
  const [previewPath, setPreviewPath] = useState<string | null>();

  const supabase = SupabaseBrowserClient();

  const [user, setUser] = useState<User | null>(null);

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

  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/login");
    }
  };

  return (
    <div className="flex h-dvh min-h-0 overflow-hidden bg-linear-to-t from-gray-100 via-neutral-50 to-gray-100 relative">
      {imagePreview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={() => setPreview(false)}
          className="w-full h-full backdrop-blur-sm flex justify-center items-center absolute z-100 bg-black/10"
        >
          {previewPath ? (
            <Image
              src={previewPath}
              width={250}
              height={250}
              className="duration-300 ease-in-out w-80 h-80"
              alt="product-label-image"
            ></Image>
          ) : null}
        </motion.div>
      )}
      <div
        className={`fixed inset-y-0 left-0 z-250 rounded-r-3xl
           shrink-0 px-3 py-4 duration-300 ease-in-out sm:py-5 ${
             menu
               ? "w-[min(20rem,82vw)]  bg-gray-200 shadow-xl backdrop-blur-2xl lg:w-64 lg:shadow-none "
               : "w-0 bg-transparent sm:w-20"
           }`}
      >
        <div className={`w-full ${menu ? "text-end" : "text-center"}`}>
          <button
            className="cursor-pointer bg-gray-300 rounded-xl p-1 hover:bg-gray-500 group duration-300 ease-in-out text-neutral-300"
            onClick={() => {
              setMenuPanel((e) => !e);
            }}
          >
            <ChevronsLeftRight
              size={22}
              strokeWidth={1}
              className="cursor-pointer text-gray-700 transition-colors duration-200 group-hover:text-gray-200"
            />
          </button>
        </div>

        {menu && (
          <div className="flex w-full items-end justify-between">
            {/* <div className="flex flex-row items-end gap-1">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-black font-normal text-white">
                <PulseIcon />
              </div>
              <Logo textSize="text-md font-semibold"></Logo>
            </div> */}
            <span className="text-md text-neutral-700">Chat</span>
          </div>
        )}

        {menu && (
          <div className="mt-6 flex h-full w-full flex-1 flex-col items-start gap-2 text-xs pb-20">
            {/* Top Actions */}
            <button
              onClick={() => setChat([])}
              className="flex w-[60%] cursor-pointer items-center justify-center gap-1 rounded-full bg-black p-2 text-neutral-50 duration-100 ease-in-out hover:scale-101 hover:bg-neutral-900 active:scale-95"
            >
              <PlusIcon size={20} strokeWidth={1} />
              <span className="text-md">New Chat</span>
            </button>

            <button
              onClick={() => setChat([])}
              className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-xl bg-neutral-100 px-4 py-2 text-neutral-700 duration-100 ease-in-out hover:scale-101 hover:bg-neutral-200 hover:text-black active:scale-95"
            >
              <TextSearch size={20} strokeWidth={1} />
              <span className="text-md">Search Chat</span>
            </button>

            {/* Push everything below to the bottom */}
            <div className="mt-auto w-full border-t border-neutral-200 pt-4">
              <div className="mb-3 flex items-center gap-3">
                <Image
                  src={user?.user_metadata?.avatar_url || "/default-avatar.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-neutral-900">
                    {user?.user_metadata?.full_name || "User"}
                  </p>

                  <p className="truncate text-xs text-neutral-500">
                    {user?.email}
                  </p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="flex w-[80%] items-center justify-center rounded-xl border border-red-200 px-4 py-2 text-xs text-red-600 transition hover:bg-red-50"
              >
                Sign Out
              </button>
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
        className={`flex   min-h-0 flex-1 flex-col transition-[padding] duration-300 ease-in-out ${
          menu ? "lg:pl-64" : "pl-0 sm:pl-20 "
        }`}
      >
        <div className="mx-auto flex min-h-0 w-full  flex-1 flex-col px-3 pt-4 sm:px-5 sm:pt-6 lg:px-10 max-w-6xl ">
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pb-2 px-8 custom-scrollbar">
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
                      className="flex max-w-full items-center justify-center gap-2 rounded-full border border-neutral-200  px-3 py-1"
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

            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    translateY: 35,

                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    translateY: 0,

                    scale: 1,
                  }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className={`max-w-[80%] rounded-3xl px-4 py-3 ${
                    msg.role === "assistant" ? "bg-white" : ""
                  }`}
                >
                  {msg.role === "user" ? (
                    <motion.div className="flex flex-col items-center gag-2">
                      {msg.image && (
                        <Image
                          src={msg.image}
                          width={105}
                          height={80}
                          alt="label-iamge"
                          className="rounded-lg cursor-pointer w-30 h-30"
                          onClick={() => {
                            setPreview(true);
                            setPreviewPath(msg.image);
                          }}
                        ></Image>
                      )}
                      <motion.p
                        initial={{ opacity: 0, translateY: -10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-[13px] bg-gray-200 rounded-3xl px-4 py-3 mt-2"
                      >
                        {msg.data}
                      </motion.p>
                    </motion.div>
                  ) : msg.role === "server" ? (
                    <div>
                      <ChatThinkingLoader className="text-black" size={20} />
                    </div>
                  ) : msg.role === "assistant" ? (
                    <motion.div
                      initial={{ opacity: 0, translateX: -10 }}
                      animate={{ opacity: 1, translateX: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="space-y-4"
                    >
                      {msg.data?.map((block, idx) => (
                        <BlockRenderer key={idx} block={block} />
                      ))}
                    </motion.div>
                  ) : null}
                </motion.div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex shrink-0 justify-center   pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2 sm:pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
            <div className="flex w-full max-w-2xl flex-col rounded-3xl border border-neutral-200 bg-white p-2 shadow-sm shadow-zinc-100 transition-all duration-300 ease-in-out sm:rounded-4xl sm:p-3 lg:p-4">
              {imageUpload && (
                <div className="w-28 h-28 bg-gray-500 animate-pulse  rounded-xl"></div>
              )}

              {path && (
                <div className={`h-auto w-full p-2 `}>
                  <div className="relative flex h-24 w-24 items-center justify-center overflow-visible rounded-xl border border-white sm:h-32 sm:w-32">
                    <button
                      className="absolute -right-2 -top-2 z-50 cursor-pointer rounded-full bg-gray-200 p-1 shadow-md duration-300 ease-in-out hover:bg-gray-500"
                      onClick={() => {
                        setpath("");
                        setBase64("");
                      }}
                    >
                      <CrossIcon />
                    </button>
                    <Image
                      src={path}
                      alt="label-image"
                      className="h-full w-full rounded-xl object-fill "
                      width={200}
                      height={200}
                    />
                  </div>
                </div>
              )}

              <textarea
                // id="prompt"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !responseWait) {
                    e.preventDefault();
                    handleScanBody();
                  }
                }}
                placeholder="Ask AI about these ingredients..."
                rows={1}
                className="field-sizing-content max-h-32 w-full resize-none overflow-auto bg-transparent p-3 text-sm text-black outline-none sm:max-h-40 sm:text-xs"
              />

              <div className="flex h-auto w-full items-center justify-between gap-2 px-2 py-1 lg:px-3 lg:py-3">
                <div className="relative flex items-center gap-2">
                  <label
                    htmlFor="file"
                    className="group flex cursor-pointer items-center gap-1 rounded-2xl border border-neutral-100 bg-neutral-200 p-2 text-xs font-semibold text-neutrsal-900 duration-300 ease-in-out hover:border-gray-400"
                  >
                    <Camera />
                    <div className="absolute -left-5 -top-9 w-20 translate-y-6 rounded-lg border border-gray-200 bg-neutral-100 p-1 text-center text-neutral-900 opacity-0 shadow-xs shadow-gray-100 duration-300 ease-in-out group-hover:translate-y-2 group-hover:opacity-100">
                      Scan Label
                    </div>
                    <span className="font-normal text-xs text-black group-hover:text-gray-500 ">
                      Attach
                    </span>
                  </label>
                  <input
                    ref={file}
                    type="file"
                    id="file"
                    className="hidden"
                    onChange={async () => {
                      const fileInput = file?.current?.files?.[0];
                      const formats = ["jpeg", "jpg", "heif", "heic", "png"];

                      const x = fileInput?.name.split(".")[-1];
                      if (x && !formats.includes(x)) {
                        alert("Invalid image type");
                        return;
                      }

                      if (fileInput) {
                        try {
                          setImgUpload(true);

                          const compressedImage = await processImage(fileInput);
                          const base64 = await fileToBase64(compressedImage);
                          setBase64(base64);
                          setpath(URL.createObjectURL(compressedImage));
                        } catch (err) {
                          alert(err);
                        } finally {
                          setImgUpload(false);
                        }
                      }
                    }}
                  />
                </div>

                <button
                  className="group shrink-0 cursor-pointer text-white flex items-center text-xs rounded-full bg-neutral-900 py-2 px-4 gap-1 duration-300 ease-in-out hover:scale-101 active:scale-90"
                  onClick={() => {
                    if (!responseWait) handleScanBody();
                  }}
                >
                  <Send />
                  <span className="font-normal">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function BlockRenderer({ block }: { block: PulseBlock }) {
  switch (block.type) {
    case "text":
      return <p className="text-[13px] leading-7">{block.content}</p>;

    case "bullet_list":
      return (
        <div className="space-y-2">
          <h3 className="font-semibold text-[14px]">{block.title}</h3>

          <ul className="list-disc pl-5 space-y-1 text-[13px]">
            {block.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case "warning":
      return (
        <div className="rounded-xl border border-yellow-100 bg-yellow-50 p-3 text-[13px]">
          <p className="font-medium">{block.severity.toUpperCase()} Warning</p>
          <p>{block.content}</p>
        </div>
      );

    case "score":
      return (
        <div className="rounded-xl bg-green-50 p-3 text-[13px]">
          <h3 className="font-semibold text-[14px]">
            {block.label}: {block.value}/100
          </h3>
          <p>{block.explanation}</p>
        </div>
      );

    case "allergens":
      return (
        <div>
          <h3 className="font-semibold text-[14px]">Allergens</h3>

          <div className="flex gap-2 flex-wrap mt-2">
            {block.items.map((item) => (
              <span
                key={item}
                className="rounded-full bg-red-100 px-2 py-1 text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      );

    case "table":
      return (
        <table className="w-full border-collapse border border-neutral-300 text-[13px]">
          <thead>
            <tr>
              {block.headers.map((header) => (
                <th
                  key={header}
                  className="border border-neutral-300 p-2 text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {block.rows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, i) => (
                  <td key={i} className="border border-neutral-300 p-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );

    case "ingredient":
      return (
        <div className="rounded-xl border p-3 border-neutral-300 text-[13px]">
          <h3 className="font-semibold text-[14px]">{block.name}</h3>

          <p className="text-xs text-gray-500">{block.category}</p>

          <p className="mt-2">{block.explanation}</p>
        </div>
      );

    default:
      return null;
  }
}
