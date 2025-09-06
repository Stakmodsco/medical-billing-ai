import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  HelpCircle, Search, BookOpen, Phone, Mail, MessageCircle,
  FileText, Video, Users, ExternalLink, ChevronRight, Star
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'billing' | 'security';
  popularity: number;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'video' | 'article' | 'interactive';
}

export const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I add a new patient to the system?',
      answer: 'To add a new patient, navigate to the Patient Management panel from the dashboard. Click the "Add New Patient" button and fill in the required information including personal details, insurance information, and emergency contacts. All required fields must be completed before saving.',
      category: 'general',
      popularity: 95
    },
    {
      id: '2',
      question: 'What should I do if a claim is denied?',
      answer: 'When a claim is denied, first review the denial reason in the claim details. Common reasons include missing information, incorrect coding, or authorization issues. Use the AI Claim Processor to analyze the denial and get suggestions for resubmission. You can also check the Prior Authorization Manager if pre-approval was required.',
      category: 'general',
      popularity: 88
    },
    {
      id: '3',
      question: 'How secure is patient data in the system?',
      answer: 'HealthAI uses enterprise-grade security measures including end-to-end encryption, HIPAA-compliant data handling, role-based access controls, and regular security audits. All data is encrypted both in transit and at rest. We maintain SOC 2 compliance and undergo regular penetration testing.',
      category: 'security',
      popularity: 92
    },
    {
      id: '4',
      question: 'Can I export analytics and reports?',
      answer: 'Yes, you can export analytics data in multiple formats (CSV, PDF, JSON) from the Advanced Analytics panel. Reports include revenue analytics, performance metrics, and compliance data. Custom date ranges and filtered exports are also available.',
      category: 'technical',
      popularity: 75
    },
    {
      id: '5',
      question: 'How does the AI claim processing work?',
      answer: 'Our AI system analyzes claims for completeness, accuracy, and compliance before submission. It checks medical codes, verifies patient information, identifies potential denials, and suggests optimizations. The AI learns from successful submissions to improve accuracy over time.',
      category: 'technical',
      popularity: 82
    },
    {
      id: '6',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, ACH transfers, and wire transfers. Enterprise customers can also set up net payment terms. All payments are processed securely through our encrypted payment system.',
      category: 'billing',
      popularity: 68
    }
  ];

  const tutorials: Tutorial[] = [
    {
      id: '1',
      title: 'Getting Started with HealthAI',
      description: 'Complete walkthrough of setting up your healthcare practice management system',
      duration: '15 min',
      difficulty: 'beginner',
      type: 'video'
    },
    {
      id: '2',
      title: 'Advanced Claim Processing',
      description: 'Learn to use AI-powered claim processing and optimization features',
      duration: '12 min',
      difficulty: 'intermediate',
      type: 'video'
    },
    {
      id: '3',
      title: 'Security and Compliance Setup',
      description: 'Configure HIPAA compliance and security settings for your practice',
      duration: '20 min',
      difficulty: 'advanced',
      type: 'article'
    },
    {
      id: '4',
      title: 'Analytics Dashboard Deep Dive',
      description: 'Master the analytics and reporting features for business insights',
      duration: '18 min',
      difficulty: 'intermediate',
      type: 'interactive'
    },
    {
      id: '5',
      title: 'Patient Management Best Practices',
      description: 'Efficient workflows for managing patient records and billing',
      duration: '10 min',
      difficulty: 'beginner',
      type: 'article'
    }
  ];

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: Tutorial['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-yellow-600';
      case 'advanced': return 'text-red-600';
    }
  };

  const getTypeIcon = (type: Tutorial['type']) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      case 'interactive': return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Help Center</h2>
          <p className="text-muted-foreground">
            Find answers, tutorials, and support for your healthcare platform
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
          <Button>
            <MessageCircle className="h-4 w-4 mr-2" />
            Live Chat
          </Button>
        </div>
      </div>

      {/* Search and Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search help articles, FAQs, and tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Quick Start Guide</h3>
                    <p className="text-sm text-muted-foreground">Get up and running in 5 minutes</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Video className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold">Video Tutorials</h3>
                    <p className="text-sm text-muted-foreground">Step-by-step walkthroughs</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-semibold">Common Issues</h3>
                    <p className="text-sm text-muted-foreground">Troubleshooting and fixes</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find quick answers to common questions about the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4 flex-wrap">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  All
                </Button>
                <Button
                  variant={selectedCategory === 'general' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('general')}
                >
                  General
                </Button>
                <Button
                  variant={selectedCategory === 'technical' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('technical')}
                >
                  Technical
                </Button>
                <Button
                  variant={selectedCategory === 'security' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('security')}
                >
                  Security
                </Button>
                <Button
                  variant={selectedCategory === 'billing' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('billing')}
                >
                  Billing
                </Button>
              </div>

              <Accordion type="single" collapsible className="space-y-2">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <span>{faq.question}</span>
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                        {faq.popularity > 90 && (
                          <Star className="h-3 w-3 text-yellow-500" />
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>
                Comprehensive tutorials and guides to master the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tutorials.map((tutorial) => (
                  <Card key={tutorial.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {getTypeIcon(tutorial.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{tutorial.title}</h3>
                            <Badge variant="outline" className={getDifficultyColor(tutorial.difficulty)}>
                              {tutorial.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {tutorial.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {tutorial.duration}
                            </span>
                            <Button size="sm" variant="outline">
                              Start Tutorial
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Options</CardTitle>
                <CardDescription>Multiple ways to get help when you need it</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                  <div>
                    <h4 className="font-semibold">Live Chat</h4>
                    <p className="text-sm text-muted-foreground">
                      Instant support from our team
                    </p>
                    <p className="text-xs text-green-600">Available now</p>
                  </div>
                  <Button size="sm" className="ml-auto">
                    Start Chat
                  </Button>
                </div>

                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <Mail className="h-8 w-8 text-green-600" />
                  <div>
                    <h4 className="font-semibold">Email Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Detailed assistance via email
                    </p>
                    <p className="text-xs text-muted-foreground">Response within 2 hours</p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto">
                    Send Email
                  </Button>
                </div>

                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <Phone className="h-8 w-8 text-purple-600" />
                  <div>
                    <h4 className="font-semibold">Phone Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Direct line to our experts
                    </p>
                    <p className="text-xs text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto">
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>We'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input placeholder="What can we help you with?" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <Textarea 
                      placeholder="Please describe your issue or question in detail..." 
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};