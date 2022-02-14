# Start with a Client API

> **On this page:** A step-by-step guide with examples to install and get started with a JavaScript or Python client.

This guide demonstrates the basic use of the **WOQLClient** library to connect to TerminusX with a JavaScript or Python client. Refer to [TerminusDB JavaScript Client](https://terminusdb.github.io/terminusdb-client-js/) or [TerminusDB Python Client](https://terminusdb.github.io/terminusdb-client-python/) for detailed documentation. The code discussed on this page is also available in full:

* JavaScript: [getting-started.js](https://github.com/terminusdb/terminusdb-docs/blob/3df3c593b4f3d648732fea4e7e5ed3ce9348681f/code-examples/start-with-client/getting-started.js)
* Python: [getting-started.py](https://github.com/terminusdb/terminusdb-docs/blob/3df3c593b4f3d648732fea4e7e5ed3ce9348681f/code-examples/start-with-client/getting-started.py)

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

* [Get your API key](get-api-key.md)
* Copy the JavaScript code snippet generated in the step above.
* Provide the URL to a database server.

### Define a WOQLClient

Define and initialize a WOQLClient, and connect to a database using the example below.

#### Code: Define and initialize a WOQLClient

{% tabs %}
{% tab title="JavaScript" %}
Use the package `@terminusdb/terminusdb-client`

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

#### \*\*\*\*
{% endtab %}

{% tab title="Python" %}
```python
from terminusdb_client import WOQLClient
user     = "jimbo"
team     = "logicistics" # My team name.
endpoint = f"https://cloud.terminusdb.com/{team}/"
client   = WOQLClient(endpoint)

client.connect(user=user, team=team, use_token=True)
```
{% endtab %}
{% endtabs %}

### Use a WOQLClient

Common uses of a WOQLClient include [Connecting to an existing database](start-with-client.md#code-connect-to-a-database) and [creating a new database](start-with-client.md#code-create-a-database).

#### Code: Connect to a database

Connect to an existing database using the example below.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
client.db('ExampleDatabase');
```
{% endtab %}

{% tab title="Python" %}
```python
connect(team=team, user="admin", db="example_db", use_token=True)
```
{% endtab %}
{% endtabs %}

#### Code: Create a database

Create a new database using the example below.

{% tabs %}
{% tab title="JavaScript" %}
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
{% endtab %}

{% tab title="Python" %}
```python
client.connect(team=team, user="admin", use_token=True)
client.create_database("example_db")
```
{% endtab %}
{% endtabs %}

### Use the document interface

To use the TerminusX document interface, [create a schema](start-with-client.md#code-define-a-schema) and [add documents](start-with-client.md#code-add-documents) to the schema. Refer to [Documents](../../terminusx-db/explanations/documents.md) for an overview of the document interface. After creating or connecting to a database, create a schema to add and retrieve data. A simple player roster is used as an example. Using basic [Player roster](start-with-client.md#data-player-roster) data, the steps below are demonstrated.

* [Create a schema](start-with-client.md#code-define-a-schema)
* [Add a schema](start-with-client.md#code-add-a-schema)
* [Add documents](start-with-client.md#code-add-documents)
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

#### Code: Create a schema

Create a schema object with properties `name` and `position`. The object is uniquely identified by `name`.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const schema = { "@type" : "Class",
                 "@id"   : "Player",
                 "@key"  : { "@type": "Lexical", "@fields": ["name"] },
                 name    : "xsd:string",
                 position: "xsd:string" };
```
{% endtab %}

{% tab title="Python" %}
```python
from terminusdb_client.woqlschema import WOQLSchema, DocumentTemplate, LexicalKey

schema = WOQLSchema()

class Player(DocumentTemplate):
    _schema = schema
    _key = LexicalKey(["name"])
    name: str
    position: str
```
{% endtab %}
{% endtabs %}

#### Code: Add a schema

Add the schema object to the database.

{% tabs %}
{% tab title="JavaScript" %}
Add the schema object to a document using `addDocument` which returns a Promise.

```javascript
await client.addDocument(schema, { graph_type: "schema" })
```
{% endtab %}

{% tab title="Python" %}
Commit the schema object to the database.

```python
schema.commit(client, commit_msg = "Adding Player Schema")
```
{% endtab %}
{% endtabs %}

#### Code: Add documents

Once a schema is added, add documents corresponding to the schema.

{% tabs %}
{% tab title="JavaScript" %}
Add documents to the schema using `addDocument` which returns a Promise.

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
{% endtab %}

{% tab title="Python" %}
Add documents to the schema using `insert_document`.

```python
objects = [
    Player(name="George", position="Centre Back"),
    Player(name="Doug", position="Full Back"),
    Player(name="Karen", position="Centre Forward")
    ]

client.insert_document(objects, commit_msg = f"Inserting player data")
```
{% endtab %}
{% endtabs %}

#### Code: Get documents

Get a list of documents or specific documents added to the schema

{% tabs %}
{% tab title="JavaScript" %}
Get a list of documents using `getDocument` `as_list`. Results, stored in `document`, are shown further below.

```javascript
const getDocs = async () => {
  const documents = await client.getDocument({ as_list: "true" });
  console.log("All Documents", documents)
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
{% endtab %}

{% tab title="Python" %}
Get a specific document using `query_document`. Results, stored in `matches`, are shown further below.

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
{% endtab %}
{% endtabs %}

#### Code: Query documents

Get a list of documents that matches the query

{% tabs %}
{% tab title="JavaScript" %}
Get a list of documents using `getDocument` `as_list`. Results, stored in `document`, are shown further below.

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
{% endtab %}

{% tab title="Python" %}
Get a specific document using `query_document`. Results, stored in `matches`, are shown further below.

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
{% endtab %}
{% endtabs %}

#### Code: Query documents using WOQL

Query documents using Web Object Query Language (WOQL) to get the same result given by the above example. You can find more about WOQL [here](../../../terminusx/quick-start/explanation/explanation-woql/).

{% tabs %}
{% tab title="JavaScript" %}
Get documents using using `WOQL.triple()` to create a WOQL query then execute that query using `client.query()`. Results, stored in `results`, are shown further below

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
{% endtab %}

{% tab title="Python" %}
Get documents using `WOQLQuery()` and `WOQLQuery().triple()` to create a WOQL query then execute that query using `client.query()`. Results, stored in `results`, are shown further below.

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
{% endtab %}
{% endtabs %}

### Create relationships/links between documents

We will create teams with players which we have already created to show how creating relationships/links between documents.

#### Code: Create schema for team

Team will have `name`  and `players` properties.  The object is uniquely identified by `name`. Here `players` properties is a set of Player which creates a link between Team and Player schema.

{% tabs %}
{% tab title="Javascript" %}
```javascript
const team_schema = [
        {
            "@type" : "Class",
            "@id" : "Team",
            "@key" : { 
            "@type": "Lexical", 
            "@fields": ["name"] 
            },
            name : "xsd:string",
            players: { "@type" : "Set",
                       "@class" : "Player" },
        }
];
```
{% endtab %}

{% tab title="Python" %}
```python
from typing import  Set

class Team(DocumentTemplate):
    _schema = schema
    _key = LexicalKey(["name"])
    name: str
    players: Set['Player']
```
{% endtab %}
{% endtabs %}

#### Code: Add a schema

Add the schema object to the database.

{% tabs %}
{% tab title="JavaScript" %}
Add the schema object to a document using `addDocument` which returns a Promise.

```javascript
await client.addDocument(team_schema, { graph_type: "schema" })
```
{% endtab %}

{% tab title="Python" %}
Commit the schema object to the database.

```python
schema.commit(client, commit_msg = "Adding Team Schema")
```
{% endtab %}
{% endtabs %}

#### Code: Add documents

Once a schema is added, add documents corresponding to the team schema.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const team_instance = [
        {
            "@type" : "Team",
            name    : "Wildcats",
            players: ["Player/Doug", "Player/Karen"],
        },
        {
            "@type" : "Team",
            name    : "Donkeys",
            players: ["Player/George"],
        }
    ]

await client.addDocument(team_instance)
```
{% endtab %}

{% tab title="Python" %}
```python
doug_raw = client.get_document("Player/Doug")
karen_raw = client.get_document("Player/Karen")
george_raw = client.get_document("Player/George")

doug = schema.import_objects(doug_raw)
karen = schema.import_objects(karen_raw)
george = schema.import_objects(george_raw)

team_objects = [
    Team(name="Wildcats", position={doug, karen}),
    Team(name="Donkeys", position={george},
]

client.insert_document(team_objects, commit_msg = f"Inserting teams data")
```
{% endtab %}
{% endtabs %}

#### Code: Get all the teams

Get a list of team documents.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const getTeams = async () => {
  const query = {
      "type": "Team",
  };
  const result = await client.queryDocument(query, {"as_list":true});
  console.log("Teams ",result)
}
```
{% endtab %}

{% tab title="Python" %}
```python
teams = client.query_document({"@type"   : "Team"})

print(list(matches))
```
{% endtab %}
{% endtabs %}

## See also

### Client reference

[JavaScript and Python client reference guides](../../terminusx-db/reference-guides/client.md).

### Tutorials

More [JavaScript and Python client tutorials](../../terminusx-db/tutorials/javascript-and-python-tutorials.md).
