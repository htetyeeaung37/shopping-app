'use client'
import { useState, useEffect, Suspense } from 'react'; 
import { useSearchParams } from 'next/navigation';
import { Loader2, Sparkles, Package, Tag, Star, SearchX } from 'lucide-react';
import CategoryFilter from '@/components/products/CategoryFilter';
import ProductGrid from '@/components/products/ProductGrid';

function ProductsContent() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [loading, setLoading] = useState(true);

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
      {/* ── Hero Section ── */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-400/10 dark:bg-violet-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 text-violet-700 dark:text-violet-400 text-xs font-bold uppercase mb-5">
            <Sparkles size={12} /> New Season Collection 2026
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">
                {searchQuery ? `Results for "${searchQuery}"` : "Discover Our "}
                {!searchQuery && <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-purple-400">Collection</span>}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                {searchQuery ? `${filteredProducts.length} items found.` : "Everything in one place."}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-1"><Package size={12} className="text-violet-500"/><p className="text-lg font-black text-slate-900 dark:text-white">{filteredProducts.length}</p></div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Items</p>
              </div>
            </div>
          </div>

          <CategoryFilter categories={categories} selectedCat={selectedCat} onSelect={setSelectedCat} />
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} selectedCat="All" /> 
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SearchX size={40} className="text-slate-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No products found</h3>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <Loader2 className="animate-spin text-violet-600" size={40} />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}