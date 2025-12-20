# New Documents

### NewDocumentComponent

The `NewDocumentComponent` allows you to create new documents using the [FrameViewer](../../../../document-ui-sdk/use-the-document-ui-sdk/).

### Installation

Install the dependencies from npm

```
 npm install @terminusdb/terminusdb-documents-ui
 npm install @terminusdb/terminusdb-react-table
 npm install @terminusdb/terminusdb-documents-ui-templates
```

### Properties

| Properties       | Description                                                                  |
| ---------------- | ---------------------------------------------------------------------------- |
| type             | The document type                                                            |
| documentJson     | The document object, it is empty ({}) for new                                |
| createDocument   | A function that acts as a callback when the `submit` button is clicked       |
| frames           | The database Class Frame, or object of all class frames                      |
| closeButtonClick | A function that acts as a callback when the panel exit `x` button is clicked |
| SearchComponent  | A react component used as search component                                   |

### Example

```js
//This is use the NewDocumentComponent template to create a new document type
import React, {useEffect}  from "react";
//we import the NewDocumentComponent and the useTDBDocuments from the terminusdb-documents-ui-template
//you need to pass your terminusdb-client instance and the document type 
import {NewDocumentComponent,useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"

export const DocumentNew = ({type,tdbClient}) => {  
    const {
        frames,
        error,
        getDocumentFrames,
        createDocument,
        setError
    } = useTDBDocuments(tdbClient)
  
    useEffect(() => {
        getDocumentFrames()
	},[])

    const callCreateDocument = async (jsonDocument) =>{
        const created = await createDocument(jsonDocument)
        if(created){
            //do something after create a new element
        }
    }

    const closeButtonClick = () =>{
       // do something after click the close panel button the interface
    }

    const DocumentSearchComponent = () =>{
        //make you document search component
        return </div>
    }

    if(!frames) return  <div>{`Fetching frames for document type ${type} ...`}</div>
    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error
    
    return  <React.Fragment>
            {error && <div>Server Error: {errorMessage} </div>}
                <NewDocumentComponent
                    SearchComponent={DocumentSearchComponent}
                    frames={frames}
                    createDocument={callCreateDocument}
                    type={type}
                    closeButtonClick={closeButtonClick}
                />     
            </React.Fragment>
}
```

View the NewDocumentComponent integrated inside a dashboard here

[NewDocumentComponent full example JS code](https://github.com/terminusdb/dashboard-examples-sandbox/blob/main/terminusdb-documents-ui-template-example/dashboard-demo/src/pages/DocumentNew.js)

[Code Sandbox](https://codesandbox.io/s/github/terminusdb/dashboard-examples-sandbox/tree/main/terminusdb-documents-ui-template-example/dashboard-demo)
