
import { ArrowRight, Zap,  ChevronDown } from "lucide-react";
import { glass, glassHover } from "../../../public/styles/PublicStyles";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/20 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] animate-pulse [animation-delay:2s]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 ${glass} rounded-full px-4 py-2 mb-8`}>
          <Zap size={14} className="text-indigo-400" />
          <span className="text-white/70 text-xs font-medium tracking-widest uppercase">
            The #1 Freelancer Management Platform
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
          Manage Your{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-violet-400 to-cyan-400">
              Freelance Empire
            </span>
            <span className="absolute inset-0 bg-linear-to-r from-indigo-400/20 via-violet-400/20 to-cyan-400/20 blur-2xl" />
          </span>{" "}
          <br />
          Like a Pro
        </h1>

        <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          Track clients, projects, invoices, and earnings — all in one beautifully crafted workspace designed for modern freelancers.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="group relative px-8 py-4 rounded-2xl text-white font-bold text-base overflow-hidden w-full sm:w-auto">
            <span className="absolute inset-0 bg-linear-to-r from-indigo-600 to-violet-600" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-r from-indigo-500 to-violet-500 transition-opacity duration-300" />
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_70%)]" />
            <span className="relative flex items-center justify-center gap-2">
              Start for Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </button>

          <button className={`group px-8 py-4 rounded-2xl text-white font-semibold text-base w-full sm:w-auto ${glass} ${glassHover} flex items-center justify-center gap-2`}>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-2 h-2 border-l-2 border-t-2 border-white rotate-135 translate-x-px" />
            </div>
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { val: "12K+", label: "Freelancers" },
            { val: "$4.2M", label: "Invoiced" },
            { val: "98%", label: "Satisfaction" },
          ].map(({ val, label }) => (
            <div key={label} className={`${glass} rounded-2xl px-8 py-4 flex flex-col items-center`}>
              <span className="text-2xl font-black text-white">{val}</span>
              <span className="text-white/40 text-xs uppercase tracking-widest mt-1">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="text-white/30" />
      </div>
    </section>
  );
}