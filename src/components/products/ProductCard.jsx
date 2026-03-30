"use client";
import React from "react";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore"; // AuthStore ကို import လုပ်ပါ

export default function ProductCard({ product }) {
  const placeholder = "https://placehold.co/600x600/f8fafc/94a3b8?text=No+Image";
  const imageUrl = product.thumbnail || product.images?.[0] || placeholder;
  
  // Stores မှ လိုအပ်တာတွေ ဆွဲထုတ်ခြင်း
  const addToCart = useCartStore((state) => state.addToCart);
  const { user, tempWishlist, toggleWishlist } = useAuthStore();

  // Wishlist ထဲမှာ ရှိ၊ မရှိ စစ်ဆေးခြင်း (User or Guest logic)
  const isLiked = user 
    ? user.wishlist?.includes(product.id)
    : tempWishlist?.includes(product.id);

  const handleToggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Global store ထဲမှာ သွားသိမ်းမယ်
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white dark:bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700/50 hover:border-violet-200 dark:hover:border-violet-700/50 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1.5 transition-all duration-300">

        {/* ── Image Section ── */}
        <div className="relative aspect-square bg-slate-50 dark:bg-slate-700/30 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.title || "Product image"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              if (e.currentTarget.src !== placeholder) {
                e.currentTarget.src = placeholder;
              }
            }}
          />

          {/* Global Wishlist နဲ့ ချိတ်ထားတဲ့ Heart Button */}
          <button
            onClick={handleToggleLike}
            className={`
              absolute top-3 right-3
              w-8 h-8 rounded-full
              flex items-center justify-center
              shadow-md transition-all duration-200
              ${isLiked
                ? "bg-red-500 text-white scale-110"
                : "bg-white/95 dark:bg-slate-800/95 text-slate-300 hover:text-red-400 hover:scale-110"
              }
            `}
          >
            <Heart 
              size={14} 
              strokeWidth={2.5} 
              fill={isLiked ? "currentColor" : "none"} 
            />
          </button>
        </div>

        {/* ── Info Section ── */}
        <div className="p-4">
          {/* Category */}
          <p className="text-[10px] font-bold text-violet-500 dark:text-violet-400 uppercase tracking-widest mb-1.5">
            {product.category || "General"}
          </p>

          {/* Title */}
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200 mb-3">
            {product.title}
          </h3>

          {/* Price + Cart Actions */}
          <div className="flex items-center justify-between">
            <p className="text-base font-black text-slate-900 dark:text-white">
              ${product.price}
            </p>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-violet-500/20"
            >
              <ShoppingCart size={12} strokeWidth={2.5} />
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}