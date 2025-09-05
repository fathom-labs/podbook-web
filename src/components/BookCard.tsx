import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Eye, Edit, Download, Clock } from "lucide-react";
import StatusChip from "./StatusChip";

interface BookCardProps {
  project: {
    id: string;
    title: string;
    status: 'processing' | 'completed' | 'failed' | 'draft';
    edited_at?: string;
    word_count?: number;
    pages_count?: number;
  };
  showActions?: boolean;
}

const BookCard = ({ project, showActions = true }: BookCardProps) => {
  const navigate = useNavigate();
  const isCompleted = project.status === 'completed';
  const isProcessing = project.status === 'processing';
  const isDraft = project.status === 'draft';
  const isFailed = project.status === 'failed';

  const handleCardClick = () => {
    // Navigate to book landing variations with appropriate state
    /*if (project.id === 'order-demo') {
      navigate(`/order-processing/${project.id}`);
    } else if (isProcessing || isFailed) {
      navigate(`/book-landing-variations?state=processing`);
    } else if (isCompleted) {
      navigate(`/book-landing-variations?state=completed`);
    } else {
      navigate(`/book-landing-variations?state=processing`);
    }*/
      navigate(`/projects/${project.id}`);
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" 
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between mb-3">
        <BookOpen className="h-6 w-6 text-primary mt-1" />
        <StatusChip status={project.status} />
      </div>
      
      <h3 className="font-medium text-foreground mb-2">{project.title}</h3>
      
      <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
        {project.edited_at && (
          <span>Edited: {new Date(project.edited_at).toLocaleDateString()}</span>
        )}
        {project.word_count && (
          <span>{project.word_count.toLocaleString()} words</span>
        )}
        {project.pages_count && (
          <span>~{project.pages_count} pages</span>
        )}
      </div>

      {showActions && (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          {/* View Button - Always enabled */}
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to={ `/projects/${project.id}`}
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Link>
          </Button>

          {/* Failed State: View + Retry */}
          {isFailed && (
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link to={`/processing/${project.id}`}>
                <Clock className="h-4 w-4 mr-2" />
                Retry
              </Link>
            </Button>
          )}

          {/* Processing State: View + Edit (ghosted) + Download (ghosted) */}
          {isProcessing && (
            <>
              {/*<Button variant="outline" size="sm" className="flex-1" disabled>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>*/}
              <Button variant="outline" size="sm" className="flex-1" disabled>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </>
          )}

          {/* Completed State: View + Edit + Download */}
          {isCompleted && (
            <>
              {/*<Button variant="outline" size="sm" className="flex-1" asChild>
                <Link to={`/projects/${project.id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>*/}
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BookCard;
