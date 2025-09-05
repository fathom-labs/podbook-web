import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  Download, 
  Eye, 
  MessageSquare,
  CheckCircle,
  Clock,
  ArrowLeft,
  User,
  MessageCircle,
  X,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LeftNavigation from '@/components/LeftNavigation';
import Book3D from '@/components/Book3D';
import RefundRequestModal from '@/components/RefundRequestModal';

type BookState = 'processing' | 'under-review' | 'post-approval' | 'completed';

interface Chapter {
  title: string;
  pages: number;
  words: string;
}

const BookLandingPageVariations = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<BookState>('processing');
  
  // Modal states
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showContactSupportModal, setShowContactSupportModal] = useState(false);
  const [showViewBookModal, setShowViewBookModal] = useState(false);
  const [showOrderPlacedModal, setShowOrderPlacedModal] = useState(false);
  const [showOrderCompletedModal, setShowOrderCompletedModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);

  const states: { value: BookState; label: string; color: string; bgColor: string; borderColor: string }[] = [
    { value: 'processing', label: 'Processing', color: 'primary', bgColor: 'from-primary/5 to-primary/10', borderColor: 'border-primary/20' },
    { value: 'completed', label: 'Completed', color: 'primary', bgColor: 'from-primary/5 to-primary/10', borderColor: 'border-primary/20' },
    { value: 'post-approval', label: 'Approved', color: 'primary', bgColor: 'from-primary/5 to-primary/10', borderColor: 'border-primary/20' },
    { value: 'under-review', label: 'Under Review', color: 'muted', bgColor: 'from-muted/5 to-muted/10', borderColor: 'border-muted/20' }
  ];

  const getStateConfig = () => states.find(s => s.value === currentState)!;

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

  // Modal handlers
  const handleDownload = () => {
    setShowDownloadModal(true);
  };

  const handleContactSupport = () => {
    setShowRefundModal(true);
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
    link.download = `tech-news-weekly-digest.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Auto-show modals when page loads in specific states
  React.useEffect(() => {
    if (currentState === 'processing') {
      setShowOrderPlacedModal(true);
    } else if (currentState === 'completed') {
      setShowOrderCompletedModal(true);
    }
  }, [currentState]);

  const renderBookInfo = (state: BookState) => {
    const config = getStateConfig();
    const colorMap = {
      processing: 'primary',
      'under-review': 'muted',
      'post-approval': 'primary',
      completed: 'primary'
    };

    const metrics = {
      processing: [
        { value: '150', label: 'Target Pages' },
        { value: '8', label: 'Chapters' },
        { value: '$25', label: 'Total Cost' },
        { value: '4', label: 'Days Left' }
      ],
      'under-review': [
        { value: '124', label: 'Pages' },
        { value: '45.6K', label: 'Words' },
        { value: '8', label: 'Chapters' },
        { value: '2-3', label: 'Days Left' }
      ],
      'post-approval': [
        { value: '124', label: 'Pages' },
        { value: '45.6K', label: 'Words' },
        { value: '8', label: 'Chapters' },
        { value: 'PDF', label: 'Format' }
      ],
      completed: [
        { value: '124', label: 'Pages' },
        { value: '45.6K', label: 'Words' },
        { value: '8', label: 'Chapters' },
        { value: '2.3MB', label: 'File Size' }
      ]
    };

    return (
      <div className="space-y-16">
        <div>
          <h2 className="text-4xl font-bold text-foreground mb-8">Tech News Weekly Digest</h2>
          <p className="text-muted-foreground mb-16">A comprehensive compilation of the latest technology news and insights from leading industry sources, curated and organized into a structured book format.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {metrics[state].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {state === 'processing' && (
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
        {currentState === 'processing' && (
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
        {currentState === 'processing' && (
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
                onClick={() => window.open('mailto:support@podbook.com?subject=Order%20Question', '_blank')}
              >
                <MessageCircle className="w-4 h-5 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        )}

        {state === 'under-review' && (
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

        {state === 'post-approval' && (
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

        {state === 'completed' && (
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
        {state === 'completed' && (
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

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Navigation */}
      <LeftNavigation />
      
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
                  pageCount={124}
                  title="Tech News Weekly Digest"
                  author="by John Doe"
                />
              </div>

            {/* Book Info Section */}
            <div className="lg:col-span-2">
              {renderBookInfo(currentState)}
            </div>
          </div>


        </main>

        {/* Chapters Component for Completed, Under Review, and Post Approval States */}
        {(currentState === 'completed' || currentState === 'under-review' || currentState === 'post-approval') && (
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
                  {[
                    { id: '1', title: 'Introduction to Tech Trends', description: 'Overview of current technology landscape', wordCount: 1200, estimatedPages: 4 },
                    { id: '2', title: 'Artificial Intelligence Breakthroughs', description: 'Latest developments in AI and machine learning', wordCount: 1800, estimatedPages: 6 },
                    { id: '3', title: 'Cloud Computing Evolution', description: 'Advances in cloud infrastructure and services', wordCount: 2400, estimatedPages: 8 },
                    { id: '4', title: 'Cybersecurity Updates', description: 'New threats and protection strategies', wordCount: 2000, estimatedPages: 7 },
                    { id: '5', title: 'Mobile Technology Trends', description: 'Innovations in mobile devices and apps', wordCount: 1600, estimatedPages: 6 },
                    { id: '6', title: 'Blockchain Developments', description: 'Cryptocurrency and blockchain technology updates', wordCount: 1400, estimatedPages: 5 },
                    { id: '7', title: 'Internet of Things', description: 'Connected devices and smart technology', wordCount: 1200, estimatedPages: 4 },
                    { id: '8', title: 'Future Outlook', description: 'Predictions and emerging technologies', wordCount: 800, estimatedPages: 3 },
                  ].map((chapter, index) => (
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

        {/* Discreet State Toggle at Bottom */}
        <div className="border-t bg-card px-6 py-4 flex items-center justify-center mt-16">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">View State:</span>
            <Select value={currentState} onValueChange={(value: BookState) => setCurrentState(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((stateConfig) => (
                  <SelectItem key={stateConfig.value} value={stateConfig.value}>
                    {stateConfig.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

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
        {showContactSupportModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full relative shadow-lg max-h-[90vh] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={() => setShowContactSupportModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Support icon */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              
              {/* Support message */}
              <h2 className="text-2xl font-bold text-center mb-4 text-foreground">
                Contact Support
              </h2>
              <p className="text-center text-muted-foreground mb-6">
                Our support team is here to help with any questions about your book or order.
              </p>
              
              {/* Action buttons */}
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={() => setShowContactSupportModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    setShowContactSupportModal(false);
                    window.open('mailto:support@podbook.com?subject=Book%20Support%20Question', '_blank');
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Send Email
                </Button>
              </div>
            </div>
          </div>
        )}

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
                  Tech News Weekly Digest
                </h2>
                <p className="text-muted-foreground mb-6">
                  Preview your book content before downloading
                </p>
              </div>
              
              {/* Book chapters preview */}
              <div className="space-y-4 mb-6">
                {[
                  { id: '1', title: 'Introduction to Tech Trends', description: 'Overview of current technology landscape', wordCount: 1200, estimatedPages: 4 },
                  { id: '2', title: 'Artificial Intelligence Breakthroughs', description: 'Latest developments in AI and machine learning', wordCount: 1800, estimatedPages: 6 },
                  { id: '3', title: 'Cloud Computing Evolution', description: 'Advances in cloud infrastructure and services', wordCount: 2400, estimatedPages: 8 },
                  { id: '4', title: 'Cybersecurity Updates', description: 'New threats and protection strategies', wordCount: 2000, estimatedPages: 7 },
                  { id: '5', title: 'Mobile Technology Trends', description: 'Innovations in mobile devices and apps', wordCount: 1600, estimatedPages: 6 },
                  { id: '6', title: 'Blockchain Developments', description: 'Cryptocurrency and blockchain technology updates', wordCount: 1400, estimatedPages: 5 },
                  { id: '7', title: 'Internet of Things', description: 'Connected devices and smart technology', wordCount: 1200, estimatedPages: 4 },
                  { id: '8', title: 'Future Outlook', description: 'Predictions and emerging technologies', wordCount: 800, estimatedPages: 3 },
                ].map((chapter, index) => (
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

        {/* Refund Request Modal */}
        <RefundRequestModal
          isOpen={showRefundModal}
          onClose={() => setShowRefundModal(false)}
          bookTitle="Tech News Weekly Digest"
          orderId="demo-order-123"
          onSubmit={(data) => {
            // TODO: Implement refund/modification request submission
            console.log(`${data.requestType} request submitted:`, data);
            setShowRefundModal(false);
            // Show success message or redirect
            alert(`${data.requestType === 'modification' ? 'Modification' : 'Refund'} request submitted successfully! We'll contact you within 24-48 hours.`);
          }}
        />
      </div>
    </div>
  );
};

export default BookLandingPageVariations;
