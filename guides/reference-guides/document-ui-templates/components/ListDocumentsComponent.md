# List Documents

### ListDocumentsComponent

The `ListDocumentsComponent` element allows you to visualize the documents inside the [TDBReactTable](../tdb-react-table.md) and query the documents using the advanced search component.

### Installation

Install the dependencies from npm

```
 npm install @terminusdb/terminusdb-documents-ui
 npm install @terminusdb/terminusdb-react-table
 npm install @terminusdb/terminusdb-documents-ui-templates
```

### Properties

| Properties           | Description                                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| type                 | The document type                                                                                                                 |
| gqlQuery             | The graphql query                                                                                                                 |
| apolloClient         | An apollo client instance - [documentation](https://www.apollographql.com/docs/react/)                                            |
| tableConfig          | An object with the table configuration to pass to the [TDBReactTable Component](../tdb-react-table.md)                            |
| advancedSearchConfig | An object with the advancedSearch configuration to pass to the  [Advanced Search Component](../tdb-react-table.md#advancedsearch) |
| onRowClick           | A function that acts as a callback when the table row is clicked                                                                  |
| onViewButtonClick    | A function that acts as a callback when the table row view button is clicked                                                      |
| onEditButtonClick    | A function that acts as a callback when the table row edit button is clicked                                                      |
| onDeleteButtonClick  | A function that acts as a callback when the table row delete button is clicked                                                    |
| onCreateButtonClick  | A function that acts as a callback when the create button is clicked                                                              |
| showGraphqlTab       | A boolean property that enables the GraphQL query view tab                                                                        |

### Example

```js
import React, {useEffect} from "react";
import {gql} from "@apollo/client";
import { ListDocumentsComponent,useTDBDocuments } from "@terminusdb/terminusdb-documents-ui-template";

// I pass this so I'm sure it exists before loading the component
export const ListDocuments = ({type,apolloClient,tdbClient}) => {    
    const {deleteDocument,
        loading,
        error,
        getGraphqlTablesConfig,
        documentTablesConfig,
        setError} = useTDBDocuments(tdbClient)
    
    const navigate = useNavigate()
    
    useEffect(() => {
        getGraphqlTablesConfig()
    },[tdbClient])

    async function callDeleteDocument(row){
        var answer = window.confirm("Are you sure you want to delete this document");
        if (answer) {
            let fullId = row['id']
            const delCall = await deleteDocument(fullId)
            if(delCall){
               //do something after delete
            }
        } 
    }

    const onViewClick = (row) =>{
        let fullId = row['id']
        let fullIdEncode = btoa(fullId)
         //do something after row view button click
    }

    const onEditClick = (row) =>{
        let fullId = row['id']
        let fullIdEncode = btoa(fullId)
         //do something after row edit button click
    }

    function handleCreate(e) {
        //do something after create button  click
    }

    if(loading) return <div>{`Fetching ${type} ...`}></div>
    
    const querystr  = documentTablesConfig ? documentTablesConfig.objQuery[type].query : null
    const query = querystr ? gql`${querystr}` : false
    const tableConfig =  documentTablesConfig && documentTablesConfig.tablesColumnsConfig ? documentTablesConfig.tablesColumnsConfig[type] : []
    const advancedSearchConfig = documentTablesConfig && documentTablesConfig.advancedSearchObj ? documentTablesConfig.advancedSearchObj[type] : null
   
    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error

    return  <React.Fragment>
             {errorMessage  && <div>Server Error: {errorMessage} </div>}}
            {query && tableConfig &&
            <ListDocumentsComponent type={type}
                gqlQuery={query} 
                apolloClient={apolloClient} 
                tableConfig={tableConfig} 
                advancedSearchConfig ={advancedSearchConfig}
                onRowClick={onViewClick} 
                onViewButtonClick={onViewClick}
                onEditButtonClick={onEditClick}
                onDeleteButtonClick={callDeleteDocument}
                onCreateButtonClick={handleCreate}/>}
            </React.Fragment> 
}
```

View the ListDocumentsComponent integrated inside a dashboard here

[ListDocumentsComponent full example JS code](https://github.com/terminusdb/dashboard-examples-sandbox/blob/main/terminusdb-documents-ui-template-example/dashboard-demo/src/pages/ListDocuments.js)

[Code Sandbox](https://codesandbox.io/s/github/terminusdb/dashboard-examples-sandbox/tree/main/terminusdb-documents-ui-template-example/dashboard-demo)
