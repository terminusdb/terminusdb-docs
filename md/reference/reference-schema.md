# Schema Reference

> **On this page:** A reference guide to the TerminusDB schema language based on simple JSON syntax.  

The TerminusDB schema language enables documents and their relationships to be specified using simple JSON syntax. This syntax makes it as easy as possible to specify a JSON object to automatically convert to a graph. This approach enables data to be viewed as collections of documents or as knowledge graphs of interconnected objects.   

## Schema Objects

A JSON object in TerminusDB schema is composed of **key-value** pairs.

### Key

A key is one of two values, **keyword** or **property**, described in the table below. The full schema definition is a stream or list of these values or JSON objects.

#### Table: Types of keys

| Key type | Example | Description | 
| -------- | ------- | ----------- |
| **keyword** | `@id` | Starts with `@`, has a value with a special meaning. |
| **property** | `name` | Does not start with `@`, has a value with a **range** type. |

## Class definition

The basic unit of specification is a **class**. A class definition is a schema object with the keyword `@type` with type value `Class`. The keyword `@id` specifies the name of the class. The example below define a class named `Person` with a property `name` of type `xsd:string`. Search XSD definitions for more information about types.

#### Code: The basic unit of specification

```json
{ 
    "@type" : "Class",
    "@id"   : "Person",
    "name"  : "xsd:string" 
}
```

## Context object

The **context object** is a special schema object affecting the entire schema. The context object is specified by the special `@type` value `@context`. An example:

<!-- to-do: Is attribute order important? -->

#### Code: The context object

```json
{   "@type"            : "@context",
    "@schema"          : "http://terminusdb.com/schema/woql#",
    "@base"            : "terminusdb://woql/data/",
    "xsd"              : "http://www.w3.org/2001/XMLSchema#",
    "@documentation"   : 
    {
        "@title"       : "WOQL schema",
        "@authors"     : ["Gavin Mendel-Gleason"],
        "@description" : "The WOQL schema providing a complete specification of the WOQL syntax. 
                         This enables: 
                         * WOQL queries to be checked for syntactic correctness.
                         * Storage and retrieval of queries. 
                         * Queries to be associated with data products.
                         * Helps to prevent errors and detect conflicts in merge of queries.",   
    } 
}
```

This example does the following:

- Defines default prefixes in `@schema` and `@base` to use for the schema and data.

- Defines the prefix `xsd` enabling vocabulary based on different URL prefixes. 
  
    - For example, specify `xsd:string` to denote `http://www.w3.org/2001/XMLSchema#string`

- Documents the schema in the `@documentation` value, providing: 
  
    - `@title`
    - `@authors` 
    - `@description`  


### Context Prefixes

All properties in the context object that do not start with `@`, such as `xsd`, are URI definitions. They must be of the form shown below. Prefix and URI are defined by their respective regular expressions. That is, a prefix has an identifier starting with an alphabetic character followed by alphanumeric characters. The URI has a protocol followed by valid URI characters. Each prefix is paired with a URI.

```
Prefix := ":alpha::alphaNum:*"
URI    := ":alpha:alphaNum:*://:uriChar:*"

{   ...
    Prefix : URI
    ... }
```

## Context keywords

A list of keywords used in the context object. 

### @schema

The `@schema` keyword specifies the default URI expansion to use for all elements of the schema. In the example below, the class name `NamedQuery` expands to `http://terminusdb.com/schema/woql#NamedQuery`.

#### Code: Context keyword @schema

```json
{ 
    "@type"       : "@context",
    "@schema"     : "http://terminusdb.com/schema/woql#",
    "@base"       : "terminusdb://woql/data/" 
}
{ 
    "@id"         : "NamedQuery",
    "@type"       : "Class",
    "@key"        :
    { 
        "@type"   : "Lexical",
        "@fields" : [ "name" ]
    },
    "name"        : "xsd:string",
    "query"       : "Query" 
}
```

### @base

`@base` specifies the default URI expansion used for all elements of instance data. In the previous [schema definition](code-context-keywords-@schema), and given the [document in the instance graph]() example below, the id `NamedQuery_my_query` expands to `terminusdb://woql/data/NamedQuery_my_query`. 

#### Code: A document in the instance graph 

```json
{ 
    "@type"     : "NamedQuery",
    "@id"       : "NamedQuery_my_query",
    "name"      : "my_query",
    "query"     : 
    { 
        "@type" : "True" 
    }
}
```

### @documentation

`@documentation` specifies documentation global to the entire schema. See the `@documentation` section in the previous [context object](#code-the-context-object) example. The documentation section contains the keywords: 

#### @title 

The `@title` of the schema to display.

#### @description

A long-form `@description` of the purpose of the schema, the type of documents contained in the schema, and keywords useful for searching for the type of content that the schema encodes.

#### @authors

A list of strings of `@authors` involved in writing the schema.

## Class keywords

A class definition includes several properties, and the keywords, prefixed `@`, describing class behavior.

### @type

The `@type` of the object. At the schema level, this is one of: `Enum`, `Class`, `TaggedUnion` and `Unit`.

#### Class

`Class` designates a standard class document. It contains the definition of several properties and keywords describing various class attributes. An example of a class, and an instance of the class:

#### Code: An example of a class

```json
{ 
    "@id"         : "Dog",
    "@type"       : "Class",
    "@base"       : "Dog_",
    "@key"        : 
    { 
        "@type"   : "Lexical",
        "@fields" : [ "name" ] 
    },
    "name"        : "xsd:string",
    "hair_colour" : "Colour" 
}
```

#### Code: An example of a class instance

```json
{ 
    "@type"       : "@context",
    "@base"       : "http://i/",
    "@schema"     : "http://s#" 
}
{ 
    "@type"       : "Dog",
    "@id"         : "Dog_Cerberus",
    "name"        : "Cerberus",
    "hair_colour" : "Grey" 
}
```

#### Enum

An `Enum` is a non-standard class in which each instance is a simple URI with no additional structure. To be a member of the class, you must be one of the referent URIs. An `Enum` example with an extension `Blue` is s shown below. In the database, the actual URI for an Enum is expanded with the preceding type name, so the `Blue` extension becomes `http://s#PrimaryColour_Blue`

#### Code: An example of an enum class 

```json
{ 
    "@type"   : "Enum",
    "@id"     : "PrimaryColour",
    "@value" : 
    [
        "Red", 
        "Blue", 
        "Yellow"
    ] 
}
```

<!-- to-do: Anything else needed here? -->

```json
"Blue"
```

#### TaggedUnion

<!-- to-do: Clarify disjoint choice -->

A `TaggedUnion` specifies mutually exclusive properties. This is useful when there is a disjoint choice between options. 

Examples below of a schema with a TaggedUnion and a concrete [TaggedUnion class extension](#code-an-example-taggedunion-class-extension). In these examples, the `BinaryTree` class specifies a `TaggedUnion` enabling a choice between a `leaf` (with no value), or a `node` class with a value and branches.

#### Code: An example schema with a TaggedUnion

```json
{ 
    "@type"     : "@context",
    "@base"     : "http://i/",
    "@schema"   : "http://s#" 
}
{ 
    "@id"       : "BinaryTree",
    "@type"     : "TaggedUnion",
    "@base"     : "binary_tree_",
    "@key"      : 
    { 
        "@type" : "ValueHash" 
    },
    "leaf"      : "sys:Unit",
    "node"      : "Node" 
}
{ 
    "@id"       : "Node",
    "@type"     : "Class",
    "@key"      : 
    { 
        "@type" : "ValueHash" 
    },
    "value"     : "xsd:integer",
    "left"      : "BinaryTree",
    "right"     : "BinaryTree" 
}
```

#### Code: An example TaggedUnion class extension

```json
{ 
    "@type"     : "Node",
    "value"     : 0,
    "left"      : 
    {
        "@type" : "BinaryTree",
        "leaf"  : []
    },
    "right": 
    { 
        "@type" : "BinaryTree",
        "leaf"  : []
    }
}
```

#### Unit

The `Unit` type has a single extension `[]`. This is used when only the presence of the property is interesting, but it has no interesting value. See the `BinaryTree` in the [TaggedUnion class extension](#code-an-example-taggedunion-class-extension) example above.

### @id

The `@id` key of a class defines the class name and identifier. The name uniquely defines the class, enabling the class to be updated, retrieved, and deleted. In the example below, the class is named `NamedQuery`. It does not have a fully qualified URL or prefix, so it is implicitly based on the URI given for `@schema`.

#### Code: The @id key of a class

```json
{ 
    "@id"         : "NamedQuery",
    "@type"       : "Class",
    "@key"        : 
    { 
        "@type"   : "Lexical",
        "@fields" : [ "name" ] 
    },
    "name"        : "xsd:string",
    "query"       : "Query" 
}
```

### @key

`@key` specifies the mechanism to define the `@id` of documents in the database, similar to a primary key in relational database terms. Valid key types are `Lexical`, `Hash`, `ValueHash`, `Random`.

If the key `@base` is specified in the class, then this is pre-pended to the key. If this is a fully qualified URI then it is complete, otherwise, it is combined with the value of `@base` from the context.

#### Lexical

A `Lexical` key specifies a URI name formed from a URI encoded combination of all `@fields` arguments provided, in the order provided. An example is shown below. With this key type (or key strategy) a URI is formed from the combination of `first_name` and `last_name`. If `@base` is specified in the class, this is prepended. 

Given the [simple document definition](#code-a-simple-document-defintion) below, this will either generate (if `@id` is not supplied) or check that the URI `http://example.com/people/Person_Hasdrupal_Barca` is the `@id` element.

#### Code: An example Lexical key

```json
{ 
    "@type"         : "@context",
    "@schema"       : "http://example.com/people#",
    "@base"         : "http://example.com/people/" 
}
{ 
    "@id"           : "Person",
    "@type"         : "Class",
    "@base"         : "Person_",
    "@key"          : 
    {
        "@type"     : "Lexical",
        "@fields"   : 
        [ 
            "first_name", 
            "last_name" 
        ]
    },
    "first_name"    : "xsd:string",
    "last_name"     : "xsd:string",
    "year_of_birth" : "xsd:gYear"
}
```

#### Code: A simple document defintion

<!-- to-do: Is the last document element missing a colon and date of birth? -->

```json
{ 
    "@type"         : "Person",
    "first_name"    : "Hasdrupal",
    "last_name"     : "Barca",
    "year_of_birth" : "-245" 
}
```

#### Hash

`Hash` is generated in the same way as `Lexical` except that values are first hashed using the SHA-256 hash algorithm. 

Use this where there:

- Are numerous items that form the key making the URI unwieldy. 
- Is no need for the URI to inform the user of the content of the object. 
- Is a requirement that data about the object is not be revealed by the key. 

<!-- Confirm if this is an ok way to remove duplicate code -->

Define a `Hash` in the same way as the [Lexical key strategy](#code-Lexical-key-strategy) example in the previous section, replacing the `@key` `@type` value from `Lexical` to `Hash`. 

Given the [simple document definition](#code-a-simple-document-defintion) in the previous section, the `@id` `Person_5dd7004081e437b3e684075fa3132542f5cd06c1` is generated.

#### ValueHash

<!-- to-do: ??!! -->

The `ValueHash` key generates a key defined as the downward transitive closure of the directed acyclic graph from the root of the document. This means you can produce a key that is entirely based on the entire data object. Note `ValueHash`:

- Takes no additional keywords. 
- Objects must be directed acyclic graphs, they **cannot be cyclic**. 

In the example below, `ValueHash` is formed only from the value of `layer:identifier`.

#### Code: An example ValueHash key

```json
{ 
    "@id"              : "layer:Layer",
    "@type"            : "Class",
    "@documentation"   : 
    {
        "@comment"     : "A layer object which has the identifier used in storage.",
        "@properties"  : 
        { 
            "layer:identifier"  : "The layer identifier." 
        }
    },
    "@base"            : "layer_data:Layer_",
    "@key"             : 
    { 
        "@type"        : "ValueHash" 
    },
    "layer:identifier" : "xsd:string" 
}
```

#### Random

Use `Random` as a convenient key type when an object has no important characteristics that inform a key or does not need to be constructed such that it is reproducible. In the example below, the `@key` `@type` is defined as `Random`, meaning each new database that is added is unique regardless of label.

#### Code: An example of a Random key

```json
{ 
    "@id"                   : "UserDatabase",
    "@type"                 : "Class",
    "@documentation"        : 
    {
        "@comment"          : "A normal user database.",
        "@properties"       : 
        { 
            "label"         : "The label name of the database.",
            "comment"       : "A comment associated with the database.",
            "creation_date" : "The time of creation of the database.",
            "state"         : "The system transaction state of the database." 
        }
    },
    "@inherits"             : "Database",
    "@key"                  : 
    { 
        "@type"             : "Random" 
    },
    "label"                 : "xsd:string",
    "comment"               : "xsd:string",
    "creation_date"         : "xsd:dateTime",
    "state"                 : "DatabaseState" 
}
```

### @documentation

Use `@documentation` to add documentation to the class and the property fields of the class. The keywords of the `@documentation` object are `@comment` and `@properties`. See the [Random key](#code-an-example-random-key) example above, for examples of these keywords.

#### @comment

The `@comment` is the class description.

#### @properties

The `@properties` keyword is a JSON object with pairs of the form:

```json
{ 
    "property_1" : "description_1",
    
    ...

    "property_n" : "description_n" 
}
```

### @base

`@base` specifies a prefix to prepare to the `@key`. This prefix is absolute if `@base` is a fully qualified URI, otherwise, it will, in turn, be prefixed by the system-wide `@base` definition. In the example below, the `@base` for the class is fully qualified after the `layer_data` prefix is expanded. This means the layer URIs have the form `terminusdb://layer/data/Layer_` followed by a random string.

#### Code: An example of the @base keyword

```json
{ 
    "@type"            : "@context",
    "@documentation"   : 
    {
        "@title"       : "The Ref schema",
        "@description" : "This is the Ref schema. It gives a specification for storage of references, branches and commits in our commit graph.",
        "@authors"     : 
        [
            "Gavin Mendel-Gleason", 
            "Matthijs van Otterdijk"
        ]
    },
    "@base"            : "terminusdb://ref/data/",
    "@schema"          : "http://terminusdb.com/schema/ref#",
    "layer"            : "http://terminusdb.com/schema/layer#",
    "layer_data"       : "terminusdb://layer/data/",
    "xsd"              : "http://www.w3.org/2001/XMLSchema#" 
}
{ 
    "@id"              : "layer:Layer",
    "@type"            : "Class",
    "@documentation"   : 
    {
        "@comment"     : "A layer object which has the identifier used in storage.",
        "@properties"  : 
        { 
            "layer:identifier" : "The layer identifier." 
        }
    },
    "@base"            : "layer_data:Layer_",
    "@key"             : 
    { 
        "@type"        : "ValueHash" 
    },
    "layer:identifier" : "xsd:string" 
}
```

### @subdocument

<!-- to-do: Is this still correct? (this restriction may be relaxed in the future.) -->

The `@subdocument` key is present with the value `[]` or it is not present. 

A class designated as a sub-document is considered to be completely owned by its containing document. It is not possible to directly update or delete a subdocument, but it must be done through the containing document. Currently, subdocuments **must have a key** that is `Random` or `ValueHash` (this restriction may be relaxed in the future.)

See below for examples of a subdocument declaration in a schema, and a corresponding subdocument.

#### Code: An example subdocument declaration

```json
{ 
    "@type"        : "@context",
    "@base"        : "terminusdb://i/",
    "@schema"      : "terminusdb://s#" 
}
{ 
    "@type"        : "Class",
    "@id"          : "Person",
    "age"          : "xsd:integer",
    "name"         : "xsd:string",
    "address"      : "Address" 
}
{ 
    "@type"        : "Class",
    "@id"          : "Address",
    "@key"         : 
    {
        "@type"    : "Random"
    },
    "@subdocument" : [],
    "country"      : "xsd:string",
    "postal_code"  : "xsd:string",
    "street"       : "xsd:string"
}
```

#### Code: An example subdocument

<!-- to-do: Confirm value Address" missing leading " -->

```json
{ 
    "@type"           : "Person",
    "@id"             : "doug",
    "name"            : "Doug A. Trench",
    "address"         : 
    { 
        "@type"       : "Address",
        "country"     : "Neverlandistan",
        "postal_code" : "3",
        "street"      : "Cool Harbour lane"
    }
}
```

### @abstract

The `@abstract` key is present with the value `[]` or it is not present.

An abstract class has no concrete referents. It provides a common superclass and potentially several properties shared by all of its descendants. Create useful concrete members using the `@inherits` keyword.

An example of the abstract keyword in a schema, and a concrete instance of the `Person` class, but not of the `NamedEntity` class:  

#### Code: An example of the abstract keyword

```json
{ 
    "@type"     : "@context",
    "@base"     : "terminusdb://i/",
    "@schema"   : "terminusdb://s#" 
}
{ 
    "@type"     : "Class",
    "@abstract" : [],
    "@id"       : "NamedEntity",
    "name"      : "xsd:string" 
}
{ 
    "@type"     : "Person",
    "@id"       : "Person",
    "@inherits" : ["NamedEntity"] 
}
```

<!-- to-do: Doug missing leading " -->

```json
{ 
    "@type" : "Person",
    "@id"   : "doug",
    "name"  : "Doug A. Trench" 
}
```

### @inherits

<!-- to-do: Can word "subsumption" be avoided? -->

`@inherits` enables classes to inherit properties (and the `@subdocument` designation) from parent classes. It does **not** inherit key strategies.

This inheritance tree is also available as a `subsumption` relation in the WOQL query language, and provides semantics for **frames** in the **schema API**.

The range of `@inherits` may be a class or a list of classes. For example:

```json
{ 
    ...,

    "@inherits" : "MyClass",

    ... 
}
```
Or

```json
{ 
    ...,

    "@inherits" : 
    [
        "MyFirstClass", "MySecondClass"
    ]

    ... 
}
```

#### Multiple inheritence

Multiple inheritance is allowed as long as all inherited properties of the same name have the same range class. If range classes conflict, the schema check fails. 

An example of inheritance of properties and an object meeting this specification:

#### Code: An example of inheritence

```json
{ 
    "@type"      : "@context",
    "@base"      : "http://i/",
    "@schema"    : "http://s/" 
}
{ 
    "@id"        : "RightHanded",
    "@type"      : "Class",
    "right_hand" : "xsd:string" 
}
{ 
    "@id"        : "LeftHanded",
    "@type"      : "Class",
    "left_hand"  : "xsd:string" 
}
{ 
    "@id"        : "TwoHanded",
    "@type"      : "Class",
    "@inherits"  : 
    [ 
        "RightHanded", "LeftHanded"
    ] 
}
```

```json
{ 
    "@type"      : "TwoHanded",
    "@id"        : "a two-hander",
    "left_hand"  : "Pretty sinister",
    "right_hand" : "But this one is dexterous" 
}
```

## Class properties

All non-keywords are treated as properties of the class, with the form:

```json
<property> : <Class>
```
Or

```json
<property> : { "@type" : <TypeFamily>,  "@class" : <Class> }
```

### Range classes

<!-- to-do: Check if this is correct -->

A range class is a concrete base type defined as any of the xsd types (see XSD), or a class defined in the current schema, including the current class.  

In the example range class below, `first_name` and `last_name` are strings, `year_of_birth` is a year, and `friend` is any number of `Person` objects, in no particular order and without duplication. Also see below [an example of a concrete set of documents](code-an-example-of-a-concrete-set-of-documents) with this form.

#### Code: An example range class

```json
{ 
    "@type"         : "@context",
    "@schema"       : "http://example.com/people#",
    "@base"         : "http://example.com/people/" 
}
{ 
    "@id"           : "Person",
    "@type"         : "Class",
    "@base"         : "Person/",
    "@key"          : 
    { 
        "@type"     : "Lexical",
        "@fields"   : 
        [ 
            "first_name", "last_name" 
        ]
    },
    "first_name"    : "xsd:string",
    "last_name"     : "xsd:string",
    "knows"         : 
    { 
        "@type"     : "Set", 
        "@class"    : "Person"
    },
    "year_of_birth" : "xsd:gYear" 
}
```

<!-- to-do: Check missing ":" and year of birth value (formerly "year_of_birth" "-245") -->

#### Code: An example of a concrete set of documents 

```json
{ 
    "@type"         : "Person",
    "@id"           : "Person/Hasdrubal_Barca",
    "first_name"    : "Hasdrubal",
    "last_name"     : "Barca",
    "knows"         :  
    [
        "Person/Imilce_Barca",
        "Person/Hannibal_Barca"
    ],
    "year_of_birth" : "-245"
}
{ 
    "@type"         : "Person",
    "@id"           : "Person/Imilce_Barca",
    "first_name"    : "Imilce",
    "last_name"     : "Barca",
    "knows"         :  
    [
        "Person/Hasdrupal_Barca",
        "Person/Hannibal_Barca"
    ],
    "year_of_birth" : "-255" 
}
{ 
    "@type"         : "Person",
    "@id"           : "Person/Hannibal_Barca",
    "first_name"    : "Hannibal",
    "last_name"     : "Barca",
    "knows"         : 
    [
        "Person/Imilce_Barca","Person/Hannibal_Barca"
    ],
    "year_of_birth" : "-247" 
}
```

## Type families

Use type families to construct optionality or collections of values. Type families are `List`, `Set`, `Array`, and `Optional`.

### Optional

Use `Optional` as a type family where a property is not required.

#### Code: An example of type family Optional

```json
{ 
    "@type"      : "@context",
    "@schema"    : "http://example.com/people#",
    "@base"      : "http://example.com/people/" }

{ 
    "@type"      : "Class",
    "@id"        : "CodeBlock",
    "code"       : "xsd:string",
    "comment"    : 
    { 
        "@type"  : "Optional",
        "@class" : "xsd:string" 
    }
}
```

Supply an optional `comment` field in `CodeBlock`. Both of the following documents are valid:

```json
{ 
    "@type"   : "CodeBlock",
    "@id"     : "my_code_block",
    "code"    : "print('hello world')",
    "comment" : "This is a silly bit of code" 
}
```

OR

```json
{ 
    "@type" : "CodeBlock",
    "@id"   : "my_code_block",
    "code"  : "print('hello world')" 
}
```

### List

Use `List` to specify an ordered collection, with multiplicity, of values of a class or datatype.

#### Code: An example of type family List

```json
{ 
    "@type"      : "@context",
    "@base"      : "http://i/",
    "@schema"    : "http://s/" 
}
{ 
    "@id"        : "TaskList",
    "@type"      : "Class",
    "tasks"      : 
    { 
        "@type"  : "List",
        "@class" : "Task"
    } 
}
{
    "@id"        : "Task",
    "@type"      : "Class",
    "@key"       : "ValueHash",
    "name"       : "xsd:string" 
}
```

An example of an object `Task` contained in a `List` of elements known as a `TaskList`. This list is retrieved in the same order that it is inserted. It is also capable of storing duplicates.

```json
{ 
    "@id"   : "my_task_list",
    "@type" : "TaskList",
    "tasks" : 
    [
        {     
            "@type" : "Task", 
            "name"  : "Laundry" 
        },
        { 
            "@type" : "Task", 
            "name"  : "Take_Garage_Out" 
        }
    ]
}
```

### Set

Use `Set` to specify an unordered set of values of a class or datatype.

#### Code: An example of type family Set

```json
{ 
    "@type"      : "@context",
    "@base"      : "http://i/",
    "@schema"    : "http://s/" 
}
{ 
    "@id"        : "Person",
    "@type"      : "Class",
    "name"       : "xsd:string",
    "friends"    : 
    { 
        "@type"  : "Set",
        "@class" : "Person" 
    }
}
```

An example of an object `Person` that can have 0 to any number of friends. This list has no order and is retrieved from the database in a potentially different order. Inserted duplicates do not create additional linkages and only a single of the multiple supplied results are returned.

<!-- to-do: escape character in @id removed -->

```json
{ 
    "@id"           : "Me",
    "@type"         : "Person",
    "friends"       : 
    [
        { 
            "@type" : "Person",
            "@id"   : "you",
            "name"  : "You" 
        },
        { 
            "@type" : "Person",
            "@id"   : "someone_else",
            "name"  : "Someone Else"
        }
    ]
}
```
<!-- to-do: Type family Array is missing -->
