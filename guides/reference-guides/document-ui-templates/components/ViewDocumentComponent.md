# View Documents

### ViewDocumentComponent

The `ViewDocumentComponent` allows you to view existing documents using the [FrameViewer](../../../../document-ui-sdk/use-the-document-ui-sdk/) component.

### Installation

Install the dependencies from npm

```
 npm install @terminusdb/terminusdb-documents-ui
 npm install @terminusdb/terminusdb-react-table
 npm install @terminusdb/terminusdb-documents-ui-templates
```

### Properties

| Properties       | Description                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| type             | The document type                                                                                                                 |
| documentID       | The document ID                                                                                                                   |
| documentJson     | The document object                                                                                                               |
| frames           | The database Class Frame, or object of all class frames                                                                           |
| closeButtonClick | A function that acts as a callback when the panel exit `x` button is clicked                                                      |
| deleteDocument   | A function that acts as a callback when the delete button is clicked                                                              |
| editDocument     | A function that acts as a callback when the edit button is clicked                                                                |
| getDocumentById  | A function that acts as a callback when the a link property (a link to another document) is clicked inside the document interface |

### Example

```js
import React, {useEffect}  from "react";
import {ViewDocumentComponent,useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"

export const DocumentView = ({tdbClient,type, documentID}) => {      
    const {
        frames,
        selectedDocument,
        error,
        deleteDocument,
        getSelectedDocument,
        getDocumentById,
        getDocumentFrames,
        setError
    } = useTDBDocuments(tdbClient)
 
    useEffect(() => {
        getDocumentFrames()
        getSelectedDocument(documentID)
	}, [] )

    async function callDeleteDocument(){
        var answer = window.confirm("Are you sure you want to delete this document");
        if (answer) {
            const delCall = await deleteDocument(documentID)
            if(delCall){
                //do something after delete document
            }
        } 
    }

    const closeButtonClick = () =>{
       // do something after click the close panel button the interface
       // like navigate to the list of documents
    }

    const gotToEditDocument = () =>{
       // do something after click the edit button like navigate to the 
       // edit page
    }


    if(!frames) return  <div>{`Fetching frames for document type ${type} ...`}</div>
    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error
    
    return <React.Fragment>
        {error && <div>Server Error: {errorMessage} </div>}
        <ViewDocumentComponent 
          type={type}
          getDocumentById={getDocumentById}
          documentJson={selectedDocument}
          frames={frames}
          closeButtonClick={closeButtonClick}
          documentID={documentID}
          deleteDocument={callDeleteDocument}
          editDocument = {gotToEditDocument}
        />
    </React.Fragment>
}
```

View the ViewDocumentComponent integrated inside a dashboard here

[ViewDocumentComponent full example JS code](https://github.com/terminusdb/dashboard-examples-sandbox/blob/main/terminusdb-documents-ui-template-example/dashboard-demo/src/pages/DocumentView.js)

[Code Sandbox](https://codesandbox.io/s/github/terminusdb/dashboard-examples-sandbox/tree/main/terminusdb-documents-ui-template-example/dashboard-demo)
