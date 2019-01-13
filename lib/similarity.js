"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.magnitude = exports.dotProduct = exports.cosineSimilarity = void 0;

var cosineSimilarity = function cosineSimilarity(v1, v2) {
  var m1 = magnitude(v1);
  var m2 = magnitude(v2);

  if (m1 === 0 || m2 === 0) {
    return 0;
  }

  return dotProduct(v1, v2) / (m1 * m2);
};

exports.cosineSimilarity = cosineSimilarity;

var dotProduct = function dotProduct(v1, v2) {
  if (v1.size !== v2.size) {
    throw new Error('Vectors must be of the same length');
  }

  var total = 0;
  v1.forEach(function (v1Value, term) {
    var v2Value = v2.get(term);

    if (v2Value === undefined) {
      throw new Error('Vectors must be in the same vector space.');
    }

    total += v1Value * v2Value;
  });
  return total;
};

exports.dotProduct = dotProduct;

var magnitude = function magnitude(v1) {
  var v1Values = v1.values();
  var v1Current = v1Values.next();
  var total = 0;

  while (!v1Current.done) {
    total += v1Current.value * v1Current.value;
    v1Current = v1Values.next();
  }

  return Math.sqrt(total);
};

exports.magnitude = magnitude;