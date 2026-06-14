import FeatureComparison from "@/components/Pricing/FeatureComparison";
import PricingCards from "@/components/Pricing/PricingCards";
import PricingCTA from "@/components/Pricing/PricingCTA";
import PricingFAQ from "@/components/Pricing/PricingFAQ";
import PricingHero from "@/components/Pricing/PricingHero";
import getUserSession from "@/lib/core/session";

export const metadata = {
  title: "Pricing — HireLoop",
  description:
    "Choose a HireLoop plan that fits your career or hiring needs. Start free, upgrade anytime.",
};

// Server Component — no data fetching needed, all data is static config
const PricingPage = async () => {
  const user = await getUserSession();
  return (
    <div className="min-h-screen bg-gray-950">
      <PricingHero />
      <PricingCards />
      <FeatureComparison />
      <PricingFAQ />
      <PricingCTA />
    </div>
  );
  // if (user.role === "seeker") {
  //   return (
  //     <div className="min-h-screen bg-gray-950">
  //       <PricingHero />
  //       <PricingCards />
  //       <FeatureComparison />
  //       <PricingFAQ />
  //       <PricingCTA />
  //     </div>
  //   );
  // }
  // if (user.role === "recruiter") {
  //   //
  //   <div className="min-h-screen bg-gray-950"></div>;
  // }
};

export default PricingPage;
