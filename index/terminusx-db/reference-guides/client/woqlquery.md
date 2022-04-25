# WOQLQuery

## class terminusdb\_client.WOQLQuery(query=None, graph='schema')

**Bases:** `object`

### **init**(query=None, graph='schema')

defines the internal functions of the woql query object - the language API is defined in WOQLQuery

**Parameter/s**

* **query** (_dict_) – json-ld query for initialisation
* **graph** (`str`) – graph that this query is appled to, default to be schema/main

### execute(client, commit\_msg=None, file\_dict=None)

Executes the query using the passed client to connect to a server

**Parameter/s**

* **client** (_WOQLClient object_) – client that provide connection to the database for the query to execute.
* **commit\_msg** (`str`) – optional, commit message for this query. Recommended for query that carrries an update.
* **file\_dict** – File dictionary to be associated with post name => filename, for multipart POST

### to\_json()

Dumps the JSON-LD format of the query in a json string

### from\_json(input\_json)

Set a query from a JSON-LD json string

### to\_dict()

Give the dictionary that represents the query in JSON-LD format.

### from\_dict(dictdata)

Set a query from a dictionary that represents the query in JSON-LD format.

### load\_vocabulary(client)

Queries the schema graph and loads all the ids found there as vocabulary that can be used without prefixes ignoring blank node ids

### using(collection, subq=None)

### comment(comment, subq=None)

Adds a text comment to a query - can also be used to wrap any part of a query to turn it off

**Parameter/s**

**comment** (`str`) – text comment

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### select(\*args)

Filters the query so that only the variables included in \[V1…Vn] are returned in the bindings

**Parameter/s**

**args** – only these variables are returned

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### distinct(\*args)

Ensures that the solutions for the variables \[V1…Vn] are distinct

**Parameter/s**

**args** – The variables to make distinct with the final argument being a query.

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

**Example/s**

To load a local csv file: x,y = WOQLQUery().vars(“X”,”Y”) WOQLQuery().distinct(x).triple(x,’foo’,y) See Also

### woql\_and(\*args)

Creates a logical AND of the arguments Commonly used to combine WOQLQueries.

**Parameter/s**

**args** (_WOQLQuery objects_) –

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### woql\_or(\*args)

Creates a logical OR of the arguments

**Parameter/s**

**args** (_WOQLQuery objects_) –

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### woql\_from(graph, query=None)

Specifies the database URL that will be the default database for the enclosed query

**Parameter/s**

* **graph** (`str`) – url of the database
* **query** (_WOQLQuery object_, `optional`) –

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### into(graph\_descriptor, query)

Sets the current output graph for writing output to.

**Parameter/s**

* **graph\_descriptor** (`str`) – output graph
* **query** (_WOQLQuery object_, `optional`) –

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### triple(sub, pred, obj, opt=False)

Creates a triple pattern matching rule for the triple \[S, P, O] (Subject, Predicate, Object)

**Parameter/s**

* **sub** (`str`) – Subject, has to be a node (URI)
* **pred** (`str`) – Predicate, can be variable (prefix with “v:”) or node
* **obj** (`str`) – Object, can be variable or node or value
* **opt** (`bool`) – weather or not this triple is optional, default to be False

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### added\_triple(sub, pred, obj, opt=False)

Creates a triple pattern matching rule for the triple \[S, P, O] (Subject, Predicate, Object) added to the current commit.

**Parameter/s**

* **sub** (`str`) – Subject
* **pred** (`str`) – Predicate
* **obj** (`str`) – Object
* **opt** (`bool`) – weather or not this triple is optional, default to be False

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### removed\_triple(sub, pred, obj, opt=False)

Creates a triple pattern matching rule for the triple \[S, P, O] (Subject, Predicate, Object) added to the current commit.

**Parameter/s**

* **sub** (`str`) – Subject
* **pred** (`str`) – Predicate
* **obj** (`str`) – Object
* **opt** (`bool`) – weather or not this triple is optional, default to be False

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### quad(sub, pred, obj, graph, opt=False)

Creates a pattern matching rule for the quad \[S, P, O, G] (Subject, Predicate, Object, Graph)

**Parameter/s**

* **sub** (`str`) – Subject
* **pre** (`str`) – Predicate
* **obj** (`str`) – Object
* **gra** (`str`) – Graph
* **opt** (`bool`) – weather or not this quad is optional, default to be False

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### added\_quad(sub, pred, obj, graph, opt=False)

Creates a pattern matching rule for the quad \[S, P, O, G] (Subject, Predicate, Object, Graph) added to the current commit.

**Parameter/s**

* **sub** (`str`) – Subject
* **pre** (`str`) – Predicate
* **obj** (`str`) – Object
* **gra** (`str`) – Graph
* **opt** (`bool`) – weather or not this quad is optional, default to be False

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### removed\_quad(sub, pred, obj, graph, opt=False)

Creates a pattern matching rule for the quad \[S, P, O, G] (Subject, Predicate, Object, Graph) added to the current commit.

**Parameter/s**

* **sub** (`str`) – Subject
* **pre** (`str`) – Predicate
* **obj** (`str`) – Object
* **gra** (`str`) – Graph
* **opt** (`bool`) – weather or not this quad is optional, default to be False

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### string(input\_str)

Transforms the given string into the proper json-ld form

**Parameter/s**

**input\_str** (`str`) – the given input string

**Return type/s**

dict

### boolean(input\_bool)

Transforms the given bool object into the proper json-ld form

**Parameter/s**

**input\_bool** (`bool`) – the given input string

**Return type/s**

dict

### datetime(input\_obj)

Transforms the given datetime object into the proper json-ld form

**Parameter/s**

**input\_obj** (`str`) – the given input dateTime object

**Return type/s**

dict

### literal(input\_val, input\_type)

### iri(varname)

### sub(parent, child)

Returns true if child is a sub-class of parent, according to the current DB schema

**Parameter/s**

* **parent** (`str`) – the parent class to be checked
* **child** (`str`, `optional`) – the child class to be checked

**Return type/s**

bool

### eq(left, right)

Matches if a is equal to b :param left: object in the graph :type left: `str` :param right: object in the graph :type right: `str`

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### substr(string, length, substring, before=0, after=0)

### update\_object(docjson)

### update\_document(docjson, json\_or\_iri=None)

### insert\_document(docjson, json\_or\_iri=None)

### delete\_object(json\_or\_iri)

### delete\_document(json\_or\_iri)

### read\_object(iri, output\_var)

### read\_document(iri, output\_var)

### get(as\_vars, query\_resource=None)

Takes an as structure

### put(as\_vars, query, query\_resource=None)

Takes an array of variables, an optional array of column names

### woql\_as(\*args)

### file(fpath, opts=None)

Provides details of a file source in a JSON format that includes a URL property

**Parameter/s**

* **fpath** (_dict_) – file data source in a JSON format
* **opts** (_input options_) – optional

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

**Example/s**

To load a local csv file: WOQLQuery().file(“/app/local\_files/my.csv”)

### once(query=None)

Obtains only one result from subquery

**Parameter/s**

**query** (_WOQLQuery object_, `optional`) –

**Returns**

query object that can be chained and/or executed

**Return type/s**

WOQLQuery object

### remote(uri, opts=None)

Provides details of a remote data source in a JSON format that includes a URL property

**Parameter/s**

* **uri** (`str`) – remote data source
* **opts** (_input options_) – optional

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

**Example/s**

```python
csv = WOQLQuery().get(
...     WOQLQuery().woql_as("Start station", "v:Start_Station").
...     woql_as("End station", "v:End_Station").
...     woql_as("Start date", "v:Start_Time").
...     woql_as("End date", "v:End_Time").
...     woql_as("Duration", "v:Duration").
...     woql_as("Start station number", "v:Start_ID").
...     woql_as("End station number", "v:End_ID").
...     woql_as("Bike number", "v:Bike").
...     woql_as("Member type", "v:Member_Type")
... ).remote("https://terminusdb.com/t/data/bike_tutorial.csv")
```

### post(fpath, opts=None)

### delete\_triple(subject, predicate, object\_or\_literal)

Deletes any triples that match the rule \[subject, predicate, object]

**Parameter/s**

* **subject** (`str`) – Subject
* **predicate** (`str`) – Predicate
* **object\_or\_literal** (`str`) – Object or Literal

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

**Example/s**

This example deletes the comment triple of a particular value from the document identified by doc:X: update = WOQLQuery().delete\_triple(“doc:X”, “comment”, “my comment”) qry = WOQLQuery().when(True, update) client.update(qry.json(), ‘MyDatabaseId’) Note that only triples matching the particular object value will be deleted. To delete all triples matching this predicate, (regardless of value) we use a when clause, and introduce a variable `v:any` which will bind to any value for this subject and predicate combination: when = WOQLQuery().triple(‘doc:X’, ‘comment’, ‘v:any’) update = WOQLQuery().delete\_triple(‘doc:X’, ‘comment’, ‘v:any’) qry = WOQLQuery().when(when, update) client.update(qry.json(), ‘MyDatabaseId’)

### add\_triple(subject, predicate, object\_or\_literal)

Adds triples according to the the pattern \[subject, predicate, object]

**Parameter/s**

* **subject** (`str`) – Subject
* **predicate** (`str`) – Predicate
* **object\_or\_literal** (`str`) – Object or Literal

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

**Example/s**

This example adds a triple for a comment predicate and a certain value to the document identified by doc:X: update = WOQLQuery().add\_triple(“doc:X”, “comment”, “my comment”) qry = WOQLQuery().when(True, update) client.update(qry.json(), ‘MyDatabaseId’)

**Notes**

To update an existing triple, it is not just a case of calling add\_triple again. One needs to delete the previous triple first. Otherwise two triples with the same predicate but different object values will be present.

### update\_triple(subject, predicate, new\_object)

### delete\_quad(subject, predicate, object\_or\_literal, graph=None)

Deletes any quads that match the rule \[subject, predicate, object, graph]

**Parameter/s**

* **subject** (`str`) – Subject
* **predicate** (`str`) – Predicate
* **object\_or\_literal** (`str`) – Object or Literal
* **graph** (`str`) – Graph

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### add\_quad(subject, predicate, object\_or\_literal, graph)

Adds quads according to the pattern \[subject, predicate, object, graph]

**Parameter/s**

* **subject** (`str`) – Subject
* **predicate** (`str`) – Predicate
* **object\_or\_literal** (`str`) – Object or Literal
* **graph** (`str`) – Graph

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### update\_quad(subject, predicate, new\_object, graph)

### trim(untrimmed, trimmed)

A trimmed version of untrimmed (with leading and trailing whitespace removed) is copied into trimmed

**Parameter/s**

* **untrimmed** (`str`) – original string
* **trimmed** (`str`) – WOQL varible storing the result string

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### eval(arith, res)

Evaluates the Arithmetic Expression Arith and copies the output to variable V

**Parameter/s**

* **arith** (_WOQLQuery_\* or \*_dict_) – query or JSON-LD representing the query
* **res** (`str`) – output variable

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### plus(\*args)

Adds numbers N1…Nn together

**Parameter/s**

**args** (`int`\* or \*_float_) – numbers to add together

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### minus(\*args)

Adds numbers N1…Nn together

**Parameter/s**

**args** (`int`\* or \*_float_) – numbers to add together

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### times(\*args)

Multiplies numbers N1…Nn together

**Parameter/s**

**args** (`int`\* or \*_float_) – numbers to be multiplied

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### divide(\*args)

Divides numbers N1…Nn by each other left, to right precedence

**Parameter/s**

**args** (`int`\* or \*_float_) – numbers to be divided

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### div(\*args)

Division - integer division - args are divided left to right

**Parameter/s**

**args** (`int`\* or \*_float_) – numbers for division

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery

### exp(first, second)

Raises A to the power of B

**Parameter/s**

* **first** (`int`\* or \*_float_) – base number
* **second** (`int`\* or \*_float_) – power of

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### floor(user\_input)

The floor function of a real number x denotes the greatest integer less than or equal to x.

**Parameter/s**

**user\_input** (`int`\* or \*_float_) – number whose floor needs to be calculated

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### isa(element, of\_type)

Matches if element is a member of a certain type, according to the current state of the DB

**Parameter/s**

* **element** (`str`) – element to be checked
* **of\_type** (`str`) – type to be checked

**Return type/s**

bool

### like(left, right, dist)

### less(left, right)

Compares the value of v1 against v2 and returns true if v1 is less than v2

**Parameter/s**

* **left** (`str`) – first variable to compare
* **right** (`str`) – second variable to compare

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### greater(left, right)

Compares the value of v1 against v2 and returns true if v1 is greater than v2

**Parameter/s**

* **left** (`str`) – first variable to compare
* **right** (`str`) – second variable to compare

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### opt(query=None)

The Query in the Optional argument is specified as optional

**Parameter/s**

**query** (_WOQLQuery object_) –

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

**Example/s**

```python
WOQLQuery().woql_and(WOQLQuery().
... triple('v:MandatorySubject','v:MandatoryObject', 'v:MandatoryValue'),
... WOQLQuery.opt(WOQLQuery().triple('v:OptionalS', 'v:OptionalObject',
... 'v:OptionalValue'))
... )
```

### unique(prefix, key\_list, uri)

Generates an ID for a node as a function of the passed VariableList with a specific prefix (URL base)(A.K.A Hashing) If the values of the passed variables are the same, the output will be the same

**Parameter/s**

* **prefix** (`str`) – prefix for the id
* **key\_list** (`str`) – variable to generate id for
* **uri** (`str`) – the variable to hold the id

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

**Example/s**

```python
WOQLQuery().unique("https://base.url",["page","1"],"v:obj_id").execute(client)
{'@type': 'api:WoqlResponse', 'api:status': 'api:success', 'api:variable_names': ['obj_id'], 'bindings': [{'obj_id': 'https://base.urlacd150a6885f609532931d89844070b1'}], 'deletes': 0, 'inserts': 0, 'transaction_retry_count': 0}
```

### idgen(prefix, input\_var\_list, output\_var)

Generates an ID for a node as a function of the passed VariableList with a specific prefix (URL base). If the values of the passed variables are the same, the output will be the same

**Parameter/s**

* **prefix** (`str`) – prefix for the id
* **input\_var\_list** (`str`\* or \*_list_) – variable to generate id for
* **output\_var** (`str`) – the variable to hold the id

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

**Example/s**

```python
WOQLQuery().idgen("https://base.url",["page","1"],"v:obj_id").execute(client)
{'@type': 'api:WoqlResponse', 'api:status': 'api:success', 'api:variable_names': ['obj_id'], 'bindings': [{'obj_id': 'https://base.url_page_1'}], 'deletes': 0, 'inserts': 0, 'transaction_retry_count': 0}
```

### random\_idgen(prefix, key\_list, uri)

Randomly generates an ID and appends to the end of the key\_list.

**Parameter/s**

* **prefix** (`str`) – prefix for the id
* **key\_list** (`str`) – variable to generate id for
* **uri** (`str`) – the variable to hold the id

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

**Example/s**

```python
WOQLQuery().random_idgen("https://base.url",["page","1"],"v:obj_id").execute(client)
{'@type': 'api:WoqlResponse', 'api:status': 'api:success', 'api:variable_names': ['obj_id'], 'bindings': [{'obj_id': 'http://base.url_page_1_rv1mfa59ekisdutnxx6zdt2fkockgah'}], 'deletes': 0, 'inserts': 0, 'transaction_retry_count': 0}
```

### upper(left, right)

### lower(left, right)

Changes a string to lower-case - input is in u, output in l

**Parameter/s**

* **left** (`str`) – input string
* **right** (`str`) – stores output

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### pad(user\_input, pad, length, output)

Pads out the string input to be exactly len long by appending the pad character pad to form output

**Parameter/s**

* **user\_input** (`str`) – input string
* **pad** (`str`) – padding character(s)
* **length** (`int`) – length to pad
* **output** (`str`) – stores output

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### split(user\_input, glue, output)

Splits a variable apart (input) into a list of variables (output) by separating the strings together with separator

**Parameter/s**

* **user\_input** (`str`) – input string or WOQL variable “v:”
* **glue** (`str`) – character string to separate string into list
* **output** (`str`) – WOQL variable that stores output list

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### dot(document, field, value)

Iterates through a list and returns a value for each member

**Parameter/s**

* **dictionary** – a WOQL dictionary or variable representing a dictionary
* **field** (`str`) – a string representing the field or key to access the dictionary
* **value** – a WOQL value representing the result

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### member(member, mem\_list)

Iterates through a list and returns a value for each member

**Parameter/s**

* **member** (`str`) – a WOQL variable representing an element of the list
* **mem\_list** (`str`) – a WOQL list variable

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### concat(concat\_list, result)

Concatenates the list of variables into a string and saves the result in v

**Parameter/s**

* **concat\_list** (_list_) – list of variables to concatenate
* **result** (`str`) – saves the results

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### join(user\_input, glue, output)

Joins a list variable together (input) into a string variable (output) by glueing the strings together with glue

**Parameter/s**

* **user\_input** (_list_) – a list of variables
* **glue** (`str`) – jioining character(s)
* **output** (`str`) – variable that sotres output

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### sum(user\_input, output)

Joins a list variable containing numbers together (input) into a single number containing the sum.

**Parameter/s**

* **user\_input** (_list_) – a variable containing a list of numbers
* **output** (`str`) – a variable that stores the output

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### start(start, query=None)

Specifies that the start of the query returned

**Parameter/s**

* **start** (`int`) – index of the frist result got returned
* **query** (_WOQLQuery object_, `optional`) –

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### limit(limit, query=None)

Specifies that only the first Number of rows will be returned

**Parameter/s**

* **limit** (`int`) – number of maximum results returned
* **query** (_WOQLQuery object_, `optional`) –

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### re(pattern, reg\_str, reg\_list)

Regular Expression Call p is a regex pattern (.\*) using normal regular expression syntax, the only unusual thing is that special characters have to be escaped twice, s is the string to be matched and m is a list of matches: e.g. WOQL.re(“(.).\*”, “hello”, \[“v:All”, “v:Sub”])

**Parameter/s**

* **pattern** (`str`) – regex pattern
* **reg\_str** (`str`) – string to be matched
* **reg\_list** (`str`\* or **list** or \*_dict_) – store list of matches

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### length(var\_list, var\_len)

### woql\_not(query=None)

Creates a logical NOT of the arguments

**Parameter/s**

**query** (_WOQLQuery object_, `optional`) –

**Returns**

query object that can be chained and/or executed

**Return type/s**

WOQLQuery object

### immediately(query=None)

Immediately runs side-effects without backtracking

**Parameter/s**

**query** (_WOQLQuery object_, `optional`) –

**Returns**

query object that can be chained and/or executed

**Return type/s**

WOQLQuery object

### count(countvar, query=None)

Counds the number of solutions in the given query

**Parameter/s**

* **result** (_A variable_\* or \*_non-negative integer with the count_) –
* **query** (_The query from which to count the number of results_) –

**Returns**

query object that can be chained and/or executed

**Return type/s**

WOQLQuery object

### cast(val, user\_type, result, literal\_type=None)

Changes the type of va to type and saves the return in vb

**Parameter/s**

* **val** (`str`) – original variable
* **user\_type** (`str`) – type to be changed
* **result** (`str`) – save the return variable
* **literal\_type** (`str`, `optional`) – literal type of\`val\`, can be used to treat val as a literal rather than an object or variable in the WOQL query. If literal type is “owl:Thing” or “node”, val will be treated as object in the graph

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### type\_of(value, vtype)

Sets the given value and type for cursor.

**Parameter/s**

* **value** (`str`) – Value which needs to be set
* **vtype** (_type_) – Type which needs to be set

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### order\_by(\*args, order='asc')

Orders the results by the list of variables including in gvarlist, asc\_or\_desc is a WOQL.asc or WOQ.desc list of variables

**Parameter/s**

* **gvarlist** (_list_\* or **dict of WOQLQuery**(**)**.asc\*\* or **WOQLQuery**(**)**.desc objects\*) –
* **query** (_WOQLQuery object_, `optional`) –

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

**Example/s**

Examples of 3 different usage patterns of order argument

```python
test1 = WOQLQuery().select("v:Time").using("_commits").woql_and(
...        WOQLQuery().order_by("v:Time", order="asc").triple("v:A", "ref:commit_timestamp", "v:Time")
... )
test2 = WOQLQuery().select("v:Time", "v:Message").using("_commits").woql_and(
...     WOQLQuery().order_by("v:Time", "v:Message", order={"v:Time": "desc", "v:Message": "asc"}).woql_and(
...         WOQLQuery().triple("v:A", "ref:commit_timestamp", "v:Time"),
...         WOQLQuery().triple("v:A", "ref:commit_message", "v:Message")
...     )
... )
test3 = WOQLQuery().select("v:Time", "v:Message").using("_commits").woql_and(
...     WOQLQuery().order_by("v:Time", "v:Message", order=["desc", "asc"]).woql_and(
...         WOQLQuery().triple("v:A", "ref:commit_timestamp", "v:Time"),
...         WOQLQuery().triple("v:A", "ref:commit_message", "v:Message")
...     )
... )
```

### group\_by(group\_vars, template, output, groupquery=None)

Groups the results of groupquery together by the list of variables group\_vars, using the variable template as a grouping and saves the result into variable output.

**Parameter/s**

* **group\_vars** (_list_\* or _`str`_ or \*_Var object_) – list of variables to group
* **template** (_dict_\* or **list** or \*`str`) – template of data to group with free variable(s)
* **output** (`str`, `optional`) – output variable
* **groupquery** (_dict_, `optional`) –

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### true()

Sets true for cursor type.

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### path(subject, pattern, obj, path=None)

Create a path object constructed by the rules specified with pattern.

**Parameter/s**

* **subject** (`str`) – a woql subject, the node that the path started
* **pattern** (`str`) – a pattern which specified the edges the path is consisted of. It uses pattern construction syntax such as: \* ‘(scm:edge1, scm:edge2)+’ for repeated pattern, \* ‘scm:edge1|scm:edge2’ for ‘or’ pattern, \* ‘\<scm:edge’ for reverse pattern, and \* ‘(scm:edge1)\[n,m] for pattern between n and m times’
* **obj** (`str`) – a woql object, the node that the path ended
* **path** (`str`) – output variable

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### size(graph, size)

Sets the given graph and size for cursor.

**Parameter/s**

* **graph** (_Graph which needs to be set as resource_) –
* **size** (_Size which needs to be set_) –

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### triple\_count(graph, triple\_count)

Sets the given triple count and size for cursor.

**Parameter/s**

* **graph** (_Graph which needs to be set as resource_) –
* **triple\_count** (_Triple count which needs to be set_) –

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### star(graph=None, subj=None, pred=None, obj=None)

Selects everything as triples in the graph identified by GraphIRI into variables Subj, Pred, Obj - by default they are “v:Subject”, “v:Predicate”, “v:Object”

**Parameter/s**

* **GraphIRI** (`str`) – graphIRI
* **Subj** (`str`, `optional`) – target subject
* **Pred** (`str`, `optional`) – target predicate
* **Obj** (`str`, `optional`) – target object

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### all(subj=None, pred=None, obj=None, graph=None)

Calls the star method and returns the result of the same.

**Parameter/s**

* **subj** (`str`, `optional`) – target subject
* **pred** (`str`, `optional`) – target predicate
* **obj** (`str`, `optional`) – target object
* **graph** (`str`) – graphIRI

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### graph(g)

Used to specify that the rest of the query should use the graph g in calls to add\_quad, quad, etc :param g: target graph :type g: `str`

**Returns**

query object that can be chained and/or execute

**Return type/s**

WOQLQuery object

### vars(\*args)

Generate variables to be used in WOQLQueries :param args: string arguments

**Returns**

args prefixed with “v:”

**Return type/s**

tuple/string
