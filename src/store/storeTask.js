import { create } from "zustand";

const useAppStore = create((set) => ({
    projects:    [],
    clients:     [],
    tasks:       [],
    loading:     false,
    isDark:      true,
    currentDate: new Date(),
    selected:    null,
    modal:       { open: false, date: null, task: null },
    showSidebar: false,

    setSelected:    (selected)    => set({ selected }),
    setProjects:    (projects)    => set({ projects }),
    setClients:     (clients)     => set({ clients }),
    setTasks:       (tasks)       => set({ tasks }),
    setLoading:     (loading)     => set({ loading }),
    setIsDark:      (isDark)      => set({ isDark }),
    setCurrentDate: (date)        => set({ currentDate: date || new Date() }),
    setModal:       (modal)       => set({ modal }),
    setShowSidebar: (showSidebar) => set({ showSidebar }),
}));

export default useAppStore;