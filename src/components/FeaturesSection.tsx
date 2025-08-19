import { FeatureCard } from '@/components/FeatureCard';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Shield, 
  TrendingUp, 
  Target, 
  CheckCircle, 
  Clock,
  Zap,
  BarChart3,
  FileText,
  Activity,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

const featuresData = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI-Powered Claims Processing",
    description: "Process healthcare claims 87% faster with 98%+ accuracy using advanced machine learning algorithms that learn from your data patterns.",
    highlight: true
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Advanced Fraud Detection", 
    description: "Prevent $15,420+ in losses annually with AI that identifies suspicious patterns and anomalies in real-time across all claims.",
    highlight: false
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Revenue Optimization",
    description: "Maximize revenue potential with AI insights that identify $47,250+ in additional revenue opportunities through predictive analytics.",
    highlight: false
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Smart Coding Suggestions",
    description: "Achieve 98%+ coding accuracy with AI that suggests optimal medical codes and identifies missed revenue opportunities automatically.",
    highlight: false
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Compliance Automation",
    description: "Ensure HIPAA and regulatory compliance automatically with real-time validation, audit trails, and compliance monitoring.",
    highlight: false
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Real-Time Processing",
    description: "Get instant insights with processing speeds 87% faster than industry average, enabling immediate decision-making capabilities.",
    highlight: false
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Advanced Analytics Dashboard",
    description: "Comprehensive real-time analytics with customizable dashboards showing revenue trends, performance metrics, and KPI tracking.",
    highlight: false
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Payment Optimization",
    description: "Optimize payment cycles and reduce denials by 42% through intelligent payment tracking and automated follow-up systems.",
    highlight: false
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Automated Documentation",
    description: "Generate comprehensive reports and documentation automatically, ensuring audit readiness and regulatory compliance at all times.",
    highlight: false
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Advanced Features</Badge>
          <h2 className="text-4xl font-bold font-heading mb-6 text-foreground">
            Comprehensive <span className="text-primary">Healthcare Revenue</span> Suite
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Everything you need to optimize healthcare revenue management, from AI-powered processing 
            to advanced analytics and compliance automation.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              highlight={feature.highlight}
            />
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-2xl p-8 mb-16 border border-primary/20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%+</div>
              <div className="text-sm text-muted-foreground">Processing Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">87%</div>
              <div className="text-sm text-muted-foreground">Faster Processing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-2">$47K+</div>
              <div className="text-sm text-muted-foreground">Additional Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">42%</div>
              <div className="text-sm text-muted-foreground">Denial Reduction</div>
            </div>
          </div>
        </div>

        {/* Integration Features */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold font-heading mb-6">
              Seamless <span className="text-primary">Integration</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with your existing healthcare systems and workflows without disruption. 
              Our platform integrates with major EHR systems, billing software, and healthcare databases.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <span className="text-foreground">Epic, Cerner, Allscripts Integration</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <span className="text-foreground">HL7 FHIR Compliance</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <span className="text-foreground">API-First Architecture</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <span className="text-foreground">Single Sign-On (SSO) Support</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-8">
            <h4 className="text-lg font-semibold mb-6 text-center">Integration Dashboard</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium">EHR Connection</span>
                </div>
                <span className="text-xs text-success">Active</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium">Billing System</span>
                </div>
                <span className="text-xs text-success">Synced</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-warning/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-warning" />
                  <span className="text-sm font-medium">API Monitoring</span>
                </div>
                <span className="text-xs text-warning">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};