
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface SubscribeFormProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

const SubscribeForm: React.FC<SubscribeFormProps> = ({
  className,
  variant = 'default',
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
    }, 1000);
  };
  
  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className={cn('relative', className)}>
        <div className="flex items-center gap-x-2">
          <div className="relative flex-grow">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full py-2 px-3 bg-secondary text-foreground text-sm border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground py-2 px-4 text-sm font-medium transition-colors hover:bg-primary/90 disabled:opacity-70"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      </form>
    );
  }
  
  return (
    <div className={cn(
      'p-6 bg-secondary/50 border border-border/50',
      className
    )}>
      <div className="flex items-start gap-x-4">
        <div className="bg-primary/10 p-2 rounded-full">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-medium">Subscribe to our newsletter</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Stay up to date with the latest articles and news about humanities scholarship.
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-grow py-2 px-3 bg-background text-foreground text-sm border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground py-2 px-6 text-sm font-medium transition-colors hover:bg-primary/90 disabled:opacity-70"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          By subscribing, you agree to our Privacy Policy and consent to receive updates from our magazine.
        </p>
      </form>
    </div>
  );
};

export default SubscribeForm;
