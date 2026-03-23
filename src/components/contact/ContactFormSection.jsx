import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ChevronDown, Send } from "lucide-react";
import { inputClass } from "../../../public/styles/PublicStyles";
import axios from "axios";
import toast from "react-hot-toast";


function FieldError({ name }) {
    return (
        <ErrorMessage
            name={name}
            component="p"
            className="text-red-400 text-xs mt-1.5 font-medium"
        />
    );
}

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

const SUBJECTS = [
    "General Question",
    "Billing & Pricing",
    "Technical Support",
    "Feature Request",
    "Partnership",
    "Press / Media",
];

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

export default function ContactFormSection({ onSuccess }) {
    return (
        <Formik
            initialValues={{ name: "", email: "", subject: "", message: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                axios.post("http://localhost:1337/api/contacts", { data: values }).then((res) => {
                    toast.success("message sent")
                    setTimeout(() => {
                        setSubmitting(false);
                        onSuccess();
                    }, 1800);
                }).catch((err) => {
                    toast.error("failed to send message !!")
                })
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
                                className={`${inputClass} ${touched.name && errors.name ? "border-red-500/50 focus:border-red-500/70" : ""
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
                                className={`${inputClass} ${touched.email && errors.email ? "border-red-500/50 focus:border-red-500/70" : ""
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
                                className={`${inputClass} appearance-none cursor-pointer ${touched.subject && errors.subject ? "border-red-500/50" : ""
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
                            className={`${inputClass} resize-none ${touched.message && errors.message ? "border-red-500/50 focus:border-red-500/70" : ""
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