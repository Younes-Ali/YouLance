import { Plus } from 'lucide-react'
import useAppStore from '../../store/storeProjects';

export default function Header() {
    const projects = useAppStore((state) => state.projects);
    const setModal  = useAppStore((state) => state.setModal);
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-black dark:text-white font-black text-2xl tracking-tight">Projects</h2>
          <p className="text-black/60 dark:text-white/35 text-sm">{projects.length} total projects</p>
        </div>
        <button onClick={() => setModal({ open: true, project: null })}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm transition-all shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
          <Plus size={16} /> New Project
        </button>
      </div>
  )
}
