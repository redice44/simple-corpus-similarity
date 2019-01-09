const documentFrequency = (corpus, term) =>
  corpus.reduce((acc, document) => {
    return acc + queryDocument(document, term);
  }, 0);

const queryDocument = (document, term) => (document[term] ? 1 : 0);

module.exports.documentFrequency = documentFrequency;
module.exports.queryDocument = queryDocument;
