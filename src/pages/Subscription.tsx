import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { formatDistanceToNowStrict } from "date-fns";

const tiers = [
  {
    name: "Starter",
    price: 30,
    tier: "starter" as const,
    coursesPerMonth: 3,
    features: [
      "Access to any 3 live courses every month",
      "Downloadable class resources",
      "Standard community access",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: 50,
    tier: "growth" as const,
    coursesPerMonth: 5,
    features: [
      "Join 5 premium live courses every month",
      "Course recordings saved for 30 days",
      "Priority seat reservations",
      "Mentor-led study group",
    ],
    popular: true,
  },
  {
    name: "Unlimited",
    price: 100,
    tier: "unlimited" as const,
    coursesPerMonth: null,
    features: [
      "Unlimited live course access",
      "Lifetime access to recordings",
      "VIP community channels",
      "1:1 career coaching session each month",
      "24/7 priority support",
    ],
  },
];

export default function Subscription() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [trialEndsAt, setTrialEndsAt] = useState<string | null>(null);
  const [trialStatus, setTrialStatus] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkoutLinks = useMemo(
    () => ({
      starter: import.meta.env.VITE_PADDLE_STARTER_CHECKOUT_URL,
      growth: import.meta.env.VITE_PADDLE_GROWTH_CHECKOUT_URL,
      unlimited: import.meta.env.VITE_PADDLE_UNLIMITED_CHECKOUT_URL,
    }),
    []
  );

  const handleSubscribe = async (tier: typeof tiers[0]) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to subscribe to a plan",
      });
      navigate("/auth");
      return;
    }

    setLoading(tier.tier);

    try {
      const checkoutUrl = checkoutLinks[tier.tier];

      if (!checkoutUrl) {
        throw new Error(
          "No checkout link configured for this plan. Please contact support."
        );
      }

      const redirectUrl = new URL(checkoutUrl);
      if (user.email) {
        redirectUrl.searchParams.set("customer_email", user.email);
      }

      toast({
        title: "Redirecting to secure checkout",
        description: "You will be able to complete your payment on the next page.",
      });

      window.location.href = redirectUrl.toString();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: error.message,
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground">
            Select the perfect subscription tier for your learning journey
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-10 space-y-4">
          <Alert>
            <AlertTitle>Start with a free 7-day trial</AlertTitle>
            <AlertDescription>
              Every new student account is activated with a full-access trial. When your trial ends, you&apos;ll need an active
              subscription to keep attending live lessons.
            </AlertDescription>
          </Alert>

          {user && trialEndDate && trialMessage && (
            <Alert variant="default">
              <AlertTitle>
                {trialStatus === "active"
                  ? "Your trial countdown"
                  : "Trial completed"}
              </AlertTitle>
              <AlertDescription>
                {isTrialActive
                  ? `You have ${trialMessage} remaining in your free trial.`
                  : `Your complimentary access ended ${trialMessage}. Choose a plan below to continue learning.`}
              </AlertDescription>
            </Alert>
          )}

          {!user && (
            <Alert variant="default">
              <AlertTitle>Sign in to redeem your trial</AlertTitle>
              <AlertDescription>
                Create a student account or log in to start your 7-day full access period. You can subscribe anytime to avoid
                interruptions.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <Card
              key={tier.tier}
              className={`relative ${
                tier.popular
                  ? "border-primary shadow-[var(--card-hover-shadow)] scale-105"
                  : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>
                  <span className="text-4xl font-bold text-foreground">
                    ${tier.price}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </CardDescription>
                <p className="text-sm font-medium text-primary">
                  {tier.coursesPerMonth
                    ? `${tier.coursesPerMonth} curated courses every month`
                    : "Unlimited courses every month"}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(tier)}
                  disabled={loading === tier.tier}
                >
                  {loading === tier.tier ? "Processing..." : "Subscribe Now"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Payments are securely processed by Paddle.</p>
        </div>
      </div>
    </div>
  );
}