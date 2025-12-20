# render_as using @metadata
This example shows how ``<FrameViewier/>`` appears for a document ``metaDataExample`` with the fields ``body`` & ``title`` in Create/ Edit or View mode. The Frame below shows ``@metadata`` with the ``render_as`` tag included that tells ``<FrameViewier/>`` to render field ``body`` as Markdown.

## Demo 
Take a look at the [**Demo Playground**](https://documents-ui-playground.terminusdb.com/Render%20As) to view ``<FrameViewier/>`` with properties where render_as is defined in @metadata tag - in Create, Edit or View mode.


## Frame 
This frame consists of an `metaDataExample` document 

```javascript
  let frame = {
    "@context": {
      "@base": "terminusdb:///data/",
      "@schema": "terminusdb:///schema#",
      "@type": "Context",
      "xsd": "http://www.w3.org/2001/XMLSchema#"
    },
    "metaDataExample": {
			"@key": {
				"@fields": [
					"title"
				],
				"@type": "Lexical",
			},
			"@type": "Class",
			"@metadata": {
				"render_as": {
					"body": "markdown"
				}
			},
			"body": "xsd:string",
			"title": "xsd:string"
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
    type={"metaDataExample"}/> // type of document 
```

### Edit & View
Note - make sure to provide document values for View mode. The form will be in read only mode for View.

```javascript
let data = {
	"@id": "metaDataExample/431b3406a64d99714b57133019408a16a6a514755fb229aff01419b4b423cb62",
	"@type": "metaDataExample",
	"title": "Example",
	"body": "---\ndescription: >-\n  This page provides an overview of the TerminusCMS dashboard to help you\n  navigate its features.\n---\n\n# Product Tour\n\nTerminusCMS includes many features to build content infrastructures for complex environments. This product tour aims to provide you with an understanding of how to navigate the product and get started on your projects.&#x20;\n\n* [Creating projects, managing them, and designing your schema](projects-data-products.md)\n* [Content and data curation](content-and-data-curation.md)\n* [Change request workflows for collaborative content management](change-request-workflows.md)\n* [Managing teams and users](manage-teams-and-users.md)\n* [GraphQL and WOQL playgrounds to build and test queries](graphql-and-woql-playgrounds.md)\n\n### Sign Up and Try Out a Demo Project&#x20;\n\nSign up for TerminusCMS for free at: [https://dashboard.terminusdb.com](https://dashboard.terminusdb.com).\n\nVerify your email address by clicking on the link emailed to you and logging in.\n\nClick get started on the Community Package and then select the automatically generated team.&#x20;\n\nFrom here, clone one of the demo projects to play around with -\n\n<figure><img src=\"../../.gitbook/assets/terminuscms-demos.png\" alt=\"\"><figcaption></figcaption></figure>"
}


return <FrameViewer
  frame={frame}
  mode={"View"}
  formData={data}
  type={"metaDataExample"}/>
```
