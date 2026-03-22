import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { AlertCircle, CheckCircle, ChevronDown, Pause, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const schema = Yup.object({
  name:        Yup.string().required("Project name is required"),
  description: Yup.string(),
  budget:      Yup.number().min(0, "Must be positive").typeError("Must be a number"),
  deadline:    Yup.date().nullable(),
  state:       Yup.string().oneOf(["active", "completed", "paused", "pending"]).required(),
  progress:    Yup.number().min(0).max(100).required(),
});

const STATUS_META = {
  active:    { label: "Active",    icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  completed: { label: "Completed", icon: CheckCircle, color: "text-indigo-400",  bg: "bg-indigo-400/10 border-indigo-400/20"  },
  paused:    { label: "Paused",    icon: Pause,       color: "text-amber-400",   bg: "bg-amber-400/10 border-amber-400/20"    },
  pending:   { label: "Pending",   icon: AlertCircle, color: "text-white/40",    bg: "bg-white/5 border-white/10"             },
};

const API  = "http://localhost:1337/api";
const auth = () => {
  const t = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${t}` } };
};

const inputClass = `
  w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all
  bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400
  focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20
  dark:bg-white/[0.04] dark:border-white/10 dark:text-white dark:placeholder-white/20
  dark:focus:border-indigo-500/60 dark:focus:ring-0 dark:focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]
`;

/* ── PROGRESS BAR FIELD ── */
function ProgressField() {
  const { values, setFieldValue } = useFormikContext();
  const progress = Number(values.progress) || 0;

  const color =
    progress === 100 ? "from-emerald-500 to-emerald-600" :
    progress >= 66   ? "from-indigo-500 to-violet-600"   :
    progress >= 33   ? "from-amber-500 to-orange-500"    :
                       "from-red-500 to-rose-600";

  const textColor =
    progress === 100 ? "text-emerald-500 dark:text-emerald-400" :
    progress >= 66   ? "text-indigo-500 dark:text-indigo-400"   :
    progress >= 33   ? "text-amber-500 dark:text-amber-400"     :
                       "text-red-500 dark:text-red-400";

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/40">
          Progress
        </label>
        <span className={`text-xs font-black tabular-nums ${textColor}`}>
          {progress}%
        </span>
      </div>

      {/* Visual bar */}
      <div className="relative h-2 rounded-full overflow-hidden mb-3 bg-slate-200 dark:bg-white/8">
        <div
          className={`h-full bg-linear-to-r ${color} rounded-full transition-all duration-300`}
          style={{ width: `${progress}%` }}
        />
        {progress > 0 && (
          <div
            className={`absolute top-0 h-full bg-linear-to-r ${color} rounded-full blur-sm opacity-50 transition-all duration-300`}
            style={{ width: `${progress}%` }}
          />
        )}
      </div>

      {/* Slider */}
      <input
        type="range"
        min={0} max={100} step={1}
        value={progress}
        onChange={e => setFieldValue("progress", Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #6366f1 ${progress}%, ${
            document.documentElement.classList.contains("dark")
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)"
          } ${progress}%)`,
          outline: "none",
        }}
      />

      {/* Quick select buttons */}
      <div className="flex gap-2 mt-3">
        {[0, 25, 50, 75, 100].map(val => (
          <button key={val} type="button"
            onClick={() => setFieldValue("progress", val)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              progress === val
                ? "bg-indigo-500/20 border border-indigo-500/40 text-indigo-500 dark:text-indigo-300"
                : "border text-slate-400 hover:text-slate-700 border-slate-200 bg-slate-50 hover:bg-slate-100 dark:bg-white/3 dark:border-white/8 dark:text-white/30 dark:hover:text-white dark:hover:border-white/20"
            }`}>
            {val}%
          </button>
        ))}
      </div>

      <ErrorMessage name="progress" component="p" className="text-red-400 text-xs mt-1.5 font-medium" />
    </div>
  );
}

/* ── PROJECT MODAL ── */
export default function ProjectModal({ open, onClose, project, onSaved }) {
  if (!open) return null;
  const isEdit = !!project;
  const attrs  = project?.attributes || project || {};

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEdit) {
        await axios.put(`${API}/projects/${project.documentId}`, { data: values }, auth());
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

      <div className="
        relative w-full max-w-lg rounded-3xl p-7
        bg-white border border-slate-200 shadow-[0_30px_80px_rgba(0,0,0,0.15)]
        dark:bg-white/5 dark:backdrop-blur-xl dark:border-white/10 dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)]
      ">
        <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-indigo-400/30 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-black text-xl text-slate-800 dark:text-white">
            {isEdit ? "Edit Project" : "New Project"}
          </h2>
          <button onClick={onClose}
            className="transition-colors text-slate-400 hover:text-slate-700 dark:text-white/30 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        <Formik
          initialValues={{
            name:        attrs.name        || "",
            description: attrs.description || "",
            budget:      attrs.budget      || "",
            deadline:    attrs.deadline    || "",
            state:       attrs.state       || "active",
            progress:    attrs.progress    ?? 0,
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">

              {[
                { name: "name",        label: "Project Name", type: "text",     placeholder: "Website Redesign" },
                { name: "description", label: "Description",  type: "textarea", placeholder: "Brief description…" },
                { name: "budget",      label: "Budget ($)",   type: "number",   placeholder: "0" },
                { name: "deadline",    label: "Deadline",     type: "date",     placeholder: "" },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-2 text-slate-500 dark:text-white/40">
                    {label}
                  </label>
                  {type === "textarea" ? (
                    <Field as="textarea" name={name} rows={3} placeholder={placeholder}
                      className={`${inputClass} resize-none`} />
                  ) : (
                    <Field type={type} name={name} placeholder={placeholder}
                      className={inputClass} />
                  )}
                  <ErrorMessage name={name} component="p" className="text-red-400 text-xs mt-1.5 font-medium" />
                </div>
              ))}

              {/* Progress */}
              <ProgressField />

              {/* Status */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-2 text-slate-500 dark:text-white/40">
                  Status
                </label>
                <div className="relative">
                  <Field as="select" name="state"
                    className={`${inputClass} appearance-none cursor-pointer`}
                    style={{ background: undefined }}>
                    {Object.entries(STATUS_META).map(([val, { label }]) => (
                      <option key={val} value={val} className="bg-white dark:bg-[#0d0d2b]">
                        {label}
                      </option>
                    ))}
                  </Field>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-white/30" />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className="
                    flex-1 py-3 rounded-xl text-sm font-semibold transition-all
                    bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800
                    dark:bg-white/5 dark:border-white/10 dark:text-white/55 dark:hover:text-white
                  ">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 relative py-3 rounded-xl font-bold text-white text-sm overflow-hidden group disabled:opacity-60">
                  <span className="absolute inset-0 bg-linear-to-r from-indigo-600 to-violet-600 group-hover:from-indigo-500 group-hover:to-violet-500 transition-all" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting
                      ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                      : isEdit ? "Save Changes" : "Create Project"
                    }
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