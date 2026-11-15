import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import CoffeeGrid from '../components/CoffeeGrid';
import { useVotes } from '../hooks/useVotes';
import { Heart, Trash2, ArrowLeft, Sparkles, Coffee, Compass, Star } from 'lucide-react';

export default function Favorites() {
  const { userFavoriteCoffees, userVoteCount, resetAllVotes } = useVotes();

  // Category breakdown of user favorites
  const favoriteCategories = useMemo(() => {
    const counts = {};
    for (const c of userFavoriteCoffees) {
      counts[c.category] = (counts[c.category] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [userFavoriteCoffees]);

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-cream-border/70">
        <div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-coffee hover:text-gold-dark transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Grand Catalogue</span>
          </Link>
          <div className="flex items-center gap-3.5">
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-espresso">
              Personal Cellar
            </h1>
            {userVoteCount > 0 && (
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-gold text-espresso-deep font-bold border border-gold-light">
                {userVoteCount} {userVoteCount === 1 ? 'variety' : 'varieties'}
              </span>
            )}
          </div>
          <p className="text-sm text-espresso-muted mt-2 max-w-xl font-light">
            Your private collection of rated roasts and favorite preparations. These selections reflect your sensory preferences across the compendium.
          </p>
        </div>

        {userVoteCount > 0 && (
          <div className="flex items-center gap-3">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cream-card hover:bg-cream-warm text-espresso border border-cream-border/90 hover:border-gold/50 text-xs font-mono uppercase tracking-wider font-semibold shadow-warm transition-all"
            >
              <Compass className="w-4 h-4 text-gold-dark" />
              <span>Discover More</span>
            </Link>

            <button
              type="button"
              onClick={resetAllVotes}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-red-50/80 hover:bg-red-100 text-red-800 border border-red-200 text-xs font-mono font-semibold transition-all"
              title="Reset personal cellar"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cellar</span>
            </button>
          </div>
        )}
      </div>

      {/* Insights Bar when items are voted */}
      {userVoteCount > 0 && favoriteCategories.length > 0 && (
        <div className="bg-gradient-to-r from-cream-card via-cream-light to-cream-card rounded-2xl border border-gold/40 p-6 shadow-warm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gold/15 flex items-center justify-center text-gold-dark">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-espresso font-bold block">
                Your Sensory Palate Spectrum
              </span>
              <span className="text-[11px] text-espresso-muted font-light">
                Distribution of your rated roasts by extraction discipline
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {favoriteCategories.map(([category, count]) => (
              <span
                key={category}
                className="text-xs px-3.5 py-1.5 rounded-xl bg-cream-card text-espresso font-mono border border-cream-border/80 shadow-2xs font-medium"
              >
                {category}: <strong className="text-gold-dark">{count}</strong>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Grid of Favorite items or empty state */}
      <CoffeeGrid
        coffees={userFavoriteCoffees}
        emptyType="favorites"
      />
    </div>
  );
}
