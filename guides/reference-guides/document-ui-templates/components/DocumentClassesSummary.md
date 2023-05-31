## DocumentClassesSummary
 
The `DocumentClassesSummary` component allows you to visualize document classes using interactive cards.

## Installation

Install the dependencies from npm

```
 npm install @terminusdb/terminusdb-documents-ui
 npm install @terminusdb/terminusdb-react-table
 npm install @terminusdb/terminusdb-documents-ui-templates
```
## Properties
| Properties |Description  |
|--|--|
|totalDocumentCount|The total number of documents|
|perDocumentCount| The number of documents for a type|
|onDocumentClick| A function that acts as a callback when the document class card is clicked|

## Example
```js
import React, {useEffect} from "react"
import {DocumentClassesSummary,useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"

export const Documents = ({tdbClient}) => {   
    const {perDocumentCount,
        totalDocumentCount, 
        getDocumentNumbers,
        setError,
        loading,
        error}=useTDBDocuments(tdbClient)


    useEffect(() => {
       if(tdbClient)getDocumentNumbers()
    }, [tdbClient])

    function handleCardClick (doc) {
        // do something after click the card, 
        // maybe navigate in the document list page
    }

    if(!frames) return  <div>{`Fetching frames for document type ${type} ...`}</div>
    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error
   
    return <div className="w-100">
            {error && {error && <div>Server Error: {errorMessage} </div>}
            <DocumentClassesSummary 
                    totalDocumentCount={totalDocumentCount}
                    perDocumentCount={perDocumentCount} 
                    onDocumentClick={handleCardClick}/>
        </div>
}
```

View the DocumentClassesSummary integrated inside a dashboard here 

[DocumentClassesSummary full example JS code](https://github.com/terminusdb/dashboard-examples-sandbox/blob/main/terminusdb-documents-ui-template-example/dashboard-demo/src/pages/Documents.js)

[Code Sandbox](https://codesandbox.io/s/github/terminusdb/dashboard-examples-sandbox/tree/main/terminusdb-documents-ui-template-example/dashboard-demo)


