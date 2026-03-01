import { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Clock, Play, Pause, Square, Plus, Trash2, X,
  FolderKanban, Timer, ChevronDown,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";

const glass = "bg-white/5 backdrop-blur-xl border border-white/10";
const API   = "http://localhost:1337/api";
const auth  = () => {
  const t = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${t}` } };
};

const schema = Yup.object({
  description: Yup.string().required("Description is required"),
  project:     Yup.string(),
  duration:    Yup.number().min(0.1, "Duration must be > 0").required("Duration is required").typeError("Must be a number"),
  date:        Yup.date().required("Date is required"),
});

/* ── FORMAT SECONDS ── */
const fmt = (s) => {
  const h = Math.floor(s / 3600).toString().padStart(2, "0");
  const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${h}:${m}:${sec}`;
};

/* ── LIVE TIMER ── */
function LiveTimer({ projects }) {
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
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

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
          className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-amber-500/60 transition-all" />

        <div className="relative">
          <select value={project} onChange={e => setProject(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-500/60 transition-all appearance-none cursor-pointer"
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
              : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-[0_4px_15px_rgba(245,158,11,0.3)]"
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

/* ── MANUAL ENTRY MODAL ── */
function ManualModal({ open, onClose, projects, onSaved }) {
  if (!open) return null;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(`${API}/time-entries`, { data: values }, auth());
      toast.success("Time entry added ✓");
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error?.message || "Failed to save");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-md ${glass} rounded-3xl p-7`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-black text-xl">Manual Entry</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white"><X size={20} /></button>
        </div>
        <Formik
          initialValues={{ description: "", project: "", duration: "", date: new Date().toISOString().split("T")[0] }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {[
                { name: "description", label: "Description",     type: "text",   placeholder: "What did you work on?" },
                { name: "duration",    label: "Duration (hours)", type: "number", placeholder: "1.5" },
                { name: "date",        label: "Date",             type: "date",   placeholder: "" },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-2">{label}</label>
                  <Field type={type} name={name} placeholder={placeholder}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-amber-500/60 transition-all" />
                  <ErrorMessage name={name} component="p" className="text-red-400 text-xs mt-1.5 font-medium" />
                </div>
              ))}

              <div>
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-2">Project (optional)</label>
                <div className="relative">
                  <Field as="select" name="project"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-500/60 transition-all appearance-none cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.04)" }}>
                    <option value="" className="bg-[#0d0d2b]">No project</option>
                    {projects.map(p => {
                      const attrs = p.attributes || p;
                      return <option key={p.id} value={p.id} className="bg-[#0d0d2b]">{attrs.name}</option>;
                    })}
                  </Field>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className={`flex-1 py-3 rounded-xl ${glass} text-white/55 hover:text-white text-sm font-semibold transition-all`}>
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 relative py-3 rounded-xl font-bold text-white text-sm overflow-hidden group disabled:opacity-60">
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:from-amber-400 group-hover:to-orange-400 transition-all" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</> : "Log Time"}
                  </span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

/* ── TIME ENTRIES LIST ── */
function EntriesList({ entries, loading, onDelete }) {
  const grouped = entries.reduce((acc, e) => {
    const attrs = e.attributes || e;
    const date  = attrs.date || new Date().toISOString().split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(e);
    return acc;
  }, {});

  if (loading) return (
    <div className="space-y-3">
      {[1,2,3].map(i => <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />)}
    </div>
  );

  if (entries.length === 0) return (
    <div className={`${glass} rounded-2xl p-12 text-center`}>
      <Timer size={36} className="text-white/15 mx-auto mb-3" />
      <p className="text-white/30 text-sm">No time entries yet. Start tracking!</p>
    </div>
  );

  return (
    <div className="space-y-5">
      {Object.entries(grouped).sort(([a],[b]) => b.localeCompare(a)).map(([date, dayEntries]) => {
        const dayTotal = dayEntries.reduce((s, e) => s + ((e.attributes||e).duration || 0), 0);
        return (
          <div key={date}>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-white/45 text-xs font-semibold uppercase tracking-wider">
                {new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
              </span>
              <span className="text-amber-400 text-xs font-bold">{dayTotal.toFixed(2)}h total</span>
            </div>
            <div className={`${glass} rounded-2xl divide-y divide-white/[0.04] overflow-hidden`}>
              {dayEntries.map(entry => {
                const attrs = entry.attributes || entry;
                return (
                  <div key={entry.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors group">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                      <Clock size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/85 text-sm font-medium truncate">{attrs.description}</p>
                      {attrs.project && <p className="text-white/35 text-xs">{attrs.project}</p>}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-white font-bold text-sm">{(attrs.duration || 0).toFixed(2)}h</span>
                      <button onClick={() => onDelete(entry.id)}
                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/30 hover:text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── TIME TRACKER PAGE ── */
export default function TimeTrackerPage() {
  const [entries, setEntries]   = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [manualOpen, setManualOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [entriesRes, projRes] = await Promise.all([
        axios.get(`${API}/time-entries?sort=date:desc&pagination[limit]=100`, auth()),
        axios.get(`${API}/projects?pagination[limit]=100`, auth()),
      ]);
      setEntries(entriesRes.data.data || []);
      setProjects(projRes.data.data || []);
    } catch { toast.error("Failed to load data"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this entry?")) return;
    try {
      await axios.delete(`${API}/time-entries/${id}`, auth());
      toast.success("Entry deleted");
      fetchData();
    } catch { toast.error("Delete failed"); }
  };

  const totalHours = entries.reduce((s, e) => s + ((e.attributes||e).duration || 0), 0);
  const todayHours = entries
    .filter(e => (e.attributes||e).date === new Date().toISOString().split("T")[0])
    .reduce((s, e) => s + ((e.attributes||e).duration || 0), 0);

  return (
    <DashboardLayout title="Time Tracker">
      <ManualModal open={manualOpen} onClose={() => setManualOpen(false)} projects={projects} onSaved={fetchData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: live timer + summary */}
        <div className="space-y-4">
          <LiveTimer projects={projects} />

          {/* Summary */}
          <div className={`${glass} rounded-2xl p-5`}>
            <h3 className="text-white font-bold text-sm mb-4">This Week</h3>
            {[
              { label: "Today",      val: `${todayHours.toFixed(2)}h`,  color: "text-amber-400" },
              { label: "Total Logged", val: `${totalHours.toFixed(2)}h`, color: "text-indigo-400" },
              { label: "Entries",    val: entries.length,               color: "text-white" },
            ].map(({ label, val, color }) => (
              <div key={label} className="flex justify-between items-center py-2.5 border-b border-white/[0.05] last:border-0">
                <span className="text-white/40 text-xs">{label}</span>
                <span className={`font-bold text-sm ${color}`}>{val}</span>
              </div>
            ))}
          </div>

          <button onClick={() => setManualOpen(true)}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl ${glass} text-white/55 hover:text-white hover:bg-white/8 text-sm font-semibold transition-all border-dashed`}>
            <Plus size={15} /> Manual Entry
          </button>
        </div>

        {/* Right: entries list */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-base">Time Entries</h3>
            <span className="text-white/30 text-xs">{entries.length} entries</span>
          </div>
          <EntriesList entries={entries} loading={loading} onDelete={handleDelete} />
        </div>
      </div>
    </DashboardLayout>
  );
}