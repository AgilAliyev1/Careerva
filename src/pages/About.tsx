import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Globe, Users, Video } from "lucide-react";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Careerva</h1>
            <p className="text-xl text-muted-foreground">
              Empowering students in Azerbaijan through live online learning
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg leading-relaxed mb-6">
              Careerva is a revolutionary live online learning platform designed specifically for
              students in Azerbaijan. We believe that education should be accessible, interactive,
              and engaging for everyone, regardless of their location.
            </p>

            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-lg leading-relaxed mb-6">
              Careerva is led by a multidisciplinary founding team committed to helping students thrive. We&apos;ll be sharing our
              full story, photos, and contact details soon, but here&apos;s who is building the platform today:
            </p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-10">
              {[
                { label: "Agil — IT" },
                { label: "Turgut — PR" },
                { label: "KHADIJA" },
                { label: "LEYLA — HR" },
                { label: "AYSUN SARA — Finance" },
              ].map((member) => (
                <div key={member.label} className="rounded-xl border bg-card p-5 shadow-sm">
                  <p className="text-xl font-semibold tracking-wide uppercase">{member.label}</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Personal bios, portraits, and contact details will appear here soon.
                  </p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Live Interactive Classes</h3>
                    <p className="text-muted-foreground">
                      Join real-time classes with expert instructors through Zoom and Google Meet
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Expert Instructors</h3>
                    <p className="text-muted-foreground">
                      Learn from experienced professionals in their respective fields
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Diverse Courses</h3>
                    <p className="text-muted-foreground">
                      Choose from Programming, Design, Business, and Languages
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Flexible Learning</h3>
                    <p className="text-muted-foreground">
                      Access courses from anywhere with unlimited monthly subscriptions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed mb-6">
              Our mission is to democratize education by providing affordable, high-quality live
              courses to students across Azerbaijan. We connect passionate instructors with eager
              learners, creating a vibrant community of knowledge sharing and growth.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              Want to get in touch? Visit our dedicated <strong>Contact Us</strong> page to leave a message. We&apos;ll share phone
              numbers, office hours, and social media links there soon.
            </p>

            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <ol className="list-decimal list-inside space-y-3 mb-8">
              <li className="text-lg">Sign up and choose your subscription plan</li>
              <li className="text-lg">Browse available courses in your areas of interest</li>
              <li className="text-lg">Join live classes via integrated video conferencing</li>
              <li className="text-lg">Interact with instructors and fellow students</li>
              <li className="text-lg">Provide feedback to help us improve</li>
            </ol>
          </div>

          <div className="text-center">
            <Button size="lg" onClick={() => navigate("/courses")}>
              Explore Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}