---
description: An overview of the GraphQL and WOQL playgrounds in the TerminusCMS dashboard
---

# GraphQL & WOQL Playgrounds

TerminusCMS features a query playground for [GraphQL](../../guides/reference-guides/graphql-reference/graphql\_query.md) and [WOQL](../../explanations/woql.md).

### GraphQL Playground

<figure><img src="../../.gitbook/assets/graphql-playground.png" alt="GraphQL playground"><figcaption></figcaption></figure>

TerminusCMS includes GraphiQL to experiment and test queries. It automatically generates the GraphQL schema based on the project's schema.&#x20;

It includes -

* List of root types within the project
* Autofill to aid query construction
* Pretty print
* Results panel
* Error reporting

For more details about the types of queries available with GraphQL, such as path queries, filters, and arguments, please refer to the [GraphQL reference guide](../../guides/reference-guides/graphql-reference/).

### WOQL Playground

<figure><img src="../../.gitbook/assets/woql-playground.jpg" alt=""><figcaption></figcaption></figure>

Web Object Query Language (WOQL) is a powerful and sophisticated query language which allows you to concisely express complex patterns over arbitrary data structures.&#x20;

The playground enables users to build WOQL queries to experiment and test. Users can also -

* View query as JSON-LD format
* Copy the query
* See results
* Select query parameters based on the schema (left side of the screen)

Please see these other resources for understanding and using WOQL -

* [WOQL Basics](../../explanations/relational-vs-graph-databases/woql-query-basics.md)
* [JavaScript Client WOQL reference guide](../../guides/reference-guides/javascript-client-reference/)
* [Python Client WOQL reference guide](../../guides/reference-guides/python-client-reference/)

