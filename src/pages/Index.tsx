import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/StatsCard';
import { FeatureCard } from '@/components/FeatureCard';
import { 
  Brain, 
  Shield, 
  Zap, 
  TrendingUp, 
  Clock, 
  Target,
  CheckCircle,
  DollarSign,
  Activity,
  FileText,
  Lock,
  BarChart3,
  Users,
  Smartphone
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-heading text-primary">HealthAI Revenue</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#capabilities" className="text-muted-foreground hover:text-primary transition-colors">Capabilities</a>
              <a href="#roi" className="text-muted-foreground hover:text-primary transition-colors">ROI</a>
              <Button variant="outline" className="mr-2">Login</Button>
              <Button>Request Demo</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-background via-muted/30 to-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold font-heading text-foreground leading-tight mb-6">
                Revolutionary AI Healthcare 
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent"> Revenue Intelligence</span> Platform
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                The system Fortune 500 hospitals fight to get - 94.3% automated with enterprise-grade intelligence
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                  Request Enterprise Demo
                </Button>
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                  Download ROI Calculator
                </Button>
              </div>
              
              {/* Floating Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-success/10 rounded-lg p-3 border border-success/20">
                  <div className="text-2xl font-bold text-success">94.3%</div>
                  <div className="text-xs text-success/80">Automated</div>
                </div>
                <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                  <div className="text-2xl font-bold text-primary">$47,250+</div>
                  <div className="text-xs text-primary/80">Revenue</div>
                </div>
                <div className="bg-warning/10 rounded-lg p-3 border border-warning/20">
                  <div className="text-2xl font-bold text-warning">42.5%</div>
                  <div className="text-xs text-warning/80">Cost Reduction</div>
                </div>
              </div>
            </div>
            
            {/* Dashboard Preview */}
            <div className="relative">
              <div className="bg-card border border-border rounded-xl p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="ml-2 text-sm text-muted-foreground">Live Healthcare Dashboard</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm">Real-time Processing</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-sm text-success">Active</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <div className="text-lg font-bold text-primary">97.8%</div>
                      <div className="text-xs text-muted-foreground">Reimbursement Rate</div>
                    </div>
                    <div className="bg-success/10 p-3 rounded-lg">
                      <div className="text-lg font-bold text-success">$15,420</div>
                      <div className="text-xs text-muted-foreground">Fraud Prevented</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Banner */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <StatsCard 
              value="94.3%" 
              label="Automated Processing"
              variant="primary"
              className="bg-white/10 border-white/20 text-white"
            />
            <StatsCard 
              value="$47,250+" 
              label="Additional Revenue"
              variant="primary"
              className="bg-white/10 border-white/20 text-white"
            />
            <StatsCard 
              value="42.5%" 
              label="Cost Reduction"
              variant="primary"
              className="bg-white/10 border-white/20 text-white"
            />
            <StatsCard 
              value="97.8%" 
              label="Reimbursement Rate"
              variant="primary"
              className="bg-white/10 border-white/20 text-white"
            />
            <StatsCard 
              value="87%" 
              label="Faster Processing"
              variant="primary"
              className="bg-white/10 border-white/20 text-white"
            />
            <StatsCard 
              value="96%" 
              label="Error Reduction"
              variant="primary"
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
        </div>
      </section>

      {/* AI-Powered Automation Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">
              AI-POWERED AUTOMATION <span className="text-primary">(94.3% Automated)</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionary machine learning algorithms that transform healthcare revenue management with unprecedented automation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="Real-time AI Processing"
              description="Process claims and revenue data in under 2 seconds with 98%+ accuracy using advanced machine learning algorithms"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Machine Learning Fraud Detection"
              description="Prevent $15,420+ in losses with AI-powered anomaly detection that identifies suspicious patterns instantly"
              highlight
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Predictive Analytics Engine"
              description="Optimize patient care and revenue with predictive models that forecast outcomes and identify opportunities"
            />
            <FeatureCard
              icon={<Target className="w-6 h-6" />}
              title="Smart Code Suggestions"
              description="Achieve 98%+ coding accuracy with AI that suggests optimal medical codes and identifies revenue opportunities"
            />
            <FeatureCard
              icon={<CheckCircle className="w-6 h-6" />}
              title="Automated Compliance Checking"
              description="Ensure HIPAA and regulatory compliance automatically with real-time validation and audit trails"
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6" />}
              title="Lightning-Fast Processing"
              description="87% faster than industry average with real-time data processing and instant insights generation"
            />
          </div>
        </div>
      </section>

      {/* Enterprise Intelligence Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold font-heading mb-6">
                ENTERPRISE-GRADE <span className="text-primary">INTELLIGENCE</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Advanced analytics and intelligence that Fortune 500 hospitals rely on for critical revenue decisions
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-success/20 p-2 rounded-lg">
                    <DollarSign className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Live Revenue Optimization</h3>
                    <p className="text-muted-foreground">Suggests $47,250+ additional revenue opportunities through real-time analysis and predictive modeling</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Patient Risk Assessment</h3>
                    <p className="text-muted-foreground">Predict patient outcomes and lifetime value with advanced ML models for better care planning</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-warning/20 p-2 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Real-time Processing Dashboard</h3>
                    <p className="text-muted-foreground">Live updates and insights with industry-leading 97.8% reimbursement rate tracking</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-card to-muted border border-border rounded-2xl p-8 shadow-2xl">
                <h3 className="text-lg font-semibold mb-6 text-center">Live Analytics Dashboard</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-success/10 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-success">$47.2K</div>
                      <div className="text-sm text-muted-foreground">Revenue Identified</div>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-primary">97.8%</div>
                      <div className="text-sm text-muted-foreground">Reimbursement</div>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Processing Status</span>
                      <span className="text-sm text-success">Real-time Active</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-success h-2 rounded-full animate-pulse" style={{width: '94.3%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fortune 500 Capabilities */}
      <section id="capabilities" className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">FORTUNE 500 CAPABILITIES</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Enterprise-grade features trusted by the world's largest healthcare organizations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-xl border border-white/20">
              <Lock className="w-8 h-8 text-white mb-4" />
              <h3 className="text-lg font-semibold mb-2">SOC 2 Compliance</h3>
              <p className="text-white/80 text-sm">Enterprise security with comprehensive audit trails and compliance monitoring</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl border border-white/20">
              <Users className="w-8 h-8 text-white mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Enterprise Support</h3>
              <p className="text-white/80 text-sm">Dedicated support team for hospital systems with guaranteed response times</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl border border-white/20">
              <Smartphone className="w-8 h-8 text-white mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real-time EHR Integration</h3>
              <p className="text-white/80 text-sm">Seamless integration with all major EHR systems for instant data sync</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl border border-white/20">
              <BarChart3 className="w-8 h-8 text-white mb-4" />
              <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-white/80 text-sm">Predictive insights and comprehensive reporting for data-driven decisions</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl border border-white/20">
              <TrendingUp className="w-8 h-8 text-white mb-4" />
              <h3 className="text-lg font-semibold mb-2">42.5% Cost Reduction</h3>
              <p className="text-white/80 text-sm">Proven cost savings vs traditional systems through intelligent automation</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl border border-white/20">
              <Shield className="w-8 h-8 text-white mb-4" />
              <h3 className="text-lg font-semibold mb-2">Enterprise Security</h3>
              <p className="text-white/80 text-sm">Hospital-grade security with end-to-end encryption and access controls</p>
            </div>
          </div>
        </div>
      </section>

      {/* Game-Changing Differentiators */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">
              GAME-CHANGING <span className="text-primary">DIFFERENTIATORS</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionary features that set us apart from traditional healthcare revenue systems
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="AI Revenue Engine"
              description="Automatically identifies and captures missed revenue opportunities worth $47,250+ annually through machine learning algorithms"
              highlight
            />
            <FeatureCard
              icon={<Activity className="w-6 h-6" />}
              title="Predictive Patient Intelligence"
              description="Forecasts patient needs and care requirements using advanced analytics for optimal resource allocation"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Real-time Fraud Prevention"
              description="ML-powered anomaly detection saves millions by identifying suspicious patterns in real-time processing"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Instant Processing"
              description="87% faster than industry average with sub-2-second processing times for all revenue operations"
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6" />}
              title="Smart Coding Assistant"
              description="Reduces human error by 96% with AI-powered medical coding suggestions and automated validation"
            />
            <FeatureCard
              icon={<Lock className="w-6 h-6" />}
              title="Enterprise Compliance"
              description="Built for hospital-grade security and regulations with SOC 2 compliance and audit-ready documentation"
            />
          </div>
        </div>
      </section>

      {/* Value Proposition & ROI Section */}
      <section id="roi" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold font-heading mb-8">
            This Isn't Just Billing Software
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            It's a complete healthcare revenue intelligence platform that uses cutting-edge AI to revolutionize how hospitals manage their entire financial ecosystem. <strong className="text-primary">The system pays for itself within months</strong> through revenue optimization and cost savings alone!
          </p>
          
          <div className="bg-gradient-to-r from-success/10 to-primary/10 border border-success/20 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold font-heading mb-4">💰 Guaranteed ROI</h3>
            <p className="text-lg text-muted-foreground mb-6">
              The live AI insights, real-time processing, and predictive analytics make this the kind of system that transforms hospital operations and becomes indispensable to their bottom line.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">$47,250+</div>
                <div className="text-sm text-muted-foreground">Additional Annual Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">42.5%</div>
                <div className="text-sm text-muted-foreground">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">3-6 Months</div>
                <div className="text-sm text-muted-foreground">Payback Period</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
              Get Enterprise Demo
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              Download ROI Calculator
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold font-heading text-primary">HealthAI Revenue</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Revolutionary AI-powered healthcare revenue intelligence for Fortune 500 hospitals.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">AI Automation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Revenue Intelligence</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Fraud Prevention</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Compliance</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Enterprise</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Request Demo</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">ROI Calculator</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Enterprise Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Enterprise Sales: (555) 123-4567</li>
                <li>support@healthai-revenue.com</li>
                <li>24/7 Enterprise Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 HealthAI Revenue Intelligence Platform. All rights reserved. SOC 2 Compliant.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
