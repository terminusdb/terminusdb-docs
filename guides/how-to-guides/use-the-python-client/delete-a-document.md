---
description: How-to delete a document in TerminusDB and TerminusCMS using the Python Client
---

# Delete a Document

In order to delete a document you need to know the document id.

```python
doc_id = "Player/George"
client.delete_document(doc_id)
```
