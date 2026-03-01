import { CheckCircle } from "lucide-react";
import { glass, glassHover } from "../../../public/styles/PublicStyles";



export default function Pricing() {
  const plans = [
    {
      name: "Solo",
      price: "0",
      period: "forever",
      desc: "Perfect for getting started",
      features: ["3 Active Projects", "2 Clients", "Basic Invoicing", "Time Tracker", "5GB Storage"],
      cta: "Start Free",
      accent: false,
    },
    {
      name: "Pro",
      price: "19",
      period: "per month",
      desc: "For serious freelancers",
      features: ["Unlimited Projects", "Unlimited Clients", "Smart Invoicing", "Advanced Analytics", "50GB Storage", "Priority Support"],
      cta: "Start 14-day Trial",
      accent: true,
    },
    {
      name: "Agency",
      price: "49",
      period: "per month",
      desc: "For teams and agencies",
      features: ["Everything in Pro", "5 Team Members", "White-label Invoices", "API Access", "200GB Storage", "Dedicated Manager"],
      cta: "Contact Sales",
      accent: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-indigo-900/10 rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className={`inline-block ${glass} text-cyan-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6`}>
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Simple,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-400">
              Transparent
            </span>{" "}
            Pricing
          </h2>
          <p className="text-white/40 text-lg">No hidden fees. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-8 flex flex-col transition-all duration-500 ${
                p.accent
                  ? "bg-linear-to-b from-indigo-600/30 to-violet-600/20 border border-indigo-500/40 shadow-[0_0_60px_rgba(99,102,241,0.2)] hover:shadow-[0_0_80px_rgba(99,102,241,0.35)]"
                  : `${glass} ${glassHover}`
              }`}
            >
              {p.accent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-linear-to-r from-indigo-500 to-violet-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-white font-bold text-xl mb-1">{p.name}</h3>
                <p className="text-white/40 text-sm">{p.desc}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-black text-white">${p.price}</span>
                <span className="text-white/40 text-sm ml-2">{p.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-white/60 text-sm">
                    <CheckCircle size={15} className="text-indigo-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  p.accent
                    ? "bg-linear-to-r from-indigo-500 to-violet-600 text-white hover:from-indigo-400 hover:to-violet-500 shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_4px_30px_rgba(99,102,241,0.6)]"
                    : `${glass} text-white hover:bg-white/10`
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}  