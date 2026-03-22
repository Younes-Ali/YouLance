import axios from "axios";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ChevronDown, X } from "lucide-react";

const schema = Yup.object({
    description: Yup.string().required("Description is required"),
    project: Yup.string(),
    duration: Yup.number().min(0.1, "Duration must be > 0").required("Duration is required").typeError("Must be a number"),
    date: Yup.date().required("Date is required"),
});

const API = "http://localhost:1337/api";
const auth = () => {
    const t = localStorage.getItem("token") || sessionStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${t}` } };
};

const inputClass = `
    w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all
    bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400
    focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20
    dark:bg-white/[0.04] dark:border-white/10 dark:text-white dark:placeholder-white/20
    dark:focus:border-amber-500/60 dark:focus:ring-0
`;

export default function ManualModal({ open, onClose, projects, onSaved }) {
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

            <div className="
                relative w-full max-w-md rounded-3xl p-7
                bg-white border border-slate-200 shadow-[0_30px_80px_rgba(0,0,0,0.15)]
                dark:bg-white/5 dark:backdrop-blur-xl dark:border-white/10 dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)]
            ">
                {/* top line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-amber-400/30 to-transparent" />

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-black text-xl text-slate-800 dark:text-white">
                        Manual Entry
                    </h2>
                    <button onClick={onClose}
                        className="transition-colors text-slate-400 hover:text-slate-700 dark:text-white/30 dark:hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <Formik
                    initialValues={{
                        description: "",
                        project: "",
                        duration: "",
                        date: new Date().toISOString().split("T")[0],
                    }}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">

                            {[
                                { name: "description", label: "Description", type: "text", placeholder: "What did you work on?" },
                                { name: "duration", label: "Duration (hours)", type: "number", placeholder: "1.5" },
                                { name: "date", label: "Date", type: "date", placeholder: "" },
                            ].map(({ name, label, type, placeholder }) => (
                                <div key={name}>
                                    <label className="text-xs font-semibold uppercase tracking-wider block mb-2 text-slate-500 dark:text-white/40">
                                        {label}
                                    </label>
                                    <Field type={type} name={name} placeholder={placeholder} className={inputClass} />
                                    <ErrorMessage name={name} component="p" className="text-red-400 text-xs mt-1.5 font-medium" />
                                </div>
                            ))}

                            {/* Project select */}
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider block mb-2 text-slate-500 dark:text-white/40">
                                    Project (optional)
                                </label>
                                <div className="relative">
                                    <Field as="select" name="project"
                                        className={`${inputClass} appearance-none cursor-pointer`}
                                        style={{ background: undefined }}>
                                        <option value="" className="bg-white dark:bg-[#0d0d2b]">No project</option>
                                        {projects.map(p => {
                                            const attrs = p.attributes || p;
                                            return (
                                                <option key={p.id} value={p.id} className="bg-white dark:bg-[#0d0d2b]">
                                                    {attrs.name}
                                                </option>
                                            );
                                        })}
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
                                    <span className="absolute inset-0 bg-linear-to-r from-amber-500 to-orange-500 group-hover:from-amber-400 group-hover:to-orange-400 transition-all" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        {isSubmitting
                                            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                                            : "Log Time"
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