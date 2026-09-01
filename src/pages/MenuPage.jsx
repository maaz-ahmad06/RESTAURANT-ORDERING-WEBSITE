import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { foodItems, menuCategories, dealsAndCombos } from '../data/restaurantData';
import FoodCard from '../components/FoodCard';
import DealCard from '../components/DealCard';
import {
  FiSearch,
  FiX,
  FiFilter,
  FiStar,
  FiArrowDown,
  FiArrowUp,
  FiGrid,
} from 'react-icons/fi';
import { GiChefToque, GiLeafSwirl, GiHotMeal, GiSparkles } from 'react-icons/gi';

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // all | veg | non-veg | spicy | best-seller
  const [sortBy, setSortBy] = useState('featured'); // featured | price-low | price-high | rating

  // Filter & Sort Logic
  const filteredDishes = useMemo(() => {
    return foodItems.filter((item) => {
      // 1. Search Query
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      // 2. Category
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // 3. Dietary Filter
      if (dietaryFilter === 'veg' && !item.isVeg) return false;
      if (dietaryFilter === 'non-veg' && item.isVeg) return false;
      if (dietaryFilter === 'spicy' && !item.isSpicy) return false;
      if (dietaryFilter === 'best-seller' && !item.isBestSeller) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [searchTerm, activeCategory, dietaryFilter, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
    setDietaryFilter('all');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-zinc-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-bold tracking-wider uppercase">
            <GiChefToque className="w-4 h-4" />
            <span>Artisanal Kitchen Collection</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white">
            Discover Our Gourmet Menu
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 font-light">
            Every creation is prepared freshly upon order with sustainably sourced produce,
            master seasonings, and signature culinary passion.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CONTROLS: Search Bar & Filters Bar */}
        {/* ========================================================================= */}
        <div className="bg-zinc-950/80 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-zinc-800 shadow-2xl mb-10 space-y-6">
          {/* Top Row: Search Input + Sorting */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search dishes, truffle, salmon, pasta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-750 rounded-2xl pl-12 pr-10 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 transition-colors shadow-inner"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <span className="text-xs uppercase font-semibold text-zinc-400 tracking-wider hidden sm:inline">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-900 border border-zinc-750 text-xs sm:text-sm text-zinc-200 px-4 py-2.5 rounded-xl focus:outline-none focus:border-brand-500 cursor-pointer"
              >
                <option value="featured">Featured Chef Selection</option>
                <option value="rating">Highest Rated (★ 5.0)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Middle Row: Category Tabs */}
          <div className="border-t border-zinc-850 pt-5">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {menuCategories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      isSelected
                        ? 'text-white'
                        : 'text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeMenuCategoryPill"
                        className="absolute inset-0 bg-gradient-to-r from-brand-600 to-amber-600 rounded-full shadow-lg shadow-brand-600/30 -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Row: Dietary Preferences Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-850 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-zinc-400 font-semibold uppercase tracking-wider mr-1">
                Preference:
              </span>
              {[
                { id: 'all', label: 'All Dishes' },
                { id: 'veg', label: 'Pure Veg 🌱', color: 'text-emerald-400' },
                { id: 'non-veg', label: 'Non-Veg 🍗', color: 'text-red-400' },
                { id: 'spicy', label: 'Spicy 🔥', color: 'text-orange-400' },
                { id: 'best-seller', label: 'Best Sellers ★', color: 'text-amber-400' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setDietaryFilter(filter.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    dietaryFilter === filter.id
                      ? 'bg-zinc-800 text-white border border-brand-500/60 shadow-md'
                      : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Results Count & Reset */}
            <div className="flex items-center gap-3 text-zinc-400">
              <span>
                Showing <strong className="text-white">{filteredDishes.length}</strong> items
              </span>
              {(searchTerm || activeCategory !== 'all' || dietaryFilter !== 'all' || sortBy !== 'featured') && (
                <button
                  onClick={resetFilters}
                  className="text-brand-400 hover:text-amber-300 font-semibold underline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FOOD ITEMS GRID */}
        {/* ========================================================================= */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-20 bg-zinc-950/40 rounded-3xl border border-zinc-800">
            <GiChefToque className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold font-serif text-white mb-2">
              No matching dishes found
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-6">
              We couldn't find any dishes matching "{searchTerm}". Try clearing your search or filter tags.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-gradient-to-r from-brand-600 to-amber-600 text-white rounded-full text-xs font-semibold shadow-lg shadow-brand-500/20"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredDishes.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Combo Deals Section inside Menu Page */}
        <div className="mt-24 pt-16 border-t border-zinc-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-400">
              Chef Bundles
            </span>
            <h2 className="text-3xl font-serif font-bold text-white mt-1">
              Combo Feasts & Savings
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dealsAndCombos.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
