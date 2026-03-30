import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const categories = [
    { emoji: "💄", label: "Beauty" },
    { emoji: "🌸", label: "Fragrance" },
    { emoji: "🛋️", label: "Furniture" },
    { emoji: "🛒", label: "Groceries" },
    { emoji: "💻", label: "Laptops" },
    { emoji: "👔", label: "Fashion" },
  ];

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-white dark:bg-slate-900">

      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-400/10 dark:bg-violet-500/5 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">

        {/* ── Left: Text ── */}
        <div className="space-y-8 text-center lg:text-left">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 text-violet-700 dark:text-violet-400 text-xs font-bold tracking-wide uppercase">
            <Sparkles size={13} />
            New Season Collection 2026
          </div>

          {/* Heading */}
          <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Everything <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-purple-400">
              You Need,
            </span>{" "}
            <br />
            All in One Place.
          </h1>

          {/* Subtext */}
          <p className="text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
            From beauty essentials to home furniture, laptops to fresh groceries —
            discover a curated collection designed for modern living.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <Link
              href="/products"
              className="px-7 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center gap-2 group"
            >
              Shop Now
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/products"
              className="px-7 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-600 dark:hover:text-violet-400 hover:-translate-y-0.5 transition-all duration-200 text-sm"
            >
              Browse Categories
            </Link>
          </div>

          {/* Stats */}
          <div className="pt-6 flex items-center justify-center lg:justify-start gap-8 border-t border-slate-100 dark:border-slate-800">
            {[
              { value: "12k+", label: "Happy Clients" },
              { value: "500+", label: "Products" },
              { value: "4.9", label: "Avg Rating" },
            ].map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />}
                <div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Category Grid ── */}
        <div className="relative">

          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-[2.5rem] blur-2xl" />

          <div className="relative bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-700/50 p-8 backdrop-blur-sm">

            {/* Top label */}
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">
              What we offer
            </p>

            {/* Category Grid */}
            <div className="grid grid-cols-3 gap-3">
              {categories.map(({ emoji, label }) => (
                <Link
                  key={label}
                  href="/products"
                  className="flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-md hover:shadow-violet-500/10 hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {emoji}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors text-center">
                    {label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-sm">New arrivals this week</p>
                <p className="text-violet-200 text-xs mt-0.5">Fresh picks just dropped</p>
              </div>
              <Link
                href="/products"
                className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <ArrowRight size={16} className="text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}