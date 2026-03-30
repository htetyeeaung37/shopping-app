"use client";
import { useCartStore } from "@/store/cartStore";
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const placeholder =
    "https://placehold.co/100x100/f8fafc/94a3b8?text=No+Image";

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 9.99;
  const total = (subtotal + shipping).toFixed(2);

  if (items.length === 0)
    return (
      <main className="min-h-screen bg-white dark:bg-slate-900 flex flex-col items-center justify-center gap-5 -mt-20">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <ShoppingBag
            size={36}
            className="text-slate-300 dark:text-slate-600"
          />
        </div>
        <div className="text-center">
          <p className="text-lg font-black text-slate-800 dark:text-white mb-1">
            Your cart is empty
          </p>
          <p className="text-sm text-slate-400">
            Looks like you haven't added anything yet.
          </p>
        </div>
        <Link
          href="/products"
          className="mt-2 px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-violet-500/25"
        >
          Continue Shopping
        </Link>
      </main>
    );

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 pt-10 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              Your <span className="text-violet-600">Cart</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {items.length} item{items.length > 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors group"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-0.5 transition-transform duration-200"
            />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Cart Items ── */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-3xl border border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 hover:border-violet-200 dark:hover:border-violet-700/30 transition-all duration-200"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-700/50 flex-shrink-0">
                  <img
                    src={item.thumbnail || item.images?.[0] || placeholder}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = placeholder;
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-1 text-sm mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[10px] font-bold text-violet-500 dark:text-violet-400 uppercase tracking-widest mb-2">
                    {item.category}
                  </p>
                  <p className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-purple-400">
                    ${item.price}
                  </p>
                </div>

                {/* Right: Subtotal + Qty + Delete */}
                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700/60 rounded-xl p-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-500 hover:text-violet-600 hover:bg-white dark:hover:bg-slate-600 transition-all duration-200"
                      >
                        <Minus size={12} strokeWidth={2.5} />
                      </button>
                      <span className="text-sm font-black text-slate-900 dark:text-white w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-500 hover:text-violet-600 hover:bg-white dark:hover:bg-slate-600 transition-all duration-200"
                      >
                        <Plus size={12} strokeWidth={2.5} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Order Summary ── */}
          <div className="lg:col-span-1">
            <div className="p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 sticky top-24">
              <h2 className="font-black text-slate-900 dark:text-white mb-6 text-lg">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    ${shipping.toFixed(2)}
                  </span>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-700/50" />

                <div className="flex justify-between font-black text-slate-900 dark:text-white text-base">
                  <span>Total</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-purple-400">
                    ${total}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold flex items-center justify-center shadow-lg shadow-violet-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                Checkout
              </Link>

              <button
                onClick={clearCart}
                className="w-full mt-3 py-3 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 text-sm font-semibold transition-all duration-200"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
