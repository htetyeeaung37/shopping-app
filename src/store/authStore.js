// store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      tempWishlist: [], // Login မဝင်ထားသူများအတွက် wishlist

      register: (userData) => {
        const users = get().users;
        const existing = users.find(u => u.username === userData.username);
        if (existing) return { success: false, message: "Username already exists." };
        
        // User အသစ်မှာ wishlist ပါမယ်
        const newUser = { ...userData, wishlist: [] };
        set({ users: [...users, newUser] });
        return { success: true };
      },

      login: (username, password) => {
        const found = get().users.find(
          u => u.username === username && u.password === password
        );
        if (!found) return { success: false, message: "Invalid username or password." };
        
        set({ user: found });
        return { success: true };
      },

      logout: () => set({ user: null }),

      toggleWishlist: (productId) => {
        const { user, users, tempWishlist } = get();

        if (user) {
          // --- Login User အတွက် Logic ---
          const isFavorite = user.wishlist?.includes(productId);
          const updatedWishlist = isFavorite
            ? user.wishlist.filter(id => id !== productId)
            : [...(user.wishlist || []), productId];

          const updatedUser = { ...user, wishlist: updatedWishlist };
          const updatedUsers = users.map(u => 
            u.username === user.username ? updatedUser : u
          );

          set({ user: updatedUser, users: updatedUsers });
        } else {
          // --- Guest User အတွက် Logic ---
          const isFavorite = tempWishlist.includes(productId);
          const updatedTemp = isFavorite
            ? tempWishlist.filter(id => id !== productId)
            : [...tempWishlist, productId];

          set({ tempWishlist: updatedTemp });
        }
      },
    }),
    { name: 'auth-storage' }
  )
);