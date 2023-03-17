---
description: How-to create a database using the TerminusDB Python Client
---

# Create a Database

To create a database with an already [connected client](https://github.com/terminusdb/terminuscms-docs/blob/a58cd397c598e0d1a582a0432d25bdf318eea56e/how-to/use-the-clients/python-client/connect-with-python-client.md), you can write:

```python
dbid="MyDatabase"
label="My Database",
description="This is a database which is mine"
prefixes = {'@base' : 'iri:///mydatabase/',
            '@schema' : 'iri:///mydatabase#'}
team="MyTeam"
client.create_database(
    dbid,
    team,
    label=label,
    description=description,
    prefixes=prefixes)
```

This creates a new database called `"MyDatabase"` using the descriptive label `"My Database"`. It starts the database with special `@base` and `@schema` prefixes, all in the team named `"MyTeam"`
