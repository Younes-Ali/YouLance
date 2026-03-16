import React from 'react'
import { glass } from '../../../public/styles/PublicStyles';
import { AlertCircle, CheckCircle, Clock, Edit2, FileText, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAppStore from '../../store/storeInvoices';

const STATUS_META = {
    paid: { label: "Paid", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
    pending: { label: "Pending", icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
    overdue: { label: "Overdue", icon: AlertCircle, color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
    draft: { label: "Draft", icon: FileText, color: "text-white/40", bg: "bg-white/5 border-white/10" },
};

export default function Table() {

    const filter = useAppStore(state => state.filter);
    const search = useAppStore(state => state.search);
    const invoices = useAppStore(state => state.invoices);
    const loading = useAppStore(state => state.loading);
    const setInvoices = useAppStore(state => state.setInvoices);
    const setLoading = useAppStore(state => state.setLoading);
    const setModal = useAppStore(state => state.setModal);

    const API = "http://localhost:1337/api";

    const auth = () => {
        const t = localStorage.getItem("token") || sessionStorage.getItem("token");
        return { headers: { Authorization: `Bearer ${t}` } };
    };

    const fetchInvoices = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/invoices?sort=createdAt:desc&pagination[limit]=100`, auth());
            setInvoices(res.data.data || []);
        } catch {
            toast.error("Failed to load invoices");
        } finally {
            setLoading(false);
        }
    };

    const filtered = invoices.filter(inv => {
        const attrs = inv.attributes || inv;
        const q = search.toLowerCase();

        const matchSearch =
            (attrs.number || "").toLowerCase().includes(q) ||
            (attrs.clientName || "").toLowerCase().includes(q);

        const matchFilter = filter === "all" || attrs.state === filter;

        return matchSearch && matchFilter;
    });

    const handleDelete = async (id) => {
        if (!confirm("Delete this invoice?")) return;

        try {
            await axios.delete(`${API}/invoices/${id}`, auth());
            toast.success("Invoice deleted");
            fetchInvoices();
        } catch {
            toast.error("Delete failed");
        }
    };

    return (
        <div className={`${glass} rounded-2xl overflow-x-auto`}>

            {/* Header - hidden on mobile */}
            <div className="hidden md:grid grid-cols-12 px-5 py-3 border-b border-white/6 text-white/30 text-xs font-semibold uppercase tracking-widest">
                <div className="col-span-3">Invoice</div>
                <div className="col-span-3">Client</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-2">Due Date</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1" />
            </div>

            {loading ? (
                <div className="p-5 space-y-3">
                    {[1, 2, 3, 4].map(i =>
                        <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />
                    )}
                </div>
            ) : filtered.length === 0 ? (
                <div className="p-16 text-center">
                    <FileText size={40} className="text-white/15 mx-auto mb-3" />
                    <p className="text-white/35 text-sm">No invoices found</p>
                </div>
            ) : (
                <div className="divide-y divide-white/4">

                    {filtered.map(inv => {

                        const attrs = inv.attributes || inv;
                        const meta = STATUS_META[attrs.state] || STATUS_META.draft;
                        const StatusIcon = meta.icon;

                        return (
                            <div
                                key={inv.documentId}
                                className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-0 px-4 md:px-5 py-4 hover:bg-white/3 transition-colors group"
                            >

                                {/* Invoice */}
                                <div className="text-white font-medium text-sm md:col-span-3">
                                    {attrs.number}
                                </div>

                                {/* Client */}
                                <div className="text-white/60 text-sm md:col-span-3">
                                    <span className="md:hidden text-white/40">Client: </span>
                                    {attrs.clientName || "—"}
                                </div>

                                {/* Amount */}
                                <div className="text-white font-bold text-sm md:col-span-2">
                                    <span className="md:hidden text-white/40">Amount: </span>
                                    ${(attrs.amount || 0).toLocaleString()}
                                </div>

                                {/* Due Date */}
                                <div className="text-white/40 text-xs md:col-span-2">
                                    <span className="md:hidden text-white/40">Due: </span>
                                    {attrs.dueDate
                                        ? new Date(attrs.dueDate).toLocaleDateString()
                                        : "—"}
                                </div>

                                {/* Status */}
                                <div className="md:col-span-1">
                                    <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border w-fit ${meta.bg} ${meta.color}`}>
                                        <StatusIcon size={10} />
                                        {meta.label}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 md:gap-1 md:justify-end md:col-span-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">

                                    <button
                                        onClick={() => setModal({ open: true, invoice: inv })}
                                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-white/40 hover:text-emerald-400 flex items-center justify-center transition-all"
                                    >
                                        <Edit2 size={12} />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(inv.documentId)}
                                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 flex items-center justify-center transition-all"
                                    >
                                        <Trash2 size={12} />
                                    </button>

                                </div>

                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
}