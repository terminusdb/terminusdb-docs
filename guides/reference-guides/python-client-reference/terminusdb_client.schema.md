<a id="terminusdb_client.schema"></a>

# terminusdb\_client.schema

<a id="terminusdb_client.schema.schema"></a>

# terminusdb\_client.schema.schema

<a id="terminusdb_client.schema.schema.HashKey"></a>

## HashKey Objects

```python
class HashKey(TerminusKey)
```

Generating ID with SHA256 using provided keys

<a id="terminusdb_client.schema.schema.LexicalKey"></a>

## LexicalKey Objects

```python
class LexicalKey(TerminusKey)
```

Generating ID with urllib.parse.quote using provided keys

<a id="terminusdb_client.schema.schema.ValueHashKey"></a>

## ValueHashKey Objects

```python
class ValueHashKey(TerminusKey)
```

Generating ID with SHA256

<a id="terminusdb_client.schema.schema.RandomKey"></a>

## RandomKey Objects

```python
class RandomKey(TerminusKey)
```

Generating ID with UUID4

<a id="terminusdb_client.schema.schema.Schema"></a>

## Schema Objects

```python
class Schema()
```

<a id="terminusdb_client.schema.schema.Schema.add_enum_class"></a>

#### add\_enum\_class

```python
def add_enum_class(class_name: str, class_values: list)
```

Construct a TerminusDB Enum class by provideing class name and member values then add into the schema.

**Arguments**:

- `class_name` (`str`): Name of the class object constructed.
- `class_values` (`list`): A list of values in this Enum.

**Returns**:

`EnumMetaTemplate`: A Enum object with the sepcified name and members

<a id="terminusdb_client.schema.schema.Schema.commit"></a>

#### commit

```python
def commit(client: Client,
           commit_msg: Optional[str] = None,
           full_replace=False)
```

Commit the schema to database

**Arguments**:

- `client` (`Client`): A client that is connected to a database.
- `commit_msg` (`str`): Commit message.
- `full_replace` (`bool`): Does the commit fully wiped out the old shcema graph. Default to be False.

<a id="terminusdb_client.schema.schema.Schema.from_db"></a>

#### from\_db

```python
def from_db(client: Client, select: Optional[List[str]] = None)
```

Load classes in the database schema into schema

**Arguments**:

- `client` (`Client`): Client that is connected to the database
- `select` (`list of str`): The classes (and depended classes) that will be imported, default to None which will import all classes

<a id="terminusdb_client.schema.schema.Schema.import_objects"></a>

#### import\_objects

```python
def import_objects(obj_dict: Union[List[dict], dict])
```

Import a list of documents in json format to Python objects. The schema of those documents need to be in this schema.

<a id="terminusdb_client.schema.schema.Schema.from_json_schema"></a>

#### from\_json\_schema

```python
def from_json_schema(name: str,
                     json_schema: Union[dict, str, StringIO],
                     pipe=False,
                     subdoc=False)
```

Load class object from json schema (http://json-schema.org/) and, if pipe mode is off, add into schema. All referenced object will be treated as subdocuments.

**Arguments**:

- `name` (`str`): Name of the class object.
- `json_schema` (`dict or str or StringIO`): Json Schema in dictionary or jsonisable string format or json file stream.
- `pipe` (`bool`): Pipe mode, if True will return the schema in TerminusDB dictionary format (just like calling to_dict) WITHOUT loading the schema into the schema object. Default to False.
- `subdoc` (`bool`): If not in pipe mode, the class object will be added as a subdocument class.

<a id="terminusdb_client.schema.schema.Schema.to_dict"></a>

#### to\_dict

```python
def to_dict()
```

Return the schema in the TerminusDB dictionary format

<a id="terminusdb_client.schema.schema.Schema.to_json_schema"></a>

#### to\_json\_schema

```python
def to_json_schema(class_object: Union[str, dict])
```

Return the schema in the json schema (http://json-schema.org/) format as a dictionary for the class object.

**Arguments**:

- `class object` (`str or dict`): Name of the class object or the class object represented as dictionary.

