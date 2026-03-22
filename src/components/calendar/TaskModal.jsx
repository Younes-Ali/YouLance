import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { Bell, CheckCircle, Coffee, Flag, X } from "lucide-react";

const API = "http://localhost:1337/api";
const auth = () => {
    const t = localStorage.getItem("token") || sessionStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${t}` } };
};

const schema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    date: Yup.date().required("Date is required").typeError("Invalid date"),
    time: Yup.string(),
    type: Yup.string().oneOf(["task", "meeting", "deadline", "reminder"]).required(),
    project: Yup.string(),
    client: Yup.string(),
    done: Yup.boolean(),
});

const TASK_TYPES = {
    meeting: { label: "Meeting", icon: Coffee, color: "bg-blue-500", text: "text-blue-500", light: "bg-blue-50 border-blue-200" },
    deadline: { label: "Deadline", icon: Flag, color: "bg-red-500", text: "text-red-500", light: "bg-red-50 border-red-200" },
    reminder: { label: "Reminder", icon: Bell, color: "bg-amber-500", text: "text-amber-500", light: "bg-amber-50 border-amber-200" },
    task: { label: "Task", icon: CheckCircle, color: "bg-indigo-500", text: "text-indigo-500", light: "bg-indigo-50 border-indigo-200" },
};

export default function TaskModal({ open, onClose, date, task, projects, clients, onSaved, isDark }) {
    if (!open) return null;

    const isEdit = !!task;
    const attrs = task?.attributes || task || {};

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const dataToSend = {
                ...values,
                time: values.time ? `${values.time}:00.000` : null,
            };

            if (isEdit) {
                await axios.put(`${API}/tasks/${task.documentId}`, { data: dataToSend }, auth());
                toast.success("Task updated ✓");
            } else {
                await axios.post(`${API}/tasks`, { data: dataToSend }, auth());
                toast.success("Task created ✓");
            }
            onSaved();
            onClose();
        } catch (err) {
            toast.error(err.response?.data?.error?.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass = `
    w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-all
    bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400
    focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20
    dark:bg-white/[0.04] dark:border-white/10 dark:text-white dark:placeholder-white/20
    dark:focus:border-indigo-500/60 dark:focus:ring-0
  `;

    const labelClass = `text-xs font-semibold uppercase tracking-wider block mb-2 ${isDark ? "text-white/40" : "text-slate-500"}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className={`relative w-full max-w-md rounded-3xl p-7 shadow-2xl
        ${isDark ? "bg-[#0a0a1f] border border-white/10" : "bg-white border border-slate-200"}
      `}>
                <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-indigo-400/30 to-transparent" />

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className={`font-black text-xl ${isDark ? "text-white" : "text-slate-800"}`}>
                        {isEdit ? "Edit Task" : "New Task"}
                    </h2>
                    <button onClick={onClose} className={`transition-colors ${isDark ? "text-white/30 hover:text-white" : "text-slate-400 hover:text-slate-700"}`}>
                        <X size={20} />
                    </button>
                </div>

                <Formik
                    initialValues={{
                        title: attrs.title || "",
                        description: attrs.description || "",
                        date: attrs.date || date || new Date().toISOString().split("T")[0],
                        time: attrs.time ? attrs.time.slice(0, 5) : "",
                        type: attrs.type || "task",
                        project: attrs.project || "",
                        client: attrs.client || "",
                        done: attrs.done || false,
                    }}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form className="space-y-4">

                            {/* Title */}
                            <div>
                                <label className={labelClass}>Title *</label>
                                <Field name="title" placeholder="Task title…" className={inputClass} />
                                <ErrorMessage name="title" component="p" className="text-red-400 text-xs mt-1 font-medium" />
                            </div>

                            {/* Type */}
                            <div>
                                <label className={labelClass}>Type</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {Object.entries(TASK_TYPES).map(([key, meta]) => {
                                        const Icon = meta.icon;
                                        return (
                                            <button key={key} type="button"
                                                onClick={() => setFieldValue("type", key)}
                                                className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border text-xs font-semibold transition-all
                          ${values.type === key
                                                        ? `${meta.color} border-transparent text-white`
                                                        : isDark
                                                            ? "bg-white/5 border-white/10 text-white/50 hover:border-white/20"
                                                            : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                                                    }
                        `}>
                                                <Icon size={15} />
                                                {meta.label}
                                            </button>
                                        );
                                    })}
                                </div>
                                <ErrorMessage name="type" component="p" className="text-red-400 text-xs mt-1 font-medium" />
                            </div>

                            {/* Date + Time */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelClass}>Date *</label>
                                    <Field type="date" name="date" className={inputClass} />
                                    <ErrorMessage name="date" component="p" className="text-red-400 text-xs mt-1 font-medium" />
                                </div>
                                <div>
                                    <label className={labelClass}>Time (optional)</label>
                                    <Field type="time" name="time" className={inputClass} />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className={labelClass}>Description</label>
                                <Field as="textarea" name="description" rows={2}
                                    placeholder="Optional details…"
                                    className={`${inputClass} resize-none`} />
                            </div>

                            {/* Project + Client */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelClass}>Project</label>
                                    <Field as="select" name="project"
                                        className={`${inputClass} appearance-none cursor-pointer`}>
                                        <option value="" className="bg-white dark:bg-[#0d0d2b]">None</option>
                                        {projects.map(p => {
                                            const a = p.attributes || p;
                                            return <option key={p.id} value={p.id} className="bg-white dark:bg-[#0d0d2b]">{a.name}</option>;
                                        })}
                                    </Field>
                                </div>
                                <div>
                                    <label className={labelClass}>Client</label>
                                    <Field as="select" name="client"
                                        className={`${inputClass} appearance-none cursor-pointer`}>
                                        <option value="" className="bg-white dark:bg-[#0d0d2b]">None</option>
                                        {clients.map(c => {
                                            const a = c.attributes || c;
                                            return <option key={c.id} value={c.id} className="bg-white dark:bg-[#0d0d2b]">{a.name}</option>;
                                        })}
                                    </Field>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={onClose}
                                    className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all border
                    ${isDark ? "bg-white/5 border-white/10 text-white/55 hover:text-white" : "bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800"}
                  `}>
                                    Cancel
                                </button>
                                <button type="submit" disabled={isSubmitting}
                                    className="flex-1 relative py-3 rounded-xl font-bold text-white text-sm overflow-hidden group disabled:opacity-60">
                                    <span className="absolute inset-0 bg-linear-to-r from-indigo-600 to-violet-600 group-hover:from-indigo-500 group-hover:to-violet-500 transition-all" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        {isSubmitting
                                            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                                            : isEdit ? "Save Changes" : "Add Task"
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