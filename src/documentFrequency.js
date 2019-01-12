// @flow

import type { DocumentTermFrequency } from './termFrequency';

export const inverseDocumentFrequency = (
  corpus: Array<DocumentTermFrequency>,
  term: string
) => {
  const frequency = documentFrequency(corpus, term);
};

export const documentFrequency = (
  corpus: Array<DocumentTermFrequency>,
  term: string
) =>
  corpus.reduce((acc, document) => {
    return acc + queryDocument(document, term);
  }, 0);

export const queryDocument = (document: DocumentTermFrequency, term: string) =>
  document[term] ? 1 : 0;
