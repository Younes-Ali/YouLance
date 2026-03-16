import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase, LayoutDashboard, FolderKanban, Users,
  FileText, Clock, BarChart2, Settings, LogOut,
  Bell, ChevronRight, Menu, X,
} from "lucide-react";
import  useGetUser  from "../hooks/useGetUser";

const glass = "bg-white/5 backdrop-blur-xl border border-white/10";


const NAV = [
  { label: "Overview",  icon: LayoutDashboard, to: "/dashboard",            color: "text-blue-400"  },
  { label: "Projects",  icon: FolderKanban,    to: "/dashboard/projects",   color: "text-violet-400"  },
  { label: "Clients",   icon: Users,           to: "/dashboard/clients",    color: "text-cyan-400"    },
  { label: "Invoices",  icon: FileText,        to: "/dashboard/invoices",   color: "text-emerald-400" },
  { label: "Time",      icon: Clock,           to: "/dashboard/time",       color: "text-amber-400"   },
  { label: "Analytics", icon: BarChart2,       to: "/dashboard/analytics",  color: "text-pink-400"    },
];

/* ── SIDEBAR ── */
function Sidebar({ open, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, error } = useGetUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/signin");
  };



  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-40 w-64 flex flex-col
          bg-[#060614]/95 backdrop-blur-2xl border-r border-white/6
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <Briefcase size={15} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              You<span className="text-indigo-400">Lance</span>
            </span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-white/40 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* User mini-card */}
        <div className="px-4 py-4 border-b border-white/6">
          <div className={`${glass} rounded-2xl p-3 flex items-center gap-3`}>
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {user ? user.username.split(" ")[0].charAt(0).toUpperCase() + user.username.split(" ")[1].charAt(0).toUpperCase() : "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">{user ? user.username : "User"}</p>
              <p className="text-white/35 text-xs truncate">{user ? user.email : "user@example.com"}</p>
            </div>
            <ChevronRight size={14} className="text-white/20 shrink-0" />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-white/25 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
            Workspace
          </p>
          {NAV.map(({ label, icon: Icon, to, color }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className={`
                  group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-150 relative overflow-hidden
                  ${active
                    ? "bg-white/8 text-white"
                    : "text-white/45 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-500 rounded-r-full" />
                )}
                <Icon size={17} className={active ? color : "text-white/30 group-hover:text-white/60"} />
                {label}
              </Link>
            );
          })}

          <div className="pt-4">
            <p className="text-white/25 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
              System
            </p>
            <Link
              to="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/45 hover:text-white hover:bg-white/5 transition-all"
            >
              <Settings size={17} className="text-white/30" />
              Settings
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-white/6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/8 transition-all duration-150 group"
          >
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
  const { user, loading, error } = useGetUser();
  return (
    <header className={`sticky top-0 z-20 ${glass} border-b border-white/6 px-6 py-4 flex items-center justify-between gap-4`}>
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-white/50 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-white font-bold text-lg tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        

        {/* Notifications */}
        <button className={`relative ${glass} rounded-xl p-2.5 text-white/50 hover:text-white transition-colors`}>
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.8)]" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-[0_0_12px_rgba(99,102,241,0.4)]">
          {user ? user.username.split(" ")[0].charAt(0).toUpperCase() + user.username.split(" ")[1].charAt(0).toUpperCase() : "U"}
        </div>
      </div>
    </header>
  );
}

/* ── DASHBOARD LAYOUT ── */
export default function DashboardLayout({ children, title = "Dashboard" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    navigate("/signin");
  } 

  return (
    <div className="min-h-screen flex">
      

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        <Topbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}