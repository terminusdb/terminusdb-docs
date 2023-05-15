# Choice Document
This example shows how ``<FrameViewier/>`` apepars for a document ``Guy`` with choice document fields
in Create/ Edit or View mode. 
In this example ``Guy``  
has a mandatory property ``favorite_group`` with choices of documents Art, Dance or Music
an optional property ``"second_favorite_group"`` with choices Art, Dance or Music
a set property ``member_of`` with the above same choices
a list property ``attends_group_in_order`` with the above same choices in an ordered fashion

#### Demo 
Clicke here **[**Demo**](https://documents-ui-playground.terminusdb.com/Choice%20Documents)** to view ``<FrameViewier/>`` with Choice  properties in Create, edit or view mode.


Check the below Frames to see the definition of Art, Dance or Music which are other document classes


#### Frame 
Below Frame consists of a Guy document 
```
  let frame = {
    "@context": {
      "@base": "terminusdb:///data/",
      "@schema": "terminusdb:///schema#",
      "@type": "Context",
      "xsd": "http://www.w3.org/2001/XMLSchema#"
    },
    "Guy": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class", 
      "attends_group_in_order": {
        "@class": "Group",
        "@type": "Set"
      },
      "favorite_group": "Group",
      "member_of": {
          "@class": "Group",
          "@type": "Set"
      },
      "second_favorite_group": {
          "@class": "Group",
          "@type": "Optional"
      }
    },
    "Dance": {
      "@documentation": [
        {
          "@language": "en",
          "@properties": {
            "capacity": {
              "@comment": "Max number of people in group",
              "@label": "Capacity"
            },
            "name": {
              "@comment": "Title of the group",
              "@label": "Name"
            }
          }
        },
        {
          "@language": "ka",
          "@properties": {
            "capacity": {
              "@comment": "ადამიანების მაქსიმალური რაოდენობა ჯგუფში",
              "@label": "ტევადობა"
            },
            "name": {
              "@comment": "ჯგუფის სათაური",
              "@label": "სახელი"
            }
          }
        }
      ],
      "@key": {
        "@fields": [
          "name"
        ],
        "@type": "Lexical"
      },
      "@type": "Class",
      "capacity": "xsd:decimal",
      "name": "xsd:string"
    },
    "Art": {
      "@documentation": [
        {
          "@language": "en",
          "@properties": {
            "capacity": {
              "@comment": "Max number of people in group",
              "@label": "Capacity"
            },
            "name": {
              "@comment": "Title of the group",
              "@label": "Name"
            }
          }
        },
        {
          "@language": "ka",
          "@properties": {
            "capacity": {
              "@comment": "ადამიანების მაქსიმალური რაოდენობა ჯგუფში",
              "@label": "ტევადობა"
            },
            "name": {
              "@comment": "ჯგუფის სათაური",
              "@label": "სახელი"
            }
          }
        }
      ],
      "@key": {
        "@fields": [
          "name"
        ],
        "@type": "Lexical"
      },
      "@type": "Class",
      "capacity": "xsd:decimal",
      "name": "xsd:string"
    },
    "Music": {
      "@documentation": [
        {
          "@language": "en",
          "@properties": {
            "capacity": {
              "@comment": "Max number of people in group",
              "@label": "Capacity"
            },
            "name": {
              "@comment": "Title of the group",
              "@label": "Name"
            }
          }
        },
        {
          "@language": "ka",
          "@properties": {
            "capacity": {
              "@comment": "ადამიანების მაქსიმალური რაოდენობა ჯგუფში",
              "@label": "ტევადობა"
            },
            "name": {
              "@comment": "ჯგუფის სათაური",
              "@label": "სახელი"
            }
          }
        }
      ],
      "@key": {
        "@fields": [
          "name"
        ],
        "@type": "Lexical"
      },
      "@type": "Class",
      "capacity": "xsd:decimal",
      "name": "xsd:string"
    }
  }
```


#### Create

```
import { FrameViewer } from '@terminusdb/terminusdb-documents-ui'

  return <FrameViewer
    frame={frame}               // above defined frame          
    formData={{}}               // formData will be empty
    mode={"Create"}             // mode 
    type={"Guy"}/>           // type of document 
```

#### Edit & View
Note - make sure filled document is provided in View mode. The form will be in read only mode for View.

```
let data = {
	"@id": "Guy/4489199036b83dbf79a6e7527a1594fbd416d11b9dde2f8a67fe6fa495dae433",
	"@type": "Guy",
	"favorite_group": "Art/Charcoal%20Art%20Group",
	"attends_group_in_order": [
		"Dance/Dance%20Everyday",
	  "Art/Pastel%20Art%20Group",
	  "Music/Music%2220Pop"
	],
	"member_of": [
	  "Art/Pastel%20Art%20Group",
	  "Dance/Dance%20Everyday"
	],
	"second_favorite_group": "Dance/Dance%20Everyday",
}

return <FrameViewer
  frame={frame}
  mode={"View"}
  formData={data}
  type={"Guy"}/>
```

