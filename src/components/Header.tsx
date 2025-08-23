import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

// Header component for Podbook application

const Header = () => {
  const { theme } = useTheme();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={theme === 'dark' ? '/logo-white.svg' : '/logo.svg'} 
              alt="Podbook Logo" 
              className="w-6 h-6" 
            />
            <h1 className="text-2xl font-medium text-foreground" style={{ letterSpacing: '-1px' }}>Podbook</h1>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/component-library" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Component Library
            </Link>
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link to="/start">Start Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;