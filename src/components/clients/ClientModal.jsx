import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { X } from "lucide-react";
import * as Yup from "yup";
import toast from "react-hot-toast";

const schema = Yup.object({
  name:    Yup.string().required("Client name is required"),
  email:   Yup.string().email("Invalid email").required("Email is required"),
  phone:   Yup.string(),
  company: Yup.string(),
  website: Yup.string().url("Invalid URL").nullable(),
  address: Yup.string(),
  notes:   Yup.string(),
});

const API  = "http://localhost:1337/api";
const auth = () => {
  const t = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${t}` } };
};

const inputClass = `
  w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all
  bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400
  focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20
  dark:bg-white/[0.04] dark:border-white/10 dark:text-white dark:placeholder-white/20
  dark:focus:border-violet-500/60 dark:focus:ring-0 dark:focus:shadow-[0_0_0_3px_rgba(139,92,246,0.12)]
`;

export default function ClientModal({ open, onClose, client, onSaved }) {
  if (!open) return null;
  const isEdit = !!client;
  const attrs  = client?.attributes || client || {};

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEdit) {
        await axios.put(`${API}/clients/${client.documentId}`, { data: values }, auth());
        toast.success("Client updated ✓");
      } else {
        await axios.post(`${API}/clients`, { data: values }, auth());
        toast.success("Client added ✓");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { name: "name",    label: "Full Name *", type: "text",     placeholder: "Jane Smith"          },
    { name: "email",   label: "Email *",     type: "email",    placeholder: "jane@company.com"    },
    { name: "phone",   label: "Phone",       type: "text",     placeholder: "+1 (555) 000-0000"   },
    { name: "company", label: "Company",     type: "text",     placeholder: "Acme Corp"           },
    { name: "website", label: "Website",     type: "text",     placeholder: "https://acme.com"    },
    { name: "address", label: "Address",     type: "text",     placeholder: "New York, USA"       },
    { name: "notes",   label: "Notes",       type: "textarea", placeholder: "Any notes about this client…" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="
        relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl p-7
        bg-white border border-slate-200 shadow-[0_30px_80px_rgba(0,0,0,0.15)]
        dark:bg-white/5 dark:backdrop-blur-xl dark:border-white/10 dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)]
      ">
        {/* top line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-violet-400/30 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-black text-xl text-slate-800 dark:text-white">
            {isEdit ? "Edit Client" : "Add Client"}
          </h2>
          <button onClick={onClose}
            className="transition-colors text-slate-400 hover:text-slate-700 dark:text-white/30 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        <Formik
          initialValues={{
            name:    attrs.name    || "",
            email:   attrs.email   || "",
            phone:   attrs.phone   || "",
            company: attrs.company || "",
            website: attrs.website || "",
            address: attrs.address || "",
            notes:   attrs.notes   || "",
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {fields.map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-2 text-slate-500 dark:text-white/40">
                    {label}
                  </label>
                  {type === "textarea" ? (
                    <Field
                      as="textarea"
                      name={name}
                      rows={3}
                      placeholder={placeholder}
                      className={`${inputClass} resize-none`}
                    />
                  ) : (
                    <Field
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      className={inputClass}
                    />
                  )}
                  <ErrorMessage
                    name={name}
                    component="p"
                    className="text-red-400 text-xs mt-1.5 font-medium"
                  />
                </div>
              ))}

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="
                    flex-1 py-3 rounded-xl text-sm font-semibold transition-all
                    bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800
                    dark:bg-white/5 dark:border-white/10 dark:text-white/55 dark:hover:text-white
                  ">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 relative py-3 rounded-xl font-bold text-white text-sm overflow-hidden group disabled:opacity-60">
                  <span className="absolute inset-0 bg-linear-to-r from-violet-600 to-indigo-600 group-hover:from-violet-500 group-hover:to-indigo-500 transition-all" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting
                      ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                      : isEdit ? "Save Changes" : "Add Client"
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