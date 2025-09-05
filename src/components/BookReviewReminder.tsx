import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, CheckCircle, X, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { useTheme } from '@/contexts/ThemeContext';

interface BookReviewReminderProps {
  /** Date when the book was generated */
  generatedDate: Date;
  /** Number of days allowed for review (default: 7) */
  reviewPeriodDays?: number;
  /** Callback when user wants to request refund */
  onRequestRefund: () => void;
  /** Callback when user accepts the book */
  onAcceptBook: () => void;
  /** Callback for book review */
  onReviewBook?: () => void;
  /** Callback for book download */
  onDownloadBook?: () => void;
  /** Book title for display */
  bookTitle?: string;
  /** Order ID for reference */
  orderId?: string;
}

const BookReviewReminder: React.FC<BookReviewReminderProps> = ({
  generatedDate,
  reviewPeriodDays = 7,
  onRequestRefund,
  onAcceptBook,
  onReviewBook,
  onDownloadBook,
  bookTitle = "Your Book",
  orderId
}) => {
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endDate = new Date(generatedDate.getTime() + (reviewPeriodDays * 24 * 60 * 60 * 1000));
      const difference = endDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [generatedDate, reviewPeriodDays]);



  const getStatusColor = () => {
    if (isExpired) return 'destructive';
    if (timeLeft.days <= 1) return 'destructive';
    if (timeLeft.days <= 3) return 'secondary';
    return 'default';
  };

  const getStatusText = () => {
    if (isExpired) return 'Review Period Expired';
    if (timeLeft.days <= 1) return 'Last Day to Review';
    if (timeLeft.days <= 3) return 'Review Period Ending Soon';
    return 'Review Period Active';
  };

  const getUrgencyMessage = () => {
    if (isExpired) return 'Your review period has ended. The book is now considered accepted and no refunds are available.';
    if (timeLeft.days <= 1) return 'This is your final day to review. After today, the book will be automatically accepted.';
    if (timeLeft.days <= 3) return 'Your review period is ending soon. Please review your book or request a refund.';
    return 'You have time to thoroughly review your book. Download it only when you\'re completely satisfied.';
  };

  return (
    <Card className={`${isExpired ? 'bg-muted/50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isExpired ? (
              <X className="w-5 h-5 text-destructive" />
            ) : timeLeft.days <= 1 ? (
              <AlertTriangle className="w-5 h-5 text-destructive" />
            ) : (
              <Clock className="w-5 h-5 text-muted-foreground" />
            )}
            <CardTitle className="text-lg">
              {bookTitle} - Review Reminder
            </CardTitle>
          </div>
          <Badge variant={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>
        <CardDescription>
          {getUrgencyMessage()}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Countdown Timer */}
        {!isExpired && (
          <div className="bg-muted/50 rounded-lg p-2">
            <div className="text-center">
              <p className="text-xs font-medium text-muted-foreground mb-2">Time Remaining</p>
              <div className="flex items-center justify-center gap-2">
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{timeLeft.days}</div>
                  <div className="text-xs text-muted-foreground">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{timeLeft.hours}</div>
                  <div className="text-xs text-muted-foreground">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{timeLeft.minutes}</div>
                  <div className="text-xs text-muted-foreground">Min</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{timeLeft.seconds}</div>
                  <div className="text-xs text-muted-foreground">Sec</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Primary Actions Row */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onRequestRefund}
              disabled={isExpired}
              className="flex-1"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Request Refund
            </Button>
            <Button 
              onClick={onAcceptBook}
              disabled={isExpired}
              className="flex-1"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Accept Book
            </Button>
          </div>
          
          {/* Secondary Actions Row */}
          {(onReviewBook || onDownloadBook) && (
            <div className="flex gap-3">
              {onReviewBook && (
                <Button 
                  variant="outline" 
                  onClick={onReviewBook}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Review Book
                </Button>
              )}
              {onDownloadBook && (
                <Button 
                  variant="outline" 
                  onClick={onDownloadBook}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Book
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Important Notes */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Important Reminders:</p>
              <ul className="space-y-1 text-xs">
                <li>• Downloading the book confirms acceptance and waives refund eligibility</li>
                <li>• Review period: {reviewPeriodDays} days from generation date</li>
                <li>• After the review period ends, the book is automatically accepted</li>
                {orderId && <li>• Order ID: {orderId}</li>}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookReviewReminder;
