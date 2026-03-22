import { AlertCircle, CheckCircle, Clock, Edit2, FolderKanban, Pause, Trash2 } from "lucide-react";
import { glass } from "../../../public/styles/PublicStyles";
import axios from "axios";
import toast from "react-hot-toast";
import useAppStore from "../../store/storeProjects";

const STATUS_META = {
    active: { label: "Active", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
    completed: { label: "Completed", icon: CheckCircle, color: "text-indigo-400", bg: "bg-indigo-400/10 border-indigo-400/20" },
    paused: { label: "Paused", icon: Pause, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
    pending: { label: "Pending", icon: AlertCircle, color: "text-white/40", bg: "bg-white/5 border-white/10" },
};

const API = "http://localhost:1337/api";
const auth = () => {
    const t = localStorage.getItem("token") || sessionStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${t}` } };
};

export default function Grid() {


    const loading = useAppStore((state) => state.loading);
    const setModal = useAppStore((state) => state.setModal);
    const projects = useAppStore((state) => state.projects);
    const search = useAppStore((state) => state.search);
    const filter = useAppStore((state) => state.filter);
    const setProjects = useAppStore((state) => state.setProjects);
    const setLoading = useAppStore((state) => state.setLoading);




    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/projects?sort=createdAt:desc&pagination[limit]=100&populate=*`, auth());
            setProjects(res.data.data || []);
        } catch { toast.error("Failed to load projects"); }
        finally { setLoading(false); }
    };


    const filtered = projects.filter(p => {
        const attrs = p.attributes || p;
        const matchSearch = (attrs.name || "").toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "all" || attrs.state === filter;
        return matchSearch && matchFilter;
    });

    const handleDelete = async (id) => {
        if (!confirm("Delete this project?")) return;
        try {
            await axios.delete(`${API}/projects/${id}`, auth());
            toast.success("Project deleted");
            fetchProjects();
        } catch { toast.error("Delete failed"); }
    };


    return (
        <>
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-44 bg-black/15 dark:bg-white/5 rounded-2xl animate-pulse" />)}
                </div>
            ) : filtered.length === 0 ? (
                <div className={`${glass} rounded-2xl p-16 text-center`}>
                    <FolderKanban size={40} className="text-black/30 dark:text-white/15 mx-auto mb-3" />
                    <p className="text-black/70 dark:text-white/35 text-sm">No projects found</p>
                    <button onClick={() => setModal({ open: true, project: null })}
                        className="mt-4 text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
                        Create your first project →
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map(p => {
                        const attrs = p.attributes || p;
                        const meta = STATUS_META[attrs.state] || STATUS_META.pending;
                        const progress = attrs.progress ?? 0;
                        return (
                            <div key={p.id} className={`group ${glass} rounded-2xl p-5 hover:border-white/20 transition-all duration-300 relative overflow-hidden`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">
                                            {(attrs.name || "P")[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-black dark:text-white font-bold text-sm">{attrs.name}</p>
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${meta.bg} ${meta.color}`}>
                                                {meta.label}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => setModal({ open: true, project: p })}
                                            className="w-7 h-7 rounded-lg bg-black/15 dark:bg-white/5 hover:bg-indigo-500/20 text-black/70 dark:text-white/40 hover:text-indigo-400 flex items-center justify-center transition-all">
                                            <Edit2 size={12} />
                                        </button>
                                        <button onClick={() => handleDelete(p.id)}
                                            className="w-7 h-7 rounded-lg bg-black/15 dark:bg-white/5 hover:bg-red-500/20 text-black/70 dark:text-white/40 hover:text-red-400 flex items-center justify-center transition-all">
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>

                                {attrs.description && (
                                    <p className="text-black/75 dark:text-white/35 text-xs leading-relaxed mb-4 line-clamp-2">{attrs.description}</p>
                                )}

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-black/80 dark:text-white/40">
                                        <span>Progress</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="h-1.5 bg-black/12 dark:bg-white/8 rounded-full overflow-hidden">
                                        <div className="h-full bg-linear-to-r from-indigo-500 to-violet-600 rounded-full"
                                            style={{ width: `${progress}%` }} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                    {attrs.budget && (
                                        <span className="text-black/70 dark:text-white/50 text-xs font-medium">${Number(attrs.budget).toLocaleString()}</span>
                                    )}
                                    {attrs.deadline && (
                                        <span className="text-black/60 dark:text-white/30 text-xs flex items-center gap-1">
                                            <Clock size={10} /> {new Date(attrs.deadline).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    )
}
