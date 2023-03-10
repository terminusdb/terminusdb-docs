---
description: >-
  How-to update a document in TerminusDB and TerminusCMS using the JavaScript
  Client
---

# Edit a Document

To update documents in your database, you first need to [get the document](get-documents.md) you want to change. You then need to make your changes and update it. This example shows how -

```javascript
const docs = {
    '@id'   : 'Player/George',
    '@type' : 'Player',
    name    : 'George',
    position: 'Center Back' 
  }

docs.position = "Full Back"

const updateDocs = async () => {
  const result = await client.updateDocument(docs);
  console.log("updated document", result)
}
```
