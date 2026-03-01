import { CheckCircle } from "lucide-react";

export default function StepBar({ step }) {
  const labels = ["Account", "Profile", "Plan"];
  return (
    <div className="flex items-center gap-3 mb-8">
      {labels.map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 transition-all duration-300 ${i < step ? "opacity-100" : i === step ? "opacity-100" : "opacity-30"}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300
              ${i < step ? "bg-indigo-500 text-white" : i === step ? "bg-white/10 border border-indigo-500 text-indigo-400" : "bg-white/5 border border-white/10 text-white/30"}`}>
              {i < step ? <CheckCircle size={12} /> : i + 1}
            </div>
            <span className={`text-xs font-semibold hidden sm:block ${i === step ? "text-white" : "text-white/30"}`}>{label}</span>
          </div>
          {i < labels.length - 1 && (
            <div className={`w-8 h-px transition-all duration-300 ${i < step ? "bg-indigo-500" : "bg-white/10"}`} />
          )}
        </div>
      ))}
    </div>
  );
}