import { CheckCircle } from "lucide-react";

export default function SuccessState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.5)]">
        <CheckCircle size={34} className="text-white" />
      </div>
      <h3 className="text-white font-black text-2xl mb-3">Message Sent! 🎉</h3>
      <p className="text-white/45 text-sm max-w-xs leading-relaxed">
        We got your message and will get back to you within 24 hours.
      </p>
      <button
        onClick={onReset}
        className="mt-8 px-6 py-3 rounded-xl border border-white/15 text-white/60 hover:text-white text-sm transition-colors"
      >
        Send Another
      </button>
    </div>
  );
}