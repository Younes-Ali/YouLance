import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase, LayoutDashboard, FolderKanban, Users,
  FileText, Clock, BarChart2, Settings, LogOut,
  Bell, ChevronRight, Menu, X, Sun, Moon,
  Bot,
  CalendarDays,
} from "lucide-react";
import useGetUser from "../hooks/useGetUser";
import useAppStore from "../store/storeAnalytics";
import toast from "react-hot-toast";
import NotificationBell from "../components/calendar/NotificationBell";

const NAV = [
  { label: "Overview",  icon: LayoutDashboard, to: "/dashboard",           color: "text-blue-400"              },
  { label: "Projects",  icon: FolderKanban,    to: "/dashboard/projects",  color: "text-violet-400"            },
  { label: "Clients",   icon: Users,           to: "/dashboard/clients",   color: "text-cyan-400"              },
  { label: "Invoices",  icon: FileText,        to: "/dashboard/invoices",  color: "text-emerald-400"           },
  { label: "Time",      icon: Clock,           to: "/dashboard/time",      color: "text-amber-400"             },
  { label: "Analytics", icon: BarChart2,       to: "/dashboard/analytics", color: "text-pink-400"              },
  { label: "Calendar",  icon: CalendarDays,    to: "/dashboard/calendar",  color: "text-red-400"               },
  { label: "Assistant", icon: Bot,             to: "/dashboard/assistant", color: "text-black dark:text-white" },

];


/* ── SIDEBAR ── */
function Sidebar({ open, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useGetUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/signin");
  };

  const initials = user
    ? user.username.split(" ").length > 1
      ? user.username.split(" ")[0][0].toUpperCase() + user.username.split(" ")[1][0].toUpperCase()
      : user.username[0].toUpperCase()
    : "U";

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed top-0 left-0 h-full z-40 w-64 flex flex-col
        backdrop-blur-2xl border-r transition-transform duration-300 ease-in-out
        bg-white border-slate-200 shadow-xl
        dark:bg-[#060614]/95 dark:border-white/6 dark:shadow-none
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>

        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-white/6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <Briefcase size={15} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-800 dark:text-white">
              You<span className="text-indigo-500">Lance</span>
            </span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-700 dark:text-white/40 dark:hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* User card */}
        <div className="px-4 py-4 border-b border-slate-200 dark:border-white/6">
          <div className="rounded-2xl p-3 flex items-center gap-3 bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/10">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-slate-800 dark:text-white">
                {user?.username || "User"}
              </p>
              <p className="text-xs truncate text-slate-400 dark:text-white/35">
                {user?.email || "user@example.com"}
              </p>
            </div>
            <ChevronRight size={14} className="text-slate-300 dark:text-white/20" />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-widest px-3 mb-3 text-slate-400 dark:text-white/25">
            Workspace
          </p>
          {NAV.map(({ label, icon: Icon, to, color }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to} onClick={onClose}
                className={`
                  group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-150 relative overflow-hidden
                  ${active
                    ? "bg-indigo-50 text-indigo-700 dark:bg-white/8 dark:text-white"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-white/45 dark:hover:text-white dark:hover:bg-white/5"
                  }
                `}>
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-500 rounded-r-full" />
                )}
                <Icon size={17} className={
                  active ? color
                  : "text-slate-400 group-hover:text-slate-600 dark:text-white/30 dark:group-hover:text-white/60"
                } />
                {label}
              </Link>
            );
          })}

          <div className="pt-4">
            <p className="text-xs font-semibold uppercase tracking-widest px-3 mb-3 text-slate-400 dark:text-white/25">
              System
            </p>
            <Link to="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-white/45 dark:hover:text-white dark:hover:bg-white/5">
              <Settings size={17} className="text-slate-400 dark:text-white/30" />
              Settings
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-slate-200 dark:border-white/6">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group text-slate-400 hover:text-red-500 hover:bg-red-50 dark:text-white/40 dark:hover:text-red-400 dark:hover:bg-red-500/8">
            <LogOut size={17} className="group-hover:text-red-400 transition-colors" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

/* ── TOPBAR ── */
function Topbar({ onMenuClick, title }) {
  const { user }  = useGetUser();
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
        <NotificationBell header isDark={isDark} />

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-[0_0_12px_rgba(99,102,241,0.4)]">
          {initials}
        </div>
      </div>
    </header>
  );
}

/* ── DASHBOARD LAYOUT ── */
export default function DashboardLayout({ children, title = "Dashboard" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const isDark   = useAppStore(state => state.isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.background =
        "radial-gradient(ellipse at 10% 10%, #0d0d2b 0%, #050510 50%, #000000 100%)";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.background = "#727279";
    }
  }, [isDark]);

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    toast.error("Sign in first");
    navigate("/signin");
  }

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-transparent transition-colors duration-300">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        <Topbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}