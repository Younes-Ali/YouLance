import { useState } from "react";
import { User, Palette, HelpCircle, Users2, Info } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { glass } from "../../public/styles/PublicStyles";
import ProfileSection from "../components/settings/ProfileSection";
import AppearanceSection from "../components/settings/AppearanceSection";
import HelpSection from "../components/settings/HelpSection";
import FollowSection from "../components/settings/FollowSection";
import AboutSection from "../components/settings/AboutSection";


export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile",    label: "Profile",        icon: User        },
    { id: "appearance", label: "Appearance",     icon: Palette     },
    { id: "help",       label: "Help & Feedback", icon: HelpCircle  },
    { id: "follow",     label: "Follow Us",      icon: Users2      },
    { id: "about",      label: "About",          icon: Info        },
  ];

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-3xl mx-auto">

        {/* Tab bar */}
        <div className={`${glass} rounded-2xl p-1.5 flex gap-1 mb-6 overflow-x-auto`}>
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex-1 justify-center ${
                activeTab === id
                  ? "bg-black/20 dark:bg-white/10 text-black dark:text-white border border-white/15"
                  : "text-black/80 dark:text-white/40 hover:text-black/90 dark:hover:text-white/70"
              }`}>
              <Icon size={15} />
              <span className="hidden sm:block">{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === "profile"    && <ProfileSection    />}
          {activeTab === "appearance" && <AppearanceSection />}
          {activeTab === "help"       && <HelpSection       />}
          {activeTab === "follow"     && <FollowSection     />}
          {activeTab === "about"      && <AboutSection      />}
        </div>

      </div>
    </DashboardLayout>
  );
}