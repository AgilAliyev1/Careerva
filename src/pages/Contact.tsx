import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              We&apos;re gathering our full team details. In the meantime, send us a note and we&apos;ll get back to you shortly.
            </p>
          </div>

          <Card className="shadow-[var(--card-shadow)]">
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
              <CardDescription>
                Leave your question or partnership request. We&apos;ll reply from the appropriate team member.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium" htmlFor="contact-name">
                    Name
                  </Label>
                  <Input id="contact-name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium" htmlFor="contact-email">
                    Email
                  </Label>
                  <Input id="contact-email" type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium" htmlFor="contact-message">
                    Message
                  </Label>
                  <Textarea id="contact-message" placeholder="Let us know how we can help" rows={5} />
                </div>
                <Button type="button" className="w-full" disabled>
                  Send message (coming soon)
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
