import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, CreditCard } from "lucide-react";

type Chapter = {
  id: string;
  title: string;
  description: string;
  wordCount: number;
  estimatedPages: number;
};

export interface BookPreview {
  totalWords: number;
  totalPages: number;
  estimatedCost: number;
  chapters?: Chapter[];
}

export interface BookOverviewProps {
  preview: BookPreview | null;
  selectedBookType: string;
  bookSpecs: { targetPages: number[]; targetChapters: number[]; format: string };
  contentSources: {
    rssFeed: string;
    uploadedFiles: Array<{ name: string; size: number; type: string; duration?: number; source?: string }>;
    textContent: string;
    urls: string[];
  };
  processing?: boolean;
  processingProgress?: number;
  onPurchase?: (calculatedPrice: number) => void;
}

const BookOverview = ({
  preview,
  selectedBookType,
  bookSpecs,
  contentSources,
  processing = false,
  processingProgress = 0,
  onPurchase,
}: BookOverviewProps) => {
  const [localProcessing, setLocalProcessing] = useState<boolean>(false);
  const [localProgress, setLocalProgress] = useState<number>(0);
  const [localPreview, setLocalPreview] = useState<BookPreview | null>(null);

  useEffect(() => {
    // Only run fake processing if no preview is provided and we haven't generated one yet
    if (!preview && !localPreview) {
      setLocalProcessing(true);
      setLocalProgress(5);
      let progress = 10;
      const interval = setInterval(() => {
        progress = Math.min(progress + Math.random() * 20, 95);
        setLocalProgress(progress);
      }, 800);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        const mockChapters: Chapter[] = [
          { id: '1', title: 'Introduction', description: 'Overview and context setting', wordCount: 1200, estimatedPages: 4 },
          { id: '2', title: 'Getting Started', description: 'Basic concepts and setup', wordCount: 1800, estimatedPages: 6 },
          { id: '3', title: 'Core Concepts', description: 'Main ideas and principles', wordCount: 2400, estimatedPages: 8 },
          { id: '4', title: 'Advanced Topics', description: 'Complex scenarios and solutions', wordCount: 2000, estimatedPages: 7 },
          { id: '5', title: 'Conclusion', description: 'Summary and next steps', wordCount: 800, estimatedPages: 3 },
        ];
        setLocalPreview({
          chapters: mockChapters,
          totalWords: mockChapters.reduce((sum, ch) => sum + ch.wordCount, 0),
          totalPages: mockChapters.reduce((sum, ch) => sum + ch.estimatedPages, 0),
          estimatedCost: 25,
        });
        setLocalProgress(100);
        setLocalProcessing(false);
      }, 3500);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [preview, localPreview]);

  const calculateTotalPrice = () => {
    const targetPricePerPage = 2.5;
    const contentDuration = Math.round(contentSources.uploadedFiles.reduce((sum, file) => sum + (file.size || 0), 0) / 60 / 60);
    let basePrice = bookSpecs.targetPages[0] * targetPricePerPage;
    let complexityMultiplier = (selectedBookType === 'technical' || selectedBookType === 'academic') ? 1.3 : 1.0;
    if (selectedBookType === 'creative') complexityMultiplier = 0.9;
    if (selectedBookType === 'business') complexityMultiplier = 1.1;
    const contentProcessingFee = contentDuration * 5;
    const subtotal = (basePrice * complexityMultiplier) + contentProcessingFee;
    return Math.round(subtotal);
  };

  const calculateEpisodesNeeded = () => {
    // Use target chapters as the base, but also consider content duration
    const targetChapters = bookSpecs.targetChapters[0];
    const wordsCount = effectivePreview?.totalWords || 0;
    const avgChapterCount = Math.ceil(wordsCount / 4500);
    const totalEpisodes = contentSources.uploadedFiles.length;


    if (wordsCount > 0) {
      return Math.round((avgChapterCount + targetChapters + totalEpisodes) / 3);
    }
    // Fallback to target chapters if no content
    return targetChapters;
  };

  const calculateContentHours = () => {
    // Sum all uploaded file durations (in seconds) and convert to hours
    const totalSeconds = contentSources.uploadedFiles.reduce((sum, file) => sum + (file.size || 0), 0);
    const totalMinutes = totalSeconds / 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}`;
    } else {
      return `${Math.round(totalMinutes)} min`;
    }
  };

  // Count files by source type
  const rssFileCount = contentSources.uploadedFiles.filter(file => file.source === 'RSS').length;
  const uploadFileCount = contentSources.uploadedFiles.filter(file => file.source === 'UPLOAD').length;

  const effectivePreview = preview || localPreview;

  if (!effectivePreview) {
    return (
      <div className="text-center py-12">
        <div className="space-y-4">
          <Clock className="w-8 h-8 mx-auto text-primary" />
          <h3 className="text-lg font-medium">Processing Your Content</h3>
          <p className="text-muted-foreground">AI is analyzing your content and generating your book structure...</p>
          <Progress value={localProcessing ? localProgress : processingProgress} className="w-64 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Book Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-medium text-primary">{effectivePreview.totalPages}</div>
              <div className="text-sm text-muted-foreground">Approximate Total Pages</div>
            </div>
            <div>
              <div className="text-2xl font-medium text-primary">{effectivePreview.totalWords.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Approximate Word Count</div>
            </div>
            <div>
              <div className="text-2xl font-medium text-primary">2-4</div>
              <div className="text-sm text-muted-foreground">Estimated Turnaround (Business Days)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price Calculator</CardTitle>
          <CardDescription>Calculate the cost based on your content and book specifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Content Sources</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>RSS Feed Articles:</span>
                  <span className="font-medium">{rssFileCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uploaded Files:</span>
                  <span className="font-medium">{uploadFileCount}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Book Specifications</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Target Pages:</span>
                  <span className="font-medium">{bookSpecs.targetPages[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span>Book Type:</span>
                  <span className="font-medium capitalize">{selectedBookType.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Content Duration:</span>
                  <span className="font-medium">{calculateContentHours()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Recommended Chapters:</span>
                  <span className="font-medium">{calculateEpisodesNeeded()} chapters</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-3">Pricing Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Base Price ({bookSpecs.targetPages[0]} pages × $2.50):</span>
                <span>${(bookSpecs.targetPages[0] * 2.5).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Content Processing Fee ({Math.round(contentSources.uploadedFiles.reduce((sum, file) => sum + (file.size || 0), 0) / 60 / 60)} hours × $5):</span>
                <span>${(Math.round(contentSources.uploadedFiles.reduce((sum, file) => sum + (file.size || 0), 0) / 60 / 60) * 5).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Complexity Multiplier:</span>
                <span>
                  {selectedBookType === 'technical' || selectedBookType === 'academic' ? '1.3x' : 
                   selectedBookType === 'creative' ? '0.9x' : 
                   selectedBookType === 'business' ? '1.1x' : '1.0x'}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Estimated Total:</span>
                <span className="text-primary text-lg">${calculateTotalPrice().toFixed(0)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-green-900 mb-2">Purchase in confidence!</h4>
                <p className="text-sm text-green-700 mb-3">
                  If you are not completely satisfied with your book, you have 1 week to review it in view-only mode on our site and request a refund (minus processing fees). Downloading the book waives your refund eligibility.{' '}
                  <button 
                    className="text-green-800 underline hover:text-green-900 font-medium"
                    onClick={() => window.open('/money-back-guarantee', '_blank')}
                  >
                    Learn more
                  </button>.
                </p>
              </div>
            </div>
          </div>

          {onPurchase && (
            <div className="flex gap-3 mt-4">
              <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => onPurchase(calculateTotalPrice())}>
                <CreditCard className="w-4 h-4 mr-2" />
                Purchase & Generate
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookOverview;


