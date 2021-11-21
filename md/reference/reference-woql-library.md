---
layout: default
title:  Library Functions
parent: WOQL.js - the Definitive Guide
grand_parent: Reference
nav_order: 5
permalink: /reference/woql/library
---

# Library Functions

WOQL.js includes a standard library of pattern matching functions which provide a flexible way of extracting records about the system's internal records without having to remember the predicates that are used under the hood.

Unlike other WOQL.js functions, library functions are not part of the WOQLQuery object - they are accessed through the lib() call. Library functions have a standard signature which makes them all accessible in the same way.

## Standard Arguments

All Library functions take the same three optional arguments.

* <span class="param-type">Values</span>
* <span class="param-type">Variables</span>
* <span class="param-type">ResourceIdentifier</span>


<span class="param-type-headings">Values</span>

The values argument allows values to be passed for any of the internal variables which serve to constrain the query to a subset of the complete set. The Values argument comes in three forms:

* [...Value]  - a list of specific values, where each entry sets the corresponding entry in the Variables list for the function. Any values that are not to be set can be omitted or set to null or false explicitly in which case no constraints will be applied.
	<div class="anchor-sub-parts">Example</div>

	
	```js
	lib().classes("@schema:Person")
	```
	</div>
    specifies that only the class with ID @schema:Person will be matched

* object - a json key-value object where the keys are the names of the variables to be set and the value is the value for that variable.

	<div class="anchor-sub-parts">Example</div>

	
	```js
	lib().classes({'Class ID': "@schema:Person"})
	```
	</div>
	specifies that only the class with ID @schema:Person will be matched


* WOQLQuery - a woql query which serves as a constraint on any variable mentioned in the query

	<div class="anchor-sub-parts">Example</div>

	
	```js
	let [clist] = vars("Class List")
    lib().classes(member(clist, ['@schema:Person', '@schema:Animal']))
	```
	</div>
	specifies that only the class with ID @schema:Person and @schema:Animal will be matched


<!-- Variables -->

<span class="param-type-headings">Variables</span>

Each library function defines an internal list of variable names which are used by default to represent the results of the library query - the variables' names can be overriden by passing in an alternative list of variable names. As with values, a null or false or an omitted variable means that the default will be used for that position

<div class="anchor-sub-parts">Example</div>


```js
let [cid, cname] = vars("Class", "Class Label")

lib().classes(false, [cid, cname])
```


<!-- ResourceIdentifier -->
<span class="param-type-headings">ResourceIdentifier</span>


Each library query is associated with a specific graph - by default, the graph resource identifier is set to the appropriate graph of the current default database. This can be changed by setting the ResourceIdentifier argument to the desired graph.

<div class="anchor-sub-parts">Example</div>


```js
lib().classes(false, false, 'schema/extra')
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
## Library Functions with Standard Arguments

<!-- classes -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">classes</span>
</div>

Retreives a list of classes from the schema. For each class matched, the following properties are returned

<div class="anchor-sub-parts">Syntax</div>

```js
classes(Values, Variables, ResourceIdentifier)
```

<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             | Prefix                |
|---------------------------------------------------|-----------------------------------------|-----------------------|
| <span class="param-type">Class ID  </span>        | IRI of the class                        | 		  |
| <span class="param-type">Class Name  </span>      | Label of the Class                      | (rdfs:label)          |
| <span class="param-type">Description  </span>     | Description of the Class                | (rdfs:comment)        |
| <span class="param-type">Parents  </span>         | Parent classes                          | (rdfs:subClassOf)     |
| <span class="param-type">Children  </span>        | Child classes                           | (rdfs:subClassOf)     |
| <span class="param-type">Abstract  </span>        | Abstract class designation              | (system:tag system:abstract)|


<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the classes pattern matching expression

<div class="anchor-sub-parts">Example</div>

```js
let [cls] = vars("Class ID")

lib().classes(eq (cls, '@schema:X'))
//retrieves the class with IRI @schema:X

```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!-- properties -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">properties</span>
</div>

Retreives the list of properties from the schema. For each property matched, the following properties are returned

<div class="anchor-sub-parts">Syntax</div>

```js
properties(Values, Variables, ResourceIdentifier)
```

<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             | Prefix                |
|---------------------------------------------------|-----------------------------------------|-----------------------|
| <span class="param-type">Property ID  </span>     | IRI of the property                     | |
| <span class="param-type">Property Name  </span>   | Label of the property                   |  (rdfs:label)         |
| <span class="param-type">Property Domain  </span> | Domain of the property                  | (rdfs:domain)         |
| <span class="param-type">Property Type  </span>   | Object Property or Data Property        | (rdfs:subClassOf)     |
| <span class="param-type">Property Range  </span>  | Range of the property                   | (rdfs:range)          |
| <span class="param-type">Property Description  </span>| Description                         | (rdfs:comment)        |


<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the properties pattern matching expressionn

<div class="anchor-sub-parts">Example</div>

```js
let [prop] = vars("Property Type")

lib().classes(eq(prop, 'Object'))
//retrieves all object properties


```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!--graphs-->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">graphs</span>
</div>

Retreives the list of graphs for the current database for each commit

<div class="anchor-sub-parts">Syntax</div>

```js
graphs(Values, Variables, ResourceIdentifier)
```


<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             | Prefix                |
|---------------------------------------------------|-----------------------------------------|-----------------------|
| <span class="param-type">Graph ID  </span>        |resource id of the graph                 | 		  |
| <span class="param-type">Graph Type  </span>      |schema or instance or inference          |         				  |
| <span class="param-type">Branch ID  </span>       | id of the branch (if the commit is branch head | ref:branch_name)   |
| <span class="param-type">Commit ID  </span>       | id of the commit that points to the graph      | (ref:commit_id)    |
| <span class="param-type">Graph IRI   </span>      | Graph IRI           							 |                    |
| <span class="param-type">Branch IRI   </span>		| Branch IRI                  					 |  			      |
| <span class="param-type">Commit IRI   </span>		| Commit IRI                  					 |			          |


<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the graphs pattern matching expression

<div class="anchor-sub-parts">Example</div>

```js
let [br] = vars("Branch ID")

lib().graphs().not().eq(br, '')
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!-- branches -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">branches</span>
</div>

Retreives the list of branches for the current database  

<div class="anchor-sub-parts">Syntax</div>

```js
branches(Values, Variables, ResourceIdentifier)
```

<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             | Prefix                |
|---------------------------------------------------|-----------------------------------------|-----------------------|
| <span class="param-type">Branch ID  </span>       |resource id of the branch                 | (ref:branch)		  |
| <span class="param-type">Time  </span>            |Time of last commit          			   | (ref:commit_timestamp)|
| <span class="param-type">Commit ID  </span>       | id of the commit that points to the graph| (ref:ref_commit)    |
| <span class="param-type">Branch IRI   </span>		| Branch IRI                  			   |  			      |
| <span class="param-type">Commit IRI   </span>		| Commit IRI                  			   |			          |

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the branches pattern matching expression


<div class="anchor-sub-parts">Example</div>

```js
let [ci] = vars("Branch ID")

lib().branches(eq(ci, 'main'))
//retrieves branch with id main
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!--objects-->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">objects</span>
</div>

Retreives the list of object ids and their types  

<div class="anchor-sub-parts">Syntax</div>

```js
objects(Values, Variables, ResourceIdentifier)
```


<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             |
|---------------------------------------------------|-----------------------------------------|
| <span class="param-type">Object Type  </span>     |type of the object                |
| <span class="param-type">Object ID  </span>       |IRI of the object        	     |

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the objects pattern matching expression


<div class="anchor-sub-parts">Example</div>

```js
let [ot] = vars("Object Type")

lib().objects(member(ot, ['@schema:Y', '@schema:Z']))
//retrieves all objects of type @schema:Z and @schema:Y
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!-- property_values -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">property values</span>
</div>

Retreives the list of property values for objects in the database  

<div class="anchor-sub-parts">Syntax</div>

```js
property_values(Values, Variables, ResourceIdentifier)
```


<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             |
|---------------------------------------------------|-----------------------------------------|
| <span class="param-type">Object ID </span>        |IRI of the object              		  |
| <span class="param-type">Property ID  </span>     |IRI of the property        	     	  |
| <span class="param-type">Property Value  </span>  |The value of the property (literal or JSON-LD document)|
| <span class="param-type"Value ID   </span>        |IRI of the value (object properties)     |
| <span class="param-type">Value Class </span>      |Class of the value (object properties)   |


<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the property values pattern matching expression

<div class="anchor-sub-parts">Example</div>

```js
let [p] = vars("Property ID")

lib().property_values(eq(p, 'rdf:type'))
//retrieves all type properties from the DB
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!-- object_metadata -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">object metadata</span>
</div>

Retreives the list of objects with metadata about their types  

<div class="anchor-sub-parts">Syntax</div>

```js
object_metadata(Values, Variables, ResourceIdentifier)
```

<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             | Prefix                |
|---------------------------------------------------|-----------------------------------------|-----------------------|
| <span class="param-type">Object ID   </span>      |IRI of the object                         | (rdfs:label)	  		  |
| <span class="param-type">Description  </span>     |Object description          			   | (rdfs:comment)			  |
| <span class="param-type">Type ID  </span>         | IRI of the type of the object            | (rdf:type)  			  |
| <span class="param-type">Type Name   </span>		| Label of the type                  	   | (rdfs:label from schema) |
| <span class="param-type">Type Description   </span>| Description of the type                 |(rdfs:comment from schema)|

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the object metadata pattern matching expression

<div class="anchor-sub-parts">Example</div>

```js
let [t] = vars("Type ID")

lib().object_metadata(eq(t, '@schema:Z'))
//retrieves all objects of type @schema:Z with their metadata
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->


<!-- property_metadata-->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">property metadata</span>
</div>

Retreives the list of properties with metadata about their types

<div class="anchor-sub-parts">Syntax</div>

```js
property_metadata(Values, Variables, ResourceIdentifier)
```


<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             | Prefix                |
|---------------------------------------------------|-----------------------------------------|-----------------------|
| <span class="param-type">Object ID   </span>      |IRI of the object                        | (rdfs:label)	  	  |
| <span class="param-type">Property ID </span>      |IRI of the property       			      | 		  			  |
| <span class="param-type">Property Name   </span>  | Property label            			  | (rdfs:label)		  |
| <span class="param-type">Property Value   </span>	| Property Value                  	   	  |    					  |
| <span class="param-type">Property Description </span>| Property description                 |(rdfs:comment )		  |

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the property metadata pattern matching expression

<div class="anchor-sub-parts">Example</div>

```js
lib().property_metadata()

//retrieves all objects of type @schema:Z with their metadata    
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!-- commits -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">commits</span>
</div>

Retreives the list of commits  

<div class="anchor-sub-parts">Syntax</div>

```js
commits(Values, Variables, ResourceIdentifier)
```

<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             |
|---------------------------------------------------|-----------------------------------------|
| <span class="param-type">Commit ID    </span>     |ID of the commit						  |	  
| <span class="param-type">Commit IRI </span>       |IRI of the commit 			      		  | 		  			
| <span class="param-type">Time   </span>  			|  timestamp of commit            		  |
| <span class="param-type">Author   </span>			| Author of commit       	   	  		  |    		
| <span class="param-type">Message </span>			| commit message                		  |		 
| <span class="param-type">Parent ID  </span>		| Commit ID of parent commit              |		 
| <span class="param-type">Parent IRI  </span>		| IRI of parent commit           		  |		 
| <span class="param-type">Children  </span>		| Array of child commits       			  |		 


<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the commits pattern matching expression

<div class="anchor-sub-parts">Example</div>

```js
lib().commits()
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!-- commit_chain -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">commit chain</span>
</div>

Retrieves chains of commits from one commit to another   

<div class="anchor-sub-parts">Syntax</div>

```js
commit_chain(Values, Variables, ResourceIdentifier)
```

<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             |
|---------------------------------------------------|-----------------------------------------|
| <span class="param-type">Head IRI    </span>      |IRI of commit as chain starting point	  |	  
| <span class="param-type">Tail IRI </span>         | IRI of commit as chain ending point 	  | 		  			
| <span class="param-type">Path   </span>  			| Path traversed from head to tail        |


<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the commit chain pattern matching expression

<div class="anchor-sub-parts">Example</div>

```js
lib().commit_chain()
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!--repos-->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">repos</span>
</div>

Retrieves information about remotes and their repositories in the repository graph

<div class="anchor-sub-parts">Syntax</div>

```js
repos(Values, Variables, ResourceIdentifier)
```

<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             |
|---------------------------------------------------|-----------------------------------------|
| <span class="param-type">Repository IRI    </span>|IRI of commit as chain starting point	  |	  
| <span class="param-type">Repository Name </span>  | name of the repositoriy (ref:repository_name)	  | 		  			
| <span class="param-type">Path   </span>  			| Path traversed from head to tail        |


<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the repository pattern matching expression

<div class="anchor-sub-parts">Example</div>

```js
lib().repos(false, false, "admin/MyTestDB/_meta")
//note: the resource id for repository graphs must be specified explicitly for the db
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!-- dbs-->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">dbs</span>
</div>

Retrieves information about the databases on the server   

<div class="anchor-sub-parts">Syntax</div>

```js
dbs(Values, Variables, ResourceIdentifier)
```


<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             |
|---------------------------------------------------|-----------------------------------------|
| <span class="param-type">DB Name    </span>       | Name of the database  (system:database_name)|	  
| <span class="param-type">DB ID  </span> 		    | IRI of the database document	  			  | 		  			
| <span class="param-type">Organization   </span> 	| ID of the organization that owns the DB     |
| <span class="param-type">Description   </span> 	|  Description of the DB     				  |
| <span class="param-type">DB IRI   </span> 	    | IRI of the database document in the system graph |
| <span class="param-type">Organization IRI   </span> | IRI of the organization document in the system graph |

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the database pattern matching expression

<div class="anchor-sub-parts">Example</div>

```js
lib().dbs()
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!-- prefixes -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">prefixes</span>
</div>

Retrieves the list of IRI prefixes in use in the DB   

<div class="anchor-sub-parts">Syntax</div>

```js
prefixes(Values, Variables, ResourceIdentifier)
```

<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             |
|---------------------------------------------------|-----------------------------------------|
| <span class="param-type">Prefix    </span>        | The prefix string (eg. doc)  			  |	  
| <span class="param-type">URI  </span> 		    | The full URI/IRI that the prefix refers to | 		  			
| <span class="param-type">Prefix Pair IRI   </span> 	| the IRI of the document that contains the prefix / URL  |

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the prefix pattern matching expression

<div class="anchor-sub-parts">Example</div>

```js
lib().prefixes()
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!-- insert_prefix -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">insert prefix</span>
</div>

Inserts a new prefix pair into the database  

<div class="anchor-sub-parts">Syntax</div>

```js
insert_prefix(Values, Variables, ResourceIdentifier)
```

<div class="anchor-sub-parts">Arguments:</div>

| Arguments                                         | Types                                                                | Requirement                |
|---------------------------------------------------|----------------------------------------------------------------------|----------------------------|
| <span class="param-type">Values  </span>          | must contain [prefix, IRI] as either variables or string literals    | Mandatory                  |
| <span class="param-type">Variables  </span>       | single variable, default is: <br/>Prefix Pair IRI - variable which will contain the generated IRI of the prefix pair    | Mandatory                  |

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the prefix insertion expression

<div class="anchor-sub-parts">Example</div>

```js
lib().insert_prefix(['foaf', "http://xmlns.com/foaf/0.1/"])
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!-- document_classes -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">document classes</span>
</div>

Retrieves the list of document classes from the DB   

<div class="anchor-sub-parts">Syntax</div>

```js
document_classes(Values, Variables, ResourceIdentifier)
```

<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             | Prefix                |
|---------------------------------------------------|-----------------------------------------|-----------------------|
| <span class="param-type">Class ID   </span>       |IRI of the class                         | 	 				  |
| <span class="param-type">Class Name  </span>      |Label of the Class       			      | 	(rdfs:label)	  |
| <span class="param-type">Description   </span>    | Description            			  	  | (rdfs:comment)		  |
| <span class="param-type">Parents   </span>	    |  Parents classes  						  |   (rdfs:subClassOf)|
| <span class="param-type">Child   </span>	        |  Child classes  						  |   (rdfs:subClassOf)|
| <span class="param-type">Abstract</span>          |Abstract class designation               |(system:tag system:abstract)|

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the classes pattern matching expression

<div class="anchor-sub-parts">Example</div>

```js
lib().document_classes()
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!-- concrete_document_classes -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">concrete document classes</span>
</div>

Retrieves the list of non-abstract document classes from the DB   

<div class="anchor-sub-parts">Syntax</div>

```js
concrete_document_classes(Values, Variables, ResourceIdentifier)
```

<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             | Prefix                |
|---------------------------------------------------|-----------------------------------------|-----------------------|
| <span class="param-type">Class ID   </span>       |IRI of the class                         | 	 				  |
| <span class="param-type">Class Name  </span>      |Label of the Class       			      | 	(rdfs:label)	  |
| <span class="param-type">Description   </span>    | Description            			  	  | (rdfs:comment)		  |
| <span class="param-type">Parents   </span>	    |  Parents classes  						  |   (rdfs:subClassOf)|
| <span class="param-type">Child   </span>	        |  Child classes  						  |   (rdfs:subClassOf)|
| <span class="param-type">Abstract</span>          |Abstract class designation               |(system:tag system:abstract)|

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the classes pattern matching expression

<div class="anchor-sub-parts">Example</div>

```js
lib().concrete_document_classes()
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!-- document_metadata -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">document metadata</span>
</div>

Retreives the list of documents with metadata about their types  

<div class="anchor-sub-parts">Syntax</div>

```js
document_metadata (Values, Variables, ResourceIdentifier)
```

<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             | Prefix                |
|---------------------------------------------------|-----------------------------------------|-----------------------|
| <span class="param-type">Document ID    </span>   |IRI of the document                         | 	 				  |
| <span class="param-type">Name  </span>   		    |document label     			      | 	(rdfs:label)	  |
| <span class="param-type">Description   </span>    | Description            			  	  | (rdfs:comment)		  |
| <span class="param-type">Type ID    </span>	    |  IRI of the type of the document  	  |   (rdf:type)|
| <span class="param-type">Type Name   </span>	    |  Label of the type  						  |   (rdfs:label from schema)|
| <span class="param-type">Type Description</span>  |Description of the type               | (rdfs:comment from schema)|

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the object metadata pattern matching expression

<div class="anchor-sub-parts">Example</div>

```js
lib().document_metadata()    
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!-- documents-->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">documents</span>
</div>

Retreives the list of document ids and their types  

<div class="anchor-sub-parts">Syntax</div>

```js
documents(Values, Variables, ResourceIdentifier)
```

<div class="anchor-sub-parts">Default Variables:</div>

| Variables                                         | Description                             |
|---------------------------------------------------|-----------------------------------------|
| <span class="param-type">Document Type    </span> |type of the document                     | 	 				  
| <span class="param-type">Document ID  </span>   		    | IRI of the document  		      | 	

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the objects pattern matching expression

<div class="anchor-sub-parts">Example</div>

```js
lib().documents()
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

## Commit Graph Navigation

The WOQL.js library also provides a set of functions for navigation of the commit graph by branch, time and commit id. These functions do not take the same arguments as the standard functions above. There are two flavours of all graph navigation functions - one that returns all the meta-data for each commit, the other that returns only the commit ids - to allow these functions to be conveniently joined with other queries and filters.  

<!--commit_chain_full -->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">commit chain full</span>
</div>

Retreives the commit chain with full details of all commits (combines commits() and commit_chain())  

<div class="anchor-sub-parts">Syntax</div>

```js
commit_chain_full(Values, ResourceIdentifier)
```

<div class="anchor-sub-parts">Arguments:</div>

| Arguments                                         | Types                                               | Requirement                |
|---------------------------------------------------|-----------------------------------------------------|----------------------------|
| <span class="param-type">Values  </span>          | values array as per standard arguments   			  | Mandatory                  |
| <span class="param-type">ResourceIdentifier  </span>       | graph identifier (defaults to _commits)   | Mandatory                  |

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the full commit chain pattern matching expression

<div class="anchor-sub-parts">Example</div>

```js
lib().commit_chain_full()   
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!-- first_commit -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">first commit</span>
</div>

Retreives information about the first commit in the database  

<div class="anchor-sub-parts">Syntax</div>

```js
first_commit()
```

<div class="anchor-sub-parts">Arguments:</div>
None - variable names are as per commits() function above

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the first commit pattern matching expression: returns the same variables as the lib().commits() function


<div class="anchor-sub-parts">Example</div>

```js
lib().first_commit()  
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!-- active_commit -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">active commit</span>
</div>

Retrieves the details of the commit that was active at the given timestamp on the given branch  

<div class="anchor-sub-parts">Syntax</div>

```js
active_commit(BranchID, Timestamp)
```

<div class="anchor-sub-parts">Arguments:</div>

| Arguments                                         | Types                                               | Requirement                |
|---------------------------------------------------|-----------------------------------------------------|----------------------------|
| <span class="param-type">BranchID  </span>          | (string*) - the id of the branch to aim for (for disambiguation when there are multiple child commits)			  | Mandatory                  |
| <span class="param-type">Timestamp  </span>       | (string or decimal) - the timestamp (or variable containing the timestamp) of interest - defaults to now | Mandatory                  |

<div class="anchor-sub-parts">Arguments:</div>
None - variable names are as per commits() function above

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the active commit pattern matching expression: returns the same variables as the lib().commits() function


<div class="anchor-sub-parts">Example</div>

```js
lib().active_commit('main')    
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!--commit_history-->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">commit history</span>
</div>

Retreives the metadata for the passed CommitID and its parent commits - up to a total of Count steps (including the passed CommitID)

<div class="anchor-sub-parts">Syntax</div>

```js
commit_history(CommitID, Count)
```

<div class="anchor-sub-parts">Arguments:</div>

| Arguments                                         | Types                                               | Requirement                |
|---------------------------------------------------|-----------------------------------------------------|----------------------------|
| <span class="param-type">CommitID  </span>          | (string*) - the id of the commit to retrieve the history starting from (included in results)		  | Mandatory                  |
| <span class="param-type">Count  </span>       | (string or integer) - an integer or variable containing an integer representing the number of steps to include in the commit history - defaults to 10 | Optional                  |

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the commit history pattern matching expression: returns the same variables as the lib().commits() function for each entry

<div class="anchor-sub-parts">Example</div>

```js
and(
	lib().active_commit_id('main', false, "Current Head ID"),
	lib().commit_history("v:Current Head ID", 5)
)

```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!-- previous_commits -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">commit history</span>
</div>

Retreives the metadata for the parent commits of the passed CommitID - up to a total of Count steps (not including the passed CommitID)

<div class="anchor-sub-parts">Syntax</div>

```js
previous_commits(CommitID, Count)
```

<div class="anchor-sub-parts">Arguments:</div>

| Arguments                                         | Types                                               | Requirement                |
|---------------------------------------------------|-----------------------------------------------------|----------------------------|
| <span class="param-type">CommitID  </span>          | (string*) - the id of the commit to retrieve the previous commits starting from (not included in results)	  | Mandatory                  |
| <span class="param-type">Count  </span>       | (string or integer) - an integer or variable containing an integer representing the number of steps to include in the commit history - defaults to 1 | Optional                  |

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the previous commits pattern matching expression: returns the same variables as the lib().commits() function for each entry


<div class="anchor-sub-parts">Example</div>

```js
and(
	lib().active_commit_id('main', false, "Current Head ID"),
	lib().previous_commits("v:Current Head ID", 5)
)

```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->
<!-- commit_future -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">commit future</span>
</div>

Retreives the metadata for the passed CommitID and its future commits on branch BranchID - up to a total of Count steps (including the passed CommitID)

<div class="anchor-sub-parts">Syntax</div>

```js
commit_future(CommitID, BranchID, Count)
```


<div class="anchor-sub-parts">Arguments:</div>

| Arguments                                         | Types                                               | Requirement                |
|---------------------------------------------------|-----------------------------------------------------|----------------------------|
| <span class="param-type">CommitID  </span>          |(string*) - the id of the commit to retrieve the future starting from (included in results)| Mandatory                  |
| <span class="param-type">BranchID  </span>       | (string*) - the id of the branch to aim for (for disambiguation when there are multiple child commits)| Mandatory                  |
| <span class="param-type">Count  </span>       | (string or integer) - an integer or variable containing an integer representing the number of steps to include in the commit future - defaults to 10| Optional                  |

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the commit history pattern matching expression: returns the same variables as the lib().commits() function for each entry

<div class="anchor-sub-parts">Example</div>

```js
lib().commit_future('bi1qqga9sxlzgvv061b3zpe48mmjtbb', "main", 5)

```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->

<!-- next_commits -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">next commits</span>
</div>

Retreives the metadata for child commits of the passed CommitID on branch BranchID - up to a total of Count steps (not including the passed CommitID)

<div class="anchor-sub-parts">Syntax</div>

```js
next_commits(CommitID, BranchID, Count)
```

<div class="anchor-sub-parts">Arguments:</div>

| Arguments                                         | Types                                               | Requirement                |
|---------------------------------------------------|-----------------------------------------------------|----------------------------|
| <span class="param-type">CommitID  </span>          | (string*) -the id of the commit to retrieve the next commits starting from (not included in results)| Mandatory                  |
| <span class="param-type">BranchID  </span>       |the id of the branch to aim for (for disambiguation when there are multiple child commits)| Mandatory                  |
| <span class="param-type">Count  </span>       | (string or integer) - an integer or variable containing an integer representing the number of steps to include in the commit future - defaults to 1| Optional                  |

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the commit history pattern matching expression: returns the same variables as the lib().commits() function for each entry

<div class="anchor-sub-parts">Example</div>

```js
lib().next_commits('bi1qqga9sxlzgvv061b3zpe48mmjtbb', "main", 4)

```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->


<!-- active_commit_id -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">active commit id</span>
</div>

Retrieves the ID of the commit that was active at the given timestamp on the given branch - result is stored in CommitIDVar  

<div class="anchor-sub-parts">Syntax</div>

```js
active_commit_id(CommitID, Timestamp, CommitIDVar)
```

<div class="anchor-sub-parts">Arguments:</div>

| Arguments                                         | Types                                               | Requirement                |
|---------------------------------------------------|-----------------------------------------------------|----------------------------|
| <span class="param-type">CommitID  </span>          |(string*) - the id of the commit to retrieve the history for| Mandatory                  |
| <span class="param-type">Timestamp  </span>       |(string or decimal) - the Unix timestamp (or variable containing the timestamp) of interest - defaults to now| Optional                  |
| <span class="param-type">CommitIDVar  </span>       | (string) - the name of the variable in which to store the matched IDs (defaults to "Commit ID")| Optional                  |

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the pattern matching expression: returns one row per CommitIDVar value

<div class="anchor-sub-parts">Example</div>

```js
lib().active_commit_id('main')

```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->     

<!--history_ids-->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">history ids</span>
</div>

Retrieves the ids of the passed CommitID and the ids of its parents - up to a total of count ids (including the passed CommitID), the results are stored in CommitIDVar  

<div class="anchor-sub-parts">Syntax</div>

```js
history_ids(CommitID, Count, CommitIDVar)
```


<div class="anchor-sub-parts">Arguments:</div>

| Arguments                                         | Types                                               | Requirement                |
|---------------------------------------------------|-----------------------------------------------------|----------------------------|
| <span class="param-type">CommitID  </span>          | (string*) - the id of the commit to retrieve the history for| Mandatory                  |
| <span class="param-type">Count  </span>       |(string or integer) - an integer or variable containing an integer representing the number of steps to include in the commit history - defaults to 10| Optional                  |
| <span class="param-type">CommitIDVar  </span>       | (string) - the name of the variable in which to store the matched IDs (defaults to "Commit ID")| Optional                  |

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the pattern matching expression: returns one row per CommitIDVar value

<div class="anchor-sub-parts">Example</div>

```js
and(
	lib().active_commit_id('main', false, "Current Head ID"),
	lib().history_ids("v:Current Head ID", 5)
)

```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->     

<!-- previous_commit_ids -->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings">previous commit ids</span>
</div>

Retrieves the ids of the parent commits of the passed CommitID - up to a total of count ids (not including the passed CommitID), the results are stored in CommitIDVar  

<div class="anchor-sub-parts">Syntax</div>

```js
previous_commit_ids(CommitID, Count, CommitIDVar)
```

<div class="anchor-sub-parts">Arguments:</div>

| Arguments                                         | Types                                               | Requirement                |
|---------------------------------------------------|-----------------------------------------------------|----------------------------|
| <span class="param-type">CommitID  </span>          | (string*) - the id of the commit to retrieve the previous commits starting fromthe id of the commit to retrieve the history for| Mandatory                  |
| <span class="param-type">Count  </span>       |(string or integer) - an integer or variable containing an integer representing the number of steps to include in the commit history - defaults to 10| Optional                  |
| <span class="param-type">CommitIDVar  </span>       | (string) - the name of the variable in which to store the matched IDs (defaults to "Commit ID")| Optional                  |

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the pattern matching expression: returns one row per CommitIDVar value

<div class="anchor-sub-parts">Example</div>

```js
and(
	lib().active_commit_id('main', false, "Current Head ID"),
	lib().previous_commit_ids("v:Current Head ID", 5)
)
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->  
<!-- future_ids-->

<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings"> future ids</span>
</div>

Retrieves the ids of the passed CommitID and the ids of its parents - up to a total of count ids (including the passed CommitID), the results are stored in CommitIDVar  

<div class="anchor-sub-parts">Syntax</div>

```js
future_ids(CommitID, BranchID, Count, CommitIDVar)
```

<div class="anchor-sub-parts">Arguments:</div>

| Arguments                                         | Types                                               | Requirement                |
|---------------------------------------------------|-----------------------------------------------------|----------------------------|
| <span class="param-type">CommitID  </span>          | (string*) - the id of the commit to retrieve the history for| Mandatory                  |
| <span class="param-type">BranchID  </span>       |(string*) - the id of the branch to aim for (for disambiguation when there are multiple child commits)| Mandatory                  |
| <span class="param-type">Count  </span>       | (string or integer) - an integer or variable containing an integer representing the number of steps to include in the commit history - defaults to 10| Optional                  |
| <span class="param-type">CommitIDVar  </span>       | (string) - the name of the variable in which to store the matched IDs (defaults to "Commit ID")| Mandatory                  |

<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the pattern matching expression: returns one row per CommitIDVar value

<div class="anchor-sub-parts">Example</div>

```js
lib().future_ids("bi1qqga9sxlzgvv061b3zpe48mmjtbb", "main", 4)
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->  

<!--next_commit_ids-->
<div class="anchor-sub-headings-style">
    <span class="anchor-sub-headings"> next commit ids</span>
</div>
Retrieves the ids of the child commits of the passed CommitID - up to a total of count ids (not including the passed CommitID), the results are stored in CommitIDVar


<div class="anchor-sub-parts">Syntax</div>

```js
next_commit_ids(CommitID, BranchID, Count, CommitIDVar)
```


<div class="anchor-sub-parts">Arguments:</div>

| Arguments                                         | Types                                               | Requirement                |
|---------------------------------------------------|-----------------------------------------------------|----------------------------|
| <span class="param-type">CommitID  </span>          | (string*) - the id of the commit to retrieve the history for| Mandatory                  |
| <span class="param-type">BranchID  </span>       |(string*) - the id of the branch to aim for (for disambiguation when there are multiple child commits)| Mandatory                  |
| <span class="param-type">Count  </span>       | (string or integer) - an integer or variable containing an integer representing the number of steps to include in the commit chain - defaults to 1| Optional                  |
| <span class="param-type">CommitIDVar  </span>       | (string) - the name of the variable in which to store the matched IDs (defaults to "Commit ID")| Mandatory                  |


<div class="anchor-sub-parts">Returns</div>
WOQLQuery containing the pattern matching expression: returns one row per CommitIDVar value

<div class="anchor-sub-parts">Example</div>

```js
lib().next_commit_ids("bi1qqga9sxlzgvv061b3zpe48mmjtbb", "main", 4)
```

<hr class="section-separator"/>
<!----------------------------------------------------------------------------------------->  
