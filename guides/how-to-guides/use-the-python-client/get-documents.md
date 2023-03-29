---
description: How-to get documents to TerminusDB and TerminusCMS using the Python Client.
---

# Get Documents

This guide assumes that you are already connected to the database using the Python client.

### Get a single document

To get a single document to make changes or simply to view it, use the following code:

```python
document = client.get_document("Player/Doug")
```

```json
 {
    '@id'   : 'Player/Doug',
    '@type' : 'Player',
    name    : 'Doug',
    position: 'Full Back'
  }
```

### Get a list of all documents

To get a list of all documents in the database, you can use the `get_all_documents` function.

```python
documents = client.get_all_documents()
```

```json
[
  {
    '@id'   : 'Player/Doug',
    '@type' : 'Player',
    name    : 'Doug',
    position: 'Full Back'
  },
  {
    '@id'   : 'Player/George',
    '@type' : 'Player',
    name    : 'George',
    position: 'Center Back'
  },
  {
    '@id'   : 'Player/Karen',
    '@type' : 'Player',
    name    : 'Karen',
    position: 'Center Forward'
  }
]
```
