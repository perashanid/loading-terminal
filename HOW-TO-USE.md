# How to Use Interactive Loading Screen

## 🚀 Running the Demo

To see the loading screen in action:

```bash
cd interactive-loading-screen
npm install
npm run dev
```

Open http://localhost:5173 to see the demo with all features.

## 📦 Using in Other Projects

### Method 1: Copy Files (Recommended)

1. **Copy these folders to your project:**
```
your-project/
├── src/
│   ├── components/
│   │   ├── LoadingScreen.tsx      # Main component
│   │   ├── CodeEditor.tsx         # Terminal with typing
│   │   └── ProgressBar.tsx        # Progress bar
│   ├── types/
│   │   └── index.ts               # TypeScript definitions
│   ├── utils/
│   │   ├── codeSnippets.ts        # Algorithm code
│   │   └── index.ts               # Utility exports
│   └── styles/
│       └── loading-screen.css     # All required styles
```

2. **Install dependencies:**
```bash
npm install framer-motion
# If using TypeScript:
npm install -D @types/react @types/react-dom
```

3. **Import and use:**
```tsx
import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import './styles/loading-screen.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen
          onComplete={() => setIsLoading(false)}
          duration={5000}
          brandText="Loading My App..."
        />
      )}
      {!isLoading && (
        <div>Your app content here!</div>
      )}
    </>
  );
}
```

### Method 2: Direct File Copy

Copy just the files you need:

**Minimum Required Files:**
- `src/components/LoadingScreen.tsx`
- `src/components/CodeEditor.tsx` 
- `src/components/ProgressBar.tsx`
- `src/types/index.ts`
- `src/utils/codeSnippets.ts`
- `src/styles/loading-screen.css`

### Method 3: Git Submodule (Advanced)

```bash
# In your project root
git submodule add https://github.com/yourusername/interactive-loading-screen.git loading-screen
```

Then import from the submodule:
```tsx
import { LoadingScreen } from './loading-screen/src';
import './loading-screen/src/styles/loading-screen.css';
```

## 🎨 Customization Examples

### Custom Code Snippets
```tsx
const myCodeSnippets = [
  {
    language: 'javascript',
    filename: 'my-algorithm.js',
    code: `function myAlgorithm() {
  console.log("Hello from my custom code!");
  return "Custom algorithm running...";
}`,
    typingSpeed: 25
  }
];

<LoadingScreen 
  codeSnippets={myCodeSnippets}
  duration={6000}
  brandText="Loading Custom App..."
/>
```

### Custom Styling
```css
/* Override default colors */
:root {
  --color-cyber-blue: #your-brand-color;
  --color-cyber-green: #your-accent-color;
  --color-cyber-purple: #your-secondary-color;
}
```

### Different Terminal Size
```tsx
// In CodeEditor.tsx, change the className:
<div className="... w-[1200px] h-[700px]">
```

## 🔧 Framework Integration

### React
```tsx
import { LoadingScreen } from './components/LoadingScreen';
import './styles/loading-screen.css';

function App() {
  const [loading, setLoading] = useState(true);
  
  return loading ? (
    <LoadingScreen onComplete={() => setLoading(false)} />
  ) : (
    <YourApp />
  );
}
```

### Next.js (App Router)
```tsx
'use client';
import { LoadingScreen } from '../components/LoadingScreen';
import '../styles/loading-screen.css';

export default function Layout({ children }) {
  const [loading, setLoading] = useState(true);
  
  return loading ? (
    <LoadingScreen onComplete={() => setLoading(false)} />
  ) : (
    children
  );
}
```

### Vite
```tsx
import { LoadingScreen } from './components/LoadingScreen';
import './styles/loading-screen.css';

// Same as React usage
```

## 📋 Props Reference

```tsx
interface LoadingScreenProps {
  onComplete?: () => void;           // Called when loading completes
  duration?: number;                 // Loading duration in ms (default: 5000)
  brandText?: string;                // Text shown at top (default: "Loading...")
  codeSnippets?: CodeSnippet[];      // Custom code to display
}

interface CodeSnippet {
  language: string;                  // Programming language
  filename: string;                  // File name shown in terminal
  code: string;                      // Code content to type
  typingSpeed?: number;              // Typing speed (optional)
}
```

## 🎯 Features

✅ **Real-time typing** - Code types character by character  
✅ **Perfect sync** - Typing finishes when progress reaches 100%  
✅ **Random algorithms** - Different code each time  
✅ **Smooth scrolling** - Terminal follows cursor  
✅ **Cyberpunk theme** - Neon effects and misty background  
✅ **Fixed size** - Consistent 900x500px terminal  
✅ **TypeScript** - Full type support  
✅ **Customizable** - Easy to modify colors and content  

## 🐛 Troubleshooting

**Styles not loading?**
- Make sure to import the CSS file
- Check that Tailwind CSS is configured if using custom classes

**TypeScript errors?**
- Ensure all type files are copied
- Install @types/react and @types/react-dom

**Animation issues?**
- Verify framer-motion is installed
- Check browser compatibility (Chrome 88+, Firefox 85+, Safari 14+)

**Performance problems?**
- Reduce number of code snippets
- Lower animation complexity
- Check for memory leaks in useEffect cleanup