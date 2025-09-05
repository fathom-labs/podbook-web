import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingFlow from '@/components/OnboardingFlow';
import { useOnboarding, OnboardingData } from '@/hooks/useOnboarding';
import { useAuth } from '@/contexts/AuthContext';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { onboardingData, completeOnboarding, skipOnboarding, saveOnboardingProgress } = useOnboarding();
  const { user } = useAuth();

  const handleComplete = async (data: OnboardingData) => {
    try {
      // Complete onboarding
      await completeOnboarding(data);
      console.log('Onboarding completed:', data);
      // Navigate after completion
      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const handleStartBook = async () => {
    try {
      await completeOnboarding(onboardingData || {} as OnboardingData);
      navigate('/new-project');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const handleGoToDashboard = async () => {
    try {
      await completeOnboarding(onboardingData || {} as OnboardingData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const handleScheduleCall = () => {
    // Open Calendly link in new tab
    window.open('https://calendly.com/podbook', '_blank');
  };

  const handleScheduleCallAndNavigate = async () => {
    try {
      // Complete onboarding first, then open Calendly link in new tab AND navigate to dashboard
      await completeOnboarding(onboardingData || {} as OnboardingData);
      window.open('https://calendly.com/podbook', '_blank');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const handleSkip = async () => {
    try {
      await skipOnboarding();
      navigate('/dashboard');
    } catch (error) {
      console.error('Error skipping onboarding:', error);
    }
  };

  // If user is not authenticated, redirect to login
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen">
      <OnboardingFlow 
        onComplete={handleComplete}
        onSkip={handleSkip}
        onStartBook={handleStartBook}
        onGoToDashboard={handleGoToDashboard}
        onScheduleCall={handleScheduleCall}
        onScheduleCallAndNavigate={handleScheduleCallAndNavigate}
        saveOnboardingProgress={saveOnboardingProgress}
      />
    </div>
  );
};

export default Onboarding;
