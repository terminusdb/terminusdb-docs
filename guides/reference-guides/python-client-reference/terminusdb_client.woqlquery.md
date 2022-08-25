<a id="terminusdb_client.woqlquery"></a>

# terminusdb\_client.woqlquery

<a id="terminusdb_client.woqlquery.woql_core"></a>

# terminusdb\_client.woqlquery.woql\_core

<a id="terminusdb_client.woqlquery.woql_query"></a>

# terminusdb\_client.woqlquery.woql\_query

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery"></a>

## WOQLQuery Objects

```python
class WOQLQuery()
```

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.__init__"></a>

#### \_\_init\_\_

```python
def __init__(query=None, graph="schema")
```

defines the internal functions of the woql query object - the language API is defined in WOQLQuery

**Arguments**:

- `query` (`dict`): json-ld query for initialisation
- `graph` (`str`): graph that this query is appled to, default to be schema/main

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.__add__"></a>

#### \_\_add\_\_

```python
def __add__(other)
```

Creates a logical AND with the argument passed, for WOQLQueries.

**Arguments**:

- `other` (`WOQLQuery object`): None

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.__and__"></a>

#### \_\_and\_\_

```python
def __and__(other)
```

Creates a logical AND with the argument passed, for WOQLQueries.

**Arguments**:

- `other` (`WOQLQuery object`): None

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.__or__"></a>

#### \_\_or\_\_

```python
def __or__(other)
```

Creates a logical OR with the argument passed, for WOQLQueries.

**Arguments**:

- `other` (`WOQLQuery object`): None

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.__invert__"></a>

#### \_\_invert\_\_

```python
def __invert__()
```

Creates a logical Not with the argument passed, for WOQLQueries.

**Arguments**:

- `other` (`WOQLQuery object`): None

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.execute"></a>

#### execute

```python
def execute(client, commit_msg=None, file_dict=None)
```

Executes the query using the passed client to connect to a server

**Arguments**:

- `client` (`Client object`): client that provide connection to the database for the query to execute.
- `commit_msg` (`str`): optional, commit message for this query. Recommended for query that carrries an update.
- `file_dict` (``): File dictionary to be associated with post name => filename, for multipart POST

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.to_json"></a>

#### to\_json

```python
def to_json()
```

Dumps the JSON-LD format of the query in a json string

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.from_json"></a>

#### from\_json

```python
def from_json(input_json)
```

Set a query from a JSON-LD json string

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.to_dict"></a>

#### to\_dict

```python
def to_dict()
```

Give the dictionary that represents the query in JSON-LD format.

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.from_dict"></a>

#### from\_dict

```python
def from_dict(dictdata)
```

Set a query from a dictionary that represents the query in JSON-LD format.

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.load_vocabulary"></a>

#### load\_vocabulary

```python
def load_vocabulary(client)
```

Queries the schema graph and loads all the ids found there as vocabulary that can be used without prefixes
ignoring blank node ids

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.using"></a>

#### using

```python
def using(collection, subq=None)
```

Use a specific data product for the enclosed query

**Arguments**:

- `collection` (`str`): the name of the data product

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.comment"></a>

#### comment

```python
def comment(comment, subq=None)
```

Adds a text comment to a query - can also be used to wrap any part of a query to turn it off

**Arguments**:

- `comment` (`str`): text comment

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.select"></a>

#### select

```python
def select(*args)
```

Filters the query so that only the variables included in [V1...Vn] are returned in the bindings

**Arguments**:

- `args`: only these variables are returned

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.distinct"></a>

#### distinct

```python
def distinct(*args)
```

Ensures that the solutions for the variables [V1...Vn] are distinct

**Arguments**:

- `args`: The variables to make distinct with the final argument being a query.

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.woql_and"></a>

#### woql\_and

```python
def woql_and(*args)
```

Creates a logical AND of the arguments

Commonly used to combine WOQLQueries.

**Arguments**:

- `args` (`WOQLQuery objects`): None

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.woql_or"></a>

#### woql\_or

```python
def woql_or(*args)
```

Creates a logical OR of the arguments

**Arguments**:

- `args` (`WOQLQuery objects`): None

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.woql_from"></a>

#### woql\_from

```python
def woql_from(graph, query=None)
```

Specifies the database URL that will be the default database for the enclosed query

**Arguments**:

- `graph` (`str`): url of the database
- `query` (`WOQLQuery object`): None

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.into"></a>

#### into

```python
def into(graph_descriptor, query)
```

Sets the current output graph for writing output to.

**Arguments**:

- `graph_descriptor` (`str`): output graph
- `query` (`WOQLQuery object`): None

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.triple"></a>

#### triple

```python
def triple(sub, pred, obj, opt=False)
```

Creates a triple pattern matching rule for the triple [S, P, O] (Subject, Predicate, Object)

**Arguments**:

- `sub` (`str`): Subject, has to be a node (URI)
- `pred` (`str`): Predicate, can be variable (prefix with "v:") or node
- `obj` (`str`): Object, can be variable or node or value
- `opt` (`bool`): weather or not this triple is optional, default to be False

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.added_triple"></a>

#### added\_triple

```python
def added_triple(sub, pred, obj, opt=False)
```

Creates a triple pattern matching rule for the triple [S, P, O] (Subject, Predicate, Object) added to the current commit.

**Arguments**:

- `sub` (`str`): Subject
- `pred` (`str`): Predicate
- `obj` (`str`): Object
- `opt` (`bool`): weather or not this triple is optional, default to be False

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.removed_triple"></a>

#### removed\_triple

```python
def removed_triple(sub, pred, obj, opt=False)
```

Creates a triple pattern matching rule for the triple [S, P, O] (Subject, Predicate, Object) added to the current commit.

**Arguments**:

- `sub` (`str`): Subject
- `pred` (`str`): Predicate
- `obj` (`str`): Object
- `opt` (`bool`): weather or not this triple is optional, default to be False

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.quad"></a>

#### quad

```python
def quad(sub, pred, obj, graph, opt=False)
```

Creates a pattern matching rule for the quad [S, P, O, G] (Subject, Predicate, Object, Graph)

**Arguments**:

- `sub` (`str`): Subject
- `pre` (`str`): Predicate
- `obj` (`str`): Object
- `gra` (`str`): Graph
- `opt` (`bool`): weather or not this quad is optional, default to be False

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.added_quad"></a>

#### added\_quad

```python
def added_quad(sub, pred, obj, graph, opt=False)
```

Creates a pattern matching rule for the quad [S, P, O, G] (Subject, Predicate, Object, Graph) added to the current commit.

**Arguments**:

- `sub` (`str`): Subject
- `pre` (`str`): Predicate
- `obj` (`str`): Object
- `gra` (`str`): Graph
- `opt` (`bool`): weather or not this quad is optional, default to be False

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.removed_quad"></a>

#### removed\_quad

```python
def removed_quad(sub, pred, obj, graph, opt=False)
```

Creates a pattern matching rule for the quad [S, P, O, G] (Subject, Predicate, Object, Graph) added to the current commit.

**Arguments**:

- `sub` (`str`): Subject
- `pre` (`str`): Predicate
- `obj` (`str`): Object
- `gra` (`str`): Graph
- `opt` (`bool`): weather or not this quad is optional, default to be False

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.string"></a>

#### string

```python
def string(input_str)
```

Transforms the given string into the proper json-ld form

**Arguments**:

- `input_str` (`str`): the given input string

**Returns**:

`dict`: 

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.boolean"></a>

#### boolean

```python
def boolean(input_bool)
```

Transforms the given bool object into the proper json-ld form

**Arguments**:

- `input_bool` (`bool`): the given input string

**Returns**:

`dict`: 

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.datetime"></a>

#### datetime

```python
def datetime(input_obj)
```

Transforms the given datetime object into the proper json-ld form

**Arguments**:

- `input_obj` (`str`): the given input dateTime object

**Returns**:

`dict`: 

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.sub"></a>

#### sub

```python
def sub(parent, child)
```

Returns true if child is a sub-class of parent, according to the current DB schema

**Arguments**:

- `parent` (`str`): the parent class to be checked
- `child` (`str`): the child class to be checked

**Returns**:

`bool`: 

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.eq"></a>

#### eq

```python
def eq(left, right)
```

Matches if a is equal to b

**Arguments**:

- `left` (`str`): object in the graph
- `right` (`str`): object in the graph

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.update_document"></a>

#### update\_document

```python
def update_document(docjson, json_or_iri=None)
```

Update a document in the database

**Arguments**:

- `docjson` (`JSON`): object to be updated
- `json_or_iri` (`str`): the output ID, or a JSON to compare the ID against

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.insert_document"></a>

#### insert\_document

```python
def insert_document(docjson, json_or_iri=None)
```

Insert a document into the database

**Arguments**:

- `docjson` (`JSON`): object to be inserted
- `json_or_iri` (`str`): the output ID, or a JSON to compare the ID against

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.delete_document"></a>

#### delete\_document

```python
def delete_document(json_or_iri)
```

Delete a document into the database

**Arguments**:

- `docjson` (`JSON`): object to be deleted
- `json_or_iri` (`str`): the output ID, or a JSON to compare the ID against

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.read_document"></a>

#### read\_document

```python
def read_document(iri, output_var)
```

Read a document from the database

Parameters
----------
iri : str
    object to be deleted
output_var : str
    the document as JSON
Returns
-------
WOQLQuery object
    query object that can be chained and/or execute
Example
-------
>>> query = (WOQLQuery().triple('v:TermId', 'rdf:type', '@schema:Term') &
             WOQLQuery().triple('v:TermCountId','term','v:TermId') &
             WOQLQuery().triple('v:DocumentId', 'terms', 'v:TermCountId') &
             WOQLQuery().read_document('v:TermId','v:TermDoc'))


<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.get"></a>

#### get

```python
def get(as_vars, query_resource=None)
```

Takes an as structure

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.put"></a>

#### put

```python
def put(as_vars, query, query_resource=None)
```

Takes an array of variables, an optional array of column names

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.file"></a>

#### file

```python
def file(fpath, opts=None)
```

Provides details of a file source in a JSON format that includes a URL property

**Arguments**:

- `fpath` (`dict`): file data source in a JSON format
- `opts` (`input options`): optional

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.once"></a>

#### once

```python
def once(query=None)
```

Obtains only one result from subquery

**Arguments**:

- `query` (`WOQLQuery object`): None
- `Returns`: None
- `----------`: None
- `WOQLQuery object`: query object that can be chained and/or executed

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.remote"></a>

#### remote

```python
def remote(uri, opts=None)
```

Provides details of a remote data source in a JSON format that includes a URL property

**Arguments**:

- `uri` (`str`): remote data source
- `opts` (`input options`): optional

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.delete_triple"></a>

#### delete\_triple

```python
def delete_triple(subject, predicate, object_or_literal)
```

Deletes any triples that match the rule [subject, predicate, object]

**Arguments**:

- `subject` (`str`): Subject
- `predicate` (`str`): Predicate
- `object_or_literal` (`str`): Object or Literal

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.add_triple"></a>

#### add\_triple

```python
def add_triple(subject, predicate, object_or_literal)
```

Adds triples according to the the pattern [subject, predicate, object]

**Arguments**:

- `subject` (`str`): Subject
- `predicate` (`str`): Predicate
- `object_or_literal` (`str`): Object or Literal

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.delete_quad"></a>

#### delete\_quad

```python
def delete_quad(subject, predicate, object_or_literal, graph=None)
```

Deletes any quads that match the rule [subject, predicate, object, graph]

**Arguments**:

- `subject` (`str`): Subject
- `predicate` (`str`): Predicate
- `object_or_literal` (`str`): Object or Literal
- `graph` (`str`): Graph

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.add_quad"></a>

#### add\_quad

```python
def add_quad(subject, predicate, object_or_literal, graph)
```

Adds quads according to the pattern [subject, predicate, object, graph]

**Arguments**:

- `subject` (`str`): Subject
- `predicate` (`str`): Predicate
- `object_or_literal` (`str`): Object or Literal
- `graph` (`str`): Graph

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.trim"></a>

#### trim

```python
def trim(untrimmed, trimmed)
```

A trimmed version of untrimmed (with leading and trailing whitespace removed) is copied into trimmed

**Arguments**:

- `untrimmed` (`str`): original string
- `trimmed` (`str`): WOQL varible storing the result string

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.eval"></a>

#### eval

```python
def eval(arith, res)
```

Evaluates the Arithmetic Expression Arith and copies the output to variable V

**Arguments**:

- `arith` (`WOQLQuery or dict`): query or JSON-LD representing the query
- `res` (`str`): output variable

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.plus"></a>

#### plus

```python
def plus(*args)
```

Adds numbers N1...Nn together

**Arguments**:

- `args` (`int or float`): numbers to add together

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.minus"></a>

#### minus

```python
def minus(*args)
```

Adds numbers N1...Nn together

**Arguments**:

- `args` (`int or float`): numbers to add together

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.times"></a>

#### times

```python
def times(*args)
```

Multiplies numbers N1...Nn together

**Arguments**:

- `args` (`int or float`): numbers to be multiplied

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.divide"></a>

#### divide

```python
def divide(*args)
```

Divides numbers N1...Nn by each other left, to right precedence

**Arguments**:

- `args` (`int or float`): numbers to be divided

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.div"></a>

#### div

```python
def div(*args)
```

Division - integer division - args are divided left to right

**Arguments**:

- `args` (`int or float`): numbers for division

**Returns**:

`WOQLQuery`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.exp"></a>

#### exp

```python
def exp(first, second)
```

Raises A to the power of B

**Arguments**:

- `first` (`int or float`): base number
- `second` (`int or float`): power of

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.floor"></a>

#### floor

```python
def floor(user_input)
```

The floor function of a real number x denotes the greatest integer less than or equal to x.

**Arguments**:

- `user_input` (`int or float`): number whose floor needs to be calculated

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.isa"></a>

#### isa

```python
def isa(element, of_type)
```

Matches if element is a member of a certain type, according to the current state of the DB

**Arguments**:

- `element` (`str`): element to be checked
- `of_type` (`str`): type to be checked

**Returns**:

`bool`: 

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.like"></a>

#### like

```python
def like(left, right, dist)
```

Matches left string to right string with a distance

**Arguments**:

- `left` (`str`): first string to compare
- `right` (`str`): second string to compare
- `dist` (`str`): Hamming distance between left and right

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.less"></a>

#### less

```python
def less(left, right)
```

Compares the value of v1 against v2 and returns true if v1 is less than v2

**Arguments**:

- `left` (`str`): first variable to compare
- `right` (`str`): second variable to compare

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.greater"></a>

#### greater

```python
def greater(left, right)
```

Compares the value of v1 against v2 and returns true if v1 is greater than v2

**Arguments**:

- `left` (`str`): first variable to compare
- `right` (`str`): second variable to compare

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.opt"></a>

#### opt

```python
def opt(query=None)
```

The Query in the Optional argument is specified as optional

**Arguments**:

- `query` (`WOQLQuery object`): None

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.unique"></a>

#### unique

```python
def unique(prefix, key_list, uri)
```

Generates an ID for a node as a function of the passed VariableList with a specific prefix (URL base)(A.K.A Hashing) If the values of the passed variables are the same, the output will be the same

**Arguments**:

- `prefix` (`str`): prefix for the id
- `key_list` (`str`): variable to generate id for
- `uri` (`str`): the variable to hold the id

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.idgen"></a>

#### idgen

```python
def idgen(prefix, input_var_list, output_var)
```

Generates an ID for a node as a function of the passed VariableList with a specific prefix (URL base). If the values of the passed variables are the same, the output will be the same

**Arguments**:

- `prefix` (`str`): prefix for the id
- `input_var_list` (`str or list`): variable to generate id for
- `output_var` (`str`): the variable to hold the id

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.random_idgen"></a>

#### random\_idgen

```python
def random_idgen(prefix, key_list, uri)
```

Randomly generates an ID and appends to the end of the key_list.

**Arguments**:

- `prefix` (`str`): prefix for the id
- `key_list` (`str`): variable to generate id for
- `uri` (`str`): the variable to hold the id

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.upper"></a>

#### upper

```python
def upper(left, right)
```

Changes a string to upper-case - input is in left, output in right

**Arguments**:

- `left` (`str`): input string
- `right` (`str`): stores output

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.lower"></a>

#### lower

```python
def lower(left, right)
```

Changes a string to lower-case - input is in u, output in l

**Arguments**:

- `left` (`str`): input string
- `right` (`str`): stores output

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.pad"></a>

#### pad

```python
def pad(user_input, pad, length, output)
```

Pads out the string input to be exactly len long by appending the pad character pad to form output

**Arguments**:

- `user_input` (`str`): input string
- `pad` (`str`): padding character(s)
- `length` (`int`): length to pad
- `output` (`str`): stores output

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.split"></a>

#### split

```python
def split(user_input, glue, output)
```

Splits a variable apart (input) into a list of variables (output) by separating the strings together with separator

**Arguments**:

- `user_input` (`str`): input string or WOQL variable "v:"
- `glue` (`str`): character string to separate string into list
- `output` (`str`): WOQL variable that stores output list

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.dot"></a>

#### dot

```python
def dot(document, field, value)
```

Iterates through a list and returns a value for each member

**Arguments**:

- `dictionary`: a WOQL dictionary or variable representing a dictionary
- `field` (`str`): a string representing the field or key to access the dictionary
- `value`: a WOQL value representing the result

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.member"></a>

#### member

```python
def member(member, mem_list)
```

Iterates through a list and returns a value for each member

**Arguments**:

- `member` (`str`): a WOQL variable representing an element of the list
- `mem_list` (`str`): a WOQL list variable

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.concat"></a>

#### concat

```python
def concat(concat_list, result)
```

Concatenates the list of variables into a string and saves the result in v

**Arguments**:

- `concat_list` (`list`): list of variables to concatenate
- `result` (`str`): saves the results

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.join"></a>

#### join

```python
def join(user_input, glue, output)
```

Joins a list variable together (input) into a string variable (output) by glueing the strings together with glue

**Arguments**:

- `user_input` (`list`): a list of variables
- `glue` (`str`): jioining character(s)
- `output` (`str`): variable that sotres output

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.sum"></a>

#### sum

```python
def sum(user_input, output)
```

Joins a list variable containing numbers together (input) into a single number

containing the sum.

**Arguments**:

- `user_input` (`list`): a variable containing a list of numbers
- `output` (`str`): a variable that stores the output

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.start"></a>

#### start

```python
def start(start, query=None)
```

Specifies that the start of the query returned

**Arguments**:

- `start` (`int`): index of the frist result got returned
- `query` (`WOQLQuery object`): None

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.limit"></a>

#### limit

```python
def limit(limit, query=None)
```

Specifies that only the first Number of rows will be returned

**Arguments**:

- `limit` (`int`): number of maximum results returned
- `query` (`WOQLQuery object`): None

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.regexp"></a>

#### regexp

```python
def regexp(pattern, reg_str, reg_list)
```

Regular Expression Call

pattern is a regex pattern (.*) using normal regular expression syntax, the only unusual thing is that special characters have to be escaped twice, s is the string to be matched and m is a list of matches:
e.g. WOQLQuery().regexp("(.).*", "hello", ["v:All", "v:Sub"])

**Arguments**:

- `pattern` (`str`): regex pattern
- `reg_str` (`str`): string to be matched
- `reg_list` (`str or list or dict`): store list of matches

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.length"></a>

#### length

```python
def length(var_list, var_len)
```

Length

Calculates the length of a list

**Arguments**:

- `var_list` (`list`): list of elements
- `var_len` (`num`): number of eleemnts

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.woql_not"></a>

#### woql\_not

```python
def woql_not(query=None)
```

Creates a logical NOT of the arguments

**Arguments**:

- `query` (`WOQLQuery object`): None
- `Returns`: None
- `----------`: None
- `WOQLQuery object`: query object that can be chained and/or executed

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.immediately"></a>

#### immediately

```python
def immediately(query=None)
```

Immediately runs side-effects without backtracking

**Arguments**:

- `query` (`WOQLQuery object`): None
- `Returns`: None
- `----------`: None
- `WOQLQuery object`: query object that can be chained and/or executed

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.count"></a>

#### count

```python
def count(countvar, query=None)
```

Counds the number of solutions in the given query

**Arguments**:

- `result` (`A variable or non-negative integer with the count`): None
- `query` (`The query from which to count the number of results`): None
- `Returns`: None
- `----------`: None
- `WOQLQuery object`: query object that can be chained and/or executed

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.cast"></a>

#### cast

```python
def cast(val, user_type, result, literal_type=None)
```

Changes the type of va to type and saves the return in vb

**Arguments**:

- `val` (`str`): original variable
- `user_type` (`str`): type to be changed
- `result` (`str`): save the return variable
- `literal_type` (`str`): literal type of`val`, can be used to treat `val` as a literal rather than an object or variable in the WOQL query.
If literal type is "owl:Thing" or "node", `val` will be treated as object in the graph

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.type_of"></a>

#### type\_of

```python
def type_of(value, vtype)
```

Sets the given value and type for cursor.

**Arguments**:

- `value` (`str`): Value which needs to be set
- `vtype` (`type`): Type which needs to be set

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.order_by"></a>

#### order\_by

```python
def order_by(*args, order="asc")
```

Orders the results by the list of variables including in gvarlist, asc_or_desc is a WOQL.asc or WOQ.desc list of variables

**Arguments**:

- `gvarlist` (`list or dict of WOQLQuery().asc or WOQLQuery().desc objects`): None
- `query` (`WOQLQuery object`): None

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.group_by"></a>

#### group\_by

```python
def group_by(group_vars, template, output, groupquery=None)
```

Groups the results of groupquery together by the list of variables group_vars, using the variable template as a grouping and saves the result into variable output.

**Arguments**:

- `group_vars` (`list or str or Var object`): list of variables to group
- `template` (`dict or list or str`): template of data to group with free variable(s)
- `output` (`str`): output variable
- `groupquery` (`dict`): None

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.true"></a>

#### true

```python
def true()
```

Sets true for cursor type.

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.path"></a>

#### path

```python
def path(subject, pattern, obj, path=None)
```

Create a path object constructed by the rules specified with pattern.

**Arguments**:

- `subject` (`str`): a woql subject, the node that the path started
- `pattern` (`str`): a pattern which specified the edges the path is consisted of.
It uses pattern construction syntax such as:
* '(scm:edge1, scm:edge2)+' for repeated pattern,
* 'scm:edge1|scm:edge2' for 'or' pattern,
* '<scm:edge' for reverse pattern, and
* '(scm:edge1)[n,m] for pattern between n and m times'
- `obj` (`str`): a woql object, the node that the path ended
- `path` (`str`): output variable

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.size"></a>

#### size

```python
def size(graph, size)
```

Sets the given graph and size for cursor.

**Arguments**:

- `graph` (`Graph which needs to be set as resource`): None
- `size` (`Size which needs to be set`): None

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.triple_count"></a>

#### triple\_count

```python
def triple_count(graph, triple_count)
```

Sets the given triple count and size for cursor.

**Arguments**:

- `graph` (`Graph which needs to be set as resource`): None
- `triple_count` (`Triple count which needs to be set`): None

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.star"></a>

#### star

```python
def star(graph=None, subj=None, pred=None, obj=None)
```

Selects everything as triples in the graph identified by GraphIRI into variables Subj, Pred, Obj - by default they are "v:Subject", "v:Predicate", "v:Object"

**Arguments**:

- `GraphIRI` (`str`): graphIRI
- `Subj` (`str`): target subject
- `Pred` (`str`): target predicate
- `Obj` (`str`): target object

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.all"></a>

#### all

```python
def all(subj=None, pred=None, obj=None, graph=None)
```

Calls the star method and returns the result of the same.

**Arguments**:

- `subj` (`str`): target subject
- `pred` (`str`): target predicate
- `obj` (`str`): target object
- `graph` (`str`): graphIRI

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.graph"></a>

#### graph

```python
def graph(g)
```

Used to specify that the rest of the query should use the graph g in calls to add_quad, quad, etc

**Arguments**:

- `g` (`str`): target graph

**Returns**:

`WOQLQuery object`: query object that can be chained and/or execute

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.vars"></a>

#### vars

```python
def vars(*args)
```

Generate variables to be used in WOQLQueries

**Arguments**:

- `args`: string arguments

**Returns**:

`tuple/string`: args prefixed with "v:"

<a id="terminusdb_client.woqlquery.woql_query.WOQLQuery.variables"></a>

#### variables

```python
def variables(*args)
```

Generate variables to be used in WOQLQueries

**Arguments**:

- `args`: string arguments

**Returns**:

`tuple/string`: args prefixed with "v:"

