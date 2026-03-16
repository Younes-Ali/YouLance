import { glass } from '../../../public/styles/PublicStyles'
import useAppStore from '../../store/storeEntries';

export default function Summary() {

    const entries = useAppStore(state => state.entries);

    const totalHours = entries.reduce((s, e) => s + ((e.attributes || e).duration || 0), 0);
    const todayHours = entries
        .filter(e => (e.attributes || e).date === new Date().toISOString().split("T")[0])
        .reduce((s, e) => s + ((e.attributes || e).duration || 0), 0);
    return (
        <div className={`${glass} rounded-2xl p-5`}>
            <h3 className="text-white font-bold text-sm mb-4">This Week</h3>
            {[
                { label: "Today", val: `${todayHours.toFixed(2)}h`, color: "text-amber-400" },
                { label: "Total Logged", val: `${totalHours.toFixed(2)}h`, color: "text-indigo-400" },
                { label: "Entries", val: entries.length, color: "text-white" },
            ].map(({ label, val, color }) => (
                <div key={label} className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0">
                    <span className="text-white/40 text-xs">{label}</span>
                    <span className={`font-bold text-sm ${color}`}>{val}</span>
                </div>
            ))}
        </div>
    )
}
