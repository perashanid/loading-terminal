// Core interfaces for the Interactive Loading Screen

export interface CodeSnippet {
  language: string;
  code: string;
  filename: string;
  typingSpeed?: number;
}

export interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number; // milliseconds
  codeSnippets?: CodeSnippet[];
  brandText?: string;
}

export interface ProgressBarProps {
  progress: number;
  variant?: 'cyber' | 'neon' | 'holographic' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}