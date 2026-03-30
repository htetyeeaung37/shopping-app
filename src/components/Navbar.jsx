// "use client";
// import { useState, useEffect } from "react";
// import { useTheme } from "next-themes";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import {
//   ShoppingCart,
//   Search,
//   Sun,
//   Moon,
//   X,
//   Menu,
//   ShoppingBag,
// } from "lucide-react";
// import { useCartStore } from "@/store/cartStore";

// export default function Navbar() {
//   const [mounted, setMounted] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const { theme, setTheme } = useTheme();
//   const pathname = usePathname();
//   const totalItems = useCartStore((state) => state.getTotalItems());

//   useEffect(() => {
//     setMounted(true);
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = mobileOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [mobileOpen]);

//   useEffect(() => {
//     setMobileOpen(false);
//   }, [pathname]);

//   if (!mounted) return null;

//   const navLinks = [
//     { label: "Home", href: "/" },
//     { label: "Products", href: "/products" },
//     { label: "Contact Us", href: "/contact" },
//   ];

//   const iconBtn = `
//     w-9 h-9 rounded-lg flex items-center justify-center
//     text-slate-400 dark:text-slate-500
//     hover:text-violet-600 dark:hover:text-violet-400
//     hover:bg-violet-50 dark:hover:bg-violet-500/10
//     transition-all duration-200
//   `;

//   return (
//     <>
//       <header
//         className={`
//         sticky top-0 z-50 w-full
//         bg-white dark:bg-slate-900
//         border-b border-slate-100 dark:border-slate-800
//         transition-shadow duration-300
//         ${scrolled ? "shadow-sm shadow-violet-100/80 dark:shadow-slate-950/50" : ""}
//       `}
//       >
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <Link
//             href="/"
//             className="flex items-center gap-2.5 group flex-shrink-0"
//           >
//             <div
//               className="
//               w-8 h-8 rounded-lg flex items-center justify-center
//               bg-gradient-to-br from-violet-600 to-purple-500
//               shadow-md shadow-violet-500/25
//               group-hover:scale-110 group-hover:-rotate-6
//               transition-all duration-300
//             "
//             >
//               <ShoppingBag size={15} strokeWidth={2.5} className="text-white" />
//             </div>
//             <span className="text-[15px] font-black tracking-tight text-slate-900 dark:text-white">
//               Shopify
//               <span className="text-violet-500 dark:text-violet-400">.</span>
//             </span>
//           </Link>

//           <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
//             {navLinks.map(({ label, href }) => {
//               const isActive = pathname === href;
//               return (
//                 <Link
//                   key={label}
//                   href={href}
//                   className={`
//                     relative text-sm font-medium py-1
//                     transition-colors duration-200
//                     ${
//                       isActive
//                         ? "text-violet-700 dark:text-violet-400 font-semibold"
//                         : "text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400"
//                     }
//                   `}
//                 >
//                   {label}
//                   {isActive && (
//                     <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-violet-600 dark:bg-violet-400" />
//                   )}
//                 </Link>
//               );
//             })}
//           </nav>

//           <div className="flex items-center gap-0.5">
//             <button onClick={() => setSearchOpen(true)} className={iconBtn}>
//               <Search size={17} strokeWidth={2} />
//             </button>

//             <button
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className={iconBtn}
//             >
//               {theme === "dark" ? (
//                 <Sun size={17} strokeWidth={2} />
//               ) : (
//                 <Moon size={17} strokeWidth={2} />
//               )}
//             </button>

//             <Link href="/cart" className={`${iconBtn} relative`}>
//               <ShoppingCart size={17} strokeWidth={2} />
//               {totalItems > 0 && (
//                 <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-violet-600 text-white text-[9px] font-black flex items-center justify-center">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>

//             <div className="hidden md:block w-px h-4 bg-slate-200 dark:bg-slate-700 mx-2" />

//             <button className="hidden md:block px-4 py-2 rounded-lg text-sm font-semibold bg-violet-600 hover:bg-violet-700 active:scale-95 text-white transition-all duration-200">
//               Sign In
//             </button>

//             <button
//               onClick={() => setMobileOpen(!mobileOpen)}
//               className={`md:hidden ml-1 ${iconBtn}`}
//             >
//               <span className="relative w-[18px] h-[14px] flex flex-col justify-between">
//                 <span
//                   className={`block h-[2px] w-full rounded-full bg-current origin-center transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`}
//                 />
//                 <span
//                   className={`block h-[2px] w-full rounded-full bg-current transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}
//                 />
//                 <span
//                   className={`block h-[2px] w-full rounded-full bg-current origin-center transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
//                 />
//               </span>
//             </button>
//           </div>
//         </div>

//         <div
//           className={`
//           md:hidden
//           border-t border-slate-100 dark:border-slate-800
//           bg-white dark:bg-slate-900
//           overflow-hidden
//           transition-all duration-300 ease-in-out
//           ${mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}
//         `}
//         >
//           <div className="px-6 py-3 space-y-1">
//             {navLinks.map(({ label, href }, i) => {
//               const isActive = pathname === href;
//               return (
//                 <Link
//                   key={label}
//                   href={href}
//                   style={{
//                     transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
//                   }}
//                   className={`
//                     flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
//                     transition-all duration-300
//                     ${mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
//                     ${
//                       isActive
//                         ? "text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 font-semibold"
//                         : "text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10"
//                     }
//                   `}
//                 >
//                   {isActive && (
//                     <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400 flex-shrink-0" />
//                   )}
//                   {label}
//                 </Link>
//               );
//             })}

//             <div
//               style={{
//                 transitionDelay: mobileOpen
//                   ? `${navLinks.length * 60}ms`
//                   : "0ms",
//               }}
//               className={`
//                 pt-1 pb-2
//                 transition-all duration-300
//                 ${mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
//               `}
//             >
//               <button className="w-full py-2.5 rounded-lg text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white transition-all duration-200">
//                 Sign In
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {searchOpen && (
//         <div
//           className="fixed inset-0 z-[100] bg-slate-900/50 dark:bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
//           onClick={() => setSearchOpen(false)}
//         >
//           <div
//             className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex items-center gap-3 px-5 border-b border-slate-100 dark:border-slate-800">
//               <Search size={16} className="text-violet-500 flex-shrink-0" />
//               <input
//                 autoFocus
//                 type="text"
//                 placeholder="Search products..."
//                 className="flex-1 py-4 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-sm"
//               />
//               <button
//                 onClick={() => setSearchOpen(false)}
//                 className="w-7 h-7 rounded-md flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
//               >
//                 <X size={13} />
//               </button>
//             </div>
//             <div className="px-5 py-3 flex items-center gap-2 flex-wrap">
//               <span className="text-xs text-slate-400 font-medium mr-1">
//                 Popular:
//               </span>
//               {["Laptop", "Perfume", "Watch", "Shoes"].map((tag) => (
//                 <span
//                   key={tag}
//                   className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 font-medium cursor-pointer hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShoppingCart, Search, Sun, Moon, X,
  ShoppingBag, ArrowRight, LogOut, ChevronDown, Menu,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const totalItems = useCartStore((state) => state.getTotalItems());

  // ── authStore ကနေ user ယူမယ် ──
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => setAllProducts(data.products))
      .catch(console.error);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const results = allProducts
        .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 6);
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery, allProducts]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropdownOpen && !e.target.closest(".user-dropdown-container")) {
        setUserDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [userDropdownOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleSearch = (e, tag) => {
    if (e) e.preventDefault();
    const query = tag || searchQuery;
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleSignOut = () => {
    logout();
    setUserDropdownOpen(false);
    router.push("/");
  };

  if (!mounted) return null;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Contact Us", href: "/contact" },
  ];

  const iconBtn = `
    w-9 h-9 rounded-lg flex items-center justify-center
    text-slate-400 dark:text-slate-500
    hover:text-violet-600 dark:hover:text-violet-400
    hover:bg-violet-50 dark:hover:bg-violet-500/10
    transition-all duration-200
  `;

  return (
    <>
      <header className={`
        sticky top-0 z-50 w-full
        bg-white dark:bg-slate-900
        border-b border-slate-100 dark:border-slate-800
        transition-shadow duration-300
        ${scrolled ? "shadow-sm shadow-violet-100/80 dark:shadow-slate-950/50" : ""}
      `}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="
              w-8 h-8 rounded-lg flex items-center justify-center
              bg-gradient-to-br from-violet-600 to-purple-500
              shadow-md shadow-violet-500/25
              group-hover:scale-110 group-hover:-rotate-6
              transition-all duration-300
            ">
              <ShoppingBag size={15} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-[15px] font-black tracking-tight text-slate-900 dark:text-white uppercase">
              VIBE<span className="text-violet-500 dark:text-violet-400">STORE</span>
            </span>
          </Link>

          {/* ── Center Nav — Desktop ── */}
          <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  className={`
                    relative text-sm font-medium py-1
                    transition-colors duration-200
                    ${isActive
                      ? "text-violet-700 dark:text-violet-400 font-semibold"
                      : "text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400"
                    }
                  `}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-violet-600 dark:bg-violet-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-0.5">

            {/* Search */}
            <button onClick={() => setSearchOpen(true)} className={iconBtn}>
              <Search size={17} strokeWidth={2} />
            </button>

            {/* Theme */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={iconBtn}
            >
              {theme === "dark" ? <Sun size={17} strokeWidth={2} /> : <Moon size={17} strokeWidth={2} />}
            </button>

            {/* Cart */}
            <Link href="/cart" className={`${iconBtn} relative`}>
              <ShoppingCart size={17} strokeWidth={2} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-violet-600 text-white text-[9px] font-black flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="hidden md:block w-px h-4 bg-slate-200 dark:bg-slate-700 mx-2" />

            {/* ── Auth — Desktop ── */}
            <div className="user-dropdown-container relative hidden md:block">
              {user ? (
                <>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-violet-50 dark:hover:bg-violet-500/10 border border-slate-100 dark:border-slate-700 transition-all duration-200"
                  >
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-[11px] text-white font-black shadow-sm">
                      {user.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {user.username}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-slate-400 transition-transform duration-300 ${userDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-black/10 border border-slate-100 dark:border-slate-800 p-2 z-50">
                      <div className="px-3 py-2.5 mb-1 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Logged in as
                        </p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                          {user.username}
                        </p>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-200"
                      >
                        <LogOut size={15} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/login">
                  <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet-600 hover:bg-violet-700 active:scale-95 text-white transition-all duration-200">
                    Sign In
                  </button>
                </Link>
              )}
            </div>

            {/* Hamburger — Mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden ml-1 ${iconBtn}`}
            >
              <span className="relative w-[18px] h-[14px] flex flex-col justify-between">
                <span className={`block h-[2px] w-full rounded-full bg-current origin-center transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
                <span className={`block h-[2px] w-full rounded-full bg-current transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                <span className={`block h-[2px] w-full rounded-full bg-current origin-center transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div className={`
          md:hidden border-t border-slate-100 dark:border-slate-800
          bg-white dark:bg-slate-900 overflow-hidden
          transition-all duration-300 ease-in-out
          ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}>
          <div className="px-6 py-4 space-y-1">

            {/* User info — mobile */}
            {user && (
              <div className="flex items-center gap-3 p-3 bg-violet-50 dark:bg-violet-500/10 rounded-2xl mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-white font-black text-sm shadow-md">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Logged in as</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">{user.username}</p>
                </div>
              </div>
            )}

            {navLinks.map(({ label, href }, i) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-300
                    ${mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                    ${isActive
                      ? "text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10"
                    }
                  `}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400 flex-shrink-0" />}
                  {label}
                </Link>
              );
            })}

            <div
              style={{ transitionDelay: mobileOpen ? `${navLinks.length * 60}ms` : "0ms" }}
              className={`pt-2 transition-all duration-300 ${mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            >
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 rounded-xl text-sm font-bold bg-red-50 dark:bg-red-500/10 text-red-500 flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              ) : (
                <Link href="/login">
                  <button className="w-full py-2.5 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white transition-all duration-200">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Search Modal ── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-slate-900/50 dark:bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="flex items-center gap-3 px-5 border-b border-slate-100 dark:border-slate-800">
              <Search size={16} className="text-violet-500 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 py-4 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-sm"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="w-7 h-7 rounded-md flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <X size={13} />
              </button>
            </form>

            <div className="max-h-[400px] overflow-y-auto p-3">
              {filteredResults.length > 0 ? (
                <div className="space-y-1">
                  <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Results
                  </p>
                  {filteredResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
                    >
                      <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                        <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{product.title}</p>
                        <p className="text-xs text-violet-600 dark:text-violet-400 font-bold">${product.price}</p>
                      </div>
                      <ArrowRight size={14} className="text-slate-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              ) : searchQuery.trim() !== "" ? (
                <div className="py-10 text-center">
                  <p className="text-sm text-slate-400 font-medium">No results for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="p-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Popular</p>
                  <div className="flex flex-wrap gap-2">
                    {["Laptop", "Perfume", "Watch", "Shoes"].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleSearch(undefined, tag)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 font-semibold hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}