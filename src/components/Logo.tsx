import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface LogoProps {
  /** Size of the logo mark (width and height) */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to show the text alongside the logo mark */
  showText?: boolean;
  /** Size of the text (if showText is true) */
  textSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  /** Additional CSS classes */
  className?: string;
  /** Whether to force a specific theme variant */
  forceTheme?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  textSize = '2xl',
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
    xl: 'w-10 h-10'
  };
  
  const textSizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  };
  
  const logoSize = sizeMap[size];
  const logoTextSize = textSizeMap[textSize];
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src={logoSrc}
        alt="Podbook Logo" 
        className={logoSize}
      />
      {showText && (
        <span 
          className={`${logoTextSize} font-medium text-foreground`} 
          style={{ letterSpacing: '-1px' }}
        >
          Podbook
        </span>
      )}
    </div>
  );
};

export default Logo;
