---
description: A guide to provide the basic mechanics of the Python client.
---

# Python Client

This guide demonstrates the basic use of the **WOQLClient** library to connect to TerminusDB with the Python client. Refer to [TerminusDB Python Client](../reference-guides/python-client-reference/terminusdb\_client.client.md) for detailed documentation. The code discussed on this page is also available in full:

* Python: [getting-started.py](https://github.com/terminusdb/terminusdb-docs/blob/3df3c593b4f3d648732fea4e7e5ed3ce9348681f/code-examples/start-with-client/getting-started.py)

### Use a WOQLClient

Common uses of a WOQLClient include Connecting to an existing database and creating a new database.

[Install Python client](../../get-started/install-client/install-python-client.md)

### **Connect to a database**

Connect to an existing database using the example below.

{% tabs %}
{% tab title="Python" %}
```python
connect(team=team, user="admin", db="example_db", use_token=True)
```
{% endtab %}
{% endtabs %}

### **Create a database**

Create a new database using the example below.

{% tabs %}
{% tab title="Python" %}
```python
client.create_database("example_db")
```
{% endtab %}
{% endtabs %}

### Basic Commands

Create schema and add documents to the schema by using the document interface. Refer to the [Document Interface Reference Guide](../reference-guides/document-interface.md) for more information. After creating or connecting to a database, create a schema to add and retrieve data. A simple player roster is used as an example. Using basic Player roster data, the steps below are demonstrated.

* Create a schema
* Add a schema
* Add documents
* Get documents
* Query documents

**Data: Player roster**

```
name   | position
------ | --------
George | Center Back
Doug   | Full Back
Karen  | Center Forward
```

**Create a schema**

Create a schema object with properties `name` and `position`. The object is uniquely identified by `name`.

{% tabs %}
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

**Add a schema**

Add the schema object to the database.

{% tabs %}
{% tab title="Python" %}
Commit the schema object to the database.

```python
schema.commit(client, commit_msg = "Adding Player Schema")
```
{% endtab %}
{% endtabs %}

**Add documents**

Once a schema is added, add documents corresponding to the schema.

{% tabs %}
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

**Get documents**

Get a list of documents or specific documents added to the schema

{% tabs %}
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

### **Query documents**

Get a list of documents that matches the query

{% tabs %}
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

### **Query documents using WOQL**

Query documents using Web Object Query Language (WOQL) to get the same result given by the above example. You can find more about WOQL here.

{% tabs %}
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

### Create links between documents

The following code segments demonstrate creating relationships or links between documents

**Create schema for team**

The `Team` object is uniquely identified by the property `name`. The `players` property consists of a set of `Player` classes that create a link between the`Team` and `Player` schema.

{% tabs %}
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

**Add a schema**

Add the schema object to the database.

{% tabs %}
{% tab title="Python" %}
Commit the schema object to the database.

```python
schema.commit(client, commit_msg = "Adding Team Schema")
```
{% endtab %}
{% endtabs %}

**Add documents**

Add documents corresponding to the `Team` schema.

{% tabs %}
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

**Get all the teams**

Get a list of `Team` documents.

{% tabs %}
{% tab title="Python" %}
```python
teams = client.query_document({"@type"   : "Team"})

print(list(matches))
```
{% endtab %}
{% endtabs %}

### See also

#### [Python Client Reference Guide](../reference-guides/python-client-reference/terminusdb\_client.client.md)

#### [Getting Started with the Python Client Tutorials](https://github.com/terminusdb/terminusdb-tutorials/tree/master/getting\_started/python-client)

