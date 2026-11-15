import React from 'react';
import { RotateCcw, Filter, Flame, Snowflake, Zap, Sparkles } from 'lucide-react';
import { COFFEE_CATEGORIES, TEMPERATURE_OPTIONS, CAFFEINE_OPTIONS } from '../data/coffees';

export default function FilterPanel({
  selectedCategory,
  onSelectCategory,
  selectedTemp,
  onSelectTemp,
  selectedCaffeine,
  onSelectCaffeine,
  onResetFilters,
  hasActiveFilters,
  totalResults,
}) {
  return (
    <div className="bg-cream-card rounded-2xl border border-cream-border/90 p-6 shadow-warm flex flex-col gap-6">
      {/* Top Header / Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-cream-border/70">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gold-dark" />
          <span className="text-xs font-mono uppercase tracking-[0.15em] font-bold text-espresso">
            Filter Compendium
          </span>
          <span className="text-xs font-mono text-espresso-muted">
            ({totalResults} {totalResults === 1 ? 'match' : 'matches'})
          </span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-gold-dark hover:text-orange-burnt transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-[0.15em] text-coffee-rich mb-2.5 font-semibold">
          Preparation Category
        </label>
        <div className="flex flex-wrap gap-2">
          {COFFEE_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`text-xs px-4 py-2 rounded-xl font-mono uppercase tracking-wider transition-all duration-200 ${
                  active
                    ? 'bg-espresso-deep text-cream-light shadow-md border border-gold/40 font-bold'
                    : 'bg-cream-warm text-espresso hover:bg-cream-border border border-cream-border/80 font-medium'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Temperature & Caffeine Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-cream-border/70">
        {/* Temperature */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-[0.15em] text-coffee-rich mb-2.5 font-semibold">
            Temperature Profile
          </label>
          <div className="flex gap-2">
            {TEMPERATURE_OPTIONS.map((temp) => {
              const active = selectedTemp === temp;
              return (
                <button
                  key={temp}
                  type="button"
                  onClick={() => onSelectTemp(temp)}
                  className={`flex-1 text-xs py-2 px-2.5 rounded-xl font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    active
                      ? 'bg-espresso-deep text-cream-light shadow-md border border-gold/40 font-bold'
                      : 'bg-cream-warm text-espresso hover:bg-cream-border border border-cream-border/80 font-medium'
                  }`}
                >
                  {temp === 'Hot' && <Flame className="w-3 h-3 text-amber-500" />}
                  {temp === 'Cold' && <Snowflake className="w-3 h-3 text-cyan-500" />}
                  <span>{temp}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Caffeine */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-[0.15em] text-coffee-rich mb-2.5 font-semibold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-gold-dark" />
            <span>Caffeine Intensity</span>
          </label>
          <div className="flex gap-2">
            {CAFFEINE_OPTIONS.map((caf) => {
              const active = selectedCaffeine === caf;
              return (
                <button
                  key={caf}
                  type="button"
                  onClick={() => onSelectCaffeine(caf)}
                  className={`flex-1 text-xs py-2 px-2.5 rounded-xl font-mono uppercase tracking-wider transition-all duration-200 ${
                    active
                      ? 'bg-espresso-deep text-cream-light shadow-md border border-gold/40 font-bold'
                      : 'bg-cream-warm text-espresso hover:bg-cream-border border border-cream-border/80 font-medium'
                  }`}
                >
                  {caf}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
