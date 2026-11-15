import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = "Search coffees by roast, origin, estate, flavor notes..." }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold-dark">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search coffee collection"
        className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-cream-card text-espresso placeholder-espresso-muted/60 text-sm border border-cream-border/90 hover:border-gold/50 focus:border-gold focus:ring-2 focus:ring-gold/20 shadow-warm transition-all outline-none"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-espresso-muted hover:text-espresso"
        >
          <div className="p-1 rounded-full hover:bg-cream-warm transition-colors">
            <X className="w-4 h-4" />
          </div>
        </button>
      )}
    </div>
  );
}
