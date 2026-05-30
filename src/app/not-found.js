// components/NotFound.jsx
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#08101f] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />

      <div className="text-center max-w-md">
        {/* 404 Number */}
        <div className="text-[140px] font-bold text-white/10 tracking-tighter leading-none mb-4">
          404
        </div>

        <div className="space-y-4 mb-10">
          <h1 className="text-4xl font-bold text-white">Page Not Found</h1>
          <p className="text-slate-400 text-lg">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
        </div>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-violet-500/30"
        >
          ← Back to Home
        </Link>

        <div className="mt-12 text-xs text-slate-500">
          HireLoop • Job Platform
        </div>
      </div>
    </div>
  );
};

export default NotFound;
