import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export interface OnboardingData {
  writingExperience: string;
  bookPurpose: string;
  targetAudience: string;
  bookLength: string;
  contentSources: string[];
  customContentSource?: string;
  timeline: string;
  successMetrics: string[];
  customSuccessMetric?: string;
}

export const useOnboarding = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Check localStorage first for onboarding completion status
    const storedCompletion = localStorage.getItem('onboardingComplete');
    const storedData = localStorage.getItem('onboardingData');
    
    if (storedCompletion === 'true') {
      setIsOnboardingComplete(true);
      if (storedData) {
        try {
          setOnboardingData(JSON.parse(storedData));
        } catch (error) {
          console.error('Error parsing stored onboarding data:', error);
        }
      }
      setIsLoading(false);
      return;
    }
    
    // If no stored completion status, check if user is authenticated
    if (user) {
      // Temporarily disabled onboarding check while backend connection issues are resolved
      // checkOnboardingStatus();
      
      // For now, assume onboarding is not complete if no localStorage data
      setIsOnboardingComplete(false);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const checkOnboardingStatus = async () => {
    // Temporarily disabled while backend connection issues are resolved
    console.log('Onboarding check disabled - setting default values');
    setIsOnboardingComplete(true);
    setIsLoading(false);
    
    // Original code commented out:
    /*
    try {
      const response = await fetch(`${API_BASE_URL}/onboarding/get`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Onboarding data:', result.data);
        
        if (result.data) {
          const isCompleted = Boolean(result.data.isCompleted);
          console.log('Onboarding complete?', isCompleted);
          setIsOnboardingComplete(isCompleted);
          setOnboardingData(result.data);
        } else {
          // No onboarding data found
          console.log('No onboarding data found');
          setIsOnboardingComplete(false);
          setOnboardingData(null);
        }
      } else if (response.status === 404) {
        // No onboarding record found (404)
        console.log('No onboarding record found (404)');
        setIsOnboardingComplete(false);
        setOnboardingData(null);
      } else {
        console.error('Failed to fetch onboarding status:', response.status);
        setIsOnboardingComplete(false);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsOnboardingComplete(false);
    } finally {
      setIsLoading(false);
    }
    */
  };

  const completeOnboarding = async (data: OnboardingData) => {
    // Temporarily disabled while backend connection issues are resolved
    console.log('Onboarding completion disabled - setting local state only');
    setOnboardingData(data);
    setIsOnboardingComplete(true);
    
    // Store in localStorage to persist across page refreshes
    localStorage.setItem('onboardingComplete', 'true');
    localStorage.setItem('onboardingData', JSON.stringify(data));
    
    return { data, success: true };
    
    // Original code commented out:
    /*
    try {
      const response = await fetch(`${API_BASE_URL}/onboarding/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setOnboardingData(result.data);
        setIsOnboardingComplete(true);
        return result;
      } else {
        throw new Error('Failed to complete onboarding');
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
    */
  };

  const saveOnboardingProgress = async (data: Partial<OnboardingData>) => {
    // Temporarily disabled while backend connection issues are resolved
    console.log('Onboarding save disabled - setting local state only');
    setOnboardingData(prev => ({ ...prev, ...data }));
    return { data, success: true };
    
    // Original code commented out:
    /*
    try {
      const response = await fetch(`${API_BASE_URL}/onboarding/save`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setOnboardingData(result.data);
        return result;
      } else {
        throw new Error('Failed to save onboarding progress');
      }
    } catch (error) {
      console.error('Error saving onboarding progress:', error);
      throw error;
    }
    */
  };

  const skipOnboarding = async () => {
    // Temporarily disabled while backend connection issues are resolved
    console.log('Onboarding skip disabled - setting local state only');
    setIsOnboardingComplete(true);
    
    // Store in localStorage to persist across page refreshes
    localStorage.setItem('onboardingComplete', 'true');
    localStorage.removeItem('onboardingData'); // Clear any partial data
    
    // Original code commented out:
    /*
    try {
      const response = await fetch(`${API_BASE_URL}/onboarding/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted: true }),
      });

      if (response.ok) {
        setIsOnboardingComplete(true);
      }
    } catch (error) {
      console.error('Error skipping onboarding:', error);
    }
    */
  };

  const resetOnboarding = async () => {
    try {
      // For now, we'll just reset the local state
      // In a production app, you might want to add a reset endpoint
      setIsOnboardingComplete(false);
      setOnboardingData(null);
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  };

  return {
    isOnboardingComplete,
    onboardingData,
    isLoading,
    completeOnboarding,
    saveOnboardingProgress,
    skipOnboarding,
    resetOnboarding,
  };
};
