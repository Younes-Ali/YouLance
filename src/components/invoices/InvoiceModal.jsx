import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AlertCircle, CheckCircle, ChevronDown, Clock, FileText, X } from "lucide-react";
import * as Yup from "yup";
import { glass } from "../../../public/styles/PublicStyles";
import toast from "react-hot-toast";


const API = "http://localhost:1337/api";
const auth = () => {
    const t = localStorage.getItem("token") || sessionStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${t}` } };
};


const STATUS_META = {
    paid: { label: "Paid", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
    pending: { label: "Pending", icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
    overdue: { label: "Overdue", icon: AlertCircle, color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
    draft: { label: "Draft", icon: FileText, color: "text-white/40", bg: "bg-white/5 border-white/10" },
};

const schema = Yup.object({
  number:     Yup.string().required("Invoice number is required"),
  clientName: Yup.string().required("Client name is required"),
  amount:     Yup.number().min(0).required("Amount is required").typeError("Must be a number"),
  dueDate:    Yup.date().required("Due date is required"),
  state:     Yup.string().oneOf(["paid","pending","overdue","draft"]).required(),
  notes:      Yup.string(),
});


export default function InvoiceModal({ open, onClose, invoice, onSaved }) {
  if (!open) return null;
  const isEdit = !!invoice;
  const attrs  = invoice?.attributes || invoice || {};

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEdit) {
        await axios.put(`${API}/invoices/${invoice.documentId}`, { data: values }, auth());
        toast.success("Invoice updated ✓");
      } else {
        await axios.post(`${API}/invoices`, { data: values }, auth());
        toast.success("Invoice created ✓");
      }
      onSaved();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-lg ${glass} rounded-3xl p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)]`}>
        <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-emerald-400/30 to-transparent" />

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-black text-xl">{isEdit ? "Edit Invoice" : "New Invoice"}</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white"><X size={20} /></button>
        </div>

        <Formik
          initialValues={{
            number:     attrs.number     || `INV-${Date.now().toString().slice(-4)}`,
            clientName: attrs.clientName || "",
            amount:     attrs.amount     || "",
            dueDate:    attrs.dueDate    || "",
            state:     attrs.state     || "pending",
            notes:      attrs.notes      || "",
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "number",     label: "Invoice #",     type: "text",   placeholder: "INV-0001" },
                  { name: "clientName", label: "Client Name",   type: "text",   placeholder: "Jane Smith" },
                  { name: "amount",     label: "Amount ($)",    type: "number", placeholder: "0.00" },
                  { name: "dueDate",    label: "Due Date",      type: "date",   placeholder: "" },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-2">{label}</label>
                    <Field type={type} name={name} placeholder={placeholder}
                      className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-emerald-500/60 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)] transition-all" />
                    <ErrorMessage name={name} component="p" className="text-red-400 text-xs mt-1.5 font-medium" />
                  </div>
                ))}
              </div>

              {/* Status */}
              <div>
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-2">Status</label>
                <div className="relative">
                  <Field as="select" name="state"
                    className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500/60 transition-all appearance-none cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.04)" }}>
                    {Object.entries(STATUS_META).map(([val, { label }]) => (
                      <option key={val} value={val} className="bg-[#0d0d2b]">{label}</option>
                    ))}
                  </Field>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-2">Notes</label>
                <Field as="textarea" name="notes" rows={3} placeholder="Any notes or payment terms…"
                  className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-emerald-500/60 transition-all resize-none" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className={`flex-1 py-3 rounded-xl ${glass} text-white/55 hover:text-white text-sm font-semibold transition-all`}>
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 relative py-3 rounded-xl font-bold text-white text-sm overflow-hidden group disabled:opacity-60">
                  <span className="absolute inset-0 bg-linear-to-r from-emerald-600 to-teal-600 group-hover:from-emerald-500 group-hover:to-teal-500 transition-all" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting
                      ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                      : isEdit ? "Save Changes" : "Create Invoice"
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