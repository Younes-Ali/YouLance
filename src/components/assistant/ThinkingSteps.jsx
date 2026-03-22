import { ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";

export default function ThinkingSteps({ steps, isDark }) {
    const [open, setOpen] = useState(false);
    if (!steps || steps.length === 0) return null;

    return (
        <div className={`rounded-2xl overflow-hidden mb-2 border transition-all
      ${isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}
    `}>
            <button
                onClick={() => setOpen(!open)}
                className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold transition-colors
          ${isDark ? "text-white/50 hover:text-white/80" : "text-slate-500 hover:text-slate-700"}
        `}
            >
                <div className="flex items-center gap-2">
                    <Sparkles size={13} className="text-indigo-400" />
                    Reasoning · {steps.length} step{steps.length > 1 ? "s" : ""}
                </div>
                <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <div className={`px-4 pb-4 space-y-2 border-t ${isDark ? "border-white/5" : "border-slate-200"}`}>
                    {steps.map((step, i) => (
                        <div key={i} className={`rounded-xl p-3 mt-3 text-xs
              ${isDark ? "bg-white/4" : "bg-white border border-slate-100"}
            `}>
                            <p className="text-indigo-400 font-semibold mb-1">🔍 {step.tool}</p>
                            <p className={`${isDark ? "text-white/50" : "text-slate-500"} mb-1`}>
                                Query: {typeof step.tool_input === "string" ? step.tool_input : JSON.stringify(step.tool_input)}
                            </p>
                            <p className="text-emerald-500 text-[11px]">✓ Result found</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}