# terminusdb_client.schema package

## Submodules

## terminusdb_client.schema.schema module


### _class_ terminusdb_client.schema.schema.TerminusKey(keys=None)
Bases: `object`


#### \__init__(keys=None)

### _class_ terminusdb_client.schema.schema.HashKey(keys=None)
Bases: `TerminusKey`

Generating ID with SHA256 using provided keys


#### at_type(_ = 'Hash_ )

### _class_ terminusdb_client.schema.schema.LexicalKey(keys=None)
Bases: `TerminusKey`

Generating ID with urllib.parse.quote using provided keys


#### at_type(_ = 'Lexical_ )

### _class_ terminusdb_client.schema.schema.ValueHashKey(keys=None)
Bases: `TerminusKey`

Generating ID with SHA256


#### at_type(_ = 'ValueHash_ )

### _class_ terminusdb_client.schema.schema.RandomKey(keys=None)
Bases: `TerminusKey`

Generating ID with UUID4


#### at_type(_ = 'Random_ )

### _class_ terminusdb_client.schema.schema.TerminusClass(name, bases, nmspc)
Bases: `type`


#### \__init__(name, bases, nmspc)

#### get_instances()

### _class_ terminusdb_client.schema.schema.DocumentTemplate(\*args, \*\*kwargs)
Bases: `object`


#### \__init__(\*args, \*\*kwargs)

### _class_ terminusdb_client.schema.schema.EnumMetaTemplate(cls, bases, classdict, \*, boundary=None, _simple=False, \*\*kwds)
Bases: `EnumMeta`


### _class_ terminusdb_client.schema.schema.EnumTemplate(value)
Bases: `Enum`

An enumeration.


#### \__init__(value=None)

### _class_ terminusdb_client.schema.schema.TaggedUnion(\*args, \*\*kwargs)
Bases: `DocumentTemplate`


#### \__init__(\*args, \*\*kwargs)

### _class_ terminusdb_client.schema.schema.Schema(title=None, description=None, authors=None, schema_ref=None, base_ref=None)
Bases: `object`


#### \__init__(title=None, description=None, authors=None, schema_ref=None, base_ref=None)

#### _property_ context()

#### add_enum_class(class_name, class_values)
Construct a TerminusDB Enum class by provideing class name and member values then add into the schema.


* **Parameters**

    
    * **class_name** (*str*) – Name of the class object constructed.


    * **class_values** (*list*) – A list of values in this Enum.



* **Returns**

    A Enum object with the sepcified name and members



* **Return type**

    EnumMetaTemplate



#### commit(client, commit_msg=None, full_replace=False)
Commit the schema to database


* **Parameters**

    
    * **client** ([*Client*](terminusdb_client.client.md#terminusdb_client.client.Client.Client)) – A client that is connected to a database.


    * **commit_msg** (*str*) – Commit message.


    * **full_replace** (*bool*) – Does the commit fully wiped out the old shcema graph. Default to be False.



#### from_db(client, select=None)
Load classes in the database schema into schema


* **Parameters**

    
    * **client** ([*Client*](terminusdb_client.client.md#terminusdb_client.client.Client.Client)) – Client that is connected to the database


    * **select** (*list of str**, **optional*) – The classes (and depended classes) that will be imported, default to None which will import all classes



#### import_objects(obj_dict)
Import a list of documents in json format to Python objects. The schema of those documents need to be in this schema.


#### from_json_schema(name, json_schema, pipe=False, subdoc=False)
Load class object from json schema ([http://json-schema.org/](http://json-schema.org/)) and, if pipe mode is off, add into schema. All referenced object will be treated as subdocuments.


* **Parameters**

    
    * **name** (*str*) – Name of the class object.


    * **json_schema** (*dict** or **str** or **StringIO*) – Json Schema in dictionary or jsonisable string format or json file stream.


    * **pipe** (*bool*) – Pipe mode, if True will return the schema in TerminusDB dictionary format (just like calling to_dict) WITHOUT loading the schema into the schema object. Default to False.


    * **subdoc** (*bool*) – If not in pipe mode, the class object will be added as a subdocument class.



#### add_obj(name, obj)

#### all_obj()

#### to_dict()
Return the schema in the TerminusDB dictionary format


#### to_json_schema(class_object)
Return the schema in the json schema ([http://json-schema.org/](http://json-schema.org/)) format as a dictionary for the class object.


* **Parameters**

    **object** (*class*) – Name of the class object or the class object represented as dictionary.



#### copy()

### terminusdb_client.schema.schema.WOQLSchema()
alias of `Schema`

## Module contents
