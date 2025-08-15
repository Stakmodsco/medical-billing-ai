import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  highlight?: boolean;
  className?: string;
}

export const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  highlight = false,
  className = ''
}: FeatureCardProps) => {
  return (
    <div className={cn(
      "group relative p-6 rounded-xl border transition-all duration-300",
      "hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1",
      highlight 
        ? "bg-gradient-to-br from-primary to-primary-light text-primary-foreground border-primary" 
        : "bg-card border-border hover:border-primary/30",
      className
    )}>
      <div className="flex items-start gap-4">
        <div className={cn(
          "flex-shrink-0 p-2 rounded-lg",
          highlight 
            ? "bg-white/20" 
            : "bg-primary/10 group-hover:bg-primary/20 transition-colors"
        )}>
          {icon || <CheckCircle className={cn(
            "w-6 h-6",
            highlight ? "text-white" : "text-primary"
          )} />}
        </div>
        <div className="flex-1">
          <h3 className={cn(
            "text-lg font-semibold mb-2 font-heading",
            highlight ? "text-white" : "text-foreground"
          )}>
            {title}
          </h3>
          <p className={cn(
            "text-sm leading-relaxed",
            highlight ? "text-white/90" : "text-muted-foreground"
          )}>
            {description}
          </p>
        </div>
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};