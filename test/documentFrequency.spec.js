const expect = require('chai').expect;

const {
  documentFrequency,
  inverseDocumentFrequency,
  queryDocument
} = require('../lib/documentFrequency');

describe('documentFrequency', () => {
  describe('queryDocument', () => {
    it('should return the frequency of the term from the document', () => {
      expect(queryDocument({ one: 1, two: 1 }, 'one')).to.equal(1);
      expect(queryDocument({ one: 2, two: 1 }, 'one')).to.equal(1);
      expect(queryDocument({ one: 1, two: 1 }, 'three')).to.equal(0);
    });
  });

  describe('documentFrequency', () => {
    const corpus = [
      { one: 1, two: 1 },
      { two: 2, three: 3 },
      { four: 1, five: 1 }
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
      { one: 1, two: 1 },
      { two: 2, three: 3 },
      { two: 2, three: 3 },
      { two: 2, three: 3 },
      { two: 2, three: 3 },
      { two: 2, three: 3 },
      { two: 2, three: 3 },
      { two: 2, three: 3 },
      { two: 2, three: 3 },
      { four: 1, five: 1, two: 1 }
    ];
    it('should return the inverse document frequency', () => {
      expect(inverseDocumentFrequency(corpus, 'one')).to.equal(1);
      expect(inverseDocumentFrequency(corpus, 'two')).to.equal(0);
      expect(inverseDocumentFrequency(corpus, 'five')).to.equal(1);
      expect(inverseDocumentFrequency(corpus, 'six')).to.equal(0);
    });
  });
});