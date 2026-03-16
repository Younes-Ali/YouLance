import React from 'react'
import { glass } from '../../../public/styles/PublicStyles'
import useAppStore from '../../store/storeAnalytics'
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function PendingInvoicesAlert() {

    const invoices = useAppStore((state) => state.invoices);
    const projects = useAppStore((state) => state.projects);
    const loading    = useAppStore((state) => state.loading);

  return (
    <div className={`${glass} rounded-2xl p-5`}>
          <h3 className="text-white font-bold text-sm mb-4">Pending Actions</h3>
          <div className="space-y-2.5">
            {invoices.filter(i => (i.attributes||i).state === "overdue").length > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/8 border border-red-500/20">
                <AlertCircle size={16} className="text-red-400 shrink-0" />
                <p className="text-white/70 text-xs">
                  <span className="text-red-400 font-bold">{invoices.filter(i => (i.attributes||i).state === "overdue").length} overdue</span> invoices need your attention
                </p>
              </div>
            )}
            {projects.filter(p => (p.attributes||p).state === "pending").length > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/8 border border-amber-500/20">
                <AlertCircle size={16} className="text-amber-400 shrink-0" />
                <p className="text-white/70 text-xs">
                  <span className="text-amber-400 font-bold">{projects.filter(p => (p.attributes||p).state === "pending").length} projects</span> awaiting approval
                </p>
              </div>
            )}
            {loading ? (
              <div className="h-10 bg-white/5 rounded-xl animate-pulse" />
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
                <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                <p className="text-white/70 text-xs">
                  <span className="text-emerald-400 font-bold">{projects.filter(p => (p.attributes||p).state === "active").length} active projects</span> are on track
                </p>
              </div>
            )}
          </div>
        </div>
  )
}
