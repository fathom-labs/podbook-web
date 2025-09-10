import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import { 
  User, 
  CreditCard, 
  Home,
  ChevronLeft,
  Save,
  Loader2
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  website?: string;
  avatar?: string;
  role: string;
  subscriptionTier: string;
  credits: number;
  createdAt: string;
  updatedAt: string;
}

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { user: authUser, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('account');
  
  // User profile state
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    website: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // API functions
  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      setUserProfile(data.user);
      setFormData({
        name: data.user.name || '',
        bio: data.user.bio || '',
        website: data.user.website || ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserProfile = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);

      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const data = await response.json();
      setUserProfile(data.user);
      setHasChanges(false);
      setSuccessMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle URL parameters for section navigation
  useEffect(() => {
    const section = searchParams.get('section');
    if (section && (section === 'account' || section === 'billing')) {
      setActiveSection(section);
    }
  }, [searchParams]);

  // Load user profile on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen bg-background items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Authentication Required</h1>
          <p className="text-muted-foreground mb-6">Please log in to access your settings.</p>
          <Button asChild>
            <Link to="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Check for changes
  useEffect(() => {
    if (userProfile) {
      const hasFormChanges = 
        formData.name !== (userProfile.name || '') ||
        formData.bio !== (userProfile.bio || '') ||
        formData.website !== (userProfile.website || '');
      setHasChanges(hasFormChanges);
    }
  }, [formData, userProfile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    navigate(`/settings?section=${section}`, { replace: true });
  };

  const renderAccountSettings = () => (
    <div className="space-y-6">
      {/* Error and Success Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          {successMessage}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your account information and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="ml-2">Loading profile...</span>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={userProfile?.email || ''} 
                  disabled
                  className="bg-muted"
                />
                <p className="text-sm text-muted-foreground">
                  Email cannot be changed. Contact support if you need to update your email.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input 
                  id="bio" 
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website" 
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
              
              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <Button 
                  onClick={saveUserProfile}
                  disabled={!hasChanges || isSaving}
                  className="min-w-[120px]"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your Podbook experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive updates about your projects</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
            </div>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBillingAndPlan = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You're currently on the Pro plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h3 className="font-semibold">Pro Plan</h3>
              <p className="text-sm text-muted-foreground">$19/month</p>
            </div>
            <Button variant="outline">Change Plan</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Manage your payment methods and billing details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5" />
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Edit</Button>
          </div>
          <Button variant="outline" className="w-full">
            <CreditCard className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Pro Plan - December 2024</p>
                <p className="text-sm text-muted-foreground">Dec 1, 2024</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$19.00</p>
                <p className="text-sm text-muted-foreground">Paid</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Pro Plan - November 2024</p>
                <p className="text-sm text-muted-foreground">Nov 1, 2024</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$19.00</p>
                <p className="text-sm text-muted-foreground">Paid</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Custom Left Navigation */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <Logo size="md" showText={true} textSize="2xl" />
        </div>

        {/* Back to Dashboard Button */}
        <div className="px-6 mb-6">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/dashboard">
              <ChevronLeft className="w-4 h-4 mr-3" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <div className="px-6 mb-6">
          <Separator />
        </div>

        {/* Settings Navigation */}
        <div className="px-6">
          <div className="space-y-2">
            <Button 
              variant={activeSection === 'account' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => handleSectionChange('account')}
            >
              <User className="w-4 h-4 mr-3" />
              Account Settings
            </Button>
            <Button 
              variant={activeSection === 'billing' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => handleSectionChange('billing')}
            >
              <CreditCard className="w-4 h-4 mr-3" />
              Billing
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-medium text-foreground mb-2">
                {activeSection === 'account' ? 'Account Settings' : 'Billing and Plan'}
              </h1>
              <p className="text-muted-foreground">
                {activeSection === 'account' 
                  ? 'Manage your account settings and preferences' 
                  : 'View and manage your subscription and billing information'
                }
              </p>
            </div>

            {activeSection === 'account' ? renderAccountSettings() : renderBillingAndPlan()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
