---
description: The JSON-LD definition of the WOQL language.
---

# WOQL Class Reference

## WOQL Schema

This is the WOQL schema. It gives a complete specification of the syntax of the WOQL query language. This allows WOQL queries to be checked for syntactic correctness, helps to prevent errors and detect conflicts in merge of queries, and allows the storage and retrieval of queries so that queries can be associated with data products.

**Authored by:** Gavin Mendel-Gleason

{% hint style="info" %}
Syntax is listed in alphabetical order.
{% endhint %}

#### AddData

Add a (terminal) edge with a data value.

**Class:** `AddData`

**Super class:** `Query`

**Properties:**

| Property    | Range        | Desc                                                                      |
| ----------- | ------------ | ------------------------------------------------------------------------- |
| `subject`   | `NodeValue`  | A URI or variable which is the source or subject of the graph edge.       |
| `predicate` | `NodeValue`  | A URI or variable which is the edge-label or predicate of the graph edge. |
| `object`    | `DataValue`  | A datatype or variable which is the target or object of the graph edge.   |
| `graph`     | `xsd:string` | An optional graph (either 'instance' or 'schema')                         |

***

#### AddLink

Add an edge which links between nodes in the graph.

**Class:** `AddLink`

**Super class:** `Query`

**Properties:**

| Property    | Range        | Desc                                                                      |
| ----------- | ------------ | ------------------------------------------------------------------------- |
| `subject`   | `NodeValue`  | A URI or variable which is the source or subject of the graph edge.       |
| `predicate` | `NodeValue`  | A URI or variable which is the edge-label or predicate of the graph edge. |
| `object`    | `NodeValue`  | A URI or variable which is the target or object of the graph edge.        |
| `graph`     | `xsd:string` | An optional graph (either 'instance' or 'schema')                         |

***

#### AddTriple

Specify an edge to add to the graph.

**Class:** `AddTriple`

**Super class:** `Query`

**Properties:**

| Property    | Range        | Desc                                                                         |
| ----------- | ------------ | ---------------------------------------------------------------------------- |
| `subject`   | `NodeValue`  | A URI or variable which is the source or subject of the graph edge.          |
| `predicate` | `NodeValue`  | A URI or variable which is the edge-label or predicate of the graph edge.    |
| `object`    | `Value`      | A URI, datatype or variable which is the target or object of the graph edge. |
| `graph`     | `xsd:string` | An optional graph (either 'instance' or 'schema')                            |

***

#### AddedData

Specify an edge pattern with data value which was added in \*this\* commit\*.

**Class:** `AddedData`

**Super class:** `Query`

**Properties:**

| Property    | Range        | Desc                                                                      |
| ----------- | ------------ | ------------------------------------------------------------------------- |
| `subject`   | `NodeValue`  | A URI or variable which is the source or subject of the graph edge.       |
| `predicate` | `NodeValue`  | A URI or variable which is the edge-label or predicate of the graph edge. |
| `object`    | `DataValue`  | A datatype or variable which is the target or object of the graph edge.   |
| `graph`     | `xsd:string` | An optional graph (either 'instance' or 'schema')                         |

***

#### AddedLink

Specify an edge pattern which links between nodes at \*this\* commit.

**Class:** `AddedLink`

**Super class:** `Query`

**Properties:**

| Property    | Range        | Desc                                                                      |
| ----------- | ------------ | ------------------------------------------------------------------------- |
| `subject`   | `NodeValue`  | A URI or variable which is the source or subject of the graph edge.       |
| `predicate` | `NodeValue`  | A URI or variable which is the edge-label or predicate of the graph edge. |
| `object`    | `NodeValue`  | A URI or variable which is the target or object of the graph edge.        |
| `graph`     | `xsd:string` | An optional graph (either 'instance' or 'schema')                         |

***

#### AddedTriple

Specify an edge pattern which was \*added\* at \*this commit\*.

**Class:** `AddedTriple`

**Super class:** `Query`

**Properties:**

| Property    | Range        | Desc                                                                         |
| ----------- | ------------ | ---------------------------------------------------------------------------- |
| `subject`   | `NodeValue`  | A URI or variable which is the source or subject of the graph edge.          |
| `predicate` | `NodeValue`  | A URI or variable which is the edge-label or predicate of the graph edge.    |
| `object`    | `Value`      | A URI, datatype or variable which is the target or object of the graph edge. |
| `graph`     | `xsd:string` | An optional graph (either 'instance' or 'schema')                            |

***

#### And

A conjunction of queries which must all have a solution.

**Class:** `And`

**Super class:** `Query`

**Properties:**

| Property | Range   | Desc                             |
| -------- | ------- | -------------------------------- |
| `and`    | `Query` | List of queries which must hold. |

***

#### ArithmeticExpression

An abstract class specifying the AST super-class of all arithemtic expressions. It is a subdocument

**Class:** `ArithmeticExpression`

***

#### ArithmeticValue

A variable or node. It is a subdocument

**Class:** `ArithmeticValue`

**Super class:** `ArithmeticExpression`

**Properties:**

| Property   | Range               | Desc                    |
| ---------- | ------------------- | ----------------------- |
| `data`     | `xsd:anySimpleType` | An xsd data type value. |
| `variable` | `xsd:string`        | A variable.             |

***

#### Column

Description pending.

**Class:** `Column`

***

#### Concatenate

Concatenate a list of strings.

**Class:** `Concatenate`

**Super class:** `Query`

**Properties:**

| Property | Range       | Desc                     |
| -------- | ----------- | ------------------------ |
| `list`   | `DataValue` | The list to concatenate. |
| `result` | `DataValue` | The result string.       |

***

#### Count

Counts the number of solutions of a query.

**Class:** `Count`

**Super class:** `Query`

**Properties:**

| Property | Range       | Desc                                      |
| -------- | ----------- | ----------------------------------------- |
| `query`  | `Query`     | The query from which to obtain the count. |
| `count`  | `DataValue` | The count of the number of solutions.     |

***

#### Data

Specify an edge pattern which is terminal, and provides a data value association.

**Class:** `Data`

**Super class:** `Query`

**Properties:**

| Property    | Range        | Desc                                                                      |
| ----------- | ------------ | ------------------------------------------------------------------------- |
| `subject`   | `NodeValue`  | A URI or variable which is the source or subject of the graph edge.       |
| `predicate` | `NodeValue`  | A URI or variable which is the edge-label or predicate of the graph edge. |
| `object`    | `DataValue`  | A data type or variable which is the target or object of the graph edge.  |
| `graph`     | `xsd:string` | An optional graph (either 'instance' or 'schema')                         |

***

#### DataValue

A variable or node. It is a subdocument

**Class:** `DataValue`

**Properties:**

| Property   | Range               | Desc                    |
| ---------- | ------------------- | ----------------------- |
| `data`     | `xsd:anySimpleType` | An xsd data type value. |
| `variable` | `xsd:string`        | A variable.             |
| `list`     | `DataValue`         | A list of datavalues    |

***

#### DeleteDocument

Delete a document from the graph.

**Class:** `DeleteDocument`

**Super class:** `Query`

**Properties:**

| Property     | Range       | Desc                                                           |
| ------------ | ----------- | -------------------------------------------------------------- |
| `identifier` | `NodeValue` | An identifier specifying the documentation location to delete. |

***

#### DeleteLink

Delete an edge linking nodes.

**Class:** `DeleteLink`

**Super class:** `Query`

**Properties:**

| Property    | Range        | Desc                                                                                                  |
| ----------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| `subject`   | `NodeValue`  | A URI or variable which is the source or subject of the graph edge. The variable must be bound.       |
| `predicate` | `NodeValue`  | A URI or variable which is the edge-label or predicate of the graph edge. The variable must be bound. |
| `object`    | `NodeValue`  | A URI or variable which is the target or object of the graph edge. The variable must be bound.        |
| `graph`     | `xsd:string` | An optional graph (either 'instance' or 'schema')                                                     |

***

#### DeleteTriple

Specify an edge pattern to remove from the graph.

**Class:** `DeleteTriple`

**Super class:** `Query`

**Properties:**

| Property    | Range        | Desc                                                                         |
| ----------- | ------------ | ---------------------------------------------------------------------------- |
| `subject`   | `NodeValue`  | A URI or variable which is the source or subject of the graph edge.          |
| `predicate` | `NodeValue`  | A URI or variable which is the edge-label or predicate of the graph edge.    |
| `object`    | `Value`      | A URI, datatype or variable which is the target or object of the graph edge. |
| `graph`     | `xsd:string` | An optional graph (either 'instance' or 'schema')                            |

***

#### DeletedLink

An edge pattern specifying a link beween nodes deleted \*at this commit\*.

**Class:** `DeletedLink`

**Super class:** `Query`

**Properties:**

| Property    | Range        | Desc                                                                      |
| ----------- | ------------ | ------------------------------------------------------------------------- |
| `subject`   | `NodeValue`  | A URI or variable which is the source or subject of the graph edge.       |
| `predicate` | `NodeValue`  | A URI or variable which is the edge-label or predicate of the graph edge. |
| `object`    | `NodeValue`  | A URI or variable which is the target or object of the graph edge.        |
| `graph`     | `xsd:string` | An optional graph (either 'instance' or 'schema')                         |

***

#### DeletedTriple

Specify an edge pattern which was \*deleted\* at \*this commit\*.

**Class:** `DeletedTriple`

**Super class:** `Query`

**Properties:**

| Property    | Range        | Desc                                                                         |
| ----------- | ------------ | ---------------------------------------------------------------------------- |
| `subject`   | `NodeValue`  | A URI or variable which is the source or subject of the graph edge.          |
| `predicate` | `NodeValue`  | A URI or variable which is the edge-label or predicate of the graph edge.    |
| `object`    | `Value`      | A URI, datatype or variable which is the target or object of the graph edge. |
| `graph`     | `xsd:string` | An optional graph (either 'instance' or 'schema')                            |

***

#### Distinct

Ensure variables listed result in distinct solutions.

**Class:** `Distinct`

**Super class:** `Query`

**Properties:**

| Property    | Range        | Desc                                                 |
| ----------- | ------------ | ---------------------------------------------------- |
| `variables` | `xsd:string` | The variables which must be distinct from the query. |
| `query`     | `Query`      | The query which will be run prior to selection.      |

***

#### Div

Integer divide two numbers.

**Class:** `Div`

**Super class:** `ArithmeticExpression`

**Properties:**

| Property | Range                  | Desc                   |
| -------- | ---------------------- | ---------------------- |
| `left`   | `ArithmeticExpression` | First operand of div.  |
| `right`  | `ArithmeticExpression` | Second operand of div. |

***

#### Divide

Divide two numbers.

**Class:** `Divide`

**Super class:** `ArithmeticExpression`

**Properties:**

| Property | Range                  | Desc                      |
| -------- | ---------------------- | ------------------------- |
| `left`   | `ArithmeticExpression` | First operand of divide.  |
| `right`  | `ArithmeticExpression` | Second operand of divide. |

***

#### Dot

Extract the value of a key in a bound document.

**Class:** `Dot`

**Super class:** `Query`

**Properties:**

| Property | Range       | Desc             |
| -------- | ----------- | ---------------- |
| `star`   | `undefined` | A path patterns. |

***

#### Equals

True whenever 'left' is the same as 'right'. Performs unification.

**Class:** `Equals`

**Super class:** `Query`

**Properties:**

| Property | Range       | Desc                           |
| -------- | ----------- | ------------------------------ |
| `child`  | `undefined` | A URI, data value or variable. |
| `parent` | `undefined` | A URI, data value or variable. |

***

#### Eval

Evaluate an arithmetic expression to obtain a result.

**Class:** `Eval`

**Super class:** `Query`

**Properties:**

| Property     | Range                  | Desc                            |
| ------------ | ---------------------- | ------------------------------- |
| `expression` | `ArithmeticExpression` | The expression to be evaluated. |
| `result`     | `ArithmeticValue`      | The numeric result.             |

***

#### Exp

Exponentiate a number.

**Class:** `Exp`

**Super class:** `ArithmeticExpression`

**Properties:**

| Property | Range                  | Desc          |
| -------- | ---------------------- | ------------- |
| `left`   | `ArithmeticExpression` | The base.     |
| `right`  | `ArithmeticExpression` | The exponent. |

***

#### Floor

Find the integral part of a number.

**Class:** `Floor`

**Super class:** `ArithmeticExpression`

**Properties:**

| Property   | Range                  | Desc                 |
| ---------- | ---------------------- | -------------------- |
| `argument` | `ArithmeticExpression` | The number to floor. |

***

#### FormatType

Description pending.

**Class:** `FormatType`

***

#### From

Change the default read graph (between instance/schema).

**Class:** `From`

**Super class:** `Query`

**Properties:**

| Property       | Range        | Desc                                              |
| -------------- | ------------ | ------------------------------------------------- |
| `query`        | `Query`      | The subquery with a new default graph.            |
| `graph_filter` | `xsd:string` | The graph filter: 'schema' or 'instance' or '\*'. |

***

#### Get

Description pending.

**Class:** `Get`

**Super class:** `Query`

***

#### Greater

Predicate determining if one thing is greater than another according to natural ordering.

**Class:** `Greater`

**Super class:** `Query`

**Properties:**

| Property | Range       | Desc                 |
| -------- | ----------- | -------------------- |
| `left`   | `DataValue` | The greater element. |
| `right`  | `DataValue` | The lesser element.  |

***

#### GroupBy

Group a query into a list with each element of the list specified by 'template' using a given variable set for the group.

**Class:** `GroupBy`

**Super class:** `Query`

**Properties:**

| Property   | Range        | Desc                                                       |
| ---------- | ------------ | ---------------------------------------------------------- |
| `template` | `xsd:string` | The template of elements in the result list.               |
| `group_by` | `xsd:string` | The variables which should be grouped into like solutions. |
| `query`    | `Query`      | The subquery providing the solutions for the grouping.     |
| `grouped`  | `Value`      | The final list of templated solutions.                     |

***

#### HashKey

Generates a key identical to those generated automatically by 'HashKey' specifications.

**Class:** `HashKey`

**Super class:** `Query`

**Properties:**

| Property   | Range       | Desc                                                |
| ---------- | ----------- | --------------------------------------------------- |
| `base`     | `DataValue` | The URI base to the left of the key.                |
| `key_list` | `DataValue` | List of data elements required to generate the key. |
| `uri`      | `NodeValue` | The resulting URI.                                  |

***

#### If

A conditional which runs the then clause for every success from the test clause, otherwise runs the else clause.

**Class:** `If`

**Super class:** `Query`

**Properties:**

| Property | Range   | Desc                                                                        |
| -------- | ------- | --------------------------------------------------------------------------- |
| `test`   | `Query` | A query which will provide bindings for the then clause.                    |
| `then`   | `Query` | A query which will run for every solution of test with associated bindings. |
| `else`   | `Query` | A query which runs whenever test fails.                                     |

***

#### Immediately

Attempts to perform all side-effecting operations immediately. Can have strange non-backtracking effects but can also increase performance. Use at your own risk.

**Class:** `Immediately`

**Super class:** `Query`

**Properties:**

| Property | Range   | Desc                                             |
| -------- | ------- | ------------------------------------------------ |
| `query`  | `Query` | The query from which to obtain the side-effects. |

***

#### Indicator

Description pending.

**Class:** `Indicator`

***

#### Into

Change the default write graph (between instance/schema).

**Class:** `Into`

**Super class:** `Query`

**Properties:**

| Property | Range        | Desc                                         |
| -------- | ------------ | -------------------------------------------- |
| `query`  | `Query`      | The subquery with a new default write graph. |
| `graph`  | `xsd:string` | The graph filter: schema or instance.        |

***

#### InversePathPredicate

A predicate to traverse \*backwards\*.

**Class:** `InversePathPredicate`

**Super class:** `PathPattern`

**Properties:**

| Property    | Range        | Desc                                                                |
| ----------- | ------------ | ------------------------------------------------------------------- |
| `predicate` | `xsd:string` | The predicate to use in reverse direction in the pattern traversal. |

***

#### IsA

Test (or generate) the type of an element.

**Class:** `IsA`

**Super class:** `Query`

**Properties:**

| Property  | Range       | Desc                     |
| --------- | ----------- | ------------------------ |
| `element` | `NodeValue` | The element to test.     |
| `type`    | `NodeValue` | The type of the element. |

***

#### Join

Join a list of strings using 'separator'.

**Class:** `Join`

**Super class:** `Query`

**Properties:**

| Property    | Range       | Desc                                     |
| ----------- | ----------- | ---------------------------------------- |
| `list`      | `DataValue` | The list to concatenate.                 |
| `separator` | `DataValue` | The separator between each joined string |
| `result`    | `DataValue` | The result string.                       |

***

#### Length

The length of a list.

**Class:** `Length`

**Super class:** `Query`

**Properties:**

| Property | Range       | Desc                                  |
| -------- | ----------- | ------------------------------------- |
| `list`   | `DataValue` | The list of which to find the length. |
| `length` | `DataValue` | The length of the list.               |

***

#### Less

Predicate determining if one thing is less than another according to natural ordering.

**Class:** `Less`

**Super class:** `Query`

**Properties:**

| Property | Range       | Desc                 |
| -------- | ----------- | -------------------- |
| `left`   | `DataValue` | The lesser element.  |
| `right`  | `DataValue` | The greater element. |

***

#### LexicalKey

Generates a key identical to those generated automatically by 'LexicalKey' specifications.

**Class:** `LexicalKey`

**Super class:** `Query`

**Properties:**

| Property   | Range       | Desc                                                |
| ---------- | ----------- | --------------------------------------------------- |
| `base`     | `DataValue` | The URI base to the left of the key.                |
| `key_list` | `DataValue` | List of data elements required to generate the key. |
| `uri`      | `NodeValue` | The resulting URI.                                  |

***

#### Like

Distance between strings, similar to a Levenstein distance.

**Class:** `Like`

**Super class:** `Query`

**Properties:**

| Property     | Range       | Desc                                                        |
| ------------ | ----------- | ----------------------------------------------------------- |
| `left`       | `DataValue` | The first string.                                           |
| `right`      | `DataValue` | The second string.                                          |
| `similarity` | `DataValue` | Number between -1 and 1 which gives a scale for similarity. |

***

#### Limit

Limit a query to a particular maximum number of solutions specified by 'limit'. Can be used with start to perform paging.

**Class:** `Limit`

**Super class:** `Query`

**Properties:**

| Property | Range                    | Desc                         |
| -------- | ------------------------ | ---------------------------- |
| `query`  | `Query`                  | The query to perform.        |
| `limit`  | `xsd:nonNegativeInteger` | Maximum number of solutions. |

***

#### Link

Specify an edge pattern which is not terminal, but a link between objects.

**Class:** `Link`

**Super class:** `Query`

**Properties:**

| Property    | Range        | Desc                                                                      |
| ----------- | ------------ | ------------------------------------------------------------------------- |
| `subject`   | `NodeValue`  | A URI or variable which is the source or subject of the graph edge.       |
| `predicate` | `NodeValue`  | A URI or variable which is the edge-label or predicate of the graph edge. |
| `object`    | `NodeValue`  | A URI or variable which is the target or object of the graph edge.        |
| `graph`     | `xsd:string` | An optional graph (either 'instance' or 'schema')                         |

***

#### Lower

Lowercase a string.

**Class:** `Lower`

**Super class:** `Query`

**Properties:**

| Property | Range       | Desc                   |
| -------- | ----------- | ---------------------- |
| `mixed`  | `DataValue` | The mixed case string. |
| `uppser` | `undefined` | The lower case string. |

***

#### Member

Generate or test every element of a list.

**Class:** `Member`

**Super class:** `Query`

**Properties:**

| Property | Range       | Desc                                                          |
| -------- | ----------- | ------------------------------------------------------------- |
| `member` | `DataValue` | The element to test for membership or to supply as generated. |
| `list`   | `DataValue` | The list of elements against which to generate or test.       |

***

#### Minus

Subtract two numbers.

**Class:** `Minus`

**Super class:** `ArithmeticExpression`

**Properties:**

| Property | Range                  | Desc                     |
| -------- | ---------------------- | ------------------------ |
| `left`   | `ArithmeticExpression` | First operand of minus.  |
| `right`  | `ArithmeticExpression` | Second operand of minus. |

***

#### NamedParametricQuery

A named parametric query which names a specific query for later retrieval and re-use and allows the specification of bindings for a specific set of variables in the query.

**Class:** `NamedParametricQuery`

**Properties:**

| Property     | Range        | Desc                                                  |
| ------------ | ------------ | ----------------------------------------------------- |
| `name`       | `xsd:string` | The name of the NamedParametricQuery to be retrieved. |
| `parameters` | `xsd:string` | Variable name list for auxilliary bindings.           |
| `query`      | `Query`      | The query AST as WOQL JSON.                           |

***

#### NamedQuery

A named query names a specific query for later retrieval and re-use.

**Class:** `NamedQuery`

**Properties:**

| Property | Range        | Desc                                       |
| -------- | ------------ | ------------------------------------------ |
| `name`   | `xsd:string` | The name of the NamedQuery to be retrieved |
| `query`  | `Query`      | The query AST as WOQL JSON                 |

***

#### NodeValue

A variable or node. It is a subdocument

**Class:** `NodeValue`

**Properties:**

| Property   | Range        | Desc                           |
| ---------- | ------------ | ------------------------------ |
| `node`     | `xsd:string` | A URI representing a resource. |
| `variable` | `xsd:string` | A variable.                    |

***

#### Not

The negation of a query. Provides no solution bindings, but will succeed if its sub-query fails.

**Class:** `Not`

**Super class:** `Query`

**Properties:**

| Property | Range   | Desc                           |
| -------- | ------- | ------------------------------ |
| `query`  | `Query` | The query which must not hold. |

***

#### Once

Obtains exactly one solution from a query. Simliar to a limit of 1.

**Class:** `Once`

**Super class:** `Query`

**Properties:**

| Property | Range   | Desc                                       |
| -------- | ------- | ------------------------------------------ |
| `query`  | `Query` | The query from which to obtain a solution. |

***

#### Optional

A query which will succeed (without bindings) even in the case of failure.

**Class:** `Optional`

**Super class:** `Query`

**Properties:**

| Property | Range   | Desc              |
| -------- | ------- | ----------------- |
| `query`  | `Query` | The query to run. |

***

#### Or

A disjunction of queries any of which can provide a solution.

**Class:** `Or`

**Super class:** `Query`

**Properties:**

| Property | Range   | Desc                            |
| -------- | ------- | ------------------------------- |
| `or`     | `Query` | List of queries which may hold. |

***

#### Order

Description pending.

**Class:** `Order`

***

#### OrderBy

Orders query results according to an ordering specification.

**Class:** `OrderBy`

**Super class:** `Query`

**Properties:**

| Property   | Range           | Desc                                          |
| ---------- | --------------- | --------------------------------------------- |
| `query`    | `Query`         | The base query giving the solutions to order. |
| `ordering` | `OrderTemplate` | A specification of the ordering of solutions. |

***

#### OrderTemplate

The order template, consisting of the variable and ordering direction. It is a subdocument

**Class:** `OrderTemplate`

**Properties:**

| Property   | Range        | Desc                            |
| ---------- | ------------ | ------------------------------- |
| `order`    | `Order`      | An enum either 'asc' or 'desc'. |
| `variable` | `xsd:string` | The variable to order.          |

***

#### Pad

Pad a string.

**Class:** `Pad`

**Super class:** `Query`

**Properties:**

| Property | Range       | Desc                                                 |
| -------- | ----------- | ---------------------------------------------------- |
| `string` | `DataValue` | The starting string.                                 |
| `char`   | `DataValue` | The padding character.                               |
| `times`  | `DataValue` | The number of times to repeat the padding character. |
| `result` | `DataValue` | The result of the padding as a string.               |

***

#### Path

Find a path through the graph according to 'pattern'. This 'pattern' is a regular graph expression which avoids cycles.

**Class:** `Path`

**Super class:** `Query`

**Properties:**

| Property  | Range         | Desc                                               |
| --------- | ------------- | -------------------------------------------------- |
| `subject` | `Value`       | The starting node.                                 |
| `pattern` | `PathPattern` | The pattern which describes how to traverse edges. |
| `object`  | `Value`       | The ending node.                                   |
| `path`    | `Value`       | An optional list of edges traversed.               |

***

#### PathOr

A set of patterns in which each of the patterns can result in objects starting from our current subject set.

**Class:** `PathOr`

**Super class:** `PathPattern`

**Properties:**

| Property | Range         | Desc                            |
| -------- | ------------- | ------------------------------- |
| `or`     | `PathPattern` | A disjunction of path patterns. |

***

#### PathPattern

Description pending.

**Class:** `PathPattern`

***

#### PathPlus

The path pattern specified by 'plus' must hold one or more times in succession.

**Class:** `PathPlus`

**Super class:** `PathPattern`

**Properties:**

| Property | Range         | Desc             |
| -------- | ------------- | ---------------- |
| `plus`   | `PathPattern` | A path patterns. |

***

#### PathPredicate

A predicate to traverse.

**Class:** `PathPredicate`

**Super class:** `PathPattern`

**Properties:**

| Property    | Range        | Desc                                           |
| ----------- | ------------ | ---------------------------------------------- |
| `predicate` | `xsd:string` | The predicate to use in the pattern traversal. |

***

#### PathSequence

A sequence of patterns in which each of the patterns in the list must result in objects which are subjects of the next pattern in the list.

**Class:** `PathSequence`

**Super class:** `PathPattern`

**Properties:**

| Property   | Range         | Desc                         |
| ---------- | ------------- | ---------------------------- |
| `sequence` | `PathPattern` | A sequence of path patterns. |

***

#### PathStar

The path pattern specified by 'star' may hold zero or more times in succession.

**Class:** `PathStar`

**Super class:** `PathPattern`

**Properties:**

| Property | Range         | Desc             |
| -------- | ------------- | ---------------- |
| `star`   | `PathPattern` | A path patterns. |

***

#### PathTimes

The path pattern specified by 'times' may hold 'from' to 'to' times in succession.

**Class:** `PathTimes`

**Super class:** `PathPattern`

**Properties:**

| Property | Range       | Desc             |
| -------- | ----------- | ---------------- |
| `star`   | `undefined` | A path patterns. |

***

#### Plus

Add two numbers.

**Class:** `Plus`

**Super class:** `ArithmeticExpression`

**Properties:**

| Property | Range                  | Desc                   |
| -------- | ---------------------- | ---------------------- |
| `left`   | `ArithmeticExpression` | First operand of add.  |
| `right`  | `ArithmeticExpression` | Second operand of add. |

***

#### Put

Description pending.

**Class:** `Put`

**Super class:** `Query`

***

#### Query

An abstract class which represents an arbitrary query AST. It is a subdocument

**Class:** `Query`

***

#### QueryResource

Description pending.

**Class:** `QueryResource`

***

#### RandomKey

Generates a key identical to those generated automatically by 'RandomKey' specifications.

**Class:** `RandomKey`

**Super class:** `Query`

**Properties:**

| Property | Range       | Desc                                 |
| -------- | ----------- | ------------------------------------ |
| `base`   | `DataValue` | The URI base to the left of the key. |
| `uri`    | `NodeValue` | The resulting URI.                   |

***

#### ReadDocument

Read a full document from an identifier.

**Class:** `ReadDocument`

**Super class:** `Query`

**Properties:**

| Property     | Range       | Desc                                          |
| ------------ | ----------- | --------------------------------------------- |
| `document`   | `DataValue` | Variable which will be bound to the document. |
| `identifier` | `NodeValue` | The URI of the document to load.              |

***

#### Regexp

Test a string against a PCRE style regex pattern.

**Class:** `Regexp`

**Super class:** `Query`

**Properties:**

| Property  | Range       | Desc                                |
| --------- | ----------- | ----------------------------------- |
| `pattern` | `DataValue` | The PCRE style pattern.             |
| `string`  | `DataValue` | The string to test.                 |
| `result`  | `DataValue` | An optional result list of matches. |

***

#### Select

Select specific variables from a query to return.

**Class:** `Select`

**Super class:** `Query`

**Properties:**

| Property    | Range        | Desc                                            |
| ----------- | ------------ | ----------------------------------------------- |
| `variables` | `xsd:string` | The variables to select from the query.         |
| `query`     | `Query`      | The query which will be run prior to selection. |

***

#### Size

Size of a database in magic units (bytes?).

**Class:** `Size`

**Super class:** `Query`

**Properties:**

| Property   | Range        | Desc                                |
| ---------- | ------------ | ----------------------------------- |
| `resource` | `xsd:string` | The resource to obtain the size of. |
| `size`     | `DataValue`  | The size.                           |

***

#### Source

Description pending.

**Class:** `Source`

***

#### Split

Split a string.

**Class:** `Split`

**Super class:** `Query`

**Properties:**

| Property  | Range       | Desc                        |
| --------- | ----------- | --------------------------- |
| `string`  | `DataValue` | The starting string.        |
| `pattern` | `DataValue` | The splitting pattern.      |
| `list`    | `DataValue` | The result list of strings. |

***

#### Start

Start a query at the nth solution specified by 'start'. Allows resumption and paging of queries.

**Class:** `Start`

**Super class:** `Query`

**Properties:**

| Property | Range                    | Desc                               |
| -------- | ------------------------ | ---------------------------------- |
| `query`  | `Query`                  | The query to perform.              |
| `start`  | `xsd:nonNegativeInteger` | The numbered solution to start at. |

***

#### Substring

Finds the boundaries of a substring in a string.

**Class:** `Substring`

**Super class:** `Query`

**Properties:**

| Property    | Range       | Desc                                                                |
| ----------- | ----------- | ------------------------------------------------------------------- |
| `string`    | `DataValue` | The super-string as data or variable.                               |
| `substring` | `DataValue` | The super-string as data or variable.                               |
| `length`    | `DataValue` | The length of the string as an integer or variable.                 |
| `before`    | `DataValue` | The count of characters before substring as an integer or variable. |
| `after`     | `DataValue` | The count of characters after substring as an integer or variable.  |

***

#### Subsumption

Provides class subsumption (the inheritance model) according to the schema design. True whenver 'child' is a child of 'parent'. Can be used as a generator or a check.

**Class:** `Subsumption`

**Super class:** `Query`

**Properties:**

| Property | Range       | Desc                                  |
| -------- | ----------- | ------------------------------------- |
| `child`  | `NodeValue` | The child class as a URI or variable. |
| `parent` | `NodeValue` | The parent class as a URI or variable |

***

#### Sum

Sum a list of strings.

**Class:** `Sum`

**Super class:** `Query`

**Properties:**

| Property | Range       | Desc                               |
| -------- | ----------- | ---------------------------------- |
| `list`   | `DataValue` | The list of numbers to sum.        |
| `result` | `DataValue` | The result of the sum as a number. |

***

#### Trim

Trims whitespace from 'untrimmed'.

**Class:** `Trim`

**Super class:** `Query`

**Properties:**

| Property    | Range       | Desc                      |
| ----------- | ----------- | ------------------------- |
| `untrimmed` | `DataValue` | The untrimmed string.     |
| `trimmed`   | `DataValue` | The string to be trimmed. |

***

#### Triple

Specify an edge pattern in the graph.

**Class:** `Triple`

**Super class:** `Query`

**Properties:**

| Property    | Range        | Desc                                                                         |
| ----------- | ------------ | ---------------------------------------------------------------------------- |
| `subject`   | `NodeValue`  | A URI or variable which is the source or subject of the graph edge.          |
| `predicate` | `NodeValue`  | A URI or variable which is the edge-label or predicate of the graph edge.    |
| `object`    | `Value`      | A URI, datatype or variable which is the target or object of the graph edge. |
| `graph`     | `xsd:string` | An optional graph (either 'instance' or 'schema')                            |

***

#### TripleCount

The number of edges in a database.

**Class:** `TripleCount`

**Super class:** `Query`

**Properties:**

| Property   | Range        | Desc                                   |
| ---------- | ------------ | -------------------------------------- |
| `resource` | `xsd:string` | The resource to obtain the edges from. |
| `count`    | `DataValue`  | The count of edges.                    |

***

#### True

The query which is always true.

**Class:** `True`

**Super class:** `Query`

***

#### Typecast

Casts one type as another if possible.

**Class:** `Typecast`

**Super class:** `Query`

**Properties:**

| Property | Range       | Desc                            |
| -------- | ----------- | ------------------------------- |
| `value`  | `Value`     | The value to cast.              |
| `type`   | `NodeValue` | The type to which to cast.      |
| `result` | `Value`     | The resulting value after cast. |

***

#### UpdateDocument

Update a document in the graph.

**Class:** `UpdateDocument`

**Super class:** `Query`

**Properties:**

| Property     | Range       | Desc                                                                             |
| ------------ | ----------- | -------------------------------------------------------------------------------- |
| `document`   | `DataValue` | The document to update. Must either have an '@id' or have a class specified key. |
| `identifier` | `NodeValue` | An optional returned identifier specifying the documentation location.           |

***

#### Upper

Uppercase a string.

**Class:** `Upper`

**Super class:** `Query`

**Properties:**

| Property | Range       | Desc                   |
| -------- | ----------- | ---------------------- |
| `mixed`  | `DataValue` | The mixed case string. |
| `uppser` | `undefined` | The upper case string. |

***

#### Using

Select a specific collection for query.

**Class:** `Using`

**Super class:** `Query`

**Properties:**

| Property     | Range        | Desc                                                    |
| ------------ | ------------ | ------------------------------------------------------- |
| `collection` | `xsd:string` | The resource over which to run the query.               |
| `query`      | `Query`      | The query which will be run on the selected collection. |

***

#### Value

A variable, node or data point. It is a subdocument

**Class:** `Value`

**Properties:**

| Property   | Range               | Desc                           |
| ---------- | ------------------- | ------------------------------ |
| `node`     | `xsd:string`        | A URI representing a resource. |
| `variable` | `xsd:string`        | A variable.                    |
| `list`     | `Value`             | A list of datavalues           |
| `data`     | `xsd:anySimpleType` | An xsd data type value.        |
