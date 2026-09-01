import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import {
  FiTruck,
  FiShoppingBag,
  FiCreditCard,
  FiDollarSign,
  FiMapPin,
  FiPhone,
  FiUser,
  FiMail,
  FiCheck,
  FiAlertCircle,
  FiLock,
  FiArrowLeft,
  FiTag,
  FiSmile,
} from 'react-icons/fi';
import { GiChefToque, GiWallet } from 'react-icons/gi';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const {
    cartItems,
    subtotal,
    deliveryFee,
    taxAmount,
    discountAmount,
    finalTotal,
    appliedCoupon,
    clearCart,
  } = useCart();

  // Form State
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' | 'pickup'
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'cod' | 'wallet'
  const [tipPercentage, setTipPercentage] = useState(10); // 0 | 10 | 15 | 20

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    streetAddress: '',
    aptSuite: '',
    city: '',
    postalCode: '',
    deliveryNotes: '',
    cardNumber: '4532 •••• •••• 8892',
    cardExpiry: '12/28',
    cardCvc: '•••',
    cardHolder: '',
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(false);

  // Tip calculation
  const tipAmount = (subtotal * tipPercentage) / 100;
  const grandTotal = finalTotal + tipAmount;

  const validateForm = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      errs.email = 'Valid email is required';

    if (orderType === 'delivery') {
      if (!formData.streetAddress.trim()) errs.streetAddress = 'Street address is required';
      if (!formData.city.trim()) errs.city = 'City is required';
    }

    if (paymentMethod === 'card') {
      if (!formData.cardHolder.trim()) errs.cardHolder = 'Cardholder name is required';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setShakeTrigger(true);
      setTimeout(() => setShakeTrigger(false), 600);
      return false;
    }
    return true;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      addToast('Your bag is empty! Please add dishes before checkout.', 'error', 3000);
      navigate('/menu');
      return;
    }

    if (!validateForm()) {
      addToast('Please fill all highlighted required fields.', 'error', 3000);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const orderId = 'SAV-' + Math.floor(100000 + Math.random() * 900000);

      const completedOrder = {
        orderId,
        orderType,
        paymentMethod,
        items: cartItems,
        subtotal,
        deliveryFee: orderType === 'pickup' ? 0 : deliveryFee,
        taxAmount,
        discountAmount,
        tipAmount,
        grandTotal: orderType === 'pickup' ? grandTotal - deliveryFee : grandTotal,
        customer: formData,
        placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedTime: orderType === 'delivery' ? '28 - 35 mins' : '15 - 20 mins',
      };

      // Store in session storage for Order Confirmation Page
      sessionStorage.setItem('savoria_last_order', JSON.stringify(completedOrder));

      // Clear the cart
      clearCart();

      // Navigate to order confirmation
      navigate('/order-confirmation');
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0c0c0e] text-zinc-100 pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-brand-400 mb-4">
          <FiShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-white mb-2">Your Bag is Empty</h2>
        <p className="text-sm text-zinc-400 max-w-sm mb-6 font-light">
          Add some delicious gourmet dishes from our menu before proceeding to checkout.
        </p>
        <Link
          to="/menu"
          className="px-6 py-3 bg-gradient-to-r from-brand-600 to-amber-600 text-white font-semibold rounded-full text-sm shadow-lg shadow-brand-500/25"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-zinc-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header & Back Link */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Continue Browsing Menu</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <FiLock className="w-4 h-4 text-emerald-400" />
            <span>256-Bit SSL Encrypted & Secure Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ========================================================================= */}
          {/* LEFT: Checkout Form (8 Cols) */}
          {/* ========================================================================= */}
          <div className={`lg:col-span-7 xl:col-span-8 space-y-8 ${shakeTrigger ? 'animate-shake' : ''}`}>
            {/* 1. Order Type Toggle (Delivery vs Pickup) */}
            <div className="bg-zinc-950/90 rounded-3xl p-6 border border-zinc-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
                  Step 1: Order Method
                </span>
                <span className="text-xs text-zinc-400">
                  {orderType === 'delivery' ? 'Delivered to Door' : 'Express Pickup at Counter'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    orderType === 'delivery'
                      ? 'bg-gradient-to-r from-brand-600 to-amber-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <FiTruck className="w-4 h-4" />
                  <span>Express Delivery (30 mins)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    orderType === 'pickup'
                      ? 'bg-gradient-to-r from-brand-600 to-amber-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <FiShoppingBag className="w-4 h-4" />
                  <span>Curbside Pickup (15 mins)</span>
                </button>
              </div>
            </div>

            {/* 2. Customer Contact Information */}
            <div className="bg-zinc-950/90 rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-300 block">
                Step 2: Contact Information
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full bg-zinc-900 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 ${
                      errors.fullName ? 'border-red-500' : 'border-zinc-800'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[10px] text-red-400 mt-1 block">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full bg-zinc-900 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 ${
                      errors.phone ? 'border-red-500' : 'border-zinc-800'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[10px] text-red-400 mt-1 block">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium">
                    Email Receipt *
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-zinc-900 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 ${
                      errors.email ? 'border-red-500' : 'border-zinc-800'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[10px] text-red-400 mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Delivery Address (Only if Delivery Selected) */}
            <AnimatePresence>
              {orderType === 'delivery' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-zinc-950/90 rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-4 overflow-hidden"
                >
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-300 block">
                    Step 3: Delivery Address
                  </span>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1 font-medium">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        placeholder="742 Evergreen Terrace"
                        value={formData.streetAddress}
                        onChange={(e) =>
                          setFormData({ ...formData, streetAddress: e.target.value })
                        }
                        className={`w-full bg-zinc-900 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 ${
                          errors.streetAddress ? 'border-red-500' : 'border-zinc-800'
                        }`}
                      />
                      {errors.streetAddress && (
                        <span className="text-[10px] text-red-400 mt-1 block">
                          {errors.streetAddress}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1 font-medium">
                          Apt / Suite / Floor
                        </label>
                        <input
                          type="text"
                          placeholder="Apt 4B"
                          value={formData.aptSuite}
                          onChange={(e) =>
                            setFormData({ ...formData, aptSuite: e.target.value })
                          }
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-zinc-400 mb-1 font-medium">
                          City *
                        </label>
                        <input
                          type="text"
                          placeholder="Metro City"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          className={`w-full bg-zinc-900 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 ${
                            errors.city ? 'border-red-500' : 'border-zinc-800'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-zinc-400 mb-1 font-medium">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          placeholder="10001"
                          value={formData.postalCode}
                          onChange={(e) =>
                            setFormData({ ...formData, postalCode: e.target.value })
                          }
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1 font-medium">
                        Delivery Gate/Door Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Leave with concierge or ring bell 4"
                        value={formData.deliveryNotes}
                        onChange={(e) =>
                          setFormData({ ...formData, deliveryNotes: e.target.value })
                        }
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 4. Payment Method Selection */}
            <div className="bg-zinc-950/90 rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-6">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-300 block">
                Step 4: Payment Method
              </span>

              {/* Method Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'card', name: 'Credit / Debit Card', icon: FiCreditCard },
                  { id: 'cod', name: orderType === 'delivery' ? 'Cash on Delivery' : 'Pay at Counter', icon: FiDollarSign },
                  { id: 'wallet', name: 'Apple / Google Pay', icon: GiWallet },
                ].map((pay) => {
                  const isSelected = paymentMethod === pay.id;
                  const Icon = pay.icon;
                  return (
                    <div
                      key={pay.id}
                      onClick={() => setPaymentMethod(pay.id)}
                      className={`p-4 rounded-2xl cursor-pointer border transition-all flex flex-col items-center justify-center text-center gap-2 ${
                        isSelected
                          ? 'bg-brand-500/15 border-brand-500 shadow-lg shadow-brand-500/10 text-white'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-brand-400" />
                      <span className="text-xs font-semibold">{pay.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Card Form if Card selected */}
              {paymentMethod === 'card' && (
                <div className="pt-4 border-t border-zinc-850 space-y-4">
                  {/* Luxury Card Mockup */}
                  <div className="w-full max-w-sm mx-auto h-44 rounded-2xl p-5 bg-gradient-to-tr from-zinc-900 via-neutral-900 to-amber-950 border border-amber-500/40 shadow-2xl flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex justify-between items-center">
                      <span className="font-serif italic text-amber-300 font-bold">SAVORIA BLACK</span>
                      <div className="w-8 h-6 rounded bg-amber-500/30 border border-amber-400/50" />
                    </div>
                    <div className="font-mono text-base tracking-widest text-zinc-200">
                      {formData.cardNumber}
                    </div>
                    <div className="flex justify-between text-xs font-mono text-zinc-400">
                      <span>{formData.cardHolder || 'CARDHOLDER NAME'}</span>
                      <span>EXP: {formData.cardExpiry}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1 font-medium">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.cardHolder}
                        onChange={(e) =>
                          setFormData({ ...formData, cardHolder: e.target.value })
                        }
                        className={`w-full bg-zinc-900 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 ${
                          errors.cardHolder ? 'border-red-500' : 'border-zinc-800'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1 font-medium">
                        Security CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={formData.cardCvc}
                        onChange={(e) =>
                          setFormData({ ...formData, cardCvc: e.target.value })
                        }
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Driver / Chef Tip Selector */}
            <div className="bg-zinc-950/90 rounded-3xl p-6 border border-zinc-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
                  Gourmet Kitchen & Rider Tip
                </span>
                <span className="text-xs text-brand-400 font-semibold">
                  +${tipAmount.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-light">
                100% of tips are distributed directly to our chefs and delivery partners.
              </p>
              <div className="flex gap-2">
                {[0, 10, 15, 20].map((tip) => (
                  <button
                    key={tip}
                    type="button"
                    onClick={() => setTipPercentage(tip)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                      tipPercentage === tip
                        ? 'bg-amber-500 text-black font-bold'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {tip === 0 ? 'No Tip' : `${tip}%`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: Sticky Order Summary (4 Cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-28 space-y-6">
            <div className="bg-zinc-950/95 rounded-3xl p-6 border border-zinc-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <h3 className="font-serif text-lg font-bold text-white">Order Summary</h3>
                <span className="text-xs font-mono text-brand-400">
                  {cartItems.length} {cartItems.length === 1 ? 'Dish' : 'Dishes'}
                </span>
              </div>

              {/* Items Preview List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => {
                  const price = item.price || item.dealPrice || 0;
                  return (
                    <div key={item.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-9 h-9 rounded-lg object-cover bg-zinc-900"
                        />
                        <div>
                          <div className="text-zinc-200 font-medium line-clamp-1 max-w-[140px]">
                            {item.name}
                          </div>
                          <span className="text-zinc-500 text-[10px]">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="text-white font-mono font-medium">
                        ${(price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Calculations List */}
              <div className="space-y-2 text-xs text-zinc-400 pt-4 border-t border-zinc-850">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-200">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span className="text-zinc-200">${taxAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  {orderType === 'pickup' ? (
                    <span className="text-emerald-400 font-semibold">PICKUP ($0.00)</span>
                  ) : deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-semibold">FREE</span>
                  ) : (
                    <span className="text-zinc-200">${deliveryFee.toFixed(2)}</span>
                  )}
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-brand-400 font-semibold">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {tipAmount > 0 && (
                  <div className="flex justify-between text-amber-300">
                    <span>Kitchen & Rider Tip</span>
                    <span>+${tipAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-zinc-800">
                  <span>Grand Total</span>
                  <span className="text-2xl text-brand-400 font-sans">
                    ${(orderType === 'pickup' ? grandTotal - deliveryFee : grandTotal).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order CTA Button with Loading State */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={isProcessing}
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-gradient-to-r from-brand-600 via-orange-500 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2 transition-all duration-200"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Placing Gourmet Order...</span>
                  </div>
                ) : (
                  <>
                    <span>Place Order Now</span>
                    <FiCheck className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              <div className="text-center text-[10px] text-zinc-500">
                By ordering you agree to Savoria Luxe Terms of Dining Service.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
