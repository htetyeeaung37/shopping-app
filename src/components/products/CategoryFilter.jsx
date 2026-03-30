export default function CategoryFilter({ categories, selectedCat, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 py-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
            selectedCat === cat
              ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30 scale-105"
              : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
          }`}
        >
          {cat === "All"
            ? "All"
            : cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </button>
      ))}
    </div>
  );
}