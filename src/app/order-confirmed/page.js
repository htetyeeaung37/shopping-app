'use client'
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';

function OrderConfirmedContent() {
  const params = useSearchParams();
  const orderId = params.get('orderId');
  const total = params.get('total');

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center px-6 py-20">

      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-400/10 dark:bg-violet-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-400/10 dark:bg-green-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-md w-full relative z-10">

        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 flex items-center justify-center">
              <CheckCircle size={44} className="text-green-500" strokeWidth={1.5} />
            </div>
            {/* Glow */}
            <div className="absolute inset-0 bg-green-400/20 rounded-3xl blur-xl -z-10" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
            Order Confirmed! 🎉
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed">
            Thank you for your purchase. Your order has been placed successfully and is being processed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50 p-6 mb-4">

          {/* Header */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center">
              <Package size={14} className="text-violet-500" />
            </div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Order Details
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-700/50">
              <span className="text-sm text-slate-500 dark:text-slate-400">Order ID</span>
              <span className="text-sm font-black text-slate-900 dark:text-white font-mono tracking-wide">
                {orderId}
              </span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-700/50">
              <span className="text-sm text-slate-500 dark:text-slate-400">Total Paid</span>
              <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-purple-400">
                ${total}
              </span>
            </div>
            <div className="flex justify-between items-center py-2.5">
              <span className="text-sm text-slate-500 dark:text-slate-400">Estimated Delivery</span>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                3–5 Business Days
              </span>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 rounded-2xl px-4 py-3 flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse flex-shrink-0" />
          <p className="text-xs text-violet-600 dark:text-violet-400 font-medium">
            Your order is being processed and will be shipped soon.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Link
            href="/products"
            className="w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            Continue Shopping
            <ArrowRight size={17} />
          </Link>

          <Link
            href="/"
            className="w-full py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold flex items-center justify-center gap-2 hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200 text-sm"
          >
            <Home size={15} />
            Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense>
      <OrderConfirmedContent />
    </Suspense>
  );
}