// @flow

type TermOptions = {
  delim: string,
  caseSensitive: boolean
};

type DocumentTermFrequency = Map<string, number>;

export const tfidfVectors = (
  documentTermFrequencyVectors: Array<DocumentTermFrequency>
): Array<DocumentTermFrequency> =>
  documentTermFrequencyVectors.map(dtf => {
    const vector: DocumentTermFrequency = new Map();

    dtf.forEach((value, term) => {
      vector.set(
        term,
        inverseDocumentFrequency(documentTermFrequencyVectors, term) * value
      );
    });

    return vector;
  });

export const termFrequencyVector = (
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

export const inverseDocumentFrequency = (
  corpus: Array<DocumentTermFrequency>,
  term: string
) => {
  const docFrequency = documentFrequency(corpus, term);

  if (docFrequency === 0) {
    return 0;
  }

  return Math.log10(corpus.length / docFrequency);
};

export const documentFrequency = (
  corpus: Array<DocumentTermFrequency>,
  term: string
) =>
  corpus.reduce((acc, document) => {
    return acc + queryDocument(document, term);
  }, 0);

export const queryDocument = (document: DocumentTermFrequency, term: string) =>
  document.has(term) ? 1 : 0;
