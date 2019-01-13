const expect = require('chai').expect;

const {
  documentFrequency,
  inverseDocumentFrequency,
  queryDocument,
  tfidfVectors
} = require('../lib/documentFrequency');

describe('documentFrequency', () => {
  describe('queryDocument', () => {
    it('should return the frequency of the term from the document', () => {
      expect(queryDocument(new Map([['one', 1], ['two', 1]]), 'one')).to.equal(
        1
      );
      expect(queryDocument(new Map([['one', 2], ['two', 1]]), 'one')).to.equal(
        1
      );
      expect(
        queryDocument(new Map([['one', 1], ['two', 1]]), 'three')
      ).to.equal(0);
    });
  });

  describe('documentFrequency', () => {
    const corpus = [
      new Map([['one', 1], ['two', 1]]),
      new Map([['two', 2], ['three', 3]]),
      new Map([['four', 1], ['five', 1]])
    ];
    it('should return the frequency of documents with the term within the corpus', () => {
      expect(documentFrequency(corpus, 'one')).to.equal(1);
      expect(documentFrequency(corpus, 'two')).to.equal(2);
      expect(documentFrequency(corpus, 'three')).to.equal(1);
      expect(documentFrequency(corpus, 'six')).to.equal(0);
    });
  });

  describe('inverseDocumentFrequency', () => {
    const corpus = [
      new Map([['one', 1], ['two', 1]]),
      new Map([['three', 1], ['two', 1]]),
      new Map([['three', 1], ['two', 1]]),
      new Map([['three', 1], ['two', 1]]),
      new Map([['three', 1], ['two', 1]]),
      new Map([['three', 1], ['two', 1]]),
      new Map([['three', 1], ['two', 1]]),
      new Map([['three', 1], ['two', 1]]),
      new Map([['three', 1], ['two', 1]]),
      new Map([['four', 1], ['five', 1], ['two', 1]])
    ];
    it('should return the inverse document frequency', () => {
      expect(inverseDocumentFrequency(corpus, 'one')).to.equal(1);
      expect(inverseDocumentFrequency(corpus, 'two')).to.equal(0);
      expect(inverseDocumentFrequency(corpus, 'five')).to.equal(1);
      expect(inverseDocumentFrequency(corpus, 'six')).to.equal(0);
    });
  });

  describe('tfidfVectors', () => {
    const corpus = [
      new Map([['one', 0.75], ['two', 0.25]]),
      new Map([['three', 0.5], ['two', 0.5]]),
      new Map([['three', 0.5], ['four', 0.5]]),
      new Map([['three', 0.5], ['one', 0.5]])
    ];
    it('should build TF-IDF Vectors for the corpus', () => {
      const vectors = tfidfVectors(corpus);

      expect(vectors[0].get('one')).to.equal(0.75 * Math.log10(2));
      expect(vectors[0].get('two')).to.equal(0.25 * Math.log10(2));

      expect(vectors[1].get('three')).to.equal(0.5 * Math.log10(4 / 3));
      expect(vectors[1].get('two')).to.equal(0.5 * Math.log10(2));

      expect(vectors[2].get('three')).to.equal(0.5 * Math.log10(4 / 3));
      expect(vectors[2].get('four')).to.equal(0.5 * Math.log10(4));

      expect(vectors[3].get('three')).to.equal(0.5 * Math.log10(4 / 3));
      expect(vectors[3].get('one')).to.equal(0.5 * Math.log10(2));
    });
  });
});
