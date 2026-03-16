import React from 'react'
import { glass } from '../../../public/styles/PublicStyles'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CustomTooltip } from './CustomTooltip';
import useAppStore from '../../store/storeInvoices';


export default function InvoiceByStatus() {


    const invoices = useAppStore((state) => state.invoices);
    const loading    = useAppStore((state) => state.loading);
    const PIE_COLORS_INVOICE  = ["#10b981","#f59e0b","#ef4444","#6b7280"];

    const invoiceStatus = (() => {
    const map = { paid: 0, pending: 0, overdue: 0, draft: 0 };
    invoices.forEach(i => {
      const s = (i.attributes||i).state || "pending";
      if (s in map) map[s] += (i.attributes||i).amount || 0;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  })();

  return (
    <div className={`${glass} rounded-2xl p-6`}>
          <h3 className="text-white font-bold text-sm mb-5">Invoice Revenue</h3>
          {loading ? <div className="h-40 bg-white/5 rounded-xl animate-pulse" /> : (
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={invoiceStatus.filter(s => s.value > 0)} cx="50%" cy="50%" innerRadius={40} outerRadius={65}
                  dataKey="value" paddingAngle={3}>
                  {invoiceStatus.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS_INVOICE[i % PIE_COLORS_INVOICE.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip prefix="$" />} />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="mt-3 space-y-1.5">
            {invoiceStatus.filter(s => s.value > 0).map((s, i) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS_INVOICE[i] }} />
                  <span className="text-white/50 text-xs capitalize">{s.name}</span>
                </div>
                <span className="text-white text-xs font-bold">${s.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
  )
}
