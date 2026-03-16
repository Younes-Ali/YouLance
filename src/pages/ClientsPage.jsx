import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import useAppStore from "../store/storeClients";
import ClientModal from "../components/clients/ClientModal";
import toast from "react-hot-toast";
import Header from "../components/clients/Header";
import SearchClient from "../components/clients/SearchClient";
import GridClient from "../components/clients/GridClient";

const API   = "http://localhost:1337/api";
const auth  = () => {
  const t = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${t}` } };
};

/* ── CLIENTS PAGE ── */
export default function ClientsPage() {
  const setClients = useAppStore((state) => state.setClients);
  const setLoading = useAppStore((state) => state.setLoading);
  const modal      = useAppStore((state) => state.modal);
  const setModal   = useAppStore((state) => state.setModal);
  const search     = useAppStore((state) => state.search);
  const [searchParams]          = useSearchParams();

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/clients?sort=name:asc&pagination[limit]=100`, auth());
      setClients(res.data.data || []);
    } catch { toast.error("Failed to load clients"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchClients(); }, []);
  useEffect(() => { if (searchParams.get("new") === "1") setModal({ open: true, client: null }); }, [searchParams]);

  return (
    <DashboardLayout title="Clients">
      <ClientModal
        open={modal.open}
        client={modal.client}
        onClose={() => setModal({ open: false, client: null })}
        onSaved={fetchClients}
      />

      {/* Header */}
      <Header/>

      {/* Search */}
      <SearchClient/>

      {/* Grid */}
      <GridClient/>
    </DashboardLayout>
  );
}