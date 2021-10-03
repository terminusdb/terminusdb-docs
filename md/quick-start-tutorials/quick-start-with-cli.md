# Quick Start with the CLI

> **On this page:** Get started with the TerminusDB Command Line Interface (CLI) to create, branch, populate, and query databases.

The TerminusDB CLI enables a large subset of API functionality to be used directly in a shell. Refer to the [CLI Reference](reference-cli) for a list of commands.

## Key topics

[The CLI command and structure](#the-cli-command-and-structure)

[Create a database](#create-a-database)

[Delete a database](#delete-a-database)

[Create a branch](#delete-a-branch)

[Populate a database](#delete-a-database)

[Query a database](#delete-a-database)

## The CLI command and structure

> :information_source: Add `terminusdb` to your `path` to run the commands in this tutorial.

The TerminusDB CLI executable `terminusdb` is structured into **commands** and **subcommands**. 

### List the CLI commands

Run `terminusdb` without parameters to list the available commands. 

#### Code: List the CLI commands

```shell

terminusdb


```

```output

terminusdb [command]
where command is one of: [branch,bundle,clone,csv,db,fetch,help,list,optimize,pull,push,query,rebase,remote,rollup,serve,store,test,triples,unbundle]
type: terminusdb [command] --help for more details


```

### List the CLI subcommands

Run `terminusdb` with a command to list the related subcommands. 

#### Code: List the CLI subcommands

```shell

terminusdb branch


```

```output

terminusdb branch [subcommand]
where subcommand is one of: [create,delete]
type: terminusdb branch [subcommand] --help for more details


```

### The CLI help parameter

Add the parameter `--help` to the command and subcommand to list the available options.

#### Code: The CLI help parameter

Help information for creating a database, command/subcommand `db` `create`.    

```shell

./terminusdb db create --help


```

```output

terminusdb db create DATABASE_SPEC OPTIONS

Create a database.

--help           -h  boolean=false               print help for the `db create` subcommand
--organization   -o  term=admin                  organizational owner of the database
--label          -l  atom=                       label to use for this database
--comment        -c  atom=                       long description of this database
--public         -p  boolean=false               whether this database is to be public
--schema         -k  boolean=true                whether to use a schema
--data-prefix    -d  atom=terminusdb:///data/    uri prefix to use for data
--schema-prefix  -s  atom=terminusdb:///schema#  uri prefix to use for schema
--prefixes       -x  atom={}


```

## Create a database 

Create a simple database with the `terminusdb` CLI in two simple steps

- [Create a database directory](#create-a-database-directory) 
- [Create a database](#create-a-database)

### Create a database directory

> :information_source: The `terminusdb` CLI operates on the database in the current directory.

[Make and change to the directory](#code-change-to-the-database-directory) in which to create a new database or change to a directory with existing databases. 

#### Code: An example database directory

```shell

mkdir my_database
cd my_database


```

### Create a simple database

The `terminusdb` CLI provides administrator access enabling the creation of databases in the `admin` **organization**.

#### Code: Create a simple database

Create a database named `foo` in the `admin` organization.

```shell

terminusdb db create admin/foo


```

```output

Database admin/foo created


```

### List databases

Use `list` to list the databases created in the current directory. The output describes one database named `foo` in the `admin` organization with the branch `main`.

#### Code: List databases

```shell

terminusdb list


```

```output

TerminusDB
│
└── admin/foo
    └── main


```

## Delete a database

Use `db delete` followed by the organization and database name.

#### Code: Delete a database

```shell

terminusdb db delete admin/foo


```

```output

Database admin/foo deleted


```

## Create a branch

Use `branch create` to create a branch in a database specifying the full resource path: 

`<organisation>/<dbid>/<repository>/branch/<branchid>`

Refer to [Graphs](../Explanation/GRAPHS.md) for more information on resource paths. `create branch` in the code example below uses the following properties. 

- `local` specifies the `local` repository in the current or `local` directory.

- `new` specifies a new branch to create.

- `-o admin/foo/local/branch/main` start a new branch following the `main` branch. The new branch will inherit the properties of the `main` branch. A new branch can be empty or start from any existing branch or commit point.

#### Code: Create a branch

```shell

terminusdb branch create admin/foo/local/branch/new -o admin/foo/local/branch/main


```

## Populate a database

Populate databases with the `terminusdb` CLI using a variety of methods, including loading external files and inserting data directly. The following examples demonstrate loading a CSV file.

### Load a CSV file

Use `csv` and `load` to load a CSV file directly into a branch.

#### Code: Load a CSV file

Load file `src/test/test.csv` into database `admin/foo` or more precisely `admin/foo/local/branch/main` 

```shell

terminusdb csv load admin/foo src/test/test.csv


```

```output

Successfully loaded CSVs: ['src/test/test.csv']


```

### Load an updated CSV file

Edit a CSV file and reload it using `csv update`.

#### Code: Load an updated CSV file

```shell

terminusdb csv update admin/foo src/test/test.csv


```

```output

Successfully loaded CSVs: ['src/test/test.csv']


```

## Query a database

Insert data into a database and query the data using the `terminusdb` CLI. The following examples create, populate, and query a schemaless database.

### Create a schemaless database

Create a database unconstrained by a schema using the `--schema=false` option.

#### Code: Create a schemaless database

```shell

terminusdb db create admin/bar --schema=false

```

```output

Database admin/bar created


```

### Populate a schemaless database

Add data to a schemaless database using `query` and the `insert()` command.

#### Code: Populate a schemaless database

```shell

terminusdb query admin/bar 'insert(a,b,c)'


```

### Query a schemaless database

Query a database using the `t()` (triple) command. Refer [WOQL triples](to-do) for more information on triples. 

#### Code: Query a schemaless database

```shell

$ terminusdb query admin/bar 't(X,Y,Z)'


```

```output

X Y Z
a b c


```

### Combine multiple queries

Combine queries with the `,` operator.

#### Code: Multiple inserts

```shell

terminusdb query admin/bar 'insert(a,b,c),insert(c,d,e),insert(e,f,g),insert(g,h,i)'


```

```output

No results
Inserts: 4


```

#### Code: Multiple queries

The output generates bindings for both *hop* paths in the database

```shell

terminusdb query admin/bar 't(X,Y,Z),t(Z,A,B)'


```

```output

X Y Z A B
a b c d e
c d e f g
e f g h i


```