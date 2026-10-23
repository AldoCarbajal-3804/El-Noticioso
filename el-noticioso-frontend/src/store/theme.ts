import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = 'light' | 'dark'

type StoreTheme = {
    changeTheme: () => void,
    theme: ThemeMode,
}

const getSystemTheme = (): ThemeMode => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
};

export const useTheme = create<StoreTheme>()(
    persist(
        (set) => ({

            theme: getSystemTheme(),
            
            changeTheme: () => set((state) => {
                const nextTheme = state.theme === 'light' ? 'dark' : 'light';
                return { theme: nextTheme };
            }),
        }),
        {
            name: 'theme-storage',
        }
    )
);





