---
description: What is 'schema weakening'?
---

# Weakening Schema

A schema describes the shape of data in a data product. It provides constraints and assurances about what kind of data will be retrieved.

However, often you need to _change_ the schema in the process of developing a data product.

### What is a weak versus a strong schema change?

A schema change is a _weakening_ of the schema if the change can not possibly invalidate any data which was present in the original schema.

Some examples of weakening include:

* Adding a new class that is not the parent of any existing class is always valid since there are no elements of this class.
* Adding a new _optional_ property to a class is also permitted.
* Changing a required field to _optional_ or _set_.

Schema weakening is often a desirable approach to schema change as we do not require alterations to any of our data. This can ensure a form of backward compatibility which can avoid problems in long-term maintenance.

### Using weakened schemas safely

The _weakening_ approach also suggests an appropriate style for the consumption of data that is received by clients. The exact shape of a document should not be relied on, as new optional properties could be added, and required properties could be weakened to become optional.

We should instead test for the existence of a field, before attempting to consume it, and we should avoid clients requiring fields that are not part of a _key_.

### Why do schemas evolve?

Schema evolution can happen at various phases in data product development.

At the beginning of schema development, it is often the case that the schema evolves very rapidly as we try to capture the important information for consideration or change the way it should be represented.

In this phase it is common for schema changes to be _strong_, that is they require that the data, if it exists, to be modified.

If there is very little data it can sometimes be more convenient to delete the data and then alter the schema, to avoid schema violations. Alternatively, one can try to use schema migration to achieve the desired changes. _Schema migration will be coming very soon_.

Later in schema evolution, there will be clients that rely on the shape of data, and any strong change will require filling data, deleting data, or modifying data which is associated with the existing schema. This strong change will _require_ schema migration, which is _coming very soon._

This also means that we need to pay special attention to keeping the two in sync. This can best be done by focusing on schema weakening, coupled with a defensive client style as described above.
