class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
      this.buckets = new Array(initialCapacity);
      this.size = 0;
      this.loadFactor = loadFactor;
    }
  
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
      }
      return hashCode;
    }
  
    set(key, value) {
      const index = this.hash(key);
      if (!this.buckets[index]) {
        this.buckets[index] = [];
      }
  
      let overwritten = false;
      for (let i = 0; i < this.buckets[index].length; i++) {
        const [storedKey, _] = this.buckets[index][i];
        if (storedKey === key) {
          this.buckets[index][i] = [key, value];
          overwritten = true;
          break;
        }
      }
  
      if (!overwritten) {
        this.buckets[index].push([key, value]);
        this.size++;
        if (this.size > this.buckets.length * this.loadFactor) {
          this._growBuckets();
        }
      }
    }
  
    get(key) {
      const index = this.hash(key);
      if (!this.buckets[index]) {
        return null;
      }
  
      for (const [storedKey, value] of this.buckets[index]) {
        if (storedKey === key) {
          return value;
        }
      }
  
      return null;
    }
  
    has(key) {
      const index = this.hash(key);
      if (!this.buckets[index]) {
        return false;
      }
  
      for (const [storedKey, _] of this.buckets[index]) {
        if (storedKey === key) {
          return true;
        }
      }
  
      return false;
    }
  
    remove(key) {
      const index = this.hash(key);
      if (!this.buckets[index]) {
        return false;
      }
  
      for (let i = 0; i < this.buckets[index].length; i++) {
        const [storedKey, _] = this.buckets[index][i];
        if (storedKey === key) {
          this.buckets[index].splice(i, 1);
          this.size--;
          return true;
        }
      }
  
      return false;
    }
  
    length() {
      return this.size;
    }
  
    clear() {
      this.buckets = new Array(16);
      this.size = 0;
    }
  
    keys() {
      const keysArray = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const [key, _] of bucket) {
            keysArray.push(key);
          }
        }
      }
      return keysArray;
    }
  
    values() {
      const valuesArray = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const [_, value] of bucket) {
            valuesArray.push(value);
          }
        }
      }
      return valuesArray;
    }
  
    entries() {
      const entriesArray = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const entry of bucket) {
            entriesArray.push(entry);
          }
        }
      }
      return entriesArray;
    }
  
    _growBuckets() {
      const newCapacity = this.buckets.length * 2;
      const newBuckets = new Array(newCapacity);
  
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const [key, value] of bucket) {
            const newIndex = this.hash(key) % newCapacity;
            if (!newBuckets[newIndex]) {
              newBuckets[newIndex] = [];
            }
            newBuckets[newIndex].push([key, value]);
          }
        }
      }
  
      this.buckets = newBuckets;
    }
  }
  
  const hashMap = new HashMap();
  hashMap.set("key1", "value1");
  hashMap.set("key2", "value2");
  hashMap.set("key3", "value3");
  
  console.log(hashMap.get("key2")); // Output: value2
  console.log(hashMap.has("key4")); // Output: false
  console.log(hashMap.length()); // Output: 3
  console.log(hashMap.keys()); // Output: ['key1', 'key2', 'key3']
  console.log(hashMap.values()); // Output: ['value1', 'value2', 'value3']
  console.log(hashMap.entries()); // Output: [['key1', 'value1'], ['key2', 'value2'], ['key3', 'value3']]
  hashMap.remove("key2");
  console.log(hashMap.get("key2")); // Output: null
  console.log(hashMap.keys()); // Output: ['key1', 'key3']
  hashMap.clear();
  console.log(hashMap.length()); // Output: 0
  console.log(hashMap.keys()); // Output: []
  