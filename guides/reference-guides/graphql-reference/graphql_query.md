# GraphQL Queries

GraphQL queries are composed of:

* Queries
* Arguments
* Fields

Each Class in TerminusDB automatically generates a top-level Query. Each property of the class automatically generates both arguments and fields.

The names of the types of arguments and fields are generated automatically [subject to name mapping](naming.md).

In turn, each property which is an edge leading to a new object of a class will have its own field with arguments.

Each concrete data query will be terminal and will generate a specific field parameter for search.

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
type Query {
  Person(
    id: ID

    """skip N elements"""
    offset: Int

    """limit results to N elements"""
    limit: Int
    filter: Person_Filter

    """order by the given fields"""
    orderBy: Person_Ordering
  ): [Person!]!
}

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

The `Person` query, allows you to query for a person at the top level, along with a number of arguments, including: a `filter` (for search), a `limit` for reducing to a defined length of results, an `offset`, for obtaining results starting from some offset (for use in _paging_) and an `orderBy` to obtain the results in a defined order.

In addition, we have the various _fields_ of a `Person` object, each of which may have arguments if they are objects or simple data types for terminal fields.

One can use such a query by using the [GraphQL endpoint](connecting\_to\_graphql.md).

## Arguments

Arguments are restrictions or meta-fields about the query. These can be used to limit results, or filter to specific results, as well as perform ordering.

### `id`

The id of an object can be directly supplied, in order to ensure that we only obtain the specific object of interest.

A person might be retrieved by supplying the id as a variable in the following way:

```graphql
query Person(id:$id){
  name
}
```

### `offset`

GraphQL will retrieve all objects in the database for a given class type, unless `offset` and `limit` are supplied. `offset` will start a query from a given result offset, allowing the query user to _page_ results.

```graphql
query Person(limit: 3 offset: 3){
  name
    Person(
    id: ID

    """skip N elements"""
    offset: Int

    """limit results to N elements"""
    limit: Int
    filter: Person_Filter

    """order by the given fields"""
    orderBy: Person_Ordering
  ): [Person!]!
}
```

This query retrieves the second page of a 3-object page of persons.

### `limit`

GraphQL will retrieve all objects in the database for a given class type, unless `offset` and `limit` are supplied. `limit` will only find the limit-number of results, allowing the query user to _page_ results.

```graphql
query Person(limit: 3 offset: 3){
  name
}
```

This query retrieves the second page of a 3-object page of persons.

### `orderBy`

The orderBy filter allows the user to order results according to some data in the object. For instance, to create an ordering on people, we might write:

```graphql
query Person(limit: 3 offset: 3, orderBy: { dob: DESC, name: ASC}){
  name
  dob
}
```

This will yield Persons from youngest to oldest, ordering by name in the event of a "tie" on date of birth.

## `filter`

Filters allow you to restrict to specific results by reducing the set to those objects which match the filter fields.

Each filter is an input object, defined for the specific class and generated automatically by TerminusDB. The `Person` object defined above gets the input objects:

```graphql
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

Filters can apply to immediate values, such as the `dob` (date of birth), which can be restricted using a time comparison, or they can be filters on linked objects, such as the `Person_Collection_Filter` which allows us to compare with our friends.

In GraphQL we might write a simple query over people as:

```graphql
query Person(orderBy: { name: ASC},
             filter: { name: {regex: "(Joe|Joseph)"},
                       _and: [{friend:
                                 {someHave:
                                    {name: {regex: "(Jim|James)"}}}}]}){
  name
  dob
}
```

This finds name and date of birth of all people who have a name which contains "Joe" or "Joesph" and who are friends with someone named "Jim" or "James", in order of ascending name.

## Filter Builtin Types

Filters have to work with all of the GraphQL base types, along with the extensions which TerminusDB currently supports (`DateTime`, and `BigInt`).

### BigIntFilterInputObject

Big integers use the widely available `BigInt` type extension to GraphQL.

The Filters available for BigInt are:

* `eq`: Equality
* `ne`: disequality
* `lt`: Less than
* `le`: Less than or equal
* `gt`: Greater than
* `ge`: Greater than or equal

When a field of an object refers to a `BigInt`, we can filter it by writing a query along the following lines:

```graphql
query {
   Event(filter : { years_since_big_bang : { ge : "8000000000"}}){
     event_name
     years_since_big_bang
   }
}
```

### DateTimeFilterInputObject

Date time objects use the widely available `DateTime` type extension to GraphQL.

The Filters available for BigInt are:

* `eq`: Equality
* `ne`: disequality
* `lt`: Less than
* `le`: Less than or equal
* `gt`: Greater than
* `ge`: Greater than or equal

```graphql
query {
   Event(filter : { date_of_event : { ge : "2000-01-01T00:00:00Z"}}){
     event_name
     date_of_event
   }
}
```

### StringFilterInputObject

Strings are native GraphQL types. TerminusDB exposes the following filter options for strings:

* `eq`: Equality
* `ne`: Disequality
* `lt`: Less than
* `le`: Less than or equal
* `gt`: Greater than
* `ge`: Greater than or equal
* `regex`: Matches regex
* `startsWith`: Matches the string prefix
* `allOfTerms`: Contains all terms in the list of terms
* `anyOfTerms`: Contains any of the terms in the list of terms

A query filter using strings could be written as follows:

```graphql
query {
   Event(filter : { event_name : { regex : "[Cc]elstial [Ee]vent"}}){
     event_name
   }
}
```

### BooleanFilterInputObject

Booleans are native GraphQL types. TerminusDB exposes the following filter options:

* `eq`: Equality
* `ne`: Disequality

A query filter using booleans could be written as follows:

```graphql
query {
   Event(filter : { is_super_nova : { eq : true}}){
     event_name
   }
}
```

### SmallIntegerFilterInputObject

Integers (signed, 32-bit integers) are native GraphQL types. TerminusDB exposes the following filter options:

* `eq`: Equality
* `ne`: disequality
* `lt`: Less than
* `le`: Less than or equal
* `gt`: Greater than
* `ge`: Greater than or equal

A query filter using booleans could be written as follows:

```graphql
query {
   Civilization(filter : { kardashev_scale : { ge : 3}}){
     name
     kardashev_scale
   }
}
```

### `_and`

The `_and` filter combinator allows us to chain constraints. It takes two filter objects relevant at the current level.

We can find all civilizations of a high Kardashev scale using a query such as:

```graphql
query {
   Civilization(filter : {_and : [{ kardashev_scale : { le : 5}}
                                  { kardashev_scale : { ge : 3}}]){
     name
     kardashev_scale
   }
}
```

### `_or`

The `_or` filter combinator allows us to make choices of constraints. It takes two filter objects relevant at the current level. It is implicitly combined as if with `_and`, with any filters at the current level.

We can find all civilizations of a high Kardashev scale, which is also a galactic civilisation using a query such as:

```graphql
query {
   Civilization(filter : { galactic_scale : {eq : true},
                           _or : [{ kardashev_scale : { eq : 2}}
                                  { kardashev_scale : { eq : 3}}]){
     name
     kardashev_scale
   }
}
```

### `_not`

The `_not` operator allows us to combine other constraints with _dis-constraints_, which remove any elements which match its sub-filter.

We can ask for galactic civilizations which have not mastered energy acquisition at level 3 on the Kardashev scale.

```graphql
query {
   Civilization(filter : { galactic_scale : {eq : true},
                           _not : { kardashev_scale : { eq : 3}}}){
     name
     kardashev_scale
   }
}
```

## Fields

Each TerminusDB class has associated with it, some number of fields. These fields include each field that is defined in the class.

For instance, given the TerminusDB class:

```json
{ "@type" : "Class",
  "@id" : "Person",
  "name" : "xsd:string",
  "dob" : "xsd:dateTime",
  "friend" : {"@type" : "Set", "@class" : "Person" }}
```

We have a query field for each of `name`, `dob` and `friend`. However we also have the following specially defined fields:

### `_id`

This returns the fully qualified URI of the given instance of the `Person` class being returned.

### `_type`

This returns the class at which this instance is instantiated. This is useful when a super-class is queried, as we can obtain what concrete subclass it corresponds to.

### Backlinks: `_PROPERTY_of_CLASS`

The _backlink_ is a way to find all instances that _point_ to a given class. The backlink is generated automatically for every edge which terminates at the current class.

For example, with the Person class:

```json
{ "@type" : "Class",
  "@id" : "Person",
  "name" : "xsd:string",
  "dob" : "xsd:dateTime",
  "friend" : {"@type" : "Set", "@class" : "Person" }}
```

We automatically get the backlink `_friend_of_Person` that says which people view us as their friends.

For instance, we can construct the following query:

```graphql
{
  Person{
    name
    _friend_of_Person{
      name
    }
  }
}
```

This will find the name of every person who views the top level `Person` us as their friend (i.e. has a `friend` link to the current person).

### Path Queries: `_path_to_CLASS`

A path query allows us to use regular graph expressions to follow links from the current object to another object of `CLASS`.

Using the `Person` example:

```json
{ "@type" : "Class",
  "@id" : "Person",
  "name" : "xsd:string",
  "dob" : "xsd:dateTime",
  "friend" : {"@type" : "Set", "@class" : "Person" }}
```

We can find everyone within 2-degrees of separation with the following path query:

```json
{
  Person{
    name
    _path_to_Person(path: "friend{1,3}"){
      name
    }
  }
}
```

See the [complete syntax for path queries](../path-queries.md) for more details on the semantics of the path argument.
