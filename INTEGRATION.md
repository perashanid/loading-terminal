# Integration Guide

This guide shows how to integrate the Interactive Loading Screen into different types of projects.

## React Projects

### 1. Copy Required Files

Copy these folders to your project:
```
src/
├── components/
│   ├── LoadingScreen.tsx
│   ├── CodeEditor.tsx
│   └── ProgressBar.tsx
├── types/
│   └── index.ts
├── utils/
│   ├── codeSnippets.ts
│   └── index.ts
└── styles/
    └── loading-screen.css
```

### 2. Install Dependencies

```bash
npm install framer-motion
# If using TypeScript
npm install -D @types/react @types/react-dom
```

### 3. Add Styles

Import the CSS in your main CSS file or component:

```css
/* In your main CSS file */
@import './styles/loading-screen.css';
```

### 4. Basic Implementation

```tsx
import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate app initialization
  useEffect(() => {
    // Your app initialization logic here
    // The loading screen will handle its own timing
  }, []);

  return (
    <div className="App">
      {isLoading && (
        <LoadingScreen
          onComplete={() => setIsLoading(false)}
          duration={6000} // 6 seconds
          brandText="Initializing Application..."
        />
      )}
      
      {!isLoading && (
        <div>
          {/* Your main app content */}
          <h1>Welcome to Your App!</h1>
        </div>
      )}
    </div>
  );
}

export default App;
```

### 5. Advanced Usage with Custom Loading Logic

```tsx
import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate real loading tasks
    const loadTasks = async () => {
      // Task 1: Load user data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoadingProgress(25);
      
      // Task 2: Initialize services
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoadingProgress(50);
      
      // Task 3: Load configuration
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoadingProgress(75);
      
      // Task 4: Final setup
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoadingProgress(100);
    };

    loadTasks();
  }, []);

  return (
    <div className="App">
      {isLoading && (
        <LoadingScreen
          onComplete={() => setIsLoading(false)}
          duration={4000} // Total duration
          brandText="Loading Your Dashboard..."
        />
      )}
      
      {!isLoading && (
        <YourMainApp />
      )}
    </div>
  );
}
```

## Next.js Projects

### 1. Create a Loading Component

```tsx
// components/AppLoadingScreen.tsx
'use client'; // For Next.js 13+ App Router

import { LoadingScreen } from './LoadingScreen';
import { useState, useEffect } from 'react';

export default function AppLoadingScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Let the LoadingScreen handle its own timing

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen
        onComplete={() => setIsLoading(false)}
        duration={5000}
        brandText="Loading Next.js App..."
      />
    );
  }

  return <>{children}</>;
}
```

### 2. Use in Layout or Page

```tsx
// app/layout.tsx (App Router)
import AppLoadingScreen from '../components/AppLoadingScreen';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppLoadingScreen>
          {children}
        </AppLoadingScreen>
      </body>
    </html>
  );
}
```

## Vite Projects

### 1. Setup

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install framer-motion
```

### 2. Integration

```tsx
// src/App.tsx
import { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import './App.css';

function App() {
  const [showLoading, setShowLoading] = useState(true);

  return (
    <>
      {showLoading && (
        <LoadingScreen
          onComplete={() => setShowLoading(false)}
          duration={5000}
          brandText="Vite + React App"
        />
      )}
      
      {!showLoading && (
        <div className="app-content">
          <h1>Your Vite App is Ready!</h1>
        </div>
      )}
    </>
  );
}

export default App;
```

## Custom Code Snippets

### Creating Your Own Algorithms

```tsx
// utils/myCodeSnippets.ts
import type { CodeSnippet } from '../types';

export const myCustomSnippets: CodeSnippet[] = [
  {
    language: 'python',
    filename: 'neural_network.py',
    code: `import numpy as np
import tensorflow as tf

class NeuralNetwork:
    def __init__(self, layers):
        self.layers = layers
        self.weights = []
        self.biases = []
        
        for i in range(len(layers) - 1):
            w = np.random.randn(layers[i], layers[i + 1]) * 0.1
            b = np.zeros((1, layers[i + 1]))
            self.weights.append(w)
            self.biases.append(b)
    
    def forward(self, X):
        self.activations = [X]
        
        for i in range(len(self.weights)):
            z = np.dot(self.activations[-1], self.weights[i]) + self.biases[i]
            a = self.sigmoid(z)
            self.activations.append(a)
        
        return self.activations[-1]
    
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))
    
    def train(self, X, y, epochs=1000, learning_rate=0.1):
        for epoch in range(epochs):
            # Forward pass
            output = self.forward(X)
            
            # Backward pass
            self.backward(X, y, output, learning_rate)
            
            if epoch % 100 == 0:
                loss = np.mean((output - y) ** 2)
                print(f'Epoch {epoch}, Loss: {loss:.4f}')`,
    typingSpeed: 20
  },
  {
    language: 'rust',
    filename: 'blockchain.rs',
    code: `use sha2::{Sha256, Digest};
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Debug, Clone)]
pub struct Block {
    pub index: u64,
    pub timestamp: u64,
    pub data: String,
    pub previous_hash: String,
    pub hash: String,
    pub nonce: u64,
}

impl Block {
    pub fn new(index: u64, data: String, previous_hash: String) -> Self {
        let timestamp = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs();
        
        let mut block = Block {
            index,
            timestamp,
            data,
            previous_hash,
            hash: String::new(),
            nonce: 0,
        };
        
        block.mine_block(4); // Difficulty of 4
        block
    }
    
    fn calculate_hash(&self) -> String {
        let input = format!(
            "{}{}{}{}{}",
            self.index, self.timestamp, self.data, self.previous_hash, self.nonce
        );
        
        let mut hasher = Sha256::new();
        hasher.update(input.as_bytes());
        format!("{:x}", hasher.finalize())
    }
    
    fn mine_block(&mut self, difficulty: usize) {
        let target = "0".repeat(difficulty);
        
        while !self.hash.starts_with(&target) {
            self.nonce += 1;
            self.hash = self.calculate_hash();
        }
        
        println!("Block mined: {}", self.hash);
    }
}

pub struct Blockchain {
    pub chain: Vec<Block>,
    pub difficulty: usize,
}

impl Blockchain {
    pub fn new() -> Self {
        let mut blockchain = Blockchain {
            chain: Vec::new(),
            difficulty: 4,
        };
        
        blockchain.create_genesis_block();
        blockchain
    }
    
    fn create_genesis_block(&mut self) {
        let genesis_block = Block::new(0, "Genesis Block".to_string(), "0".to_string());
        self.chain.push(genesis_block);
    }
    
    pub fn add_block(&mut self, data: String) {
        let previous_block = self.chain.last().unwrap();
        let new_block = Block::new(
            previous_block.index + 1,
            data,
            previous_block.hash.clone(),
        );
        self.chain.push(new_block);
    }
    
    pub fn is_chain_valid(&self) -> bool {
        for i in 1..self.chain.len() {
            let current_block = &self.chain[i];
            let previous_block = &self.chain[i - 1];
            
            if current_block.hash != current_block.calculate_hash() {
                return false;
            }
            
            if current_block.previous_hash != previous_block.hash {
                return false;
            }
        }
        true
    }
}`,
    typingSpeed: 18
  }
];

// Usage in your component
<LoadingScreen 
  codeSnippets={myCustomSnippets}
  onComplete={() => setLoading(false)}
  brandText="Loading Blockchain App..."
/>
```

## Styling Customization

### Custom Theme Colors

```css
/* Override the default cyberpunk theme */
:root {
  /* Your brand colors */
  --color-cyber-blue: #007acc;
  --color-cyber-green: #28a745;
  --color-cyber-purple: #6f42c1;
  
  /* Custom gradients */
  --gradient-cyber: linear-gradient(135deg, #007acc 0%, #28a745 50%, #6f42c1 100%);
}
```

### Custom Terminal Size

```tsx
// Modify CodeEditor.tsx
<div className="bg-black/80 backdrop-blur-xl rounded-xl border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-500/20 w-[1200px] h-[700px]">
```

## Performance Tips

1. **Lazy Loading**: Only load the LoadingScreen when needed
2. **Code Splitting**: Use dynamic imports for large code snippets
3. **Memory Management**: The component automatically cleans up intervals and animations
4. **Reduced Motion**: Respects user's `prefers-reduced-motion` setting

## Troubleshooting

### Common Issues

1. **Styles not loading**: Make sure to import the CSS file
2. **Framer Motion errors**: Ensure you have the correct version installed
3. **TypeScript errors**: Check that all type definitions are imported
4. **Performance issues**: Reduce the number of code snippets or simplify animations

### Browser Compatibility

- Use polyfills for older browsers if needed
- Test on target devices and browsers
- Consider fallback loading screens for unsupported browsers