// Main export file for the Interactive Loading Screen package
export { default as LoadingScreen } from './components/LoadingScreen';
export { default as CodeEditor } from './components/CodeEditor';
export { default as ProgressBar } from './components/ProgressBar';

// Export types
export type { LoadingScreenProps, CodeSnippet, ProgressBarProps } from './types';

// Export utilities
export { defaultCodeSnippets, getRandomCodeSnippet } from './utils';

// Export version
export const version = '1.0.0';