//Q1: Deep Flatten Nested Array (10 mins) Flatten an array of any depth level.

function deepFlatten(arr) {
  let result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      result.push(...deepFlatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}



const nested = [1, [2, [3, [4, 5]], 6], [7, 8], 9, [[10]]];
console.log(deepFlatten(nested));
