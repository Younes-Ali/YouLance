
import { ArrowRight, Linkedin, Twitter, Github } from "lucide-react";
import { glass, glassHover } from "../../../public/styles/PublicStyles";


  
export default function Team() {
  const members = [
    {
      name: "Alex Rivera",
      role: "Co-founder & CEO",
      bio: "Ex-freelance dev of 8 years. Obsessed with removing friction from creative work.",
      initials: "AR",
      color: "from-indigo-500 to-indigo-700",
      links: { twitter: "#", linkedin: "#", github: "#" },
      tag: "Product Vision",
    },
    {
      name: "Mia Nakamura",
      role: "Co-founder & Design Lead",
      bio: "Spent 5 years as a freelance UI/UX designer before building FreeLance.",
      initials: "MN",
      color: "from-pink-500 to-rose-700",
      links: { twitter: "#", linkedin: "#" },
      tag: "Design Systems",
    },
    {
      name: "Omar Khalil",
      role: "Head of Engineering",
      bio: "Built distributed systems at scale. Now making FreeLance impossibly fast.",
      initials: "OK",
      color: "from-cyan-500 to-cyan-700",
      links: { github: "#", linkedin: "#" },
      tag: "Infrastructure",
    },
    {
      name: "Sofia Marchand",
      role: "Head of Growth",
      bio: "Grew two B2B SaaS companies from 0 to 50K users. Community is her superpower.",
      initials: "SM",
      color: "from-violet-500 to-violet-700",
      links: { twitter: "#", linkedin: "#" },
      tag: "Community",
    },
    {
      name: "Jin Park",
      role: "Lead Product Designer",
      bio: "Former Figma designer. Crafts every pixel of the FreeLance experience.",
      initials: "JP",
      color: "from-amber-500 to-amber-700",
      links: { twitter: "#", linkedin: "#" },
      tag: "UI / UX",
    },
    {
      name: "Priya Sharma",
      role: "Customer Success Lead",
      bio: "Makes sure every FreeLance user reaches their goals. Replies in under 2 hours.",
      initials: "PS",
      color: "from-emerald-500 to-emerald-700",
      links: { linkedin: "#", twitter: "#" },
      tag: "Support",
    },
  ];

  const socialIcons = { twitter: <Twitter size={13} />, linkedin: <Linkedin size={13} />, github: <Github size={13} /> };

  return (
    <section id="team" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute left-0 top-1/2 w-80 h-80 bg-indigo-900/15 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className={`inline-block ${glass} text-pink-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6`}>
            The Team
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Meet the Humans{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-violet-400">
              Behind FreeLance
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            A small, remote-first team of ex-freelancers who deeply understand the problems we're solving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m) => (
            <div key={m.name} className={`group relative ${glass} ${glassHover} rounded-3xl p-7 overflow-hidden flex flex-col`}>
              {/* Top glow line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

              <div className="flex items-start justify-between mb-5">
                {/* Avatar */}
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${m.color} flex items-center justify-center text-white font-black text-lg shadow-lg relative overflow-hidden`}>
                  <span>{m.initials}</span>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_70%)]" />
                </div>
                {/* Tag */}
                <span className={`text-xs font-semibold ${glass} text-white/50 px-3 py-1 rounded-full`}>{m.tag}</span>
              </div>

              <h3 className="text-white font-bold text-base mb-0.5">{m.name}</h3>
              <p className="text-indigo-400 text-xs font-medium mb-4">{m.role}</p>
              <p className="text-white/40 text-sm leading-relaxed flex-1">{m.bio}</p>

              {/* Social links */}
              <div className="flex gap-2 mt-5">
                {Object.entries(m.links).map(([platform, href]) => (
                  <a
                    key={platform}
                    href={href}
                    className={`w-8 h-8 rounded-xl ${glass} flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200`}
                  >
                    {socialIcons[platform]}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hiring banner */}
        <div className={`mt-12 ${glass} rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6`}>
          <div>
            <h3 className="text-white font-bold text-xl mb-1">We're Hiring 🚀</h3>
            <p className="text-white/40 text-sm">Join our remote-first team and help shape the future of freelancing.</p>
          </div>
          <button className="shrink-0 group flex items-center gap-2 px-6 py-3 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.35)]">
            View Open Roles
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
