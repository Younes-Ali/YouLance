import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../store/storeAnalytics";
import toast from "react-hot-toast";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";


export default function DashboardLayout({ children, title = "Dashboard" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const isDark   = useAppStore(state => state.isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.background =
        "radial-gradient(ellipse at 10% 10%, #0d0d2b 0%, #050510 50%, #000000 100%)";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.background = "#727279";
    }
  }, [isDark]);

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    toast.error("Sign in first");
    navigate("/signin");
  }

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-transparent transition-colors duration-300">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        <Topbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}