import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Plus, Search, Users, Edit2, Trash2, X,
  Mail, Phone, Globe, MapPin, DollarSign,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";

const glass = "bg-white/5 backdrop-blur-xl border border-white/10";
const API   = "http://localhost:1337/api";
const auth  = () => {
  const t = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${t}` } };
};

const AVATAR_COLORS = [
  "from-indigo-500 to-indigo-700", "from-violet-500 to-violet-700",
  "from-pink-500 to-rose-600",     "from-cyan-500 to-cyan-700",
  "from-emerald-500 to-emerald-700","from-amber-500 to-amber-700",
];

const schema = Yup.object({
  name:    Yup.string().required("Client name is required"),
  email:   Yup.string().email("Invalid email").required("Email is required"),
  phone:   Yup.string(),
  company: Yup.string(),
  website: Yup.string().url("Invalid URL").nullable(),
  address: Yup.string(),
  notes:   Yup.string(),
});

/* ── CLIENT MODAL ── */
function ClientModal({ open, onClose, client, onSaved }) {
  if (!open) return null;
  const isEdit = !!client;
  const attrs  = client?.attributes || client || {};

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEdit) {
        await axios.put(`${API}/clients/${client.id}`, { data: values }, auth());
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
    { name: "name",    label: "Full Name *",    type: "text",  placeholder: "Jane Smith" },
    { name: "email",   label: "Email *",        type: "email", placeholder: "jane@company.com" },
    { name: "phone",   label: "Phone",          type: "text",  placeholder: "+1 (555) 000-0000" },
    { name: "company", label: "Company",        type: "text",  placeholder: "Acme Corp" },
    { name: "website", label: "Website",        type: "text",  placeholder: "https://acme.com" },
    { name: "address", label: "Address",        type: "text",  placeholder: "New York, USA" },
    { name: "notes",   label: "Notes",          type: "textarea", placeholder: "Any notes about this client…" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto ${glass} rounded-3xl p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)]`}>
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-black text-xl">{isEdit ? "Edit Client" : "Add Client"}</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors"><X size={20} /></button>
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
                  <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-2">{label}</label>
                  {type === "textarea" ? (
                    <Field as="textarea" name={name} rows={3} placeholder={placeholder}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-violet-500/60 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.12)] transition-all resize-none" />
                  ) : (
                    <Field type={type} name={name} placeholder={placeholder}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-violet-500/60 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.12)] transition-all" />
                  )}
                  <ErrorMessage name={name} component="p" className="text-red-400 text-xs mt-1.5 font-medium" />
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className={`flex-1 py-3 rounded-xl ${glass} text-white/55 hover:text-white text-sm font-semibold transition-all`}>
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 relative py-3 rounded-xl font-bold text-white text-sm overflow-hidden group disabled:opacity-60">
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 group-hover:from-violet-500 group-hover:to-indigo-500 transition-all" />
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

/* ── CLIENT CARD ── */
function ClientCard({ client, colorIdx, onEdit, onDelete }) {
  const attrs  = client.attributes || client;
  const initials = (attrs.name || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className={`group ${glass} rounded-2xl p-5 hover:border-white/20 transition-all duration-300 relative overflow-hidden`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${AVATAR_COLORS[colorIdx % AVATAR_COLORS.length]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg relative overflow-hidden`}>
            {initials}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">{attrs.name}</p>
            {attrs.company && <p className="text-white/40 text-xs">{attrs.company}</p>}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(client)}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-violet-500/20 text-white/40 hover:text-violet-400 flex items-center justify-center transition-all">
            <Edit2 size={12} />
          </button>
          <button onClick={() => onDelete(client.id)}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 flex items-center justify-center transition-all">
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {attrs.email && (
          <div className="flex items-center gap-2 text-xs text-white/45">
            <Mail size={12} className="text-white/25 flex-shrink-0" />
            <span className="truncate">{attrs.email}</span>
          </div>
        )}
        {attrs.phone && (
          <div className="flex items-center gap-2 text-xs text-white/45">
            <Phone size={12} className="text-white/25 flex-shrink-0" />
            <span>{attrs.phone}</span>
          </div>
        )}
        {attrs.website && (
          <div className="flex items-center gap-2 text-xs text-white/45">
            <Globe size={12} className="text-white/25 flex-shrink-0" />
            <a href={attrs.website} target="_blank" rel="noopener noreferrer"
              className="truncate hover:text-indigo-400 transition-colors">{attrs.website.replace(/^https?:\/\//, "")}</a>
          </div>
        )}
        {attrs.address && (
          <div className="flex items-center gap-2 text-xs text-white/45">
            <MapPin size={12} className="text-white/25 flex-shrink-0" />
            <span className="truncate">{attrs.address}</span>
          </div>
        )}
      </div>

      {attrs.notes && (
        <p className="mt-3 pt-3 border-t border-white/[0.05] text-white/30 text-xs leading-relaxed line-clamp-2">
          {attrs.notes}
        </p>
      )}
    </div>
  );
}

/* ── CLIENTS PAGE ── */
export default function ClientsPage() {
  const [clients, setClients]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [modal, setModal]       = useState({ open: false, client: null });
  const [searchParams]          = useSearchParams();

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/clients?sort=name:asc&pagination[limit]=100`, auth());
      setClients(res.data.data || []);
    } catch { toast.error("Failed to load clients"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchClients(); }, []);
  useEffect(() => { if (searchParams.get("new") === "1") setModal({ open: true, client: null }); }, [searchParams]);

  const handleDelete = async (id) => {
    if (!confirm("Remove this client?")) return;
    try {
      await axios.delete(`${API}/clients/${id}`, auth());
      toast.success("Client removed");
      fetchClients();
    } catch { toast.error("Delete failed"); }
  };

  const filtered = clients.filter(c => {
    const attrs = c.attributes || c;
    const q = search.toLowerCase();
    return (
      (attrs.name    || "").toLowerCase().includes(q) ||
      (attrs.email   || "").toLowerCase().includes(q) ||
      (attrs.company || "").toLowerCase().includes(q)
    );
  });

  return (
    <DashboardLayout title="Clients">
      <ClientModal
        open={modal.open}
        client={modal.client}
        onClose={() => setModal({ open: false, client: null })}
        onSaved={fetchClients}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-white font-black text-2xl tracking-tight">Clients</h2>
          <p className="text-white/35 text-sm">{clients.length} total clients</p>
        </div>
        <button onClick={() => setModal({ open: true, client: null })}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-[0_4px_15px_rgba(139,92,246,0.3)]">
          <Plus size={16} /> Add Client
        </button>
      </div>

      {/* Search */}
      <div className={`flex items-center gap-2 ${glass} rounded-xl px-4 py-2.5 mb-5 max-w-sm`}>
        <Search size={14} className="text-white/25" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search clients…"
          className="bg-transparent text-white text-sm outline-none placeholder-white/25 flex-1" />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-44 bg-white/5 rounded-2xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className={`${glass} rounded-2xl p-16 text-center`}>
          <Users size={40} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/35 text-sm">No clients found</p>
          <button onClick={() => setModal({ open: true, client: null })}
            className="mt-4 text-violet-400 text-sm hover:text-violet-300 transition-colors">
            Add your first client →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c, i) => (
            <ClientCard key={c.id} client={c} colorIdx={i}
              onEdit={(cl) => setModal({ open: true, client: cl })}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}