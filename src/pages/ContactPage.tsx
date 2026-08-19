import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact Us | Moveon Signs';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#FEFBF4] min-h-screen py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#294A3A]/60">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#294A3A]">
            Contact Moveon Signs
          </h1>
          <p className="text-sm text-[#294A3A]/80 max-w-md mx-auto">
            Have questions about custom branding, dimensions, or bulk orders across India? Send us a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 bg-[#F8F5EE] p-8 border border-[#294A3A]/15 space-y-6">
            <h2 className="font-serif text-2xl text-[#294A3A]">Studio Office</h2>
            <div className="space-y-4 text-xs font-sans text-[#294A3A]/80">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#294A3A] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#294A3A]">Moveon Signs Workshop</p>
                  <p>100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038, India</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#294A3A] flex-shrink-0" />
                <span>sales@moveonsigns.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#294A3A] flex-shrink-0" />
                <span>+91 98400 12345 / +91 80 4123 4567</span>
              </div>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-[#F8F5EE] p-8 border border-[#294A3A]/15 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#294A3A] mx-auto" />
                <h3 className="font-serif text-2xl text-[#294A3A]">MESSAGE RECEIVED</h3>
                <p className="text-xs text-[#294A3A]/80">
                  Thank you for reaching out! A member of our design team will reply to {email} within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#294A3A] font-bold mb-1">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rohan Sharma"
                    className="w-full bg-[#F8F5EE] border border-[#294A3A]/20 p-3.5 text-xs text-[#294A3A] outline-none rounded-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#294A3A] font-bold mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-[#F8F5EE] border border-[#294A3A]/20 p-3.5 text-xs text-[#294A3A] outline-none rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#294A3A] font-bold mb-1">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#F8F5EE] border border-[#294A3A]/20 p-3.5 text-xs text-[#294A3A] outline-none rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#294A3A] font-bold mb-1">
                    HOW CAN WE HELP?
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project, cafe location, or custom signage needs..."
                    className="w-full bg-[#F8F5EE] border border-[#294A3A]/20 p-3.5 text-xs text-[#294A3A] outline-none rounded-none resize-none"
                  />
                </div>

                <button type="submit" className="gw-button-primary w-full py-4 flex items-center justify-center space-x-2">
                  <span>SEND MESSAGE</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
