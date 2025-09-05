import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from '@/contexts/ThemeContext';
import LogoMark from '@/components/LogoMark';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Mail, 
  Phone, 
  User, 
  Lock,
  Eye,
  EyeOff,
  Search,
  Download,
  Upload,
  Settings,
  Home,
  BookOpen,
  Users,
  Calendar,
  Star,
  Heart,
  Share2,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  X,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  FileText,
  Sun,
  Moon,
  Type,
  Palette,
  MousePointer,
  FileText as FileTextIcon,
  Layers,
  Grid3X3,
  Clock,
  Edit,
  MessageSquare,
  Loader2,
  ArrowUp,
  Link,
  Rss
} from 'lucide-react';

// Custom Library Navigation Component
const LibraryNavigation = () => {
  const sections = [
    { id: 'typography', label: 'Typography', icon: Type, description: 'Font families, weights, and scales' },
    { id: 'logo', label: 'Logo & Brand', icon: BookOpen, description: 'Logo components and brand identity' },
    { id: 'colors', label: 'Color System', icon: Palette, description: 'Primary, semantic, and opacity variations' },
    { id: 'buttons', label: 'Buttons', icon: MousePointer, description: 'All button variants and sizes' },
    { id: 'forms', label: 'Form Elements', icon: FileTextIcon, description: 'Inputs, selects, checkboxes, and more' },
    { id: 'specialized-inputs', label: 'Specialized Inputs', icon: MessageSquare, description: 'Chat input, RSS feeds, and AI components' },
    { id: 'cards', label: 'Cards', icon: Layers, description: 'Basic, action, and feature cards' },
    { id: 'badges', label: 'Badges', icon: Grid3X3, description: 'Status, category, and default badges' },
    { id: 'navigation', label: 'Navigation', icon: MoreHorizontal, description: 'Breadcrumbs, tabs, and accordions' },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, description: 'Info, success, warning, and error alerts' },
    { id: 'layout', label: 'Layout', icon: Grid3X3, description: 'Grid system and spacing scale' },
    { id: 'interactive', label: 'Interactive', icon: MousePointer, description: 'Hover, focus, and transitions' },
    { id: 'project-components', label: 'Project Components', icon: BookOpen, description: 'Project cards, status, and progress' },
    { id: 'book-landing-pages', label: 'Book Landing Pages', icon: BookOpen, description: 'Book landing page variations for different states' },
    { id: 'pages', label: 'Page Examples', icon: FileText, description: 'Complete page designs and layouts' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-96 bg-card flex-shrink-0">
      <ScrollArea className="h-full">
      <div className="p-4">
        <nav className="space-y-2">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Button
                key={section.id}
                variant="ghost"
                className="w-full justify-start h-auto py-3 px-3 text-left"
                onClick={() => scrollToSection(section.id)}
              >
                <IconComponent className="w-4 h-4 mr-3 text-muted-foreground" />
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm text-foreground">{section.label}</div>
                  <div className="text-xs text-muted-foreground">{section.description}</div>
                </div>
              </Button>
            );
          })}
        </nav>
      </div>
      </ScrollArea>
    </div>
  );
};

const ComponentLibrary = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header with Logo and Theme Toggle - Full viewport width */}
      <div className="border-b bg-card px-6 py-4 flex items-center justify-between flex-shrink-0 w-full">
          <div className="flex items-center gap-4">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Component Library</h1>
                <p className="text-sm text-muted-foreground">Design System Reference</p>
              </div>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-10 h-10 p-0"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

      {/* Content Area with Left Nav and Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* Custom Library Navigation */}
        <LibraryNavigation />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Page Content with ScrollArea */}
          <ScrollArea className="flex-1">
          <div className="container mx-auto px-6 py-8">
            {/* Introduction Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Podbook Component Library
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A comprehensive showcase of all design components, typography, and UI patterns used throughout the Podbook platform.
                Use this as a reference for maintaining design consistency across all pages.
              </p>
            </div>

            {/* Typography Section */}
            <section id="typography" className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Typography</h2>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Font Family: Inter</CardTitle>
                    <CardDescription>Our primary font family used throughout the application</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h1 className="text-4xl font-bold text-foreground">Heading 1 - 4xl Bold</h1>
                      <p className="text-sm text-muted-foreground mt-2">Font weight: 700, Size: 2.25rem (36px)</p>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">Heading 2 - 3xl Bold</h2>
                      <p className="text-sm text-muted-foreground mt-2">Font weight: 700, Size: 1.875rem (30px)</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">Heading 3 - 2xl Semibold</h3>
                      <p className="text-sm text-muted-foreground mt-2">Font weight: 600, Size: 1.5rem (24px)</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-foreground">Heading 4 - xl Semibold</h4>
                      <p className="text-sm text-muted-foreground mt-2">Font weight: 600, Size: 1.25rem (20px)</p>
                    </div>
                    <div>
                      <p className="text-lg text-foreground">Body Large - lg Regular</p>
                      <p className="text-sm text-muted-foreground mt-2">Font weight: 400, Size: 1.125rem (18px)</p>
                    </div>
                    <div>
                      <p className="text-base text-foreground">Body - base Regular</p>
                      <p className="text-sm text-muted-foreground mt-2">Font weight: 400, Size: 1rem (16px)</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground">Body Small - sm Regular</p>
                      <p className="text-sm text-muted-foreground mt-2">Font weight: 400, Size: 0.875rem (14px)</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground">Caption - xs Regular</p>
                      <p className="text-sm text-muted-foreground mt-2">Font weight: 400, Size: 0.75rem (12px)</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Font Weights</CardTitle>
                    <CardDescription>Available font weight variations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-thin text-foreground">Font Thin (100)</p>
                    <p className="font-extralight text-foreground">Font Extra Light (200)</p>
                    <p className="font-light text-foreground">Font Light (300)</p>
                    <p className="font-normal text-foreground">Font Normal (400)</p>
                    <p className="font-medium text-foreground">Font Medium (500)</p>
                    <p className="font-semibold text-foreground">Font Semibold (600)</p>
                    <p className="font-bold text-foreground">Font Bold (700)</p>
                    <p className="font-extrabold text-foreground">Font Extra Bold (800)</p>
                    <p className="font-black text-foreground">Font Black (900)</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Logo Section */}
            <section id="logo" className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Logo & Brand Identity</h2>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Logo Components</CardTitle>
                    <CardDescription>Consistent logo usage across different contexts and sizes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Logo Mark Only</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        The standalone logo mark using the official Podbook SVG logo. Use this for small spaces, favicons, and when the full logo doesn't fit.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center space-y-2">
                            <LogoMark size="lg" className="mx-auto" />
                          <p className="text-xs font-medium">8×8 (32px)</p>
                          <p className="text-xs text-muted-foreground">Favicon, small icons</p>
                        </div>
                        <div className="text-center space-y-2">
                            <LogoMark size="xl" className="mx-auto" />
                          <p className="text-xs font-medium">10×10 (40px)</p>
                          <p className="text-xs text-muted-foreground">Navigation, buttons</p>
                        </div>
                        <div className="text-center space-y-2">
                            <LogoMark size="2xl" className="mx-auto" />
                          <p className="text-xs font-medium">12×12 (48px)</p>
                          <p className="text-xs text-muted-foreground">Headers, cards</p>
                        </div>
                        <div className="text-center space-y-2">
                            <LogoMark size="xl" className="mx-auto w-16 h-16" />
                          <p className="text-xs font-medium">16×16 (64px)</p>
                          <p className="text-xs text-muted-foreground">Hero sections, large displays</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Logo with Logotype</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Full logo combining the mark with the "Podbook" text. Use this for headers, footers, and brand recognition.
                      </p>
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <LogoMark size="md" />
                          <span className="text-2xl font-medium text-foreground" style={{ letterSpacing: '-1px' }}>Podbook</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <LogoMark size="lg" />
                          <span className="text-3xl font-medium text-foreground" style={{ letterSpacing: '-1px' }}>Podbook</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <LogoMark size="xl" />
                          <span className="text-4xl font-medium text-foreground" style={{ letterSpacing: '-1px' }}>Podbook</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Logo Usage Guidelines</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h5 className="font-medium text-foreground">✅ Do's</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Maintain minimum clear space around logo</li>
                            <li>• Use appropriate size for context</li>
                            <li>• Ensure sufficient contrast with background</li>
                            <li>• Keep logo mark and text proportional</li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h5 className="font-medium text-foreground">❌ Don'ts</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Don't stretch or distort the logo</li>
                            <li>• Don't change logo colors arbitrarily</li>
                            <li>• Don't place on busy backgrounds</li>
                            <li>• Don't make logo too small to read</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Theme Variants</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Podbook provides two logo variants for different themes and backgrounds.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border rounded-lg p-4 bg-card">
                          <h5 className="font-medium text-foreground mb-3">Light Theme Logo</h5>
                          <div className="flex items-center gap-3">
                              <LogoMark size="md" />
                            <span className="text-2xl font-medium text-foreground" style={{ letterSpacing: '-1px' }}>Podbook</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">Use on light backgrounds</p>
                        </div>
                        <div className="border rounded-lg p-4 bg-card">
                          <h5 className="font-medium text-foreground mb-3">Dark Theme Logo</h5>
                          <div className="flex items-center gap-3">
                              <LogoMark size="md" />
                            <span className="text-2xl font-medium text-foreground" style={{ letterSpacing: '-1px' }}>Podbook</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">Use on dark backgrounds</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Logo in Context</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border rounded-lg p-4 bg-card">
                          <h5 className="font-medium text-foreground mb-3">Header Usage</h5>
                          <div className="flex items-center gap-3">
                              <LogoMark size="md" />
                            <span className="text-2xl font-medium text-foreground" style={{ letterSpacing: '-1px' }}>Podbook</span>
                          </div>
                        </div>
                        <div className="border rounded-lg p-4 bg-card">
                          <h5 className="font-medium text-foreground mb-3">Navigation Usage</h5>
                          <div className="flex items-center gap-2">
                              <LogoMark size="md" />
                            <span className="text-2xl font-medium text-foreground" style={{ letterSpacing: '-1px' }}>Podbook</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

              {/* Favicon Section */}
              <section id="favicon" className="mb-16">
                <h2 className="text-3xl font-bold text-foreground mb-8">Favicon & App Icons</h2>
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Favicon Collection</CardTitle>
                      <CardDescription>Complete set of favicon and app icon files for all platforms and devices</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Standard Favicons</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Traditional favicon files for web browsers and bookmarks.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="text-center space-y-2">
                            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto">
                              <img src="/favicon-16x16.png" alt="16x16 Favicon" className="w-4 h-4" />
                            </div>
                            <p className="text-xs font-medium">16×16</p>
                            <p className="text-xs text-muted-foreground">Standard favicon</p>
                          </div>
                          <div className="text-center space-y-2">
                            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto">
                              <img src="/favicon-32x32.png" alt="32x32 Favicon" className="w-8 h-8" />
                            </div>
                            <p className="text-xs font-medium">32×32</p>
                            <p className="text-xs text-muted-foreground">High-DPI favicon</p>
                          </div>
                          <div className="text-center space-y-2">
                            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto">
                              <img src="/favicon.ico" alt="ICO Favicon" className="w-8 h-8" />
                            </div>
                            <p className="text-xs font-medium">ICO Format</p>
                            <p className="text-xs text-muted-foreground">Legacy browser support</p>
                          </div>
                          <div className="text-center space-y-2">
                            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto">
                              <img src="/apple-touch-icon.png" alt="Apple Touch Icon" className="w-12 h-12" />
                            </div>
                            <p className="text-xs font-medium">180×180</p>
                            <p className="text-xs text-muted-foreground">Apple devices</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-4">Android App Icons</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          High-resolution icons for Android devices and PWA installations.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="text-center space-y-2">
                            <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mx-auto">
                              <img src="/android-chrome-192x192.png" alt="192x192 Android Icon" className="w-20 h-20" />
                            </div>
                            <p className="text-sm font-medium">192×192</p>
                            <p className="text-xs text-muted-foreground">Android devices, PWA</p>
                          </div>
                          <div className="text-center space-y-2">
                            <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mx-auto">
                              <img src="/android-chrome-512x512.png" alt="512x512 Android Icon" className="w-20 h-20" />
                            </div>
                            <p className="text-sm font-medium">512×512</p>
                            <p className="text-xs text-muted-foreground">High-DPI Android, PWA</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-4">Implementation</h4>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h5 className="font-medium mb-3">HTML Head Tags:</h5>
                                                     <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`&lt;!-- Favicon --&gt;
&lt;link rel="icon" type="image/x-icon" href="/favicon.ico" /&gt;
&lt;link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /&gt;
&lt;link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /&gt;
&lt;link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" /&gt;
&lt;link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" /&gt;
&lt;link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" /&gt;
&lt;link rel="manifest" href="/site.webmanifest" /&gt;`}
                           </pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-4">Web App Manifest</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          The site.webmanifest file enables PWA functionality and provides app metadata.
                        </p>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h5 className="font-medium mb-3">site.webmanifest:</h5>
                          <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`{
  "name": "Podbook - Convert RSS Feeds to Beautiful Books",
  "short_name": "Podbook",
  "description": "Transform any RSS feed into professionally formatted books",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/",
  "scope": "/"
}`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-4">Best Practices</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h5 className="font-medium text-foreground">✅ Do's</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Use appropriate sizes for different devices</li>
                              <li>• Ensure icons are clear at small sizes</li>
                              <li>• Test favicons across different browsers</li>
                              <li>• Include web app manifest for PWA support</li>
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <h5 className="font-medium text-foreground">❌ Don'ts</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Don't use overly complex designs</li>
                              <li>• Don't forget high-DPI versions</li>
                              <li>• Don't ignore mobile device icons</li>
                              <li>• Don't use inconsistent icon styles</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

            {/* Color System Section */}
            <section id="colors" className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Color System</h2>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Primary Colors</CardTitle>
                    <CardDescription>Main brand colors and their variations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-2 border border-border"></div>
                        <p className="text-sm font-medium">Primary</p>
                        <p className="text-xs text-muted-foreground">hsl(var(--primary))</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/90 rounded-lg mx-auto mb-2 border border-border"></div>
                        <p className="text-sm font-medium">Primary/90</p>
                        <p className="text-xs text-muted-foreground">90% opacity</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/80 rounded-lg mx-auto mb-2 border border-border"></div>
                        <p className="text-sm font-medium">Primary/80</p>
                        <p className="text-xs text-muted-foreground">80% opacity</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/50 rounded-lg mx-auto mb-2 border border-border"></div>
                        <p className="text-sm font-medium">Primary/50</p>
                        <p className="text-xs text-muted-foreground">50% opacity</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Semantic Colors</CardTitle>
                    <CardDescription>Colors used for different states and meanings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-background rounded-lg mx-auto mb-2 border border-border"></div>
                        <p className="text-sm font-medium">Background</p>
                        <p className="text-xs text-muted-foreground">hsl(var(--background))</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-foreground rounded-lg mx-auto mb-2 border border-border"></div>
                        <p className="text-sm font-medium">Foreground</p>
                        <p className="text-xs text-muted-foreground">hsl(var(--foreground))</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-2 border border-border"></div>
                        <p className="text-sm font-medium">Muted</p>
                        <p className="text-xs text-muted-foreground">hsl(var(--muted))</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-muted/50 rounded-lg mx-auto mb-2 border border-border"></div>
                        <p className="text-sm font-medium">Muted/50</p>
                        <p className="text-xs text-muted-foreground">50% opacity</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Button Components Section */}
            <section id="buttons" className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Button Components</h2>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Button Variants</CardTitle>
                    <CardDescription>All available button styles and states</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Primary Buttons</h4>
                      <div className="flex flex-wrap gap-3">
                        <Button>Default</Button>
                        <Button disabled>Disabled</Button>
                        <Button size="sm">Small</Button>
                        <Button size="lg">Large</Button>
                        <Button className="w-full">Full Width</Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Secondary Buttons</h4>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="secondary" disabled>Disabled</Button>
                        <Button variant="secondary" size="sm">Small</Button>
                        <Button variant="secondary" size="lg">Large</Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Outline Buttons</h4>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline">Outline</Button>
                        <Button variant="outline" disabled>Disabled</Button>
                        <Button variant="outline" size="sm">Small</Button>
                        <Button variant="outline" size="lg">Large</Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Ghost Buttons</h4>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="ghost" disabled>Disabled</Button>
                        <Button variant="ghost" size="sm">Small</Button>
                        <Button variant="ghost" size="lg">Large</Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Destructive Buttons</h4>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="destructive" disabled>Disabled</Button>
                        <Button variant="destructive" size="sm">Small</Button>
                        <Button variant="destructive" size="lg">Large</Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Button with Icons</h4>
                      <div className="flex flex-wrap gap-3">
                        <Button>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                        <Button variant="ghost">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Form Components Section */}
            <section id="forms" className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Form Components</h2>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Input Fields</CardTitle>
                    <CardDescription>Text input components and variations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="default-input">Default Input</Label>
                        <Input id="default-input" placeholder="Enter text here..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="disabled-input">Disabled Input</Label>
                        <Input id="disabled-input" placeholder="Disabled input" disabled />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="with-icon-input">Input with Icon</Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="with-icon-input" placeholder="Search..." className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="error-input">Error Input</Label>
                        <Input id="error-input" placeholder="Error state" className="border-destructive" />
                        <p className="text-sm text-destructive">This field is required</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="textarea">Textarea</Label>
                      <Textarea id="textarea" placeholder="Enter longer text here..." rows={4} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="select">Select Dropdown</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                            <SelectItem value="option3">Option 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="select-disabled">Disabled Select</Label>
                        <Select disabled>
                          <SelectTrigger>
                            <SelectValue placeholder="Disabled select" />
                          </SelectTrigger>
                        </Select>
                      </div>
                    </div>

                                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <div className="space-y-2">
                         <Label>Checkbox</Label>
                         <div className="flex items-center space-x-2">
                           <Checkbox id="checkbox" />
                           <Label htmlFor="checkbox">Accept terms</Label>
                         </div>
                       </div>
                       <div className="space-y-2">
                         <Label>Radio Group</Label>
                         <RadioGroup defaultValue="option1">
                           <div className="flex items-center space-x-2">
                             <RadioGroupItem value="option1" id="radio1" />
                             <Label htmlFor="radio1">Option 1</Label>
                           </div>
                           <div className="flex items-center space-x-2">
                             <RadioGroupItem value="option2" id="radio2" />
                             <Label htmlFor="radio2">Option 2</Label>
                           </div>
                         </RadioGroup>
                       </div>
                       <div className="space-y-2">
                         <Label>Switch</Label>
                         <div className="flex items-center space-x-2">
                           <Switch id="switch" />
                           <Label htmlFor="switch">Enable notifications</Label>
                         </div>
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               </div>
             </section>

             {/* Specialized Input Components Section */}
             <section id="specialized-inputs" className="mb-16">
               <h2 className="text-3xl font-bold text-foreground mb-8">Specialized Input Components</h2>
               <div className="grid gap-6">
                 <Card>
                   <CardHeader>
                     <CardTitle>Chat Input Component</CardTitle>
                     <CardDescription>AI-powered content creation input with file upload</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <div className="max-w-2xl">
                       <div className="relative">
                         <Input
                           type="text"
                           placeholder="Add an RSS feed, upload files, write a prompt, to start your book..."
                           className="w-full h-16 text-lg px-6 pr-16 border-2 border-border focus:border-primary transition-colors bg-background rounded-[30px] text-foreground placeholder:text-muted-foreground"
                         />
                         <Button
                           size="sm"
                           className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-primary hover:bg-primary/90"
                         >
                           <ArrowUp className="w-5 h-5" />
                         </Button>
                       </div>
                       <div className="flex gap-2 mt-3">
                         <Button variant="outline" size="sm">
                           <Upload className="w-4 h-4 mr-2" />
                           Upload Files
                         </Button>
                         <Button variant="outline" size="sm">
                           <Link className="w-4 h-4 mr-2" />
                           Add RSS Feed
                         </Button>
                         <Button variant="outline" size="sm">
                           <Type className="w-4 h-4 mr-2" />
                           Write Prompt
                         </Button>
                       </div>
                     </div>
                   </CardContent>
                 </Card>

                 <Card>
                   <CardHeader>
                     <CardTitle>RSS Feed Input</CardTitle>
                     <CardDescription>Specialized input for RSS feed URLs with validation</CardDescription>
                   </CardHeader>
                   <CardContent>
                     <div className="space-y-4">
                       <div className="space-y-2">
                         <Label htmlFor="rss-input">RSS Feed URL</Label>
                         <div className="relative">
                           <Rss className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                           <Input
                             id="rss-input"
                             placeholder="https://example.com/feed.xml"
                             className="pl-10"
                           />
                         </div>
                         <p className="text-sm text-muted-foreground">
                           Enter the URL of an RSS feed to import content from
                         </p>
                       </div>
                       <div className="flex gap-2">
                         <Button size="sm">
                           <Search className="w-4 h-4 mr-2" />
                           Validate Feed
                         </Button>
                         <Button variant="outline" size="sm">
                           <Plus className="w-4 h-4 mr-2" />
                           Add Another Feed
                         </Button>
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               </div>
             </section>

            {/* Card Components Section */}
            <section id="cards" className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Card Components</h2>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Card</CardTitle>
                      <CardDescription>A simple card with header and content</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        This is a basic card component that can be used throughout the application.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Card with Actions</CardTitle>
                      <CardDescription>Card with interactive elements</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Cards can contain various interactive elements like buttons and forms.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm">Action 1</Button>
                        <Button variant="outline" size="sm">Action 2</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Feature Card</CardTitle>
                      <CardDescription>Highlighting key features</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Star className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Feature cards are great for showcasing key capabilities and benefits.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Badge Components Section */}
            <section id="badges" className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Badge Components</h2>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Badge Variants</CardTitle>
                    <CardDescription>Different badge styles and use cases</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Default Badges</h4>
                      <div className="flex flex-wrap gap-3">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Status Badges</h4>
                      <div className="flex flex-wrap gap-3">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                          <X className="w-3 h-3 mr-1" />
                          Inactive
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Category Badges</h4>
                      <div className="flex flex-wrap gap-3">
                        <Badge variant="outline">Technology</Badge>
                        <Badge variant="outline">Business</Badge>
                        <Badge variant="outline">Design</Badge>
                        <Badge variant="outline">Marketing</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Navigation Components Section */}
            <section id="navigation" className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Navigation Components</h2>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Navigation Patterns</CardTitle>
                    <CardDescription>Common navigation components and layouts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Breadcrumb Navigation</h4>
                      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-colors">Home</a>
                        <ChevronRight className="w-4 h-4" />
                        <a href="#" className="hover:text-foreground transition-colors">Components</a>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground">Library</span>
                      </nav>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Tab Navigation</h4>
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="components">Components</TabsTrigger>
                          <TabsTrigger value="usage">Usage</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="mt-4">
                          <p className="text-sm text-muted-foreground">
                            Overview content goes here. This demonstrates how tabs work in the application.
                          </p>
                        </TabsContent>
                        <TabsContent value="components" className="mt-4">
                          <p className="text-sm text-muted-foreground">
                            Components content goes here. This shows the different tab states.
                          </p>
                        </TabsContent>
                        <TabsContent value="usage" className="mt-4">
                          <p className="text-sm text-muted-foreground">
                            Usage content goes here. This completes the tab demonstration.
                          </p>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Accordion Navigation</h4>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>Getting Started</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm text-muted-foreground">
                              Learn how to get started with our component library and design system.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>Components</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm text-muted-foreground">
                              Explore all available components and their usage examples.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>Guidelines</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm text-muted-foreground">
                              Follow our design guidelines to maintain consistency across the platform.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Alert Components Section */}
            <section id="alerts" className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Alert Components</h2>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Alert Variants</CardTitle>
                    <CardDescription>Different types of alert messages and notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        This is a default informational alert. Use it to provide general information to users.
                      </AlertDescription>
                    </Alert>

                    <Alert className="border-green-200 bg-green-50 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        This is a success alert. Use it to confirm successful actions or positive outcomes.
                      </AlertDescription>
                    </Alert>

                    <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        This is a warning alert. Use it to warn users about potential issues or required actions.
                      </AlertDescription>
                    </Alert>

                    <Alert className="border-red-200 bg-red-50 text-red-800">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        This is an error alert. Use it to notify users about errors or critical issues.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Layout Components Section */}
            <section id="layout" className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Layout Components</h2>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Grid System</CardTitle>
                    <CardDescription>Responsive grid layouts and spacing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Responsive Grid</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="h-20 bg-muted rounded-lg flex items-center justify-center text-sm">1</div>
                        <div className="h-20 bg-muted rounded-lg flex items-center justify-center text-sm">2</div>
                        <div className="h-20 bg-muted rounded-lg flex items-center justify-center text-sm">3</div>
                        <div className="h-20 bg-muted rounded-lg flex items-center justify-center text-sm">4</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Spacing Scale</h4>
                      <div className="space-y-4">
                        <div className="h-4 bg-muted rounded" style={{ width: '0.25rem' }}></div>
                        <div className="h-4 bg-muted rounded" style={{ width: '0.5rem' }}></div>
                        <div className="h-4 bg-muted rounded" style={{ width: '1rem' }}></div>
                        <div className="h-4 bg-muted rounded" style={{ width: '1.5rem' }}></div>
                        <div className="h-4 bg-muted rounded" style={{ width: '2rem' }}></div>
                        <div className="h-4 bg-muted rounded" style={{ width: '3rem' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>1</span>
                        <span>2</span>
                        <span>4</span>
                        <span>6</span>
                        <span>8</span>
                        <span>12</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Interactive Elements Section */}
            <section id="interactive" className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Interactive Elements</h2>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Hover States & Transitions</CardTitle>
                    <CardDescription>Interactive elements with smooth transitions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Hover Effects</h4>
                      <div className="flex flex-wrap gap-4">
                        <Button className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
                          Hover Scale
                        </Button>
                        <Button variant="outline" className="transition-colors duration-200 hover:bg-primary hover:text-primary-foreground">
                          Hover Color
                        </Button>
                        <Button variant="ghost" className="transition-all duration-200 hover:bg-muted hover:shadow-md">
                          Hover Shadow
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Focus States</h4>
                      <div className="flex flex-wrap gap-4">
                        <Input placeholder="Focus me" className="focus:ring-2 focus:ring-primary focus:border-primary" />
                        <Button className="focus:ring-2 focus:ring-primary focus:ring-offset-2">
                          Focus Button
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Project-Specific Components Section */}
            <section id="project-components" className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Project-Specific Components</h2>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Cards & Status</CardTitle>
                    <CardDescription>Components used specifically for project management</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Project Status Cards</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-card border border-border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <BookOpen className="h-6 w-6 text-primary mt-1" />
                            <Badge variant="default">Completed</Badge>
                          </div>
                          <h3 className="font-medium text-foreground mb-2">Tech News Weekly</h3>
                          <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                            <span>Edited: 1/15/2024</span>
                            <span>45,000 words</span>
                            <span>~124 pages</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <BookOpen className="h-6 w-6 text-primary mt-1" />
                            <Badge variant="secondary">Processing</Badge>
                          </div>
                          <h3 className="font-medium text-foreground mb-2">Design Inspiration</h3>
                          <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                            <span>Edited: 1/20/2024</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1" disabled>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <BookOpen className="h-6 w-6 text-primary mt-1" />
                            <Badge variant="destructive">Failed</Badge>
                          </div>
                          <h3 className="font-medium text-foreground mb-2">Industry Updates</h3>
                          <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                            <span>Edited: 1/18/2024</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Clock className="w-4 h-4 mr-2" />
                              Retry
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Status Chips</h4>
                      <div className="flex flex-wrap gap-3">
                        <Badge variant="default">Completed</Badge>
                        <Badge variant="secondary">Processing</Badge>
                        <Badge variant="destructive">Failed</Badge>
                        <Badge variant="outline">Draft</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Progress & Processing</CardTitle>
                    <CardDescription>Components for tracking project progress and status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Progress Bar</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm text-muted-foreground mb-2">
                            <span>Overall Progress</span>
                            <span>65%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Started: 2:30 PM • ETA: ~3 minutes
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Processing Steps</h4>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-foreground">Fetching RSS Feed</h4>
                              <Badge variant="secondary" className="text-xs">Completed</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Downloading and parsing RSS feed content
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-6 h-6 border-2 border-primary rounded-full animate-spin mt-1"></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-foreground">Processing Articles</h4>
                              <Badge variant="secondary" className="text-xs">Processing</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Extracting and cleaning article content
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-6 h-6 border-2 border-muted rounded-full mt-1"></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-foreground">Generating Layout</h4>
                              <Badge variant="outline" className="text-xs">Pending</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Creating book structure and formatting
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Book Landing Pages Section */}
            <section id="book-landing-pages" className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Book Landing Pages</h2>
                  <p className="text-muted-foreground mt-2">
                    Book landing page variations for different project states, designed to feel like professional book pages with consistent layouts and different visual states.
                  </p>
                </div>
                <Button 
                  onClick={() => window.open('/book-landing-variations', '_blank')}
                  className="bg-primary hover:bg-primary/90"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Interactive Demo
                </Button>
              </div>
              
              <div className="space-y-8">
                {/* Order Processing - Book Landing Page */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <CardTitle className="text-xl">Order Processing - Book Landing Page</CardTitle>
                    </div>
                    <CardDescription>Book page during order processing with progress indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Book Cover Section */}
                        <div className="lg:col-span-1">
                          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <div className="w-32 h-40 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                              <BookOpen className="w-16 h-16 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Tech News Weekly Digest</h3>
                            <p className="text-sm text-gray-600 mb-3">by John Doe</p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                            </div>
                            <p className="text-xs text-blue-600 mt-2">Processing...</p>
                          </div>
                        </div>

                        {/* Book Info Section */}
                        <div className="lg:col-span-2 space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Tech News Weekly Digest</h2>
                            <p className="text-gray-600 mb-4">A comprehensive compilation of the latest technology news and insights from leading industry sources, curated and organized into a structured book format.</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">150</div>
                                <div className="text-sm text-gray-500">Target Pages</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">8</div>
                                <div className="text-sm text-gray-500">Chapters</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">$25</div>
                                <div className="text-sm text-gray-500">Total Cost</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">4</div>
                                <div className="text-sm text-gray-500">Days Left</div>
                              </div>
                            </div>
                          </div>

                          {/* Processing Steps */}
                          <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Processing Progress</h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="text-sm text-gray-600">Content Analysis Complete</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-sm text-gray-600">AI Generation in Progress</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                                <span className="text-sm text-gray-400">Human Review</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                                <span className="text-sm text-gray-400">Final Formatting</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Book Under Review - Book Landing Page */}
                <Card className="border-2 border-amber-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <CardTitle className="text-xl">Book Under Review - Book Landing Page</CardTitle>
                    </div>
                    <CardDescription>Book page when under team review with status indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Book Cover Section */}
                        <div className="lg:col-span-1">
                          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <div className="w-32 h-40 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                              <BookOpen className="w-16 h-16 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Tech News Weekly Digest</h3>
                            <p className="text-sm text-gray-600 mb-3">by John Doe</p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-amber-500 h-2 rounded-full w-2/3"></div>
                            </div>
                            <p className="text-xs text-amber-600 mt-2">Under Review</p>
                          </div>
                        </div>

                        {/* Book Info Section */}
                        <div className="lg:col-span-2 space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Tech News Weekly Digest</h2>
                            <p className="text-gray-600 mb-4">A comprehensive compilation of the latest technology news and insights from leading industry sources, curated and organized into a structured book format.</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-amber-600">124</div>
                                <div className="text-sm text-gray-500">Pages</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-amber-600">45.6K</div>
                                <div className="text-sm text-gray-500">Words</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-amber-600">8</div>
                                <div className="text-sm text-gray-500">Chapters</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-amber-600">2-3</div>
                                <div className="text-sm text-gray-500">Days Left</div>
                              </div>
                            </div>
                          </div>

                          {/* Review Status */}
                          <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Review Status</h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Review Request Type</span>
                                <Badge variant="outline" className="text-amber-600 border-amber-300">Refund Request</Badge>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">Request Date</span>
                                <span className="text-sm text-gray-800">2 days ago</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">Estimated Review Time</span>
                                <span className="text-sm text-gray-800">3-5 business days</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">Current Status</span>
                                <Badge className="bg-amber-100 text-amber-800 border-amber-200">Under Team Review</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Book Post Approval - Book Landing Page */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <CardTitle className="text-xl">Book Post Approval - Book Landing Page</CardTitle>
                    </div>
                    <CardDescription>Book page after approval with download and review options</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Book Cover Section */}
                        <div className="lg:col-span-1">
                          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <div className="w-32 h-40 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                              <BookOpen className="w-16 h-16 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Tech News Weekly Digest</h3>
                            <p className="text-sm text-gray-600 mb-3">by John Doe</p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full w-full"></div>
                            </div>
                            <p className="text-xs text-green-600 mt-2">Approved & Ready</p>
                          </div>
                        </div>

                        {/* Book Info Section */}
                        <div className="lg:col-span-2 space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Tech News Weekly Digest</h2>
                            <p className="text-gray-600 mb-4">A comprehensive compilation of the latest technology news and insights from leading industry sources, curated and organized into a structured book format.</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">124</div>
                                <div className="text-sm text-gray-500">Pages</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">45.6K</div>
                                <div className="text-sm text-gray-500">Words</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">8</div>
                                <div className="text-sm text-gray-500">Chapters</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">PDF</div>
                                <div className="text-sm text-gray-500">Format</div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Available Actions</h4>
                            <div className="flex flex-wrap gap-3">
                              <Button className="bg-green-600 hover:bg-green-700">
                                <Download className="w-4 h-4 mr-2" />
                                Download Book
                              </Button>
                              <Button variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview Content
                              </Button>
                              <Button variant="outline">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Request Changes
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-3">Your book has been approved and is ready for download. You have 7 days to review before the refund period expires.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Book Completed - Book Landing Page */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <CardTitle className="text-xl">Book Completed - Book Landing Page</CardTitle>
                    </div>
                    <CardDescription>Final book page with chapters overview and download options</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Book Cover Section */}
                        <div className="lg:col-span-1">
                          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <div className="w-32 h-40 bg-gradient-to-br from-purple-400 to-violet-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                              <BookOpen className="w-16 h-16 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Tech News Weekly Digest</h3>
                            <p className="text-sm text-gray-600 mb-3">by John Doe</p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full w-full"></div>
                            </div>
                            <p className="text-xs text-purple-600 mt-2">Completed</p>
                          </div>
                        </div>

                        {/* Book Info Section */}
                        <div className="lg:col-span-2 space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Tech News Weekly Digest</h2>
                            <p className="text-gray-600 mb-4">A comprehensive compilation of the latest technology news and insights from leading industry sources, curated and organized into a structured book format.</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">124</div>
                                <div className="text-sm text-gray-500">Pages</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">45.6K</div>
                                <div className="text-sm text-gray-500">Words</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">8</div>
                                <div className="text-sm text-gray-500">Chapters</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">2.3MB</div>
                                <div className="text-sm text-gray-500">File Size</div>
                              </div>
                            </div>
                          </div>

                          {/* Chapters Overview */}
                          <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Chapters Overview</h4>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                              {[
                                { title: "Introduction to Tech Trends", pages: 4, words: "1.2K" },
                                { title: "AI Breakthroughs", pages: 6, words: "1.8K" },
                                { title: "Cloud Computing Evolution", pages: 8, words: "2.4K" },
                                { title: "Cybersecurity Updates", pages: 7, words: "2.0K" },
                                { title: "Mobile Technology Trends", pages: 6, words: "1.6K" },
                                { title: "Blockchain Developments", pages: 5, words: "1.4K" },
                                { title: "Internet of Things", pages: 4, words: "1.2K" },
                                { title: "Future Outlook", pages: 3, words: "800" }
                              ].map((chapter, index) => (
                                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-semibold">
                                      {index + 1}
                                    </div>
                                    <span className="text-sm text-gray-700">{chapter.title}</span>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {chapter.pages} pages • {chapter.words} words
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Final Actions */}
                          <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Ready to Download</h4>
                            <div className="flex flex-wrap gap-3">
                              <Button className="bg-purple-600 hover:bg-purple-700">
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                              </Button>
                              <Button variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview Book
                              </Button>
                              <Button variant="outline">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Get Support
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-3">Your book is complete and ready for download. All chapters have been generated and reviewed.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Book Review & Refund Components Section */}
              <section id="book-review-refund" className="mb-16">
                <h2 className="text-3xl font-bold text-foreground mb-8">Book Review & Refund Components</h2>
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Book Review Reminder</CardTitle>
                      <CardDescription>Countdown timer and refund eligibility reminder for book reviews</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Component Overview</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          The BookReviewReminder component displays a countdown timer showing how many days remain for the user to review their book before it's automatically accepted. 
                          It includes progress tracking, status indicators, and action buttons for accepting the book or requesting a refund.
                        </p>
                        
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h5 className="font-medium mb-3">Key Features:</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Real-time countdown timer (days, hours, minutes, seconds)</li>
                            <li>• Visual progress bar showing review period completion</li>
                            <li>• Dynamic status indicators and urgency messages</li>
                            <li>• Action buttons for refund requests and book acceptance</li>
                            <li>• Important reminders about refund eligibility</li>
                            <li>• Responsive design with theme-aware styling</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-4">Usage Example</h4>
                        <div className="bg-card border rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-2">Basic Implementation:</div>
                                                     <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`<BookReviewReminder
  generatedDate={new Date('2024-01-15')}
  reviewPeriodDays={7}
  bookTitle="Tech News Weekly"
  orderId="ORD-12345"
  onRequestRefund={() => setShowRefundModal(true)}
  onAcceptBook={() => handleAcceptBook()}
/>`}
                           </pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-4">Props Interface</h4>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="space-y-2 text-sm">
                            <div><strong>generatedDate:</strong> Date - When the book was generated</div>
                            <div><strong>reviewPeriodDays:</strong> number (optional) - Days allowed for review (default: 7)</div>
                            <div><strong>onRequestRefund:</strong> () =&gt; void - Callback for refund requests</div>
                            <div><strong>onAcceptBook:</strong> () =&gt; void - Callback for book acceptance</div>
                            <div><strong>onReviewBook:</strong> () =&gt; void (optional) - Callback for book review</div>
                            <div><strong>onDownloadBook:</strong> () =&gt; void (optional) - Callback for book download</div>
                            <div><strong>bookTitle:</strong> string (optional) - Book title for display</div>
                            <div><strong>orderId:</strong> string (optional) - Order ID for reference</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Refund Request Modal</CardTitle>
                      <CardDescription>Multi-step survey modal for collecting refund request information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Component Overview</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          The RefundRequestModal provides a comprehensive, step-by-step form for users to request refunds. 
                          It follows the same design patterns as the onboarding flow with progress indicators, validation, and a clean user experience.
                        </p>
                        
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h5 className="font-medium mb-3">Form Steps:</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• <strong>Step 1:</strong> Reason for refund and specific issues</li>
                            <li>• <strong>Step 2:</strong> Contact information and preferences</li>
                            <li>• <strong>Step 3:</strong> Refund amount and urgency level</li>
                            <li>• <strong>Step 4:</strong> Review and submit request</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-4">Usage Example</h4>
                        <div className="bg-card border rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-2">Basic Implementation:</div>
                          <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`&lt;RefundRequestModal
  isOpen={showRefundModal}
  onClose={() => setShowRefundModal(false)}
  bookTitle="Tech News Weekly"
  orderId="ORD-12345"
  onSubmit={(data) => handleRefundRequest(data)}
/&gt;`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-4">Props Interface</h4>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="space-y-2 text-sm">
                            <div><strong>isOpen:</strong> boolean - Whether the modal is open</div>
                            <div><strong>onClose:</strong> () =&gt; void - Callback to close the modal</div>
                            <div><strong>bookTitle:</strong> string (optional) - Book title for reference</div>
                            <div><strong>orderId:</strong> string (optional) - Order ID for reference</div>
                            <div><strong>onSubmit:</strong> (data: RefundRequestData) =&gt; void - Callback when form is submitted</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-4">Data Structure</h4>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground">
                            <div><strong>RefundRequestData:</strong></div>
                            <div className="ml-4 space-y-1 mt-2">
                              <div>• reason: string - Primary reason for refund</div>
                              <div>• specificIssues: string[] - Array of specific problems</div>
                              <div>• description: string - Detailed explanation</div>
                              <div>• contactEmail: string - User's email address</div>
                              <div>• phoneNumber?: string - Optional phone number</div>
                              <div>• preferredContact: 'email' | 'phone' | 'both' - Contact preference</div>
                              <div>• urgency: 'low' | 'medium' | 'high' - Urgency level</div>
                              <div>• refundAmount: number - Amount requested</div>
                              <div>• additionalNotes?: string - Optional additional information</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-4">Key Features</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm">Progress tracking with step indicators</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm">Form validation at each step</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm">Responsive design for all devices</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm">Theme-aware styling</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm">Accessibility features</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm">Comprehensive data collection</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Page Examples Section */}
              <section id="pages" className="mb-16">
                <h2 className="text-3xl font-bold text-foreground mb-8">Page Examples</h2>
                <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
                  See how these components come together in real pages throughout the Podbook application. 
                  Each page demonstrates different component combinations and design patterns.
                </p>
                
                <div className="grid gap-6">
                {/* Page Navigation Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Navigation to All Pages</CardTitle>
                    <CardDescription>Direct links to explore all designed pages in the application</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">Public Pages</h4>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/" target="_blank" rel="noopener noreferrer">
                              <Home className="w-4 h-4 mr-2" />
                              Homepage
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/start" target="_blank" rel="noopener noreferrer">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Start Page
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/login" target="_blank" rel="noopener noreferrer">
                              <User className="w-4 h-4 mr-2" />
                              Login
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/signup" target="_blank" rel="noopener noreferrer">
                              <User className="w-4 h-4 mr-2" />
                              Sign Up
                            </a>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">App Pages</h4>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/dashboard" target="_blank" rel="noopener noreferrer">
                              <Home className="w-4 h-4 mr-2" />
                              Dashboard
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/projects" target="_blank" rel="noopener noreferrer">
                              <FileText className="w-4 h-4 mr-2" />
                              Projects
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/new-project" target="_blank" rel="noopener noreferrer">
                              <Plus className="w-4 h-4 mr-2" />
                              New Project
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/settings" target="_blank" rel="noopener noreferrer">
                              <Settings className="w-4 h-4 mr-2" />
                              Settings
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/processing/:id" target="_blank" rel="noopener noreferrer">
                              <Clock className="w-4 h-4 mr-2" />
                              Processing State
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/book-completed/:id" target="_blank" rel="noopener noreferrer">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Book Completed
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/book-review/:id" target="_blank" rel="noopener noreferrer">
                              <Eye className="w-4 h-4 mr-2" />
                              Book Review (Read-Only)
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/book-post-approval/:id" target="_blank" rel="noopener noreferrer">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Post Approval (No Timer/Refund)
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/book-under-review/:id" target="_blank" rel="noopener noreferrer">
                              <Clock className="w-4 h-4 mr-2" />
                              Under Review by Team
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/order-processing/:orderId" target="_blank" rel="noopener noreferrer">
                              <CreditCard className="w-4 h-4 mr-2" />
                              Order Processing
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/ai-editor" target="_blank" rel="noopener noreferrer">
                              <Edit className="w-4 h-4 mr-2" />
                              AI Text Editor (Edit Mode)
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/projects/demo-project" target="_blank" rel="noopener noreferrer">
                              <FileText className="w-4 h-4 mr-2" />
                              Project Detail
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/api-test" target="_blank" rel="noopener noreferrer">
                              <Settings className="w-4 h-4 mr-2" />
                              API Test
                            </a>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">Special Pages</h4>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/onboarding" target="_blank" rel="noopener noreferrer">
                              <Settings className="w-4 h-4 mr-2" />
                              Onboarding
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/money-back-guarantee" target="_blank" rel="noopener noreferrer">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Guarantee
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <a href="/component-library" target="_blank" rel="noopener noreferrer">
                              <Settings className="w-4 h-4 mr-2" />
                              This Library
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t pt-8 mt-16">
              <div className="text-center">
                <p className="text-muted-foreground">
                  Component Library v1.0 • Last updated: {new Date().toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Use this library to maintain design consistency across all Podbook pages and components.
                </p>
              </div>
            </footer>
          </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrary;
