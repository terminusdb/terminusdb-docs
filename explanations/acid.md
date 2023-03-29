---
description: >-
  An overview of ACID database transactions and implementation in TerminusDB and
  TerminusCMS.
---

# ACID Transactions

### What is ACID?

ACID ([Atomicity](acid.md#atomicity), [Consistency](acid.md#consistency), [Isolation](acid.md#isolation), [Durability](acid.md#durability)) are properties of database transactions that are generally considered desirable for many applications.

### Atomicity

Atomicity is an all-or-nothing approach to database transactions. If a transaction starts but does not complete, then all data manipulation or modification operations carried out by that transaction are undone, and any affected data or objects remain unchanged. The database is returned to the state it was in before the transaction started. Atomicity, or atomic transactions, guarantee the consistency and integrity of data and objects, ensuring the database is not left in an inconsistent or partially changed state.

#### Atomicity and immutability

TerminusDB combines atomicity with [immutability](immutability.md) to provide atomic transactions.

### Consistency

Consistency has multiple forms and can be interpreted in different ways. TerminusDB implements two forms of consistency - full and partial consistency.

#### Full consistency

Where a schema exists for a TerminusDB database, a transaction will not be completed unless all schema conditions are satisfied. The consistency of the schema is maintained under all conditions.

#### Partial consistency

When rebasing, transactions that complete under certain **read-conditions** can be _replayed_ by reordering their commits. Schema consistency is maintained but not under all conditions.

### Isolation

The isolation property gives a user the impression of being the sole user of a database. The user experiences no currency or conflicts with other users of the database.

#### Read isolation

TerminusDB uses inherent database [immutability](immutability.md) to ensure each read query exists at a given layer providing each user with an isolated snapshot of the database.

#### Write isolation

Similar to read isolation, completing write transactions ensures isolation with optimistic concurrency, simply restarting any transactions failing mid-run.

### Durability

TerminusDB is durable. Transactions failing mid-run do not corrupt data. Data is protected from external sources of potential corruption such as operating system bugs. In the unlikely event of a partial commit, previous layers remain unchanged and recoverable. Backups are significantly simplified, requiring copy storage only to ensure a safely recoverable state.

### Further Reading

[**Documents in a knowledge graph and how to use them**](documents.md).
