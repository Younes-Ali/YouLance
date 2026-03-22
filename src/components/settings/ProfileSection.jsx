
import { Globe, Mail, Phone, User } from "lucide-react";
import  useUser  from "../../hooks/useGetUser";
import Section from "./Section";

export default function ProfileSection() {

  const { user, loading } = useUser();

  

  if (loading) return (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />
      ))}
    </div>
  );

  const info = [
    { icon: User,  label: "Username", value: user?.username },
    { icon: Mail,  label: "Email",    value: user?.email    },
    { icon: Phone, label: "Phone",    value: localStorage.getItem("phone") ||  "—" },
    { icon: Globe, label: "Bio",  value: localStorage.getItem("bio") ||  "—" },
  ];

  return (
    <Section title="Profile" subtitle="Your personal information" icon={User}>
      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/6">
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-black dark:text-white font-black text-xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">
          {user?.username?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="text-black dark:text-white font-bold text-base">{user?.username || "—"}</p>
          <p className="text-black/80 dark:text-white/40 text-xs">{user?.email || "—"}</p>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-3">
        {info.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
            <div className="w-8 h-8 rounded-xl bg-black/10 dark:bg-white/5 border border-white/8 flex items-center justify-center text-indigo-400 shrink-0">
              <Icon size={14} />
            </div>
            <div>
              <p className="text-black/70 dark:text-white/35 text-xs">{label}</p>
              <p className="text-black dark:text-white/80 text-sm font-medium">{value || "—"}</p>
            </div>
          </div>
        ))}

        {user?.bio && (
          <div className="pt-3">
            <p className="text-white/35 text-xs mb-1">Bio</p>
            <p className="text-white/70 text-sm leading-relaxed">{user.bio}</p>
          </div>
        )}
      </div>
    </Section>
  );
}