import { Clock, DollarSign, FolderKanban, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { glass } from "../../../public/styles/PublicStyles";

export default function QuickActions() {
  const actions = [
    { label: "New Project",  icon: FolderKanban, to: "/dashboard/projects?new=1",  color: "from-indigo-500 to-indigo-700" },
    { label: "New Invoice",  icon: DollarSign,   to: "/dashboard/invoices?new=1",  color: "from-emerald-500 to-emerald-700" },
    { label: "Add Client",   icon: Users,        to: "/dashboard/clients?new=1",   color: "from-violet-500 to-violet-700" },
    { label: "Log Time",     icon: Clock,        to: "/dashboard/time?log=1",      color: "from-amber-500 to-amber-700" },
  ];

  return (
    <div className={`${glass} rounded-2xl p-5`}>
      <h3 className="text-black dark:text-white font-bold text-sm mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2.5">
        {actions.map(({ label, icon: Icon, to, color }) => (
          <Link
            key={label}
            to={to}
            className="group flex flex-col items-center gap-2 py-4 rounded-xl bg-black/15 dark:bg-white/3 border border-white/7 hover:bg-black/10 dark:hover:bg-white/7 hover:border-white/15 transition-all duration-200"
          >
            <div className={`w-9 h-9 rounded-xl bg-linear-to-br ${color} flex items-center justify-center text-black dark:text-white shadow-lg`}>
              <Icon size={17} />
            </div>
            <span className="text-black/80 dark:text-white/60 group-hover:text-black dark:group-hover:text-white text-xs font-semibold text-center transition-colors">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}