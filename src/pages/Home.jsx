import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import StatsCard from '../components/StatsCard';
import CoffeeCard from '../components/CoffeeCard';
import { coffees, TOTAL_INITIAL_VOTES, COFFEE_CATEGORIES } from '../data/coffees';
import { useVotes } from '../hooks/useVotes';
import {
  Coffee,
  Heart,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  Flame,
  Snowflake,
  Layers,
  Compass,
  Star,
  ShieldCheck
} from 'lucide-react';

export default function Home() {
  const { userVoteCount, getVoteCount } = useVotes();

  // Find the top voted coffee (dynamically calculated with current votes)
  const sortedByPopularity = useMemo(() => {
    return [...coffees].sort((a, b) => getVoteCount(b) - getVoteCount(a));
  }, [getVoteCount]);

  const topCoffee = sortedByPopularity[0];
  const featuredCoffees = useMemo(() => {
    return coffees.filter((c) => c.featured).slice(0, 4);
  }, []);

  const popularSelections = useMemo(() => {
    return sortedByPopularity.slice(0, 4);
  }, [sortedByPopularity]);

  return (
    <div className="space-y-20 animate-fade-in">
      {/* Editorial Hero */}
      <HeroSection />

      {/* Discovery Dashboard Summary Statistics */}
      <section aria-label="Dashboard Overview">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-cream-border/70">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-gold-dark font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Cupping Journal Metrics</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso">
              Compendium Highlights
            </h2>
            <p className="text-sm text-espresso-muted mt-1 font-light">
              Aggregated community ratings and your personal tasting selections
            </p>
          </div>
          <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-gold/15 text-gold-dark border border-gold/40 font-semibold tracking-wider flex items-center gap-1.5 self-start sm:self-auto">
            <Star className="w-3.5 h-3.5 fill-gold-dark" />
            <span>HARVEST RESERVE 2026</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon={Coffee}
            label="Curated Varieties"
            value={coffees.length}
            subtext="Single-origins, ancient roasts, and modern craft preparations"
          />

          <StatsCard
            icon={Heart}
            label="Your Private Cellar"
            value={userVoteCount}
            subtext={
              userVoteCount === 0
                ? "Your cellar is empty. Rate items to curate your preferences."
                : `${userVoteCount} ${userVoteCount === 1 ? 'variety' : 'varieties'} bookmarked with your personal rating`
            }
            highlight={userVoteCount > 0}
          />

          <StatsCard
            icon={TrendingUp}
            label="Top Rated Selection"
            value={topCoffee ? `${getVoteCount(topCoffee)} votes` : '—'}
            badge={topCoffee ? topCoffee.name : null}
            subtext={topCoffee ? `Leading roast: ${topCoffee.name} (${topCoffee.category})` : ''}
          />

          <StatsCard
            icon={Award}
            label="Grand Cupping Total"
            value={TOTAL_INITIAL_VOTES + userVoteCount}
            subtext="Total ratings recorded across the entire specialty catalogue"
          />
        </div>
      </section>

      {/* Featured Coffee Highlight of the Day (Grand Reserve Feature) */}
      {topCoffee && (
        <section className="bg-gradient-to-br from-cream-card via-cream-light to-cream-card rounded-[2.5rem] border border-gold/40 p-8 sm:p-12 lg:p-14 shadow-luxury relative overflow-hidden">
          {/* Subtle gold line & ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 blur-3xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative group">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-espresso-deep shadow-2xl border border-gold/30">
                <img
                  src={topCoffee.image}
                  alt={topCoffee.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              {/* Grand Reserve Plaque Badge */}
              <div className="absolute -bottom-4 left-6 px-4 py-2 rounded-xl bg-espresso-deep border border-gold text-gold text-xs font-mono font-bold tracking-wider uppercase shadow-lg flex items-center gap-2">
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                <span>Premier Grand Cru Selection</span>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/20 text-gold-dark text-xs font-mono font-bold tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                  <span>#1 COMPENDIUM CHOICE</span>
                </span>
                <span className="text-xs font-mono text-espresso-muted font-medium">
                  {getVoteCount(topCoffee)} Certified Ratings • {topCoffee.origin}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-5xl font-bold text-espresso leading-tight">
                {topCoffee.name}
              </h3>

              <p className="text-sm sm:text-base text-espresso-muted leading-relaxed font-light">
                {topCoffee.longDescription}
              </p>

              {/* Flavor Profile Pills */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-gold-dark font-semibold block">
                  Signature Flavor Notes
                </span>
                <div className="flex flex-wrap gap-2">
                  {topCoffee.flavorNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-3 py-1.5 rounded-xl bg-cream-warm text-espresso border border-cream-border/90 shadow-2xs"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to={`/coffee/${topCoffee.id}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-espresso-deep text-cream-light font-medium text-sm hover:bg-espresso-soft transition-all shadow-md shadow-espresso/30 border border-gold/40 group"
                >
                  <span>Inspect Sensory Notes</span>
                  <ArrowRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/explore"
                  className="text-sm font-semibold text-coffee hover:text-gold-dark transition-colors font-mono"
                >
                  Browse all {coffees.length} varieties →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Editor's Featured Selections */}
      <section>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-cream-border/70">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-gold-dark font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Curator's Special Edition</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso">
              Featured Roasts & Extractions
            </h2>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-coffee hover:text-gold-dark transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCoffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </section>

      {/* Popular Selections Section */}
      <section>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-cream-border/70">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-coffee-rich font-semibold mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-gold" />
              <span>Palate Consensus</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso">
              Most Celebrated Roasts
            </h2>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-coffee hover:text-gold-dark transition-colors group"
          >
            <span>Rank by ratings</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularSelections.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </section>

      {/* Explore by Category Quick Jump */}
      <section className="bg-cream-card rounded-[2rem] border border-cream-border/90 p-8 sm:p-12 shadow-warm">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-dark font-semibold">
            Categorical Exploration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso mt-1.5">
            Browse by Roasting & Brew Discipline
          </h2>
          <p className="text-sm text-espresso-muted mt-2 font-light">
            Filter through classical Italian standards, century-old Ottoman traditions, or high-altitude third-wave extractions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {COFFEE_CATEGORIES.filter((c) => c !== 'All').map((category) => (
            <Link
              key={category}
              to={`/explore?category=${encodeURIComponent(category)}`}
              className="p-5 rounded-2xl bg-cream-warm hover:bg-cream-border text-center transition-all duration-300 border border-cream-border/90 hover:border-gold/50 group shadow-xs hover:shadow-warm"
            >
              <div className="text-xs font-mono font-bold text-espresso group-hover:text-gold-dark transition-colors uppercase tracking-wider">
                {category}
              </div>
              <div className="text-[11px] text-espresso-muted font-mono mt-1">
                {coffees.filter((c) => c.category === category).length} varieties
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
