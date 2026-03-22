import React, { useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import useAppStoreI from '../../store/storeInvoices';
import useAppStore from '../../store/storeAnalytics';

export default function RevenueChart() {
  const [period, setPeriod] = useState("6m");
  const invoices = useAppStoreI((state) => state.invoices);
  const loading  = useAppStoreI((state) => state.loading);
  const isDark   = useAppStore((state) => state.isDark);

  const monthlyRevenue = (() => {
    const map = {};
    invoices
      .filter(i => (i.attributes || i).state === "paid")
      .forEach(i => {
        const attrs = i.attributes || i;
        const date  = new Date(attrs.dueDate || Date.now());
        const key   = date.toLocaleString("en-US", { month: "short", year: "2-digit" });
        map[key]    = (map[key] || 0) + (attrs.amount || 0);
      });
    return Object.entries(map).slice(-6).map(([month, revenue]) => ({ month, revenue }));
  })();

  /* ── Colors per theme ── */
  const gridColor   = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  const axisColor   = isDark ? "rgba(255,255,255,0.2)"  : "rgba(0,0,0,0.2)";
  const tickColor   = isDark ? "rgba(255,255,255,0.4)"  : "rgba(0,0,0,0.5)";

  return (
    <div className="
      rounded-2xl p-6 mb-5
      bg-white border border-slate-200 shadow-sm
      dark:bg-white/5 dark:backdrop-blur-xl dark:border-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
    ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-base text-slate-800 dark:text-white">
          Monthly Revenue
        </h3>
        <div className="flex gap-2">
          {["3m", "6m", "1y"].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                period === p
                  ? "bg-indigo-500/20 border border-indigo-500/30 text-indigo-500 dark:text-indigo-300"
                  : "bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-white/30 dark:hover:text-white"
              }`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="h-52 rounded-xl animate-pulse bg-slate-100 dark:bg-white/5" />
      ) : monthlyRevenue.length === 0 ? (
        <div className="h-52 flex items-center justify-center">
          <p className="text-sm text-slate-400 dark:text-white/25">No revenue data yet</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={monthlyRevenue}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={isDark ? 0.3 : 0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="month"
              stroke={axisColor}
              tick={{ fill: tickColor, fontSize: 11 }}
            />
            <YAxis
              stroke={axisColor}
              tick={{ fill: tickColor, fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip prefix="$" />} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#revenueGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}