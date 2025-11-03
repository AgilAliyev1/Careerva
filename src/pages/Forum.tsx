import { useCallback, useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase, isUsingDemoSupabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";
import { formatDistanceToNow } from "date-fns";
import { demoForumThreads, demoSubscriptionAssignments } from "@/lib/demoData";
import { getNormalizedTier } from "@/lib/subscriptionPlans";

const Forum = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [tier, setTier] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = useCallback(async (userId: string, email?: string) => {
    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("tier, status")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data?.tier) {
        setTier(data.tier);
      } else if (email) {
        const demo = demoSubscriptionAssignments[email.toLowerCase()];
        if (demo) {
          setTier(demo.tier);
        } else {
          setTier(null);
        }
      } else {
        setTier(null);
      }
    } catch (error: any) {
      console.warn("fetchSubscription", error.message);
      if (email) {
        const demo = demoSubscriptionAssignments[email.toLowerCase()];
        if (demo) {
          setTier(demo.tier);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchSubscription(session.user.id, session.user.email ?? undefined);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchSubscription(session.user.id, session.user.email ?? undefined);
      } else {
        setTier(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchSubscription]);

  const normalizedTier = useMemo(() => getNormalizedTier(tier), [tier]);
  const canAccess = normalizedTier === "unlimited";

  useEffect(() => {
    if (normalizedTier && normalizedTier !== "unlimited") {
      toast({
        title: "Upgrade required",
        description: "The private founders forum is part of the Unlimited plan.",
      });
    }
  }, [normalizedTier, toast]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-10 space-y-2">
          <h1 className="text-4xl font-bold">Unlimited Community Forum</h1>
          <p className="text-muted-foreground text-lg">
            Swap playbooks with other founders, instructors, and mentors in our private space for the $100 cohort.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-muted-foreground">Checking your community access...</div>
        ) : !user ? (
          <Alert className="mb-10" variant="default">
            <AlertTitle>Sign in to continue</AlertTitle>
            <AlertDescription>
              Please log in with your student account to see if you&apos;re part of the Unlimited community.
            </AlertDescription>
          </Alert>
        ) : !canAccess ? (
          <Alert className="mb-10" variant="destructive">
            <AlertTitle>Upgrade to unlock the forum</AlertTitle>
            <AlertDescription>
              This space is reserved for Unlimited subscribers. Switch to the $100 plan to access mentor office hours, deal
              rooms, and private threads.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Latest threads</h2>
                <p className="text-sm text-muted-foreground">
                  Unlimited members respond within hours. Jump in, ask for feedback, or share your wins.
                </p>
              </div>
              <Button disabled={!canAccess} variant="default">
                Start a conversation
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {demoForumThreads.map((thread) => (
                <Card key={thread.id} className="hover:shadow-[var(--card-hover-shadow)] transition-all">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{thread.author}</span>
                      <Badge variant="secondary">{thread.role}</Badge>
                      <span>• {formatDistanceToNow(new Date(thread.postedAt), { addSuffix: true })}</span>
                    </div>
                    <CardTitle className="text-2xl">{thread.title}</CardTitle>
                    <CardDescription>{thread.excerpt}</CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {thread.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{thread.replies} replies</span>
                    <Button variant="ghost" size="sm" className="px-0">
                      View discussion
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {isUsingDemoSupabase && (
              <Alert variant="default">
                <AlertTitle>Preview mode</AlertTitle>
                <AlertDescription>
                  Configure Supabase to sync real forum threads. Until then you&apos;re seeing curated samples that demonstrate the
                  experience Unlimited members get.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;
