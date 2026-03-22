import { ArrowRight, Zap, MessageSquare } from "lucide-react";
import { glass } from "../../../public/styles/PublicStyles";
import { Link } from "react-router-dom";



export default function CTABanner() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-600/50 via-violet-600/40 to-cyan-600/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_70%)]" />
          <div className="absolute inset-0 border border-white/10 rounded-3xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />

          <div className="relative p-12 md:p-16 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <Zap size={14} className="text-yellow-400" />
              <span className="text-white/70 text-xs font-medium">Limited Time: 3 months free on Pro</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5 tracking-tight leading-tight">
              Start Managing Your <br /> Freelance Business Today
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto">
              Join 12,000+ freelancers who've taken control of their business. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={'/dashboard'} className="group px-8 py-4 rounded-2xl bg-white text-indigo-700 font-bold text-sm hover:bg-white/90 transition-all duration-300 shadow-[0_4px_30px_rgba(255,255,255,0.2)] w-full sm:w-auto flex items-center justify-center gap-2">
                Get Started Free
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to={'/contact'} className={`px-8 py-4 rounded-2xl text-white font-semibold text-sm ${glass} hover:bg-white/10 transition-all duration-300 w-full sm:w-auto`}>
                <span className="flex items-center justify-center gap-2">
                  <MessageSquare size={16} />
                  Talk to Sales
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}