import { glass } from "../../../public/styles/PublicStyles";

export default function Section({ title, subtitle, icon: Icon, children }) {
  return (
    <div className={`${glass} rounded-2xl overflow-hidden`}>
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/6">
        <div className="w-9 h-9 rounded-xl bg-black/15 dark:bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
          <Icon size={17} />
        </div>
        <div>
          <h3 className="text-black dark:text-white font-bold text-sm">{title}</h3>
          {subtitle && <p className="text-black/70 dark:text-white/35 text-xs">{subtitle}</p>}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}