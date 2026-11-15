import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Snowflake, Coffee, ArrowUpRight, Check, MapPin, Sparkles } from 'lucide-react';
import VoteButton from './VoteButton';
import { useVotes } from '../hooks/useVotes';

export default function CoffeeCard({ coffee }) {
  const { isVoted } = useVotes();
  const [imgError, setImgError] = useState(false);

  if (!coffee) return null;

  const voted = isVoted(coffee.id);

  return (
    <div
      className={`group relative flex flex-col bg-cream-card rounded-2xl border transition-all duration-300 overflow-hidden hover:shadow-warm-hover ${
        voted
          ? 'border-gold/70 ring-1 ring-gold/40 shadow-warm-hover'
          : 'border-cream-border/90 hover:border-gold/50 shadow-warm'
      }`}
    >
      {/* Top Gold Foil Rim on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />

      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-espresso-card">
        <Link
          to={`/coffee/${coffee.id}`}
          className="block w-full h-full focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label={`View tasting notes for ${coffee.name}`}
        >
          {imgError ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-espresso p-6 text-center">
              <Coffee className="w-12 h-12 text-cream-dark mb-2 opacity-50" />
              <span className="text-xs text-cream-dark font-mono uppercase tracking-wider">
                {coffee.name}
              </span>
            </div>
          ) : (
            <img
              src={coffee.image}
              alt={coffee.name}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )}
        </Link>

        {/* Edition Pill / Reserve Tag */}
        {coffee.edition && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider font-semibold uppercase px-2.5 py-1 rounded-md bg-espresso-deep/90 text-gold border border-gold/40 backdrop-blur-md shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-gold" />
              <span>{coffee.edition}</span>
            </span>
          </div>
        )}

        {/* Temperature & Category Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm ${
              coffee.temperature === 'Hot'
                ? 'bg-amber-950/85 text-amber-200 border border-amber-800/40'
                : 'bg-cyan-950/85 text-cyan-200 border border-cyan-800/40'
            }`}
          >
            {coffee.temperature === 'Hot' ? (
              <Flame className="w-3 h-3 text-amber-400" />
            ) : (
              <Snowflake className="w-3 h-3 text-cyan-300" />
            )}
            {coffee.temperature}
          </span>

          <span className="inline-flex text-[11px] font-mono px-2.5 py-1 rounded-full bg-espresso-deep/85 text-cream-light border border-white/10 backdrop-blur-md">
            {coffee.category}
          </span>
        </div>

        {/* Active Vote Indicator Ribbon */}
        {voted && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-gold text-espresso-deep text-[11px] font-mono font-bold px-2.5 py-1 rounded-full shadow-md animate-fade-in border border-gold-light">
            <Check className="w-3 h-3 stroke-[3]" />
            <span>Cellar Choice</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-6">
        {/* Origin & Roast */}
        <div className="flex items-center justify-between text-xs text-espresso-muted mb-2 font-mono">
          <span className="flex items-center gap-1 text-coffee-rich font-medium">
            <MapPin className="w-3 h-3 text-gold-dark" />
            {coffee.origin}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-cream-warm text-coffee-rich border border-cream-border font-medium">
            {coffee.roast}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-bold text-espresso group-hover:text-coffee-rich transition-colors leading-snug mb-2">
          <Link
            to={`/coffee/${coffee.id}`}
            className="hover:underline focus:outline-none"
          >
            {coffee.name}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs text-espresso-muted font-light leading-relaxed line-clamp-2 mb-4 flex-grow">
          {coffee.description}
        </p>

        {/* Flavor Notes Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {coffee.flavorNotes?.slice(0, 3).map((note, index) => (
            <span
              key={index}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-cream-warm text-coffee-rich border border-cream-border/70 group-hover:border-gold/30 transition-colors"
            >
              {note}
            </span>
          ))}
          {coffee.flavorNotes?.length > 3 && (
            <span className="text-[11px] font-mono px-1.5 py-0.5 text-espresso-muted">
              +{coffee.flavorNotes.length - 3}
            </span>
          )}
        </div>

        {/* Bottom Actions Row */}
        <div className="pt-4 border-t border-cream-border/80 flex items-center justify-between gap-2 mt-auto">
          <Link
            to={`/coffee/${coffee.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-coffee hover:text-gold-dark transition-colors group/link"
          >
            <span>Tasting Notes</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 text-gold-dark" />
          </Link>

          <VoteButton coffee={coffee} size="sm" />
        </div>
      </div>
    </div>
  );
}
