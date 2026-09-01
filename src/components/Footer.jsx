import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { restaurantInfo } from '../data/restaurantData';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiSend,
  FiArrowUpRight,
} from 'react-icons/fi';
import { GiChefToque } from 'react-icons/gi';

export default function Footer() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error', 3000);
      return;
    }
    addToast('Thank you for subscribing to Savoria Luxe Gourmet Gazette! 🍷', 'success', 3500);
    setEmail('');
  };

  return (
    <footer className="bg-[#08080a] text-zinc-400 border-t border-zinc-900 pt-16 pb-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-zinc-850">
          {/* Col 1: Brand Info (2 columns wide on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
                <GiChefToque className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  SAVORIA LUXE
                </span>
                <p className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase -mt-0.5">
                  Artisanal Dining
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm font-light">
              Crafting unforgettable culinary memories through farm-to-table artisanal gastronomy,
              unrivaled ambiance, and express doorstep gourmet delivery.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: FiInstagram, href: restaurantInfo.social.instagram, label: "Instagram" },
                { icon: FiFacebook, href: restaurantInfo.social.facebook, label: "Facebook" },
                { icon: FiTwitter, href: restaurantInfo.social.twitter, label: "Twitter" },
                { icon: FiYoutube, href: restaurantInfo.social.youtube, label: "YouTube" },
              ].map((social, i) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-brand-400 hover:border-brand-500/50 hover:bg-zinc-850 transition-all duration-200"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: 'Home Experience', path: '/' },
                { name: 'Full Gourmet Menu', path: '/menu' },
                { name: 'Special Combos & Deals', path: '/menu#deals' },
                { name: 'Book a Table', path: '/reservation' },
                { name: 'Our Heritage & Chefs', path: '/about' },
                { name: 'Contact & Map', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-brand-400 transition-colors flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Culinary Categories */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Culinary Menu
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                'Starters & Appetizers',
                'Prime Main Courses',
                'Artisanal Burgers & Pizzas',
                'Decadent Desserts',
                'Botanical Beverages',
                "Chef's Gold Specials",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/menu"
                    className="hover:text-amber-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter & Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Gourmet Gazette
            </h4>
            <p className="text-xs text-zinc-400 font-light">
              Subscribe for secret seasonal menus, chef tastings, and exclusive 20% off coupons.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-brand-500/20 transition-all duration-200"
              >
                <span>Join VIP Club</span>
                <FiSend className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="pt-2 flex items-start gap-2 text-xs text-zinc-400">
              <FiClock className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-zinc-300 font-medium block">Daily Hours</span>
                <span>{restaurantInfo.hours.weekdays}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} Savoria Luxe Dining Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-zinc-300 transition-colors">
              Hygiene Certification
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
