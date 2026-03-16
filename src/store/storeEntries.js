import { create } from "zustand";

const useAppStore = create((set, get)=>({

    entries:  [],
    loading:  false,
    manualOpen:    false,

    setEntries: (entries) => set({ entries }),
    setLoading: (loading) => set({ loading }),
    setManualOpen: (manualOpen) => set({ manualOpen }),
    
    getEntryById: (id) =>
    get().entries.find((e) => e.id === id),

}))

export default useAppStore;