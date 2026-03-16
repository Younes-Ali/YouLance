import { AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { glass } from '../../../public/styles/PublicStyles'
import useAppStore from '../../store/storeInvoices';

export default function SummaryCards() {

  const invoices = useAppStore(state => state.invoices);


    const totalPaid    = invoices.filter(i => (i.attributes||i).state === "paid").reduce((s, i) => s + ((i.attributes||i).amount || 0), 0);
    const totalPending = invoices.filter(i => (i.attributes||i).state === "pending").reduce((s, i) => s + ((i.attributes||i).amount || 0), 0);
    const totalOverdue = invoices.filter(i => (i.attributes||i).state === "overdue").reduce((s, i) => s + ((i.attributes||i).amount || 0), 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Paid",    amount: totalPaid,    color: "from-emerald-500 to-emerald-700", glow: "rgba(16,185,129,0.3)",  icon: CheckCircle },
          { label: "Pending",       amount: totalPending, color: "from-amber-500 to-amber-700",     glow: "rgba(245,158,11,0.3)",   icon: Clock       },
          { label: "Overdue",       amount: totalOverdue, color: "from-red-500 to-red-700",         glow: "rgba(239,68,68,0.3)",    icon: AlertCircle },
        ].map(({ label, amount, color, glow, icon: Icon }) => (
          <div key={label} className={`group relative ${glass} rounded-2xl p-5 overflow-hidden hover:border-white/20 transition-all`}>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at 20% 30%, ${glow}, transparent 70%)` }} />
            <div className="relative flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${color} flex items-center justify-center text-white shrink-0`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider">{label}</p>
                <p className="text-white font-black text-xl">${amount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
  )
}
