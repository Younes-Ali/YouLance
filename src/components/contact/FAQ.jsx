import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { glass } from "../../../public/styles/PublicStyles";

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "How quickly will I receive a response?", a: "Our support team responds within 2 business hours on weekdays, and within 24 hours on weekends. Pro and Agency users get priority responses." },
    { q: "Do you offer phone support?", a: "Currently we offer email and live chat support. Phone consultations are available for Agency plan customers upon request." },
    { q: "How do I report a bug or technical issue?", a: "You can use the contact form above and select 'Technical Support', or reach out via live chat. Include screenshots or screen recordings if possible." },
    { q: "Can I request a custom feature?", a: "Absolutely! We love hearing from users. Submit a feature request via the form and our product team reviews all submissions weekly." },
    { q: "Where can I find your documentation?", a: "Our full documentation, API references, and guides are available at docs.freelanceapp.io. It's searchable and always up to date." },
  ];

  return (
    <section className="py-20 px-6" id="help">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className={`inline-block ${glass} text-violet-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5`}>FAQ</span>
          <h2 className="text-4xl font-black text-white tracking-tight">
            Common <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">Questions</span>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className={`${glass} rounded-2xl overflow-hidden transition-all duration-300`}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group">
                <span className={`text-sm font-semibold transition-colors ${open === i ? "text-white" : "text-white/70 group-hover:text-white"}`}>{faq.q}</span>
                <ChevronDown size={16} className={`text-white/30 shrink-0 ml-4 transition-transform duration-300 ${open === i ? "rotate-180 text-indigo-400" : ""}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <div className="h-px bg-white/5 mb-4" />
                  <p className="text-white/45 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}