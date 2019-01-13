// @flow

import type { DocumentTermFrequency } from './tfidfVector';

export const cosineSimilarity = (
  v1: DocumentTermFrequency,
  v2: DocumentTermFrequency
): number => {
  const m1 = magnitude(v1);
  const m2 = magnitude(v2);
  if (m1 === 0 || m2 === 0) {
    return 0;
  }
  return dotProduct(v1, v2) / (m1 * m2);
};

export const dotProduct = (
  v1: DocumentTermFrequency,
  v2: DocumentTermFrequency
) => {
  if (v1.size !== v2.size) {
    throw new Error('Vectors must be of the same length');
  }

  let total = 0;

  v1.forEach((v1Value, term) => {
    const v2Value = v2.get(term);

    if (v2Value === undefined) {
      throw new Error('Vectors must be in the same vector space.');
    }

    total += v1Value * v2Value;
  });

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
