import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
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
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold font-heading text-foreground">Privacy Policy</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">HealthAI Privacy Policy</h2>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-muted-foreground mt-2">
            This Privacy Policy describes how HealthAI ("we," "our," or "us") collects, uses, and protects your information when you use our healthcare revenue management platform.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                  <li>Name, email address, and contact information</li>
                  <li>Professional credentials and organization details</li>
                  <li>Account preferences and settings</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Healthcare Data</h4>
                <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                  <li>Patient billing and revenue cycle information (de-identified when possible)</li>
                  <li>Claims data and processing metrics</li>
                  <li>Financial and operational analytics</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Usage Information</h4>
                <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                  <li>Platform usage patterns and feature interactions</li>
                  <li>Performance metrics and system logs</li>
                  <li>Device and browser information</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>Provide and improve our healthcare revenue management services</li>
                <li>Process claims and generate revenue analytics</li>
                <li>Ensure platform security and prevent fraud</li>
                <li>Communicate important updates and support</li>
                <li>Comply with healthcare regulations and legal requirements</li>
                <li>Develop and enhance AI algorithms (using anonymized data)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Data Protection & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">HIPAA Compliance</h4>
                <p className="text-muted-foreground">
                  We maintain strict HIPAA compliance with comprehensive safeguards for protected health information (PHI). 
                  All healthcare data is encrypted, access-controlled, and audited.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Security Measures</h4>
                <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                  <li>256-bit AES encryption for data at rest</li>
                  <li>TLS 1.3 encryption for data in transit</li>
                  <li>Multi-factor authentication and role-based access</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>SOC 2 Type II compliance</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Data Retention</h4>
                <p className="text-muted-foreground">
                  We retain healthcare data only as long as necessary for service provision and legal compliance. 
                  Patient data retention follows HIPAA guidelines and your organization's policies.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We do not sell, trade, or rent your personal information. We may share information only in these limited circumstances:
              </p>
              <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations or court orders</li>
                <li>With trusted service providers under strict confidentiality agreements</li>
                <li>To protect the rights and safety of our users and the public</li>
                <li>In connection with a business transfer (with continued privacy protection)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate data</li>
                <li>Request deletion of your personal information (subject to legal requirements)</li>
                <li>Opt-out of non-essential communications</li>
                <li>Receive a copy of your data in a portable format</li>
                <li>File a complaint with relevant privacy authorities</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For privacy-related questions or to exercise your rights, contact our Data Protection Officer:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> privacy@healthai.com</p>
                <p><strong>Phone:</strong> 1-800-HEALTH-AI</p>
                <p><strong>Address:</strong> HealthAI Privacy Office, 123 Healthcare Way, Medical City, HC 12345</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Updates to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. 
                We will notify you of significant changes through email or prominent notices in our platform. 
                Your continued use of HealthAI after such notifications constitutes acceptance of the updated policy.
              </p>
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

export default PrivacyPolicy;