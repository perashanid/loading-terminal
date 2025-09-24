# Interactive Loading Screen

A beautiful, cyberpunk-themed loading screen with real-time code typing animation and smooth progress tracking. Perfect for developer tools, coding applications, or any project that wants a tech-savvy loading experience.

## Features

✨ **Real-time Code Typing**: Watch algorithms type out character by character
🎯 **Perfect Synchronization**: Typing completes exactly when progress reaches 100%
🔄 **Random Algorithm Selection**: 8+ different algorithms (Dijkstra, QuickSort, A*, etc.)
📜 **Smooth Auto-scrolling**: Terminal follows the typing cursor naturally
🎨 **Cyberpunk Theme**: Misty background with neon effects
⚡ **Highly Customizable**: Easy to configure and extend
📱 **Fixed Size**: Consistent 900x500px terminal window
🚀 **Performance Optimized**: Smooth 60fps animations

## Quick Start

### Installation

```bash
npm install
```

### Basic Usage

```tsx
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen
          onComplete={() => setIsLoading(false)}
          duration={5000}
          brandText="Loading Your App..."
        />
      )}
      {/* Your app content */}
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onComplete` | `() => void` | - | Callback when loading completes |
| `duration` | `number` | `5000` | Loading duration in milliseconds |
| `brandText` | `string` | `"Loading..."` | Text displayed at the top |
| `codeSnippets` | `CodeSnippet[]` | `defaultCodeSnippets` | Custom code snippets to display |

## Code Snippet Structure

```tsx
interface CodeSnippet {
  language: string;
  filename: string;
  code: string;
  typingSpeed?: number;
}
```

## Customization

### Custom Code Snippets

```tsx
const myCodeSnippets = [
  {
    language: 'javascript',
    filename: 'myAlgorithm.js',
    code: `function myCustomAlgorithm() {
  // Your code here
  return "Hello World!";
}`,
    typingSpeed: 25
  }
];

<LoadingScreen 
  codeSnippets={myCodeSnippets}
  onComplete={() => console.log('Done!')}
/>
```

### Styling

The component uses Tailwind CSS with custom cyberpunk theme variables. You can customize colors by modifying the CSS variables in `src/index.css`:

```css
:root {
  --color-cyber-blue: #00d4ff;
  --color-cyber-green: #64ffda;
  --color-cyber-purple: #ff6b9d;
  /* ... more variables */
}
```

## Built-in Algorithms

The loading screen comes with 8 pre-built algorithm implementations:

1. **Dijkstra's Algorithm** - Shortest path finding
2. **QuickSort** - Efficient sorting with in-place version
3. **Binary Search** - Fast searching in sorted arrays
4. **Merge Sort** - Stable sorting algorithm
5. **BFS & DFS** - Graph traversal algorithms
6. **Dynamic Programming** - Fibonacci, LCS, Knapsack, Edit Distance
7. **Heap Sort** - Sorting using max heap
8. **A* Algorithm** - Pathfinding for grids

## Integration Guide

### For React Projects

1. Copy the `src/components` folder to your project
2. Copy the `src/types` and `src/utils` folders
3. Add the CSS from `src/index.css` to your styles
4. Install dependencies: `framer-motion`, `react`, `react-dom`

### For Other Frameworks

The core logic can be adapted to other frameworks:
- Vue.js: Convert React components to Vue components
- Angular: Create Angular components with similar structure
- Vanilla JS: Use the typing and progress logic with DOM manipulation

## Dependencies

```json
{
  "framer-motion": "^12.23.21",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "tailwindcss": "^4.1.13"
}
```

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with modern JS support

## Performance

- 60fps smooth animations
- Hardware-accelerated scrolling
- Optimized re-renders with React 18 features
- Memory efficient with cleanup on unmount

## License

MIT License - feel free to use in commercial and personal projects.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your improvements
4. Submit a pull request

## Examples

Check out the `examples/` folder for integration examples with different frameworks and use cases.