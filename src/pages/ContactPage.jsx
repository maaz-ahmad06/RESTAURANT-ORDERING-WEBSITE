import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import { restaurantInfo } from '../data/restaurantData';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiChevronDown,
  FiCheckCircle,
  FiMessageSquare,
} from 'react-icons/fi';
import { GiChefToque, GiForkKnifeSpoon } from 'react-icons/gi';

export default function ContactPage() {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: 'Do you cater for special dietary requirements (Gluten-Free, Halal, Vegan)?',
      a: 'Absolutely. We maintain segregated prep stations for vegan, gluten-free, and allergen-sensitive dishes. Please notify your server or indicate your preferences in the checkout notes.',
    },
    {
      q: 'What is your delivery coverage radius and average time?',
      a: 'We deliver up to 15 miles from our central restaurant. Orders are dispatched in temperature-regulated insulated bags within 25 to 35 minutes.',
    },
    {
      q: 'Is valet parking available for dine-in guests?',
      a: 'Yes, complimentary premium valet parking is provided at our main entrance on Gourmet Boulevard for all dining and lounge reservations.',
    },
    {
      q: 'How do I arrange a private corporate banquet or VIP event?',
      a: 'You can book directly through our Table Reservation page by selecting "VIP Private Suite" or contact our events director directly at reservations@savorialuxe.com.',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      addToast('Please fill in all required fields.', 'error', 3000);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast('Your message has been received! Our concierge will reply within 2 hours.', 'success', 4000);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-zinc-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-bold tracking-wider uppercase">
            <FiMapPin className="w-4 h-4" />
            <span>Visit or Connect</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            We’d Love to Hear From You
          </h1>

          <p className="text-sm text-zinc-400 font-light">
            Have questions about a customized dining experience, private event, or delivery inquiry? Reach out to our team anytime.
          </p>
        </div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Col: Contact Information Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Info Cards */}
            <div className="bg-zinc-950/90 rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-6">
              <h3 className="font-serif text-xl font-bold text-white">
                Restaurant Concierge
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block text-[10px]">
                      Location Address
                    </span>
                    <span className="text-zinc-200 font-medium">{restaurantInfo.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block text-[10px]">
                      Direct Telephone & WhatsApp
                    </span>
                    <span className="text-zinc-200 font-medium block">{restaurantInfo.phone}</span>
                    <span className="text-brand-400 font-medium">{restaurantInfo.whatsapp} (Instant WhatsApp)</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block text-[10px]">
                      Email Enquiries
                    </span>
                    <span className="text-zinc-200 font-medium">{restaurantInfo.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiClock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase tracking-wider block text-[10px]">
                      Dining & Kitchen Hours
                    </span>
                    <div className="text-zinc-200 font-medium">
                      <div>Mon - Fri: {restaurantInfo.hours.weekdays}</div>
                      <div>Sat - Sun: {restaurantInfo.hours.weekends}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Frame */}
            <div className="rounded-3xl overflow-hidden border border-zinc-800 shadow-xl h-64 relative bg-zinc-900">
              <iframe
                title="Savoria Luxe Restaurant Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2155732948636!2d-73.98784492347134!3d40.75239997138766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25901a41279db%3A0xd68972e39e6a0d24!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Col: Contact Message Form (7 Cols) */}
          <div className="lg:col-span-7 bg-zinc-950/90 rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-xl">
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Send a Direct Inquiry
            </h3>
            <p className="text-xs text-zinc-400 mb-6 font-light">
              Our executive manager responds promptly to all culinary requests and feedback.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-brand-500"
                  >
                    <option value="General Inquiry">General Dining Inquiry</option>
                    <option value="Private Banquet">Private Banquet & Event</option>
                    <option value="Catering Order">Corporate Catering</option>
                    <option value="Chef Feedback">Chef Feedback & Compliments</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1 font-medium">
                  Your Message *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="How may we curate your experience today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Message...</span>
                  </div>
                ) : (
                  <>
                    <span>Send Message to Concierge</span>
                    <FiSend className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FAQ ACCORDION SECTION */}
        {/* ========================================================================= */}
        <div className="bg-zinc-950/90 rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-xl space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
            <h3 className="font-serif text-2xl font-bold text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Everything you need to know about our cuisine, reservation policies, and express doorstep delivery.
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-zinc-900/70 border border-zinc-800 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-zinc-850 transition-colors"
                  >
                    <span className="font-semibold text-sm text-zinc-200">{faq.q}</span>
                    <FiChevronDown
                      className={`w-4 h-4 text-brand-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-4 pb-4 pt-1 text-xs text-zinc-400 font-light leading-relaxed border-t border-zinc-800/60"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
