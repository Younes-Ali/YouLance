import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  DollarSign, FolderKanban, Users, Clock,
  TrendingUp, ArrowUpRight, ArrowRight, Plus,
  CheckCircle, AlertCircle, Loader2,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";

const glass = "bg-white/5 backdrop-blur-xl border border-white/10";
const API   = "http://localhost:1337/api";

const authHeader = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

/* ── STAT CARD ── */
function StatCard({ label, value, icon: Icon, color, glow, trend, prefix = "", suffix = "", loading }) {
  return (
    <div className={`group relative ${glass} rounded-2xl p-5 overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]`}>
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 20% 30%, ${glow}, transparent 70%)` }}
      />
      <div className="relative flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}>
          <Icon size={18} />
        </div>
        {trend !== undefined && (
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold bg-emerald-400/10 px-2 py-1 rounded-full">
            <TrendingUp size={11} /> +{trend}%
          </div>
        )}
      </div>
      <div className="relative">
        {loading ? (
          <div className="w-24 h-7 bg-white/5 rounded-lg animate-pulse mb-1" />
        ) : (
          <p className="text-white font-black text-2xl mb-0.5">{prefix}{value?.toLocaleString()}{suffix}</p>
        )}
        <p className="text-white/40 text-xs uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
}

/* ── RECENT PROJECTS ── */
function RecentProjects({ projects, loading }) {
  const statusColor = {
    active:    "text-emerald-400 bg-emerald-400/10",
    completed: "text-indigo-400 bg-indigo-400/10",
    paused:    "text-amber-400 bg-amber-400/10",
    pending:   "text-white/40 bg-white/5",
  };

  return (
    <div className={`${glass} rounded-2xl overflow-hidden`}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <h3 className="text-white font-bold text-sm">Recent Projects</h3>
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
          <p className="text-white/30 text-sm">No projects yet</p>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.04]">
          {projects.slice(0, 5).map((p) => {
            const attrs = p.attributes || p;
            const progress = attrs.progress ?? Math.floor(Math.random() * 100);
            const status = attrs.status || "active";
            return (
              <div key={p.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs flex-shrink-0">
                  {(attrs.name || "P")[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/85 text-sm font-medium truncate">{attrs.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1 bg-white/8 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-white/30 text-xs">{progress}%</span>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${statusColor[status] || statusColor.pending}`}>
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

/* ── RECENT INVOICES ── */
function RecentInvoices({ invoices, loading }) {
  const statusStyle = {
    paid:    "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    pending: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    overdue: "text-red-400 bg-red-400/10 border-red-400/20",
  };

  return (
    <div className={`${glass} rounded-2xl overflow-hidden`}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <h3 className="text-white font-bold text-sm">Recent Invoices</h3>
        <Link to="/dashboard/invoices" className="text-indigo-400 text-xs hover:text-indigo-300 flex items-center gap-1 transition-colors">
          View all <ArrowRight size={12} />
        </Link>
      </div>

      {loading ? (
        <div className="p-5 space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />)}
        </div>
      ) : invoices.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-white/30 text-sm">No invoices yet</p>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.04]">
          {invoices.slice(0, 5).map((inv) => {
            const attrs = inv.attributes || inv;
            const status = attrs.status || "pending";
            return (
              <div key={inv.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-white/85 text-sm font-medium">{attrs.number || `INV-${inv.id}`}</p>
                  <p className="text-white/35 text-xs truncate">{attrs.clientName || attrs.client?.data?.attributes?.name || "—"}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-white font-bold text-sm">${(attrs.amount || 0).toLocaleString()}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusStyle[status] || statusStyle.pending}`}>
                    {status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── QUICK ACTIONS ── */
function QuickActions() {
  const actions = [
    { label: "New Project",  icon: FolderKanban, to: "/dashboard/projects?new=1",  color: "from-indigo-500 to-indigo-700" },
    { label: "New Invoice",  icon: DollarSign,   to: "/dashboard/invoices?new=1",  color: "from-emerald-500 to-emerald-700" },
    { label: "Add Client",   icon: Users,        to: "/dashboard/clients?new=1",   color: "from-violet-500 to-violet-700" },
    { label: "Log Time",     icon: Clock,        to: "/dashboard/time?log=1",      color: "from-amber-500 to-amber-700" },
  ];

  return (
    <div className={`${glass} rounded-2xl p-5`}>
      <h3 className="text-white font-bold text-sm mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2.5">
        {actions.map(({ label, icon: Icon, to, color }) => (
          <Link
            key={label}
            to={to}
            className="group flex flex-col items-center gap-2 py-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/15 transition-all duration-200"
          >
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}>
              <Icon size={17} />
            </div>
            <span className="text-white/60 group-hover:text-white text-xs font-semibold text-center transition-colors">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── OVERVIEW PAGE ── */
export default function OverviewPage() {
  const [data, setData]     = useState({ projects: [], invoices: [], clients: [], timeEntries: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [proj, inv, cli, time] = await Promise.all([
          axios.get(`${API}/projects?pagination[limit]=5&sort=createdAt:desc&populate=*`, authHeader()),
          axios.get(`${API}/invoices?pagination[limit]=5&sort=createdAt:desc&populate=*`, authHeader()),
          axios.get(`${API}/clients?pagination[limit]=100`, authHeader()),
          axios.get(`${API}/time-entries?pagination[limit]=100`, authHeader()),
        ]);
        setData({
          projects:    proj.data.data    || [],
          invoices:    inv.data.data     || [],
          clients:     cli.data.data     || [],
          timeEntries: time.data.data    || [],
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  /* Derived stats */
  const totalRevenue = data.invoices
    .filter(i => (i.attributes || i).status === "paid")
    .reduce((sum, i) => sum + ((i.attributes || i).amount || 0), 0);

  const totalHours = data.timeEntries
    .reduce((sum, t) => sum + ((t.attributes || t).duration || 0), 0);

  const stats = [
    { label: "Total Revenue",   value: totalRevenue,         icon: DollarSign,   color: "from-emerald-500 to-emerald-700", glow: "rgba(16,185,129,0.3)", trend: 12, prefix: "$" },
    { label: "Active Projects", value: data.projects.filter(p => (p.attributes||p).status === "active").length, icon: FolderKanban, color: "from-indigo-500 to-indigo-700", glow: "rgba(99,102,241,0.3)", trend: 5  },
    { label: "Total Clients",   value: data.clients.length,  icon: Users,        color: "from-violet-500 to-violet-700",   glow: "rgba(139,92,246,0.3)", trend: 8  },
    { label: "Hours Logged",    value: totalHours,           icon: Clock,        color: "from-amber-500 to-amber-700",     glow: "rgba(245,158,11,0.3)", suffix: "h" },
  ];

  return (
    <DashboardLayout title="Overview">
      {/* Greeting */}
      <div className="mb-6">
        <h2 className="text-white/90 text-2xl font-black tracking-tight">
          Good morning, Alex 👋
        </h2>
        <p className="text-white/35 text-sm mt-1">Here's what's happening with your freelance business today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => <StatCard key={s.label} {...s} loading={loading} />)}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2">
          <RecentProjects projects={data.projects} loading={loading} />
        </div>
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RecentInvoices invoices={data.invoices} loading={loading} />

        {/* Pending invoices alert */}
        <div className={`${glass} rounded-2xl p-5`}>
          <h3 className="text-white font-bold text-sm mb-4">Pending Actions</h3>
          <div className="space-y-2.5">
            {data.invoices.filter(i => (i.attributes||i).status === "overdue").length > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/8 border border-red-500/20">
                <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                <p className="text-white/70 text-xs">
                  <span className="text-red-400 font-bold">{data.invoices.filter(i => (i.attributes||i).status === "overdue").length} overdue</span> invoices need your attention
                </p>
              </div>
            )}
            {data.projects.filter(p => (p.attributes||p).status === "pending").length > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/8 border border-amber-500/20">
                <AlertCircle size={16} className="text-amber-400 flex-shrink-0" />
                <p className="text-white/70 text-xs">
                  <span className="text-amber-400 font-bold">{data.projects.filter(p => (p.attributes||p).status === "pending").length} projects</span> awaiting approval
                </p>
              </div>
            )}
            {loading ? (
              <div className="h-10 bg-white/5 rounded-xl animate-pulse" />
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
                <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
                <p className="text-white/70 text-xs">
                  <span className="text-emerald-400 font-bold">{data.projects.filter(p => (p.attributes||p).status === "active").length} active projects</span> are on track
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}