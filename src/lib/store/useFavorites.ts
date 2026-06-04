import { create } from "zustand";

interface FavoritesState {
  favoriteIds: string[];
  isLoaded: boolean;
  isLoading: boolean;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (productId: string, isAuthenticated: boolean, showToast: (msg: string, type: "success" | "error") => void) => Promise<void>;
  clearFavorites: () => void;
}

export const useFavorites = create<FavoritesState>((set, get) => ({
  favoriteIds: [],
  isLoaded: false,
  isLoading: false,
  fetchFavorites: async () => {
    if (get().isLoading || get().isLoaded) return;
    set({ isLoading: true });
    try {
      const res = await fetch("/api/user/favorites");
      if (res.ok) {
        const data = await res.json();
        const ids = data.favorites.map((fav: any) => fav.productId);
        set({ favoriteIds: ids, isLoaded: true });
      }
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  toggleFavorite: async (productId, isAuthenticated, showToast) => {
    if (!isAuthenticated) {
      showToast("Vui lòng đăng nhập để lưu sản phẩm yêu thích.", "error");
      return;
    }

    const previousIds = get().favoriteIds;
    const isAlreadyFavorited = previousIds.includes(productId);

    // Optimistic Update
    const newIds = isAlreadyFavorited
      ? previousIds.filter((id) => id !== productId)
      : [...previousIds, productId];

    set({ favoriteIds: newIds });

    try {
      const method = isAlreadyFavorited ? "DELETE" : "POST";
      const res = await fetch("/api/user/favorites", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        // Rollback on error
        set({ favoriteIds: previousIds });
        const data = await res.json();
        showToast(data.error || "Thao tác thất bại.", "error");
      } else {
        const data = await res.json();
        showToast(data.message, "success");
      }
    } catch (error) {
      // Rollback on error
      set({ favoriteIds: previousIds });
      showToast("Lỗi kết nối hệ thống.", "error");
    }
  },
  clearFavorites: () => {
    set({ favoriteIds: [], isLoaded: false });
  },
}));
