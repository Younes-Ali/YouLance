import { create } from "zustand";

const useAppStore = create((set, get)=>({

    projects:  [],
    loading:  false,
    search:   "",
    modal:    { open: false, project: null },
    filter:   "all",

    setProjects: (projects) => set({ projects }),
    setLoading: (loading) => set({ loading }),
    setModal: (modal) => set({ modal }),
    setSearch: (search) => set({ search }),
    setFilter: (filter) => set({ filter }),
    
    getProjectById: (id) =>
    get().projects.find((proj) => proj.id === id),

}))

export default useAppStore;