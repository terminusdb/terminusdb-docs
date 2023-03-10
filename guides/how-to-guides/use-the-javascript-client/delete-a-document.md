---
description: >-
  How-to delete a document in TerminusDB and TerminusCMS using the JavaScript
  Client
---

# Delete a Document

In order to delete a document you need to know the document id.

```javascript
const deleteDoc = async () => {
  const docId = "Player/George"
  await client.deleteDoc({id:docId});
  console.log(`the ${docId} has been deleted`)
}
```
