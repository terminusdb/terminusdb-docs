# ACID Transactions

> **On this page:** An overview of ACID database transactions and implementation in TerminusDB.

## Key topics

[What is ACID?](#what-is-acidity)

[Acidity](#acidity)

[Consistency](#consistency)

[Isolation](#isolation)
  
[Durability](#durability)
 
## What is ACID?

ACID ([Atomicity](#what-is-acidity), [Consistency](#what-is-acidity), [Isolation](#what-is-acidity), [Durability](#what-is-acidity)) are properties of database transactions that are generally considered desirable for many applications.

## Atomicity

Atomicity is an all-or-nothing approach to database transactions. If a transaction starts but does not complete, then all data manipulation or modification operations carried out by that transaction are undone, and any affected data or objects remain unchanged. The database is returned to the state it was in before the transaction started. Atomicity, or atomic transactions, guarantee the consistency and integrity of data and objects, ensuring the database is not left in an inconsistent or partially changed state. 

### Atomicity and immutability

TerminusDB combines atomicity with [immutability](explanation-immutability.md) to provide atomic transactions. <!-- to-do: More info needed. -->

## Consistency

Consistency has multiple forms and can be interpreted in different ways. TerminusDB implements two forms of consistency - full and partial consistency.

### Full consistency

Where a schema exists for a TerminusDB database, a transaction will not be completed unless all schema conditions are satisfied. The consistency of the schema is maintained under all conditions.

### Partial consistency 

When [rebasing](to-do), transactions that completed under certain **read-conditions** can be *replayed* by reordering their commits. Schema consistency is maintained but not under all conditions.

## Isolation

The isolation property gives a user the impression of being the sole user of a database. The user experiences no currency or conflicts with other users of the database.  

### Read isolation

TerminusDB uses inherent database [immutability](to-do) to ensure each read query exists at a given [layer](to-do) providing each user an isolated snapshot of the database.

### Write isolation

Similar to read isolation, completing write transactions ensures isolation with [optimistic concurrency](to-do), simply restarting any transactions failing mid-run.

## Durability

TerminusDB is durable. Transactions failing mid-run do not corrupt data. Data is protected from external sources of potential corruption such as operating system bugs. In the unlikely event of a partial commit, previous layers remain unchanged and recoverable. Backups are significantly simplified, requiring copy storage only to ensure a safely recoverable state.

## See also

### Documents

[Documents](explanation/explanation-documents) in a knowledge graph and how to use them.