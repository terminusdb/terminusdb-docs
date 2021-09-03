# Documents

> **On this page:** An introduction to the types of documents used by TerminusDB and examples of their definitions and interactions.

## Key topics

[The TerminusDB document store](#the-terminusdb-document-store)

[Simple documents](#simple-documents)

[Documents with references](#documents-with-references)

[Subdocuments](#sub-documents)

## The TerminusDB document store

TerminusDB is a document store as well as a knowledge graph database. TerminusDB [schemata](../reference/SCHEME.md) describe how to interpret segments of graphs as self-contained documents.   

### TerminusDB storage structure

The underlying storage structure of TerminusDB is a **labelled**, **directed** and **edge-labelled** graph. Each node, both source and target, has a distinct name, every edge has a name and a direction.

<!-- to-do: Diagram -->

### Graph segments as documents

Segments of the graph are **documents**. Documents can be extracted as JSON objects, providing a convenient data package for applications. JSON objects can be updated by submitting modified versions. The graph's entire document segment can be deleted by deleting the document. However, the full graph structure is retained allowing sophisticated search and traversal.

### Subdocuments overview

Documents can contain **subdocuments**. A subdocument:

- Is owned by its containing document. 

- Is a segment of the graph which is solely pointed to by the containing document. 

- Can have any number of outgoing links to other documents or subdocuments.

See [Subdocuments](#subdocuments) for more information.

## Simple documents

Documents are described by creating a class definition in the [schema](../reference/SCHEME.md). The simplest document definition contains properties with data elements only. For example, a [football roster CSV](#code-football-roster-CSV-file) is loaded with the [football roster class definition](#code-football-roster-class-definition) below. The class definition describes the JSON document that can be submitted or retrieved from the graph. A [valid JSON document](#code-football-roster-json-document-definition), which corresponds to a row in the CSV file, is also shown below. 

#### Code: Football roster CSV file

```csv

name,   position
George, Centre Back
Doug,   Full Back
Karen,  Centre Forward


```

#### Code: Football roster class definition

```json

{ "@type"    : "@context",
  "@schema"  : "terminusdb://Roster/document/",
  "@base"    : "terminusdb://Roster/schema#" }

{ "@type"    : "Class",
  "@id"      : "Player",
  "name"     : "xsd:string",
  "position" : "xsd:string" }


```

#### Code: Football roster JSON document definition

```json

{ "@type"    : "Player",
  "@id"      : "Player/George",
  "@base"    : "terminusdb://Roster/schema#",
  "name"     : "George",
  "position" : "Centre Back" }


```

### Properties of the JSON document definition

#### Table: Properties of a JSON document

| Property | Value | Description | Used for |
| -------- | ----- | ---------- | -------- |
| `@type`  | `"Player"` | The type of data held - a football player | to-do |   
| `@id`    | `"Player/George"` | The **unambiguous** address of the document. | Retrieval, update or deletion. Or as a reference used in other documents. |
| `@base`  | `"terminusdb://Roster/schema#"` | The **fully qualified** address for `Player/George`. | 

<!-- to-do: NOT YET TRANSLATED -->

Notice, this document has an `@id` field with the value
`Player/george`. This `@id` describes the address of our document. It
will be used for retrieval, update or deletion *or* as a reference
which can be used in other documents.

The fully qualified address for `Player/george` however also includes
the `@base` as a prefix. If unambiguous, for instance when referring
to it in the same collection, then we can just use
`Player/george`. However it expands completely to:
`terminusdb://Roster/document/Player/george`.

Careful attention to the `@id` field is important. We want to
understand what makes a document unique and how to refer to it. Things
with truly unique names should use this as their `@id`. Wikipedia
actually provides an excellent example of this approach (try looking
at the Wikipedia URI for your favorite celebrity for instance).

To assist with name choice, TerminusDB also gives us the
`@key` parameter and `@base` to class definitions which enables
TerminusDB to calculate the `@id` for you. For more details on this see the [schema](../reference/SCHEME.md) documentation.

## Documents with references

The power of the TerminusDB knowledge graph comes in being able to
refer to other documents. This is what makes it a *graph* of documents.

The roster example above could be turned into an object which refers
to each player as  follows:

```json

{ "@type"     : "@context",
  "@schema"   : "terminusdb://Roster/document/",
  "@base"     : "terminusdb://Roster/schema#" }

{ "@type"     : "Class",
  "@id"       : "Player",
  "name"      : "xsd:string",
  "position"  : "xsd:string" }

{ 
  "@type"     : "Class",
  "@id"       : "Roster",
  "player"    : 
  { 
     "@type"  : "Set",
     "@class" : "Player" 
  } 
}


```

Our `Roster` class points to a `Set` of `Player`s. Set is a *type
family* which allows us to state that the `player` property can have
any number of `Player`s attached. It however provides no concept of
ordering or multiplicity (to get this, you should use `List` or
`Array`). A `Player` is either connected, or it is not.

A set of documents that meets the above specification and which represents
our CSV file might look as follows:

```json
{ "@type" : "Roster",
  "@id" : "Roster/Wolves",
  "player" : [ "Player/George", "Player/Karen", "Player/Doug" ] }

{ "@type" : "Player",
  "@id" : "Player/George",
  "name" : "George",
  "position" : "Centre Back" }

{ "@type" : "Player",
  "@id" : "Player/Doug",
  "name" : "Doug",
  "position" : "Full Back" }

{ "@type" : "Player",
  "@id" : "Player/Karen",
  "name" : "Karen",
  "position" : "Centre Forward" }
```

The `Roster` points to the various `Player` documents. When we ask for
the document `Roster/Wolves`, the document with each identifier is
returned. Each identifier can likewise be queried to get us the full
documents associated.

## Subdocuments

A subdocument is a document that can only ever be pointed to by its
containing document. It is information that is somehow internal to
the identity of some document and is not intended to be shared.

This designation also allows us to have deeply nested JSON documents
that are self-contained and can be obtained using the
[document](../reference/Document.md) interface.

An example of a subdocument might be as follows:

```json
{ "@type" : "@context",
  "@schema" : "terminusdb://Game/document/",
  "@base" : "terminusdb://Game/schema#" }

{ "@type" : "Class",
  "@id" : "Stats",
  "@subdocument" : [],
  "@key" : { "@type" : "Random"},
  "strength" : "xsd:integer",
  "intelligence" : "xsd:integer",
  "dexterity" : "xsd:integer",
  "charisma" : "xsd:integer",
  "wisdom" : "xsd:integer",
  "constitution" : "xsd:integer" }

{ "@type" : "Class",
  "@id" : "Player",
  "name" : "xsd:string",
  "stats" : "Stats" }
```

This schema specification gives us players, which have a subdocument
of stats. The `Stats` subdocument status is denoted with the
`@subdocument` property, and the special value `[]`. In addition, it
has a `Random` key, which means that we will automatically generate
the key when not provided.

The subdocument will allow us to send and retrieve our stats along
with our player object. For example:


```json

{ 
  "@type"          : "Player",
  "@id"            : "Player/Hieronymous",
  "stats"          : 
  { 
    "@type"        : "Stats",
    "strength"     : 14,
    "intelligence" : 10,
    "dexterity"    : 14,
    "charisma"     : 8,
    "wisdom"       : 12,
    "constitution" : 9 
  } 
}


```

It is also possible for subdocuments to point recursively to
subdocuments, or to other documents.

### Visualising the Graph

With both documents and subdocuments and references to other documents, we can have the best of both worlds: document storage and knowledge graph. Visualizing what this means, however, requires a bit of
experience.

![](Contact-Graph-Diagram.jpg)

In the diagram above we have an example that draws boundaries around
what constitutes a document and a subdocument. The schema which
corresponds with this might be something along the lines of:

```json
{ "@type" : "@context",
  "@schema" : "terminusdb://People/document/",
  "@base" : "terminusdb://People/schema#" }

{ "@type" : "Class",
  "@id" : "Coordinate",
  "@subdocument" : [],
  "@key" : { "@type" : "Random"},
  "lat" : "xsd:decimal",
  "long" : "xsd:decimal" }

{ "@type" : "Class",
  "@id" : "Map",
  "coordinates" : { "@type" : "Array",
                    "@class" : "Coordinate" } }

{ "@type" : "Class",
  "@id" : "Country",
  "name" : "xsd:string",
  "map" : "Map" }

{ "@type" : "Class",
  "@id" : "Address",
  "@subdocument" : [],
  "@key" : { "@type" : "Random"},
  "country" : "Country",
  "street" : "xsd:string" }

{ "@type" : "Class",
  "@id" : "Person",
  "name" : "xsd:string",
  "address" : "Address",
  "friend" : "Person" }
```

An example documents (without the full polygon
coordinate outline) might be as follows:

```json
{ "@type" : "Person",
  "@id" : "Person/Joe",
  "name" : "Joe Bloggs",
  "address" : { "@type" : "Address",
                "@id" : "Adress/aa1264e404a5b34381abc37cad83fabd",
                "street" : "Elm St.",
                "country" : "Country/USA" },
  "friend" : [ "Person/Jill" ] }

{ "@type" : "Person",
  "@id" : "Person/Jill",
  "name" : "Jill Smith",
  "address" : { "@type" : "Address",
                "@id" : "Adress/5fba7438dc2b23258d304bb8cd1222bd",
                "street" : "Main St.",
                "country" : "Country/Ireland" },
  "friend" : [ "Person/Joe" ] }

{ "@type" : "Country",
  "@id" : "Country/USA",
  "name" : "USA",
  "coordinates" : [ ... ] }

{ "@type" : "Country",
  "@id" : "Country/Ireland",
  "name" : "Ireland",
  "coordinates" : [ ... ] }
```

With a bit of practice, designing your own knowledge graph in
TerminusDB will become second nature.