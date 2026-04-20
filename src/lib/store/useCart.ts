import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  variant?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  lastAddedItem: string | null;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void;
  clearNotification: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastAddedItem: null,

      addItem: (newItem, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find(
          (item) => item.id === newItem.id && item.variant === newItem.variant
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === newItem.id && item.variant === newItem.variant
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...newItem, quantity }] });
        }

        set({ lastAddedItem: newItem.title });
        // Removed: set({ isOpen: true });
      },

      clearNotification: () => set({ lastAddedItem: null }),


      removeItem: (id, variant) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === id && item.variant === variant)
          ),
        });
      },

      updateQuantity: (id, quantity, variant) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((item) =>
            item.id === id && item.variant === variant
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      toggleCart: (open) => set((state) => ({ isOpen: open !== undefined ? open : !state.isOpen })),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'alma-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // Only persist items, not isOpen
    }
  )
);
