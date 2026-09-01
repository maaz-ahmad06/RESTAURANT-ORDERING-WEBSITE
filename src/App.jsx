import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Providers
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';

// Components
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import FlyToCart from './components/FlyToCart';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ReservationPage from './pages/ReservationPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import ContactPage from './pages/ContactPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          
          {/* Culinary Preloader on initial site mount */}
          <AnimatePresence>
            {isLoading && (
              <Preloader onComplete={() => setIsLoading(false)} />
            )}
          </AnimatePresence>

          {/* Main Website App Container */}
          <div className="min-h-screen bg-[#0c0c0e] text-zinc-100 flex flex-col justify-between selection:bg-brand-500 selection:text-white">
            <Navbar />
            <FlyToCart />
            <CartDrawer />

            <main className="flex-1">
              <AnimatedRoutes />
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ToastProvider>
  );
}
