import { ErrorMessage, Form, Formik } from "formik";
import { ArrowLeft, ArrowRight, BarChart, Camera, CheckCircle, Code2, Music, Palette, PenTool } from "lucide-react";
import StepBar from "./StepBar";
import * as Yup from "yup";
import { glass } from "../../../../public/styles/PublicStyles";

const step2Schema = Yup.object({
  role: Yup.string().required("Please select your role"),
  experience: Yup.string().required("Please select your experience level"),
});

export default function Step2({ initialValues, onNext, onBack }) {
  const roles = [
    { icon: <Code2 size={17} />,    label: "Developer",     color: "from-cyan-500 to-cyan-700" },
    { icon: <Palette size={17} />,  label: "Designer",      color: "from-pink-500 to-pink-700" },
    { icon: <PenTool size={17} />,  label: "Writer",        color: "from-amber-500 to-amber-700" },
    { icon: <BarChart size={17} />, label: "Marketer",      color: "from-emerald-500 to-emerald-700" },
    { icon: <Camera size={17} />,   label: "Photographer",  color: "from-violet-500 to-violet-700" },
    { icon: <Music size={17} />,    label: "Other",         color: "from-indigo-500 to-indigo-700" },
  ];
  const experience = ["Just starting", "1–2 years", "3–5 years", "5+ years"];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={step2Schema}
      onSubmit={(values) => onNext(values)}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col gap-5">
          <StepBar step={1} />
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight mb-1">Tell Us About You</h2>
            <p className="text-white/40 text-sm mb-2">We'll personalize your workspace based on your answers.</p>
          </div>

          {/* Role picker */}
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">What best describes your work?</p>
            <div className="grid grid-cols-3 gap-2.5">
              {roles.map(r => (
                <button type="button" key={r.label}
                  onClick={() => setFieldValue("role", r.label)}
                  className={`group relative flex flex-col items-center gap-2 py-4 rounded-xl border transition-all duration-200 overflow-hidden
                    ${values.role === r.label
                      ? "border-indigo-500/60 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                      : "border-white/8 bg-white/2 hover:border-white/20 hover:bg-white/5"}`}>
                  <div className={`w-9 h-9 rounded-xl bg-linear-to-br ${r.color} flex items-center justify-center text-white shadow-md`}>{r.icon}</div>
                  <span className="text-xs font-semibold text-white/65">{r.label}</span>
                  {values.role === r.label && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
                      <CheckCircle size={9} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <ErrorMessage name="role" component="p" className="text-red-400 text-xs mt-2 font-medium" />
          </div>

          {/* Experience */}
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">Years of freelance experience</p>
            <div className="grid grid-cols-2 gap-2">
              {experience.map(ex => (
                <button type="button" key={ex}
                  onClick={() => setFieldValue("experience", ex)}
                  className={`py-3 px-4 rounded-xl border text-xs font-semibold transition-all duration-200 text-left
                    ${values.experience === ex
                      ? "border-violet-500/60 bg-violet-500/10 text-white"
                      : "border-white/8 bg-white/2 text-white/50 hover:border-white/20 hover:text-white/70"}`}>
                  {ex}
                </button>
              ))}
            </div>
            <ErrorMessage name="experience" component="p" className="text-red-400 text-xs mt-2 font-medium" />
          </div>

          <div className="flex gap-3 mt-1">
            <button type="button" onClick={onBack}
              className={`px-5 py-4 rounded-2xl ${glass} hover:bg-white/10 text-white/55 hover:text-white transition-all flex items-center gap-1.5 text-sm font-semibold`}>
              <ArrowLeft size={14} /> Back
            </button>
            <button type="submit"
              className="flex-1 relative py-4 rounded-2xl font-bold text-white text-sm overflow-hidden group">
              <span className="absolute inset-0 bg-linear-to-r from-indigo-600 to-violet-600 group-hover:from-indigo-500 group-hover:to-violet-500 transition-all" />
              <span className="relative flex items-center justify-center gap-2">
                Continue <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}