import { Bell, CheckCircle, Coffee, Flag, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import useAppStore from "../../store/storeAnalytics";

const TASK_TYPES = {
    meeting: { label: "Meeting", icon: Coffee, color: "bg-blue-500", light: "bg-blue-50 border-blue-200" },
    deadline: { label: "Deadline", icon: Flag, color: "bg-red-500", light: "bg-red-50 border-red-200" },
    reminder: { label: "Reminder", icon: Bell, color: "bg-amber-500", light: "bg-amber-50 border-amber-200" },
    task: { label: "Task", icon: CheckCircle, color: "bg-indigo-500", light: "bg-indigo-50 border-indigo-200" },
};

export default function NotificationBell({header=false, isDark }) {
    const tasks = useAppStore(state => state.tasks);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

    const upcoming = tasks.filter(t => {
        const attrs = t.attributes || t;
        return attrs.date === today || attrs.date === tomorrow;
    });

    /* Close on outside click */
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative" ref={ref}>
            {/* Bell button */}
            <button
                onClick={() =>{
                    if (header) return;
                    setOpen(!open)
                } }
                className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all border
          ${isDark
                        ? "bg-white/5 border-white/10 text-white/60 hover:text-white"
                        : "bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800"
                    }
        `}
            >
                <Bell size={15} />
                {upcoming.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                        {upcoming.length > 9 ? "9+" : upcoming.length}
                    </span>
                )}
            </button>

            {/* Dropdown — Desktop */}
            {open && !header && (
                <>
                    {/* Mobile overlay */}
                    <div
                        className="fixed inset-0 z-40 sm:hidden"
                        onClick={() => setOpen(false)}
                    />

                    <div className={`
            z-50 rounded-2xl border shadow-2xl overflow-hidden
            transition-all duration-200

            /* Mobile — full width bottom sheet style */
            fixed left-4 right-4 bottom-4 sm:absolute sm:left-auto sm:bottom-auto
            sm:right-0 sm:top-11 sm:w-72

            ${isDark ? "bg-[#0d0d2b] border-white/10" : "bg-white border-slate-200"}
          `}>

                        {/* Header */}
                        <div className={`px-4 py-3 border-b flex items-center justify-between
              ${isDark ? "border-white/10" : "border-slate-100"}
            `}>
                            <span className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-800"}`}>
                                Upcoming Tasks
                            </span>
                            <div className="flex items-center gap-2">
                                {upcoming.length > 0 && (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 font-semibold">
                                        {upcoming.length}
                                    </span>
                                )}
                                <button
                                    onClick={() => setOpen(false)}
                                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors sm:hidden
                    ${isDark ? "bg-white/5 text-white/40 hover:text-white" : "bg-slate-100 text-slate-400 hover:text-slate-700"}
                  `}>
                                    <X size={13} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        {upcoming.length === 0 ? (
                            <div className={`px-4 py-8 text-center ${isDark ? "text-white/30" : "text-slate-400"}`}>
                                <Bell size={24} className="mx-auto mb-2 opacity-40" />
                                <p className="text-xs">No upcoming tasks</p>
                            </div>
                        ) : (
                            <div className={`divide-y max-h-64 sm:max-h-72 overflow-y-auto
                ${isDark ? "divide-white/5" : "divide-slate-100"}
              `}>
                                {upcoming.map(t => {
                                    const attrs = t.attributes || t;
                                    const meta = TASK_TYPES[attrs.type] || TASK_TYPES.task;
                                    const Icon = meta.icon;
                                    const isToday = attrs.date === today;

                                    return (
                                        <div key={t.id}
                                            className={`flex items-start gap-3 px-4 py-3 transition-colors
                        ${isDark ? "hover:bg-white/5" : "hover:bg-slate-50"}
                      `}>
                                            <div className={`w-8 h-8 rounded-xl ${meta.color} flex items-center justify-center shrink-0 shadow-sm`}>
                                                <Icon size={14} className="text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-xs font-semibold truncate ${isDark ? "text-white/85" : "text-slate-700"}`}>
                                                    {attrs.title}
                                                </p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-md
                            ${isToday
                                                            ? "bg-indigo-500/15 text-indigo-400"
                                                            : isDark ? "bg-white/5 text-white/35" : "bg-slate-100 text-slate-400"
                                                        }
                          `}>
                                                        {isToday ? "Today" : "Tomorrow"}
                                                    </span>
                                                    {attrs.time && (
                                                        <span className={`text-[11px] flex items-center gap-1 ${isDark ? "text-white/35" : "text-slate-400"}`}>
                                                            <Bell size={9} /> {attrs.time.slice(0, 5)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Footer */}
                        <div className={`px-4 py-2.5 border-t text-center
              ${isDark ? "border-white/6" : "border-slate-100"}
            `}>
                            <p className={`text-[11px] ${isDark ? "text-white/20" : "text-slate-400"}`}>
                                Showing today & tomorrow
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}