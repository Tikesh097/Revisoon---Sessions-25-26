Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

const nums = [1, 2, 3, 4, 5];
const result = [];
nums.myForEach((num, index) => {
  result.push(num * index);
});
console.log(result); // [0, 2, 6, 12, 20]
