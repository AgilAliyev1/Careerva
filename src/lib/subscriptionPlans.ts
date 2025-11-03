export type NormalizedSubscriptionTier = "starter" | "growth" | "unlimited";

export interface SubscriptionPlan {
  tier: NormalizedSubscriptionTier;
  name: string;
  price: number;
  coursesPerMonth: number | null;
  features: string[];
  highlight?: string;
}

export const subscriptionPlans: Record<NormalizedSubscriptionTier, SubscriptionPlan> = {
  starter: {
    tier: "starter",
    name: "Starter",
    price: 30,
    coursesPerMonth: 3,
    features: [
      "Access to any 3 live courses every month",
      "Downloadable class resources",
      "Standard community access",
      "Email support",
    ],
  },
  growth: {
    tier: "growth",
    name: "Growth",
    price: 50,
    coursesPerMonth: 5,
    features: [
      "Join 5 premium live courses every month",
      "Course recordings saved for 30 days",
      "Priority seat reservations",
      "Mentor-led study group",
    ],
    highlight: "Most popular",
  },
  unlimited: {
    tier: "unlimited",
    name: "Unlimited",
    price: 100,
    coursesPerMonth: null,
    features: [
      "Unlimited live course access",
      "Lifetime access to recordings",
      "VIP community channels",
      "1:1 career coaching session each month",
      "24/7 priority support",
    ],
    highlight: "Includes private forum",
  },
};

export const planList: SubscriptionPlan[] = [
  subscriptionPlans.starter,
  subscriptionPlans.growth,
  subscriptionPlans.unlimited,
];

export const getNormalizedTier = (tier: string | null | undefined): NormalizedSubscriptionTier | null => {
  if (!tier) return null;
  const normalized = tier.toLowerCase();
  if (["starter", "growth", "unlimited"].includes(normalized)) {
    return normalized as NormalizedSubscriptionTier;
  }
  if (normalized === "basic") return "starter";
  if (normalized === "standard") return "growth";
  if (normalized === "premium") return "unlimited";
  return null;
};

export const getPlanFromTier = (tier: string | null | undefined): SubscriptionPlan | null => {
  const normalized = getNormalizedTier(tier);
  if (!normalized) return null;
  return subscriptionPlans[normalized];
};

export const getMonthlyAllowance = (tier: string | null | undefined): number | null => {
  const plan = getPlanFromTier(tier);
  return plan ? plan.coursesPerMonth : null;
};
