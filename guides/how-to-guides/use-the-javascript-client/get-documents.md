---
description: How-to get documents to TerminusDB and TerminusCMS using the JavaScript Client
---

# Get Documents

### Get a single document

To get a single document to make changes or simply to view it, use the following code -

```javascript
const getDoc = async () => {
  const doc = await client.getDocument({id:"Player/Doug"});
  console.log("Player/Doug", doc)
}
```

```json
 {
    '@id'   : 'Player/Doug',
    '@type' : 'Player',
    name    : 'Doug',
    position: 'Full Back'
  }
```

### Get a list of all documents

After you have added some documents to your database you can get a list of documents using `getDocument` `as_list`.  The results are shown further below.

```javascript
const getDocs = async () => {
  const documents = await client.getDocument({ as_list: "true" });
  console.log("All Documents", documents)
}
```

```json
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
