import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useCart } from '../context/CartContext';
import {
  FiShoppingBag,
  FiMenu,
  FiX,
  FiPhoneCall,
  FiCalendar,
  FiCompass,
} from 'react-icons/fi';
import { GiChefToque, GiSparkles } from 'react-icons/gi';

export default function Navbar() {
  const { isScrolled } = useScrollPosition();
  const { itemCount, setIsCartOpen, cartBounce } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About Us', path: '/about' },
    { name: 'Reservation', path: '/reservation' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0c]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform duration-300">
              <GiChefToque className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-100 via-white to-amber-300 bg-clip-text text-transparent group-hover:from-brand-300 group-hover:to-amber-200 transition-colors">
                SAVORIA LUXE
              </div>
              <p className="text-[10px] tracking-[0.25em] text-zinc-400 font-sans uppercase -mt-0.5">
                Artisan Dining
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-zinc-900/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                    active
                      ? 'text-white'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-gradient-to-r from-brand-600 to-amber-600 rounded-full shadow-md shadow-brand-600/30 -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Table Reservation CTA (Desktop) */}
            <Link
              to="/reservation"
              className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/60 rounded-full transition-all duration-200"
            >
              <FiCalendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Book Table</span>
            </Link>

            {/* Cart Button with Bouncing Badge */}
            <motion.button
              id="navbar-cart-button"
              onClick={() => setIsCartOpen(true)}
              animate={cartBounce ? { scale: [1, 1.25, 0.9, 1.15, 1] } : {}}
              transition={{ duration: 0.5 }}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-brand-500/25 transition-all duration-200 active:scale-95"
              aria-label="View Shopping Cart"
            >
              <FiShoppingBag className="w-5 h-5 text-white" />
              <span className="hidden sm:inline">Cart</span>

              {/* Animated Count Badge */}
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="min-w-[20px] h-5 px-1.5 text-[11px] font-bold bg-white text-brand-700 rounded-full flex items-center justify-center shadow-md -mr-1"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-700/80 text-zinc-200 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6 text-brand-400" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-zinc-950 border-l border-zinc-800/80 z-50 p-6 flex flex-col justify-between md:hidden shadow-2xl"
            >
              <div>
                {/* Header in drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
                      <GiChefToque className="w-5 h-5" />
                    </div>
                    <span className="font-serif font-bold text-lg text-white">
                      SAVORIA LUXE
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-zinc-400 hover:text-white rounded-lg"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Staggered Navigation Links */}
                <div className="py-6 flex flex-col gap-2">
                  {navLinks.map((link, idx) => {
                    const active = isActive(link.path);
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.06 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium text-base transition-colors ${
                            active
                              ? 'bg-gradient-to-r from-brand-600 to-amber-600 text-white font-semibold shadow-lg shadow-brand-600/30'
                              : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                          }`}
                        >
                          <span>{link.name}</span>
                          {active && <GiSparkles className="w-4 h-4 text-amber-200" />}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick Contact & Book Button */}
              <div className="pt-6 border-t border-zinc-800/80 space-y-3">
                <Link
                  to="/reservation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-brand-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20"
                >
                  <FiCalendar className="w-4 h-4" />
                  <span>Book Table Online</span>
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 pt-2">
                  <FiPhoneCall className="w-3.5 h-3.5 text-brand-400" />
                  <span>Call Us: +1 (800) 555-FOOD</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
