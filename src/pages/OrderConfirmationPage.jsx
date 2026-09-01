import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiPhone,
  FiPrinter,
  FiShoppingBag,
  FiTruck,
  FiArrowRight,
  FiHome,
} from 'react-icons/fi';
import { GiChefToque, GiHotMeal, GiSparkles } from 'react-icons/gi';

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [trackingStep, setTrackingStep] = useState(2); // 1: Confirmed, 2: Cooking, 3: On The Way, 4: Delivered

  useEffect(() => {
    // Read last order from session storage
    const saved = sessionStorage.getItem('savoria_last_order');
    if (saved) {
      setOrder(JSON.parse(saved));
    }

    // Trigger Confetti Explosion
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#ea580c', '#f59e0b', '#10b981', '#ffffff', '#3b82f6'],
    });

    // Simulate progress tracker advance after 8 seconds
    const timer = setTimeout(() => {
      setTrackingStep(3);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const steps = [
    { id: 1, label: 'Order Confirmed', desc: 'Received by Kitchen' },
    { id: 2, label: 'Chef Preparing', desc: 'Crafting Fresh Dish' },
    { id: 3, label: 'Out for Delivery', desc: 'Express Rider En Route' },
    { id: 4, label: 'Delivered', desc: 'Bon Appétit' },
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-zinc-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Celebration Header */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 260 }}
          className="text-center space-y-4"
        >
          {/* Animated Checkmark Icon */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl"
            />
            <div className="w-full h-full rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-2xl shadow-emerald-500/30">
              <FiCheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <GiSparkles className="w-3.5 h-3.5" />
            Order Successfully Placed!
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
            Thank You for Dining with Savoria Luxe
          </h1>

          <p className="text-sm text-zinc-400 font-light max-w-md mx-auto">
            Your gourmet order is registered. Our culinary team has commenced preparing your
            dishes with the finest ingredients.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* LIVE ORDER STATUS TRACKER */}
        {/* ========================================================================= */}
        <div className="bg-zinc-950/90 rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">
                Order Tracking Reference
              </span>
              <div className="text-xl font-mono font-bold text-brand-400">
                {order?.orderId || 'SAV-849201'}
              </div>
            </div>

            <div className="flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 px-4 py-2 rounded-xl text-xs text-brand-300">
              <FiClock className="w-4 h-4 text-brand-400" />
              <span>
                Estimated Arrival: <strong>{order?.estimatedTime || '28 - 35 mins'}</strong>
              </span>
            </div>
          </div>

          {/* 4-Stage Progress Line */}
          <div className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {steps.map((s) => {
                const isComplete = s.id <= trackingStep;
                const isCurrent = s.id === trackingStep;
                return (
                  <div
                    key={s.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-brand-500/20 border-brand-500 shadow-lg shadow-brand-500/20'
                        : isComplete
                        ? 'bg-zinc-900 border-zinc-700/80 text-zinc-300'
                        : 'bg-zinc-950/40 border-zinc-850 opacity-40'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isComplete
                            ? 'bg-brand-500 text-white'
                            : 'bg-zinc-800 text-zinc-500'
                        }`}
                      >
                        {isComplete ? '✓' : s.id}
                      </div>
                      <span className="text-xs font-bold text-white">{s.label}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 pl-8">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DETAILED RECEIPT SUMMARY */}
        {/* ========================================================================= */}
        <div className="bg-zinc-950/90 rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <h3 className="font-serif text-lg font-bold text-white">Order Receipt Details</h3>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl text-xs font-semibold border border-zinc-700 transition-colors"
            >
              <FiPrinter className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
          </div>

          {/* Delivery & Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80">
            <div className="space-y-1">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">
                Delivering To:
              </span>
              <div className="text-white font-medium">
                {order?.customer?.fullName || 'Valued Guest'}
              </div>
              <div className="text-zinc-300">
                {order?.customer?.streetAddress || '742 Evergreen Terrace'}
                {order?.customer?.aptSuite ? `, ${order.customer.aptSuite}` : ''}
              </div>
              <div className="text-zinc-400">
                {order?.customer?.city || 'Metro City'}, {order?.customer?.postalCode || '10001'}
              </div>
              <div className="text-zinc-400">{order?.customer?.phone || '+1 555-0192'}</div>
            </div>

            <div className="space-y-1 sm:border-l sm:border-zinc-800 sm:pl-4">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">
                Order Information:
              </span>
              <div className="text-zinc-300">
                Method: <strong className="text-white capitalize">{order?.orderType || 'Delivery'}</strong>
              </div>
              <div className="text-zinc-300">
                Payment Mode: <strong className="text-white capitalize">{order?.paymentMethod === 'card' ? 'Credit Card (Paid)' : order?.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Digital Wallet'}</strong>
              </div>
              <div className="text-zinc-300">
                Placed At: <span className="text-white">{order?.placedAt || 'Just now'}</span>
              </div>
            </div>
          </div>

          {/* Items Breakdown */}
          <div className="space-y-3 pt-2">
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
              Items Ordered:
            </span>
            <div className="divide-y divide-zinc-850">
              {order?.items?.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover bg-zinc-900"
                    />
                    <div>
                      <div className="text-zinc-100 font-medium">{item.name}</div>
                      <span className="text-zinc-500 text-[11px]">
                        Qty: {item.quantity} × ${(item.price || item.dealPrice || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-white font-semibold">
                    ${((item.price || item.dealPrice || 0) * item.quantity).toFixed(2)}
                  </span>
                </div>
              )) || (
                <div className="text-xs text-zinc-400 italic py-2">
                  Sample: Wagyu Smoked Burger (2x), Truffle Fries (1x), Berry Mocktail (2x)
                </div>
              )}
            </div>
          </div>

          {/* Price Breakdown Footer */}
          <div className="pt-4 border-t border-zinc-800 space-y-1.5 text-xs text-zinc-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-zinc-200">${(order?.subtotal || 45.0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span className="text-zinc-200">${(order?.taxAmount || 3.6).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-zinc-200">
                {order?.deliveryFee === 0 ? 'FREE' : `$${(order?.deliveryFee || 0).toFixed(2)}`}
              </span>
            </div>
            {order?.discountAmount > 0 && (
              <div className="flex justify-between text-brand-400">
                <span>Discount Applied</span>
                <span>-${order.discountAmount.toFixed(2)}</span>
              </div>
            )}
            {order?.tipAmount > 0 && (
              <div className="flex justify-between text-amber-300">
                <span>Chef & Rider Tip</span>
                <span>+${order.tipAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
              <span>Total Paid / Due</span>
              <span className="text-xl text-brand-400 font-sans">
                ${(order?.grandTotal || 48.6).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/menu"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-bold rounded-full text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all"
          >
            <FiShoppingBag className="w-4 h-4" />
            <span>Order More Delicacies</span>
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold rounded-full text-sm border border-zinc-700/80 flex items-center justify-center gap-2 transition-all"
          >
            <FiHome className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
