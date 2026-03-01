import { CheckCircle } from "lucide-react";

export default function SuccessScreen({ firstName }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <div className="relative w-28 h-28 mb-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute w-3 h-3 rounded-full animate-ping"
            style={{
              background: ["#6366f1","#8b5cf6","#06b6d4","#ec4899","#10b981","#f59e0b","#6366f1","#8b5cf6"][i],
              top: `${50 + 42 * Math.sin(i * Math.PI / 4)}%`,
              left: `${50 + 42 * Math.cos(i * Math.PI / 4)}%`,
              animationDelay: `${i * 150}ms`,
              animationDuration: "1.5s",
              opacity: 0.7,
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.6)]">
            <CheckCircle size={36} className="text-white" />
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Welcome, {firstName || "Freelancer"}! 🎉</h2>
      <p className="text-white/45 text-sm max-w-xs mx-auto mb-8">Your workspace is being set up. Redirecting to your dashboard…</p>
      <div className="w-56 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500 rounded-full"
          style={{ animation: "expand 3s ease-in-out forwards" }} />
      </div>
      <style>{`@keyframes expand { from{width:0%} to{width:100%} }`}</style>
    </div>
  );
}
