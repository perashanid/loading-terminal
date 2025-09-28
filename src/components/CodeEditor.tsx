import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { CodeSnippet } from '../types';

interface CodeEditorProps {
  codeSnippets?: CodeSnippet[];
  progress?: number;
  duration?: number;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  codeSnippets = [], 
  progress = 0
}) => {
  const [currentSnippet, setCurrentSnippet] = useState<CodeSnippet>({
    filename: 'algorithm.ts',
    code: '// Loading algorithm...',
    language: 'typescript'
  });

  const [displayedCode, setDisplayedCode] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLElement>(null);

  // Select random algorithm on mount
  useEffect(() => {
    if (codeSnippets.length > 0) {
      const randomIndex = Math.floor(Math.random() * codeSnippets.length);
      setCurrentSnippet(codeSnippets[randomIndex]);
    }
  }, [codeSnippets]);

  // Calculate how much code to show based on progress
  const targetLength = useMemo(() => {
    const totalLength = currentSnippet.code.length;
    return Math.floor((progress / 100) * totalLength);
  }, [progress, currentSnippet.code.length]);

  // Update displayed code based on progress
  useEffect(() => {
    const targetCode = currentSnippet.code.substring(0, targetLength);
    setDisplayedCode(targetCode);
  }, [targetLength, currentSnippet.code]);

  // Auto-scroll to follow the typing cursor
  useEffect(() => {
    if (scrollContainerRef.current && codeRef.current && progress > 0) {
      const container = scrollContainerRef.current;
      
      // Calculate the approximate position of the cursor
      const lines = displayedCode.split('\n');
      const currentLine = lines.length;
      const lineHeight = 24; // Approximate line height in pixels
      const cursorPosition = currentLine * lineHeight;
      
      // Get container dimensions
      const containerHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      
      // Check if cursor is near the bottom of the visible area
      const visibleBottom = scrollTop + containerHeight;
      const cursorFromTop = cursorPosition;
      
      // Auto-scroll if cursor is getting close to the bottom
      if (cursorFromTop > visibleBottom - 100) { // 100px buffer
        container.scrollTo({
          top: cursorFromTop - containerHeight + 150, // Keep some content visible above
          behavior: 'smooth'
        });
      }
    }
  }, [displayedCode, progress]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="bg-black/80 backdrop-blur-xl rounded-xl border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-500/20 w-[900px] h-[500px]">
      {/* Terminal Header */}
      <div className="bg-gray-900/90 px-6 py-3 flex items-center space-x-3 border-b border-cyan-500/20">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-cyan-300 text-sm font-mono font-semibold tracking-wide">
            {currentSnippet.filename}
          </span>
        </div>
        <div className="text-xs text-gray-400 font-mono">
          {currentSnippet.language}
        </div>
      </div>
      
      {/* Code Content */}
      <div 
        ref={scrollContainerRef}
        className="p-6 font-mono text-sm h-full overflow-auto bg-gradient-to-br from-black/90 to-gray-900/90 scroll-smooth"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(100, 255, 218, 0.3) rgba(0, 0, 0, 0.1)'
        }}
      >
        <pre className="text-cyan-300 whitespace-pre-wrap leading-relaxed">
          <code ref={codeRef} className="block">
            {displayedCode}
            {showCursor && progress < 100 && (
              <span className="bg-cyan-400 text-black animate-pulse ml-0.5">▋</span>
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;