import { Bell, BellOff, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import useAppStore from '../../store/storeTask';
import useNotifications from '../../hooks/useNotifications';
import NotificationBell from './NotificationBell';
import { TASK_TYPES, tasksForDate } from '../../utils/taskHelpers';

const DAYS   = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function LeftCalendar({ cells, year, month }) {

    const tasks          = useAppStore(state => state.tasks);
    const selected       = useAppStore(state => state.selected);
    const setSelected    = useAppStore(state => state.setSelected);
    const setModal       = useAppStore(state => state.setModal);
    const setCurrentDate = useAppStore(state => state.setCurrentDate);
    const setShowSidebar = useAppStore(state => state.setShowSidebar);
    const isDark         = useAppStore(state => state.isDark)

    const { permission, enabled, requestPermission } = useNotifications(tasks);

    const today = new Date().toISOString().split("T")[0];

    const getDateStr = (d) => {
        const dd = String(d).padStart(2, "0");
        const mm = String(month + 1).padStart(2, "0");
        return `${year}-${mm}-${dd}`;
    };

    const handleDayClick = (dateStr) => {
        setSelected(dateStr);
        setShowSidebar(true);
    };

    return (
        <div className="flex-1 min-w-0">

            {/* Header */}
            <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">

                {/* Month nav */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentDate(new Date(year, month - 1))}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-all
                            bg-white border-slate-200 text-black/60 hover:text-black/85 shadow-sm
                            dark:bg-white/5 dark:border-white/10 dark:text-white/60 dark:hover:text-white dark:shadow-none"
                    >
                        <ChevronLeft size={15} />
                    </button>

                    <h2 className="font-black text-base sm:text-xl tracking-tight text-black/85 dark:text-white">
                        {MONTHS[month]} <span className="text-indigo-500 dark:text-indigo-400">{year}</span>
                    </h2>

                    <button
                        onClick={() => setCurrentDate(new Date(year, month + 1))}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-all
                            bg-white border-slate-200 text-black/60 hover:text-black/85 shadow-sm
                            dark:bg-white/5 dark:border-white/10 dark:text-white/60 dark:hover:text-white dark:shadow-none"
                    >
                        <ChevronRight size={15} />
                    </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">

                    {/* Notification toggle */}
                    <button
                        onClick={requestPermission}
                        title={
                            permission !== "granted" ? "Enable notifications" :
                            enabled ? "Notifications on — click to pause" :
                            "Paused — click to resume"
                        }
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-all
                            ${permission === "granted" && enabled
                                ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-500 dark:text-indigo-400"
                                : "bg-white border-slate-200 text-black/70 hover:text-black/85 shadow-sm dark:bg-white/5 dark:border-white/10 dark:text-white/40 dark:hover:text-white dark:shadow-none"
                            }`}
                    >
                        {permission === "granted" && enabled ? <Bell size={14} /> : <BellOff size={14} />}
                    </button>

                    <NotificationBell />

                    {/* Today */}
                    <button
                        onClick={() => { setCurrentDate(new Date()); handleDayClick(today); }}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold border transition-all
                            bg-indigo-500/15 border-indigo-500/30 text-indigo-600 hover:bg-indigo-500/25
                            dark:text-indigo-400"
                    >
                        Today
                    </button>

                    {/* New Task */}
                    <button
                        onClick={() => setModal({ open: true, date: selected || today, task: null })}
                        className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl
                            bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500
                            text-white font-semibold text-xs transition-all shadow-[0_4px_12px_rgba(99,102,241,0.3)]"
                    >
                        <Plus size={13} />
                        <span className="hidden sm:inline">New Task</span>
                        <span className="sm:hidden">Add</span>
                    </button>
                </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
                {DAYS.map(d => (
                    <div key={d} className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider py-2
                        text-black/60 dark:text-white/25">
                        <span className="sm:hidden">{d[0]}</span>
                        <span className="hidden sm:inline">{d}</span>
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 border rounded-2xl overflow-hidden border-slate-300 dark:border-white/15">
                {cells.map((cell, idx) => {
                    const dateStr  = cell.current ? getDateStr(cell.day) : null;
                    const dayTasks = dateStr ? tasksForDate(tasks, dateStr) : [];
                    const isToday    = dateStr === today;
                    const isSelected = dateStr === selected;
                    const isWeekend  = idx % 7 === 0 || idx % 7 === 6;

                    return (
                        <div
                            key={idx}
                            onClick={() => cell.current && handleDayClick(dateStr)}
                            className={`
                                min-h-15 sm:min-h-22.5 p-1 sm:p-2
                                border-r border-b transition-all relative
                                border-slate-200 dark:border-white/8
                                ${!cell.current
                                    ? "cursor-default bg-slate-100 dark:bg-white/1"
                                    : "cursor-pointer"
                                }
                                ${isSelected
                                    ? "bg-indigo-100 dark:bg-indigo-500/10"
                                    : isWeekend && cell.current
                                        ? "bg-slate-50 hover:bg-slate-100 dark:bg-white/2 dark:hover:bg-white/5"
                                        : cell.current
                                            ? "bg-white hover:bg-slate-50 dark:bg-transparent dark:hover:bg-white/5"
                                            : ""
                                }
                            `}
                        >
                            {/* Day number */}
                            <div className="flex items-start justify-between mb-1">
                                <span className={`
                                    w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center
                                    text-[11px] sm:text-xs font-bold transition-all
                                    ${isToday
                                        ? "bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                        : cell.current
                                            ? "text-black/85 dark:text-white/80"
                                            : "text-black/35 dark:text-white/15"
                                    }
                                `}>
                                    {cell.day}
                                </span>
                            </div>

                            {/* Task indicators */}
                            <div className="space-y-0.5">

                                {/* Mobile: dots */}
                                <div className="flex gap-0.5 flex-wrap sm:hidden">
                                    {dayTasks.slice(0, 3).map((t, i) => {
                                        const attrs = t.attributes || t;
                                        const meta  = TASK_TYPES[attrs.type] || TASK_TYPES.task;
                                        return <div key={i} className={`w-1.5 h-1.5 rounded-full ${meta.color}`} />;
                                    })}
                                </div>

                                {/* Desktop: labels */}
                                <div className="hidden sm:block space-y-0.5">
                                    {dayTasks.slice(0, 2).map((t, i) => {
                                        const attrs = t.attributes || t;
                                        const meta  = TASK_TYPES[attrs.type] || TASK_TYPES.task;
                                        return (
                                            <div key={i} className={`
                                                flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold truncate border
                                                ${meta.light} ${meta.text}
                                                dark:bg-white/10 dark:border-transparent dark:text-white
                                            `}>
                                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${meta.color}`} />
                                                <span className="truncate">{attrs.done ? "✓ " : ""}{attrs.title}</span>
                                            </div>
                                        );
                                    })}
                                    {dayTasks.length > 2 && (
                                        <p className="text-[10px] px-1.5 font-medium text-black/60 dark:text-white/30">
                                            +{dayTasks.length - 2} more
                                        </p>
                                    )}
                                </div>

                                {/* Mobile: count badge */}
                                {dayTasks.length > 3 && (
                                    <p className="text-[9px] sm:hidden font-medium text-black/60 dark:text-white/30">
                                        +{dayTasks.length - 3}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}