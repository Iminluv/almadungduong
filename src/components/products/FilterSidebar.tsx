import { SkinConcern } from "@/lib/data";

interface FilterSidebarProps {
  categories: string[];
  concerns: SkinConcern[];
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
  activeSubcategory: string | null;
  setActiveSubcategory: (subcat: string | null) => void;
  subcategories: string[];
  activeConcerns: string[];
  toggleConcern: (id: string) => void;
}

export function FilterSidebar({
  categories,
  concerns,
  activeCategory,
  setActiveCategory,
  activeSubcategory,
  setActiveSubcategory,
  subcategories,
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
            onClick={() => {
              setActiveCategory(null);
              setActiveSubcategory(null);
            }}
            className={`text-sm text-left transition-colors font-medium border-l-2 pl-4 ${!activeCategory ? 'border-accent text-accent' : 'border-surface text-muted hover:text-text'}`}
          >
            Tất cả
          </button>
          {categories.map((cat) => {
            const isParentActive = activeCategory === cat;
            return (
              <div key={cat} className="flex flex-col gap-1.5">
                <button
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveSubcategory(null);
                  }}
                  className={`text-sm text-left transition-colors font-medium border-l-2 pl-4 ${
                    isParentActive
                      ? 'border-accent text-accent font-semibold'
                      : 'border-surface text-muted hover:text-text'
                  }`}
                >
                  {cat}
                </button>
                {/* Subcategories (e.g. for Sản phẩm dưỡng sinh) */}
                {isParentActive && subcategories.length > 0 && (
                  <div className="pl-6 pr-2 flex flex-col gap-2 mt-1 mb-2 border-l border-surface/50 ml-4">
                    <button
                      onClick={() => setActiveSubcategory(null)}
                      className={`text-xs text-left transition-colors ${
                        activeSubcategory === null
                          ? 'text-accent font-semibold'
                          : 'text-muted hover:text-text'
                      }`}
                    >
                      Tất cả {cat.toLowerCase()}
                    </button>
                    {subcategories.map((subcat) => (
                      <button
                        key={subcat}
                        onClick={() => setActiveSubcategory(subcat)}
                        className={`text-xs text-left transition-colors ${
                          activeSubcategory === subcat
                            ? 'text-accent font-semibold'
                            : 'text-muted hover:text-text'
                        }`}
                      >
                        {subcat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
      {(activeCategory || activeSubcategory || activeConcerns.length > 0) && (
        <button
          onClick={() => {
            setActiveCategory(null);
            setActiveSubcategory(null);
            activeConcerns.forEach(c => toggleConcern(c));
          }}
          className="text-xs uppercase tracking-widest font-bold text-muted hover:text-accent transition-colors pt-4 border-t border-surface w-full text-left"
        >
          Xoá tất cả bộ lọc
        </button>
      )}
    </div>
  );
}
