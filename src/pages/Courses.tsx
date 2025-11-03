import { useCallback, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoCourses as demoCatalog, DemoCourse, demoInstructorRatings } from "@/lib/demoData";

type Course = DemoCourse;

export default function Courses() {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>(demoCatalog);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [instructorRatings, setInstructorRatings] = useState<
    Record<string, { average: number; count: number }>
  >(() => {
    const defaults: Record<string, { average: number; count: number }> = {};
    Object.entries(demoInstructorRatings).forEach(([id, details]) => {
      defaults[id] = { average: details.rating, count: details.totalReviews };
    });
    return defaults;
  });

  const hydrateInstructorRatings = useCallback(async (instructorIds: string[]) => {
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
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
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

      const combinedCourses = [...demoCatalog];
      supabaseCourses.forEach((course) => {
        if (!combinedCourses.find((demo) => demo.id === course.id)) {
          combinedCourses.push(course);
        }
      });

      setCourses(combinedCourses);
      await hydrateInstructorRatings(combinedCourses.map((course) => course.instructor_id));
    } catch (error: any) {
      toast({
        title: "Showing demo catalog",
        description: "We're displaying our curated demo courses while live data loads.",
      });
      setCourses(demoCatalog);
      await hydrateInstructorRatings(demoCatalog.map((course) => course.instructor_id));
    } finally {
      setLoading(false);
    }
  }, [hydrateInstructorRatings, toast]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const categories = ["all", "Programming", "Design", "Business", "Languages"];

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Live Courses</h1>
          <p className="text-xl text-muted-foreground">
            Explore our catalog of live online courses
          </p>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {loading && courses.length === 0 ? (
          <div className="text-center py-12">Loading courses...</div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses available in this category yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
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
        )}
      </div>
    </div>
  );
}