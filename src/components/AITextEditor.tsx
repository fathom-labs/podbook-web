import { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import FloatingToolbar from './FloatingToolbar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, Heading3,
  Undo, Redo, Save, Sparkles, Eye, Download, Share2, Settings, Plus, MessageSquare, X, ChevronLeft, Menu, Home
} from 'lucide-react';

interface Chapter {
  id: number;
  title: string;
  wordCount: number;
  estimatedPages: number;
  content: string;
}

interface AITextEditorProps {
  projectId: string;
  projectTitle: string;
}

const AITextEditor = ({ projectId, projectTitle }: AITextEditorProps) => {
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: 1, title: 'Introduction', content: '<h1>Introduction</h1><p>Welcome to your book. Start writing your introduction here...</p>', wordCount: 12, estimatedPages: 1 },
    { id: 2, title: 'Chapter 1', content: '<h1>Chapter 1</h1><p>This is the beginning of your first chapter. Add your content here...</p>', wordCount: 15, estimatedPages: 1 },
    { id: 3, title: 'Chapter 2', content: '<h1>Chapter 2</h1><p>Continue your story in the second chapter...</p>', wordCount: 12, estimatedPages: 1 },
  ]);
  const [currentChapter, setCurrentChapter] = useState<Chapter>(chapters[0]);
  const [isAIAssisting, setIsAIAssisting] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai', content: string, timestamp: Date }>>([
    { role: 'ai', content: 'Hello! I\'m here to help you with your document. What would you like me to help you with?', timestamp: new Date() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isProcessingChat, setIsProcessingChat] = useState(false);
  const [showChapterDrawer, setShowChapterDrawer] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Start writing your chapter content...' }),
      Highlight,
      Typography
    ],
    content: currentChapter.content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setChapters(prev => prev.map(ch =>
        ch.id === currentChapter.id
          ? { ...ch, content: newContent, wordCount: editor.getText().split(/\s+/).length }
          : ch
      ));
    },
  });

  const setActiveChapter = useCallback((chapter: Chapter) => {
    setCurrentChapter(chapter);
    if (editor) {
      editor.commands.setContent(chapter.content);
    }
  }, [editor]);

  const saveChapter = useCallback(() => {
    if (editor) {
      const newContent = editor.getHTML();
      setChapters(prev => prev.map(ch =>
        ch.id === currentChapter.id
          ? { ...ch, content: newContent, wordCount: editor.getText().split(/\s+/).length }
          : ch
      ));
    }
  }, [editor, currentChapter.id]);

  const getAIAssistance = useCallback(async () => {
    setIsAIAssisting(true);
    // Simulate AI assistance
    setTimeout(() => {
      if (editor) {
        const currentText = editor.getText();
        const aiSuggestion = `\n\n[AI Suggestion: Consider expanding on this topic with more examples and practical applications. You might want to add a section about common challenges and solutions.]`;
        editor.commands.insertContent(aiSuggestion);
      }
      setIsAIAssisting(false);
    }, 2000);
  }, [editor]);

  const handleChatSubmit = useCallback(async () => {
    if (!chatInput.trim() || !editor) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    
    // Add user message to chat
    const newUserMessage = { role: 'user' as const, content: userMessage, timestamp: new Date() };
    setChatMessages(prev => [...prev, newUserMessage]);
    
    setIsProcessingChat(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let aiResponse = '';
      let documentModification = '';
      
      // Simple AI logic based on user input
      if (userMessage.toLowerCase().includes('expand') || userMessage.toLowerCase().includes('more detail')) {
        aiResponse = 'I\'ll expand this section with more details and examples.';
        documentModification = '\n\n[Expanded Content: This section has been enhanced with additional details, examples, and practical applications to provide a more comprehensive understanding of the topic.]';
      } else if (userMessage.toLowerCase().includes('rewrite') || userMessage.toLowerCase().includes('improve')) {
        aiResponse = 'I\'ll rewrite this section to improve clarity and flow.';
        documentModification = '\n\n[Improved Version: This section has been rewritten for better clarity, improved flow, and enhanced readability while maintaining the original meaning.]';
      } else if (userMessage.toLowerCase().includes('summarize') || userMessage.toLowerCase().includes('condense')) {
        aiResponse = 'I\'ll create a concise summary of this content.';
        documentModification = '\n\n[Summary: Key points and main ideas have been condensed into a clear, focused summary.]';
      } else {
        aiResponse = 'I understand your request. I\'ll apply the appropriate modifications to improve your document.';
        documentModification = '\n\n[AI Enhancement: This section has been improved based on your request to enhance the overall quality and effectiveness of your content.]';
      }
      
      // Add AI response to chat
      const newAIMessage = { role: 'ai' as const, content: aiResponse, timestamp: new Date() };
      setChatMessages(prev => [...prev, newAIMessage]);
      
      // Apply modification to document
      if (documentModification) {
        editor.commands.insertContent(documentModification);
      }
      
      setIsProcessingChat(false);
    }, 1500);
  }, [chatInput, editor]);

  const totalWords = chapters.reduce((sum, ch) => sum + ch.wordCount, 0);
  const totalPages = chapters.reduce((sum, ch) => sum + ch.estimatedPages, 0);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Combined Navigation Bar */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          {/* Left: Home Button & Project Info */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="h-8 w-8 p-0"
            >
              <Home className="w-4 h-4" />
            </Button>
            <div>
              <h2 className="text-base font-medium text-foreground mb-0.5">{projectTitle}</h2>
            </div>
          </div>

          {/* Middle: Formatting Tools */}
          <div className="flex items-center gap-2">
            <Button
              variant={editor.isActive('bold') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('italic') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
              <Heading1 className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
              <Heading2 className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
              <Heading3 className="w-4 h-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <Quote className="w-4 h-4" />
            </Button>
          </div>

          {/* Right: Action Tools */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}> <Undo className="w-4 h-4" /> </Button>
            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}> <Redo className="w-4 h-4" /> </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm" onClick={getAIAssistance} disabled={isAIAssisting}> <Sparkles className="w-4 h-4 mr-2" /> AI Assist </Button>
            <Button variant="outline" size="sm" onClick={saveChapter}> <Save className="w-4 h-4 mr-2" /> Save </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
                           {/* Left Chapter Navigation */}
                   <aside className={`bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${showChapterDrawer ? 'w-80' : 'w-12'}`}>
                     {/* Chapter Header with Toggle */}
                     <div className="flex items-center gap-2 p-3 min-w-fit">
                       <Button
                         variant="ghost"
                         size="sm"
                         onClick={() => setShowChapterDrawer(!showChapterDrawer)}
                         className="h-6 w-6 p-0 hover:bg-muted"
                       >
                         {showChapterDrawer ? (
                           <ChevronLeft className="w-4 h-4" />
                         ) : (
                           <Menu className="w-4 h-4" />
                         )}
                       </Button>
                       {showChapterDrawer && (
                         <h3 className="font-medium text-foreground text-sm">Chapters</h3>
                       )}
                     </div>
                     
                     {/* Chapter List - only show when drawer is open */}
                     {showChapterDrawer && (
                       <div className="px-3 pb-3 min-w-fit">
                         <div className="space-y-1">
                           {chapters.map((chapter) => (
                             <button key={chapter.id} onClick={() => setActiveChapter(chapter)} className={`w-full text-left p-2 rounded-md transition-colors text-sm ${currentChapter.id === chapter.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
                               <div className="font-medium">{chapter.title}</div>
                               <div className="text-xs text-muted-foreground mt-0.5"> {chapter.wordCount} words • ~{chapter.estimatedPages} pages </div>
                             </button>
                           ))}
                         </div>
                       </div>
                     )}
                   </aside>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto relative">
          {/* Floating AI Chat Button - only show when drawer is closed */}
          {!showAIChat && (
            <div className="absolute top-4 right-4 z-40">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAIChat(true)}
                className="h-10 w-10 rounded-full p-0 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Sparkles className="w-5 h-5" />
              </Button>
            </div>
          )}

          <div className="max-w-4xl mx-auto p-8">
            <EditorContent editor={editor} className="prose prose-lg max-w-none focus:outline-none" />
          </div>
          {editor && (
            <FloatingToolbar
              editor={editor}
              onAIAssist={getAIAssistance}
            />
          )}
        </div>

        {/* Right AI Chat Panel */}
        {showAIChat && (
          <aside className="w-96 bg-card border-l border-border flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
                              <h3 className="font-medium text-foreground">AI Assistant</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAIChat(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isProcessingChat && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask AI to help with your document..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleChatSubmit();
                    }
                  }}
                  disabled={isProcessingChat}
                />
                <Button
                  onClick={handleChatSubmit}
                  disabled={!chatInput.trim() || isProcessingChat}
                  size="sm"
                >
                  <Sparkles className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Try: "expand this section", "rewrite for clarity", "summarize this content"
              </p>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default AITextEditor;
