import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, FileText, MessageSquare, CreditCard, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/contexts/ThemeContext';

interface RefundRequestModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Book title for reference */
  bookTitle?: string;
  /** Order ID for reference */
  orderId?: string;
  /** Callback when refund request is submitted */
  onSubmit: (data: RefundRequestData) => void;
}

interface RefundRequestData {
  requestType: 'modification' | 'refund' | '';
  reason: string;
  specificIssues: string[];
  description: string;
  contactEmail: string;
  phoneNumber?: string;
  preferredContact: 'email' | 'phone' | 'both';
  additionalNotes?: string;
}

const RefundRequestModal: React.FC<RefundRequestModalProps> = ({
  isOpen,
  onClose,
  bookTitle = "Your Book",
  orderId,
  onSubmit
}) => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RefundRequestData>({
    requestType: '',
    reason: '',
    specificIssues: [],
    description: '',
    contactEmail: '',
    phoneNumber: '',
    preferredContact: 'email',
    additionalNotes: ''
  });

  const totalSteps = 5;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const updateFormData = (field: keyof RefundRequestData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Step 1: Choose Request Type (Modification or Refund)
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">What would you like to do?</h3>
        <p className="text-sm text-muted-foreground">
          Choose whether you'd like us to modify the book or process a refund
        </p>
      </div>

      <div className="space-y-4">
        <div 
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            formData.requestType === 'modification' 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`}
          onClick={() => updateFormData('requestType', 'modification')}
        >
          <div className="flex items-start space-x-3">
            <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
              formData.requestType === 'modification' 
                ? 'border-primary bg-primary' 
                : 'border-muted-foreground'
            }`} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <h4 className="font-medium">Request Book Modification</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                We'll revise the book based on your feedback and provide an updated version. 
                This option maintains your original purchase and review period.
              </p>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">Recommended</Badge>
              </div>
            </div>
          </div>
        </div>

        <div 
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            formData.requestType === 'refund' 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`}
          onClick={() => updateFormData('requestType', 'refund')}
        >
          <div className="flex items-start space-x-3">
            <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
              formData.requestType === 'refund' 
                ? 'border-primary bg-primary' 
                : 'border-muted-foreground'
            }`} />
            <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <h4 className="font-medium">Request Full Refund</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              We'll process a full refund to your original payment method. 
              The book will be removed from your library permanently.
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                Permanent action
              </Badge>
            </div>
            </div>
          </div>
        </div>
      </div>

      {formData.requestType && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-800 mb-1">
                {formData.requestType === 'modification' ? 'Modification Process' : 'Refund Process'}
              </h5>
              <p className="text-sm text-blue-700">
                {formData.requestType === 'modification' 
                  ? 'We typically complete modifications within 2-3 business days. You\'ll receive the updated book via email.'
                  : 'Refunds are processed within 3-5 business days. You\'ll receive a confirmation email once processed.'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Step 2: Reason and Issues
  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="reason" className="text-base font-medium">
          {formData.requestType === 'modification' ? 'What needs to be improved?' : 'Primary Reason for Refund'}
        </Label>
        <Select value={formData.reason} onValueChange={(value) => updateFormData('reason', value)}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select the main reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quality">Content quality issues</SelectItem>
            <SelectItem value="accuracy">Factual inaccuracies</SelectItem>
            <SelectItem value="formatting">Formatting problems</SelectItem>
            <SelectItem value="incomplete">Incomplete content</SelectItem>
            <SelectItem value="expectations">Didn't meet expectations</SelectItem>
            <SelectItem value="technical">Technical issues</SelectItem>
            <SelectItem value="other">Other reason</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-medium">Specific Issues (select all that apply)</Label>
        <div className="mt-3 space-y-3">
          {[
            'Poor writing quality',
            'Incomplete chapters',
            'Formatting errors',
            'Missing content',
            'Factual errors',
            'Technical problems',
            'Doesn\'t match description'
          ].map((issue) => (
            <div key={issue} className="flex items-center space-x-2">
              <Checkbox
                id={issue}
                checked={formData.specificIssues.includes(issue)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFormData('specificIssues', [...formData.specificIssues, issue]);
                  } else {
                    updateFormData('specificIssues', formData.specificIssues.filter(i => i !== issue));
                  }
                }}
              />
              <Label htmlFor={issue} className="text-sm">{issue}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="description" className="text-base font-medium">Detailed Description</Label>
        <Textarea
          id="description"
          placeholder={
            formData.requestType === 'modification' 
              ? "Please describe what specific changes or improvements you'd like to see..."
              : "Please provide a detailed explanation of the issues you encountered..."
          }
          className="mt-2 min-h-[120px]"
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Minimum 10 characters ({formData.description.length}/10)
        </p>
      </div>
    </div>
  );

  // Step 3: Contact Information
  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="contactEmail" className="text-base font-medium">Email Address</Label>
        <Input
          id="contactEmail"
          type="email"
          placeholder="your.email@example.com"
          className="mt-2"
          value={formData.contactEmail}
          onChange={(e) => updateFormData('contactEmail', e.target.value)}
        />
        <p className="text-xs text-muted-foreground mt-1">
          We'll use this email for all communication regarding your request
        </p>
      </div>

      <div>
        <Label htmlFor="phoneNumber" className="text-base font-medium">Phone Number (Optional)</Label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="+1 (555) 123-4567"
          className="mt-2"
          value={formData.phoneNumber}
          onChange={(e) => updateFormData('phoneNumber', e.target.value)}
        />
      </div>

      <div>
        <Label className="text-base font-medium">Preferred Contact Method</Label>
        <RadioGroup 
          value={formData.preferredContact} 
          onValueChange={(value) => updateFormData('preferredContact', value)}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email">Email only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="phone" />
            <Label htmlFor="phone">Phone only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="both" />
            <Label htmlFor="both">Both email and phone</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  // Step 4: Details and Urgency
  const renderStep4 = () => (
    <div className="space-y-6">




      <div>
        <Label htmlFor="additionalNotes" className="text-base font-medium">Additional Notes (Optional)</Label>
        <Textarea
          id="additionalNotes"
          placeholder="Any additional information that might help us process your request..."
          className="mt-2 min-h-[100px]"
          value={formData.additionalNotes}
          onChange={(e) => updateFormData('additionalNotes', e.target.value)}
        />
      </div>
    </div>
  );

  // Step 5: Review and Submit
  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Review Your Request</h3>
        <p className="text-sm text-muted-foreground">
          Please review the information below before submitting your request
        </p>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium mb-3">Request Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Request Type:</span>
            <span className="font-medium capitalize">{formData.requestType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Book:</span>
            <span className="font-medium">{bookTitle}</span>
          </div>
          {orderId && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID:</span>
              <span className="font-medium">{orderId}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Primary Reason:</span>
            <span className="font-medium capitalize">{formData.reason.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Contact Email:</span>
            <span className="font-medium">{formData.contactEmail}</span>
          </div>


        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h5 className="font-medium text-amber-800 mb-1">Before submitting:</h5>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Please ensure all information is accurate</li>
              <li>• We'll review your request within 24-48 hours</li>
              <li>• You'll receive a confirmation email</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          By submitting this request, you confirm that the information provided is accurate and truthful.
        </p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.requestType !== '';
      case 2: return formData.reason && formData.description.trim().length > 10;
      case 3: return formData.contactEmail && formData.contactEmail.includes('@');
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">
                {formData.requestType === 'modification' ? 'Request Book Modification' : 
                 formData.requestType === 'refund' ? 'Request Refund' : 'Book Request'}
              </CardTitle>
              <CardDescription>
                {bookTitle} {orderId && `• Order ${orderId}`}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Progress Bar (without step indicators) */}
          <div className="mt-4">
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="pb-6">
          {renderCurrentStep()}
        </CardContent>

        <div className="px-6 pb-6">
          <Separator className="mb-4" />
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Request
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RefundRequestModal;