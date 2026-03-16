import React from 'react'
import { glass } from '../../../public/styles/PublicStyles'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CustomTooltip } from './CustomTooltip';
import useAppStore from '../../store/storeAnalytics';



export default function HoursByDay() {

    const entries  = useAppStore((state) => state.entries);
    const loading    = useAppStore((state) => state.loading);
    const weeklyHours = (() => {
        const map = {};
        const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        days.forEach(d => { map[d] = 0; });
        entries.forEach(e => {
          const attrs = e.attributes || e;
          if (!attrs.date) return;
          const day = days[new Date(attrs.date + "T00:00:00").getDay()];
          map[day] += attrs.duration || 0;
        });
        return days.map(day => ({ day, hours: parseFloat(map[day].toFixed(2)) }));
      })();
      
  return (
    <div className={`${glass} rounded-2xl p-6`}>
          <h3 className="text-white font-bold text-sm mb-5">Hours by Day</h3>
          {loading ? <div className="h-40 bg-white/5 rounded-xl animate-pulse" /> : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyHours} barsize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} />
                <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} />
                <Tooltip content={<CustomTooltip suffix="h" />} />
                <Bar dataKey="hours" name="Hours" radius={[6, 6, 0, 0]}>
                  {weeklyHours.map((_, i) => (
                    <Cell key={i} fill={i === new Date().getDay() ? "#f59e0b" : "rgba(99,102,241,0.6)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
  )
}
