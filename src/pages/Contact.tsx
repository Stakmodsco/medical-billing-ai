import { Navigation } from '@/components/Navigation';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;