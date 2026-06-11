import FeatureComparison from "@/components/Pricing/FeatureComparison";
import PricingCards from "@/components/Pricing/PricingCards";
import PricingCTA from "@/components/Pricing/PricingCTA";
import PricingFAQ from "@/components/Pricing/PricingFAQ";
import PricingHero from "@/components/Pricing/PricingHero";

export const metadata = {
  title: "Pricing — HireLoop",
  description:
    "Choose a HireLoop plan that fits your career or hiring needs. Start free, upgrade anytime.",
};

// Server Component — no data fetching needed, all data is static config
const PricingPage = () => (
  <div className="min-h-screen bg-gray-950">
    <PricingHero />
    <PricingCards />
    <FeatureComparison />
    <PricingFAQ />
    <PricingCTA />
  </div>
);

export default PricingPage;
