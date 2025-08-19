import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Lock, 
  FileCheck, 
  Eye, 
  Server, 
  CheckCircle,
  AlertTriangle,
  Globe,
  Database
} from 'lucide-react';

const securityFeatures = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "HIPAA Compliance",
    description: "Full HIPAA compliance with encrypted data transmission, secure storage, and comprehensive audit trails.",
    certification: "HIPAA Compliant"
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "End-to-End Encryption",
    description: "256-bit AES encryption for data at rest and TLS 1.3 for data in transit. Zero-knowledge architecture.",
    certification: "AES-256"
  },
  {
    icon: <FileCheck className="w-6 h-6" />,
    title: "SOC 2 Type II",
    description: "Independently audited security controls ensuring the highest standards of data protection.",
    certification: "SOC 2 Type II"
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Audit Trails",
    description: "Comprehensive logging and monitoring of all system access and data modifications with immutable records.",
    certification: "Audit Ready"
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Infrastructure Security",
    description: "Multi-region deployment with redundancy, DDoS protection, and 99.9% uptime guarantee.",
    certification: "Enterprise Grade"
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Data Residency",
    description: "Configurable data residency options with localized storage to meet regional compliance requirements.",
    certification: "Compliant"
  }
];

const certifications = [
  { name: "HIPAA", description: "Health Insurance Portability and Accountability Act" },
  { name: "SOC 2 Type II", description: "Security & Availability Trust Services" },
  { name: "ISO 27001", description: "Information Security Management" },
  { name: "HL7 FHIR", description: "Healthcare Interoperability Standards" },
  { name: "HITECH", description: "Health Information Technology Act" },
  { name: "BAA", description: "Business Associate Agreement Ready" }
];

export const SecuritySection = () => {
  return (
    <section id="security" className="py-20 px-6 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Security & Compliance</Badge>
          <h2 className="text-4xl font-bold font-heading mb-6 text-foreground">
            Enterprise-Grade <span className="text-primary">Security</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Healthcare data requires the highest level of protection. Our security-first architecture 
            ensures your patient data and revenue information is always protected and compliant.
          </p>
        </div>

        {/* Security Highlights */}
        <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-2xl p-8 mb-16 border border-primary/20">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">256-bit</div>
              <div className="text-sm text-muted-foreground">AES Encryption</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Security Monitoring</div>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <div className="text-primary">{feature.icon}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {feature.certification}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Compliance Certifications */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold font-heading mb-4 text-foreground">
              Compliance Certifications
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Independently verified compliance with healthcare industry standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{cert.name}</h4>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Practices */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">
              Security Best Practices
            </h3>
            <p className="text-muted-foreground">
              Our comprehensive approach to healthcare data security
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Multi-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Required for all user accounts with configurable policies</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Role-Based Access Control</h4>
                  <p className="text-sm text-muted-foreground">Granular permissions based on job functions and responsibilities</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Regular Security Audits</h4>
                  <p className="text-sm text-muted-foreground">Third-party penetration testing and vulnerability assessments</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Data Backup & Recovery</h4>
                  <p className="text-sm text-muted-foreground">Automated backups with point-in-time recovery capabilities</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Network Security</h4>
                  <p className="text-sm text-muted-foreground">VPN access, firewall protection, and intrusion detection</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Incident Response</h4>
                  <p className="text-sm text-muted-foreground">24/7 security operations center with rapid response protocols</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};