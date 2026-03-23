import { ChevronRight, Clock, Globe, MapPin, Phone, Zap } from "lucide-react";
import { glass } from "../../../public/styles/PublicStyles";

export default function InfoPanel() {
  const companyInfo = [
    { icon: <MapPin size={15} />, label: "Location",      val: "Remote-First · Worldwide",  color: "text-indigo-400" },
    { icon: <Clock size={15} />,  label: "Support Hours", val: "Mon–Fri, 9am–6pm UTC",      color: "text-violet-400" },
    { icon: <Globe size={15} />,  label: "Website",       val: "youlanceapp.io",            color: "text-cyan-400"   },
    { icon: <Phone size={15} />,  label: "Phone",         val: "+1 (555) 000-0000",          color: "text-emerald-400"},
  ];

  const quickLinks = ["View Documentation", "Browse FAQs", "System Status", "Community Forum"];

  return (
    <div className="lg:col-span-2 flex flex-col gap-5">

      {/* Company info card */}
      <div className={`${glass} rounded-3xl p-7 relative overflow-hidden`}>
        <div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-violet-400/20 to-transparent" />
        <h3 className="text-white font-bold text-base mb-5">Company Info</h3>
        {companyInfo.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0"
          >
            <div className={`w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center ${item.color} shrink-0`}>
              {item.icon}
            </div>
            <div>
              <p className="text-white/35 text-xs">{item.label}</p>
              <p className="text-white/80 text-sm font-medium">{item.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Response time badge */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-600/25 via-violet-600/20 to-transparent" />
        <div className="absolute inset-0 border border-indigo-500/20 rounded-2xl" />
        <div className="relative p-6 flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            <Zap size={18} />
          </div>
          <div>
            <p className="text-white font-bold text-sm mb-1">Lightning Fast Replies</p>
            <p className="text-white/45 text-xs leading-relaxed">
              95% of messages answered within 2 business hours by a real human.
            </p>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className={`${glass} rounded-2xl p-5`}>
        <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3">Quick Links</p>
        {quickLinks.map((l) => (
          <a
            key={l}
            href="#"
            className="flex items-center justify-between py-2.5 text-white/55 hover:text-white text-sm border-b border-white/5 last:border-0 transition-colors group"
          >
            {l}
            <ChevronRight
              size={13}
              className="text-white/20 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all"
            />
          </a>
        ))}
      </div>

    </div>
  );
}