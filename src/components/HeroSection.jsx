import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, Award, Sparkles, Coffee, ArrowUpRight } from 'lucide-react';
import { useVotes } from '../hooks/useVotes';
import { coffees, TOTAL_INITIAL_VOTES } from '../data/coffees';

export default function HeroSection() {
  const { userVoteCount } = useVotes();

  return (
    <section className="relative overflow-hidden bg-espresso-deep text-cream-light rounded-[2.5rem] p-8 sm:p-14 lg:p-20 shadow-luxury border border-espresso-soft mb-16">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute -top-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-gold/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-orange-burnt/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(201,157,83,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Subtle fine corner gold accents */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-gold/40 rounded-br-lg pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        {/* Editorial Subtitle Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-espresso-card/90 border border-gold/40 text-gold text-xs font-mono tracking-[0.2em] uppercase mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>The Specialty Coffee Compendium • Volume I</span>
        </div>

        {/* Big Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-cream-light leading-[1.08] mb-6">
          Rare Single Origins. <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-orange-burnt">
            Artisanal Extractions.
          </span>
        </h1>

        {/* Narrative description */}
        <p className="text-base sm:text-lg text-cream-dark/85 leading-relaxed max-w-2xl font-light mb-10">
          Welcome to <span className="font-medium text-cream-light">BREWBOARD</span> — an intimate sensory journal celebrating the craft of specialty coffee. From slow Kyoto cold drips to hand-hammered Cezve infusions, discover master roasts and record your personal palate preferences.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <Link
            to="/explore"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-espresso-deep font-semibold text-sm transition-all duration-300 shadow-lg shadow-gold/20 group active:scale-95"
          >
            <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" />
            <span>Explore Grand Catalogue</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            to="/favorites"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-espresso-card hover:bg-espresso-soft text-cream-light font-medium text-sm transition-all duration-300 border border-gold/30 hover:border-gold/60 active:scale-95 shadow-sm"
          >
            <Heart className={`w-4 h-4 ${userVoteCount > 0 ? 'text-gold fill-gold' : 'text-cream-dark'}`} />
            <span>Personal Cellar</span>
            {userVoteCount > 0 && (
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-gold text-espresso-deep font-bold ml-1">
                {userVoteCount}
              </span>
            )}
          </Link>
        </div>

        {/* Live Metrics Row */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-8 font-mono">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-cream-light tracking-tight">
              {coffees.length}
            </div>
            <div className="text-xs text-gold uppercase tracking-[0.15em] mt-1.5 font-medium">
              Curated Varieties
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-bold text-gold tracking-tight">
              {TOTAL_INITIAL_VOTES + userVoteCount}
            </div>
            <div className="text-xs text-gold uppercase tracking-[0.15em] mt-1.5 font-medium">
              Community Ratings
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <div className="text-3xl sm:text-4xl font-bold text-sage-soft tracking-tight">
              {userVoteCount}
            </div>
            <div className="text-xs text-gold uppercase tracking-[0.15em] mt-1.5 font-medium">
              Your Cellar Votes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
