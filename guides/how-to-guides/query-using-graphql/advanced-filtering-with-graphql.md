---
description: Use advanced filtering techniques for GraphQL queries
---

# Advanced Filtering with GraphQL

{% hint style="info" %}
To use this How-To, first [clone the Star Wars demo](../cloning-a-demo-project.md) into your team on TerminusCMS. You will then have full access to the data needed for this tutorial
{% endhint %}

TerminusDB exposes a _filter_ object, which can be used to select specific documents. See here for basic [Filtering](https://github.com/terminusdb/terminuscms-docs/blob/main/how-to/query/graphql/filter.md)

Now we can filter the homeworld of the people we are interested in. We will use a `regex` because Tatooine is hard to spell.

```graphql
query{
   People(filter: { homeworld: { label: { regex : "Tat.*" }}}){
     label
     homeworld{
       label
     }
   }
}
```

You can also find out what fields are available with the same `Ctrl-c` trick. Now, fire off the query above, and you'll see something like:

```json
{
  "data": {
    "People": [
      {
        "label": "Luke Skywalker",
        "homeworld": {
          "label": "Tatooine"
        }
      },
      {
        "label": "Anakin Skywalker",
        "homeworld": {
          "label": "Tatooine"
        }
      },
      {
        "label": "C-3PO",
        "homeworld": {
          "label": "Tatooine"
        }
      },
      {
        "label": "Darth Vader",
        "homeworld": {
          "label": "Tatooine"
        }
      },
      {
        "label": "Shmi Skywalker",
        "homeworld": {
          "label": "Tatooine"
        }
      },
      {
        "label": "Owen Lars",
        "homeworld": {
          "label": "Tatooine"
        }
      },
      {
        "label": "Cliegg Lars",
        "homeworld": {
          "label": "Tatooine"
        }
      },
      {
        "label": "Beru Whitesun lars",
        "homeworld": {
          "label": "Tatooine"
        }
      },
      {
        "label": "R5-D4",
        "homeworld": {
          "label": "Tatooine"
        }
      },
      {
        "label": "Biggs Darklighter",
        "homeworld": {
          "label": "Tatooine"
        }
      }
    ]
  }
}
```

### Adding conjunctions

We can also add other elements to the filter, by using the `_and` keyword. This requires that both filters are true.

```graphql
query{
  People(filter:{ _and : [ {homeworld : {label : {eq : "Coruscant"}}},
                           {species : {label : { eq: "Human"}}},
                         ]}){
    label
    species{
      label
    }
    homeworld{
      label
    }
  }
}
```

Which yields:

```
{
  "data": {
    "People": [
      {
        "label": "Finis Valorum",
        "species": {
          "label": "Human"
        },
        "homeworld": {
          "label": "Coruscant"
        }
      },
      {
        "label": "Jocasta Nu",
        "species": {
          "label": "Human"
        },
        "homeworld": {
          "label": "Coruscant"
        }
      }
    ]
  }
}
```

### `_not` and `_or`

You can also use `_not` and `_or` keywords to create even more complex filters. To find all species, excluding droids with a lifespan greater than 500 who don't have a typical sort of skin colour, you can write the following:

```graphql
{
  Species(
    filter: {_and : [
      {_not :{label:{eq:"Droid"}}},
      {_or :[
        {average_lifespan:{gt : "500"}},
        {_not:
      		{skin_colors:
        		{anyOfTerms: ["blue", "black", "white", "green", "grey"
                              "brown", "red", "gray"]}}}]
      }]}
  ) {
    label
  }
}
```

And yields:

```json
{
  "data": {
    "Species": [
      {
        "label": "Yoda's species"
      },
      {
        "label": "Pau'an"
      },
      {
        "label": "Hutt"
      },
      {
        "label": "Sullustan"
      },
      {
        "label": "Cerean"
      },
      {
        "label": "Iktotchi"
      },
      {
        "label": "Tholothian"
      }
    ]
  }
}
```

### A Bit of GraphQL theory

The filter is defined as part of the query for objects. If we look at the `People` query in the Star Wars demo we see the following:

```graphql
type Query {
  People(
    id: ID
    ids: [ID!]

    """skip N elements"""
    offset: Int

    """limit results to N elements"""
    limit: Int
    filter: People_Filter

    """order by the given fields"""
    orderBy: People_Ordering
  ): [People!]!
}
```

This query exposes a `filter` argument, with the type of `People_Filter`.

A `People_Filter` in turn looks like:

```graphql
input People_Filter {
  birth_year: StringFilter
  created: DateTimeFilter
  desc: CollectionStringFilter
  edited: DateTimeFilter
  eye_color: StringFilter
  film: Film_Collection_Filter
  gender: StringFilter
  hair_colors: StringFilter
  height: StringFilter
  homeworld: Planet_Filter
  label: StringFilter
  mass: StringFilter
  skin_colors: StringFilter
  species: Species_Filter
  starship: Starship_Collection_Filter
  url: StringFilter
  vehicle: Vehicle_Collection_Filter
  _and: [People_Filter!]
  _or: [People_Filter!]
  _not: People_Filter
}
```

In this way we can recursively qualify all of the objects to which a `People` might point to, terminating at leaves that use the various concrete type filters.

For instance, the `StringFilter` looks like:

```graphql
input StringFilter {
  eq: String
  ne: String
  lt: String
  le: String
  gt: String
  ge: String
  regex: String
  startsWith: String
  allOfTerms: [String!]
  anyOfTerms: [String!]
}
```

We can specify any of these operands to narrow down our search. For more information on the operations against concrete datatypes, see the [GraphQL Reference](https://github.com/terminusdb/terminuscms-docs/blob/main/reference-guides/graphql-reference) section.
