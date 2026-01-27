class QueryCache {
  constructor(limit = 50) {
    this.store = new Map();
    this.limit = limit;
  }

  get(key) {
    return this.store.get(key);
  }

  has(key) {
    return this.store.has(key);
  }

  set(key, value) {
    if (this.store.size >= this.limit) {
      const oldestKey = this.store.keys().next().value;
      this.store.delete(oldestKey);
    }
    this.store.set(key, value);
  }
}

module.exports = QueryCache;
