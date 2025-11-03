import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  GraduationCap,
  Target,
  ListChecks,
  BookOpen,
  ExternalLink,
  Layers,
} from "lucide-react";
import {
  DemoCourse,
  demoCourses,
  DemoCourseModule,
  DemoCourseResource,
} from "@/lib/demoData";

interface CourseDetail extends DemoCourse {
  instructorBio?: string;
}

type SupabaseCourse = DemoCourse & {
  profiles?: { full_name: string; bio?: string | null };
  instructor_bio?: string | null;
  long_description?: string | null;
  key_takeaways?: string[] | null;
  prerequisites?: string[] | null;
  audience?: string | null;
  tools?: string[] | null;
  modules?: DemoCourseModule[] | null;
  resources?: DemoCourseResource[] | null;
};

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const demoFallback = useMemo(
    () => demoCourses.find((item) => item.id === courseId),
    [courseId],
  );

  useEffect(() => {
    const loadCourse = async () => {
      if (!courseId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("courses")
          .select(
            `*, profiles!instructor_id ( full_name, bio ), long_description, key_takeaways, prerequisites, audience, tools, modules, resources`,
          )
          .eq("id", courseId)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          const details = data as SupabaseCourse;
          const mergedProfiles =
            details.profiles || demoFallback?.profiles || { full_name: "Careerva Instructor" };

          const merged: CourseDetail = {
            ...demoFallback,
            ...details,
            id: details.id,
            title: details.title,
            description: details.description ?? demoFallback?.description ?? "",
            category: details.category ?? demoFallback?.category ?? "General",
            instructor_id: details.instructor_id,
            scheduled_date:
              details.scheduled_date ?? demoFallback?.scheduled_date ?? new Date().toISOString(),
            duration_minutes:
              details.duration_minutes ?? demoFallback?.duration_minutes ?? 60,
            meeting_link: details.meeting_link ?? demoFallback?.meeting_link ?? "",
            profiles: mergedProfiles,
            longDescription: details.long_description ?? demoFallback?.longDescription,
            keyTakeaways: details.key_takeaways ?? demoFallback?.keyTakeaways,
            prerequisites: details.prerequisites ?? demoFallback?.prerequisites,
            audience: details.audience ?? demoFallback?.audience,
            modules: details.modules ?? demoFallback?.modules,
            resources: details.resources ?? demoFallback?.resources,
            tools: details.tools ?? demoFallback?.tools,
            level: details.level ?? demoFallback?.level,
            instructorBio: details.profiles?.bio ?? undefined,
          };

          setCourse(merged);
        } else if (demoFallback) {
          setCourse(demoFallback);
        } else {
          setCourse(null);
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Unable to load course",
          description: error.message,
        });
        if (demoFallback) {
          setCourse(demoFallback);
        }
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId, demoFallback, toast]);

  const handleJoinSession = () => {
    if (!course?.meeting_link) {
      toast({
        variant: "destructive",
        title: "Join link unavailable",
        description: "We couldn't find a live session link for this course just yet.",
      });
      return;
    }

    window.open(course.meeting_link, "_blank", "noopener,noreferrer");
    toast({
      title: "Opening live classroom",
      description: "Your Google Meet session is launching in a new tab.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {loading ? (
          <div className="py-24 text-center text-muted-foreground">Loading course...</div>
        ) : !course ? (
          <Card>
            <CardHeader>
              <CardTitle>Course not found</CardTitle>
              <CardDescription>
                We couldn't locate the course you're looking for. Browse our latest lineup to explore
                other live learning experiences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link to="/courses">Go to courses</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              <Card>
                <CardHeader className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary">{course.category}</Badge>
                    {course.level && <Badge variant="outline">{course.level}</Badge>}
                  </div>
                  <CardTitle className="text-3xl leading-tight">{course.title}</CardTitle>
                  <CardDescription className="text-base">
                    {course.longDescription || course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="h-5 w-5" />
                      <span>{format(new Date(course.scheduled_date), "PPPP")}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="h-5 w-5" />
                      <span>
                        {format(new Date(course.scheduled_date), "p")} • {course.duration_minutes} minutes
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <User className="h-5 w-5" />
                      <span>{course.profiles.full_name}</span>
                    </div>
                    {course.audience && (
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Target className="h-5 w-5" />
                        <span>{course.audience}</span>
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div className="flex flex-wrap gap-3">
                    <Button className="flex-1 md:flex-none" onClick={handleJoinSession}>
                      <ExternalLink className="h-4 w-4" />
                      Join live session
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/courses">Browse more courses</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {course.keyTakeaways && course.keyTakeaways.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <CardTitle className="text-2xl">What you'll learn</CardTitle>
                    </div>
                    <CardDescription>
                      Leave the session with practical skills you can apply the same week.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {course.keyTakeaways.map((takeaway) => (
                        <li key={takeaway} className="flex items-start gap-3">
                          <ListChecks className="mt-1 h-4 w-4 text-primary" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {course.modules && course.modules.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-primary" />
                      <CardTitle className="text-2xl">Inside the live session</CardTitle>
                    </div>
                    <CardDescription>Here's how we'll spend our time together.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {course.modules.map((module) => (
                      <div key={module.title} className="rounded-lg border p-4">
                        <h3 className="text-lg font-semibold">{module.title}</h3>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {course.resources && course.resources.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <CardTitle className="text-2xl">Resources included</CardTitle>
                    </div>
                    <CardDescription>
                      Take these templates, checklists, and guides back to your team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {course.resources.map((resource) => (
                      <div key={resource.title} className="space-y-1">
                        <p className="font-medium">{resource.title}</p>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                        {resource.url && (
                          <Button asChild variant="link" className="px-0">
                            <a href={resource.url} target="_blank" rel="noreferrer">
                              Open resource
                            </a>
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Instructor</CardTitle>
                  <CardDescription>Meet your guide for this live experience.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="font-semibold">{course.profiles.full_name}</p>
                  {course.instructorBio ? (
                    <p className="text-sm text-muted-foreground">{course.instructorBio}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {course.profiles.full_name} brings industry expertise to every live cohort, sharing playbooks
                      they've used to ship meaningful results.
                    </p>
                  )}
                </CardContent>
              </Card>

              {(course.prerequisites && course.prerequisites.length > 0) ||
              (course.tools && course.tools.length > 0) ? (
                <Card>
                  <CardHeader>
                    <CardTitle>How to prepare</CardTitle>
                    <CardDescription>Arrive ready to apply new ideas immediately.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {course.prerequisites && course.prerequisites.length > 0 && (
                      <div>
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                          Prerequisites
                        </h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {course.prerequisites.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {course.tools && course.tools.length > 0 && (
                      <div>
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                          Tools we'll use
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {course.tools.map((tool) => (
                            <Badge key={tool} variant="outline">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailPage;
