# HTTP API Reference

> **On this page:** Documentation of HTTP endpoints, requests, and responses.

The HTTP API supports HTTP clients with a REST interface.

## Introduction

The API is divided into logical sections subdivided by endpoint.

### Endpoint

An endpoint is an HTTP method and a path. The method is one of `GET`, `POST`,
`PUT`, or `DELETE`. The path starts with `/api`. It's followed by a segment for
the relevant operation, e.g. `/db` for operations on a database. It may end with
segments that serve as arguments, e.g. `/<team>/<db>` representing a team name
and a database name.

### Code samples

For each endpoint, we give code samples using two popular command-line tools,
[`curl`][curl] and [`httpie`][httpie]. See the documentation for those tools if
you are not familiar with them.

> <span title="Take note!">:memo:</span> Some of us are fans of the
> less-well-known [`xh`][xh]. Fortunately, it uses the exact same arguments as
> `httpie`. If you want to try `xh`, just replace `httpie` with `xh` in the code
> samples.

### TerminusX or TerminusDB?

The URL base and authentication for an endpoint will differ depending on whether
the host is TerminusX or an instance of TerminusDB.

#### URL Base

The URL base for the API is the part of the URL before the endpoint path. In
other words, it's everything before `/api`.

For TerminusX, the URL base may look something like this (for the team
`myteam`):

```shell
export BASE='https://cloud.terminusdb.com/myteam'
```

For TerminusDB, the URL base may look something like this:

```shell
export BASE='http://localhost:6363'
```

To simplify the `curl` and `httpie` examples on this page, we will use `$BASE`
for the URL base.

#### Authentication

For TerminusX, you use an access token with `Bearer` authorization:

```shell
export TERMINUSDB_ACCESS_TOKEN='...'

curl -H "Authorization: Bearer $TERMINUSDB_ACCESS_TOKEN" ...

httpie --bearer "$TERMINUSDB_ACCESS_TOKEN" ...
```

For TerminusDB, you use a username and password (i.e. `Basic` authorization):

```shell
export TERMINUSDB_USER='...'
export TERMINUSDB_PASS='...'

curl -u "$TERMINUSDB_USER:$TERMINUSDB_PASS" ...

httpie -a "$TERMINUSDB_USER:$TERMINUSDB_PASS" ...
```

To simplify the command-line examples on this page, we will use an environment
variable for the command.

For TerminusX, define one of the following:

```shell
export CURL="curl -H 'Authorization: Bearer $TERMINUSDB_ACCESS_TOKEN'"

export HTTPIE="httpie --bearer '$TERMINUSDB_ACCESS_TOKEN'"
```

For TerminusDB, define one of the following:

```shell
export CURL="curl -u '$TERMINUSDB_USER:$TERMINUSDB_PASS'"

export HTTPIE="httpie -a "'$TERMINUSDB_USER:$TERMINUSDB_PASS'"
```

Then, every command will use either `$CURL` or `$HTTPIE`.

### Endpoint Arguments

An endpoint may expect arguments in an HTTP request as path segments, as query
parameters, or as JSON in the body.

* A path segment is a part of the path separated from other segments by a slash
  (`/`).
* A query parameter comes after the path and a question mark (`?`). It is
  separated from other parameters by an ampersand (`&`).
* The body may include a JSON object with expected fields and values.

> <span title="Take note!">:memo:</span> If a request includes JSON, it must
> also have the header:
>
> ```
> Content-Type: application/json
> ```

## Sections

## Creating and deleting databases

### Creating databases

```
POST /api/db/<team>/<database>
```

Create a new database for a team.

#### Segments

| Name         | What should be substituted |
| ------------ | -------------------------- |
| `<team>`     | team identifier            |
| `<database>` | database identifier        |

#### Body

The request body is a JSON object with the following fields:

| Key        | Type    | Value description                                     | Required / Optional (default) |
| ---------- | ------- | ----------------------------------------------------- | ----------------------------- |
| `label`    | string  | displayed name of the created database                | Required                      |
| `comment`  | string  | description of the created database                   | Required                      |
| `public`   | boolean | visibility of the created database to anonymous users | Optional (`false`)            |
| `schema`   | boolean | schema-checking disabled for the created database     | Optional (`false`)            |
| `prefixes` | object  | default instance and schema prefixes                  | Optional (see below)          |

The `prefixes` value is a JSON object with the following fields:

| Key       | Type   | Value description       | Required / Optional (default)      |
| --------- | ------ | ----------------------- | ---------------------------------- |
| `@base`   | string | default instance prefix | Optional (`terminusdb:///data/`)   |
| `@schema` | string | default schema prefix   | Optional (`terminusdb:///schema#`) |

#### Response

Status: `200 OK`

Body:

```json
{
  "api:status": "api:success",
  "@type": "api:DbCreateResponse"
}
```

#### Code samples

**Create a database `mydb` for the team `myteam`.**

```shell
$CURL \
  -X POST \
  -H "Content-Type: application/json" \
  "$BASE/api/db/myteam/mydb" \
  -d @- <<EOF
{
  "label": "My Database",
  "comment": "The best first TerminusDB database ever"
}
EOF
```

```shell
$HTTPIE \
  "$BASE/api/db/myteam/mydb" \
  label="My Database" \
  comment="The best first TerminusDB database ever"
```

### Deleting databases

```
DELETE /api/db/<team>/<database>
```

Delete an existing database from a team.

#### Segments

| Name         | What should be substituted |
| ------------ | -------------------------- |
| `<team>`     | team identifier            |
| `<database>` | database identifier        |

#### Body

The request body is an optional JSON object with the following field:

| Key     | Type    | Value description | Required / Optional (default) |
| ------- | ------- | ----------------- | ----------------------------- |
| `force` | boolean | see comment below | Optional (`false`)            |

> <span title="Take note!">:memo:</span> If a database is in an inconsistent
> state and that database is requested to be deleted, TerminusDB will, by
> default, not delete the database. Use `{ "force": true }` to require
> TerminusDB to delete the database.

#### Response

Status: `200 OK`

Body:

```json
{
  "api:status": "api:success",
  "@type": "api:DbDeleteResponse"
}
```

#### Code samples

**Delete a database `mydb` from the team `myteam`.**

```shell
$CURL \
  -X DELETE \
  "$BASE/api/db/myteam/mydb"
EOF
```

```shell
$HTTPIE \
  DELETE \
  "$BASE/api/db/myteam/mydb"
```

## Inserting and updating documents

### Inserting documents

```
POST /api/document/<team>/<database>
```

Insert new documents – either schemas or instances – into a database.

#### Segments

| Name         | What should be substituted |
| ------------ | -------------------------- |
| `<team>`     | team identifier            |
| `<database>` | database identifier        |

#### Parameters

| Label          | Value description                                                            | Required / Optional (default) |
| -------------- | ---------------------------------------------------------------------------- | ----------------------------- |
| `author`       | commit author                                                                | Required                      |
| `message`      | commit message                                                               | Required                      |
| `graph_type`   | document type (`schema` or `instance`)                                       | Optional (`instance`)         |
| `full_replace` | replace existing document(s) with the same identifier(s) (`true` or `false`) | Optional (`false`)            |

#### Body

The request body should have one of these formats:

* a newline-delimited stream of JSON objects
* a JSON array of objects

> <span title="TODO!">:bangbang:</span> TODO: Describe or point to a
> description of the objects.

#### Response

Status: `200 OK`

Body: a JSON array of strings, where each string is the identifier of the
corresponding document in the request body.

#### Code samples

**Insert a new schema into the database `mydb` of the team `myteam`.**

```shell
$CURL \
  -X POST \
  -H "Content-Type: application/json" \
  "$BASE/api/document/myteam/mydb?author=myuser&message=insert%20Person&graph_type=schema" \
  -d @- <<EOF
{
  "@id": "Person",
  "@type": "Class",
  "name": "xsd:string"
}
EOF
```

```shell
$HTTPIE \
  "$BASE/api/document/myteam/mydb?author=myuser&message=insert%20Person&graph_type=schema" <<EOF
{
  "@id": "Person",
  "@type": "Class",
  "name": "xsd:string"
}
EOF
```

**Insert a new instance into the database `mydb` of the team `myteam` using the
`Person` type from the above schema.**

```shell
$CURL \
  -X POST \
  -H "Content-Type: application/json" \
  "$BASE/api/document/myteam/mydb?author=myuser&message=insert%20Person%20instance" \
  -d @- <<EOF
{
  "@type": "Person",
  "name": "Socrates"
}
EOF
```

```shell
$HTTPIE \
  "$BASE/api/document/myteam/mydb?author=myuser&message=insert%20Person%20instance" <<EOF
{
  "@type": "Person",
  "name": "Socrates"
}
EOF
```

**Insert instances from the file `file.json` into the database `mydb` of the
team `myteam` using the `Person` type from the above schema.**

```shell
$CURL \
  -X POST \
  -H "Content-Type: application/json" \
  "$BASE/api/document/myteam/mydb?author=myuser&message=insert%20Person%20instances" \
  --data-binary @file.json
```

```shell
$HTTPIE \
  "$BASE/api/document/myteam/mydb?author=myuser&message=insert%20Person%20instances" \
  @file.json
```

The file `file.json` can look like one of these:

```json
{ "@type": "Person", "name": "Socrates" }
{ "@type": "Person", "name": "Aristotle" }
{ "@type": "Person", "name": "Plato" }
```

```json
[
  { "@type": "Person", "name": "Socrates" },
  { "@type": "Person", "name": "Aristotle" },
  { "@type": "Person", "name": "Plato" }
]
```

### Replacing documents

```
PUT /api/document/<team>/<database>
```

Replace existing documents – either schemas or instances – in a database.

#### Segments

| Name         | What should be substituted |
| ------------ | -------------------------- |
| `<team>`     | team identifier            |
| `<database>` | database identifier        |

#### Parameters

| Label        | Value description                      | Required / Optional (default) |
| ------------ | -------------------------------------- | ----------------------------- |
| `author`     | commit author                          | Required                      |
| `message`    | commit message                         | Required                      |
| `graph_type` | document type (`schema` or `instance`) | Optional (`instance`)         |

#### Headers

| Header         | Value              | Required? |
| -------------- | ------------------ | --------- |
| `Content-Type` | `application/json` | Yes       |

#### Response

Status: `200 OK`

Body: a JSON array of strings, where each string is the identifier of the
corresponding document in the request body.

#### Code samples

**Replace an existing schema in the database `mydb` of the team `myteam`.**

```shell
$CURL \
  -X PUT \
  -H "Content-Type: application/json" \
  "$BASE/api/document/myteam/mydb?author=myuser&message=replace%20Person&graph_type=schema" \
  -d @- <<EOF
{
  "@id": "Person",
  "@type": "Class",
  "name": "xsd:string",
  "age": { "@type": "Optional", "@class": "xsd:decimal" }
}
EOF
```

```shell
$HTTPIE \
  PUT \
  "$BASE/api/document/myteam/mydb?author=myuser&message=replace%20Person&graph_type=schema" <<EOF
{
  "@id": "Person",
  "@type": "Class",
  "name": "xsd:string",
  "age": { "@type": "Optional", "@class": "xsd:decimal" }
}
EOF
```

<!--

## Add User to Organization

```
POST http://localhost:6363/api/organization
```

The post argument is a JSON document of the following form:

```jsx
{ "organization_name" : Organization_Name,
  "user_name" : User_Name }
```

This endpoint will add the user `User_Name` to the organization
`Organization_Name`.

## Delete Organization

```
DELETE http://localhost:6363/api/organization
```

The delete argument is a JSON document of the following form:

```jsx
{ "organization_name" : Organization_Name }
```

This endpoint will delete the organization `Organization_Name`.

## Update Organization Name

```
POST http://localhost:6363/api/organization/<organization_name>
```

The JSON API post parameter is:

```jsx
{ "organization_name" : New_Name }
```

This endpoint will update the name of the organization in the path to `New_Name`.

## Add User

```
POST http://localhost:6363/api/user
```

The JSON API post parameter is:

```jsx
{ "user_identifier" : User_ID,
  "agent_name" : Agent_Name,
  "comment" : Comment,
  <"password" : Password>
}
```

This endpoint adds the user `User_ID` and an organization of the
same name to which the user will automatically be added, along with
an optional password.

## Delete User

```
DELETE http://localhost:6363/api/user/<user_name>
```

This deletes the user named `user_name`.

## Update User

```
POST http://localhost:6363/api/user/<user_name>
```

The JSON API post parameter is:

```jsx
{ <"user_identifier" : User_ID>,
  <"agent_name" : Agent_Name>,
  <"comment" : Comment>,
  <"password" : Passord>
}
```

This endpoint allows a user to be updated with any of the supplied
information in the JSON document.

## Get Roles

```
GET http://localhost:6363/api/role
```

The JSON API get parameter is:

```jsx
{ <"agent_name" : Agent_Name >,
  <"database_name" : Database_Name >,
  <"organisation_name" : Organization_Name >
}
```

This returns all roles in the system which match the passed
parameters.

## Update Roles

```
POST http://localhost:6363/api/update_role
```

The JSON API post parameter is:

```jsx
{ "agent_names" : Agents,
  "organization_name" : Organization,
  "actions" : Actions,
  <"database_name" : Database_Name >
}
```

This endpoint will update the roles in the database with the
associated list of actions for the named agents.

## Clone

```
POST http://localhost:6363/api/clone/<organization>/[<new_dbid>]
```

The JSON payload is:

```jsx
{
   "comment" : Comment,
   "label" : Label,
   "remote_url" : Remote,
   < "public" : Bool >
}
```

The API call creates a new database under the same DB ID as the cloned
database, or with the new database ID `new_dbid` if provided.

The other options are exactly as with create db.

### Example:

Clone the database `admin/cowid`.

```
POST http://localhost:6363/api/clone/admin/cowid

```

JSON payload:

```jsx

{
   "comment":"information about cows",
   "label" : "cow label"
   "remote_url" : "http://remoteurl/"
}
```

## Fetch

```
POST http://localhost:6363/api/fetch/<organization>/<dbid>
```

Fetches new layers from the remotes for this database along with the
commit history.

## Rebase

```
POST http://localhost:6363/api/rebase/<organization>/<dbid>[/<repo>/branch/<branchid>]
```

The JSON API document is:

```jsx
{
   "rebase_from" : Resource,
   "author" : Author,
}
```

The `rebase_from` contains an absolute string descriptor for the reference we are rebasing from. It may be a ref or a branch. Author should be the author of the newly produced commits.

This operation will attempt to construct a new history which has the
same contents as that given by "rebase\_from" by repeated application
of diverging commits.

### Example:

If the `user` wants to rebase the database `admin/cowid`, from `branch_a` to `main`, then the argument is:

```
POST "http://127.0.0.1:6363/api/rebase/admin/cowid/local/branch/main"
```

and the payload is:

```jsx
{
   "rebase_from" : "admin/cowid/local/branch/branch_a",
   "author" : "user@terminusdb.com",

}
```

## Push

```
POST http://localhost:6363/api/push/<organization>/<dbid>[/<repo>/branch/<branchid>/]
```

The JSON API document is:

```jsx
{ "remote" : Remote_Name,
  "remote_branch" : Remote_Branch,
  <"push_prefixes" : Boolean> }
```

This endpoint pushes deltas from the branch specified in the path to
the remote repository with the specified remote from the JSON object.

If `"push_prefixes"` is true, then it will also push the prefixes
associated with the database to the remote.

### Example:

Push the local branch `branch_a` to the branch `main` of the remote repository `cow_information`.
Include the prefixes of the local database and update the prefixes of the remote.

```
POST http://localhost:6363/api/push/admin/cowid/local/branch/branch_a
```

The JSON payload is:

```jsx
{ "remote" : "cow_information",
  "remote_branch" : "main",
  "push_prefixes" : "True" }
```

## Pull

```
POST http://localhost:6363/api/pull/<organization>/<dbid>[/<repo>/branch/<branchid>/]
```

JSON API document is:

```jsx
{ "remote" : Remote_Name,
  "remote_branch" : Remote_Branch_Name
}
```

Fetch layers from `remote`, then attempt a rebase from the remote branch `remote_branch` onto the local branch specified in the URL.

### Example:

Fetch layers from remote repository: `cow_information`, branch `main` and rebase to the local branch `branch_a`

```
POST http://localhost:6363/api/pull/admin/cowid/local/branch/branch_a
```

The JSON payload is:

```jsx
{ "remote" : "cow_information",
  "remote_branch" : "main",
}
```

## Branch

```
POST http://localhost:6363/api/branch/<organization>/<dbid>/<repo>/<new_branchid>
```

JSON API document is:

```jsx
{ <"origin" : Remote_Name >
}
```

Creates a new branch as specified by the URI, starting from the branch given by `origin` or empty if it is unspecified.

### Example:

Create a new branch called `branch_a` from the remote repository `cow_information`, branch `main`

```
POST http://127.0.0.1:6363/api/branch/admin/cowid/local/branch_a
```

JSON payload:

```jsx
{ "origin" : "cow_information/main"
}
```

## Delete Branch

```
DELETE http://localhost:6363/api/branch/<organization>/<dbid>/<repo>/<branchid>
```

Delete argument is a JSON document of the following form

```jsx
{ < "force" : Boolean >
}
```

### Example:

Delete branch `local/branch_a`.

```
DELETE http://localhost:6363/api/branch/admin/cowid/local/branch_a
```

## Create Graph

```
POST http://localhost:6363/api/graph/<organization>/<dbid>/<repo>/branch/<branchid>/<instance|schema|inference>/<graphid>
```

This takes a post parameter:

```jsx
{"commit_info" : { "author" : Author, "message" : Message }}
```

This API call creates a new graph as specified by the absolute graph descriptor in the URI.

### Example:

Create a graph for `admin/cowid`

```
POST http://localhost:6363/api/graph/admin/cowid/local/main/
```

JSON payload

```jsx
{"commit_info" : { "author" : "user@terminusdb.com", "message" : "created a graph!" }}
```

## Delete Graph

```
DELETE http://localhost:6363/api/graph/<organization>/<dbid>/<repo>/branch/<branchid>/<instance|schema|inference>/<graphid>
```

This takes the following parameter:

```jsx
{"commit_info" : { "author" : Author, "message" : Message }}
```

Deletes the graph specified by the absolute graph descriptor in the URI.
If multiple graphs are created with different commits as above, the graphid needs to be specified.

### Example:

delete the graph for: `admin/cowid`

```
DELETE http://localhost:6363/api/graph/admin/cowid/local/main/
```

JSON payload

```jsx
{"commit_info" : { "author" : "user@terminusdb.com", "message" : "deleted a graph!" }}
```

## Squash

```
POST http://localhost:6363/api/squash/<organization>/<dbid>/
```

```
POST http://localhost:6363/api/squash/<organization>/<dbid>/local/branch/<branchid>
```

This takes a post parameter:

```jsx
{ "commit_info" : Commit_String }
```

This API endpoint allows you to squashes a branch to a single
commit. If the branch is left unspecified, it defaults to
`"local/main"`. The commit created can be attached to an arbitrary branch using \`\`\`reset\`\` (see below).

It returns a json object of the form

```jsx
{ "@type":"api:SquashResponse",
  "api:commit": New_Commit_Path,
  "api:old_commit" : Old_Commit_Path,
  "api:status":"api:success"}
```

This commit path can be used with reset, to add the commit to a specified branch as described above.

### Example:

Squash branch `local/main` into a single commit.

```
POST http://127.0.0.1:6363/api/squash/admin/cowid/local/branch/main
```

JSON payload:

```jsx
{"commit_info" : { "author" : "user@terminusdb.com", "message" : "squashed_main" }}
```

JSON return:

```jsx
{ "@type":"api:SquashResponse",
  "api:commit": "local/main",
  "api:old_commit" : "local/main",
  "api:status":"api:success"}
```

## Reset

```
POST http://localhost:6363/api/reset/<organization>/<dbid>/
```

```
POST http://localhost:6363/api/reset/<organization>/<dbid>/local/branch/<branchid>
```

This takes a post parameter:

```jsx
{ "commit_descriptor" : Ref }
```

This API endpoint allows you to set a branch to an arbitrary
commit. If the branch is left unspecified, it defaults to `"local/main"`.
The commit descriptor has to be a valid one, for example the return from `squash` above.

### Example:

Set the brach `local/main` to the squashed commit specified above.

```
POST http://localhost:6363/api/reset/admin/cowid/local/main
```

JSON payload:

```jsx
{ "commit_descriptor" : { "@type":"api:SquashResponse",
                          "api:commit": "local/main",
                          "api:old_commit" : "local/main",
                          "api:status":"api:success"
                        }
}
```

## Get Triples

```
GET http://localhost:6363/api/triples/<organization>/<dbid>/<repo>/branch/<branchid>/<type>/<name><?format=turtle>
```

```
GET http://localhost:6363/api/triples/<organization>/<dbid>/<repo>/commit/<refid>/<type>/<name><?format=turtle>
```

This call returns a "Turtle" format file representation of the graph
specified in the URL path as a JSON string. It takes a get parameter
`format` which, if supplied, must always be "turtle". In the future we
hope to support other formats.

## Replace Triples

```
POST http://localhost:6363/api/triples/<organization>/<dbid>/local/branch/<branchid>/<type>/<name>
```

Post argument is a JSON document of the following form

```jsx
{ "turtle" : TTL_String,
  "commit_info" : { "author" : Author, "message" : Message } }
```

This call creates the update required to make the graph referred to in
the URL have exactly the triples specified in the `turtle` field of
the JSON document. It must be supplied with a commit message (though
it can be an empty string).

## Update Triples

```
PUT http://localhost:6363/api/triples/<organization>/<dbid>/local/branch/<branchid>/<type>/<name>
```

Put argument is a JSON document of the following form

```jsx
{ "turtle" : TTL_String,
  "commit_info" : { "author" : Author, "message" : Message } }
```

This call will simply add the passed triples from the `"turtle"` file
to the graph specified.

## Query

```
POST http://localhost:6363/api/woql
```

```
POST http://localhost:6363/api/woql/<organization>/<dbid>
```

```
POST http://localhost:6363/api/woql/<organization>/<dbid>/_meta
```

```
POST http://localhost:6363/api/woql/<organization>/<dbid>/<repo>
```

```
POST http://localhost:6363/api/woql/<organization>/<dbid>/<repo>/_commits
```

```
POST http://localhost:6363/api/woql/<organization>/<dbid>/<repo>/branch/<branchid>
```

```
POST http://localhost:6363/api/woql/<organization>/<dbid>/<repo>/commit/<refid>
```

Post argument is a JSON document of the following form

```jsx
{ <"commit_info" : { "author" : Author, "message" : Message } >,
  <"all_witnesses" : false >
  "query" : Query }
```

The commit message is a requirement if an update is being made, whereas `query` should be a JSON-LD object.

If `"all_witnesses"` is false, then the end-point will return
immediately when an schema violation is encountered with the first
witness of failure.

This API call performs a WOQL query and returns an `api:WoqlResponse`
result object, which has the form:

```jsx
{ "@type" : "api:WoqlResponse",
  "api:status" : "api:success",
  "api:variable_names" : Variable_Names,
  "bindings" : Bindings,
  "inserts" : Number_Of_Inserts,
  "deletes" : Number_Of_Deletes,
  "transaction_retry_count" : Retries
  }
```

## Optimize

```
POST http://localhost:6363/api/optimize/_system
```

```
POST http://localhost:6363/api/optimize/<organization>/<dbid>
```

```
POST http://localhost:6363/api/optimize/<organization>/<dbid>/_meta
```

```
POST http://localhost:6363/api/optimize/<organization>/<dbid>/<repo>/_commits
```

```
POST http://localhost:6363/api/optimize/<organization>/<dbid>/<repo>/branch/<branch>
```

This API endpoint will attempt to optimize the database using an
appropriate strategy. This call is not recursive, i.e. it will only
optimize access to the respective graph collection specified.

In the case of an unspecified branch, `main` is assumed.

-->

[curl]: https://curl.se/

[httpie]: https://httpie.io/

[xh]: https://github.com/ducaale/xh
