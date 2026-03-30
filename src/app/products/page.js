// 'use client'
// import { useState, useEffect } from 'react';
// import { Loader2, Sparkles, Package, Tag, Star } from 'lucide-react';
// import CategoryFilter from '@/components/products/CategoryFilter';
// import ProductGrid from '@/components/products/ProductGrid';

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCat, setSelectedCat] = useState('All');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [prodRes, catRes] = await Promise.all([
//           fetch('https://dummyjson.com/products?limit=100'),
//           fetch('https://dummyjson.com/products/categories')
//         ]);
//         const prodData = await prodRes.json();
//         const catData = await catRes.json();

//         setProducts(prodData.products);
//         const catNames = catData.slice(0, 8).map(cat => cat.slug);
//         setCategories(['All', ...catNames]);
//         setLoading(false);
//       } catch (err) {
//         console.error("Fetch Error:", err);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
//       <Loader2 className="animate-spin text-violet-600" size={40} />
//     </div>
//   );

//   return (
//     <main className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">

//       {/* ── Products Hero ── */}
//       <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">

//         {/* Background blobs */}
//         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-400/10 dark:bg-violet-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
//         <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

//         <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 relative z-10">

//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 text-violet-700 dark:text-violet-400 text-xs font-bold tracking-wide uppercase mb-5">
//             <Sparkles size={12} />
//             New Season Collection 2026
//           </div>

//           {/* Title + Stats Row */}
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
//             <div>
//               <h1 className="text-4xl font-black tracking-tight mb-2">
//                 <span className="text-slate-900 dark:text-white">Discover Our </span>
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-purple-400">
//                   Collection
//                 </span>
//               </h1>
//               <p className="text-slate-500 dark:text-slate-400 font-medium">
//                 From beauty to laptops, groceries to furniture — everything in one place.
//               </p>
//             </div>

//             {/* Stats */}
//             <div className="flex items-center gap-6 flex-shrink-0">
//               {[
//                 { icon: Package, value: "100+", label: "Products" },
//                 { icon: Tag, value: "20+", label: "Categories" },
//                 { icon: Star, value: "4.9", label: "Avg Rating" },
//               ].map(({ icon: Icon, value, label }, i) => (
//                 <div key={label} className="flex items-center gap-6">
//                   {i > 0 && <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />}
//                   <div className="text-center">
//                     <div className="flex items-center justify-center gap-1 mb-0.5">
//                       <Icon size={12} className="text-violet-500" />
//                       <p className="text-lg font-black text-slate-900 dark:text-white">{value}</p>
//                     </div>
//                     <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Category Filter */}
//           <CategoryFilter
//             categories={categories}
//             selectedCat={selectedCat}
//             onSelect={setSelectedCat}
//           />
//         </div>
//       </div>

//       {/* ── Product Grid ── */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <ProductGrid products={products} selectedCat={selectedCat} />
//       </div>

//     </main>
//   );
// }

'use client'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Search query ဖတ်ဖို့ parameter ထည့်ပါမယ်
import { Loader2, Sparkles, Package, Tag, Star, SearchX } from 'lucide-react';
import CategoryFilter from '@/components/products/CategoryFilter';
import ProductGrid from '@/components/products/ProductGrid';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [loading, setLoading] = useState(true);

  // URL ကနေ search parameter ကို ယူမယ်
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch('https://dummyjson.com/products?limit=100'),
          fetch('https://dummyjson.com/products/categories')
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();

        setProducts(prodData.products);
        // Category list ထဲက slug တွေကို ယူမယ်
        const catNames = catData.slice(0, 10).map(cat => typeof cat === 'object' ? cat.slug : cat);
        setCategories(['All', ...catNames]);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── Search & Category Filtering Logic ──
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery) || 
                         product.category.toLowerCase().includes(searchQuery);
    const matchesCategory = selectedCat === 'All' || product.category === selectedCat;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <Loader2 className="animate-spin text-violet-600" size={40} />
    </div>
  );

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">

      {/* ── Products Hero ── */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-400/10 dark:bg-violet-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 relative z-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 text-violet-700 dark:text-violet-400 text-xs font-bold tracking-wide uppercase mb-5">
            <Sparkles size={12} />
            New Season Collection 2026
          </div>

          {/* Title + Stats Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2">
                <span className="text-slate-900 dark:text-white">
                  {searchQuery ? `Results for "${searchQuery}"` : "Discover Our "}
                </span>
                {!searchQuery && (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-purple-400">
                    Collection
                  </span>
                )}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                {searchQuery 
                  ? `${filteredProducts.length} items found for your search.` 
                  : "From beauty to laptops, groceries to furniture — everything in one place."}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {[
                { icon: Package, value: filteredProducts.length, label: "Items" },
                { icon: Tag, value: categories.length - 1, label: "Categories" },
                { icon: Star, value: "4.9", label: "Avg Rating" },
              ].map(({ icon: Icon, value, label }, i) => (
                <div key={label} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Icon size={12} className="text-violet-500" />
                      <p className="text-lg font-black text-slate-900 dark:text-white">{value}</p>
                    </div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            selectedCat={selectedCat}
            onSelect={setSelectedCat}
          />
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} selectedCat="All" /> 
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <SearchX size={40} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No products found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              We couldn't find any products matching "{searchQuery}". Try using different keywords or categories.
            </p>
          </div>
        )}
      </div>

    </main>
  );
}