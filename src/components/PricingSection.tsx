import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Zap, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    name: "Starter",
    icon: <Star className="w-6 h-6" />,
    price: "$299",
    period: "/month",
    description: "Perfect for small practices and clinics",
    features: [
      "Up to 500 claims/month",
      "Basic AI processing",
      "Standard reporting",
      "Email support",
      "HIPAA compliance",
      "Basic fraud detection"
    ],
    buttonText: "Start Free Trial",
    popular: false
  },
  {
    name: "Professional",
    icon: <Zap className="w-6 h-6" />,
    price: "$899",
    period: "/month",
    description: "Ideal for mid-size healthcare facilities",
    features: [
      "Up to 5,000 claims/month",
      "Advanced AI processing",
      "Real-time analytics",
      "Priority phone support",
      "Advanced compliance tools",
      "ML fraud detection",
      "Custom integrations",
      "Dedicated account manager"
    ],
    buttonText: "Get Started",
    popular: true
  },
  {
    name: "Enterprise",
    icon: <Crown className="w-6 h-6" />,
    price: "Custom",
    period: "pricing",
    description: "For Fortune 500 healthcare organizations",
    features: [
      "Unlimited claims processing",
      "Enterprise AI suite",
      "Custom analytics dashboard",
      "24/7 dedicated support",
      "Full compliance suite",
      "Advanced ML models",
      "White-label solutions",
      "On-premise deployment",
      "Custom development",
      "SLA guarantees"
    ],
    buttonText: "Contact Sales",
    popular: false
  }
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-heading mb-4 text-foreground">
            Choose Your <span className="text-primary">Revenue Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Flexible pricing that scales with your healthcare organization's needs
          </p>
        </div>

        {/* ROI Banner */}
        <div className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground rounded-2xl p-8 mb-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Average ROI: 340% in First Year</h3>
          <p className="text-lg opacity-90">
            Our clients save an average of $47,250 annually while increasing revenue by 42.5%
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative border-border hover:shadow-xl transition-all duration-300 ${
                plan.popular 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'hover:border-primary/30'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  plan.popular 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-foreground'
                }`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-heading">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/auth">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                        : 'variant-outline'
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">All Plans Include</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
              <span>99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
              <span>Free Migration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};