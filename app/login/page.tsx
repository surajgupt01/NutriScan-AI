"use client";

import Link from "next/link";
import { GoogleIcon } from "../Icons/Google";
import { motion } from "motion/react";
import { SupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useEffect, useState } from "react";
import { ArrowRight, Mail, Sparkles, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState(false);
  const [countdown, setCountDown] = useState(0);

  const supabase = SupabaseBrowserClient();

  const handleGoogleAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus(false);
    setCountDown(30);

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (!error) {
      setStatus(true);
    }
  };

  useEffect(() => {
    if (countdown === 0) return;
    const timer = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white text-neutral-900 antialiased">
      
      {/* ── Left Column: Brand & Scenic Visual ── */}
      <div 
        className="relative w-full md:w-1/2 min-h-[260px] md:min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-between p-6 md:p-10 overflow-hidden"
        style={{ backgroundImage: `url('/pattern.png')` }}
      >
        {/* Soft atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Top Brand Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 group">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-400">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                <path d="M3.22 12H8.5l1.5-2.5 2 5 1.5-2.5h7.28" strokeWidth="2.2" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight text-white drop-shadow-sm">
              Pulse
            </span>
            <span className="px-1.5 py-0.2 rounded bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-mono font-medium text-white shadow-xs">
              AI
            </span>
          </Link>
        </div>

        {/* Bottom Showcase Card */}
        <div className="relative z-10 hidden md:flex flex-col gap-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-md text-white text-[10px] font-medium w-fit shadow-xs">
            <Sparkles className="w-2.5 h-2.5 text-amber-200" />
            <span>Nutrition Intelligence Platform</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-sm max-w-sm">
            <div className="flex items-center gap-2 mb-1.5 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold text-white">Instant Label Decoding</span>
            </div>
            <p className="text-[11px] text-white/90 leading-relaxed">
              Detect hidden sugars, seed oils, and regulated additives automatically with verified safety indexes.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right Column: Auth Section ── */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-6 md:p-12 lg:p-16 bg-white">
        
        {/* Top Navigation */}
        <div className="flex justify-end w-full">
          <Link
            href="/"
            className="text-[11px] text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Center Form Area */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-xs mx-auto flex flex-col my-auto"
        >
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold tracking-tight text-neutral-900 leading-snug">
              Welcome back
            </h1>
            <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
              Sign in to decode food labels and track your nutrition safety matrix.
            </p>
          </div>

          {/* Email Magic Link Form */}
          <form onSubmit={handleEmailAuth} className="w-full flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-neutral-700">
                Email address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-2.5 w-3.5 h-3.5 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={email}
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setStatus(false);
                  }}
                  className="w-full h-8 pl-8 pr-3 rounded-md border border-neutral-200 bg-white text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 shadow-2xs transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={countdown > 0 || !email.trim()}
              className="w-full h-8 flex items-center justify-center gap-1.5 rounded-md bg-neutral-900 text-neutral-50 text-[11px] font-medium hover:bg-neutral-800 disabled:opacity-40 active:scale-[0.98] transition-all shadow-2xs cursor-pointer"
            >
              <span>{countdown > 0 ? `Resend in ${countdown}s` : "Continue with Email"}</span>
              <ArrowRight className="w-3 h-3 text-neutral-400" />
            </button>
          </form>

          {/* OTP Status Notification */}
          {status && (
            <div className="mt-3 p-2.5 rounded-md bg-emerald-50 border border-emerald-200 text-left w-full">
              <p className="text-[11px] text-emerald-800 leading-normal">
                Sign-in link sent to <span className="font-medium text-emerald-950">{email}</span>. Check your inbox to finish logging in.
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="w-full flex items-center gap-2.5 my-4">
            <div className="h-px flex-1 bg-neutral-100" />
            <span className="text-[9px] font-mono text-neutral-400 uppercase">OR</span>
            <div className="h-px flex-1 bg-neutral-100" />
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full h-8 flex items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white text-neutral-700 text-[11px] font-medium hover:bg-neutral-50 hover:text-neutral-900 active:scale-[0.98] transition-all shadow-2xs cursor-pointer"
          >
            <GoogleIcon className="w-3.5 h-3.5" />
            <span>Continue with Google</span>
          </button>

          {/* Legal / Policy */}
          <p className="mt-6 text-[10px] text-neutral-400 text-center leading-relaxed">
            By continuing, you agree to our{" "}
            <a href="#terms" className="text-neutral-600 hover:text-neutral-900 underline underline-offset-2 transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#privacy" className="text-neutral-600 hover:text-neutral-900 underline underline-offset-2 transition-colors">
              Privacy Policy
            </a>.
          </p>
        </motion.div>

        {/* Bottom Footer Note */}
        <footer className="text-center text-[10px] text-neutral-400 py-2 font-mono">
          © {new Date().getFullYear()} Pulse AI. All rights reserved.
        </footer>

      </div>
    </div>
  );
}