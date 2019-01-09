const calculateTermFrequency = (
  document,
  { delim = ' ', caseSensitive = false } = {}
) => {
  const terms = {};

  document
    .split(delim)
    .map(term => (caseSensitive ? term.trim() : term.toLowerCase().trim()))
    .filter(term => term)
    .forEach(term => {
      terms[term] = terms[term] ? terms[term] + 1 : 1;
    });

  return terms;
};

module.exports = calculateTermFrequency;
