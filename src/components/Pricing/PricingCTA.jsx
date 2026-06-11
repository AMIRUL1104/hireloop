import GetStartedButton from "./GetStartedButton";
import ViewJobsButton from "./ViewJobsButton";

const PricingCTA = () => (
  <section className="px-4 pb-20">
    <div className="max-w-2xl mx-auto">
      <div className="relative bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-gray-900/60 border border-purple-500/20 rounded-2xl px-8 py-12 text-center overflow-hidden">
        {/* Decorative bg glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3 relative">
          Ready to accelerate your career?
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mb-8 relative">
          Upgrade your HireLoop experience today. Cancel anytime.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
          <GetStartedButton />
          <ViewJobsButton />
        </div>
      </div>
    </div>
  </section>
);

export default PricingCTA;
