import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function FlyToCart() {
  const { flyingItems, removeFlyingItem } = useCart();

  // Approximate target location: top right navbar cart button
  const getTargetPosition = () => {
    const cartButton = document.getElementById('navbar-cart-button');
    if (cartButton) {
      const rect = cartButton.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
    // Fallback if not found
    return {
      x: window.innerWidth - 60,
      y: 35,
    };
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
      <AnimatePresence>
        {flyingItems.map((item) => {
          const target = getTargetPosition();
          const deltaX = target.x - item.startX;
          const deltaY = target.y - item.startY;

          return (
            <motion.div
              key={item.id}
              initial={{
                position: 'fixed',
                left: item.startX,
                top: item.startY,
                x: '-50%',
                y: '-50%',
                scale: 1,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                left: [item.startX, item.startX + deltaX * 0.4, target.x],
                top: [item.startY, item.startY - 60, target.y],
                scale: [1, 0.7, 0.2],
                opacity: [1, 0.9, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 0.75,
                ease: [0.4, 0, 0.2, 1],
              }}
              onAnimationComplete={() => removeFlyingItem(item.id)}
              className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-500 shadow-[0_0_20px_rgba(234,88,12,0.8)] bg-zinc-900"
            >
              <img
                src={item.image}
                alt="Flying Dish"
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
