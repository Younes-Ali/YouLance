import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import InvoiceModal from "../components/invoices/InvoiceModal";
import SummaryCards from "../components/invoices/SummaryCards";
import Header from "../components/invoices/Header";
import Table from "../components/invoices/Table";
import useAppStore from "../store/storeInvoices";

const API   = "http://localhost:1337/api";
const auth  = () => {
  const t = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${t}` } };
};

/* ── INVOICES PAGE ── */
export default function InvoicesPage() {
  const modal = useAppStore(state => state.modal);
  const setModal = useAppStore(state => state.setModal);
  const setInvoices = useAppStore(state => state.setInvoices);
  const setLoading = useAppStore(state => state.setLoading);
  const [searchParams]          = useSearchParams();

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/invoices?sort=createdAt:desc&pagination[limit]=100`, auth());
      setInvoices(res.data.data || []);
    } catch { toast.error("Failed to load invoices"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchInvoices(); }, []);
  useEffect(() => { if (searchParams.get("new") === "1") setModal({ open: true, invoice: null }); }, [searchParams]);

  return (
    <DashboardLayout title="Invoices">
      <InvoiceModal
        open={modal.open}
        invoice={modal.invoice}
        onClose={() => setModal({ open: false, invoice: null })}
        onSaved={fetchInvoices}
      />
      {/* Summary cards */}
      <SummaryCards/>

      {/* Header */}
      <Header/>

      {/* Table */}
      <Table/>
      
    </DashboardLayout>
  );
}