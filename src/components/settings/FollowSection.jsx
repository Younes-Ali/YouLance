import { ExternalLink, Instagram, Linkedin, Twitter, Users2, Youtube } from "lucide-react";
import Section from "./Section";
import { Link } from "react-router-dom";

export default function FollowSection() {
  const socials = [
    {
      icon: Twitter,
      label: "Twitter / X",
      handle: "@Youlanceapp",
      color: "from-sky-500 to-sky-700",
      glow: "rgba(14,165,233,0.3)",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      handle: "YouLance Manager",
      color: "from-blue-600 to-blue-800",
      glow: "rgba(37,99,235,0.3)",
    },
    {
      icon: Instagram,
      label: "Instagram",
      handle: "@Youlanceapp",
      color: "from-pink-500 to-rose-600",
      glow: "rgba(236,72,153,0.3)",
    },
    {
      icon: Youtube,
      label: "YouTube",
      handle: "YouLance Tutorials",
      color: "from-red-500 to-red-700",
      glow: "rgba(239,68,68,0.3)",
    },
  ];

  return (
    <Section title="Follow Us" subtitle="Stay up to date with the latest news" icon={Users2}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socials.map(({ icon: Icon, label, handle, color, glow, href }) => (
          <Link to={'/about'} key={label} target="_blank" rel="noopener noreferrer"
            className="group relative flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-black/10 dark:bg-white/2 hover:border-white/20 overflow-hidden transition-all duration-300">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at 20% 50%, ${glow}, transparent 70%)` }} />
            <div className={`relative w-10 h-10 rounded-xl bg-linear-to-br ${color} flex items-center justify-center text-black dark:text-white shrink-0 shadow-lg`}>
              <Icon size={18} />
            </div>
            <div className="relative flex-1 min-w-0">
              <p className="text-black dark:text-white/80 text-sm font-semibold">{label}</p>
              <p className="text-black/70 dark:text-white/35 text-xs">{handle}</p>
            </div>
            <ExternalLink size={13} className="relative text-black/40 dark:text-white/20 group-hover:text-black dark:group-hover:text-white/50 transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </Section>
  );
}