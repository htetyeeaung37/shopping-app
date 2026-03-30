"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  CreditCard,
  ClipboardList,
  CheckCircle,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Shipping", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Review", icon: ClipboardList },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [orderToast, setOrderToast] = useState(false);

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const placeholder =
    "https://placehold.co/100x100/f8fafc/94a3b8?text=No+Image";

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping_fee = 9.99;
  const total = (subtotal + shipping_fee).toFixed(2);

  const formatCard = (val) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (val) =>
    val
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(.{2})/, "$1/");

  const handlePlaceOrder = () => {
    const orderId =
      "ORD-" + Math.random().toString(36).slice(2, 10).toUpperCase();
    clearCart();
    setOrderToast(true);
    setTimeout(() => {
      router.push(`/order-confirmed?orderId=${orderId}&total=${total}`);
    }, 2000);
  };

  const inputClass = `
    w-full px-4 py-3 rounded-2xl text-sm font-medium
    border border-slate-200 dark:border-slate-700
    bg-white dark:bg-slate-800
    text-slate-800 dark:text-white
    placeholder:text-slate-300 dark:placeholder:text-slate-600
    focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
    transition-all duration-200
  `;

  const labelClass =
    "block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide";

  return (
    <>
      {/* ── Toast ── */}
      <div
        className={`
      fixed top-6 right-6 z-[200]
      flex items-center gap-3
      px-5 py-3.5 rounded-2xl
      bg-white dark:bg-slate-800
      border border-green-100 dark:border-green-500/20
      shadow-xl shadow-green-500/10
      transition-all duration-500
      ${
        orderToast
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }
    `}
      >
        <div className="w-8 h-8 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center flex-shrink-0">
          <CheckCircle size={18} className="text-green-500" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800 dark:text-white">
            Order Placed Successfully!
          </p>
          <p className="text-xs text-slate-400">
            Redirecting to confirmation...
          </p>
        </div>
      </div>
      <main className="min-h-screen bg-white dark:bg-slate-900 pt-10 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back */}
          <button
            onClick={() =>
              step === 1 ? router.push("/cart") : setStep((s) => s - 1)
            }
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 mb-10 group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform duration-200"
            />
            {step === 1 ? "Back to Cart" : "Previous Step"}
          </button>

          {/* ── Step Indicator ── */}
          <div className="flex items-center justify-center mb-10">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`
                  w-10 h-10 rounded-2xl flex items-center justify-center
                  transition-all duration-300
                  ${
                    step === s.id
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                      : step > s.id
                        ? "bg-green-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                  }
                `}
                  >
                    {step > s.id ? (
                      <CheckCircle size={18} />
                    ) : (
                      <s.icon size={16} />
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide ${
                      step === s.id
                        ? "text-violet-600 dark:text-violet-400"
                        : step > s.id
                          ? "text-green-500"
                          : "text-slate-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`
                  w-20 h-0.5 rounded-full mx-3 mb-4
                  transition-all duration-300
                  ${step > s.id ? "bg-green-500" : "bg-slate-200 dark:bg-slate-700"}
                `}
                  />
                )}
              </div>
            ))}
          </div>

          {/* ── Card ── */}
          <div className="bg-white dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50 p-8">
            {/* ── STEP 1: Shipping ── */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="mb-6">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    Shipping Address
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Where should we deliver your order?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                      className={inputClass}
                      placeholder="full name"
                      value={shipping.fullName}
                      onChange={(e) =>
                        setShipping({ ...shipping, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input
                      className={inputClass}
                      placeholder="phone number"
                      value={shipping.phone}
                      onChange={(e) =>
                        setShipping({ ...shipping, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    className={inputClass}
                    placeholder="name@example.com"
                    value={shipping.email}
                    onChange={(e) =>
                      setShipping({ ...shipping, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className={labelClass}>Address</label>
                  <input
                    className={inputClass}
                    placeholder="address"
                    value={shipping.address}
                    onChange={(e) =>
                      setShipping({ ...shipping, address: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>City</label>
                    <input
                      className={inputClass}
                      placeholder="city"
                      value={shipping.city}
                      onChange={(e) =>
                        setShipping({ ...shipping, city: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>ZIP Code</label>
                    <input
                      className={inputClass}
                      placeholder="eg. 10001"
                      value={shipping.zip}
                      onChange={(e) =>
                        setShipping({ ...shipping, zip: e.target.value })
                      }
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={
                    !shipping.fullName ||
                    !shipping.phone ||
                    !shipping.email ||
                    !shipping.address ||
                    !shipping.city ||
                    !shipping.zip
                  }
                  className="w-full mt-2 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                >
                  Continue to Payment <ArrowRight size={17} />
                </button>
              </div>
            )}

            {/* ── STEP 2: Payment ── */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="mb-6">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    Payment Details
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Your payment info is safe and secure.
                  </p>
                </div>

                {/* Card Preview */}
                <div className="w-full h-44 rounded-3xl bg-gradient-to-br from-violet-700 via-violet-600 to-purple-500 p-6 text-white relative overflow-hidden mb-6 shadow-xl shadow-violet-500/25">
                  <div className="absolute top-0 right-0 w-52 h-52 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
                  <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-full translate-y-10 -translate-x-10" />
                  <p className="text-[10px] font-bold opacity-60 tracking-widest uppercase mb-5">
                    Credit Card
                  </p>
                  <p className="text-lg font-black tracking-[0.2em] mb-5 font-mono">
                    {payment.cardNumber || "•••• •••• •••• ••••"}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[9px] opacity-60 uppercase tracking-widest mb-0.5">
                        Card Holder
                      </p>
                      <p className="text-sm font-bold">
                        {payment.cardName || "YOUR NAME"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] opacity-60 uppercase tracking-widest mb-0.5">
                        Expires
                      </p>
                      <p className="text-sm font-bold">
                        {payment.expiry || "MM/YY"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Card Number</label>
                  <input
                    className={inputClass}
                    placeholder="1234 5678 9012 3456"
                    value={payment.cardNumber}
                    onChange={(e) =>
                      setPayment({
                        ...payment,
                        cardNumber: formatCard(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className={labelClass}>Cardholder Name</label>
                  <input
                    className={inputClass}
                    placeholder="cardholder name"
                    value={payment.cardName}
                    onChange={(e) =>
                      setPayment({ ...payment, cardName: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Expiry Date</label>
                    <input
                      className={inputClass}
                      placeholder="MM/YY"
                      value={payment.expiry}
                      onChange={(e) =>
                        setPayment({
                          ...payment,
                          expiry: formatExpiry(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>CVV</label>
                    <input
                      className={inputClass}
                      placeholder="•••"
                      maxLength={3}
                      value={payment.cvv}
                      onChange={(e) =>
                        setPayment({
                          ...payment,
                          cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                        })
                      }
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(3)}
                  disabled={
                    !payment.cardNumber ||
                    !payment.cardName ||
                    !payment.expiry ||
                    !payment.cvv
                  }
                  className="w-full mt-2 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                >
                  Review Order <ArrowRight size={17} />
                </button>
              </div>
            )}

            {/* ── STEP 3: Review ── */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="mb-6">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    Review Your Order
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Please confirm everything looks correct.
                  </p>
                </div>

                {/* Shipping Summary */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50">
                  <p className="text-[10px] font-black text-violet-500 dark:text-violet-400 uppercase tracking-widest mb-3">
                    Shipping To
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    {shipping.fullName}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {shipping.phone} · {shipping.email}
                  </p>
                  <p className="text-xs text-slate-400">
                    {shipping.address}, {shipping.city} {shipping.zip}
                  </p>
                </div>

                {/* Payment Summary */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50">
                  <p className="text-[10px] font-black text-violet-500 dark:text-violet-400 uppercase tracking-widest mb-3">
                    Payment
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white font-mono">
                    •••• •••• •••• {payment.cardNumber.slice(-4)}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {payment.cardName} · Exp {payment.expiry}
                  </p>
                </div>

                {/* Items */}
                <div>
                  <p className="text-[10px] font-black text-violet-500 dark:text-violet-400 uppercase tracking-widest mb-3">
                    Items ({items.length})
                  </p>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800/50"
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-700/50 flex-shrink-0">
                          <img
                            src={
                              item.thumbnail || item.images?.[0] || placeholder
                            }
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = placeholder;
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-400">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-black text-slate-900 dark:text-white flex-shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50 space-y-2">
                  <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>Shipping</span>
                    <span>${shipping_fee.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-slate-200 dark:bg-slate-600" />
                  <div className="flex justify-between items-center">
                    <span className="font-black text-slate-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-purple-400">
                      ${total}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                >
                  <CheckCircle size={18} />
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
