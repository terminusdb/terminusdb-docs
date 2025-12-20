# order_by using @metadata
This example shows how ``<FrameViewier/>`` appears for a document ``OrderByExample`` in Create/ Edit and View mode. 

The Frame below to shows ``@metadata`` with  an ``order_by`` tag which tells ``<FrameViewier/>`` to order fields according to the ``order_by`` array. Note there is a ``@metadata`` tag in the ``SubBody`` class definition which also tells ``<FrameViewier/>`` to order the subdocument's internal fields in the order included in the ``@metadata`` ``order_by`` array.


## Demo 
Take a look at the [**Demo Playground**](https://documents-ui-playground.terminusdb.com/Order%20By) to view ``<FrameViewier/>`` with properties where order_by is defined in the `@metadata` tag - in Create, Edit and view mode.

## Frame 
This frame consists of an `OrderByExample` document 

```javascript
  let frame = {
    "@context": {
      "@base": "terminusdb:///data/",
      "@schema": "terminusdb:///schema#",
      "@type": "Context",
      "xsd": "http://www.w3.org/2001/XMLSchema#"
    },
		"OrderByExample": {
			"@key": {
				"@fields": [
					"title"
				],
				"@type": "Lexical",
			},
			"@type": "Class",
			"@metadata": {
				"order_by": [ "num_lines", "paragh", "body", "title" ] 
			},
			"paragh": "xsd:string",
			"title": "xsd:string",
			"num_lines": "xsd:decimal",
			"body": {
				"@class": "SubBody",
				"@subdocument": []
			}
		},
		"SubBody": {
			"@key": {
				"@type": "Random"
			},
			"@metadata": {
				"order_by": [ "section", "url", "text" ]
			},
			"@subdocument": [],
			"@type": "Class",
			"text": "xsd:string",
			"section": "xsd:string",
			"url": "xsd:url"
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
    type={"OrderByExample"}/> // type of document 
```

### Edit & View
Note - make sure to provide document values for View mode. The form will be in read only mode for View.

```javascript
let data = {
	"@id": "OrderByExample/431b3406a64d99714b57133019408a16a6a514755fb229aff01419b4b423cb62",
	"@type": "OrderByExample",
	"paragh": "An example showing field ordered",
	"title": "ordering example",
	"num_lines": "23",
	"body": {
		"@id": "SubBody/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/body/SubBody/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
		"@type": "SubBody",
		"text": "sample text",
    "section": "a section",
    "url": "https://terminusdb.com/"
	},
}


return <FrameViewer
  frame={frame}
  mode={"View"}
  formData={data}
  type={"OrderByExample"}/>
```
