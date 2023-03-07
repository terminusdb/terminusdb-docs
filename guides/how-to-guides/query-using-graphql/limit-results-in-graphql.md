---
description: Using limit to limit results in GraphQL
---

# Limit results in GraphQL

{% hint style="info" %}
To use this How-To, first [clone the Star Wars demo](../cloning-a-demo-project.md) into your team on TerminusCMS. You will then have full access to the data needed for this tutorial
{% endhint %}

<figure><img src="../../../.gitbook/assets/how-to-clone-a-demo.png" alt="Clone the Star Wars project from the TerminusCMS dashboard"><figcaption></figcaption></figure>

Once you have cloned the database, go to the GraphQL icon (triangle in hexagon) on the left-hand side and select the filing cabinet icon.

<figure><img src="../../../.gitbook/assets/how-to-query-graphql.png" alt="GraphQL Query Playground in TerminusCMS"><figcaption></figcaption></figure>

There are two panels, one on the left for query, and one on the right for results.

### Adding a limit

The `limit` keyword is an argument which can be passed to a query to restrict the number of results to precisely the number supplied by the argument.

For instance, we can get exactly 5 people from the Star Wars universe by specifying the query here:

```graphql
query{
   People(limit: 5){
      label
   }
}
```

This will result in

```json
{
  "data": {
    "People": [
      {
        "label": "Luke Skywalker"
      },
      {
        "label": "Obi-Wan Kenobi"
      },
      {
        "label": "Anakin Skywalker"
      },
      {
        "label": "Wilhuff Tarkin"
      },
      {
        "label": "Chewbacca"
      }
    ]
  }
}
```

If you want to page, to get the next results, you can use an [offset](https://github.com/terminusdb/terminuscms-docs/blob/main/how-to/query/graphql/offset.md)
