import { useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import useAppStore from "../store/storeTask";
import TaskModal from "../components/calendar/TaskModal";
import LeftCalendar from "../components/calendar/LeftCalendar";
import RightTasksSidebar from "../components/calendar/RightTasksSidebar";

const API  = "http://localhost:1337/api";
const auth = () => {
    const t = localStorage.getItem("token") || sessionStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${t}` } };
};

export default function CalendarPage() {
    const isDark       = useAppStore(state => state.isDark);
    const setLoading   = useAppStore(state => state.setLoading);
    const setTasks     = useAppStore(state => state.setTasks);
    const currentDate  = useAppStore(state => state.currentDate);
    const projects     = useAppStore(state => state.projects);
    const setProjects  = useAppStore(state => state.setProjects);
    const clients      = useAppStore(state => state.clients);
    const setClients   = useAppStore(state => state.setClients);
    const modal        = useAppStore(state => state.modal);
    const setModal     = useAppStore(state => state.setModal);
    const showSidebar  = useAppStore(state => state.showSidebar);
    const setShowSidebar = useAppStore(state => state.setShowSidebar);

    // ─── Fetch ────────────────────────────────────────────────────────────────
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [tasksRes, projRes, cliRes] = await Promise.all([
                axios.get(`${API}/tasks?pagination[limit]=200&sort=date:asc`, auth()),
                axios.get(`${API}/projects?pagination[limit]=100`, auth()),
                axios.get(`${API}/clients?pagination[limit]=100`, auth()),
            ]);
            setTasks(tasksRes.data.data   || []);
            setProjects(projRes.data.data || []);
            setClients(cliRes.data.data   || []);
        } catch (err) {
            toast.error("Failed to load data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    // ─── Build calendar cells ─────────────────────────────────────────────────
    const year      = currentDate.getFullYear();
    const month     = currentDate.getMonth();
    const firstDay  = new Date(year, month, 1).getDay();
    const daysCount = new Date(year, month + 1, 0).getDate();
    const prevDays  = new Date(year, month, 0).getDate();

    const cells = [];
    for (let i = firstDay - 1; i >= 0; i--)  cells.push({ day: prevDays - i, current: false });
    for (let d = 1; d <= daysCount; d++)       cells.push({ day: d,           current: true  });
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++)       cells.push({ day: d,           current: false });

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
                <LeftCalendar
                    cells={cells}
                    year={year}
                    month={month}
                />

                {/* ══ RIGHT: Tasks sidebar ══ */}
                <RightTasksSidebar fetchData={fetchData} />
            </div>
        </DashboardLayout>
    );
}