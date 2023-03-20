---
description: A how-to guide for querying arrays and Sets with WOQL
---

# Query Arrays and Sets

In TerminusDB there are a number of collection types, including `List`, `Set`, and `Array`.

While these all generate JSON lists through the document interface, they have different semantics due to their different realisation in the graph.

### Sets

Sets are the simplest objects in TerminusDB. They are simply edges with the same name that lead to more than one object.

For instance, an example the document:

```json
{ "@type" : "Class",
  "@id" : "Person",
  "name" : "xsd:string",
  "friends" : { "@type" : "Set", "@class" : "Person" }
}
```

To search for results of friends in WOQL, we can simply use `triple`.

```javascript
let v = Vars("id", "friend")
triple(v.id, "friends", v.friend)
```

If you want to get back the values in a specific order, you can use an `order_by` clause.

### Lists

To search a list of objects, you need to traverse the intermediate _cons cells_. The list is actually a graph structure shaped like:

```
∘ → ∘ rest→ ∘ rest→ ∘ rest→ rdf:nil
    ↓ first ↓ first ↓ first
    v0      v1      v2
```

This can be traversed using a [path query](https://github.com/terminusdb/terminuscms-docs/blob/f799ffc8844244121380f929b269a6952804a974/reference-guides/path-queries.md) as follows:

```javascript
let v = Vars("queue", "person")
path(v.queue, "contacts,rdf:rest*,rdf:first", v.person)
```

### Arrays

To search an array, you can use select, and group by.

```javascript
let v = Vars("queue", "arr", "person", "index")
order_by(v.index)
     .select(v.queue, v.person, v.index)
     .and(triple(v.queue, "contacts", v.arr),
          triple(v.arr, "sys:index", v.index),
          triple(v.arr, "sys:value", v.person))
```

This will give you back the array value (a person) as well as the index in the array, in order.
