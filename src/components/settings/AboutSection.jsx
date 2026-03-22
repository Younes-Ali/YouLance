import { ExternalLink, Info } from "lucide-react";
import Section from "./Section";
import { Link } from "react-router-dom";

export default function AboutSection() {
  const info = [
    { label: "Version",       value: "2.0.0" },
    { label: "Released",      value: "March 2025" },
    { label: "License",       value: "MIT" },
    { label: "Built with",    value: "React + Strapi" },
  ];

  return (
    <Section title="About" subtitle="FreeLance Manager v2.0.0" icon={Info}>
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/6">
        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
          <span className="text-black dark:text-white font-black text-lg">Y</span>
        </div>
        <div>
          <p className="text-black dark:text-white font-black text-base">You<span className="text-indigo-400">Lance</span></p>
          <p className="text-black/70 dark:text-white/35 text-xs">The freelancer's all-in-one workspace</p>
        </div>
      </div>

      {/* Info grid */}
      <div className="space-y-3 mb-6">
        {info.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between py-2.5 border-b border-white/4 last:border-0">
            <span className="text-black/80 dark:text-white/40 text-sm">{label}</span>
            <span className="text-black dark:text-white/80 text-sm font-semibold">{value}</span>
          </div>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2">
        {["Privacy Policy", "Terms of Service", "Changelog", "Open Source"].map(link => (
          <Link to={'/about'} key={link}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/15 dark:bg-white/4 border border-white/8 text-black/60 dark:text-white/45 hover:text-white hover:border-white/20 text-xs font-medium transition-all">
            {link} <ExternalLink size={10} />
          </Link>
        ))}
      </div>

      <p className="text-black/30 dark:text-white/20 text-xs text-center mt-6">
        Made with ❤️ by the YouLance team · © 2025
      </p>
    </Section>
  );
}