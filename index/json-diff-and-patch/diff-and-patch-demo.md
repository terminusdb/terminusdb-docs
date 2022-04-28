---
description: >-
  In this demo tutorial, we will show how the diff and patch operation can be
  applied to monitor changes in TerminusDB schema, TerminusDB documents, JSON
  schema and with other document database.
---

# Diff and Patch Demo

To install the Python client, [check out here](https://github.com/terminusdb/terminusdb-client-python#installation).

To install the Javascript client package, [check out here](https://terminusdb.com/docs/index/terminusx/install/install-javascript-client).

Make sure you have the [docker container running on `localhost`](https://github.com/terminusdb/terminusdb-bootstrap). Or if you want to use TerminusX then you should create an account [here](https://dashboard.terminusdb.com).

### Using Diff and Patch with TerminusDB

In the following code snippets we demonstrate in parts with various objects (TerminusDB schema, TerminusDB documents or just a JSON schema) that `diff` will give you a `Patch` object back and with that object you can apply `patch` to modify an object.

In terminusDB all documents and schemas are represented in JSON-LD format. With diff and patch, we can easily compare any documents and schemas to see what has been changed.

{% tabs %}
{% tab title="Python" %}
Consider documents as a Python object:

```python
class Person(DocumentTemplate):
    name: str
    age: int

jane = Person(name="Jane", age=18)
janine = Person(name="Janine", age=18)
```
{% endtab %}

{% tab title="JavaScript" %}
Consider documents as a JavaScript object:

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
{% endtabs %}

You can directly apply diff to get a patch object:

{% tabs %}
{% tab title="Python" %}
```python
result_patch = client.diff(jane, janine)

pprint(result_patch.content)
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
const result_patch = await client.getDiff(jane, janine);

console.log(result_patch);
```
{% endtab %}
{% endtabs %}

With the patch object (`result_patch` here), you can either review it's content or you can apply it to an object and you can get an after object back.

{% tabs %}
{% tab title="Python" %}
```python
after_patch = client.patch(jane, result_patch)

pprint(after_patch)

assert after_patch == janine._obj_to_dict()
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
const after_patch = await client.patch(jane, result_patch);

console.log(after_patch);

console.log(JSON.stringify(after_patch) === JSON.stringify(janine));
```
{% endtab %}
{% endtabs %}

As you see, the `after_patch` object (document) is the same as `janine`. In other application, you can put this document back in the database using `replace_document` to commit this change.



{% tabs %}
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
{% endtabs %}



Imagine we want to change item\_1:

{% tabs %}
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
{% endtabs %}



We can compare the old and new item 1 with diff and patch:

{% tabs %}
{% tab title="Python" %}
```python
tbd_endpoint = WOQLClient("http://localhost:6363/")

# Find the item back from database in case someone already changed it
item_1 = collection_name.find_one({"item_name" : "Blender"})
patch = tbd_endpoint.diff(item_1, new_item_1)

pprint(patch.content)
```
{% endtab %}

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
{% endtabs %}



Again, we can review before making the change at MongoDB:

{% tabs %}
{% tab title="Python" %}
```python
collection_name.update_one(patch.before, {"$set": patch.update})
```
{% endtab %}

{% tab title="JavaScript" %}
In here we created a function called `patchMongo` which we will use to get patch object for mongo:&#x20;

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



Where we create an object that we can put back to update the data in MongoDB:

```javascript
let [q,s] = mongoPatch(patch);
console.log([q,s]);

await collection.updateOne(q, {"$set": s});
```
{% endtab %}
{% endtabs %}

See the [full script here](https://github.com/terminusdb/terminusdb-tutorials/blob/master/diff\_patch/mongo\_demo.py)
