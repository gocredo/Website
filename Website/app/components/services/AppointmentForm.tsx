
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const AppointmentForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage({
        type: 'success',
        text: 'Thank you! Your appointment request has been received. We will contact you shortly to confirm the details.'
      });
      setFormState({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        message: ''
      });
    }, 1500);
  };

  const services = [
    "Web Design & Development",
    "UX/UI Design",
    "Branding & Identity",
    "Mobile App Development",
    "Digital Marketing",
    "E-commerce Solutions"
  ];

  return (
    <section className="section-padding bg-dark-muted">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Schedule a <span className="clip-text">Consultation</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Ready to discuss your project? Schedule a free consultation with our team to explore how we can help you achieve your digital goals.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full bg-dark-card flex items-center justify-center mr-4 gold-border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Personalized Strategy</h3>
                  <p className="text-gray-400">We'll create a custom approach based on your specific needs and goals.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full bg-dark-card flex items-center justify-center mr-4 gold-border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Quick Response</h3>
                  <p className="text-gray-400">We'll respond to your inquiry within 24 hours to schedule your consultation.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full bg-dark-card flex items-center justify-center mr-4 gold-border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">No Obligation</h3>
                  <p className="text-gray-400">Your initial consultation is completely free with no obligation.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="dark-card">
            <form onSubmit={handleSubmit}>
              {submitMessage && (
                <div className={`mb-6 p-4 rounded-md ${
                  submitMessage.type === 'success' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                }`}>
                  {submitMessage.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="bg-dark-light border-gray-600 focus:border-gold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="bg-dark-light border-gray-600 focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="bg-dark-light border-gray-600 focus:border-gold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service of Interest</Label>
                  <select
                    id="service"
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-dark-light border border-gray-600 rounded-md text-white focus:outline-none focus:border-gold"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6 space-y-2">
                <Label htmlFor="date">Preferred Date for Consultation</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formState.date}
                  onChange={handleChange}
                  required
                  className="bg-dark-light border-gray-600 focus:border-gold"
                />
              </div>

              <div className="mb-6 space-y-2">
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-dark-light border-gray-600 focus:border-gold"
                ></Textarea>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gold text-black font-medium rounded-md transition hover:bg-gold-light"
              >
                {isSubmitting ? 'Submitting...' : 'Schedule Consultation'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
