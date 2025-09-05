import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';
import Logo from '@/components/Logo';
import { 
  User, 
  CreditCard, 
  Home,
  ChevronLeft
} from 'lucide-react';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('account');

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your account information and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john.doe@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input id="bio" placeholder="Tell us about yourself..." />
          </div>
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
              onClick={() => setActiveSection('account')}
            >
              <User className="w-4 h-4 mr-3" />
              Account Settings
            </Button>
            <Button 
              variant={activeSection === 'billing' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveSection('billing')}
            >
              <CreditCard className="w-4 h-4 mr-3" />
              Billing and Plan
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
