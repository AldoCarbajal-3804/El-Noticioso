import {create} from 'zustand'


type Store = {
    count: number
    inc: () => void
    del: () => void
}

export const usePrueba = create<Store>()((set) => ({
    count: 1,
    inc: () => set((state) => ({ count: state.count + 1 })),
    del: () => set((state) => ({count: state.count - 1}))
}))