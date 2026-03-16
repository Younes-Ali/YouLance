import axios from "axios";
import toast from "react-hot-toast";
import { glass } from "../../../public/styles/PublicStyles";
import { ChevronDown, Pause, Play, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";


const API   = "http://localhost:1337/api";
const auth  = () => {
  const t = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${t}` } };
};

const fmt = (s) => {
  const h = Math.floor(s / 3600).toString().padStart(2, "0");
  const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${h}:${m}:${sec}`;
};


export function LiveTimer({ projects }) {
  const [running, setRunning]   = useState(false);
  const [seconds, setSeconds]   = useState(0);
  const [desc, setDesc]         = useState("");
  const [project, setProject]   = useState("");
  const [saving, setSaving]     = useState(false);
  const intervalRef             = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const handleStop = async () => {
    setRunning(false);
    if (seconds < 10 || !desc) { setSeconds(0); return; }
    setSaving(true);
    try {
      await axios.post(`${API}/time-entries`, {
        data: {
          description: desc,
          project,
          duration: parseFloat((seconds / 3600).toFixed(2)),
          date: new Date().toISOString().split("T")[0],
        },
      }, auth());
      toast.success("Time logged ✓");
      setSeconds(0);
      setDesc("");
      setProject("");
    } catch { toast.error("Failed to save time entry"); }
    finally { setSaving(false); }
  };

  const ringPercent = Math.min((seconds % 3600) / 3600 * 100, 100);
  const circumference = 2 * Math.PI * 54;

  return (
    <div className={`${glass} rounded-3xl p-7 relative overflow-hidden`}>
      <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-amber-400/30 to-transparent" />

      <h3 className="text-white font-bold text-base mb-6">Live Timer</h3>

      {/* Ring clock */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-36 h-36">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <circle cx="60" cy="60" r="54" fill="none"
              stroke={running ? "url(#timerGrad)" : "rgba(255,255,255,0.1)"}
              strokeWidth="6" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - ringPercent / 100)}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
            <defs>
              <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white font-black text-2xl tabular-nums tracking-tight">{fmt(seconds)}</span>
            {running && <span className="text-amber-400 text-xs font-semibold mt-0.5 animate-pulse">Recording…</span>}
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-3 mb-5">
        <input value={desc} onChange={e => setDesc(e.target.value)}
          placeholder="What are you working on?"
          className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-amber-500/60 transition-all" />

        <div className="relative">
          <select value={project} onChange={e => setProject(e.target.value)}
            className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-500/60 transition-all appearance-none cursor-pointer"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <option value="" className="bg-[#0d0d2b]">No project</option>
            {projects.map(p => {
              const attrs = p.attributes || p;
              return <option key={p.id} value={p.id} className="bg-[#0d0d2b]">{attrs.name}</option>;
            })}
          </select>
          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button onClick={() => setRunning(!running)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm transition-all ${
            running
              ? "bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30"
              : "bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-[0_4px_15px_rgba(245,158,11,0.3)]"
          }`}>
          {running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> {seconds > 0 ? "Resume" : "Start"}</>}
        </button>

        {seconds > 0 && (
          <button onClick={handleStop} disabled={saving}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-red-400 hover:border-red-500/30 text-sm font-semibold transition-all">
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Square size={16} />}
            Stop & Save
          </button>
        )}
      </div>
    </div>
  );
}