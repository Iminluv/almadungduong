import { SkinConcern } from "@/lib/data";

interface FilterSidebarProps {
  categories: string[];
  concerns: SkinConcern[];
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
  activeConcerns: string[];
  toggleConcern: (id: string) => void;
}

export function FilterSidebar({
  categories,
  concerns,
  activeCategory,
  setActiveCategory,
  activeConcerns,
  toggleConcern,
}: FilterSidebarProps) {
  return (
    <div className="space-y-10">
      {/* Category Filter */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text">Danh mục</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-sm text-left transition-colors font-medium border-l-2 pl-4 ${!activeCategory ? 'border-accent text-accent' : 'border-surface text-muted hover:text-text'}`}
          >
            Tất cả
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm text-left transition-colors font-medium border-l-2 pl-4 ${activeCategory === cat ? 'border-accent text-accent' : 'border-surface text-muted hover:text-text'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skin Concern Filter */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text">Vấn đề da</h3>
        <div className="flex flex-col gap-3">
          {concerns.map((concern) => (
            <label key={concern.id} className="flex items-center gap-3 group cursor-pointer">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={activeConcerns.includes(concern.id)}
                  onChange={() => toggleConcern(concern.id)}
                  className="peer appearance-none w-5 h-5 border border-muted/30 rounded-sm checked:bg-accent checked:border-accent transition-all cursor-pointer"
                />
                <span className="absolute text-white text-[10px] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
                  ✓
                </span>
              </div>
              <span className={`text-sm font-medium transition-colors ${activeConcerns.includes(concern.id) ? 'text-text' : 'text-muted group-hover:text-text'}`}>
                {concern.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      {(activeCategory || activeConcerns.length > 0) && (
        <button
          onClick={() => {setActiveCategory(null); toggleConcern("") /* logic handled in parent clears all if none */}}
          className="text-xs uppercase tracking-widest font-bold text-muted hover:text-accent transition-colors pt-4 border-t border-surface w-full text-left"
        >
          Xoá tất cả bộ lọc
        </button>
      )}
    </div>
  );
}
