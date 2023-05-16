---
description: >-
  This how-to guide provides an example of the WOQL query language using the
  Python client.
---

# Run a WOQL Query

Assume that you have [installed the client](https://github.com/terminusdb/terminuscms-docs/blob/main/how-to/use-the-clients/python-client/install-the-python-client.md), [connected to a database](https://github.com/terminusdb/terminuscms-docs/blob/main/how-to/use-the-clients/python-client/connect-to-a-database.md), and [connected with a client](https://github.com/terminusdb/terminuscms-docs/blob/main/how-to/use-the-clients/python-client/connect-with-python-client.md).

### WOQLQuery

Writing WOQL queries in Python is fairly simple. We have a WOQLQuery class that can be used to construct WOQL Queries.

A simple example, in which we get all the names of the people in the database:

```python
from terminusdb_client import WOQLQuery, WOQLClient

query = WOQLQuery().woql_and(
    WOQLQuery().triple('v:PersonId', 'rdf:type', '@schema:Person'),
    WOQLQuery().triple('v:PersonId', '@schema:name', 'v:Name')
)
result = client.query(query)
```
