import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Plus, Search, FolderKanban, Edit2, Trash2, X,
  CheckCircle, Clock, Pause, AlertCircle, ChevronDown,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";

const glass = "bg-white/5 backdrop-blur-xl border border-white/10";
const API   = "http://localhost:1337/api";
const auth  = () => {
  const t = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${t}` } };
};

const STATUS_META = {
  active:    { label: "Active",    icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  completed: { label: "Completed", icon: CheckCircle, color: "text-indigo-400",  bg: "bg-indigo-400/10 border-indigo-400/20"  },
  paused:    { label: "Paused",    icon: Pause,       color: "text-amber-400",   bg: "bg-amber-400/10 border-amber-400/20"    },
  pending:   { label: "Pending",   icon: AlertCircle, color: "text-white/40",    bg: "bg-white/5 border-white/10"             },
};

const schema = Yup.object({
  name:        Yup.string().required("Project name is required"),
  description: Yup.string(),
  budget:      Yup.number().min(0, "Must be positive").typeError("Must be a number"),
  deadline:    Yup.date().nullable(),
  status:      Yup.string().oneOf(["active","completed","paused","pending"]).required(),
});

/* ── PROJECT MODAL ── */
function ProjectModal({ open, onClose, project, onSaved }) {
  if (!open) return null;
  const isEdit = !!project;
  const attrs  = project?.attributes || project || {};

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEdit) {
        await axios.put(`${API}/projects/${project.id}`, { data: values }, auth());
        toast.success("Project updated ✓");
      } else {
        await axios.post(`${API}/projects`, { data: values }, auth());
        toast.success("Project created ✓");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-lg ${glass} rounded-3xl p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)]`}>
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-black text-xl">{isEdit ? "Edit Project" : "New Project"}</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <Formik
          initialValues={{
            name:        attrs.name        || "",
            description: attrs.description || "",
            budget:      attrs.budget      || "",
            deadline:    attrs.deadline    || "",
            status:      attrs.status      || "active",
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {[
                { name: "name",        label: "Project Name",  type: "text",   placeholder: "Website Redesign" },
                { name: "description", label: "Description",   type: "textarea", placeholder: "Brief description…" },
                { name: "budget",      label: "Budget ($)",    type: "number", placeholder: "0" },
                { name: "deadline",    label: "Deadline",      type: "date",   placeholder: "" },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-2">{label}</label>
                  {type === "textarea" ? (
                    <Field as="textarea" name={name} rows={3} placeholder={placeholder}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-indigo-500/60 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] transition-all resize-none" />
                  ) : (
                    <Field type={type} name={name} placeholder={placeholder}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-indigo-500/60 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] transition-all" />
                  )}
                  <ErrorMessage name={name} component="p" className="text-red-400 text-xs mt-1.5 font-medium" />
                </div>
              ))}

              {/* Status */}
              <div>
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-2">Status</label>
                <div className="relative">
                  <Field as="select" name="status"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-indigo-500/60 transition-all appearance-none cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.04)" }}>
                    {Object.entries(STATUS_META).map(([val, { label }]) => (
                      <option key={val} value={val} className="bg-[#0d0d2b]">{label}</option>
                    ))}
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
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 group-hover:from-indigo-500 group-hover:to-violet-500 transition-all" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</> : isEdit ? "Save Changes" : "Create Project"}
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

/* ── PROJECTS PAGE ── */
export default function ProjectsPage() {
  const [projects, setProjects]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("all");
  const [modal, setModal]         = useState({ open: false, project: null });
  const [searchParams]            = useSearchParams();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/projects?sort=createdAt:desc&pagination[limit]=100&populate=*`, auth());
      setProjects(res.data.data || []);
    } catch { toast.error("Failed to load projects"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProjects(); }, []);
  useEffect(() => { if (searchParams.get("new") === "1") setModal({ open: true, project: null }); }, [searchParams]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await axios.delete(`${API}/projects/${id}`, auth());
      toast.success("Project deleted");
      fetchProjects();
    } catch { toast.error("Delete failed"); }
  };

  const filtered = projects.filter(p => {
    const attrs = p.attributes || p;
    const matchSearch = (attrs.name || "").toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || attrs.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <DashboardLayout title="Projects">
      <ProjectModal
        open={modal.open}
        project={modal.project}
        onClose={() => setModal({ open: false, project: null })}
        onSaved={fetchProjects}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-white font-black text-2xl tracking-tight">Projects</h2>
          <p className="text-white/35 text-sm">{projects.length} total projects</p>
        </div>
        <button onClick={() => setModal({ open: true, project: null })}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm transition-all shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
          <Plus size={16} /> New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className={`flex items-center gap-2 ${glass} rounded-xl px-4 py-2.5 flex-1`}>
          <Search size={14} className="text-white/25" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search projects…"
            className="bg-transparent text-white text-sm outline-none placeholder-white/25 flex-1" />
        </div>
        <div className="flex gap-2">
          {["all", "active", "completed", "paused", "pending"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                filter === f ? "bg-indigo-500/20 border border-indigo-500/40 text-indigo-300" : `${glass} text-white/40 hover:text-white`
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-44 bg-white/5 rounded-2xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className={`${glass} rounded-2xl p-16 text-center`}>
          <FolderKanban size={40} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/35 text-sm">No projects found</p>
          <button onClick={() => setModal({ open: true, project: null })}
            className="mt-4 text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
            Create your first project →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(p => {
            const attrs = p.attributes || p;
            const meta  = STATUS_META[attrs.status] || STATUS_META.pending;
            const progress = attrs.progress ?? 0;
            return (
              <div key={p.id} className={`group ${glass} rounded-2xl p-5 hover:border-white/20 transition-all duration-300 relative overflow-hidden`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">
                      {(attrs.name || "P")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{attrs.name}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${meta.bg} ${meta.color}`}>
                        {meta.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setModal({ open: true, project: p })}
                      className="w-7 h-7 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-white/40 hover:text-indigo-400 flex items-center justify-center transition-all">
                      <Edit2 size={12} />
                    </button>
                    <button onClick={() => handleDelete(p.id)}
                      className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 flex items-center justify-center transition-all">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                {attrs.description && (
                  <p className="text-white/35 text-xs leading-relaxed mb-4 line-clamp-2">{attrs.description}</p>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/40">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full"
                      style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.05]">
                  {attrs.budget && (
                    <span className="text-white/50 text-xs font-medium">${Number(attrs.budget).toLocaleString()}</span>
                  )}
                  {attrs.deadline && (
                    <span className="text-white/30 text-xs flex items-center gap-1">
                      <Clock size={10} /> {new Date(attrs.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}