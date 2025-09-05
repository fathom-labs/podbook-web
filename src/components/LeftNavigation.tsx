import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import {
  BookOpen,
  Home,
  FileText,
  User,
  ChevronDown,
  Settings,
  CreditCard,
  Sun,
  Moon,
  Plus,
  Download,
  LogOut
} from "lucide-react";

interface LeftNavigationProps {
  activePage?: 'dashboard' | 'projects' | 'processing' | 'project-detail';
}

const LeftNavigation = ({ activePage = 'dashboard' }: LeftNavigationProps) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col sticky top-0">
      {/* Logo Section */}
      <div className="p-6">
        <Logo size="md" showText={true} textSize="2xl" />
      </div>
      
      {/* Navigation Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <nav className="space-y-6">
          {/* Create Book Button */}
          <div>
            <Button className="w-full justify-start left-nav-create-book" asChild>
              <Link to="/new-project">
                <Plus className="w-4 h-4 mr-3" />
                Create Book
              </Link>
            </Button>
          </div>
          
          {/* Navigation */}
          <div>
            <div className="space-y-2">
              <Button 
                variant="ghost"
                className={`w-full justify-start ${activePage === 'dashboard' ? 'left-nav-active' : 'left-nav-hover'}`} 
                asChild
              >
                <Link to="/dashboard">
                  <Home className="w-4 h-4 mr-3" />
                  Dashboard
                </Link>
              </Button>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${activePage === 'projects' ? 'left-nav-active' : 'left-nav-hover'}`} 
                asChild
              >
                <Link to="/projects">
                  <FileText className="w-4 h-4 mr-3" />
                  My Projects
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Actions
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start left-nav-hover" asChild>
                <Link to="/new-project">
                  <BookOpen className="w-4 h-4 mr-3" />
                  New Book
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start left-nav-hover">
                <Download className="w-4 h-4 mr-3" />
                Import RSS
              </Button>
              <Button variant="ghost" className="w-full justify-start left-nav-hover" asChild>
                <Link to="/component-library">
                  <Settings className="w-4 h-4 mr-3" />
                  Component Library
                </Link>
              </Button>
            </div>
          </div>*/}
        </nav>
      </div>

      {/* User Section - Sticky Bottom */}
      {isAuthenticated && user ? (
        <div className="p-6 border-t border-border mt-auto">
          <div className="group relative">
            <div className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors">
              <div 
                className="flex items-center justify-center"
                style={{ 
                  width: '40px', 
                  height: '40px'
                }}
              >
                <User className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>

            {/* Settings Dropdown - appears on hover and stays open */}
            <div className="absolute bottom-full left-0 right-0 mb-0 bg-background border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto hover:opacity-100">
              <div className="p-2">
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground border-b border-border mb-2 settings-dropdown">
                  Credits 2392
                </div>
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate('/settings')}>
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate('/settings')}>
                  <CreditCard className="w-4 h-4 mr-3" />
                  Billing and Plan
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun className="w-4 h-4 mr-3" /> : <Moon className="w-4 h-4 mr-3" />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={async () => {
                    await logout();
                    navigate('/login');
                  }}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 border-t border-border mt-auto">
          <div className="text-center">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/login">
                <User className="w-4 h-4 mr-3" />
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default LeftNavigation;
