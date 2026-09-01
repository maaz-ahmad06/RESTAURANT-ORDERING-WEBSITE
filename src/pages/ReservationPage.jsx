import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useToast } from '../context/ToastContext';
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiPhone,
  FiMail,
  FiUsers,
  FiCheck,
  FiCheckCircle,
  FiInfo,
  FiX,
  FiMapPin,
} from 'react-icons/fi';
import { GiWineGlass, GiSparkles, GiChefToque } from 'react-icons/gi';

export default function ReservationPage() {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '07:30 PM',
    seatingZone: 'Rooftop Skyline',
    occasion: 'Anniversary / Date Night',
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);

  const seatingZones = [
    {
      id: 'Rooftop Skyline',
      name: 'Rooftop Skyline',
      desc: 'Panoramic city lights & open air lounge',
      extra: 'Recommended for evenings',
    },
    {
      id: 'Indoor Cozy Lounge',
      name: 'Indoor Cozy Lounge',
      desc: 'Velvet seating with ambient candle warmth',
      extra: 'Quiet & Intimate',
    },
    {
      id: 'Enchanted Garden',
      name: 'Enchanted Garden Patio',
      desc: 'Dine under fairy lights & olive foliage',
      extra: 'Romantic & Fresh',
    },
    {
      id: 'VIP Private Suite',
      name: 'VIP Private Dining Suite',
      desc: 'Dedicated sommelier & exclusive privacy',
      extra: 'Min 4 guests',
    },
  ];

  const timeSlots = [
    '12:30 PM',
    '01:30 PM',
    '02:30 PM',
    '06:00 PM',
    '07:00 PM',
    '07:30 PM',
    '08:30 PM',
    '09:30 PM',
  ];

  const occasions = [
    'Romantic Date Night',
    'Birthday Celebration',
    'Anniversary Dinner',
    'Corporate / Business Meeting',
    'Casual Gathering with Friends',
    'Family Reunion',
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      errs.email = 'Valid email is required';
    if (!formData.date) errs.date = 'Date is required';
    if (!formData.time) errs.time = 'Time slot is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please complete all required fields', 'error', 3000);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const bookingId = 'RES-' + Math.floor(100000 + Math.random() * 900000);
      const confirmation = {
        ...formData,
        bookingId,
        createdAt: new Date().toLocaleTimeString(),
      };
      setBookingConfirmation(confirmation);

      // Trigger Confetti Celebration!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ea580c', '#f59e0b', '#10b981', '#ffffff'],
      });

      addToast('Table reservation confirmed! We look forward to welcoming you.', 'success', 4000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-zinc-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <FiCalendar className="w-4 h-4 text-amber-400" />
            <span>Table Booking Service</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Reserve an Unforgettable Experience
          </h1>

          <p className="text-sm text-zinc-400 font-light">
            Secure your preferred seating area and let our culinary team tailor an exquisite
            evening for you and your guests.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-zinc-950/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Select Seating Area */}
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wider text-amber-300 mb-3">
                1. Select Atmosphere & Seating Area
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {seatingZones.map((zone) => {
                  const isSelected = formData.seatingZone === zone.id;
                  return (
                    <div
                      key={zone.id}
                      onClick={() => setFormData({ ...formData, seatingZone: zone.id })}
                      className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-brand-500/15 border-brand-500 shadow-lg shadow-brand-500/10'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-base text-white">
                          {zone.name}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center">
                            <FiCheck className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 font-light">{zone.desc}</p>
                      <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-amber-300">
                        {zone.extra}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Date, Time & Number of Guests */}
            <div className="pt-6 border-t border-zinc-850 space-y-6">
              <label className="block text-sm font-semibold uppercase tracking-wider text-amber-300">
                2. Guests, Date & Time Slot
              </label>

              {/* Guest Count Selector */}
              <div>
                <span className="text-xs text-zinc-400 block mb-2 font-medium">
                  Number of Guests:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({ ...formData, guests: num })}
                      className={`w-11 h-11 rounded-xl font-bold text-sm transition-all ${
                        formData.guests === num
                          ? 'bg-gradient-to-r from-brand-600 to-amber-600 text-white shadow-md shadow-brand-500/30 scale-105'
                          : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <span className="text-xs text-zinc-500 ml-2">
                    {formData.guests > 8 ? '(Private party setup)' : ''}
                  </span>
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 font-medium">
                    Reservation Date:
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={`w-full bg-zinc-900 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 ${
                        errors.date ? 'border-red-500' : 'border-zinc-800'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 font-medium">
                    Occasion (Optional):
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-brand-500"
                  >
                    {occasions.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slots Selector */}
              <div>
                <span className="text-xs text-zinc-400 block mb-2 font-medium">
                  Available Seating Time Slot:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = formData.time === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, time: slot })}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/30'
                            : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                        }`}
                      >
                        <FiClock className="w-3.5 h-3.5" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Guest Contact Information */}
            <div className="pt-6 border-t border-zinc-850 space-y-4">
              <label className="block text-sm font-semibold uppercase tracking-wider text-amber-300">
                3. Primary Guest Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Victoria Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-zinc-900 border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 ${
                      errors.name ? 'border-red-500' : 'border-zinc-800'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.name}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full bg-zinc-900 border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 ${
                      errors.phone ? 'border-red-500' : 'border-zinc-800'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.phone}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="victoria@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-zinc-900 border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 ${
                      errors.email ? 'border-red-500' : 'border-zinc-800'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.email}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1 font-medium">
                  Special Dietary or Seating Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Anniversary candle setup, gluten intolerance, window seat preference..."
                  value={formData.specialRequests}
                  onChange={(e) =>
                    setFormData({ ...formData, specialRequests: e.target.value })
                  }
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-brand-600 via-orange-500 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2 transition-all duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Securing Table...</span>
                  </div>
                ) : (
                  <>
                    <span>Confirm Table Reservation</span>
                    <FiCheckCircle className="w-5 h-5" />
                  </>
                )}
              </motion.button>
              <p className="text-center text-[11px] text-zinc-500 mt-3 font-light">
                No upfront reservation fee required. Free cancellation up to 2 hours prior.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {bookingConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-zinc-950 border border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-brand-500 via-amber-400 to-brand-500 shadow-[0_0_20px_#ea580c]" />

              <button
                onClick={() => setBookingConfirmation(null)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <FiCheck className="w-8 h-8" />
                </div>

                <h3 className="font-serif text-2xl font-bold text-white">
                  Reservation Confirmed!
                </h3>
                <p className="text-xs text-zinc-400">
                  Your table at Savoria Luxe has been reserved. A confirmation SMS & email
                  have been dispatched.
                </p>
              </div>

              {/* Booking Ticket Summary */}
              <div className="my-6 bg-zinc-900/90 rounded-2xl p-4 border border-zinc-800 space-y-2.5 text-xs">
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Booking Reference:</span>
                  <span className="text-brand-400 font-mono font-bold text-sm">
                    {bookingConfirmation.bookingId}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Guest Name:</span>
                  <span className="text-white font-medium">{bookingConfirmation.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Date & Time:</span>
                  <span className="text-amber-300 font-medium">
                    {bookingConfirmation.date} at {bookingConfirmation.time}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Party Size:</span>
                  <span className="text-white font-medium">{bookingConfirmation.guests} Guests</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Seating Atmosphere:</span>
                  <span className="text-white font-medium">{bookingConfirmation.seatingZone}</span>
                </div>

                {bookingConfirmation.occasion && (
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Occasion:</span>
                    <span className="text-white font-medium">{bookingConfirmation.occasion}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => setBookingConfirmation(null)}
                className="w-full py-3 bg-gradient-to-r from-brand-600 to-amber-600 text-white font-semibold rounded-xl text-sm shadow-md"
              >
                Close & Return
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
