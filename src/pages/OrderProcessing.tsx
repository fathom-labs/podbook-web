import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  CheckCircle, 
  FileText, 
  Upload, 
  Rss, 
  User, 
  MessageCircle,
  ExternalLink,
  Download,
  X,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import LeftNavigation from "@/components/LeftNavigation";

interface OrderDetails {
  id: string;
  orderNumber: string;
  status: 'processing' | 'review' | 'completed';
  createdAt: string;
  estimatedCompletion: string;
  bookTitle: string;
  bookType: string;
  targetPages: number;
  contentSources: {
    rssFeed?: string;
    uploadedFiles: string[];
    totalFiles: number;
  };
  pricing: {
    subtotal: number;
    processingFee: number;
    total: number;
  };
  currentStep: 'content-analysis' | 'ai-generation' | 'human-review' | 'final-formatting';
}

const OrderProcessing = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // TODO: In production, this modal should only appear once after:
    // 1. Order is successfully created in the backend
    // 2. Stripe payment is completed successfully
    // 3. User is redirected to this page for the first time
    // 
    // For demo purposes, we show it whenever order data loads
    // Try to load order data from localStorage first (for demo orders)
    const storedOrder = localStorage.getItem('currentOrder');
    
    if (storedOrder) {
      try {
        const parsedOrder = JSON.parse(storedOrder);
        const orderData: OrderDetails = {
          id: orderId || parsedOrder.id || 'demo-order-123',
          orderNumber: 'ORD-' + Date.now().toString().slice(-6),
          status: 'processing',
          createdAt: new Date().toLocaleDateString(),
          estimatedCompletion: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          bookTitle: parsedOrder.bookTitle || 'Untitled Book',
          bookType: parsedOrder.bookType ? parsedOrder.bookType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'General',
          targetPages: parsedOrder.targetPages || 150,
          contentSources: {
            rssFeed: parsedOrder.contentSources?.rssFeed,
            uploadedFiles: parsedOrder.contentSources?.uploadedFiles || [],
            totalFiles: parsedOrder.contentSources?.uploadedFiles?.length || 0
          },
          pricing: {
            subtotal: parsedOrder.pricing?.subtotal || 0,
            processingFee: parsedOrder.pricing?.processingFee || 0.20,
            total: parsedOrder.pricing?.total || 0
          },
          currentStep: 'ai-generation'
        };
        setOrder(orderData);
        setLoading(false);
        // Show success modal after order loads
        setShowSuccessModal(true);
      } catch (error) {
        console.error('Error parsing stored order:', error);
        // Fall back to demo data
        loadDemoOrder();
      }
    } else {
      // Load demo order data
      loadDemoOrder();
    }
  }, [orderId]);

  const loadDemoOrder = () => {
    setTimeout(() => {
      setOrder({
        id: orderId || 'demo-order-123',
        orderNumber: 'ORD-2024-001',
        status: 'processing',
        createdAt: new Date().toLocaleDateString(),
        estimatedCompletion: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        bookTitle: 'AI-Powered Content Transformation Guide',
        bookType: 'Educational',
        targetPages: 150,
        contentSources: {
          rssFeed: 'https://example.com/feed',
          uploadedFiles: ['audio-interview.mp3', 'presentation-slides.pdf'],
          totalFiles: 2
        },
        pricing: {
          subtotal: 22.50,
          processingFee: 0.20,
          total: 22.70
        },
        currentStep: 'ai-generation'
      });
      setLoading(false);
      // Show success modal after demo order loads
      setShowSuccessModal(true);
    }, 1000);
  };



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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
          <h2 className="text-xl font-semibold">Loading your order...</h2>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Order not found</h2>
          <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

    return (
    <div className="min-h-screen bg-background flex">
      <LeftNavigation activePage="projects" />
      <div className="flex-1 p-8 relative">
        {/* Back Button - Fixed Position */}
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
              <h1 className="text-3xl font-bold text-foreground">Order Processing</h1>
            </div>
            <p className="text-muted-foreground">
              Order #{order.orderNumber} • Created {order.createdAt} • Estimated completion: {order.estimatedCompletion}
            </p>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Processing Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Processing Steps */}
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
                        <h3 className="font-semibold mb-2">{getStepTitle(step)}</h3>
                        <p className="text-sm text-muted-foreground">
                          {getStepDescription(step)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Human Review Notice */}
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
          </div>

          {/* Sidebar - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{order.bookTitle}</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Type: {order.bookType}</p>
                    <p>Target Pages: {order.targetPages}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Content Sources</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    {order.contentSources.rssFeed && (
                      <div className="flex items-center gap-2">
                        <Rss className="w-4 h-4" />
                        <span>RSS Feed</span>
                      </div>
                    )}
                    {order.contentSources.uploadedFiles.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        <span>{order.contentSources.totalFiles} File(s)</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Pricing</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${order.pricing.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing:</span>
                      <span>${order.pricing.processingFee.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>${order.pricing.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
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
                  onClick={() => window.open('mailto:support@podbook.com?subject=Order%20Question%20-%20' + order.orderNumber, '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>


          </div>
        </div>
        </div>
      </div>

      {/* Success Modal - Should only appear once after order created/Stripe payment successful */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md mx-4 relative shadow-lg">
            {/* Close button */}
            <button
              onClick={() => setShowSuccessModal(false)}
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
                onClick={() => setShowSuccessModal(false)}
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderProcessing;
