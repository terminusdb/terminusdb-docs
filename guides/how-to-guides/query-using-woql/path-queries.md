---
description: How to perform path queries using WOQL
---

# Path Queries

{% hint style="info" %}
To use this How-To, first [clone the Star Wars demo](../cloning-a-demo-project.md) into your team on TerminusCMS. You will then have full access to the data needed for this tutorial
{% endhint %}

### How to use `path`

TerminusCMS gives us [path queries](../../reference-guides/path-queries.md) that allow us to express chains of relationships succinctly.

The `path` keyword enables you to find a path through the graph traversing intermediate edges. An example would be finding a group of individuals who have at some point shared a vehicle as pilots, or piloted another vehicle that was shared with someone. This is a _transitive_ relationship and will explore the entire graph.

For instance

```javascript
let v = Vars("person1", "person2");
path(v.person1, "(<pilot,pilot>)+", v.person2)
```

This `path` means we follow the `pilot` field _backward_ (because of the `<` arrow), to the vehicle of which the person is a pilot and then follow it forwards `pilot>` any number of times _but at least once_ which is what the `+` means.

The path itself can also be returned by adding another field, as so:

```javascript
let v = Vars("person1", "person2", "path");
path(v.person1, "(<pilot,pilot>)+", v.person2, v.path)
```

This can be inspected to understand the manner in which we got from `person1` to `person2`.
