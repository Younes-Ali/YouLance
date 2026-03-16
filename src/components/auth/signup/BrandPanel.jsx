import { Briefcase, Shield, User, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function BrandPanel({ step }) {
  const steps = [
    { icon: <User size={22} />, title: "Create your free account", sub: "Join 12,000+ freelancers managing their business smarter." },
    { icon: <Briefcase size={22} />, title: "Tell us about yourself", sub: "Help us personalize your FreeLance experience from day one." },
    { icon: <Zap size={22} />, title: "Choose your plan", sub: "Start free and upgrade when you're ready. No credit card needed." },
  ];
  const current = steps[step];

  return (
    <div className="hidden lg:flex flex-col justify-between p-14 relative overflow-hidden h-full">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-violet-700/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-indigo-700/15 rounded-full blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      {/* Logo */}
      <div className="relative flex items-center gap-2">
        <Link to={"/"} className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.6)]">
          <Briefcase size={20} className="text-white" />
        </Link>
        <span className="text-white font-bold text-2xl tracking-tight">Free<span className="text-indigo-400">Lance</span></span>
      </div>

      {/* Dynamic content */}
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/25 flex items-center justify-center text-indigo-400 mb-6">
          {current.icon}
        </div>
        <h2 className="text-3xl font-black text-white leading-tight mb-3 tracking-tight">{current.title}</h2>
        <p className="text-white/45 text-sm leading-relaxed mb-8">{current.sub}</p>
        {[
          { icon: <Zap size={14} />,    text: "Up and running in under 5 minutes" },
          { icon: <Shield size={14} />, text: "No credit card required for Solo" },
          { icon: <Users size={14} />,  text: "Cancel or upgrade anytime" },
        ].map((f, i) => (
          <div key={i} className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">{f.icon}</div>
            <span className="text-white/55 text-sm">{f.text}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative flex gap-2">
        {[0, 1, 2].map(i => (
          <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= step ? "bg-linear-to-r from-indigo-500 to-violet-600 flex-1" : "bg-white/10 w-6"}`} />
        ))}
      </div>
    </div>
  );
}