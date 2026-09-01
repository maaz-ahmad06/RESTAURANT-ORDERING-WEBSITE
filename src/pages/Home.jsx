import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  foodItems,
  dealsAndCombos,
  restaurantGallery,
  customerTestimonials,
  menuCategories,
} from '../data/restaurantData';
import FoodCard from '../components/FoodCard';
import DealCard from '../components/DealCard';
import LightboxModal from '../components/LightboxModal';
import {
  FiArrowRight,
  FiStar,
  FiCalendar,
  FiClock,
  FiShield,
  FiAward,
  FiTruck,
  FiSmile,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
} from 'react-icons/fi';
import { GiChefToque, GiForkKnifeSpoon, GiSparkles, GiFlame } from 'react-icons/gi';

export default function Home() {
  const navigate = useNavigate();

  // Selected Category tab in Homepage Menu Preview
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Testimonials Carousel state
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Lightbox Modal state for Ambience Gallery
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Filtered food items for preview
  const previewItems = foodItems
    .filter((item) =>
      selectedCategory === 'all' ? true : item.category === selectedCategory
    )
    .slice(0, 8);

  const nextTestimonial = () => {
    setTestimonialIdx((prev) => (prev + 1) % customerTestimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIdx(
      (prev) => (prev - 1 + customerTestimonials.length) % customerTestimonials.length
    );
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-zinc-100 overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Step 4) */}
      {/* ========================================================================= */}
      <section className="relative min-h-[100vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=2000&q=80"
            alt="Fine Dining Table"
            className="w-full h-full object-cover object-center scale-105 filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/70 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-600/15 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* VIP Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs sm:text-sm font-semibold tracking-wide"
            >
              <GiSparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>Award-Winning Artisanal Gastronomy</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold tracking-tight text-white leading-[1.1]">
              Elevate Your Senses with{' '}
              <span className="bg-gradient-to-r from-amber-200 via-brand-400 to-amber-500 bg-clip-text text-transparent italic">
                Culinary Artistry
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Indulge in master chef-crafted dry-aged cuts, hand-pulled pastas, and wood-fired delicacies. Express gourmet delivery to your doorstep or an unforgettable candlelit reservation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/menu"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-600 via-orange-500 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-bold text-base flex items-center justify-center gap-3 shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                <span>Explore Full Menu</span>
                <FiArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/reservation"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-base flex items-center justify-center gap-2 border border-zinc-700/80 hover:border-amber-500/50 transition-all duration-200"
              >
                <FiCalendar className="w-5 h-5 text-amber-400" />
                <span>Reserve a Table</span>
              </Link>
            </div>

            {/* Social Proof Stats */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-zinc-400 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Customer"
                      className="w-8 h-8 rounded-full border-2 border-zinc-900 object-cover"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center text-amber-400">
                    {'★★★★★'}
                    <span className="text-white font-bold ml-1">4.9 / 5</span>
                  </div>
                  <span className="text-[11px] text-zinc-400">12,000+ Happy Foodies</span>
                </div>
              </div>

              <div className="h-8 w-px bg-zinc-800 hidden sm:block" />

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center">
                  <FiTruck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-white font-semibold">30 Mins Express</div>
                  <span className="text-[11px] text-zinc-400">Piping Hot Delivery</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Floating Gourmet Hero Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Ambient Background Aura */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-brand-500/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Center Dish Container with Floating Animation */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-72 sm:w-88 md:w-96 aspect-square rounded-full p-3 bg-gradient-to-tr from-brand-600/40 via-amber-500/20 to-transparent border border-brand-500/30 shadow-2xl shadow-brand-500/30"
            >
              <img
                src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80"
                alt="Prime Ribeye Steak"
                className="w-full h-full object-cover rounded-full shadow-inner"
              />

              {/* Floating Badge 1: Chef Special */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:top-2 sm:-left-6 bg-zinc-900/95 backdrop-blur-xl p-3.5 rounded-2xl border border-brand-500/40 shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                  <GiFlame className="w-6 h-6 text-brand-500 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    Chef's Signature
                  </span>
                  <span className="text-xs font-bold text-white">USDA Prime Ribeye</span>
                </div>
              </motion.div>

              {/* Floating Badge 2: Organic Fresh */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -right-4 sm:bottom-4 sm:-right-6 bg-zinc-900/95 backdrop-blur-xl p-3.5 rounded-2xl border border-emerald-500/40 shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <FiAward className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                    100% Farm Fresh
                  </span>
                  <span className="text-xs font-bold text-white">Organic & Artisan</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OFFERS & COMBO DEALS SECTION (Step 10) */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-bold tracking-wider uppercase mb-3">
              <GiSparkles className="w-3.5 h-3.5" />
              <span>Exclusive Gastronomy Offers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Chef’s Curated Combo Feasts
            </h2>
            <p className="text-sm text-zinc-400 mt-2 font-light max-w-lg">
              Save up to 35% on multi-course bundles paired with artisanal mocktails.
            </p>
          </div>

          <Link
            to="/menu"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-amber-300 transition-colors group"
          >
            <span>View All Menu Deals</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dealsAndCombos.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MENU CATEGORIES & ITEMS PREVIEW (Step 5 & Step 6) */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase mb-3">
            <GiForkKnifeSpoon className="w-3.5 h-3.5" />
            <span>Discover Flavor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Explore Our Culinary Craft
          </h2>
          <p className="text-sm text-zinc-400 mt-2 font-light">
            Every dish is prepared fresh upon order using premium heirloom ingredients.
          </p>
        </div>

        {/* Category Tabs with Animated Underline Indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 hide-scrollbar">
          {menuCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-850 border border-zinc-800'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="homeCategoryIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-brand-600 to-amber-600 rounded-full shadow-lg shadow-brand-600/30 -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {previewItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Explore More Button */}
        <div className="mt-12 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-850 text-zinc-200 hover:text-white font-semibold text-sm border border-zinc-700/80 hover:border-brand-500/50 shadow-xl transition-all duration-200 group"
          >
            <span>Explore Complete 24+ Dish Menu</span>
            <FiArrowRight className="w-4 h-4 text-brand-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY CHOOSE US (Features Banner) */}
      {/* ========================================================================= */}
      <section className="py-16 bg-gradient-to-b from-zinc-950 via-[#101014] to-zinc-950 border-y border-zinc-850 my-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FiTruck,
                title: '30-Min Fast Gourmet',
                desc: 'Insulated thermal carriers preserve kitchen-fresh heat and crispness.',
              },
              {
                icon: GiChefToque,
                title: 'Master Chef Crafted',
                desc: 'Led by Michelin-starred culinary director Chef Alessandro Bellini.',
              },
              {
                icon: FiAward,
                title: '100% Organic Sourcing',
                desc: 'Ethically raised meats, wild seafood, and farm-to-fork produce.',
              },
              {
                icon: FiShield,
                title: '5-Star Kitchen Hygiene',
                desc: 'Stringent sterilization and tamper-proof culinary packaging.',
              },
            ].map((feat, i) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-zinc-900/60 border border-white/5 flex flex-col items-start hover:border-brand-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-500/15 text-brand-400 flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white font-serif mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. RESTAURANT AMBIENCE & GALLERY (Step 11) */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase mb-3">
              <FiEye className="w-3.5 h-3.5" />
              <span>Ambience & Craft</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              An Atmosphere of Pure Sophistication
            </h2>
            <p className="text-sm text-zinc-400 mt-2 font-light max-w-lg">
              Click any photo to immerse yourself in full-screen gallery view.
            </p>
          </div>

          <Link
            to="/about"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-amber-300 transition-colors group"
          >
            <span>Learn About Our Story</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurantGallery.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setLightboxIndex(idx)}
              className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group border border-zinc-800/80 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-400">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg font-bold text-white mt-0.5">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-300 line-clamp-1 mt-1 font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <LightboxModal
          images={restaurantGallery}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      </section>

      {/* ========================================================================= */}
      {/* 6. TABLE RESERVATION CTA BANNER (Step 12 preview) */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1600&q=80"
              alt="Rooftop dining"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider">
              <FiCalendar className="w-3.5 h-3.5" />
              Table Reservations
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              Reserve Your Table at the Rooftop or VIP Lounge
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              Whether celebrating an anniversary, hosting an intimate corporate dinner, or enjoying a candlelit date night, our sommelier and hospitality team await you.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/reservation"
                className="px-8 py-4 bg-gradient-to-r from-amber-500 via-brand-500 to-amber-600 hover:from-amber-400 hover:to-brand-400 text-white font-bold rounded-full text-sm sm:text-base shadow-xl shadow-brand-500/30 transition-all duration-200 flex items-center gap-2"
              >
                <span>Book a Table Now</span>
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CUSTOMER TESTIMONIALS SECTION (Step 13) */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold tracking-wider uppercase mb-3">
            <FiSmile className="w-3.5 h-3.5" />
            <span>Epicurean Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Loved by Connoisseurs & Critics
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-8 sm:p-12 rounded-3xl border border-zinc-800 shadow-2xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Star Rating */}
              <div className="flex justify-center text-amber-400 text-xl gap-1">
                {[...Array(customerTestimonials[testimonialIdx].rating)].map((_, i) => (
                  <FiStar key={i} className="fill-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-serif text-lg sm:text-2xl text-zinc-200 italic max-w-3xl mx-auto leading-relaxed">
                "{customerTestimonials[testimonialIdx].comment}"
              </p>

              {/* User Avatar & Details */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <img
                  src={customerTestimonials[testimonialIdx].avatar}
                  alt={customerTestimonials[testimonialIdx].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-500"
                />
                <div className="text-left">
                  <h4 className="font-bold text-sm text-white">
                    {customerTestimonials[testimonialIdx].name}
                  </h4>
                  <span className="text-xs text-zinc-400">
                    {customerTestimonials[testimonialIdx].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-zinc-850">
            <button
              onClick={prevTestimonial}
              className="p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
              aria-label="Previous review"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {customerTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === testimonialIdx ? 'w-8 bg-brand-500' : 'w-2 bg-zinc-700'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
              aria-label="Next review"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
