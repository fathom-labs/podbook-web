import AITextEditor from "@/components/AITextEditor";
import { useParams } from "react-router-dom";

const AIEditor = () => {
  // For demo purposes, use default values if no params
  const { projectId = "demo-project", projectTitle = "My Book Project" } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <AITextEditor 
        projectId={projectId} 
        projectTitle={projectTitle} 
      />
    </div>
  );
};

export default AIEditor;
