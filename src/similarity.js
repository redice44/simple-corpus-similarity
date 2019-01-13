// @flow

import type { DocumentTermFrequency } from './tfidfVector';

export const cosineSimilarity = (
  v1: DocumentTermFrequency,
  v2: DocumentTermFrequency
): number => dotProduct(v1, v2) / (magnitude(v1) * magnitude(v2));

export const dotProduct = (
  v1: DocumentTermFrequency,
  v2: DocumentTermFrequency
) => {
  if (v1.size !== v2.size) {
    throw new Error('Vectors must be of the same length');
  }

  const v1Values = v1.values();
  const v2Values = v2.values();

  let v1Current = v1Values.next();
  let v2Current = v2Values.next();
  let total = 0;

  while (!v1Current.done && !v2Current.done) {
    total += v1Current.value * v2Current.value;
    v1Current = v1Values.next();
    v2Current = v2Values.next();
  }

  return total;
};

export const magnitude = (v1: DocumentTermFrequency) => {
  const v1Values = v1.values();

  let v1Current = v1Values.next();
  let total = 0;

  while (!v1Current.done) {
    total += v1Current.value * v1Current.value;
    v1Current = v1Values.next();
  }

  return Math.sqrt(total);
};
