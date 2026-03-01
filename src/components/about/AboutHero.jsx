import { Users, Heart, MapPin, Calendar, ChevronDown, Coffee } from "lucide-react";
import { glass } from "../../../public/styles/PublicStyles";



  
export default function AboutHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24">
      {/* BG Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-125 h-125 bg-indigo-700/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-700/15 rounded-full blur-[100px] animate-pulse [animation-delay:1.5s]" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] animate-pulse [animation-delay:3s]" />
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* diagonal accent line */}
        <div className="absolute top-0 right-0 w-px h-full bg-linear-to-b from-transparent via-indigo-500/20 to-transparent rotate-12 translate-x-64" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div className={`inline-flex items-center gap-2 ${glass} rounded-full px-5 py-2 mb-10`}>
          <Heart size={13} className="text-pink-400" />
          <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">Our Story</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-8">
          Built by Freelancers,
          <br />
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 via-indigo-400 to-cyan-400">
              For Freelancers
            </span>
            <span className="absolute -bottom-2 left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-400/50 to-transparent" />
          </span>
        </h1>

        <p className="text-white/45 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12">
          We got tired of duct-taping spreadsheets, invoicing apps, and chat tools together.
          So we built the all-in-one workspace we always wished existed.
        </p>

        {/* Founding detail chips */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { icon: <Calendar size={13} />, text: "Founded 2021" },
            { icon: <MapPin size={13} />, text: "Remote-first, Worldwide" },
            { icon: <Users size={13} />, text: "Team of 24" },
            { icon: <Coffee size={13} />, text: "∞ Coffee consumed" },
          ].map(({ icon, text }) => (
            <div key={text} className={`flex items-center gap-2 ${glass} rounded-full px-4 py-2 text-white/50 text-xs font-medium`}>
              <span className="text-indigo-400">{icon}</span>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/20 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={15} className="text-white/20" />
      </div>
    </section>
  );
}