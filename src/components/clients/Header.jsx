import { Plus } from 'lucide-react'
import useAppStore from '../../store/storeClients';

export default function Header() {
    const clients    = useAppStore((state) => state.clients);
    const setModal = useAppStore((state) => state.setModal);
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-black dark:text-white font-black text-2xl tracking-tight">Clients</h2>
          <p className="text-black/70 dark:text-white/35 text-sm">{clients.length} total clients</p>
        </div>
        <button onClick={() => setModal({ open: true, client: null })}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-[0_4px_15px_rgba(139,92,246,0.3)]">
          <Plus size={16} /> Add Client
        </button>
      </div>
  )
}
