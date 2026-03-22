import { Check, Moon, Palette, Sun } from "lucide-react";
import { useState } from "react";
import Section from "./Section";
import useAppStore from "../../store/storeAnalytics";

export default function AppearanceSection() {

    const isDark = useAppStore(state => state.isDark);
    const setIsDark = useAppStore(state => state.setIsDark);

    const [accent, setAccent] = useState("indigo");

    const theme = isDark ? "dark" : "light";
    const setTheme = (val) => setIsDark(val === "dark");

    const themes = [
        { id: "dark", label: "Dark", icon: Moon },
        { id: "light", label: "Light", icon: Sun },
    ];

    const accents = [
        { id: "indigo", color: "bg-indigo-500", label: "Indigo" },
        { id: "violet", color: "bg-violet-500", label: "Violet" },
        { id: "cyan", color: "bg-cyan-500", label: "Cyan" },
        { id: "emerald", color: "bg-emerald-500", label: "Emerald" },
        { id: "amber", color: "bg-amber-500", label: "Amber" },
        { id: "rose", color: "bg-rose-500", label: "Rose" },
    ];

    return (
        <Section title="Appearance" subtitle="Customize how FreeLance looks" icon={Palette}>
            {/* Theme */}
            <div className="mb-6">
                <p className="text-black/80 dark:text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">Theme</p>
                <div className="grid grid-cols-3 gap-3">
                    {themes.map(({ id, label, icon: Icon }) => (
                        <button key={id} onClick={() => setTheme(id)}
                            className={`flex flex-col items-center gap-2 py-4 rounded-xl border transition-all duration-200 ${theme === id
                                    ? "border-indigo-500/60 bg-indigo-500/10 text-black dark:text-white"
                                    : "border-white/8 bg-white/2 text-black/80 dark:text-white/40 hover:border-black dark:hover:border-white/20 hover:text-black dark:hover:text-white/70"
                                }`}>
                            <Icon size={20} />
                            <span className="text-xs font-semibold">{label}</span>
                            {theme === id && <Check size={12} className="text-indigo-400" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Accent color */}
            <div>
                <p className="text-black/80 dark:text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">Accent Color</p>
                <div className="flex gap-3 flex-wrap">
                    {accents.map(({ id, color, label }) => (
                        <button key={id} onClick={() => setAccent(id)}
                            title={label}
                            className={`relative w-9 h-9 rounded-xl ${color} transition-all duration-200 ${accent === id
                                    ? "ring-2 ring-white/60 ring-offset-2 ring-offset-[#050510] scale-110"
                                    : "hover:scale-105 opacity-70 hover:opacity-100"
                                }`}>
                            {accent === id && (
                                <Check size={14} className="absolute inset-0 m-auto text-white" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </Section>
    );
}