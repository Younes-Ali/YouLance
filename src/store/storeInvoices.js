import { create } from "zustand";

const useAppStore = create((set, get)=>({

    invoices:  [],
    loading:  false,
    filter:   "all",
    search:   "",
    modal:    { open: false, invoice: null },

    setInvoices: (invoices) => set({ invoices }),
    setLoading: (loading) => set({ loading }),
    setFilter: (filter) => set({ filter }),
    setSearch: (search) => set({ search }),
    setModal: (modal) => set({ modal }),
    
    getInvoiceById: (id) =>
    get().invoices.find((inv) => inv.id === id),

}))

export default useAppStore;