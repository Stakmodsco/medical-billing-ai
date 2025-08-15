import { AnimatedCounter } from './AnimatedCounter';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'primary';
  className?: string;
}

export const StatsCard = ({ 
  value, 
  label, 
  description,
  icon,
  variant = 'default',
  className = ''
}: StatsCardProps) => {
  const variantStyles = {
    default: 'from-card to-muted border-border',
    success: 'from-success/10 to-success/20 border-success/30',
    warning: 'from-warning/10 to-warning/20 border-warning/30',
    primary: 'from-primary/10 to-primary-light/20 border-primary/30'
  };

  const textStyles = {
    default: 'text-foreground',
    success: 'text-success',
    warning: 'text-warning',
    primary: 'text-primary'
  };

  return (
    <div className={cn(
      "relative p-6 rounded-xl border bg-gradient-to-br transition-all duration-300",
      "hover:shadow-lg hover:scale-105 hover:shadow-primary/10",
      variantStyles[variant],
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className={cn(
            "text-3xl font-bold font-heading mb-1",
            textStyles[variant]
          )}>
            <AnimatedCounter 
              value={value}
              suffix={value.includes('%') ? '%' : ''}
              prefix={value.includes('$') ? '$' : ''}
            />
          </div>
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </div>
        </div>
        {icon && (
          <div className={cn(
            "p-2 rounded-lg",
            variant === 'success' ? 'bg-success/20 text-success' :
            variant === 'warning' ? 'bg-warning/20 text-warning' :
            variant === 'primary' ? 'bg-primary/20 text-primary' :
            'bg-muted text-muted-foreground'
          )}>
            {icon}
          </div>
        )}
      </div>
      
      {description && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      
      {/* Animated background effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};