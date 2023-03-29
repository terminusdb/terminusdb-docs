# WOQL Query Basics

WOQL is a powerful query language that enables you to concisely query complex data patterns and structures. WOQL is based on a small set of simple concepts making it easy to use. There are just three fundamental concepts to WOQL - [WOQL triples](woql-query-basics.md#woql-triples), [WOQL variables](woql-query-basics.md#woql-variables) and **WOQL operators** as illustrated in Diagram: The three core WOQL concepts.

#### Diagram: The three core WOQL concepts

![](../../img/diagrams/terminusdb-woql-concepts.png)

## WOQL triples

In TerminusDB and TerminusCMS, every particle or piece of information, including objects and documents, is stored and accessed as collections of triples. All objects are broken down deterministically, or reliably, into a precise set of triples. Also, Terminus products adhere to the **RDF** standard, ensuring triples have a standardized structure and interpretation. This means you can write queries based on the data patterns you are interested in, without requiring knowledge of low-level data structures such as tables and columns.

### The structure of a triple

* A triple is a simple data structure with three positions, often rendered as _subject_, _predicate_, _object_.
* You can assign any meaning/definition/terminology to each position, however, all positions can be _nodes_ represented by an [IRI](https://de.wikipedia.org/wiki/Internationalized\_Resource\_Identifier), but the value position can also be a data type.
* In TerminusDB terminology, slots are defined as: `subject-id`, `property`, followed by `objectid` or `value`.

#### Table: Examples of triples

| Example | Object-id | Property        | Value        | Interpretation                               |
| ------- | --------- | --------------- | ------------ | -------------------------------------------- |
| 1       | `jake`    | `date-of-birth` | `1935-01-01` | Jake's date of birth is 01-jan-1935          |
| 2       | `jake`    | `parent`        | `mary`       | Jake's mother is Mary                        |
| 3       | `mary`    | `date-of-birth` | `1935-01-01` | Jake's mother's date of birth is 01-jan-1900 |

### Triple interpretation

Every triple with the same `subject-id` is interpreted as being related to the same object, entity, or _thing_. This is how TerminusDB holds information about all things.

### Triple relationships

As shown in Example# 2 above, the object position can hold another id. This is how data relationships are defined in TerminusDB.

## WOQL variables

WOQL stores query results in variables. WOQL variables can be declared with by starting a string with the prefix `v:`, such as with `v:person-id` or by using a `Vars` declaration, such as `Vars('person-id')`.

### WOQL variables in triples

As per the variable triple patterns listed below, a triple may consist of one, two, or three WOQL variables. When using a variable in a triple query, TerminusDB will retrieve all data, into that variable, that are relevant to the variable's position in the triple.

* A **single variable triple pattern** consists of one WOQL variable in any one triple slot.
* A **two-variable triple pattern** consists of two variables in any two slots.
* A **three-variable triple pattern** consists of variables in all three slots.

### Single variable triple pattern

Examples of a single WOQL variable in a triple slot.

#### Code: WOQL var in triple slot 1.

**Description:**

Select every `subject-id` into `v:person-id` where the `property` `date-of-birth` has the `value` `1935-01-01`

**Interpretation:**

Select every person born on `1935-01-01`.

```javascript
let v = Vars('person_id');
triple(v.person_id, 'date-of-birth', WOQL.date('1935-01-01'))
```

Note that we must explicitly mark Date as being a value object, to make sure we do not interpret it as a node.

#### Code: WOQL var in triple slot 2.

**Description:**

Select every `property` into `v:property-list` where `object-id` `jake` has the `value` `10`.

**Interpretation:**

Select all of Jake's properties with the `value` `10`.

```javascript
let v = Vars('property');
triple('jake', v.property, 10)
```

#### Code: WOQL var in triple slot 3.

**Description:**

Select every `value` into `v:jakes-parent` where `object-id` `jake` has the `value` `parent`.

**Interpretation:**

Select Jake's parents.

```javascript
let v = Vars('jakes_parent');
triple('jake', 'parent', v.jakes_parent)
```

### Two-variable triple pattern

Examples of two WOQL variables in all combinations are listed below.

* Positions 1 and 2
* Positions 1 and 3
* Positions 2 and 3

#### Code: WOQL vars in triple slots 1 and 2.

Select every `subject-id` and `property` into variables `subject` and `property` respectively with the value `10`.

```javascript
let v = Vars('subject','property');
triple(v.subject, v.property, 10)
```

#### Code: WOQL vars in triple slots 1 and 3.

Select every `subject-id` and `object value` into varibles `subject` and `date_of_birth` such that the property is `date-born`.

```javascript
let v = Vars(subject', 'date_of_birth');
triple(v.subject, 'date-born', v.date_of_birth)
```

#### Code: WOQL vars in triple slots 2 and 3.

Select every `object-id` and `property` into varibles `joe-property` and `property-value` respectively using a `subject-id` of `joe`.

```javascript
let v = Vars('joe_property', 'property_value');
WOQL.triple('joe', v.joe_properties, v.property_value)
```

### Three-variable triple pattern

Select every triple.

#### Code: WOQL vars

```javascript
let v = Vars('x','y','z');
triple(v.x,v.y,v.z)
```

## WOQL operators

Query expressions using single triple pattern matching only are simple but limited. WOQL provides logical operators enabling you to combine multiple patterns into sophisticated queries with simple syntax \*\*\*\* using various operators.

We will demonstrate these operators with the following schema and database.

Schema:

```json
{ "@type" : "Class",
  "@id" : "Person",
  "name" : "xsd:string",
  "dob" : "xsd:date",
  "friend" : { "@type" : "Set", "@class", "Person" }}
```

Documents:

```json
[{ "name" : "Jane",
   "dob" : "1980-02-05",
   "friend" : ["John", "Kim"]},
 { "name" : "Kim",
   "dob" : "1982-03-02",
   "friend" : ["Jane"]}
 { "name" : "John",
   "dob" : "1979-05-12",
   "friend" : ["Jim"]},
 { "name" : "Jim",
   "dob" : "1983-01-15",
   "friend" : ["Kim", "John"]}]
```

### WOQL `and`

To look for every person who is friends with someone named "Jane", we can write:

```javascript
let v = Vars('person1', 'name1', 'person2');
select(v.name1,
   and(triple(v.person1, 'name', v.name1),
       triple(v.person1, 'friend', v.person2),
       triple(v.person2, 'name', string('Jane'))))
```

This query connects `person1` with `person2` via the `friend` relationship. We recover the name of the original person:

| name1 |
| ----- |
| Kim   |

Notice, we use the `select` to limit our results to only the variable of interest.

### WOQL `or`

TO find every person who is friends with 'Jane', or 'Kim', we can write:

```javascript
let v = Vars('person1', 'name1', 'person2');
select(v.name1,
   and(or(triple(v.person2, 'name', string('Jane')),
          triple(v.person2, 'name', string('Kim'))),
      triple(v.person1, 'friend', v.person2)
      triple(v.person1, 'name', v.name1)))
```

The `or` operator allows you to combine results form multiple multiple paths. Notice, that we looked up the two people `Jane` and `Kim` first, and then recover the person of interests afterwords. Logically this can also be done in the reverse order:

```javascript
let v = Vars('person1', 'name1', 'person2');
select(v.name1,
   and(triple(v.person1, 'name', v.name1),
       triple(v.person1, 'friend', v.person2),
       or(triple(v.person2, 'name', string('Jane')),
          triple(v.person2, 'name', string('Kim')))))
```

However, the former query will likely be faster since we are starting with only two possibilities.

### WOQL `order_by`

If we would like to get the people from our database in order of birthdate, we can use `order_by`

```javascript
let v = Vars('name', 'person', 'dob');
select(v.name, v.dob,
   order_by([v.dob,'asc'],
       and(triple(v.person, 'name', v.name),
           triple(v.person, 'dob', v.dob))))
```

The results will be a table of name and date of birth, with ascending order for the date of birth. To sort in the reverse order:

```javascript
let v = Vars('name', 'person', 'dob');
select(v.name, v.dob,
   order_by([v.dob,'desc'],
       and(triple(v.person, 'name', v.name),
           triple(v.person, 'dob', v.dob))))
```

## WOQL mathematical operators

WOQL provides several math operators for data entry and retrieval. The Python Client documentation has the full list of math operators. WOQL math operators include `plus`, `multiply`, `times`, `divide`, `exp`, and `div` (for integer division.)

### Using WOQL math operators

To use a WOQL math operator, encapsulate it in `WOQL.eval` shown in the examples below. Use variables for holding the values in all math operators.

#### Code: WOQL plus math operator

Bind the value of `1` `plus` `2` to the variable `x`. The variable `x` is reusable in later queries.

```javascript
let v = Vars('x');
WOQL.eval(plus(1, 2), v.x)

// Result x = 3
```

#### Code: WOQL times and div math operators

Bind the value of `3` `times` `2` to the variable `product` `and` bind the value of `product` divided by (`div`) `2` to the variable `result`.

```javascript
let v = Vars('product', 'result');
and
(
    WOQL.eval(times(3, 2), v.product),
    WOQL.eval(div(v.product, 2), v.result)
)

/** Results

    | product | result |
    | ------- | ------ |
    | 6       | 3      |
*/
```

## WOQL in JSON-LD format

WOQL queries are converted to the JSON-LD document format for transmission over the network. You can access the JSON-LD format for a query in JavaScript or Python as follows. Refer to the WOQL JSON-LD Reference for a full list of WOQL JSON-LD classes.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
let jsonld = query.json()
```
{% endtab %}

{% tab title="Python" %}
```python
jsonld = WOQLQuery().dict()
```
{% endtab %}
{% endtabs %}

## Further Reading

[**JavaScript WOQL Query**](../../guides/reference-guides/javascript-client-reference/woql.md)

[**Python WOQL Query**](../../guides/reference-guides/python-client-reference/terminusdb\_client.woqlquery.md)

[**WOQL Class Reference**](../../guides/reference-guides/woql-class.md)

[**WOQL Explanation**](../woql.md)
