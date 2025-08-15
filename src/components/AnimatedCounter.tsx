import { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({ 
  value, 
  suffix = '', 
  prefix = '', 
  duration = 2000,
  className = ''
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  // Extract numeric value from string
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const isPercentage = value.includes('%');
  const isDollar = value.includes('$') || value.includes(',');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = numericValue * easeOutQuart;
            
            setCount(currentValue);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [numericValue, duration, hasAnimated]);

  const formatValue = (val: number) => {
    if (isDollar) {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: val < 1000 ? 0 : 0
      }).format(val);
    }
    
    if (isPercentage) {
      return val.toFixed(1);
    }
    
    return Math.floor(val).toString();
  };

  return (
    <div 
      ref={counterRef}
      className={`animate-counter-up ${className}`}
      style={{ animationDelay: '0.2s' }}
    >
      {prefix}{formatValue(count)}{suffix}
    </div>
  );
};