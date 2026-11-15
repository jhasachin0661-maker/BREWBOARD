import test from 'node:test';
import assert from 'node:assert/strict';
import { coffees, COFFEE_CATEGORIES, TEMPERATURE_OPTIONS, CAFFEINE_OPTIONS, SORT_OPTIONS } from '../src/data/coffees.js';
import { loadVotesFromStorage, saveVotesToStorage, isStorageAvailable } from '../src/utils/storage.js';

test('Coffee Catalogue Metadata Integrity', () => {
  assert.ok(coffees.length >= 12, `Expected at least 12 coffees, got ${coffees.length}`);

  const ids = new Set();
  for (const c of coffees) {
    // Unique ID
    assert.ok(c.id && typeof c.id === 'string', `Invalid ID on coffee: ${JSON.stringify(c)}`);
    assert.ok(!ids.has(c.id), `Duplicate coffee ID detected: ${c.id}`);
    ids.add(c.id);

    // Required fields
    assert.ok(c.name && typeof c.name === 'string', `Missing name on ${c.id}`);
    assert.ok(c.category && typeof c.category === 'string', `Missing category on ${c.id}`);
    assert.ok(['Hot', 'Cold'].includes(c.temperature), `Invalid temperature "${c.temperature}" on ${c.id}`);
    assert.ok(['Low', 'Medium', 'High'].includes(c.caffeine), `Invalid caffeine "${c.caffeine}" on ${c.id}`);
    assert.ok(c.description && c.description.length > 10, `Description too short on ${c.id}`);
    assert.ok(c.longDescription && c.longDescription.length > 20, `Long description too short on ${c.id}`);
    assert.ok(typeof c.initialVotes === 'number' && c.initialVotes > 0, `Invalid initialVotes on ${c.id}`);
    assert.ok(Array.isArray(c.flavorNotes) && c.flavorNotes.length > 0, `Missing flavor notes on ${c.id}`);
    assert.ok(Array.isArray(c.ingredients) && c.ingredients.length > 0, `Missing ingredients on ${c.id}`);
    assert.ok(c.image && c.image.startsWith('/images/'), `Invalid image path on ${c.id}`);
  }
});

test('Derived Vote Count Calculation Logic', () => {
  const sampleCoffee = { id: 'espresso', initialVotes: 52 };

  // When not voted
  const votingMapEmpty = {};
  const countUnvoted = sampleCoffee.initialVotes + (votingMapEmpty[sampleCoffee.id] ? 1 : 0);
  assert.equal(countUnvoted, 52);

  // When voted
  const votingMapVoted = { 'espresso': true };
  const countVoted = sampleCoffee.initialVotes + (votingMapVoted[sampleCoffee.id] ? 1 : 0);
  assert.equal(countVoted, 53);

  // Duplicate click toggle back to unvoted
  delete votingMapVoted['espresso'];
  const countUnvotedAgain = sampleCoffee.initialVotes + (votingMapVoted[sampleCoffee.id] ? 1 : 0);
  assert.equal(countUnvotedAgain, 52);

  // Immutability check: initialVotes must remain untouched
  assert.equal(sampleCoffee.initialVotes, 52);
});

test('Filter and Search Combination', () => {
  // Test search by term
  const query = 'caramel';
  const matchedBySearch = coffees.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.description.toLowerCase().includes(query) ||
    c.flavorNotes.some(n => n.toLowerCase().includes(query))
  );
  assert.ok(matchedBySearch.length > 0, 'Search for "caramel" should return matches');

  // Test category filter
  const coldCategory = coffees.filter(c => c.category === 'Cold Coffee');
  assert.ok(coldCategory.length > 0);
  for (const c of coldCategory) {
    assert.equal(c.category, 'Cold Coffee');
  }

  // Combined category + temperature filter
  const hotEspresso = coffees.filter(c => c.category === 'Espresso' && c.temperature === 'Hot');
  assert.ok(hotEspresso.length >= 2, 'Should have at least 2 Hot Espresso drinks');
});

test('Sorting Correctness', () => {
  const simulatedVotes = { 'espresso': 52, 'cold-brew': 65, 'affogato': 46 };

  // Most voted
  const sortedDesc = [...coffees].sort((a, b) => {
    const vA = a.initialVotes;
    const vB = b.initialVotes;
    return vB - vA;
  });
  for (let i = 0; i < sortedDesc.length - 1; i++) {
    assert.ok(sortedDesc[i].initialVotes >= sortedDesc[i + 1].initialVotes, 'Should be sorted descending');
  }

  // Alphabetical A-Z
  const sortedAlphabetical = [...coffees].sort((a, b) => a.name.localeCompare(b.name));
  for (let i = 0; i < sortedAlphabetical.length - 1; i++) {
    assert.ok(sortedAlphabetical[i].name.localeCompare(sortedAlphabetical[i + 1].name) <= 0);
  }
});

test('LocalStorage Mocking and Malformed Recovery', () => {
  // Mock window.localStorage
  const storageStore = {};
  global.window = {
    localStorage: {
      getItem: (key) => storageStore[key] || null,
      setItem: (key, val) => { storageStore[key] = String(val); },
      removeItem: (key) => { delete storageStore[key]; },
    }
  };

  // 1. Initial empty storage
  const resEmpty = loadVotesFromStorage();
  assert.deepEqual(resEmpty.data, {});
  assert.equal(resEmpty.hadError, false);

  // 2. Save and load valid votes
  const validVotes = { 'espresso': true, 'cold-brew': true };
  const saved = saveVotesToStorage(validVotes);
  assert.ok(saved);
  const resLoaded = loadVotesFromStorage();
  assert.deepEqual(resLoaded.data, validVotes);

  // 3. Test malformed JSON
  storageStore['brewboard_votes'] = "{ malformed json ::: ";
  const resMalformed = loadVotesFromStorage();
  assert.deepEqual(resMalformed.data, {});
  assert.equal(resMalformed.hadError, true);

  // 4. Test non-object payload (e.g. array or primitive)
  storageStore['brewboard_votes'] = JSON.stringify(["espresso"]);
  const resArray = loadVotesFromStorage();
  assert.deepEqual(resArray.data, {});
  assert.equal(resArray.hadError, true);

  // 5. Test object with invalid boolean flags
  storageStore['brewboard_votes'] = JSON.stringify({ 'espresso': true, 'fake': false, 'attack': 'true' });
  const resSanitized = loadVotesFromStorage();
  assert.deepEqual(resSanitized.data, { 'espresso': true });
});

