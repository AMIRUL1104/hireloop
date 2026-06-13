import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createSubscriptions } from "@/lib/Server/actions/subscriptions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    };
    const result = await createSubscriptions(subsInfo);
    return (
      <main className="min-h-[calc(100vh-4rem)] w-full bg-[#0E121F] flex items-center justify-center p-4 relative overflow-hidden">
        {/* 🌌 ব্যাকগ্রাউন্ড গ্লো ইফেক্ট (Premium SaaS Feel) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* 📦 সাকসেস কন্টেইনার কার্ড */}
        <div className="w-full max-w-md bg-[#161D30] border border-gray-800 rounded-2xl p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] relative z-10">
          {/* ✅ গ্লোয়িং সাকসেস চেকমার্ক (Pure SVG for Server Component) */}
          <div className="mx-auto w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(37,99,235,0.15)]">
            <svg
              className="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          {/* টাইটেল */}
          <h1 className="text-2xl font-bold tracking-tight text-white mb-3">
            Payment Successful!
          </h1>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            We appreciate your business! A confirmation email will be sent to{" "}
            <span className="text-gray-200 font-medium">{customerEmail}</span>.
          </p>

          {/* ℹ️ হেল্প বা সাপোর্ট জোন */}
          <div className="bg-[#0E121F]/60 border border-gray-800/40 rounded-xl p-4 mb-8 text-xs text-gray-400 leading-normal">
            Have any questions or facing issues? Please feel free to email us at{" "}
            <a
              href="mailto:orders@example.com"
              className="text-blue-400 hover:text-blue-300 font-medium underline transition-colors"
            >
              orders@example.com
            </a>
          </div>

          {/* 🔘 অ্যাকশন বাটন গ্রুপ */}
          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard/recruiter"
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl flex items-center justify-center shadow-[0_4px_15px_rgba(37,99,235,0.25)] active:scale-[0.98] transition-all"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/"
              className="w-full h-11 bg-transparent border border-gray-800 hover:bg-gray-900 text-gray-300 font-medium text-sm rounded-xl flex items-center justify-center active:scale-[0.98] transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
