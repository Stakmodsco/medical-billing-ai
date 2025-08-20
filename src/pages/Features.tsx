import { Navigation } from '@/components/Navigation';
import { FeaturesSection } from '@/components/FeaturesSection';
import { Footer } from '@/components/Footer';

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <FeaturesSection />
      </div>
      <Footer />
    </div>
  );
};

export default Features;