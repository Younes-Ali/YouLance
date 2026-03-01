import { Briefcase, Shield, Star, Zap } from "lucide-react";
import { glass } from "../../../../public/styles/PublicStyles";

export default function BrandPanel() {
  const perks = [
    { icon: <Zap size={14} />,    text: "All your projects in one place" },
    { icon: <Shield size={14} />, text: "Bank-grade data security" },
    { icon: <Star size={14} />,   text: "Loved by 12,000+ freelancers" },
  ];
  const avatars = [
    { i: "AR", c: "from-indigo-500 to-indigo-700" },
    { i: "MN", c: "from-pink-500 to-rose-600" },
    { i: "OK", c: "from-cyan-500 to-cyan-700" },
    { i: "SM", c: "from-violet-500 to-violet-700" },
    { i: "JP", c: "from-amber-500 to-amber-700" },
  ];

  return (
    <div className="hidden lg:flex flex-col justify-between p-14 relative overflow-hidden h-full">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-indigo-700/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-violet-700/15 rounded-full blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      {/* Logo */}
      <div className="relative flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.6)]">
          <Briefcase size={20} className="text-white" />
        </div>
        <span className="text-white font-bold text-2xl tracking-tight">Free<span className="text-indigo-400">Lance</span></span>
      </div>

      {/* Headline + perks */}
      <div className="relative">
        <h2 className="text-4xl font-black text-white leading-tight mb-6 tracking-tight">
          Welcome back to your{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-400">
            freelance command center
          </span>
        </h2>
        <div className="space-y-4">
          {perks.map((p, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0">
                {p.icon}
              </div>
              <span className="text-white/60 text-sm">{p.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Social proof */}
      <div className={`relative ${glass} rounded-2xl p-5`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex -space-x-2">
            {avatars.map((a, idx) => (
              <div key={idx} className={`w-8 h-8 rounded-full bg-linear-to-br ${a.c} border-2 border-[#050510] flex items-center justify-center text-white text-xs font-bold`}>{a.i}</div>
            ))}
            <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#050510] flex items-center justify-center text-white/50 text-xs font-bold">+12K</div>
          </div>
          <div className="flex gap-0.5">{Array(5).fill(0).map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}</div>
        </div>
        <p className="text-white/50 text-xs leading-relaxed italic">"FreeLance paid for itself in the first invoice I sent."</p>
        <p className="text-indigo-400 text-xs font-semibold mt-2">— Sarah Chen, UI/UX Designer</p>
      </div>
    </div>
  );
}
