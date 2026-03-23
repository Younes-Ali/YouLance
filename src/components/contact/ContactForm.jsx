import { useState } from "react";
import InfoPanel from "./InfoPanel";
import SuccessState from "./SuccessState";
import ContactFormSection from "./ContactFormSection";
import { glass } from "../../../public/styles/PublicStyles";


export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* ── Form card ── */}
        <div className={`lg:col-span-3 ${glass} rounded-3xl p-8 relative overflow-hidden`}>
          <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-indigo-400/30 to-transparent" />

          {sent ? (
            <SuccessState onReset={() => setSent(false)} />
          ) : (
            <>
              <h2 className="text-white font-black text-2xl mb-1">Send Us a Message</h2>
              <p className="text-white/40 text-sm mb-7">Fill out the form and we'll respond promptly.</p>
              <ContactFormSection onSuccess={() => setSent(true)} />
            </>
          )}
        </div>

        {/* ── Info panel ── */}
        <InfoPanel />

      </div>
    </section>
  );
}