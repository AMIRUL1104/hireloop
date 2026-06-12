"use client";

import { useRouter } from "next/navigation";

// Plan CTA button — rendered inside each PricingCard
// popular prop drives primary vs outline styling
const ChoosePlanButton = ({ planId, label, popular }) => {
  const router = useRouter();

  const handleClick = () => {
    // TODO: check auth, redirect to checkout or dashboard billing
    console.log(`Selected plan: ${planId}`);
    router.push(`/dashboard/billing?plan=${planId}`);
  };

  return (
    <form action="/api/checkout_sessions" method="POST">
      <input type="hidden" name="plan_id" value={planId} />
      <section>
        <button
          type="submit"
          role="link"
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
            popular
              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white shadow-lg shadow-purple-500/20"
              : "bg-gray-800 border border-gray-700/50 hover:border-gray-600 text-gray-200 hover:text-white"
          }`}
        >
          {label}
        </button>
      </section>
    </form>

    // <button
    //   onClick={handleClick}
    //   className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
    //     popular
    //       ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white shadow-lg shadow-purple-500/20"
    //       : "bg-gray-800 border border-gray-700/50 hover:border-gray-600 text-gray-200 hover:text-white"
    //   }`}
    // >
    //   {label}
    // </button>
  );
};

export default ChoosePlanButton;
