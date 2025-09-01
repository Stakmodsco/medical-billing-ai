import { Navigation } from '@/components/Navigation';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import contactBackground from '@/assets/contact-background.jpg';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${contactBackground})` }}
      />
      <div className="relative z-10">
        <Navigation />
        <div className="pt-16">
          <ContactForm />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;