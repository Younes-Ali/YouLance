import { Link } from "react-router-dom";
import { glass } from "../../../public/styles/PublicStyles";
import { ArrowRight } from "lucide-react";

export default function RecentInvoices({ invoices, loading }) {
  const statusStyle = {
    paid:    "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    pending: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    overdue: "text-red-400 bg-red-400/10 border-red-400/20",
  };

  return (
    <div className={`${glass} rounded-2xl overflow-hidden`}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
        <h3 className="text-white font-bold text-sm">Recent Invoices</h3>
        <Link to="/dashboard/invoices" className="text-indigo-400 text-xs hover:text-indigo-300 flex items-center gap-1 transition-colors">
          View all <ArrowRight size={12} />
        </Link>
      </div>

      {loading ? (
        <div className="p-5 space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />)}
        </div>
      ) : invoices.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-white/30 text-sm">No invoices yet</p>
        </div>
      ) : (
        <div className="divide-y divide-white/4">
          {invoices.slice(0, 5).map((inv) => {
            const attrs = inv.attributes || inv;
            const status = attrs.state || "pending";
            return (
              <div key={inv.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/3 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-white/85 text-sm font-medium">{attrs.number || `INV-${inv.id}`}</p>
                  <p className="text-white/35 text-xs truncate">{attrs.clientName || attrs.client?.data?.attributes?.name || "—"}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-white font-bold text-sm">${(attrs.amount || 0).toLocaleString()}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusStyle[status] || statusStyle.pending}`}>
                    {status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}