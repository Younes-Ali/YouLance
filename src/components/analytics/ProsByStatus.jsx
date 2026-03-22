import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CustomTooltip } from './CustomTooltip';
import useAppStore from '../../store/storeAnalytics';

export default function ProsByStatus() {
  const projects = useAppStore((state) => state.projects);
  const loading  = useAppStore((state) => state.loading);
  const isDark   = useAppStore((state) => state.isDark);

  const PIE_COLORS = ["#6366f1", "#22d3ee", "#f59e0b", "#e879f9"];

  const projectStatus = (() => {
    const map = {};
    projects.forEach(p => {
      const s = (p.attributes || p).state || "pending";
      map[s]  = (map[s] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  })();

  return (
    <div className="
      rounded-2xl p-6
      bg-white border border-slate-200 shadow-sm
      dark:bg-white/5 dark:backdrop-blur-xl dark:border-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
    ">
      <h3 className="font-bold text-sm mb-5 text-slate-800 dark:text-white">
        Projects by Status
      </h3>

      {loading ? (
        <div className="h-40 rounded-xl animate-pulse bg-slate-100 dark:bg-white/5" />
      ) : projectStatus.length === 0 ? (
        <div className="h-40 flex items-center justify-center">
          <p className="text-sm text-slate-400 dark:text-white/25">No projects yet</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={projectStatus}
              cx="50%" cy="50%"
              innerRadius={40} outerRadius={65}
              dataKey="value"
              paddingAngle={3}
            >
              {projectStatus.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      )}

      {/* Legend */}
      <div className="mt-3 space-y-1.5">
        {projectStatus.map((s, i) => (
          <div key={s.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
              />
              <span className="text-xs capitalize text-slate-500 dark:text-white/50">
                {s.name}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-white">
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}