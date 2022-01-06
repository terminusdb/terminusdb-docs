# Start with a Client API

> **On this page:** A step-by-step guide with examples to install and get started with a JavaScript or Python client.

This guide demonstrates the basic use of the **WOQLClient** library to connect to TerminusX with a JavaScript or Python client. Refer to [TerminusDB JavaScript Client](https://terminusdb.github.io/terminusdb-client-js/) or [TerminusDB Python Client](https://terminusdb.github.io/terminusdb-client-python/) for detailed documentation. The code discussed on this page is also available in full:

* JavaScript: [getting-started.js](../../../terminusx/quick-start/code-examples/start-with-client/getting-started.js)
* Python: [getting-started.py](../../../terminusx/quick-start/code-examples/start-with-client/getting-started.js)

## Install WOQLClient

{% tabs %}
{% tab title="JavaScript" %}
Install the TerminusDB JavaScript client by adding it as a dependency in your Node project.

```
npm install --save @terminusdb/terminusdb-client
```
{% endtab %}

{% tab title="Python" %}
Install the Python client using `pip`. Using a virtual environment is recommended - see [Python documentation](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/).



**Create a new virtual environment named terminusdb-env**

```
python3 -m venv terminusdb-env
```

**Activate terminusdb-env environment**

Unix/macOS:

```bash
source terminusdb-env/bin/activate
```

Windows:

```bash
.\terminusdb-env\Scripts\activate
```

**Install the Python client**

```bash
python3 -m pip install terminusdb-client
```
{% endtab %}
{% endtabs %}

## Connect with WOQLClient

A `WOQLClient` object enables connection to TerminusX (or TerminusDB.) To create a client object:

* [Get your API key](../../../terminusx/quick-start/terminusx/get-your-api-key/)
* Copy the JavaScript code snippet generated in the step above.
* Provide the URL to a database server.

### Define a WOQLClient

Define and initialize a WOQLClient, and connect to a database using the example below.

#### Code: Define and initialize a WOQLClient

\\

### **JavaScript**

![info](../../../img/ico/terminusdb-icon-node-js.png)Define and initialize a WOQLClient in JavaScript using the package `@terminusdb/terminusdb-client`

```javascript
const TerminusDBClient = require("@terminusdb/terminusdb-client");

// TODO: change the team name 
const team = "TEAM_NAME";
const client = new TerminusDBClient.WOQLClient(`https://cloud.terminusdb.com/${team}/`, {
    user: "user@email.com",
    organization: team
});

//set the key as an environment variable.
client.setApiKey(process.env.TERMINUSDB_ACCESS_TOKEN)

const connectToServer = async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error(err)
    }

    console.log("Connected to TerminusDB successfully!")
};

connectToServer();
```

### **Python**

![info](../../../img/ico/terminusdb-icon-python.png)Define and initialize a WOQLClient in Python.

```python
from terminusdb_client import WOQLClient
user     = "jimbo"
team     = "logicistics" # My team name.
endpoint = f"https://cloud.terminusdb.com/{team}/"
client   = WOQLClient(endpoint)

client.connect(user=user, team=team, use_token=True)
```

### Use a WOQLClient

Common uses of a WOQLClient include [Connecting to an existing database](start-with-client.md#code-connect-to-a-database) and [creating a new database](start-with-client.md#code-create-a-database).

#### Code: Connect to a database

Connect to an existing database using the example below.

\\

### **JavaScript**

![info](../../../img/ico/terminusdb-icon-node-js.png)Connect to a database.

```javascript
client.db('ExampleDatabase');
```

### **Python**

![info](../../../img/ico/terminusdb-icon-python.png)Connect to a database.

```python
client.connect(team=team, user="admin", db="example_db", use_token=True)
```

#### Code: Create a database

Create a new database using the example below.

\\

### **JavaScript**

![info](../../../img/ico/terminusdb-icon-node-js.png)Create a database.

```javascript
const createNewDB = async () => {
  try {

      await client.createDatabase('ExampleDatabase', {
          label: "ExampleDatabase",
          comment: "Created new ExampleDatabase",
      });

      console.log("Database created Successfully!")

  } catch (err) {
      console.error(err)
  }
};

createNewDB();
```

### **Python**

![info](../../../img/ico/terminusdb-icon-python.png)Create a database.

```python
client.connect(team=team, user="admin", use_token=True)

client.create_database("example_db")
```

### Use the document interface

To use the TerminusX document interface, [create a schema](start-with-client.md#create-a-schema) and [add documents](start-with-client.md#add-documents) to the schema. Refer to [Documents](../../../terminusx/Explanation/DOCUMENTS.md) for an overview of the document interface. After creating or connecting to a database, create a schema to add and retrieve data. A simple player roster is used as an example. Using basic [Player roster](start-with-client.md#data-player-roster) data, the steps below are demonstrated.

* [Define a schema](start-with-client.md#code-define-a-schema)
* [Add a schema](start-with-client.md#code-add-a-schema)
* [Add documents](start-with-client.md#code-Add-documents)
* [Get documents](start-with-client.md#code-get-documents)
* [Query documents](start-with-client.md#code-query-documents)

#### Data: Player roster

```
name   | position
------ | --------
George | Center Back
Doug   | Full Back
Karen  | Center Forward
```

#### Code: Define a schema

Define a schema object with properties `name` and `position`. The object is uniquely identified by `name`.

### **JavaScript**

![info](../../../img/ico/terminusdb-icon-node-js.png)Define a schema.

```javascript
const schema = { "@type" : "Class",
                 "@id"   : "Player",
                 "@key"  : { "@type": "Lexical", "@fields": ["name"] },
                 name    : "xsd:string",
                 position: "xsd:string" };
```

### **Python**

![info](../../../img/ico/terminusdb-icon-python.png)Define a schema.

```python
from terminusdb_client.woqlschema import WOQLSchema, DocumentTemplate, LexicalKey

schema = WOQLSchema()

class Player(DocumentTemplate):
    _schema = schema
    _key = LexicalKey(["name"])
    name: str
    position: str
```

#### Code: Add a schema

Add the schema object to the database.

### **JavaScript**

![info](../../../img/ico/terminusdb-icon-node-js.png)Add the schema object to a document using `addDocument` which returns a Promise.

```javascript
await client.addDocument(schema, { graph_type: "schema" })
```

### **Python**

![info](../../../img/ico/terminusdb-icon-python.png)Commit the schema object to the database.

```python
schema.commit(client, commit_msg = "Adding Player Schema")
```

#### Code: Add documents

Once added, Add documents corresponding to the schema.

### **JavaScript**

![info](../../../img/ico/terminusdb-icon-node-js.png)Add documents to the schema using `addDocument` which returns a Promise.

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

![info](../../../img/ico/terminusdb-icon-python.png)Add documents to the schema using `insert_document`.

```python
objects = [
    Player(name="George", position="Centre Back"),
    Player(name="Doug", position="Full Back"),
    Player(name="Karen", position="Centre Forward")
    ]

client.insert_document(objects, commit_msg = f"Inserting player data")
```

#### Code: Get documents

Get a list of documents or specific documents added to the schema

### **JavaScript**

![info](../../../img/ico/terminusdb-icon-node-js.png)Get a list of documents using `getDocument` `as_list`. Results, stored in `document`, are shown further below.

```javascript
const getDocs = async () => {
  const documents = await client.getDocument({ as_list: "true" });
  console.log("All Documents",documents)
}
```

```
[
  {
    '@id'   : 'Player/Doug',
    '@type' : 'Player',
    name    : 'Doug',
    position: 'Full Back'
  },
  {
    '@id'   : 'Player/George',
    '@type' : 'Player',
    name    : 'George',
    position: 'Center Back'
  },
  {
    '@id'   : 'Player/Karen',
    '@type' : 'Player',
    name    : 'Karen',
    position: 'Center Forward'
  }
]
```

### **Python**

![info](../../../img/ico/terminusdb-icon-python.png)Get a specific document using `query_document`. Results, stored in `matches`, are shown further below.

```python
documents = client.get_all_documents()

# documents comes back as a iterable that can be convert into a list
print("All documents")
print(list(documents))

print("=============")

# getting a specific document by id
player_doug = client.get_document("Player/Doug")
print("Specific document")
print(player_doug)
```

```
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

#### Code: Query documents

Get a list of documents that matches the query

### **JavaScript**

![info](../../../img/ico/terminusdb-icon-node-js.png)Get a list of documents using `getDocument` `as_list`. Results, stored in `document`, are shown further below.

```javascript
const queryDocuments = async () => {
  const query = {
      "type": "Player",
      "query": { "position": "Full Back" },
     }
  const result = await client.queryDocument(query,{"as_list":true});
  console.log("Query Documents",result)
}
```

```
[{"@type" : "Player",
  "name" : "Doug",
  "position" : "Full Back"}]
```

### **Python**

![info](../../../img/ico/terminusdb-icon-python.png)Get a specific document using `query_document`. Results, stored in `matches`, are shown further below.

```python
matches = client.query_document({"@type"   : "Player",
                                   "position": "Full Back"})

# matches comes back as a iterable that can be convert into a list
print(list(matches))
```

```
[{"@type" : "Player",
  "name" : "Doug",
  "position" : "Full Back"}]
```

#### Code: Query documents using WOQL

Query documents using Web Object Query Language (WOQL) to get same result given by the above example. You can find more about WOQL [here](../../../terminusx/quick-start/explanation/explanation-woql/).

### **JavaScript**

![info](../../../img/ico/terminusdb-icon-node-js.png)Get documents using using `WOQL.triple()` to create a WOQL query then execute that query using `client.query()`. Results, stored in `results`, are shown further below.

```javascript
const queryDocuments = async () => {
  const { WOQL } = TerminusDBClient;
    const query = WOQL.triple(
      "v:Player",
      "position",
      WOQL.string("Full Back")
    ).triple("v:Player", "position", "v:position");
  const results = await client.query(query);
  console.log("Query Documents using WOQL: ",results.bindings);
}
```

```
[
  {
    Player: 'Player/Doug',
    position: { '@type': 'xsd:string', '@value': 'Full Back' }
  }
]
```

### **Python**

![info](../../../img/ico/terminusdb-icon-python.png)Get documents using `WOQLQuery()` and `WOQLQuery().triple()` to create a WOQL query then execute that query using `client.query()`. Results, stored in `results`, are shown further below.

```python
WOQL = WOQLQuery()
query = WOQL.triple("v:Player", "position", WOQL.string("Full Back")).triple(
    "v:Player", "position", "v:position"
)
results = client.query(query)
print("Specific document using WOQL")
# results['bindings'] holds the query output as a list
print(results['bindings'])
```

```
[
  {
    Player: 'Player/Doug',
    position: { '@type': 'xsd:string', '@value': 'Full Back' }
  }
]
```

## See also

### Client reference

[JavaScript and Python client reference guides](../../../terminusx/quick-start/reference/reference-client/).

### Tutorials

More [JavaScript and Python client tutorials](../../../terminusx/quick-start/reference/reference-client/).
