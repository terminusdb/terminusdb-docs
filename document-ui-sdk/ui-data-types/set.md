# Set 
This example shows how ``<FrameViewier/>`` apepars for a document ``UnorderedPerson`` with set fields
in Create/ Edit or View mode. If a field is described as Set it means the field can have more than one 
value to it in any unordered fashion. The field can also be considered as an optional field meaning it can be empty or filled.

## Demo 
Clicke here **[**Demo**](https://documents-ui-playground.terminusdb.com/Set)** to view ``<FrameViewier/>`` with set properties in Create, edit or view mode.


#### Frame 
Below Frame consists of an UnorderedPerson document 
```
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
    "UnorderedPerson": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
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
        "@type": "Set"
      },
      "lived_at": {
        "@class": {
          "@class": "Address",
          "@subdocument": []
        },
        "@type": "Set"
      },
      "nicknames": {
        "@class": "xsd:string",
        "@type": "Set"
      },
      "worked_as": {
        "@class": "Jobs",
        "@type": "Set"
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
    type={"UnorderedPerson"}/> // type of document 
```

#### Edit & View
Note - make sure filled document is provided in View mode. The form will be in read only mode for View.

```
let data = {
	"@id": "UnorderedPerson/3ca7d7a9c64ca2bc8319d83bca14b71697528ebb8536024e3e1795cbd049acdf",
	"@type": "UnorderedPerson",
	"likes_color": [
		"Green",
		"Red",
		"Yellow"
	],
	"lived_at": [
		{
			"@id": "UnorderedPerson/3ca7d7a9c64ca2bc8319d83bca14b71697528ebb8536024e3e1795cbd049acdf/lived_at/Address/4f4fdae34ab4fa3b6297750917503a7137f75dc11589792de707e7a6d3502db3",
			"@type": "Address",
			"AddressLine1": "anywhere",
			"City": "Nice", 
			"Country": "France",
			"postalCode": "FR27836"
		},
		{
			"@id": "UnorderedPerson/3ca7d7a9c64ca2bc8319d83bca14b71697528ebb8536024e3e1795cbd049acdf/lived_at/Address/7aaeeb6b983710a0adbc75de8f7d8104278df427124beadc6644b35b9d6c30af",
			"@type": "Address",
			"AddressLine1": "somewhere",
			"City": "Berlin", 
			"Country": "Germany",
			"postalCode": "GER02398"
		}
	],
	"nicknames": [
		"Adam",
		"Chane",
		"Luca"
	],
	"worked_as": [
		"Jobs/33e3013112e6e76381ee6aba23a15f686b98fc2c300b3608e6fb25f585d93d24",
		"Jobs/c8114bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda"
	]
}

return <FrameViewer
  frame={frame}
  mode={"View"}
  formData={data}
  type={"UnorderedPerson"}/>
```

