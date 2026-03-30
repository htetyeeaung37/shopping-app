"use client";
import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart, Loader2, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore"; // AuthStore ကို import လုပ်ပါ

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Auth Store မှ လိုအပ်သော state နှင့် function များ ဆွဲထုတ်ခြင်း
  const { user, tempWishlist, toggleWishlist } = useAuthStore();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=5&sortBy=rating&order=desc")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Heart icon နှိပ်လိုက်သောအခါ အလုပ်လုပ်မည့် function
  const handleToggleWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    // Login ဝင်ထားသည်ဖြစ်စေ၊ မဝင်ထားသည်ဖြစ်စေ toggleWishlist က handle လုပ်ပေးသွားမည်
    toggleWishlist(productId);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin text-violet-600" size={30} />
    </div>
  );

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight mb-1">
              <TrendingUp size={28} className="text-violet-600 dark:text-violet-400" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-purple-400">
                Trending Now
              </span>
            </h2>
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium tracking-wide">
              Curated picks loved by our community this week.
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:gap-2.5 transition-all duration-200 group"
          >
            View All
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => {
            
            // Heart icon အနီရောင် ပြ၊ မပြ စစ်ဆေးခြင်း
            // User login ရှိလျှင် user account wishlist ကိုကြည့်မည်၊ မရှိလျှင် tempWishlist ကိုကြည့်မည်
            const isLiked = user 
              ? user.wishlist?.includes(product.id)
              : tempWishlist?.includes(product.id);

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block"
              >
                <div className="bg-white dark:bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700/50 hover:border-violet-200 dark:hover:border-violet-700/50 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1.5 transition-all duration-300">

                  {/* Image Area */}
                  <div className="relative aspect-square bg-slate-50 dark:bg-slate-700/30 overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/400x400/f8fafc/94a3b8?text=No+Image";
                      }}
                    />

                    {/* Heart Button */}
                    <button
                      onClick={(e) => handleToggleWishlist(e, product.id)}
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

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-[10px] font-bold text-violet-500 dark:text-violet-400 uppercase tracking-widest mb-1.5">
                      {product.category || "General"}
                    </p>

                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200 mb-3">
                      {product.title}
                    </h3>

                    <div className="flex items-center justify-between">
                      <p className="text-base font-black text-slate-900 dark:text-white">
                        ${product.price}
                      </p>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
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
          })}
        </div>
      </div>
    </section>
  );
}