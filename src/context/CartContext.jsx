import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';
import { couponCodes } from '../data/restaurantData';

const CartContext = createContext();

const CART_STORAGE_KEY = 'savoria_luxe_cart_v1';
const FREE_DELIVERY_THRESHOLD = 40.00;
const STANDARD_DELIVERY_FEE = 4.99;
const TAX_RATE = 0.08; // 8%

export function CartProvider({ children }) {
  const { addToast } = useToast();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from storage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [flyingItems, setFlyingItems] = useState([]);
  const [cartBounce, setCartBounce] = useState(false);

  // Save cart to local storage whenever cartItems change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [cartItems]);

  // Trigger bounce effect on cart icon
  const triggerCartBounce = useCallback(() => {
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 600);
  }, []);

  // Add Item to Cart (with optional click event coordinates for fly animation)
  const addToCart = useCallback((item, event = null) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    triggerCartBounce();
    addToast(`Added "${item.name}" to cart! 🍽️`, 'success', 2500);

    // Trigger Fly-to-Cart animation if coordinates are available
    if (event && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      const flyId = Date.now() + Math.random().toString(36).substring(2, 7);
      
      const newFlyingItem = {
        id: flyId,
        image: item.image,
        startX: rect.left + rect.width / 2,
        startY: rect.top + rect.height / 2,
      };

      setFlyingItems((prev) => [...prev, newFlyingItem]);
    }
  }, [addToast, triggerCartBounce]);

  const removeFlyingItem = useCallback((id) => {
    setFlyingItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Remove Item
  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => {
      const itemToRemove = prev.find((i) => i.id === id);
      if (itemToRemove) {
        addToast(`Removed "${itemToRemove.name}" from cart`, 'info', 2000);
      }
      return prev.filter((i) => i.id !== id);
    });
  }, [addToast]);

  // Update Quantity (+1 or -1)
  const updateQuantity = useCallback((id, delta) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
    triggerCartBounce();
  }, [triggerCartBounce]);

  // Clear Cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedCoupon(null);
  }, []);

  // Apply Coupon Code
  const applyCoupon = useCallback((code) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = couponCodes[cleanCode];

    if (coupon) {
      setAppliedCoupon({ code: cleanCode, ...coupon });
      addToast(`Promo code "${cleanCode}" applied! 🎉`, 'success', 3000);
      return { success: true, message: coupon.label };
    } else {
      addToast('Invalid coupon code. Try TASTY20 or BURGER30', 'error', 3000);
      return { success: false, message: 'Invalid promo code' };
    }
  }, [addToast]);

  // Remove Coupon
  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    addToast('Promo code removed', 'info', 2000);
  }, [addToast]);

  // Calculations
  const calculations = useMemo(() => {
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce(
      (sum, item) => sum + (item.price || item.dealPrice || 0) * item.quantity,
      0
    );

    const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0;
    const deliveryFee = isFreeDelivery ? 0 : STANDARD_DELIVERY_FEE;
    const taxAmount = subtotal * TAX_RATE;

    let discountAmount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percent') {
        discountAmount = (subtotal * appliedCoupon.discount) / 100;
      } else if (appliedCoupon.type === 'fixed') {
        discountAmount = Math.min(appliedCoupon.discount, subtotal);
      }
    }

    const finalTotal = Math.max(0, subtotal + deliveryFee + taxAmount - discountAmount);

    const freeDeliveryProgress = Math.min(
      100,
      (subtotal / FREE_DELIVERY_THRESHOLD) * 100
    );
    const amountNeededForFreeDelivery = Math.max(
      0,
      FREE_DELIVERY_THRESHOLD - subtotal
    );

    return {
      itemCount,
      subtotal,
      deliveryFee,
      taxAmount,
      discountAmount,
      finalTotal,
      isFreeDelivery,
      freeDeliveryProgress,
      amountNeededForFreeDelivery,
      freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
    };
  }, [cartItems, appliedCoupon]);

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    appliedCoupon,
    cartBounce,
    flyingItems,
    removeFlyingItem,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    ...calculations,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
