import { ref, markNonReactive } from "vue";

const FAST_READ_KEY = Symbol();

// Lots of fine-tuning is possible here, e.g.:
// - Length might be handled differently than indexes
// - Specialized functions working on unwrap array could be returned.
//   They would avoid proxy cost + track/trigger costs while working on array.
export function fastArray(array, strategy) {
  if (strategy === 0) return array;

  // Note: per-array instance wouldn't be needed here if track/target were exposed in vue
  const handlers = {
    i: 0,
    ref: ref(0),
    track() { return this.ref.value },
    trigger() { this.ref.value = ++this.i },

    get(target, key, receiver) {
      this.track();

      // Only for `fastRead` support
      if (key === FAST_READ_KEY && strategy === 2) return target;

      return Reflect.get(...arguments);
    },
  
    set(target, key, value, receiver) {
      this.trigger();
      return Reflect.set(...arguments);
    },
  };

  return markNonReactive(new Proxy(array, handlers));
}

// Basically same as fastArray but provides a direct access to underlying array for full iteration.
// Using this bypasses the cost of proxy + all no-op track() calls for each index access.
// This API is required for uses in `for` loops;
// unwrapping could be automatic for built-in methods like `sort`, `filter`, `map`, `forEach`, etc.
export function fastRead(array) {
  return array[FAST_READ_KEY] || array;
}