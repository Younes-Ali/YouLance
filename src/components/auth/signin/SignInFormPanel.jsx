import { Field, Form, Formik } from "formik";
import { ArrowRight, Briefcase, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlassField from "../GlassField";
import axios from "axios";
import * as Yup from "yup";
import { glass } from "../../../../public/styles/PublicStyles";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

export default function SignInFormPanel() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: values.email,
        password: values.password,
      });

      const { jwt: token, user } = response.data;
      const store = values.rememberMe ? localStorage : sessionStorage;
      store.setItem("token", token);
      store.setItem("userId", user.id);

      toast.success("Welcome back! 👋");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.error?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center px-8 md:px-14 py-14 h-full">

      {/* Mobile logo */}
      <div className="flex lg:hidden items-center gap-2 mb-8">
        <Link to={"/"} className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
          <Briefcase size={17} className="text-white" />
        </Link>
        <span className="text-white font-bold text-xl">Free<span className="text-indigo-400">Lance</span></span>
      </div>

      {/* Heading */}
      <div className="mb-7">
        <h1 className="text-3xl font-black text-white tracking-tight mb-1.5">Welcome Back!</h1>
        <p className="text-white/40 text-sm">
          No account yet?{" "}
          <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            Register now →
          </Link>
        </p>
      </div>

      {/* Social logins */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          {
            label: "Google",
            icon: (
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            ),
          },
          {
            label: "Facebook",
            icon: (
              <svg className="w-4 h-4 shrink-0" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            ),
          },
        ].map((btn) => (
          <button key={btn.label} type="button"
            className={`flex items-center justify-center gap-2 py-3 rounded-xl ${glass} hover:bg-white/10 transition-all duration-200 text-white/65 hover:text-white text-xs font-semibold`}>
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="relative flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-white/8" />
        <span className="text-white/25 text-xs uppercase tracking-widest px-2 bg-transparent">or continue with email</span>
        <div className="flex-1 h-px bg-white/8" />
      </div>

      {/* ── Formik ── */}
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-5">

            {/* Email */}
            <GlassField
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              Icon={Mail}
            />

            {/* Password */}
            <GlassField
              label="Password"
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              Icon={Lock}
              rightSlot={
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors z-10">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  className="w-4 h-4 rounded border border-white/20 bg-white/5 accent-indigo-500 cursor-pointer transition-all"
                />
                <span className="text-white/40 group-hover:text-white/60 text-xs transition-colors">
                  Remember Me
                </span>
              </label>
              <a href="#" className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold transition-colors">
                Forgot Password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative py-4 rounded-2xl font-bold text-white text-sm overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              <span className="absolute inset-0 bg-linear-to-r from-indigo-600 to-violet-600 group-hover:from-indigo-500 group-hover:to-violet-500 transition-all duration-300" />
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.12),transparent_70%)]" />
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing In…</>
                ) : (
                  <>Sign In <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </span>
            </button>

          </Form>
        )}
      </Formik>

      <p className="text-white/20 text-xs text-center mt-6">
        By signing in you agree to our{" "}
        <a href="#" className="text-white/35 hover:text-white/60 transition-colors">Terms</a>
        {" & "}
        <a href="#" className="text-white/35 hover:text-white/60 transition-colors">Privacy Policy</a>
      </p>
    </div>
  );
}
