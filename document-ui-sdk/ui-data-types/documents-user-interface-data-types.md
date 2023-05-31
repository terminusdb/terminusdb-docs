---
description: Understand the different data types to build data driven user interfaces
---

# Documents UI SDK Data Types

The TerminusDB documents user interface generates forms representing the properties or fields of document/s in your schema. For data entry, each field is one of several data types and is mandatory by default. Schema definitions enable the linking of documents and the specification of sets.

[**Click here to find how how to get started with the Document UI SDK**](./)

## Demo 
Take a look at the [**Document UI SDK Playground**](https://documents-ui-playground.terminusdb.com) to view the ``<FrameViewier/>`` demo in Create, edit or view mode.

## Data types

### Basic data types

The table below lists the basic data types supported and their specifications.

| **Data type** | **Declaration**  | **Example**                                     |
| ------------- | ---------------- | ----------------------------------------------- |
| Boolean       | `"xsd:boolean"`  | `"active": "xsd:boolean"`                       |
| Decimal       | `"xsd:decimal"`  | `"age": "xsd:decimal"`                          |
| Enum          | `"@type: "Enum"` | `"@values": ["red", "blue", "yellow", "green"]` |
| Integer       | `"xsd:integer"`  | `"age": "xsd:integer"`                          |
| Decimal       | `"xsd:decimal"`  | `"age": "xsd:decimal"`                          |
| String        | `"xsd:string"`   | `"name": "xsd:string"`                          |
| Temporal      | `"xsd:dateTime"` | `"DOB": "xsd:dateTime"`                         |

### Data value optionality
If a property in the Form is displayed with a (Required) tab, that means the property is mandatory & has to be filled in order to submit the form. To define a property as optional, use the `"@type": "Optional"` declaration meaning the property is optional.

A property can also be defined as an array in the following ways -

`"@type": "Set"` - property can hold multiple values in an unordered fashion & can be optional

`"@type": "List"` - property can hold multiple values in an ordered fashion & requires at least one entry

### An example of all basic types

**Enum**

The `"Enum"` data type in the example below specifies the colors a person likes - `"@id": "Colors`, `"Person"`, `"likes"`. This is rendered as a dropdown menu with the colors specified in the `"@values"` list.

**Optional**

The `"age"` of a `"Person"` is declared `"Optional"`

```javascript
let frames =  {
    "@context": {
        "@base": "terminusdb:///data/",
        "@schema": "terminusdb:///schema#",
        "@type": "@context"
    },
    "Person": {
        "@key": {
            "@type": "Random"
        },
        "@type": "Class",
        "DOB": "xsd:dateTime",
        "active": "xsd:boolean",
        "age": {
		    "@class": "xsd:decimal",
			"@type": "Optional"
		},
        "name": "xsd:string",
        "likes": {
            "@id": "Colors",
            "@type": "Enum",
            "@values": [
                "red",
                "blue",
                "yellow",
                "green"
            ]
        }
    }
}

let type = "Person"
let mode = "Create"

return <FrameViewer
    frame = {frames}
    type = {type}
    mode = {mode}/>
```

## Link Properties

Link properties enable links to other document or subdocument classes and are displayed as `Select` components.

### Link Properties Example

The example below demonstrates:

* The property `work_as` linked to document class `Job`
* The property `lives_in` linked to a subdocument class `Address`

```javascript
let frames = {
   "@context": {
      "@base": "terminusdb:///data/",
      "@schema": "terminusdb:///schema#",
      "@type": "@context"
   },
   "Person": {
        "@key": {
        "@type": "Random"
        },
        "@type": "Class",
        "works_as": "Job", // Link to subdocument Job
	    "lives_in": "Address" // Link to subdocument Address
    },
    "Job": {
        "@key": {
        "@type": "Random"
        },
        "@type": "Class",
        "title": "xsd:string"
    },
    "Address": {
	    "@key": {
		    "@type": "Random"
		},
		"@subdocument": [],
		"@type": "Class",
		"Address Line 1": "xsd:string",
		"Code": "xsd:decimal",
		"Country": "xsd:string"
	}
}

let type = "Person"
let mode = "Create"

return <FrameViewer
    frame = {frames}
    type = {type}
    mode = {mode}/>
```

## Set properties

A set specifies an **unordered set** of values of a class or data type.

### Set property example

In the example below, the document `Person` consists of several nicknames - property `"nickName"` of `"@type": "Set"`. A set consists of zero, one or multiple items.

```javascript
let frames = {
    "@context": {
        "@base": "terminusdb:///data/",
        "@schema": "terminusdb:///schema#",
        "@type": "@context"
    },
    "Person": {
        "@key": {
            "@type": "Random"
        },
        "@type": "Class",
        "name": "xsd:string",
        "nickName": {
			"@class": "xsd:string",
			"@type": "Set"
	    }
    }
}

let type = "Person"
let mode = "Create"

return <FrameViewer
    frame = {frames}
    type = {type}
    mode = {mode}/>
```


### Document Class Set Example

In the example below, a `Person` has a property `works_as` defined as a set that links to the document `Job`, representing a person with multiple jobs.

```javascript
let frames = {
    "@context": {
        "@base": "terminusdb:///data/",
        "@schema": "terminusdb:///schema#",
        "@type": "@context"
    },
    "Person": {
        "@key": {
            "@type": "Random"
        },
        "@type": "Class",
        "name": "xsd:string",
        "works_as": {
            "@class": "Job",
            "@type": "Set"
        }
   },
   "Job": {
	   "@key": {
		  "@type": "Random"
	   },
	   "@type": "Class",
	   "title": "xsd:string"
    }
}

let type = "Person"
let mode = "Create"

return <FrameViewer
    frame = {frames}
    type = {type}
    mode = {mode}/>
```


### Subdocument Class Set Example

In the example below, a `Person` has a property `lived` defined as a set that links to the subdocument `Address`, representing a person's address history.

```javascript
let frames = {
    "@context": {
        "@base": "terminusdb:///data/",
        "@schema": "terminusdb:///schema#",
        "@type": "@context"
    },
    "Person": {
        "@key": {
            "@type": "Random"
        },
        "@type": "Class",
        "name": "xsd:string",
        "lived": {
            "@class": {
                "@class": "Address",
                "@subdocument": []
            },
            "@type": "Set"
        }
    },
    "Address": {
        "@key": {
            "@type": "Random"
        },
        "@subdocument": [],
        "@type": "Class",
        "Address Line 1": "xsd:string",
        "Code": "xsd:decimal",
        "Country": "xsd:string"
	 }
}

let type = "Person"
let mode = "Create"

return <FrameViewer
    frame = {frames}
    type = {type}
    mode = {mode}/>
```

## List Properties

A list specifies an **ordered collection** of values of a class or data type. An ordered collection means values are displayed in the order they are entered in the form.

### List property example

In the example below, a `Person` has two properties, `ordered_property` (a string data type) and `has_task` (a subdocument of type `"List"`.)

```javascript
let frames = {
    "@context": {
        "@base": "terminusdb:///data/",
        "@schema": "terminusdb:///schema#",
        "@type": "@context"
    },
    "Person": {
        "@key": {
        "@type": "Random"
        },
        "@type": "Class",
        "ordered_property": {
		    "@class": "xsd:string",
			"@type": "List"
		},
	    "has_task": {
		    "@class": "Tasks",
			"@type": "List"
		}
    },
    "Tasks": {
	    "@key": {
		    "@type": "Random"
        },
		"@subdocument": [],
		"@type": "Class",
		"Address Line 1": "xsd:string",
		"Code": "xsd:decimal",
		"Country": "xsd:string"
    }
}

let type = "Person"
let mode = "Create"

// call FrameViewer
return <FrameViewer
    frame = {frames}
    type = {type}
    mode = {mode}/>
```
