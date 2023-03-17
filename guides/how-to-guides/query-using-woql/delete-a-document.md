---
description: How to delete a document using WOQL
---

# Delete a Document

{% hint style="info" %}
To use this How-To, first [clone the Star Wars demo](../cloning-a-demo-project.md) into your team on TerminusCMS. You will then have full access to the data needed for this tutorial
{% endhint %}

It is possible to delete a document in WOQL using the `delete_document` keyword.

First lets insert a document.

```javascript
let v = Vars("id");
insert_document(doc({'@type' : 'Planet', label: 'Planet-X'}), v.id)
```

Supposing we get back the following:

```json
"Planet/01dd97a75800f01f43ab7ab55b6dd08f198dd34d2bdbbeeb7bf4edee45111863"
```

Now we can delete it with:

```javascript
delete_document("Planet/01dd97a75800f01f43ab7ab55b6dd08f198dd34d2bdbbeeb7bf4edee45111863")
```
