import { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { TrendingUp, DollarSign, Clock, Users, BarChart2 } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";

const glass = "bg-white/5 backdrop-blur-xl border border-white/10";
const API   = "http://localhost:1337/api";
const auth  = () => {
  const t = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${t}` } };
};

/* ── CUSTOM TOOLTIP ── */
const CustomTooltip = ({ active, payload, label, prefix = "", suffix = "" }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d0d2b]/95 backdrop-blur-xl border border-white/15 rounded-xl px-4 py-3 shadow-xl">
      {label && <p className="text-white/50 text-xs mb-2 font-semibold">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-bold" style={{ color: p.color }}>
          {p.name}: {prefix}{typeof p.value === "number" ? p.value.toLocaleString() : p.value}{suffix}
        </p>
      ))}
    </div>
  );
};

/* ── ANALYTICS PAGE ── */
export default function AnalyticsPage() {
  const [data, setData]     = useState({ invoices: [], projects: [], clients: [], entries: [] });
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("6m");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const [inv, proj, cli, time] = await Promise.all([
          axios.get(`${API}/invoices?pagination[limit]=200&sort=createdAt:asc`, auth()),
          axios.get(`${API}/projects?pagination[limit]=100`, auth()),
          axios.get(`${API}/clients?pagination[limit]=100`, auth()),
          axios.get(`${API}/time-entries?pagination[limit]=200&sort=date:asc`, auth()),
        ]);
        setData({
          invoices: inv.data.data  || [],
          projects: proj.data.data || [],
          clients:  cli.data.data  || [],
          entries:  time.data.data || [],
        });
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  /* ── Build monthly revenue series ── */
  const monthlyRevenue = (() => {
    const map = {};
    data.invoices
      .filter(i => (i.attributes||i).status === "paid")
      .forEach(i => {
        const attrs = i.attributes || i;
        const date  = new Date(attrs.createdAt || Date.now());
        const key   = date.toLocaleString("en-US", { month: "short", year: "2-digit" });
        map[key]    = (map[key] || 0) + (attrs.amount || 0);
      });
    return Object.entries(map).slice(-6).map(([month, revenue]) => ({ month, revenue }));
  })();

  /* ── Project status breakdown ── */
  const projectStatus = (() => {
    const map = {};
    data.projects.forEach(p => {
      const s = (p.attributes||p).status || "pending";
      map[s]  = (map[s] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  })();

  /* ── Invoice status breakdown ── */
  const invoiceStatus = (() => {
    const map = { paid: 0, pending: 0, overdue: 0, draft: 0 };
    data.invoices.forEach(i => {
      const s = (i.attributes||i).status || "pending";
      if (s in map) map[s] += (i.attributes||i).amount || 0;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  })();

  /* ── Weekly hours ── */
  const weeklyHours = (() => {
    const map = {};
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    days.forEach(d => { map[d] = 0; });
    data.entries.forEach(e => {
      const attrs = e.attributes || e;
      if (!attrs.date) return;
      const day = days[new Date(attrs.date + "T00:00:00").getDay()];
      map[day] += attrs.duration || 0;
    });
    return days.map(day => ({ day, hours: parseFloat(map[day].toFixed(2)) }));
  })();

  const PIE_COLORS_PROJECT  = ["#6366f1","#22d3ee","#f59e0b","#e879f9"];
  const PIE_COLORS_INVOICE  = ["#10b981","#f59e0b","#ef4444","#6b7280"];

  /* Top stats */
  const totalRevenue  = data.invoices.filter(i => (i.attributes||i).status === "paid").reduce((s, i) => s + ((i.attributes||i).amount || 0), 0);
  const totalHours    = data.entries.reduce((s, e) => s + ((e.attributes||e).duration || 0), 0);
  const avgInvoice    = data.invoices.length ? (data.invoices.reduce((s, i) => s + ((i.attributes||i).amount || 0), 0) / data.invoices.length) : 0;

  const kpis = [
    { label: "Total Revenue",   val: `$${totalRevenue.toLocaleString()}`,   icon: DollarSign,  color: "from-emerald-500 to-emerald-700", glow: "rgba(16,185,129,0.3)" },
    { label: "Hours Logged",    val: `${totalHours.toFixed(1)}h`,           icon: Clock,       color: "from-amber-500 to-amber-700",     glow: "rgba(245,158,11,0.3)" },
    { label: "Avg Invoice",     val: `$${avgInvoice.toLocaleString(undefined,{maximumFractionDigits:0})}`, icon: TrendingUp, color: "from-indigo-500 to-indigo-700", glow: "rgba(99,102,241,0.3)" },
    { label: "Total Clients",   val: data.clients.length,                   icon: Users,       color: "from-violet-500 to-violet-700",   glow: "rgba(139,92,246,0.3)" },
  ];

  return (
    <DashboardLayout title="Analytics">
      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpis.map(({ label, val, icon: Icon, color, glow }) => (
          <div key={label} className={`group relative ${glass} rounded-2xl p-5 overflow-hidden hover:border-white/20 transition-all`}>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at 20% 30%, ${glow}, transparent 70%)` }} />
            <div className="relative flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white flex-shrink-0`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider">{label}</p>
                {loading
                  ? <div className="w-16 h-5 bg-white/10 rounded animate-pulse mt-1" />
                  : <p className="text-white font-black text-xl">{val}</p>
                }
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue area chart */}
      <div className={`${glass} rounded-2xl p-6 mb-5`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-base">Monthly Revenue</h3>
          <div className="flex gap-2">
            {["3m","6m","1y"].map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  period === p ? "bg-indigo-500/20 border border-indigo-500/30 text-indigo-300" : `${glass} text-white/30 hover:text-white`
                }`}>
                {p}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="h-52 bg-white/5 rounded-xl animate-pulse" />
        ) : monthlyRevenue.length === 0 ? (
          <div className="h-52 flex items-center justify-center">
            <p className="text-white/25 text-sm">No revenue data yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
              <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip prefix="$" />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Bottom grid: pie charts + bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Projects by status */}
        <div className={`${glass} rounded-2xl p-6`}>
          <h3 className="text-white font-bold text-sm mb-5">Projects by Status</h3>
          {loading ? <div className="h-40 bg-white/5 rounded-xl animate-pulse" /> : (
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={projectStatus} cx="50%" cy="50%" innerRadius={40} outerRadius={65}
                  dataKey="value" paddingAngle={3}>
                  {projectStatus.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS_PROJECT[i % PIE_COLORS_PROJECT.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="mt-3 space-y-1.5">
            {projectStatus.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS_PROJECT[i % PIE_COLORS_PROJECT.length] }} />
                  <span className="text-white/50 text-xs capitalize">{s.name}</span>
                </div>
                <span className="text-white text-xs font-bold">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice amounts by status */}
        <div className={`${glass} rounded-2xl p-6`}>
          <h3 className="text-white font-bold text-sm mb-5">Invoice Revenue</h3>
          {loading ? <div className="h-40 bg-white/5 rounded-xl animate-pulse" /> : (
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={invoiceStatus.filter(s => s.value > 0)} cx="50%" cy="50%" innerRadius={40} outerRadius={65}
                  dataKey="value" paddingAngle={3}>
                  {invoiceStatus.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS_INVOICE[i % PIE_COLORS_INVOICE.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip prefix="$" />} />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="mt-3 space-y-1.5">
            {invoiceStatus.filter(s => s.value > 0).map((s, i) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS_INVOICE[i] }} />
                  <span className="text-white/50 text-xs capitalize">{s.name}</span>
                </div>
                <span className="text-white text-xs font-bold">${s.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hours by day */}
        <div className={`${glass} rounded-2xl p-6`}>
          <h3 className="text-white font-bold text-sm mb-5">Hours by Day</h3>
          {loading ? <div className="h-40 bg-white/5 rounded-xl animate-pulse" /> : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyHours} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} />
                <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} />
                <Tooltip content={<CustomTooltip suffix="h" />} />
                <Bar dataKey="hours" name="Hours" radius={[6, 6, 0, 0]}>
                  {weeklyHours.map((_, i) => (
                    <Cell key={i} fill={i === new Date().getDay() ? "#f59e0b" : "rgba(99,102,241,0.6)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

