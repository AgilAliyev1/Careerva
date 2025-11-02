import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function Courses() {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchCourses();
  }, []);

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

        {loading ? (
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}