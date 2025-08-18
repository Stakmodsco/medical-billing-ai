import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <span className="text-lg font-bold">HealthAI</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <nav className="flex flex-col space-y-4 flex-1">
            <a 
              href="#solutions" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setOpen(false)}
            >
              Solutions
            </a>
            <a 
              href="#pricing" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#contact" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setOpen(false)}
            >
              Contact
            </a>
            
            <div className="pt-4 border-t border-border">
              {user ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Welcome, {user.email}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </nav>
          
          <div className="pt-6 border-t border-border">
            <Link to="/auth" onClick={() => setOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Apply Now →
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};