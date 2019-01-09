const expect = require('chai').expect;

const calculateTermFrequency = require('../src/termFrequency');

describe('Term Frequency', () => {
  describe('calculateTermFrequency', () => {
    it('should separate and sum terms in a document', () => {
      expect(calculateTermFrequency('one two three')).to.deep.equal({
        one: 1,
        two: 1,
        three: 1
      });
      expect(calculateTermFrequency(' three two one ')).to.deep.equal({
        one: 1,
        two: 1,
        three: 1
      });
      expect(
        calculateTermFrequency('one two two three three three')
      ).to.deep.equal({
        one: 1,
        two: 2,
        three: 3
      });
    });
    it('should handle case sensitive flag', () => {
      expect(
        calculateTermFrequency('one One oNe', { caseSensitive: true })
      ).to.deep.equal({
        one: 1,
        One: 1,
        oNe: 1
      });
      expect(calculateTermFrequency('one One oNe')).to.deep.equal({
        one: 3
      });
    });
    it('should handle different delimiter option', () => {
      expect(
        calculateTermFrequency('one,two,three', { delim: ',' })
      ).to.deep.equal({
        one: 1,
        two: 1,
        three: 1
      });
    });
  });
});
