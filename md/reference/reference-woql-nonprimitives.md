---
layout: default
title: WOQL Non Primitives
parent: WOQL.js - the Definitive Guide
grand_parent: Reference
nav_order: 5
permalink: /reference/woql/nonprimitives
---
# Non Primitive Functions

### WOQL Literals, Prefixes & IRI Constants


<!-- string -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">string</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Generates explicitly a JSON-LD string literal from the input    

<div class="anchor-sub-parts">Syntax</div>


```js
string(Val1)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Val1  </span>            | (literal*) - any literal type                                        | Mandatory                  |

<div class="anchor-sub-parts">Returns</div>
A JSON-LD string literal

<div class="anchor-sub-parts">Example</div>



```js
string(1)
//returns { "@type": "xsd:string", "@value": "1" }
```

---

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!-- literal  -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">literal</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Generates explicitly a JSON-LD string literal from the input

<div class="anchor-sub-parts">Syntax</div>

```js
literal(Val, Type)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Val  </span>             |  (literal*) - any literal type                                       | Mandatory                  |
| <span class="param-type">Type  </span>            |  (string*) - an xsd or xdd type                                       | Mandatory                  |

<div class="anchor-sub-parts">Returns</div>
A JSON-LD literal

<div class="anchor-sub-parts">Example</div>


```js
literal(1, "nonNegativeInteger")
//returns { "@type": "xsd:nonNegativeInteger", "@value": 1 }
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->     
<!-- iri  -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">iri</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Explicitly sets a value to be an IRI - avoiding automatic type marshalling

<div class="anchor-sub-parts">Syntax</div>

```js
iri(Val1)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Val1  </span>            |  (string*) - string which will be treated as an IRI                                      | Mandatory                  |

<div class="anchor-sub-parts">Returns</div>
A JSON-LD IRI value

<div class="anchor-sub-parts">Example</div>



```js
iri("dc:title")
//returns { "@type": "woql:Node", "woql:node": "dc:title" }
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->  

### Basic Helper Functions

<!-- query  -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">query</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Generates an empty WOQLQuery object

<div class="anchor-sub-parts">Syntax</div>

```js
query()
```

<div class="anchor-sub-parts">Arguments</div>  
None

<div class="anchor-sub-parts">Returns</div>
An empty WOQLQuery object

<div class="anchor-sub-parts">Example</div>


```js
let q = query()
//then q.triple(1, 1) ...
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->  
<!-- json -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">json</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Translates between the JSON-LD and object version of a query - if an argument is passed, the query object is created from it, if none is passed, the current state is returned as a JSON-LD

<div class="anchor-sub-parts">Syntax</div>

```js
json(JSONLD)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">JSONLD  </span>          |   (json) - optional JSON-LD woql document encoding a query           | Mandatory                  |

<div class="anchor-sub-parts">Returns</div>
either a JSON-LD or a WOQLQuery object

<div class="anchor-sub-parts">Example</div>


```js
let q = triple("a", "b", "c")

let qjson = q.json()

let p = json(qjson)
/*q  and p both contain: {"@type": "woql:Triple",
    "woql:subject": {
        "@type": "woql:Node",
        "woql:node": "doc:a"},
        "woql:predicate": ....
    }
}*/
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->  

<!--vars -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">vars</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Generates javascript variables for use as WOQL variables within a query

<div class="anchor-sub-parts">Syntax</div>

```js
vars(...Varnames)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Vars  </span>            |   ([string*]) an array of strings, each of which will server as a variable          | Mandatory                  |

<div class="anchor-sub-parts">Returns</div>
an array of javascript variables which can be dereferenced using the array destructuring operation

<div class="anchor-sub-parts">Example</div>


```js
const [a, b, c] = vars("a", "b", "c")
//a, b, c are javascript variables which can be used as WOQL variables in subsequent queries
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

## Compound Functions

### Shorthand Compound Functions
Shorthand compound functions provide shorthand forms for commonly used functions to avoid having to write the same basic patterns repeatedly

<!--star -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">star</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Generates a query that by default matches all triples in a graph  

<div class="anchor-sub-parts">Syntax</div>

```js
star(Graph, Subject, Object, Predciate)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Graph  </span>           |   (string) - Option Resource String identifying the graph to be searched for the pattern      | Optional                  |
| <span class="param-type">Subject  </span>           | (string) - Optional IRI of triple's subject or a variable      | Optional                  |
| <span class="param-type">Predicate  </span>         | (string) - Optional IRI of a property or a variable      | Optional                  |
| <span class="param-type">Object  </span>         |  (string) - Optional IRI of a node or a variable, or a literal       | Optional                  |


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the pattern matching expression

<div class="anchor-sub-parts">Example</div>


```js
star("schema/main")
//will return every triple in schema/main graph
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!--all -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">all</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>
Generates a query that by default matches all triples in a graph - identical to star() except for order of arguments

<div class="anchor-sub-parts">Syntax</div>

```js
all(Subject, Object, Predciate, Graph)
```
<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Subject  </span>         |  (string) -  Optional IRI of triple's subject or a variable          | Optional                  |
| <span class="param-type">Predicate  </span>       | (string) - Optional IRI of a property or a variable                  | Optional                  |
| <span class="param-type">Object  </span>          |(string) - Optional IRI of a node or a variable, or a literal         | Optional                  |
| <span class="param-type">Graph  </span>           |  (string) - Optional Resource String identifying the graph to be searched for the pattern       | Optional                  |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the pattern matching expression

<div class="anchor-sub-parts">Example</div>


```js
all("mydoc")
//will return every triple in the instance/main graph that has "doc:mydoc" as its subject

```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!--nuke -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">all</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Deletes all triples in the graph

<div class="anchor-sub-parts">Syntax</div>

```js
nuke(Graph)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Graph  </span>         |  (string) - Optional Resource String identifying the graph from which all triples will be removed           | Optional                  |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the deletion expression

<div class="anchor-sub-parts">Example</div>


```js
nuke("schema/main")
//will delete everything from the schema/main graph
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

### Compound Schema Functions
Compound schema functions are compound functions specifically designed to make generating schemas easier. They generate multiple inserts for each function

<!-- add_class -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">add class</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Adds a new class definition to the schema

<div class="anchor-sub-parts">Syntax</div>

```js
add_class(ClassIRI, Graph)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">ClassIRI  </span>         |  (string*) - IRI or variable containing IRI of the new class to be added (prefix default to scm)       | Mandatory                  |
| <span class="param-type">Graph  </span>         | (string) - Optional Resource String identifying the schema graph into which the class definition will be written     | Optional                  |

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the add class expression

<div class="anchor-sub-parts">Example</div>


```js
add_class("MyClass")
//equivalent to add_quad("MyClass", "@rdf:type", "owl:Class", "schema/main")
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!--add_property -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">add property</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Adds a new property definition to the schema

<div class="anchor-sub-parts">Syntax</div>

```js
add_property(PropIRI, RangeType, Graph)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">PropIRI  </span>         |  (string*) - IRI or variable containing IRI of the new property to be added (prefix default to scm)     | Mandatory
| <span class="param-type">RangeType  </span>         | (string) - optional IRI or variable containing IRI of the range type of the new property (defaults to xsd:string)   | Optional                   |
| <span class="param-type">Graph  </span>         | (string) - Optional Resource String identifying the schema graph into which the property definition will be written      | Optional  

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the add property expression

<div class="anchor-sub-parts">Example</div>


```js
add_property("myprop")
/*equivalent to add_quad("myprop", "@rdf:type", "owl:DatatypeProperty", "schema/main")
    .add_quad("myprop", "range", "xsd:string", "schema/main")*/
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!--doctype -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">doctype</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Adds a new document class to the schema

<div class="anchor-sub-parts">Syntax</div>

```js
doctype(ClassIRI, Graph)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">ClassIRI  </span>         |  (string*) - IRI or variable containing IRI of the new document class to be added (prefix default to scm)   | Mandatory
| <span class="param-type">Graph  </span>         | (string) - Optional Resource String identifying the schema graph into which the class definition will be written      | Optional  


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the add document class expression

<div class="anchor-sub-parts">Example</div>


```js
doctype("MyClass")
/*equivalent to add_quad("MyClass", "@rdf:type", "owl:Class", "schema/main")
    .add_quad("MyClass", "subClassOf", "system:Document", "schema/main") */
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!--delete_class -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">delete class</span>
    <span class="anchor-status anchor-status-stable"> Status: Experimental / Unstable </span>
</div>

<i class="fa fa-flask status-experimental"/>

Deletes a class - including all properties and incoming links - from the schema

<div class="anchor-sub-parts">Syntax</div>

```js
delete_class(ClassIRI, Graph)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">ClassIRI  </span>         | IRI or variable containing IRI of the class to be deleted (prefix default to scm)| Mandatory
| <span class="param-type">Graph  </span>         | (string) - Optional Resource String identifying the schema graph from which the class definition will be deleted    | Optional  


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the class deletion expression

<div class="anchor-sub-parts">Example</div>


```js
delete_class("MyClass")
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!-- delete_property -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">delete property</span>
    <span class="anchor-status anchor-status-stable"> Status: Experimental / Unstable </span>
</div>

<i class="fa fa-flask status-experimental"/>

Deletes a property from the schema and all its references incoming and outgoing   

<div class="anchor-sub-parts">Syntax</div>

```js
delete_property(PropIRI, Graph)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">PropIRI  </span>         | (string*) - IRI or a variable containing IRI of the property to be deleted (prefix defaults to scm)| Mandatory
| <span class="param-type">Graph  </span>         | (string) - Optional Resource String identifying the schema graph from which the property definition will be deleted  | Optional  

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the property deletion expression

<div class="anchor-sub-parts">Example</div>


```js
delete_property("MyProp")   
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!-- schema -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">schema</span>
    <span class="anchor-status anchor-status-stable"> Status: Deprecated </span>
</div>

<i class="fa fa-circle status-depreciated"/>

Generates an empty query object - identical to query - included for backwards compatibility as before v3.0, the schema functions were in their own namespace.

<div class="anchor-sub-parts">Syntax</div>

```js
schema(Graph)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Graph  </span>         | (string) - Optional Resource String identifying the graph which will be used for subsequent chained schema calls | Optional  

<div class="anchor-sub-parts">Returns</div>
An empty WOQLQuery with the internal schema graph pointes set to Graph


<div class="anchor-sub-parts">Example</div>


```js
schema("schema/dev").add_class("X")
//equivalent to add_class("X", "schema/dev") - non-deprecated version  
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

### Builder / Partial Functions

Builder functions are different from other WOQL functions in that they cannot be used in isolation - they produce partial functions in isolation and need to be chained onto other functions in order to form complete functions in their own right. Builder functions must be chained after a function that provides at least a subject (triple, add_triple, add_quad, delete_triple). Multiple builder functions can be chained together.

<!--node -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">schema</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Specifies the identity of a node that can then be used in subsequent builder functions. Note that node() requires subsequent chained functions to complete the triples / quads that it produces - by itself it only generates the subject.

<div class="anchor-sub-parts">Syntax</div>

```js
node(NodeID, ChainType)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">NodeID  </span>         | (string*) The IRI of a node or a variable containing an IRI which will be the subject of the builder functions | Mandatory
| <span class="param-type">ChainType  </span>         | (string) Optional type of builder function to build (can be Triple, Quad, AddTriple, AddQuad, DeleteTriple, DeleteQuad) - defaults to Triple   | Optional

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the partial Node pattern matching expression


<div class="anchor-sub-parts">Example</div>


```js
node("mydoc").label("my label")
//equivalent to triple("mydoc", "label", "my label")
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!--insert -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">insert</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Inserts a single triple into the database declaring the Node to have type Type, optionally into the specified graph  

<div class="anchor-sub-parts">Syntax</div>

```js
insert(Node, Type, Graph)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Node  </span>            | (string*) - IRI string or variable containing the IRI of the node to be inserted| Mandatory
| <span class="param-type">Type  </span>            | (string*) - IRI string or variable containing the IRI of the type of the node    | Mandatory
| <span class="param-type">Graph  </span>           | (string) - Optional Graph resource identifier   | Optional

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the insert expression


<div class="anchor-sub-parts">Example</div>


```js
insert("mydoc", "MyType")
//equivalent to add_triple("mydoc", "@rdf:type", "MyType")
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!--graph -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">insert</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Sets the graph resource ID that will be used for subsequent chained function calls  
<div class="anchor-sub-parts">Syntax</div>

```js
graph(Graph)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Graph  </span>           | Graph Resource String literal                                        | Mandatory

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the partial Graph pattern matching expression


<div class="anchor-sub-parts">Example</div>


```js
node("MyClass", "AddQuad").graph("schema/main").label("My Class Label")
//equivalent to add_quad("MyClass", "label", "My Class Label", "schema/main")
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!-- abstract  -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">abstract</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Adds an abstract designation to a class

<div class="anchor-sub-parts">Syntax</div>

```js
abstract(Graph, Subject)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Graph  </span>           | (string) optional Graph Resource String literal - defaults to "schema/main"    | Optional
| <span class="param-type">Subject  </span>         | (string) optional IRI or variable containing IRI of the subject                | Optional

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the Abstract tag expression


<div class="anchor-sub-parts">Example</div>


```js
node("MyClass", "AddQuad").abstract()
//equivalent to add_quad("MyClass", "system:tag", "system:abstract","schema/main")
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!-- property -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">property</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Creates a property in the schema or adds a property to the instance data, or creates a property matching rule, depending on context  

<div class="anchor-sub-parts">Syntax</div>

```js
property(PropIRI, Type_or_Value)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">PropIRI  </span>         | (string*) - the IRI of the property or a variable containing the property   | Mandatory
| <span class="param-type">Type_or_Value  </span>   | (string or literal*) - the value of the property (instance) or the type of the property (schema) | Mandatory

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the property matching / insert expression

<div class="anchor-sub-parts">Example</div>


```js
doctype("X").property("Y", "string")
//creates a document type X with a property Y of type string
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!--domain -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">domain</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Specifies the domain of a property in a property chain

<div class="anchor-sub-parts">Syntax</div>

```js
domain(ClassIRI)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">ClassIRI  </span>        | (string *) IRI of class or variable containing IRI                   | Mandatory

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the domain expression

<div class="anchor-sub-parts">Example</div>


```js
add_property("MyProp").domain("MyClass")
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!--label -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">label</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Adds a label to an element in a chain using the rdfs:label predicate

<div class="anchor-sub-parts">Syntax</div>

```js
label(Label, Lang)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Label  </span>           | (string *) string literal containing label or variable containing string   | Mandatory
| <span class="param-type">Lang  </span>            | (string) optional language tag (e.g. "en")                                 | Optional

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the label in the rdfs:label predicate

<div class="anchor-sub-parts">Example</div>


```js
add_class("MyClass").label("My Class Label")
//creates the class and gives it a label
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!--description -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">description</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Adds a description to an element in a chain using the rdfs:comment predicate

<div class="anchor-sub-parts">Syntax</div>

```js
description(Comment, Lang)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Comment  </span>         | (string *) string literal containing label or variable containing string  | Mandatory
| <span class="param-type">Lang  </span>            | (string) optional language tag (e.g. "en")                                | Optional

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the description in the rdfs:comment predicate

<div class="anchor-sub-parts">Example</div>


```js
let [doc] = vars("doc")
node(doc).description("My Class Description")
//matches any document with the given description    

```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!--parent  -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">description</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Adds parent class clause(s) to a chain using the rdfs:subClassOf predicate

<div class="anchor-sub-parts">Syntax</div>

```js
parent(...ParentIRIs)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">ParentIRI  </span>         | ([string*]) - list of class IRIs or variables containing class IRIs representing parent classes of the current class  | Mandatory

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the parent expression

<div class="anchor-sub-parts">Example</div>


```js
let [doc] = vars("doc")
add_class("Y").parent("X")
//creates class Y as a subClass of class X  

```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!--max -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">max</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Adds a maximum cardinality constraint to an add_property chain  

<div class="anchor-sub-parts">Syntax</div>

```js
max(Count)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Count  </span>         |(integer or string*) - a non negative integer or a variable containing a non-negative integer | Mandatory

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the maximum cardinality expression

<div class="anchor-sub-parts">Example</div>


```js
add_property("MyProp").domain("X").max(1)
//creates a string property in class X with a maximum cardinality of 1

```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!--min -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">min</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>
Adds a minimum cardinality constraint to an add_property chain   

<div class="anchor-sub-parts">Syntax</div>

```js
min(Count)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Count  </span>           |(integer or string*) - a non negative integer or a variable containing a non-negative integer | Mandatory

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the minimum cardinality expression

<div class="anchor-sub-parts">Example</div>


```js
add_property("MyProp").domain("X").min(1)
//creates a string property in class X with a minimum cardinality of 1  

```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!--cardinality -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">cardinality</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Adds an exact cardinality constraint to an add_property chain   

<div class="anchor-sub-parts">Syntax</div>

```js
cardinality(Count)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Count  </span>           |(integer or string*) - a non negative integer or a variable containing a non-negative integer | Mandatory

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the cardinality expression

<div class="anchor-sub-parts">Example</div>


```js
add_property("MyProp").domain("X").cardinality(1)
//creates a string property in class X with an exact cardinality of 1

```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!--insert data-->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">insert data</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Inserts data as an object - enabling multiple property values to be inserted in one go   

<div class="anchor-sub-parts">Syntax</div>

```js
insert_data(Data, Graph)
```


<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Data  </span>            |(object*) a json object containing  <br/> <span class="param-object"> id (string*) IRI or variable containing IRI of the entity to be inserted</span> <br/> <span class="param-object"> *key* (string*) keys representing properties that the entity has (label, description, type and any other valid property for the object) </span>| Mandatory
| <span class="param-type">Graph  </span>            |(string) an optional graph resource identifier (defaults to "instance/main" if no using or into is specified)| Optional

<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the insertion expression

<div class="anchor-sub-parts">Example</div>


```js
let data = {id: "doc:joe",
    type: "Person",
    label: "Joe",
    description: "My friend Joe",
    age: 42
}
insert_data(data)
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!-- insert_class_data  -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">insert class data</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Inserts data about a class as a json object - enabling a class and all its properties to be specified in a single function
<div class="anchor-sub-parts">Syntax</div>

```js
insert_class_data(Data, Graph)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Data  </span>            |(object*) a json object containing  <br/> <span class="param-object"> id (string*) IRI or variable containing IRI of the class to be inserted</span> <br/> <span class="param-object"> *key* (string*) keys representing properties that the class has (label, description, type and any other valid property for the object) </span>| Mandatory
| <span class="param-type">Graph  </span>            |(string) an optional graph resource identifier (defaults to "schema/main" if no using or into is specified)| Optional


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the insertion expression


<div class="anchor-sub-parts">Example</div>


```js
let data = {
    id: "Robot",
    label: "Robot",
    parent: ["X", "MyClass"]
}
insert_class_data(data)
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!--insert_doctype_data -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">insert doctype data</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Inserts data about a document class as a json object - enabling a document class and all its properties to be specified in a single function

<div class="anchor-sub-parts">Syntax</div>

```js
insert_doctype_data(Data, Graph)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Data  </span>            |(object*) a json object containing  <br/> <span class="param-object"> id (string*) IRI or variable containing IRI of the class to be inserted</span> <br/> <span class="param-object"> *key* (string*) keys representing properties that the document class has (label, description, type and any other valid property for the object) </span>| Mandatory
| <span class="param-type">Graph  </span>            |(string) an optional graph resource identifier (defaults to "schema/main" if no using or into is specified)| Optional


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the insertion expression


<div class="anchor-sub-parts">Example</div>


```js
let data = {
    id: "Person",
    label: "Person",  
    age: {
        label: "Age",
        range: "xsd:integer",
        max: 1
    }
}
insert_doctype_data(data)
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!-- insert_property_data  -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">insert property data</span>
    <span class="anchor-status anchor-status-stable"> Status: Stable </span>
</div>

<i class="fa fa-check status-stable"/>

Inserts data about a document class as a json object - enabling a document class and all its properties to be specified in a single function

<div class="anchor-sub-parts">Syntax</div>

```js
insert_property_data(Data, Graph)
```

<div class="anchor-sub-parts">Arguments</div>  

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Data  </span>            |(object*) a json object containing  <br/> <span class="param-object"> id (string*) IRI or variable containing IRI of the property to be inserted</span> <br/> <span class="param-object"> *key* (string*) keys representing properties that the property has (label, description, type and any other valid property for the object) </span>| Mandatory
| <span class="param-type">Graph  </span>            |(string) an optional graph resource identifier (defaults to "schema/main" if no using or into is specified)| Optional


<div class="anchor-sub-parts">Returns</div>
A WOQLQuery which contains the insertion expression


<div class="anchor-sub-parts">Example</div>


```js
let data = {
    id: "prop",
    label: "Property",
    description: "prop desc",
    range: "X",
    domain: "X",
    max: 2,
    min: 1
}
insert_property_data(data)
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->