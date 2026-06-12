import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  seeker_pro: "price_1ThRoN5i1tovhYv6k239blRd",
  seeker_enterprise: "price_1ThWUi5i1tovhYv6VwBhZf8E",
  recruiter_grow: "price_1ThWWH5i1tovhYv6ECmiZVxq",
  recruiter_enterprise: "price_1ThWX95i1tovhYv61dsFVCLo",
};
