import { Menu, Moon, Sun } from "lucide-react";
import useUser from "../../hooks/useGetUser";
import useAppStore from "../../store/storeAnalytics";
import NotificationBell from "../calendar/NotificationBell";

export default function Topbar({ onMenuClick, title }) {
  const { user }  = useUser();
  const isDark    = useAppStore(state => state.isDark);
  const setIsDark = useAppStore(state => state.setIsDark);

  const initials = user
    ? user.username.split(" ").length > 1
      ? user.username.split(" ")[0][0].toUpperCase() + user.username.split(" ")[1][0].toUpperCase()
      : user.username[0].toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-20 border-b px-6 py-4 flex items-center justify-between gap-4 bg-white/80 backdrop-blur-xl border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/6 dark:shadow-none">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden transition-colors text-slate-400 hover:text-slate-700 dark:text-white/50 dark:hover:text-white">
          <Menu size={20} />
        </button>
        <h1 className="font-bold text-lg tracking-tight text-slate-800 dark:text-white">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">

        {/* Theme toggle */}
        <button onClick={() => setIsDark(!isDark)}
          className="rounded-xl p-2.5 transition-all border bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800 dark:bg-white/5 dark:border-white/10 dark:text-white/50 dark:hover:text-white">
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notifications */}
        <NotificationBell header />

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-[0_0_12px_rgba(99,102,241,0.4)]">
          {initials}
        </div>
      </div>
    </header>
  );
}