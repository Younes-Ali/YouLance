import { useState, useEffect, useRef } from "react";
import { Users, Globe, Star, TrendingUp } from "lucide-react";
import useCounter from "../../hooks/useCounter";
import { glass, glassHover } from "../../../public/styles/PublicStyles";

export default function Stats() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const c1 = useCounter(12000, 2000, visible);
  const c2 = useCounter(4200000, 2200, visible);
  const c3 = useCounter(98, 1800, visible);
  const c4 = useCounter(150, 2000, visible);

  const stats = [
    { val: c1, suffix: "+", prefix: "", label: "Freelancers Onboard", icon: <Users size={20} />, color: "text-indigo-400" },
    { val: c2, suffix: "+", prefix: "$", label: "Total Invoiced", icon: <TrendingUp size={20} />, color: "text-violet-400", format: true },
    { val: c3, suffix: "%", prefix: "", label: "Satisfaction Rate", icon: <Star size={20} />, color: "text-amber-400" },
    { val: c4, suffix: "+", prefix: "", label: "Countries Reached", icon: <Globe size={20} />, color: "text-cyan-400" },
  ];

  function fmt(val, format) {
    if (!format) return val.toLocaleString();
    if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
    if (val >= 1000) return (val / 1000).toFixed(0) + "K";
    return val.toString();
  }

  return (
    <section ref={ref} className="relative py-24 px-6">
      {/* Glowing line top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-linear-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div key={s.label} className={`group relative ${glass} ${glassHover} rounded-3xl p-7 text-center overflow-hidden`}>
              <div className="absolute inset-0 bg-linear-to-b from-white/2 to-transparent" />
              <div className={`relative flex justify-center mb-4 ${s.color}`}>{s.icon}</div>
              <div className={`relative text-3xl md:text-4xl font-black text-white mb-2 tabular-nums`}>
                {s.prefix}{fmt(s.val, s.format)}{s.suffix}
              </div>
              <p className="relative text-white/35 text-xs uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

