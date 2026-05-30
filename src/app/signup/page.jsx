// components/HireLoopSignup.jsx

import SignupForm from "@/components/Signup/SignupForm";

const HireLoopSignup = () => {
  return (
    <div className="min-h-screen bg-[#08101f] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-80px] right-[-80px] w-[380px] h-[380px] bg-gradient-to-br from-violet-500/10 to-transparent rounded-full" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[380px] h-[380px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full" />

      <div className="w-full max-w-[462px] bg-[#0c1220] border border-white/10 rounded-3xl p-9 shadow-2xl">
        {/* Static Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-1.5 mb-4">
            <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-violet-400 tracking-wider">
              JOIN 50,000+ PROFESSIONALS
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            Create Account
          </h1>
          <p className="text-slate-400 text-sm">
            Start your journey to the perfect career opportunity
          </p>
        </div>

        {/* Client Form Component */}
        <SignupForm />
      </div>
    </div>
  );
};

export default HireLoopSignup;
