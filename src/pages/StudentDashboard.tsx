import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Flame, Star, TrendingUp, Clock3, Trophy, BookOpenCheck } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { format } from "date-fns";
import { demoCourses as demoCatalog, demoStudentProgress, DEMO_ACCOUNT_EMAIL } from "@/lib/demoData";

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
  const [courses, setCourses] = useState<Course[]>(
    demoCatalog.map((course) => ({
      ...course,
    }))
  );
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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
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

      const supabaseCourses = (data || []).map((course) => ({
        ...course,
        description: course.description ?? "",
        profiles: course.profiles || { full_name: "Careerva Instructor" },
      }));

      const combinedCourses = [
        ...demoCatalog.map((course) => ({ ...course })),
      ] as Course[];

      supabaseCourses.forEach((course) => {
        if (!combinedCourses.find((demoCourse) => demoCourse.id === course.id)) {
          combinedCourses.push(course);
        }
      });

      setCourses(combinedCourses);
    } catch (error: any) {
      toast({
        title: "Showing demo classroom",
        description: "You're viewing the curated pitch deck schedule while we connect to live data.",
      });
      setCourses(
        demoCatalog.map((course) => ({
          ...course,
        }))
      );
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

  const isDemoUser = user?.email?.toLowerCase() === DEMO_ACCOUNT_EMAIL;
  const progress = demoStudentProgress;
  const stats = progress.stats;
  const completedCourses = progress.completedCourses;
  const assessments = progress.assessments;
  const achievements = progress.achievements;
  const upcoming = progress.upcoming;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground">
            {isDemoUser
              ? "Track your wins and jump into the next live cohort."
              : "Browse and join available live courses"}
          </p>
        </div>

        {isDemoUser && (
          <div className="space-y-8 mb-10">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Courses completed
                  </CardTitle>
                  <BookOpenCheck className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.completedCourses}</div>
                  <p className="text-xs text-muted-foreground">+2 this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Average assessment score
                  </CardTitle>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.assessmentsAverage}%</div>
                  <p className="text-xs text-muted-foreground">Top 5% of the cohort</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Hours of live learning
                  </CardTitle>
                  <Clock3 className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.hoursWatched}h</div>
                  <p className="text-xs text-muted-foreground">Including 9 mentorship hours</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Learning streak
                  </CardTitle>
                  <Flame className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.learningStreak} days</div>
                  <p className="text-xs text-muted-foreground">Daily practice logged since June 15</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Completed courses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {completedCourses.map((item) => (
                    <div key={item.title} className="space-y-3 rounded-lg border p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <Badge variant="secondary">Score {item.score}%</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Facilitated by {item.instructor} · Completed on {format(new Date(item.completedOn), "PPP")}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.title} className="rounded-lg border p-4">
                      <div className="flex items-start gap-3">
                        <Trophy className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold">{achievement.title}</p>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assessments.map((assessment) => {
                    const percentage = Math.round((assessment.score / assessment.maxScore) * 100);
                    return (
                      <div key={assessment.title} className="space-y-2">
                        <div className="flex items-center justify-between text-sm font-medium">
                          <span>{assessment.title}</span>
                          <span>
                            {assessment.score}/{assessment.maxScore}
                          </span>
                        </div>
                        <Progress value={percentage} />
                        <p className="text-xs text-muted-foreground">
                          Taken on {format(new Date(assessment.takenOn), "PPP")}
                        </p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcoming.map((item) => (
                    <div key={item.title} className="rounded-lg border p-4">
                      <div className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-primary mt-1" />
                        <div className="space-y-1">
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(item.date), "PPPP p")}
                          </p>
                          <p className="text-sm text-muted-foreground">{item.action}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {loading && courses.length === 0 ? (
          <div className="text-center py-12">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No courses available yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Upcoming live courses</h2>
              {isDemoUser && (
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-primary" /> Curated for your career sprint
                </span>
              )}
            </div>
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
