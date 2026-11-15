import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { loadVotesFromStorage, saveVotesToStorage, clearVotesFromStorage } from '../utils/storage';
import { coffees } from '../data/coffees';

const VoteContext = createContext(null);

export function VoteProvider({ children }) {
  // Map of { [coffeeId: string]: true }
  const [votedItems, setVotedItems] = useState({});
  const [storageWarning, setStorageWarning] = useState(false);
  const [toast, setToast] = useState(null); // { id, message, type: 'success' | 'info' | 'warning' }

  // Initialize from LocalStorage on mount
  useEffect(() => {
    const result = loadVotesFromStorage();
    if (result.data) {
      setVotedItems(result.data);
    }
    if (!result.isAvailable || result.hadError) {
      if (!result.isAvailable) {
        setStorageWarning(true);
      }
    }
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  /**
   * Check if a coffee has an active vote
   */
  const isVoted = useCallback((coffeeId) => {
    return Boolean(votedItems[coffeeId]);
  }, [votedItems]);

  /**
   * Derived vote count: initialVotes + (activeVote ? 1 : 0)
   */
  const getVoteCount = useCallback((coffee) => {
    if (!coffee) return 0;
    const hasVoted = Boolean(votedItems[coffee.id]);
    return (coffee.initialVotes || 0) + (hasVoted ? 1 : 0);
  }, [votedItems]);

  /**
   * Toggle vote for a coffee item
   */
  const toggleVote = useCallback((coffeeId, coffeeName = 'Coffee') => {
    if (!coffeeId) return;

    // Safety check against unknown IDs
    const exists = coffees.some((c) => c.id === coffeeId);
    if (!exists) {
      console.warn(`[BREWBOARD] Attempted to vote for unknown coffee ID: "${coffeeId}"`);
      return;
    }

    setVotedItems((prev) => {
      const next = { ...prev };
      const currentlyVoted = Boolean(next[coffeeId]);

      if (currentlyVoted) {
        delete next[coffeeId];
        showToast(`Removed "${coffeeName}" from your cellar.`, 'info');
      } else {
        next[coffeeId] = true;
        showToast(`Rating recorded! Added "${coffeeName}" to your cellar.`, 'success');
      }

      const saveOk = saveVotesToStorage(next);
      if (!saveOk) {
        setStorageWarning(true);
      }

      return next;
    });
  }, [showToast]);

  /**
   * Clear all votes (for testing and reset capability)
   */
  const resetAllVotes = useCallback(() => {
    setVotedItems({});
    clearVotesFromStorage();
    showToast('Your personal cellar ratings have been cleared.', 'info');
  }, [showToast]);

  // Derived user statistics
  const userVoteCount = useMemo(() => {
    return Object.keys(votedItems).length;
  }, [votedItems]);

  const userFavoriteCoffees = useMemo(() => {
    return coffees.filter((c) => Boolean(votedItems[c.id]));
  }, [votedItems]);

  const value = useMemo(() => ({
    votedItems,
    isVoted,
    getVoteCount,
    toggleVote,
    resetAllVotes,
    userVoteCount,
    userFavoriteCoffees,
    storageWarning,
    toast,
    hideToast,
    showToast,
  }), [
    votedItems,
    isVoted,
    getVoteCount,
    toggleVote,
    resetAllVotes,
    userVoteCount,
    userFavoriteCoffees,
    storageWarning,
    toast,
    hideToast,
    showToast,
  ]);

  return <VoteContext.Provider value={value}>{children}</VoteContext.Provider>;
}

export function useVotes() {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error('useVotes must be used within a VoteProvider');
  }
  return context;
}
