import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Heart, Compass, Sparkles, Check, ArrowRight, Shield } from 'lucide-react';
import { useVotes } from '../hooks/useVotes';

export default function Footer() {
  const { userVoteCount, resetAllVotes, showToast } = useVotes();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast('Thank you for subscribing to The Specialty Coffee Gazette.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="mt-28 border-t border-espresso-soft bg-espresso-deep text-cream-light relative overflow-hidden">
      {/* Subtle luxury ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gold/5 blur-3xl pointer-events-none" />

      {/* Top Gold Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-espresso-card border border-gold/40 flex items-center justify-center text-gold shadow-md">
                <Coffee className="w-6 h-6 text-gold" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-cream-light block">
                  BREWBOARD
                </span>
                <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase block mt-0.5">
                  The Specialty Coffee Journal
                </span>
              </div>
            </div>

            <p className="text-sm text-cream-dark/80 leading-relaxed font-light max-w-md">
              A curated compendium dedicated to artisanal bean roasters, ancient preparation rituals, and modern single-origin extractions. Designed for the discerning coffee connoisseur.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-gold/90">
              <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
              <span>CRAFTED FOR TRUE COFFEE ENTHUSIASTS • VOL. 2026</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-gold font-semibold">
              The Collection
            </h4>
            <ul className="space-y-2.5 text-sm font-light text-cream-dark">
              <li>
                <Link to="/" className="hover:text-gold transition-colors inline-flex items-center gap-2">
                  <span>Journal Cover & Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-gold transition-colors inline-flex items-center gap-2">
                  <span>Grand Coffee Catalogue</span>
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-gold transition-colors inline-flex items-center gap-2">
                  <span>Personal Cellar & Favourites</span>
                  {userVoteCount > 0 && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-gold/20 text-gold font-bold">
                      {userVoteCount}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Espresso" className="hover:text-gold transition-colors">
                  Single Origin Espressos
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Cold%20Coffee" className="hover:text-gold transition-colors">
                  Slow-Steeped Cold Brews
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Gazette Subscription */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-gold font-semibold">
              The Barista Gazette
            </h4>
            <p className="text-xs text-cream-dark/80 leading-relaxed font-light">
              Receive seasonal micro-lot origin stories, cupping scores, and home barista recipes.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-espresso-card border border-gold/40 flex items-center gap-2.5 text-xs text-gold">
                <Check className="w-4 h-4 text-gold flex-shrink-0" />
                <span>You are subscribed to the Barista Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-4 pr-11 py-3 text-xs bg-espresso-card border border-white/10 rounded-xl text-cream-light placeholder-cream-dark/40 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/40 transition-all font-mono"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-gold hover:bg-gold-light text-espresso-deep rounded-lg transition-colors flex items-center justify-center font-bold"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* Local Cellar Management */}
            {userVoteCount > 0 && (
              <div className="pt-3 flex items-center justify-between text-xs text-cream-dark/60 border-t border-white/10 font-mono">
                <span>Personal Ratings: {userVoteCount}</span>
                <button
                  type="button"
                  onClick={resetAllVotes}
                  className="hover:text-red-400 transition-colors underline"
                >
                  Reset Personal Ratings
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Editorial Bar */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-dark/60 gap-4 font-mono">
          <p>© {new Date().getFullYear()} BREWBOARD. All rights reserved. Editorial Edition.</p>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider">
            <span>Specialty Coffee Association Standards</span>
            <span>•</span>
            <span>Handcrafted In Single Batches</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
