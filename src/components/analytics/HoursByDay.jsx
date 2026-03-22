import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CustomTooltip } from './CustomTooltip';
import useAppStore from '../../store/storeAnalytics';

export default function HoursByDay() {
  const entries = useAppStore((state) => state.entries);
  const loading = useAppStore((state) => state.loading);
  const isDark  = useAppStore((state) => state.isDark);

  const weeklyHours = (() => {
    const map  = {};
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    days.forEach(d => { map[d] = 0; });
    entries.forEach(e => {
      const attrs = e.attributes || e;
      if (!attrs.date) return;
      const day = days[new Date(attrs.date + "T00:00:00").getDay()];
      map[day] += attrs.duration || 0;
    });
    return days.map(day => ({ day, hours: parseFloat(map[day].toFixed(2)) }));
  })();

  const gridColor = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)";
  const axisColor = isDark ? "rgba(255,255,255,0.2)"  : "rgba(0,0,0,0.2)";
  const tickColor = isDark ? "rgba(255,255,255,0.4)"  : "rgba(0,0,0,0.5)";
  const barColor  = isDark ? "rgba(99,102,241,0.6)"   : "rgba(99,102,241,0.4)";

  return (
    <div className="
      rounded-2xl p-6
      bg-white border border-slate-200 shadow-sm
      dark:bg-white/5 dark:backdrop-blur-xl dark:border-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
    ">
      <h3 className="font-bold text-sm mb-5 text-slate-800 dark:text-white">
        Hours by Day
      </h3>

      {loading ? (
        <div className="h-40 rounded-xl animate-pulse bg-slate-100 dark:bg-white/5" />
      ) : (
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weeklyHours} barSize={18}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
            <XAxis
              dataKey="day"
              stroke={axisColor}
              tick={{ fill: tickColor, fontSize: 10 }}
            />
            <YAxis
              stroke={axisColor}
              tick={{ fill: tickColor, fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip suffix="h" />} />
            <Bar dataKey="hours" name="Hours" radius={[6, 6, 0, 0]}>
              {weeklyHours.map((_, i) => (
                <Cell
                  key={i}
                  fill={i === new Date().getDay() ? "#f59e0b" : barColor}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}