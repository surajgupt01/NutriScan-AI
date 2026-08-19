"use client";

import { GoogleIcon } from "../Icons/Google";
import { motion } from "motion/react";
import { SupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Mail } from "lucide-react";

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
    if (countdown === 0) {
      return;
    }
    const timer = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-white text-neutral-900 px-6 py-6 antialiased">
      
      {/* ── Top Header Brand ── */}
      <header className="flex items-center justify-between w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold tracking-tight text-neutral-900">
            Pulse
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
          <span className="text-[10px] font-mono text-neutral-400">
            AI
          </span>
        </div>
      </header>

      {/* ── Center Login Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-sm mx-auto flex flex-col items-center my-auto"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200/80 mb-3 text-neutral-600">
          <Sparkles className="w-2.5 h-2.5" />
          <span className="text-[10px] font-medium">Access Portal</span>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
            Welcome back
          </h1>
          <p className="mt-1 text-xs text-neutral-500 max-w-xs leading-relaxed">
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
                className="w-full h-8 pl-8 pr-3 rounded-md border border-neutral-200 bg-white text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 shadow-2xs transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={countdown > 0 || !email.trim()}
            className="w-full h-8 flex items-center justify-center gap-1.5 rounded-md bg-neutral-900 text-neutral-50 text-[11px] font-medium hover:bg-neutral-800 disabled:opacity-40 active:scale-[0.98] transition-all shadow-2xs"
          >
            <span>{countdown > 0 ? `Resend in ${countdown}s` : "Continue with Email"}</span>
            <ArrowRight className="w-3 h-3 text-neutral-400" />
          </button>
        </form>

        {/* OTP Success Status */}
        {status && (
          <div className="mt-3 p-2.5 rounded-md bg-neutral-50 border border-neutral-200 text-center w-full">
            <p className="text-[11px] text-neutral-600 leading-normal">
              We sent a temporary sign-in link to <span className="font-medium text-neutral-900">{email}</span>. Check your inbox to continue.
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
          className="w-full h-8 flex items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white text-neutral-700 text-[11px] font-medium hover:bg-neutral-50 hover:text-neutral-900 active:scale-[0.98] transition-all shadow-2xs"
        >
          <GoogleIcon className="w-3.5 h-3.5" />
          <span>Continue with Google</span>
        </button>

        {/* Legal Disclaimer */}
        <p className="mt-5 text-[10px] text-neutral-400 text-center max-w-xs leading-relaxed">
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

      {/* ── Footer ── */}
      <footer className="text-center text-[10px] text-neutral-400 py-2">
        © {new Date().getFullYear()} Pulse AI. All rights reserved.
      </footer>

    </div>
  );
}