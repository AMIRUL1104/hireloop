// Central config — all plan data lives here
// Update this file to change plans across the entire pricing page

export const PLANS = [
  {
    id: "seeker_free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with your job search.",
    cta: "Get Started",
    popular: false,
    features: [
      "Browse all job listings",
      "Save up to 10 jobs",
      "Basic profile",
      "Email notifications",
    ],
  },
  {
    id: "seeker_pro",
    name: "Pro",
    price: "$29.99",
    period: "per month",
    description: "Everything you need to land your next opportunity.",
    cta: "Upgrade to Pro",
    popular: true,
    features: [
      "Unlimited applications",
      "Unlimited saved jobs",
      "Priority applications",
      "Application tracking",
      "Salary insights",
    ],
  },
  {
    id: "seeker_enterprise",
    name: "Enterprise",
    price: "$99.99",
    period: "per month",
    description: "Advanced tools for teams and power recruiters.",
    cta: "Upgrade to Enterprise",
    popular: false,
    features: [
      "Everything in Pro",
      "Unlimited job posts",
      "ATS tools",
      "Team collaboration",
      "Analytics dashboard",
      "Dedicated support",
      "Custom branding",
    ],
  },
];

// Feature comparison table data
export const COMPARISON_FEATURES = [
  {
    label: "Apply to Jobs",
    free: "Up to 0",
    pro: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    label: "Saved Jobs",
    free: "Up to 10",
    pro: "Unlimited",
    enterprise: "Unlimited",
  },
  { label: "Job Posts", free: false, pro: false, enterprise: "Unlimited" },
  { label: "Analytics", free: false, pro: false, enterprise: true },
  { label: "Salary Insights", free: false, pro: true, enterprise: true },
  { label: "ATS Tools", free: false, pro: false, enterprise: true },
  { label: "Priority Applications", free: false, pro: true, enterprise: true },
  { label: "Team Collaboration", free: false, pro: false, enterprise: true },
  { label: "Custom Branding", free: false, pro: false, enterprise: true },
  { label: "Dedicated Support", free: false, pro: false, enterprise: true },
];

// ====================recruiter data =======================
// Central config — all recruiter plan data lives here
// Update this file to change plans across the entire pricing page

export const RECRUITER_PLANS = [
  {
    id: "recruiter_free",
    name: "Free Trial",
    price: "$0",
    period: "forever",
    description: "Ideal for startups looking to make their first hire.",
    cta: "Start Free",
    popular: false,
    features: [
      "Post up to 2 active jobs",
      "Basic candidate management",
      "View standard resumes",
      "Email notifications",
    ],
  },
  {
    id: "recruiter_pro",
    name: "Pro Talent",
    price: "$79.99",
    period: "per month",
    description: "Perfect for growing companies with ongoing hiring needs.",
    cta: "Upgrade to Pro",
    popular: true,
    features: [
      "Post up to 10 active jobs",
      "Advanced candidate tracking (ATS)",
      "Direct messaging with candidates",
      "Priority job placement",
      "Basic analytics dashboard",
    ],
  },
  {
    id: "recruiter_enterprise",
    name: "Enterprise",
    price: "$249.99",
    period: "per month",
    description: "Scalable solutions for enterprise teams and agencies.",
    cta: "Contact Sales",
    popular: false,
    features: [
      "Unlimited active job posts",
      "Full ATS integration & automation",
      "Team collaboration (Unlimited seats)",
      "Dedicated account manager",
      "Custom company branding",
      "Advanced analytics & API access",
    ],
  },
];

// Feature comparison table data for recruiters
export const RECRUITER_COMPARISON_FEATURES = [
  {
    label: "Active Job Posts",
    free: "Up to 2",
    pro: "Up to 10",
    enterprise: "Unlimited",
  },
  {
    label: "Candidate Management (ATS)",
    free: "Basic",
    pro: "Advanced",
    enterprise: "Full Custom",
  },
  {
    label: "Direct Messaging",
    free: false,
    pro: true,
    enterprise: true,
  },
  {
    label: "Priority Job Placement",
    free: false,
    pro: true,
    enterprise: true,
  },
  {
    label: "Team Collaboration Seats",
    free: "1 Seat",
    pro: "Up to 5 Seats",
    enterprise: "Unlimited",
  },
  {
    label: "Analytics Dashboard",
    free: false,
    pro: "Basic",
    enterprise: "Advanced Custom",
  },
  {
    label: "Custom Employer Branding",
    free: false,
    pro: false,
    enterprise: true,
  },
  {
    label: "API & Webhooks Access",
    free: false,
    pro: false,
    enterprise: true,
  },
  {
    label: "Dedicated Support",
    free: "Email only",
    pro: "24/7 Priority",
    enterprise: "Dedicated Manager",
  },
];

export const FAQS = [
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel your subscription at any time from your account settings. Your plan stays active until the end of the current billing period, and you will not be charged again after that.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 14-day money-back guarantee on all paid plans. If you are not satisfied within the first 14 days, contact our support team and we will issue a full refund — no questions asked.",
  },
  {
    question: "How do upgrades work?",
    answer:
      "Upgrades take effect immediately. When you upgrade mid-cycle, you are charged a prorated amount for the remaining days in your billing period. Your new features are unlocked right away.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, American Express), as well as PayPal. All payments are processed securely through Stripe.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Absolutely. You can upgrade or downgrade your plan at any time. Upgrades are instant; downgrades take effect at the start of your next billing cycle so you keep your current features until then.",
  },
];
