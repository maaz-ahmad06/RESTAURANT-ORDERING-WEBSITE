import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FiTag, FiCheck, FiShoppingBag, FiClock } from 'react-icons/fi';
import { GiFireBowl } from 'react-icons/gi';

export default function DealCard({ deal }) {
  const { addToCart } = useCart();

  const handleAddDeal = (e) => {
    // Treat deal as cart item
    addToCart(
      {
        id: deal.id,
        name: deal.title,
        price: deal.dealPrice,
        image: deal.image,
        isVeg: false,
        category: 'deals',
      },
      e
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-brand-500/30 hover:border-brand-500/80 shadow-2xl hover:shadow-brand-500/20 flex flex-col justify-between group"
    >
      {/* Background Image Header */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden">
        <img
          src={deal.image}
          alt={deal.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/40 to-transparent" />

        {/* Pulse Glow Discount Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-brand-600 text-white font-extrabold text-xs uppercase px-3 py-1.5 rounded-full shadow-lg shadow-red-500/40 animate-pulse">
            <GiFireBowl className="w-4 h-4" />
            {deal.badge}
          </span>
        </div>

        {/* Timer Expiry Tag */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1 text-[11px] text-amber-300 font-medium">
          <FiClock className="w-3 h-3 text-amber-400" />
          <span>{deal.expiry}</span>
        </div>

        {/* Coupon Code Pill */}
        <div className="absolute bottom-3 left-4 bg-zinc-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-500/40 text-[11px] text-amber-300 font-mono flex items-center gap-1.5">
          <FiTag className="w-3 h-3 text-brand-400" />
          <span>Use Code: <strong>{deal.couponCode}</strong></span>
        </div>
      </div>

      {/* Deal Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
            {deal.title}
          </h3>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-light">
            {deal.description}
          </p>

          {/* Included Items Checklist */}
          <div className="mt-4 space-y-1.5 bg-zinc-900/60 p-3 rounded-xl border border-white/5">
            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-1">
              Bundle Includes:
            </div>
            {deal.itemsIncluded?.map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-zinc-300">
                <span className="w-4 h-4 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-[10px]">
                  ✓
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-500 line-through">
              ${deal.originalPrice.toFixed(2)}
            </div>
            <div className="text-2xl font-bold font-sans text-brand-400">
              ${deal.dealPrice.toFixed(2)}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddDeal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-brand-500/30 transition-all duration-200"
          >
            <FiShoppingBag className="w-4 h-4" />
            <span>Claim Combo</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
