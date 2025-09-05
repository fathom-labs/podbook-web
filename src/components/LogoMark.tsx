import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface LogoMarkProps {
  /** Size of the logo mark (width and height) */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Additional CSS classes */
  className?: string;
  /** Whether to force a specific theme variant */
  forceTheme?: 'light' | 'dark';
}

const LogoMark: React.FC<LogoMarkProps> = ({ 
  size = 'md', 
  className = '',
  forceTheme
}) => {
  const { theme } = useTheme();
  
  // Determine which logo to use
  const logoTheme = forceTheme || theme;
  const logoSrc = logoTheme === 'dark' ? '/logo-white.svg' : '/logo.svg';
  
  // Size mappings
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
    '2xl': 'w-12 h-12'
  };
  
  const logoSize = sizeMap[size];
  
  return (
    <img 
      src={logoSrc}
      alt="Podbook Logo Mark" 
      className={`${logoSize} ${className}`}
    />
  );
};

export default LogoMark;
