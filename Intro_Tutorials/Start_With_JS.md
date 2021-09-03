## TerminusDB Client Javascript

The @terminusdb/terminus-client package consists of 2 major components: WOQLClient, WOQL(For querying database). In this guide, we will show the basic usage of each component. For detail documentation of the Javascript client, please refer to the [full documentation](https://terminusdb.github.io/terminusdb-client-js/).

### WOQLClient

This object allows you to connect to TerminusX (or
TerminusDB). To create an client object, you will have to provide a
URL to the server. You can get a code snippet from TerminusX in your
profile page which will have all of these variables filled out for you.

NOTE: *You will need to have an access key set*. This is available in
your profile page and you can set it in your environment as:

```shell
$ export TERMINUSX_ACCESS_TOKEN="your very long token here"
```

Or you can define it as a string in your code using a variable for testing purposes.

At the begining of your javascript file you can simply define a WOQLClient object as:

```javascript
const TerminusDBClient = require("@terminusdb/terminusdb-client");

// if you are not using enviornment variables
let key = "your very long token here";

// initialze the WOQLClient by passing the URL of the database server
const client = new TerminusClient.WOQLClient("https://cloud-dev.dcm.ist/cloudneel/");

// configure the client
client.localAuth({key: key, type: "jwt"});
client.organization("cloudneel");

// connecting to the database 
client.connect().then(()=>{
  // you can do whaterver you want with the database
}).catch((err)=>{
  console.error(err);
});
```

The most common way to use the client is to:
1. connected to an existing database or
2. create a brand new database.

To connect to an existing database:

```javascript
client.connect().then(()=>{
  client.db('ExampleDatabase');
}).catch((err)=>{
  console.error(err);
});
```

To create a new database:
```javascript
client.connect().then(async()=>{

  await client.createDatabase('ExampleDatabase', {
      label: "ExampleDatabase",
      comment: "Created new ExampleDatabase",
  });
  
}).catch((err)=>{
  console.error(err);
});
```

### Document Interface

Once we have created a database or connected to an existing one, we
will need to put some data in it. First we need to add a schema. (See
[Documents](../Explanation/DOCUMENTS.md) for a more general overview).

Supposing the data I'm initially interested in is the following player
roster.

name | position
---- | --------
George | Centre Back
Doug | Full Back
Karen | Centre Forward

The schema which corresponds to this might look as follows:

```javascript
const schema = {
         "@type": "Class",
         "@id": "Player",
         "@key": { "@type": "Lexical", "@fields": ["name"] },
         name: "xsd:string",
         position: "xsd:string",
       };
```

This tells us that we have an object with `name` and `position` and
which can always be uniquely identified by `name`.

We can load this class into the schema with:

```javascript
await client.addDocument(schema, { graph_type: "schema" });
```

Once loaded, we can start submitting documents that correspond to this
schema.

The above table would be the following:

```javascript
const objects = [
             {
               "@type": "Player",
               name: "George",
               position: "Centre Back",
             },
             {
               "@type": "Player",
               name: "Doug",
               position: "Full Back",
             },
             { "@type": "Player", 
                name: "Karen", 
                position: "Centre Forward" 
             }
];
        
await client.addDocument(objects);
```

Now you can retrieve the documents using following:

```javascript
const documents = await client.getDocument({ as_list: "true" });
```

`documents` will have the value:

```javascript
[
  {
    '@id': 'Player_Doug',
    '@type': 'Player',
    name: 'Doug',
    position: 'Full Back'
  },
  {
    '@id': 'Player_George',
    '@type': 'Player',
    name: 'George',
    position: 'Centre Back'
  },
  {
    '@id': 'Player_Karen',
    '@type': 'Player',
    name: 'Karen',
    position: 'Centre Forward'
  }
]
```

You should now be ready to make more elaborate documents!

### You can query the documents using WOQL by following this steps:

* Import WOQL from "@terminusdb/terminusdb-client" package
  * `const { WOQL } = require("@terminusdb/terminusdb-client");`
* Create a query 
  * `const query = WOQL.triple("v:a","v:b", "v:c");` 
* Execute the query 
  * `const result = await client.query(query);`

Whole script will look like this
```javascript
const { WOQL } = require("@terminusdb/terminusdb-client");
const query = WOQL.triple("v:a","v:b", "v:c");
const result = await client.query(query);
```
`result` will have the value:

```javascript
{
  '@type': 'api:WoqlResponse',
  'api:status': 'api:success',
  'api:variable_names': [ 'a', 'b', 'c' ],
  bindings: [
    { a: 'Player_Doug', b: 'rdf:type', c: '@schema:Player' },
    { a: 'Player_Doug', b: '@schema:name', c: [Object] },
    { a: 'Player_Doug', b: '@schema:position', c: [Object] },
    { a: 'Player_George', b: 'rdf:type', c: '@schema:Player' },
    { a: 'Player_George', b: '@schema:name', c: [Object] },
    { a: 'Player_George', b: '@schema:position', c: [Object] },
    { a: 'Player_Karen', b: 'rdf:type', c: '@schema:Player' },
    { a: 'Player_Karen', b: '@schema:name', c: [Object] },
    { a: 'Player_Karen', b: '@schema:position', c: [Object] }
  ],
  deletes: 0,
  inserts: 0,
  transaction_retry_count: 0
}
```

Now you can make some interesting queries and query your database. For list of available query functions you can follow this [link](https://terminusdb.github.io/terminusdb-client-js/#/api/woql.js?id=woql)
