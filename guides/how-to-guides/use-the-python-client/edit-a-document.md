---
description: How-to update a document in TerminusDB and TerminusCMS using the Python Client
---

# Edit a Document

To update a document in your database, you first need to [get the document](get-documents.md) you want to change. You then need to make your changes and update it. This example shows how -

```python
doc = {
    '@id'     : 'Player/George',
    '@type'   : 'Player',
    'name'    : 'George',
    'position': 'Center Back'
  }

doc["position"] = "Full Back"
client.update_document(doc)
```
