# CURL Reference

> **On this page:** Document interface examples using CURL.

## Examples

Some examples use a hypothetical database `admin/foo` (database named `foo` in organization `admin`.)

### Submit a new schema, replacing the existing schema

Use a hypothetical JSON file `/tmp/testschema.json` containing a schema.

```shell
cat /tmp/testschema.json | \
    curl -X POST -k 'http://localhost:6363/api/document/admin/foo?graph_type=schema&author=me&message=hallo&full_replace=true' \
        --data-binary @- -H 'Content-Type: application/json'
```

### Submit data into the instance graph

<!-- Removed: How to make a closed captions bot -->

```shell
cat /tmp/testdata.json | \
    curl -X POST -k 'http://localhost:6363/api/document/admin/foo?author=me&message=hallo' \
        --data-binary @- -H 'Content-Type: application/json'
```

### Get a list of instance documents

Note the `graph_type` is not specified in the first example. Explicitly requesting the `graph_type` instance, in the second example, provides the same result.  

```shell
curl -k 'http://localhost:6363/api/document/admin/foo'
```

```shell
curl -k 'http://localhost:6363/api/document/admin/foo?graph_type=instance'
```

### Get a list of instance documents of a particular type

```shell
curl -k 'http://localhost:6363/api/document/admin/foo?type=Person'
```

### Get a particular instance document by id

```shell
curl -k \
    'http://localhost:6363/api/document/admin/foo?graph_type=instance?id=Person_Robin_1995-09-29'
```

### Get a list of instance documents, skipping the first 3 and retrieving 5 more

```shell
curl -k 'http://localhost:6363/api/document/admin/foo?skip=3&count=5'
```

### Get a list of instance documents, with each JSON object on its own line

```shell
curl -k 'http://localhost:6363/api/document/admin/foo?minimized=true'
```

### Get a list of instance documents, as a JSON list instead of a stream

```shell
curl -k 'http://localhost:6363/api/document/admin/foo?as_list=true'
```

### Delete a single object

```shell
curl -X DELETE -k \
    'http://localhost:6363/api/document/admin/foo?uthor=me&message=blah&id=Person_1adfe57f9a2285da051445a3cf6056ef06dc1b7a'
```