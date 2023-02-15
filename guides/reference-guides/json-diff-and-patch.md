# JSON Diff and Patch

## JSON Diff and Patch Uses

JSON objects are a common way of representing data for software development. The serialization of JSON is simple and facilitates communication via networks and storage in databases. Almost all modern programming languages support JSON objects natively.

When objects are modified in distributed systems, it is useful to compare versions of an object to see what has changed. This is where **diff** and **patch** come in.

#### Diff

A **diff** takes two JSON objects and presents any differences between them. Diff has several uses. A key use is displaying a clear summary of differences between large objects, enhancing the visibility of changes. This enables manual, user-interface assisted, or client actions to resolve differences. Actions include:

* Retain the original object.
* Change to the new (or latest) version of the object.
* Create a new version of the object.

#### Patch

A **patch** applies a diff to two objects to obtain a new object with any differences highlighted. A patch is applied individually or in bulk to a patch endpoint that will apply the patch to the specified data product.

## Public Endpoint

Use our public endpoints for each operation:

**JSON Diff** - `https://cloud.terminusdb.com/jsondiff`

**JSON Patch** - `https://cloud.terminusdb.com/jsonpatch`

See [Diff and Patch Endpoints](json-diff-and-patch.md#diff-and-patch-endpoints) for more information, and examples of [diff](json-diff-and-patch.md#diff-examples-using-curl) and [patch](json-diff-and-patch.md#patch-examples-using-curl) using curl.

## Diff & Patch with Client

Use JSON Diff and Patch with a TerminusDB JavaScript or Python client to find and handle changes in TerminusDB schemas and documents, JSON schemas, and other document databases such as MongoDB. See \[JSON Diff and Patch client tutorials]\(json-diff-and-patch.md#JSON Diff and Patch-client-tutorials) for use cases, including connectivity with MongoDB.

#### Requirements

Install a [JavaScript](../../terminusdb/install-client/install-javascript-client.md) or [Python](../../terminusdb/install-client/install-python-client.md) TerminusDB client.

### Get started

Get started with the simple steps below.

{% hint style="info" %}
If using **TerminusCMS with Python**, connect to your TerminusCMS cloud instance first - see [Connect with WOQLClient](../../terminuscms/start-with-client.md#connect-with-woqlclient) for instructions if required.
{% endhint %}

1\. [Create an endpoint](json-diff-and-patch.md#create-an-endpoint)

2\. [Apply a diff to obtain a patch](json-diff-and-patch.md#apply-a-diff-to-obtain-a-patch)

3\. [Review the patch](json-diff-and-patch.md#review-the-patch)

4\. [Apply the patch](json-diff-and-patch.md#apply-the-patch)

#### Create an endpoint

Create a client endpoint with `WOQLClient`.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const TerminusClient = require("@terminusdb/terminusdb-client");

var client = new TerminusClient.WOQLClient("http://127.0.0.1:6363")
```
{% endtab %}

{% tab title="Python" %}
```python
from terminusdb_client import WOQLClient

client = WOQLClient("http://localhost:6363/")
```
{% endtab %}
{% endtabs %}

#### Apply a diff to obtain a patch

Get the difference/s between two hypothetical documents - `Doc1` and `Doc2`.

{% tabs %}
{% tab title="JavaScript" %}
Use `getDiff`

```javascript
let result_patch = await client.getDiff(Doc1, Doc2)
```
{% endtab %}

{% tab title="Python" %}
Use`diff`

```python
result_patch = client.diff(Doc1, Doc2)
```
{% endtab %}
{% endtabs %}

#### Review the patch

Print the contents of a patch.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
console.log(result_patch)
```
{% endtab %}

{% tab title="Python" %}
Example uses`pprint` (`from pprint import pprint`)

```python
pprint(result_patch.content)
```
{% endtab %}
{% endtabs %}

#### Apply the patch

Apply the patch to `Doc1`.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
let after_patch = await client.patch(Doc1, result_patch);
```
{% endtab %}

{% tab title="Python" %}
```python
after_patch = client.patch(Doc1, result_patch)
```
{% endtab %}
{% endtabs %}

## JSON Diff and Patch Operations

The available JSON Diff and Patch operations with some examples using `curl`.

Diff can take the paramters `keep` which specifies a document describing which fields _must_ be copied in the final object, and a `copy_value` boolean flag, which specifies whether to specify the exact value in a copy operation.

### Copy Diff

Copy is implicit. All properties which are not specifically mentioned will be considered part of an implicit copy. This will make patches more compressed and easier to specify by hand.

### Mandatory Diff

`@before`/`@after` instructions contain objects specified as tightly as required to obtain ids, or as ids.

```jsx
{ '@id' : "Person/jim",
  'date_of_birth' : { '@op' : 'SwapValue',
                      '@before' : "1928-03-05",
                      '@after' : "1938-03-05"
                    }}
```

### Optional Diff

Optional diffs also contain `@before`/`@after` designations, but potentially `null` fields to describe missing elements.

```jsx
{ '@id' : "Object/my_object",
  'name' : { '@op' : 'SwapValue',
             '@before' : null,
             '@after' : "Jim" }}
```

### Set Diff / Cardinality Diff

Set requires the ability to explicitly remove or add elements - we can do this by maintaining a `@before`/`@after` with a list of those which exist _only_ on the left, and _only_ on the right.

### List Diff

The list diff requires swaps at a position. We use, `@copy`, `@swap` and `@keep`.

#### Copy List

Copy the previous list from `From_Position` to `To_Position`.

```jsx
{ "@op" : "CopyList",
  "@to" : To_Position,
  "@rest" : Diff }
```

#### Swap List

Swap out the list starting from the current point from `Previous` to `Next`. This can be used to extend, or drop elements as well as do full replacement.

```jsx
{ "@op" : "SwapList",
  "@before" : Previous,
  "@after" : Next,
  "@rest" : Diff }
```

#### Patch List

Patch the list starting from the current point with the patch list in `"@patch"`. The patch must be less than or equal to the length of the list.

```jsx
{ "@op" : "PatchList",
  "@patch" : Patch,
  "@rest" : Diff }
```

#### Example:

```jsx
var Patch =
{ '@id' : "TaskList/my_tasks",
  'tasks' : { '@op' : "CopyList",                      % Replace List
              '@to' : 2,
              '@rest' : { '@op' : "PatchList",
                          '@patch' : [{ '@op' : "SwapValue",
                                        '@before' : "Task/shopping",
                                        '@after' : "Task/climbing"},
                                      { '@op' : "SwapValue",
                                        '@before' : "Task/cleaning",
                                        '@after' : "Task/dining"},
                                      { '@op' : "SwapValue",
                                        '@before' : "Task/fishing",
                                        '@after' : "Task/travelling"}],
                          '@rest' : { '@op' : "KeepList" } } }}
var Before =
{ '@id' : "TaskList/my_tasks",
  'tasks' : ["Task/driving", "Task/reading", "Task/shopping",
             "Task/cleaning","Task/fishing", "Task/arguing"] }
var After =
{ '@id' : "TaskList/my_tasks",
  'tasks' : ["Task/driving", "Task/reading", "Task/climbing",
             "Task/dining", "Task/travelling", "Task/arguing"] }
```

### Array Diff

Arrays will allow index swapping or "shrink" and "grow".

### Force Diff

A "Force Diff" will set the value of a location regardless of the current read-state. This is a potentially unsafe operation as there is no guarantee we are seeing the object state version we think we are.

```jsx
{ '@id' : "Employee/012" ,
  'name' : { '@op' : 'ForceValue',
             '@after' : "Jake" }}
```

### Table Diff

A Table diff specifies the differences and similarities between the two tables. These tables _need not_ have the same dimensions. In order to describe these differences, we use a `ModifyTable` patch. The `ModifyTable` patch is comprised of `copies`, `deletes`, `inserts` and `moves`.

`copies` give the sections of the table which can be copied verbatim. `deletes` gives all segments which are to be removed from the original. `inserts` gives all segments which are to be inserted into the new table.

`moves` specifies segments that are the same in both tables, but have moved location. This is particularly useful as moving rows and columns is a typical operation in a table (such as a CSV or Excel document).

#### Example Table

Given the following table:

```javascript
[['Job Title','Company','Location','Company Size','Company Industry'],
 ['Sr. Mgt.','Boeing','USA','Large','Aerospace'],
 ['Data Architect','Airbus','France','Large','Aerospace'],
 ['Founder','Ellie Tech','Sweden','Startup','AI'],
 ['Platform Engineer','Adidas','Germany','Large','Apparel']]
```

And a sorted version of the same (sorting on the first column):

```javascript
[['Job Title','Company','Location','Company Size','Company Industry'],
 ['Data Architect','Airbus','France','Large','Aerospace'],
 ['Founder','Ellie Tech','Sweden','Startup','AI'],
 ['Platform Engineer','Adidas','Germany','Large','Apparel'],
 ['Sr. Mgt.','Boeing','USA','Large','Aerospace']]
```

We have the following patch resulting from the diff:

```
{'@op':"ModifyTable",
 dimensions:{'@after':[5,5],'@before':[5,5]},
 deletes:[],
 inserts:[],
 copies:[{'@at':{'@height':1,'@width':5,'@x':0,'@y':0},'@value':[['Job Title','Company','Location','Company Size','Company Industry']]}],
 moves:[{'@from':{'@height':1,'@width':5,'@x':0,'@y':1},
         '@to':{'@height':1,'@width':5,'@x':0,'@y':4},
         '@value':[['Sr. Mgt.','Boeing','USA','Large','Aerospace']]},
        {'@from':{'@height':1,'@width':5,'@x':0,'@y':2},
         '@to':{'@height':1,'@width':5,'@x':0,'@y':1},
         '@value':[['Data Architect','Airbus','France','Large','Aerospace']]},
        {'@from':{'@height':1,'@width':5,'@x':0,'@y':3},
         '@to':{'@height':1,'@width':5,'@x':0,'@y':2},
         '@value':[['Founder','Ellie Tech','Sweden','Startup','AI']]},
        {'@from':{'@height':1,'@width':5,'@x':0,'@y':4},
         '@to':{'@height':1,'@width':5,'@x':0,'@y':3},
         '@value':[['Platform Engineer','Adidas','Germany','Large','Apparel']]}]}
```

## Diff and Patch Endpoints

The Patch and Diff endpoints expose endpoints to obtain diffs or patches of data. Use our public endpoint for each operation:

**JSON Diff** - `https://cloud.terminusdb.com/jsondiff`

**JSON Patch** - `https://cloud.terminusdb.com/jsonpatch`

### Diff

The diff endpoint takes a POST of two JSON documents, _before_, and _after_. This endpoint then returns a 200 and a patch which takes _before_ to _after_ if applied using the patch interface.

The payload is structured as a JSON document with one of the following forms:

* With `"before"` and `"after"`, pointing to the documents you would like to diff.
* With `"before_data_version"`, `"after"` and `"document_id"`, specifying the data version or commit ID with which to compare the given _after_ document.
* With `"before_data_version"`, `"after_data_version"` and `"document_id"` specifying the data version or commit ID with which to compare the document given by `"document_id"`
* With `"before_data_version"`, `"after_data_version"`, meaning that we would like to get a diff for _all_ documents between the two specified data versions.

There are also two options:

* `keep`: A dictionary which has keys which need to be copied
* `copy_value`: Which specifies that we should make _explicit_ which values existed during a list copy.

An example of the payload:

```json
{ "before" : { "@id" : "Person/Jane", "@type" : "Person", "name" : "Jane"},
  "after" :  { "@id" : "Person/Jane", "@type" : "Person", "name" : "Janine"}}
```

Which would result in the following patch:

```json
{ "name" : { "@op" : "SwapValue", "@before" : "Jane", "@after": "Janine" }}
```

An example of a payload comparing commits or dataversions:

```json
{ "before_data_version" : "branch:s7dde27gyj8ezat3itw5nr3peu1lymh"
  "document_id" : "terminusdb:///data/test/665df8a9c3a58be6db622be4b37a76bea46c3e5e3cd2db923e708e574d1566be",
  "after" :  { "@id" : "Person/Jane", "@type" : "Person", "name" : "Janine"}}
```

An example of a payload comparing only dataversions:

```json
{ "before_data_version" : "branch:s7dde27gyj8ezat3itw5nr3peu1lymh"
  "after_data_version" : "branch:jb81rgx9lzow35r3pkrsvdf5l75kaq"
  "document_id" : "terminusdb:///data/test/665df8a9c3a58be6db622be4b37a76bea46c3e5e3cd2db923e708e574d1566be"}
```

#### Diff examples using curl

```shell
$ curl -X POST -H "Content-Type: application/json" 'https://cloud.terminusdb.com/jsondiff' -d \
  '{ "before" : { "asdf" : "foo", "fdsa" : "bar"}, "after" : { "asdf" : "bar", "fdsa" : "bar"}, "keep" : { "fdsa" : true}}'
# Output: {
  "asdf": {"@after":"bar", "@before":"foo", "@op":"SwapValue"},
  "fdsa":"bar"
}
```

```shell
$ curl -X POST -H "Content-Type: application/json" 'https://cloud.terminusdb.com/jsondiff' -d \
  '{ "before" : [{ "asdf" : "foo"}], "after" : [{ "asdf" : "bar"}]}'
# Output: [ {"asdf": {"@after":"bar", "@before":"foo", "@op":"SwapValue"}} ]
```

```bash
$ curl -X POST -H "Content-Type: application/json" 'https://cloud.terminusdb.com/jsondiff' -d \
  '{ "before" : [0,1,2], "after" : [0,1,2,3]}'

# Output:
{
  "@op":"CopyList",
  "@rest": {
    "@after": [3 ],
    "@before": [],
    "@op":"SwapList",
    "@rest": {"@op":"KeepList"}
  },
  "@to":3
}
```

```bash
$ curl -X POST -H "Content-Type: application/json" 'https://cloud.terminusdb.com/jsondiff' -d \
  '{ "before" : [0,1,2], "after" : [0,1,2,3], "copy_value" : true}'

# Output:
{
  "@op":"CopyList",
  "@rest": {
    "@after": [3 ],
    "@before": [],
    "@op":"SwapList",
    "@rest": {"@op":"KeepList", "@value": []}
  },
  "@to":3,
  "@value": [0, 1, 2 ]
}
```

```bash
$ curl -X POST -H "Content-Type: application/json" 'https://cloud.terminusdb.com/jsondiff' -d \
  '{ "before" : { "asdf" : { "fdsa" : "quux"}}, "after" : { "asdf" : { "fdsa" : "quuz" }}}'

# Output:
{
  "asdf": {"fdsa": {"@after":"quuz", "@before":"quux", "@op":"SwapValue"}}
}
```

### Patch

Patch takes a POST with a _before_ document and a _patch_ and produces an _after_ document.

```json
{ "before" : { "@id" : "Person/Jane", "@type" : "Person", "name" : "Jane"}
  "patch" : {"name" : { "@op" : "ValueSwap", "@before" : "Jane", "@after": "Janine" }}}
```

Resulting in the following document:

```json
{ "@id" : "Person/Jane", "@type" : "Person", "name" : "Janine"}
```

#### Patch examples using curl

```shell
$ curl -X POST -H "Content-Type: application/json" 'https://cloud.terminusdb.com/jsonpatch' -d \
   '{ "before" : { "alpha" : 1, "asdf" : { "fdsa" : "quux"}}, "patch" : {
      "asdf": {"fdsa": {"@after":"quuz", "@before":"quux", "@op":"SwapValue"}}
}}'
# Output: {"alpha":1, "asdf": {"fdsa":"quuz"}}
```

```bash
$ curl -X POST -H "Content-Type: application/json" 'https://cloud.terminusdb.com/jsonpatch' -d '
{ "before" : [0,1,2], "patch" : {
  "@op":"CopyList",
  "@rest": {
    "@after": [3 ],
    "@before": [],
    "@op":"SwapList",
    "@rest": {"@op":"KeepList"}
  },
  "@to":3
}}'
#Output: [0, 1, 2, 3 ]
```

## Further Reading

#### [JSON Diff and Patch How-to Guide](../how-to-guides/json-diff-and-patch-demonstration.md)

A demonstration of using JSON Diff and Patch with a client, including the use of JSON Diff and Patch with MongoDB.

#### JSON Diff and Patch client functions

JavaScript client [diff ](javascript-client-reference/woqlclient.md#getdiff)and [patch](javascript-client-reference/woqlclient.md#patch).

Python client [diff](python-client-reference/terminusdb\_client.client.md#diff-before-after-document\_id-none) and [patch](python-client-reference/terminusdb\_client.client.md#patch-before-patch).
