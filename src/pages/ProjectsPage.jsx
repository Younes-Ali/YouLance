import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import ProjectModal from "../components/projects/ProjectModal";
import Header from "../components/projects/Header";
import Filters from "../components/projects/Filters";
import Grid from "../components/projects/Grid";
import useAppStore from "../store/storeProjects";

const API   = "http://localhost:1337/api";
const auth  = () => {
  const t = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${t}` } };
};


/* ── PROJECTS PAGE ── */
export default function ProjectsPage() {
  const modal = useAppStore((state) => state.modal);
  const setModal = useAppStore((state) => state.setModal);
  const setProjects = useAppStore((state) => state.setProjects);
  const setLoading = useAppStore((state) => state.setLoading);
  const [searchParams]            = useSearchParams();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/projects?sort=createdAt:desc&pagination[limit]=100&populate=*`, auth());
      setProjects(res.data.data || []);
    } catch { toast.error("Failed to load projects"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProjects(); }, []);
  useEffect(() => { if (searchParams.get("new") === "1") setModal({ open: true, project: null }); }, [searchParams]);

  
  return (
    <DashboardLayout title="Projects">
      <ProjectModal
        open={modal.open}
        project={modal.project}
        onClose={() => setModal({ open: false, project: null })}
        onSaved={fetchProjects}
      />

      {/* Header */}
      <Header/>

      {/* Filters */}
      <Filters/>

      {/* Grid */}
      <Grid/>
      
    </DashboardLayout>
  );
}