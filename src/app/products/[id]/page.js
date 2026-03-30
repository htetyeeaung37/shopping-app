"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from "@/store/authStore"; // AuthStore ကို import လုပ်ပါ
import {
  ShoppingCart, Heart, ArrowLeft,
  Star, Loader2, Package, Tag, CheckCircle
} from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(false);

  // Global Stores မှ လိုအပ်သည်များ ဆွဲထုတ်ခြင်း
  const addToCart = useCartStore((state) => state.addToCart);
  const { user, tempWishlist, toggleWishlist } = useAuthStore();
  
  const placeholder = "https://placehold.co/600x600/f8fafc/94a3b8?text=No+Image";

  // Wishlist ထဲမှာ ရှိ၊ မရှိ စစ်ဆေးခြင်း
  const isLiked = user 
    ? user.wishlist?.includes(Number(id)) // id က string ဖြစ်နေတတ်လို့ Number ပြောင်းစစ်တာ ပိုသေချာပါတယ်
    : tempWishlist?.includes(Number(id));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const handleToggleLike = () => {
    toggleWishlist(Number(id));
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <Loader2 className="animate-spin text-violet-600" size={40} />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <p className="text-slate-400">Product not found.</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 pt-10 pb-20 px-6">

      {/* ── Toast ── */}
      <div className={`
        fixed top-6 right-6 z-[200]
        flex items-center gap-3
        px-5 py-3.5 rounded-2xl
        bg-white dark:bg-slate-800
        border border-green-100 dark:border-green-500/20
        shadow-xl shadow-green-500/10
        transition-all duration-500
        ${toast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
      `}>
        <div className="w-8 h-8 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center flex-shrink-0">
          <CheckCircle size={18} className="text-green-500" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800 dark:text-white">Added to Cart!</p>
          <p className="text-xs text-slate-400 line-clamp-1 max-w-[180px]">{product.title}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: Images ── */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
              <img
                src={product.images?.[selectedImage] || product.thumbnail || placeholder}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = placeholder; }}
              />
            </div>

            {product.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`
                      flex-shrink-0 w-20 h-20 rounded-2xl
                      border-2 transition-all duration-200 p-0.5
                      ${selectedImage === i
                        ? "border-violet-500 shadow-lg shadow-violet-500/20"
                        : "border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100 hover:border-violet-300"
                      }
                    `}
                  >
                    <div className="w-full h-full rounded-xl overflow-hidden">
                      <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Info ── */}
          <div className="space-y-6">

            {/* Category + Rating */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 text-xs font-bold uppercase tracking-widest border border-violet-100 dark:border-violet-500/20">
                <Tag size={11} />
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
                <Star size={12} className="text-amber-500" fill="currentColor" />
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  {product.rating?.toFixed(1)}
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {product.title}
            </h1>

            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
              {product.description}
            </p>

            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-purple-400">
              ${product.price}
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
              <p className={`text-sm font-semibold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Qty</p>
              <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 rounded-2xl px-5 py-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-slate-500 hover:text-violet-600 font-black text-xl transition-colors"
                >−</button>
                <span className="font-black text-slate-900 dark:text-white w-5 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="text-slate-500 hover:text-violet-600 font-black text-xl transition-colors"
                >+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              {/* Global Wishlist Heart Button */}
              <button
                onClick={handleToggleLike}
                className={`
                  w-14 h-14 rounded-2xl flex items-center justify-center
                  border transition-all duration-300
                  ${isLiked
                    ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30"
                    : "border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:border-red-300"
                  }
                `}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
              <Package size={16} className="text-violet-500 flex-shrink-0" />
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Order now and get it delivered within <span className="text-violet-600 dark:text-violet-400 font-bold">3–5 business days</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}