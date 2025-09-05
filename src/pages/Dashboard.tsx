import { useNavigate } from "react-router-dom";
import LeftNavigation from "@/components/LeftNavigation";
import ChatInput from "@/components/ChatInput";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { BookOpen, GraduationCap } from "lucide-react";
import { DashboardActionCard } from "@/components/DashboardActionCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();





  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="flex">
          <LeftNavigation activePage="dashboard" />

          {/* Main Content Area */}
          <main className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl font-medium text-foreground mb-6">
                Hi {user?.name || 'there'}!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Ready to create something amazing? Start a new project below.
              </p>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <DashboardActionCard
                  title="Generate New Book"
                  description="Create a new book from scratch with AI assistance. Upload your content, set preferences, and let us help you craft your masterpiece."
                  icon={<BookOpen size={32} />}
                  onClick={() => navigate('/new-project')}
                />
                <DashboardActionCard
                  title="Learn File Preparation"
                  description="Master the art of preparing your files for book creation. Get step-by-step guidance on formatting, organization, and best practices."
                  icon={<GraduationCap size={32} />}
                  onClick={() => navigate('/file-prep')}
                />
              </div>
              
              {/*<ChatInput 
                onSubmit={(value, files) => {
                  console.log('Chat input submitted:', value);
                  console.log('Files attached:', files);
                  
                  // Simulate book creation flow for logged-in user
                  if (value.trim() || files.length > 0) {
                    // Store the input data in sessionStorage for the new project flow
                    const projectData = {
                      prompt: value.trim(),
                      files: files,
                      timestamp: new Date().toISOString(),
                      source: 'dashboard-chat'
                    };
                    
                    sessionStorage.setItem('newProjectData', JSON.stringify(projectData));
                    
                    // Navigate to new project page
                    navigate('/new-project');
                  }
                }}
                placeholder="Add an RSS feed, upload files, write a prompt, to start your book..."
                showQuickActions={true}
              />*/}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;