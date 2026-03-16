import React from 'react'
import { glass } from '../../../public/styles/PublicStyles'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CustomTooltip } from './CustomTooltip';
import useAppStore from '../../store/storeAnalytics';



export default function ProsByStatus() {

    const projects = useAppStore((state) => state.projects);
    const loading    = useAppStore((state) => state.loading);
    const PIE_COLORS_PROJECT  = ["#6366f1","#22d3ee","#f59e0b","#e879f9"];

    const projectStatus = (() => {
    const map = {};
    projects.forEach(p => {
      const s = (p.attributes||p).state || "pending";
      map[s]  = (map[s] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  })();

  return (
    <div className={`${glass} rounded-2xl p-6`}>
              <h3 className="text-white font-bold text-sm mb-5">Projects by Status</h3>
              {loading ? <div className="h-40 bg-white/5 rounded-xl animate-pulse" /> : (
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={projectStatus} cx="50%" cy="50%" innerRadius={40} outerRadius={65}
                      dataKey="value" paddingAngle={3}>
                      {projectStatus.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS_PROJECT[i % PIE_COLORS_PROJECT.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="mt-3 space-y-1.5">
                {projectStatus.map((s, i) => (
                  <div key={s.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS_PROJECT[i % PIE_COLORS_PROJECT.length] }} />
                      <span className="text-white/50 text-xs capitalize">{s.name}</span>
                    </div>
                    <span className="text-white text-xs font-bold">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
  )
}
