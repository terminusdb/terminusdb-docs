---
description: Add a schema to TerminusDB and TerminusCMS using the TerminusDB Python Client
---

# Add a Schema

After you have imported the `terminusdb_client`, and [created a client](connect-with-the-python-client.md), and [connected to a database](connect-to-a-database.md) you can create a schema.

### Insert schema document(s)

You can update the schema by adding well-formed JSON schema documents:

```python
schema = [{ '@type' : 'Class', '@id' : 'Country'},
          { '@type' : 'Class', '@id' : 'Person',
            'name' : 'xsd:string',
            'nationality' : 'Country'
          }]
results = client.insert_document(schema,graph_type="schema")
```
