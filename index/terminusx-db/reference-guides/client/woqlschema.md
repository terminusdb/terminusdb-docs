# WOQLSchema

## class terminusdb\_client.woqlschema.woql\_schema.TerminusKey(keys=None)

**Bases:** `object`

### **init**(keys=None)

## class terminusdb\_client.woqlschema.woql\_schema.HashKey(keys=None)

**Bases:** `terminusdb_client.woqlschema.woql_schema.TerminusKey`

Generating ID with SHA256 using provided keys

> **at\_type** = 'Hash'

## class terminusdb\_client.woqlschema.woql\_schema.LexicalKey(keys=None)

**Bases:** `terminusdb_client.woqlschema.woql_schema.TerminusKey`

Generating ID with urllib.parse.quote using provided keys

> **at\_type** = 'Lexical'

## class terminusdb\_client.woqlschema.woql\_schema.ValueHashKey(keys=None)

**Bases:** `terminusdb_client.woqlschema.woql_schema.TerminusKey`

Generating ID with SHA256

> **at\_type** = 'ValueHash'

## class terminusdb\_client.woqlschema.woql\_schema.RandomKey(keys=None)

**Bases:** `terminusdb_client.woqlschema.woql_schema.TerminusKey`

Generating ID with UUID4

> **at\_type** = 'Random'

## class terminusdb\_client.woqlschema.woql\_schema.TerminusClass(name, bases, nmspc)

**Bases:** `type`

### **init**(name, bases, nmspc)

### get\_instances()

## class terminusdb\_client.woqlschema.woql\_schema.DocumentTemplate(\*args, \*\*kwargs)

**Bases:** `object`

### **init**(\*args, \*\*kwargs)

## class terminusdb\_client.woqlschema.woql\_schema.EnumMetaTemplate(cls, bases, classdict, \*, boundary=None, \_simple=False, \*\*kwds)

**Bases:** `enum.EnumMeta`

## class terminusdb\_client.woqlschema.woql\_schema.EnumTemplate(value)

**Bases:** `enum.Enum`

An enumeration.

### **init**(value=None)

## class terminusdb\_client.woqlschema.woql\_schema.TaggedUnion(\*args, \*\*kwargs)

**Bases:** `terminusdb_client.woqlschema.woql_schema.DocumentTemplate`

### **init**(\*args, \*\*kwargs)

## class terminusdb\_client.woqlschema.woql\_schema.WOQLSchema(title=None, description=None, authors=None, schema\_ref=None, base\_ref=None)

**Bases:** `object`

### **init**(title=None, description=None, authors=None, schema\_ref=None, base\_ref=None)

> **Property:** context()

### add\_enum\_class(class\_name, class\_values)

Construct a TerminusDB Enum class by provideing class name and member values then add into the schema.

**Parameter/s**

* **class\_name** (`str`) – Name of the class object constructed.
* **class\_values** (_list_) – A list of values in this Enum.

**Returns**

A Enum object with the sepcified name and members

**Return type/s**

EnumMetaTemplate

### commit(client, commit\_msg=None, full\_replace=False)

Commit the schema to database

**Parameter/s**

* **client** (_WOQLClient_) – A client that is connected to a database.
* **commit\_msg** (`str`) – Commit message.
* **full\_replace** (`bool`) – Does the commit fully wiped out the old shcema graph. Default to be False.

### from\_db(client, select=None)

Load classes in the database shcema into schema

**Parameter/s**

* **client** (_WOQLClient_) – Client that is connected to the database
* **select** (_list of `str`_, `optional`) – The classes (and depended classes) that will be imported, default to None which will import all classes

### import\_objects(obj\_dict)

Import a list of documents in json format to Python objects. The schema of those documents need to be in this schema.

### from\_json\_schema(name, json\_schema, pipe=False, subdoc=False)

Load classe object from json schema ([http://json-schema.org/](http://json-schema.org)) and, if pipe mode is off, add into schema. All referenced object will be treated as subdocuments.

**Parameter/s**

* **name** (`str`) – Name of the class object.
* **json\_schema** (_dict_\* or _`str`_ or \*_StringIO_) – Json Schema in dictionary or jsonisable string format or json file stream.
* **pipe** (`bool`) – Pipe mode, if True will return the schema in TerminusDB dictionary format (just like calling to\_dict) WITHOUT loading the schema into the schema object. Default to False.
* **subdoc** (`bool`) – If not in pipe mode, the class object will be added as a subdocument class.

### add\_obj(name, obj)

### all\_obj()

### to\_dict()

Return the schema in the TerminusDB dictionary format

### to\_json\_schema(class\_object)

Return the schema in the json schema ([http://json-schema.org/](http://json-schema.org)) format as a dictionary for the class object.

**Parameter/s**

**object** (_class_) – Name of the class object or the class object represented as dictionary.

### copy()
