---
description: >-
  Learn how to filter query results using GraphQL with TerminusDB and
  TerminusCMS
---

# Filter with GraphQL

{% hint style="info" %}
To use this How-To, first [clone the Star Wars demo](../cloning-a-demo-project.md) into your team on TerminusCMS. You will then have full access to the data needed for this tutorial
{% endhint %}

### Using a Filter

Once you have Star Wars, you can enter the data product and you can type the following in the [GraphQL query panel](graphql-basics.md):

Let's choose `homeworld`

```graphql
query{
   People(filter: { label : { █ }}){

   }
}
```

Type `Ctrl-c` and you'll be given some filters which can be used to constrain the label field.

Let's choose a regex which demonstrates the fondness the creators of Star Wars had for the 'oo' sound.

```graphql
query{
   People(filter:{ label : {regex: ".*oo.*"}}){
      label
      homeworld{
        label
      }
   }
}
```

This results in:

```json
{
  "data": {
    "People": [
      {
        "label": "Roos Tarpals",
        "homeworld": {
          "label": "Naboo"
        }
      },
      {
        "label": "Yarael Poof",
        "homeworld": {
          "label": "Quermia"
        }
      },
      {
        "label": "Plo Koon",
        "homeworld": {
          "label": "Dorin"
        }
      },
      {
        "label": "Dooku",
        "homeworld": {
          "label": "Serenno"
        }
      },
      {
        "label": "Sly Moore",
        "homeworld": {
          "label": "Umbara"
        }
      }
    ]
  }
}
```

For more sophisticated filtering, see [Advanced filtering](https://github.com/terminusdb/terminuscms-docs/blob/main/how-to/query/graphql/advanced-filter.md).
