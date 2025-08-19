import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, Activity } from 'lucide-react';

const NotFoundEnhanced = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
            <Activity className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold font-heading text-foreground">HealthAI</span>
        </div>

        <Card className="border-border">
          <CardHeader className="text-center">
            <div className="text-6xl font-bold text-primary mb-4">404</div>
            <CardTitle className="text-2xl font-heading">Page Not Found</CardTitle>
            <CardDescription className="text-base">
              The page you're looking for doesn't exist or may have been moved.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground mb-6">
              Don't worry, it happens to the best of us. Here are some helpful links:
            </div>
            
            <div className="space-y-3">
              <Link to="/" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Homepage
                </Button>
              </Link>
              
              <Link to="/auth" className="block">
                <Button variant="outline" className="w-full border-border hover:bg-muted">
                  <Activity className="w-4 h-4 mr-2" />
                  Access Dashboard
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                className="w-full" 
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Need help? Contact our support team at{' '}
                <a href="mailto:support@healthai.com" className="text-primary hover:underline">
                  support@healthai.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFoundEnhanced;