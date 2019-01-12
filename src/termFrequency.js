// @flow

type TermOptions = {
  delim: string,
  caseSensitive: boolean
};

export type DocumentTermFrequency = Map<string, number>;

export const calculateTermFrequency = (
  document: string,
  { delim = ' ', caseSensitive = false }: TermOptions = {}
): DocumentTermFrequency => {
  const termsFrequency = new Map();

  const terms = document
    .split(delim)
    .map(term => (caseSensitive ? term.trim() : term.toLowerCase().trim()))
    .filter(term => term);

  terms.forEach(term => {
    if (termsFrequency.has(term)) {
      termsFrequency.set(term, termsFrequency.get(term) + 1);
    } else {
      termsFrequency.set(term, 1);
    }
  });

  termsFrequency.forEach((value, term) =>
    termsFrequency.set(term, value / terms.length)
  );

  return termsFrequency;
};
