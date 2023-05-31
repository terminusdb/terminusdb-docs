 # useTDBDocuments
`useTDBDocuments` is the main hook to connect @terminusdb/terminusdb-documents-ui with the TerminusCMS server. To use it, pass it with an instance of [@terminusdb/terminusdb-client](https://github.com/terminusdb/terminusdb-client-js)

## useTDBGraphqlQuery parameters
`useTDBDocuments(woqlClient:WOQLClient) `
 - `woqlClient : WOQLClient` 
   - Required
   - An WOQLClient instance with your connections settings

## Instance Properties
 - `state.loading : Bool` 
	 -  This is the current  `loading`  value, located on the state, if true the hook is doing a server call
 - `state.error: Object|Bool`
	 - This is the current error reporting object from the server, located on the state, the starting value
 - `state.perDocumentCount:Object|Bool`
	 - This is the current information about the number of documents, of every type, present in the database in a specific branch. The starting value is null,  we need to call the `getDocumentsNumber` function to fill this property status
 - `state.totalDocumentCount:Number|Bool`
	 - This is the current information about the total number of documents present in the database in a specific branch, the starting value is null,  we need to call the `getDocumentsNumber` function to fill this property status
 - `state.documentClasses:Array|Bool`
	 - This is the current information about the documents classes, the starting value is null, you need to call the `getDocumentNumbers` or the `getDocumentClasses` function to fill this property status
 - `state.selectedDocument:Object|Bool`
	 - This is the current selected document object, the starting value is null, you need to call the `getSelectedDocument` function to fill this property status 
 - `state.frame:Object|Bool`
	 - This is the current documents frames object, the starting value is false, you need to call the `getDocumentFrames`function to fill this property status
 - `state.documentTablesConfig:Object|Bool`
	 - This is the current document tables template, this property status stores the graphQL query for every document, the configuration for the tables, and the advanced search components. The starting value is null, you need to call the `getGraphqlTablesConfig`function to fill this property status, after the call the status will either be the table config Object, or false if the call failed
 - `setError: Function(value:Object|Bool)` 
	 - This function sets the error property status.
- `getDocumentClasses: Function()`
	 - This function calls the TerminusDB server to get the database classes list and sets the `documentClasses` property with the server response.
- `getDocumentNumbers: Function()` 
	 - This function calls the TerminusDB server to get the database classes list and sets the `documentClasses` property with the server response. It runs a query to get the total number of documents and the number of documents for type and fills the `perDocumentCount` and the `totalDocumentCount`
- `getDocumentFrames: Function()` 
	 - This function gets the current database frames and sets the `frames` status property
- `getGraphqlTablesConfig: Function()` 
	 - This function calls the TerminusDB server to get the GraphQL tables configuration and sets the  `getGraphqlTablesConfig` property status with the server response or `error` if there was an error in the call.
- `createDocument: Function(jsonDocument:Object)` 
	 - This function calls the server to create a new document in the current database
- `getSelectedDocument: Function(documentId:String)`  
	 - Calls the server to get a document object and sets the `selectedDocument` status property with the response
- `deleteDocument: Function(documentId:String)` 
	 - Calls the server to delete a document 
- `updateDocument: Function(jsonDocument:Object)` 
	 - Calls the server to update a document 
- `getDocumentById: Function(documentId:String)` 
	 - Calls the server to get a document object and return it

View the useTDBDocuments component integrated inside a dashboard here 

[useTDBDocuments example JS code to create a new document](https://github.com/terminusdb/dashboard-examples-sandbox/blob/main/terminusdb-documents-ui-template-example/dashboard-demo/src/pages/DocumentNew.js)

[Code Sandbox](https://codesandbox.io/s/github/terminusdb/dashboard-examples-sandbox/tree/main/terminusdb-documents-ui-template-example/dashboard-demo)
