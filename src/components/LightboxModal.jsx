import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function LightboxModal({ images, activeIndex, onClose, onNavigate }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((activeIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((activeIndex - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, images.length, onClose, onNavigate]);

  if (activeIndex === null || !images[activeIndex]) return null;

  const current = images[activeIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors"
          aria-label="Close Lightbox"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Prev Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((activeIndex - 1 + images.length) % images.length);
          }}
          className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white border border-white/10 transition-colors"
          aria-label="Previous Image"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((activeIndex + 1) % images.length);
          }}
          className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white border border-white/10 transition-colors"
          aria-label="Next Image"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>

        {/* Content Box */}
        <motion.div
          key={current.id || activeIndex}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl z-10 flex flex-col"
        >
          <div className="relative max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full max-h-[70vh] object-contain"
            />
          </div>

          <div className="p-6 bg-zinc-900 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-400 font-semibold">
                {current.category}
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-0.5">
                {current.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl font-light">
                {current.description}
              </p>
            </div>

            <div className="text-xs text-zinc-500 font-mono">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
