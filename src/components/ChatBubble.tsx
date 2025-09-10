import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SupportModal from './SupportModal';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MessageCircle, 
  X, 
  HelpCircle,
  Mail,
  Phone,
  Clock
} from 'lucide-react';

const ChatBubble = () => {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Show chat bubble after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setShowWelcome(true);
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Hide welcome message after a few seconds
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  // Simulate unread messages (you can replace this with real logic)
  useEffect(() => {
    if (isVisible && !isOpen) {
      const unreadTimer = setTimeout(() => {
        setHasUnread(true);
      }, 10000); // Show unread indicator after 10 seconds

      return () => clearTimeout(unreadTimer);
    }
  }, [isVisible, isOpen]);

  // Hide chat bubble if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setIsVisible(false);
    }
  }, [isAuthenticated]);

  const handleChatClick = () => {
    console.log('Chat button clicked!'); // Debug log
    setIsOpen(!isOpen);
    if (hasUnread) {
      setHasUnread(false);
    }
  };

  const handleSupportClick = () => {
    setIsSupportModalOpen(true);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Don't render if not authenticated or not visible
  if (!isAuthenticated || !isVisible) {
    return null;
  }

  // Debug log to check if component is rendering
  // console.log('ChatBubble rendering:', { isAuthenticated, isVisible, isOpen });

  return (
    <>
      {/* Welcome Notification 
      {showWelcome && (
        <div className="fixed bottom-24 right-6 z-50 bg-black text-white px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom-2 duration-300 max-w-xs">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Need help? We're here!</span>
          </div>
        </div>
      )}*/}

      {/* Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
        {/* Chat Options Panel */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-card border border-border rounded-lg shadow-lg p-4 mb-2 animate-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">How can we help?</h3>
                <p className="text-sm text-muted-foreground">We're here to assist you</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={handleSupportClick}
                className="w-full justify-start h-auto p-4 text-left"
                variant="outline"
              >
                <div className="flex items-start gap-3 w-full overflow-hidden">
                  <Mail className="w-5 h-5 mt-0.5 text-blue-600 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0 overflow-hidden">
                    <div className="font-medium">Send us a message</div>
                    <div className="text-sm text-muted-foreground mt-1 leading-5">
                      Get help with your projects
                    </div>
                  </div>
                </div>
              </Button>

              {/* Quick help button commented out until knowledge base is available */}
              {/* <Button
                onClick={() => window.open('mailto:support@podbook.com?subject=General%20Inquiry', '_blank')}
                className="w-full justify-start h-auto p-4"
                variant="outline"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 mt-0.5 text-green-600" />
                  <div className="text-left">
                    <div className="font-medium">Quick help</div>
                    <div className="text-sm text-muted-foreground">
                      Common questions and answers
                    </div>
                  </div>
                </div>
              </Button> */}

              <div className="pt-2 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>We typically respond within 1 business day</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Chat Button */}
        <div className="relative">
          <button
            onClick={handleChatClick}
            className="w-14 h-14 rounded-full bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center border-0 cursor-pointer"
            type="button"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6" />
            )}
          </button>
          
          {/* Unread indicator 
          {hasUnread && !isOpen && (
            <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white font-bold">
              !
            </div>
          )}*/}

          {/* Pulse animation removed */}
        </div>
      </div>

      {/* Support Modal */}
      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        pageUrl={window.location.href}
        userEmail={user?.email}
      />
    </>
  );
};

export default ChatBubble;
