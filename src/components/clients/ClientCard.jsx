import { Edit2, Globe, Mail, MapPin, Phone, Trash2 } from "lucide-react";
import { glass } from "../../../public/styles/PublicStyles";


const AVATAR_COLORS = [
  "from-indigo-500 to-indigo-700", "from-violet-500 to-violet-700",
  "from-pink-500 to-rose-600",     "from-cyan-500 to-cyan-700",
  "from-emerald-500 to-emerald-700","from-amber-500 to-amber-700",
];

export default function ClientCard({ client, colorIdx, onEdit, onDelete }) {
 
  const attrs  = client.attributes || client;
  const initials = (attrs.name || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className={`group ${glass} rounded-2xl p-5 hover:border-white/20 transition-all duration-300 relative overflow-hidden`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-2xl bg-linear-to-br ${AVATAR_COLORS[colorIdx % AVATAR_COLORS.length]} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg relative overflow-hidden`}>
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
          <button onClick={() => onDelete(client.documentId)}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 flex items-center justify-center transition-all">
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {attrs.email && (
          <div className="flex items-center gap-2 text-xs text-white/45">
            <Mail size={12} className="text-white/25 shrink-0" />
            <span className="truncate">{attrs.email}</span>
          </div>
        )}
        {attrs.phone && (
          <div className="flex items-center gap-2 text-xs text-white/45">
            <Phone size={12} className="text-white/25 shrink-0" />
            <span>{attrs.phone}</span>
          </div>
        )}
        {attrs.website && (
          <div className="flex items-center gap-2 text-xs text-white/45">
            <Globe size={12} className="text-white/25 shrink-0" />
            <a href={attrs.website} target="_blank" rel="noopener noreferrer"
              className="truncate hover:text-indigo-400 transition-colors">{attrs.website.replace(/^https?:\/\//, "")}</a>
          </div>
        )}
        {attrs.address && (
          <div className="flex items-center gap-2 text-xs text-white/45">
            <MapPin size={12} className="text-white/25 shrink-0" />
            <span className="truncate">{attrs.address}</span>
          </div>
        )}
      </div>

      {attrs.notes && (
        <p className="mt-3 pt-3 border-t border-white/5 text-white/30 text-xs leading-relaxed line-clamp-2">
          {attrs.notes}
        </p>
      )}
    </div>
  );
}