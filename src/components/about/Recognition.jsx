import { glass, glassHover } from "../../../public/styles/PublicStyles";


export default function Recognition() {
  const press = [
    { name: "TechCrunch", quote: "The Notion of freelancing — but actually works." },
    { name: "Forbes", quote: "One of the 50 tools reshaping how we work in 2024." },
    { name: "Product Hunt", quote: "#1 Product of the Week, twice." },
    { name: "Indie Hackers", quote: "From $0 to $40K MRR in 18 months." },
  ];

  const backers = ["Sequoia", "Y Combinator", "a16z", "Lightspeed", "First Round"];

  return (
    <section id="recognition" className="relative py-24 px-6">
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-cyan-900/15 rounded-full blur-[100px]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className={`inline-block ${glass} text-amber-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6`}>
            Recognition
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            As Seen In &{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-400">
              Backed By
            </span>
          </h2>
        </div>

        {/* Press quotes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {press.map((p) => (
            <div key={p.name} className={`group ${glass} ${glassHover} rounded-2xl p-6 relative overflow-hidden`}>
              <div className="absolute top-4 right-6 text-5xl font-black text-white/5 leading-none select-none">"</div>
              <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">{p.name}</p>
              <p className="text-white/60 text-sm leading-relaxed italic">"{p.quote}"</p>
            </div>
          ))}
        </div>

        {/* Backers */}
        <div className={`${glass} rounded-2xl p-6`}>
          <p className="text-white/30 text-xs uppercase tracking-widest font-semibold text-center mb-6">Backed by world-class investors</p>
          <div className="flex flex-wrap justify-center gap-4">
            {backers.map((b) => (
              <div key={b} className="px-6 py-3 rounded-xl bg-white/4 border border-white/[0.07] text-white/40 font-bold text-sm hover:text-white/70 hover:border-white/15 transition-all duration-200 cursor-pointer">
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}