import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { masterChefs } from '../data/restaurantData';
import {
  FiAward,
  FiShield,
  FiCheckCircle,
  FiArrowRight,
  FiCalendar,
  FiHeart,
} from 'react-icons/fi';
import { GiChefToque, GiPlantRoots, GiWineGlass, GiSparkles } from 'react-icons/gi';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0e] text-zinc-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* 1. Header & Hero Narrative */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-bold tracking-wider uppercase">
            <GiChefToque className="w-4 h-4" />
            <span>Our Culinary Philosophy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
            A Legacy of Passion, Fire & Refinement
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            Founded with a singular vision: to craft extraordinary culinary moments through
            authentic technique, pristine ingredients, and timeless hospitality.
          </p>
        </section>

        {/* 2. Story Split Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-400">
              The Genesis
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Where Ancient Traditions Meet Modern Gastronomy
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              From our modest wood-fired brick oven roots in 2012, Savoria Luxe has blossomed into
              one of the region's most celebrated dining destinations. We believe food is more
              than sustenance—it is an evocative symphony of aromatics, textures, and memories.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              Every cut of meat is dry-aged on premise in Himalayan salt chambers, our pasta is
              rolled daily by hand using stone-milled Italian semolina, and our herbs are harvested
              from certified organic micro-farms.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-3xl font-serif font-bold text-brand-400">14+</div>
                <div className="text-xs text-zinc-400 mt-1">Years of Gastronomy</div>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-3xl font-serif font-bold text-amber-400">38+</div>
                <div className="text-xs text-zinc-400 mt-1">Culinary Awards Won</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80"
                alt="Open Kitchen"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay badge */}
            <div className="absolute -bottom-6 -left-6 bg-zinc-900/95 backdrop-blur-xl p-4 rounded-2xl border border-brand-500/40 shadow-2xl flex items-center gap-3">
              <GiWineGlass className="w-8 h-8 text-brand-400" />
              <div>
                <span className="text-xs font-bold text-white block">Michelin Guide</span>
                <span className="text-[11px] text-zinc-400">Featured Destination 2024</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Master Chefs Showcase */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-400">
              The Culinary Masters
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Meet the Visionaries Behind Every Dish
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {masterChefs.map((chef, i) => (
              <motion.div
                key={chef.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-zinc-900/80 rounded-3xl overflow-hidden border border-zinc-800 hover:border-brand-500/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="h-72 w-full overflow-hidden bg-zinc-950">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                      {chef.role}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white mt-1">
                      {chef.name}
                    </h3>
                    <p className="text-xs text-brand-400 font-medium mt-0.5">
                      {chef.specialty}
                    </p>
                    <p className="text-xs text-zinc-400 mt-3 font-light leading-relaxed">
                      {chef.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 text-[11px] text-zinc-500 font-mono">
                    {chef.experience}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Sourcing & Hygiene Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <GiPlantRoots className="w-10 h-10 text-emerald-400" />
            <h3 className="font-serif text-xl font-bold text-white">Farm-to-Fork Purity</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              We partner directly with organic family farms within 100 miles, guaranteeing peak
              seasonal flavor and zero synthetic preservatives.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <FiShield className="w-10 h-10 text-brand-400" />
            <h3 className="font-serif text-xl font-bold text-white">Hospital-Grade Sterilization</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Our culinary kitchens utilize medical UV sterilization cycles, monitored blast
              chillers, and tamper-sealed temperature-controlled packaging.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <FiHeart className="w-10 h-10 text-rose-400" />
            <h3 className="font-serif text-xl font-bold text-white">Ethical Sustainability</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              100% biodegradable delivery containers, zero single-use plastics, and complete food
              composting partnerships.
            </p>
          </div>
        </section>

        {/* 5. Booking CTA */}
        <section className="text-center py-12 bg-gradient-to-r from-brand-950/40 via-zinc-900 to-amber-950/40 rounded-3xl border border-brand-500/30 p-8">
          <h2 className="text-3xl font-serif font-bold text-white mb-3">
            Experience Savoria Luxe In Person
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6">
            Reserve your table for an enchanting culinary journey crafted by our master chefs.
          </p>
          <Link
            to="/reservation"
            className="px-8 py-3.5 bg-gradient-to-r from-brand-600 to-amber-600 text-white font-bold rounded-full text-sm inline-flex items-center gap-2 shadow-lg shadow-brand-500/25"
          >
            <span>Book Your Table</span>
            <FiCalendar className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
