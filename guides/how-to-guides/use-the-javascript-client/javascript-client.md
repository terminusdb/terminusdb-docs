---
description: >-
  A very quick tutorial combining the individual elements of the JavaScript
  how-to guides to get you started.
---

# JavaScript Client Tutorial

This guide demonstrates the basic use of the **WOQLClient** library to connect to TerminusDB with the JavaScript Client. Refer to [TerminusDB JavaScript Client Reference Guide ](../../reference-guides/javascript-client-reference/woqlclient.md)for detailed documentation.&#x20;

{% hint style="info" %}
The code discussed on this page is also available in full on GitHub - [getting-started.js](https://github.com/terminusdb/terminusdb-docs/blob/3df3c593b4f3d648732fea4e7e5ed3ce9348681f/code-examples/start-with-client/getting-started.js)
{% endhint %}

You can also find a comprehensive getting-started guide on GitHub: [5-Part JS Client Getting Started Guide](https://github.com/terminusdb/terminusdb-tutorials/blob/main/getting\_started/javascript-client/lesson\_1.md).

### Use a WOQLClient

Common uses of a WOQLClient include connecting to an existing database and creating a new database.

[Install JavaScript Client](../../../terminusdb/install-client/install-javascript-client.md)

### **Connect to a database**

Connect to an existing database using the example below.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
client.db('ExampleDatabase');
```
{% endtab %}
{% endtabs %}

### **Create a database**

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

      console.log("Database created Successfully!")c

  } catch (err) {
      console.error(err)
  }
};

createNewDB();
```
{% endtab %}
{% endtabs %}

### Basic Commands

Create a schema and add documents to the schema by using the document interface. Refer to the [Document Interface Reference Guide](../../reference-guides/document-interface.md) for more detail. After creating or connecting to a database, create a schema to add and retrieve data. A simple player roster is used as an example. Using Player roster data, the steps below are demonstrated.

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

**Code: Create a schema**

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
{% endtabs %}

**Code: Add a schema**

Add the schema object to the database.

{% tabs %}
{% tab title="JavaScript" %}
Add the schema object to a document using `addDocument` which returns a Promise.

```javascript
await client.addDocument(schema, { graph_type: "schema" })
```
{% endtab %}
{% endtabs %}

**Code: Add documents**

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
{% endtabs %}

**Code: Get documents**

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
{% endtabs %}

**Code: Query documents**

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
{% endtabs %}

**Code: Query documents using WOQL**

Query documents using Web Object Query Language (WOQL) to get the same result given by the above example. You can find more about WOQL here.

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
{% endtabs %}

#### Create links between documents

The following code segments demonstrate creating relationships or links between documents

**Code: Create schema for team**

The `Team` object is uniquely identified by the property `name`. The `players` property consists of a set of `Player` classes that create a link between the`Team` and `Player` schema.

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
{% endtabs %}

**Code: Add a schema**

Add the schema object to the database.

{% tabs %}
{% tab title="JavaScript" %}
Add the schema object to a document using `addDocument` that returns a Promise.

```javascript
await client.addDocument(team_schema, { graph_type: "schema" })
```
{% endtab %}
{% endtabs %}

**Code: Add documents**

Add documents corresponding to the `Team` schema.

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
{% endtabs %}

**Code: Get all of the teams**

Get a list of `Team` documents.

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
{% endtabs %}

### See also

#### [JavaScript Client Reference Guide](../../reference-guides/javascript-client-reference/woqlclient.md)

#### [Getting Started with the JavaScript Client Tutorials](https://github.com/terminusdb/terminusdb-tutorials/blob/master/getting\_started/javascript-client/lesson\_1.md)

