import { create } from "zustand";

const useAppStore = create((set, get)=>({

    clients:  [],
    loading:  false,
    search:   "",
    modal:    { open: false, client: null },

    setClients: (clients) => set({ clients }),
    setLoading: (loading) => set({ loading }),
    setModal: (modal) => set({ modal }),
    setSearch: (search) => set({ search }),
    
    getClientById: (id) =>
    get().clients.find((cli) => cli.id === id),

}))

export default useAppStore;