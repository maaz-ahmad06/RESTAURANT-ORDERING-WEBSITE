import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FiPlus, FiMinus, FiStar, FiClock } from 'react-icons/fi';
import { GiChiliPepper, GiLeafSwirl, GiFlame } from 'react-icons/gi';

export default function FoodCard({ item }) {
  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartItem = cartItems.find((i) => i.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e) => {
    addToCart(item, e);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group relative bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-brand-500/50 shadow-xl hover:shadow-2xl hover:shadow-brand-500/10 flex flex-col justify-between transition-all duration-300"
    >
      {/* Image Container with Badges */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-zinc-950">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Ambient Dark Gradient on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Veg / Non-Veg Indicator */}
          <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-md">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                item.isVeg ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'
              }`}
            />
            <span className="text-[11px] font-semibold tracking-wide uppercase text-zinc-200">
              {item.isVeg ? 'Veg' : 'Non-Veg'}
            </span>
          </div>

          {/* Best Seller / Spicy Badges */}
          <div className="flex items-center gap-1.5">
            {item.isBestSeller && (
              <span className="bg-gradient-to-r from-amber-500 to-brand-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg shadow-brand-500/30">
                ★ Best Seller
              </span>
            )}
            {item.isSpicy && (
              <span className="bg-red-950/80 border border-red-500/40 text-red-400 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <GiFlame className="w-3.5 h-3.5 text-red-500" />
                Spicy
              </span>
            )}
          </div>
        </div>

        {/* Bottom image overlay stats: Rating & Prep Time */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
            <FiStar className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-white">{item.rating}</span>
            <span className="text-zinc-400 text-[10px]">({item.reviewsCount})</span>
          </div>

          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 text-zinc-300">
            <FiClock className="w-3 h-3 text-brand-400" />
            <span>{item.prepTime}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {item.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-wider uppercase font-medium px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
              >
                {tag}
              </span>
            ))}
            {item.calories && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {item.calories}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-zinc-100 group-hover:text-amber-400 transition-colors line-clamp-1">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed font-light">
            {item.description}
          </p>
        </div>

        {/* Footer: Price and Add to Cart / Quantity Selector */}
        <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500">
              Price
            </span>
            <span className="text-xl font-bold font-sans text-brand-400">
              ${item.price.toFixed(2)}
            </span>
          </div>

          {/* Action Button / Quantity Controls */}
          {quantity === 0 ? (
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleAdd}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-brand-500/20 transition-all duration-200"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add to Cart</span>
            </motion.button>
          ) : (
            <div className="flex items-center gap-2 bg-zinc-800 border border-brand-500/50 rounded-xl p-1 shadow-lg shadow-brand-500/10">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="w-7 h-7 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white flex items-center justify-center transition-colors"
                aria-label="Decrease quantity"
              >
                <FiMinus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-sm text-brand-300 w-5 text-center">
                {quantity}
              </span>
              <button
                onClick={(e) => handleAdd(e)}
                className="w-7 h-7 rounded-lg bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white flex items-center justify-center transition-colors"
                aria-label="Increase quantity"
              >
                <FiPlus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
