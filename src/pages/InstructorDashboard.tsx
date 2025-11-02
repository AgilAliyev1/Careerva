import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
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

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: "Programming" | "Design" | "Business" | "Languages";
    scheduledDate: string;
    scheduledTime: string;
    durationMinutes: number;
    meetingLink: string;
  }>({
    title: "",
    description: "",
    category: "Programming",
    scheduledDate: "",
    scheduledTime: "",
    durationMinutes: 60,
    meetingLink: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      fetchCourses(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchCourses = async (instructorId: string) => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select(`
          *,
          profiles!instructor_id (
            full_name
          )
        `)
        .eq("instructor_id", instructorId)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const scheduledDateTime = new Date(
      `${formData.scheduledDate}T${formData.scheduledTime}`
    ).toISOString();

    try {
      if (editingCourse) {
        const { error } = await supabase
          .from("courses")
          .update({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            scheduled_date: scheduledDateTime,
            duration_minutes: formData.durationMinutes,
            meeting_link: formData.meetingLink,
          })
          .eq("id", editingCourse.id);

        if (error) throw error;
        toast({ title: "Course updated successfully!" });
      } else {
        const { error } = await supabase.from("courses").insert([{
          title: formData.title,
          description: formData.description,
          category: formData.category,
          instructor_id: user.id,
          scheduled_date: scheduledDateTime,
          duration_minutes: formData.durationMinutes,
          meeting_link: formData.meetingLink,
        }]);

        if (error) throw error;
        toast({ title: "Course created successfully!" });
      }

      setDialogOpen(false);
      resetForm();
      fetchCourses(user.id);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Programming" as "Programming" | "Design" | "Business" | "Languages",
      scheduledDate: "",
      scheduledTime: "",
      durationMinutes: 60,
      meetingLink: "",
    });
    setEditingCourse(null);
  };

  const handleEdit = (course: Course) => {
    const date = new Date(course.scheduled_date);
    setFormData({
      title: course.title,
      description: course.description || "",
      category: course.category as "Programming" | "Design" | "Business" | "Languages",
      scheduledDate: date.toISOString().split("T")[0],
      scheduledTime: date.toTimeString().slice(0, 5),
      durationMinutes: course.duration_minutes,
      meetingLink: course.meeting_link,
    });
    setEditingCourse(course);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Instructor Dashboard</h1>
            <p className="text-muted-foreground">Create and manage your courses</p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">You haven't created any courses yet</p>
            <Button onClick={() => setDialogOpen(true)}>Create Your First Course</Button>
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
                onEdit={() => handleEdit(course)}
                isInstructor
              />
            ))}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCourse ? "Edit Course" : "Create New Course"}</DialogTitle>
            <DialogDescription>
              Fill in the details for your live course
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value: "Programming" | "Design" | "Business" | "Languages") => 
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Programming">Programming</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Languages">Languages</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.durationMinutes}
                onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meeting">Meeting Link (Zoom/Google Meet)</Label>
              <Input
                id="meeting"
                type="url"
                placeholder="https://zoom.us/j/..."
                value={formData.meetingLink}
                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {editingCourse ? "Update Course" : "Create Course"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}