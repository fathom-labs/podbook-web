import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AITextEditor from "@/components/AITextEditor";
import SupportModal from "@/components/SupportModal";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Eye, 
  Calendar, 
  Clock, 
  FileText, 
  Rss, 
  User,
  Target,
  ArrowLeft,
  Share2,
  Edit3,
  Loader2,
  MessageSquare,
  CheckCircle,
  X,
  Sparkles,
  MessageCircle
} from "lucide-react";
import { Label } from "@/components/ui/label";
import LeftNavigation from "@/components/LeftNavigation";
import BookOverview from "@/components/BookOverview";
import Book3D from "@/components/Book3D";
import { projectAPI } from "@/services/api";

interface Chapter {
  id: string;
  title: string;
  description: string;
  wordCount: number;
  estimatedPages: number;
}

interface Upload {
  id: string;
  filename: string;
  url: string;
  size: number; // duration in seconds
  contentType: string;
  source: string;
  status: string;
  createdAt: string;
  projectId: string;
  userId: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
  audience: string;
  rss_url: string;
  status: 'DRAFT' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  created_at: string;
  pages_count: number;
  word_count: number;
  chapters_count: number;
  file_size: string;
  format: string;
  estimated_cost: number;
  chapters?: Chapter[];
  type?: string;
  uploads?: Upload[];
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Modal states
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showContactSupportModal, setShowContactSupportModal] = useState(false);
  const [showViewBookModal, setShowViewBookModal] = useState(false);
  const [showOrderPlacedModal, setShowOrderPlacedModal] = useState(false);
  const [showOrderCompletedModal, setShowOrderCompletedModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchProject = async () => {
      if (!id) return;
      try {
        const resp = await projectAPI.getProject(id);
        const data = (resp?.data ?? resp) as any;

        // Normalize fields from API (support snake_case and camelCase)
        const normalized: Project = {
          id: data.id || id,
          title: data.title || data.details?.title || 'Untitled Project',
          description: data.description || data.details?.description || '',
          author: data.author || data.details?.author || '',
          audience: data.audience || data.details?.audience || '',
          rss_url: data.rss_url || data.content?.rssFeed || '',
          status: (data.status || 'draft') as Project['status'],
          created_at: data.created_at || data.createdAt || new Date().toISOString(),
          pages_count: Number(data.targetPages ?? 50),
          chapters_count: Number(data.targetChapters ?? 11),
          word_count: Number(data.targetPages * 250 || 20000),
          file_size: data.file_size || data.fileSize || '—',
          format: data.format || data.specs?.format || 'PDF',
          estimated_cost: Number(data.estimatedCost ?? 0),
          chapters: (data.chapters || []).map((ch: any, idx: number) => ({
            id: ch.id?.toString() || String(idx + 1),
            title: ch.title || `Chapter ${idx + 1}`,
            description: ch.description || '',
            wordCount: Number(ch.wordCount ?? 0),
            estimatedPages: Number(ch.estimatedPages ?? 0),
          })),
          type: data.type || data.bookType || data.details?.type,
          uploads: data.uploads || [],
        };
        if (isMounted) {
          setProject(normalized);
          setLoading(false);
        }
      } catch (e) {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    setLoading(true);
    fetchProject();
    return () => { isMounted = false; };
  }, [id]);

  // Auto-show modals when page loads in specific states
  useEffect(() => {
    if (project?.status === 'PROCESSING') {
      setShowOrderPlacedModal(true);
    } else if (project?.status === 'COMPLETED') {
      setShowOrderCompletedModal(true);
    }
  }, [project?.status]);

  // Modal handlers
  const handleDownload = () => {
    setShowDownloadModal(true);
  };

  const handleContactSupport = () => {
    setShowContactSupportModal(true);
  };

  const handleViewBook = () => {
    navigate('/book-review/demo-book-id');
  };

  const confirmDownload = () => {
    // TODO: Implement actual download logic
    setShowDownloadModal(false);
    // Simulate download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Your book content here';
    link.download = `${project?.title || 'book'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <LeftNavigation activePage="project-detail" />
          {/* Main Content Area */}
          <main className="flex-1 p-8">
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading project details...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // If editing, show the AI text editor
  if (isEditing) {
    return (
      <div className="min-h-screen bg-background">
        <AITextEditor projectId={project?.id || ''} projectTitle={project?.title || ''} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <LeftNavigation activePage="project-detail" />
          {/* Main Content Area */}
          <main className="flex-1 p-8">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Project not found</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // If draft, show BookOverview using project info
  if (project.status === 'DRAFT') {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <LeftNavigation activePage="project-detail" />
          <main className="flex-1 p-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-medium text-foreground mb-2">{project.title}</h1>
                    <p className="text-lg text-muted-foreground max-w-3xl">{project.description}</p>
                  </div>
                  <Badge variant="secondary">Draft</Badge>
                </div>
              </div>

              <BookOverview
                preview={{
                  totalWords: project.word_count || 0,
                  totalPages: project.pages_count || 0,
                  estimatedCost: project.estimated_cost || 0,
                }}
                selectedBookType={project.type || 'non-fiction'}
                bookSpecs={{ targetPages: [project.pages_count || 150], targetChapters: [project.chapters_count || 10], format: project.format || 'pdf' }}
                contentSources={{ 
                  rssFeed: project.rss_url || '', 
                  uploadedFiles: (project.uploads || []).map(upload => ({
                    name: upload.filename,
                    size: upload.size, // duration in seconds
                    type: upload.contentType,
                    source: upload.source,
                  })),
                  textContent: '', 
                  urls: [] 
                }}
                processing={false}
                processingProgress={0}
                onPurchase={async (calculatedPrice: number) => {
                  try {
                    // Update project status to PROCESSING and save the calculated price
                    await projectAPI.completeProject(project.id, {
                      status: 'PROCESSING',
                      processingStartedAt: new Date().toISOString(),
                      estimatedCost: calculatedPrice,
                    } as any);

                    const orderId = 'order-' + Date.now();
                    const orderData = {
                      id: orderId,
                      projectId: project.id,
                      bookTitle: project.title,
                      bookType: project.type || 'non-fiction',
                      targetPages: project.pages_count || 150,
                      pricing: {
                        subtotal: calculatedPrice - 0.20, // Subtract processing fee to get subtotal
                        processingFee: 0.20,
                        total: calculatedPrice,
                      },
                    } as any;
                    localStorage.setItem('currentOrder', JSON.stringify(orderData));
                    navigate(`/order-processing/${orderId}`);
                  } catch (error) {
                    console.error('Failed to update project status:', error);
                    // Still proceed with order creation even if status update fails
                    const orderId = 'order-' + Date.now();
                    const orderData = {
                      id: orderId,
                      projectId: project.id,
                      bookTitle: project.title,
                      bookType: project.type || 'non-fiction',
                      targetPages: project.pages_count || 150,
                      pricing: {
                        subtotal: calculatedPrice - 0.20,
                        processingFee: 0.20,
                        total: calculatedPrice,
                      },
                    } as any;
                    localStorage.setItem('currentOrder', JSON.stringify(orderData));
                    navigate(`/order-processing/${orderId}`);
                  }
                }}
              />

              {/* Pass through projectId if needed by nested components */}
              <div className="mt-6 text-sm text-muted-foreground">Project ID: {project.id}</div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const getStepTitle = (step: string) => {
    switch (step) {
      case 'content-analysis': return 'Content Analysis';
      case 'ai-generation': return 'AI Content Generation';
      case 'human-review': return 'Human Review & Quality Check';
      case 'final-formatting': return 'Final Formatting & Export';
      default: return step;
    }
  };

  const getStepDescription = (step: string) => {
    switch (step) {
      case 'content-analysis': return 'Analyzing your content sources and extracting key information';
      case 'ai-generation': return 'AI is generating your book content based on the analysis';
      case 'human-review': return 'Our team is reviewing and refining the AI-generated content';
      case 'final-formatting': return 'Final formatting and preparing your book for download';
      default: return '';
    }
  };

  const renderBookInfo = (status: string) => {
    const metrics = {
      processing: [
        { value: project.pages_count.toString(), label: 'Target Pages' },
        { value: project.chapters_count.toString(), label: 'Chapters' },
        { value: `$${project.estimated_cost}`, label: 'Total Cost' },
        { value: '4', label: 'Days Left' }
      ],
      'under-review': [
        { value: project.pages_count.toString(), label: 'Pages' },
        { value: `${(project.word_count / 1000).toFixed(1)}K`, label: 'Words' },
        { value: project.chapters_count.toString(), label: 'Chapters' },
        { value: '2-3', label: 'Days Left' }
      ],
      'post-approval': [
        { value: project.pages_count.toString(), label: 'Pages' },
        { value: `${(project.word_count / 1000).toFixed(1)}K`, label: 'Words' },
        { value: project.chapters_count.toString(), label: 'Chapters' },
        { value: project.format, label: 'Format' }
      ],
      completed: [
        { value: project.pages_count.toString(), label: 'Pages' },
        { value: `${(project.word_count / 1000).toFixed(1)}K`, label: 'Words' },
        { value: project.chapters_count.toString(), label: 'Chapters' },
        { value: project.file_size, label: 'File Size' }
      ]
    };

    const currentMetrics = metrics[status as keyof typeof metrics] || metrics.completed;

    return (
      <div className="space-y-16">
        <div>
          <h2 className="text-4xl font-bold text-foreground mb-8">{project.title}</h2>
          <p className="text-muted-foreground mb-16">{project.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {currentMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {status === 'processing' && (
          <Card>
            <CardHeader>
              <CardTitle>Processing Steps</CardTitle>
              <CardDescription>Your book is being created through these stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {['content-analysis', 'ai-generation', 'human-review', 'final-formatting'].map((step, index) => (
                  <div key={step} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-sm font-semibold text-primary">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2 text-foreground">{getStepTitle(step)}</h3>
                      <p className="text-sm text-muted-foreground">
                        {getStepDescription(step)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Human Review Notice - Only show for processing state */}
        {status === 'processing' && (
          <Card className="border-border bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <User className="w-5 h-5" />
                Human Review Included
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Every book goes through our expert review process to ensure quality, accuracy, and readability. 
                This step typically takes 1-2 business days and includes:
              </p>
              <ul className="text-muted-foreground text-sm space-y-2 ml-4">
                <li>• Content accuracy verification</li>
                <li>• Grammar and style review</li>
                <li>• Formatting consistency check</li>
                <li>• Final quality assurance</li>
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Support Card - Only show for processing state */}
        {status === 'processing' && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Have questions about your order?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 text-sm mb-4">
                Our support team is here to help with any questions about your order or the processing timeline.
              </p>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setShowContactSupportModal(true)}
              >
                <MessageCircle className="w-4 h-5 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        )}

        {status === 'under-review' && (
          <>
            {/* Action Bar */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost" disabled>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" onClick={handleViewBook}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Book
                  </Button>
                  <Button variant="outline" onClick={handleContactSupport}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">Your book is currently under review. Download will be available once approved.</p>
              </CardContent>
            </Card>

            {/* Review Status */}
            <Card>
              <CardHeader>
                <CardTitle>Review Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Request Date</span>
                  <span className="text-sm text-foreground">2 days ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Estimated Review Time</span>
                  <span className="text-sm text-foreground">3-5 business days</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Current Status</span>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground">Under Team Review</Badge>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {status === 'post-approval' && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Book
                </Button>
                <Button variant="outline" onClick={handleViewBook}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Content
                </Button>
                <Button variant="outline" onClick={handleContactSupport}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Your book has been approved and is ready for download. You have 7 days to review before the refund period expires.</p>
            </CardContent>
          </Card>
        )}

        {status === 'completed' && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" onClick={handleViewBook}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Book
                </Button>
                <Button variant="outline" onClick={handleContactSupport}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Get Support
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Your book is complete and ready for download. All chapters have been generated and reviewed.</p>
            </CardContent>
          </Card>
        )}

        {/* Refund Policy Notice - Only show for completed state */}
        {status === 'completed' && (
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-amber-600" />
                <h4 className="text-sm font-medium text-amber-800">Refund Policy Notice</h4>
              </div>
              <p className="text-xs text-amber-700 mb-3">
                You have <span className="font-semibold">7 days</span> from completion to request a refund if you're not satisfied with your book.
              </p>
              <div className="text-xs text-amber-600">
                <span className="font-medium">Time remaining:</span> 6 days, 23 hours, 45 minutes
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  // Map project status to landing page status
  const getLandingPageStatus = (status: string) => {
    switch (status) {
      case 'PROCESSING': return 'processing';
      case 'COMPLETED': return 'completed';
      case 'FAILED': return 'under-review';
      default: return 'completed';
    }
  };

  const currentStatus = getLandingPageStatus(project.status);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Navigation */}
      <LeftNavigation activePage="project-detail" />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Back Button */}
        <div className="px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/projects')} 
            className="hover:bg-muted p-2 h-10 w-10 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Book Cover Section */}
            <div className="lg:col-span-1">
              <Book3D 
                pageCount={project.pages_count}
                title={project.title}
                author={`by ${project.author}`}
              />
            </div>

            {/* Book Info Section */}
            <div className="lg:col-span-2">
              {renderBookInfo(currentStatus)}
            </div>
          </div>
        </main>

        {/* Chapters Component for Completed, Under Review, and Post Approval States */}
        {(currentStatus === 'completed' || currentStatus === 'under-review' || currentStatus === 'post-approval') && (
          <div className="px-8 pb-8 mt-16">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Content Overview</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {(project.chapters || []).map((chapter, index) => (
                    <div 
                      key={chapter.id} 
                      className="group relative p-4 border rounded-lg hover:bg-muted/30 hover:border-muted-foreground/30 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                              {index + 1}
                            </div>
                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {chapter.title}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {chapter.description}
                          </p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground ml-4">
                          <div className="font-medium text-foreground">
                            {chapter.wordCount.toLocaleString()} words
                          </div>
                          <div className="text-xs">
                            ~{chapter.estimatedPages} pages
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover indicator */}
                      <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-primary/20 transition-colors pointer-events-none"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Download Confirmation Modal */}
        {showDownloadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full relative shadow-lg max-h-[90vh] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={() => setShowDownloadModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Warning icon */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                  <Download className="w-12 h-12 text-amber-600" />
                </div>
              </div>
              
              {/* Warning message */}
              <h2 className="text-2xl font-bold text-center mb-4 text-foreground">
                Confirm Download
              </h2>
              <p className="text-center text-muted-foreground mb-6">
                By downloading this book, you confirm that you are satisfied with the content and waive your right to request a refund.
              </p>
              
              {/* Warning box */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-amber-800 mb-2">⚠️ Important Notice:</h4>
                <p className="text-sm text-amber-700">
                  Downloading this book will permanently waive your 7-day refund eligibility period.
                </p>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={() => setShowDownloadModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={confirmDownload}
                  className="flex-1 bg-amber-600 hover:bg-amber-700"
                >
                  Confirm & Download
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Support Modal */}
        <SupportModal
          isOpen={showContactSupportModal}
          onClose={() => setShowContactSupportModal(false)}
          pageUrl={window.location.href}
          userEmail={user?.email}
        />

        {/* View Book Modal */}
        {showViewBookModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-8 max-w-4xl mx-4 relative shadow-lg w-full max-h-[90vh] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={() => setShowViewBookModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Book content preview */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  {project.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  Preview your book content before downloading
                </p>
              </div>
              
              {/* Book chapters preview */}
              <div className="space-y-4 mb-6">
                {(project.chapters || []).map((chapter, index) => (
                  <div 
                    key={chapter.id} 
                    className="p-4 border rounded-lg hover:bg-muted/30 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                            {index + 1}
                          </div>
                          <h3 className="font-medium text-foreground">
                            {chapter.title}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {chapter.description}
                        </p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground ml-4">
                        <div className="font-medium text-foreground">
                          {chapter.wordCount.toLocaleString()} words
                        </div>
                        <div className="text-xs">
                          ~{chapter.estimatedPages} pages
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-3 justify-center">
                <Button 
                  variant="outline"
                  onClick={() => setShowViewBookModal(false)}
                  className="flex-1 max-w-xs"
                >
                  Close Preview
                </Button>
                <Button 
                  onClick={() => {
                    setShowViewBookModal(false);
                    navigate('/book-review/demo-book-id');
                  }}
                  className="flex-1 max-w-xs bg-primary hover:bg-primary/90"
                >
                  Open Full Reader
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Order Placed Successfully Modal */}
        {showOrderPlacedModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full relative shadow-lg max-h-[90vh] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={() => setShowOrderPlacedModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Sparkles icon */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
              </div>
              
              {/* Success message */}
              <h2 className="text-2xl font-bold text-center mb-4 text-foreground">
                Order Placed Successfully!
              </h2>
              <p className="text-center text-muted-foreground mb-6">
                Your book is now being processed. We'll keep you updated on the progress.
              </p>
              
              {/* Action buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowOrderPlacedModal(false)}
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Order Completed Modal */}
        {showOrderCompletedModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full relative shadow-lg max-h-[90vh] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={() => setShowOrderCompletedModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Success icon */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              
              {/* Success message */}
              <h2 className="text-2xl font-bold text-center mb-4 text-foreground">
                Your Book is Ready!
              </h2>
              <p className="text-center text-muted-foreground mb-6">
                Your book has been completed and is ready for review. You have 7 days to review it before downloading.
              </p>
              
              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-800 mb-2">Important:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Review your book within 7 days</li>
                  <li>• Downloading waives refund eligibility</li>
                  <li>• Contact support if you have questions</li>
                </ul>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowOrderCompletedModal(false)}
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;

