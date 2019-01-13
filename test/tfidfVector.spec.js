const expect = require('chai').expect;

const {
  documentFrequency,
  inverseDocumentFrequency,
  queryDocument,
  similarityMatrix,
  termFrequencyVector,
  tfidfVectors
} = require('../lib/tfidfVector');

describe('Calculators', () => {
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
});

describe('Vector Builders', () => {
  describe('termFrequencyVector', () => {
    it('should separate and calculate term frequency in a document', () => {
      const termFrequency = termFrequencyVector(' one two three four four ');
      expect(termFrequency).to.have.lengthOf(4);
      expect(termFrequency).to.have.all.keys('one', 'two', 'three', 'four');
      expect(termFrequency.get('one')).to.equal(0.2);
      expect(termFrequency.get('two')).to.equal(0.2);
      expect(termFrequency.get('three')).to.equal(0.2);
      expect(termFrequency.get('four')).to.equal(0.4);
    });
    it('should handle case sensitive flag', () => {
      const caseOn = termFrequencyVector('one One oNe', {
        caseSensitive: true
      });
      const caseOff = termFrequencyVector('one One oNe');
      expect(caseOn).to.have.lengthOf(3);
      expect(caseOn).to.have.all.keys('one', 'One', 'oNe');
      expect(caseOff).to.have.lengthOf(1);
      expect(caseOff).to.have.all.keys('one');
      expect(caseOff.get('one')).to.equal(1);
    });
    it('should handle different delimiter option', () => {
      const termFrequency = termFrequencyVector('one,two,three', {
        delim: ','
      });
      expect(termFrequency).to.have.lengthOf(3);
      expect(termFrequency).to.have.all.keys('one', 'two', 'three');
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

  describe('similarityMatrix', () => {
    it('should calculate the cosine similarity matrix', () => {
      expect(
        similarityMatrix(['one two', 'one one two two', 'three'])
      ).to.deep.equal([[1, 1, 0], [1, 1, 0], [0, 0, 1]]);
      expect(similarityMatrix(['three one', 'one one two two'])).to.deep.equal([
        [1, 0],
        [0, 1]
      ]);
    });
  });
});
