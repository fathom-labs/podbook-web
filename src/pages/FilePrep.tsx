import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Logo from '@/components/Logo';
import { 
  BookOpen, 
  FileText, 
  Users, 
  User, 
  Hash, 
  Rss, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Info,
  Volume2,
  Video,
  FileAudio,
  Play,
  Edit,
  Download,
  Clock
} from 'lucide-react';

const FilePrep = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      title: "Choose Your Book Type",
      description: "Select the type of book you want to create",
      icon: BookOpen,
      details: [
        "Choose from: Non-Fiction, Fiction, Memoir, How-To Guide, or Business Book",
        "This choice affects how we structure and generate your content",
        "Be thoughtful - this impacts the entire book creation process"
      ],
      warning: "This is a critical decision that affects your book's tone, structure, and content generation approach."
    },
    {
      number: 2,
      title: "Book Details, Audience & Author",
      description: "Provide essential information about your book and target audience",
      icon: FileText,
      details: [
        "Enter a compelling book title",
        "Write a detailed description of what your book is about",
        "Include main themes and what readers will learn or gain",
        "Describe your ideal reader: age, profession, interests, experience level",
        "Specify demographics, interests, and knowledge level",
        "Provide the author's name (usually pre-filled from your account)",
        "Be specific - this helps us generate better, more targeted content"
      ],
      warning: "Detailed information about your book and audience is crucial for generating content that aligns with your vision and resonates with your readers."
    },
    {
      number: 3,
      title: "Book Size & Structure",
      description: "Define the scope and structure of your book",
      icon: Hash,
      details: [
        "Set estimated number of pages (typical range: 50-500 pages)",
        "Define estimated number of chapters (typical range: 5-30 chapters)",
        "These estimates help us structure your content appropriately",
        "You can adjust these later if needed during the editing process"
      ],
      warning: "These estimates guide the content generation process and can be refined later."
    },
    {
      number: 4,
      title: "Content Sources",
      description: "Add your podcast RSS feed and/or upload audio/video files",
      icon: Rss,
      details: [
        "Add your podcast RSS feed URL to import episodes",
        "Upload audio or video files directly (only audio/video files accepted)",
        "This is your ONLY chance to add content - you cannot add more files later",
        "Make sure to include all files you want in your book at this stage"
      ],
      warning: "⚠️ CRITICAL: You can only add content at this stage. Upload all files you want included in your book now."
    },
    {
      number: 5,
      title: "Review, Pricing & Order",
      description: "Review your information, see pricing, and place your order",
      icon: CheckCircle,
      details: [
        "Review all your project details and content sources",
        "Confirm your book type, title, description, and target audience",
        "Verify your uploaded files and RSS feed episodes",
        "View the calculated price based on content duration and target book size",
        "Place your order to begin content generation processing"
      ],
      warning: "Double-check everything before placing your order - changes become more difficult after processing begins."
    }
  ];

  const processFlow = [
    {
      title: "Content Processing",
      description: "Your uploaded content is analyzed and processed",
      icon: Clock,
      status: "processing",
      details: [
        "Audio/video files are transcribed and analyzed",
        "RSS feed episodes are fetched and processed",
        "Content is structured according to your book parameters",
        "AI generates your complete book based on your specifications"
      ]
    },
    {
      title: "Book Review",
      description: "Review your completed book (read-only mode)",
      icon: CheckCircle,
      status: "review",
      details: [
        "Review your completed book in read-only mode",
        "Check formatting, structure, and content quality",
        "Contact us for refund or reprocessing if unsatisfied",
        "Once you download, you waive your right to refund"
      ]
    },
    {
      title: "Export & Download",
      description: "Export your book in various formats",
      icon: Download,
      status: "completed",
      details: [
        "Export as PDF, EPUB, DOCX, or other formats",
        "Download your completed book",
        "Share or publish as needed",
        "Note: Downloading waives your right to refund"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" showText={true} textSize="xl" />
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Project Creation Guide</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn how to create your book project step-by-step. Follow this guide to ensure you provide all the necessary information for the best possible results.
            </p>
          </div>

          {/* Important Notice */}
          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Important:</strong> Take your time with each step. The information you provide here directly impacts the quality and accuracy of your generated book content.
            </AlertDescription>
          </Alert>

          {/* Steps Overview */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Project Setup Steps</h2>
            
            {steps.map((step, index) => (
              <Card key={step.number} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {step.icon && <step.icon className="h-5 w-5" />}
                        {step.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {step.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">What you'll do:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {step.warning && (
                      <Alert className="border-orange-200 bg-orange-50">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        <AlertDescription className="text-orange-800">
                          {step.warning}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />

          {/* Process Flow */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">What Happens Next</h2>
            <p className="text-center text-muted-foreground">
              After you complete the setup steps, here's what happens with your project:
            </p>
            
            <div className="grid gap-6">
              {processFlow.map((process, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className={`${
                    process.status === 'processing' ? 'bg-blue-50' :
                    process.status === 'editing' ? 'bg-purple-50' :
                    process.status === 'review' ? 'bg-yellow-50' :
                    'bg-green-50'
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          process.status === 'processing' ? 'bg-blue-500 text-white' :
                          process.status === 'editing' ? 'bg-purple-500 text-white' :
                          process.status === 'review' ? 'bg-yellow-500 text-white' :
                          'bg-green-500 text-white'
                        }`}>
                          {process.icon && <process.icon className="h-6 w-6" />}
                        </div>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {process.title}
                          <Badge variant={
                            process.status === 'processing' ? 'default' :
                            process.status === 'editing' ? 'secondary' :
                            process.status === 'review' ? 'outline' :
                            'default'
                          }>
                            {process.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-base">
                          {process.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {process.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pricing Information */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Info className="h-5 w-5" />
                Pricing Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-green-900">How Pricing Works</h4>
                <ul className="space-y-2 text-sm text-green-800">
                  <li>• <strong>Content Duration:</strong> Based on total length of uploaded audio/video files</li>
                  <li>• <strong>Target Book Size:</strong> Based on your estimated pages and chapters</li>
                  <li>• <strong>Processing Complexity:</strong> Factors in book type and content complexity</li>
                  <li>• <strong>Transparent Pricing:</strong> You'll see the exact cost before placing your order</li>
                </ul>
              </div>
              
              <Alert className="border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  <strong>Payment Required:</strong> You must complete payment before content processing begins. No charges until you approve the final price.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* File Requirements */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Info className="h-5 w-5" />
                File Requirements & Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Rss className="h-4 w-4" />
                    RSS Feed Requirements
                  </h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Must be a valid podcast RSS feed URL</li>
                    <li>• Only use feeds from your own podcast</li>
                    <li>• Don't use RSS feeds for other content types</li>
                    <li>• Ensure the feed is publicly accessible</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    File Upload Requirements
                  </h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Only audio and video files are accepted</li>
                    <li>• Supported formats: MP3, MP4, WAV, MOV, etc.</li>
                    <li>• Maximum file size: 500MB per file</li>
                    <li>• Upload all files you want included</li>
                  </ul>
                </div>
              </div>
              
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Critical:</strong> You cannot add more files after this step. Make sure to upload all content you want included in your book before proceeding.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Refund Policy */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <Info className="h-5 w-5" />
                Refund Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-purple-900">When You Can Request a Refund</h4>
                <ul className="space-y-2 text-sm text-purple-800">
                  <li>• <strong>Before Download:</strong> You can request a refund or reprocessing after reviewing your book</li>
                  <li>• <strong>Quality Issues:</strong> If the book doesn't meet quality standards or your specifications</li>
                  <li>• <strong>Processing Errors:</strong> If there are technical issues during content generation</li>
                  <li>• <strong>Contact Support:</strong> Reach out to us through the review interface</li>
                </ul>
              </div>
              
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Important:</strong> Once you download your book, you waive your right to a refund. Make sure you're satisfied before downloading.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Ready to Create Your Project?</h3>
            <p className="text-muted-foreground">
              Now that you understand the process, you're ready to create your book project.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/new-project')} size="lg">
                <Play className="h-4 w-4 mr-2" />
                Start New Project
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard')} size="lg">
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FilePrep;
