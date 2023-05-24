# WOQLClient

## WOQLClient

The core functionality of the TerminusDB javascript client is defined in the WOQLClient class - in the woqlClient.js file. This class provides methods which allow you to directly get and set all of the configuration and API endpoints of the client. The other parts of the WOQL core - connectionConfig.js and connectionCapabilities.js - are used by the client to store internal state - they should never have to be accessed directly. For situations where you want to communicate with a TerminusDB server API, the WOQLClient class is all you will need.

**License**: Apache Version 2

## new WOQLClient(serverUrl, \[params])

| Param     | Type                | Description                              |
| --------- | ------------------- | ---------------------------------------- |
| serverUrl | `string`            | the terminusdb server url                |
| \[params] | `typedef.ParamsObj` | an object with the connection parameters |

**Example**

```javascript
//to connect with your local terminusDB
const client = new TerminusClient.WOQLClient(SERVER_URL,{user:"admin",key:"myKey"})
async function getSchema() {
     client.db("test")
     client.checkout("dev")
     const schema = await client.getSchema()
}
//The client has an internal state which defines what
//organization / database / repository / branch / ref it is currently attached to

//to connect with your TerminusCMS Cloud Instance
const client = new TerminusClient.WOQLClient('SERVER_CLOUD_URL/mycloudTeam',
                     {user:"myemail@something.com", organization:'mycloudTeam'})

client.setApiKey(MY_ACCESS_TOKEN)

//to get the list of all organization's databases
async function callGetDatabases(){
     const dbList = await client.getDatabases()
     console.log(dbList)
}

async function getSchema() {
     client.db("test")
     client.checkout("dev")
     const schema = await client.getSchema()
}
```

## TerminusDB Client API

## Connect

~~**woqlClient.connect(\[params]) ⇒**** ****`Promise`**~~

_**Deprecated**_

Connect to a Terminus server at the given URI with an API key Stores the system:ServerCapability document returned in the connection register which stores, the url, key, capabilities, and database meta-data for the connected server this.connectionConfig.server will be used if present, or the promise will be rejected.

**Returns**: `Promise` - the connection capabilities response object or an error object

| Param     | Type                | Description                             |
| --------- | ------------------- | --------------------------------------- |
| \[params] | `typedef.ParamsObj` | TerminusDB Server connection parameters |

**Example**

```javascript
client.connect()
```

## Create Database

**woqlClient.createDatabase(dbId, dbDetails, \[orgId]) ⇒ `Promise`**

Creates a new database in TerminusDB server

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param     | Type                | Description                                                                |
| --------- | ------------------- | -------------------------------------------------------------------------- |
| dbId      | `string`            | The id of the new database to be created                                   |
| dbDetails | `typedef.DbDetails` | object containing details about the database to be created                 |
| \[orgId]  | `string`            | optional organization id - if absent default local organization id is used |

**Example**

```javascript
//remember set schema:true if you need to add a schema graph
client.createDatabase("mydb", {label: "My Database", comment: "Testing", schema: true})
```

## Delete Database

**woqlClient.deleteDatabase(dbId, \[orgId], \[force]) ⇒ `Promise`**

Deletes a database from a TerminusDB server

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param    | Type      | Description                                                                                            |
| -------- | --------- | ------------------------------------------------------------------------------------------------------ |
| dbId     | `string`  | The id of the database to be deleted                                                                   |
| \[orgId] | `string`  | the id of the organization to which the database belongs (in desktop use, this will always be “admin”) |
| \[force] | `boolean` |                                                                                                        |

**Example**

```javascript
client.deleteDatabase("mydb")
```

## Get Triples

**woqlClient.getTriples(graphType) ⇒ `Promise`**

Retrieve the contents of a graph within a TerminusDB as triples, encoded in the turtle (ttl) format

**Returns**: `Promise` - A promise that returns the call response object (with the contents being a string representing a set of triples in turtle (ttl) format), or an Error if rejected.

| Param     | Type                | Description                                                      |
| --------- | ------------------- | ---------------------------------------------------------------- |
| graphType | `typedef.GraphType` | type of graph to get triples from, either “instance” or “schema” |

**Example**

```javascript
const turtle = await client.getTriples("schema", "alt")
```

## Update Triples

**woqlClient.updateTriples(graphType, turtle, commitMsg) ⇒ `Promise`**

Replace the contents of the specified graph with the passed triples encoded in the turtle (ttl) format

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param     | Type     | Description                                          |
| --------- | -------- | ---------------------------------------------------- |
| graphType | `string` | type of graph                                        |
| turtle    | `string` | string encoding triples in turtle (ttl) format       |
| commitMsg | `string` | Textual message describing the reason for the update |

**Example**

```javascript
client.updateTriples("schema", "alt", turtle_string, "dumping triples to graph alt")
```

## Query

**woqlClient.query(woql, \[commitMsg], \[allWitnesses], \[lastDataVersion], \[getDataVersion]) ⇒ `Promise`**

Executes a WOQL query on the specified database and returns the results

**Returns**: `Promise` - A promise that returns the call response object or object having _result_ and _dataVersion_ object if _**getDataVersion**_ parameter is true, or an Error if rejected.

| Param              | Type        | Description                                                                                                                             |
| ------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| woql               | `WOQLQuery` | an instance of the WOQLQuery class                                                                                                      |
| \[commitMsg]       | `string`    | a message describing the reason for the change that will be written into the commit log (only relevant if the query contains an update) |
| \[allWitnesses]    | `boolean`   |                                                                                                                                         |
| \[lastDataVersion] | `string`    | the last data version tracking id.                                                                                                      |
| \[getDataVersion]  | `boolean`   | If true the function will return object having result and dataVersion.                                                                  |

**Example**

```javascript
const result = await client.query(WOQL.star())
```

## Clonedb

**woqlClient.clonedb(cloneSource, newDbId, \[orgId]) ⇒ `Promise`**

Clones a remote repo and creates a local copy

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param       | Type                         | Description                                                                                                           |
| ----------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| cloneSource | `typedef.CloneSourceDetails` | object describing the source branch to be used as a base                                                              |
| newDbId     | `string`                     | id of the new cloned database on the local server                                                                     |
| \[orgId]    | `string`                     | id of the local organization that the new cloned database will be created in (in desktop mode this is always “admin”) |

**Example**

```javascript
client.clonedb({remote_url: "https://my.terminusdb.com/myorg/mydb", label "Cloned DB", comment: "Cloned from mydb"}, newid: "mydb")
```

## Branch

**woqlClient.branch(newBranchId, \[isEmpty]) ⇒ `Promise`**

Creates a new branch with a TerminusDB database, starting from the current context of the client (branch / ref)

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param       | Type      | Description                                                               |
| ----------- | --------- | ------------------------------------------------------------------------- |
| newBranchId | `string`  | local identifier of the new branch the ID of the new branch to be created |
| \[isEmpty]  | `boolean` | if isEmpty is true it will create a empty branch.                         |

**Example**

```javascript
client.branch("dev")
```

## Rebase

**woqlClient.rebase(rebaseSource) ⇒ `Promise`**

Merges the passed branch into the current one using the rebase operation

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param        | Type     | Description                                            |
| ------------ | -------- | ------------------------------------------------------ |
| rebaseSource | `object` | json describing the source branch to be used as a base |

**Example**

```javascript
//from the branch head
client.rebase({rebase_from: "admin/db_name/local/branch/branch_name", message:
"Merging from dev")
//or from a commit id
client.rebase({rebase_from: "admin/db_name/local/commit/9w8hk3y6rb8tjdy961de3i536ntkqd8",
message: "Merging from dev")
```

## Pull

**woqlClient.pull(remoteSourceRepo) ⇒ `Promise`**

Pull changes from a branch on a remote database to a branch on a local database

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param            | Type                        | Description                                 |
| ---------------- | --------------------------- | ------------------------------------------- |
| remoteSourceRepo | `typedef.RemoteRepoDetails` | an object describing the source of the pull |

**Example**

```javascript
client.pull({remote: "origin", remote_branch: "main", message: "Pulling from remote"})
```

## Push

**woqlClient.push(remoteTargetRepo) ⇒ `Promise`**

Push changes from a branch on a local database to a branch on a remote database

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param            | Type                        | Description                                                                                                                       |
| ---------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| remoteTargetRepo | `typedef.RemoteRepoDetails` | an object describing the target of the push {remote: "origin", "remote\_branch": "main", "author": "admin", "message": "message"} |

**Example**

```javascript
client.push({remote: "origin", remote_branch: "main", message: "Pulling from remote"})
```

## Fetch

**woqlClient.fetch(remoteId) ⇒ `Promise`**

Fetch updates to a remote database to a remote repository with the local database

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param    | Type     | Description                              |
| -------- | -------- | ---------------------------------------- |
| remoteId | `string` | if of the remote to fetch (eg: 'origin') |

## local\_auth

~~**woqlClient.local\_auth**~~

_**Deprecated**_

Use [#localAuth](woqlclient.md#localauth) instead.

## remote\_auth

~~**woqlClient.remote\_auth**~~

_**Deprecated**_

Use [#remoteAuth](woqlclient.md#remoteauth) instead.

## setApiKey

**woqlClient.setApiKey(accessToken)**

set the api key to access the cloud resources

| Param       | Type     |
| ----------- | -------- |
| accessToken | `string` |

## customHeaders

**woqlClient.customHeaders(customHeaders) ⇒ `object`**

add extra headers to your request

| Param         | Type     |
| ------------- | -------- |
| customHeaders | `object` |

## copy

**woqlClient.copy() ⇒** [**`WOQLClient`**](woqlclient.md#WOQLClient)

creates a copy of the client with identical internal state and context useful if we want to change context for a particular API call without changing the current client context

**Returns**: [`WOQLClient`](woqlclient.md#WOQLClient) - new client object with identical state to original but which can be manipulated independently\
**Example**

```javascript
let newClient = client.copy()
```

## server

**woqlClient.server() ⇒ `string`**

Gets the current connected server url it can only be set creating a new WOQLCLient instance

## api

**woqlClient.api() ⇒ `string`**

Retrieve the URL of the server’s API base that we are currently connected to

**Returns**: `string` - the URL of the TerminusDB server api endpoint we are connected to (typically server() + “api/”)\
**Example**

```javascript
let api_url = client.api()
```

## organization

**woqlClient.organization(\[orgId]) ⇒ `string` | `boolean`**

Gets/Sets the client’s internal organization context value, if you change the organization name the databases list will be set to empty

| Param    | Type                  | Description                               |
| -------- | --------------------- | ----------------------------------------- |
| \[orgId] | `string` \| `boolean` | the organization id to set the context to |

**Example**

```javascript
client.organization("admin")
```

## hasDatabase

**woqlClient.hasDatabase(\[orgName], \[dbName]) ⇒ `Promise`**

Checks if a database exists

Returns true if a DB exists and false if it doesn't. Other results throw an exception.

| Param      | Type     | Description                               |
| ---------- | -------- | ----------------------------------------- |
| \[orgName] | `string` | the organization id to set the context to |
| \[dbName]  | `string` | the db name to set the context to         |

**Example**

```javascript
async function executeIfDatabaseExists(f){
     const hasDB = await client.hasDatabase("admin", "testdb")
     if (hasDB) {
         f()
     }
}
```

## getDatabases

**woqlClient.getDatabases() ⇒ `Promise`**

Gets the organization's databases list.

If no organization has been set up, the function throws an exception

**Example**

```javascript
async function callGetDatabases(){
     const dbList = await client.getDatabases()
     console.log(dbList)
}
```

## databases

**woqlClient.databases(\[dbList]) ⇒ `array`**

Set/Get the organization's databases list (id, label, comment) that the current user has access to on the server.

**Returns**: `array` - the organization's databases list

| Param     | Type    | Description                                                            |
| --------- | ------- | ---------------------------------------------------------------------- |
| \[dbList] | `array` | a list of databases the user has access to on the server, each having: |

**Example**

```javascript
//to get the list of all organization's databases
async function callGetDatabases(){
     await client.getDatabases()
     console.log(client.databases())
}
```

## user

**woqlClient.user() ⇒ `Object`**

Gets the current user object as returned by the connect capabilities response user has fields: \[id, name, notes, author]

## userOrganization

**woqlClient.userOrganization() ⇒ `string`**

**Returns**: `string` - the user organization name\
**Desription**: Gets the user's organization id

## databaseInfo

**woqlClient.databaseInfo(\[dbName]) ⇒ `object`**

Gets the database's details

**Returns**: `object` - the database description object

| Param     | Type     | Description      |
| --------- | -------- | ---------------- |
| \[dbName] | `string` | the datbase name |

## db

**woqlClient.db(\[dbId]) ⇒ `string` | `boolean`**

Sets / Gets the current database

**Returns**: `string` | `boolean` - - the current database or false

| Param   | Type     | Description                           |
| ------- | -------- | ------------------------------------- |
| \[dbId] | `string` | the database id to set the context to |

**Example**

```javascript
client.db("mydb")
```

## setSystemDb

**woqlClient.setSystemDb()**

Sets the internal client context to allow it to talk to the server’s internal system database

## repo

**woqlClient.repo(\[repoId]) ⇒ `string`**

Gets / Sets the client’s internal repository context value (defaults to ‘local’)

**Returns**: `string` - the current repository id within the client context

| Param     | Type                           | Description            |
| --------- | ------------------------------ | ---------------------- |
| \[repoId] | `typedef.RepoType` \| `string` | default value is local |

**Example**

```javascript
client.repo("origin")
```

## checkout

**woqlClient.checkout(\[branchId]) ⇒ `string`**

Gets/Sets the client’s internal branch context value (defaults to ‘main’)

**Returns**: `string` - the current branch id within the client context

| Param       | Type     | Description                         |
| ----------- | -------- | ----------------------------------- |
| \[branchId] | `string` | the branch id to set the context to |

## ref

**woqlClient.ref(\[commitId]) ⇒ `string` | `boolean`**

Sets / gets the current ref pointer (pointer to a commit within a branch) Reference ID or Commit ID are unique hashes that are created whenever a new commit is recorded

**Returns**: `string` | `boolean` - the current commit id within the client context

| Param       | Type     | Description                   |
| ----------- | -------- | ----------------------------- |
| \[commitId] | `string` | the reference ID or commit ID |

**Example**

```javascript
client.ref("mkz98k2h3j8cqjwi3wxxzuyn7cr6cw7")
```

## localAuth

**woqlClient.localAuth(\[newCredential]) ⇒ `typedef.CredentialObj` | `boolean`**

Sets/Gets set the database basic connection credential

| Param            | Type                    |
| ---------------- | ----------------------- |
| \[newCredential] | `typedef.CredentialObj` |

**Example**

```javascript
client.localAuth({user:"admin","key":"mykey","type":"basic"})
```

## remoteAuth

**woqlClient.remoteAuth(\[newCredential]) ⇒ `typedef.CredentialObj` | `boolean`**

Sets/Gets the jwt token for authentication we need this to connect 2 terminusdb server to each other for push, pull, clone actions

| Param            | Type                    |
| ---------------- | ----------------------- |
| \[newCredential] | `typedef.CredentialObj` |

**Example**

```javascript
client.remoteAuth({"key":"dhfmnmjglkrelgkptohkn","type":"jwt"})
```

## author

**woqlClient.author() ⇒ `string`**

Gets the string that will be written into the commit log for the current user

**Returns**: `string` - the current user\
**Example**

```javascript
client.author()
```

## set

**woqlClient.set(params)**

| Param  | Type                | Description                     |
| ------ | ------------------- | ------------------------------- |
| params | `typedef.ParamsObj` | a object with connection params |

**Example**

```javascript
sets several of the internal state values in a single call
(similar to connect, but only sets internal client state, does not communicate with server)
client.set({key: "mypass", branch: "dev", repo: "origin"})
```

## resource

**woqlClient.resource(resourceType, \[resourceId]) ⇒ `string`**

Generates a resource string for the required context of the current context for "commits" "meta" "branch" and "ref" special resources

**Returns**: `string` - a resource string for the desired context

| Param         | Type                   | Description                                                                                            |
| ------------- | ---------------------- | ------------------------------------------------------------------------------------------------------ |
| resourceType  | `typedef.ResourceType` | the type of resource string that is required - one of “db”, “meta”, “repo”, “commits”, “branch”, “ref” |
| \[resourceId] | `string`               | can be used to specify a specific branch / ref - if not supplied the current context will be used      |

**Example**

```javascript
const branch_resource = client.resource("branch")
```

## updateDatabase

**woqlClient.updateDatabase(dbDoc) ⇒ `Promise`**

Update a database in TerminusDB server

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param | Type            | Description                                                |
| ----- | --------------- | ---------------------------------------------------------- |
| dbDoc | `typedef.DbDoc` | object containing details about the database to be updated |

**Example**

```javascript
client.updateDatabase({id: "mydb", label: "My Database", comment: "Testing"})
```

## insertTriples

**woqlClient.insertTriples(graphType, turtle, commitMsg) ⇒ `Promise`**

Appends the passed turtle to the contents of a graph

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param     | Type     | Description                                          |
| --------- | -------- | ---------------------------------------------------- |
| graphType | `string` | type of graph                                        |
| turtle    | `string` | is a valid set of triples in turtle format (OWL)     |
| commitMsg | `string` | Textual message describing the reason for the update |

## message

**woqlClient.message(message, \[pathname]) ⇒ `Promise`**

Sends a message to the server

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param       | Type     | Description                          |
| ----------- | -------- | ------------------------------------ |
| message     | `string` | textual string                       |
| \[pathname] | `string` | a server path to send the message to |

## action

**woqlClient.action(actionName, \[payload]) ⇒ `Promise`**

Sends an action to the server

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param      | Type     | Description             |
| ---------- | -------- | ----------------------- |
| actionName | `string` | structure of the action |
| \[payload] | `object` | a request body call     |

## info

**woqlClient.info() ⇒ `Promise`**

Gets TerminusDB Server Information

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.\
**Example**

```javascript
client.info()
```

## squashBranch

**woqlClient.squashBranch(branchId, commitMsg) ⇒ `Promise`**

Squash branch commits

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param     | Type     | Description                                          |
| --------- | -------- | ---------------------------------------------------- |
| branchId  | `string` | local identifier of the new branch                   |
| commitMsg | `string` | Textual message describing the reason for the update |

## resetBranch

**woqlClient.resetBranch(branchId, commitId) ⇒ `Promise`**

Reset branch to a commit id, Reference ID or Commit ID are unique hashes that are created whenever a new commit is recorded

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param    | Type     | Description                        |
| -------- | -------- | ---------------------------------- |
| branchId | `string` | local identifier of the new branch |
| commitId | `string` | Reference ID or Commit ID          |

## optimizeBranch

**woqlClient.optimizeBranch(branchId) ⇒ `Promise`**

Optimize db branch

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param    | Type     | Description                        |
| -------- | -------- | ---------------------------------- |
| branchId | `string` | local identifier of the new branch |

## deleteBranch

**woqlClient.deleteBranch(branchId) ⇒ `Promise`**

Deletes a branch from database

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param    | Type     | Description                    |
| -------- | -------- | ------------------------------ |
| branchId | `string` | local identifier of the branch |

## reset

**woqlClient.reset(commitPath) ⇒ `Promise`**

Reset the current branch HEAD to the specified commit path

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param      | Type     | Description                                  |
| ---------- | -------- | -------------------------------------------- |
| commitPath | `string` | The commit path to set the current branch to |

## dispatch

**woqlClient.dispatch() ⇒ `Promise`**

Common request dispatch function

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.\
**Properties**

| Name              | Type      | Description                                                |
| ----------------- | --------- | ---------------------------------------------------------- |
| action            | `string`  | the action name                                            |
| apiUrl            | `string`  | the server call endpoint                                   |
| \[payload]        | `object`  | the post body                                              |
| \[getDataVersion] | `boolean` | If true return response with data version                  |
| \[compress]       | `boolean` | If true, compress the data if it is bigger than 1024 bytes |

## generateCommitInfo

**woqlClient.generateCommitInfo(msg, \[author]) ⇒ `object`**

Generates the json structure for commit messages

| Param     | Type     | Description                                                        |
| --------- | -------- | ------------------------------------------------------------------ |
| msg       | `string` | textual string describing reason for the change                    |
| \[author] | `string` | optional author id string - if absent current user id will be used |

## generateCommitDescriptor

**woqlClient.generateCommitDescriptor(commitId)**

Generates the json structure for commit descriptor

| Param    | Type     | Description         |
| -------- | -------- | ------------------- |
| commitId | `string` | a valid commit id o |

## prepareRevisionControlArgs

**woqlClient.prepareRevisionControlArgs(\[rc\_args]) ⇒ `object` | `boolean`**

Adds an author string (from the user object returned by connect) to the commit message.

| Param       | Type     |
| ----------- | -------- |
| \[rc\_args] | `object` |

## addDocument

**woqlClient.addDocument(json, \[params], \[dbId], \[string], \[lastDataVersion], \[getDataVersion]) ⇒ `Promise`**

to add a new document or a list of new documents into the instance or the schema graph.

**Returns**: `Promise` - A promise that returns the call response object or object having _result_ and _dataVersion_ object if _**getDataVersion**_ parameter is true, or an Error if rejected.

| Param              | Type                    | Description                                                                       |
| ------------------ | ----------------------- | --------------------------------------------------------------------------------- |
| json               | `object`                |                                                                                   |
| \[params]          | `typedef.DocParamsPost` | the post parameters [#typedef.DocParamsPost](woqlclient.md#typedef.DocParamsPost) |
| \[dbId]            | `string`                | the dbid                                                                          |
| \[string]          | `message`               | the insert commit message                                                         |
| \[lastDataVersion] | `string`                | the last data version tracking id.                                                |
| \[getDataVersion]  | `boolean`               | If true the function will return object having result and dataVersion.            |

**Example**

```javascript
const json = [{ "@type" : "Class",
             "@id" : "Coordinate",
             "@key" : { '@type' : 'Hash',
             '@fields' : ['x','y'] },
             "x" : "xsd:decimal",
             "y" : "xsd:decimal" },
             { "@type" : "Class",
             "@id" : "Country",
             "@key" : { '@type' : 'Lexical',
                         '@fields' : [name] },
             "name" : "xsd:string",
             "perimeter" : { "@type" : "List",
                             "@class" : "Coordinate" } }]
client.addDocument(json,{"graph_type":"schema"},"mydb","add new schema")


// Here we will pass true to show how to get dataVersion

const response = await client.addDocument(json, {"graph_type": "schema"},
  "mydb",
  "add new schema", '',
  true
)
console.log(response);

 // This will output:
 // {
 //   result: [ ...... ],
 //   dataVersion: 'branch:5fs681tlycnn6jh0ceiqcq4qs89pdfs'
 // }

 // Now we can use the data version we recieved as a response in previous
 // function call and used it is next function call as lastDataVersion

const response1 = await client.addDocument(json, {"graph_type": "schema"},
  "mydb",
  "add new schema", response.dataVersion,
)
```

## queryDocument

~~**woqlClient.queryDocument(query, \[params], \[dbId], \[branch], \[lastDataVersion], \[getDataVersion]) ⇒**** ****`Promise`**~~

_**Deprecated**_

Use [#getDocument](woqlclient.md#getdocument) instead.

**Returns**: `Promise` - A promise that returns the call response object or object having _result_ and _dataVersion_ object if _**getDataVersion**_ parameter is true, or an Error if rejected.

| Param              | Type                   | Description                                                            |
| ------------------ | ---------------------- | ---------------------------------------------------------------------- |
| query              | `object`               | the query template                                                     |
| \[params]          | `typedef.DocParamsGet` | the get parameters                                                     |
| \[dbId]            | `string`               | the database id                                                        |
| \[branch]          | `string`               | the database branch                                                    |
| \[lastDataVersion] | `string`               | the last data version tracking id.                                     |
| \[getDataVersion]  | `boolean`              | If true the function will return object having result and dataVersion. |

**Example**

```javascript
const query = {
  "type": "Person",
  "query": { "age": 42 },
 }
client.queryDocument(query, {"as_list":true})


// Here we will pass true to show how to get dataVersion
const query = {
  "type": "Person",
  "query": { "age": 42 },
 }

const response = await client.queryDocument(query, {"as_list": true}, '', '','',true);
console.log(response);

 // This will output:
 // {
 //   result: [
 //     {
 //       '@id': 'Person/052d60ffbd114bf5e7331b03f07fcb7',
 //       '@type': 'Person',
 //       age: 42,
 //       name: 'John',
 //     },
 //   ],
 //   dataVersion: 'branch:5fs681tlycnn6jh0ceiqcq4qs89pdfs'
 // }

 // Now we can use the data version we recieved as a response in previous
 // query and used it is next query as lastDataVersion
 const query = {
  "type": "Person",
  "query": { "age": 18 },
 }

 const response1 = await client.queryDocument(query, {"as_list": true}, '',
   '',
   response.dataVersion
 );
```

## getDocument

**woqlClient.getDocument(\[params], \[dbId], \[branch], \[lastDataVersion], \[getDataVersion], \[query]) ⇒ `Promise`**

**Returns**: `Promise` - A promise that returns the call response object or object having _result_ and _dataVersion_ object if _**getDataVersion**_ parameter is true, or an Error if rejected.

| Param              | Type                   | Description                                                                     |
| ------------------ | ---------------------- | ------------------------------------------------------------------------------- |
| \[params]          | `typedef.DocParamsGet` | the get parameters, you can pass document query search template with the params |
| \[dbId]            | `string`               | the database id                                                                 |
| \[branch]          | `string`               | the database branch                                                             |
| \[lastDataVersion] | `string`               | the last data version tracking id.                                              |
| \[getDataVersion]  | `boolean`              | If true the function will return object having result and dataVersion.          |
| \[query]           | `object`               | document query search template                                                  |

**Example**

```javascript
//return the schema graph as a json array
client.getDocument({"graph_type":"schema","as_list":true}).then(result={
   console.log(result)
})

//retutn the Country class document from the schema graph
client.getDocument({"graph_type":"schema","as_list":true,"id":"Country"}).then(result={
   console.log(result)
})

//pass a document query template to query the document interface
const queryTemplate = { "name": "Ireland", "@type":"Country" }
client.getDocument({"graph_type":"schema","as_list":true,
           query:queryTemplate}).then(result=>{
   console.log(result)
})


// Here we will pass true to show how to get dataVersion
const response = await client.getDocument({"graph_type":"schema","as_list":true},
  "",
  "",
  "",
  true
)
console.log(response);

 // This will output:
 // {
 //   result: [ ...... ],
 //   dataVersion: 'branch:5fs681tlycnn6jh0ceiqcq4qs89pdfs'
 // }

 // Now we can use the data version we recieved as a response in previous
 // function call and used it is next function call as lastDataVersion

const response1 = await client.getDocument({"graph_type":"schema","as_list":true},
  "",
  "",
  response.dataVersion,
)
```

## updateDocument

**woqlClient.updateDocument(json, \[params], \[dbId], \[message], \[lastDataVersion], \[getDataVersion], \[create]) ⇒ `Promise`**

**Returns**: `Promise` - A promise that returns the call response object or object having _result_ and _dataVersion_ object if _**getDataVersion**_ parameter is true, or an Error if rejected.

| Param              | Type                   | Description                                                                    |
| ------------------ | ---------------------- | ------------------------------------------------------------------------------ |
| json               | `object`               |                                                                                |
| \[params]          | `typedef.DocParamsPut` | the Put parameters [#typedef.DocParamsPut](woqlclient.md#typedef.DocParamsPut) |
| \[dbId]            | `*`                    | the database id                                                                |
| \[message]         | `*`                    | the update commit message                                                      |
| \[lastDataVersion] | `string`               | the last data version tracking id.                                             |
| \[getDataVersion]  | `boolean`              | If true the function will return object having result and dataVersion.         |
| \[create]          | `boolean`              | If true, the function will create a new document if it doesn't exist.          |

**Example**

```javascript
client.updateDocument(
{
 "@id": "Person",
   "@key": {
     "@type": "Random",
   },
   "@type": "Class",
   label: "xsd:string",
 },
{ graph_type: "schema" }
);


// Here we will pass true to show how to get dataVersion

    const response = await client.updateDocument(
      {
        "@id": "Person",
        "@key": {
          "@type": "Random",
        },
        "@type": "Class",
        label: "xsd:string",
      },
      { graph_type: "schema" },
      "",
      "",
      "",
      true
    );
console.log(response);

 // This will output:
 // {
 //   result: [ ...... ],
 //   dataVersion: 'branch:5fs681tlycnn6jh0ceiqcq4qs89pdfs'
 // }

 // Now we can use the data version we recieved as a response in previous
 // function call and used it is next function call as lastDataVersion

const response1 = await client.updateDocument(
      {
        "@id": "Person",
        "@key": {
          "@type": "Random",
        },
        "@type": "Class",
        label: "xsd:string",
      },
      { graph_type: "schema" },
      "",
      "",
      response.dataVersion
    );
```

## deleteDocument

**woqlClient.deleteDocument(\[params], \[dbId], \[message], \[lastDataVersion], \[getDataVersion]) ⇒ `Promise`**

to delete the document

**Returns**: `Promise` - A promise that returns the call response object or object having _result_ and _dataVersion_ object if _**getDataVersion**_ parameter is true, or an Error if rejected.

| Param              | Type                      | Description                                                            |
| ------------------ | ------------------------- | ---------------------------------------------------------------------- |
| \[params]          | `typedef.DocParamsDelete` |                                                                        |
| \[dbId]            | `string`                  | the database id                                                        |
| \[message]         | `string`                  | the delete message                                                     |
| \[lastDataVersion] | `string`                  | the last data version tracking id.                                     |
| \[getDataVersion]  | `boolean`                 | If true the function will return object having result and dataVersion. |

**Example**

```javascript
client.deleteDocument({"graph_type":"schema",id:['Country','Coordinate']})


// Here we will pass true to show how to get dataVersion

const response = await client.deleteDocument({"graph_type":"schema",id:['Country','Coordinate']},
  "",
  "",
  "",
  true
)
console.log(response);

 // This will output:
 // {
 //   result: [ ...... ],
 //   dataVersion: 'branch:5fs681tlycnn6jh0ceiqcq4qs89pdfs'
 // }

 // Now we can use the data version we recieved as a response in previous
 // function call and used it is next function call as lastDataVersion

const response1 = await client.deleteDocument({"graph_type":"schema",
  id:['Country','Coordinate']},
  "",
  "",
  response.dataVersion,
)
```

## getSchemaFrame

**woqlClient.getSchemaFrame(\[type], \[dbId]) ⇒ `Promise`**

The purpose of this method is to quickly discover the supported fields of a particular type.

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param   | Type     | Description                                                                                  |
| ------- | -------- | -------------------------------------------------------------------------------------------- |
| \[type] | `string` | If given, the type to get information for. If omitted, information for all types is returned |
| \[dbId] | `string` | the database id                                                                              |

**Example**

```javascript
client.getSchemaFrame("Country")
```

## getSchema

**woqlClient.getSchema(\[dbId], \[branch]) ⇒ `Promise`**

get the database schema in json format

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param     | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| \[dbId]   | `string` | the database id              |
| \[branch] | `string` | specific a branch/collection |

**Example**

```javascript
client.getSchema()
```

## getClasses

**woqlClient.getClasses(\[dbId]) ⇒ `Promise`**

get all the schema classes (documents,subdocuments,abstracts)

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param   | Type     | Description     |
| ------- | -------- | --------------- |
| \[dbId] | `string` | the database id |

**Example**

```javascript
client.getClasses()
```

## getEnums

**woqlClient.getEnums(\[dbId]) ⇒ `Promise`**

get all the Enum Objects

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param   | Type     |
| ------- | -------- |
| \[dbId] | `string` |

**Example**

```javascript
client.getEnums()
```

## getClassDocuments

**woqlClient.getClassDocuments(\[dbId]) ⇒ `Promise`**

get all the Document Classes (no abstract or subdocument)

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param   | Type     |
| ------- | -------- |
| \[dbId] | `string` |

**Example**

```javascript
client.getClassDocuments()
```

## getBranches

**woqlClient.getBranches(\[dbId]) ⇒ `Promise`**

get the database collections list

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param   | Type     | Description     |
| ------- | -------- | --------------- |
| \[dbId] | `string` | the database id |

**Example**

```javascript
client.getBranches()
```

## getCommitsLog

**woqlClient.getCommitsLog(\[dbId]) ⇒ `Promise`**

get the database collections list

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param   | Type     | Description     |
| ------- | -------- | --------------- |
| \[dbId] | `string` | the database id |

**Example**

```javascript
client.getCommitsLog()
```

## getPrefixes

**woqlClient.getPrefixes(\[dbId]) ⇒ `Promise`**

get the database prefixes object

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param   | Type     | Description     |
| ------- | -------- | --------------- |
| \[dbId] | `string` | the database id |

**Example**

```javascript
client.getPrefixes()
//return object example
{
'@base': 'terminusdb:///data/',
'@schema': 'terminusdb:///schema#',
'@type': 'Context'}
```

## getUserOrganizations

**woqlClient.getUserOrganizations() ⇒ `Promise`**

Get the list of the user's organizations and the database related

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.\
**Example**

```javascript
async funtion callGetUserOrganizations(){
     await getUserOrganizations()
     console.log(client.userOrganizations())
}
```

## userOrganizations

**woqlClient.userOrganizations(\[orgList]) ⇒ `array`**

Get/Set the list of the user's organizations (id, organization, label, comment).

**Returns**: `array` - the user Organizations list

| Param      | Type    | Description                   |
| ---------- | ------- | ----------------------------- |
| \[orgList] | `array` | a list of user's Organization |

**Example**

```javascript
async funtion callGetUserOrganizations(){
     await client.getUserOrganizations()
     console.log(client.userOrganizations())
}
```

## getJSONDiff

**woqlClient.getJSONDiff(before, after, \[options]) ⇒ `Promise`**

Get the patch of difference between two documents.

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param      | Type     | Description                                                                                                                                                                                            |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| before     | `object` | The current state of JSON document                                                                                                                                                                     |
| after      | `object` | The updated state of JSON document                                                                                                                                                                     |
| \[options] | `object` | {keep:{\}} Options to send to the diff endpoint. The diff api outputs the changes between the input, in options you can list the properties that you would like to see in the diff result in any case. |

**Example**

```javascript
client.getJSONDiff(
     { "@id": "Person/Jane", "@type": "Person", name: "Jane" },
     { "@id": "Person/Jane", "@type": "Person", name: "Janine" }
 ).then(diffResult=>{
 console.log(diffResult)
})
//result example
//{'@id': 'Person/Jane',
// name: { '@after': 'Janine', '@before': 'Jane', '@op': 'SwapValue' }}
```

## getVersionObjectDiff

**woqlClient.getVersionObjectDiff(dataVersion, jsonObject, id, \[options]) ⇒ `Promise`**

Get the patch of difference between two documents.

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param       | Type     | Description                                                                                                                                                                                    |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dataVersion | `string` | The version from which to compare the object                                                                                                                                                   |
| jsonObject  | `object` | The updated state of JSON document                                                                                                                                                             |
| id          | `string` | The document id to be diffed                                                                                                                                                                   |
| \[options]  | `object` | {keep:{\}} Options to send to the diff endpoint the diff api outputs the changes between the input, but you can list the properties that you would like to see in the diff result in any case. |

**Example**

```javascript
const jsonObj =  { "@id": "Person/Jane", "@type": "Person", name: "Janine" }
client.getVersionObjectDiff("main",jsonObj
     "Person/Jane").then(diffResp=>{
   console.log(diffResp)
})
```

## getVersionDiff

**woqlClient.getVersionDiff(beforeVersion, afterVersion, \[id], \[options]) ⇒ `Promise`**

Get the patch of difference between branches or commits.

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param         | Type     | Description                                                                                                                                                                                                                  |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| beforeVersion | `string` | Before branch/commit to compare                                                                                                                                                                                              |
| afterVersion  | `string` | After branch/commit to compare                                                                                                                                                                                               |
| \[id]         | `string` | The document id to be diffed, if it is omitted all the documents will be compared                                                                                                                                            |
| \[options]    | `object` | {keep:{\}} Options to send to the diff endpoint. The diff api outputs the changes between the input (branches or commits), in options you can list the properties that you would like to see in the diff result in any case. |

**Example**

```javascript
//This is to view all the changes between two commits
const beforeCommit = "a73ssscfx0kke7z76083cgswszdxy6l"
const afterCommit = "73rqpooz65kbsheuno5dsayh71x7wf4"

client.getVersionDiff( beforeCommit, afterCommit).then(diffResult=>{
 console.log(diffResult)
})

//This is to view the changes between two commits but only for the given document
client.getVersionDiff( beforeCommit, afterCommit, "Person/Tom").then(diffResult=>{
 console.log(diffResult)
})

//This is to view the changes between a branch (head) and a commit for the given document
client.getVersionDiff("main", afterCommit, "Person/Tom" ).then(diffResult=>{
   console.log(diffResult)
})

//This is to view the changes between two branches with the keep options
const options = {"keep":{"@id":true, "name": true}}
client.getVersionDiff("main","mybranch",options).then(diffResult=>{
   console.log(diffResult)
})
```

## apply

**woqlClient.apply(beforeVersion, afterVersion, message, \[matchFinalState], \[options])**

Diff two different commits and apply changes on the current branch/commit. If you would like to change branch or commit before apply use client.checkout("branchName")

| Param              | Type      | Description                                      |
| ------------------ | --------- | ------------------------------------------------ |
| beforeVersion      | `string`  | Before branch/commit to compare                  |
| afterVersion       | `string`  | After branch/commit to compare                   |
| message            | `string`  | apply commit message                             |
| \[matchFinalState] | `boolean` | the default value is false                       |
| \[options]         | `object`  | {keep:{\}} Options to send to the apply endpoint |

**Example**

```javascript
client.checkout("mybranch")
client.apply("main","mybranch","merge main").then(result=>{
   console.log(result)
})
```

## patch

**woqlClient.patch(before, patch) ⇒ `Promise`**

Patch the difference between two documents.

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param  | Type     | Description                        |
| ------ | -------- | ---------------------------------- |
| before | `object` | The current state of JSON document |
| patch  | `object` | The patch object                   |

**Example**

```javascript
let diffPatch = await client.getJSONDiff(
     { "@id": "Person/Jane", "@type": "Person", name: "Jane" },
     { "@id": "Person/Jane", "@type": "Person", name: "Janine" }
 );

let patch = await client.patch( { "@id": "Person/Jane", "@type": "Person", name: "Jane" },
diffPatch);
```

## sendCustomRequest

**woqlClient.sendCustomRequest(requestType, customRequestURL, \[payload]) ⇒ `Promise`**

Call a custom Api endpoit

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param            | Type     | Description                        |
| ---------------- | -------- | ---------------------------------- |
| requestType      | `string` | The current state of JSON document |
| customRequestURL | `string` | The patch object                   |
| \[payload]       | `object` | the request payload                |

**Example**

```javascript
client.sendCustomRequest("GET", "http://localhost:3030/changes/").then(result=>{
   console.log(result)
})
```
