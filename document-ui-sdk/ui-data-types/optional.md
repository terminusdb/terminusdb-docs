# Optional 
This example shows how ``<FrameViewier/>`` appears for a document ``Person_Optional`` with optional fields in Create/ Edit and View mode. 
 
## Demo 
Take a look at the [**Demo Playground**](https://documents-ui-playground.terminusdb.com/Optional)** to view ``<FrameViewier/>`` with Optional properties in Create, Edit and View mode.

## Frame 
This frame consists of a `Person` document

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
    "Person_Optional": {
      "@documentation": {
        "@comment": "",
        "@properties": {
          "above18": "18 plus",
          "permanentAddress": "Permanent Address"
        }
      },
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "Birthday": {
        "@class": "xsd:dateTime",
        "@type": "Optional"
      },
      "PhoneNumber": {
        "@class": "xsd:decimal",
        "@type": "Optional"
      },
      "Today": {
        "@class": "xsd:dateTime",
        "@type": "Optional"
      },
      "above18": {
        "@class": "xsd:boolean",
        "@type": "Optional"
      },
      "age": {
        "@class": "xsd:decimal",
        "@type": "Optional"
      },
      "email": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "name": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "permanentAddress": {
        "@class": {
          "@class": "Address",
          "@subdocument": []
        },
        "@type": "Optional"
      },
      "website": {
        "@class": "xsd:string",
        "@type": "Optional"
      }
    }
  }
```


#### Create

```javascript
import { FrameViewer } from '@terminusdb/terminusdb-documents-ui'

  return <FrameViewer
    frame={frame}               // above defined frame          
    formData={{}}               // formData will be empty
    mode={"Create"}             // mode 
    type={"Person_Optional"}/>           // type of document 
```

#### Edit & View
Note - make sure to provide document values for View mode. The form will be in read only mode for View.

```javascript
  let data = {
    "@id": "Person_Optional/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587",
    "@type": "Person_Optional",
    "Birthday": "2022-08-15T12:59:46Z",
    "PhoneNumber": 353912839283123140,
    "Today": "2022-08-15T12:59:50Z",
    "above18": true,
    "age": 22,
    "email": "rack@gmail.com",
    "name": "John Rock",
    "permanentAddress": {
      "@id": "Person_Optional/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
      "@type": "Address",
      "AddressLine1": "somewhere in Europe",
      "Country": "New Zeeland",
      "City": "City",
      "postalCode": "NZ29038"
    },
    "website": "rack@rocking.com"
  }

  return <FrameViewer
      frame={frame}
      mode={"View"}
      formData={data}
      type={"Person_Optional"}/>
```
