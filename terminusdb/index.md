---
description: An overview of the ways to get started with TerminusDB.
---

# Get Started

TerminusDB is an open-source document graph database with a collaboration model providing Git-like features. It stores documents as [JSON documents](../explanations/documents.md) and the schema language connects these into a [graph](../explanations/graphs.md). It comes with [GraphQL](../guides/reference-guides/graphql-reference/graphql\_query.md), [User Interface](broken-reference), [CLI](../guides/reference-guides/cli.md), [JavaScript](../guides/reference-guides/javascript-client-reference/), and [Python Clients](../guides/reference-guides/python-client-reference/). TerminusX is TerminusDB as a Service and is free to use to build your Betas and experiment with the product.

### Starting overview

Get started in minutes on Windows, macOS, or Linux with the steps below.

#### Install

Install a TerminusDB server.

#### Run

Start a TerminusDB server.

#### Go

Create, query, and maintain your databases using several [programmatic interfaces](index.md#interfaces-overview).

### Installation overview

Interaction with TerminusDB databases is through the TerminusBD Server. The server provides a **RESTful** API using the **JSON-LD** exchange format. This enables you to develop applications with your toolchain to utilize the powerful features of graph search and storage.

To install a TerminusDB server and use TerminusDB databases programmatically in your applications, the installation options below are available. Click on an option for detailed install instructions.

#### Source code

Install from the [source code](install/install-from-source-code.md) in [GitHub](https://github.com/terminusdb/terminusdb).

#### Docker container

Install as a [Docker container](install/install-as-docker-container.md) also referred to as the **TerminusDB bootstrap**.

### GraphQL

TerminusDB comes with GraphQL for more information visit the [GraphQL reference guide](../guides/reference-guides/graphql-reference/graphql\_query.md).

### Javascript client

Install as a [Node.js](https://nodejs.org/en/download/)-based [JavaScript Client](install-client/install-javascript-client.md).

### Python client

Install as a [Python Client](install-client/install-python-client.md). Also requires a [Docker container](install/install-as-docker-container.md) installation.

#### Diagram: TerminusDB and TerminusX install options

![](../img/diagrams/terminusdb-install-options.png)

### Interfaces Overview

TerminusDB provides several interfaces for creating, querying, and maintaining your databases. Depending on the component/s you choose to install, you can interact with TerminusDB using one or more of the available interfaces listed below.

Use one or a combination of several TerminusDB interfaces.

#### GraphQL

TerminusDB automatically generates GraphQL schema to query data. Read the [GraphQL reference](../guides/reference-guides/graphql-reference/graphql\_query.md) guide for more information.

#### Command Line Interface

The TerminusDB [Command Line Interface](../guides/reference-guides/cli.md) (CLI.)

#### Dashboard

The TerminusDB [dashboard](https://dashboard.terminusdb.com) provides a visual interface.

#### APIs

The TerminusDB [Javascript](../guides/how-to-guides/use-the-javascript-client/javascript-client.md) and [Python Client](broken-reference) APIs.

#### Query

The TerminusDB [Web Object Query Language](../explanations/woql.md) (WOQL.)

#### Diagram: TerminusDB interfaces

![](../img/diagrams/terminusdb-interfaces.png)
