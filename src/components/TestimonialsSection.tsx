import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Chief Medical Officer",
    company: "Metropolitan General Hospital",
    avatar: "/placeholder.svg",
    rating: 5,
    content: "HealthAI transformed our revenue cycle management completely. We've seen a 47% increase in revenue and 89% reduction in claim denials. The AI-powered insights are incredibly accurate."
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "VP of Finance",
    company: "Regional Healthcare System",
    avatar: "/placeholder.svg",
    rating: 5,
    content: "The ROI was immediate. Within 3 months, we recovered $2.3M in previously lost revenue. The automated compliance checking alone saved us countless hours and potential penalties."
  },
  {
    id: 3,
    name: "Dr. Jennifer Park",
    role: "Medical Director",
    company: "City Medical Center",
    avatar: "/placeholder.svg",
    rating: 5,
    content: "Implementation was seamless and the support team is exceptional. The predictive analytics help us identify revenue opportunities we never knew existed. Absolutely game-changing."
  },
  {
    id: 4,
    name: "Robert Thompson",
    role: "CEO",
    company: "Healthcare Partners Network",
    avatar: "/placeholder.svg",
    rating: 5,
    content: "HealthAI's fraud detection capabilities saved us over $500K in the first year alone. The real-time processing and insights have revolutionized how we approach revenue management."
  }
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 px-6 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-heading mb-4 text-foreground">
            Trusted by <span className="text-primary">Healthcare Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See why Fortune 500 hospitals and healthcare systems choose HealthAI for their revenue management
          </p>
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Healthcare Partners</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">$47M+</div>
            <div className="text-sm text-muted-foreground">Revenue Recovered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-2">94.3%</div>
            <div className="text-sm text-muted-foreground">Processing Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-primary">{testimonial.company}</p>
                  </div>
                  <Quote className="w-8 h-8 text-muted-foreground/30" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  "{testimonial.content}"
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-8 text-foreground">Certified & Compliant</h3>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
            <div className="bg-card border border-border rounded-lg px-6 py-3">
              <span className="font-semibold text-sm">HIPAA Compliant</span>
            </div>
            <div className="bg-card border border-border rounded-lg px-6 py-3">
              <span className="font-semibold text-sm">SOC 2 Type II</span>
            </div>
            <div className="bg-card border border-border rounded-lg px-6 py-3">
              <span className="font-semibold text-sm">ISO 27001</span>
            </div>
            <div className="bg-card border border-border rounded-lg px-6 py-3">
              <span className="font-semibold text-sm">HL7 FHIR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};