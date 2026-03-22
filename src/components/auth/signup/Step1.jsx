import { Form, Formik } from "formik";
import StepBar from "./StepBar";
import { Link } from "react-router-dom";
import GlassField from "../GlassField";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import * as Yup from "yup";
import { useState } from "react";
import { glass } from "../../../../public/styles/PublicStyles";

const step1Schema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords don't match")
    .required("Please confirm your password"),
});

export default function Step1({ initialValues, onNext }) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strengthOf = (pwd) => {
    if (!pwd) return 0;
    if (pwd.length < 6) return 1;
    if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return 3;
    return 2;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={step1Schema}
      onSubmit={(values) => onNext(values)}
    >
      {({ values }) => {
        const str = strengthOf(values.password);
        const strMeta = [
          null,
          { label: "Weak",   color: "bg-red-500",     text: "text-red-400" },
          { label: "Good",   color: "bg-amber-500",   text: "text-amber-400" },
          { label: "Strong", color: "bg-emerald-500", text: "text-emerald-400" },
        ];

        return (
          <Form className="flex flex-col gap-4">
            <StepBar step={0} />
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight mb-1">Create Your Account</h2>
              <p className="text-white/40 text-sm mb-6">
                Already have one?{" "}
                <Link to="/signin" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Sign in →</Link>
              </p>
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Google", icon: <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
                { label: "Facebook", icon: <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
              ].map(b => (
                <button key={b.label} type="button"
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl ${glass} hover:bg-white/10 transition-all text-white/65 hover:text-white text-xs font-semibold`}>
                  {b.icon} {b.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-white/25 text-xs uppercase tracking-widest">or with email</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <GlassField label="First Name" name="firstName" placeholder="Alex" Icon={User} />
              <GlassField label="Last Name" name="lastName" placeholder="Rivera" />
            </div>

            <GlassField label="Email Address" name="email" type="email" placeholder="alex@example.com" Icon={Mail} />
            <GlassField label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 123-4567" Icon={Phone} />

            {/* Password with strength */}
            <div>
              <GlassField
                label="Password"
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Min. 8 characters"
                Icon={Lock}
                rightSlot={
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors z-10">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              />
              {values.password && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= str ? strMeta[str].color : "bg-white/10"}`} />
                    ))}
                  </div>
                  <span className={`text-xs font-semibold ${strMeta[str].text}`}>{strMeta[str].label}</span>
                </div>
              )}
            </div>

            <GlassField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat your password"
              Icon={Lock}
              rightSlot={
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors z-10">
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />

            <button type="submit"
              className="w-full relative mt-1 py-4 rounded-2xl font-bold text-white text-sm overflow-hidden group">
              <span className="absolute inset-0 bg-linear-to-r from-indigo-600 to-violet-600 group-hover:from-indigo-500 group-hover:to-violet-500 transition-all" />
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.12),transparent_70%)]" />
              <span className="relative flex items-center justify-center gap-2">
                Continue <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <p className="text-white/20 text-xs text-center">
              By continuing you agree to our{" "}
              <a href="#" className="text-white/35 hover:text-white/60 transition-colors">Terms</a> &{" "}
              <a href="#" className="text-white/35 hover:text-white/60 transition-colors">Privacy</a>
            </p>
          </Form>
        );
      }}
    </Formik>
  );
}
