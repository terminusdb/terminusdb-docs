## Documents UI - GraphQL Table

The `DocumentsGraphqlTable` component allows you to use GraphQL queries and visualize the results in a the [TDBReactTable](../tdb-react-table.md),
you need to pass your instace of ApolloClient, the GraphQL query and the table and advanced search configuration. [Read here for the configuration documentation](../tdb-react-table.md).

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
|type| The document type
|gqlQuery|The GraphQL query|
|apolloClient| An apollo client instance - [Apollo Client documentation](https://www.apollographql.com/docs/react/)|
|tableConfig| An object with the table configuration to pass to the [TDBReactTable Component](../tdb-react-table.md)| 
|advancedSearchConfig| An object with the advancedSearch configuration to pass to the [AdvancedSearch Component](../tdb-react-table.md)| 
|onRowClick|A function that acts as a callback when the table row is clicked|
|onViewButtonClick|A function that acts as a callback when the table row view button is clicked|
|onEditButtonClick|A function that acts as a callback when the table row edit button is clicked|
|onDeleteButtonClick|A function that acts as a callback when the table row delete button is clicked|
|showGraphqlTab|A boolean property to enable the GraphQL query view tab|


## Example
```js
import React,{useEffect} from "react"
import {DocumentsGraphqlTable,useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"
import {gql} from "@apollo/client"
/**
 * 
 * @param {*} setSelected function to get selected document link by user 
 * @param {*} doctype document type selected
 * @returns 
 */
export const DocumentSearchComponent = ({setSelected, doctype,apolloClient,tdbClient}) => {
    const {documentTablesConfig,getGraphqlTablesConfig} = useTDBDocuments(tdbClient)

    useEffect(() => {
        if(doctype){       
            getGraphqlTablesConfig()         
        }
     },[doctype]);

    const querystr  = documentTablesConfig && documentTablesConfig.objQuery ? documentTablesConfig.objQuery[doctype].query : null
    const gqlQuery = querystr ? gql`${querystr}` : null
    const tableConfig =  documentTablesConfig && documentTablesConfig.tablesColumnsConfig ? documentTablesConfig.tablesColumnsConfig[type] : []
    const advancedSearchConfig = documentTablesConfig && documentTablesConfig.advancedSearchObj ? documentTablesConfig.advancedSearchObj[type] : null
    if(!gqlQuery || !tableConfig) return <div/>

    return  <DocumentsGraphqlTable tableConfig={tableConfig} 
                advancedSearchConfig ={advancedSearchConfig}
                type={doctype} 
                gqlQuery={gqlQuery}
                apolloClient={apolloClient}
                onRowClick={setSelected} 
                showGraphqlTab={false} />

}
```

View the DocumentsGraphqlTable component integrated inside a dashboard here

[DocumentSearchComponent full example JS code](https://github.com/terminusdb/dashboard-examples-sandbox/blob/main/terminusdb-documents-ui-template-example/dashboard-demo/src/components/DocumentSearchComponent.js)

[Code Sandbox](https://codesandbox.io/s/github/terminusdb/dashboard-examples-sandbox/tree/main/terminusdb-documents-ui-template-example/dashboard-demo)

