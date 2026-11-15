import React from 'react';
import { Heart } from 'lucide-react';
import { useVotes } from '../hooks/useVotes';

export default function VoteButton({
  coffee,
  size = 'md', // 'sm' | 'md' | 'lg'
  showCount = true,
  className = '',
}) {
  const { isVoted, getVoteCount, toggleVote } = useVotes();

  if (!coffee) return null;

  const voted = isVoted(coffee.id);
  const count = getVoteCount(coffee);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleVote(coffee.id, coffee.name);
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={voted}
      aria-label={voted ? `Remove vote for ${coffee.name}` : `Vote for ${coffee.name}`}
      title={voted ? 'Remove from cellar' : 'Add to personal cellar'}
      className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 select-none ${sizeClasses[size]} ${
        voted
          ? 'bg-gradient-to-r from-gold to-gold-dark text-espresso-deep shadow-md shadow-gold/25 ring-1 ring-gold/60 font-semibold active:scale-95'
          : 'bg-cream-card text-espresso hover:bg-cream-border/70 border border-cream-border/90 hover:border-gold/50 active:scale-95 shadow-warm'
      } ${className}`}
    >
      <Heart
        className={`${iconSizes[size]} transition-all duration-300 ${
          voted ? 'fill-espresso-deep stroke-espresso-deep scale-110' : 'text-coffee stroke-[2] group-hover:text-gold-dark'
        }`}
      />
      {showCount && (
        <span className="font-mono font-bold tracking-tight">
          {count}
        </span>
      )}
      <span className="sr-only md:not-sr-only md:inline font-mono tracking-wide text-xs">
        {voted ? 'Rated' : 'Rate'}
      </span>
    </button>
  );
}
