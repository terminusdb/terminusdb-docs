---
description: >-
  How to use the order by argument in GraphQL queries with TerminusCMS and
  TerminusDB
---

# Order By in GraphQL

{% hint style="info" %}
To use this How-To, first [clone the Star Wars demo](../cloning-a-demo-project.md) into your team on TerminusCMS. You will then have full access to the data needed for this tutorial
{% endhint %}

### Ordering results of a GraphQL query

By default, results in GraphQL will choose an implementation-specific order which may not even be stable between invocations. If you need results in a _specific order_ then you need to supply an `orderBy` argument.

We can search for the names of people in reverse alphabetical order such that we only recover the first 5 results in the following way:

```graphql
query{
   People(limit:5, orderBy:{label:DESC}){
    label
  }
}
```

This will give us the following people:

```json
{
  "data": {
    "People": [
      {
        "label": "Zam Wesell"
      },
      {
        "label": "Yoda"
      },
      {
        "label": "Yarael Poof"
      },
      {
        "label": "Wilhuff Tarkin"
      },
      {
        "label": "Wicket Systri Warrick"
      }
    ]
  }
}
```

Order by can also take more than one argument, allowing us to order on more than one value using the remaining arguments when there is a tie in the preceding (lexicographic ordering).

We can see this by searching for species, and which language they speak and their name. Since many will share the same language, we can see the ordering of the fields independently.

```graphql
query{
   Species(offset:8, limit:5, orderBy:{language:ASC, label:ASC}){
    label
    language
  }
}
```

And here we have a number of Galactic Basic speakers who nevertheless are ordered by species name.

```json
{
  "data": {
    "Species": [
      {
        "label": "Ewok",
        "language": "Ewokese"
      },
      {
        "label": "Human",
        "language": "Galactic Basic"
      },
      {
        "label": "Rodian",
        "language": "Galactic Basic"
      },
      {
        "label": "Yoda's species",
        "language": "Galactic basic"
      },
      {
        "label": "Geonosian",
        "language": "Geonosian"
      }
    ]
  }
}
```
