# Start with a Client API

> **On this page:** A step-by-step guide with examples to get started with JavaScript or Python client.  

The TerminusDB client package contains the two core components outlined below. This guide demonstrates the basic use of each component. Refer to [TerminusDB JavaScript Client](https://terminusdb.github.io/terminusdb-client-js/) or [TerminusDB Python Client](https://terminusdb.github.io/terminusdb-client-python/dev/) for detailed documentation.  

- [Connect WOQLClient](#connect-with-WOQLClient) to connect to TerminusX.

- [Query with WOQL](#query-with-WOQL) for database queries. 

## Connect with WOQLClient

A `WOQLClient` object enables connection to TerminusX (or TerminusDB.) To create a client object:

- [Get your API key](terminusx/get-your-api-key)

- Copy the JavaScript code snippet generated in the step above.

- Provide the URL to a database server.

### Define a WOQLClient

Define and initialize a WOQLClient, and connect to a database using the example below.

#### Code: Define and initialize a WOQLClient

<br>

<!-- tabs:start -->

### **JavaScript**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-node-js.png)</i>Define and initialize a WOQLClient in JavaScript using the package `@terminusdb/terminusdb-client`

```javascript

const TerminusDBClient = require("@terminusdb/terminusdb-client");

const client = new TerminusClient.WOQLClient("https://cloud.terminusdb.com/cloudabc/",{user:"user@email.com",
                                                organization:"cloudabc"})

//set the key as an environment variable.
client.setApiKey(process.env.TERMINUSDB_ACCESS_TOKEN)

client.connect().then((result)=>{
    console.log(result)
}).catch((err)=>{
    console.error(err);
})


```

### **Python**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-python.png)</i>Define and initialize a WOQLClient in Python.

```python

from terminusdb_client import WOQLClient
user     = "jimbo"
team     = "logicistics" # My team name.
endpoint = f"https://cloud.terminusdb.com/{team}/"
client   = WOQLClient(endpoint)

client.connect(user=user, team=team, use_token=True)


```

<!-- tabs:end -->

### Use a WOQLClient

Common uses of a WOQLClient include [Connecting to an existing database](#code-connect-to-a-database) and [creating a new database](#code-create-a-database).

#### Code: Connect to a database

Connect to an existing database using the example below. 

<br>

<!-- tabs:start -->

### **JavaScript**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-node-js.png)</i>Connect to a database.

```javascript

client.connect().then(()=>{
    client.db('ExampleDatabase');
}).catch((err)=>{
    console.error(err);
});


```

### **Python**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-python.png)</i>Connect to a database.

```python

client.connect(team=team, user="admin", db="example_db", use_token=True)


```

<!-- tabs:end -->

#### Code: Create a database

Create a new database using the example below.

<br>

<!-- tabs:start -->

### **JavaScript**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-node-js.png)</i>Create a database.

```javascript

client.connect().then(async()=>{
    await client.createDatabase('ExampleDatabase', 
    {
        label:   "ExampleDatabase",
        comment: "Created new ExampleDatabase",
    });
}).catch((err)=>{
    console.error(err);
});


```

### **Python**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-python.png)</i>Create a database.

```python

client.connect(team=team, user="admin", use_token=True)

client.create_database("example_db")


```

<!-- tabs:end -->


### Use the document interface 

To use the TerminusX document interface, [create a schema](#create-a-schema) and [add documents](#add-documents) to the schema. Refer to [Documents](../Explanation/DOCUMENTS.md) for an overview of the document interface.  After creating or connecting to a database, create a schema to add and retrieve data. A simple player roster is used as an example. Using basic [Player roster](#data-player-roster) data, the steps below are demonstrated.

- [Define a schema](#code-define-a-schema)

- [Add a schema](#code-add-a-schema)

- [Add documents](#code-Add-documents)

- [Get documents](#get-documents)

#### Data: Player roster

```text

name   | position
------ | --------
George | Center Back
Doug   | Full Back
Karen  | Center Forward


```

#### Code: Define a schema

Define a schema object with properties `name` and `position`. The object is uniquely identified by `name`.

<!-- tabs:start -->

### **JavaScript**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-node-js.png)</i>Define a schema.

```javascript

const schema = { "@type" : "Class",
                 "@id"   : "Player",
                 "@key"  : { "@type": "Lexical", "@fields": ["name"] },
                 name    : "xsd:string",
                 position: "xsd:string" };


```

### **Python**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-python.png)</i>Define a schema.

```python

from terminusdb_client.woql_schema import WOQLSchema, DocumentTemplate, LexicalKey

schema = WOQLSchema()

class Player(DocumentTemplate):
    _schema = schema
    _key = LexicalKey("name")
    name: str
    position: str

```

<!-- tabs:end -->

#### Code: Add a schema

Add the schema object to the database.

<!-- tabs:start -->

### **JavaScript**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-node-js.png)</i>Add the schema object to a document using `addDocument`.

```javascript

await client.addDocument(schema, { graph_type: "schema" });


```

### **Python**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-python.png)</i>Add the schema object to a document using `insert_document`.

```python

schema.commit(client, commit_msg = "Adding Player Schema")

```

<!-- tabs:end -->

#### Code: Add documents 

Once added, Add documents corresponding to the schema.

<!-- tabs:start -->

### **JavaScript**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-node-js.png)</i>Add documents to the schema using `addDocument`.

```javascript

const objects = [
    {
        "@type" : "Player",
        name    : "George",
        position: "Center Back",
    },
    {
        "@type" : "Player",
        name    : "Doug",
        position: "Full Back",
    },
    { 
        "@type" : "Player", 
        name    : "Karen", 
        position: "Center Forward" 
    }
];
        
await client.addDocument(objects);


```

### **Python**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-python.png)</i>Add documents to the schema using `insert_document`.

```python

objects = [
    Player(name="George", position="Centre Back"),
    Player(name="Doug", position="Full Back"),
    Player(name="Karen", position="Centre Forward")
    ]

client.insert_document(objects, commit_msg = f"Inserting player data")


```

<!-- tabs:end -->


#### Code: Get documents

Get a list of documents or specific documents added to the schema 

<!-- tabs:start -->

### **JavaScript**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-node-js.png)</i>Get a list of documents using `getDocument` `as_list`. Results, stored in `document`, are shown further below. 

```javascript

const documents = await client.getDocument({ as_list: "true" });


```

```results

[
  {
    '@id'   : 'Player_Doug',
    '@type' : 'Player',
    name    : 'Doug',
    position: 'Full Back'
  },
  {
    '@id'   : 'Player_George',
    '@type' : 'Player',
    name    : 'George',
    position: 'Center Back'
  },
  {
    '@id'   : 'Player_Karen',
    '@type' : 'Player',
    name    : 'Karen',
    position: 'Center Forward'
  }
]


```

### **Python**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-python.png)</i>Get a specific document using `query_document`. Results, stored in `matches`, are shown further below.  

```python

documents = client.get_all_documents()

# documents comes back as a iterable that can be convert into a list
print("All documents")
print(list(documents))

print("=============")

# getting a specific document by id
play_doug = client.get_document("Player_Doug")
print("Specific document")
print(player_doug)


```

```results

All documents
[
  {
    '@id'   : 'Player_Doug',
    '@type' : 'Player',
    name    : 'Doug',
    position: 'Full Back'
  },
  {
    '@id'   : 'Player_George',
    '@type' : 'Player',
    name    : 'George',
    position: 'Center Back'
  },
  {
    '@id'   : 'Player_Karen',
    '@type' : 'Player',
    name    : 'Karen',
    position: 'Center Forward'
  }
]
=============
Specific document
{
    '@id'   : 'Player_Doug',
    '@type' : 'Player',
    name    : 'Doug',
    position: 'Full Back'
  }


```

<!-- tabs:end -->


#### Code: Query documents

Get a list of documents that matches the query 

<!-- tabs:start -->

### **JavaScript**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-node-js.png)</i>Get a list of documents using `getDocument` `as_list`. Results, stored in `document`, are shown further below. 

```javascript

const query = {
    "type": "Player",
    "query": { "position": "Full Back" },
   }
  client.queryDocument(query,{"as_list":true});


```

```results

[{"@type" : "Player",
  "name" : "Doug",
  "position" : "Full Back"}]


```

### **Python**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-python.png)</i>Get a specific document using `query_document`. Results, stored in `matches`, are shown further below.  

```python

matches = client.query_document({"@type"   : "Player",
                                   "position": "Full Back"})

# matches comes back as a iterable that can be convert into a list
print(list(matches))


```

```results

[{"@type" : "Player",
  "name" : "Doug",
  "position" : "Full Back"}]


```

<!-- tabs:end -->
