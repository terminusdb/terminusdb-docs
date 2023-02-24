---
description: >-
  How to do schema queries using WOQL with TerminusDB and TerminusCMS data
  products
---

# Schema Queries

{% hint style="info" %}
To use this How-To, first [clone the Star Wars demo](../cloning-a-demo-project.md) into your team on TerminusCMS. You will then have full access to the data needed for this tutorial
{% endhint %}

### Finding elements from the schema.

In order to query the schema, you can use _graph_ arguments to WOQL. TerminusCMS stores each branch as a pair of graphs, an instance graph and a schema graph.

We can specify the graph by passing it as an argument to the `quad` word.

To find all classes in the schema for instance, we can write:

```javascript
let v = Vars("cls");
quad(v.cls, "rdf:type", "sys:Class", "schema")
```

This results in:

| cls              |
| ---------------- |
| @schema:Film     |
| @schema:People   |
| @schema:Planet   |
| @schema:Species  |
| @schema:Starship |
| @schema:Vehicle  |

The `@schema` denotes the default schema prefix, and makes it clear that this identifier lives in the schema namespace rather than the data namespace.

We can also use the typical `triple` word if we use `from` to set our default graph to `schema` instead of `instance`.

```javascript
let v = Vars("cls");
from("schema")
  .triple(v.cls, "rdf:type", "sys:Class")
```
