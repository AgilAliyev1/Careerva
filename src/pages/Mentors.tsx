import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { demoMentorDirectory } from "@/lib/demoData";
import { subscriptionPlans } from "@/lib/subscriptionPlans";

const Mentors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mb-12 space-y-3">
          <h1 className="text-4xl font-bold">Mentor Collective</h1>
          <p className="text-muted-foreground text-lg">
            Unlimited and Growth cohorts meet weekly with these professionals to stress-test plans, rehearse pitches, and
            stay accountable.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {demoMentorDirectory.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-[var(--card-hover-shadow)] transition-all">
              <CardHeader>
                <CardTitle className="text-2xl">{mentor.name}</CardTitle>
                <CardDescription>{mentor.headline ?? mentor.focus}</CardDescription>
                <Badge variant="secondary" className="w-fit">
                  {mentor.focus}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Expertise</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mentor.expertise.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{mentor.bio}</p>
                <div className="rounded-lg border p-3 text-sm">
                  <p className="font-semibold">Office hours</p>
                  <p className="text-muted-foreground">{mentor.officeHours}</p>
                </div>
                {Array.isArray(mentor.tiers) && mentor.tiers.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Included with
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {mentor.tiers.map((tier) => {
                        const plan = subscriptionPlans[tier as keyof typeof subscriptionPlans];
                        return (
                          <Badge key={tier} variant="outline">
                            {plan?.name ?? tier}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
                <Button variant="outline" className="w-full">
                  Request a mentor match
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentors;
