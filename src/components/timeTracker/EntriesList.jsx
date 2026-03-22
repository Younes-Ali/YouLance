import { Clock, Timer, Trash2 } from "lucide-react";
import { glass } from "../../../public/styles/PublicStyles";

export default function EntriesList({ entries, loading, onDelete }) {
  const grouped = entries.reduce((acc, e) => {
    const attrs = e.attributes || e;
    const date  = attrs.date || new Date().toISOString().split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(e);
    return acc;
  }, {});

  if (loading) return (
    <div className="space-y-3">
      {[1,2,3].map(i => <div key={i} className="h-16 bg-black/15 dark:bg-white/5 rounded-2xl animate-pulse" />)}
    </div>
  );

  if (entries.length === 0) return (
    <div className={`${glass} rounded-2xl p-12 text-center`}>
      <Timer size={36} className="text-black/30 dark:text-white/15 mx-auto mb-3" />
      <p className="text-black/60 dark:text-white/30 text-sm">No time entries yet. Start tracking!</p>
    </div>
  );

  return (
    <div className="space-y-5">
      {Object.entries(grouped).sort(([a],[b]) => b.localeCompare(a)).map(([date, dayEntries]) => {
        const dayTotal = dayEntries.reduce((s, e) => s + ((e.attributes||e).duration || 0), 0);
        return (
          <div key={date}>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-black/80 dark:text-white/45 text-xs font-semibold uppercase tracking-wider">
                {new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
              </span>
              <span className="text-amber-700 dark:text-amber-400 text-xs font-bold">{dayTotal.toFixed(2)}h total</span>
            </div>
            <div className={`${glass} rounded-2xl divide-y divide-white/4 overflow-hidden`}>
              {dayEntries.map(entry => {
                const attrs = entry.attributes || entry;
                return (
                  <div key={entry.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/3 transition-colors group">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
                      <Clock size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-black dark:text-white/85 text-sm font-medium truncate">{attrs.description}</p>
                      {attrs.project && <p className="text-black/70 dark:text-white/35 text-xs">{attrs.project}</p>}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-black dark:text-white font-bold text-sm">{(attrs.duration || 0).toFixed(2)}h</span>
                      <button onClick={() => onDelete(entry.documentId)}
                        className="w-7 h-7 rounded-lg bg-black/15 dark:bg-white/5 hover:bg-red-500/20 text-black/60 dark:text-white/30 hover:text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}