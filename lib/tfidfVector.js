"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryDocument = exports.documentFrequency = exports.inverseDocumentFrequency = exports.termFrequencyVector = exports.tfidfVectors = exports.similarityMatrix = void 0;

var _similarity = require("./similarity");

var similarityMatrix = function similarityMatrix(corpus) {
  var documentTermFrequencyVectors = corpus.map(function (document) {
    return termFrequencyVector(document);
  });

  var _tfidfVectors = tfidfVectors(documentTermFrequencyVectors);

  return _tfidfVectors.map(function (v1) {
    return _tfidfVectors.map(function (v2) {
      var coercedV1 = new Map();
      var coercedV2 = new Map();
      v1.forEach(function (value, term) {
        return coercedV1.set(term, value);
      });
      v2.forEach(function (value, term) {
        coercedV2.set(term, value);

        if (!coercedV1.has(term)) {
          coercedV1.set(term, 0);
        }
      });
      v1.forEach(function (value, term) {
        if (!coercedV2.has(term)) {
          coercedV2.set(term, 0);
        }
      });
      return (0, _similarity.cosineSimilarity)(coercedV1, coercedV2);
    });
  });
};

exports.similarityMatrix = similarityMatrix;

var tfidfVectors = function tfidfVectors(documentTermFrequencyVectors) {
  return documentTermFrequencyVectors.map(function (dtf) {
    var vector = new Map();
    dtf.forEach(function (value, term) {
      vector.set(term, inverseDocumentFrequency(documentTermFrequencyVectors, term) * value);
    });
    return vector;
  });
};

exports.tfidfVectors = tfidfVectors;

var termFrequencyVector = function termFrequencyVector(document) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$delim = _ref.delim,
      delim = _ref$delim === void 0 ? ' ' : _ref$delim,
      _ref$caseSensitive = _ref.caseSensitive,
      caseSensitive = _ref$caseSensitive === void 0 ? false : _ref$caseSensitive;

  var termsFrequency = new Map();
  var terms = document.split(delim).map(function (term) {
    return caseSensitive ? term.trim() : term.toLowerCase().trim();
  }).filter(function (term) {
    return term;
  });
  terms.forEach(function (term) {
    if (termsFrequency.has(term)) {
      termsFrequency.set(term, termsFrequency.get(term) + 1);
    } else {
      termsFrequency.set(term, 1);
    }
  });
  termsFrequency.forEach(function (value, term) {
    return termsFrequency.set(term, value / terms.length);
  });
  return termsFrequency;
};

exports.termFrequencyVector = termFrequencyVector;

var inverseDocumentFrequency = function inverseDocumentFrequency(corpus, term) {
  var docFrequency = documentFrequency(corpus, term);

  if (docFrequency === 0) {
    return 0;
  }

  return Math.log10(corpus.length / docFrequency);
};

exports.inverseDocumentFrequency = inverseDocumentFrequency;

var documentFrequency = function documentFrequency(corpus, term) {
  return corpus.reduce(function (acc, document) {
    return acc + queryDocument(document, term);
  }, 0);
};

exports.documentFrequency = documentFrequency;

var queryDocument = function queryDocument(document, term) {
  return document.has(term) ? 1 : 0;
};

exports.queryDocument = queryDocument;