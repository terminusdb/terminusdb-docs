# oneOf Document
This example shows how ``<FrameViewier/>`` appears for a document called ``Graduate`` with a one of field in Create/ Edit and View mode. The value of the @oneOf field is a set, so can be any number of documents all of which have mutually disjointed properties, but which can coexist.

In this example ``Graduate`` has a property ``scored`` that points to ``Grades``. ``Grades`` is defined as @oneOf that is an array of documents which can take any choice within. In this example, ``Grades`` can take any choice from ``grade``, ``marks`` or ``report``.

## Demo 
Take a look at the [**Demo Playground**](https://documents-ui-playground.terminusdb.com/OneOfs) to view the ``<FrameViewier/>`` with the OneOfs properties in Create, Edit and View mode.

## Frame 
This frame consists of a Graduate document -

```javascript
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

### Create

```javascript
import { FrameViewer } from '@terminusdb/terminusdb-documents-ui'

  return <FrameViewer
    frame={frame}               // above defined frame          
    formData={{}}               // formData will be empty
    mode={"Create"}             // mode 
    type={"Graduate"}/>           // type of document 
```

### Edit & View
Note - make sure the document is filled in View mode. The form will be in read only mode for View.

```javascript
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

