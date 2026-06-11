import { Accordion } from "@heroui/react";
import { FAQS } from "./pricingData";

// HeroUI Accordion — Server Component
// Each FAQ item uses Accordion.Item from HeroUI v3
const PricingFAQ = () => (
  <section className="px-4 pb-20">
    <div className="max-w-2xl mx-auto">

      {/* Section heading */}
      <div className="text-center mb-10">
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-sm">
          Everything you need to know about HireLoop plans.
        </p>
      </div>

      {/* Accordion */}
      <Accordion
        variant="splitted"
        className="gap-3"
        itemClasses={{
          base: "bg-gray-900/60 border border-gray-700/50 rounded-xl px-1 hover:border-gray-600/70 transition-colors duration-200",
          title: "text-white text-sm font-medium",
          content: "text-gray-400 text-sm leading-relaxed pb-4",
          trigger: "py-4",
          indicator: "text-gray-500",
        }}
      >
        {FAQS.map((faq, i) => (
          <Accordion.Item key={i} title={faq.question}>
            {faq.answer}
          </Accordion.Item>
        ))}
      </Accordion>

    </div>
  </section>
);

export default PricingFAQ;
