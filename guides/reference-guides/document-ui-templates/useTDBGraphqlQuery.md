# useTDBGraphqlQuery
`useTDBGraphqlQuery` is the main hook to connect @terminusdb/terminusdb-react-table with TerminusCMS server . To use it, pass it with an instance of [ApolloClient](https://www.apollographql.com/docs/react/).

## useTDBGraphqlQuery parameters
   `useTDBGraphqlQuery(apolloClient:ApolloClient, graphqlQuery:gql, documentType:String, options:Object)`
 - `apolloClient : ApolloClient` 
   - Required
   - An Apollo Client instance with your connections settings
- `graphqlQuery : gql`
   - Required
   - A GraphQL query
- `documentType : string`
   - Required
   - The document type
-  `options : object `

The following options are supported via the main options object passed to useTDBGraphqlQuery
   - `limit : number`
      - Optional
      - The initial state value for `limit `
   - `start : number`
      - Optional
      - The initial state value for `start `
   - `tableConfigObj: Object`
      - Optional
      - The table configuration object
   - `hiddenColumns : Array`
      - Optional
      - The initial state object for `hiddenColumnsArr`  
  
  ## Instance Properties  
  
  The following properties are available on the table instance returned from useTDBGraphqlQuery
  
 - `state.loading : Bool` 
	 -  This is the current  `loading`  value, located on the state, if true the hook is doing a server call
 - `state.error: Object|Bool`
	 - This is the current error reporting object from the server, located on the state, the starting value is false
 - `state.limit: Number`
	 - This is set the limit clause to select a limited number of records, The starting value is 10. Using the `changeLimits` function will change the status of this property
 - `state.start:Number`
	 - This is the pagination start value, pagination allows returning only a portion, rather than the whole, result set. The start value is 0. Use the `changeLimits` function to change the status of this property
 - `state.queryFilters:Object`
	 - This is the query filter status, this value is used to fill the filter value in the GraphQL query variables. Use the `setAdvancedFilters` or `changeFilters` functions to change the status of this property
 - `state.queryOrders:Object`
	 - This is the query orderBy status. Use this value to fill the orderBy value in the graphql query variables. Use the `changeOrders` function to change the status of this property
 - `state.orderBy:Array`
   	 - This is the table orderBy status, transform this value to create the queryOrders object. Use the `changeOrders` function to change the status of this property
 - `state.filterBy:Array`
	 - This is the table filter status, transform this value to create the queryFilters object. Use the `changeFilters` function to change the status of this property
 - `state.rowCount:Number`
  	 - This is the current number of records loaded
 - `state.documentResults:Array`
  	 - The successful GraphQL query fetch result data
 - `state.extractedData:Array`
  	 - The successful GraphQL query fetch result data formatted for the table 
 - `state.hiddenColumnsArr:Array`
  	 - Store the table hiddenColumns list. If a column's ID is contained in this array, it will be hidden using the `setHiddenColumns ` function
 - `callGraphqlServer: Function(currentlimit:Number,currentstart:Number,queryOrders:Object,queryFilters:Object)`
	 - This function changes the `limit`, the `start` status, the `queryOrders`, and the `queryFilters` properties and calls the server with pagination, returning only a portion, rather than the whole, result.
 - `changeLimits: Function(currentlimit:Number,currentstart:Number)`
	 - This function changes the `limit` and `start` status properties and calls the server with pagination, returning only a portion, rather than the whole, result.
 - `changeOrders: Function(orderByArr:Array)`
	 - This function gets the graphqlTable orderByArr variable and transforms it in the GraphQL orderBy variables format.
	 - Set the `queryOrders` and `orderBy` properties status to call the server with the current `queryOrders` and `queryFilters` status
 - `changeFilters: Function(filtersArr:Array)`
	 - This function gets the graphqlTable filtersArr variable and transforms it in the GraphQL filters variables format.
	 - Set the `queryFilters` and `filterBy` properties status to call the server with the current `queryFilters` and `queryOrders` status 
 - `setAdvancedFilters: Function(advfilter:Object)`
	 - This gets the advfilter in the GraphQL filters variables format
	 - Set the `queryFilters` reset the `filterBy` properties status to call the server with the current `queryFilters` and `queryOrders` status 
 - `setHiddenColumns: Function(id:string, checked:bool)`
 	 - This function is called to add or remove a columns ID to the `hiddenColumns ` status property
 
	
View the useTDBGraphqlQuery component integrated inside a dashboard here 

[useTDBGraphqlQuery source code](https://github.com/terminusdb/terminusdb-dashboard/blob/main/packages/tdb-documents-ui-template/src/hook/useTDBGraphqlQuery.js)

[useTDBGraphqlQuery usage in the DocumentsGraphqlTable component](https://github.com/terminusdb/terminusdb-dashboard/blob/main/packages/tdb-documents-ui-template/src/components/DocumentsGraphqlTable.js)
