import { HiOutlineCheckCircle } from "react-icons/hi2";
import ChoosePlanButton from "./ChoosePlanButton";

// Individual pricing card — Server Component
// popular prop drives the highlighted "Most Popular" style
const PricingCard = ({ plan }) => {
  const { id, name, price, period, description, cta, popular, features } = plan;

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300 ${
        popular
          ? "bg-gradient-to-b from-blue-600/10 to-purple-600/10 border-2 border-purple-500/50 shadow-xl shadow-purple-500/10"
          : "bg-gray-900/60 border border-gray-700/50 hover:border-gray-600/70"
      }`}
    >
      {/* Most Popular badge */}
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg">
            ⭐ Most Popular
          </span>
        </div>
      )}

      {/* Plan name + description */}
      <div className="mb-5">
        <p
          className={`text-sm font-semibold mb-1 ${popular ? "text-purple-300" : "text-gray-400"}`}
        >
          {name}
        </p>
        <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-end gap-1">
          <span className="text-white text-4xl font-bold tracking-tight">
            {price}
          </span>
          <span className="text-gray-500 text-sm mb-1.5">/ {period}</span>
        </div>
      </div>

      {/* CTA button */}
      <ChoosePlanButton planId={id} label={cta} popular={popular} />

      {/* Divider */}
      <div className="border-t border-gray-700/50 my-6" />

      {/* Feature list */}
      <ul className="space-y-3 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <HiOutlineCheckCircle
              className={`text-base flex-shrink-0 mt-0.5 ${popular ? "text-purple-400" : "text-green-400"}`}
            />
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
