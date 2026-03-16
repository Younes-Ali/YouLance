


export const CustomTooltip = ({ active, payload, label, prefix = "", suffix = "" }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d0d2b]/95 backdrop-blur-xl border border-white/15 rounded-xl px-4 py-3 shadow-xl">
      {label && <p className="text-white/50 text-xs mb-2 font-semibold">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-bold" style={{ color: p.color }}>
          {p.name}: {prefix}{typeof p.value === "number" ? p.value.toLocaleString() : p.value}{suffix}
        </p>
      ))}
    </div>
  );
};