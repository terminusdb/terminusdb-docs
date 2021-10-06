---
layout: default
title: WOQL Primitives
parent: WOQL.js - the Definitive Guide
grand_parent: Reference
nav_order: 5
permalink: /reference/woql/primitives
---

# WOQL Primitives

WOQL primitives are WOQL.js functions which directly map onto words in the underlying JSON-LD language. All other WOQL.js functions are compound functions which translate into multiple WOQL primitives, or are helper functions which reduce the need to write verbose JSON-LD directly.


## Basics

<!-- triple -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">triple</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Generates a triple pattern matching rule to match any triples that meet the constraints

### Syntax

```js

triple(Subject, Predicate, Object)
```

### Arguments  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Subject  </span>         | (string*) - The IRI of a triple's subject or a variable              | Mandatory                  |
| <span class="param-type">Predicate </span>        | (string*) - The IRI of a property or a variable                      | Mandatory                  |
| <span class="param-type">Object </span>           | (string*) - The IRI of a node or a variable, or a literal            | Mandatory                  |


## Returns 

 A WOQLQuery object containing the triple pattern matching rule

<div class="anchor-sub-parts">Example</div>



```js

let [subj, obj] = vars("subj", "obj")

triple(s, "type", o)
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!-- quad -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">quad</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Generates a quad pattern matching rule to match any triples that meet the constraints in the specified Graph

<div class="anchor-sub-parts">Syntax</div>

```js

quad(Subject, Predicate, Object, Graph)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Subject  </span>         | (string*) - The IRI of a triple's subject or a variable              | Mandatory                  |
| <span class="param-type">Predicate </span>        | (string*) - The IRI of a property or a variable                      | Mandatory                  |
| <span class="param-type">Object </span>           | (string*) - The IRI of a node or a variable, or a literal            | Mandatory                  |
| <span class="param-type">Graph </span>            | (string*) - The Resource String identifying the graph to be searched for the pattern| Mandatory   |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery object containing the quad pattern matching rule


<div class="anchor-sub-parts">Example</div>



```js
let [class, prop] = vars("class", "prop")

quad(class, "domain", prop, "schema/main")
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!-- comment -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">comment</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Inserts a textual comment into a query and optionally 'comments' out the contained subquery

<div class="anchor-sub-parts">Syntax</div>

```js

comment(Comment, Subq)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Comment  </span>         | (string*) - The textual comment                                      | Mandatory                  |
| <span class="param-type">Subq </span>             | (string*) - (WOQLQuery) - An optional enclosed sub-query that is commented out <br/> <span class="status-comment"> Note: </span> Subq is an argument or a chained query | Mandatory                  |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery object containing the comment


<div class="anchor-sub-parts">Example</div>



```js
comment("This has a bug").triple(a, b, c)
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->    

<!--select-->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">select</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Selects (filters) a list of variables from the enclosed sub-query and removes the rest

<div class="anchor-sub-parts">Syntax</div>

```js

select(...Vars, Subq)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">...Vars  </span>         | (string*) - A list of one or more variables to select                | Mandatory                  |
| <span class="param-type">Subq </span>             | (string*) - (WOQLQuery) - A query from which the variables will be filtered out <br/> <span class="status-comment"> Note: </span> Subq is an argument or a chained query | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery object containing the filtered variables and subquery

<div class="anchor-sub-parts">Example</div>



```js
let [grouped, subject, class] = vars("grouped", "subject", "class")

select(grouped).group_by(subject, class, grouped).triple(subject, "type", class)   
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->    

<!-- and -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">and</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Logical conjunction of the contained queries - all queries must match or the entire clause fails

<div class="anchor-sub-parts">Syntax</div>

```js

and(...Subqueries)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">...Subqueries  </span>   | (WOQLQuery*) - A list of one or more woql queries to execute as a conjunction  | Mandatory        |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery object containing the conjunction of queries

<div class="anchor-sub-parts">Example</div>


```js
let [subject, class, label] = vars("subject", "class", "label")

and(
    triple(subject, 'type', class),
    triple(subject, "label", label)
)
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->    
<!-- or -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">or</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Logical Or of the contained queries - the first subquery to match will cause subsequent subqueries to not be evaluated

<div class="anchor-sub-parts">Syntax</div>

```js

or(...Subqueries)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">...Subqueries  </span>   | (WOQLQuery*) - A list of one or more woql queries to execute as alternatives  | Mandatory        |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery object containing the logical Or of the subqueries

<div class="anchor-sub-parts">Example</div>


```js
let [subject] = vars("subject")

or(
    triple(subject, 'label', "A"),
    triple(subject, "label", "a")
)

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->    
<!-- opt -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">opt</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Specifies that the Subquery is optional - if it does not match the query will not fail

<div class="anchor-sub-parts">Syntax</div>

```js
opt(Subquery) ~ optional(Subquery) (alias))
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Subquery  </span>      | (WOQLQuery*) - A subquery which will be optionally matched <br/> <span class="status-comment"> Note: </span> Subq is an argument or a chained query           | Mandatory        |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery object containing the optional sub Query

<div class="anchor-sub-parts">Example</div>


```js
let [subject] = vars("subject")

opt().triple(subject, 'label', "A")
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->  

<!-- not -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">not</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Logical negation of the contained subquery - if the subquery matches, the query will fail to match

<div class="anchor-sub-parts">Syntax</div>

```js
not(Subquery)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Subquery  </span>        | (WOQLQuery*) - A subquery which will be negated   <br/> <span class="status-comment"> Note: </span> Subq is an argument or a chained query                    | Mandatory        |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery object containing the negated sub Query

<div class="anchor-sub-parts">Example</div>


```js
let [subject, label] = vars("subject", "label")

not().triple(subject, 'label', label)
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->  

<!-- isa -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">isa</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Tests whether a given instance IRI has type Class

<div class="anchor-sub-parts">Syntax</div>

```js
isa(IRI, Class)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Instance_IRI  </span>    | (string*) - A string IRI or a variable                               | Mandatory                  |
| <span class="param-type">Class  </span>           | (string*) - A Class IRI or a variable                                | Mandatory                  |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery object containing the type test

<div class="anchor-sub-parts">Example</div>


```js
let [subject] = vars("subject")

isa(subject, "Person")
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->  
<!-- sub -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">sub</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Tests whether a given Class subsumes another class

<div class="anchor-sub-parts">Syntax</div>

```js
sub(ClassA, ClassB) ~ subsumption(ClassA, ClassB) (Alias)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">ClassA  </span>          | (string*) - A Class IRI or a variable representing the subsuming (parent) class | Mandatory       |
| <span class="param-type">Class  </span>           | (string*) - A Class IRI or a variable representing the subsumed (child) class   | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery object containing the subsumption test

<div class="anchor-sub-parts">Example</div>


```js
let [class] = vars("class")

sub("Vegetable", class)
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->  

<!-- unique -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">unique</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Generate a new IRI from the prefix and a hash of the variables which will be unique for any given combination of variables

<div class="anchor-sub-parts">Syntax</div>

```js
unique(Prefix, Vars, NewIRI)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Prefix  </span>          | (string*) - A prefix for the IRI - typically formed of the doc prefix and the classtype of the entity ("doc:Person") | Mandatory       |
| <span class="param-type">Vars  </span>           | ([string*]) - An array of variables and / or strings from which the unique hash will be generated   | Mandatory       |
| <span class="param-type">NewIRI  </span>           | (string*) - Variable in which the unique ID is stored   | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery object containing the unique ID generating function

<div class="anchor-sub-parts">Example</div>


```js
let [newid] = vars("newid")

unique("doc:Person", ["John", "Smith"], newid)
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->  
<!-- idgen -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">idgen</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Generate a new IRI from the prefix and concatention of the variables

<div class="anchor-sub-parts">Syntax</div>

```js
idgen(Prefix, Vars, NewIRI) ~ idgenerator(Prefix, Vars, NewIRI) (Alias)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Prefix  </span>          | (string*) - A prefix for the IRI - typically formed of the doc prefix and the classtype of the entity ("doc:Person") | Mandatory       |
| <span class="param-type">Vars  </span>           | ([string*]) - An array of variables and / or strings from which the id will be generated   | Mandatory       |
| <span class="param-type">NewIRI  </span>           | (string*) - Variable in which the unique ID is stored   | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery object containing the ID generating function

<div class="anchor-sub-parts">Example</div>


```js
let [newid] = vars("newid")

idgen("doc:Person", ["John", "Smith"], newid)
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->  

<!-- true -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">true</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

A function that always matches, always returns true

<div class="anchor-sub-parts">Syntax</div>

```js
true()
```

<div class="anchor-sub-parts">Arguments</div>  
None

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery object containing the true value that will match any pattern

<div class="anchor-sub-parts">Example</div>


```js
when(true()).triple("a", "b", "c")
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->  
<!-- eq -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">eq</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Tests whether the two arguments are equal

<div class="anchor-sub-parts">Syntax</div>

```js
eq(A, B) ~ equal(A, B) (Alias)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">A  </span>          | ([string] or literal*) - A variable or IRI or any literal (e.g. number, string) or basic datatype | Mandatory       |
| <span class="param-type">B  </span>          | ([string] or literal*) - A variable or IRI or any literal (e.g. number, string) or basic datatype  | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery object containing the ID that matches

<div class="anchor-sub-parts">Example</div>


```js
let [nid] = vars("mike")
idgen("doc:mike", nid)
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->  
<!-- start -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">start</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Specifies an offset position in the results to start listing results from

<div class="anchor-sub-parts">Syntax</div>

```js
start(Start, Subq)
```

<div class="anchor-sub-parts">Arguments</div>  


| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Start  </span>      | (integer*) - A variable that refers to an interger or an integer literal (e.g. number, string) | Mandatory       |
| <span class="param-type">Subq  </span>       | (WOQLQuery*) - An array of variables and / or strings from which the id will be generated <br/> <span class="status-comment"> Note: </span> Subq is an argument or a chained query
  | Mandatory       |



<div class="anchor-sub-parts">Returns</div>
A WOQLQuery whose results will be returned starting from the specified offset

<div class="anchor-sub-parts">Example</div>


```js
let [a, b, c] = vars("a", "b", "c")

start(100).triple(a, b, c)
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->  
<!-- limit -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">limit</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Specifies a maximum number of results that will be returned from the subquery

<div class="anchor-sub-parts">Syntax</div>

```js
limit(Limit, Subq)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Limit  </span>      | (integer/string*) - A variable that refers to an non-negative integer or a non-negative integer | Mandatory       |
| <span class="param-type">Subq  </span>       | A subquery whose results will be limited  <br/> <span class="status-comment"> Note: </span> Subq is an argument or a chained query | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery whose results will be returned starting from the specified offset

<div class="anchor-sub-parts">Example</div>


```js
let [a, b, c] = vars("a", "b", "c")

limit(100).triple(a, b, c)
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->  

<!--path -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">path</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Performs a path regular expression match on the graph  

<div class="anchor-sub-parts">Syntax</div>

```js
path(Subject, Pattern, Object, Path)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Subject  </span>    |(string*) - An IRI or variable that refers to an IRI representing the subject, i.e. the starting point of the path| Mandatory       |
| <span class="param-type">Pattern  </span>    | (string*) - A path regular expression describing a pattern through multiple edges of the graph <br/> Path regular expressions consist of a sequence of predicates and / or a set of alternatives, with quantification operators <br/> The characters that are interpreted specially are the following: <br/>  - representing alternative choices <br/> , - representing a sequence of predcitates <br/> + - Representing a quantification of 1 or more of the preceding pattern in a sequence <br/> {min, max} - Representing at least min examples and at most max examples of the preceding pattern <br/>* - Representing any predicate<br/>() - Parentheses, interpreted in the normal way to group clauses <br/>| Mandatory       |
| <span class="param-type">Object  </span>    |(string*) - An IRI or variable that refers to an IRI representing the object, i.e. ending point of the path| Mandatory       |
| <span class="param-type">Path  </span>    |(string*) - A variable in which the actual paths traversed will be stored| Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the path regular expression matching expression

<div class="anchor-sub-parts">Example</div>


```js
let [person, grand_uncle, lineage] = vars("person", "grand uncle", "lineage")

path(person, ((father|mother) {2,2}), brother), grand_uncle, lineage)  
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->  

<!-- order_by -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">order by</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Orders the results of the contained subquery by a precedence list of variables

<div class="anchor-sub-parts">Syntax</div>

```js
order_by(...Ordervars, Subq)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Ordervars  </span>  | (string*) - A sequence of variables, by which to order the results, each optionally followed by either "asc" or "desc" to represent order | Mandatory       |
| <span class="param-type">Subq  </span>       | (WOQLQuery*) - The query whose results will be ordered  <br/> <span class="status-comment"> Note: </span> Subq is an argument or a chained query | Mandatory       |



<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the ordering expression

<div class="anchor-sub-parts">Example</div>


```js
let [person, last_name, first_name] = vars("person", "last name", "first name")

order_by(last_name, "asc", first_name, "desc")
    .triple(person, "first_name", first_name)
    .triple(person, "last_name", last_name)
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->
<!-- group_by -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">group by</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Groups the results of the contained subquery on the basis of identical values for Groupvars, extracts the patterns defined in PatternVars and stores the results in GroupedVar

<div class="anchor-sub-parts">Syntax</div>

```js
group_by(GroupVars, PatternVars, GroupedVar, Subq)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">GroupVars  </span>  | ([string] or string*) - Either a single variable or an array of variables | Mandatory       |
| <span class="param-type">PatternVars  </span>       | ([string] or string*) Either a single variable or an array of variables | Mandatory       |
| <span class="param-type">GroupedVar  </span>       | (string*) A variable | Mandatory       |
| <span class="param-type">Subq  </span>       | (WOQLQuery*) - The query whose results will be grouped <br/> <span class="status-comment"> Note: </span> Subq is an argument or a chained query | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the grouping expression

<div class="anchor-sub-parts">Example</div>


```js
let [age, last_name, first_name, age_group, person] = vars("age", "last name", "first name", "age group", "person")

group_by(age, [last_name, first_name], age_group)
    .triple(person, "first_name", first_name)
    .triple(person, "last_name", last_name)
    .triple(person, "age", age)

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->
<!-- cast -->


<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">cast</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Casts the value of Input to a new value of type Type and stores the result in CastVar

<div class="anchor-sub-parts">Syntax</div>

```js
cast(Input, Type, CastVar) ~ typecast(InputVar, Type, CastVar) (Alias)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Input  </span>  | ([string] or literal*) - Either a single variable or a literal of any basic type | Mandatory       |
| <span class="param-type">Type  </span>       | Type ([string] or string*) Either a variable or a basic datatype (xsd / xdd) | Mandatory       |
| <span class="param-type">CastVar  </span>       | CastVar (string*) A variable | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
 A WOQLQuery which contains the casting expression

<div class="anchor-sub-parts">Example</div>


```js
let [time] = vars("time")

cast("22/3/98", "xsd:dateTime", time)

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->



### List Processing

<!--member-->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">member</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Matches if List includes Element

<div class="anchor-sub-parts">Syntax</div>

```js
member(Element, List)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Element  </span>    | (string or literal*) - Either a variable, IRI or any simple datatype | Mandatory       |
| <span class="param-type">List  </span>       | List ([string, literal] or string*) Either a variable representing a list or a list of variables or literals | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the List inclusion pattern matching expression

<div class="anchor-sub-parts">Example</div>


```js
let [name] = vars("name")

member(name, ["john", "joe", "frank"])

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->
<!-- length -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">length</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Matches or generates the length of a list  

<div class="anchor-sub-parts">Syntax</div>

```js
length(List, Len)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">List  </span>       |([string, literal] or string*) Either a variable representing a list or a list of variables or literals | Mandatory       |
| <span class="param-type">Len  </span>       |(string or integer) A variable in which the length of the list is stored or the length of the list as a non-negative integer | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Length pattern matching expression

<div class="anchor-sub-parts">Example</div>


```js
let [count] = vars("count")

length(["john", "joe", "frank"], count)  

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->
### String Processing

<!-- concat -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">concat</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Concatenates the List into a string and matches / stores the result in Concatenated


<div class="anchor-sub-parts">Syntax</div>

```js
concat(List, Concatenated)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">List  </span>       |([string] string*) - a variable representing a list or a list of variables or strings - variables can be embedded in the string if they do not contain spaces| Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Concatenation pattern matching expression

<div class="anchor-sub-parts">Example</div>


```js
let [first_name, last_name, full_name] = vars("first", "last", "full")

concat([first_name, " ", last_name], full_name)  

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->
<!-- trim -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">trim</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

A trimmed version of Untrimmed (with leading and trailing whitespace removed) is stored in Trimmed   


<div class="anchor-sub-parts">Syntax</div>

```js
trim(Untrimmed, Trimmed)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Untrimmed  </span>  |(string*) - A string or variable containing the untrimmed version of the string| Mandatory       |
| <span class="param-type">Trimmed  </span>    |(string*) - A string or variable containing the trimmed version of the string| Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Trim pattern matching expression

<div class="anchor-sub-parts">Example</div>


```js
let [trimmed] = vars['trimmed']

trim("hello   ", trimmed)
//trimmed contains "hello"

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->     
<!-- substr -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">substr</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Generates a Substring From String, starting from Begin offset, of length Length, with After Number of characters after the substring

<div class="anchor-sub-parts">Syntax</div>

```js
substr(String, Before, Length, After, SubString) ~ substring(String, Before, Length, After, SubString) (Alias)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">String  </span>     |(string*) - String or variable representing the full string           | Mandatory       |
| <span class="param-type">Before  </span>     |(string or integer*) Integer or variable representing the number of characters from the start to start the substring from| Mandatory       |
| <span class="param-type">Length  </span>     |(string or integer*) Integer or variable representing the number of characters in the substring| Mandatory       |
| <span class="param-type">After  </span>      |(string or integer*) Integer or variable representing the number of characters from the end to end the substring from| Mandatory       |
| <span class="param-type">SubString  </span>  |(string*) - The substring matched according to the values specified in the other arguments| Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Substring pattern matching expression

<div class="anchor-sub-parts">Example</div>


```js
let [trimmed] = ['trimmed']

substr("helloIAmTerminusDb", 8, 8, 2, )
//trimmed contains "hello"

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->     


<!-- upper -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">upper</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Generates or matches an upper-case version of String in Capitalized

<div class="anchor-sub-parts">Syntax</div>

```js
upper(String, Capitalized)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">String  </span>     |((string*) - string or variable representing the uncapitalized string         | Mandatory       |
| <span class="param-type">Capitalized  </span>     |(string*) - string or variable representing the capitalized string| Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Upper case pattern matching expression

<div class="anchor-sub-parts">Example</div>


```js
let [allcaps] = vars("caps")

upper("aBCe", allcaps)
//upper contains "ABCE"
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->     

<!--lower-->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">lower</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Generates or matches a lower-case version of String in LowerCased

<div class="anchor-sub-parts">Syntax</div>

```js
lower(String, LowerCased)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">String  </span>     |(string*) - string or variable representing the non-lowercased string | Mandatory       |
| <span class="param-type">LowerCased  </span> |(string*) - string or variable representing the lowercased string     | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Lower Case pattern matching expression

<div class="anchor-sub-parts">Example</div>


```js
let [lower] = var("l")

lower("aBCe", lower)
//lower contains "abce"
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->     

<!-- pad -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">pad</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Pads out the string Input to be exactly Len long by appending the Pad character the necessary number of times to form Output

<div class="anchor-sub-parts">Syntax</div>

```js
pad(Input, Pad, Len, Output)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Input  </span>     |(string*) - The input string or variable in unpadded state | Mandatory       |
| <span class="param-type">Pad  </span>       |(string*) - The characters to use to pad the string or a variable representing them     | Mandatory       |
| <span class="param-type">Len  </span>       |(string or integer*) - The variable or integer value representing the length of the output string | Mandatory       |
| <span class="param-type">Output  </span>    |(string*) - The variable or string representing the padded version of the input string | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Pad pattern matching expression

<div class="anchor-sub-parts">Example</div>


```js
let [fixed] = vars("fixed length")

pad("joe", " ", 8, fixed)
//fixed contains "joe     "
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->    

<!-- split -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">split</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Splits a string (Input) into a list strings (Output) by removing separator  

<div class="anchor-sub-parts">Syntax</div>

```js
split(Input, Separator, Output)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Input  </span>     |(string*) - A string or variable representing the unsplit string | Mandatory       |
| <span class="param-type">Separator  </span> | (string*) - A string or variable containing a sequence of charatcters to use as a separator | Mandatory       |
| <span class="param-type">Output  </span>    |(string, [string]) - A variable representing a list, or a list of variables and / or strings | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Split pattern matching expression

<div class="anchor-sub-parts">Example</div>


```js
let [words] = vars("words")

split("joe has a hat", " ", words)
//words contains ["joe", "has", "a", "hat"]
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->    
<!--- join -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">join</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Joins a list variable together (Input) into a string variable (Output) by glueing the strings together with Glue

<div class="anchor-sub-parts">Syntax</div>

```js
join(Input, Glue, Output)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Input  </span>     | (string / [string]*) - a variable representing a list or a list of strings and / or variables | Mandatory       |
| <span class="param-type">Glue  </span> | (string*) - A variable or string representing the characters to put in between the joined strings in input | Mandatory       |
| <span class="param-type">Output  </span>    |(string*) - A variable or string containing the output string | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Join pattern matching expression

<div class="anchor-sub-parts">Example</div>


```js
let [sentence] = vars("sentence")

join(["joe", "has", "a", "hat", " ", sentence)
//sentence contains ["joe has a hat"]
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->   

<!-- re -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">re</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Matches the regular expression defined in Patern against the Test string, to produce the matched patterns in Matches

<div class="anchor-sub-parts">Syntax</div>

```js
re(Pattern, Test, Matches) ~ regexp(Pattern, Test, Matches) (Alias)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Pattern  </span>     | (string*) - string or variable using normal PCRE regular expression syntax with the exception that special characters have to be escaped twice (to enable transport in JSONLD) | Mandatory       |
| <span class="param-type">Test  </span> |(string*) - string or variable containing the string to be tested for patterns with the regex | Mandatory       |
| <span class="param-type">Matches  </span>    |(string / [string]) - variable representing the list of matches or a list of strings or variables
| Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Regular Expression pattern matching expression

<div class="anchor-sub-parts">Example</div>


```js
let [e, llo] = vars('e', 'ello')

WOQL.re("h(.).*", "hello", [e, llo])
//e contains 'e', llo contains 'llo'
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->   

<!-- like -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">like</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Generates a string Leverstein distance measure between StringA and StringB

<div class="anchor-sub-parts">Syntax</div>

```js
like(StringA, StringB, Distance)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">StringA  </span>     | (string*) - string literal or variable representing a string to be compared | Mandatory       |
| <span class="param-type">StringA  </span> |(string*) - string literal or variable representing the other string to be compared | Mandatory       |
| <span class="param-type">Distance  </span>    |(string / [float]*) - variable representing the distance between the variables
| Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Like pattern matching expression

<div class="anchor-sub-parts">Example</div>


```js
let [dist] = vars('dist')

like("hello", "hallo", dist)
//dist contains 0.7265420560747664
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->   


### Updates / Transactions

<!-- add_triple -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">add triple</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Adds a single triple to the database

<div class="anchor-sub-parts">Syntax</div>

```js
add_triple(Subject, Predicate, Object)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Subject  </span>     | (string*) - The IRI of a triple's subject or a variable             | Mandatory       |
| <span class="param-type">Predicate  </span>   |(string*) - The IRI of a property or a variable                      | Mandatory       |
| <span class="param-type">Object  </span>      |(string*) - The IRI of a node or a variable, or a literal            | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the add_triple insert statement

<div class="anchor-sub-parts">Example</div>


```js
add_triple("john", "age", 42)
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->   

<!-- add_quad -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">add quad</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Adds a single triple to the specified graph in the database

<div class="anchor-sub-parts">Syntax</div>

```js
add_quad(Subject, Predicate, Object, Graph)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Subject  </span>     | (string*) - The IRI of a triple's subject or a variable             | Mandatory       |
| <span class="param-type">Predicate  </span>   |(string*) - The IRI of a property or a variable                      | Mandatory       |
| <span class="param-type">Object  </span>      |(string*) - The IRI of a node or a variable, or a literal            | Mandatory       |
| <span class="param-type">Graph  </span>       |(string*) - The resource identifier of a graph                       | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the add_quad insert statement

<div class="anchor-sub-parts">Example</div>


```js
add_quad("Person", "type", "owl:Class", "schema/main")
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->   

<!-- delete_triple -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">delete triple</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Deletes a single triple from the default graph of the database

<div class="anchor-sub-parts">Syntax</div>

```js
delete_triple(Subject, Predicate, Object)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Subject  </span>     | (string*) - The IRI of a triple's subject or a variable             | Mandatory       |
| <span class="param-type">Predicate  </span>   |(string*) - The IRI of a property or a variable                      | Mandatory       |
| <span class="param-type">Object  </span>      |(string*) - The IRI of a node or a variable, or a literal            | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Triple Deletion statement

<div class="anchor-sub-parts">Example</div>


```js
delete_triple("john", "age", 42)
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->   
<!--  delete_quad -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">delete quad</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Deletes a single triple from the default graph of the database  

<div class="anchor-sub-parts">Syntax</div>

```js
delete_quad(Subject, Predicate, Object, Graph)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Subject  </span>     | (string*) - The IRI of a triple's subject or a variable             | Mandatory       |
| <span class="param-type">Predicate  </span>   |(string*) - The IRI of a property or a variable                      | Mandatory       |
| <span class="param-type">Object  </span>      |(string*) - The IRI of a node or a variable, or a literal            | Mandatory       |
| <span class="param-type">Graph  </span>       |(string*) - The resource identifier of a graph                       | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Delete Quad Statement

<div class="anchor-sub-parts">Example</div>


```js
delete_quad("Person", "type", "owl:Class", "schema/main")
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!-- when -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">when</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Generates a transaction which encompasses all situations in which the Condition is true, the Consequent will be executed - the when block encapsulates a single transaction and allows a single query to express multiple transactions (by including multiple when blocks)  

<div class="anchor-sub-parts">Syntax</div>

```js
when(Condition, Consequent)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Condition  </span>     | (WOQLQuery*) - The query which, for each match, will cause the associated consequent to execute           | Mandatory       |
| <span class="param-type">Consequent  </span>   |(WOQLQuery*) - The query which, for each match of the Condition, will be executed                    | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the conditional transactional statement

<div class="anchor-sub-parts">Example</div>


```js
when(true).add_triple("doc:john", "type", "scm:Person")  
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->     

### Arithmetic Operators

Arithmetic Operators can be arbitrarily composed through the construction of Arithmetic Expressions and passed to the eval function which returns a variable containing the calculated result. This provides a general, stand-alone scientific calculator function, into which variables and constants from larger queries can be injected into mathematical functions. Used in isolation it is a calculator.  

<!-- evaluate -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">evaluate</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Evaluates the passed arithmetic expression and generates or matches the result value

<div class="anchor-sub-parts">Syntax</div>


```js
evaluate(ArithmeticExpression, Result)  ~ eval(ArithmeticExpression, Result)
```
(note eval does not work without a preceding WOQL.
you must use evaluate to avoid clashing with javascripts eval() function)
</div>


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">ArithmeticExpression  </span> | (WOQLQuery*) - A WOQL query containing a valid WOQL Arithmetic Expression, which is evaluated by the function           | Mandatory       |
| <span class="param-type">Result  </span>   |(string or decimal or integer*) - Either a variable, in which the result of the expression will be stored, or a numeric literal which will be used as a test of result of the evaluated expression                   | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Arithmetic function

<div class="anchor-sub-parts">Example</div>


```js
let [result] = vars("result")

evaluate(plus(2, minus(3, 1)), result)
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->  

<!-- sum -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">sum</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

computes the sum of the List of values passed. In contrast to other arithmetic functions, sum self-evaluates - it does not have to be passed to evaluate()

<div class="anchor-sub-parts">Syntax</div>


```js
sum(List, Total)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">List  </span> | (WOQLQuery*) - ([string or numeric*]) - a list variable, or a list of variables or numeric literals          | Mandatory       |
| <span class="param-type">Total  </span>   |a variable or numeric containing the sum of the values in List        | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Sum expression

<div class="anchor-sub-parts">Example</div>


```js
let [result] = vars("result")

sum([2, 3, 4, 5], result)
//result contains 14
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->  

<!-- plus -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">plus</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

adds two numbers together

<div class="anchor-sub-parts">Syntax</div>


```js

plus(Number1, Number2)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Number1  </span> | (string or numeric*) - a variable or numeric containing the first value to add                 | Mandatory       |
| <span class="param-type">Number2  </span>   |(string or numeric*) - a variable or numeric containing the second value to add        | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the addition expression

<div class="anchor-sub-parts">Example</div>


```js
let [result] = vars("result")

evaluate(plus(2, plus(3, 1)), result)
//result contains 6
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->  

<!-- minus -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">minus</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Subtracts Number2 from Number1  

<div class="anchor-sub-parts">Syntax</div>


```js
minus(Number1, Number2)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Number1  </span> | (string or numeric*) - a variable or numeric containing the  value that will be subtracted from              | Mandatory       |
| <span class="param-type">Number2  </span>   |(string or numeric*) - a variable or numeric containing  the value to be subtracted       | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the subtraction expression

<div class="anchor-sub-parts">Example</div>


```js
let [result] = vars("result")

evaluate(minus(2.1, plus(0.2, 1)), result)
//result contains 0.9000000000000001 - note floating point inaccuracy
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!-- times -->


<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">times</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Multiples Number1 and Number2

<div class="anchor-sub-parts">Syntax</div>


```js
times(Number1, Number2)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Number1  </span> | (string or numeric*) - a variable or numeric containing the first value to multiply             | Mandatory       |
| <span class="param-type">Number2  </span>   |(string or numeric*) - a variable or numeric containing the second value to multiply       | Mandatory       |



<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the multiplication expression


<div class="anchor-sub-parts">Example</div>


```js
let [result] = vars("result")

evaluate(times(10, minus(2.1, plus(0.2, 1))), result)
//result contains 9.000000000000002y
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!-- divide -->


<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">divide</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Dvides Number1 by Number2


<div class="anchor-sub-parts">Syntax</div>


```js
divide(Number1, Number2)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Number1  </span> | (string or numeric*) - a variable or numeric containing the number to be divided         | Mandatory       |
| <span class="param-type">Number2  </span>   |(string or numeric*) - a variable or numeric containing the divisor    | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the division expression


<div class="anchor-sub-parts">Example</div>


```js
let [result] = vars("result")

evaluate(divide(times(10, minus(2.1, plus(0.2, 1))), 10), result)
//result contains 0.9000000000000001
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!-- floor -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">floor</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Generates the nearest lower integer to the passed number

<div class="anchor-sub-parts">Syntax</div>


```js
floor(Number1)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Number1  </span>    | (string or numeric*) - a variable or numeric containing the number to be floored       | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the floor expression


<div class="anchor-sub-parts">Example</div>


```js
let [result] = vars("result")

evaluate(divide(floor(times(10, minus(2.1, plus(0.2, 1)))), 10), result)
//result contains 0.9 - floating point error removed

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!-- div -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">div</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Integer division: divides Number1 by Number2 to return an integer value

<div class="anchor-sub-parts">Syntax</div>


```js
div(Number1, Number2)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Number1  </span>    | (string or numeric*) - a variable or numeric containing the number to be divided       | Mandatory       |
| <span class="param-type">Number2  </span>    | (string or numeric*) - a variable or numeric containing the divisor      | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the integer division expression


<div class="anchor-sub-parts">Example</div>


```js
let [result] = vars("result")

evaluate(div(10, 3), result)
//result contains 3

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->


<!-- exp -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">exp</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Exponent - raises Number1 to the power of Number2

<div class="anchor-sub-parts">Syntax</div>


```js
exp(Number1, Number2)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Number1  </span>    | (string or numeric*) - a variable or numeric containing the number to be raised to the power of the second number       | Mandatory       |
| <span class="param-type">Number2  </span>    | (string or numeric*) - a variable or numeric containing the exponent      | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the exponent expression


<div class="anchor-sub-parts">Example</div>


```js
let [result] = vars("result")

evaluate(exp(3, 2), result)
//result contains 9

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!-- less -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">less</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Matches when Val1 is less than Val2

<div class="anchor-sub-parts">Syntax</div>


```js
less(Val1, Val2)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Number1  </span>    | (string or numeric*) - a variable or numeric containing the number to be compared       | Mandatory       |
| <span class="param-type">Number2  </span>    | (string or numeric*) - a variable or numeric containing the second comporator     | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the comparison expression


<div class="anchor-sub-parts">Example</div>


```js
let [result] = vars("result")

less(1, 1.1).eq(result, literal(true, "boolean"))
//result contains true

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!--  greater -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">greater</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Matches when Val1 is greater than Val2

<div class="anchor-sub-parts">Syntax</div>


```js
greater(Val1, Val2)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Val1  </span>    | (string or numeric*) - a variable or numeric containing the number to be compared       | Mandatory       |
| <span class="param-type">Val2  </span>    | (string or numeric*) - a variable or numeric containing the second comporator     | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the comparison expression


<div class="anchor-sub-parts">Example</div>


```js
let [result] = vars("result")

greater(1.2, 1.1).eq(result, literal(true, "boolean"))
//result contains true

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

### Importing & Exporting

<!-- get -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">get</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Retrieves the exernal resource defined by QueryResource and copies values from it into variables defined in AsVars


<div class="anchor-sub-parts">Syntax</div>


```js
get(AsVArs, QueryResource)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">AsVArs  </span>    |([string]*) an array of AsVar variable mappings (see as for format below)    | Mandatory       |
| <span class="param-type">QueryResource  </span>    | (string*) an external resource (remote, file, post) to query    | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the get expression


<div class="anchor-sub-parts">Example</div>


```js
let [a, b] = vars("a", "b")

get(as("a", a).as("b", b)).remote("http://my.url.com/x.csv")
//copies the values from column headed "a" into a variable a and from column "b" into a variable b from remote CSV

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!-- put -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">put</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Outputs the results of a query to a file

<div class="anchor-sub-parts">Syntax</div>


```js
put(AsVArs, Subq, FileResource)

```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">AsVArs  </span>    |([string]*) an array of AsVar variable mappings (see as for format below)  | Mandatory       |
| <span class="param-type">Subq  </span>    | (WOQLQuery*) - The query which will be executed to produce the results  <br/> <span class="status-comment"> Note: </span> Subq is an argument or a chained query   | Mandatory       |
| <span class="param-type">FileResource  </span>    | (string*) an file resource local to the server    | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the put expression


<div class="anchor-sub-parts">Example</div>


```js
let [s, p, o] = vars("Subject", "Predicate", "Object")

put(as("s", s).as("p", p).as("o", o), all())
    .file("/app/local_files/dump.csv")

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!-- as -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">as</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Maps data from an imported source to a WOQL variable and optionally sets its type

<div class="anchor-sub-parts">Syntax</div>


```js
as(SourceLocator, VarName, Type)

```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">SourceLocator  </span>    |(string) - an optional string containing the CSV column header, or a variable containing the string (if it is omitted when extracting data from a CSV, the CSV will be indexed by column number)  | Mandatory       |
| <span class="param-type">VarName  </span>    |  (string*) - the name of the variable into which the data from the external resource will be copied| Mandatory       |
| <span class="param-type">Type  </span>    | (string) - an optional type to which the data will be automatically mapped on import   | Optional       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the variable mapping expression


<div class="anchor-sub-parts">Example</div>


```js
let [date] = vars("Date")

get(as("Date.From", date))
    .remote("http://seshatdatabank.info/wp-content/uploads/2020/01/Iron-Updated.csv")

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->
<!-- remote -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">remote</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Identifies a remote resource by URL and specifies the format of the resource through the options   

<div class="anchor-sub-parts">Syntax</div>


```js
remote(URL, Opts)

```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">URL  </span>    |(string*) The URL at which the remote resource can be accessed  | Mandatory       |
| <span class="param-type">Opts  </span>    |(object) A option json which can have the following keys: <br/> <span class="param-object"> type: csv/turtle </span> | Optional       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the remote resource identifier


<div class="anchor-sub-parts">Example</div>


```js
remote("http://url.of.resource", {type: "csv"})

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!-- file -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">file</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Identifies a file resource as a path on the server and specifies the format through the options   

<div class="anchor-sub-parts">Syntax</div>


```js
file(Path, Opts)

```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Path  </span>    |(string*) The Path on the server at which the file resource can be accessed | Mandatory       |
| <span class="param-type">Opts  </span>    |(object) A option json which can have the following keys: <br/> <span class="param-object"> type: csv/turtle </span> | Optional       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the file resource identifier


<div class="anchor-sub-parts">Example</div>


```js
file("/path/to/file", {type: 'turtle'} )

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!-- post -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">post</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Identifies a resource as a local path on the client, to be sent to the server through a HTTP POST request, with the format defined through the options  

<div class="anchor-sub-parts">Syntax</div>


```js
post(Path, opts)

```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Path  </span>    |(string*) The Path on the server at which the file resource can be accessed | Mandatory       |
| <span class="param-type">Opts  </span>    |(object) A option json which can have the following keys: <br/> <span class="param-object"> type: csv/turtle </span> | Optional       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Post resource identifier


<div class="anchor-sub-parts">Example</div>


```js
post("/.../.../", {})
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->
### Resource Specification

<!-- using -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">using</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Specifies the resource to use as default in the contained query

<div class="anchor-sub-parts">Syntax</div>


```js
using(GraphResource, Subq)

```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">GraphResource  </span>    |(string*) - A valid graph resource identifier string | Mandatory       |
| <span class="param-type">Subq  </span>    |The query which will be executed against the resource identified above <br/> <span class="status-comment"> Note: </span> Subq is an argument or a chained query| Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which is defined to run against the resource


<div class="anchor-sub-parts">Example</div>


```js
using("admin/minecraft").all()
//retrieves all triples in the minecraft db of the admin organization

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->
<!-- into -->

<!-- using -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">into</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Specifies the graph resource to write the contained query into

<div class="anchor-sub-parts">Syntax</div>


```js
into(GraphResource, Subq)

```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">GraphResource  </span>    |(string*) - A valid graph resource identifier string | Mandatory       |
| <span class="param-type">Subq  </span>    |The query which will be written into the graph <br/> <span class="status-comment"> Note: </span> Subq is an argument or a chained query| Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which will be written into the graph in question


<div class="anchor-sub-parts">Example</div>


```js
using("admin/minecraft").into("instance/main").add_triple("a", "type", "scm:X")
//writes a single tripe (doc:a, rdf:type, scm:X) into the main instance graph

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

### Database Size

<!-- size -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">size</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Calculates the size in bytes of the contents of the resource identified in ResourceID

<div class="anchor-sub-parts">Syntax</div>


```js
size(ResourceID, Size)

```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">ResourceID  </span>    |(string*) - A valid resource identifier string (can refer to any graph / branch / commit / db)| Mandatory       |
| <span class="param-type">Size  </span>    |(string or integer*) - An integer literal with the size in bytes or a variable containing that integer  | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the size expression


<div class="anchor-sub-parts">Example</div>


```js
let [sz] = vars("s")
size("admin/minecraft/local/branch/main/instance/main", sz)
//returns the number of bytes in the main instance graph on the main branch

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!--  triple_count -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">triple count</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Calculates the size in bytes of the contents of the resource identified in ResourceID

<div class="anchor-sub-parts">Syntax</div>


```js
triple_count(ResourceID, Count)

```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">ResourceID  </span>    |(string*) - A valid resource identifier string (can refer to any graph / branch / commit / db)| Mandatory       |
| <span class="param-type">Count  </span>    |(string or integer*) - An integer literal with the size in bytes or a variable containing that integer    | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the size expression


<div class="anchor-sub-parts">Example</div>


```js
let [tc] = vars("s")

triple_count("admin/minecraft/local/_commits", tc)
//returns the number of bytes in the local commit graph

```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

### Document Queries (Experimental / Unstable)

Document queries take or return entire JSON-LD document as arguments. This relies upon the internal frame-generation capabilities of the database and requires the user to have defined discrete document classes to dictate at what points the graph traversal is truncated - a document is considered to contain all objects within it, with the exception of predicates and classes that belong to other documents. This takes some care - improperly defined it can lead to very slow queries which contain the whole database unrolled into a single document - not normally what we require.   

<!-- update_object -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">update object</span>
    <span class="anchor-status anchor-status-experimental"> Status: Experimental / Unstable </span>
</div>

<i class="fa fa-flask status-experimental"/>

Updates a document (or any object) in the db with the passed json-ld - replaces the current version

<div class="anchor-sub-parts">Syntax</div>


```js
update_object(JSONLD)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">JSONLD  </span>     |(string*) the document's JSON-LD form which will be written to the DB | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the update object expression


<div class="anchor-sub-parts">Example</div>


```js
update_object({
    "@id": "doc:joe",
    "@type": "scm:Person",
    "rdfs:label": {
        "@type": "xsd:string",
        "@value": "Joe"
    }
})
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!-- delete_object -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">delete object</span>
    <span class="anchor-status anchor-status-experimental"> Status: Stable </span>
</div>

<i class="fa fa-flask status-experimental"/>

Deletes the entire refered document and all references to it

<div class="anchor-sub-parts">Syntax</div>


```js
delete_object(JSON_or_IRI)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">JSON_or_IRI  </span> |(string*) either a full JSON-LD document, an IRI literal or a variable containing either | Mandatory       |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which object deletion expression

<div class="anchor-sub-parts">Example</div>


```js
delete_object("doc:mydoc")
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->

<!-- read_object -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">read object</span>
    <span class="anchor-status anchor-status-experimental"> Status: Experimental / Unstable </span>
</div>

<i class="fa fa-flask status-experimental"/>

Saves the entire document with IRI DocumentIRI into the JSONLD variable

<div class="anchor-sub-parts">Syntax</div>


```js
read_object(DocumentIRI, JSONLD)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                    | Types                                                                | Requirement                |
|----------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">DocumentIRI  </span> |(string*) either an IRI literal or a variable containing an IRI      | Mandatory       |
| <span class="param-type">JSONLD  </span> |(string*) a variable into which the document's JSON-LD form will be saved      | Mandatory       |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the document retrieval expression

<div class="anchor-sub-parts">Example</div>


```js
let [mydoc] = vars("mydoc")

read_object("doc:a", mydoc)
//mydoc will have the json-ld document with ID doc:x stored in it
```

<hr class="section-separator"/>

<!----------------------------------------------------------------------------------------->
