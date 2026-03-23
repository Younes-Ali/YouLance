import { Calendar, CheckCircle, ChevronRight, Clock, Edit2, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAppStore from '../../store/storeTask';
import { TASK_TYPES, tasksForDate } from '../../utils/taskHelpers';

const API  = "http://localhost:1337/api";
const auth = () => {
    const t = localStorage.getItem("token") || sessionStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${t}` } };
};

export default function RightTasksSidebar({ fetchData }) {

    const tasks        = useAppStore(state => state.tasks);
    const selected     = useAppStore(state => state.selected);
    const setModal     = useAppStore(state => state.setModal);
    const showSidebar  = useAppStore(state => state.showSidebar);
    const setShowSidebar = useAppStore(state => state.setShowSidebar);

    const selectedTasks = selected ? tasksForDate(tasks, selected) : [];

    const handleDelete = async (task) => {
        if (!confirm("Delete this task?")) return;
        try {
            await axios.delete(`${API}/tasks/${task.documentId || task.id}`, auth());
            toast.success("Task deleted");
            fetchData();
        } catch {
            toast.error("Delete failed");
        }
    };

    const handleToggleDone = async (task) => {
        const attrs = task.attributes || task;
        try {
            await axios.put(`${API}/tasks/${task.documentId || task.id}`, {
                data: { done: !attrs.done }
            }, auth());
            fetchData();
        } catch {
            toast.error("Update failed");
        }
    };

    return (
        <div className={`
            fixed bottom-0 left-0 right-0 z-40 rounded-t-3xl transition-transform duration-300
            lg:static lg:z-auto lg:rounded-2xl lg:w-72 lg:shrink-0 lg:translate-y-0
            ${showSidebar ? "translate-y-0" : "translate-y-full"}
            bg-white border border-slate-200 shadow-xl
            dark:bg-[#0a0a1f] dark:border-white/10
            lg:shadow-sm
        `}>

            {/* Drag handle — mobile only */}
            <div className="flex justify-center pt-3 pb-1 lg:hidden">
                <div className="w-10 h-1 rounded-full bg-black/40 dark:bg-white/20" />
            </div>

            {/* Sidebar header */}
            <div className="px-5 py-4 border-b flex items-center justify-between border-slate-100 dark:border-white/6">
                <div>
                    <h3 className="font-bold text-sm text-black dark:text-white">
                        {selected
                            ? new Date(selected + "T00:00:00").toLocaleDateString("en-US", {
                                weekday: "long",
                                month:   "short",
                                day:     "numeric",
                            })
                            : "Select a day"}
                    </h3>

                    {selected && (
                        <p className="text-xs mt-0.5 text-black/60 dark:text-white/30">
                            {selectedTasks.length} task{selectedTasks.length !== 1 ? "s" : ""}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {selected && (
                        <button
                            onClick={() => setModal({ open: true, date: selected, task: null })}
                            className="w-7 h-7 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 hover:bg-indigo-500/25 transition-all"
                        >
                            <Plus size={14} />
                        </button>
                    )}

                    {/* Close button — mobile only */}
                    <button
                        onClick={() => setShowSidebar(false)}
                        className="lg:hidden w-7 h-7 rounded-xl flex items-center justify-center border transition-all
                            bg-slate-100 border-slate-200 text-black/80 hover:text-slate-700
                            dark:bg-white/5 dark:border-white/10 dark:text-white/50 dark:hover:text-white"
                    >
                        <ChevronRight size={14} className="rotate-90" />
                    </button>
                </div>
            </div>

            {/* Tasks list */}
            <div className="overflow-y-auto max-h-[60vh] lg:max-h-150">
                {!selected ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center px-6 text-black/50 dark:text-white/25">
                        <Calendar size={30} className="mb-3 opacity-60" />
                        <p className="text-xs font-medium">Click on a day to see tasks</p>
                    </div>

                ) : selectedTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center px-6 text-black/50 dark:text-white/25">
                        <CheckCircle size={26} className="mb-3 opacity-60" />
                        <p className="text-xs mb-3 font-medium">No tasks for this day</p>
                        <button
                            onClick={() => setModal({ open: true, date: selected, task: null })}
                            className="text-indigo-500 text-xs font-semibold hover:text-indigo-600 transition-colors dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            + Add a task
                        </button>
                    </div>

                ) : (
                    <div className="p-3 space-y-2">
                        {selectedTasks.map(t => {
                            const attrs = t.attributes || t;
                            const meta  = TASK_TYPES[attrs.type] || TASK_TYPES.task;
                            const Icon  = meta.icon;

                            return (
                                <div
                                    key={t.id}
                                    className={`group rounded-xl p-3.5 border transition-all
                                        ${attrs.done
                                            ? "bg-slate-100 border-slate-200 opacity-60 dark:bg-white/2 dark:border-white/5"
                                            : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md shadow-sm dark:bg-white/5 dark:border-white/10 dark:hover:border-white/20"
                                        }`}
                                >
                                    <div className="flex items-start gap-2.5">
                                        <div className={`w-7 h-7 rounded-lg ${meta.color} flex items-center justify-center shrink-0`}>
                                            <Icon size={13} className="text-white" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-semibold truncate
                                                ${attrs.done ? "line-through opacity-50" : ""}
                                                text-slate-800 dark:text-white/85
                                            `}>
                                                {attrs.title}
                                            </p>

                                            {attrs.time && (
                                                <p className="text-[11px] flex items-center gap-1 mt-0.5 text-slate-500 dark:text-white/35">
                                                    <Clock size={10} /> {attrs.time.slice(0, 5)}
                                                </p>
                                            )}

                                            {attrs.description && (
                                                <p className="text-xs mt-1 line-clamp-2 text-slate-500 dark:text-white/35">
                                                    {attrs.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity shrink-0">
                                            <button
                                                onClick={() => handleToggleDone(t)}
                                                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all
                                                    ${attrs.done
                                                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                                                        : "bg-slate-100 text-slate-500 hover:bg-emerald-100 hover:text-emerald-600 dark:bg-white/5 dark:text-white/30 dark:hover:text-emerald-400"
                                                    }`}
                                            >
                                                <CheckCircle size={11} />
                                            </button>

                                            <button
                                                onClick={() => setModal({ open: true, date: selected, task: t })}
                                                className="w-6 h-6 rounded-lg flex items-center justify-center transition-all
                                                    bg-slate-100 text-black/60 hover:bg-indigo-100 hover:text-indigo-600
                                                    dark:bg-white/5 dark:text-white/30 dark:hover:text-indigo-400"
                                            >
                                                <Edit2 size={11} />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(t)}
                                                className="w-6 h-6 rounded-lg flex items-center justify-center transition-all
                                                    bg-slate-100 text-black/60 hover:bg-red-100 hover:text-red-600
                                                    dark:bg-white/5 dark:text-white/30 dark:hover:text-red-400"
                                            >
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
    );
}