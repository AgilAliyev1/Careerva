import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, isUsingDemoSupabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Flame, Star, TrendingUp, Clock3, Trophy, BookOpenCheck } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { format, formatDistanceToNowStrict } from "date-fns";
import {
  demoCourses as demoCatalog,
  demoStudentProgress,
  DEMO_ACCOUNT_EMAIL,
  demoInstructorRatings,
} from "@/lib/demoData";

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
  const [selectedCourse, setSelectedCourse] = useState<{
    id: string;
    instructorId?: string;
    title?: string;
  } | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [studentReputation, setStudentReputation] = useState<
    | {
        average: number;
        totalReviews: number;
        highlight?: string;
      }
    | null
  >(
    demoStudentProgress.reputation
      ? {
          average: demoStudentProgress.reputation.rating,
          totalReviews: demoStudentProgress.reputation.totalReviews,
          highlight: demoStudentProgress.reputation.highlight,
        }
      : null,
  );
  const [instructorRatings, setInstructorRatings] = useState<
    Record<string, { average: number; count: number }>
  >(() => {
    const defaults: Record<string, { average: number; count: number }> = {};
    Object.entries(demoInstructorRatings).forEach(([id, details]) => {
      defaults[id] = { average: details.rating, count: details.totalReviews };
    });
    return defaults;
  });
  const [accessStatus, setAccessStatus] = useState<{
    state: "loading" | "trial" | "active" | "expired";
    trialEndsAt?: string | null;
  }>({ state: "loading", trialEndsAt: null });
  const defaultReputationHighlight = demoStudentProgress.reputation?.highlight;

  const loadStudentReputation = useCallback(
    async (currentUser: User) => {
      try {
        const { data, error } = await supabase
          .from("user_ratings")
          .select("rating")
          .eq("target_user_id", currentUser.id);

        if (error) throw error;

        if (data && data.length > 0) {
          const total = data.reduce((sum, item) => sum + (item?.rating ?? 0), 0);
          const count = data.length;
          setStudentReputation({
            average: Number((total / count).toFixed(2)),
            totalReviews: count,
            highlight: defaultReputationHighlight,
          });
        } else if (isUsingDemoSupabase && demoStudentProgress.reputation) {
          setStudentReputation({
            average: demoStudentProgress.reputation.rating,
            totalReviews: demoStudentProgress.reputation.totalReviews,
            highlight: defaultReputationHighlight,
          });
        } else {
          setStudentReputation(null);
        }
      } catch (error: any) {
        console.warn("loadStudentReputation", error.message);
        if (demoStudentProgress.reputation) {
          setStudentReputation({
            average: demoStudentProgress.reputation.rating,
            totalReviews: demoStudentProgress.reputation.totalReviews,
            highlight: defaultReputationHighlight,
          });
        }
      }
    },
    [defaultReputationHighlight]
  );

  const hydrateInstructorRatings = useCallback(
    async (instructorIds: string[]) => {
      const unique = Array.from(new Set(instructorIds.filter(Boolean)));
      if (unique.length === 0) return;

      try {
        const { data, error } = await supabase
          .from("user_ratings")
          .select("target_user_id, rating")
          .in("target_user_id", unique);

        if (error) throw error;

        const aggregated: Record<string, { total: number; count: number }> = {};
        (data || []).forEach((row) => {
          if (!row || !row.target_user_id) return;
          if (!aggregated[row.target_user_id]) {
            aggregated[row.target_user_id] = { total: 0, count: 0 };
          }
          aggregated[row.target_user_id].total += row.rating ?? 0;
          aggregated[row.target_user_id].count += 1;
        });

        setInstructorRatings((current) => {
          const next = { ...current };
          unique.forEach((id) => {
            const stats = aggregated[id];
            if (stats && stats.count > 0) {
              next[id] = {
                average: Number((stats.total / stats.count).toFixed(2)),
                count: stats.count,
              };
            } else if (demoInstructorRatings[id]) {
              next[id] = {
                average: demoInstructorRatings[id].rating,
                count: demoInstructorRatings[id].totalReviews,
              };
            }
          });
          return next;
        });
      } catch (error: any) {
        console.warn("hydrateInstructorRatings", error.message);
        setInstructorRatings((current) => {
          const next = { ...current };
          unique.forEach((id) => {
            if (demoInstructorRatings[id]) {
              next[id] = {
                average: demoInstructorRatings[id].rating,
                count: demoInstructorRatings[id].totalReviews,
              };
            }
          });
          return next;
        });
      }
    },
    []
  );

  const verifyAccess = useCallback(async (currentUser: User) => {
    try {
      const now = new Date();
      const [{ data: profile, error: profileError }, { data: subscriptions, error: subscriptionError }] = await Promise.all([
        supabase
          .from("profiles")
          .select("trial_ends_at, trial_status")
          .eq("id", currentUser.id)
          .single(),
        supabase
          .from("subscriptions")
          .select("status, end_date")
          .eq("user_id", currentUser.id)
          .order("created_at", { ascending: false })
          .limit(1),
      ]);

      if (profileError) throw profileError;
      if (subscriptionError) throw subscriptionError;

      const trialEndsAt = profile?.trial_ends_at ?? null;
      const trialEndDate = trialEndsAt ? new Date(trialEndsAt) : null;
      const hasActiveSubscription = (subscriptions ?? []).some((subscription) => {
        if (!subscription) return false;
        if (subscription.status === "active") return true;
        if (subscription.status === "trialing") {
          if (!subscription.end_date) return true;
          return new Date(subscription.end_date) > now;
        }
        return false;
      });

      if (hasActiveSubscription) {
        setAccessStatus({ state: "active", trialEndsAt });
        return true;
      }

      if (trialEndDate && trialEndDate >= now) {
        setAccessStatus({ state: "trial", trialEndsAt });
        return true;
      }

      setAccessStatus({ state: "expired", trialEndsAt });
      toast({
        variant: "destructive",
        title: "Your trial has ended",
        description: "Subscribe to continue attending live courses.",
      });
      navigate("/subscription");
      return false;
    } catch (error: any) {
      console.error("verifyAccess", error);
      toast({
        variant: "destructive",
        title: "We couldn't verify your access",
        description: "Showing the demo classroom until we reconnect to Supabase.",
      });
      setAccessStatus({ state: "trial", trialEndsAt: null });
      return true;
    }
  }, [navigate, toast]);

  const fetchCourses = useCallback(async () => {
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
      await hydrateInstructorRatings(combinedCourses.map((course) => course.instructor_id));
    } catch (error: any) {
      toast({
        title: "Showing demo classroom",
        description: "You're viewing the curated pitch deck schedule while we connect to live data.",
      });
      const fallbackCourses = demoCatalog.map((course) => ({
        ...course,
      }));
      setCourses(fallbackCourses);
      await hydrateInstructorRatings(fallbackCourses.map((course) => course.instructor_id));
    } finally {
      setLoading(false);
    }
  }, [hydrateInstructorRatings, toast]);

  const handleLeaveFeedback = (courseId: string, instructorId?: string, title?: string) => {
    setSelectedCourse({ id: courseId, instructorId, title });
    setFeedbackDialog(true);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      verifyAccess(session.user).then((canAccess) => {
        if (canAccess) {
          fetchCourses();
          loadStudentReputation(session.user);
        } else {
          setLoading(false);
        }
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      verifyAccess(session.user).then((canAccess) => {
        if (canAccess) {
          fetchCourses();
          loadStudentReputation(session.user);
        }
      });
    });

    return () => subscription.unsubscribe();
  }, [fetchCourses, loadStudentReputation, navigate, verifyAccess]);

  const handleSubmitFeedback = async () => {
    if (!selectedCourse || !user) return;

    setFeedbackSubmitting(true);
    let saved = false;

    try {
      const { error } = await supabase.from("feedback").insert({
        course_id: selectedCourse.id,
        student_id: user.id,
        rating,
        comment,
      });

      if (error && !isUsingDemoSupabase) {
        throw error;
      }

      if (selectedCourse.instructorId) {
        const { error: ratingError } = await supabase.from("user_ratings").insert({
          target_user_id: selectedCourse.instructorId,
          reviewer_user_id: user.id,
          rating,
          comment,
          target_role: "instructor",
        } as any);

        if (ratingError && !isUsingDemoSupabase) {
          throw ratingError;
        }

        await hydrateInstructorRatings([selectedCourse.instructorId]);
      }

      saved = true;
    } catch (error: any) {
      if (!isUsingDemoSupabase) {
        toast({
          variant: "destructive",
          title: "Error submitting feedback",
          description: error.message,
        });
        setFeedbackSubmitting(false);
        return;
      }
      console.warn("handleSubmitFeedback", error.message);
      saved = true;
    }

    if (saved) {
      toast({
        title: "Feedback submitted!",
        description: "Thank you for your feedback.",
      });

      setFeedbackDialog(false);
      setComment("");
      setRating(5);
      setSelectedCourse(null);
    }

    setFeedbackSubmitting(false);
  };

  const isDemoUser = user?.email?.toLowerCase() === DEMO_ACCOUNT_EMAIL;
  const progress = demoStudentProgress;
  const stats = progress.stats;
  const completedCourses = progress.completedCourses;
  const assessments = progress.assessments;
  const achievements = progress.achievements;
  const upcoming = progress.upcoming;
  const trialEndsAt = accessStatus.trialEndsAt ? new Date(accessStatus.trialEndsAt) : null;
  const now = new Date();
  const isTrialActive = !!(trialEndsAt && trialEndsAt >= now);
  const trialMessage = trialEndsAt
    ? isTrialActive
      ? formatDistanceToNowStrict(trialEndsAt)
      : formatDistanceToNowStrict(trialEndsAt, { addSuffix: true })
    : null;
  const ratingChoices = useMemo(() => [1, 2, 3, 4, 5], []);

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

        {accessStatus.state === "trial" && trialMessage && (
          <Alert className="mb-8">
            <AlertTitle>Your free trial is active</AlertTitle>
            <AlertDescription>
              You have {trialMessage} remaining in your free trial. Subscribe anytime to avoid losing access.
            </AlertDescription>
          </Alert>
        )}

        {accessStatus.state === "active" && (
          <Alert className="mb-8" variant="default">
            <AlertTitle>Subscription active</AlertTitle>
            <AlertDescription>
              Your subscription is confirmed. {trialEndsAt && trialEndsAt < new Date() ? "Your initial trial has ended." : "Enjoy uninterrupted learning."}
            </AlertDescription>
          </Alert>
        )}

        {studentReputation && (
          <Card className="mb-8">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Star className="h-5 w-5 text-primary fill-primary" />
                  Your cohort rating
                </CardTitle>
                <CardDescription>
                  Based on {studentReputation.totalReviews} instructor reviews
                </CardDescription>
              </div>
              <div className="text-4xl font-bold text-primary">
                {studentReputation.average.toFixed(2)}
              </div>
            </CardHeader>
            {studentReputation.highlight && (
              <CardContent>
                <p className="text-sm text-muted-foreground">{studentReputation.highlight}</p>
              </CardContent>
            )}
          </Card>
        )}

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
                      <div className="flex flex-col gap-3">
                        {typeof item.rating === "number" && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="h-4 w-4 text-primary fill-primary" />
                            <span>You rated this course {item.rating}/5</span>
                          </div>
                        )}
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="h-4 w-4 text-primary fill-primary" />
                            <span>
                              {item.instructorId && instructorRatings[item.instructorId]
                                ? `${instructorRatings[item.instructorId].average.toFixed(2)} • ${instructorRatings[item.instructorId].count} reviews`
                                : "Instructor rating coming soon"}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleLeaveFeedback(item.courseId, item.instructorId, item.title)}
                          >
                            Leave feedback
                          </Button>
                        </div>
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
                  detailHref={`/courses/${course.id}`}
                  ratingAverage={instructorRatings[course.instructor_id]?.average ?? null}
                  ratingCount={instructorRatings[course.instructor_id]?.count ?? null}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog
        open={feedbackDialog}
        onOpenChange={(open) => {
          setFeedbackDialog(open);
          if (!open) {
            setComment("");
            setRating(5);
            setSelectedCourse(null);
            setFeedbackSubmitting(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Share feedback{selectedCourse?.title ? ` for ${selectedCourse.title}` : ""}
            </DialogTitle>
            <DialogDescription>
              Rate the live session and help instructors keep improving.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex flex-wrap gap-2">
                {ratingChoices.map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant={rating >= value ? "default" : "outline"}
                    onClick={() => setRating(value)}
                    className="flex items-center gap-1"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        rating >= value ? "fill-primary text-primary" : "text-muted-foreground"
                      }`}
                    />
                    {value}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback-comment">Comments (optional)</Label>
              <Textarea
                id="feedback-comment"
                placeholder="What should we keep or improve for the next cohort?"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFeedbackDialog(false);
                setComment("");
                setRating(5);
                setSelectedCourse(null);
                setFeedbackSubmitting(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitFeedback} disabled={feedbackSubmitting}>
              {feedbackSubmitting ? "Saving..." : "Submit feedback"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
