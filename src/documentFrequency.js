// @flow

import type { DocumentTermFrequency } from './termFrequency';

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
