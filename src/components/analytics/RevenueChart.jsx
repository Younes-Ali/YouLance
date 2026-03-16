import React, { useState } from 'react'
import { glass } from '../../../public/styles/PublicStyles'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import useAppStoreI from '../../store/storeInvoices';



export default function RevenueChart() {

    const [period, setPeriod] = useState("6m");
    const invoices = useAppStoreI((state) => state.invoices);
    const loading    = useAppStoreI((state) => state.loading);

    const monthlyRevenue = (() => {
    const map = {};
    invoices
      .filter(i => (i.attributes||i).state === "paid")
      .forEach(i => {
        const attrs = i.attributes || i;
        const date  = new Date(attrs.dueDate || Date.now());
        const key   = date.toLocaleString("en-US", { month: "short", year: "2-digit" });
        map[key]    = (map[key] || 0) + (attrs.amount || 0);
      });
      console.log(Object.entries(map).slice(-6).map(([month, revenue]) => ({ month, revenue })))
    return Object.entries(map).slice(-6).map(([month, revenue]) => ({ month, revenue }));
  })();
  return (
    <div className={`${glass} rounded-2xl p-6 mb-5`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-base">Monthly Revenue</h3>
              <div className="flex gap-2">
                {["3m","6m","1y"].map(p => (
                  <button key={p} onClick={() => setPeriod(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      period === p ? "bg-indigo-500/20 border border-indigo-500/30 text-indigo-300" : `${glass} text-white/30 hover:text-white`
                    }`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            {loading ? (
              <div className="h-52 bg-white/5 rounded-xl animate-pulse" />
            ) : monthlyRevenue.length === 0 ? (
              <div className="h-52 flex items-center justify-center">
                <p className="text-white/25 text-sm">No revenue data yet</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
                  <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip prefix="$" />} />
                  <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revenueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
  )
}
