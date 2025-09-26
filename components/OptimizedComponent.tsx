'use client';

import { memo, ReactNode, Suspense } from 'react';
import { motion } from 'framer-motion';

interface OptimizedComponentProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  enableAnimations?: boolean;
}

// Optimized component wrapper with performance features
const OptimizedComponent = memo(function OptimizedComponent({
  children,
  className = '',
  fallback,
  enableAnimations = true
}: OptimizedComponentProps) {
  if (!enableAnimations) {
    return (
      <div className={className}>
        {fallback ? (
          <Suspense fallback={fallback}>
            {children}
          </Suspense>
        ) : (
          children
        )}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {fallback ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        children
      )}
    </motion.div>
  );
});

export default OptimizedComponent;
