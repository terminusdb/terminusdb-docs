---
description: How-to perform back links in GraphQL with TerminusDB and TerminusCMS
---

# Back Links in GraphQL

{% hint style="info" %}
To use this How-To, first [clone the Star Wars demo](../cloning-a-demo-project.md) into your team on TerminusCMS. You will then have full access to the data needed for this tutorial
{% endhint %}

### Using a Back Link

Many times when we are looking at an object, we are interested in which objects are pointing to it. In TerminusCMS each object gets a number of extended queries which allows one to discover any objects which point at that object.

Once you have cloned the Star Wars demo, go to the [GraphQL query panel](https://github.com/terminusdb/terminuscms-docs/blob/main/how-to/query/graphql/query-basics.md) and type:

```graphql
query{
  People(limit:1) {
      █
  }
}
```

We would like to find the first person in the database, and then find out which starships they are the pilot of. A `Starship` has a `pilot` field, and the backlink is automatically constructed as the `pilot_of_Starship` by TerminusCMS.

```graphql
query{
   People(limit:1){
     label
     _pilot_of_Starship{
      label
    }
  }
}
```

This _back link_ will give us back the following:

```json
{
  "data": {
    "People": [
      {
        "label": "Luke Skywalker",
        "_pilot_of_Starship": [
          {
            "label": "X-wing"
          },
          {
            "label": "Imperial shuttle"
          }
        ]
      }
    ]
  }
}
```

Back linking allows us to focus on modelling our data in a natural way, while still allowing us to follow the graph in either the direction of a field or its opposite without bias.
