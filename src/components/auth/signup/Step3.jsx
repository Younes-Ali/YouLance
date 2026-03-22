import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepBar from "./StepBar";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { glass } from "../../../../public/styles/PublicStyles";
import toast from "react-hot-toast";

export default function Step3({ allData, onBack, onDone }) {
  const [selected, setSelected] = useState("pro");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const plans = [
    { id: "solo",   name: "Solo",   price: "Free",    desc: "Get started, no credit card", features: ["3 Projects", "2 Clients", "Basic Invoicing"], accent: false },
    { id: "pro",    name: "Pro",    price: "$19/mo",  desc: "Most popular for freelancers", features: ["Unlimited Projects", "Smart Invoicing", "Analytics"], accent: true },
    { id: "agency", name: "Agency", price: "$49/mo",  desc: "For teams & power users",     features: ["5 Team Members", "White-label", "API Access"], accent: false },
  ];

  const handleRegister = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:1337/api/auth/local/register", {
        username: `${allData.firstName} ${allData.lastName}`.toLowerCase(),
        email: allData.email,
        password: allData.password,
      });
      toast.success("Account created! Welcome to FreeLance 🎉");
      onDone();
      setTimeout(() => navigate("/signin"), 3000);
    } catch (error) {
      toast.error(error.response?.data?.error?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  localStorage.setItem("phone", allData.phone);
  localStorage.setItem("bio", `Role: ${allData.role}, Experience: ${allData.experience} years`);

  return (
    <div>
      <StepBar step={2} />
      <h2 className="text-2xl font-black text-white tracking-tight mb-1">Choose Your Plan</h2>
      <p className="text-white/40 text-sm mb-6">Start free, upgrade anytime. No credit card required for Solo.</p>

      <div className="space-y-3 mb-7">
        {plans.map(p => (
          <button key={p.id} type="button" onClick={() => setSelected(p.id)}
            className={`w-full relative flex items-center justify-between rounded-2xl p-4 border transition-all duration-200 text-left
              ${selected === p.id
                ? p.accent
                  ? "border-indigo-500/60 bg-indigo-500/8 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  : "border-white/30 bg-white/5"
                : "border-white/8 bg-white/2 hover:border-white/18 hover:bg-white/4"}`}>
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${selected === p.id ? "border-indigo-500 bg-indigo-500" : "border-white/25"}`}>
                {selected === p.id && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white font-bold text-sm">{p.name}</span>
                  {p.accent && <span className="text-xs bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 px-2 py-0.5 rounded-full font-semibold">Popular</span>}
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {p.features.map(f => (
                    <span key={f} className="text-white/40 text-xs flex items-center gap-1">
                      <CheckCircle size={9} className="text-indigo-400/60" /> {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <span className="text-white font-black text-sm shrink-0 ml-4">{p.price}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack}
          className={`px-5 py-4 rounded-2xl ${glass} hover:bg-white/10 text-white/55 hover:text-white transition-all flex items-center gap-1.5 text-sm font-semibold`}>
          <ArrowLeft size={14} /> Back
        </button>
        <button type="button" onClick={handleRegister} disabled={loading}
          className="flex-1 relative py-4 rounded-2xl font-bold text-white text-sm overflow-hidden group disabled:opacity-60">
          <span className="absolute inset-0 bg-linear-to-r from-indigo-600 to-violet-600 group-hover:from-indigo-500 group-hover:to-violet-500 transition-all" />
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.12),transparent_70%)]" />
          <span className="relative flex items-center justify-center gap-2">
            {loading
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating Account…</>
              : <>Create My Workspace <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>
            }
          </span>
        </button>
      </div>
    </div>
  );
}