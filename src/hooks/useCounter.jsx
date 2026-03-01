import { useState, useEffect } from "react";


/* ─────────────────────────── GLASS HELPERS ─────────────────────────── */
const glass =
  "bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]";
const glassHover =
  "hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_12px_48px_rgba(99,102,241,0.2)] transition-all duration-500";
/* ─────────────────────────── COUNTER HOOK ─────────────────────────── */
export default function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return count;
}