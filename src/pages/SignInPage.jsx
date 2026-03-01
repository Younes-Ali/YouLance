import { glass } from "../../public/styles/PublicStyles";
import BrandPanel from "../components/auth/signin/BrandPanel";
import SignInFormPanel from "../components/auth/signin/SignInFormPanel";

export default function SignInPage() {
  return (
    <div className="w-full h-dvh flex justify-center items-center px-4 py-10">

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-700/12 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-violet-700/12 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
      </div>

      <div className={`relative w-full max-w-5xl ${glass} rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-150`}>
        <div className="bg-linear-to-b from-indigo-600/10 to-violet-600/10 border-r border-white/5">
          <BrandPanel />
        </div>
        <SignInFormPanel />
      </div>
    </div>
  );
}