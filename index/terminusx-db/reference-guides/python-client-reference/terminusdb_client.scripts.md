# terminusdb_client.scripts package

## Submodules

## terminusdb_client.scripts.schema_template module

Title: This is an Example
Description: Example to show how schema works
Authors: TerminusDB, Cheuk


### _class_ terminusdb_client.scripts.schema_template.Country(\*args, \*\*kwargs)
Bases: [`DocumentTemplate`](terminusdb_client.schema.md#terminusdb_client.schema.schema.DocumentTemplate)

This is Country.

Country is a class object in the schema. It’s class attributes will be the properties of the object. Therefore, a Country object will have a name which is string and a list of alias names that is called ‘also_know_as’


#### name(_: st_ )

#### also_know_as(_: List[str_ )

#### \__init__(\*args, \*\*kwargs)

### _class_ terminusdb_client.scripts.schema_template.Address(\*args, \*\*kwargs)
Bases: [`DocumentTemplate`](terminusdb_client.schema.md#terminusdb_client.schema.schema.DocumentTemplate)

This is address


#### street(_: st_ )

#### postal_code(_: st_ )

#### country(_: Countr_ )

#### \__init__(\*args, \*\*kwargs)

### _class_ terminusdb_client.scripts.schema_template.Person(\*args, \*\*kwargs)
Bases: [`DocumentTemplate`](terminusdb_client.schema.md#terminusdb_client.schema.schema.DocumentTemplate)

This is a person

Can store the explanation to the attributes in the docstring. Docstrings needs to be in numpydoc format.


#### name()
Name of the person.


* **Type**

    str



#### age()
Age of the person.


* **Type**

    int



#### name(_: st_ )

#### age(_: in_ )

#### friend_of(_: Set[Person_ )

#### \__init__(\*args, \*\*kwargs)

### _class_ terminusdb_client.scripts.schema_template.Employee(\*args, \*\*kwargs)
Bases: `Person`

Employee will inherits the attributes from Person


#### address_of(_: Addres_ )

#### contact_number(_: Optional[str_ )

#### managed_by(_: Employe_ )

#### \__init__(\*args, \*\*kwargs)

### _class_ terminusdb_client.scripts.schema_template.Coordinate(\*args, \*\*kwargs)
Bases: [`DocumentTemplate`](terminusdb_client.schema.md#terminusdb_client.schema.schema.DocumentTemplate)


#### x(_: floa_ )

#### y(_: floa_ )

#### \__init__(\*args, \*\*kwargs)

### _class_ terminusdb_client.scripts.schema_template.Location(\*args, \*\*kwargs)
Bases: `Address`, `Coordinate`

Location is inherits from Address and Coordinate

Class can have multiple inheritance. It will inherits both the attibutes from Address and Coordinate.


#### name(_: st_ )

#### \__init__(\*args, \*\*kwargs)

### _class_ terminusdb_client.scripts.schema_template.Team(value)
Bases: [`EnumTemplate`](terminusdb_client.schema.md#terminusdb_client.schema.schema.EnumTemplate)

This is an example for Enum, if a value is not provided, the name of the Enum (e.g. Marketing) will be used as the value.


#### IT(_ = 'Information Technology_ )

#### Marketing(_ = 'Marketing_ )

### _class_ terminusdb_client.scripts.schema_template.Contact(\*args, \*\*kwargs)
Bases: [`TaggedUnion`](terminusdb_client.schema.md#terminusdb_client.schema.schema.TaggedUnion)

TaggedUnion allow options for types


#### local_number(_: in_ )

#### international(_: st_ )

#### \__init__(\*args, \*\*kwargs)
## terminusdb_client.scripts.scripts module

## Module contents
