import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
    ChevronLeft, ChevronRight, Plus, Bell, BellOff,
    Calendar, Clock, Trash2, Edit2, CheckCircle, Coffee, Flag,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import useAppStore from "../store/storeAnalytics";
import TaskModal from "../components/calendar/TaskModal";
import NotificationBell from "../components/calendar/NotificationBell";
import useNotifications from "../hooks/useNotifications";

const API = "http://localhost:1337/api";
const auth = () => {
    const t = localStorage.getItem("token") || sessionStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${t}` } };
};

const TASK_TYPES = {
    meeting: { label: "Meeting", icon: Coffee, color: "bg-blue-500", text: "text-blue-500", light: "bg-blue-50 border-blue-200" },
    deadline: { label: "Deadline", icon: Flag, color: "bg-red-500", text: "text-red-500", light: "bg-red-50 border-red-200" },
    reminder: { label: "Reminder", icon: Bell, color: "bg-amber-500", text: "text-amber-500", light: "bg-amber-50 border-amber-200" },
    task: { label: "Task", icon: CheckCircle, color: "bg-indigo-500", text: "text-indigo-500", light: "bg-indigo-50 border-indigo-200" },
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function CalendarPage() {
    const isDark = useAppStore(state => state.isDark);
    const setLoading = useAppStore(state => state.setLoading);
    const tasks = useAppStore(state => state.tasks);
    const setTasks = useAppStore(state => state.setTasks);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [selected, setSelected] = useState(null);
    const [modal, setModal] = useState({ open: false, date: null, task: null });
    const [showSidebar, setShowSidebar] = useState(false); // ← mobile sidebar toggle

    const { permission, enabled, requestPermission } = useNotifications(tasks);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [tasksRes, projRes, cliRes] = await Promise.all([
                axios.get(`${API}/tasks?pagination[limit]=200&sort=date:asc`, auth()),
                axios.get(`${API}/projects?pagination[limit]=100`, auth()),
                axios.get(`${API}/clients?pagination[limit]=100`, auth()),
            ]);
            setTasks(tasksRes.data.data || []);
            setProjects(projRes.data.data || []);
            setClients(cliRes.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysCount = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const today = new Date().toISOString().split("T")[0];

    const getDateStr = (d) => {
        const dd = String(d).padStart(2, "0");
        const mm = String(month + 1).padStart(2, "0");
        return `${year}-${mm}-${dd}`;
    };

    const tasksForDate = (dateStr) =>
        tasks.filter(t => (t.attributes || t).date === dateStr);

    const handleDelete = async (task) => {
        if (!confirm("Delete this task?")) return;
        try {
            await axios.delete(`${API}/tasks/${task.documentId || task.id}`, auth());
            toast.success("Task deleted");
            fetchData();
        } catch { toast.error("Delete failed"); }
    };

    const handleToggleDone = async (task) => {
        const attrs = task.attributes || task;
        try {
            await axios.put(`${API}/tasks/${task.documentId || task.id}`, {
                data: { done: !attrs.done }
            }, auth());
            fetchData();
        } catch { toast.error("Update failed"); }
    };

    const cells = [];
    for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: prevDays - i, current: false });
    for (let d = 1; d <= daysCount; d++)    cells.push({ day: d, current: true });
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++)    cells.push({ day: d, current: false });

    const selectedTasks = selected ? tasksForDate(selected) : [];

    const handleDayClick = (dateStr) => {
        setSelected(dateStr);
        setShowSidebar(true); // ← فتح الـ sidebar على mobile
    };

    return (
        <DashboardLayout title="Calendar">
            <TaskModal
                open={modal.open}
                onClose={() => setModal({ open: false, date: null, task: null })}
                date={modal.date}
                task={modal.task}
                projects={projects}
                clients={clients}
                onSaved={fetchData}
                isDark={isDark}
            />

            {/* Mobile sidebar overlay */}
            {showSidebar && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setShowSidebar(false)}
                />
            )}

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">

                {/* ══ LEFT: Calendar ══ */}
                <div className="flex-1 min-w-0">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                        {/* Month nav */}
                        <div className="flex items-center gap-2">
                            <button onClick={() => setCurrentDate(new Date(year, month - 1))}
                                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-all
                  ${isDark ? "bg-white/5 border-white/10 text-white/60 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:text-slate-800 shadow-sm"}
                `}>
                                <ChevronLeft size={15} />
                            </button>
                            <h2 className={`font-black text-base sm:text-xl tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                                {MONTHS[month]} <span className="text-indigo-400">{year}</span>
                            </h2>
                            <button onClick={() => setCurrentDate(new Date(year, month + 1))}
                                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-all
                  ${isDark ? "bg-white/5 border-white/10 text-white/60 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:text-slate-800 shadow-sm"}
                `}>
                                <ChevronRight size={15} />
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {/* Notification toggle */}
                            <button onClick={requestPermission}
                                title={
                                    permission !== "granted" ? "Enable notifications" :
                                        enabled ? "Notifications on — click to pause" :
                                            "Paused — click to resume"
                                }
                                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-all
                  ${permission === "granted" && enabled
                                        ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400"
                                        : isDark ? "bg-white/5 border-white/10 text-white/40 hover:text-white" : "bg-white border-slate-200 text-slate-400 hover:text-slate-700 shadow-sm"
                                    }
                `}>
                                {permission === "granted" && enabled ? <Bell size={14} /> : <BellOff size={14} />}
                            </button>

                            <NotificationBell isDark={isDark} />

                            {/* Today */}
                            <button onClick={() => { setCurrentDate(new Date()); handleDayClick(today); }}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold border transition-all bg-indigo-500/15 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/25">
                                Today
                            </button>

                            {/* New Task */}
                            <button onClick={() => setModal({ open: true, date: selected || today, task: null })}
                                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs transition-all shadow-[0_4px_12px_rgba(99,102,241,0.3)]">
                                <Plus size={13} />
                                <span className="hidden sm:inline">New Task</span>
                                <span className="sm:hidden">Add</span>
                            </button>
                        </div>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-1">
                        {DAYS.map(d => (
                            <div key={d} className={`text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider py-2 ${isDark ? "text-white/25" : "text-slate-400"}`}>
                                {/* On mobile show 1 letter only */}
                                <span className="sm:hidden">{d[0]}</span>
                                <span className="hidden sm:inline">{d}</span>
                            </div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div className={`grid grid-cols-7 border rounded-2xl overflow-hidden
            ${isDark ? "border-white/15" : "border-slate-200"}
          `}>
                        {cells.map((cell, idx) => {
                            const dateStr = cell.current ? getDateStr(cell.day) : null;
                            const dayTasks = dateStr ? tasksForDate(dateStr) : [];
                            const isToday = dateStr === today;
                            const isSelected = dateStr === selected;
                            const isWeekend = idx % 7 === 0 || idx % 7 === 6;

                            return (
                                <div key={idx}
                                    onClick={() => cell.current && handleDayClick(dateStr)}
                                    className={`
                    min-h-15 sm:min-h-22.5 p-1 sm:p-2
                    border-r border-b cursor-pointer transition-all relative
                    ${isDark ? "border-white/8" : "border-slate-100"}
                    ${!cell.current ? isDark ? "bg-white/1" : "bg-slate-50/50" : ""}
                    ${isSelected ? isDark ? "bg-indigo-500/10" : "bg-indigo-50" : ""}
                    ${isWeekend && cell.current ? isDark ? "bg-white/2" : "bg-slate-50/30" : ""}
                    ${cell.current ? isDark ? "hover:bg-white/5" : "hover:bg-slate-50" : "cursor-default"}
                  `}>

                                    {/* Day number */}
                                    <div className="flex items-start justify-between mb-1">
                                        <span className={`
                      w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center
                      text-[11px] sm:text-xs font-bold transition-all
                      ${isToday ? "bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]" : ""}
                      ${!isToday && cell.current ? isDark ? "text-white/80" : "text-slate-700" : isDark ? "text-white/15" : "text-slate-300"}
                    `}>
                                            {cell.day}
                                        </span>
                                    </div>

                                    {/* Task indicators */}
                                    <div className="space-y-0.5">
                                        {/* Mobile: dots only */}
                                        <div className="flex gap-0.5 flex-wrap sm:hidden">
                                            {dayTasks.slice(0, 3).map((t, i) => {
                                                const attrs = t.attributes || t;
                                                const meta = TASK_TYPES[attrs.type] || TASK_TYPES.task;
                                                return (
                                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${meta.color}`} />
                                                );
                                            })}
                                        </div>

                                        {/* Desktop: labels */}
                                        <div className="hidden sm:block space-y-0.5">
                                            {dayTasks.slice(0, 2).map((t, i) => {
                                                const attrs = t.attributes || t;
                                                const meta = TASK_TYPES[attrs.type] || TASK_TYPES.task;
                                                return (
                                                    <div key={i} className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium truncate
                            ${isDark ? `${meta.color} bg-opacity-20 text-white` : `${meta.light} border`}
                          `}>
                                                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${meta.color}`} />
                                                        <span className="truncate">{attrs.done ? "✓ " : ""}{attrs.title}</span>
                                                    </div>
                                                );
                                            })}
                                            {dayTasks.length > 2 && (
                                                <p className={`text-[10px] px-1.5 ${isDark ? "text-white/30" : "text-slate-400"}`}>
                                                    +{dayTasks.length - 2} more
                                                </p>
                                            )}
                                        </div>

                                        {/* Mobile: count badge */}
                                        {dayTasks.length > 3 && (
                                            <p className={`text-[9px] sm:hidden ${isDark ? "text-white/30" : "text-slate-400"}`}>
                                                +{dayTasks.length - 3}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ══ RIGHT: Tasks sidebar ══ */}
                <div className={`
                    fixed bottom-0 left-0 right-0 z-40 rounded-t-3xl transition-transform duration-300
                    lg:static lg:z-auto lg:rounded-2xl lg:w-72 lg:shrink-0 lg:translate-y-0
                    ${showSidebar ? "translate-y-0" : "translate-y-full"}
                    ${isDark ? "bg-[#0a0a1f] border border-white/10" : "bg-white border border-slate-200 shadow-xl"}
                    lg:shadow-sm
                    `}>

                    {/* Drag handle — mobile only */}
                    <div className="flex justify-center pt-3 pb-1 lg:hidden">
                        <div className={`w-10 h-1 rounded-full ${isDark ? "bg-white/20" : "bg-slate-300"}`} />
                    </div>

                    {/* Sidebar header */}
                    <div className={`px-5 py-4 border-b flex items-center justify-between
                    ${isDark ? "border-white/6" : "border-slate-100"}
                `}>
                        <div>
                            <h3 className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-800"}`}>
                                {selected
                                    ? new Date(selected + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
                                    : "Select a day"
                                }
                            </h3>
                            {selected && (
                                <p className={`text-xs mt-0.5 ${isDark ? "text-white/30" : "text-slate-400"}`}>
                                    {selectedTasks.length} task{selectedTasks.length !== 1 ? "s" : ""}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {selected && (
                                <button onClick={() => setModal({ open: true, date: selected, task: null })}
                                    className="w-7 h-7 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 hover:bg-indigo-500/25 transition-all">
                                    <Plus size={14} />
                                </button>
                            )}
                            {/* Close button — mobile only */}
                            <button onClick={() => setShowSidebar(false)}
                                className={`lg:hidden w-7 h-7 rounded-xl flex items-center justify-center border transition-all
                  ${isDark ? "bg-white/5 border-white/10 text-white/50 hover:text-white" : "bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-700"}
                `}>
                                <ChevronRight size={14} className="rotate-90" />
                            </button>
                        </div>
                    </div>

                    {/* Tasks list */}
                    <div className="overflow-y-auto max-h-[60vh] lg:max-h-150">
                        {!selected ? (
                            <div className={`flex flex-col items-center justify-center py-12 text-center px-6 ${isDark ? "text-white/25" : "text-slate-400"}`}>
                                <Calendar size={30} className="mb-3 opacity-50" />
                                <p className="text-xs">Click on a day to see tasks</p>
                            </div>
                        ) : selectedTasks.length === 0 ? (
                            <div className={`flex flex-col items-center justify-center py-12 text-center px-6 ${isDark ? "text-white/25" : "text-slate-400"}`}>
                                <CheckCircle size={26} className="mb-3 opacity-50" />
                                <p className="text-xs mb-3">No tasks for this day</p>
                                <button onClick={() => setModal({ open: true, date: selected, task: null })}
                                    className="text-indigo-400 text-xs hover:text-indigo-300 transition-colors">
                                    + Add a task
                                </button>
                            </div>
                        ) : (
                            <div className="p-3 space-y-2">
                                {selectedTasks.map(t => {
                                    const attrs = t.attributes || t;
                                    const meta = TASK_TYPES[attrs.type] || TASK_TYPES.task;
                                    const Icon = meta.icon;
                                    return (
                                        <div key={t.id}
                                            className={`group rounded-xl p-3.5 border transition-all
                        ${attrs.done
                                                    ? isDark ? "bg-white/2 border-white/5 opacity-60" : "bg-slate-50 border-slate-100 opacity-60"
                                                    : isDark ? "bg-white/5 border-white/10 hover:border-white/20" : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                                                }
                      `}>
                                            <div className="flex items-start gap-2.5">
                                                <div className={`w-7 h-7 rounded-lg ${meta.color} flex items-center justify-center shrink-0`}>
                                                    <Icon size={13} className="text-white" />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm font-semibold truncate ${attrs.done ? "line-through opacity-50" : ""} ${isDark ? "text-white/85" : "text-slate-700"}`}>
                                                        {attrs.title}
                                                    </p>
                                                    {attrs.time && (
                                                        <p className={`text-[11px] flex items-center gap-1 mt-0.5 ${isDark ? "text-white/35" : "text-slate-400"}`}>
                                                            <Clock size={10} /> {attrs.time.slice(0, 5)}
                                                        </p>
                                                    )}
                                                    {attrs.description && (
                                                        <p className={`text-xs mt-1 line-clamp-2 ${isDark ? "text-white/35" : "text-slate-400"}`}>
                                                            {attrs.description}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Actions — always visible on mobile */}
                                                <div className="flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity shrink-0">
                                                    <button onClick={() => handleToggleDone(t)}
                                                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all
                              ${attrs.done ? "bg-emerald-500/20 text-emerald-400" : isDark ? "bg-white/5 text-white/30 hover:text-emerald-400" : "bg-slate-100 text-slate-400 hover:text-emerald-500"}
                            `}>
                                                        <CheckCircle size={11} />
                                                    </button>
                                                    <button onClick={() => setModal({ open: true, date: selected, task: t })}
                                                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all
                              ${isDark ? "bg-white/5 text-white/30 hover:text-indigo-400" : "bg-slate-100 text-slate-400 hover:text-indigo-500"}
                            `}>
                                                        <Edit2 size={11} />
                                                    </button>
                                                    <button onClick={() => handleDelete(t)}
                                                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all
                              ${isDark ? "bg-white/5 text-white/30 hover:text-red-400" : "bg-slate-100 text-slate-400 hover:text-red-500"}
                            `}>
                                                        <Trash2 size={11} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}