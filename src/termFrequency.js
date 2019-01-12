// @flow

type TermOptions = {
  delim: string,
  caseSensitive: boolean
};

export type DocumentTermFrequency = {
  [term: string]: number
};

export const calculateTermFrequency = (
  document: string,
  { delim = ' ', caseSensitive = false }: TermOptions = {}
): DocumentTermFrequency => {
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
