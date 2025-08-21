import React from 'react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/StatsCard';
import { FeatureCard } from '@/components/FeatureCard';
import { Dashboard } from '@/components/Dashboard';
import { ContactForm } from '@/components/ContactForm';
import { PricingSection } from '@/components/PricingSection';
import { SplashCursor } from '@/components/SplashCursor';
import { Navigation } from '@/components/Navigation';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { AboutSection } from '@/components/AboutSection';
import { SecuritySection } from '@/components/SecuritySection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ROICalculator } from '@/components/ROICalculator';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
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
  Users,
  BarChart3,
  Smartphone,
  Lock
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  // If user is authenticated, show dashboard
  if (user) {
    return <Dashboard />;
  }

  return (
    <div className="relative">
      <SplashCursor />
      <div className="relative z-10">
        <div className="min-h-screen bg-background">
          {/* Navigation */}
          <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl lg:text-7xl font-bold font-heading text-foreground leading-tight mb-8">
              AI Healthcare Revenue Platform For
              <span className="block bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Corporate Transactions
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Enterprise solutions, automated revenue management, and intelligent expense tracking for Fortune 500 hospitals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {user ? (
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-4 rounded-lg text-lg"
                >
                  Access Dashboard
                </Button>
              ) : (
                <>
                  <Link to="/auth">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-4 rounded-lg text-lg"
                    >
                      Apply Now - It's Free
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-border hover:bg-muted text-foreground font-medium px-8 py-4 rounded-lg text-lg"
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Sign Up Using Google
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            {/* Feature highlights */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Unlimited payment lifetime</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>10.5k+ Active Brands</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Dashboard Overview Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="ml-4 text-lg font-semibold text-foreground">Expense Management</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Sync to Salesforce</span>
                <span>Manage</span>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Allocated Budget | Expenses</h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Region</span>
                  <span className="text-sm text-muted-foreground">Filter</span>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground mb-4">
                Results — Last 30 Days
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-success/10 border border-success/20 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Invoices</span>
                    <span className="text-xs text-success">+8.5%</span>
                  </div>
                  <div className="text-2xl font-bold text-success mb-1">1,478</div>
                  <div className="text-xs text-muted-foreground">Last 30 Days</div>
                </div>
                
                <div className="bg-warning/10 border border-warning/20 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">User Associated</span>
                    <span className="text-xs text-warning">+8.5%</span>
                  </div>
                  <div className="text-2xl font-bold text-warning mb-1">340</div>
                  <div className="text-xs text-muted-foreground">Last 30 Days</div>
                </div>
                
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Payment Confirmed</span>
                    <span className="text-xs text-primary">+8.5%</span>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">$1,205.50</div>
                  <div className="text-xs text-muted-foreground">Last 30 Days</div>
                </div>
                
                <div className="bg-muted border border-border rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Payment Hold</span>
                    <span className="text-xs text-foreground">+8.5%</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">$845.75</div>
                  <div className="text-xs text-muted-foreground">Last 30 Days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Banner */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
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
      <section id="solutions" className="py-20 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4 text-foreground">
              AI-POWERED AUTOMATION <span className="text-primary">(94.3% Automated)</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionary machine learning algorithms that transform healthcare revenue management
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
      <section id="capabilities" className="py-20 px-4 bg-success text-success-foreground">
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-success border border-success/20 rounded-xl p-8 hover:bg-success/90 transition-all duration-300 hover:scale-105 text-white shadow-lg">
              <div className="mb-6">
                <Brain className="w-8 h-8 text-white mb-4" />
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">AI-POWERED PROCESSING</h3>
                <p className="text-white text-sm leading-relaxed">
                  Automatically identifies and captures missed revenue opportunities worth $47,250+ annually through advanced machine learning algorithms
                </p>
              </div>
            </div>
            
            <div className="bg-success border border-success/20 rounded-xl p-8 hover:bg-success/90 transition-all duration-300 hover:scale-105 text-white shadow-lg">
              <div className="mb-6">
                <TrendingUp className="w-8 h-8 text-white mb-4" />
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">REAL-TIME REVENUE</h3>
                <p className="text-white text-sm leading-relaxed">
                  Live revenue optimization with predictive analytics that increase reimbursement rates to industry-leading 97.8%
                </p>
              </div>
            </div>
            
            <div className="bg-success border border-success/20 rounded-xl p-8 hover:bg-success/90 transition-all duration-300 hover:scale-105 text-white shadow-lg">
              <div className="mb-6">
                <DollarSign className="w-8 h-8 text-white mb-4" />
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">COST REDUCTION</h3>
                <p className="text-white text-sm leading-relaxed">
                  Achieve 42.5% cost reduction through automated processing and intelligent workflow optimization
                </p>
              </div>
            </div>
            
            <div className="bg-success border border-success/20 rounded-xl p-8 hover:bg-success/90 transition-all duration-300 hover:scale-105 text-white shadow-lg">
              <div className="mb-6">
                <CheckCircle className="w-8 h-8 text-white mb-4" />
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">COMPLIANCE AND AUDIT</h3>
                <p className="text-white text-sm leading-relaxed">
                  Built for hospital-grade security with SOC 2 compliance and automated regulatory monitoring
                </p>
              </div>
            </div>
            
            <div className="bg-success border border-success/20 rounded-xl p-8 hover:bg-success/90 transition-all duration-300 hover:scale-105 text-white shadow-lg">
              <div className="mb-6">
                <Users className="w-8 h-8 text-white mb-4" />
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">ENTERPRISE SUPPORT</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  24/7 dedicated support for Fortune 500 hospitals with guaranteed response times and expert assistance
                </p>
              </div>
            </div>
            
            <div className="bg-success border border-success/20 rounded-xl p-8 hover:bg-success/90 transition-all duration-300 hover:scale-105 text-white shadow-lg">
              <div className="mb-6">
                <Lock className="w-8 h-8 text-white mb-4" />
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">SECURE INFRASTRUCTURE</h3>
                <p className="text-white text-sm leading-relaxed">
                  Enterprise-grade security with end-to-end encryption and real-time threat monitoring
                </p>
              </div>
            </div>
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
            <Link to="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                Get Enterprise Demo
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                Download ROI Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

        </div>
      </div>
    </div>
  );
};

export default Index;
