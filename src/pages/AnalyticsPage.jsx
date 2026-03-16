import { useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import useAppStore from "../store/storeAnalytics";
import toast from "react-hot-toast";
import KPIs from "../components/analytics/KPIs";
import RevenueChart from "../components/analytics/RevenueChart";
import ProsByStatus from "../components/analytics/ProsByStatus";
import InvoiceByStatus from "../components/analytics/InvoiceByStatus";
import HoursByDay from "../components/analytics/HoursByDay";

const API   = "http://localhost:1337/api";
const auth  = () => {
  const t = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${t}` } };
};

export default function AnalyticsPage() {
  const setData = useAppStore((state) => state.setData);
  const setLoading = useAppStore((state) => state.setLoading);
  

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const [inv, proj, cli, time] = await Promise.all([
          axios.get(`${API}/invoices?pagination[limit]=200&sort=createdAt:asc`, auth()),
          axios.get(`${API}/projects?pagination[limit]=100`, auth()),
          axios.get(`${API}/clients?pagination[limit]=100`, auth()),
          axios.get(`${API}/time-entries?pagination[limit]=200&sort=date:asc`, auth()),
        ]);
        setData({
          invoices: inv.data.data  || [],
          projects: proj.data.data || [],
          clients:  cli.data.data  || [],
          entries:  time.data.data || [],
        });
      } catch (err) { toast.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  return (
    <DashboardLayout title="Analytics">
      {/* KPIs */}
      <KPIs/>

      {/* Revenue area chart */}
      <RevenueChart/>

      {/* Bottom grid: pie charts + bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Projects by status */}
        <ProsByStatus/>

        {/* Invoice amounts by status */}
        <InvoiceByStatus/>

        {/* Hours by day */}
        <HoursByDay/>
      </div>
    </DashboardLayout>
  );
}

