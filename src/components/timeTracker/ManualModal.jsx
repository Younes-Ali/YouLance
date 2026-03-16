import axios from "axios";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { glass } from "../../../public/styles/PublicStyles";
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
                                { name: "description", label: "Description", type: "text", placeholder: "What did you work on?" },
                                { name: "duration", label: "Duration (hours)", type: "number", placeholder: "1.5" },
                                { name: "date", label: "Date", type: "date", placeholder: "" },
                            ].map(({ name, label, type, placeholder }) => (
                                <div key={name}>
                                    <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-2">{label}</label>
                                    <Field type={type} name={name} placeholder={placeholder}
                                        className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-amber-500/60 transition-all" />
                                    <ErrorMessage name={name} component="p" className="text-red-400 text-xs mt-1.5 font-medium" />
                                </div>
                            ))}

                            <div>
                                <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-2">Project (optional)</label>
                                <div className="relative">
                                    <Field as="select" name="project"
                                        className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-500/60 transition-all appearance-none cursor-pointer"
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
                                    <span className="absolute inset-0 bg-linear-to-r from-amber-500 to-orange-500 group-hover:from-amber-400 group-hover:to-orange-400 transition-all" />
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
