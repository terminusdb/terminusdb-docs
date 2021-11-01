# Immutability

> **On this page:** An introduction to the hierarchy and system of graphs used by TerminusDB for collaboration and revision control.

TerminusDB is an immutable data store. When data is written to a store, it does not change or mutate existing data. Any deleted data is masked, any new data resulting from a transaction is added on top of the mask.

## Advantages of immutability

Immutability has several advantages, including:

- [Transaction safety](#transaction-safety)

- [Lock-free concurrency](#lock-free-concurrency)

- [Commit and branch time travel](#commit-and-branch-time-travel)

- [Change audit](#change-audit)

- [Collaboration and synchronization](#collaboration-and-synchronization)

### Transaction safety

Transactions are safer and more reliable in an immutable store and any issues during transactions are easier to handle. In most cases, even in system crashes, TerminusDB resumes operation with data integrity intact and any incomplete transactions are undone.       

### Lock-free concurrency

TerminusDB uses immutable data structures making it lock-free in most cases. The query engine uses optimistic concurrency allowing transactions to retry if their state changed while executing. The lack of locking simplifies the engine and makes deadlocks very unlikely while providing [ACID](acid-transactions) guarantees.

### Commit and branch time travel

The transaction history of TerminusDB databases is preserved. It is easy to travel back in time to a commit or branch and create a new database starting at any commit. All data and information at a commit point are immediately available, eliminating the requirement to rebuild the state of a past commit.

### Change audit

Time travel is supplemented with information about what was committed, at what date and time, and by whom. Data provenance is reliably tracked adding significant value to data in regulated environments.   

### Collaboration and synchronization

Historical commit information is also required for TerminusDB collaboration functionality. The state of two databases that share a common lineage can be compared. Commits made by different authors can be rerun on the current database using a rebase operation, enabling the synchronization of both databases.