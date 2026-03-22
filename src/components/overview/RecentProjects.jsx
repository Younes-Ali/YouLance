import { ArrowRight, FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";
import { glass } from "../../../public/styles/PublicStyles";

export default function RecentProjects({ projects, loading }) {


  const statusColor = {
    active:    "text-emerald-400 bg-emerald-400/10",
    completed: "text-indigo-400 bg-indigo-400/10",
    paused:    "text-amber-400 bg-amber-400/10",
    pending:   "text-white/40 bg-white/5",
  };

  return (
    <div className={`${glass} rounded-2xl overflow-hidden`}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
        <h3 className="text-black dark:text-white font-bold text-sm">Recent Projects</h3>
        <Link to="/dashboard/projects" className="text-indigo-400 text-xs hover:text-indigo-300 flex items-center gap-1 transition-colors">
          View all <ArrowRight size={12} />
        </Link>
      </div>

      {loading ? (
        <div className="p-5 space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="p-8 text-center">
          <FolderKanban size={32} className="text-white/15 mx-auto mb-2" />
          <p className="text-black/60 dark:text-white/30 text-sm">No projects yet</p>
        </div>
      ) : (
        <div className="divide-y divide-white/4">
          {projects.slice(0, 5).map((p) => {
            const attrs = p.attributes || p;
            const progress = attrs.progress ?? Math.floor(Math.random() * 100);
            const status = attrs.state || "active";
            return (
              <div key={p.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/3 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs shrink-0">
                  {(attrs.name || "P")[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-black dark:text-white/85 text-sm font-medium truncate">{attrs.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1 bg-black/20 dark:bg-white/8 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-indigo-500 to-violet-600 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-black/75 dark:text-white/30 text-xs">{progress}%</span>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${statusColor[status] || statusColor.pending}`}>
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}