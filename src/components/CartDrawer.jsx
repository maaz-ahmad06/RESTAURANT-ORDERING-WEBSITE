import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  FiX,
  FiShoppingBag,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowRight,
  FiTag,
  FiTruck,
  FiCheckCircle,
} from 'react-icons/fi';
import { GiChefToque, GiKnifeFork } from 'react-icons/gi';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    taxAmount,
    discountAmount,
    finalTotal,
    isFreeDelivery,
    freeDeliveryProgress,
    amountNeededForFreeDelivery,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCart();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-[#0f0f12] border-l border-zinc-800 z-50 flex flex-col justify-between shadow-2xl overflow-hidden"
          >
            {/* 1. Header */}
            <div className="p-5 sm:p-6 border-b border-zinc-800 bg-zinc-950/60 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                  <FiShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                    Your Order Bag
                  </h2>
                  <p className="text-xs text-zinc-400">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-zinc-400 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-zinc-900"
                    title="Clear Cart"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Close cart"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 2. Free Delivery Progress Bar */}
            {cartItems.length > 0 && (
              <div className="px-6 py-3 bg-zinc-900/90 border-b border-zinc-800/80">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5 text-zinc-300 font-medium">
                    <FiTruck className="w-4 h-4 text-brand-400" />
                    {isFreeDelivery ? (
                      <span className="text-emerald-400 font-semibold">
                        🎉 You unlocked FREE Delivery!
                      </span>
                    ) : (
                      <span>
                        Add{' '}
                        <strong className="text-brand-400">
                          ${amountNeededForFreeDelivery.toFixed(2)}
                        </strong>{' '}
                        more for Free Delivery
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    {Math.round(freeDeliveryProgress)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      isFreeDelivery
                        ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]'
                        : 'bg-gradient-to-r from-amber-500 to-brand-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${freeDeliveryProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {/* 3. Items List / Empty State */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-4 shadow-inner">
                    <GiKnifeFork className="w-12 h-12 text-zinc-700 animate-bounce-subtle" />
                  </div>
                  <h3 className="text-lg font-bold font-serif text-white mb-1">
                    Your bag is hungry!
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-xs mb-6 font-light">
                    Explore our master-crafted artisanal menu and add your favorite dishes.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/menu');
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-medium text-sm rounded-full shadow-lg shadow-brand-500/25 transition-all duration-200"
                  >
                    Browse Gourmet Menu
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {cartItems.map((item) => {
                    const price = item.price || item.dealPrice || 0;
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-3.5 bg-zinc-900/80 p-3.5 rounded-2xl border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                      >
                        {/* Thumbnail */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover bg-zinc-950 flex-shrink-0"
                        />

                        {/* Info & Controls */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium text-sm text-zinc-100 line-clamp-1">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                              title="Remove item"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2 bg-zinc-800 rounded-lg p-1 border border-zinc-700">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 rounded bg-zinc-700 hover:bg-zinc-600 text-white flex items-center justify-center transition-colors"
                              >
                                <FiMinus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-white w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-6 h-6 rounded bg-brand-600 hover:bg-brand-500 text-white flex items-center justify-center transition-colors"
                              >
                                <FiPlus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Total per line */}
                            <div className="text-right">
                              <span className="text-xs text-zinc-400 block font-light">
                                ${(price).toFixed(2)} each
                              </span>
                              <span className="text-sm font-bold text-brand-400 font-sans">
                                ${(price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* 4. Footer & Summary */}
            {cartItems.length > 0 && (
              <div className="p-5 sm:p-6 bg-zinc-950 border-t border-zinc-800 space-y-4">
                {/* Coupon Code Section */}
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  {!appliedCoupon ? (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <FiTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Promo code (e.g. TASTY20)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 uppercase"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold transition-colors border border-zinc-700"
                      >
                        Apply
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-brand-500/10 border border-brand-500/40 p-2.5 rounded-xl text-xs text-brand-300">
                      <div className="flex items-center gap-2">
                        <FiCheckCircle className="w-4 h-4 text-brand-400" />
                        <span>
                          Code <strong>{appliedCoupon.code}</strong> ({appliedCoupon.label})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-red-400 hover:text-red-300 font-bold ml-2 underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </form>

                {/* Calculations Breakdown */}
                <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-900">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-zinc-200 font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Tax (8%)</span>
                    <span className="text-zinc-200 font-medium">${taxAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    {isFreeDelivery ? (
                      <span className="text-emerald-400 font-semibold">FREE</span>
                    ) : (
                      <span className="text-zinc-200 font-medium">${deliveryFee.toFixed(2)}</span>
                    )}
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-brand-400 font-medium">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                    <span>Total Amount</span>
                    <span className="text-xl text-brand-400 font-sans">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 bg-gradient-to-r from-brand-600 via-orange-500 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-bold text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-brand-500/25 transition-all duration-200"
                >
                  <span>Proceed to Checkout</span>
                  <FiArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
