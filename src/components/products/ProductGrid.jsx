import ProductCard from './ProductCard';

export default function ProductGrid({ products, selectedCat }) {
  // DummyJSON မှာ category က plain string ဖြစ်တယ်
  const filteredProducts = selectedCat === 'All'
    ? products
    : products.filter(p => p.category === selectedCat);

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 dark:bg-zinc-900/30 rounded-[3rem] border border-dashed border-slate-200 dark:border-zinc-800">
        <p className="text-slate-400 font-medium">No items found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}