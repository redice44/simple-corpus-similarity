const chai = require('chai');
const chaiAlmost = require('chai-almost');
const expect = chai.expect;

chai.use(chaiAlmost());

const {
  cosineSimilarity,
  dotProduct,
  magnitude
} = require('../lib/similarity');

describe('Cosine Similarity', () => {
  describe('Dot Product', () => {
    it('should calculate the dot product of two vectors', () => {
      const v1 = new Map([['two', 2], ['three', 3], ['four', 4]]);
      const v2 = new Map([['two', 4], ['three', 3], ['four', 2]]);

      expect(dotProduct(v1, v2)).to.equal(25);
    });

    it('should be commutative', () => {
      const v1 = new Map([['two', 2], ['three', 3], ['four', 4]]);
      const v2 = new Map([['four', 4], ['three', 3], ['two', 2]]);

      expect(dotProduct(v1, v2)).to.equal(dotProduct(v2, v1));
    });

    it('should error if vectors are not of the same length', () => {
      const v1 = new Map([['two', 2], ['three', 3], ['four', 4]]);
      const v2 = new Map([['three', 3], ['two', 2]]);

      expect(() => dotProduct(v1, v2)).to.throw();
      expect(() => dotProduct(v2, v1)).to.throw();
    });
  });

  describe('Magnitude', () => {
    it('should calculate the magnitude of a vector', () => {
      const v = new Map([['three', 3], ['four', 4]]);

      expect(magnitude(v)).to.equal(5);
    });
  });

  describe('Cosine Similarity', () => {
    it('should calculate the cosine similarity of two vectors', () => {
      const v1 = new Map([['two', 2], ['three', 3], ['four', 4]]);
      const v2 = new Map([['two', 4], ['three', 6], ['four', 8]]);

      const v3 = new Map([['one', 1], ['two', 0]]);
      const v4 = new Map([['one', 0], ['two', 1]]);
      const v5 = new Map([['one', 1], ['two', 1]]);

      expect(cosineSimilarity(v1, v2)).to.almost.equal(1);
      expect(cosineSimilarity(v3, v4)).to.almost.equal(0);
      expect(cosineSimilarity(v3, v5)).to.almost.equal(Math.sqrt(2) / 2);
    });

    it('should error if the vectors are not in the same vector space', () => {
      const v1 = new Map([['two', 2], ['three', 3], ['four', 4]]);
      const v2 = new Map([['two', 4], ['three', 6], ['five', 8]]);

      expect(() => cosineSimilarity(v1, v2)).to.throw();
    });

    it('should short circuit if magnitude is 0', () => {
      const v1 = new Map([['two', 0], ['three', 0], ['four', 0]]);
      const v2 = new Map([['two', 4], ['three', 6], ['four', 8]]);

      expect(cosineSimilarity(v1, v2)).to.equal(0);
    });
  });
});
