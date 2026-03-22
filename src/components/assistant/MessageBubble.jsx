import { FaRobot } from "react-icons/fa6";

export default function MessageBubble({ msg, isDark }) {
    const isUser = msg.role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            {/* Bot avatar */}
            {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5 shadow-[0_0_12px_rgba(99,102,241,0.4)]">
                    <FaRobot size={14} />
                </div>
            )}

            <div className={`relative max-w-[72%] min-w-15 px-4 py-3 rounded-2xl text-sm leading-relaxed
        ${isUser
                    ? "bg-linear-to-br from-indigo-600 to-violet-600 text-white rounded-tr-sm shadow-[0_4px_15px_rgba(99,102,241,0.3)]"
                    : isDark
                        ? "bg-white/8 border border-white/10 text-white/85 rounded-tl-sm"
                        : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm"
                }
      `}>
                {msg.content}
            </div>

            {/* User avatar */}
            {isUser && (
                <div className="w-8 h-8 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shrink-0 ml-2.5 mt-0.5">
                    U
                </div>
            )}
        </div>
    );
}