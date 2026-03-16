import { glass } from '../../../public/styles/PublicStyles'
import { Plus, Search } from 'lucide-react'
import useAppStore from '../../store/storeInvoices';

export default function Header() {
    const filter = useAppStore(state => state.filter);
    const search = useAppStore(state => state.search);
    const setFilter = useAppStore(state => state.setFilter);
    const setSearch = useAppStore(state => state.setSearch);
    const setModal = useAppStore(state => state.setModal);
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div className="w-full flex flex-col sm:flex-row gap-3 flex-1 flex-wrap">
          <div className={`flex items-center gap-2 ${glass} rounded-xl px-4 py-2.5 flex-1`}>
            <Search size={14} className="text-white/25" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search invoices…"
              className="bg-transparent text-white text-sm outline-none placeholder-white/25 flex-1" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {["all", "paid", "pending", "overdue", "draft"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  filter === f ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300" : `${glass} text-white/40 hover:text-white`
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => setModal({ open: true, invoice: null })}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm transition-all shrink-0">
          <Plus size={16} /> New Invoice
        </button>
      </div>
  )
}
