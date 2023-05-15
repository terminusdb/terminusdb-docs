# oneOf Document
This example shows how ``<FrameViewier/>`` apepars for a document ``Graduate`` with a one of field
in Create/ Edit or View mode. The value of the @oneOf field is a set, so can be any number of documents all of which have mutually disjoint properties, but which can coexist.  
In this example ``Graduate``  
has a property ``scored`` with points to ``Grades``
``Grades`` is defined as @oneOf which is an array of docs which can take any choices within. In this example
``Grades`` can take any choices ``grade`` or ``marks`` or ``report``

## Demo 
Clicke here **[**Demo**](https://documents-ui-playground.terminusdb.com/OneOfs)** to view ``<FrameViewier/>`` with OneOfs properties in Create, edit or view mode.

#### Frame 
Below Frame consists of a Graduate document 
```
  let frame = {
    "@context": {
      "@base": "terminusdb:///data/",
      "@schema": "terminusdb:///schema#",
      "@type": "Context",
      "xsd": "http://www.w3.org/2001/XMLSchema#"
    },
    "Grades": {
      "@documentation": [
        {
          "@comment": "Grades of a person",
          "@label": "Grades",
          "@language": "en",
          "@properties": {
            "grade": {
              "@comment": "Grades achieved",
              "@label": "Grade"
            },
            "marks": {
              "@comment": "Marks achieved",
              "@label": "Marks"
            },
            "report": {
              "@comment": "Report Card",
              "@label": "Report"
            }
          }
        },
        {
          "@comment": "პიროვნების კლასები",
          "@label": "შეფასებები",
          "@language": "ka",
          "@properties": {
            "grade": {
              "@comment": "მიღწეული ქულები",
              "@label": "შეფასება"
            },
            "marks": {
              "@comment": "მიღწეული ნიშნები",
              "@label": "ნიშნები"
            },
            "report": {
              "@comment": "მოსწრების ფურცელი",
              "@label": "ანგარიში"
            }
          }
        }
      ],
      "@key": {
        "@type": "Random"
      },
      "@oneOf": [
        {
          "grade": "xsd:string",
          "marks": "xsd:decimal",
          "report": {
            "@class": "GradeReport",
            "@subdocument": []
          }
        }
      ],
      "@subdocument": [],
      "@type": "Class"
    },
    "Graduate": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "scored": {
        "@class": {
          "@class": "Grades",
          "@subdocument": []
        },
        "@type": "Optional"
      }
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
    type={"Graduate"}/>           // type of document 
```

#### Edit & View
Note - make sure filled document is provided in View mode. The form will be in read only mode for View.

```
let data = {
	"@id": "Graduate/efb4f89c825dd2c6404b5998b0d170b1df9a250103d7556833c3017e2107da23",
	"@type": "Graduate",
	"scored": {
	  "@id": "Graduate/efb4f89c825dd2c6404b5998b0d170b1df9a250103d7556833c3017e2107da23/scored/Grades/8079b8089b18a97dab9d4af3bffd496f744841bf7b72caaa4a2a2f189fc496b7",
	  "@type": "Grades",
	  "report": {
		"@id": "Graduate/efb4f89c825dd2c6404b5998b0d170b1df9a250103d7556833c3017e2107da23/scored/Graduate/efb4f89c825dd2c6404b5998b0d170b1df9a250103d7556833c3017e2107da23/scored/Grades/8079b8089b18a97dab9d4af3bffd496f744841bf7b72caaa4a2a2f189fc496b7/report/GradeReport/d947ef4e4a261ef6e469b9e24c944c58405e49952fe45b8f50852b650481aec1",
		"@type": "GradeReport",
		"comments": "Outstanding ",
		"score": "Outstanding"
	  }
	}
}

return <FrameViewer
  frame={frame}
  mode={"View"}
  formData={data}
  type={"Graduate"}/>
```

