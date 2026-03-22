import { BookOpen, Bug, ExternalLink, HelpCircle, MessageCircle, Star } from "lucide-react";
import Section from "./Section";

export default function HelpSection() {
  const items = [
    {
      icon: BookOpen,
      label: "Documentation",
      sub: "Guides, tutorials, and API reference",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      href: "#",
    },
    {
      icon: Bug,
      label: "Report a Bug",
      sub: "Found something broken? Let us know",
      color: "text-red-400",
      bg: "bg-red-500/10",
      href: "#",
    },
    {
      icon: MessageCircle,
      label: "Live Chat",
      sub: "Talk to our support team directly",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      href: "#",
    },
    {
      icon: Star,
      label: "Rate the App",
      sub: "Enjoying FreeLance? Leave a review",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      href: "#",
    },
  ];

  return (
    <Section title="Help & Feedback" subtitle="We're here to help" icon={HelpCircle}>
      <div className="space-y-2">
        {items.map(({ icon: Icon, label, sub, color, bg, href }) => (
          <a key={label} href={href}
            className="flex items-center gap-4 p-4 rounded-xl bg-black/10 dark:bg-white/2 border border-white/6 hover:bg-black/6 dark:hover:bg-white/6 hover:border-white/15 transition-all group">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center ${color} shrink-0`}>
              <Icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-black dark:text-white/80 text-sm font-semibold">{label}</p>
              <p className="text-black/70 dark:text-white/35 text-xs">{sub}</p>
            </div>
            <ExternalLink size={14} className="text-black/30 dark:text-white/20 group-hover:text-black dark:group-hover:text-white/50 transition-colors shrink-0" />
          </a>
        ))}
      </div>
    </Section>
  );
}