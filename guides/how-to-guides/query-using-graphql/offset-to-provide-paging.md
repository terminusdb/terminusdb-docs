---
description: Using offset to provide paging in GraphQL
---

# Offset to provide paging

{% hint style="info" %}
To use this How-To, first [clone the Star Wars demo](../cloning-a-demo-project.md) into your team on TerminusCMS. You will then have full access to the data needed for this tutorial
{% endhint %}

<figure><img src="../../../.gitbook/assets/how-to-clone-a-demo.png" alt="Clone the Star Wars project from the TerminusCMS dashboard"><figcaption></figcaption></figure>

Once you have cloned the database, go to the GraphQL icon (triangle in hexagon) on the left-hand side and select the filing cabinet icon.

<figure><img src="../../../.gitbook/assets/how-to-query-graphql.png" alt="GraphQL playground in the TerminusCMS dashboard"><figcaption></figcaption></figure>

There are two panels, one on the left for query, and one on the right for results.

### Adding an offset

The `offset` keyword is most often used with the [limit](https://github.com/terminusdb/terminuscms-docs/blob/main/how-to/query/graphql/limit.md) keyword which when used together enables paging of results.

For instance, we can get exactly 5 people from the star-wars universe by specifying the query here:

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

If we then want to get the _next_ page of data we can write:

```graphql
query{
   People(limit: 5, offset: 5){
      label
   }
}
```

This will result in:

```json
{
  "data": {
    "People": [
      {
        "label": "Han Solo"
      },
      {
        "label": "Greedo"
      },
      {
        "label": "Jabba Desilijic Tiure"
      },
      {
        "label": "Wedge Antilles"
      },
      {
        "label": "Jek Tono Porkins"
      }
    ]
  }
}
```
