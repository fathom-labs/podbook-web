import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, BookOpen } from "lucide-react";
import LeftNavigation from "@/components/LeftNavigation";
import BookCard from "@/components/BookCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projectAPI } from "@/services/api";

interface Project {
  id: string;
  title: string;
  status: 'processing' | 'completed' | 'failed' | 'draft' | 'archived';
  edited_at?: string;
  word_count?: number;
  pages_count?: number;
}

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchProjects = async () => {
      try {
        const resp = await projectAPI.listProjects();
        const items = (resp?.data ?? resp ?? []) as any[];
        const mapped: Project[] = items.map((p) => ({
          id: p.id,
          title: p.title ?? 'Untitled Project',
          status: (p.status?.toLowerCase?.() ?? 'draft') as Project['status'],
          edited_at: p.updatedAt ?? undefined,
          word_count: p.totalWords ?? undefined,
          pages_count: p.targetPages ?? undefined,
        }));
        if (mounted) {
          setProjects(mapped);
          setLoading(false);
        }
      } catch (e: any) {
        if (mounted) {
          setError(e?.message || 'Failed to load projects');
          setLoading(false);
        }
      }
    };
    fetchProjects();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Calculate statistics
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const processingProjects = projects.filter(p => p.status === 'processing').length;
  const totalPages = projects
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + (p.pages_count || 0), 0);



  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
                <LeftNavigation activePage="projects" />

        {/* Main Content Area */}
        <main className="flex-1 p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-medium text-foreground mb-2">
              My Projects
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage and download your RSS-to-book conversions
            </p>
          </div>
          
          <Button asChild size="lg" className="gradient-primary mt-4 sm:mt-0">
            <Link to="/new-project">
              <Plus className="h-5 w-5 mr-2" />
              New Project
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium text-foreground">{projects.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium text-success">{completedProjects}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium text-warning">{processingProjects}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium text-primary">{totalPages}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {!loading && filteredProjects.map((project) => (
            <BookCard key={project.id} project={{
              id: project.id,
              title: project.title,
              // Map extra statuses to nearest supported ones used by BookCard
              status: (project.status === 'draft' ? 'draft' : project.status === 'failed' ? 'failed' : project.status) as 'processing' | 'completed' | 'failed',
              edited_at: project.edited_at,
              word_count: project.word_count,
              pages_count: project.pages_count,
            }} />
          ))}
        </div>

        {loading && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Loading projects...</h3>
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No projects found
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm 
                ? "Try adjusting your search criteria."
                : "Create your first RSS-to-book project to get started."
              }
            </p>
            {!searchTerm && (
              <Button asChild className="gradient-primary">
                <Link to="/new-project">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Project
                </Link>
              </Button>
            )}
            </div>
        )}
        </main>
      </div>
    </div>
  );
};

export default Projects;