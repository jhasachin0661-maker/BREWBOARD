import React, { useEffect } from 'react';
import { CheckCircle2, Info, AlertTriangle, X, Sparkles } from 'lucide-react';
import { useVotes } from '../hooks/useVotes';

export default function Toast() {
  const { toast, hideToast, storageWarning } = useVotes();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, hideToast]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-[calc(100vw-3rem)] pointer-events-none">
      {/* Storage Alert (only if storage restricted) */}
      {storageWarning && (
        <div 
          role="alert"
          className="pointer-events-auto bg-espresso-deep border border-gold/40 text-cream-light px-5 py-4 rounded-2xl shadow-luxury flex items-start gap-3.5 animate-toast"
        >
          <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed font-light">
            <span className="font-semibold block text-sm font-serif text-gold">Notice: Local Session Storage</span>
            Browser storage is currently in private/session mode. Your cellar selections will remain active during this session.
          </div>
        </div>
      )}

      {/* Action Feedback Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-auto bg-espresso-deep text-cream-light border border-gold/50 px-5 py-4 rounded-2xl shadow-luxury flex items-center justify-between gap-4 animate-toast"
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && (
              <div className="w-7 h-7 rounded-lg bg-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
            )}
            {toast.type === 'info' && (
              <div className="w-7 h-7 rounded-lg bg-gold/15 flex items-center justify-center text-gold flex-shrink-0">
                <Info className="w-4 h-4 text-gold" />
              </div>
            )}
            {toast.type === 'warning' && (
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
            )}
            <span className="text-xs font-mono tracking-wide leading-snug">{toast.message}</span>
          </div>
          <button
            onClick={hideToast}
            aria-label="Close notification"
            className="text-cream-dark/60 hover:text-gold p-1 rounded-lg hover:bg-espresso-soft transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
