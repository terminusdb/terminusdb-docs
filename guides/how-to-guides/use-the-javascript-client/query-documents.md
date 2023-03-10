---
description: How-to perform basic document queries using the JavaScript Client
---

# Query Documents

Get a list of documents matching a query. For more advanced queries, take a look at the [GraphQL](../query-using-graphql/) and [WOQL](../query-using-woql/) how-to guides.

{% code overflow="wrap" %}
```javascript
const queryDocuments = async () => {

  const queryTemplate = { "position": "Full Back" }

  const result = await client.getDocument({"@type":"Player","as_list":true,"query":queryTemplate});
  console.log("Query Documents",result)
}
```
{% endcode %}

```json
[{"@type" : "Player",
  "name" : "Doug",
  "position" : "Full Back"}]
```
