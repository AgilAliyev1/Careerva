import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Video } from "lucide-react";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary to-purple-600 text-primary-foreground">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Learn Live with Expert Instructors
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Join unlimited live online courses in Programming, Design, Business, and Languages.
              Learn from the best, anytime, anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                onClick={() => navigate("/courses")}
              >
                Join Live Courses
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Sign Up & Subscribe</h3>
            <p className="text-muted-foreground">
              Choose your plan and get instant access to all live courses
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Browse Courses</h3>
            <p className="text-muted-foreground">
              Explore our catalog of live courses across multiple categories
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Video className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Join Live Classes</h3>
            <p className="text-muted-foreground">
              Click to join and learn with expert instructors in real-time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};