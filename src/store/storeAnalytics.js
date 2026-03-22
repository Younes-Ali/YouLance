import { create } from "zustand";

const useAppStore = create((set, get)=>({

    invoices: [],
    projects: [],
    clients:  [],
    entries:  [],
    tasks:    [],
    loading:  false,
    isDark: true,

    setInvoices: (invoices) => set({ invoices }),
    setProjects: (projects) => set({ projects }),
    setClients:  (clients)  => set({ clients }),
    setEntries:  (entries)  => set({ entries }),
    setTasks:    (tasks)    => set({ tasks}),
    setLoading:  (loading)  => set({ loading }),
    setIsDark:   (isDark)   => set({ isDark }),

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