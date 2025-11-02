import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface Course {
  id: string;
  title: string;
  description: string | null;
  category: string;
  instructor_id: string;
  scheduled_date: string;
  duration_minutes: number;
  meeting_link: string;
  profiles: {
    full_name: string;
  };
}

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      fetchCourses();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select(`
          *,
          profiles!instructor_id (
            full_name
          )
        `)
        .order("scheduled_date", { ascending: true });

      if (error) throw error;
      setCourses(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading courses",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClass = (courseId: string) => {
    setSelectedCourse(courseId);
    setFeedbackDialog(true);
  };

  const handleSubmitFeedback = async () => {
    if (!selectedCourse || !user) return;

    try {
      const { error } = await supabase.from("feedback").insert({
        course_id: selectedCourse,
        student_id: user.id,
        rating,
        comment,
      });

      if (error) throw error;

      toast({
        title: "Feedback submitted!",
        description: "Thank you for your feedback.",
      });

      setFeedbackDialog(false);
      setComment("");
      setRating(5);
      setSelectedCourse(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error submitting feedback",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground">Browse and join available live courses</p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No courses available yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description || undefined}
                category={course.category}
                instructorName={course.profiles.full_name}
                scheduledDate={course.scheduled_date}
                durationMinutes={course.duration_minutes}
                meetingLink={course.meeting_link}
                onJoin={() => handleJoinClass(course.id)}
              />
            ))}
          </div>
        )}
      </div>

      <Dialog open={feedbackDialog} onOpenChange={setFeedbackDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Feedback</DialogTitle>
            <DialogDescription>
              How was your experience with this course?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Comments (optional)</Label>
              <Textarea
                id="comment"
                placeholder="Share your thoughts about the course..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>
            <Button onClick={handleSubmitFeedback} className="w-full">
              Submit Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}