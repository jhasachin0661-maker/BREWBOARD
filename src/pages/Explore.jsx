import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import SortDropdown from '../components/SortDropdown';
import CoffeeGrid from '../components/CoffeeGrid';
import { coffees } from '../data/coffees';
import { useVotes } from '../hooks/useVotes';
import { SlidersHorizontal, X, Compass, Sparkles } from 'lucide-react';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getVoteCount } = useVotes();

  // State initialized from URL search params or defaults
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedTemp, setSelectedTemp] = useState(searchParams.get('temp') || 'All');
  const [selectedCaffeine, setSelectedCaffeine] = useState(searchParams.get('caffeine') || 'All');
  const [sortBy, setSortBy] = useState('most-voted');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state if URL search params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedTemp('All');
    setSelectedCaffeine('All');
    setSortBy('most-voted');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedTemp !== 'All' ||
    selectedCaffeine !== 'All';

  // Combined search, filtering, and sorting
  const filteredAndSortedCoffees = useMemo(() => {
    return coffees
      .filter((coffee) => {
        // Search term matching name, description, origin, roast, or flavor notes
        if (searchTerm.trim() !== '') {
          const query = searchTerm.toLowerCase().trim();
          const matchesName = coffee.name.toLowerCase().includes(query);
          const matchesDesc = coffee.description.toLowerCase().includes(query);
          const matchesOrigin = coffee.origin.toLowerCase().includes(query);
          const matchesRoast = coffee.roast.toLowerCase().includes(query);
          const matchesNotes = coffee.flavorNotes?.some((n) => n.toLowerCase().includes(query));
          if (!matchesName && !matchesDesc && !matchesOrigin && !matchesRoast && !matchesNotes) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'All' && coffee.category !== selectedCategory) {
          return false;
        }

        // Temperature filter
        if (selectedTemp !== 'All' && coffee.temperature !== selectedTemp) {
          return false;
        }

        // Caffeine filter
        if (selectedCaffeine !== 'All' && coffee.caffeine !== selectedCaffeine) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const votesA = getVoteCount(a);
        const votesB = getVoteCount(b);

        switch (sortBy) {
          case 'most-voted':
            return votesB - votesA;
          case 'least-voted':
            return votesA - votesB;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'recently-added':
            return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
          default:
            return 0;
        }
      });
  }, [searchTerm, selectedCategory, selectedTemp, selectedCaffeine, sortBy, getVoteCount]);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-cream-border/70">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-gold-dark font-semibold mb-2">
            <Compass className="w-4 h-4 text-gold" />
            <span>The Grand Coffee Compendium</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-espresso">
            Specialty Catalogue
          </h1>
          <p className="text-sm text-espresso-muted mt-2 max-w-xl font-light">
            Explore our curated selection of single origins, heritage extractions, and artisanal roasts. Cast your rating to shape our compendium rankings.
          </p>
        </div>

        <div className="text-xs font-mono text-coffee-rich uppercase tracking-wider px-4 py-2 rounded-xl bg-cream-card border border-cream-border/90 self-start md:self-auto">
          Displaying <span className="font-bold text-espresso">{filteredAndSortedCoffees.length}</span> of {coffees.length} Varieties
        </div>
      </div>

      {/* Search and Sort Control Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="w-full sm:max-w-md">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by roast, origin, estate, flavor notes..."
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-cream-card text-espresso border border-cream-border text-xs font-mono font-semibold uppercase shadow-warm"
          >
            <SlidersHorizontal className="w-4 h-4 text-gold-dark" />
            <span>Filters {hasActiveFilters && '•'}</span>
          </button>

          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* Filter Panel (Desktop visible, mobile collapsible) */}
      <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block`}>
        <FilterPanel
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedTemp={selectedTemp}
          onSelectTemp={setSelectedTemp}
          selectedCaffeine={selectedCaffeine}
          onSelectCaffeine={setSelectedCaffeine}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          totalResults={filteredAndSortedCoffees.length}
        />
      </div>

      {/* Active Filter Chips Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-mono text-espresso-muted uppercase tracking-wider">
            Active criteria:
          </span>

          {searchTerm && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cream-card text-espresso text-xs border border-gold/40 font-mono shadow-2xs">
              Search: "{searchTerm}"
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="hover:text-gold-dark text-espresso-muted"
                aria-label="Remove search filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cream-card text-espresso text-xs border border-gold/40 font-mono shadow-2xs">
              Category: {selectedCategory}
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className="hover:text-gold-dark text-espresso-muted"
                aria-label="Remove category filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedTemp !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cream-card text-espresso text-xs border border-gold/40 font-mono shadow-2xs">
              Temp: {selectedTemp}
              <button
                type="button"
                onClick={() => setSelectedTemp('All')}
                className="hover:text-gold-dark text-espresso-muted"
                aria-label="Remove temperature filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedCaffeine !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cream-card text-espresso text-xs border border-gold/40 font-mono shadow-2xs">
              Caffeine: {selectedCaffeine}
              <button
                type="button"
                onClick={() => setSelectedCaffeine('All')}
                className="hover:text-gold-dark text-espresso-muted"
                aria-label="Remove caffeine filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs font-mono text-gold-dark hover:underline ml-2 uppercase font-semibold"
          >
            Clear all
          </button>
        </div>
      )}

      {/* The Responsive Grid */}
      <CoffeeGrid
        coffees={filteredAndSortedCoffees}
        emptyType="search"
        onResetFilters={handleResetFilters}
      />
    </div>
  );
}
