import { useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import useAppStore from "../store/storeAnalytics";
import RecentInvoices from "../components/overview/RecentInvoices";
import Greeting from "../components/overview/Greeting";
import StateCards from "../components/overview/StateCards";
import MainGrid from "../components/overview/MainGrid";
import PendingInvoicesAlert from "../components/overview/PendingInvoicesAlert";
import toast from "react-hot-toast";

const API   = "http://localhost:1337/api";

const authHeader = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export default function OverviewPage() {
  const invoices = useAppStore((state) => state.invoices);
  const seInvoices = useAppStore((state) => state.setInvoices);
  const setProjects = useAppStore((state) => state.setProjects);
  const setClients = useAppStore((state) => state.setClients);
  const setEntries = useAppStore((state) => state.setEntries);
  const setLoading = useAppStore((state) => state.setLoading);
  const loading    = useAppStore((state) => state.loading);
  

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [proj, inv, cli, time] = await Promise.all([
          axios.get(`${API}/projects?pagination[limit]=5&sort=createdAt:desc&populate=*`, authHeader()),
          axios.get(`${API}/invoices?pagination[limit]=5&sort=createdAt:desc&populate=*`, authHeader()),
          axios.get(`${API}/clients?pagination[limit]=100`, authHeader()),
          axios.get(`${API}/time-entries?pagination[limit]=100`, authHeader()),
        ]);
        setProjects(proj.data.data);
        seInvoices(inv.data.data);
        setClients(cli.data.data);
        setEntries(time.data.data);
      } catch (err) {
        toast.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <DashboardLayout title="Overview">
      {/* Greeting */}
      <Greeting/>

      {/* Stat cards */}
      <StateCards/>
      

      {/* Main grid */}
      <MainGrid/>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RecentInvoices invoices={invoices} loading={loading} />

        {/* Pending invoices alert */}
        <PendingInvoicesAlert/>
        
      </div>
    </DashboardLayout>
  );
}