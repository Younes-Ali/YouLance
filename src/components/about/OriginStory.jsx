import { glass, glassHover } from "../../../public/styles/PublicStyles";

  

export default function OriginStory() {
  const milestones = [
    {
      year: "2021",
      quarter: "Q1",
      title: "The Frustration",
      desc: "Two freelancers — a developer and a designer — hit their limit juggling 6 tools to manage a single project. A spreadsheet, 2 chat apps, an invoicing SaaS, a time tracker, and a doc editor. Something had to change.",
      color: "from-indigo-500 to-indigo-700",
      dot: "bg-indigo-500",
    },
    {
      year: "2021",
      quarter: "Q3",
      title: "First Prototype",
      desc: "Built in a weekend hackathon, the first version could only track projects and send invoices. But the feedback from 50 beta testers was immediate: this is exactly what we needed.",
      color: "from-violet-500 to-violet-700",
      dot: "bg-violet-500",
    },
    {
      year: "2022",
      quarter: "Q1",
      title: "Public Launch",
      desc: "FreeLance 1.0 launched on Product Hunt. #3 Product of the Day. 1,200 sign-ups in 48 hours. The community had spoken — freelancers were desperate for this.",
      color: "from-pink-500 to-pink-700",
      dot: "bg-pink-500",
    },
    {
      year: "2022",
      quarter: "Q4",
      title: "Seed Funding",
      desc: "Raised $2.4M in seed funding from founders who believed in the future of independent work. Grew the team from 3 to 12 in 6 months.",
      color: "from-amber-500 to-amber-700",
      dot: "bg-amber-500",
    },
    {
      year: "2023",
      quarter: "Q2",
      title: "12,000 Freelancers",
      desc: "Crossed the 12K user milestone. Launched the CRM, Time Tracker, and Analytics Suite based on the most-requested community features.",
      color: "from-emerald-500 to-emerald-700",
      dot: "bg-emerald-500",
    },
    {
      year: "2024",
      quarter: "Now",
      title: "The Next Chapter",
      desc: "AI-powered smart suggestions, team collaboration features, and global payment rails are in the pipeline. The best is yet to come.",
      color: "from-cyan-500 to-cyan-700",
      dot: "bg-cyan-500",
    },
  ];

  return (
    <section id="story" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-violet-900/15 rounded-full blur-[130px]" />

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className={`inline-block ${glass} text-violet-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6`}>
            Our Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            From Side Project to{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">
              Global Platform
            </span>
          </h2>
        </div>

        <div className="relative">
          {/* Central vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-indigo-500/40 via-violet-500/30 to-transparent hidden md:block" />

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={m.year + m.quarter} className={`relative flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Card */}
                <div className={`group w-full md:w-[calc(50%-2.5rem)] ${glass} ${glassHover} rounded-2xl p-6 relative overflow-hidden`}>
                  <div className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-400/30 to-transparent`} />
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-black bg-linear-to-r ${m.color} bg-clip-text text-transparent uppercase tracking-widest`}>
                      {m.year} · {m.quarter}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{m.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{m.desc}</p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex shrink-0 w-5 h-5 rounded-full border-2 border-white/20 bg-[#050510] items-center justify-center relative z-10">
                  <div className={`w-2.5 h-2.5 rounded-full ${m.dot} shadow-[0_0_10px_currentColor]`} />
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-[calc(50%-2.5rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}