import React, { useEffect, useState, useCallback, Suspense, useDeferredValue, useTransition } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import type { LoadingScreenProps } from '../types';
import { defaultCodeSnippets } from '../utils';
import CodeEditor from './CodeEditor';
import ProgressBar from './ProgressBar';

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  duration = 5000,
  codeSnippets = defaultCodeSnippets
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isPending, startTransition] = useTransition();
  
  // Use React 18's useDeferredValue for smooth progress updates
  const deferredProgress = useDeferredValue(progress);

  // Define loading stages for better UX
  const loadingStages = [
    { threshold: 0, message: "Initializing components...", icon: "*" },
    { threshold: 25, message: "Loading assets...", icon: "+" },
    { threshold: 50, message: "Compiling modules...", icon: "#" },
    { threshold: 75, message: "Finalizing setup...", icon: ">" },
    { threshold: 95, message: "Almost ready!", icon: "!" }
  ];

  const handleComplete = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete?.();
    }, 500); // Allow exit animation to complete
  }, [onComplete]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      startTransition(() => {
        setProgress(prev => {
          // Slower, more natural increment - updates every 150ms with smaller steps
          const increment = 100 / (duration / 150);
          const newProgress = prev + increment;
          
          // Update current stage based on progress
          const newStage = loadingStages.findIndex(stage => newProgress < stage.threshold + 25) - 1;
          if (newStage !== currentStage && newStage >= 0) {
            setCurrentStage(newStage);
          }
          
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            handleComplete();
            return 100;
          }
          return newProgress;
        });
      });
    }, 150); // Increased from 50ms to 150ms for more natural updates

    return () => clearInterval(progressInterval);
  }, [duration, handleComplete, currentStage, loadingStages]);

  const containerVariants: Variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: [0.55, 0.06, 0.68, 0.19]
      }
    }
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center p-4 md:p-8 overflow-hidden"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            background: `
              radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%),
              radial-gradient(ellipse at 30% 20%, rgba(100, 255, 218, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 80%),
              linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)
            `
          }}
        >
          {/* Misty Background Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Floating mist particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5 blur-xl"
                style={{
                  width: `${60 + i * 20}px`,
                  height: `${60 + i * 20}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, 100, -50, 0],
                  y: [0, -80, 60, 0],
                  opacity: [0.1, 0.3, 0.1, 0.2],
                  scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                  duration: 15 + i * 3,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {/* Subtle grid pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center space-y-8 h-full">
            {/* Centered Terminal Container */}
            <motion.div 
              className="flex-1 flex items-center justify-center"
              variants={itemVariants}
            >
              <Suspense 
                fallback={
                  <div className="w-[900px] h-[500px] glass-cyber backdrop-blur-xl rounded-lg neon-border animate-pulse flex items-center justify-center shadow-glow-md">
                    <div className="flex items-center space-x-2 neon-glow">
                      <div className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce shadow-glow-sm" />
                      <div className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce shadow-glow-sm" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce shadow-glow-sm" style={{ animationDelay: '0.2s' }} />
                      <span className="ml-2 font-mono text-sm">Loading terminal...</span>
                    </div>
                  </div>
                }
              >
                <CodeEditor 
                  codeSnippets={codeSnippets} 
                  progress={deferredProgress}
                  duration={duration}
                />
              </Suspense>
            </motion.div>

            {/* Progress Section */}
            <motion.div 
              className="w-full max-w-4xl space-y-4 pb-8"
              variants={itemVariants}
            >
              {/* Progress Header with Stage Info */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm font-mono">
                <div className="flex items-center space-x-2">
                  <motion.span 
                    className="text-2xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    {loadingStages[currentStage]?.icon || "*"}
                  </motion.span>
                  <span className="text-cyan-300">
                    {loadingStages[currentStage]?.message || "Loading..."}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-cyan-400 font-bold text-lg">
                    {Math.round(deferredProgress)}%
                  </span>
                  {isPending && (
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  )}
                </div>
              </div>
              
              {/* Progress Bar */}
              <ProgressBar 
                progress={deferredProgress} 
                variant="holographic" 
                size="lg" 
              />
              
              {/* Progress Indicators */}
              <div className="flex justify-center space-x-3">
                {loadingStages.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full relative ${
                      index <= currentStage 
                        ? 'bg-cyan-400 shadow-glow-sm' 
                        : 'bg-gray-600/50'
                    }`}
                    animate={{
                      scale: index === currentStage ? [1, 1.3, 1] : 1,
                      opacity: index <= currentStage ? 1 : 0.4
                    }}
                    transition={{
                      duration: 0.4,
                      repeat: index === currentStage ? Infinity : 0,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  >
                    {index === currentStage && (
                      <motion.div
                        className="absolute inset-0 bg-cyan-400 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;