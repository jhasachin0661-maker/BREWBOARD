import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Coffee, Heart, Compass, Home, Menu, X, Sparkles } from 'lucide-react';
import { useVotes } from '../hooks/useVotes';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userVoteCount } = useVotes();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Journal', icon: Home },
    { to: '/explore', label: 'Grand Catalogue', icon: Compass },
    { to: '/favorites', label: 'My Cellar', icon: Heart, badge: userVoteCount },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-cream-warm/95 backdrop-blur-md border-b border-cream-border transition-all">
      {/* Top micro gold line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3.5 group focus:outline-none"
            aria-label="BREWBOARD Home"
          >
            <div className="w-11 h-11 rounded-2xl bg-espresso-deep border border-gold/40 flex items-center justify-center text-gold group-hover:bg-espresso-soft transition-all shadow-sm">
              <Coffee className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-black tracking-tight text-espresso leading-none">
                  BREWBOARD
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-gold/15 text-gold-dark border border-gold/30 uppercase tracking-widest hidden sm:inline-block">
                  RESERVE
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-coffee-rich uppercase mt-1">
                The Specialty Coffee Journal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-espresso-deep text-cream-light shadow-md border border-gold/40'
                        : 'text-espresso hover:bg-cream-border/70 hover:text-coffee-rich'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-gold" />
                  <span>{link.label}</span>
                  {typeof link.badge === 'number' && link.badge > 0 && (
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        location.pathname === link.to
                          ? 'bg-gold text-espresso-deep'
                          : 'bg-gold/20 text-gold-dark'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-espresso hover:bg-cream-border/70 focus:outline-none border border-cream-border/80"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-espresso" /> : <Menu className="w-5 h-5 text-espresso" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-cream-border bg-cream-card/98 backdrop-blur-xl px-5 pt-3 pb-6 space-y-2.5 animate-fade-in shadow-luxury">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4.5 py-3.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-espresso-deep text-cream-light shadow-sm border border-gold/40'
                      : 'text-espresso hover:bg-cream-warm'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gold" />
                  <span className="font-serif font-bold text-base">{link.label}</span>
                </div>
                {typeof link.badge === 'number' && link.badge > 0 && (
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-gold text-espresso-deep">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
}
