import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ExternalLink, Info, Star } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  description?: string;
  category: string;
  instructorName: string;
  scheduledDate: string;
  durationMinutes: number;
  meetingLink?: string;
  detailHref?: string;
  detailLabel?: string;
  onJoin?: () => void;
  onEdit?: () => void;
  isInstructor?: boolean;
  onSecondaryAction?: () => void;
  secondaryActionLabel?: string;
  ratingAverage?: number | null;
  ratingCount?: number | null;
}

export const CourseCard = ({
  title,
  description,
  category,
  instructorName,
  scheduledDate,
  durationMinutes,
  meetingLink,
  detailHref,
  detailLabel = "View details",
  onJoin,
  onEdit,
  isInstructor = false,
  onSecondaryAction,
  secondaryActionLabel,
  ratingAverage,
  ratingCount,
}: CourseCardProps) => {
  const categoryColors: Record<string, string> = {
    Programming: "bg-blue-500/10 text-blue-700 border-blue-200",
    Design: "bg-purple-500/10 text-purple-700 border-purple-200",
    Business: "bg-green-500/10 text-green-700 border-green-200",
    Languages: "bg-orange-500/10 text-orange-700 border-orange-200",
  };

  return (
    <Card className="hover:shadow-[var(--card-hover-shadow)] transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge className={categoryColors[category] || ""}>{category}</Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && (
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{instructorName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(scheduledDate), "PPP")}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            {format(new Date(scheduledDate), "p")} ({durationMinutes} min)
          </span>
        </div>
        {typeof ratingAverage === "number" && ratingAverage > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span>
              {ratingAverage.toFixed(2)}
              {typeof ratingCount === "number" ? ` (${ratingCount} reviews)` : ""}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        {isInstructor ? (
          <Button onClick={onEdit} variant="outline" className="w-full">
            Edit Course
          </Button>
        ) : detailHref ? (
          <Button asChild className="w-full">
            <Link to={detailHref} onClick={onJoin}>
              <Info className="h-4 w-4" />
              <span>{detailLabel}</span>
            </Link>
          </Button>
        ) : (
          <Button
            onClick={() => {
              if (meetingLink) {
                window.open(meetingLink, "_blank");
              }
              onJoin?.();
            }}
            className="w-full"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Join Class
          </Button>
        )}
        {!isInstructor && onSecondaryAction && secondaryActionLabel && (
          <Button onClick={onSecondaryAction} variant="outline" className="w-full">
            {secondaryActionLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};