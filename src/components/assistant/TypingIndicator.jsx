import { FaRobot } from "react-icons/fa6";

export default function TypingIndicator({ isDark }) {
    return (
        <div className="flex justify-start">
            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0 mr-2.5 shadow-[0_0_12px_rgba(99,102,241,0.4)]">
                <FaRobot size={14} />
            </div>
            <div className={`px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5
        ${isDark ? "bg-white/8 border border-white/10" : "bg-white border border-slate-200 shadow-sm"}
      `}>
                {[0, 150, 300].map(delay => (
                    <span key={delay}
                        className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                    />
                ))}
            </div>
        </div>
    );
}