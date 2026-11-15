const STORAGE_KEY = 'brewboard_votes';

/**
 * Checks if LocalStorage is available and writable
 * @returns {boolean}
 */
export function isStorageAvailable() {
  try {
    const testKey = '__brewboard_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Safely loads the voting map from LocalStorage.
 * Handles missing key, corrupted JSON, non-object payloads.
 * @returns {{ data: Record<string, boolean>, isAvailable: boolean, hadError: boolean }}
 */
export function loadVotesFromStorage() {
  if (typeof window === 'undefined') {
    return { data: {}, isAvailable: false, hadError: false };
  }

  const available = isStorageAvailable();
  if (!available) {
    return { data: {}, isAvailable: false, hadError: true };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { data: {}, isAvailable: true, hadError: false };
    }

    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      console.warn('[BREWBOARD] Corrupted votes format found in LocalStorage. Resetting to empty object.');
      return { data: {}, isAvailable: true, hadError: true };
    }

    // Sanitize to only valid string keys with boolean truthy values
    const sanitized = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof key === 'string' && value === true) {
        sanitized[key] = true;
      }
    }

    return { data: sanitized, isAvailable: true, hadError: false };
  } catch (err) {
    console.warn('[BREWBOARD] Failed to parse votes from LocalStorage:', err);
    return { data: {}, isAvailable: true, hadError: true };
  }
}

/**
 * Safely writes the voting map to LocalStorage.
 * @param {Record<string, boolean>} votesMap
 * @returns {boolean} true if write succeeded, false otherwise
 */
export function saveVotesToStorage(votesMap) {
  if (typeof window === 'undefined') return false;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(votesMap));
    return true;
  } catch (err) {
    console.warn('[BREWBOARD] Failed to save votes to LocalStorage:', err);
    return false;
  }
}

/**
 * Clears voting data (useful for demonstration/reset)
 */
export function clearVotesFromStorage() {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    return false;
  }
}

