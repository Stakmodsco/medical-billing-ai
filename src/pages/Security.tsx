import { Navigation } from '@/components/Navigation';
import { SecuritySection } from '@/components/SecuritySection';
import { Footer } from '@/components/Footer';

const Security = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <SecuritySection />
      </div>
      <Footer />
    </div>
  );
};

export default Security;