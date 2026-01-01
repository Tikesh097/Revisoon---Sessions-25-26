//Q2: Flatten Nested Object (12 mins)
// Flatten a deeply nested object with dot notation keys.

function flattenObject(obj, parentKey = "", result = {}) {
  for (let key in obj) {
    let newKey = parentKey ? parentKey + "." + key : key;

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      flattenObject(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

const obj = {
  name: "John",
  address: {
    city: "NYC",
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
  hobbies: ["reading", "gaming"],
};

console.log(flattenObject(obj));
