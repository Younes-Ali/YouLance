import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Plus, Search, FileText, Edit2, Trash2, X,
  ChevronDown, DollarSign, CheckCircle, Clock, AlertCircle,
  Download, Send,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";

const glass = "bg-white/5 backdrop-blur-xl border border-white/10";
const API   = "http://localhost:1337/api";
const auth  = () => {
  const t = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${t}` } };
};

const STATUS_META = {
  paid:    { label: "Paid",    icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  pending: { label: "Pending", icon: Clock,       color: "text-amber-400",   bg: "bg-amber-400/10 border-amber-400/20"    },
  overdue: { label: "Overdue", icon: AlertCircle, color: "text-red-400",     bg: "bg-red-400/10 border-red-400/20"        },
  draft:   { label: "Draft",   icon: FileText,    color: "text-white/40",    bg: "bg-white/5 border-white/10"             },
};

const schema = Yup.object({
  number:     Yup.string().required("Invoice number is required"),
  clientName: Yup.string().required("Client name is required"),
  amount:     Yup.number().min(0).required("Amount is required").typeError("Must be a number"),
  dueDate:    Yup.date().required("Due date is required"),
  status:     Yup.string().oneOf(["paid","pending","overdue","draft"]).required(),
  notes:      Yup.string(),
});

/* ── INVOICE MODAL ── */
function InvoiceModal({ open, onClose, invoice, onSaved }) {
  if (!open) return null;
  const isEdit = !!invoice;
  const attrs  = invoice?.attributes || invoice || {};

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEdit) {
        await axios.put(`${API}/invoices/${invoice.id}`, { data: values }, auth());
        toast.success("Invoice updated ✓");
      } else {
        await axios.post(`${API}/invoices`, { data: values }, auth());
        toast.success("Invoice created ✓");
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
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

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
            status:     attrs.status     || "pending",
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
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-emerald-500/60 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)] transition-all" />
                    <ErrorMessage name={name} component="p" className="text-red-400 text-xs mt-1.5 font-medium" />
                  </div>
                ))}
              </div>

              {/* Status */}
              <div>
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-2">Status</label>
                <div className="relative">
                  <Field as="select" name="status"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500/60 transition-all appearance-none cursor-pointer"
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
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-emerald-500/60 transition-all resize-none" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className={`flex-1 py-3 rounded-xl ${glass} text-white/55 hover:text-white text-sm font-semibold transition-all`}>
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 relative py-3 rounded-xl font-bold text-white text-sm overflow-hidden group disabled:opacity-60">
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:from-emerald-500 group-hover:to-teal-500 transition-all" />
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

/* ── INVOICES PAGE ── */
export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("all");
  const [modal, setModal]       = useState({ open: false, invoice: null });
  const [searchParams]          = useSearchParams();

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/invoices?sort=createdAt:desc&pagination[limit]=100`, auth());
      setInvoices(res.data.data || []);
    } catch { toast.error("Failed to load invoices"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchInvoices(); }, []);
  useEffect(() => { if (searchParams.get("new") === "1") setModal({ open: true, invoice: null }); }, [searchParams]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this invoice?")) return;
    try {
      await axios.delete(`${API}/invoices/${id}`, auth());
      toast.success("Invoice deleted");
      fetchInvoices();
    } catch { toast.error("Delete failed"); }
  };

  const filtered = invoices.filter(inv => {
    const attrs = inv.attributes || inv;
    const q = search.toLowerCase();
    const matchSearch = (attrs.number || "").toLowerCase().includes(q) || (attrs.clientName || "").toLowerCase().includes(q);
    const matchFilter = filter === "all" || attrs.status === filter;
    return matchSearch && matchFilter;
  });

  /* Summary totals */
  const totalPaid    = invoices.filter(i => (i.attributes||i).status === "paid").reduce((s, i) => s + ((i.attributes||i).amount || 0), 0);
  const totalPending = invoices.filter(i => (i.attributes||i).status === "pending").reduce((s, i) => s + ((i.attributes||i).amount || 0), 0);
  const totalOverdue = invoices.filter(i => (i.attributes||i).status === "overdue").reduce((s, i) => s + ((i.attributes||i).amount || 0), 0);

  return (
    <DashboardLayout title="Invoices">
      <InvoiceModal
        open={modal.open}
        invoice={modal.invoice}
        onClose={() => setModal({ open: false, invoice: null })}
        onSaved={fetchInvoices}
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Paid",    amount: totalPaid,    color: "from-emerald-500 to-emerald-700", glow: "rgba(16,185,129,0.3)",  icon: CheckCircle },
          { label: "Pending",       amount: totalPending, color: "from-amber-500 to-amber-700",     glow: "rgba(245,158,11,0.3)",   icon: Clock       },
          { label: "Overdue",       amount: totalOverdue, color: "from-red-500 to-red-700",         glow: "rgba(239,68,68,0.3)",    icon: AlertCircle },
        ].map(({ label, amount, color, glow, icon: Icon }) => (
          <div key={label} className={`group relative ${glass} rounded-2xl p-5 overflow-hidden hover:border-white/20 transition-all`}>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at 20% 30%, ${glow}, transparent 70%)` }} />
            <div className="relative flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white flex-shrink-0`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider">{label}</p>
                <p className="text-white font-black text-xl">${amount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className={`flex items-center gap-2 ${glass} rounded-xl px-4 py-2.5 flex-1`}>
            <Search size={14} className="text-white/25" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search invoices…"
              className="bg-transparent text-white text-sm outline-none placeholder-white/25 flex-1" />
          </div>
          <div className="flex gap-2">
            {["all", "paid", "pending", "overdue", "draft"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  filter === f ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300" : `${glass} text-white/40 hover:text-white`
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => setModal({ open: true, invoice: null })}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm transition-all flex-shrink-0">
          <Plus size={16} /> New Invoice
        </button>
      </div>

      {/* Table */}
      <div className={`${glass} rounded-2xl overflow-hidden`}>
        <div className="grid grid-cols-12 px-5 py-3 border-b border-white/[0.06] text-white/30 text-xs font-semibold uppercase tracking-widest">
          <div className="col-span-3">Invoice</div>
          <div className="col-span-3">Client</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Due Date</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1" />
        </div>

        {loading ? (
          <div className="p-5 space-y-3">
            {[1,2,3,4].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <FileText size={40} className="text-white/15 mx-auto mb-3" />
            <p className="text-white/35 text-sm">No invoices found</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filtered.map(inv => {
              const attrs = inv.attributes || inv;
              const meta  = STATUS_META[attrs.status] || STATUS_META.draft;
              const StatusIcon = meta.icon;
              return (
                <div key={inv.id} className="grid grid-cols-12 items-center px-5 py-4 hover:bg-white/[0.03] transition-colors group">
                  <div className="col-span-3 text-white/85 text-sm font-medium">{attrs.number}</div>
                  <div className="col-span-3 text-white/55 text-sm">{attrs.clientName || "—"}</div>
                  <div className="col-span-2 text-white font-bold text-sm">${(attrs.amount || 0).toLocaleString()}</div>
                  <div className="col-span-2 text-white/40 text-xs">
                    {attrs.dueDate ? new Date(attrs.dueDate).toLocaleDateString() : "—"}
                  </div>
                  <div className="col-span-1">
                    <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border w-fit ${meta.bg} ${meta.color}`}>
                      <StatusIcon size={10} /> {meta.label}
                    </span>
                  </div>
                  <div className="col-span-1 flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setModal({ open: true, invoice: inv })}
                      className="w-7 h-7 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-white/40 hover:text-emerald-400 flex items-center justify-center transition-all">
                      <Edit2 size={12} />
                    </button>
                    <button onClick={() => handleDelete(inv.id)}
                      className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 flex items-center justify-center transition-all">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}