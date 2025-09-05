import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  Eye, 
  Calendar, 
  FileText, 
  Rss, 
  User,
  Target,
  ArrowLeft,
  AlertTriangle,
  MessageCircle,
  X,
  HelpCircle
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
  status: 'under_review';
  created_at: string;
  completed_at: string;
  pages_count: number;
  word_count: number;
  chapters_count: number;
  file_size: string;
  format: string;
  estimated_cost: number;
  chapters: Chapter[];
  review_request_type: 'refund' | 'modification';
  review_request_date: string;
  estimated_review_time: string;
}

const BookUnderReview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

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
        status: 'under_review',
        created_at: '2024-01-15',
        completed_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days ago
        pages_count: 124,
        word_count: 45600,
        chapters_count: 8,
        file_size: '2.3 MB',
        format: 'PDF',
        estimated_cost: 25,
        review_request_type: 'refund',
        review_request_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days ago
        estimated_review_time: '3-5 business days',
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <LeftNavigation activePage="projects" />
          <main className="flex-1 p-8">
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Loading book review status...</h2>
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
                  <Clock className="w-8 h-8 text-amber-600" />
                  <h1 className="text-3xl font-bold text-foreground">Book Under Review</h1>
                </div>
                <p className="text-muted-foreground">
                  Your book "{book.title}" is currently being reviewed by our team
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
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Under Team Review</span>
                  </div>
                </div>

                {/* Review Status Card */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center">
                        <Clock className="w-8 h-8 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-amber-800">
                        {book.review_request_type === 'refund' ? 'Refund Request Submitted' : 'Modification Request Submitted'}
                      </h3>
                      <p className="text-sm text-amber-700">
                        Your {book.review_request_type} request is being reviewed by our team. 
                        We'll contact you within {book.estimated_review_time} with an update.
                      </p>
                      <div className="text-xs text-amber-600">
                        Request submitted: {new Date(book.review_request_date).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Current Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                      <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">Under Review</div>
                        <div className="text-sm text-muted-foreground">
                          Our team is currently reviewing your {book.review_request_type} request
                        </div>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label className="text-muted-foreground">Request Type</Label>
                        <p className="font-medium capitalize">{book.review_request_type}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Estimated Review Time</Label>
                        <p className="font-medium">{book.estimated_review_time}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Request Date</Label>
                        <p className="font-medium">{new Date(book.review_request_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Book Completed</Label>
                        <p className="font-medium">{new Date(book.completed_at).toLocaleDateString()}</p>
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

                {/* Important Notice - No Download Available */}
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-red-800">Download Temporarily Unavailable</h3>
                      <p className="text-sm text-red-700">
                        Your book is currently under review and cannot be downloaded until the review process is complete. 
                        We'll notify you once the review is finished.
                      </p>
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
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span>Under Review</span>
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
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 text-sm font-semibold">
                                  {index + 1}
                                </div>
                                <h3 className="font-medium text-foreground group-hover:text-amber-600 transition-colors">
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
                          <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-amber-200 transition-colors pointer-events-none"></div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Summary Stats */}
                    <div className="mt-6 pt-6 border-t">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-amber-600">{book.chapters.length}</div>
                          <div className="text-xs text-muted-foreground">Chapters</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-600">{book.word_count.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Total Words</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-600">
                            {Math.round(book.word_count / 250)}
                          </div>
                          <div className="text-xs text-muted-foreground">Est. Pages</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Help & Support */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                        <HelpCircle className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">Questions About Your Review?</h3>
                      <p className="text-sm text-muted-foreground">
                        If you have any questions about the review process or need to provide additional information, 
                        our support team is here to help.
                      </p>
                      <div className="flex justify-center gap-3">
                        <Button variant="outline">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Contact Support
                        </Button>
                        <Button variant="outline">
                          <HelpCircle className="w-4 h-4 mr-2" />
                          Review FAQ
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookUnderReview;
