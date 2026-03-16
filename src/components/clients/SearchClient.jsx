import React from 'react'
import { glass } from '../../../public/styles/PublicStyles'
import useAppStore from '../../store/storeClients';
import { Search } from 'lucide-react';

export default function SearchClient() {
    const search = useAppStore(state => state.search);
    const setSearch = useAppStore(state => state.setSearch);
  return (
    <div className={`flex items-center gap-2 ${glass} rounded-xl px-4 py-2.5 mb-5 max-w-sm`}>
        <Search size={14} className="text-white/25" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search clients…"
          className="bg-transparent text-white text-sm outline-none placeholder-white/25 flex-1" />
      </div>
  )
}
