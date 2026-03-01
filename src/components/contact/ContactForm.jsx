import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  MapPin, Clock, Send, ChevronDown, ChevronRight,
  Phone, Globe, Zap, CheckCircle,
} from "lucide-react";

/* ─── GLASS HELPER ─── */
const glass =
  "bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]";

/* ─── SUBJECTS ─── */
const SUBJECTS = [
  "General Question",
  "Billing & Pricing",
  "Technical Support",
  "Feature Request",
  "Partnership",
  "Press / Media",
];

/* ─── VALIDATION SCHEMA ─── */
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  subject: Yup.string()
    .oneOf(SUBJECTS, "Please choose a valid topic")
    .required("Subject is required"),

  message: Yup.string()
    .min(20, "Message must be at least 20 characters")
    .required("Message is required"),
});

/* ─── REUSABLE LABEL ─── */
function FieldLabel({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-2"
    >
      {children}
    </label>
  );
}

/* ─── REUSABLE ERROR ─── */
function FieldError({ name }) {
  return (
    <ErrorMessage
      name={name}
      component="p"
      className="text-red-400 text-xs mt-1.5 font-medium"
    />
  );
}

/* ─── SHARED INPUT CLASS ─── */
const inputClass = `
  w-full bg-white/[0.03] backdrop-blur-sm
  border border-white/10 rounded-xl
  px-4 py-3.5 text-white text-sm placeholder-white/25
  outline-none
  focus:border-indigo-500/60
  focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]
  transition-all duration-200
`;

/* ══════════════════════════════════════════════════════════
   SUCCESS STATE
══════════════════════════════════════════════════════════ */
function SuccessState({ onReset }) {
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

/* ══════════════════════════════════════════════════════════
   CONTACT FORM (Formik + Yup)
══════════════════════════════════════════════════════════ */
function ContactFormSection({ onSuccess }) {
  return (
    <Formik
      initialValues={{ name: "", email: "", subject: "", message: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        /* ── Replace this with your real API call ──
           e.g. await axios.post("/api/contact", values);
        ─────────────────────────────────────────── */
        setTimeout(() => {
          setSubmitting(false);
          onSuccess();
        }, 1800);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-4">

          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel htmlFor="name">Your Name</FieldLabel>
              <Field
                id="name"
                name="name"
                placeholder="Alex Rivera"
                className={`${inputClass} ${
                  touched.name && errors.name ? "border-red-500/50 focus:border-red-500/70" : ""
                }`}
              />
              <FieldError name="name" />
            </div>

            <div>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="alex@example.com"
                className={`${inputClass} ${
                  touched.email && errors.email ? "border-red-500/50 focus:border-red-500/70" : ""
                }`}
              />
              <FieldError name="email" />
            </div>
          </div>

          {/* Subject select */}
          <div>
            <FieldLabel htmlFor="subject">Subject</FieldLabel>
            <div className="relative">
              <Field
                as="select"
                id="subject"
                name="subject"
                className={`${inputClass} appearance-none cursor-pointer ${
                  touched.subject && errors.subject ? "border-red-500/50" : ""
                }`}
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <option value="" disabled className="bg-[#0d0d2b]">
                  Choose a topic…
                </option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s} className="bg-[#0d0d2b]">
                    {s}
                  </option>
                ))}
              </Field>
              <ChevronDown
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
              />
            </div>
            <FieldError name="subject" />
          </div>

          {/* Message textarea */}
          <div>
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <Field
              as="textarea"
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us how we can help you…"
              className={`${inputClass} resize-none ${
                touched.message && errors.message ? "border-red-500/50 focus:border-red-500/70" : ""
              }`}
            />
            <FieldError name="message" />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative py-4 rounded-2xl font-bold text-white text-sm overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 bg-linear-to-r from-indigo-600 to-violet-600 group-hover:from-indigo-500 group-hover:to-violet-500 transition-all duration-300" />
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.12),transparent_70%)]" />
            <span className="relative flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={15} />
                  Send Message
                </>
              )}
            </span>
          </button>

        </Form>
      )}
    </Formik>
  );
}

/* ══════════════════════════════════════════════════════════
   INFO PANEL
══════════════════════════════════════════════════════════ */
function InfoPanel() {
  const companyInfo = [
    { icon: <MapPin size={15} />, label: "Location",      val: "Remote-First · Worldwide",  color: "text-indigo-400" },
    { icon: <Clock size={15} />,  label: "Support Hours", val: "Mon–Fri, 9am–6pm UTC",      color: "text-violet-400" },
    { icon: <Globe size={15} />,  label: "Website",       val: "freelanceapp.io",            color: "text-cyan-400"   },
    { icon: <Phone size={15} />,  label: "Phone",         val: "+1 (555) 000-0000",          color: "text-emerald-400"},
  ];

  const quickLinks = ["View Documentation", "Browse FAQs", "System Status", "Community Forum"];

  return (
    <div className="lg:col-span-2 flex flex-col gap-5">

      {/* Company info card */}
      <div className={`${glass} rounded-3xl p-7 relative overflow-hidden`}>
        <div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-violet-400/20 to-transparent" />
        <h3 className="text-white font-bold text-base mb-5">Company Info</h3>
        {companyInfo.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0"
          >
            <div className={`w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center ${item.color} shrink-0`}>
              {item.icon}
            </div>
            <div>
              <p className="text-white/35 text-xs">{item.label}</p>
              <p className="text-white/80 text-sm font-medium">{item.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Response time badge */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-600/25 via-violet-600/20 to-transparent" />
        <div className="absolute inset-0 border border-indigo-500/20 rounded-2xl" />
        <div className="relative p-6 flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            <Zap size={18} />
          </div>
          <div>
            <p className="text-white font-bold text-sm mb-1">Lightning Fast Replies</p>
            <p className="text-white/45 text-xs leading-relaxed">
              95% of messages answered within 2 business hours by a real human.
            </p>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className={`${glass} rounded-2xl p-5`}>
        <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3">Quick Links</p>
        {quickLinks.map((l) => (
          <a
            key={l}
            href="#"
            className="flex items-center justify-between py-2.5 text-white/55 hover:text-white text-sm border-b border-white/5 last:border-0 transition-colors group"
          >
            {l}
            <ChevronRight
              size={13}
              className="text-white/20 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all"
            />
          </a>
        ))}
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */
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