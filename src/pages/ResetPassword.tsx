import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import LogoMark from "@/components/LogoMark";
import { authAPI } from "@/services/api";

const ResetPassword = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      setError("Invalid or missing reset token. Please request a new password reset.");
      return;
    }
    setToken(tokenParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authAPI.resetPassword(token, password);
      setIsCompleted(true);
    } catch (error: any) {
      setError(error.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mb-4">
              <LogoMark size="xl" className="mx-auto" />
            </div>
            <h1 className="text-3xl font-medium text-foreground mb-2">Password reset successful!</h1>
            <p className="text-muted-foreground">
              Your password has been successfully reset
            </p>
          </div>
          
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="text-green-600 dark:text-green-400">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-muted-foreground">
                  You can now sign in with your new password.
                </p>
                <div className="pt-4">
                  <Link to="/login">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Go to login
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mb-4">
              <LogoMark size="xl" className="mx-auto" />
            </div>
            <h1 className="text-3xl font-medium text-foreground mb-2">Invalid reset link</h1>
            <p className="text-muted-foreground">
              This password reset link is invalid or has expired
            </p>
          </div>
          
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="text-red-600 dark:text-red-400">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-muted-foreground">
                  Please request a new password reset link.
                </p>
                <div className="pt-4">
                  <Link to="/forgot-password">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Request new reset link
                    </Button>
                  </Link>
                </div>
                <div className="pt-2">
                  <Link to="/login">
                    <Button variant="outline" className="w-full">
                      Back to login
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mb-4">
            <LogoMark size="xl" className="mx-auto" />
          </div>
          <h1 className="text-3xl font-medium text-foreground mb-2">Reset your password</h1>
          <p className="text-muted-foreground">
            Enter your new password below
          </p>
        </div>
        
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-medium text-foreground">New Password</CardTitle>
            <CardDescription className="text-muted-foreground">
              Choose a strong password for your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">New password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="border-border bg-background text-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">Confirm new password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="border-border bg-background text-foreground"
                />
              </div>
              
              {error && (
                <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-950/20 p-3 rounded-md">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset password"}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Link to="/login" className="text-muted-foreground hover:text-foreground text-sm">
                ← Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
