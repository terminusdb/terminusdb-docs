# terminusdb_client.scripts package

## Submodules

## terminusdb_client.scripts.schema_template module

Title: This is an Example
Description: Example to show how schema works
Authors: TerminusDB, Cheuk


## class terminusdb_client.scripts.schema_template.Country(\*args, \*\*kwargs)
**Bases:** [`DocumentTemplate`](terminusdb_client.schema.md#terminusdb_client.schema.schema.DocumentTemplate)

This is Country.

Country is a class object in the schema. It’s class attributes will be the properties of the object. Therefore, a Country object will have a name which is string and a list of alias names that is called ‘also_know_as’


### name(_: st'

### also_know_as(_: List[str'

### __init__(\*args, \*\*kwargs)

## class terminusdb_client.scripts.schema_template.Address(\*args, \*\*kwargs)
**Bases:** [`DocumentTemplate`](terminusdb_client.schema.md#terminusdb_client.schema.schema.DocumentTemplate)

This is address


### street(_: st'

### postal_code(_: st'

### country(_: Countr'

### __init__(\*args, \*\*kwargs)

## class terminusdb_client.scripts.schema_template.Person(\*args, \*\*kwargs)
**Bases:** [`DocumentTemplate`](terminusdb_client.schema.md#terminusdb_client.schema.schema.DocumentTemplate)

This is a person

Can store the explanation to the attributes in the docstring. Docstrings needs to be in numpydoc format.


### name()
Name of the person.


**Type**

`str`



### age()
Age of the person.


**Type**

int



### name(_: st'

### age(_: in'

### friend_of(_: Set[Person'

### __init__(\*args, \*\*kwargs)

## class terminusdb_client.scripts.schema_template.Employee(\*args, \*\*kwargs)
**Bases:** `Person`

Employee will inherits the attributes from Person


### address_of(_: Addres'

### contact_number(_: Optional[str'

### managed_by(_: Employe'

### __init__(\*args, \*\*kwargs)

## class terminusdb_client.scripts.schema_template.Coordinate(\*args, \*\*kwargs)
**Bases:** [`DocumentTemplate`](terminusdb_client.schema.md#terminusdb_client.schema.schema.DocumentTemplate)


### x(_: floa'

### y(_: floa'

### __init__(\*args, \*\*kwargs)

## class terminusdb_client.scripts.schema_template.Location(\*args, \*\*kwargs)
**Bases:** `Address`, `Coordinate`

Location is inherits from Address and Coordinate

Class can have multiple inheritance. It will inherits both the attibutes from Address and Coordinate.


### name(_: st'

### __init__(\*args, \*\*kwargs)

## class terminusdb_client.scripts.schema_template.Team(value)
**Bases:** [`EnumTemplate`](terminusdb_client.schema.md#terminusdb_client.schema.schema.EnumTemplate)

This is an example for Enum, if a value is not provided, the name of the Enum (e.g. Marketing) will be used as the value.


### IT(_ = 'Information Technology'

### Marketing(_ = 'Marketing'

## class terminusdb_client.scripts.schema_template.Contact(\*args, \*\*kwargs)
**Bases:** [`TaggedUnion`](terminusdb_client.schema.md#terminusdb_client.schema.schema.TaggedUnion)

TaggedUnion allow options for types


### local_number(_: in'

### international(_: st'

### __init__(\*args, \*\*kwargs)
## terminusdb_client.scripts.scripts module

## Module contents

