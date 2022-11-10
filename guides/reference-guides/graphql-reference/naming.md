# GraphQL naming conventions

TerminusDB has its own flexible schema language which is designed to
be compatible with RDF. The RDF world identifies resources with IRIs
which are flexible, and use a relatively large space of avilable
characters.

GraphQL, by contrast has a very restrictive allowed character set for
naming. Essentially only Alpha numeric characters using un-accented
Latin. That is, it is essentially restricted to `[A-Z][a-z][0-9][_]`.

Because of this we have some naming conventions to translate
automatically from TerminusDB classes and properties to GraphQL named
classes and properties. While we have endevoured to do so in a way
that is unlikely to create naming collisions, these are never-the-less
possible.

TerminusDB generates [GraphQL schema](graph_ql_schema.md)
automatically as a mapping from TerminusDB. TerminusDB's definition
language is a strict super-set of GraphQL and so is able to faithfully
represent GraphQL features.

For each class in TerminusDB, there are a range of classes which are
defined automatically by TerminusDB in the associated GraphQL schema.

## Translation

All names of GraphQL classes TerminusDB
