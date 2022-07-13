# HTTP API Reference

API definitions for terminusdb.

### General rule

TerminusDB Server HTTP API JSON documents have optional elements notated with angle-brackets, for instance:

```jsx
{
  <"optional" : "foo">,
  "required" : "bar"
}
```

***

## Connect

```
GET http://localhost:6363/api/
```

The Connect API endpoint returns the `system:User` object associated with the authentication provided. If no authentication is provided, the user will be predefined as `terminusdb:///system/data/anonymous`.

## Create Database

```
POST http://localhost:6363/api/db/<organization>/<dbid>
```

The post argument is a JSON document like this:

```jsx
{
   < "prefixes" : { < "@base" : Base_Prefix >,
                   < "@schema" : Schema_Prefix > } >
  "label" : "A Label",
  "comment" : "A Comment",
  < "public" : Boolean >,
  < "schema" : Boolean >
}
```

It creates a new database with database ID `dbid` for organization `organization`.

The default prefixes associated with the document and the schema can be specified.

`label`: display database name

`comment`: database description

`label` and `comment` are required fields.

The `public` boolean will determine if this database has read visibility to the anonymous user. It defaults to false.

The `schema` boolean will determine if this database is created with an empty schema, or if it is running in "schema free" mode. It defaults to false.

### Example:

Create a database with the following:

* organization: admin
* dbid: cowid
* label: cow label
* comment: information about cows

The payload in this case is:

```jsx
{
  "prefixes": {"@base": "base_prefix",
             "@schema": "schema_prefix"},
  "comment" : "information about cows",
  "label" : "cow label"
}
```

## Delete Database

```
DELETE http://localhost:6363/api/db/<organization>/<dbid>
```

The delete argument is a JSON document like this:

```jsx
{ < "force" : Boolean >
}
```

## Get All Users

```
GET http://localhost:6363/api/users
```

Get a list of all users, and their capabilities.

## Get User

```
GET http://localhost:6363/api/users/<user_name>
```

Get a user and their capabilities.

## Add User

```
POST http://localhost:6363/api/users
```

The JSON API post parameter is:

```jsx
{ "name" : User_Name,
  <"password" : Password>
}
```

This endpoint adds the user with an optional password field (for use with basic authentication).

## Delete User

```
DELETE http://localhost:6363/api/users/<user_name>
```

This deletes the user named `user_name`.

## Update User Password

```
POST http://localhost:6363/api/users
```

The JSON API post parameter is:

```jsx
{ "name" : User_Name,
  "password" : Password
}
```

This endpoint allows a user password to be updated.

## Get All Roles

```
GET http://localhost:6363/api/roles
```

This returns all roles in the system.

## Get Role

```
GET http://localhost:6363/api/roles/<role_name>
```

Return the role named `role_name`.

## Create Roles

```
POST http://localhost:6363/api/roles
```

The JSON API post parameter is:

```jsx
{ "name" : Role_Name
  "action" : ["instance_read_access","instance_write_access","commit_write_access"]
}
```

Create a new role with the listed actions. Actions may be any of:

* `"create_database"`
* `"delete_database"`
* `"class_frame"`
* `"clone"`
* `"fetch"`
* `"push"`
* `"branch"`
* `"rebase"`
* `"instance_read_access"`
* `"instance_write_access"`
* `"schema_read_access"`
* `"schema_write_access"`
* `"meta_read_access"`
* `"meta_write_access"`
* `"commit_read_access"`
* `"commit_write_access"`
* `"manage_capabilities"`

## Delete Role

```
DELETE http://localhost:6363/api/roles/<role_name>
```

Delete the role named `role_name` from the database.

## Get All Organizations

```
GET http://localhost:6363/api/organizations
```

Get all organizations in the database.

## Get Organization

```
GET http://localhost:6363/api/organizations/<organization_name>
```

Get the organization named `organization_name`.

## Delete Organization

```
DELETE http://locahost:6363/api/organizations/<organization_name>
```

Delete the organization named `organization_name`.

## Grant/Revoke Capability

```
POST http://localhost:6363/api/capabilities
```

```jsx
{ "operation" : Operation,
  "scope" : Resource,
  "user" : User,
  "roles" : Roles }
```

Either add or remove the capability for user `User` over resource `Resource` with role `Role`, depending on the `Operation` which is one of `"revoke"` or `"grant"`.

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

The API call creates a new database under the same DB ID as the cloned database, or with the new database ID `new_dbid` if provided.

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

Fetches new layers from the remotes for this database along with the commit history.

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

The `rebase_from` contains an absolute string descriptor for the reference we are rebasing from. It may be a ref or a branch. The author should be the author of the newly produced commits.

This operation will attempt to construct a new history which has the same contents as that given by "rebase\_from" by repeated application of diverging commits.

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

This endpoint pushes deltas from the branch specified in the path to the remote repository with the specified remote from the JSON object.

If `"push_prefixes"` is true, then it will also push the prefixes associated with the database to the remote.

### Example:

Push the local branch `branch_a` to the branch `main` of the remote repository `cow_information`. Include the prefixes of the local database and update the prefixes of the remote.

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

This fetches layers from `remote`, then attempt a rebase from the remote branch `remote_branch` onto the local branch specified in the URL.

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

This creates a new branch as specified by the URI, starting from the branch given by `origin` or empty if it is unspecified.

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

The delete argument is a JSON document shown here:

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

This deletes the graph specified by the absolute graph descriptor in the URI. If multiple graphs are created with different commits as above, the graphid needs to be specified.

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

This API endpoint allows you to squashes a branch to a single commit. If the branch is left unspecified, it defaults to `"local/main"`. The commit created can be attached to an arbitrary branch using \`\`\`reset\`\` (see below).

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

This API endpoint allows you to set a branch to an arbitrary commit. If the branch is left unspecified, it defaults to `"local/main"`. The commit descriptor has to be a valid one, for example the return from `squash` above.

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

This call returns a "Turtle" format file representation of the graph specified in the URL path as a JSON string. It takes a get parameter `format` which, if supplied, must always be "turtle". In the future we hope to support other formats.

## Replace Triples

```
POST http://localhost:6363/api/triples/<organization>/<dbid>/local/branch/<branchid>/<type>/<name>
```

The Post argument is a JSON document illustrated below:

```jsx
{ "turtle" : TTL_String,
  "commit_info" : { "author" : Author, "message" : Message } }
```

This call creates the update required to make the graph referred to in the URL have exactly the triples specified in the `turtle` field of the JSON document. It must be supplied with a commit message (though it can be an empty string).

## Update Triples

```
PUT http://localhost:6363/api/triples/<organization>/<dbid>/local/branch/<branchid>/<type>/<name>
```

Put argument is a JSON document of the following form

```jsx
{ "turtle" : TTL_String,
  "commit_info" : { "author" : Author, "message" : Message } }
```

This call will simply add the passed triples from the `"turtle"` file to the graph specified.

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

The post argument is a JSON document like:

```jsx
{ <"commit_info" : { "author" : Author, "message" : Message } >,
  <"all_witnesses" : false >
  "query" : Query }
```

The commit message is required if an update is being made, whereas `query` should be a JSON-LD object.

If `"all_witnesses"` is false, then the end-point will return immediately when an schema violation is encountered with the first witness of failure.

This API call performs a WOQL query and returns an `api:WoqlResponse` result object like:

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

This API endpoint will attempt to optimize the database using an appropriate strategy. This call is not recursive, i.e. it will only optimize access to the respective graph collection specified.

In the case of an unspecified branch, `main` is assumed.
