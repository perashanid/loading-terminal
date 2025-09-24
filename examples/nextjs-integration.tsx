// Next.js Integration Example
'use client'; // For Next.js 13+ App Router

import { useState, useEffect } from 'react';
import { LoadingScreen } from '../src';
import '../src/styles/loading-screen.css';

// Custom hook for app initialization
function useAppInitialization() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initProgress, setInitProgress] = useState(0);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate various initialization tasks
        
        // Load user preferences
        setInitProgress(20);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Initialize services
        setInitProgress(40);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Load initial data
        setInitProgress(60);
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Setup event listeners
        setInitProgress(80);
        await new Promise(resolve => setTimeout(resolve, 400));
        
        // Final setup
        setInitProgress(100);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setIsInitialized(true);
      } catch (error) {
        console.error('App initialization failed:', error);
        // Handle initialization error
      }
    };

    initializeApp();
  }, []);

  return { isInitialized, initProgress };
}

// Main App Component
export default function NextJSApp() {
  const { isInitialized } = useAppInitialization();
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  // Hide loading screen when app is initialized
  useEffect(() => {
    if (isInitialized) {
      // Small delay to ensure loading screen completes its animation
      const timer = setTimeout(() => {
        setShowLoadingScreen(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isInitialized]);

  if (showLoadingScreen) {
    return (
      <LoadingScreen
        onComplete={() => setShowLoadingScreen(false)}
        duration={5000}
        brandText="Loading Next.js App..."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold text-cyan-400">My Next.js App</h1>
      </header>
      
      <main className="container mx-auto p-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome!</h2>
          <p className="text-gray-300 mb-8">
            Your Next.js application has loaded successfully with the interactive loading screen.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">Feature 1</h3>
              <p className="text-gray-300">Your app features go here</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">Feature 2</h3>
              <p className="text-gray-300">More amazing functionality</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">Feature 3</h3>
              <p className="text-gray-300">Even more cool stuff</p>
            </div>
          </div>
          
          <button 
            onClick={() => setShowLoadingScreen(true)}
            className="mt-8 px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Show Loading Screen Again
          </button>
        </div>
      </main>
    </div>
  );
}

// Alternative: Layout-based approach
export function AppWithLoadingLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Let LoadingScreen handle its own timing

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen
        onComplete={() => setIsLoading(false)}
        duration={6000}
        brandText="Initializing Next.js Application..."
      />
    );
  }

  return <>{children}</>;
}

// Usage in layout.tsx:
/*
import { AppWithLoadingLayout } from './components/AppWithLoadingLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppWithLoadingLayout>
          {children}
        </AppWithLoadingLayout>
      </body>
    </html>
  );
}
*/