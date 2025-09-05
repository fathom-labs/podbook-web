import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Download, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import Logo from '@/components/Logo';

const MoneyBackGuarantee = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Top Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <Logo size="md" showText={true} textSize="2xl" />
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">Money-Back Guarantee</h1>
          <p className="text-xl text-muted-foreground">
            We stand behind our work. If you're not completely satisfied, we'll make it right.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Guarantee Summary */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-6 h-6" />
                Our Promise to You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 text-lg leading-relaxed">
                We guarantee that you'll be completely satisfied with your book. If you're not happy for any reason, 
                you have <strong>1 full week</strong> to review your book and request a refund. 
                We'll process your refund within 3-5 business days.
              </p>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">How Our Money-Back Guarantee Works</CardTitle>
              <CardDescription>
                Simple, straightforward process to ensure your satisfaction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Review Your Book</h3>
                  <p className="text-muted-foreground">
                    After we generate your book, you'll get access to view it on our website for 1 full week. 
                    You can read through it, check the formatting, and make sure it meets your expectations.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Decide What's Right for You</h3>
                  <p className="text-muted-foreground">
                    If you love your book, you can download it and start using it right away. 
                    If something isn't quite right, you can request changes or a refund.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Get Your Refund (If Needed)</h3>
                  <p className="text-muted-foreground">
                    If you're not satisfied, simply contact our support team within the 1-week period. 
                    We'll process your refund minus a small processing fee (usually $5-10).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Details */}
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <AlertTriangle className="w-6 h-6" />
                Important: Downloading Waives Refund
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-amber-700">
                  <strong>Once you download your book, you're confirming that you're satisfied with it.</strong> 
                  Downloads are final and cannot be refunded.
                </p>
                <div className="flex items-center gap-2 text-amber-700">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download = Satisfaction confirmed = No refund available</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Examples */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Real Examples of When Refunds Apply</CardTitle>
              <CardDescription>
                Here are some common scenarios where our guarantee protects you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Example 1 */}
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2 text-green-700">✅ Refund Available</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Scenario:</strong> You review your book and find that the AI misunderstood your content sources, 
                    creating chapters that don't match your original material.
                  </p>
                  <p className="text-sm text-green-600 mt-2">
                    <strong>Result:</strong> Full refund minus processing fee
                  </p>
                </div>

                {/* Example 2 */}
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2 text-green-700">✅ Refund Available</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Scenario:</strong> The book formatting is completely different from what you expected, 
                    making it difficult to read or use.
                  </p>
                  <p className="text-sm text-green-600 mt-2">
                    <strong>Result:</strong> Full refund minus processing fee
                  </p>
                </div>

                {/* Example 3 */}
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2 text-red-700">❌ No Refund</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Scenario:</strong> You download the book and then decide you want a refund.
                  </p>
                  <p className="text-sm text-red-600 mt-2">
                    <strong>Result:</strong> No refund available (download = satisfaction confirmed)
                  </p>
                </div>

                {/* Example 4 */}
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2 text-red-700">❌ No Refund</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Scenario:</strong> You request a refund after the 1-week review period has ended.
                  </p>
                  <p className="text-sm text-red-600 mt-2">
                    <strong>Result:</strong> No refund available (time limit exceeded)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing Fee Explanation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">About the Processing Fee</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We charge a small processing fee (typically $5-10) on refunds to cover the costs of:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Payment processing fees from our payment providers</li>
                  <li>AI processing costs for generating your book</li>
                  <li>Server and storage costs during the review period</li>
                  <li>Support staff time to process your refund</li>
                </ul>
                <p className="text-muted-foreground">
                  This fee is clearly disclosed before purchase and is standard practice in the industry.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800">Need to Request a Refund?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-blue-700">
                  If you're not satisfied with your book and want to request a refund, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-blue-700">
                    <strong>Email:</strong> support@podbook.com
                  </p>
                  <p className="text-blue-700">
                    <strong>Response Time:</strong> Within 24 hours
                  </p>
                  <p className="text-blue-700">
                    <strong>Refund Processing:</strong> 3-5 business days
                  </p>
                </div>
                <p className="text-blue-700 text-sm">
                  Please include your order number and the reason for your refund request.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Create Your Book?</h2>
            <p className="text-muted-foreground mb-6">
              Start your book creation with confidence, knowing you're protected by our guarantee.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/new-project">
                Start Creating Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyBackGuarantee;
