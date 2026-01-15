function deepClone(value, visited = new WeakMap()) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (visited.has(value)) {
    return visited.get(value);
  }

  const clone = Array.isArray(value) ? [] : {};

  visited.set(value, clone);

  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      clone[key] = deepClone(value[key], visited);
    }
  }

  return clone;
}

const obj = {
  name: "John",
  address: {
    city: "NYC",
    coords: { lat: 40, lng: -74 },
  },
  hobbies: ["reading", "gaming"],
};

obj.self = obj;

const clonedObj = deepClone(obj);

console.log("Original:", obj);
console.log("Cloned:", clonedObj);

console.log("Different object:", clonedObj !== obj); // true
console.log("Nested object cloned:", clonedObj.address !== obj.address); // true
console.log("Circular preserved:", clonedObj.self === clonedObj); // true
