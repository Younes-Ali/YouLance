import { Clock, DollarSign, TrendingUp, Users } from 'lucide-react';
import { glass } from '../../../public/styles/PublicStyles';
import useAppStore from '../../store/storeAnalytics';

export default function KPIs() {

  const invoices = useAppStore((state) => state.invoices);
  const entries  = useAppStore((state) => state.entries);
  const clients  = useAppStore((state) => state.clients);
  const loading    = useAppStore((state) => state.loading);

  const totalRevenue  = invoices.filter(i => (i.attributes||i).state === "paid").reduce((s, i) => s + ((i.attributes||i).amount || 0), 0);
  const totalHours    = entries.reduce((s, e) => s + ((e.attributes||e).duration || 0), 0);
  const avgInvoice    = invoices.length ? (invoices.reduce((s, i) => s + ((i.attributes||i).amount || 0), 0) / invoices.length) : 0;

  const kpis = [
    { label: "Total Revenue",   val: `$${totalRevenue.toLocaleString()}`,   icon: DollarSign,  color: "from-emerald-500 to-emerald-700", glow: "rgba(16,185,129,0.3)" },
    { label: "Hours Logged",    val: `${totalHours.toFixed(1)}h`,           icon: Clock,       color: "from-amber-500 to-amber-700",     glow: "rgba(245,158,11,0.3)" },
    { label: "Avg Invoice",     val: `$${avgInvoice.toLocaleString(undefined,{maximumFractionDigits:0})}`, icon: TrendingUp, color: "from-indigo-500 to-indigo-700", glow: "rgba(99,102,241,0.3)" },
    { label: "Total Clients",   val: clients.length,                   icon: Users,       color: "from-violet-500 to-violet-700",   glow: "rgba(139,92,246,0.3)" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpis.map(({ label, val, icon: Icon, color, glow }) => (
          <div key={label} className={`group relative ${glass} rounded-2xl p-5 overflow-hidden hover:border-white/20 transition-all`}>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at 20% 30%, ${glow}, transparent 70%)` }} />
            <div className="relative flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${color} flex items-center justify-center text-white shrink-0`}>
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
  )
}
