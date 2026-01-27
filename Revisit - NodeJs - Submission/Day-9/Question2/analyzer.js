function analyzeQueries(queries) {
  const patternCount = new Map();

  for (const query of queries) {
    const fields = Object.keys(query).sort();
    const key = fields.join("|");
    patternCount.set(key, (patternCount.get(key) || 0) + 1);
  }

  return patternCount;
}

function suggestIndexes(queries, minFrequency = 2) {
  const patterns = analyzeQueries(queries);
  const suggestions = [];

  for (const [key, count] of patterns.entries()) {
    if (count >= minFrequency) {
      suggestions.push({
        fields: key.split("|"),
        frequency: count,
      });
    }
  }

  return suggestions.sort((a, b) => b.frequency - a.frequency);
}

module.exports = { analyzeQueries, suggestIndexes };
