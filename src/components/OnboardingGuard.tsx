import React from 'react';
import { Navigate } from 'react-router-dom';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useAuth } from '@/contexts/AuthContext';

interface OnboardingGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const OnboardingGuard: React.FC<OnboardingGuardProps> = ({ 
  children, 
  redirectTo = '/onboarding' 
}) => {
  const { isOnboardingComplete, isLoading } = useOnboarding();
  const { user } = useAuth();

  // Show loading state while checking auth and onboarding status
  if (isLoading || (user && isOnboardingComplete === null)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <div className="relative">
          {/* Podbook Logo */}
          <img 
            src="/logo-white.svg" 
            alt="Podbook" 
            className="w-24 h-24 mb-8"
          />
          {/* White Spinner */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-white border-t-transparent"></div>
          </div>
        </div>
        <p className="text-white text-lg mt-4 font-medium">Loading...</p>
      </div>
    );
  }

  // If user is not authenticated, don't redirect to onboarding
  if (!user) {
    return <>{children}</>;
  }

  // Only redirect to onboarding if we're certain onboarding is not complete
  if (isOnboardingComplete === false) {
    console.log('redirecting to onboarding - onboarding not complete');
    return <Navigate to={redirectTo} replace />;
  }

  // If onboarding is complete (true) or status is unknown (null), render the protected content
  // This allows navigation to proceed when onboarding is marked as complete
  console.log('onboarding status:', isOnboardingComplete, 'rendering protected content');
  return <>{children}</>;
};

export default OnboardingGuard;