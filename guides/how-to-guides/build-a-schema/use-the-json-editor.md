---
description: >-
  You can edit a schema directly as JSON in the TerminusCMS user interface using
  the JSON view
---

# Use the JSON Editor

<figure><img src="../../../.gitbook/assets/new-data-product2.png" alt=""><figcaption></figcaption></figure>

### Create a schema as JSON

Now click on the pink bubbles on the left panel. This takes you to the schema builder page. Select JSON view from the tab and you'll see your entire schema as JSON.

<figure><img src="../../../.gitbook/assets/schema-as-code.png" alt=""><figcaption></figcaption></figure>

If you click on the Edit button in the upper right-hand corner, you'll be able to directly edit the schema.

If you have no data in your database, it should be possible to freely edit the schema. However, if you have data, then you may not be able to make arbitrary edits. The schema editor will warn you upon submission if some restrictions are violated.

Essentially it should _always_ be possible to [weaken](../../../explanations/weakening-schema.md) the schema safely through the interface. However, other changes will require schema migration _which is coming soon._
