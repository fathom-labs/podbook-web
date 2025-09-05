import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  CheckCircle,
  MessageCircle,
  X
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import LeftNavigation from "@/components/LeftNavigation";

interface Chapter {
  id: string;
  title: string;
  description: string;
  wordCount: number;
  estimatedPages: number;
}

interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  audience: string;
  rss_url: string;
  status: 'completed';
  created_at: string;
  completed_at: string;
  pages_count: number;
  word_count: number;
  chapters_count: number;
  file_size: string;
  format: string;
  estimated_cost: number;
  chapters: Chapter[];
}

const BookPostApproval = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  useEffect(() => {
    // Simulate loading book data
    setTimeout(() => {
      const mockBook: Book = {
        id: id || '1',
        title: 'Tech News Weekly Digest',
        description: 'A comprehensive compilation of the latest technology news and insights from leading industry sources, curated and organized into a structured book format.',
        author: 'John Doe',
        audience: 'Technology professionals and enthusiasts',
        rss_url: 'https://example.com/tech-news-feed',
        status: 'completed',
        created_at: '2024-01-15',
        completed_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days ago
        pages_count: 124,
        word_count: 45600,
        chapters_count: 8,
        file_size: '2.3 MB',
        format: 'PDF',
        estimated_cost: 25,
        chapters: [
          { id: '1', title: 'Introduction to Tech Trends', description: 'Overview of current technology landscape', wordCount: 1200, estimatedPages: 4 },
          { id: '2', title: 'Artificial Intelligence Breakthroughs', description: 'Latest developments in AI and machine learning', wordCount: 1800, estimatedPages: 6 },
          { id: '3', title: 'Cloud Computing Evolution', description: 'Advances in cloud infrastructure and services', wordCount: 2400, estimatedPages: 8 },
          { id: '4', title: 'Cybersecurity Updates', description: 'New threats and protection strategies', wordCount: 2000, estimatedPages: 7 },
          { id: '5', title: 'Mobile Technology Trends', description: 'Innovations in mobile devices and apps', wordCount: 1600, estimatedPages: 6 },
          { id: '6', title: 'Blockchain Developments', description: 'Cryptocurrency and blockchain technology updates', wordCount: 1400, estimatedPages: 5 },
          { id: '7', title: 'Internet of Things', description: 'Connected devices and smart technology', wordCount: 1200, estimatedPages: 4 },
          { id: '8', title: 'Future Outlook', description: 'Predictions and emerging technologies', wordCount: 800, estimatedPages: 3 },
        ]
      };
      setBook(mockBook);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleDownload = () => {
    setShowDownloadModal(true);
  };

  const confirmDownload = () => {
    setShowDownloadModal(false);
    
    // Simulate download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Your book content here';
    link.download = `${book?.title || 'book'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <LeftNavigation activePage="projects" />
          <main className="flex-1 p-8">
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Loading your approved book...</h2>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <LeftNavigation activePage="projects" />
          <main className="flex-1 p-8">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-4">Book not found</h2>
              <Button onClick={() => navigate('/projects')}>Return to Projects</Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <LeftNavigation activePage="projects" />
        <main className="flex-1 p-8 relative">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/projects')} 
            className="absolute top-8 left-8 hover:bg-muted back-button p-2 h-10 w-10 rounded-full z-10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>

          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <h1 className="text-3xl font-bold text-foreground">Book Approved & Ready!</h1>
                </div>
                <p className="text-muted-foreground">
                  Your book "{book.title}" has been approved and is ready for download
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Pages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium text-foreground">{book.pages_count}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Word Count
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium text-foreground">{book.word_count.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    File Size
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium text-foreground">{book.file_size}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Format
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium text-foreground">{book.format}</div>
                </CardContent>
              </Card>
            </div>

            {/* Book Details */}
            <div className="mb-8">
              <div className="space-y-6">
                {/* Hero Section with Book Title and Status */}
                <div className="text-center space-y-4">
                  <h1 className="text-3xl font-bold text-foreground">{book.title}</h1>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Approved & Available</span>
                  </div>
                </div>

                {/* Approval Status Card */}
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-green-800">Book Successfully Approved!</h3>
                      <p className="text-sm text-green-700">
                        Your book has been reviewed and approved. The 7-day review period has ended, and your book is now permanently accepted.
                      </p>
                      <div className="text-xs text-green-600">
                        Approved on: {new Date(book.completed_at).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Book Information - Compact Grid */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Book Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Author</Label>
                          <p className="text-foreground font-medium">{book.author}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Target Audience</Label>
                          <p className="text-foreground font-medium">{book.audience}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Format</Label>
                          <p className="text-foreground font-medium">{book.format}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Completed</Label>
                          <p className="text-foreground font-medium">{new Date(book.completed_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <Label className="text-sm font-medium text-muted-foreground">Source RSS Feed</Label>
                      <p className="text-foreground break-all text-sm bg-muted/50 p-3 rounded-md mt-2">{book.rss_url}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Primary Actions - Download Only */}
                <Card className="bg-muted/30 border-2 border-dashed border-muted-foreground/20">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Ready to Download</h3>
                      <p className="text-sm text-muted-foreground">Your book is approved and ready for immediate download.</p>
                      <div className="flex justify-center">
                        <Button 
                          size="lg"
                          onClick={handleDownload}
                          className="px-8"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Book
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Chapters Overview */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Content Overview</CardTitle>
                        <CardDescription className="mt-1">
                          {book.chapters.length} chapters • {book.word_count.toLocaleString()} total words
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Content Approved</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {book.chapters.map((chapter, index) => (
                        <div 
                          key={chapter.id} 
                          className="group relative p-4 border rounded-lg hover:bg-muted/30 hover:border-muted-foreground/30 transition-all duration-200 cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 text-sm font-semibold">
                                  {index + 1}
                                </div>
                                <h3 className="font-medium text-foreground group-hover:text-green-600 transition-colors">
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
                          <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-green-200 transition-colors pointer-events-none"></div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Summary Stats */}
                    <div className="mt-6 pt-6 border-t">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-600">{book.chapters.length}</div>
                          <div className="text-xs text-muted-foreground">Chapters</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">{book.word_count.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Total Words</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">
                            {Math.round(book.word_count / 250)}
                          </div>
                          <div className="text-xs text-muted-foreground">Est. Pages</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Download Confirmation Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md mx-4 relative shadow-lg">
            {/* Close button */}
            <button
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Success icon */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Download className="w-12 h-12 text-green-600" />
              </div>
            </div>
            
            {/* Success message */}
            <h2 className="text-2xl font-bold text-center mb-4 text-foreground">
              Download Your Book
            </h2>
            <p className="text-center text-muted-foreground mb-6">
              Your book is approved and ready for download. Enjoy your content!
            </p>
            
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
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Download Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPostApproval;
