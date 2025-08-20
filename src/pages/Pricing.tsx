import { Navigation } from '@/components/Navigation';
import { PricingSection } from '@/components/PricingSection';
import { ROICalculator } from '@/components/ROICalculator';
import { Footer } from '@/components/Footer';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <PricingSection />
        <ROICalculator />
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;