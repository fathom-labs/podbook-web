import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  Eye, 
  ArrowLeft,
  MessageCircle,
  CheckCircle,
  X
} from 'lucide-react';
import LeftNavigation from "@/components/LeftNavigation";

interface Chapter {
  id: number;
  title: string;
  wordCount: number;
  estimatedPages: number;
  content: string;
}

interface BookReviewProps {
  projectId: string;
  projectTitle: string;
}

const BookReview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<Chapter[]>([
    { 
      id: 1, 
      title: 'Introduction', 
      content: `
        <h1>Introduction: The Future of Technology</h1>
        <p>Welcome to <strong>Tech News Weekly Digest</strong>, your comprehensive guide to the latest developments in the world of technology. This book represents the culmination of weeks of research, analysis, and expert insights into the most significant trends shaping our digital future.</p>
        
        <h2>What You'll Discover</h2>
        <p>In the following chapters, we'll explore:</p>
        <ul>
          <li><strong>Artificial Intelligence Breakthroughs</strong> - From GPT-4 to autonomous systems</li>
          <li><strong>Cloud Computing Evolution</strong> - The rise of edge computing and hybrid solutions</li>
          <li><strong>Cybersecurity Challenges</strong> - Emerging threats and innovative defenses</li>
          <li><strong>Mobile Technology Trends</strong> - 5G, foldables, and the future of smartphones</li>
          <li><strong>Blockchain and Web3</strong> - Decentralized finance and digital ownership</li>
          <li><strong>Quantum Computing</strong> - The next frontier of computational power</li>
          <li><strong>Sustainable Technology</strong> - Green computing and environmental impact</li>
          <li><strong>Future Outlook</strong> - Predictions and emerging trends</li>
        </ul>
        
        <p>Each chapter is designed to provide you with actionable insights and a deeper understanding of how these technologies will impact your business and daily life. We've compiled the most relevant information from industry experts, research papers, and real-world implementations to give you a comprehensive view of the technological landscape.</p>
        
        <h2>How to Use This Book</h2>
        <p>This book is structured to be both a reference guide and a strategic planning tool. You can:</p>
        <ul>
          <li>Read sequentially for a complete understanding of the technology ecosystem</li>
          <li>Jump to specific chapters based on your immediate interests or needs</li>
          <li>Use the insights to inform business strategy and technology investments</li>
          <li>Share key findings with your team to drive innovation discussions</li>
        </ul>
        
        <p>Whether you're a technology leader, business executive, or simply someone passionate about understanding the future, this book will provide you with the knowledge and insights needed to navigate the rapidly evolving digital landscape.</p>
        
        <blockquote>
          <p>"The best way to predict the future is to invent it." - Alan Kay</p>
        </blockquote>
        
        <p>As we embark on this journey through the technological landscape, remember that the pace of change is accelerating. What seems cutting-edge today may become standard practice tomorrow. The key is not just to understand current technologies, but to develop the mindset and strategies needed to adapt and thrive in an ever-changing digital world.</p>
      `, 
      wordCount: 850, 
      estimatedPages: 4 
    },
    { 
      id: 2, 
      title: 'AI Revolution', 
      content: `
        <h1>Chapter 1: The AI Revolution</h1>
        <p>The artificial intelligence landscape has undergone a <em>dramatic transformation</em> in recent years, with breakthroughs that seemed impossible just a decade ago now becoming reality. From simple rule-based systems to sophisticated neural networks, AI has evolved into a transformative force that's reshaping every aspect of our digital lives.</p>
        
        <h2>Large Language Models</h2>
        <p>Large Language Models (LLMs) have revolutionized how we interact with technology. These sophisticated AI systems can:</p>
        <ul>
          <li>Generate human-like text across multiple languages</li>
          <li>Understand context and maintain conversation flow</li>
          <li>Assist with complex problem-solving tasks</li>
          <li>Create content in various formats and styles</li>
          <li>Translate between languages with remarkable accuracy</li>
          <li>Generate code and assist with programming tasks</li>
        </ul>
        
        <h3>Key Developments</h3>
        <p>Recent advancements include:</p>
        <ul>
          <li><strong>GPT-4</strong> - Enhanced reasoning and multimodal capabilities</li>
          <li><strong>Claude</strong> - Improved safety and ethical considerations</li>
          <li><strong>Open Source Models</strong> - Democratizing AI access</li>
          <li><strong>Multimodal AI</strong> - Processing text, images, and audio simultaneously</li>
          <li><strong>Specialized Models</strong> - Domain-specific AI for industries like law and medicine</li>
        </ul>
        
        <h2>Machine Learning Evolution</h2>
        <p>The field of machine learning has seen remarkable progress:</p>
        <ul>
          <li><strong>Deep Learning</strong> - Neural networks with multiple layers</li>
          <li><strong>Transfer Learning</strong> - Applying knowledge from one domain to another</li>
          <li><strong>Federated Learning</strong> - Training models across distributed data sources</li>
          <li><strong>AutoML</strong> - Automated machine learning pipeline optimization</li>
        </ul>
        
        <h2>Practical Applications</h2>
        <p>AI is transforming industries across the board:</p>
        <ul>
          <li><strong>Healthcare:</strong> Diagnostic assistance and drug discovery</li>
          <li><strong>Finance:</strong> Fraud detection and algorithmic trading</li>
          <li><strong>Education:</strong> Personalized learning experiences</li>
          <li><strong>Creative Arts:</strong> Music composition and visual design</li>
          <li><strong>Manufacturing:</strong> Predictive maintenance and quality control</li>
          <li><strong>Transportation:</strong> Autonomous vehicles and traffic optimization</li>
          <li><strong>Retail:</strong> Personalized recommendations and inventory management</li>
        </ul>
        
        <h2>Ethical Considerations</h2>
        <p>As AI becomes more powerful, ethical considerations become increasingly important:</p>
        <ul>
          <li><strong>Bias and Fairness</strong> - Ensuring AI systems don't perpetuate discrimination</li>
          <li><strong>Privacy Protection</strong> - Balancing utility with data privacy</li>
          <li><strong>Transparency</strong> - Making AI decision-making processes understandable</li>
          <li><strong>Accountability</strong> - Determining responsibility for AI-driven decisions</li>
        </ul>
        
        <h2>Future Implications</h2>
        <p>Looking ahead, we can expect:</p>
        <ul>
          <li><strong>AGI Development</strong> - Progress toward artificial general intelligence</li>
          <li><strong>Human-AI Collaboration</strong> - New forms of partnership and augmentation</li>
          <li><strong>Economic Transformation</strong> - Job market evolution and new opportunities</li>
          <li><strong>Societal Impact</strong> - Changes in how we work, learn, and interact</li>
        </ul>
        
        <p>As we move forward, the integration of AI into everyday applications will become increasingly seamless, creating new opportunities and challenges for businesses and individuals alike. The key to success will be understanding not just what AI can do, but how to harness its power responsibly and effectively.</p>
      `, 
      wordCount: 1200, 
      estimatedPages: 5 
    },
    { 
      id: 3, 
      title: 'Cloud & Edge Computing', 
      content: `
        <h1>Chapter 2: Cloud and Edge Computing</h1>
        <p>The cloud computing paradigm has evolved far beyond simple data storage, becoming the backbone of modern digital infrastructure. What began as a way to access computing resources remotely has transformed into a sophisticated ecosystem that powers everything from mobile apps to enterprise systems.</p>
        
        <h2>The Rise of Edge Computing</h2>
        <p>Edge computing represents a fundamental shift in how we process and analyze data. By bringing computation closer to data sources, we achieve:</p>
        <ul>
          <li><strong>Reduced Latency</strong> - Faster response times for critical applications</li>
          <li><strong>Bandwidth Optimization</strong> - Less data transmission over networks</li>
          <li><strong>Enhanced Privacy</strong> - Local data processing capabilities</li>
          <li><strong>Improved Reliability</strong> - Reduced dependency on central servers</li>
          <li><strong>Real-time Processing</strong> - Immediate analysis of streaming data</li>
          <li><strong>Cost Efficiency</strong> - Reduced cloud computing costs</li>
        </ul>
        
        <h3>Edge Computing Architectures</h3>
        <p>Modern edge computing systems employ sophisticated architectures:</p>
        <ul>
          <li><strong>Multi-tier Edge</strong> - Distributed processing across multiple edge locations</li>
          <li><strong>Fog Computing</strong> - Intermediate layer between edge and cloud</li>
          <li><strong>Mobile Edge Computing</strong> - Processing at cellular base stations</li>
          <li><strong>Industrial Edge</strong> - Specialized computing for manufacturing environments</li>
        </ul>
        
        <h3>Hybrid Cloud Solutions</h3>
        <p>Modern enterprises are adopting hybrid approaches that combine:</p>
        <ul>
          <li><strong>Public Cloud</strong> - Scalability and cost-effectiveness</li>
          <li><strong>Private Cloud</strong> - Security and control</li>
          <li><strong>Edge Nodes</strong> - Performance and responsiveness</li>
          <li><strong>Multi-cloud Strategies</strong> - Avoiding vendor lock-in</li>
        </ul>
        
        <h2>Cloud Service Models</h2>
        <p>The cloud computing landscape offers various service models:</p>
        <ul>
          <li><strong>Infrastructure as a Service (IaaS)</strong> - Virtual machines and storage</li>
          <li><strong>Platform as a Service (PaaS)</strong> - Development and deployment platforms</li>
          <li><strong>Software as a Service (SaaS)</strong> - Ready-to-use applications</li>
          <li><strong>Function as a Service (FaaS)</strong> - Serverless computing</li>
          <li><strong>Container as a Service (CaaS)</strong> - Containerized applications</li>
        </ul>
        
        <h2>Industry Impact</h2>
        <p>This evolution is driving innovation across sectors:</p>
        <ul>
          <li><strong>Manufacturing:</strong> Real-time quality control and predictive maintenance</li>
          <li><strong>Healthcare:</strong> Remote patient monitoring and telemedicine</li>
          <li><strong>Transportation:</strong> Autonomous vehicles and smart traffic management</li>
          <li><strong>Retail:</strong> Personalized shopping experiences and inventory optimization</li>
          <li><strong>Energy:</strong> Smart grid management and renewable energy optimization</li>
          <li><strong>Agriculture:</strong> Precision farming and crop monitoring</li>
        </ul>
        
        <h2>Security and Compliance</h2>
        <p>As cloud and edge computing expand, security becomes paramount:</p>
        <ul>
          <li><strong>Data Encryption</strong> - Protecting data in transit and at rest</li>
          <li><strong>Identity Management</strong> - Robust authentication and authorization</li>
          <li><strong>Compliance Frameworks</strong> - Meeting regulatory requirements</li>
          <li><strong>Threat Detection</strong> - Advanced security monitoring</li>
        </ul>
        
        <h2>Future Trends</h2>
        <p>Looking ahead, we can expect:</p>
        <ul>
          <li><strong>Quantum Cloud Computing</strong> - Quantum processing in the cloud</li>
          <li><strong>AI-Enhanced Edge</strong> - Intelligent edge computing capabilities</li>
          <li><strong>Green Cloud</strong> - Sustainable computing practices</li>
          <li><strong>Edge AI</strong> - Artificial intelligence at the edge</li>
        </ul>
        
        <p>The future of cloud computing lies in creating intelligent, distributed systems that can adapt to changing demands while maintaining security and performance standards. The key to success will be finding the right balance between centralized cloud resources and distributed edge computing based on specific use cases and requirements.</p>
      `, 
      wordCount: 1100, 
      estimatedPages: 5 
    },
    { 
      id: 4, 
      title: 'Cybersecurity Landscape', 
      content: `
        <h1>Chapter 3: The Cybersecurity Landscape</h1>
        <p>As technology advances, so do the threats that target our digital infrastructure. Understanding the current cybersecurity landscape is crucial for protecting both personal and organizational assets. In today's interconnected world, a single vulnerability can compromise entire networks, making cybersecurity one of the most critical challenges of our time.</p>
        
        <h2>Emerging Threats</h2>
        <p>New attack vectors are constantly emerging, requiring constant vigilance and adaptation:</p>
        <ul>
          <li><strong>AI-Powered Attacks</strong> - Sophisticated phishing and social engineering</li>
          <li><strong>Supply Chain Vulnerabilities</strong> - Attacks on third-party services</li>
          <li><strong>IoT Exploitation</strong> - Weak security in connected devices</li>
          <li><strong>Ransomware Evolution</strong> - Double extortion and targeted attacks</li>
          <li><strong>Deepfake Technology</strong> - AI-generated content for deception</li>
          <li><strong>Quantum Threats</strong> - Future risks from quantum computing</li>
        </ul>
        
        <h3>Attack Sophistication</h3>
        <p>Modern cyberattacks are becoming increasingly sophisticated:</p>
        <ul>
          <li><strong>Advanced Persistent Threats (APTs)</strong> - Long-term, targeted attacks</li>
          <li><strong>Fileless Malware</strong> - Attacks that don't rely on traditional files</li>
          <li><strong>Living-off-the-Land</strong> - Using legitimate system tools for attacks</li>
          <li><strong>Polymorphic Malware</strong> - Constantly changing attack signatures</li>
        </ul>
        
        <h3>Defense Strategies</h3>
        <p>Modern cybersecurity requires a multi-layered approach:</p>
        <ul>
          <li><strong>Zero Trust Architecture</strong> - Verify every access attempt</li>
          <li><strong>Behavioral Analytics</strong> - Detect anomalies in user patterns</li>
          <li><strong>Threat Intelligence</strong> - Stay ahead of emerging risks</li>
          <li><strong>Incident Response Planning</strong> - Prepare for the inevitable</li>
          <li><strong>Penetration Testing</strong> - Regular security assessments</li>
          <li><strong>Security Awareness Training</strong> - Educating users about threats</li>
        </ul>
        
        <h2>Cybersecurity Frameworks</h2>
        <p>Organizations can follow established frameworks to improve security:</p>
        <ul>
          <li><strong>NIST Cybersecurity Framework</strong> - Comprehensive security guidelines</li>
          <li><strong>ISO 27001</strong> - Information security management standards</li>
          <li><strong>COBIT</strong> - IT governance and control framework</li>
          <li><strong>OWASP</strong> - Web application security guidelines</li>
        </ul>
        
        <h2>Industry-Specific Challenges</h2>
        <p>Different sectors face unique cybersecurity challenges:</p>
        <ul>
          <li><strong>Healthcare:</strong> Patient data protection and medical device security</li>
          <li><strong>Financial Services:</strong> Transaction security and regulatory compliance</li>
          <li><strong>Manufacturing:</strong> Industrial control system protection</li>
          <li><strong>Government:</strong> National security and citizen data protection</li>
          <li><strong>Education:</strong> Student privacy and research data security</li>
        </ul>
        
        <h2>Future Trends</h2>
        <p>Looking ahead, we can expect:</p>
        <ul>
          <li><strong>Quantum-Resistant Cryptography</strong> - Preparing for quantum computing threats</li>
          <li><strong>AI-Enhanced Security</strong> - Automated threat detection and response</li>
          <li><strong>Regulatory Evolution</strong> - Stricter compliance requirements</li>
          <li><strong>Security by Design</strong> - Building security into products from the start</li>
          <li><strong>Blockchain Security</strong> - Decentralized security solutions</li>
          <li><strong>Biometric Authentication</strong> - Advanced identity verification</li>
        </ul>
        
        <h2>Building a Security Culture</h2>
        <p>Effective cybersecurity goes beyond technology:</p>
        <ul>
          <li><strong>Leadership Commitment</strong> - Executive support for security initiatives</li>
          <li><strong>Employee Training</strong> - Regular security awareness programs</li>
          <li><strong>Incident Response Teams</strong> - Dedicated security personnel</li>
          <li><strong>Continuous Improvement</strong> - Regular security assessments and updates</li>
        </ul>
        
        <p>Cybersecurity is not just a technical challenge—it's a business imperative that requires ongoing attention and investment. Organizations must adopt a proactive approach, continuously monitoring threats, updating defenses, and educating users to create a robust security posture that can withstand evolving challenges.</p>
      `, 
      wordCount: 1100, 
      estimatedPages: 5 
    },
    { 
      id: 5, 
      title: 'Mobile Innovation', 
      content: `
        <h1>Chapter 4: Mobile Technology Innovation</h1>
        <p>The mobile device landscape continues to evolve at an unprecedented pace, with each generation bringing new capabilities and possibilities. From the first mobile phones to today's sophisticated smartphones, the journey has been nothing short of revolutionary, transforming how we communicate, work, and live.</p>
        
        <h2>5G and Beyond</h2>
        <p>Fifth-generation wireless technology is revolutionizing mobile connectivity:</p>
        <ul>
          <li><strong>Ultra-Fast Speeds</strong> - Up to 100x faster than 4G</li>
          <li><strong>Low Latency</strong> - Near real-time response for critical applications</li>
          <li><strong>Massive Connectivity</strong> - Support for millions of IoT devices</li>
          <li><strong>Network Slicing</strong> - Customized network configurations</li>
          <li><strong>Enhanced Mobile Broadband</strong> - Superior streaming and gaming experiences</li>
          <strong>Ultra-Reliable Low-Latency Communications</strong> - Critical for autonomous vehicles</li>
        </ul>
        
        <h3>6G Development</h3>
        <p>While 5G is still rolling out, research into 6G has already begun:</p>
        <ul>
          <li><strong>Terahertz Frequencies</strong> - Even faster data transmission</li>
          <li><strong>AI-Native Networks</strong> - Intelligent network management</li>
          <li><strong>Holographic Communications</strong> - 3D visual experiences</li>
          <li><strong>Quantum Communications</strong> - Ultra-secure data transmission</li>
        </ul>
        
        <h3>Foldable Technology</h3>
        <p>Foldable smartphones represent a new paradigm in mobile computing:</p>
        <ul>
          <li><strong>Enhanced Productivity</strong> - Larger screens when needed</li>
          <li><strong>Portability</strong> - Compact form factor for storage</li>
          <li><strong>New Use Cases</strong> - Gaming, multitasking, and content creation</li>
          <li><strong>Design Innovation</strong> - Pushing the boundaries of mobile aesthetics</li>
          <li><strong>Durability Improvements</strong> - Advanced materials and hinge mechanisms</li>
          <li><strong>Software Optimization</strong> - Apps designed for flexible displays</li>
        </ul>
        
        <h2>App Ecosystem Evolution</h2>
        <p>Mobile applications are becoming more sophisticated:</p>
        <ul>
          <li><strong>AI Integration</strong> - Personalized experiences and intelligent features</li>
          <li><strong>Augmented Reality</strong> - Enhanced shopping and navigation</li>
          <li><strong>Cross-Platform Development</strong> - Consistent experiences across devices</li>
          <li><strong>Privacy-First Design</strong> - User control over data and permissions</li>
          <li><strong>Progressive Web Apps</strong> - Web-based mobile experiences</li>
          <li><strong>App Clips</strong> - Lightweight app experiences</li>
        </ul>
        
        <h2>Mobile Hardware Innovation</h2>
        <p>Hardware advancements continue to push boundaries:</p>
        <ul>
          <li><strong>Advanced Cameras</strong> - Multiple lenses and computational photography</li>
          <li><strong>Biometric Security</strong> - Face ID, fingerprint, and iris scanning</li>
          <li><strong>Battery Technology</strong> - Longer life and faster charging</li>
          <li><strong>Display Technology</strong> - OLED, Mini-LED, and Micro-LED screens</li>
          <li><strong>Processor Evolution</strong> - Custom silicon and neural engines</li>
        </ul>
        
        <h2>Mobile Gaming Revolution</h2>
        <p>Mobile gaming has become a dominant force in the industry:</p>
        <ul>
          <li><strong>Cloud Gaming</strong> - Streaming games without downloads</li>
          <li><strong>AR Gaming</strong> - Location-based and augmented reality experiences</li>
          <li><strong>Cross-Platform Play</strong> - Gaming across mobile, console, and PC</li>
          <li><strong>Mobile Esports</strong> - Competitive mobile gaming leagues</li>
        </ul>
        
        <h2>Privacy and Security</h2>
        <p>As mobile devices become more central to our lives, privacy becomes crucial:</p>
        <ul>
          <li><strong>App Privacy Labels</strong> - Transparent data collection practices</li>
          <li><strong>Location Services Control</strong> - Granular permission management</li>
          <li><strong>Secure Enclaves</strong> - Hardware-based security features</li>
          <li><strong>Privacy-First Browsing</strong> - Enhanced tracking protection</li>
        </ul>
        
        <h2>Future Mobile Trends</h2>
        <p>Looking ahead, we can expect:</p>
        <ul>
          <li><strong>Brain-Computer Interfaces</strong> - Direct neural control of devices</li>
          <li><strong>Holographic Displays</strong> - 3D visual experiences without glasses</li>
          <li><strong>Ambient Computing</strong> - Invisible, context-aware technology</li>
          <li><strong>Mobile Health Integration</strong> - Advanced health monitoring</li>
        </ul>
        
        <p>The future of mobile technology lies in creating seamless, intelligent experiences that enhance our daily lives while respecting our privacy and security needs. As we move toward more integrated and intuitive mobile experiences, the line between technology and human capability continues to blur, opening up new possibilities for how we interact with the digital world.</p>
      `, 
      wordCount: 1200, 
      estimatedPages: 5 
    }
  ]);
  const [currentChapter, setCurrentChapter] = useState<Chapter>(chapters[0]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Prevent text selection, copying, and screenshots
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent common keyboard shortcuts
      if (
        (e.ctrlKey || e.metaKey) && (
          e.key === 'c' || // Copy
          e.key === 'x' || // Cut
          e.key === 'v' || // Paste
          e.key === 'a' || // Select all
          e.key === 's' || // Save
          e.key === 'p' || // Print
          e.key === 'u'    // View source
        )
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Prevent F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Prevent right-click context menu
      if (e.key === 'ContextMenu') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Prevent text selection with Shift + Arrow keys
      if (e.shiftKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('keyup', handleKeyUp, true);
    
    // Disable text selection globally while on this page
    document.body.style.userSelect = 'none';
    document.body.style.WebkitUserSelect = 'none';
    document.body.style.MozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';
    
    // Add body class for additional CSS protection
    document.body.classList.add('content-protection-active');
    
    // Disable context menu globally
    document.addEventListener('contextmenu', (e) => e.preventDefault(), true);
    
    // Disable drag and drop
    document.addEventListener('dragstart', (e) => e.preventDefault(), true);
    
    // Disable copy events
    document.addEventListener('copy', (e) => e.preventDefault(), true);
    document.addEventListener('cut', (e) => e.preventDefault(), true);
    document.addEventListener('paste', (e) => e.preventDefault(), true);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('keyup', handleKeyUp, true);
      document.removeEventListener('contextmenu', (e) => e.preventDefault(), true);
      document.removeEventListener('dragstart', (e) => e.preventDefault(), true);
      document.removeEventListener('copy', (e) => e.preventDefault(), true);
      document.removeEventListener('cut', (e) => e.preventDefault(), true);
      document.removeEventListener('paste', (e) => e.preventDefault(), true);
      
      // Restore text selection
      document.body.style.userSelect = '';
      document.body.style.WebkitUserSelect = '';
      document.body.style.MozUserSelect = '';
      document.body.style.msUserSelect = '';
      
      // Remove body class
      document.body.classList.remove('content-protection-active');
    };
  }, []);

  // Read-only editor - no editing capabilities
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable all editing commands
        editable: false,
      }),
      Placeholder.configure({ placeholder: 'Content loading...' }),
      Highlight,
      Typography
    ],
    content: currentChapter.content,
    editable: false, // Make editor read-only
  });

  const setActiveChapter = (chapter: Chapter) => {
    setCurrentChapter(chapter);
    if (editor) {
      editor.commands.setContent(chapter.content);
    }
  };

  const handleDownload = () => {
    setShowDownloadModal(true);
  };

  const confirmDownload = () => {
    // TODO: In production, this would:
    // 1. Mark the book as downloaded in the backend
    // 2. Waive refund eligibility
    // 3. Initiate actual file download
    setShowDownloadModal(false);
    
    // Simulate download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Your book content here';
    link.download = `book-${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="h-screen bg-background flex flex-col select-none"
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onSelectStart={(e) => e.preventDefault()}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitUserDrag: 'none',
        KhtmlUserSelect: 'none'
      }}
    >
      {/* Top Navigation Bar - Read Only */}
          <div className="border-b bg-card px-6 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate(`/book-completed/${id}`)}
                className="hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Book
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-lg font-medium text-foreground">
                Review: Tech News Weekly Digest
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Contact Support Button */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('mailto:support@podbook.com?subject=Book%20Review%20Question', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              
              {/* Confirm & Download Button */}
              <Button 
                onClick={handleDownload}
                className="bg-primary hover:bg-primary/90"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm & Download
              </Button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-1 overflow-hidden min-h-0">
            {/* Left Sidebar - Chapter Navigation */}
            <div className="w-64 p-4 overflow-y-auto custom-scrollbar">
              <h3 className="font-medium text-foreground mb-4">Chapters</h3>
              <div className="space-y-2">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => setActiveChapter(chapter)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentChapter.id === chapter.id
                        ? 'bg-muted/30 text-foreground'
                        : 'hover:bg-muted/20'
                    }`}
                  >
                    <div className="font-medium text-sm">{chapter.title}</div>
                    <div className="text-xs opacity-70">
                      {chapter.wordCount} words • ~{chapter.estimatedPages} pages
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Editor Area - Read Only */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Read-Only Content */}
              <div 
                className="flex-1 p-6 overflow-y-auto pb-24 min-h-0 custom-scrollbar"
                onContextMenu={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onSelectStart={(e) => e.preventDefault()}
                style={{
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                  WebkitUserDrag: 'none',
                  KhtmlUserSelect: 'none'
                }}
              >
                <div className="max-w-4xl mx-auto">
                  <div className="prose prose-lg max-w-none select-none content-protected">
                    <EditorContent 
                      editor={editor} 
                      className="min-h-[500px] p-6 rounded-lg bg-background select-none content-protected"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Sticky Footer - Read-Only Notice */}
        <div className="fixed bottom-0 left-0 right-0 bg-blue-50 border-t border-blue-200 p-4 z-40">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-blue-800">
              <Eye className="w-4 h-4" />
              <span className="font-medium">Read-Only Mode</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              This is a preview of your completed book. You cannot edit the content. 
              Review carefully before downloading, as downloading will waive your refund eligibility.
            </p>
          </div>
        </div>

      {/* Download Confirmation Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md mx-4 relative shadow-lg">
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
    </div>
  );
};

export default BookReview;
