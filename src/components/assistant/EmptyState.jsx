import { FaRobot } from "react-icons/fa6";

export default function EmptyState({ isDark, onSuggest }) {
    const suggestions = [
        "How many active projects do I have?",
        "What's my total revenue this month?",
        "List all my clients",
        "Which invoices are overdue?",
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                <FaRobot size={28} className="text-white" />
            </div>
            <h3 className={`font-black text-xl mb-2 tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                Your AI Assistant
            </h3>
            <p className={`text-sm mb-8 max-w-xs leading-relaxed ${isDark ? "text-white/40" : "text-slate-400"}`}>
                Ask me anything about your projects, clients, invoices, or time entries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                {suggestions.map(s => (
                    <button key={s} onClick={() => onSuggest(s)}
                        className={`text-left px-4 py-3 rounded-xl text-xs font-medium transition-all border
              ${isDark
                                ? "bg-white/5 border-white/10 text-white/55 hover:bg-white/10 hover:text-white hover:border-white/20"
                                : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-white hover:border-indigo-300 hover:text-indigo-600 shadow-sm"
                            }
            `}>
                        {s}
                    </button>
                ))}
            </div>
        </div>
    );
}