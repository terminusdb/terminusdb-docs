# Graphs

> **On this page:** An introduction to the hierarchy and system of graphs used by TerminusDB for collaboration and revision control.

## Key topics

[Graph hierarchy](#repository-graph)

[Repository graphs](#repository-graph)

[Commit graphs](#commit-graphs)

[Branch graphs](#branch-graphs)

[Layers](#layers)

[Transactions in graphs](#transactions-in-graphs)

## Graph hierarchy 

A TerminusDB database is a hierarchical collection of [data graphs](#data-graphs) and [control graphs](#control-graphs). These graphs are key to providing a graph database system with **collaboration** and **revision control**. 

### Data graphs

Data graphs keep track of data and information about data. Each level of the database hierarchy is a combination of the following data graphs.

- **Instance graphs** contain data for a given level in a hierarchy.

- **Schema graphs** contain information about what data is allowed and how to interpret it.

- **Inference graphs** enable facts to be inferred about the data.

### Control graphs

Control graphs govern data graphs and database functionality. Each level of the control graph hierarchy, listed below, consists of one or more data graphs. The remainder of this article explains each control graph and the lowest level of the hierarchy - layers.  

- **Repository graphs** for collaboration.

- **Commit graphs** for revision control.

- **Branch graphs** for data storage and correctness.

- **Layers** for storing data changes.

## Repository graphs

Repository graphs provide collaboration and communication with other TerminusDB instances and keep track of other TerminusDB repositories.

### Referencing repository graphs

Repository graphs are referenced using the name `_meta` which contains links with various repositories.

### Repository naming

A repository is addressed by specifying its organization and name. For example, organization `admin`, database name `foo` expressed as `admin/foo`.

### Local repositories

The identifier `local` is used for specifying local repositories, for example, `admin/foo/local`.

A local repository in the repository instance data has **layer identifiers** which point to associated commit graphs.

### Remote repositories

An identifier other than `local` is used for specifying remote repositories (or remotes.) For example `admin/foo/origin`.

A remote in the repository instance data has layer identifiers **and** the URL of the remote. The URL enables communication with the remote and enables push and pull from various remotes to update and synchronize with the local repository.

## Commit graphs

Commit graphs provide revision control. They contain information required for time-travel, branch, squash, reset and rebase operations. Commit graphs hold information about branches and all commits on them. 

### Referencing commit graphs

Commit graphs are referenced by appending the name `_commits` to the database identifier, for example: `admin/foo/local/_commits`. Commits are trackable on local and remote TerminusDB instances enabling synchronization with different instances.

### Branch objects in commit graphs

Branch objects in a commit-graph point to a commit object. A commit object is associated with layers representing the branch of interest. A commit object also has parent commits if the commit has a history.

## Branch graphs

Branch graphs store data in a queryable format and ensure the correctness of data by maintaining a schema.

### Referencing branch graphs

<!-- Example of how to translate a confusing and overly verbose original -->

Branch graphs are referenced with the name `branch` followed by the branch of interest. The default is `main`. For example `admin/foo/local/branch/main`.

## Layers

The lowest level of the hierarchy is a single graph composed of a sequence of layers. Layers specify each change to data such as additions and deletions.

## Transactions in graphs

A transaction in a graph is also a hierarchical operation, ensuring [ACID transactions](acid-transaction). An update transaction has the following stages:

- The layers of a branch graph are updated, resulting in the addition of new layers.

- A schema check is performed. If the check succeeds, the layer names of the updated graphs are obtained (an update can affect several graphs simultaneously.)   

- New layers are written as commit objects in the commit instance graph, and the head of the branch is moved, resulting in a new instance graph for the commit-graph.

- The layer name of the new instance graph is written to the repository graph, enabling the identification of the current, most recent state of the repository.

- The layer name of the repository graph is labeled as the newest version and kept in the layer store as a named pointer to a layer.