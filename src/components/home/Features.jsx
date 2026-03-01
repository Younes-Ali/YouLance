import { Briefcase, Users, ArrowRight, Shield, Clock, DollarSign, BarChart2 } from "lucide-react";
import { glass, glassHover } from "../../../public/styles/PublicStyles";


export default function Features() {
  const features = [
    {
      icon: <Briefcase size={22} />,
      title: "Project Tracking",
      desc: "Visualize every project's progress with real-time dashboards and kanban boards tailored for freelancers.",
      color: "from-indigo-500 to-indigo-700",
      glow: "rgba(99,102,241,0.4)",
    },
    {
      icon: <DollarSign size={22} />,
      title: "Smart Invoicing",
      desc: "Auto-generate polished invoices, track payments, and send reminders — get paid faster with zero hassle.",
      color: "from-violet-500 to-violet-700",
      glow: "rgba(139,92,246,0.4)",
    },
    {
      icon: <Users size={22} />,
      title: "Client CRM",
      desc: "Keep all client info, communications, and history in one glassy panel. Never lose context again.",
      color: "from-cyan-500 to-cyan-700",
      glow: "rgba(6,182,212,0.4)",
    },
    {
      icon: <Clock size={22} />,
      title: "Time Tracker",
      desc: "Built-in timer syncs directly with your projects and invoices. Bill accurately for every minute worked.",
      color: "from-emerald-500 to-emerald-700",
      glow: "rgba(16,185,129,0.4)",
    },
    {
      icon: <BarChart2 size={22} />,
      title: "Earnings Analytics",
      desc: "Visual breakdowns of your monthly income, best clients, and revenue trends across time.",
      color: "from-pink-500 to-pink-700",
      glow: "rgba(236,72,153,0.4)",
    },
    {
      icon: <Shield size={22} />,
      title: "Contracts & Docs",
      desc: "Generate and sign contracts digitally. Store all project documents securely in the cloud.",
      color: "from-amber-500 to-amber-700",
      glow: "rgba(245,158,11,0.4)",
    },
  ];

  return (
    <section id="features" className="relative py-32 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-linear-to-b from-transparent to-white/10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className={`inline-block ${glass} text-indigo-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6`}>
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tight">
            Everything You Need,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-400">
              Nothing You Don't
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            A complete toolkit designed around how freelancers actually work.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group relative ${glass} ${glassHover} rounded-3xl p-7 cursor-pointer`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${f.glow}, transparent 70%)`,
                }}
              />
              <div className={`relative w-12 h-12 rounded-2xl bg-linear-to-br ${f.color} flex items-center justify-center mb-5 text-white shadow-lg`}>
                {f.icon}
              </div>
              <h3 className="relative text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="relative text-white/40 text-sm leading-relaxed">{f.desc}</p>
              <div className="relative mt-5 flex items-center gap-1 text-indigo-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
