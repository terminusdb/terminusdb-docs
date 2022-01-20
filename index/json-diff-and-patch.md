---
description: >-
  Introduction to JSON Diff and Patch (JSON-DP) with examples of the available
  operations.
---

# JSON Diff and Patch

JSON objects are a common way of representing data for software development. The serialization of JSON is simple and facilitates communication via networks and storage in databases. Almost all modern programming languages support JSON objects natively.

When objects are modified in distributed systems, it is useful to compare versions of an object to see what has changed. This is where **diff** and **patch** come in.

### Diff

A **diff** takes two JSON objects and presents any differences between them. Diff has several uses. A key use is displaying a clear summary of differences between large objects, enhancing the visibility of changes. This enables manual or user-interface assisted action to resolve changes. Actions include retaining the original object, changing to the new (or latest) version of the object, or creating an entirely new version of the object.

### Patch

A **patch** applies a diff to two objects to obtain a new object with any differences highlighted. A patch is applied individually or in bulk to a patch endpoint that will apply the patch to the specified data product.

## Diff and Patch Operations

The available diff and patch operations:

### Copy Diff

Copy is implicit. All properties which are not specifically mentioned will be considered part of an implicit copy. This will make patches more compressed and easier to specify by hand.

### Mandatory Diff

`@before`/`@after` instructions contain objects specified as tightly as required to obtain ids, or as ids.

```jsx
{ '@id' : "Person/jim",
  'date_of_birth' : { '@op' : 'SwapValue',
                      '@before' : "1928-03-05",
                      '@after' : "1938-03-05"
                    }}
```

### Optional Diff

Optional diffs also contain `@before`/`@after` designations, but potentially `null` fields to describe missing elements.

```jsx
{ '@id' : "Object/my_object",
  'name' : { '@op' : 'SwapValue',
             '@before' : null,
             '@after' : "Jim" }}
```

### Set Diff / Cardinality Diff

Set requires the ability to explicitly remove or add elements - we can do this by maintaining a `@before`/`@after` with a list of those which exist _only_ on the left, and _only_ on the right.

### List Diff

The list diff requires swaps at a position. We use, `@copy`, `@swap` and `@keep`.

#### Copy List

Copy the previous list from `From_Position` to \`To\_Position.

```jsx
{ "@op" : "CopyList",
  "@to" : To_Position,
  "@rest" : Diff }
```

#### Swap List

Swap out the list starting from the current point from `Previous` to `Next`. This can be used to extend, or drop elements as well as do full replacement.

```jsx
{ "@op" : "SwapList",
  "@before" : Previous,
  "@after" : Next,
  "@rest" : Diff }
```

#### Patch List

Patch the list starting from the current point with the patch list in "@patch". The patch must be less than or equal to the length of the list.

```jsx
{ "@op" : "PatchList",
  "@patch" : Patch,
  "@rest" : Diff }
```

#### Example:

```jsx
var Patch =
{ '@id' : "TaskList/my_tasks",
  'tasks' : { '@op' : "CopyList",                      % Replace List
              '@to' : 2,
              '@rest' : { '@op' : "PatchList",
                          '@patch' : [{ '@op' : "SwapValue",
                                        '@before' : "Task/shopping",
                                        '@after' : "Task/climbing"},
                                      { '@op' : "SwapValue",
                                        '@before' : "Task/cleaning",
                                        '@after' : "Task/dining"},
                                      { '@op' : "SwapValue",
                                        '@before' : "Task/fishing",
                                        '@after' : "Task/travelling"}],
                          '@rest' : { '@op' : "KeepList" } } }}
var Before =
{ '@id' : "TaskList/my_tasks",
  'tasks' : ["Task/driving", "Task/reading", "Task/shopping",
             "Task/cleaning","Task/fishing", "Task/arguing"] }
var After =
{ '@id' : "TaskList/my_tasks",
  'tasks' : ["Task/driving", "Task/reading", "Task/climbing",
             "Task/dining", "Task/travelling", "Task/arguing"] }
```

### Array Diff

Arrays will allow index swapping or "shrink" and "grow".

### Force Diff

A "Force Diff" will set the value of a location regardless of the current read-state. This is a potentially unsafe operation as there is no guarantee we are seeing the object state version we think we are.

```jsx
{ '@id' : "Employee/012" ,
  'name' : { '@op' : 'ForceValue',
             '@after' : "Jake" }}
```

### Table Diff

A Table diff requires swaps at two positions and subdivision of each patch into squares: Top-Left (in which we make the patch) Top-Right, Bottom-Left and Bottom-Right, each of which will be computed with the help of an additional Diff. We use `CopyTable`, `SwapTable` and `KeepTable`. Schematically the diff is a context with a current hole in the upper-right hand corner as follows:

```jsx
-----------------------
|          |          |
| Swap /   |   Top    |
| Copy     |   Right  |
| instr.   |   Diff   |
|          |          |
-----------------------
|          |          |
|  Bttom   |  Bottom  |
|  Left    |  Right   |
|  Diff    |  Diff    |
|          |          |
-----------------------
```

We will recursively patch the table by applying the diffs in the various corners.

#### Example Table

This might apply to an object as follows:

```jsx
{ '@id' : "Excel/012" ,
  'sheets' : [{ '@id' : "Excel/012/sheet/Sheet/1",
                'cells' :
                { '@op' : "SwapTable",
                  '@before' : [[ { 'Value' : "10", ... },
                                 { 'Value' : "20", ... },
                                 { 'Value' : "30", ... } ],
                               [ { 'Value' : "40", ... },
                                 { 'Value' : "50", ... },
                                 { 'Value' : "60", ... } ]
                               [ { 'Value' : "70", ... },
                                 { 'Value' : "80", ... },
                                 { 'Value' : "90", ... } ] ],
                  '@after' : [[ { 'Value' : "1", ... },
                                { 'Value' : "2", ... },
                                { 'Value' : "3", ... } ],
                              [ { 'Value' : "4", ... },
                                { 'Value' : "5", ... },
                                { 'Value' : "6", ... } ]
                              [ { 'Value' : "7", ... },
                                { 'Value' : "8", ... },
                                { 'Value' : "9", ... } ] ],
                  '@after' : { '@op' : "KeepTable" },
                  '@bottom_left' : { '@op' : "KeepTable" },
                  '@top_right' : { '@op' : "KeepTable" },
                  '@bottom_right' : { '@op' : "KeepTable" }
                }}]}
```

Application would take a table through the following transformation:

```
| 10 | 20 | 30 | A | B | C |
| 40 | 50 | 60 | D | E | F |
| 70 | 80 | 90 | G | H | I |
| X  | Y  | Z  | O | O | O |
| X  | Y  | Z  | O | O | O |
| X  | Y  | Z  | O | O | O |
=>
| 1  | 2  | 3  | A | B | C |
| 4  | 5  | 6  | D | E | F |
| 7  | 8  | 9  | G | H | I |
| X  | Y  | Z  | O | O | O |
| X  | Y  | Z  | O | O | O |
| X  | Y  | Z  | O | O | O |
```

#### Copy Table

```jsx
{ '@op' : "CopyTable"
  '@to_row' : To_Row,           % integer
  '@to_column' : To_Column,     % integer
  '@bottom_left' : Diff_BL,     % A Table Diff
  '@top_right' : Diff_TR,       % A Table Diff
  '@bottom_right' : Diff_BR     % A Table Diff
  }
```

#### Swap Table

Swap instructions will give a before table as a JSON list of lists for both the before and after. These tables need not have the same dimensions. This operation subsumes extension and drop of rows and columns as well as full replacement.

```jsx
{ '@op' : "SwapTable",
  '@before' : Diff_Before,
  '@after' : Diff_After,
  '@bottom_left' : Diff_BL,
  '@top_right' : Diff_TR,
  '@bottom_right' : DIff_BR
  }
```

#### Patch Table

Patch the table starting from the current point with the patch table in `@patch`. The patch must be less than or equal to the length of the list.

```jsx
{ "@op" : "PatchTable",
  "@patch" : Patch,
  '@bottom_left' : Diff_BL,
  '@top_right' : Diff_TR,
  '@bottom_right' : DIff_BR
}
```

#### Keep Table

`@keep` instructions are degenerate copies.

```
{ '@keep' : "Table" }
```

### Examples

Examples of Patch:

```jsx
var Original = {
        '@id': "EmployeesFromCSV/001",
        '@type': "EmployeesFromCSV",
        employee_id: "001",
        name: "Destiny Norris",
        team: "Marketing",
        title: "Marketing Manager"
      },
var Diff = {
        '@id': "EmployeesFromCSV/001",
        name: { '@op' : 'SwapValue', '@before' : "Destiny Norris", '@after' : "Destiny Morris" },
      },
var Final = {
        '@id': "EmployeesFromCSV/001",
        '@type': "EmployeesFromCSV",
        employee_id: "001",
        name: "Destiny Norris",
        team: "Marketing",
        title: "Marketing Manager"
      },
patch(Diff,Original,Final).
=> true
```

## Diff and Patch Endpoints

The Patch and Diff endpoints expose endpoints for clients to obtain diffs or patches of data.

### Diff

The diff endpoint takes a POST of two JSON documents, _before_, and _after_. This endpoint then returns a 200 and a patch which takes _before_ to _after_ if applied using the patch interface. The payload is structured as a JSON document, with two keys, `"before"` and `"after"`, pointing to the documents you would like to diff.

An example of the payload:

```json
{ "before" : { "@id" : "Person/Jane", "@type" : "Person", "name" : "Jane"},
  "after" :  { "@id" : "Person/Jane", "@type" : "Person", "name" : "Janine"}}
```

Which would result in the following patch:

```json
{ "name" : { "@op" : "SwapValue", "@before" : "Jane", "@after": "Janine" }}
```

Some examples using curl are as follows:

```shell
$ curl -X POST -H "Content-Type: application/json" 'http://127.0.0.1:6363/api/diff' -d @-
  { "before" : [{ "asdf" : "foo"}], "after" : [{ "asdf" : "bar"}]}
[ {"asdf": {"@after":"bar", "@before":"foo", "@op":"SwapValue"}} ]
```

```bash
$ curl -X POST -H "Content-Type: application/json" 'http://127.0.0.1:6363/api/diff' -d @-
{ "before" : [0,1,2], "after" : [0,1,2,3]}
{
  "@op":"CopyList",
  "@rest": {
    "@after": [3 ],
    "@before": [],
    "@op":"SwapList",
    "@rest": {"@op":"KeepList"}
  },
  "@to":3
}
```

```bash
$ curl -X POST -H "Content-Type: application/json" 'http://127.0.0.1:6363/api/diff' -d @-
{ "before" : { "asdf" : { "fdsa" : "quux"}}, "after" : { "asdf" : { "fdsa" : "quuz" }}}
{
  "asdf": {"fdsa": {"@after":"quuz", "@before":"quux", "@op":"SwapValue"}}
}
```

### Patch

Patch takes a POST with a _before_ document and a _patch_ and produces an _after_ document.

```json
{ "before" : { "@id" : "Person/Jane", "@type" : "Person", "name" : "Jane"}
  "patch" : {"name" : { "@op" : "ValueSwap", "@before" : "Jane", "@after": "Janine" }}}
```

Resulting in the following document:

```json
{ "@id" : "Person/Jane", "@type" : "bahPerson", "name" : "Janine"}
```

Some examples using curl are as follows:

```shell
$ curl -X POST -H "Content-Type: application/json" 'http://127.0.0.1:6363/api/patch' -d @-
{ "before" : { "alpha" : 1, "asdf" : { "fdsa" : "quux"}}, "patch" : {
  "asdf": {"fdsa": {"@after":"quuz", "@before":"quux", "@op":"SwapValue"}}
}}
{"alpha":1, "asdf": {"fdsa":"quuz"}}

```

```bash
$ curl -X POST -H "Content-Type: application/json" 'http://127.0.0.1:6363/api/patch' -d @-
{ "before" : [0,1,2], "patch" : {
  "@op":"CopyList",
  "@rest": {
    "@after": [3 ],
    "@before": [],
    "@op":"SwapList",
    "@rest": {"@op":"KeepList"}
  },
  "@to":3
}}
[0, 1, 2, 3 ]
```
