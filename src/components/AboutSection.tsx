import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Award, 
  Globe, 
  Shield, 
  TrendingUp, 
  Target,
  Brain,
  Stethoscope,
  Building2,
  Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: "Dr. Alex Chen",
    role: "CEO & Co-Founder",
    background: "Former Chief Medical Officer at Johns Hopkins",
    expertise: "Healthcare Operations, AI Strategy",
    icon: <Stethoscope className="w-5 h-5" />
  },
  {
    name: "Sarah Martinez",
    role: "CTO & Co-Founder", 
    background: "Ex-Google AI, 15+ years in machine learning",
    expertise: "AI/ML Engineering, Healthcare Tech",
    icon: <Brain className="w-5 h-5" />
  },
  {
    name: "Michael Foster",
    role: "VP of Revenue Operations",
    background: "Former VP at Epic Systems",
    expertise: "Revenue Cycle Management, Healthcare Finance",
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    name: "Dr. Jennifer Liu",
    role: "Chief Medical Advisor",
    background: "Practicing physician, Mayo Clinic",
    expertise: "Clinical Operations, Patient Care",
    icon: <Shield className="w-5 h-5" />
  }
];

const companyStats = [
  { icon: <Users className="w-6 h-6" />, value: "500+", label: "Healthcare Partners" },
  { icon: <Globe className="w-6 h-6" />, value: "50+", label: "States Served" },
  { icon: <Award className="w-6 h-6" />, value: "$47M+", label: "Revenue Recovered" },
  { icon: <Building2 className="w-6 h-6" />, value: "15", label: "Fortune 500 Clients" }
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Company Overview */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">About HealthAI</Badge>
          <h2 className="text-4xl font-bold font-heading mb-6 text-foreground">
            Revolutionizing Healthcare <span className="text-primary">Revenue Management</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Founded by healthcare professionals and AI experts, HealthAI combines deep medical expertise 
            with cutting-edge artificial intelligence to solve the most complex revenue challenges facing 
            modern healthcare organizations.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                To empower healthcare organizations with AI-driven revenue optimization that not only 
                maximizes financial performance but also improves patient care outcomes. We believe 
                that better revenue management leads to better healthcare for everyone.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Rocket className="w-6 h-6 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                To become the global standard for healthcare revenue intelligence, enabling healthcare 
                systems worldwide to focus on what matters most - providing exceptional patient care 
                while maintaining financial sustainability.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {companyStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-primary">{stat.icon}</div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold font-heading mb-4 text-foreground">
              Leadership Team
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Healthcare and technology veterans dedicated to transforming revenue management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary">{member.icon}</div>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">{member.background}</p>
                  <Badge variant="outline" className="text-xs">
                    {member.expertise}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-muted/20 rounded-2xl p-8 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold font-heading mb-4 text-foreground">
              Our Core Values
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Patient-First</h4>
              <p className="text-sm text-muted-foreground">
                Every decision we make prioritizes patient care and health outcomes
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-success" />
              </div>
              <h4 className="font-semibold mb-2">Excellence</h4>
              <p className="text-sm text-muted-foreground">
                We strive for the highest standards in technology, service, and results
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-warning" />
              </div>
              <h4 className="font-semibold mb-2">Innovation</h4>
              <p className="text-sm text-muted-foreground">
                Continuous advancement through cutting-edge AI and machine learning
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Revenue Management?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of healthcare organizations already using HealthAI to optimize their revenue cycles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started Today
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};