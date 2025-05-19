
import React from 'react';

const Map = () => {
  return (
    <section className="section-padding pt-0">
      <div className="container mx-auto">
        <div className="dark-card p-0 overflow-hidden">
          <div className="h-96 w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425908446615!3d40.74076904379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1622209733971!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{border: 0}} 
              loading="lazy"
              title="Creado office location"
            ></iframe>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Head Office</h3>
              <p className="text-gray-400">
                123 Design Street<br />
                Creative City, CD 12345<br />
                United States
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
              <p className="text-gray-400">
                Phone: <a href="tel:+1234567890" className="text-gold hover:underline">+1 (234) 567-890</a><br />
                Email: <a href="mailto:hello@creado.com" className="text-gold hover:underline">hello@creado.com</a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
              <p className="text-gray-400">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
