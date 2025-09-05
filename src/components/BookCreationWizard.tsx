import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import axios from "axios";
import { useMutation } from '@apollo/client';
import { CREATE_PODIUM_PACKAGE } from '@/lib/graphql/mutations/createPodiumPackage';
import { 
  BookOpen, 
  FileText, 
  Rss, 
  Upload, 
  Link, 
  Type, 
  Sparkles, 
  Eye, 
  Download,
  ArrowLeft,
  ArrowRight,
  FileImage,
  FileAudio,
  FileVideo,
  X,
  Info
} from "lucide-react";
import { projectAPI, rssAPI, uploadsAPI } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

interface BookType {
  id: string;
  name: string;
  description: string;
  icon: typeof BookOpen;
  category: string;
}

interface UploadingFile {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
  url?: string;
}

interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  podiumPackageId: string;
  url?: string;
  duration?: number; // in seconds
  projectId?: string;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  wordCount: number;
  estimatedPages: number;
}

interface WizardStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const bookTypes: BookType[] = [
  { id: 'fiction', name: 'Fiction', description: 'Novels, short stories, poetry', icon: BookOpen, category: 'Creative' },
  { id: 'non-fiction', name: 'Non-Fiction', description: 'Guides, manuals, textbooks', icon: FileText, category: 'Educational' },
  { id: 'business', name: 'Business', description: 'Reports, whitepapers, case studies', icon: FileText, category: 'Professional' },
  { id: 'educational', name: 'Educational', description: 'Course materials, study guides', icon: FileText, category: 'Learning' },
  { id: 'creative', name: 'Creative', description: 'Portfolios, art books, photography', icon: FileImage, category: 'Artistic' },
];

const BookCreationWizard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBookType, setSelectedBookType] = useState<string>('');
  const [bookDetails, setBookDetails] = useState({
    title: '',
    description: '',
    author: '',
    audience: ''
  });
  const [bookSpecs, setBookSpecs] = useState({
    targetPages: [150],
    targetChapters: [10],
    format: 'pdf'
  });
  const [contentSources, setContentSources] = useState({
    rssFeed: '',
    uploadedFiles: [] as FileMetadata[],
    textContent: '',
    urls: [] as string[]
  });
  const [selectedEpisodes, setSelectedEpisodes] = useState<Set<number>>(new Set());
  const [rssLoading, setRssLoading] = useState(false);
  const [rssError, setRssError] = useState<string | null>(null);
  const [rssEpisodes, setRssEpisodes] = useState<Array<{ id: string; title: string; link?: string | null; pubDate?: string | null; duration?: string | null }>>([]);
  const [projectId, setProjectId] = useState<string | null>(null);
  const autosaveTimerRef = useRef<number | null>(null);
  const [showChangesSaved, setShowChangesSaved] = useState(false);

  const toggleEpisodeSelection = (episodeId: number) => {
    setSelectedEpisodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(episodeId)) {
        newSet.delete(episodeId);
      } else {
        newSet.add(episodeId);
      }
      return newSet;
    });
  };

  // Helper function to create project only when needed
  const ensureProjectExists = async (): Promise<string | null> => {
    if (projectId) {
      return projectId;
    }

    try {
      const payload = {
        type: selectedBookType || undefined,
        details: bookDetails,
        specs: bookSpecs,
        content: {
          rssFeed: contentSources.rssFeed,
          uploadedFiles: contentSources.uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type })),
          textContent: contentSources.textContent,
          urls: contentSources.urls,
          selectedEpisodes: Array.from(selectedEpisodes),
        },
        step: currentStep,
      } as any;
      
      const resp = await projectAPI.saveProject(payload);
      const savedId = resp?.data?.id || resp?.id;
      if (savedId) {
        setProjectId(savedId);
        return savedId;
      }
      return null;
    } catch (error) {
      console.error('Failed to create project:', error);
      return null;
    }
  };

  useEffect(() => {
    if (currentStep > 1) {
      setShowChangesSaved(true);
      const timer = setTimeout(() => {
        setShowChangesSaved(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Only autosave after step 3 (when user has provided meaningful content)
  useEffect(() => {
    // Only start autosaving after step 3 or when user has uploaded files
    if (currentStep < 3 && contentSources.uploadedFiles.length === 0) {
      return;
    }

    if (autosaveTimerRef.current) {
      window.clearTimeout(autosaveTimerRef.current);
    }
    autosaveTimerRef.current = window.setTimeout(async () => {
      try {
        const payload = {
          id: projectId || undefined,
          type: selectedBookType || undefined,
          details: bookDetails,
          specs: bookSpecs,
          content: {
            rssFeed: contentSources.rssFeed,
            uploadedFiles: contentSources.uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type })),
            textContent: contentSources.textContent,
            urls: contentSources.urls,
            selectedEpisodes: Array.from(selectedEpisodes),
          },
          step: currentStep,
        } as any;
        const resp = await projectAPI.saveProject(payload);
        const savedId = resp?.data?.id || resp?.id;
        if (savedId && !projectId) setProjectId(savedId);
        setShowChangesSaved(true);
        setTimeout(() => setShowChangesSaved(false), 1500);
      } catch (e) {
        // Silent fail for autosave; could surface toast if desired
      }
    }, 600);
    return () => {
      if (autosaveTimerRef.current) {
        window.clearTimeout(autosaveTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBookType, bookDetails, bookSpecs, contentSources, selectedEpisodes, currentStep]);

  const steps: WizardStep[] = [
    { id: 1, title: 'Book Type', description: 'Choose your book category', completed: !!selectedBookType },
    { id: 2, title: 'Details', description: 'Book information', completed: !!bookDetails.title && !!bookDetails.description },
    { id: 3, title: 'Specifications', description: 'Size and structure', completed: true },
    { id: 4, title: 'Content', description: 'Add your content sources', completed: true },
  ];

  const handleNext = async () => {
    // Only create project and proceed to project detail when user has content
    if (currentStep === 4 && (selectedEpisodes.size > 0 || contentSources.uploadedFiles.length > 0)) {
      try {
        const episodesToSave = Array.from(selectedEpisodes).map((idx) => rssEpisodes[idx]).filter(Boolean);
        
        // Create project only when user has meaningful content
        const effectiveProjectId = await ensureProjectExists();
        if (!effectiveProjectId) {
          console.error('Failed to create project');
          return;
        }

        if (selectedEpisodes.size > 0) {
          await uploadsAPI.saveRssEpisodes({
            projectId: effectiveProjectId,
            episodes: episodesToSave as any,
          });
        }
        
        // Save any direct-uploaded files as uploads too
        const uploadedFiles = contentSources.uploadedFiles
          .filter(f => f.podiumPackageId) // Only include successfully uploaded files
          .map(f => ({
            filename: f.name,
            url: f.podiumPackageId, // You might need to construct this from your storage URL and package ID
            size: f.duration || 0, // Store duration instead of file size for cost calculation
            contentType: f.type,
            duration: f.duration
          }));

        console.log('Uploaded files:', uploadedFiles);

        if (uploadedFiles.length > 0) {
          console.log('Saving uploaded files:', uploadedFiles);
          await uploadsAPI.saveUploadedFiles({ 
            projectId: effectiveProjectId, 
            files: uploadedFiles 
          });
        }

        // After saving, navigate to project detail page
        navigate(`/projects/${effectiveProjectId}`);
        return;
      } catch (e) {
        console.error('Error saving project content:', e);
        // Even if saving uploads fails, attempt navigation to project page if we have an id
        if (projectId) {
          navigate(`/projects/${projectId}`);
          return;
        }
      }
    }
    
    // For steps 1-3, just move to next step without creating project
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    // For demo purposes, just go back to dashboard
    navigate("/dashboard");
  };

  const handleFinish = () => {
    // Navigate to the project detail page
    // In a real app, this would create the project and return an ID
    const projectId = 'new-project-' + Date.now(); // Generate a temporary ID
    navigate(`/projects/${projectId}`);
  };

  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [createPodiumPackage] = useMutation(CREATE_PODIUM_PACKAGE);

  // Helper function to extract duration from audio/video files
  const getFileDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file);
        const media = document.createElement(file.type.startsWith('audio/') ? 'audio' : 'video');
        
        media.addEventListener('loadedmetadata', () => {
          URL.revokeObjectURL(url);
          resolve(Math.round(media.duration));
        });
        
        media.addEventListener('error', () => {
          URL.revokeObjectURL(url);
          resolve(0);
        });
        
        media.src = url;
      } else {
        resolve(0);
      }
    });
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;
    
    const list = Array.from(files);
    
    // Create project only when user starts uploading files
    const effectiveProjectId = await ensureProjectExists();
    if (!effectiveProjectId) {
      console.error('Failed to create project for file upload');
      return;
    }
  
    const newUploadingFiles: UploadingFile[] = list.map(file => ({
      file,
      progress: 0,
      status: 'pending' as const
    }));
    
    setUploadingFiles(prev => [...prev, ...newUploadingFiles]);
  
    for (let i = 0; i < newUploadingFiles.length; i++) {
      const { file } = newUploadingFiles[i];
      const fileIndex = uploadingFiles.length + i;
      
      try {
        setUploadingFiles(prev => {
          const updated = [...prev];
          updated[fileIndex] = { ...updated[fileIndex], status: 'uploading' };
          return updated;
        });

        // Extract duration from the file
        const duration = await getFileDuration(file);
        console.log(`File ${file.name} duration: ${duration} seconds`);

        // 1. Get upload credentials from GraphQL
        const { data } = await createPodiumPackage({
          variables: {
            userEmail: user?.email || '', // Use actual user email from auth context
            originalFilename: file.name,
            projectId: null,
            languageCode: 'en', // Set appropriate language
            contentType: 'Podcast'
          }
        });
  
        // 2. Create FormData
        const formData = new FormData();
        formData.append('key', data.createPodiumPackage.key);
        formData.append('AWSAccessKeyId', data.createPodiumPackage.AWSAccessKeyId);
        formData.append('policy', data.createPodiumPackage.policy);
        formData.append('signature', data.createPodiumPackage.signature);
        formData.append('file', file);
  
        // 3. Upload the file
        await axios.post(data.createPodiumPackage.url, formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || file.size)
            );
            setUploadingFiles(prev => {
              const updated = [...prev];
              updated[fileIndex] = { 
                ...updated[fileIndex], 
                progress,
                status: progress === 100 ? 'completed' : 'uploading' as const
              };
              return updated;
            });
          },
        });

        const uploadedFileData: FileMetadata = {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          podiumPackageId: data.createPodiumPackage.podiumPackageGuid,
          projectId: effectiveProjectId,
          duration: duration // Now includes the extracted duration
        };
  
        // Update state
        setUploadingFiles(prev => prev.filter((_, idx) => idx !== fileIndex));
        setContentSources(prev => ({
          ...prev,
          uploadedFiles: [...prev.uploadedFiles, uploadedFileData]
        }));
  
      } catch (error) {
        console.error("Upload failed:", file.name, error);
        setUploadingFiles(prev => {
          const updated = [...prev];
          updated[fileIndex] = { 
            ...updated[fileIndex], 
            status: 'error' as const,
            error: error.message 
          };
          return updated;
        });
      }
    }
  };

  const removeFile = (index: number) => {
    setContentSources(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }));
  };

  const calculateTotalPrice = () => {
    // Target pricing: $500-1000 for 100-300 pages
    // This means approximately $2-3.33 per page
    const targetPricePerPage = 2.5; // Middle of the range
    
    // Base calculation based on target pages
    let basePrice = bookSpecs.targetPages[0] * targetPricePerPage;
    
    // Adjust for book type complexity
    let complexityMultiplier = (selectedBookType === 'technical' || selectedBookType === 'academic') ? 1.3 : 1.0;
    if (selectedBookType === 'creative') complexityMultiplier = 0.9; // Creative content is easier to generate
    
    // Content source processing fee
    const contentProcessingFee = 25; // Fixed fee for processing content sources
    
    // Calculate total
    const subtotal = (basePrice * complexityMultiplier) + contentProcessingFee;
    
    return Math.round(subtotal); // Round to nearest dollar
  };

  const calculateEpisodesNeeded = () => {
    // Average speaking rate: 130 words per minute
    // 60 minutes = 7,800 words
    // Target: 100-300 pages = approximately 25,000 - 75,000 words
    const targetWords = bookSpecs.targetPages[0] * 250; // Assume 250 words per page
    
    // Calculate minutes needed
    const minutesNeeded = targetWords / 130; // 130 words per minute
    
    // Convert to episodes (assuming average episode length of 45 minutes)
    const averageEpisodeLength = 45; // minutes
    const episodesNeeded = Math.ceil(minutesNeeded / averageEpisodeLength);
    
    return Math.max(1, episodesNeeded); // Minimum 1 episode
  };

  const calculateContentHours = () => {
    const targetWords = bookSpecs.targetPages[0] * 250;
    const minutesNeeded = targetWords / 130;
    const hoursNeeded = minutesNeeded / 60;
    
    return Math.round(hoursNeeded * 10) / 10; // Round to 1 decimal place
  };

  // Step 5 processing moved out; no longer handled in this wizard

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
                    <h2 className="text-3xl font-medium text-foreground mb-2">What type of book are you creating?</h2>
        <p className="text-muted-foreground">Choose the category that best describes your project</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookTypes.map((type) => (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-all bg-background ${
              selectedBookType === type.id 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:bg-muted/50 hover:scale-105'
            }`}
            onClick={() => setSelectedBookType(type.id)}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
                <type.icon className="w-8 h-8 text-foreground" />
              </div>
                              <h3 className="font-medium text-lg mb-2">{type.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
              <Badge variant="secondary" className="text-xs">{type.category}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
                    <h2 className="text-3xl font-medium text-foreground mb-2">Tell us about your book</h2>
        <p className="text-muted-foreground">Provide the essential details for your project</p>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-4">
        <div>
          <Label htmlFor="title">Book Title</Label>
          <Input
            id="title"
            placeholder="Enter your book title"
            value={bookDetails.title}
            onChange={(e) => setBookDetails(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1"
          />
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="description">Description</Label>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Book Description</h4>
                  <p className="text-sm text-muted-foreground">
                    Provide a clear, compelling summary of your book. Include the main topics, key benefits, and what readers will learn. This helps AI generate better content and structure.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <Textarea
            id="description"
            placeholder="Describe what your book is about"
            value={bookDetails.description}
            onChange={(e) => setBookDetails(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1"
            rows={4}
          />
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="author">Author Name</Label>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Author Name</h4>
                  <p className="text-sm text-muted-foreground">
                    This will be displayed as the author of your book. Use your real name or a pen name.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <Input
            id="author"
            placeholder="Your name or pen name"
            value={bookDetails.author}
            onChange={(e) => setBookDetails(prev => ({ ...prev, author: e.target.value }))}
            className="mt-1"
          />
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="audience">Target Audience</Label>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Target Audience</h4>
                  <p className="text-sm text-muted-foreground">
                    Describe who this book is for. Be specific: "Beginner developers learning React" or "Marketing professionals with 5+ years experience"
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <Input
            id="audience"
            placeholder="e.g., Beginners, Professionals, Students"
            value={bookDetails.audience}
            onChange={(e) => setBookDetails(prev => ({ ...prev, audience: e.target.value }))}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
                    <h2 className="text-3xl font-medium text-foreground mb-2">Book Specifications</h2>
        <p className="text-muted-foreground">Set your target size and structure</p>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label className="text-base font-medium">Target Pages</Label>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Target Pages</h4>
                  <p className="text-sm text-muted-foreground">
                    Set your desired book length. The AI will try to get close to this number, but the final page count may vary based on content and formatting.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="mt-2 space-y-2">
            <Slider
              value={bookSpecs.targetPages}
              onValueChange={(value) => setBookSpecs(prev => ({ ...prev, targetPages: value }))}
              max={500}
              min={50}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>50 pages</span>
              <span className="font-medium text-foreground">{bookSpecs.targetPages[0]} pages</span>
              <span>500 pages</span>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label className="text-base font-medium">Target Chapters</Label>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Target Chapters</h4>
                  <p className="text-sm text-muted-foreground">
                    Set your desired number of chapters. The AI will try to get close to this number, but the final chapter count may vary based on content structure and flow.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="mt-2 space-y-2">
            <Slider
              value={bookSpecs.targetChapters}
              onValueChange={(value) => setBookSpecs(prev => ({ ...prev, targetChapters: value }))}
              max={50}
              min={3}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>3 chapters</span>
              <span className="font-medium text-sm font-medium text-foreground">{bookSpecs.targetChapters[0]} chapters</span>
              <span>50 chapters</span>
            </div>
          </div>
        </div>
        

      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-medium text-foreground mb-2">Add Your Content</h2>
        <p className="text-muted-foreground">Choose how you want to provide content for your book</p>
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-2xl mx-auto">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> You must add at least one content source (RSS feed episodes or uploaded files) to create your project.
          </p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {/* RSS Feed Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rss className="w-5 h-5 text-primary" />
              RSS Feed
            </CardTitle>
            <CardDescription>Import content from an RSS feed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter RSS feed URL"
                value={contentSources.rssFeed}
                onChange={(e) => setContentSources(prev => ({ ...prev, rssFeed: e.target.value }))}
                className="flex-1"
              />
              <Button
                variant="outline"
                disabled={!contentSources.rssFeed || rssLoading}
                onClick={async () => {
                  setRssError(null);
                  setRssLoading(true);
                  try {
                    const data = await rssAPI.fetchEpisodes(contentSources.rssFeed);
                    setRssEpisodes(data.episodes || []);
                  } catch (e: any) {
                    setRssEpisodes([]);
                    setRssError(e?.message || 'Failed to fetch RSS');
                  } finally {
                    setRssLoading(false);
                  }
                }}
              >
                {rssLoading ? 'Loading…' : 'Validate'}
              </Button>
            </div>
            {rssError && (
              <div className="text-sm text-red-600 mt-2">{rssError}</div>
            )}
            {contentSources.rssFeed && rssEpisodes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Select the episodes for your book:</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {selectedEpisodes.size} episode{selectedEpisodes.size !== 1 ? 's' : ''} selected
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const all = new Set<number>();
                        for (let i = 0; i < rssEpisodes.length; i++) all.add(i);
                        setSelectedEpisodes(all);
                      }}
                    >
                      Select all
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedEpisodes(new Set())}
                    >
                      Deselect all
                    </Button>
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2 custom-scrollbar">
                  {rssEpisodes.map((ep, idx) => {
                    const isSelected = selectedEpisodes.has(idx);
                    return (
                      <div 
                        key={ep.id || idx} 
                        className={`flex items-center justify-between p-2 rounded transition-colors ${
                          isSelected ? 'bg-primary/10 border border-primary/20' : 'bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Rss className="w-4 h-4" />
                          <span className="text-sm truncate max-w-[320px]" title={ep.title}>Episode {idx + 1}: {ep.title}</span>
                          <Badge variant="secondary" className="text-xs">
                            {ep.duration ? ep.duration : (ep.pubDate ? new Date(ep.pubDate).toLocaleDateString() : '—')}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleEpisodeSelection(idx)}
                          className="min-w-[80px]"
                        >
                          {isSelected ? 'Remove' : 'Add'}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* File Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              File Upload
            </CardTitle>
            <CardDescription>Upload audio and video files only</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-2">Drag and drop audio/video files here, or click to browse</p>
              <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                Choose Files
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="audio/*,video/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </div>
            {uploadingFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Uploading Files:</h4>
                {uploadingFiles.map((uploadingFile, index) => (
                  <div key={index} className="p-2 bg-muted rounded">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">{uploadingFile.file.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {(uploadingFile.file.size / 1024 / 1024).toFixed(2)} MB
                        </Badge>
                        {uploadingFile.status === 'error' && (
                          <span className="text-xs text-red-500">{uploadingFile.error}</span>
                        )}
                      </div>
                      {uploadingFile.status === 'uploading' && (
                        <span className="text-xs text-muted-foreground">
                          {uploadingFile.progress}%
                        </span>
                      )}
                    </div>
                    {uploadingFile.status === 'uploading' && (
                      <Progress value={uploadingFile.progress} className="h-2" />
                    )}
                  </div>
                ))}
              </div>
            )}
            {contentSources.uploadedFiles.map((file, index) => (
              <div key={file.podiumPackageId || index} className="flex items-center justify-between p-2 bg-muted rounded">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <div>
                    <div className="text-sm">{file.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                      {file.duration && ` • ${Math.floor(file.duration / 60)}:${(file.duration % 60).toString().padStart(2, '0')}`}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Step 5 (Book Overview) has been extracted into a separate component/page

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center mb-8">
                      <h1 className="text-2xl font-medium text-foreground">Create New Book</h1>
          <div className="flex items-center gap-3">
            {showChangesSaved && (
              <span className="text-sm text-muted-foreground animate-in fade-in duration-300">
                Changes saved
              </span>
            )}
            <Button variant="outline" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Simple Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          {/* Only show Previous button if not on first step */}
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}
          
          {/* Show empty div on first step to maintain layout */}
          {currentStep === 1 && <div></div>}
          
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !selectedBookType) ||
              (currentStep === 2 && (!bookDetails.title || !bookDetails.description)) ||
              (currentStep === 4 && selectedEpisodes.size === 0 && contentSources.uploadedFiles.length === 0)
            }
            className="bg-primary hover:bg-primary/90"
          >
            {currentStep === 4 ? 'Create Project' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCreationWizard;
