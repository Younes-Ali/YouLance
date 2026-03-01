
import { Star, CheckCircle, Shield, Globe, Award } from "lucide-react";
import { glass, glassHover } from "../../../public/styles/PublicStyles";


export default function Testimonials() {
  const reviews = [
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      avatar: "SC",
      stars: 5,
      text: "FreeLance completely transformed how I run my design business. Invoicing used to take hours — now it's literally one click.",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Marcus Webb",
      role: "Full-Stack Developer",
      avatar: "MW",
      stars: 5,
      text: "The time tracker + invoicing combo is insane. I realized I was under-billing by 20% before I started using FreeLance.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      name: "Leila Amara",
      role: "Content Strategist",
      avatar: "LA",
      stars: 5,
      text: "Client CRM alone is worth the Pro plan. All my notes, emails, and project history in one gorgeous interface.",
      color: "from-violet-500 to-purple-500",
    },
    {
      name: "Jake Torres",
      role: "Motion Designer",
      avatar: "JT",
      stars: 5,
      text: "Went from juggling 4 different apps to just this one. My productivity has skyrocketed and my clients are happier.",
      color: "from-cyan-500 to-teal-500",
    },
  ];

  return (
    <section id="testimonials" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-violet-800/15 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className={`inline-block ${glass} text-pink-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6`}>
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Loved by{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-violet-400">
              Thousands
            </span>{" "}
            of Freelancers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((r) => (
            <div key={r.name} className={`group ${glass} ${glassHover} rounded-3xl p-7`}>
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl bg-linear-to-br ${r.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {r.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{r.name}</p>
                    <p className="text-white/40 text-xs">{r.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array(r.stars).fill(0).map((_, i) => (
                    <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-white/55 text-sm leading-relaxed">"{r.text}"</p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 items-center">
          {[Globe, Award, Shield, CheckCircle, Star].map((Icon, i) => (
            <div key={i} className={`flex items-center gap-2 ${glass} px-5 py-3 rounded-xl text-white/30 text-xs uppercase tracking-widest`}>
              <Icon size={14} className="text-indigo-400/60" />
              {["SOC 2 Compliant", "Award Winning", "Bank-Grade Security", "99.9% Uptime", "4.9/5 Rating"][i]}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}