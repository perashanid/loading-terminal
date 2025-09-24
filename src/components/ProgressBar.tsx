import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  variant?: 'cyber' | 'neon' | 'holographic' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  variant = 'cyber',
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3', 
    lg: 'h-4'
  };

  const variantStyles = {
    cyber: {
      container: 'glass-cyber neon-border',
      fill: 'bg-gradient-to-r from-cyber-blue via-cyber-green to-cyber-purple',
      glow: 'shadow-glow-md',
      particle: 'bg-cyber-blue'
    },
    neon: {
      container: 'glass-neon',
      fill: 'bg-gradient-to-r from-neon-blue via-cyber-purple to-neon-purple',
      glow: 'shadow-neon-md',
      particle: 'bg-cyber-purple'
    },
    holographic: {
      container: 'glass-effect',
      fill: 'holographic animate-holographic',
      glow: 'shadow-glow-lg shadow-neon-lg',
      particle: 'bg-cyber-green'
    },
    glass: {
      container: 'glass-elevated backdrop-blur-xl',
      fill: 'bg-gradient-to-r from-cyber-blue/80 to-cyber-purple/80',
      glow: 'shadow-glass',
      particle: 'bg-white/60'
    }
  };

  const currentVariant = variantStyles[variant];

  return (
    <div className={`relative w-full ${currentVariant.container} ${sizeClasses[size]} rounded-full overflow-hidden`}>
      {/* Enhanced background with glassmorphism */}
      <div className="absolute inset-0 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/10 via-transparent to-cyber-purple/10 rounded-full" />
        <div className="absolute inset-0 cyber-grid opacity-20" />
      </div>
      
      {/* Progress fill with advanced effects */}
      <motion.div 
        className={`relative ${sizeClasses[size]} ${currentVariant.fill} ${currentVariant.glow} rounded-full overflow-hidden`}
        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ 
          width: `${Math.max(0, Math.min(100, progress))}%`,
          opacity: 1
        }}
        transition={{ 
          duration: 0.5, 
          ease: [0.25, 0.46, 0.45, 0.94],
          opacity: { duration: 0.2 }
        }}
      >
        {/* Animated shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-glass-shimmer"
          animate={{
            x: ['-200%', '200%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1
          }}
        />
        
        {/* Liquid-like morphing effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
          animate={{
            scaleX: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Particle trail effect */}
        {progress > 0 && (
          <motion.div 
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 ${currentVariant.particle} rounded-full animate-pulse-glow`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Particle glow */}
            <div className="absolute inset-0 rounded-full animate-neon-pulse" />
            
            {/* Trailing particles */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${currentVariant.particle} rounded-full`}
                style={{
                  right: `${(i + 1) * 8}px`,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
        
        {/* Pulse wave effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ['-100%', '300%']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 2
          }}
        />
      </motion.div>

      {/* Holographic overlay for enhanced depth */}
      {variant === 'holographic' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-cyber-wave pointer-events-none" />
      )}
      
      {/* Container glow effect */}
      <div className={`absolute inset-0 rounded-full ${currentVariant.glow} opacity-50 pointer-events-none`} />
    </div>
  );
};

export default ProgressBar;