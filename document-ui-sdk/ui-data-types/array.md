# Array

This example shows how `<FrameViewier/>` appears for a document `ArrayExamplePerson` with array fields in Create/ Edit or View mode. If a field is described as an array it means the field can have more than one value to it in an ordered fashion. The field can also be considered as an optional field meaning it can be empty or filled.

## Demo

Take a look at the [**Demo**](https://documents-ui-playground.terminusdb.com/Array) to view `<FrameViewier/>` with Array properties in Create, edit or view mode.

## Frame

The below frame consists of an ArrayExamplePerson document

```javascript
  let frame = {
    "@context": {
      "@base": "terminusdb:///data/",
      "@schema": "terminusdb:///schema#",
      "@type": "Context",
      "xsd": "http://www.w3.org/2001/XMLSchema#"
    },
    "Address": {
      "@documentation": [
        {
          "@comment": "An Address",
          "@label": "Address",
          "@language": "en",
          "@properties": {
            "AddressLine1": {
              "@comment": "Address Line one",
              "@label": "Address Line 1"
            },
            "Country": {
              "@comment": "A Country ",
              "@label": "Country"
            },
            "postalCode": {
              "@comment": "A valid Postal Code",
              "@label": "Zip Code"
            }
          }
        },
        {
          "@comment": "მისამართი",
          "@label": "მისამართი",
          "@language": "ka",
          "@properties": {
            "AddressLine1": {
              "@comment": "მისამართის ხაზი პირველი",
              "@label": "მისამართის ხაზი 1"
            },
            "Country": {
              "@comment": "Ქვეყანა",
              "@label": "ქვეყანა"
            },
            "postalCode": {
              "@comment": "მოქმედი საფოსტო კოდი",
              "@label": "Ზიპ კოდი"
            }
          }
        }
      ],
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
      "AddressLine1": "xsd:string",
      "City": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "Country": "xsd:string",
      "postalCode": "xsd:string"
    },
    "ArrayExamplePerson": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "hangs_out_at": {
        "@class": {
          "@class": "Address",
          "@subdocument": []
        },
        "@type": "List"
      },
      "likes_color": {
        "@class": {
          "@id": "Colors",
          "@type": "Enum",
          "@values": [
            "Red",
            "Blue",
            "Yellow",
            "Green"
          ]
        },
        "@type": "List"
      },
      "to_do": {
        "@class": "xsd:string",
        "@type": "List"
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
    type={"ArrayExamplePerson"}/>           // type of document 
```

### Edit & View

Note - make sure to provide document values for View mode. The form will be in read only mode for View.

```javascript
let data = {
	"@id": "ArrayExamplePerson/c92d269b0dce719299bf86fc19f2065937ec4ef82d8a2a53702867a326d6144b",
	"@type": "OrderedPerson",
	"hangs_out_at" : [
		{
			"@id": "ArrayExamplePerson/3ca7d7a9c64ca2bc8319d83bca14b71697528ebb8536024e3e1795cbd049acdf/lived_at/Address/4f4fdae34ab4fa3b6297750917503a7137f75dc11589792de707e7a6d3502db3",
			"@type": "Address",
			"AddressLine1": "anywhere",
			"City": "Nice", 
			"Country": "France",
			"postalCode": "FR27836"
		},
		{
			"@id": "ArrayExamplePerson/3ca7d7a9c64ca2bc8319d83bca14b71697528ebb8536024e3e1795cbd049acdf/lived_at/Address/7aaeeb6b983710a0adbc75de8f7d8104278df427124beadc6644b35b9d6c30af",
			"@type": "Address",
			"AddressLine1": "somewhere",
			"City": "Berlin", 
			"Country": "Germany",
			"postalCode": "GER02398"
		}
	],
	"likes_color": [
		"Blue",
		"Green",
		"Red"
	],
	"to_do": [
		"First Thing",
		"Second Thing",
		"Third Thing"
	]
}

return <FrameViewer
  frame={frame}
  mode={"View"}
  formData={data}
  type={"ArrayExamplePerson"}/>
```
