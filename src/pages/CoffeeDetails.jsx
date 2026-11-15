import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Flame,
  Snowflake,
  MapPin,
  Coffee,
  Check,
  Heart,
  Droplets,
  Clock,
  Sparkles,
  Info,
  ChevronRight,
  Share2,
  Thermometer,
  Scale,
  Timer,
  Layers,
  Star
} from 'lucide-react';
import { coffees } from '../data/coffees';
import { useVotes } from '../hooks/useVotes';
import { getAssetUrl } from '../utils/assets';
import VoteButton from '../components/VoteButton';
import CoffeeCard from '../components/CoffeeCard';

export default function CoffeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isVoted, getVoteCount, toggleVote, showToast } = useVotes();
  const [imgError, setImgError] = useState(false);

  const coffee = useMemo(() => {
    return coffees.find((c) => c.id === id);
  }, [id]);

  // Related coffees in the same category or temperature
  const relatedCoffees = useMemo(() => {
    if (!coffee) return [];
    return coffees
      .filter((c) => c.id !== coffee.id && (c.category === coffee.category || c.temperature === coffee.temperature))
      .slice(0, 3);
  }, [coffee]);

  // Handle share (copies link to clipboard)
  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Page link copied to clipboard!', 'info');
    }
  };

  if (!coffee) {
    return (
      <div className="bg-cream-card rounded-3xl border border-dashed border-cream-border p-14 text-center max-w-lg mx-auto shadow-warm animate-fade-in my-16">
        <div className="w-16 h-16 rounded-2xl bg-cream-warm flex items-center justify-center mx-auto mb-4 text-coffee">
          <Coffee className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-espresso mb-3">
          Coffee Variety Not Found
        </h2>
        <p className="text-sm text-espresso-muted leading-relaxed mb-6 font-light">
          The requested specialty roast does not exist or may have been rotated from our seasonal journal.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-espresso-deep text-cream-light font-medium text-sm hover:bg-espresso-soft transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4 text-gold" />
          <span>Return to Grand Catalogue</span>
        </Link>
      </div>
    );
  }

  const voted = isVoted(coffee.id);
  const voteCount = getVoteCount(coffee);

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Breadcrumbs & Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2.5 text-xs font-mono text-espresso-muted">
          <Link to="/" className="hover:text-gold-dark transition-colors uppercase tracking-wider">
            Journal
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-cream-border" />
          <Link to="/explore" className="hover:text-gold-dark transition-colors uppercase tracking-wider">
            Catalogue
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-cream-border" />
          <span className="text-coffee-rich font-semibold uppercase tracking-wider">{coffee.name}</span>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-xl bg-cream-card border border-cream-border/90 hover:border-gold/50 hover:bg-cream-warm text-coffee hover:text-espresso transition-all shadow-xs"
        >
          <Share2 className="w-3.5 h-3.5 text-gold-dark" />
          <span>Share Profile</span>
        </button>
      </nav>

      {/* Main Luxury Presentation Card */}
      <div className="bg-cream-card rounded-[2.5rem] border border-gold/30 overflow-hidden shadow-luxury relative">
        {/* Top Gold Accent Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/80 to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-full bg-espresso-deep flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-cream-border/70">
            {imgError ? (
              <div className="p-8 text-center text-cream-dark">
                <Coffee className="w-16 h-16 mx-auto mb-3 opacity-40 text-gold" />
                <span className="font-serif text-xl">{coffee.name}</span>
              </div>
            ) : (
              <img
                src={getAssetUrl(coffee.image)}
                alt={coffee.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            )}

            {/* Float Badges */}
            <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-sm ${
                  coffee.temperature === 'Hot'
                    ? 'bg-amber-950/85 text-amber-200 border border-amber-800/40'
                    : 'bg-cyan-950/85 text-cyan-200 border border-cyan-800/40'
                }`}
              >
                {coffee.temperature === 'Hot' ? (
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Snowflake className="w-3.5 h-3.5 text-cyan-300" />
                )}
                {coffee.temperature} Brew
              </span>

              <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-espresso-deep/85 text-cream-light border border-white/10 backdrop-blur-md">
                {coffee.category}
              </span>
            </div>

            {/* Reserve Edition Ribbon */}
            {coffee.edition && (
              <div className="absolute bottom-5 left-5 z-10">
                <div className="px-3.5 py-1.5 rounded-xl bg-espresso-deep/90 border border-gold text-gold text-xs font-mono font-semibold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-gold text-gold" />
                  <span>{coffee.edition}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Culinary Details & Voting Engine */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Origin and Estate */}
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-espresso-muted gap-2">
                <span className="flex items-center gap-1.5 text-coffee-rich font-medium">
                  <MapPin className="w-4 h-4 text-gold-dark" />
                  {coffee.origin} • <span className="text-gold-dark font-semibold">{coffee.estate}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-cream-warm text-coffee-rich border border-cream-border font-semibold">
                  {coffee.roastDegree || `${coffee.roast} Roast`}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-espresso leading-tight">
                  {coffee.name}
                </h1>
                <p className="text-sm sm:text-base text-coffee-rich font-light mt-2 italic font-serif">
                  "{coffee.description}"
                </p>
              </div>

              {/* Sensory Tasting Notes Radar/Tags */}
              <div className="p-5 rounded-2xl bg-cream-warm/80 border border-gold/30 shadow-2xs">
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-gold-dark font-bold mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                    <span>Sensory Tasting Spectrum</span>
                  </span>
                  <span className="text-[11px] font-normal text-espresso-muted">Specialty Cupping</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {coffee.flavorNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-3.5 py-1.5 rounded-xl bg-cream-card text-espresso border border-cream-border/90 shadow-2xs"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                {/* Sensory Ratings Indicators */}
                {coffee.sensoryProfile && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-cream-border font-mono text-[11px]">
                    <div>
                      <span className="text-espresso-muted uppercase block">Sweetness</span>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`w-3.5 h-2 rounded-sm ${
                              i <= coffee.sensoryProfile.sweetness ? 'bg-gold' : 'bg-cream-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-espresso-muted uppercase block">Acidity</span>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`w-3.5 h-2 rounded-sm ${
                              i <= coffee.sensoryProfile.acidity ? 'bg-orange-burnt' : 'bg-cream-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-espresso-muted uppercase block">Body Density</span>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`w-3.5 h-2 rounded-sm ${
                              i <= coffee.sensoryProfile.body ? 'bg-coffee-rich' : 'bg-cream-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-espresso-muted uppercase block">Intensity</span>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`w-3.5 h-2 rounded-sm ${
                              i <= coffee.sensoryProfile.intensity ? 'bg-espresso-deep' : 'bg-cream-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Extended Provenance Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-coffee-rich font-semibold">
                  Provenance & Tasting Profile
                </h3>
                <p className="text-sm text-espresso-muted leading-relaxed font-light">
                  {coffee.longDescription}
                </p>
              </div>

              {/* Barista Brew Specifications */}
              {coffee.brewSpecs && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-coffee-rich font-semibold">
                    Master Barista Brewing Parameters
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-cream-warm border border-cream-border/90">
                      <div className="text-[10px] text-coffee uppercase flex items-center gap-1">
                        <Scale className="w-3 h-3 text-gold-dark" />
                        <span>Ratio</span>
                      </div>
                      <div className="font-bold text-espresso mt-1">{coffee.brewSpecs.ratio}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-cream-warm border border-cream-border/90">
                      <div className="text-[10px] text-coffee uppercase flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-gold-dark" />
                        <span>Water Temp</span>
                      </div>
                      <div className="font-bold text-espresso mt-1">{coffee.brewSpecs.waterTemp}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-cream-warm border border-cream-border/90">
                      <div className="text-[10px] text-coffee uppercase flex items-center gap-1">
                        <Layers className="w-3 h-3 text-gold-dark" />
                        <span>Grind</span>
                      </div>
                      <div className="font-bold text-espresso mt-1 truncate">{coffee.brewSpecs.grindSize}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-cream-warm border border-cream-border/90">
                      <div className="text-[10px] text-coffee uppercase flex items-center gap-1">
                        <Timer className="w-3 h-3 text-gold-dark" />
                        <span>Extraction</span>
                      </div>
                      <div className="font-bold text-espresso mt-1">{coffee.brewSpecs.extractionTime}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Ingredients & Preparation Recipe */}
              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-xl bg-cream-warm border border-cream-border space-y-2 text-xs text-espresso">
                  <div className="font-semibold text-coffee-rich flex items-center gap-1.5 font-mono">
                    <Droplets className="w-3.5 h-3.5 text-gold-dark" />
                    <span>Extraction Discipline: {coffee.brewMethod}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-espresso-muted pl-1 font-light">
                    {coffee.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Prominent Interactive Voting Engine Action Box */}
            <div className="pt-8 border-t border-cream-border">
              <div className="p-6 rounded-2xl bg-espresso-deep text-cream-light flex flex-col sm:flex-row items-center justify-between gap-5 shadow-luxury border border-gold/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold/10 blur-2xl pointer-events-none" />

                <div className="space-y-1 text-center sm:text-left relative z-10">
                  <div className="text-xs font-mono text-gold uppercase tracking-[0.2em] font-semibold">
                    The Connoisseur's Vote
                  </div>
                  <div className="text-3xl font-mono font-bold tracking-tight text-cream-light">
                    {voteCount} <span className="text-sm font-normal text-cream-dark">Registered Ratings</span>
                  </div>
                  <div className="text-xs text-cream-dark/75 font-light">
                    {voted
                      ? "✓ Saved in your private cellar preferences"
                      : "Rate this roast to bookmark it in your personal cellar"}
                  </div>
                </div>

                <div className="flex-shrink-0 w-full sm:w-auto relative z-10">
                  <VoteButton
                    coffee={coffee}
                    size="lg"
                    className="w-full sm:w-auto shadow-gold-glow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Selections */}
      {relatedCoffees.length > 0 && (
        <section className="pt-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-cream-border/70">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-dark font-semibold">
                Curated Recommendations
              </span>
              <h2 className="font-serif text-3xl font-bold text-espresso mt-1">
                Complementary Selections
              </h2>
            </div>
            <Link
              to="/explore"
              className="text-xs font-mono font-semibold uppercase tracking-wider text-coffee hover:text-gold-dark"
            >
              Full Menu →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCoffees.map((rel) => (
              <CoffeeCard key={rel.id} coffee={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
