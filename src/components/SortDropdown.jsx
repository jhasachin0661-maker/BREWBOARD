import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { SORT_OPTIONS } from '../data/coffees';

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <div className="absolute left-4 pointer-events-none text-gold-dark">
        <ArrowUpDown className="w-4 h-4" />
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort coffee list"
        className="pl-11 pr-10 py-3.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-2xl bg-cream-card text-espresso border border-cream-border/90 hover:border-gold/50 focus:border-gold focus:ring-2 focus:ring-gold/20 shadow-warm appearance-none outline-none cursor-pointer transition-all"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Sort: {opt.label}
          </option>
        ))}
      </select>

      <div className="absolute right-4 pointer-events-none text-gold-dark text-[10px]">
        ▼
      </div>
    </div>
  );
}
