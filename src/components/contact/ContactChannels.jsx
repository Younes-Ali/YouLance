import { Mail, MessageCircle, Twitter, HelpCircle } from "lucide-react";
import { glass, glassHover } from "../../../public/styles/PublicStyles";

export default function ContactChannels() {
  const channels = [
    { icon: <Mail size={22} />, title: "Email Us", value: "hello@freelanceapp.io", sub: "We reply within 24 hours", color: "from-indigo-500 to-indigo-700", glow: "rgba(99,102,241,0.35)", id: "email" },
    { icon: <MessageCircle size={22} />, title: "Live Chat", value: "Chat with us now", sub: "Average reply: under 2 hours", color: "from-emerald-500 to-emerald-700", glow: "rgba(16,185,129,0.35)", id: "chat" },
    { icon: <Twitter size={22} />, title: "Twitter / X", value: "@freelanceapp", sub: "DMs are open 24/7", color: "from-cyan-500 to-cyan-700", glow: "rgba(6,182,212,0.35)", id: "twitter" },
    { icon: <HelpCircle size={22} />, title: "Help Center", value: "docs.freelanceapp.io", sub: "Guides, FAQs & tutorials", color: "from-violet-500 to-violet-700", glow: "rgba(139,92,246,0.35)", id: "help" },
  ];

  return (
    <section className="py-6 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {channels.map((c) => (
          <div key={c.id} id={c.id} className={`group relative ${glass} ${glassHover} rounded-2xl p-6 overflow-hidden cursor-pointer`}>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at 30% 30%, ${c.glow}, transparent 70%)` }} />
            <div className={`relative w-12 h-12 rounded-2xl bg-linear-to-br ${c.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
              {c.icon}
            </div>
            <p className="relative text-white font-bold text-sm mb-1">{c.title}</p>
            <p className="relative text-indigo-400 text-xs font-semibold mb-1">{c.value}</p>
            <p className="relative text-white/35 text-xs">{c.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
