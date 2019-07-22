import seedrandom from 'seedrandom';

let _seed = undefined;

/**
 * Initialize the random number generator.
 * @param {string | undefined} seed The seed value (optional).
 */
export function init(seed) {
  _seed = seed || Date.now();
  seedrandom(_seed, { global: true });
}

/**
 * Returns the current seed.
 * @returns {string | undefined}
 */
export function getSeed() {
  return _seed;
}

/**
 * Returns a random float between 0 and 1 [0, 1).
 * @returns {number} A random float [0, 1).
 */
export function range01() {
  return Math.random();
}

/**
 * Returns a random float between `min` and `max` [min, max).
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param {number} min The _inclusive_ lower bound.
 * @param {number} max The _exclusive_ upper bound.
 * @returns {number} A random float [min, max).
 */
export function rangeFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between `min` and `max` [min, max).
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param {number} min The _inclusive_ lower bound.
 * @param {number} max The _exclusive_ upper bound.
 * @returns {number} A random integer [min, max).
 */
export function rangeInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Returns a randomly selected item from the given array.
 * @param {any[]} arr The array.
 * @returns {any} The randomly selected item.
 */
export function select(arr) {
  const i = rangeInt(0, arr.length);
  return arr[i];
}