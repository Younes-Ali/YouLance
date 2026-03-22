import { Link } from "react-router-dom";
import { ArrowRight, Zap, Twitter, Mail, MessageCircle } from "lucide-react";
import { glass, glassHover } from "../../../public/styles/PublicStyles";

  
export default function ContactCTA() {
  const channels = [
    { icon: <Mail size={20} />, title: "Email Us", sub: "hello@youlanceapp.io", color: "from-indigo-500 to-indigo-700", glow: "rgba(99,102,241,0.4)" },
    { icon: <MessageCircle size={20} />, title: "Live Chat", sub: "Reply in under 2 hours", color: "from-violet-500 to-violet-700", glow: "rgba(139,92,246,0.4)" },
    { icon: <Twitter size={20} />, title: "Twitter / X", sub: "@youlanceapp", color: "from-cyan-500 to-cyan-700", glow: "rgba(6,182,212,0.4)" },
  ];

  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Main CTA */}
        <div className="relative rounded-3xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-600/40 via-violet-600/30 to-cyan-600/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
          <div className="absolute inset-0 border border-white/10 rounded-3xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

          <div className="relative p-12 md:p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(99,102,241,0.5)]">
              <Zap size={26} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5 tracking-tight">
              Ready to Level Up Your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 to-violet-300">Freelance Game?</span>
            </h2>
            <p className="text-white/45 text-lg mb-10 max-w-lg mx-auto">
              Join thousands of freelancers who've taken back control of their time and income.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-white text-indigo-700 font-black text-sm hover:bg-white/90 transition-all duration-300 shadow-[0_4px_30px_rgba(255,255,255,0.2)]"
            >
              Start Free Today
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Contact channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {channels.map((c) => (
            <div key={c.title} className={`group cursor-pointer ${glass} ${glassHover} rounded-2xl p-6 flex items-center gap-4 overflow-hidden relative`}>
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 20% 50%, ${c.glow}, transparent 70%)` }}
              />
              <div className={`relative shrink-0 w-12 h-12 rounded-2xl bg-linear-to-br ${c.color} flex items-center justify-center text-white shadow-lg`}>
                {c.icon}
              </div>
              <div className="relative">
                <p className="text-white font-bold text-sm">{c.title}</p>
                <p className="text-white/40 text-xs mt-0.5">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
