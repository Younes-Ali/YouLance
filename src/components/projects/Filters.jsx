import { Search } from 'lucide-react'
import { glass } from '../../../public/styles/PublicStyles';
import useAppStore from '../../store/storeProjects';

export default function Filters() {
    const search = useAppStore((state) => state.search);
    const filter = useAppStore((state) => state.filter);
    const setSearch = useAppStore((state) => state.setSearch);
    const setFilter = useAppStore((state) => state.setFilter);
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className={`flex items-center gap-2 ${glass} rounded-xl px-4 py-2.5 flex-1`}>
          <Search size={14} className="text-black/60 dark:text-white/25" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search projects…"
            className="bg-transparent text-black dark:text-white text-sm outline-none placeholder-black/50 dark:placeholder-white/25 flex-1" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {["all", "active", "completed", "paused", "pending"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                filter === f ? "bg-indigo-500/20 border border-indigo-500/40 text-indigo-700 dark:text-indigo-300" : `${glass} text-black/70 dark:text-white/40 hover:text-black dark:hover:text-white`
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>
  )
}
