---
description: >-
  A high-level description of what TerminusDB is, reasons for using TerminusDB,
  and its Git-like features.
---

# Introduction to TerminusDB

### What is TerminusDB?

TerminusDB is a powerful, in-memory graph database enabling you to maximize your productivity and the value of your data. TerminusDB has numerous features and several interfaces enabling you to create data-intensive, immutable, and synchronized databases with built-in version control and other [Git-like](terminusdb-intro.md#git-like-model) operations.

#### Diagram: Some key features of TerminusDB

![](../img/diagrams/terminusdb-what-is-it.png)

### Why choose TerminusDB?

A few of the many reasons to choose TerminusDB as your graph database solution:

#### An enterprise-level graph database

Enterprise-level availability, functionality, performance, scalability, and stability. TerminusDB is a data-intensive, in-memory, high-speed and scalable platform suitable for both small and enterprise-level applications.

#### Quick and easy to use

Maximize your productivity and start realizing the value of your data by having your databases up and running in a few minutes. Easily create, query, and maintain your databases using graphical and programmatic interfaces.

#### Feature-rich and Git-like

Numerous unique features and [Git-like](terminusdb-intro.md#git-like-model) operations including clone, branch, merge, control and time-travel. TerminusDB databases are immutable, fully preserving data lineage and change history with built-in revision control, similar to distributed version control systems.

#### Advanced query language

A powerful query language enabling fast and recursive searches across complex data patterns.

#### Forms and data validation

Generate forms for viewing and entering data with automatic data validation.

#### Visual model builder

Use a lightweight Graphical User Interface to easily build, maintain and enforce complex data models.

#### Multiple interfaces

Create and maintain your databases using programmatic interfaces such as JavaScript and Python APIs.

#### Data-centric collaboration

TerminusDB is highly configurable with powerful features for rapidly and collaboratively creating synchronized, application-centric and data-centric databases. Maximize productivity through application and data-centric distributed development and collaboration.

#### Diagram: Reasons to choose TerminusDB

![](../img/diagrams/terminusdb-why-choose.png)

### Git-like model

TerminusDB has many Git-like features including revision-control and distributed collaboration. Similar to Git, TerminusDB is open source, model-driven, and uses the **Resource Description Framework** ([RDF](glossary.md#rdf)) specification for collaboration.

#### Delta-encoding

TerminusDB implements an advanced Git-like model, using [delta encoding](glossary.md#delta-encoding) to store append or delta-only changes to graphs. These deltas are stored in succinct [terminusdb-store](https://github.com/terminusdb/terminusdb-store) data structures. The delta encoding approach enables branch, merge, push, pull, clone, time-travel, and other Git-like operations.

#### Diagram: TerminusDB Git-like operations

![](../img/diagrams/terminusdb-git-model.png)

### Further Reading

#### TerminusDB whitepaper

Read our [white paper on succinct data structures and delta encoding in modern databases](https://assets.terminusdb.com/research/succinct-data-structures-and-delta-encoding.pdf).

#### Get started

[Get Started](../terminusdb/index.md) with an overview of the available [Installation Options](../terminusdb/install/) and then check out the [how-to guides](../guides/how-to-guides/) for step-by-step help.

#### TerminusCMS

Take a look at the [product tour of TerminusCMS](../terminuscms/product-tour/) for information about the headless content management system.

#### Documents

[Documents](documents.md) in a knowledge graph and how to use them.
