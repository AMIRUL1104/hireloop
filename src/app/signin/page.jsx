// components/HireLoopSignin.jsx

import SigninForm from "@/components/Signin/SigninForm";

const HireLoopSignin = () => {
  return (
    <div className="min-h-screen bg-[#08101f] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-100px] right-[-100px] w-[420px] h-[420px] bg-gradient-to-br from-violet-600/10 to-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[420px] h-[420px] bg-gradient-to-br from-blue-600/10 to-violet-600/10 rounded-full blur-3xl" />

      <div className="w-full max-w-[460px] bg-[#0c1220]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl transition-all hover:shadow-violet-500/10">
        {/* Header */}
        <div className="text-center mb-9">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-1.5 mb-5">
            <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-violet-400 tracking-wider">
              WELCOME BACK
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400 text-[15px]">
            Sign in to continue your journey
          </p>
        </div>

        {/* Client Interactive Form */}
        <SigninForm />
      </div>
    </div>
  );
};

export default HireLoopSignin;
