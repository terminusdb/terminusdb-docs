terminusdb -- command line interface to the terminusdb Graph DBMS
=============================================

## SYNOPSIS

`terminusdb [command subcommand positional_arguments] flags`

## DESCRIPTION

The terminusdb(1) command line tool allows users to interact with a database,
allowing common operations such as querying (and updating), database creation,
data ingestion and maintainence.

## COMMANDS

terminusdb accepts a command, sometimes followed by a subcommand. The
accepted commands are given here, along with their arguments.

### help

`terminusdb help`

Display help regarding terminusdb.

  * `-m`, `--markdown`=[value]:
  generate help as markdown

### test

`terminusdb test OPTIONS`

Run internal TerminusDB tests.

  * `-h`, `--help`=[value]:
  print help for `test` command

  * `-t`, `--test`=[value]:
  Run a specific test

### serve

`terminusdb serve OPTIONS`

Run the TerminusDB server.

  * `-h`, `--help`=[value]:
  Print help for `serve` command

  * `-i`, `--interactive`=[value]:
  Run server in interactive mode

  * `-m`, `--memory`=[value]:
  Run server in-memory, without a persistent store. Takes a password as an optional argument. The in-memory store will be initialized with an admin account with the given password. If absent, the admin account will have 'root' as a password.

### list

`terminusdb list OPTIONS`

List databases.

  * `-h`, `--help`=[value]:
  print help for the `list` command

  * `-j`, `--json`=[value]:
  Return a JSON as the result of the `list` command

### optimize

`terminusdb optimize OPTIONS`

Optimize a database (including _system and _meta).

  * `-h`, `--help`=[value]:
  print help for the `optimize` command

### query

`terminusdb query DB_SPEC QUERY OPTIONS`

Query a database.

  * `-h`, `--help`=[value]:
  print help for the `query` command

  * `-m`, `--message`=[value]:
  message to associate with the commit

  * `-a`, `--author`=[value]:
  author to place on the commit

### push

`terminusdb push DB_SPEC`

Push a branch.

  * `-h`, `--help`=[value]:
  print help for the `push` command

  * `-b`, `--branch`=[value]:
  set the origin branch for push

  * `-e`, `--remote-branch`=[value]:
  set the branch on the remote for push

  * `-r`, `--remote`=[value]:
  the name of the remote to use

  * `-x`, `--prefixes`=[value]:
  send prefixes for database

  * `-u`, `--user`=[value]:
  the user on the remote

  * `-p`, `--password`=[value]:
  the password on the remote

### clone

`terminusdb clone URI <DB_SPEC>`

Clone a database (into DB_SPEC).

  * `-h`, `--help`=[value]:
  print help for the `clone` command

  * `-u`, `--user`=[value]:
  the user on the remote

  * `-p`, `--password`=[value]:
  the password on the remote

  * `-o`, `--organization`=[value]:
  organizational owner of the cloned database

  * `-l`, `--label`=[value]:
  label to use for this database

  * `-c`, `--comment`=[value]:
  long description of the cloned database

  * `-b`, `--public`=[value]:
  whether the cloned database is to be public

### pull

`terminusdb pull BRANCH_SPEC`

Pull a branch from a database.

  * `-h`, `--help`=[value]:
  print help for the `pull` command

  * `-e`, `--remote-branch`=[value]:
  set the branch on the remote for push

  * `-r`, `--remote`=[value]:
  the name of the remote to use

  * `-u`, `--user`=[value]:
  the user on the remote

  * `-p`, `--password`=[value]:
  the password on the remote

### fetch

`terminusdb fetch BRANCH_SPEC`

fetch data from a remote.

  * `-h`, `--help`=[value]:
  print help for the `fetch` command

  * `-r`, `--remote`=[value]:
  the name of the remote to use

  * `-u`, `--user`=[value]:
  the user on the remote

  * `-p`, `--password`=[value]:
  the password on the remote

### rebase

`terminusdb rebase TO_DATABASE_SPEC FROM_DATABASE_SPEC OPTIONS`

Rebase a database with commits from FROM_DATABASE_SPEC into TO_DATABASE_SPEC.

  * `-h`, `--help`=[value]:
  print help for the `rebase` command

  * `-a`, `--author`=[value]:
  The author of the rebase

### rollup

`terminusdb rollup DATABASE_SPEC OPTIONS`

Creates an optimisation layer for queries on the given commit.

  * `-h`, `--help`=[value]:
  print help for the `rollup` command

### bundle

`terminusdb bundle DATABASE_SPEC OPTIONS`

Create a pack for a given DATABASE_SPEC that can then be reconsistuted with `terminusdb unpack`.

  * `-h`, `--help`=[value]:
  print help for the `bundle` command

  * `-o`, `--output`=[value]:
  file name to use for pack output file (defaults to descriptor based name).

### unbundle

`terminusdb unbundle DATABASE_SPEC FILE OPTIONS`

Unbundle a bundle file.

  * `-h`, `--help`=[value]:
  print help for the `unbundle` command

### branch create

`terminusdb branch create BRANCH_SPEC OPTIONS`

Create a branch.

  * `-h`, `--help`=[value]:
  print help for the `branch create` sub command

  * `-o`, `--origin`=[value]:
  the origin branch to use

### branch delete

`terminusdb branch delete BRANCH_SPEC OPTIONS`

Delete a branch.

  * `-h`, `--help`=[value]:
  print help for the `branch delete` sub command

### db create

`terminusdb db create DATABASE_SPEC OPTIONS`

Create a database.

  * `-h`, `--help`=[value]:
  print help for the `db create` sub command

  * `-o`, `--organization`=[value]:
  organizational owner of the database

  * `-l`, `--label`=[value]:
  label to use for this database

  * `-c`, `--comment`=[value]:
  long description of this database

  * `-p`, `--public`=[value]:
  whether this database is to be public

  * `-k`, `--schema`=[value]:
  whether to use a schema

  * `-d`, `--data-prefix`=[value]:
  uri prefix to use for data

  * `-s`, `--schema-prefix`=[value]:
  uri prefix to use for schema

  * `-x`, `--prefixes`=[value]:
  additional defined prefixes in JSON

### db delete

`terminusdb db delete DATABASE_SPEC OPTIONS`

Delete a database.

  * `-h`, `--help`=[value]:
  print help for the `db delete` sub command

  * `-o`, `--organization`=[value]:
  organizational owner of the database

  * `-f`, `--force`=[value]:
  force the deletion of the database (unsafe)

### store init

`terminusdb store init OPTIONS`

Initialize a store for TerminusDB.

  * `-h`, `--help`=[value]:
  print help for the `store init` sub command

  * `-k`, `--key`=[value]:
  key to use for admin login

  * `-f`, `--force`=[value]:
  force the creation of a new store even when one already exists

### triples dump

`terminusdb triples dump GRAPH_SPEC`

Dump an RDF string.

  * `-h`, `--help`=[value]:
  print help for the `triples dump` sub command

  * `-f`, `--format`=[value]:
  format of RDF (can be one of: [turtle])

### triples update

`terminusdb triples update GRAPH_SPEC FILE`

Update from an RDF file (replaces current content).

  * `-h`, `--help`=[value]:
  print help for the `triples update` sub command

  * `-m`, `--message`=[value]:
  message to associate with the commit

  * `-a`, `--author`=[value]:
  author to place on the commit

  * `-f`, `--format`=[value]:
  format of RDF (can be one of: [turtle])

### triples load

`terminusdb triples load GRAPH_SPEC FILE`

Load triples from RDF file (Appending new).

  * `-h`, `--help`=[value]:
  print help for the `triples load` sub command

  * `-m`, `--message`=[value]:
  message to associate with the commit

  * `-a`, `--author`=[value]:
  author to place on the commit

  * `-f`, `--format`=[value]:
  format of RDF (can be one of: [turtle])

### remote add

`terminusdb remote add DATABASE_SPEC REMOTE_NAME REMOTE_LOCATION OPTIONS`

Add a remote.

  * `-h`, `--help`=[value]:
  print help for the `remote add` sub command

### remote remove

`terminusdb remote delete DATABASE_SPEC REMOTE_NAME OPTIONS`

Remove a remote.

  * `-h`, `--help`=[value]:
  print help for the `remote remove` sub command

### remote set-url

`terminusdb remote set-url DATABASE_SPEC REMOTE_NAME REMOTE_LOCATION OPTIONS`

Set the URL of a remote.

  * `-h`, `--help`=[value]:
  print help for the `remote set-url` sub command

### remote get-url

`terminusdb remote get-url DATABASE_SPEC REMOTE_NAME OPTIONS`

Get the URL of a remote.

  * `-h`, `--help`=[value]:
  print help for the `remote get-url` sub command

  * `-r`, `--remote`=[value]:
  the name of the remote to use

### remote list

`terminusdb remote list DATABASE_SPEC OPTIONS`

List remotes.

  * `-h`, `--help`=[value]:
  print help for the `remote list` sub command

## SYNTAX

The designation of databases, repositories, the associated commit
graph of a database, and various graphs as used in the above command
requires the use of an appropriate descriptor path.

  * `_system`:
  This is the system meta-data, which contains the user information,
  organization information and database records.

  * `<organization>/<database>`:
  This is the most basic descriptor path and actually refers to
  the more specific default path `<organization>/<database>/local/branch/main`.

  * `<organization>/<database>/_meta`:
  This is the repository graph associated with `database`. It contains
  information about the local repository and all known remotes.

  * `<organization>/<database>/<repository>`:
  This is a longer form database designator which specifies which
  respository we would like to address. It refers implicitly to
  `<organization>/<database>/<repository>/branch/main`.

  * `<organization>/<database>/<repository>/_commits`:
  The commit graph associated with a given database. This graph
  contains metadata about branch histories with their commit objects
  including the authorship and time.

  * `<organization>/<database>/<repository>/branch/<branch>`:
  The most specific branch descriptor, allows you to address a
  branch other than main.

  * `<organization>/<database>/<repository>/commit/<commit>`:
  The descriptor which allows an individual commit to be addressed
  directly.

## ENVIRONMENT

  * `TERMINUSDB_SERVER_NAME`:
  Set the servername to use for` terminusdb serve`. Default is
  `127.0.0.1`.

  * `TERMINUSDB_SERVER_PORT`:
  Set the port to use for` terminusdb serve`. Default is `6363`.

  * `TERMINUSDB_SERVER_WORKERS`:
  Set the number of worker threads to use for `terminusdb serve`.
  Default is `8`.

  * `TERMINUSDB_SERVER_MAX_TRANSACTION_RETRIES`:
  Set the transaction retry count. Default is `3`.

  * `TERMINUSDB_SERVER_DB_PATH`:
  Set the location of the storage volume to be used by `terminusdb`
  operations. Can be addressed relative to current path using
  `./`<path>. Default is `./storage/db`.

  * `TERMINUSDB_SERVER_JWT_PUBLIC_KEY_PATH`:
  Set the public key path for JWT. Default is `''`.

  * `TERMINUSDB_SERVER_JWT_PUBLIC_KEY_ID`:
  Set the public key identifier for JWT. Default is `''`.

  * `TERMINUSDB_CONSOLE_BASE_URL`:
  Set the console javascript load URL. Default is
  `https://cdn.terminusdb.com/js_libs/terminusdb_console/dev`.

  * `TERMINUSDB_AUTOLOGIN_ENABLED`:
  If `true` then attempt to login automatically with default
  password. Default is `true`.

  * `TERMINUSDB_SERVER_PACK_DIR`:
  Location of the prolog pack directory if loading third party
  modules.

  * `TERMINUSDB_SERVER_TMP_PATH`:
  Path to use for temporary files.

  * `TERMINUSDB_IGNORE_REF_AND_REPO_SCHEMA`:
  Assume that ref and repo operations are inherently correct.

## EXIT STATUS

  * 0:
  Successfully program execution.  Associated with `api:success`.

  * 1:
  A generic failure of the API to carry out the operation.  Associated
  with `api:failure`.

  * 2:
  The resource which was being requested was not found.  Associated
  with  `api:not_found`.

  * 13:
  The user attempted to carry out an operation without appropriately
  authorizing or without permission.  Associated with
  `api:unauthorized` or `api:forbidden`.

  * 13:
  Unauthorized access attempted.  Associated with `api:unauthorized`.

  * 126:
  An api command was attempted which is not possible.  Associated with
   `api:method_not_allowed`.

  * 131:
  Internal server error. Associated with `api:server_error`.

## EXAMPLES

  * `terminusdb db create admin/foo`:
  Create a database in the organization `admin` with the identifier `foo`.

  * `terminusdb db create admin/foo --label="Foo"`:
  Create a database in the organization `admin` with the identifier
  `foo` and name `Foo`.

## COPYRIGHT

Copyright 2021 TerminusDB

Licensed under the Apache License, Version 2.0 (the "License"); you
may not use this file except in compliance with the License. You may
obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing
permissions and limitations under the License.

## AUTHORS

Gavin Mendel-Gleason <gavin@terminusdb.com>

Matthijs van Otterdijk <matthijs@terminusdb.com>

Robin de Rooij <robin@terminusdb.com>

Anne Ogborn <anne@swi-prolog.org>

Dmytri Kleiner <dk@terminusdb.com>

[Paulo Moura](https://github.com/pmoura)

