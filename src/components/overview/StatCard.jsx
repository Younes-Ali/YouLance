import { TrendingUp } from "lucide-react";
import { glass } from "../../../public/styles/PublicStyles";

export default function StatCard({ label, value, icon: Icon, color, glow, trend, prefix = "", suffix = "", loading }) {
  return (
    <div className={`group relative ${glass} rounded-2xl p-5 overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]`}>
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 20% 30%, ${glow}, transparent 70%)` }}
      />
      <div className="relative flex items-start justify-between mb-4 flex-wrap gap-2">
        <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${color} flex items-center justify-center text-white shadow-lg`}>
          <Icon size={18} />
        </div>
        {trend !== undefined && (
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold bg-emerald-400/10 px-2 py-1 rounded-full">
            <TrendingUp size={11} /> +{trend}%
          </div>
        )}
      </div>
      <div className="relative">
        {loading ? (
          <div className="w-24 h-7 bg-white/5 rounded-lg animate-pulse mb-1" />
        ) : (
          <p className="text-white font-black text-2xl mb-0.5">{prefix}{value?.toLocaleString()}{suffix}</p>
        )}
        <p className="text-white/40 text-xs uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
}