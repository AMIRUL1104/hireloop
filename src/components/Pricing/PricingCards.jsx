import { PLANS, RECRUITER_PLANS } from "./pricingData";
import PricingCard from "./PricingCard";
import getUserSession from "@/lib/core/session";

const PricingCards = async () => {
  const user = await getUserSession();

  return (
    <section className="px-4 pb-16">
      <div className="max-w-5xl mx-auto">
        {/* Equal-height 3-column grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {user.role === "seeker" &&
            PLANS.map((plan) => <PricingCard key={plan.id} plan={plan} />)}

          {user.role === "recruiter" &&
            RECRUITER_PLANS.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default PricingCards;
