import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      preset: null,
      setPreset: (preset) => set({ preset }),
      clearPreset: () => set({ preset: null }),
    }),
    {
      name: "ai-ugc-store",
    }
  )
);

export default useStore;
