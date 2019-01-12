const expect = require('chai').expect;

const { calculateTermFrequency } = require('../lib/termFrequency');

describe('Term Frequency', () => {
  describe('calculateTermFrequency', () => {
    it('should separate and calculate term frequency in a document', () => {
      const termFrequency = calculateTermFrequency(' one two three four four ');
      expect(termFrequency).to.have.lengthOf(4);
      expect(termFrequency).to.have.all.keys('one', 'two', 'three', 'four');
      expect(termFrequency.get('one')).to.equal(0.2);
      expect(termFrequency.get('two')).to.equal(0.2);
      expect(termFrequency.get('three')).to.equal(0.2);
      expect(termFrequency.get('four')).to.equal(0.4);
    });
    it('should handle case sensitive flag', () => {
      const caseOn = calculateTermFrequency('one One oNe', {
        caseSensitive: true
      });
      const caseOff = calculateTermFrequency('one One oNe');
      expect(caseOn).to.have.lengthOf(3);
      expect(caseOn).to.have.all.keys('one', 'One', 'oNe');
      expect(caseOff).to.have.lengthOf(1);
      expect(caseOff).to.have.all.keys('one');
      expect(caseOff.get('one')).to.equal(1);
    });
    it('should handle different delimiter option', () => {
      const termFrequency = calculateTermFrequency('one,two,three', {
        delim: ','
      });
      expect(termFrequency).to.have.lengthOf(3);
      expect(termFrequency).to.have.all.keys('one', 'two', 'three');
    });
  });
});
