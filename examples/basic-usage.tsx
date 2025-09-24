// Basic Usage Example
import React, { useState } from 'react';
import { LoadingScreen } from '../src';
import '../src/styles/loading-screen.css';

function BasicExample() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="app">
      {isLoading && (
        <LoadingScreen
          onComplete={() => setIsLoading(false)}
          duration={5000}
          brandText="Loading My App..."
        />
      )}
      
      {!isLoading && (
        <div className="main-content" style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>App Loaded Successfully!</h1>
          <p>The loading screen completed and your app is ready.</p>
          <button 
            onClick={() => setIsLoading(true)}
            style={{
              padding: '0.5rem 1rem',
              background: '#00d4ff',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace'
            }}
          >
            Show Loading Screen Again
          </button>
        </div>
      )}
    </div>
  );
}

export default BasicExample;