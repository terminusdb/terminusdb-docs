---
description: >-
  How to do path queries on TerminusDB and TerminusCMS data products using
  GraphQL
---

# Path Queries in GraphQL

{% hint style="info" %}
To use this How-To, first [clone the Star Wars demo](../cloning-a-demo-project.md) into your team on TerminusCMS. You will then have full access to the data needed for this tutorial
{% endhint %}

### Using a Path Query

Sometimes we want to search for links that are not immediate, but need to follow a chain of links to get the object of interest. TerminusCMS gives us [path queries](../../reference-guides/path-queries.md) which allow us to succinctly express this.

We can find a path in GraphQL by using the `_path_to_CLASS` query, where CLASS is the name of one of our classes. One path should be populated for each of the available classes.

To find everyone who was in a film with Chewbacca, we can write:

```graphql
query{
   People(filter:{label:{eq:"Chewbacca"}}){
     label
     _path_to_People(path:"film,<film"){
       label
    }
  }
}
```

The `film` is the current film at which the Chewbacca object points at. Then `<film` means follow _backwards_ to people in the film field.

This process can be repeated to find second-order connections, as follows:

```graphql
query{
   People(filter:{label:{eq:"Chewbacca"}}){
     label
     _path_to_People(path:"(film,<film){1,2}"){
       label
    }
  }
}
```

This says that we should repeat the process one or two times before terminating.

More complex patterns can be built using the full [path query syntax](../../reference-guides/path-queries.md) described in our documentation.
