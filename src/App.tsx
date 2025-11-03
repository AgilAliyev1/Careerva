import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import Subscription from "./pages/Subscription";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const computeBasename = () => {
  const globalBase = (window as typeof window & {
    __APP_BASE_PATH__?: string;
  }).__APP_BASE_PATH__;

  const declaredBase =
    globalBase ?? import.meta.env.VITE_BASE_PATH ?? import.meta.env.BASE_URL ?? "/";

  const normalized = new URL(declaredBase, window.location.origin).pathname.replace(
    /\/$/,
    "",
  );

  if (normalized || !window.location.hostname.endsWith("github.io")) {
    return normalized;
  }

  const segments = window.location.pathname.split("/").filter(Boolean);
  if (!segments.length) {
    return "";
  }

  return `/${segments[0]}`;
};

const basename = computeBasename();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
