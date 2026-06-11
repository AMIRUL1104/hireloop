import { HiOutlineShieldCheck, HiOutlineBolt, HiOutlineArrowPath } from "react-icons/hi2";

const TRUST_ITEMS = [
  { icon: HiOutlineArrowPath, label: "Cancel anytime" },
  { icon: HiOutlineShieldCheck, label: "Secure payments" },
  { icon: HiOutlineBolt, label: "Instant activation" },
];

const PricingHero = () => (
  <section className="pt-16 pb-12 px-4 text-center">
    <div className="max-w-3xl mx-auto">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
        <span className="text-purple-400 text-xs font-medium tracking-wide">
          Simple, Transparent Pricing
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
        Find the Right Plan for
        <br />
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Your Career Growth
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
        Choose a plan that fits your hiring or job-seeking needs.
        Start for free and upgrade whenever you are ready.
      </p>

      {/* Trust signals */}
      <div className="flex flex-wrap items-center justify-center gap-5">
        {TRUST_ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-gray-400 text-sm">
            <Icon className="text-green-400 text-base flex-shrink-0" />
            <span>{label}</span>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default PricingHero;
