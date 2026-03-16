import { create } from "zustand";

const useAppStore = create((set, get)=>({

    invoices: [],
    projects: [],
    clients:  [],
    entries:  [],
    loading:  false,

    setInvoices: (invoices) => set({ invoices }),
    setProjects: (projects) => set({ projects }),
    setClients:  (clients)  => set({ clients }),
    setEntries:  (entries)  => set({ entries }),
    setLoading:  (loading)  => set({ loading }),

    setData: ({ invoices, projects, clients, entries }) =>
    set({ invoices, projects, clients, entries }),


    getInvoiceById: (id) =>
    get().invoices.find((inv) => inv.id === id),

    getProjectById: (id) =>
    get().projects.find((proj) => proj.id === id),

    getClientById: (id) =>
    get().clients.find((cli) => cli.id === id),




}))

export default useAppStore;