import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold font-heading text-foreground">Terms of Service</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">HealthAI Terms of Service</h2>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-muted-foreground mt-2">
            These Terms of Service ("Terms") govern your use of the HealthAI platform and services provided by HealthAI, Inc. ("HealthAI," "we," "our," or "us").
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By accessing or using HealthAI services, you agree to be bound by these Terms and our Privacy Policy. 
                If you disagree with any part of these terms, you may not access or use our services. 
                These Terms apply to all users, including healthcare professionals, administrators, and organizations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Service Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                HealthAI provides AI-powered healthcare revenue management solutions, including:
              </p>
              <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                <li>Automated claims processing and revenue cycle management</li>
                <li>AI-driven analytics and revenue optimization</li>
                <li>Fraud detection and compliance monitoring</li>
                <li>Predictive analytics and reporting tools</li>
                <li>Integration services with existing healthcare systems</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Account Security</h4>
                <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                  <li>Maintain confidentiality of login credentials</li>
                  <li>Use multi-factor authentication when required</li>
                  <li>Immediately report suspected security breaches</li>
                  <li>Ensure authorized personnel only have access</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Data Accuracy</h4>
                <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain data quality standards</li>
                  <li>Promptly update or correct inaccurate data</li>
                  <li>Comply with healthcare data standards and regulations</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Compliance</h4>
                <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                  <li>Comply with HIPAA and other applicable healthcare regulations</li>
                  <li>Maintain appropriate Business Associate Agreements</li>
                  <li>Follow your organization's policies and procedures</li>
                  <li>Use services only for lawful purposes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Prohibited Uses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">You may not use HealthAI services to:</p>
              <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Attempt unauthorized access to systems or data</li>
                <li>Introduce malware or harmful code</li>
                <li>Share login credentials with unauthorized parties</li>
                <li>Use services for non-healthcare related purposes</li>
                <li>Reverse engineer or attempt to extract source code</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data and Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Business Associate Agreement</h4>
                <p className="text-muted-foreground">
                  HealthAI serves as a Business Associate under HIPAA. We maintain appropriate safeguards 
                  for protected health information and comply with all applicable healthcare data protection requirements.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Data Ownership</h4>
                <p className="text-muted-foreground">
                  You retain ownership of your healthcare data. HealthAI processes this data solely to provide 
                  services and does not claim ownership. Anonymized, aggregated data may be used to improve 
                  our AI algorithms and services.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Data Security</h4>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures including encryption, access controls, 
                  and monitoring. However, no system is completely secure, and you acknowledge the inherent 
                  risks in electronic data transmission.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Uptime Commitment</h4>
                <p className="text-muted-foreground">
                  We strive to maintain 99.9% uptime for our services. Scheduled maintenance will be 
                  announced in advance when possible. Emergency maintenance may occur without notice.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Service Modifications</h4>
                <p className="text-muted-foreground">
                  We may modify, suspend, or discontinue services with reasonable notice. Critical 
                  changes affecting healthcare operations will have extended notice periods.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                HealthAI provides services "as is" without warranties. To the maximum extent permitted by law:
              </p>
              <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                <li>We disclaim all warranties, express or implied</li>
                <li>Our liability is limited to the amount paid for services</li>
                <li>We are not liable for indirect, consequential, or punitive damages</li>
                <li>Users are responsible for validating AI-generated recommendations</li>
                <li>Healthcare decisions remain the responsibility of licensed professionals</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Either party may terminate services with 30 days written notice. We may terminate 
                  immediately for breach of Terms or non-payment.
                </p>
                
                <div>
                  <h4 className="font-semibold mb-2">Data Return</h4>
                  <p className="text-muted-foreground">
                    Upon termination, we will provide data export capabilities for 90 days. 
                    After this period, data may be securely deleted in accordance with our retention policies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms of Service:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> legal@healthai.com</p>
                <p><strong>Phone:</strong> 1-800-HEALTH-AI</p>
                <p><strong>Address:</strong> HealthAI Legal Department, 123 Healthcare Way, Medical City, HC 12345</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;