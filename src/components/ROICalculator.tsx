import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, DollarSign, Target } from 'lucide-react';

export const ROICalculator = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    monthlyRevenue: '',
    claimsPerMonth: '',
    currentProcessingTime: '',
    denialRate: ''
  });

  const [results, setResults] = useState<{
    annualSavings: number;
    additionalRevenue: number;
    timeRecovered: number;
    totalROI: number;
  } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateROI = () => {
    const monthlyRevenue = parseFloat(inputs.monthlyRevenue) || 0;
    const claimsPerMonth = parseFloat(inputs.claimsPerMonth) || 0;
    const currentProcessingTime = parseFloat(inputs.currentProcessingTime) || 0;
    const denialRate = parseFloat(inputs.denialRate) || 0;

    // HealthAI improvement metrics
    const processingImprovement = 0.87; // 87% faster
    const denialReduction = 0.42; // 42% reduction in denials
    const revenueIncrease = 0.475; // 47.5% additional revenue identified
    const automationRate = 0.943; // 94.3% automation

    // Calculate savings
    const timeSaved = currentProcessingTime * processingImprovement;
    const denialsSaved = (denialRate / 100) * denialReduction;
    const additionalRevenue = monthlyRevenue * (revenueIncrease / 100) * 12;
    
    // Estimate labor cost savings (assuming $50/hour average)
    const laborSavings = timeSaved * claimsPerMonth * 50 * 12;
    
    // Revenue recovered from reduced denials
    const revenueFromDenials = monthlyRevenue * (denialsSaved / 100) * 12;
    
    const annualSavings = laborSavings + revenueFromDenials;
    const timeRecovered = timeSaved * claimsPerMonth * 12; // Hours per year
    const totalROI = ((additionalRevenue + annualSavings) / (monthlyRevenue * 12)) * 100;

    setResults({
      annualSavings: Math.round(annualSavings),
      additionalRevenue: Math.round(additionalRevenue),
      timeRecovered: Math.round(timeRecovered),
      totalROI: Math.round(totalROI * 10) / 10
    });
  };

  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">ROI Calculator</Badge>
          <h2 className="text-4xl font-bold font-heading mb-4 text-foreground">
            Calculate Your <span className="text-primary">Revenue Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how much HealthAI can save your organization and increase your revenue with our interactive calculator
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Your Current Metrics
              </CardTitle>
              <CardDescription>
                Enter your organization's current revenue and processing data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="monthlyRevenue">Monthly Revenue ($)</Label>
                <Input
                  id="monthlyRevenue"
                  type="number"
                  placeholder="e.g., 2500000"
                  value={inputs.monthlyRevenue}
                  onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="claimsPerMonth">Claims Processed Per Month</Label>
                <Input
                  id="claimsPerMonth"
                  type="number"
                  placeholder="e.g., 5000"
                  value={inputs.claimsPerMonth}
                  onChange={(e) => handleInputChange('claimsPerMonth', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="currentProcessingTime">Average Processing Time Per Claim (hours)</Label>
                <Input
                  id="currentProcessingTime"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 2.5"
                  value={inputs.currentProcessingTime}
                  onChange={(e) => handleInputChange('currentProcessingTime', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="denialRate">Current Denial Rate (%)</Label>
                <Input
                  id="denialRate"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 8.5"
                  value={inputs.denialRate}
                  onChange={(e) => handleInputChange('denialRate', e.target.value)}
                />
              </div>

              <Button 
                onClick={calculateROI}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={!inputs.monthlyRevenue || !inputs.claimsPerMonth}
              >
                Calculate ROI
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Your Projected Results
              </CardTitle>
              <CardDescription>
                Estimated impact with HealthAI implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-success/10 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-success mb-1">
                        ${results.additionalRevenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Additional Revenue/Year</div>
                    </div>
                    
                    <div className="bg-primary/10 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        ${results.annualSavings.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Annual Cost Savings</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-warning/10 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-warning mb-1">
                        {results.timeRecovered.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Hours Saved/Year</div>
                    </div>
                    
                    <div className="bg-foreground/10 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {results.totalROI}%
                      </div>
                      <div className="text-xs text-muted-foreground">Total ROI</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/20 to-success/20 p-6 rounded-lg border border-primary/30">
                    <h4 className="font-semibold mb-3">Your HealthAI Impact Summary:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• 87% faster claims processing</li>
                      <li>• 42% reduction in claim denials</li>
                      <li>• 94.3% automated processing rate</li>
                      <li>• {results.totalROI > 300 ? 'Excellent' : results.totalROI > 200 ? 'Strong' : 'Positive'} ROI potential</li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Ready to achieve these results? Get started with HealthAI today.
                    </p>
                    <Button 
                      onClick={() => navigate('/contact')}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Schedule a Demo
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Enter your metrics to see your potential ROI with HealthAI
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Benchmarks */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Industry Benchmarks</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-primary mb-2">340%</div>
              <div className="text-sm text-muted-foreground">Average ROI</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-success mb-2">$47K+</div>
              <div className="text-sm text-muted-foreground">Annual Revenue Increase</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-warning mb-2">87%</div>
              <div className="text-sm text-muted-foreground">Processing Speed Improvement</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-foreground mb-2">6 mo</div>
              <div className="text-sm text-muted-foreground">Payback Period</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};