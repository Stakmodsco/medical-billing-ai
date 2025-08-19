import { Link } from 'react-router-dom';
import { Activity, Mail, Phone, MapPin, Twitter, Linkedin, Youtube } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold font-heading text-foreground">HealthAI</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Revolutionizing healthcare revenue management with AI-powered automation and intelligent analytics.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Youtube className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Solutions</h4>
            <ul className="space-y-4">
              <li><a href="#solutions" className="text-muted-foreground hover:text-foreground transition-colors">AI Processing</a></li>
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Revenue Analytics</a></li>
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Fraud Detection</a></li>
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Compliance Tools</a></li>
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Integration Hub</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Customers</a></li>
              <li><a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">Security</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">support@healthai.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">1-800-HEALTH-AI</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span className="text-muted-foreground">
                  123 Healthcare Way<br />
                  Medical City, HC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} HealthAI, Inc. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">
                Security
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};