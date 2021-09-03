# Document Interface Examples Using CURL

All these examples are written against a hypothetical database called 'admin/moo'.

## submit a completely new schema, replacing your existing schema:

```shell
cat /tmp/testschema.json|curl -X POST -k 'http://localhost:6363/api/document/admin/moo?graph_type=schema&author=me&message=hallo&full_replace=true' --data-binary @- -H 'Content-Type: application/json'
```

this example assumes you have a file at '/tmp/testschema.json' containing a schema. 

## submit a bunch of data into the instance graph

```shell
how to make a closed captions botcat /tmp/testsdata.json|curl -X POST -k 'http://localhost:6363/api/document/admin/moo?author=me&message=hallo' --data-binary @- -H 'Content-Type: application/json'
```

this example assumes you have a file at '/tmp/testdata.json' containing data that matches the current schema.

## Get a list of instance documents:

```shell
curl -k 'http://localhost:6363/api/document/admin/moo'
```

Note that we don't specify `graph_type`. We could also explicitely request `graph_type` instance though and get the same result:

```shell
curl -k 'http://localhost:6363/api/document/admin/moo?graph_type=instance'
```

## Get a list of instance documents of a particular type:

```shell
curl -k 'http://localhost:6363/api/document/admin/moo?type=Person'
```

## Query for a particular instance document by id:

```shell
curl -k 'http://localhost:6363/api/document/admin/moo?graph_type=instance?id=Person_Robin_1995-09-29'
```

## Get a list of instance documents, skipping the first 3 and retrieving 5 more

```shell
curl -k 'http://localhost:6363/api/document/admin/moo?skip=3&count=5'
```

## Get a list of instance documents, with each json object on its own line

```shell
curl -k 'http://localhost:6363/api/document/admin/moo?minimized=true'
```

## Get a list of instance documents, as a json list instead of a stream

```shell
curl -k 'http://localhost:6363/api/document/admin/moo?as_list=true'
```

## Delete a single object

```shell
curl -X DELETE -k 'http://localhost:6363/api/document/admin/moo?uthor=me&message=blah&id=Person_1adfe57f9a2285da051445a3cf6056ef06dc1b7a'
```
