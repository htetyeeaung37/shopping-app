"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Mail, Lock, ArrowRight, Loader2, CheckCircle, ShoppingBag, Sparkles } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

function LoginContent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("Account created! Please sign in.");
    }
  }, [searchParams]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const result = login(username, password);
      if (!result.success) {
        setError(result.message);
        setLoading(false);
        return;
      }
      router.push("/");
    }, 1000);
  };

  const inputClass = `
    w-full h-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm
    border border-slate-200 dark:border-slate-700
    rounded-2xl pl-12 pr-4 outline-none
    focus:ring-2 focus:ring-violet-500 focus:border-transparent
    focus:bg-white dark:focus:bg-slate-800
    transition-all duration-300 text-sm text-slate-900 dark:text-white
    placeholder:text-slate-400 dark:placeholder:text-slate-500
  `;

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 overflow-hidden relative">
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />

      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2.5rem] border border-white dark:border-slate-800 shadow-2xl overflow-hidden relative z-10">
        
        {/* Left Side: Branding */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                <ShoppingBag size={22} className="text-white" />
              </div>
              Shopify<span className="text-violet-200">.</span>
            </Link>
          </div>

          <div className="relative z-10">
            <h2 className="text-5xl font-black leading-[1.1] mb-6">
              Unlock the <br /> 
              <span className="text-violet-200">Best Deals</span> Today.
            </h2>
            <p className="text-violet-100/80 text-lg max-w-md font-medium leading-relaxed">
              Join over 12k+ shoppers and get access to exclusive premium products and personalized offers.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 text-sm font-bold bg-white/10 backdrop-blur-md w-fit px-6 py-3 rounded-2xl border border-white/20">
            <Sparkles size={18} className="text-yellow-300" />
            New arrivals every week!
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative">
          
          <div className="mb-10">
            <div className="lg:hidden flex items-center gap-2 mb-8">
               <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                <ShoppingBag size={18} className="text-white" />
              </div>
              <span className="font-black text-xl text-slate-900 dark:text-white">Shopify.</span>
            </div>
            
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Welcome Back!</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Please enter your details to sign in.</p>
          </div>

          {/* Alert Messages */}
          {success && (
            <div className="mb-6 flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-bold animate-in fade-in slide-in-from-top-2">
              <CheckCircle size={18} />
              {success}
            </div>
          )}

          {error && (
            <div className="mb-6 px-4 py-3.5 rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-bold text-center animate-in shake-2">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Field */}
            <div className="group relative">
              <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-2 ml-1 transition-colors group-focus-within:text-violet-500">
                Username
              </label>
              <div className="relative">
                <Mail 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 group-focus-within:scale-110 transition-all duration-300 z-10 pointer-events-none" 
                  size={18} 
                />
                <input
                  type="text" required
                  placeholder="Enter your username"
                  className={inputClass}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group relative">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] transition-colors group-focus-within:text-violet-500">
                  Password
                </label>
                {/* <button type="button" className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-500 transition-colors">
                  Forgot password?
                </button> */}
              </div>
              <div className="relative">
                <Lock 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 group-focus-within:scale-110 transition-all duration-300 z-10 pointer-events-none" 
                  size={18} 
                />
                <input
                  type="password" required
                  placeholder="••••••••"
                  className={inputClass}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 mt-4 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-70 text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-violet-500/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]"
            >
              {loading
                ? <Loader2 className="animate-spin" size={22} />
                : <span className="flex items-center gap-2">Sign In to Account <ArrowRight size={18} /></span>
              }
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              New to our platform?{" "}
              <Link href="/register" className="text-violet-600 dark:text-violet-400 font-black hover:underline underline-offset-4 decoration-2">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}