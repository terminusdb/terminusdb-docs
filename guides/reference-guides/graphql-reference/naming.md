# GraphQL Naming Conventions

TerminusDB has its own flexible schema language which is designed to be compatible with RDF. The RDF world identifies resources with IRIs which are flexible, and use a relatively large space of available characters.

GraphQL, by contrast, has a very restrictive allowed character set for naming. Essentially only Alphanumeric characters using un-accented Latin. That is, it is essentially restricted to `[A-Z][a-z][0-9][_]`.

Because of this, we have some naming conventions to translate automatically from TerminusDB classes and properties to GraphQL named classes and properties. While we have endevoured to do so in a way that is unlikely to create naming collisions, these are never-the-less possible.

TerminusDB generates GraphQL schema automatically as a mapping from TerminusDB. TerminusDB's definition language is a strict super-set of GraphQL and so is able to faithfully represent GraphQL features.

For each class in TerminusDB, there is a range of classes that are defined automatically by TerminusDB in the associated GraphQL schema.

## Underscore as reserved

When names are likely to create conflicts with user-defined names, TerminusDB will typically use an `_` at the beginning to avoid naming conflicts. This is done on filter fields that share the same object level with user-defined properties for instance: `_and`, `_or` and `_not`.

## Translation

All names of GraphQL classes in TerminusDB and all properties of TerminusDB classes, as well as all enums, are translated to viable GraphQL names. This is done by replacing each non-representable character with an `_`. In addition, underscores at the beginning of a class name or property are disallowed. This is to ensure there are no collisions with TerminusDB's own auto-generated properties and classes.

Should a collision arise, TerminusDB should give a GraphQL error on retrieval of the schema. In future, we will allow this check to occur at schema submission time, and will also allow explicit renaming in TerminusDB classes.

For instance, the TerminusDB class is defined as:

```json
{ "@type" : "Class",
  "@id" : "Galactic-Civilisation",
  "name" : "xsd:string",
  "kardashev-scale" : "xsd:integer" }
```

will be translated to:

```graphql
type Query {
  Galatic_Civilisation(
    id: ID

    """skip N elements"""
    offset: Int

    """limit results to N elements"""
    limit: Int
    filter: Galactic_Civilisation_Filter

    """order by the given fields"""
    orderBy: Galactic_Civilisation_Ordering
    ): [GalaticCivilsiation!]!
    name : String!
    kardashev_scale: BigInt!
}
```
