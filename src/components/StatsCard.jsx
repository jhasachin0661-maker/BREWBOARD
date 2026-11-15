import React from 'react';

export default function StatsCard({
  icon: Icon,
  label,
  value,
  subtext,
  highlight = false,
  badge = null,
}) {
  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
        highlight
          ? 'bg-espresso-deep text-cream-light border-gold/50 shadow-luxury ring-1 ring-gold/30'
          : 'bg-cream-card text-espresso border-cream-border/80 hover:border-gold/50 shadow-warm hover:shadow-warm-hover'
      }`}
    >
      {/* Top subtle gold gleam */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center justify-between mb-3.5">
        <span
          className={`text-xs font-mono font-semibold uppercase tracking-[0.15em] ${
            highlight ? 'text-gold' : 'text-coffee-rich'
          }`}
        >
          {label}
        </span>
        {badge && (
          <span
            className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-medium ${
              highlight
                ? 'bg-espresso-card text-gold border border-gold/30'
                : 'bg-cream-warm text-coffee-rich border border-cream-border'
            }`}
          >
            {badge}
          </span>
        )}
        {Icon && !badge && (
          <div
            className={`p-2 rounded-xl transition-colors ${
              highlight
                ? 'bg-espresso-card text-gold border border-gold/30'
                : 'bg-cream-warm text-coffee border border-cream-border/70 group-hover:text-gold-dark'
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <div
          className={`text-3xl font-mono font-bold tracking-tight ${
            highlight ? 'text-cream-light' : 'text-espresso'
          }`}
        >
          {value}
        </div>
      </div>

      {subtext && (
        <p
          className={`text-xs mt-2.5 leading-relaxed font-light ${
            highlight ? 'text-cream-dark/80' : 'text-espresso-muted'
          }`}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
