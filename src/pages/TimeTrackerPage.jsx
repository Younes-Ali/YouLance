import { useEffect, useState } from "react";
import useUser from "../hooks/useGetUser";

import axios from "axios";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import ManualModal from "../components/timeTracker/ManualModal";
import { LiveTimer } from "../components/timeTracker/LiveTimer";
import EntriesList from "../components/timeTracker/EntriesList";
import { glass } from "../../public/styles/PublicStyles";
import useAppStore from "../store/storeEntries";

const API   = "http://localhost:1337/api";

const auth  = () => {
  const t = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${t}` } };
};


/* ── TIME TRACKER PAGE ── */
export default function TimeTrackerPage() {
  
  const entries = useAppStore(state => state.entries);
  const setEntries = useAppStore(state => state.setEntries);
  const loading = useAppStore(state => state.loading);
  const setLoading = useAppStore(state => state.setLoading);
  const manualOpen = useAppStore(state => state.manualOpen);
  const setManualOpen = useAppStore(state => state.setManualOpen);


  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [entriesRes, projRes] = await Promise.all([
        axios.get(`${API}/time-entries?sort=date:desc&pagination[limit]=100`, auth()),
        axios.get(`${API}/projects`, auth()),
      ]);
      setEntries(entriesRes.data.data || []);
      setProjects(projRes.data.data || []);
    } catch { toast.error("Failed to load data"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this entry?")) return;
    try {
      await axios.delete(`${API}/time-entries/${id}`, auth());
      toast.success("Entry deleted");
      fetchData();
    } catch { toast.error("Delete failed"); }
  };

  
  return (
    <DashboardLayout title="Time Tracker">
      <ManualModal open={manualOpen} onClose={() => setManualOpen(false)} projects={projects} onSaved={fetchData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: live timer + summary */}
        <div className="space-y-4">
          <LiveTimer projects={projects} />

          {/* Summary */}
          

          <button onClick={() => setManualOpen(true)}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl ${glass} text-black/80 dark:text-white/55 hover:text-black dark:hover:text-white hover:bg-white/8 text-sm font-semibold transition-all border-dashed`}>
            <Plus size={15} /> Manual Entry
          </button>
        </div>

        {/* Right: entries list */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-black dark:text-white font-bold text-base">Time Entries</h3>
            <span className="text-black/60 dark:text-white/30 text-xs">{entries.length} entries</span>
          </div>
          <EntriesList entries={entries} loading={loading} onDelete={handleDelete} />
        </div>
      </div>
    </DashboardLayout>
  );
}