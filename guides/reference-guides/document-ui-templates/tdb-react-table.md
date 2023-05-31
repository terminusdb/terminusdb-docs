  

# TerminusDB React Table
Learn how to include TerminusDB React Table components in your projects to display documents in an interactive table.

## Installation
The best way to use @terminusdb/terminusdb-react-table is via the npm package that you can install with npm (or yarn if you prefer).

`npm install @terminusdb/terminusdb-react-table`

The library has two main components [`TDBReactTable`](#tdbreacttable) and [`AdvancedSearch`](#advancedsearch)

## TDBReactTable
### Properties
| Properties |Description |
|--|--|
|`start:Number`| The pagination start value, we view the row from start to start+limit |
|`limit:Number`| Determines the amount of rows on any given page, the default value is 10|
|`totalRows:Number`| The total number of rows|
|`result:Array `| The data array to display in the table |
|`config`|Table configuration. The main options are `columns:Array<Column>` required - The core columns configuration object for the entire table. `rowClick : Function` A function that acts as a callback when the table row is clicked|
|`orderBy:Array`| - An array of sorting objects. The sorting object should contain an `id` key with the corresponding column ID to sort by. An optional `desc` key (defaults to `false`) - this information is stored in state|
|`filterBy:Array`| - An array of objects, each having a column `id` and a corresponding filter `value`. This information is stored in state|
|`downloadConfig:Object`| - The download config object should contain an filename for the file output, a headersLabel array with the list of columns to add to the files, and a className to style the download button component |
|`setFilters:Function`| - A function that acts as a callback when the columns input filter is filled and the Enter key if pressed, row filters need to be implemented outside of the table|
|`setOrder:Function`| - A function that acts as a callback when the columns sort arrow is clicked. Implement your own sorting outside of the table
|`setLimits:Function(currentlimit:Number,currentstart:Number)`| - A function that acts as a callback when the pageSize or the pageIndex changes in the table. You should implement your own sorting outside of the table
|`setHiddenColumns:Function(id:String, checked:Bool)`| - A function that acts as a callback when the hide/show check box if clicked |

### Column Options
The following options are supported on any column object you can pass to columns.
| Properties |Description |
|---|---|
| `accessor:String`| - Function(originalRow, rowIndex) => any  - Required - This string/function is used to build the data model for your column.
| `id: String`| - Required - This is the unique ID for the column. It is used as a reference in things like sorting, grouping, filtering etc.
|`Header: String`| - Optional, the column title, the id will used if this property is not provided
|`width:Number`| - Optional |
|`minWidth: Number`| - Optional |
|`maxWidth: Number`| - Optional |
|`disableSortBy : Bool`| - Disables sorting of a column.
|`disableFilters:Bool`| - Disables filtering of the column.
|`renderer: String or Function`| - Optional, - The available values for the string value are `json` - `number` - `string` - `image`. If you pass a function instead, this will receive the table instance and cell model as properties and return a JSX object or a string
|`filter:Object`| - This object should have a `type` property, the available values for type are : `list` , `number`, `string` or `boolean`. Use an `options` object to set the operator for the filter to override the defaults

### Usage

```javascript

import  React, {useState,useEffect} from  'react';
import {TDBReactTable} from  '@terminusdb/terminusdb-react-table'
import {columnsConfiguration} from  './columnsConfiguration'
import  data  from  './data.json'
import  './terminusdb-react-table-main.css'
import {Container,Alert,Row} from  "react-bootstrap"

const  App = (props) =>{
	const [rowSelected, setRowSelected] = useState(false)
	const [limit, setLimit] = useState(5)
	const [start, setStart] = useState(0)
	const [filter, setFilter] = useState([])
	const [order, setOrder] = useState([])
	const  hiddenColumnsArr = ['_id','desc','MGLT','length', 						  'cost_in_credits','max_atmosphering_speed','_speed','crew',
'passengers','cargo_capacity','consumables','hyperdrive_rating',
'starship_class','created,edited','url']

const [dataWithPagination, setData] = useState(data)
const  onRowClick = (row) =>{
	setRowSelected(row.original['fullID'])
}

const  tableConfigObj = {}
tableConfigObj.columns = columnsConfiguration
tableConfigObj.rowClick = onRowClick

const  setHiddenColumns = (id, selected)=>{
		//implement a setHiddenColumns function to store the status
}

const  changeFilters = (filterArr)=>{setFilter(filterArr)}
const  changeLimits = (currentlimit,currentpage)=>
				setLimit(currentlimit)
				setStart(currentpage)
				}

const  changeOrders = (orderArr)=>{setOrder(orderArr)}

useEffect(() => {
	const  tmpData = data.slice(start,(limit+start))
	setData(tmpData)
},[limit,start])

return  <Container  className='my-5'>
	<Alert><pre>{`Row selected id ${rowSelected}`}
	You need to Implement a logic to change the Hidden status</pre>	</Alert>

<Alert><pre>{`YOU NEED TO IMPLEMENT A FILTER LOGIC, Table filter ${JSON.stringify(filter)}`}</pre></Alert>

<Alert><pre>{`YOU NEED TO IMPLEMENT AN ORDER LOGIC, Table order ${JSON.stringify(order)}`}</pre></Alert>

<Row  className='width-100 overflow-auto text-break'  >
<TDBReactTable
	result={dataWithPagination}
	config ={tableConfigObj}
	hiddenColumnsArr = {hiddenColumnsArr}
	setHiddenColumns = {setHiddenColumns}	
	limit={limit}
	start={start}
	orderBy={[]}
	filterBy={[]}
	setFilters = {changeFilters}
	setLimits={changeLimits}
	setOrder={changeOrders}
	loading={false}
	totalRows={10}
/>
</Row>
</Container>
}

export  default  App;
```
### Example `TdbReactTable` Code

[TdbReactTable Code](https://github.com/terminusdb/terminusdb-dashboard/tree/main/packages/tdb-react-table/src)

[Code sandbox](https://codesandbox.io/s/github/terminusdb/dashboard-examples-sandbox/tree/main/terminusdb-react-table-examples/table-basic-conf)

## AdvancedSearch

### Properties

| Properties |Description |
|--|--|
|`setFilter:Function(advFilter:Object)`| A function that acts as a callback when the advanced filter `Filter Data` button is clicked |
|`fields:Object`| The Advanced Search fields description
  
### Fields Options

The following options are supported on any files object that you can pass to field, the keys in fields are the ID of the field itself.

| Properties |Description |
|---|---|
|`label:String` | - Required - the field label
|`type:string`| - Required - is the field widget match type for GraphQL |
|`valueSources:Array`| - Required - for the default widget this is always ["value"]
|`typeValue:String`| - Required - the GraphQL value type (String,BigInt )
|`operators:Array`| - Optional - an Array of available operators
|`defaultOperator:String`| - Optional - the default operator for the type
|`fieldSettings`| - Optional - an Array of options for the valuetype ENUM
|`subfields`| - Optional - a list of subfields for the type `!group` valuetype Object

```json
{"myfield":{
	"label":"myfiledLabel",
	"type":"text",
	"valueSources":["value"],
	"typevalue":"String"
	}
}
```

[advancedSearchMatchType code](https://github.com/terminusdb/terminusdb-dashboard/blob/main/packages/tdb-react-table/src/advancedSearchUtils.js)

**You can use the following method to format the advanced search fields**

```javascript
import {advancedSearchMatchType} from  "@terminusdb/terminusdb-react-table/advancedSearchUtils"

const  stringFormat = advancedSearchMatchType("String")
stringFormat.label= "myPropertyName"
const  fields = {"myPropertyName" :  stringFormat}
```

### Code Examples of Advanced Search

[AdvancedSearch Code](https://github.com/terminusdb/terminusdb-dashboard/tree/main/packages/tdb-react-table/src)

[Code sandbox](https://codesandbox.io/s/github/terminusdb/dashboard-examples-sandbox/tree/main/terminusdb-react-table-examples/advanced-search)
