// Extra (optional review): Re-solve “Valid Parentheses” using stack trace logic

var isValid = function (s) {
  const stack = [];
  const map = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (let char of s) {
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    } else {
      if (stack.length === 0) return false;

      const top = stack.pop();
      if (top !== map[char]) return false;
    }
  }

  return stack.length === 0;
};

console.log(isValid("()"));
console.log(isValid("(]"));
console.log(isValid("()[]{}"));
