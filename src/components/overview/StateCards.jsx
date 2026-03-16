import { Clock, DollarSign, FolderKanban, Users } from 'lucide-react';
import StatCard from './StatCard'
import useAppStore from '../../store/storeAnalytics';



export default function StateCards() {

    const clients = useAppStore((state) => state.clients);
    const projects = useAppStore((state) => state.projects);
    const invoices = useAppStore((state) => state.invoices);
    const timeEntries = useAppStore((state) => state.entries);
    const loading    = useAppStore((state) => state.loading);


    const totalRevenue = invoices
        .filter(i => (i.attributes || i).state === "paid")
        .reduce((sum, i) => sum + ((i.attributes || i).amount || 0), 0);
    
      const totalHours = timeEntries
        .reduce((sum, t) => sum + ((t.attributes || t).duration || 0), 0);
    

    const stats = [
    { label: "Total Revenue",   value: totalRevenue,         icon: DollarSign,   color: "from-emerald-500 to-emerald-700", glow: "rgba(16,185,129,0.3)", trend: 12, prefix: "$" },
    { label: "Active Projects", value: projects.filter(p => (p.attributes||p).state === "active").length, icon: FolderKanban, color: "from-indigo-500 to-indigo-700", glow: "rgba(99,102,241,0.3)", trend: 5  },
    { label: "Total Clients",   value: clients.length,  icon: Users,        color: "from-violet-500 to-violet-700",   glow: "rgba(139,92,246,0.3)", trend: 8  },
    { label: "Hours Logged",    value: totalHours,           icon: Clock,        color: "from-amber-500 to-amber-700",     glow: "rgba(245,158,11,0.3)", suffix: "h" },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => <StatCard key={s.label} {...s} loading={loading} />)}
      </div>
  )
}
