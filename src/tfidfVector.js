// @flow

import { cosineSimilarity } from './similarity';

type TermOptions = {
  delim: string,
  caseSensitive: boolean
};

export type DocumentTermFrequency = Map<string, number>;

export const similarityMatrix = (
  corpus: Array<string>
): Array<Array<number>> => {
  const documentTermFrequencyVectors = corpus.map(document =>
    termFrequencyVector(document)
  );

  const _tfidfVectors = tfidfVectors(documentTermFrequencyVectors);

  return _tfidfVectors.map(v1 =>
    _tfidfVectors.map(v2 => {
      let coercedV1 = new Map();
      let coercedV2 = new Map();

      v1.forEach((value, term) => coercedV1.set(term, value));

      v2.forEach((value, term) => {
        coercedV2.set(term, value);

        if (!coercedV1.has(term)) {
          coercedV1.set(term, 0);
        }
      });

      v1.forEach((value, term) => {
        if (!coercedV2.has(term)) {
          coercedV2.set(term, 0);
        }
      });

      return cosineSimilarity(coercedV1, coercedV2);
    })
  );
};

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
