---
description: >-
  A demonstration of using JSON Diff and Patch (JSON-DP) to monitor changes in
  TerminusDB schemas and documents, JSON schemas, and other document databases
  such as MongoDB.
---

# JSON Diff and Patch Demonstration

## Key topics

[Use JSON-DP with a TerminusDB client](json-diff-and-patch-demonstration.md#use-json-dp-with-a-terminusdb-client)

[Use JSON-DP with MongoDB](json-diff-and-patch-demonstration.md#use-json-dp-with-mongodb)&#x20;

## Requirements

### Install a client

Install a [JavaScript](https://terminusdb.com/docs/index/terminusx/install/install-javascript-client) or [Python](https://terminusdb.com/docs/index/terminusx/install/install-python-client) TerminusDB client.

### Use the client with TerminusDB

Install and run the [docker container](https://terminusdb.com/docs/index/terminusdb/install/install-as-docker-container) on `localhost`

### Use the client with TerminusX

Or to use **TerminusX**, [log into your account or sign-up](https://dashboard.terminusdb.com).

## Use JSON-DP with a TerminusDB client

TerminusDB represents objects such as documents and schemas in JSON-LD format. Use JSON-DP to easily compare these objects to obtain differences between them.     &#x20;

The **Diff** function returns a **Patch** object containing differences between the objects compared. Use **Patch** to implement manual or programmatic actions to resolve differences. Actions include:

* Retain the original object.
* Change to the new (or latest) version of the object.
* Create a new version of the object.

The functionality above is demonstrated in three simple steps:

1. [Define documents](json-diff-and-patch-demonstration.md#define-documents)
2. [Compare documents](json-diff-and-patch-demonstration.md#compare-documents)
3. [Implement actions](json-diff-and-patch-demonstration.md#implement-actions)

### Define documents

For simplicity, this demonstration represents JSON documents as client objects. Two 'document' objects are defined - `jane` and `janine`.&#x20;

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const jane = {
  "@id": "Person/Jane",
  "@type": "Person",
  age: 18,
  name: "Jane",
};

const janine = {
  "@id": "Person/Jane",
  "@type": "Person",
  age: 18,
  name: "Janine",
};
```
{% endtab %}

{% tab title="Python" %}
```python
class Person(DocumentTemplate):
    name: str
    age: int

jane = Person(name="Jane", age=18)
janine = Person(name="Janine", age=18)
```
{% endtab %}
{% endtabs %}

### Compare documents

Apply the **diff** function to `jane` and `janine` to populate the **patch** object`result_patch`. View the contents of `result_patch` to see any differences.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const result_patch = await client.getDiff(jane, janine);

console.log(result_patch);
```
{% endtab %}

{% tab title="Python" %}
```python
result_patch = client.diff(jane, janine)

pprint(result_patch.content)
```
{% endtab %}
{% endtabs %}

### Implement actions

#### After patch

Use the `patch` function to apply `result_patch` to the document `jane`. The object  `after_patch` contains a copy of `jane` after the patch is applied.

Use `after_patch` to suit your requirements. The following example compares the modified `jane` document to the original `janine` document.&#x20;

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const after_patch = await client.patch(jane, result_patch);

console.log(after_patch);

console.log(JSON.stringify(after_patch) === JSON.stringify(janine));
```
{% endtab %}

{% tab title="Python" %}
```python
after_patch = client.patch(jane, result_patch)

pprint(after_patch)

assert after_patch == janine._obj_to_dict()
```
{% endtab %}
{% endtabs %}

#### Replace/update document

If there are differences between the two documents, you may wish to replace one document with the other. Use replace document functionality for this.

* `updateDocument` in the [JavaScript client](https://terminusdb.com/docs/index/terminusx-db/reference-guides/javascript-client-reference/woqlclient#updatedocument).
* `replace_document` in the [Python client](https://terminusdb.com/docs/index/terminusx-db/reference-guides/client/woqlclient#replace\_document-document-graph\_type-instance-commit\_msg-none-last\_data\_version-none-create-false).

## Use JSON-DP with MongoDB

An example in four simple steps demonstrating the use JSON-DP with another JSON-compliant database - MongoDB:

1. [Insert items into a MongoDB database](json-diff-and-patch-demonstration.md#insert-items-into-a-mongodb-database).&#x20;
2. [Modify an item](json-diff-and-patch-demonstration.md#modify-an-item).
3. [Compare modified and original items](json-diff-and-patch-demonstration.md#compare-modified-and-original-items).
4. [Update the original item](json-diff-and-patch-demonstration.md#update-the-original-item).

### Insert items into a MongoDB database

Create a new MongoDB database and insert three items - `item_1` to `item_3` into a `collection` object.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "user_shopping_list";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");

  // Create the database for our example (we will use the same database throughout the tutorial
  const db = client.db(dbName);
  const collection = db.collection("user_1_items");

  let item_1 = {
    _id: "U1IT00001",
    item_name: "Blender",
    max_discount: "10%",
    batch_number: "RR450020FRG",
    price: 340,
    category: "kitchen appliance",
  };

  const item_2 = {
    _id: "U1IT00002",
    item_name: "Egg",
    category: "food",
    quantity: 12,
    price: 36,
    item_description: "brown country eggs",
  };
  const insertResult = await collection.insertMany([item_1, item_2]);
  console.log("Inserted documents =>", insertResult);

  const item_3 = {
    item_name: "Bread",
    quantity: 2,
    ingredients: "all-purpose flour",
    expiry_date: "2021-07-13 00:00:00",
  };
  await collection.insertOne(item_3);

  return "done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
```
{% endtab %}

{% tab title="Python" %}
```python
client = MongoClient(os.environ["MONGO_CONNECTION_STRING"])

# Create the database for our example (we will use the same database throughout the tutorial
connection = client['user_shopping_list']

collection_name = connection["user_1_items"]

item_1 = {
"_id" : "U1IT00001",

"item_name" : "Blender",
"max_discount" : "10%",
"batch_number" : "RR450020FRG",
"price" : 340,
"category" : "kitchen appliance"
}

item_2 = {
"_id" : "U1IT00002",
"item_name" : "Egg",
"category" : "food",
"quantity" : 12,
"price" : 36,
"item_description" : "brown country eggs"
}

collection_name.insert_many([item_1,item_2])

expiry_date = '2021-07-13T00:00:00.000'
expiry = dt.datetime.fromisoformat(expiry_date)
item_3 = {
"item_name" : "Bread",
"quantity" : 2,
"ingredients" : "all-purpose flour",
"expiry_date" : expiry
}
collection_name.insert_one(item_3)
```
{% endtab %}
{% endtabs %}

### Modify an item

The 'document' `new_item_1` represents a modified instance of `item_1` with changes to properties `max_discount` and `price`.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const new_item_1 = {
  _id: "U1IT00001",
  item_name: "Blender",
  max_discount: "50%",
  batch_number: "RR450020FRG",
  price: 450,
  category: "kitchen appliance",
};
```
{% endtab %}

{% tab title="Python" %}
```python
new_item_1 = {
"_id" : "U1IT00001",
"item_ame" : "Blender",
"max_discount" : "50%",
"batch_number" : "RR450020FRG",
"price" : 450,
"category" : "kitchen appliance"
}
```
{% endtab %}
{% endtabs %}

### Compare modified and original items

Retrieve the original item in the `collection` and compare it to the modified item `new_item_1`.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const tbd_endpoint = new TerminusDBClient.WOQLClient("http://127.0.0.1:6363/", {
  user: "admin",
  organization: "admin",
  key: "root",
});

// Find the item back from database in case someone already changed it
item_1 = collection.findOne({ item_name: "Blender" });
const patch = tbd_endpoint.getDiff(item_1, new_item_1);

console.log(patch);
```
{% endtab %}

{% tab title="Python" %}
```python
tbd_endpoint = WOQLClient("http://localhost:6363/")

# Find the item back from database in case someone already changed it
item_1 = collection_name.find_one({"item_name" : "Blender"})
patch = tbd_endpoint.diff(item_1, new_item_1)

pprint(patch.content)
```
{% endtab %}
{% endtabs %}

### Update the original item

Update the orginal item in the MongoDB database. If required, review the differences prior to the update.

{% tabs %}
{% tab title="JavaScript" %}
Define a function `patchMongo` to get a patch object:

```javascript
const mongoPatch = function(patch){
    let query = {};
    let set = {};

    if('object' === typeof patch){
        for(var key in patch){
            const entry = patch[key];

            if( entry['@op'] == 'SwapValue'){
                query[key] = entry['@before'];
                set[key] = entry['@after'];
            }else if(key === '_id'){
                query[key] = ObjectId(entry);
            }else{
                let [sub_query,sub_set] = mongoPatch(entry);
                query[key] = sub_query;
                if(! sub_set === null){
                    set[key] = sub_set;
                }
            }
        }
        return [query,set]
    }else{
        return [patch,null]
    }
}
```

Apply the patch:

```javascript
let [q,s] = mongoPatch(patch);
console.log([q,s]);

await collection.updateOne(q, {"$set": s});
```
{% endtab %}

{% tab title="Python" %}
```python
collection_name.update_one(patch.before, {"$set": patch.update})
```
{% endtab %}
{% endtabs %}

## See also

### JSON-DP client functions

JavaScript client [diff ](https://terminusdb.com/docs/index/terminusx-db/reference-guides/javascript-client-reference/woqlclient#getdiff)and [patch](https://terminusdb.com/docs/index/terminusx-db/reference-guides/javascript-client-reference/woqlclient#patch).

Python client [diff](https://terminusdb.com/docs/index/terminusx-db/reference-guides/client/woqlclient#diff-before-after) and [patch](https://terminusdb.com/docs/index/terminusx-db/reference-guides/client/woqlclient#patch-before-patch).

### Demonstration script

The [full script](https://github.com/terminusdb/terminusdb-tutorials/blob/master/diff\_patch/mongo\_demo.py) for this demonstration (on GitHub.)
