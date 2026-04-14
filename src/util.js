/**
 * Deep freezes an instance to make all attributes unmodifiable.
 * @param {*} obj 
 */
export function finalise(obj, seen = new WeakSet()) {
	if(typeof obj !== "object" || obj === null || seen.has(obj)) return obj;
	seen.add(obj);
  	Object.freeze(obj);
  	Object.values(obj).forEach(value => finalise(value, seen));
  	return obj;
}

/**
 * Returns a pseudorandom integer in range [min, max).
 * @param {int} min 
 * @param {int} max 
 * @returns 
 */
export function rand(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}