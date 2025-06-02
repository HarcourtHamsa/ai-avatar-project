import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      avatar: null,
      setAvatar: (avatar) => set({ avatar }),
      resetAvatar: () => set({ avatar: null }),
    }),
    {
      name: "ai-ugc-store",
    }
  )
);

export default useStore;
