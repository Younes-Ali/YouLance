import { ErrorMessage, Field } from "formik";

export default function GlassField({ label, name, type = "text", placeholder, Icon, rightSlot, extra }) {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none z-10" />
        )}
        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`
            w-full bg-white/4 backdrop-blur-sm border border-white/10 rounded-xl
            ${Icon ? "pl-10" : "px-4"} ${rightSlot ? "pr-12" : "pr-4"} py-3.5
            text-white text-sm placeholder-white/20 outline-none
            focus:border-indigo-500/60 focus:bg-white/6
            focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]
            transition-all duration-200
          `}
          {...extra}
        />
        {rightSlot}
      </div>
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-400 text-xs mt-1.5 font-medium"
      />
    </div>
  );
}