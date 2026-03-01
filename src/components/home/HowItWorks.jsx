import { TrendingUp, Users, Clock, Layers } from "lucide-react";
import { glass, glassHover } from "../../../public/styles/PublicStyles";


export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Create Your Workspace",
      desc: "Set up your profile, add your services, rates, and branding in under 5 minutes.",
      icon: <Layers size={20} />,
    },
    {
      num: "02",
      title: "Add Clients & Projects",
      desc: "Import existing clients or invite new ones. Spin up projects with milestones instantly.",
      icon: <Users size={20} />,
    },
    {
      num: "03",
      title: "Track & Invoice",
      desc: "Log time, track tasks, and fire off professional invoices with one click.",
      icon: <Clock size={20} />,
    },
    {
      num: "04",
      title: "Get Paid & Grow",
      desc: "Accept payments online, review analytics, and scale your freelance business confidently.",
      icon: <TrendingUp size={20} />,
    },
  ];

  return (
    <section id="how-it-works" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-900/20 rounded-full blur-[120px]" />
      <div className="absolute right-0 top-1/3 w-72 h-72 bg-violet-900/20 rounded-full blur-[100px]" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className={`inline-block ${glass} text-violet-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6`}>
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Up and Running in{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">
              Minutes
            </span>
          </h2>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-8 top-12 bottom-12 w-px bg-linear-to-b from-indigo-500/50 via-violet-500/50 to-transparent hidden md:block" />

          <div className="space-y-6">
            {steps.map((s, i) => (
              <div key={s.num} className={`group relative ${glass} ${glassHover} rounded-3xl p-7 md:pl-24 flex flex-col md:flex-row items-start gap-5`}>
                {/* Circle on line */}
                <div className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.6)]">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                <div className="shrink-0 w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 md:hidden">
                  {s.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white/20 font-black text-3xl">{s.num}</span>
                    <h3 className="text-white font-bold text-lg">{s.title}</h3>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
                </div>

                <div className="hidden md:flex w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 items-center justify-center text-indigo-400">
                  {s.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}