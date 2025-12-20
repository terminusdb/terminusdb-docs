# sys:JSON 
This example shows how ``<FrameViewier/>`` appears for a document ``ComputerStudent`` with sys:JSON field in Create/ Edit or View mode. 

``ComputerStudent`` has a required mandatory field ``likes`` and a set field ``stores_as``.

## Demo 
Take a look at the [**Demo Playground**](https://documents-ui-playground.terminusdb.com/JSON) to view ``<FrameViewier/>`` with sys:JSON properties in Create, Edit or View mode.

## Frame 
This frame consists of an ComputerStudent document 

```javascript
  let frame = {
    "@context": {
      "@base": "terminusdb:///data/",
      "@schema": "terminusdb:///schema#",
      "@type": "Context",
      "xsd": "http://www.w3.org/2001/XMLSchema#"
    },
    "ComputerStudent": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "likes": "sys:JSON",
      "stores_as": {
        "@class": "sys:JSON",
        "@type": "Set"
      }
    }
}
```


### Create

```
import { FrameViewer } from '@terminusdb/terminusdb-documents-ui'

  return <FrameViewer
    frame={frame}               // above defined frame          
    formData={{}}               // formData will be empty
    mode={"Create"}             // mode 
    type={"ComputerStudent"}/> // type of document 
```

### Edit & View
Note - make sure to provide document values for View mode. The form will be in read only mode for View.

```javascript
let data = {
	"@id": "ComputerStudent/431b3406a64d99714b57133019408a16a6a514755fb229aff01419b4b423cb62",
	"@type": "ComputerStudent",
	"likes": {
		"age": 39,
		"name": "Madame Uppercut",
		"powers": ["Million tonne punch", "Damage resistance", "Superhuman reflexes"],
		"secretIdentity": "Jane Wilson"
	},
	"stores_as": [
		{
			"name": "Molecule Man",
			"age": 29,
			"secretIdentity": "Dan Jukes",
			"powers": [
				"Radiation resistance",
				"Turning tiny",
				"Radiation blast"
			]
		},
		{
			"name": "Eternal Flame",
			"age": 1000000,
			"secretIdentity": "Unknown",
			"powers": [
			  "Immortality",
			  "Heat Immunity",
			  "Inferno",
			  "Teleportation",
			  "Interdimensional travel"
			]
		}
	]
}


return <FrameViewer
  frame={frame}
  mode={"View"}
  formData={data}
  type={"ComputerStudent"}/>
```

