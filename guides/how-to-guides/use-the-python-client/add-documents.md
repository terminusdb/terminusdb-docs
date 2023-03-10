---
description: How-to add documents to TerminusDB and TerminusCMS using the Python Client
---

# Add Documents

After you have imported the `terminusdb_client`, and [created a client](connect-with-the-python-client.md), [connected to a database](connect-to-a-database.md), and [added some schema](add-a-schema.md), you can then use this client to insert a document that conforms to the schema.

### Insert a document

To insert a document, you should use `insert_document`:

```python
document = { '@type' : 'Person', 'name' : "Jim" }
results = client.insert_document(document)
```

### Insert multiple documents

To insert multiple documents you can also invoke `insert_document`:

```python
documents = [{ '@type' : 'Person', 'name' : "Jim" },
            { '@type' : 'Person', 'name' : "Jill" }]
results = client.insert_document(document)
```

### Insert schema document(s)

Additionally, you can update the schema itself by adding schema documents:

```python
schema = { '@type' : 'Class', '@id' : 'Person', 'name' : 'xsd:string'}
results = client.insert_document(schema,graph_type="schema")
```
