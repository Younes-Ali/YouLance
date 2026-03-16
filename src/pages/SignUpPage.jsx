import { useState } from "react";

import { Briefcase } from "lucide-react";
import Step1 from "../components/auth/signup/Step1";
import SuccessScreen from "../components/auth/signup/SuccessScreen";
import Step2 from "../components/auth/signup/Step2";
import Step3 from "../components/auth/signup/Step3";
import BrandPanel from "../components/auth/signup/BrandPanel";
import { glass } from "../../public/styles/PublicStyles";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [allData, setAllData] = useState({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
    role: "", experience: "",
  });

  const mergeAndNext = (values) => {
    setAllData(prev => ({ ...prev, ...values }));
    setStep(s => s + 1);
  };

  return (
    <div className="w-full h-dvh flex items-center justify-center px-4 py-10">

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-700/12 rounded-full blur-[130px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-700/12 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
      </div>

      <div className={`relative w-full max-w-5xl ${glass} rounded-3xl overflow-hidden grid grid-cols-1 ${done ? "" : "lg:grid-cols-2"} min-h-165`}>

        {/* Left brand — hidden when done */}
        {!done && (
          <div className="bg-linear-to-b from-violet-600/10 to-indigo-600/10 border-r border-white/5">
            <BrandPanel step={step} />
          </div>
        )}

        {/* Right — form or success */}
        <div className="flex flex-col justify-center px-8 md:px-12 py-12">
          {/* Mobile logo */}
          {!done && (
            <div className="flex lg:hidden items-center gap-2 mb-8">
              <Link to={"/"} className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Briefcase size={17} className="text-white" />
              </Link>
              <span className="text-white font-bold text-xl">Free<span className="text-indigo-400">Lance</span></span>
            </div>
          )}

          {done ? (
            <SuccessScreen firstName={allData.firstName} />
          ) : step === 0 ? (
            <Step1 initialValues={allData} onNext={mergeAndNext} />
          ) : step === 1 ? (
            <Step2 initialValues={allData} onNext={mergeAndNext} onBack={() => setStep(0)} />
          ) : (
            <Step3 allData={allData} onBack={() => setStep(1)} onDone={() => setDone(true)} />
          )}
        </div>
      </div>
    </div>
  );
}