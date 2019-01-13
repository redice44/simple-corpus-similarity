# Simple Corpus Similarity

Simple implementation to detect document similarity in a corpus. Not intended for NLP.

> Note: Not optimized for speed nor space.
> Note: JS precision loss is acceptable.

## Usage

```javascript
const similarityMatrix = require('@redice44/simple-corpus-similarity');
const corpus = [
  'Here is some document',
  'There is another'
];
const matrix = similarityMatrix(corpus);
```

## Algorithm Details

### Document Vector

Implements TF-IDF

- Frequency count based TF
- log base 10 IDF

### Document Similarity

Implements cosine similarity
