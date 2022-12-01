# System Graph Inferface to GraphQL

## System Graph interface to GraphQL

TerminusDB also exposes its internal working graphs, the system graph, the meta graph, and the commit-graph. These three graphs can be queried with a self-documenting GraphQL interface by going to the appropriate API for a data product.

## System Graph

For instance, to get _only_ system graph access, you can use the following endpoint:

```
http://127.0.0.1:6363/api/graphql/_system
```

## Meta Graph

To get the System Graph and Meta graph which belongs to a specific data product you can use the following endpoint:

```
http://127.0.0.1:6363/api/graphql/ORG/DATA_PRODUCT/_meta
```

## Commit Graph

To get access to branches, commits, commit logs, as well as the meta and system graph, you can use the following endpoint:

```
http://127.0.0.1:6363/api/graphql/ORG/DATA_PRODUCT/local/_commits
```
