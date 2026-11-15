import React from 'react';
import CoffeeCard from './CoffeeCard';
import { Coffee, SearchX, Heart, Sparkles, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CoffeeGrid({
  coffees = [],
  emptyType = 'search', // 'search' | 'favorites'
  onResetFilters,
}) {
  if (coffees.length === 0) {
    if (emptyType === 'favorites') {
      return (
        <div className="bg-cream-card rounded-3xl border border-dashed border-gold/40 p-14 text-center max-w-lg mx-auto shadow-warm animate-fade-in my-8">
          <div className="w-16 h-16 rounded-2xl bg-espresso-deep border border-gold/40 flex items-center justify-center mx-auto mb-5 text-gold shadow-md">
            <Heart className="w-7 h-7 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-espresso mb-2.5">
            Your Private Cellar Is Empty
          </h3>
          <p className="text-sm text-espresso-muted leading-relaxed mb-7 font-light">
            You haven't registered any personal cupping ratings yet. Explore our grand catalogue, bookmark your favorite varieties, and build your private tasting cellar.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-espresso-deep text-cream-light font-medium text-xs font-mono uppercase tracking-wider hover:bg-espresso-soft transition-all shadow-md border border-gold/40"
          >
            <Compass className="w-4 h-4 text-gold" />
            <span>Discover Specialty Coffees</span>
          </Link>
        </div>
      );
    }

    return (
      <div className="bg-cream-card rounded-3xl border border-dashed border-gold/40 p-14 text-center max-w-lg mx-auto shadow-warm animate-fade-in my-8">
        <div className="w-16 h-16 rounded-2xl bg-cream-warm border border-cream-border flex items-center justify-center mx-auto mb-5 text-gold-dark">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="font-serif text-3xl font-bold text-espresso mb-2.5">
          No Varieties Match Your Criteria
        </h3>
        <p className="text-sm text-espresso-muted leading-relaxed mb-7 font-light">
          We could not locate any coffee matching your current search parameters and filter selection. Try modifying or clearing your filters.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-espresso-deep text-cream-light font-medium text-xs font-mono uppercase tracking-wider hover:bg-espresso-soft transition-all shadow-md border border-gold/40"
          >
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
      {coffees.map((coffee) => (
        <CoffeeCard key={coffee.id} coffee={coffee} />
      ))}
    </div>
  );
}
