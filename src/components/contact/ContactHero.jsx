import { Mail } from "lucide-react";
import { glass } from "../../../public/styles/PublicStyles"

export default function ContactHero() {
  return (
    <section id="getintoutch" className="relative pt-36 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-700/15 rounded-full blur-[130px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-700/15 rounded-full blur-[100px] animate-pulse [animation-delay:1.5s]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>
      <div className="relative max-w-3xl mx-auto text-center">
        <div className={`inline-flex items-center gap-2 ${glass} rounded-full px-5 py-2 mb-8`}>
          <Mail size={13} className="text-indigo-400" />
          <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">Get In Touch</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
          We'd Love to{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-violet-400 to-cyan-400">Hear From You</span>
        </h1>
        <p className="text-white/45 text-lg leading-relaxed max-w-xl mx-auto">
          Whether you have a question, feedback, or just want to say hi — our team is always here and replies fast.
        </p>
      </div>
    </section>
  );
}
