---
description: How to read documents using WOQL
---

# Read Documents

{% hint style="info" %}
To use this How-To, first [clone the Star Wars demo](../cloning-a-demo-project.md) into your team on TerminusCMS. You will then have full access to the data needed for this tutorial
{% endhint %}

You can read a document after finding the document id as follows:

```javascript
let v = Vars("doc", "id");
and(isa(v.id, "People"),
    triple(v.id, "label", string("Bossk")),
    read_document(v.id, v.doc))
```

This finds a `People` document and makes sure it has the label `"Boosk"`. It then reads the document into the variable `doc`.
