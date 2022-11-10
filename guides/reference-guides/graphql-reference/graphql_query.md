# Querying GraphQL in TerminusDB

GraphQL queries are composed of:

* Fields
* Arguments

Each Class in TerminusDB automatically generates a top level query
field, with the name of the class [subject to name
mapping](naming.md), along with a field for each of its properties. In
turn, each property which is an edge leading to a new object of a
class, will have its own field with arguments. Each concrete data
query will be terminal.


## Example

For example, using the following TerminusDB schema:

```json
{ "@type" : "Class",
  "@id" : "Person",
  "name" : "xsd:string",
  "dob" : "xsd:dateTime",
  "friend" : {"@type" : "Set", "@class" : "Person" }}
```

TerminusDB will generate the following GraphQL class.

```graphql
type Person {
  dob: DateTime!
  friend(
    id: ID

    """skip N elements"""
    offset: Int

    """limit results to N elements"""
    limit: Int
    filter: Person_Filter

    """order by the given fields"""
    orderBy: Person_Ordering
  ): [Person!]!
  name: String!
  id: ID!
}
```

And one can then query this using the [GraphQL endpoint](connecting_to_graphql.md).

## Arguments

Arguments are restrictions or meta-fields about the query. These can
be used to limit results, or filter to specific results, as well as
perform ordering.

### id

### offset

### limit

### orderBy

## filter

Filters allow you to restrict to specific results by reducing the set
to those objects which match the filter fields.

Each filter is an input object, defined for the specific class and
generated automatically by TerminusDB. The `Person` object defined
above gets the input objects:

```
input Person_Filter {
  dob: DateTimeFilterInputObject
  friend: Person_Collection_Filter
  name: StringFilterInputObject
  _and: [Person_Filter!]
  _or: [Person_Filter!]
  _not: Person_Filter
}

input Person_Collection_Filter {
  someHave: Person_Filter
  allHave: Person_Filter
}

input StringFilterInputObject {
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

input DateTimeFilterInputObject {
  eq: DateTime
  ne: DateTime
  lt: DateTime
  le: DateTime
  gt: DateTime
  ge: DateTime
}
```

Filters can apply to immediate values, such as the `dob` (date of
birth), which can be restricted using a time comparison, or they can
be filters on linked objects, such as the `Person_Collection_Filter`
which allows us to compare with our friends.

In GraphQL we might write:

### DateTimeFilterInputObject

### StringFilterInputObject

### _and

### _or

### _not

## Type comparisons
