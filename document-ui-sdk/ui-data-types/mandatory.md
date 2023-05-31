# Mandatory 
This example shows how ``<FrameViewier/>`` appears for a document called ``Person`` with mandatory fields in Create/ Edit and View mode. A required tag will appear against every mandatory field.

## Demo 
Take a look at the [**Demo Playground**](https://documents-ui-playground.terminusdb.com/Mandatory)to view the ``<FrameViewier/>`` with mandatory properties in Create, Edit and View mode.

## Frame 
The below frame consists of a `Person` document with mandatory fields - 

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
    "Person": {
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
      "Birthday": "xsd:dateTime",
      "PhoneNumber": "xsd:decimal",
      "Today": "xsd:dateTime",
      "above18": "xsd:boolean",
      "age": "xsd:decimal",
      "email": "xsd:string",
      "name": "xsd:string",
      "permanentAddress": {
        "@class": "Address",
        "@subdocument": []
      },
      "website": "xsd:string"
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
    type={"Person"}/>           // type of document 
```

### Edit & View
Note - make sure to provide document values for View mode. The form will be in read only mode for View.

```javascript
  let data = {
    "@id": "Person/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587",
    "@type": "Person",
    "Birthday": "2022-08-15T12:59:46Z",
    "PhoneNumber": 353912839283123140,
    "Today": "2022-08-15T12:59:50Z",
    "above18": true,
    "age": 22,
    "email": "rack@gmail.com",
    "name": "John Rock",
    "permanentAddress": {
      "@id": "Person/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
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
      type={"Person"}/>
```
