'use client';

import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
}

export function usePerformanceMonitor(componentName: string) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const startTime = useRef<number>(Date.now());
  const renderStartTime = useRef<number>(0);

  useEffect(() => {
    // Start measuring render time
    renderStartTime.current = performance.now();
    
    // Measure load time
    const loadTime = Date.now() - startTime.current;
    
    // Measure render time
    const renderTime = performance.now() - renderStartTime.current;
    
    // Get memory usage if available
    const memoryUsage = (performance as any).memory?.usedJSHeapSize;
    
    setMetrics({
      loadTime,
      renderTime,
      memoryUsage
    });

    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance metrics for ${componentName}:`, {
        loadTime: `${loadTime}ms`,
        renderTime: `${renderTime.toFixed(2)}ms`,
        memoryUsage: memoryUsage ? `${(memoryUsage / 1024 / 1024).toFixed(2)}MB` : 'N/A'
      });
    }
  }, [componentName]);

  return metrics;
}

// Hook for measuring component render performance
export function useRenderPerformance(componentName: string) {
  const renderCount = useRef(0);
  const renderTimes = useRef<number[]>([]);

  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      renderCount.current += 1;
      renderTimes.current.push(renderTime);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render #${renderCount.current}: ${renderTime.toFixed(2)}ms`);
      }
    };
  });

  return {
    renderCount: renderCount.current,
    averageRenderTime: renderTimes.current.length > 0 
      ? renderTimes.current.reduce((a, b) => a + b, 0) / renderTimes.current.length 
      : 0
  };
}
