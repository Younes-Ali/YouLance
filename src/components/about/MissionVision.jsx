import { Target, Heart, Globe, Rocket, Shield, Lightbulb } from "lucide-react";
import { glass, glassHover } from "../../../public/styles/PublicStyles";


 
export default function MissionVision() {
  return (
    <section id="mission"  className="relative py-28 px-6">
      <div className="absolute left-0 top-0 w-72 h-72 bg-indigo-900/20 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Mission card */}
          <div className={`group relative ${glass} ${glassHover} rounded-3xl p-10 overflow-hidden`}>
            <div className="absolute inset-0 bg-linear-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-400/40 to-transparent" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500 to-indigo-700 flex items-center justify-center mb-7 shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                <Target size={24} className="text-white" />
              </div>
              <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Our Mission</span>
              <h2 className="text-white text-3xl font-black mt-3 mb-5 leading-tight">
                Empower every freelancer to run a world-class business
              </h2>
              <p className="text-white/45 leading-relaxed text-sm">
                We believe independent professionals deserve the same powerful tools that corporations have — without the enterprise price tag or the complexity. Our mission is to lower the barrier, eliminate the busywork, and let you focus on what you do best: your craft.
              </p>
            </div>
          </div>

          {/* Vision card */}
          <div className={`group relative ${glass} ${glassHover} rounded-3xl p-10 overflow-hidden`}>
            <div className="absolute inset-0 bg-linear-to-br from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-400/40 to-transparent" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-violet-500 to-violet-700 flex items-center justify-center mb-7 shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                <Rocket size={24} className="text-white" />
              </div>
              <span className="text-violet-400 text-xs font-bold uppercase tracking-widest">Our Vision</span>
              <h2 className="text-white text-3xl font-black mt-3 mb-5 leading-tight">
                A future where freelancing is the first choice, not the last resort
              </h2>
              <p className="text-white/45 leading-relaxed text-sm">
                We envision a world where the freelance economy is the backbone of global work. Where every independent professional has the infrastructure, confidence, and tools to build a sustainable, thriving career on their own terms — without compromise.
              </p>
            </div>
          </div>

          {/* Values row */}
          {[
            { icon: <Shield size={18} />, title: "Trust First", desc: "We never sell your data. Never.", color: "from-cyan-500 to-cyan-700", glow: "rgba(6,182,212,0.35)" },
            { icon: <Lightbulb size={18} />, title: "Always Improving", desc: "We ship improvements every week.", color: "from-amber-500 to-amber-700", glow: "rgba(245,158,11,0.35)" },
            { icon: <Heart size={18} />, title: "Community Driven", desc: "Every feature starts with your feedback.", color: "from-pink-500 to-pink-700", glow: "rgba(236,72,153,0.35)" },
            { icon: <Globe size={18} />, title: "Globally Inclusive", desc: "Multi-currency, multi-language, always.", color: "from-emerald-500 to-emerald-700", glow: "rgba(16,185,129,0.35)" },
          ].map((v) => (
            <div key={v.title} className={`group relative ${glass} ${glassHover} rounded-2xl p-6 flex items-start gap-4 overflow-hidden`}>
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 20% 50%, ${v.glow}, transparent 70%)` }}
              />
              <div className={`relative shrink-0 w-11 h-11 rounded-xl bg-linear-to-br ${v.color} flex items-center justify-center text-white shadow-lg`}>
                {v.icon}
              </div>
              <div className="relative">
                <h3 className="text-white font-bold text-sm mb-1">{v.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}