<a id="scripts.schema_template"></a>

# scripts.schema\_template

Title: This is an Example
Description: Example to show how schema works
Authors: TerminusDB, Cheuk

<a id="scripts.schema_template.Country"></a>

# Country Objects

```python
class Country(DocumentTemplate)
```

This is Country.

Country is a class object in the schema. It's class attributes will be the properties of the object. Therefore, a Country object will have a name which is string and a list of alias names that is called 'also_know_as'

<a id="scripts.schema_template.Address"></a>

# Address Objects

```python
class Address(DocumentTemplate)
```

This is address

<a id="scripts.schema_template.Person"></a>

# Person Objects

```python
class Person(DocumentTemplate)
```

This is a person

Can store the explanation to the attributes in the docstring. Docstrings needs to be in numpydoc format.

**Arguments**:

- `name` (`str`): Name of the person.
- `age` (`int`): Age of the person.

<a id="scripts.schema_template.Employee"></a>

# Employee Objects

```python
class Employee(Person)
```

Employee will inherits the attributes from Person

<a id="scripts.schema_template.Location"></a>

# Location Objects

```python
class Location(Address, Coordinate)
```

Location is inherits from Address and Coordinate

Class can have multiple inheritance. It will inherits both the attibutes from Address and Coordinate.

<a id="scripts.schema_template.Team"></a>

# Team Objects

```python
class Team(EnumTemplate)
```

This is an example for Enum, if a value is not provided, the name of the Enum (e.g. Marketing) will be used as the value.

<a id="scripts.schema_template.Contact"></a>

# Contact Objects

```python
class Contact(TaggedUnion)
```

TaggedUnion allow options for types

